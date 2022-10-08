import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';

//import './SalesReportDisplay.css';
import $ from 'jquery';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import registerServiceWorker from './registerServiceWorker';
import Case from "case";
import PurchaseInvoiceList from './PurchaseInvoiceList';
import PurchaseReportDisplay from './PurchaseReportDisplay';
// import r1 from './image/logo.png';
import r1 from './image/talogocolornodemcu.png';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
    GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
//import 'jquery-printme.js';
var balance;
var total;
var numberToWord = require('npm-number-to-word');


class PurchasePrintFormat1 extends Component {

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
        var companyLogo = CryptoJS.AES.decrypt(localStorage.getItem('CompanyLogo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

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
            companyLogo: companyLogo,
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
        };
        this.setState({
            //   companyId: companyId,
        });

    }
    BackbtnFunc() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={PurchaseReportDisplay} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }
    PrintFunc() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={PurchasePrintFormat1} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }
    componentDidMount() {
        SetCurrentPage("PurchasePrintFormat");

        $(".btn-default").css("background-color", "#05a4b5");
        $(".btn-default").css("color", "white");

        var fileName = this.state.companyLogo;
        let xhr = new XMLHttpRequest();

        xhr.open('POST', ' http://15.206.129.105:8080/ThroughBooksCOAPI/Login/downloadFile');
        xhr.setRequestHeader("Content-type", "application/json");
        var fileName = JSON.stringify({ "fileName": fileName })

        xhr.send(fileName);
        console.warn("dataToBackEnd", JSON.parse(fileName));

        xhr.responseType = 'blob';

        xhr.onload = function (e) {

            if (this.status == 200) {

                // var arrayBufferView = new Uint8Array( this.response );
                // var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                // var urlCreator = window.URL || window.webkitURL;
                // var imageUrl = urlCreator.createObjectURL( blob );
                // var img = document.querySelector( "#photo" );
                // img.src = imageUrl;

                var blob = new Blob([this.response], { type: 'image/pdf' });
                var urlCreator = window.URL || window.webkitURL;
                var imageUrl = urlCreator.createObjectURL(blob);
                var img = document.querySelector("#Image1");

                img.src = imageUrl;

                // img = new Image();
                // img.onload = function() {
                //     alert(img.width + " " + img.height);
                // };;

                let image_uri = { uri: blob };
                var BlobImage = URL.createObjectURL(blob);
                //          








                //      let a = document.createElement("a");
                //    a.style = "display: none";
                //      document.body.appendChild(a);

                //      let url = window.URL.createObjectURL(blob);
                //     a.href = url;

                //      a.download = 'MyFile.pdf';
                //      var jsonObj = JSON.parse(fileName);
                //    a.download = jsonObj.fileName;

                //      a.click();

                //      window.URL.revokeObjectURL(url);
            } else {

                alert("Network Error")
            }
        };

        document.getElementById('container').setAttribute("style", "backgroundColor:inherit");

        window.scrollTo(0, 0);

        this.GetOrderDetails();


        $("#ContentPlaceHolder1_lbl_invoice_no ").append(this.props.id);
        $("#ContentPlaceHolder1_lbl_status").append(this.props.status);
        $("#ContentPlaceHolder1_lbl_order_no").append(this.props.id);


        $("ContentPlaceHolder1_lbl_subtotal").append(this.props.subtotal1);
        if (this.props.companyName == " " || this.props.companyName == "null" || this.props.companyName == "-") {
            $("#ContentPlaceHolder1_lbl_customer_name").append(this.props.userName);
        } else {
            $("#ContentPlaceHolder1_lbl_customer_name").append(this.props.companyName);
        }


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
            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/PurchaseReport/DailyPurchaseReportData",
            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {



                var tab;
                var count = data.length;

                var no; self.state.totalQty = 0;
                self.state.totalAmount = 0;
                self.state.totalFinalAmount = 0;
                //  subtotal_cgst=0;
                $.each(data, function (i, item) {
                    no = parseInt(i + 1);
                    if (item.product != null) {



                        tab += '<tr><td style="padding: 0px 10px; font-size:9px;vertical-align: top;line-height:15px;text-align:center;">' + no + '</td>'
                            + '<td style=" padding: 0px 6px;font-size:9px;vertical-align:top;line-height:15px;text-align:left;">' + item.product + '</td>'
                            + '<td style="padding: 0px 25px;font-size:9px;vertical-align: top;line-height:15px;text-align:left;">' + item.rate + '</td>'
                            + '<td style="padding: 0px 43px; font-size:9px;vertical-align: top;line-height:15px;text-align:left;">' + item.qty + '</td>'
                            + '<td style="padding: 0px 0px;font-size:9px;vertical-align:top;line-height:15px;text-align:left;">' + item.total + '</td>'
                            + '<td style="font-size:9px;vertical-align:top;line-height:15px;text-align:left;">' + item.cgst + '</td><td style="padding: 0px 10px;font-size:9px;vertical-align:top;line-height:15px;text-align:left;">' + Math.round(((0.01 * Number(item.cgst)) * Number(item.total))) + '</td><td style="padding: 0px 6px; font-size:9px;vertical-align:top;line-height:15px;text-align:left;">' + item.sgst + '</td><td style="padding: 0px 20px;font-size:9px;vertical-align:top;line-height:15px;text-align:left;">' + Math.round(((0.01 * Number(item.sgst)) * Number(item.total))) + '</td>'
                            + '<td style="paddingLeft:21px;font-size:9px;vertical-align:top;line-height:15px;text-align:left;">' + item.amount + '</td></tr>';


                        self.state.totalAmount = Math.round(Number(self.state.totalAmount)) + Math.round(Number(item.total));
                        if (item.qty != "-") {
                            self.state.totalQty = Math.round(Number(self.state.totalQty)) + Math.round(Number(item.qty));

                        }

                        self.state.totalcgst = item.totalcgst;
                        self.state.totalsgst = item.totalsgst;
                        self.state.totaligst = item.totaligst;
                        self.state.totalgst = item.totalGst;
                        self.state.totalFinalAmount = Math.round(Number(self.state.totalFinalAmount)) + Math.round(Number(item.amount));
                        self.state.adjustment = item.adjustment;
                        self.state.shipping = item.shipping;
                        self.state.discount = item.discount;
                        self.state.subtotal1 = item.subtotal1;

                        self.setState({
                            totalQty: self.state.totalQty,
                            totalAmount: self.state.totalAmount,
                            totalcgst: self.state.totalcgst,
                            totalsgst: self.state.totalsgst,
                            totaligst: self.state.totaligst,
                            totalFinalAmount: self.state.totalFinalAmount,
                            adjustment: self.state.adjustment,
                            shipping: self.state.shipping,
                            discount: self.state.discount,
                            subtotal1: self.state.subtotal1,
                            totalgst: self.state.totalgst,
                        })
                    }
                })

                //   $("#producttable").append(tab);
                $("#billdetailstbody").append(tab);
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
                $("#ContentPlaceHolder1_lbl_balance").append(data[0].finalAmountTotal);
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

                    <Route path="/" component={PurchaseInvoiceList} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }

    printdiv(dropHere) {
        var originalContents = document.body.innerHTML;
        $("#backbutton").hide();
        $("#print").hide();

        $(".pro-sidebar").hide();
        $("#navbar_company_name").hide();


        window.print(originalContents);
        $("#backbutton").show();
        $(".pro-sidebar").show();
        $("#navbar_company_name").show();
        $("#print").show();    
    
        

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
                <div class="row">
                    <div class="col-sm-6 " id="backbutton">
                        <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
                    </div> <div class="col-sm-6 ">
                        <div class="row">
                            <div class="col-sm-3 " >
                               
                            </div>
                            <div class="col-sm-3 pull-right">
                            <button type="button" id="print" class="btn btn-default " onClick={() => this.printdiv('dropHere')}  ><i class="fa fa-print" aria-hidden="true" style={{ fontSize: "17px", border: "none" }}> Print </i></button>
                            </div>   </div>
                    </div>    </div>

                <table class="page-wrapper-table" style={{ width: "700px", margin: "0px auto", position: "relative" }} id="dropHere">
                    <tbody>

                        <tr class="page-wrapper-tr" style={{ pageBreakInside: "avoid", pageBreakAfter: "auto", position: "relative" }}><td>
                            <div class="page-wrapper" style={{ height: "1010px", width: "700px", paddingBottom: "50px", borderBottom: "3px dashed #000", margin: "0px auto", position: "relative" }}>

                                <div class="page-header" style={{ position: "relative", marginBottom: "0px" }}>

                                    <table cellspacing="0" cellpadding="0" class="branding " width="100%" style={{ borderLeft: "1px solid", borderRight: " 1px solid", borderTop: "1px solid", borderColor: "#0070C0" }} >
                                        <tbody><tr>
                                            <td style={{ position: "relative", verticalAlign: "top" }}>
                                                <img id="Image1" src={r1} style={{width:"10rem",margin: "0", padding: "3px", border: "0", fontSize: "100%", font: "inherit", verticalAlign: "baseline" }} />

                                            </td>
                                            <td style={{ position: "relative", verticalAlign: "top", textAlign: "center" }}>
                                                <table cellspacing="0" cellpadding="0" width="100%">

                                                    <tbody><tr>
                                                        <td style={{ verticalAlign: "top", fontSize: "23px", textAlign: "center", fontWeight: "bold", lineHeight: "30px", paddingLeft: "0px", paddingBottom: "5px", paddingRight: "0px" }}>
                                                            <span id="lbl_company_name"> {this.state.companyName}</span>						</td>
                                                    </tr>
                                                        <tr>
                                                            <td style={{ verticalAlign: "top", fontSize: "13px", fontWeight: "normal", lineHeight: "15px", height: "43px", paddingLeft: "0px" }}>
                                                                <span style={{ fontSize: "12px", lineHeight: "5pt" }} >{this.state.doorNo},{this.state.floor},</span><br />
                                                                <span style={{ fontSize: "12px", lineHeight: "5pt" }}>{this.state.street},</span><br />
                                                                <span style={{ fontSize: "12px", lineHeight: "5pt" }}>{this.state.place},{this.state.state}</span><br />
                                                            </td>
                                                        </tr>


                                                    </tbody></table>


                                            </td>

                                            <td style={{verticalAlign: "bottom", float: "right", marginRight: "5%", marginTop: "10%" }}>
                                                <table cellspacing="0" cellpadding="0">

                                                    <tbody>
                                                        <tr>
                                                            <td style={{ lineHeight: "17px", fontSize: "12px" }}>
                                                                <b>Phone: </b>  <span style={{ fontSize: "12px", lineHeight: "5pt" }} id="ContentPlaceHolder1_lbl_company_contact">{this.state.contactNo}</span><br />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ lineHeight: "17px", fontSize: "12px" }}>
                                                                <b>Email:</b>  <span style={{ fontSize: "12px", lineHeight: "5pt" }} id="ContentPlaceHolder1_lbl_company_email">{this.state.companyEmail}</span>
                                                            </td>
                                                        </tr>
                                                    </tbody></table>
                                            </td>

                                        </tr>
                                        </tbody></table>

                                    <table cellspacing="0" cellpadding="0" style={{border: "1px solid #0070C0", padding: "0", margin: "0" }} class="invoice"><tbody>
                                        <tr>
                                            <td class="main-border" style={{ borderBottom: "none", border: "1px solid #0070C0", padding: "0", margin: "0" }}>
                                                <table cellspacing="0" border="0" cellpadding="0" class="header" style={{ width: "100%"}}>
                                                    <tbody><tr>
                                                        <td style={{ verticalAlign: "middle", borderBottom: "1px solid #0070C0" }} class="header-row">
                                                            <table cellspacing="0" cellpadding="0">
                                                                <tbody><tr>
                                                                    <td style={{paddingLeft: "7px" }} class="gstin"><span >GSTIN :</span> <span style={{ fontWeight: "bold", textAlign: "left" }} id="lbl_company_gst">33ABIPL4812E1Z1</span></td>
                                                                    <td style={{ textAlign: "center", fontSize: "20px", color: "#0070C0", padding: "3px 82px", fontWeight: "bold" }} class="invoice-title">TAX INVOICE <span style={{textAlign: "right", paddingRight: "5px", fontSize: "11px", fontWeight: "bold" }} class="copyname"></span></td>
                                                                </tr>
                                                                </tbody></table>
                                                        </td>
                                                    </tr>
                                                    </tbody></table>
                                                <table><tbody><tr>
                                                    <td style={{ borderBottom: "1px solid #0070C0" }}>
                                                        <table cellspacing="0" class="customerdata " style={{ tableLayout: "fixed" }}><tbody><tr>
                                                            <td colspan="2" style={{ textAlign: "middle", fontWeight: "bold", borderRight: "1px solid #0070C0", borderBottom: "1px solid #0070C0", width: "100%", textAlign: "center", padding: "2px 5px 3px 5px", fontSize: "11px", verticalAlign: "top", lineHeight: "13px" }}>Customer Detail</td></tr>
                                                            <tr>
                                                                <td style={{ fontWeight: "bold", padding: "2px 5px 3px 5px", fontSize: "11px", verticalAlign: "top", lineHeight: "13px" }}>M/S</td>
                                                                <td style={{ borderRight: "1px solid #0070C0", height: "20px", overflow: "hidden", padding: "2px 5px 3px 5px", fontSize: "11px", verticalAlign: "top", lineHeight: "13px" }}><span id="ContentPlaceHolder1_lbl_customer_name"></span></td>
                                                            </tr>

                                                            <tr>
                                                                <td style={{ fontWeight: "bold", padding: "2px 5px 3px 5px", fontSize: "11px", verticalAlign: "top", lineHeight: "13px" }}>PHONE</td>
                                                                <td style={{ borderRight: "1px solid #0070C0", padding: "2px 5px 3px 5px", fontSize: "11px", verticalAlign: "top", lineHeight: "13px" }}><span id="ContentPlaceHolder1_lbl_customer_contact"></span></td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ fontWeight: "bold", padding: "2px 5px 3px 5px", fontSize: "11px", verticalAlign: "top", lineHeight: "13px" }}>
                                                                    GSTIN							</td>
                                                                <td style={{ borderRight: "1px solid #0070C0", padding: "2px 5px 3px 5px", fontSize: "11px", verticalAlign: "top", lineHeight: "13px" }}><span id="ContentPlaceHolder1_lbl_gst_no"></span></td>
                                                            </tr>

                                                            <tr>
                                                                <td style={{ fontWeight: "bold", padding: "2px 5px 3px 5px", fontSize: "11px", verticalAlign: "top", lineHeight: "13px" }}>Email</td>
                                                                <td style={{ borderRight: "1px solid #0070C0", padding: "2px 5px 3px 5px", fontSize: "11px", verticalAlign: "top", lineHeight: "13px" }}><span id="ContentPlaceHolder1_lbl_email"></span></td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ fontWeight: "bold", padding: "2px 5px 3px 5px", fontSize: "11px", verticalAlign: "top", lineHeight: "13px" }}>Address</td>
                                                                <td style={{ borderRight: "1px solid #0070C0", padding: "2px 5px 3px 5px", fontSize: "11px", verticalAlign: "top", lineHeight: "13px" }}><div style={{ height: "50px", overflow: "hidden" }}><span id="ContentPlaceHolder1_lbl_customer_address"></span></div></td>
                                                            </tr>
                                                        </tbody></table>
                                                    </td>

                                                    <td style={{ width: "700px", borderBottom: "1px solid #0070C0", verticalAlign: "top" }}>
                                                        <table cellspacing="0" class="invoicedata ">
                                                            <tbody><tr>
                                                                <td style={{ fontWeight: "bold", padding: "3px 5px 6px 5px", fontSize: "11px", verticalAlign: " top", lineHeight: "13px" }}>Invoice No.</td>
                                                                <td style={{ fontWeight: "bold", fontSize: "12px", padding: "3px 5px 6px 5px", fontSize: "11px", verticalAlign: " top", lineHeight: "13px" }}><span id="ContentPlaceHolder1_lbl_invoice_no"></span></td>

                                                            </tr>
                                                                <tr>
                                                                    <td style={{ fontWeight: "bold", padding: "3px 5px 6px 5px", fontSize: "11px", verticalAlign: " top", lineHeight: "13px" }}>Invoice Date</td>
                                                                    <td style={{ padding: "3px 5px 6px 5px", fontSize: "11px", verticalAlign: " top", lineHeight: "13px" }}><span id="ContentPlaceHolder1_lbl_invoice_date"></span></td>
                                                                    <td style={{ fontWeight: "bold", padding: "3px 5px 6px 5px", fontSize: "11px", verticalAlign: " top", lineHeight: "13px" }}>Due Date</td>
                                                                    <td style={{ padding: "3px 5px 6px 5px", fontSize: "11px", verticalAlign: " top", lineHeight: "13px" }}><span id="ContentPlaceHolder1_lbl_due_date"></span></td>
                                                                </tr>

                                                                <tr>
                                                                    <td style={{ fontWeight: "bold", padding: "3px 5px 6px 5px", fontSize: "11px", verticalAlign: " top", lineHeight: "13px" }}>Order No.</td>
                                                                    <td style={{ padding: "3px 5px 6px 5px", fontSize: "11px", verticalAlign: " top", lineHeight: "13px" }} colspan="3"><span id="lbl_order_no">8</span></td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ fontWeight: "bold", padding: "3px 5px 6px 5px", fontSize: "11px", verticalAlign: " top", lineHeight: "13px" }}>Due Amount</td>
                                                                    <td style={{ padding: "3px 5px 6px 5px", fontSize: "11px", verticalAlign: " top", lineHeight: "13px" }} colspan="3"><span id="ContentPlaceHolder1_lbl_balance"></span></td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ fontWeight: "bold", padding: "3px 5px 6px 5px", fontSize: "11px", verticalAlign: " top", lineHeight: "13px" }}>Status</td>
                                                                    <td style={{ padding: "3px 5px 6px 5px", fontSize: "11px", verticalAlign: " top", lineHeight: "13px" }} colspan="3"><span id="ContentPlaceHolder1_lbl_status" style={{ color: "Green", backgroundColor: "White" }}></span></td>
                                                                </tr>

                                                            </tbody></table>

                                                    </td>
                                                </tr>
                                                </tbody></table>
                                                <br></br>
                                            </td></tr></tbody></table>

                                    <table class="billdetailsthead tabl" style={{ width: "100%" }} cellspacing="0" border="0" cellpadding="0">
                                        <thead><tr>
                                            <td class="valign-mid" style={{ verticalAlign: "middle", fontSize: "9px", backgroundColor: "#E8F3FD", border: "1px solid #0070C0", borderCollapse: "collapse", textAlign: "center", fontWeight: "bold", padding: "5px 2px" }} rowspan="2">S.No</td>
                                            <td class="valign-mid" style={{ verticalAlign: "middle", fontSize: "9px", backgroundColor: "#E8F3FD", border: "1px solid #0070C0", borderCollapse: "collapse", textAlign: "center", fontWeight: "bold", padding: "5px 2px" }} rowspan="2">Name of Product / Service</td>
                                            <td class="valign-mid" style={{ verticalAlign: "middle", fontSize: "9px", backgroundColor: "#E8F3FD", border: "1px solid #0070C0", borderCollapse: "collapse", textAlign: "center", fontWeight: "bold", padding: "5px 2px" }} rowspan="2">Rate</td>
                                            <td class="valign-mid" style={{ verticalAlign: "middle", fontSize: "9px", backgroundColor: "#E8F3FD", border: "1px solid #0070C0", borderCollapse: "collapse", textAlign: "center", fontWeight: "bold", padding: "5px 2px" }} rowspan="2">Qty</td>
                                            <td class="valign-mid" style={{ verticalAlign: "middle", fontSize: "9px", backgroundColor: "#E8F3FD", border: "1px solid #0070C0", borderCollapse: "collapse", textAlign: "center", fontWeight: "bold", padding: "5px 2px" }} rowspan="2">Taxable Value</td>
                                            <td class="valign-mid" style={{ fontSize: "9px", backgroundColor: "#E8F3FD", border: "1px solid #0070C0", borderCollapse: "collapse", textAlign: "center", fontWeight: "bold", padding: "5px 2px" }} colspan="2" >{this.props.tax1LabelName}</td>
                                            <td class="valign-mid" style={{ fontSize: "9px", backgroundColor: "#E8F3FD", border: "1px solid #0070C0", borderCollapse: "collapse", textAlign: "center", fontWeight: "bold", padding: "5px 2px" }} colspan="2" >{this.props.tax2LabelName}</td>
                                            <td class="valign-mid" style={{ fontSize: "9px", backgroundColor: "#E8F3FD", border: "1px solid #0070C0", borderCollapse: "collapse", textAlign: "center", fontWeight: "bold", padding: "5px 2px" }} rowspan="2">Total </td>
                                        </tr>
                                            <tr>
                                                <td style={{ fontSize: "9px", borderLeft: "none", backgroundColor: "#E8F3FD", border: "1px solid #0070C0", borderCollapse: "collapse", textAlign: "center", fontWeight: "bold", padding: "5px 2px" }}>%</td>
                                                <td style={{ fontSize: "9px", backgroundColor: "#E8F3FD", border: "1px solid #0070C0", borderCollapse: "collapse", textAlign: "center", fontWeight: "bold", padding: "5px 2px" }}>Amount</td>
                                                <td style={{ fontSize: "9px", backgroundColor: "#E8F3FD", border: "1px solid #0070C0", borderCollapse: "collapse", textAlign: "center", fontWeight: "bold", padding: "5px 2px" }}>%</td>
                                                <td style={{ fontSize: "9px", backgroundColor: "#E8F3FD", border: "1px solid #0070C0", borderCollapse: "collapse", textAlign: "center", fontWeight: "bold", padding: "5px 2px" }}>Amount</td>

                                            </tr>
                                        </thead>
                                        <tbody class="billdetailstbody" id="billdetailstbody" cellspacing="0" border="0" cellpadding="0" style={{ fontSize: "11px", verticalAlign: "top", lineHeight: "15px" }}>
                                    </tbody>
                                    <tbody class="invoicedataFooter tabl" cellspacing="0" style={{ width: "100%" }}>
                                        <tr>
                                            <td colspan="3" class="txt-bold " style={{fontSize: "10px", backgroundColor: "#E8F3FD", padding: "5px 1px 5px 0px", border: "1px solid #0070C0" }}><span>Total </span></td>
                                            <td class="txt-bold " style={{fontSize: "10px", backgroundColor: "#E8F3FD", padding: "5px 1px 5px 0px", border: "1px solid #0070C0" }}><span> {this.state.totalQty}</span></td>
                                            <td class="txt-bold " style={{fontSize: "10px", backgroundColor: "#E8F3FD", padding: "5px 1px 5px 0px", border: "1px solid #0070C0" }}><span id="lbl_total_taxable">{this.state.totalAmount}</span></td>
                                            <td colspan="2" class="txt-bold " style={{fontSize: "10px", backgroundColor: "#E8F3FD", padding: "5px 1px 5px 0px", border: "1px solid #0070C0" }}><span id="lbl_total_cgst">{this.state.totalcgst}</span></td>
                                            <td colspan="2" class="txt-bold " style={{fontSize: "10px", backgroundColor: "#E8F3FD", padding: "5px 1px 5px 0px", border: "1px solid #0070C0" }}><span id="lbl_total_sgst">{this.state.totalsgst}</span></td>
                                            <td class="txt-bold " style={{fontSize: "10px", backgroundColor: "#E8F3FD", padding: "5px 1px 5px 0px", border: "1px solid #0070C0" }}><span id="lbl_sub_total">{this.state.totalFinalAmount}</span></td>
                                        </tr>
                                        </tbody>
                                        </table>


                                </div>

                                <div class="page-content" style={{position: "relative", marginTop: "-11px" }}>
                                    

                                </div>
                                <div class="page-footer">
                                    
                                    <table cellspacing="0" cellpadding="0" class="invoice">
                                        <tbody><tr>
                                            <td class="main-border" style={{ width: "700px", borderBottom: "none", borderTop: "none", border: "1px solid #0070C0", padding: "0", margin: "0" }}>
                                                <br></br>
                                                <table cellspacing="0" style={{ width: "100%" }}>

                                                    <tbody><tr>
                                                        <td style={{ borderTop: "none", borderRight: "none", borderLeft: "none", verticalAlign: "top" }}>

                                                            <table cellspacing="0" style={{ width: "100%", borderCollapse: "collapse" }} class="invoiceInfo">
                                                                <tbody><tr>
                                                                    <td colspan="2" style={{ width: "100%", textAlign: "center", borderBottom: "none", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>Invoice Total in words</td>
                                                                </tr>
                                                                    <tr>
                                                                        <td colspan="2" style={{ width: "100%", textAlign: "center", fontSize: "11px", lineHeight: "15px", height: "30px", verticalAlign: "middle", textTransform: "capitalize", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>
                                                                            <span id="numWords"></span> Dollar Only</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colspan="2" style={{ width: "100%", textAlign: "center", borderBottom: "none", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>Bank Details</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ borderRight: "none", borderBottom: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>Accountant Name</td>
                                                                        <td style={{ borderLeft: "none", borderBottom: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}><span id="lbl_bank_name">{this.state.accountName}</span> </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ borderRight: "none", borderBottom: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>Bank Name</td>
                                                                        <td style={{ borderLeft: "none", borderBottom: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}><span id="lbl_bank_name">{this.state.bankName}</span> </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ borderRight: "none", borderBottom: "none", borderTop: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>Branch Name</td>
                                                                        <td style={{ borderLeft: "none", borderBottom: "none", borderTop: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}><span id="lbl_branch_name">{this.state.branchName}</span> </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ borderRight: "none", borderTop: "none", borderBottom: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>Bank Account Number</td>
                                                                        <td style={{ borderLeft: "none", borderTop: "none", borderBottom: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}><span id="lbl_ac_no">{this.state.accountNo}</span> </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ borderRight: "none", borderTop: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>Bank Branch IFSC</td>
                                                                        <td style={{ borderLeft: "none", borderTop: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}><span id="lbl_ifsc">{this.state.ifscCode}</span> </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colspan="2" style={{ width: "100%", textAlign: "center", borderBottom: "none", padding: "3px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>Terms and Conditions</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colspan="2" style={{ width: "100%", borderBottom: "none", padding: "9px 5px", fontSize: "11px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>

                                                                            <div style={{ height: "90px", width: "100%", overflow: "hidden", fontWeight: "bold", fontSize: "10px", borderBottom: "none" }}>1. Subject to our home Jurisdiction.<br />2. Our Responsibility Ceases as soon as goods leaves our Premises.<br />3. Goods once sold will not taken back.<br />4. Delivery Ex-Premises.</div></td>
                                                                    </tr>
                                                                </tbody></table>
                                                        </td>
                                                        <td style={{ borderTop: "none", verticalAlign: "top" }}>
                                                            <table cellspacing="0" style={{ width: "100%", borderCollapse: "collapse" }} class="invoiceTotal">

                                                                <tbody><tr>
                                                                    <td class="txt-bg" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}>Taxable Amount</td>
                                                                    <td class="txt-bg txt-right" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}><span id="lbl_total_taxable2">{this.state.totalAmount}</span></td>
                                                                </tr>
                                                                    <tr>
                                                                        <td style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}>{this.props.tax1LabelName}</td>
                                                                        <td class=" txt-right" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}><span id="lbl_total_cgst2">{this.state.totalcgst}</span></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}>{this.props.tax2LabelName}</td>
                                                                        <td class=" txt-right" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}><span id="lbl_total_sgst2">{this.state.totalsgst}</span></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}>{this.props.tax3LabelName}</td>
                                                                        <td class=" txt-right" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}><span id="lbl_total_igst2">{this.state.totaligst}</span></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="txt-bg" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}>Total Tax</td>
                                                                        <td class="txt-bg txt-right" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}><span id="lbl_total_gst">{this.state.totalgst}</span></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="txt-bg" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}>Total Amount After Tax</td>
                                                                        <td class="txt-bg txt-right" style={{ padding: "3px 5px", fontSize: "13px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}><span id="lbl_sub_total2">{this.state.totalFinalAmount}</span></td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td class="txt-bg" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}>Adjustment</td>
                                                                        <td class="txt-bg txt-right" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}><span id="lbl_adjustment">{this.state.adjustment}</span></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="txt-bg" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}>Discount</td>
                                                                        <td class="txt-bg txt-right" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}><span id="lbl_discount">{this.state.discount}</span></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="txt-bg" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}>Shipping</td>
                                                                        <td class="txt-bg txt-right" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}><span id="lbl_discount">{this.state.shipping}</span></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="txt-bg" style={{ padding: "3px 5px", fontSize: "10px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}><b>Grand Total</b></td>
                                                                        <td class="txt-bg txt-right" style={{ padding: "3px 5px", fontSize: "14px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}><span id="lbl_grand_total">{this.state.subtotal1}</span></td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td colspan="2" style={{ borderBottom: "none", textAlign: "center", fontSize: "8px", padding: "3px 5px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none" }}>Certified that the particulars given above are true and correct.</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colspan="2" style={{ borderTop: "none", borderBottom: "none", textAlign: "center", fontSize: "12px", padding: "3px 5px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none" }}>For, <span id="lbl_company_name2">{this.state.companyName}</span></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colspan="2" style={{ borderBottom: "none", height: "60px", textAlign: "center", padding: "3px 5px", fontSize: "14px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none" }}>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colspan="2" style={{ borderBottom: "none", textAlign: "center", fontSize: "8px", padding: "3px 5px", lineHeight: "13px", fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none" }}>Authorised Sign</td>
                                                                    </tr>
                                                                </tbody></table>
                                                        </td>
                                                    </tr>
                                                    </tbody></table>
                                            </td></tr>
                                        </tbody></table>
                                    <table cellspacing="0" cellpadding="0" class="branding_table"><tbody><tr class="branding_rt" style={{ opacity: "1", visibility: "visible" }}><td style={{ textAlign: "left", padding: "5px 0 0", fontWeight: " bold", color: "#7A7A7A", fontSize: "10px", lineHeight: "20px", textTransform: "uppercase" }}></td>
                                    </tr></tbody></table>
                                </div>
                            </div></td></tr></tbody></table>

                <p></p>


            </div >

        );
    }
}

export default PurchasePrintFormat1;