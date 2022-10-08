import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import $ from 'jquery';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import SalesReportDisplay from './SalesReportDisplay';
import SalesReportEdit from './SalesReportEdit';
import ReportMenuPage from './ReportMenuPage';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import registerServiceWorker from './registerServiceWorker';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './DownloadButton.css';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
    GetCurrencies,SetCurrentPage } from './ConstSiteFunction';


var currentRow;

class SalesYearlyReport extends Component {

    constructor() {
        super()
        var today = new Date();
        var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var year = today.getFullYear();

        this.state = {
            year: year,
            companyId: companyId,
            companyName: companyName,
            totalSubTotal: '0',
            totalBalance:'0',

        };


    }


    componentDidMount() {

        SetCurrentPage("SalesYearlyReport");



        window.scrollTo(0, 0);

        $("#nodata").hide();
        var self = this;

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                year: this.state.year,
                companyId: this.state.companyId,
            }),
            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/SalesReport/YearlySalesReport",
            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {
                var no;
                if (data.yearlySalesList.length != 0) {
                    // var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Invoice</th><th>Date</th><th>Name</th><th>Contact</th><th>Status</th><th>Total</th><th>Balance</th></tr></thead>';
                  
                    $.each(data.yearlySalesList, function (i, item) {
                        no = parseInt(i) + 1;
                        // tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + no + '</td><td>' + item.invoiceNo + '</td><td>' + item.date + '</td><td>' + item.userName + '</td><td>' + item.contact + '</td>'
                        //     + '<td>' + item.status + '</td><td>' + item.subtotal1 + '</td><td>' + item.balanceAmt + '</td></tr></tbody>';

                        self.state.totalSubTotal = Number(self.state.totalSubTotal) + Number(item.subtotal1);
                        self.state.totalBalance=Number(self.state.totalBalance)+Number(item.balanceAmt);
   
                        self.setState({
                            totalSubTotal:self.state.totalSubTotal,
                            totalBalance:self.state.totalBalance,
                          })
                    });
                    // $("#tableHeadings").append(tab);

                    $(".customerId").hide();
                } else {
                    $("#nodata").show();
                    $("#totalSale").hide();
                    $("#test-table-xls-button").hide();
                }


                if (data.saleinvoicedetailedlist.length != 0) {
                    var tab = '<thead><tr class="headcolor">'
                      + '<th>Invoice No</th><th>Customer Name</th><th>GSTIN</th><th>Invoice Date</th>'
                      + '<th>Invoice Value</th><th>TAX Rate(%)</th><th>Taxable Value</th><th>CENTRAL TAX</th>'
                      + '<th>cgst</th><th>IGST</th><th>Payment Mode</th></tr></thead>';
            
                    $.each(data.saleinvoicedetailedlist, function (i, item) {
                      if (item.subtotal1 == item.balance_amount) {
                        self.state.payment_status = "UnPaid";
            
                        self.setState({
                          payment_status: self.state.payment_status,
                        })
                      }
                      if (item.balance_amount == 0) {
                        self.state.payment_status = "Paid";
                        self.setState({
                          payment_status: self.state.payment_status,
                        })
                      }
            
                      if ((item.subtotal1 != item.balance_amount) && (item.balance_amount != 0)) {
                        self.state.payment_status = "PartiallyPaid";
                        self.setState({
                          payment_status: self.state.payment_status,
                        })
                      }
                     
                      self.state.taxRate = Number(item.cgsta) + Number(item.sgsta) + Number(item.igsta);
                      self.setState({
                        taxRate: self.state.taxRate,
            
                      })
                      self.state.taxableValue = Number(item.subtotal1) - Number(item.totalgst);
                      self.setState({
            
                        taxableValue: self.state.taxableValue,
                      });
            
                      tab += '<tbody id= "myTable" ><tr id="tabletextcol"><td>' + item.invoiceNo + '</td><td>' + item.customerName + '</td>'
                        + '<td>' + item.gstNo + '</td><td>' + item.invoiceDate + '</td><td>' + item.subtotal1 + '</td>'
                        + ' <td>' + self.state.taxRate + '</td>'
                        + '<td>' + item.prefinalAmount + '</td>'
                        + '<td>' + Math.round(((0.01 * Number(item.cgsta)) * Number(item.prefinalAmount))) + '</td>'
                        + '<td>' + Math.round(((0.01 * Number(item.sgsta)) * Number(item.prefinalAmount))) + '</td>'
                        + '<td>' + Math.round(((0.01 * Number(item.igsta)) * Number(item.prefinalAmount))) + '</td><td>' + item.paymentMode + '</td>'
                        + '</tr></tbody>';
                    });
            
            
                    $("#tableHeadings").append(tab);
                  }

            },
            error: function (data) {

                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Network Connection Problem',
                    showConfirmButton: false,
                    timer: 2000
                  })

            }
        });



        $("#tableHeadings").on('click', '#delete', function () {
            // get the current row

            currentRow = $(this).closest("tr");

            self.state.id = currentRow.find("td:eq(1)").text(); // get current row 1st TD value
            self.state.date = currentRow.find("td:eq(2)").text();


            self.setState({

                id: self.state.id,
                date: self.state.date,

            })

            self.DeleteFunc(currentRow);

        });

        $("#tableHeadings").on('click', '#view', function () {
            // get the current row

            currentRow = $(this).closest("tr");

            self.state.id = currentRow.find("td:eq(1)").text();
            // self.state.invoiceNo=currentRow.find("td:eq(1)").text(); 
            self.state.date = currentRow.find("td:eq(2)").text();
            self.state.userName = currentRow.find("td:eq(3)").text(); // get current row 1st TD value
            self.state.contact = currentRow.find("td:eq(4)").text();
            self.state.status = currentRow.find("td:eq(5)").text();
            self.state.balanceAmt = currentRow.find("td:eq(7)").text();
            self.state.subtotal1 = currentRow.find("td:eq(6)").text();


            self.setState({

                userName: self.state.userName,
                amount: self.state.amount,
                date: self.state.date,

            })


            ReactDOM.render(<SalesReportDisplay id={self.state.id}
                date={self.state.date} userName={self.state.userName} contact={self.state.contact}
                status={self.state.status} balanceAmt={self.state.balanceAmt} subtotal1={self.state.subtotal1} />, document.getElementById("contentRender"));


        });
        $("#tableHeadings").on('click', '#edit', function () {
            // get the current row

            currentRow = $(this).closest("tr");

            //    self.state.id=currentRow.find("td:eq(1)").text();
            self.state.invoiceNo = currentRow.find("td:eq(1)").text();
            self.state.date = currentRow.find("td:eq(2)").text();
            self.state.userName = currentRow.find("td:eq(3)").text(); // get current row 1st TD value
            self.state.contact = currentRow.find("td:eq(4)").text();
            self.state.status = currentRow.find("td:eq(5)").text();
            self.state.balanceAmt = currentRow.find("td:eq(7)").text();
            self.state.subtotal1 = currentRow.find("td:eq(6)").text();
            self.state.customerId = currentRow.find("td:eq(8)").text();


            self.setState({

                id: self.state.id,
                invoiceNo: self.state.invoiceNo,
                date: self.state.date,
                userName: self.state.userName,
                contact: self.state.contact,
                status: self.state.status,
                balanceAmt: self.state.balanceAmt,
                subtotal1: self.state.subtotal1,
                customerId: self.state.customerId,

            })

            //self.UpdateSubmit(currentRow);


            ReactDOM.render(<SalesReportEdit invoiceNo={self.state.invoiceNo}
                date={self.state.date} userName={self.state.userName} contact={self.state.contact}
                status={self.state.status} balanceAmt={self.state.balanceAmt} subtotal1={self.state.subtotal1} customerId={self.state.customerId} />, document.getElementById("contentRender"));
        });



    }

    DeleteFunc(currentRow) {
        var self = this;

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                id: self.state.id,
                date: self.state.date,
            }),
            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/SalesReport/DailySalesReportDelete",
            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {

                currentRow.remove();

            },
            error: function (data) {

                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Network Connection Problem',
                    showConfirmButton: false,
                    timer: 2000
                  })

            }
        });

    }


    handleUserInput = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        },
        );

    }

    BackbtnFunc() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={ReportMenuPage} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }

    printdiv(printarea) {
        var originalContents = document.body.innerHTML;
        $("#test-table-xls-button").hide();
        $("#backbutton").hide();
        $("#print").hide();

        $("#sidebar").hide();
        $("#navbar_company_name").hide();
    
    
     window.print(originalContents);
     $("#sidebar").show();
        $("#navbar_company_name").show();
        $("#backbutton").show();
        $("#print").show();
        $("#test-table-xls-button").show();


        // $(w.document.body).html(html);

    }
    render() {
        const  downloadButtonData=<span style={{fontWeight:"700",fontWeight: "900",fontSize:"15px"}}>Download</span>
    
        return (


            <div class="container" style={{ height: "20px" }}>
                <div class="row" style={{ marginTop:"13px"}}>
                    <div class="col-sm-6 ">
                        <ul class="previous disabled" id="backbutton"
                            style={{
                                backgroundColor: "#05a4b5",color:"white",
                                float: "none",
                                display: "inline-block",
                                marginLeft: "5px",
                                borderRadius: "5px",
                                padding: "3px 7px 3px 7px"
                            }}>
                            <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></ul>

                    </div> <div class="col-sm-6 ">
                        <div class="row">
                            <div class="col-sm-3 pull-right">   <button type="button" id="print" class="btn btn-default " onClick={() => this.printdiv('printarea')} ><i class="fa fa-print" aria-hidden="true" style={{ fontSize: "17px", border: "none" }}> Print1</i></button>
                            </div>
                            <div class="col-sm-3 pull-right">
                            </div>   </div>
                    </div>    </div>
                <div id="printarea">
                    <div style={{ display: "grid" }}>
                        <h2 style={{ fontWeight: "300", fontSize: "30px", textAlign: "center" }}> {this.state.companyName}</h2>
                        <h5 style={{ fontWeight: "300", fontSize: "30px", textAlign: "center" }}>SALES YEARLY REPORT</h5>
                        <hr></hr>
                    </div>



                    <div style={{ display: "grid" }}>
                    <div class="row">
                  <div class="col-lg-9 col-md-9 col-sm-6 col-xs-6">
                    
                    </div> 
                    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                    <div class="buttonright" >
<ReactHTMLTableToExcel
                   
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="tableHeadings"
                    filename="SalesYearly_List"
                    sheet="tablexls"
                    className="pageredirectbtn download-table-xls-button "
                    buttonText={downloadButtonData}  />
                    </div>
                    </div> 
                </div>

                   
                        <div id="tableOverflow">
                            <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">

                            </table>
                        </div>
                        <br />
                        <div class="row" id="totalSale">
                            <div class="col-lg-8 col-md-8 text-right">
                            </div>
                            <div class="col-lg-4 col-md-4 text-right">

                                <div class="table-responsive">
                                    <table class="table table-bordered">
                                        <tbody><tr>
                                            <th style={{ width: "30%" }}>Total Amount:</th>
                                            <td style={{ width: "30%" ,color: "red",textAlign:"left" }}>$ <span style={{ color: "red",textAlign:"left" }} id="ContentPlaceHolder1_lbl_subtotal">{this.state.totalSubTotal}</span></td>
                                        </tr>
                                        <tr>
                                            <th style={{ width: "30%" }}>Balance Amount:</th>
                                            <td style={{ width: "30%" ,color: "red",textAlign:"left" }}>$ <span style={{ color: "red",textAlign:"left" }} id="ContentPlaceHolder1_lbl_subtotal">{this.state.totalBalance}</span></td>
                                        </tr>
                                        </tbody></table>


                                </div>
                            </div>
                        </div>

                    </div>

                    <h2 id="nodata" style={{ textAlign: "center" }}>No Data</h2>
                </div>




            </div>

        );
    }
}

export default SalesYearlyReport;