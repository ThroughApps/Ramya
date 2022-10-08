import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from '../registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
// import 'sweetalert2/src/sweetalert2.scss';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
import ReactTable from "react-table";
import "react-table/react-table.css";
//import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import _ from 'underscore';
import SelectSearch from 'react-select';
import RazorPay from './RazorPay';

import * as FaIcons from "react-icons/fa";
import * as GiIcons from 'react-icons/gi';
import ReactTooltip from 'react-tooltip';

import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import CustomerInvoicePay from './CustomerInvoicePay';
import { CustomerInvoiceIcons } from '../ServiceRegistration/IconComponents';
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";
import Case from "case";
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from '../ConstSiteFunction';
var numberToWord = require('npm-number-to-word');

export default class CustomerInvoiceCopy extends Component {

    constructor(data) {
        super(data)

        this.state = {


        }

        this.PopulateViewData = this.PopulateViewData.bind(this);

    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }


    PopulateViewData(currentInvoiceArray,bankDetailsArray) {


        this.state.currentInvoiceArray = currentInvoiceArray;
        this.state.bankDetailsArray=bankDetailsArray;

        this.setState({
            currentInvoiceArray: this.state.currentInvoiceArray,
            bankDetailsArray:this.state.bankDetailsArray,
        })
        console.log("CURRENT INVOICE ARRAY ON PopulateViewData :", currentInvoiceArray);
        console.log("CURRENT INVOICE ARRAY ON PopulateViewData BANK DETAILS :", bankDetailsArray);
       
        var self = this;


        self.state.companyAddress = currentInvoiceArray[0].companyAddress;
        self.state.companyName = currentInvoiceArray[0].companyName;
        self.state.companyEmail = currentInvoiceArray[0].companyEmail;
        self.state.companyGstinNo = currentInvoiceArray[0].companyGstinNo;
        self.state.companyContactNo = currentInvoiceArray[0].companyContactNo;


        self.state.customerName = currentInvoiceArray[0].customerName;
        self.state.customerContactNo = currentInvoiceArray[0].contactNo;
        self.state.customerGstinNo = currentInvoiceArray[0].gstNo;
        self.state.customerEmail = currentInvoiceArray[0].emailId;
        self.state.customerAddress = currentInvoiceArray[0].address;


        self.state.invoiceNo = currentInvoiceArray[0].invoiceNo;
        self.state.invoiceDate = currentInvoiceArray[0].invoiceDate;

        self.state.doorNo = currentInvoiceArray[0].doorNo;
        self.state.floor = currentInvoiceArray[0].floor;
        self.state.place = currentInvoiceArray[0].place;
        self.state.street = currentInvoiceArray[0].street;
        self.state.state = currentInvoiceArray[0].state;

        self.state.bankName = bankDetailsArray[0].bankName;
        self.state.accountNo = bankDetailsArray[0].accountNo;
        self.state.branchName = bankDetailsArray[0].branchName;
        self.state.ifscCode = bankDetailsArray[0].ifscCode;
        self.state.accountName = bankDetailsArray[0].accountName;

        self.state.vehicleNo = currentInvoiceArray[0].vehicleNo;
        self.state.vehicleMake = currentInvoiceArray[0].vehicleMake;
        self.state.vehicleModel = currentInvoiceArray[0].vehicleModel;
        self.state.vehicleFuelType = currentInvoiceArray[0].vehicleFuelType;
        self.state.bookingId = currentInvoiceArray[0].bookingId;


        this.PopulateTableData(currentInvoiceArray);

    }

    componentDidMount() {
        SetCurrentPage("CustomerInvoiceCopy");
        this.props.onRef(this);

        var self = this;

        console.log("INVOICE COPY THIS.PROPS :", this.props);
        console.log("THIS.PROPS :", this.props.currentInvoiceArray);

        if (this.props.currentInvoiceArray != undefined) {
            this.PopulateViewData(this.props.currentInvoiceArray,this.props.bankDetailsArray);
        }

    }

