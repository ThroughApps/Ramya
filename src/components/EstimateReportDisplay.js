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
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';

import PrintFormat from './PrintFormat';
//import 'jquery-printme.js';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import ChequePrintFormat from './ChequePrintFormat';
import EstimateList from './EstimateList';
import EstimatePrintFormat from './EstimatePrintFormat';
import { GetEmployeeSite, GetCurrentSite, GetSiteDetails, GetCurrencies, SetCurrentPage } from './ConstSiteFunction';
import InvoiceListMenuPage from './Invoice/InvoiceListMenuPage';
import { SiteCurrencySymbol } from './Invoice/CurrencyFormater';
import convert_to_words from '@amirsanni/number-to-words';


var balance;
var total;
var numberToWord = require('npm-number-to-word');


class EstimateReportDisplay extends Component {

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


        var doorNo = CryptoJS.AES.decrypt(localStorage.getItem('DoorNo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        var floor = CryptoJS.AES.decrypt(localStorage.getItem('Floor'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var street = CryptoJS.AES.decrypt(localStorage.getItem('Street'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var place = CryptoJS.AES.decrypt(localStorage.getItem('Place'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var state = CryptoJS.AES.decrypt(localStorage.getItem('State'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var landlineNo = CryptoJS.AES.decrypt(localStorage.getItem('LandlineNo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var feedbackNo = CryptoJS.AES.decrypt(localStorage.getItem('FeedbackNo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var bankName = CryptoJS.AES.decrypt(localStorage.getItem('BankName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var branchName = CryptoJS.AES.decrypt(localStorage.getItem('BranchName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var accountNo = CryptoJS.AES.decrypt(localStorage.getItem('AccountNo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var ifscCode = CryptoJS.AES.decrypt(localStorage.getItem('IfscCode'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var accountName = CryptoJS.AES.decrypt(localStorage.getItem('AccountName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var gstNo = CryptoJS.AES.decrypt(localStorage.getItem('GSTNo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        var area = CryptoJS.AES.decrypt(localStorage.getItem('Area'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var zipCode = CryptoJS.AES.decrypt(localStorage.getItem('Zipcode'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        if (companyName == "OMR ART PRINTER") {
            companyName = "FUTURE SIGN";

        }


        var id = props.id;
        this.state = {
            date: today1,
            companyId: companyId,
            companyName: companyName,
            companyAddress: companyAddress,
            companyEmail: companyEmail,
            contactNo: contactNo,
            gstNo: gstNo,
            doorNo: doorNo,
            floor: floor,
            street: street,
            place: place,
            state: state,
            area: area,
            zipCode: zipCode,
            landlineNo: landlineNo,
            feedbackNo: feedbackNo,
            bankName: bankName,
            branchName: branchName,
            accountNo: accountNo,
            ifscCode: ifscCode,
            accountName: accountName,
            siteName: this.props.siteName,
            currencySymbol: '',
            currencyCode: '',
            amountInWords: '',

        };
        this.setState({
            //   companyId: companyId,
        });

    }


    componentDidMount() {
        SetCurrentPage("EstimateReportDisplay");
        var siteCurrencyData = SiteCurrencySymbol(this.state.siteName);
        this.state.currencySymbol = siteCurrencyData.currencySymbol;
        this.state.currencyCode = siteCurrencyData.currencyCode;


        window.scrollTo(0, 0);



        this.GetOrderDetails();


        $("#ContentPlaceHolder1_lbl_invoice_no ").append(this.props.id);
        $("#ContentPlaceHolder1_lbl_status").append(this.props.status);
        $("#ContentPlaceHolder1_lbl_order_no").append(this.props.id);
        $("#ContentPlaceHolder1_lbl_balance").append(this.props.balanceAmt);
        // $("#ContentPlaceHolder1_lbl_discount").append(this.props.discount);
        $("#ContentPlaceHolder1_lbl_total").append(this.props.total);
        $("#ContentPlaceHolder1_lbl_customer_bookingId").append(this.props.bookingId);
        $("#ContentPlaceHolder1_lbl_customer_vehicleNo").append(this.props.vehicleRegistrationNo);
        //   $("#ContentPlaceHolder1_lbl_companyName").append(this.props.companyName);

        if (this.props.companyName == " " || this.props.companyName == null || this.props.companyName == "-") {
            $("#ContentPlaceHolder1_lbl_customer_name").append(this.props.userName);
        } else {
            $("#ContentPlaceHolder1_lbl_customer_name").append(this.props.companyName);
        }

        $(".btn-default").css("background-color", "#05a4b5");
        $(".btn-default").css("color", "white");
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
            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/SalesReport/DailyEstimateReportData",
            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {

                var tab;
                var count = data.length;

                var no;
                $.each(data, function (i, item) {
                    no = parseInt(i + 1);
                    if (item.product != null) {
                        if (item.serviceBy == null || item.serviceBy == " ") {
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
                        if (item.qty == 0) {
                            self.state.quantity = "-";
                        } else {
                            self.state.quantity = item.qty;
                        }
                        self.setState({
                            quantity: self.state.quantity,
                        })

                        tab += '<tr><td>' + no + '</td><td>' + item.product + '</td><td>' + Case.capital(item.productType) + '</td><td>' + item.rate + '</td><td>' + self.state.quantity + '</td>'
                            + '<td>' + item.sTotal + '</td><td>' + item.discountPercentage + '</td><td>' + item.discountAmount + '</td>'
                            + '<td>' + item.prefinalAmount + '</td>'
                            + '<td>' + item.serviceBy + '</td></tr>';
                    }
                })

                $("#producttable").append(tab);
                var inDate = new Date(data[0].invoiceDate);
                var duDate = new Date(data[0].dueDate);
                //   alert("invoicedate"+inDate)e
                //   var inDate=data[0].invoiceDate;
                var invoiceDate = inDate.getDate() + '-' + (inDate.getMonth() + 1) + '-' + inDate.getFullYear();
                var customerEmail = data[parseInt(count) - 1].email;
                var customerContactno = data[0].contact;
                var customerAddress = data[parseInt(count) - 1].address;
                var customerGstNo = data[parseInt(count) - 1].gstNo;
                console.log("customerGstNo", customerGstNo);
                var dueDate = duDate.getDate() + '-' + (duDate.getMonth() + 1) + '-' + duDate.getFullYear();
                var SubtotalwithoutGst = (Number(data[0].subtotal1));
                self.state.customerEmail = customerEmail;
                self.state.customerContactno = customerContactno;
                self.state.customerAddress = customerAddress;
                self.state.customerGstNo = customerGstNo;
                self.setState({
                    invoiceDate: self.state.invoiceDate,
                    customerEmail: self.state.customerEmail,
                    customerContactno:  self.state.customerContactno,                   
                    customerGstNo: self.state.customerGstNo,
                    dueDate: self.state.dueDate,
                    SubtotalwithoutGst: self.state.SubtotalwithoutGst,
                });
                // console.log("customerEmail", this.state.customerEmail);
                console.log("customerEmailself", self.state.customerEmail);

                // alert("SubtotalwithoutGst",+self.state.SubtotalwithoutGst);
                $("#ContentPlaceHolder1_lbl_invoice_date").append(invoiceDate);
                $("#ContentPlaceHolder1_lbl_due_date").append(dueDate);

                $("#ContentPlaceHolder1_lbl_customer_address").append(data[parseInt(count) - 1].address);
                $("#ContentPlaceHolder1_lbl_customer_contact").append(data[0].contact);
                $("#ContentPlaceHolder1_lbl_gst_no").append(data[parseInt(count) - 1].gstNo);
                $("#ContentPlaceHolder1_lbl_email").append(data[parseInt(count) - 1].email);

                $("#ContentPlaceHolder1_lbl_subtotal").append(data[0].subtotal1);
                var numtoword = numberToWord(Number(data[0].subtotal1));
                // $("#numWords").text(Case.capitale(numtoword));
                // $("#numWords").text((numtoword));
              //  $("#numWords").text(Case.capital(numtoword));
              self.state.amountInWords=Case.capital(convert_to_words(Number(data[0].subtotal1),self.state.currencyCode));


                $("#ContentPlaceHolder1_lbl_advance").append(data[0].advance);
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

        ReactDOM.render(<InvoiceListMenuPage data="EstimateInvoice" />, document.getElementById("contentRender"));
    }

    printdiv(dropHere) {
        var originalContents = document.body.innerHTML;
        $("#backbutton").hide();
        $("#print").hide();
        $("#print2").hide();
        $("#print3").hide();
        $(".pro-sidebar").hide();
        $("#navbar_company_name").hide();


        window.print(originalContents);
        $(".pro-sidebar").show();
        $("#navbar_company_name").show();
        $("#backbutton").show();
        $("#print").show();
        $("#print2").show();
        $("#print3").show();
        // $(w.document.body).html(html);

    }
    printData() {
        var divToPrint = document.getElementById("dropHere");

        var newWin = window.open("");
        newWin.document.write(divToPrint.outerHTML);
        newWin.print();
        newWin.close();
    }
    PrintFunc() {
        var data = {
            id: this.props.id,
            bookingId: this.props.bookingId,
            vehicleRegistrationNo: this.props.vehicleRegistrationNo,
            vehicleMake: this.props.vehicleMake,
            vehicleModel: this.props.vehicleModel,
            vehicleFuelType: this.props.vehicleFuelType,
            date: this.props.date,
            userName: this.props.userName,
            customerContactno: this.state.customerContactno,
            customerAddress: this.state.customerAddress,
            customerEmail: this.state.customerEmail,
            customerGstNo: this.state.customerGstNo,
            invoiceDate: this.props.invoiceDate,
            balanceAmt: this.props.balanceAmt,
            orderNumber: this.props.orderNumber,
            subtotal1: this.props.subtotal1,
            customerId: this.props.customerId,
            companyName: this.props.companyName,
            status: this.props.status,
            // logo: this.state.logo,
            logo: this.state.image,
            qrCode: this.state.qrCode,
        }

        ReactDOM.render(<EstimatePrintFormat data={data} currencySymbol={this.state.currencySymbol} />, document.getElementById("contentRender"));
        registerServiceWorker();
    }


    render() {
        return (
            <div class="container" >
                <div className="">
                    <div className="" id="backbutton">
                        <Double_BackButtonComponent name={"EstimateList"} click={() => this.BackbtnFunc()} />
                    </div>
                    <div className="inv_HeaderCls">
                        <h3>Estimate Invoice </h3>
                    </div>

                </div>
                <div id="dropHere" style={{ fontSize: "12px", margin: "0" }} class="card">
                    <div class="card-body">
                        <div class="pull-right">
                            <button type="button" id="print" class="btn btn-default " onClick={() => this.printdiv('dropHere')}  ><i class="fa fa-print" aria-hidden="true" style={{ fontSize: "17px", border: "none" }}> Print </i></button>
                            <button type="button" id="print2" class="btn btn-default " onClick={() => this.PrintFunc()}  ><i class="fas fa-eye" aria-hidden="true" style={{ fontSize: "17px", border: "none" }}> View </i></button>

                        </div>
                        <div class="row">
                            <div class="col-lg-12 m-b-3">
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-sm-6 invoice-col">
                            </div>
                            <div class="col-sm-6 invoice-col text-right">
                                <h4> <strong> <span style={{ lineHeight: "5pt" }} id="ContentPlaceHolder1_lbl_company_name">  {this.state.companyName}</span></strong></h4>
                                <span style={{ fontSize: "12px", lineHeight: "5pt" }} >{this.state.doorNo}, {this.state.floor},</span><br />
                                <span style={{ fontSize: "12px", lineHeight: "5pt" }}>{this.state.street},</span><br />
                                <span style={{ fontSize: "12px", lineHeight: "5pt" }}>{this.state.place}, {this.state.state}</span><br />
                                <b><span class="glyphicon glyphicon-phone"></span> <span>   </span></b>  <span style={{ fontSize: "12px", lineHeight: "5pt" }} id="ContentPlaceHolder1_lbl_company_contact">{this.state.contactNo}  </span> <br />
                                <b>Federaltax No:</b>  <span style={{ fontSize: "12px", lineHeight: "5pt" }} > {this.state.gstNo}</span><br />
                                <b><span class="glyphicon glyphicon-envelope"></span></b>  <span style={{ fontSize: "12px", lineHeight: "5pt" }} id="ContentPlaceHolder1_lbl_company_email">{this.state.companyEmail}</span>
                            </div>
                        </div>
                        <div >
                            <div class="row" >
                                <div class="col-sm-8 invoice-col pull-left"> To
         <address>     <strong>
                                        <b>  <span id="ContentPlaceHolder1_lbl_customer_name"></span></b></strong><br />
                                        {/*                           
              <b>BookingID:</b>  <span id="ContentPlaceHolder1_lbl_customer_bookingId"></span> <br />
         <b>VehicleNo:</b><span id="ContentPlaceHolder1_lbl_customer_vehicleNo"></span><br />
                                     */} <b>Phone:</b>  <span id="ContentPlaceHolder1_lbl_customer_contact"></span> <br />
                                        <b>Federaltax no:</b> <span id="ContentPlaceHolder1_lbl_gst_no"></span> <br />
                                        <b> Email:</b> <span id="ContentPlaceHolder1_lbl_email"></span> <br />
                                        <span style={{ clear: "left", display: "inline-block", maxWidth: "44ch" }} id="ContentPlaceHolder1_lbl_customer_address"></span><br />
                                        {/*   <b> Address:</b><span style={{float:"left",paddingLeft:"6%",clear:"left",display:"inline-block",maxWidth:"44ch"}} id="ContentPlaceHolder1_lbl_customer_address"></span><br />
                          
*/}
                                        {/*   <b> Address:</b> <span nowrap style={{maxWidth:"42ch", overflow: "hidden",wordWrap: "breakWord"}} id="ContentPlaceHolder1_lbl_customer_address">  </span><br />
                               
                                      {/*    <b> Address:</b>   <p style={{display:"inlineBlock",wordWrap: "breakWord", maxWidth: "44ch",fontStyle:"normal",lineHeight:"1.42857143",fontSize:"12px",fontFamily:"Poppins,sans-serif",color:"#333",fontWeight:"black"}} id="ContentPlaceHolder1_lbl_customer_address"><span></span></p><br />
  */}
                                    </address>
                                </div>
                                <div style={{ paddingLeft: "50px" }} class="col-sm-4 invoice-col text-right pull-right" >
                                    <p></p>
                                    <div id="tableOverflow" class="table-responsive">
                                        <table class="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <th>Invoice No</th>
                                                    <td style={{ textAlign: "left" }}><span id="ContentPlaceHolder1_lbl_order_no"></span></td>
                                                </tr>
                                                <tr>
                                                    <th >Invoice Date:</th>
                                                    <td style={{ textAlign: "left" }}><span id="ContentPlaceHolder1_lbl_invoice_date"></span></td>
                                                </tr>
                                                {/* <tr>
                                                    <th>Due Date:</th>
                                                    <td style={{ textAlign:"left" }}> <span id="ContentPlaceHolder1_lbl_due_date"></span></td>
                                                </tr> */}
                                            </tbody></table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="tableOverflow" class="table-responsive">
                            <div>
                                <table class="table table-bordered" id="producttable">
                                    <thead id="ContentPlaceHolder1_ths" style={{ color: "black", backgroundColor: "white" }}>
                                        <tr>
                                            <th scope="col" style={{ width: "2%" }}>S.No</th>
                                            <th scope="col" style={{ width: "26%" }}>Product</th>
                                            <th scope="col" style={{ width: "9%" }}>ProductType</th>
                                            <th scope="col">Rate</th>
                                            <th scope="col">Qty</th>
                                            <th scope="col" style={{ width: "10%" }}>Total</th>
                                            <th scope="col" >Discount%</th>
                                            <th scope="col">Discount {this.state.currencySymbol}</th>
                                            <th scope="col">FinalAmount</th>

                                            <th scope="col" style={{ width: "10%" }}>ServiceBy</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            <div id="tableOverflow" class="table-responsive ">
                                <table class="table table-bordered">
                                    <tbody><tr>


                                        <td style={{ textAlign: "left" }}>
                                            <b>TotalAmount ({this.state.currencySymbol}):</b>
                                            <span id="ContentPlaceHolder1_lbl_subtotal"> </span>
                                        </td>

                                        <td style={{ textAlign: "left" }}>
                                            <b>Paid Amount ({this.state.currencySymbol}):</b>
                                            <span id="ContentPlaceHolder1_lbl_advance"> </span>
                                        </td>
                                        <td style={{ textAlign: "left" }}>
                                            <b>Discount ({this.state.currencySymbol}):</b>
                                            <span id="ContentPlaceHolder1_lbl_discount"> </span>
                                        </td>
                                        <td style={{ textAlign: "left" }}>
                                            <b>Balance ({this.state.currencySymbol}):</b>
                                            <span id="ContentPlaceHolder1_lbl_balance"> </span>
                                        </td>

                                    </tr>
                                    </tbody></table>
                            </div></div>
                        <p></p>
                        <div class="col-md-12">
                            <div style={{ borderTop: "1px solid rgba(0,0,0,.1)", borderBottom: "1px solid rgba(0,0,0,.1)", padding: "5px" }}>
                                <span ><b>Amount Chargeable In Words : </b>{this.state.amountInWords}</span>
                            </div>
                            <div class="col-md-12 m-t-6">
                                <div class="row">
                                    <div class="col-md-7"></div>
                                    <div class="col-md-4 pull-right"></div>
                                    <div class="col-md-1"></div>
                                </div>
                            </div>
                            <div></div>
                            <div style={{ paddingTop: "50px", paddingBottom: "20px" }} class="col-md-12 m-t-6">
                                <div class="row">
                                    <div class="col-md-7"></div>
                                    <div id="providerSign" class="col-md-2 pull-right">Provider Sign</div>
                                    <div class="col-md-3" ></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 col-sm-12 col-lg-12" style={{ border: "0.2px ", borderStyle: "dotted", marginBottom: "5%" }}>
                            <span style={{ fontSize: "12px", position: "", left: "0", bottom: "0", width: "100%" }}
                            >Received By Make all cheque payable {this.state.companyName}<br />
                                If you have any questions concerning this Invoice, contact <b> {this.state.contactNo} </b><br />
                                Bank Details : {this.state.bankName}, Ac/No: {this.state.accountNo} IFSC Code: {this.state.ifscCode}<br />
                                Thank you for your business!</span>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
export default EstimateReportDisplay;
