import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import { InvoiceIcons, Invoice_xlDownldBtn } from './ServiceRegistration/IconComponents';
import $ from 'jquery';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import SalesReportDisplay from './SalesReportDisplay';
import SalesReportEdit from './SalesReportEdit';
import ReportMenuPage from './ReportMenuPage';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import CryptoJS from 'crypto-js';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './DownloadButton.css';
import { SiteDropDown, FilterOptions } from './SiteDropDown';
import { GetEmployeeSite, GetCurrentSite } from './ConstSiteFunction';
import './purchaseReportCss.css';
import {Double_BackButtonComponent} from'./ServiceRegistration/ButtonComponent';
import * as SiIcons from 'react-icons/si';


var dataList = [];
var saledataList = [];
var currentRow;

class SalesMonthlyReport extends Component {

  constructor() {
    super()
    var today = new Date();
    var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    var month = today.getMonth() + 1;

    this.state = {
      month: month,
      companyId: companyId,
      companyName: companyName,
      totalSubTotal: '0',
      totalBalance: '0',
      data: [],
      columns: [],
      site: GetCurrentSite(),

    };



  }

  BackbtnFunc() {
    var planName = CryptoJS.AES.decrypt(localStorage.getItem("PlanName"), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    //	 alert("plantype"+planName);
    if (planName.toLowerCase() == "basic") {

      ReactDOM.render(
        <Router>
          <div >
            <Route exact path="/" component={ReportMenuPageBasic} />

          </div>
        </Router>, document.getElementById('contentRender'));
      registerServiceWorker();
    }
    else if (planName.toLowerCase() == "premium") {

      ReactDOM.render(
        <Router>
          <div >
            <Route exact path="/" component={ReportMenuPagePremium} />

          </div>
        </Router>,
        document.getElementById('contentRender'));
      registerServiceWorker();
    }
    else if (planName.toLowerCase() == "elite") {


      ReactDOM.render(
        <Router>
          <div >
            <Route exact path="/" component={ReportMenuPage} />

          </div>
        </Router>,
        document.getElementById('contentRender'));
      registerServiceWorker();
    }

  }



  componentDidMount() {
    window.scrollTo(0, 0);
    $(".btn-default").css("background-color", "#05a4b5");
    $(".btn-default").css("color", "white");
    $("#companyname").hide();
    $("#reportheader").hide();
    $("#nodata").hide();
    $("#tableHeadings").hide();
    $("#totalSale").hide();
    var self = this;

    self.state.data = [];
    self.setState({
      data: self.state.data,
    })

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        month: this.state.month,
        companyId: this.state.companyId,
        empSites: GetEmployeeSite()
      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/SalesReport/MonthlySalesReport",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {

        console.log("SALES MONTHLY :",data);
        self.state.toweData=data.toweResponse;
        dataList = data.monthlySalesList;
        saledataList = data.saleinvoicedetailedlist;
        self.handleSite(self.state.site);

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

  GetColumns() {

    return Object.keys(this.state.data[0]).map(key => {

      return {
        Header: key,
        accessor: key,

      };

    });
  }

/*   printdiv(printarea) {
    var originalContents = document.body.innerHTML;
    $("#test-table-xls-button").hide();
    $("#backbutton").hide();
    $("#print").hide();

    $("#sidebar").hide();
    $("#navbar_company_name").hide();


    $("#companyname").show();
    $("#reportheader").show();
    $("#companyHeader").hide();
    $("#reportHeader").hide();

    window.print(originalContents);
    $("#sidebar").show();
    $("#navbar_company_name").show();
    $("#backbutton").show();
    $("#print").show();
    $("#test-table-xls-button").show();

    $("#companyname").hide();
    $("#reportheader").hide();
    $("#companyHeader").show();
    $("#reportHeader").show();

    // $(w.document.body).html(html);

  } */
  handleSite = (e) => {
    this.handleSite = this.handleSite.bind(this);
    this.state.site = e.toString();
    console.log("e ", this.state.site);
    this.setState({
      site: e.toString()
    });
    console.log("e ", dataList, e.toString());
    var result = FilterOptions(dataList, this.state.site);
    var saleResult = FilterOptions(saledataList, this.state.site);
    this.RendData(result, saleResult);
  }
  RendData(result, saleResult) {
    var no;
    var self = this;
    self.state.data = [];
    if (result.length != 0) {
    
      var ivalue = 0;
      $.each(result, function (i, item) {

        console.log("INVOICE NO :",item.invoiceNo);
        
        no = parseInt(i) + 1;
        // tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + no + '</td><td>' + item.invoiceNo + '</td><td>' + item.date + '</td><td>' + item.userName + '</td><td>' + item.contact + '</td>'
        // +'<td>'+item.status+'</td><td>'+item.subtotal1+'</td><td>'+item.balanceAmt+'</td></tr></tbody>';

        self.state.totalSubTotal = Number(self.state.totalSubTotal) + Number(item.subtotal1);
        self.state.totalBalance = Number(self.state.totalBalance) + Number(item.balanceAmt);

        self.setState({
          totalSubTotal: self.state.totalSubTotal,
          totalBalance: self.state.totalBalance,
        })

       

        if (self.state.toweData == "DataExist") {
                    
          self.state.data[i] = {
           "SNo": no,
          "Invoice": item.invoiceNo,
          "Date": item.date,
          "Name": item.userName,
          "Contact": item.contact,
          "Status": item.status,
          "Total": item.subtotal1,
          "Balance(+Tax)": item.balanceAmt,
            "Dealer": item.dealer,
            "From": item.fromAddress,
            "To": item.toAddress,
            "Remark": item.remark,
            "Site": item.site,
          };


        }else{
        self.state.data[i] = {
          "SNo": no,
          "Invoice": item.invoiceNo,
          "Date": item.date,
          "Name": item.userName,
          "Contact": item.contact,
          "Status": item.status,
          "Total": item.subtotal1,
          "Balance(+Tax)": item.balanceAmt,
          "Site": item.site
        };
      }
        ivalue = i;

      });

      self.state.data[Number(ivalue) + 1] = {
        "SNo": "",
        "Invoice": "",
        "Date": "",
        "Name": "",
        "Contact": "",
        "Status": "",
        "Total": <div style={{ fontWeight: "600" }}>{"Total Amount"}</div>,
        "Balance(+Tax)": <div style={{ fontWeight: "600" }}>{self.state.totalSubTotal}</div>
      };

      self.state.data[Number(ivalue) + 2] = {
        "SNo": "",
        "Invoice": "",
        "Date": "",
        "Name": "",
        "Contact": "",
        "Status": "",
        "Total": <div style={{ fontWeight: "600" }}>{"Balance Amount"}</div>,
        "Balance(+Tax)": <div style={{ fontWeight: "600" }}>{self.state.totalBalance}</div>
      };

      // $("#tableHeadings").append(tab);
      $(".customerId").hide();
      self.state.columns = self.GetColumns();
    } else {
      $("#nodata").show();
      $("#totalSale").hide();
      $("#test-table-xls-button").hide();
    }
    if (saleResult.length != 0) {
      var tab = '<thead><tr class="headcolor">'
        + '<th>Invoice No</th><th>Customer Name</th><th>GSTIN</th><th>Invoice Date</th>'
        + '<th>Invoice Value</th><th>TAX Rate(%)</th><th>Taxable Value</th><th>CENTRAL TAX</th>'
        + '<th>STATE TAX</th><th>IGST</th><th>Payment Mode</th></tr></thead>';

      $.each(saleResult, function (i, item) {
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
    self.setState({
      data: self.state.data,
      columns: self.state.columns
    });
  }
  printdiv() {
    var originalContents = document.body.innerHTML;
    
    $(".repot_headercls").hide();
    $(".buttonright_report").hide();
    $("#test-table-xls-button").hide();
    $(".pro-sidebar").hide();

    //.pro-sidebar

    window.print(originalContents);
    $(".repot_headercls").show();
    $(".buttonright_report").show();
    $("#test-table-xls-button").show();
    $(".pro-sidebar").show();
   
}

 
  render() {
    const downloadButtonData = <Invoice_xlDownldBtn />
    
    return (


      <div class="container">
<div className="repot_headercls">
                    <div class=" ">
                    <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
                    </div>
                    <div class="report_card_header">
                        {/* <h3 id="companyHeader"> {this.state.companyName}</h3> */}
                        <h3 >Sales  Monthly Report</h3>
                    </div>
                    <div className="report_reactIcon_Dcls"> 
                    <button type="button" style={{marginTop:"10px", border: "1px solid #ddd"}} id="print" class="btn btn-default btn_rpt_print"
                            onClick={() => this.printdiv('printarea')} >
                            <i class="fa fa-print" aria-hidden="true"
                                style={{ fontSize: "17px", border: "none" }}> Print</i></button>
                                 <ReactHTMLTableToExcel
                                id="test-table-xls-button1"
                                className="download-table-xls-button1"
                                table="tableHeadings"
                                filename="SalesMonthly_List"
                                sheet="tablexls"
                                buttonText={downloadButtonData}
                            />
                    </div>
                </div>
                <div className="" id="printarea">
                   

                    <div className="repot_sub_dwldbtn_cls">
                        <div class="text-right_report mt-bot">
                            <SiteDropDown onSiteDropDown={this.handleSite} data={this.state.site} />
                        </div>
                    </div>

   {/*      <div class="">
          <div class="row" style={{ marginTop: "13px" }}>

            <div class="col-sm-4 ">
              <ul class="previous disabled" id="backbutton"
                style={{
                  backgroundColor: "#05a4b5", color: "white",
                  float: "none",
                  display: "inline-block",
                  marginLeft: "5px",
                  borderRadius: "5px",
                  padding: "3px 7px 3px 7px"
                }}>
                <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></ul>

            </div>

            <div class="col-sm-4 ">
              <div class="card-header">
                <h3 id="companyHeader" style={{ marginLeft: "150px" }}> {this.state.companyName}</h3>

                <h4 id="reportHeader" style={{ marginLeft: "130px" }}>Sales Monthly Report</h4>


              </div>
            </div>

            <div class="col-sm-4 ">
              <div class="row">
                <div class="col-sm-3 pull-right">   <button type="button" id="print" class="btn btn-default " onClick={() => this.printdiv('printarea')} ><i class="fa fa-print" aria-hidden="true" style={{ fontSize: "17px", border: "none" }}> Print1</i></button>
                </div>
                <div class="col-sm-3 pull-right">
                </div>   </div>
            </div>    </div> */}



          <div id="printarea">
            <div style={{ display: "grid" }}>
              <div class="row" id="totalSale">
                <div class="col-lg-8 col-md-8 text-right">
                </div>
                <div class="col-lg-4 col-md-4 text-right">

                  <div class="table-responsive">
                    <table class="table table-bordered">
                      <tbody><tr>
                        <th style={{ width: "30%" }}>Total Amount:</th>
                        <td style={{ width: "30%", color: "red", textAlign: "left" }}>₹ <span style={{ color: "red", textAlign: "left" }} id="ContentPlaceHolder1_lbl_subtotal">{this.state.totalSubTotal}</span></td>
                      </tr>
                        <tr>
                          <th style={{ width: "30%" }}>Balance Amount:</th>
                          <td style={{ width: "30%", color: "red", textAlign: "left" }}>₹ <span style={{ color: "red", textAlign: "left" }} id="ContentPlaceHolder1_lbl_subtotal">{this.state.totalBalance}</span></td>
                        </tr>
                      </tbody></table>


                  </div>
                </div>
              </div>
            </div>

            <ReactTable 
              data={this.state.data}
              columns={this.state.columns}
              noDataText="No Data Available"
              filterable={true}
              defaultPageSize={10}
              className="-striped -highlight reactTable_cls"
              defaultFilterMethod={(filter, row, column) => {
                const id = filter.pivotId || filter.id;
                return row[id] !== undefined
                  ? String(row[id])
                    .toLowerCase()
                    .indexOf(filter.value.toLowerCase()) !== -1
                  : true;
              }}
              showPaginationTop={true}
              showPaginationBottom={false}
              getTdProps={this.onRowClick}

            />

            <div id="tableOverflow">
              <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">

              </table>
            </div>
            <br />

          </div>

        </div>
      </div>

    );
  }
}

export default SalesMonthlyReport;