    PopulateTableData(currentInvoiceArray) {

        //  alert("PopulateTableData");

        var no;
        var self = this;
        var tab;

        console.log("this.state.currentInvoiceArray :", currentInvoiceArray);

        $.each(currentInvoiceArray, function (i, item) {
            //    console.log("i :",i);

            no = parseInt(i + 1);

            if (item.productName != null) {
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
                if (item.quantity == 0) {
                    self.state.quantity = "-";
                } else {
                    self.state.quantity = item.quantity;
                }
                self.setState({
                    quantity: self.state.quantity,
                })
                // var sample=(10000000).toLocaleString();
                // alert(sample);
                var total = ((item.total)).toLocaleString();
                var prefinalAmount = ((item.prefinalAmount)).toLocaleString();
                var amount = ((item.finalAmount)).toLocaleString();
                var discountAmount = ((item.discountAmount)).toLocaleString();
                var rate = ((item.rate)).toLocaleString();
                var tax = Number(((0.01 * Number(item.cgstPercentage)) * Number(item.total))) + Number(((0.01 * Number(item.sgstPercentage)) * Number(item.total)))

                tab += '<tr><td>' + no + '</td><td>' + item.productName + '</td><td>' + Case.capital(item.productType) + '</td><td>' + rate + '</td><td>' + self.state.quantity + '</td>'
                    + '<td>' + total + '</td><td>' + item.discountPercentage + '</td><td>' + discountAmount + '</td>'
                    + '<td>' + prefinalAmount + '</td><td>' + item.cgstPercentage + '</td><td>' + item.sgstPercentage + '</td>'
                    + '<td>' + amount + '</td><td>' + item.serviceBy + '</td></tr>';
            }
        })

        $("#producttable").append(tab);


        var SubtotalwithoutGst = ((Number(currentInvoiceArray[0].subTotal)) - (Number((currentInvoiceArray[0].gstAmount)))).toLocaleString();

        this.state.subTotal = SubtotalwithoutGst;
        this.state.totalGst = currentInvoiceArray[0].gstAmount;
        this.state.totalAmount = currentInvoiceArray[0].subTotal;
        this.state.paidAmount = currentInvoiceArray[0].amountPaid;
        this.state.discount = currentInvoiceArray[0].discount;
        this.state.balance = currentInvoiceArray[0].dueAmount;


        var numtoword = numberToWord(Number(this.state.totalAmount) - Number(this.state.discount));


        // $("#numWords").text(Case.capitale(numtoword));
        // $("#numWords").text((numtoword));
        this.state.amountInWords = Case.capital(numtoword);

        this.setState({
            subTotal: this.state.subTotal,
            totalGst: this.state.totalGst,
            totalAmount: this.state.totalAmount,
            paidAmount: this.state.paidAmount,
            discount: this.state.discount,
            balance: this.state.balance,

        })

    }


