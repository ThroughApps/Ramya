import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import $ from 'jquery';
import SalesDailyReport from './SalesDailyReport';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import registerServiceWorker from './registerServiceWorker';
import ReportMenuPage from './ReportMenuPage';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import Case from "case";
import InvoiceList from './InvoiceList';
import SalesReportDisplay from './SalesReportDisplay';
import r1 from './image/talogocolornodemcu.png';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
//import 'jquery-printme.js';
var balance;
var total;
var numberToWord = require('npm-number-to-word');


class ChequePrintFormat1 extends Component {

    constructor(props) {
        super(props)
        var today = new Date();
        var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        // this.state.companyId = companyId;
        var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var companyAddress = CryptoJS.AES.decrypt(localStorage.getItem('CompanyAddress'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var companyEmail = CryptoJS.AES.decrypt(localStorage.getItem('CompanyEmailId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var contactNo = CryptoJS.AES.decrypt(localStorage.getItem('ContactNo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)



        var id = props.id;
        this.state = {
            date: today1,
            companyId: companyId,
            companyName: companyName,
            companyAddress: companyAddress,
            companyEmail: companyEmail,
            contactNo: contactNo,

        };
        this.setState({
            //   companyId: companyId,
        });

    }
    BackbtnFunc() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={SalesReportDisplay} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }
    PrintFunc() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={ChequePrintFormat1} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }
    componentDidMount() {
    SetCurrentPage("chequeprint");

        document.getElementById('container').setAttribute("style", "backgroundColor:inherit");
       

        this.GetOrderDetails();
        var self = this;
        self.state.balanceAmt = this.props.balanceAmt;
        self.setState({
            balanceAmt: self.state.balanceAmt,
        })

        $("#ContentPlaceHolder1_lbl_invoice_no ").append(this.props.id);
        $("#ContentPlaceHolder1_lbl_status").append(this.props.status);
        //$("#ContentPlaceHolder1_lbl_order_no").append(this.props.id);
        $("#ContentPlaceHolder1_lbl_balance").append(this.props.balanceAmt);
        $("#ContentPlaceHolder1_lbl_total").append(this.props.total);

        if (this.props.companyName == " " || this.props.companyName == "null" || this.props.companyName == "-") {
            $("#ContentPlaceHolder1_lbl_customer_name").append(this.props.userName);
        } else {
            $("#ContentPlaceHolder1_lbl_customer_name").append(this.props.companyName);
        }

        $(".btn-default").css("background-color","#05a4b5");
        $(".btn-default").css("color","white");
    }






    GetOrderDetails() {

        var self = this;

      

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                date: this.props.date,
                id: this.props.id,
                companyId: this.state.companyId,
            }),
            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/SalesReport/DailySalesReportData",
            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {

                var tab = "";
                var count = data.length;
       
                var no; self.state.totalQty = 0;
                self.state.totalAmount = 0;
                self.state.totalFinalAmount = 0;
                //  subtotal_cgst=0;
                $.each(data, function (i, item) {
                    no = parseInt(i + 1);
                    if (item.product != null) {
                        if (item.serviceBy == null) {
                            self.state.serviceBy = "-";
                            self.setState({
                                serviceBy: self.state.serviceBy,
                            })
                        } else {
                            self.state.serviceBy = item.serviceBy;
                            self.setState({
                                serviceBy: self.state.serviceBy,
                            })
                        }

                        //             tab += '<tr style="font-size:12px,border:none"><td style="width:1px">' + no + '</td>'
                        //            +'<td style="width:30%,align:left">' + item.product + '</td><td>' + item.serviceBy + '</td><td></td><td>' + item.amount + '</td></tr>';

                        //             tab += '<tr style="font-size:12px,border:none"><td style="width:1px">' + no + '</td>'
                        //            +'<td style="width:30%,align:left">' + item.product + '</td><td>' + item.serviceBy + '</td><td></td><td>' + item.amount + '</td></tr>';

                      //  tab += '<span>' + no + item.product + "with" + item.serviceBy + "   " + item.amount + '</span><br />';

tab+='<div class="_2jf0Ty">'
+'<div class="_1QDRC6 _3yuGs2 _2aUcZk" data-qa="invoice-info" style=" display: flex, flex-direction: row, flex-grow: 1, align-items:center">'
+'<div class="wPHQml _3zkmVo" '
                 +'    style="display: flex", flexDirection: row, flexGrow: 1, alignItems: center">'
                  
                 +'     <div class="_45ZmlC" style=" display: flex, flex-direction: column, flex-grow: 1">'
                  
                 +'      <div class="_3i_Wbs" data-qa="top-note" style=" display: flex, flex-direction: row, flex-grow: 1">'
                  
                 +'          <div class="_9t1fKU _3CorbI">' + item.qty + ' item</div>'
                 +'           </div>'
                  
                 +'   <div class="_3R9kbA"  style=" display: flex, flex-direction: row, flex-grow: 1,width:100%">'
                 +'           <div class="_1TBL1e" style="display: flex, flex-direction: column, flex-grow: 1">'
                 +'                         <div class="_9t1fKU _3wn4GY _2k4Gw1" data-qa="row-button-primary">'
                 +'    <div class="_9t1fKU _1CyHRZ _1rsAPE" data-qa="invoice-fragment-name">'+ item.product+'</div>'
                 +'                         </div>'
                 +'     <div class="_9t1fKU _3CorbI" data-qa="row-button-secondary">'
                 +'                            <div class="_2_zyRt" data-qa="invoice-fragment-description">serviceBy'+item.serviceBy+'</div>'
                 +'                            </div></div>'
                 +'     <div class="_1gpTHM" style="display:flex, flex-direction: column, flex-shrink: 0, flex-grow:  1, justify-content: right,text-align:right">'
                 +'                                <div class="_9t1fKU _3wn4GY _2k4Gw1" data-qa="right-row-primary">'
                 +'                                    <div class="_9t1fKU _1CyHRZ _1rsAPE" data-qa="invoice-fragment-right-name">'
                 +'                                        <span style= "text-align:right">$ '+ item.amount+'</span></div></div></div></div></div></div></div>'
                 +'               </div><hr></hr>';
                      
                      
                      
                        self.state.totalAmount = Math.round(Number(self.state.totalAmount)) + Math.round(Number(item.sTotal));
                        self.state.totalQty = Math.round(Number(self.state.totalQty)) + Math.round(Number(item.qty));
                        self.state.totalcgst = item.totalcgst;
                        self.state.totalsgst = item.totalsgst;
                        self.state.totaligst = item.totaligst;
                        self.state.totalgst = item.totalGst;
                        self.state.totalFinalAmount = Math.round(Number(self.state.totalFinalAmount)) + Math.round(Number(item.amount));
                        self.state.advance = item.advance;
                        self.state.discount = item.discount;
                        self.state.subtotal1 = item.subtotal1;

                        self.setState({
                            totalQty: self.state.totalQty,
                            totalAmount: self.state.totalAmount,
                            totalcgst: self.state.totalcgst,
                            totalsgst: self.state.totalsgst,
                            totaligst: self.state.totaligst,
                            totalFinalAmount: self.state.totalFinalAmount,
                            advance: self.state.advance,
                            discount: self.state.discount,
                            subtotal1: self.state.subtotal1,
                            totalgst: self.state.totalgst,
                        })
                    }
                })


                $("#producttable").append(tab);
                var inDate = new Date(data[0].invoiceDate);
                var duDate = new Date(data[0].dueDate);
                //   alert("invoicedate"+inDate);
                //   var inDate=data[0].invoiceDate;
                var invoiceDate = inDate.getDate() + '-' + (inDate.getMonth() + 1) + '-' + inDate.getFullYear();
                var dueDate = duDate.getDate() + '-' + (duDate.getMonth() + 1) + '-' + duDate.getFullYear();

                var SubtotalwithoutGst = (Number(data[0].subtotal1)) - (Number((data[0].totalGst)));
                self.setState({
                    invoiceDate: self.state.invoiceDate,
                    dueDate: self.state.dueDate,
                    SubtotalwithoutGst: self.state.SubtotalwithoutGst,
                });


                // alert("SubtotalwithoutGst",+self.state.SubtotalwithoutGst);
                $("#ContentPlaceHolder1_lbl_invoice_date").append(invoiceDate);
                $("#ContentPlaceHolder1_lbl_due_date").append(dueDate);

                $("#ContentPlaceHolder1_lbl_customer_address").append(data[parseInt(count) - 1].address);
                $("#ContentPlaceHolder1_lbl_customer_contact").append(data[0].contact);
                $("#ContentPlaceHolder1_lbl_gst_no").append(data[parseInt(count) - 1].gstNo);
                $("#ContentPlaceHolder1_lbl_email").append(data[parseInt(count) - 1].email);

                $("#ContentPlaceHolder1_lbl_subtotal").append(data[0].subtotal1);
                var numtoword = numberToWord(Number(data[0].subtotal1));
                $("#numWords").text(Case.capital(numtoword));
                $("#ContentPlaceHolder1_lbl_total_gst").append(data[0].totalGst);
                $("#ContentPlaceHolder1_lbl_adjustment").append(data[0].advance);
                $("#ContentPlaceHolder1_lbl_discount").append(data[0].discount);
                $("#ContentPlaceHolder1_lbl_word").text(Case.capital(numberToWord(data[0].subtotal1)));
                $("#ContentPlaceHolder1_lbl_subtotalwithoutGST").append(SubtotalwithoutGst);
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

    BackbtnFunc() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={InvoiceList} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }

