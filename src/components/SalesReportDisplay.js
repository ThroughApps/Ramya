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
import PrintFormat from './PrintFormat';
//import 'jquery-printme.js';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import ChequePrintFormat from './ChequePrintFormat';
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";
//import google from 'googleapis';
//import fs from 'fs';
//import key from './BillingAppServiceAccount_Credentials.json';
////import Google from 'google-api-wrapper';

//Google.loadCredFile('./BillingAppServiceAccount_Credentials.json');
import { gapi } from 'gapi-script';
//import datauri from 'datauri';
//import Datauri from 'datauri/sync';
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import {
    GetEmployeeSite, GetCurrentSite, GetSiteDetails,
    GetCurrencies, SetCurrentPage
} from './ConstSiteFunction';
import InvoiceListMenuPage from './Invoice/InvoiceListMenuPage';
import convert_to_words from '@amirsanni/number-to-words';
import { SiteCurrencySymbol } from './Invoice/CurrencyFormater';


var balance;
var data;
var total;
var numberToWord = require('npm-number-to-word');
var productData = [];


/*const  datauriFunc = async (dateURL) =>{
   /* if (err) {
        throw err;
    } *
   
    console.log("content :",dateURL.content); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
   
    console.log("meta.mimetype :",meta.mimetype); //=> "image/png"
    console.log("meta.base64 :",meta.base64); //=> "iVBORw0KGgoAAAANSUhEUgAA..."
    console.log(meta.getCSS()); //=> "\n.case {\n    background-image: url('data:image/png;base64,iVBORw..."
    console.log(meta.getCSS({
      class: "myClass",
      width: true,
      height: true
    })); //=> adds image width and height and custom class name
}  */

class SalesReportDisplay extends Component {

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
        SetCurrentPage("SalesReportDisplay");

        var siteCurrencyData = SiteCurrencySymbol(this.state.siteName);
        this.state.currencySymbol = siteCurrencyData.currencySymbol;
        this.state.currencyCode = siteCurrencyData.currencyCode;

        window.scrollTo(0, 0);



        this.GetOrderDetails();
        this.GetLogo();

        $("#ContentPlaceHolder1_lbl_invoice_no ").append(this.props.id);
        $("#ContentPlaceHolder1_lbl_status").append(this.props.status);
        $("#ContentPlaceHolder1_lbl_order_no").append(this.props.id);
        $("#ContentPlaceHolder1_lbl_balance").append((Math.trunc(this.props.balanceAmt)).toLocaleString());
        // $("#ContentPlaceHolder1_lbl_discount").append(this.props.discount);
        $("#ContentPlaceHolder1_lbl_total").append(this.props.total);
        $("#ContentPlaceHolder1_lbl_customer_bookingId").append(this.props.bookingId);
        $("#ContentPlaceHolder1_lbl_customer_vehicleNo").append(this.props.vehicleRegistrationNo);
        $("#ContentPlaceHolder1_lbl_customer_vehicleMake").append(this.props.vehicleMake);
        $("#ContentPlaceHolder1_lbl_customer_vehicleModel").append(this.props.vehicleModel);
        $("#ContentPlaceHolder1_lbl_customer_vehicleFuelType").append(this.props.vehicleFuelType);
        //   $("#ContentPlaceHolder1_lbl_companyName").append(this.props.companyName);

        if (this.props.companyName == " " || this.props.companyName == null || this.props.companyName == "-") {
            $("#ContentPlaceHolder1_lbl_customer_name").append(this.props.userName);
            this.state.dispCustomer = this.props.userName;
        } else {
            $("#ContentPlaceHolder1_lbl_customer_name").append(this.props.companyName);
            this.state.dispCustomer = this.props.companyName;
        }