    render() {

        return (

            <div class="container">

                <div class="container" >
                    <div class="row" style={{ marginTop: "13px" }}>


                        <div class="col-sm-4 ">
                            <h3 style={{ textAlign: "center", marginTop: "8px" }}>GST Invoice</h3>

                        </div>

                        <div class="col-sm-4">
                            {/*  <div class="row">

                            <div class="col-sm-3 pull-right">
                                <button type="button" id="print" class="btn btn-default " onClick={() => this.printdiv('dropHere')}  ><i class="fa fa-print" aria-hidden="true" style={{ fontSize: "17px", border: "none" }}> Print1 </i></button>

                            </div>
                            <div class="col-sm-3 pull-right">
                                <button type="button" id="print2" class="btn btn-default " onClick={() => this.PrintFunc()}  ><i class="fa fa-print" aria-hidden="true" style={{ fontSize: "17px", border: "none" }}> Print2 </i></button>
                            </div>
                            <div class="col-sm-3 pull-right">
                                <button type="button" id="print2" class="btn btn-default " onClick={() => this.Print4Func()}  ><i class="fa fa-print" aria-hidden="true" style={{ fontSize: "17px", border: "none" }}> Print 4 </i></button>
                            </div>
                        </div>  */}
                        </div>
                    </div>
                    <div id="dropHere" style={{ fontSize: "12px", margin: "0" }} class="card">

                        <div class="card-body">

                            <div class="row">

                                <div class="col-lg-12 m-b-3">

                                </div>


                            </div>

                            {/* *************CUSTOMER DETAILS ********************* */}
                            <div class="row ">
                                <div class="col-sm-4 invoice-col pull-left" style={{ marginTop: "32px" }}> To
         <address>     <strong>
                                        <b>  <span id="ContentPlaceHolder1_lbl_customer_name">{this.state.customerName}</span></b></strong><br />
                                        <b>Phone:</b>  <span id="ContentPlaceHolder1_lbl_customer_contact">{this.state.customerContactNo}</span> <br />

                                       {/* <b>Vehicle No:</b><span id="ContentPlaceHolder1_lbl_customer_vehicleNo">{this.state.vehicleNo}</span><br />
                                        <b>Vehicle Make:</b><span id="ContentPlaceHolder1_lbl_customer_vehicleMake">{this.state.vehicleMake}</span><br />
                                        <b>Vehicle Model:</b><span id="ContentPlaceHolder1_lbl_customer_vehicleModel">{this.state.vehicleModel}</span><br />
                                        <b>Vehicle FuelType:</b><span id="ContentPlaceHolder1_lbl_customer_vehicleFuelType">{this.state.vehicleFuelType}</span><br />
                                        <b>Booking ID:</b>  <span id="ContentPlaceHolder1_lbl_customer_bookingId">{this.state.bookingId}</span> <br />
                                        */}
                                        <b>GST no:</b> <span id="ContentPlaceHolder1_lbl_gst_no"></span>{this.state.customerGstinNo} <br />
                                        <b> Email:</b> <span id="ContentPlaceHolder1_lbl_email"></span>{this.state.customerEmail} <br />
                                        <span style={{ clear: "left", display: "inline-block" }} id="ContentPlaceHolder1_lbl_customer_address">{this.state.customerAddress}
                                        </span><br />

                                    </address>
                                </div>
                                {/* *************CUSTOMER DETAILS OVER ********************* */}

                                {/* *****************COMPANY DETAILS *****************************/}

                                <div class="col-sm-8 invoice-col text-right">

                                    <h4> <strong> <span style={{ lineHeight: "5pt" }} id="ContentPlaceHolder1_lbl_company_name">  {this.state.companyName}</span></strong></h4>

                                    <span style={{ fontSize: "12px", lineHeight: "5pt" }} >{this.state.doorNo}, {this.state.floor},</span><br />
                                    <span style={{ fontSize: "12px", lineHeight: "5pt" }}>{this.state.street},</span><br />
                                    <span style={{ fontSize: "12px", lineHeight: "5pt" }}>{this.state.place}, {this.state.state}</span><br />

                                    <b><span class="glyphicon glyphicon-phone"></span> <span>   </span></b>
                                    <span style={{ fontSize: "12px", lineHeight: "5pt" }} id="ContentPlaceHolder1_lbl_company_contact">
                                        {this.state.companyContactNo}  </span> <br />
                                    <b>GST No:</b>  <span style={{ fontSize: "12px", lineHeight: "5pt" }} > {this.state.companyGstinNo}</span><br />

                                    <b><span class="glyphicon glyphicon-envelope"></span></b>
                                    <span style={{ fontSize: "12px", lineHeight: "5pt" }} id="ContentPlaceHolder1_lbl_company_email">
                                        {this.state.companyEmail}</span> <br />

                                    {/****************** COMPANY DETAILS OVER *********************************/}

                                    {/* *************INVOICE BASIC DETAILS ********************************* */}
                                    <div style={{ paddingLeft: "50px" }} class=" invoice-col text-right pull-right" >
                                        <p></p>

                                        <div id="tableOverflow" class="table-responsive">
                                            <table class="table table-bordered">
                                                <tbody>

                                                    <tr>
                                                        <th>Invoice No</th>
                                                        <td style={{ textAlign: "left" }}>
                                                            <span id="ContentPlaceHolder1_lbl_order_no">{this.state.invoiceNo}</span></td>
                                                    </tr>

                                                    <tr>
                                                        <th >Invoice Date:</th>
                                                        <td style={{ textAlign: "left" }}>
                                                            <span id="ContentPlaceHolder1_lbl_invoice_date">{this.state.invoiceDate}</span></td>
                                                    </tr>
                                                    {/* <tr>
                                                    <th>Due Date:</th>
                                                    <td style={{ textAlign:"left" }}> <span id="ContentPlaceHolder1_lbl_due_date"></span></td>
                                                </tr> */}

                                                </tbody></table>
                                        </div>




                                    </div>
                                    {/* *************INVOICE BASIC DETAILS OVER ********************************* */}

                                </div>

                            </div>

                            <div >

                            </div>

                            {/* ************ INVOICE PRODUCT DETAILS **************************** */}
                            <div id="tableOverflow" class="table-responsive">
                                <div>

                                    <table class="table table-bordered" id="producttable">
                                        <thead id="ContentPlaceHolder1_ths" style={{ color: "black", backgroundColor: "white" }}>
                                            <tr>
                                                <th scope="col" style={{ width: "4%" }}>S No</th>
                                                <th scope="col" style={{ width: "20%" }}>Product</th>
                                                <th scope="col" style={{ width: "9%" }}>Product Type</th>
                                                <th scope="col">Rate </th>
                                                <th scope="col">Qty </th>
                                                <th scope="col" >Total </th>
                                                <th scope="col" >Discount %</th>
                                                <th scope="col">Discount $</th>
                                                <th scope="col">STotal</th>
                                                <th scope="col">Statetax %</th>
                                                <th scope="col">SGST %</th>
                                                <th scope="col" >Amount</th>
                                                <th scope="col" style={{ width: "10%" }}>Service By</th>

                                            </tr>
                                        </thead>

                                        <tbody>

                                        </tbody>

                                    </table>
                                </div>

                            </div>

                            {/* ************ INVOICE PRODUCT DETAILS OVER **************************** */}


                            {/* ************ INVOICE SUMMARY DETAILS **************************** */}

                            <div>

                                <div id="tableOverflow" class="table-responsive ">
                                    <table class="table table-bordered">
                                        <tbody><tr>
                                            <td style={{ textAlign: "left" }}>
                                                <b>Subtotal($):</b>
                                                <span id="ContentPlaceHolder1_lbl_subtotalwithoutGST">{this.state.subTotal} </span>
                                            </td>

                                            <td style={{ textAlign: "left" }}>
                                                <b>Total GST($):</b>
                                                <span id="ContentPlaceHolder1_lbl_total_gst">{this.state.totalGst} </span>
                                            </td>
                                            <td style={{ textAlign: "left" }}>
                                                <b>TotalAmount($):</b>
                                                <span id="ContentPlaceHolder1_lbl_subtotal">{this.state.totalAmount}</span>
                                            </td>


                                            <td style={{ textAlign: "left" }}>
                                                <b>Paid Amount($):</b>
                                                <span id="ContentPlaceHolder1_lbl_advance">{this.state.paidAmount}</span>
                                            </td>
                                            <td style={{ textAlign: "left" }}>
                                                <b>Discount($):</b>
                                                <span id="ContentPlaceHolder1_lbl_discount">{this.state.discount}</span>
                                            </td>
                                            <td style={{ textAlign: "left" }}>
                                                <b>Balance($):</b>
                                                <span id="ContentPlaceHolder1_lbl_balance">{this.state.balance}</span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>


                                </div></div>
                            {/* ************ INVOICE SUMMARY DETAILS OVER**************************** */}
                            <p></p>
                            <div class="col-md-12">
                                <div style={{ borderTop: "1px solid rgba(0,0,0,.1)", borderBottom: "1px solid rgba(0,0,0,.1)", padding: "5px" }}>
                                    <span ><b>Amount Chargeable In Words : </b><span id="numWords">{this.state.amountInWords}</span> Dollar Only</span>
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
                                    If you have any questions concerning this Invoice, contact <b> {this.state.companyContactNo} </b><br />
                                    Bank Details : {this.state.bankName}, Ac/No: {this.state.accountNo} IFSC Code: {this.state.ifscCode}<br />
                                    Thank you for your business!</span>
                            </div>
                        </div>
                    </div>
                </div >


            </div>

        )
    }



}