    printdiv(dropHere) {
        var originalContents = document.body.innerHTML;
        $("#backbutton").hide();
        $("#print").hide();

        $("#sidebar").hide();
        $("#navbar_company_name").hide();


        window.print(originalContents);
        $("#sidebar").show();
        $("#navbar_company_name").show();
        $("#backbutton").show();
        $("#print").show();
        // $(w.document.body).html(html);

    }
    printData() {
        var divToPrint = document.getElementById("dropHere");

        var newWin = window.open("");
        newWin.document.write(divToPrint.outerHTML);
        newWin.print();
        newWin.close();
    }


    render() {
        return (
            <div class="container" id="container" >
                
                <div class="row" style={{marginTop:"13px"}}>
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
                            <div class="col-sm-3 " >
                                <button type="button" id="print" class="btn btn-default " onClick={() => this.printdiv('dropHere')}  ><i class="fa fa-print" aria-hidden="true" style={{ fontSize: "17px", border: "none" }}> Print </i></button>
                            </div>
                            <div class="col-sm-3 pull-right">
                            </div>   </div>
                    </div>    </div>

                <div id="dropHere">
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }} >
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ fontWeight: "500", fontSize: "20px", lineHeight: "24px", marginBottom: "4px" }}><span id="ContentPlaceHolder1_lbl_customer_name"></span></div>
                            <div style={{ color: "#67768c", fontWeight: "400", fontSize: "14px", lineHeight: "18px", marginTop: "4px" }}><span id="ContentPlaceHolder1_lbl_customer_contact"></span></div>

                            <div style={{ fontWeight: "500", fontSize: "20px", lineHeight: "24px", marginBottom: "4px", marginTop: "18px" }}>Invoice <span id="ContentPlaceHolder1_lbl_invoice_no"></span></div>
                            <div style={{ color: "#67768c", fontWeight: "400", fontSize: "14px", lineHeight: "18px", marginTop: "4px" }}><span id="ContentPlaceHolder1_lbl_invoice_date"></span></div>
                        </div>
                    </div>
                    <div id="producttable"></div>
                  
                    <div class="_2jf0Ty">
                        <div class="_1QDRC6 _3yuGs2 _2aUcZk" data-qa="invoice-subtotal" style={{ display: "flex", flexDirection: "row", flexGrow: "1", alignItems: "center" }}>
                            <div class="wPHQml _3zkmVo" style={{ display: "flex", flexDirection: "row", flexGrow: "1", alignItems: "center" }}>
                                <div class="_45ZmlC" style={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
                                    <div class="_3R9kbA" style={{ display: "flex", flexDirection: "row", flexGrow: "1" }}>
                                        <div class="_1TBL1e" style={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
                                            <div class="_9t1fKU _3wn4GY _2k4Gw1" data-qa="row-button-primary" >
                                                <div class="_9t1fKU _1CyHRZ _1rsAPE" data-qa="invoice-fragment-name">Total Amount After Tax$</div>
                                            </div><div class="_9t1fKU _3CorbI" data-qa="row-button-secondary">
                                                <div class="_2_zyRt" data-qa="invoice-fragment-description"></div>
                                            </div></div>
                                        <div class="_1gpTHM" style={{ display: "flex", flexDirection: "column", flexShrink: "0", flexGrow: " 1", justifyContent: "center",textAlign:"right"}}>
                                            <div class="_9t1fKU _3wn4GY _2k4Gw1" data-qa="right-row-primary">
                                                <div class="_9t1fKU _1CyHRZ _1rsAPE" data-qa="invoice-fragment-right-name">
                                                    <span>${this.state.totalFinalAmount}.00</span></div></div></div></div></div></div></div></div>
                                           
                                                    <div class="_2jf0Ty">
                        <div class="_1QDRC6 _3yuGs2 _2aUcZk" data-qa="invoice-subtotal" style={{ display: "flex", flexDirection: "row", flexGrow: "1", alignItems: "center" }}>
                            <div class="wPHQml _3zkmVo" style={{ display: "flex", flexDirection: "row", flexGrow: "1", alignItems: "center" }}>
                                <div class="_45ZmlC" style={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
                                    <div class="_3R9kbA" style={{ display: "flex", flexDirection: "row", flexGrow: "1" }}>
                                        <div class="_1TBL1e" style={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
                                            <div class="_9t1fKU _3wn4GY _2k4Gw1" data-qa="row-button-primary" >
                                                <div class="_9t1fKU _1CyHRZ _1rsAPE" data-qa="invoice-fragment-name">Paid Amount$</div>
                                            </div><div class="_9t1fKU _3CorbI" data-qa="row-button-secondary">
                                                <div class="_2_zyRt" data-qa="invoice-fragment-description"></div>
                                            </div></div>
                                        <div class="_1gpTHM" style={{ display: "flex", flexDirection: "column", flexShrink: "0", flexGrow: " 1", justifyContent: "center" }}>
                                            <div class="_9t1fKU _3wn4GY _2k4Gw1" data-qa="right-row-primary">
                                                <div class="_9t1fKU _1CyHRZ _1rsAPE" data-qa="invoice-fragment-right-name">
                                                    <span>${this.state.advance}.00</span></div></div></div></div></div></div></div></div>

                                                    <div class="_2jf0Ty">
                        <div class="_1QDRC6 _3yuGs2 _2aUcZk" data-qa="invoice-subtotal" style={{ display: "flex", flexDirection: "row", flexGrow: "1", alignItems: "center" }}>
                            <div class="wPHQml _3zkmVo" style={{ display: "flex", flexDirection: "row", flexGrow: "1", alignItems: "center" }}>
                                <div class="_45ZmlC" style={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
                                    <div class="_3R9kbA" style={{ display: "flex", flexDirection: "row", flexGrow: "1" }}>
                                        <div class="_1TBL1e" style={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
                                            <div class="_9t1fKU _3wn4GY _2k4Gw1" data-qa="row-button-primary" >
                                                <div class="_9t1fKU _1CyHRZ _1rsAPE" data-qa="invoice-fragment-name">Balance$</div>
                                            </div><div class="_9t1fKU _3CorbI" data-qa="row-button-secondary">
                                                <div class="_2_zyRt" data-qa="invoice-fragment-description"></div>
                                            </div></div>
                                        <div class="_1gpTHM" style={{ display: "flex", flexDirection: "column", flexShrink: "0", flexGrow: " 1", justifyContent: "center",textAlign:"center" }}>
                                            <div class="_9t1fKU _3wn4GY _2k4Gw1" data-qa="right-row-primary">
                                                <div class="_9t1fKU _1CyHRZ _1rsAPE" data-qa="invoice-fragment-right-name">
                                                    <span>${this.state.subtotal1}.00</span></div></div></div></div></div></div></div></div>
{/* tab +=*/}
{/* <div class="_2jf0Ty">
    <div class="_1QDRC6 _3yuGs2 _2aUcZk" data-qa="invoice-info" 
   style={{ display: "flex", flexDirection: "row", flexGrow: "1", alignItems: "center" }}
    ><div class="wPHQml _3zkmVo" 
   style={{ display: "flex", flexDirection: "row", flexGrow: "1", alignItems: "center" }}>
       <div class="_45ZmlC" style={{ display: "flex", flexDirection: "column", flexGrow: "1"}}>
           <div class="_3i_Wbs" data-qa="top-note"
           style={{ display: "flex", flexDirection: "row", flexGrow: "1" }}>
               <div class="_9t1fKU _3CorbI">1 item</div>
               </div><div class="_3R9kbA"
              style={{ display: "flex", flexDirection: "row", flexGrow: "1" }}>
                  <div class="_1TBL1e" 
                  style={{ display: "flex", flexDirection: "column", flexGrow: "1"}}>
                      <div class="_9t1fKU _3wn4GY _2k4Gw1" data-qa="row-button-primary" 
                    ><div class="_9t1fKU _1CyHRZ _1rsAPE" data-qa="invoice-fragment-name">Blow Dry</div>
                    </div><div class="_9t1fKU _3CorbI" data-qa="row-button-secondary">
                        <div class="_2_zyRt" data-qa="invoice-fragment-description">11:00am, 20 Feb 2020 with Amul J</div>
                        </div></div><div class="_1gpTHM" style={{ display: "flex", flexDirection: "column", flexShrink: "0", flexGrow: " 1", justifyContent: "center" }}>
                            <div class="_9t1fKU _3wn4GY _2k4Gw1" data-qa="right-row-primary">
                                <div class="_9t1fKU _1CyHRZ _1rsAPE" data-qa="invoice-fragment-right-name">
                                    <span>$25</span></div></div></div></div></div></div></div>
            </div> */}

                </div>

            </div >

        );
    }
}

export default ChequePrintFormat1;