        $(".btn-default").css("background-color", "#05a4b5");
        $(".btn-default").css("color", "white");



    }



    GetOrderDetails() {

        var self = this;
        productData = [];
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
                        // var sample=(10000000).toLocaleString();
                        // alert(sample);
                        var sTotal = ((item.sTotal)).toLocaleString();
                        var prefinalAmount = ((item.prefinalAmount)).toLocaleString();
                        var amount = ((item.amount)).toLocaleString();
                        var discountAmount = ((item.discountAmount)).toLocaleString();
                        var rate = ((item.rate)).toLocaleString();
                        var tax = Number(((0.01 * Number(item.cgst)) * Number(item.sTotal))) + Number(((0.01 * Number(item.sgst)) * Number(item.sTotal)))
                        productData.push({
                            no: no,
                            product: item.product,
                            type: Case.capital(item.productType),
                            quantity: self.state.quantity,
                            rate: rate,
                            tax: ((tax * 100) / 100).toFixed(2),
                            total: ((amount * 100) / 100).toFixed(2)
                        });
                        //    alert(sTotal)       
                        tab += '<tr><td>' + no + '</td><td>' + item.product + '</td><td>' + Case.capital(item.productType) + '</td><td>' + rate + '</td><td>' + self.state.quantity + '</td>'
                            + '<td>' + sTotal + '</td><td>' + item.discountPercentage + '</td><td>' + discountAmount + '</td>'
                            + '<td>' + prefinalAmount + '</td><td>' + item.cgst + '</td><td>' + item.sgst + '</td>'
                            + '<td>' + amount + '</td><td>' + item.serviceBy + '</td></tr>';
                    }
                })

                $("#producttable").append(tab);
                var inDate = new Date(data[0].invoiceDate);
                var duDate = new Date(data[0].dueDate);
                //   alert("invoicedate"+inDate)e
                //   var inDate=data[0].invoiceDate;
                var invoiceDate = inDate.getDate() + '-' + (inDate.getMonth() + 1) + '-' + inDate.getFullYear();
                var dueDate = duDate.getDate() + '-' + (duDate.getMonth() + 1) + '-' + duDate.getFullYear();

                var SubtotalwithoutGst = ((Number(data[0].subtotal1)) - (Number((data[0].totalGst)))).toLocaleString();
                self.setState({
                    invoiceDate: invoiceDate,
                    dueDate: dueDate,
                    totalAmount: (Number(data[0].subtotal1 * 100) / 100).toFixed(2),
                    SubtotalwithoutGst: self.state.SubtotalwithoutGst,
                    customerContactNo: data[0].contact,
                    customerAddress: data[parseInt(count) - 1].address,
                    customerEmail: data[parseInt(count) - 1].email
                });
                // alert("SubtotalwithoutGst",+self.state.SubtotalwithoutGst);
                $("#ContentPlaceHolder1_lbl_invoice_date").append(invoiceDate);
                $("#ContentPlaceHolder1_lbl_due_date").append(dueDate);

                $("#ContentPlaceHolder1_lbl_customer_address").append(data[parseInt(count) - 1].address);
                $("#ContentPlaceHolder1_lbl_customer_contact").append(data[0].contact);
                $("#ContentPlaceHolder1_lbl_gst_no").append(data[parseInt(count) - 1].gstNo);
                $("#ContentPlaceHolder1_lbl_email").append(data[parseInt(count) - 1].email);

                $("#ContentPlaceHolder1_lbl_subtotal").append((Math.trunc(data[0].subtotal1)).toLocaleString());

                var numtoword = numberToWord(Number(data[0].subtotal1) - Number(data[0].discount));
                // $("#numWords").text(Case.capitale(numtoword));
                // $("#numWords").text((numtoword));
                //    $("#numWords").text(Case.capital(numtoword));

                var temp = Number(data[0].subtotal1) - Number(data[0].discount);
                self.state.amountInWords = Case.capital(convert_to_words(Number(temp), self.state.currencyCode));

                $("#ContentPlaceHolder1_lbl_total_gst").append((Math.trunc(data[0].totalGst)).toLocaleString());
                $("#ContentPlaceHolder1_lbl_advance").append((Math.trunc(data[0].advance)).toLocaleString());
                $("#ContentPlaceHolder1_lbl_discount").append((Math.trunc(data[0].discount)).toLocaleString());
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
        ReactDOM.render(<InvoiceListMenuPage data="SaleInvoice" />, document.getElementById("contentRender"));
    }

    printdiv(dropHere) {
        var originalContents = document.body.innerHTML;
        $("#backbutton").hide();
        $("#print").hide();
        $("#print2").hide();
        $("#printpdf").hide();
        $("#print3").hide();
        $(".pro-sidebar").hide();
        $("#bacbtn").hide();
        $("#navbar_company_name").hide();


        window.print(originalContents);
        $(".pro-sidebar").show();
        $("#navbar_company_name").show();
        $("#backbutton").show();
        $("#print").show();
        $("#bacbtn").show();
        $("#printpdf").show();
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
        data = {
            id: this.props.id,
            bookingId: this.props.bookingId,
            vehicleRegistrationNo: this.props.vehicleRegistrationNo,
            vehicleMake: this.props.vehicleMake,
            vehicleModel: this.props.vehicleModel,
            vehicleFuelType: this.props.vehicleFuelType,
            date: this.props.date,
            userName: this.props.userName,
            customerContactno: this.state.customerContactNo,
            customerAddress: this.state.customerAddress,
            customerEmail: this.state.customerEmail,
            customerGstNo: this.state.customerGstNo,
            invoiceDate: this.state.invoiceDate,
            balanceAmt: this.props.balanceAmt,
            orderNumber: this.props.orderNumber,
            subtotal1: this.props.subtotal1,
            customerId: this.props.customerId,
            companyName: this.props.companyName,
            status: this.props.status,
            logo: this.state.logo,
            currencySymbol: this.state.currencySymbol,
            amountInWords: this.state.amountInWords,

        }


        ReactDOM.render(<PrintFormat data={data} />, document.getElementById("contentRender"));

        registerServiceWorker();
        // ReactDOM.render(<PrintFormat id={this.props.id} bookingId={this.props.bookingId} 
        //     vehicleRegistrationNo={this.props.vehicleRegistrationNo} vehicleMake={this.props.vehicleMake} 
        //     vehicleModel={this.props.vehicleModel} vehicleFuelType={this.props.vehicleFuelType}
        //     date={this.props.date} userName={this.props.userName} 
        //     contact={this.props.contact} status={this.props.status} 
        //     balanceAmt={this.props.balanceAmt} orderNumber={this.props.orderNumber}
        //      subtotal1={this.props.subtotal1} customerId={this.props.customerId} 
        //      companyName={this.props.companyName} />, document.getElementById("contentRender"));

        // registerServiceWorker();


    }
    Print3Func() {
        ReactDOM.render(<ChequePrintFormat id={this.props.id}
            date={this.props.date} userName={this.props.userName} contact={this.props.contact}
            status={this.props.status} balanceAmt={this.props.balanceAmt} subtotal1={this.props.subtotal1} customerId={this.props.customerId} companyName={this.props.companyName} />, document.getElementById("contentRender"));

        registerServiceWorker();
    }

    Print4Func() {
        var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var companyAddress = CryptoJS.AES.decrypt(localStorage.getItem('CompanyAddress'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var companyEmail = CryptoJS.AES.decrypt(localStorage.getItem('CompanyEmailId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        var doorNo = CryptoJS.AES.decrypt(localStorage.getItem('DoorNo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var floor = CryptoJS.AES.decrypt(localStorage.getItem('Floor'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var street = CryptoJS.AES.decrypt(localStorage.getItem('Street'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var place = CryptoJS.AES.decrypt(localStorage.getItem('Place'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var state = CryptoJS.AES.decrypt(localStorage.getItem('State'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var contactNo = CryptoJS.AES.decrypt(localStorage.getItem('ContactNo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        // const pdfObject = jsPDFInvoiceTemplate(props); //returns number of pages created
        var props = {
            outputType: 'dataurlnewwindow', //save, datauristring, datauri, dataurlnewwindow
            fileName: "Invoice 2021",
            orientationLandscape: false,
            logo: {
                src: this.state.imageurl,
                width: 53.33, //aspect ratio = width/height
                height: 26.66
            },
            business: {
                name: this.state.companyName,
                address: doorNo + "," + floor + "," + street + ",",
                phone: place + "," + state,//Using phone for address to display address in two line
                email: contactNo,//using contact in email
                email_1: companyEmail,
                website: "GSTNO :" + this.state.gstNo,
            },
            contact: {
                label: "Invoice issued for:",
                name: this.state.dispCustomer,
                address: "Vehicle No: " + this.props.vehicleRegistrationNo + " "
                    + (this.props.vehicleMake === null || this.props.vehicleMake === undefined ? " " : this.props.vehicleMake) +
                    " " + (this.props.vehicleModel === null || this.props.vehicleModel === undefined ? " " : this.props.vehicleModel),
                phone: this.state.customerContactNo,
                email: this.state.customerEmail,
                otherInfo: this.state.customerAddress,
            },
            invoice: {
                label: "#: ",
                invTotalLabel: "Total:",
                num: this.props.id,
                invDate: "Invoice Date: " + this.state.invoiceDate,
                invGenDate: "Due Date: " + this.state.dueDate,
                header: ["#", "Name", "Type", "Qty", "Rate", "Tax", "Total"],
                headerBorder: false,
                tableBodyBorder: false,
                table: Array.from(productData, (item, index) => ({
                    //Order to be same
                    num: index + 1,
                    desc: item.product,
                    price: item.type,//Product or Service type
                    quantity: item.quantity,//Quantity or product/Service
                    unit: item.rate,// Rate  of product
                    total: item.tax.toString(), // Tax Amount
                    subtotal: item.total,// Total 

                })),
                invTotal: this.state.totalAmount.toLocaleString(),
                invCurrency: this.state.currencyCode,
                invDescLabel: "Invoice Note",
                invDesc: "Received By Make all cheque payable " + this.state.companyName
                    + ".\nIf you have any questions concerning this Invoice, contact " + this.state.contactNo
                    + "\nBank Details : " + this.state.bankName + ", Ac/No: " + this.state.accountNo + " IFSC Code: " + this.state.ifscCode
                    + "\nThank you for your business!",
            },
            footer: {
                text: "The invoice is created on a computer and is valid without the signature and stamp.",
            },
            pageEnable: true,
            pageLabel: "Page ",
        }

        var props1 = {
            outputType: "datauri", //save, datauristring, datauri, dataurlnewwindow
            fileName: "Invoice 2021",
            orientationLandscape: false,
            logo: {
                src: this.state.imageurl,
                width: 53.33, //aspect ratio = width/height
                height: 26.66
            },
            business: {
                name: this.state.companyName,
                address: doorNo + "," + floor + "," + street + ",",
                phone: place + "," + state,//Using phone for address to display address in two line
                email: contactNo,//using contact in email
                email_1: companyEmail,
                website: "GSTNO :" + this.state.gstNo,
            },
            contact: {
                label: "Invoice issued for:",
                name: this.state.dispCustomer,
                address: "Vehicle No: " + this.props.vehicleRegistrationNo + " "
                    + (this.props.vehicleMake === null || this.props.vehicleMake === undefined ? " " : this.props.vehicleMake) +
                    " " + (this.props.vehicleModel === null || this.props.vehicleModel === undefined ? " " : this.props.vehicleModel),
                phone: this.state.customerContactNo,
                email: this.state.customerEmail,
                otherInfo: this.state.customerAddress,
            },
            invoice: {
                label: "#: ",
                invTotalLabel: "Total:",
                num: this.props.id,
                invDate: "Invoice Date: " + this.state.invoiceDate,
                invGenDate: "Due Date: " + this.state.dueDate,
                header: ["#", "Name", "Type", "Qty", "Rate", "Tax", "Total"],
                headerBorder: false,
                tableBodyBorder: false,
                table: Array.from(productData, (item, index) => ({
                    //Order to be same
                    num: index + 1,
                    desc: item.product,
                    price: item.type,//Product or Service type
                    quantity: item.quantity,//Quantity or product/Service
                    unit: item.rate,// Rate  of product
                    total: item.tax.toString(), // Tax Amount
                    subtotal: item.total,// Total 

                })),
                invTotal: this.state.totalAmount.toLocaleString(),
                invCurrency: this.state.currencyCode,
                invDescLabel: "Invoice Note",
                invDesc: "Received By Make all cheque payable " + this.state.companyName
                    + ".\nIf you have any questions concerning this Invoice, contact " + this.state.contactNo
                    + "\nBank Details : " + this.state.bankName + ", Ac/No: " + this.state.accountNo + " IFSC Code: " + this.state.ifscCode
                    + "\nThank you for your business!",
            },
            footer: {
                text: "The invoice is created on a computer and is valid without the signature and stamp.",
            },
            pageEnable: true,
            pageLabel: "Page ",
        }


        //or in browser
        var pdfObject = jsPDFInvoiceTemplate(props); //returns number of pages created

        console.log("uri POPRS : ", pdfObject);

    }






    GetLogo() {
        var companyLogo = CryptoJS.AES.decrypt(localStorage.getItem('CompanyLogo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        //  var companyLogo=  "129talogocolornodemcu.png";
        var fileName = companyLogo;
        var self = this;
        let xhr = new XMLHttpRequest();

        xhr.open('POST', ' http://15.206.129.105:8080/ThroughBooksCOAPI/Login/downloadFile');
        xhr.setRequestHeader("Content-type", "application/json");
        var fileName = JSON.stringify({ "fileName": fileName })

        xhr.send(fileName);
        console.warn("dataToBackEnd", JSON.parse(fileName));

        xhr.responseType = 'blob';

        xhr.onload = function (e) {

            if (this.status == 200) {


                var blob = new Blob([this.response], { type: 'image/pdf' });
                var urlCreator = window.URL || window.webkitURL;
                var imageUrl = urlCreator.createObjectURL(blob);
                console.log("imageUrl ", imageUrl);

                let image_uri = { uri: blob };
                var BlobImage = URL.createObjectURL(blob);
                self.state.imageurl = imageUrl;
                self.setState({
                    imageurl: self.state.imageurl
                })
                self.state.logo = imageUrl;


                self.setState({
                    logo: self.state.logo
                })
            } else {

                //  alert("Network Error")
            }
            xhr.onerror = function () {
                console.log("** An error occurred during the transaction");

            };
        };


    }
    render() {
        return (


            <div class="container" >
                <div class="row" style={{ marginTop: "13px" }}>
                    <div class="col-sm-4" id="bacbtn">
                        <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
                    </div>

                    <div class="col-sm-4 ">
                        <h3 style={{ textAlign: "center", marginTop: "8px" }}>GST Invoice</h3>

                    </div>

                    <div class="col-sm-4">
                        <div class="row">

                            <div class="col-sm-3 pull-right">
                                <button type="button" id="print" class="btn btn-default " onClick={() => this.printdiv('dropHere')}  ><i class="fa fa-print" aria-hidden="true" style={{ fontSize: "17px", border: "none" }}> Print </i></button>

                            </div>
                            <div class="col-sm-3 pull-right">
                                <button type="button" id="print2" class="btn btn-default " onClick={() => this.PrintFunc()}  ><i class="fas fa-eye" aria-hidden="true" style={{ fontSize: "17px", border: "none" }}> View </i></button>
                            </div>
                            <div class="col-sm-3 pull-right">
                                <button type="button" id="print3" class="btn btn-default " onClick={() => this.Print4Func()}  ><i class="fa fa-file-pdf-o" aria-hidden="true" style={{ fontSize: "17px", border: "none" }}> Pdf </i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="dropHere" style={{ fontSize: "12px", margin: "0" }} class="card">

                    <div class="card-body">

                        <div class="row">

                            <div class="col-lg-12 m-b-3">

                            </div>


                        </div>

                        <div class="row ">
                            <div class="col-sm-4 invoice-col pull-left" style={{ marginTop: "32px" }}> To
         <address>     <strong>
                                    <b>  <span id="ContentPlaceHolder1_lbl_customer_name"></span></b></strong><br />
                                    <b>Phone:</b>  <span id="ContentPlaceHolder1_lbl_customer_contact"></span> <br />

                                    {/*<b>Vehicle No:</b><span id="ContentPlaceHolder1_lbl_customer_vehicleNo"></span><br />
                                    <b>Vehicle Make:</b><span id="ContentPlaceHolder1_lbl_customer_vehicleMake"></span><br />
                                    <b>Vehicle Model:</b><span id="ContentPlaceHolder1_lbl_customer_vehicleModel"></span><br />
                                    <b>Vehicle FuelType:</b><span id="ContentPlaceHolder1_lbl_customer_vehicleFuelType"></span><br />
                                    <b>Booking ID:</b>  <span id="ContentPlaceHolder1_lbl_customer_bookingId"></span> <br />
                        */
                                    }
                                    <b>GST no:</b> <span id="ContentPlaceHolder1_lbl_gst_no"></span> <br />
                                    <b> Email:</b> <span id="ContentPlaceHolder1_lbl_email"></span> <br />
                                    <span style={{ clear: "left", display: "inline-block" }} id="ContentPlaceHolder1_lbl_customer_address"></span><br />

                                </address>
                            </div>


                            <div class="col-sm-8 invoice-col text-right">

                                <h4> <strong> <span style={{ lineHeight: "5pt" }} id="ContentPlaceHolder1_lbl_company_name">  {this.state.companyName}</span></strong></h4>

                                <span style={{ fontSize: "12px", lineHeight: "5pt" }} >{this.state.doorNo}, {this.state.floor},</span><br />
                                <span style={{ fontSize: "12px", lineHeight: "5pt" }}>{this.state.street},</span><br />
                                <span style={{ fontSize: "12px", lineHeight: "5pt" }}>{this.state.place}, {this.state.state}</span><br />

                                <b><span class="glyphicon glyphicon-phone"></span> <span>   </span></b>  <span style={{ fontSize: "12px", lineHeight: "5pt" }} id="ContentPlaceHolder1_lbl_company_contact">{this.state.contactNo}  </span> <br />
                                <b>GST No:</b>  <span style={{ fontSize: "12px", lineHeight: "5pt" }} > {this.state.gstNo}</span><br />

                                <b><span class="glyphicon glyphicon-envelope"></span></b>  <span style={{ fontSize: "12px", lineHeight: "5pt" }} id="ContentPlaceHolder1_lbl_company_email">{this.state.companyEmail}</span> <br />
                                <div style={{ paddingLeft: "50px" }} class=" invoice-col text-right pull-right" >
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

                        <div >

                        </div>

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
                                            <th scope="col">Discount </th>
                                            <th scope="col">STotal</th>
                                            <th scope="col">Statetax %</th>
                                            <th scope="col">Federaltax %</th>
                                            <th scope="col" >Amount</th>
                                            <th scope="col" style={{ width: "10%" }}>Service By</th>

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
                                            <b>Subtotal ({this.state.currencyCode}):</b>
                                            <span id="ContentPlaceHolder1_lbl_subtotalwithoutGST"> </span>
                                        </td>

                                        <td style={{ textAlign: "left" }}>
                                            <b>Total Tax ({this.state.currencyCode}):</b>
                                            <span id="ContentPlaceHolder1_lbl_total_gst"> </span>
                                        </td>
                                        <td style={{ textAlign: "left" }}>
                                            <b>TotalAmount ({this.state.currencyCode}):</b>
                                            <span id="ContentPlaceHolder1_lbl_subtotal"> </span>
                                        </td>


                                        <td style={{ textAlign: "left" }}>
                                            <b>Paid Amount ({this.state.currencyCode}):</b>
                                            <span id="ContentPlaceHolder1_lbl_advance"> </span>
                                        </td>
                                        <td style={{ textAlign: "left" }}>
                                            <b>Discount ({this.state.currencyCode}):</b>
                                            <span id="ContentPlaceHolder1_lbl_discount"> </span>
                                        </td>
                                        <td style={{ textAlign: "left" }}>
                                            <b>Balance ({this.state.currencyCode}):</b>
                                            <span id="ContentPlaceHolder1_lbl_balance"> </span>
                                        </td>



                                    </tr>
                                    </tbody></table>


                            </div></div>

                        <p></p>
                        <div class="col-md-12">
                            <div style={{ borderTop: "1px solid rgba(0,0,0,.1)", borderBottom: "1px solid rgba(0,0,0,.1)", padding: "5px" }}>
                                <span ><b>Amount Chargeable In Words : </b><span >{this.state.amountInWords}</span></span>
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

export default SalesReportDisplay;