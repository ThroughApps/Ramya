import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { PageHeader, PageContent, PageFooter } from './EstimatePrintFormatComponent';
import $ from 'jquery';
import registerServiceWorker from './registerServiceWorker';
import Case from "case";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import _ from 'underscore';
import { GetEmployeeSite, GetCurrentSite, GetSiteDetails, GetCurrencies, SetCurrentPage } from './ConstSiteFunction';
import InvoiceListMenuPage from './Invoice/InvoiceListMenuPage';
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import { Truncate_2DecimalPlaces } from './Invoice/InvoiceValidations';

//import 'jquery-printme.js';
var balance;
var total;
var numberToWord = require('npm-number-to-word');
var printData;

var pageCount = 0;
var currencySymbol;
var orderDetails = [];
const td1Style = {
    padding: "0px 10px",
    fontSize: "9px",
    verticalAlign: "top",
    lineHeight: "15px",
    textAlign: "center",

}
const td1StyleContent = {
    padding: "0px 10px",
    fontSize: "9px",
    verticalAlign: "top",
    lineHeight: "15px",
    textAlign: "center",

}
const td29Style = {
    padding: "0px 6px",
    fontSize: "22px",
    verticalAlign: "top",
    lineHeight: "15px",
    textAlign: "left",
    fontweight: "bold",
}
const td2StyleContent = {
    padding: "0px 6px",
    fontSize: "9px",
    verticalAlign: "top",
    lineHeight: "15px",
    textAlign: "left",

}
const td3Style = {
    padding: "0px 5px",
    fontSize: "9px",
    verticalAlign: "top",
    lineHeight: "15px",
    textAlign: "left",

}
const td3StyleContent = {
    padding: "0px 15px",
    fontSize: "9px",
    verticalAlign: "top",
    lineHeight: "15px",
    textAlign: "right",

}
const td45610StyleContent = {
    padding: "0px 8px",
    fontSize: "9px",
    verticalAlign: "top",
    lineHeight: "15px",
    textAlign: "right",

}
const td7StyleContent = {
    padding: "0px 10px",
    fontSize: "9px",
    verticalAlign: "top",
    lineHeight: "15px",
    textAlign: "right",

}
const td8StyleContent = {
    padding: "0px 6px",
    fontSize: "9px",
    verticalAlign: "top",
    lineHeight: "15px",
    textAlign: "right",

}
const td9StyleContent = {
    padding: "0px 20px",
    fontSize: "9px",
    verticalAlign: "top",
    lineHeight: "15px",
    textAlign: "right",

}
const td4Style = {
    padding: "0px 15px",
    fontSize: "9px",
    verticalAlign: "top",
    lineHeight: "15px",
    textAlign: "left",

}
const td56711Style = {
    padding: "0px 8px",
    fontSize: "9px",
    verticalAlign: "top",
    lineHeight: "15px",
    textAlign: "left",

}
const td8Style = {
    padding: "0px 10px",
    fontSize: "9px",
    verticalAlign: "top",
    lineHeight: "15px",
    textAlign: "left",

}
const td10Style = {
    padding: "0px 20px",
    fontSize: "9px",
    verticalAlign: "top",
    lineHeight: "15px",
    textAlign: "left",

}
class EstimatePrintFormat extends Component {

    constructor(props) {
        super(props)
        var today = new Date();
        var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        // this.state.companyId = companyId;
        var companyLogo = CryptoJS.AES.decrypt(localStorage.getItem('CompanyLogo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var qrCode = CryptoJS.AES.decrypt(localStorage.getItem('CompanyQRCode'), "shinchanbaby").toString(CryptoJS.enc.Utf8)


        var id = props.id;
        this.state = {
            date: today1,
            companyId: companyId,
            companyLogo: companyLogo,
            qrCode: qrCode,
            count: 0,
            pageCount: 0,
            qrCodeImage: "",
        };
        this.setState({
            //   companyId: companyId,
        });
        currencySymbol = this.props.currencySymbol;
    }
    BackbtnFunc() {
        ReactDOM.render(<InvoiceListMenuPage data="EstimateInvoice" />, document.getElementById("contentRender"));
    }
    PrintFunc() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={EstimatePrintFormat} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }
    componentDidMount() {
        SetCurrentPage("EstimatePrintFormat");
        var newContent='';
        $('.printbutton').click(function(){
            alert("print");
            $('.printable').html(newContent);
            window.print();
        });
        $(".btn-default").css("background-color", "#05a4b5");
        $(".btn-default").css("color", "white");
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        if (companyId == "127") {

            $(".centerPositionCompany").hide();
            $(".centerPositionCompany").css("visibility", "hidden");
            $(".centerPositionCompany").css("display", "none");
            $(".leftPosition").hide();
            $(".centerPositionLogo").show();


        } else {
            $(".centerPositionLogo").hide();
            $(".centerPositionCompany").show();
            $(".leftPosition").show();
        }
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


                var blob = new Blob([this.response], { type: 'image/pdf' });
                var urlCreator = window.URL || window.webkitURL;
                var imageUrl = urlCreator.createObjectURL(blob);
                var img1 = document.querySelector("#photo");
                var img2 = document.querySelector("#photo1");
                img1.src = imageUrl;
                img2.src = imageUrl;
                //  $('img')
                //  .attr('src',  img.src)
                //  .width('100px')
                //  .height('70px');

                let image_uri = { uri: blob };
                var BlobImage = URL.createObjectURL(blob);


            } else {

                //   alert("Network Error")
            }
        };

        this.getQRCode();
        document.getElementById('container').setAttribute("style", "backgroundColor:inherit");

        window.scrollTo(0, 0);

        this.GetOrderDetails();
        var self = this;
        self.state.balanceAmt = this.props.balanceAmt;
        self.setState({
            balanceAmt: self.state.balanceAmt,
        })

        $("#ContentPlaceHolder1_lbl_invoice_no ").append(this.props.id);
        $("#ContentPlaceHolder1_lbl_status").append(this.props.status);
        $("#lbl_order_no").append(this.props.orderNumber);
        $("#ContentPlaceHolder1_lbl_balance").append(this.props.balanceAmt);
        $("#ContentPlaceHolder1_lbl_total").append(this.props.total);
        $("#ContentPlaceHolder1_lbl_bookingID").append(this.props.bookingId);
        $("#ContentPlaceHolder1_lbl_vehicleNo").append(this.props.vehicleRegistrationNo);
        //   $("#ContentPlaceHolder1_lbl_companyName").append(this.props.companyName);
        // alert(this.props.companyName);
        // alert(this.props.userName);
        // alert(this.props.companyName == " ");
        //  $(document).ready(function () {

        // CHANGE THE WIDTH AND HEIGHT AND SEE THE RESULT.
        // });

        var self = this;
          self.state.qrCodeImage = this.props.data.qrCode
        self.state.balanceAmt = (Math.trunc(this.props.balanceAmt)).toLocaleString();
        self.setState({
            balanceAmt: self.state.balanceAmt,
                qrCodeImage: self.state.qrCodeImage
        })

    }



    getQRCode() {
        //alert("QRCODE func")
        var qrCodeFileName = this.state.qrCode;
        let xhr = new XMLHttpRequest();

        xhr.open('POST', ' http://15.206.129.105:8080/ThroughBooksCOAPI/Login/downloadQRCodeFile');
        xhr.setRequestHeader("Content-type", "application/json");
        var qrCodeFileName = JSON.stringify({ "qrCodeFileName": qrCodeFileName })

        xhr.send(qrCodeFileName);
        console.warn("dataToBackEnd", JSON.parse(qrCodeFileName));

        xhr.responseType = 'blob';

        xhr.onload = function (e) {

            if (this.status == 200) {


                var blob1 = new Blob([this.response], { type: 'image/pdf' });
                var urlCreator = window.URL || window.webkitURL;
                var imageUrl1 = urlCreator.createObjectURL(blob1);
                var img2 = document.querySelector("#qrCode");

                img2.src = imageUrl1;
                $('#qrCode')
                    .attr('src', img2.src)
                    .width('100px');


                let image_uri = { uri: blob1 };
                var BlobImage = URL.createObjectURL(blob1);


            } else {

                // alert("Network Error")
            }
        };
    }


    GetOrderDetails() {
        var self = this;
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                date: this.props.data.date,
                id: this.props.data.id,
                companyId: companyId,
            }),
            url: "https://wildfly.garageapp.in:443/GarageAppIN_API/SalesReport/DailyEstimateReportData",
            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {
                var tab;
                var tab1;
                var count = data.length;

                console.log("Data from backend:", data);
                self.state.data = data;

                orderDetails = [];
                // if(pageCount==0){
                //     pageCount=1
                // }
                //dataCount = Math.round((Number(dataCount)) + ((Number(pageNumber) - 1) * 10));
                self.state.totalQty = 0;
                self.state.totalAmount = 0;
                self.state.totalFinalAmount = 0;

                var groups = _.groupBy(data, function (value) {
                    return value.productType;
                });



                self.state.totalcgst = "0";
                self.state.totalsgst = "0";
                self.state.totaligst = "0";
                self.state.productgst = "0";
                self.state.servicegst = "0";
                // var testdata=<div>hiii</div>;

                var TotalProductDiscountAmount=0;
                if (groups.product !== undefined) {



                    var str = "Product";
                    var result = str.bold();
                    self.state.resut = result.big();
                    self.setState({
                        resut: self.state.resut,
                    })
                    var content_holder = self.state.resut.replace(/<(?:.|\n)*?>/gm, '');
                    //console.log("result",self.state.resut);
                    //console.log("content_holder",content_holder);
                    orderDetails.push({
                        SNO: " ",
                        product: Case.capital(content_holder),
                        rate: " ",
                        quantity: " ",
                        sTotal: " ",
                        cgst: " ",
                        cgstAmount: " ",
                        sgst: " ",
                        sgstAmount: " ",
                        amount: " ",
                        discountAmount: " ",
                        discountPercentage: " ",
                    });
                    for (var i = 0; i < groups.product.length; i++) {

                        if (groups.product[i].qty == 0) {
                            self.state.quantity = "-";
                        } else {
                            self.state.quantity = groups.product[i].qty;
                        }
                        self.setState({
                            quantity: self.state.quantity,
                        })
                        var sTotal = ((groups.product[i].sTotal * 100) / 100).toFixed(2);
                        var prefinalAmount = (Math.trunc(groups.product[i].prefinalAmount)).toLocaleString();
                        var amount = ((groups.product[i].amount * 100) / 100).toFixed(2);
                        var discountAmount = (Math.trunc(groups.product[i].discountAmount)).toLocaleString();
                        var rate = ((groups.product[i].rate * 100) / 100).toFixed(2);

                        TotalProductDiscountAmount =Truncate_2DecimalPlaces(Number(TotalProductDiscountAmount)+(Number(groups.product[i].discountAmount)) );
                        

                        orderDetails.push({
                            SNO: Number(i + 1),
                            product: groups.product[i].product,
                            rate: rate,
                            quantity: self.state.quantity,
                            sTotal: sTotal,
                            cgst: groups.product[i].cgst,
                            cgstAmount: Math.round(((0.01 * Number(groups.product[i].cgst)) * Number(groups.product[i].sTotal))),
                            sgst: groups.product[i].sgst,
                            sgstAmount: Math.round(((0.01 * Number(groups.product[i].sgst)) * Number(groups.product[i].sTotal))),
                            //  amount: amount,
                            amount: prefinalAmount,
                            discountAmount: groups.product[i].discountAmount,
                            discountPercentage: groups.product[i].discountPercentage,
                        });
                        self.state.totalAmount = (Math.round(Number(self.state.totalAmount) + Number(groups.product[i].sTotal)));
                        self.state.totalQty = (Math.round(Number(self.state.totalQty)) + Math.round(Number(groups.product[i].qty)));
                        self.state.totalcgst = (Math.round(Number(self.state.totalcgst) + ((0.01 * Number(groups.product[i].cgst)) * Number(groups.product[i].sTotal))));

                        self.state.totalsgst = (Math.round(Number(self.state.totalsgst) + ((0.01 * Number(groups.product[i].sgst)) * Number(groups.product[i].sTotal))));
                        self.state.totaligst = (Math.round(Number(self.state.totaligst) + ((0.01 * Number(groups.product[i].igst)) * Number(groups.product[i].sTotal))));

                        // self.state.productgst = (Math.round(Number(self.state.productgst) + 
                        // ((((0.01 * Number(groups.product[i].cgst)) * Number(groups.product[i].sTotal))) +
                        //  (((0.01 * Number(groups.product[i].sgst)) * Number(groups.product[i].sTotal))) + 
                        //  (((0.01 * Number(groups.product[i].igst)) * Number(groups.product[i].sTotal))))));
                        self.state.productgst = Math.round(Number(self.state.productgst) +
                            ((((0.01 * Number(groups.product[i].cgst)) * Number(groups.product[i].sTotal))) +
                                (((0.01 * Number(groups.product[i].sgst)) * Number(groups.product[i].sTotal))) +
                                (((0.01 * Number(groups.product[i].igst)) * Number(groups.product[i].sTotal)))));

                        self.state.totalgst = (Math.round(groups.product[i].totalGst));
                        self.state.totalFinalAmount = (Math.round(Number(self.state.totalFinalAmount) + (Number(groups.product[i].amount))));
                        self.state.advance = (Math.round(groups.product[i].advance));
                        self.state.discount = (Math.round(groups.product[i].discount));
                        self.state.subtotal1 = (Math.round(groups.product[i].subtotal1));

                        self.state.orderDetails = orderDetails;
                        self.setState({
                            totalQty: self.state.totalQty,
                            totalAmount: (self.state.totalAmount),
                            totalcgst: self.state.totalcgst,
                            totalsgst: self.state.totalsgst,
                            totaligst: self.state.totaligst,
                            totalFinalAmount: self.state.totalFinalAmount,
                            totalFinalAmount1: self.state.totalFinalAmount.toLocaleString(),
                            totalAmount1: self.state.totalAmount.toLocaleString(),
                            totalcgst1: self.state.totalcgst.toLocaleString(),
                            totalsgst1: self.state.totalsgst.toLocaleString(),
                            advance: self.state.advance.toLocaleString(),
                            discount: self.state.discount.toLocaleString(),
                            subtotal1: self.state.subtotal1.toLocaleString(),
                            totalgst: (self.state.totalgst).toLocaleString(),
                            productgst: (self.state.productgst),

                            orderDetails: orderDetails
                        })



                    }
                }

                if (groups.service !== undefined) {


                    orderDetails.push({
                        SNO: " ",
                        product: "Service",
                        rate: " ",
                        quantity: " ",
                        sTotal: " ",
                        cgst: " ",
                        cgstAmount: " ",
                        sgst: " ",
                        sgstAmount: " ",
                        amount: " ",
                        discountAmount: " ",
                        discountPercentage: " ",
                    });
                    for (var j = 0; j < groups.service.length; j++) {
                        if (groups.service[j].qty == 0) {
                            self.state.quantity = "-";
                        } else {
                            self.state.quantity = groups.service[j].qty;
                        }
                        self.setState({
                            quantity: self.state.quantity,
                        })
                        var sTotal = ((groups.service[j].sTotal * 100) / 100).toFixed(2);
                        var prefinalAmount = (Math.trunc(groups.service[j].prefinalAmount)).toLocaleString();
                        var amount = ((groups.service[j].amount * 100) / 100).toFixed(2);
                        var discountAmount = (Math.trunc(groups.service[j].discountAmount)).toLocaleString();
                        var rate = ((groups.service[j].rate * 100) / 100).toFixed(2);

                    
                        TotalProductDiscountAmount =Truncate_2DecimalPlaces(Number(TotalProductDiscountAmount)+(Number(groups.service[j].discountAmount)) );
                        
                        orderDetails.push({
                            SNO: Number(j + 1),
                            product: groups.service[j].product,
                            rate: rate,
                            quantity: self.state.quantity,
                            sTotal: sTotal,
                            cgst: groups.service[j].cgst,
                            cgstAmount: Math.round(((0.01 * Number(groups.service[j].cgst)) * Number(groups.service[j].sTotal))),
                            sgst: groups.service[j].sgst,
                            sgstAmount: Math.round(((0.01 * Number(groups.service[j].sgst)) * Number(groups.service[j].sTotal))),
                            //  amount: amount,
                            amount: prefinalAmount,
                            discountAmount: groups.service[j].discountAmount,
                            discountPercentage: groups.service[j].discountPercentage,
                        });
                        self.state.totalAmount = (Math.round(Number(self.state.totalAmount) + Number(groups.service[j].sTotal)));
                        self.state.totalQty = (Math.round(Number(self.state.totalQty)) + Math.round(Number(groups.service[j].qty)));
                        self.state.totalcgst = (Math.round(Number(self.state.totalcgst) + ((0.01 * Number(groups.service[j].cgst)) * Number(groups.service[j].sTotal))));
                        self.state.totalsgst = (Math.round(Number(self.state.totalsgst) + ((0.01 * Number(groups.service[j].sgst)) * Number(groups.service[j].sTotal))));
                        self.state.totaligst = (Math.round(Number(self.state.totaligst) + ((0.01 * Number(groups.service[j].igst)) * Number(groups.service[j].sTotal))));

                        self.state.totalgst = Math.round(groups.service[j].totalGst);
                        self.state.totalFinalAmount = (Math.round(Number(self.state.totalFinalAmount) + Number(groups.service[j].amount)));
                        self.state.advance = Math.round(groups.service[j].advance);
                        self.state.discount = Math.round(groups.service[j].discount);
                        self.state.subtotal1 = Math.round(groups.service[j].subtotal1);
                        self.state.servicegst = (Math.round(Number(self.state.servicegst) + ((((0.01 * Number(groups.service[j].cgst)) * Number(groups.service[j].sTotal))) + (((0.01 * Number(groups.service[j].sgst)) * Number(groups.service[j].sTotal))) + (((0.01 * Number(groups.service[j].igst)) * Number(groups.service[j].sTotal))))));


                        self.state.orderDetails = orderDetails;
                        self.setState({
                            totalQty: self.state.totalQty,
                            totalAmount: self.state.totalAmount,
                            totalcgst: self.state.totalcgst,
                            totalAmount1: self.state.totalAmount.toLocaleString(),
                            totalcgst1: self.state.totalcgst.toLocaleString(),
                            totalsgst1: self.state.totalsgst.toLocaleString(),
                            totalsgst: self.state.totalsgst,
                            totaligst: self.state.totaligst,
                            totalFinalAmount: self.state.totalFinalAmount,
                            totalFinalAmount1: self.state.totalFinalAmount.toLocaleString(),
                            advance: self.state.advance.toLocaleString(),
                            discount: self.state.discount.toLocaleString(),
                            subtotal1: self.state.subtotal1.toLocaleString(),
                            totalgst: (self.state.totalgst).toLocaleString(),
                            servicegst: self.state.servicegst,

                            testdata: self.state.testdata,
                            orderDetails: orderDetails
                        })

                    }
                }

                console.log("var --- orderDetails :", orderDetails);
                self.state.TotalProductDiscountAmount=TotalProductDiscountAmount;

                /*  var SubtotalwithoutGst = ((Number(data[0].subtotal1)) - (Number((data[0].totalGst)))).toLocaleString();
                  self.setState({
  
                      SubtotalwithoutGst: SubtotalwithoutGst,
                  });
                  */
                //console.log("orderDetailsLENGTH in PrintFormat",self.state.orderDetails.length);
                //console.log("orderDetails in PrintFormat",self.state.orderDetails);
                //console.log("productgst in PrintFormat",self.state.productgst);
                pageCount = (Math.trunc(((Number(count)) / 10))) + 1;

                self.state.count = count;
                self.state.groups = groups;
                self.state.pageCount = pageCount;
                self.setState({
                    TotalProductDiscountAmount:self.state.TotalProductDiscountAmount,
                    count: count,
                    groups: groups,
                    data: data,
                    pageCount: pageCount
                })
                //console.log("Groups",groups);
                //console.log("COUNT:",self.state.count);
                //console.log("PageCount:",self.state.pageCount);
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


    printdiv(dropHere) {
        var originalContents = document.body.innerHTML;
        $("#backbutton").hide();
        $("#print").hide();
        $(".pro-sidebar").hide();
        $("#navbar_company_name").hide();
        window.print(originalContents);
        $(".pro-sidebar").show();
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
        // newWin.close();
    }


    render() {
        return (
            <div class="container" id="container" >
                 <div class="printable">
                </div>
                <div class="row" style={{ marginTop: "10px" }}>
                    <div class="col-sm-6 " id="backbutton">
                        <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
                    </div>
                    <div class="col-sm-6 ">
                        <div class="row">
                            <div class="col-sm-3 " >
                                <button type="button" id="print" class="btn btn-default " onClick={() => this.printData()}><i class="fa fa-print" aria-hidden="true" style={{ fontSize: "17px", border: "none" }}> Print </i></button>
                            </div>
                            <div class="col-sm-3 pull-right">
                            </div>   </div>
                    </div>    </div>
                    <div id="totalprintarea" style={{paddingBottom: "50px"}}>
                    <table class="page-wrapper-table" style={{ margin: "0px auto", position: "relative", marginTop: "0Px" }} id="dropHere">

                        {

                            [...Array(this.state.pageCount)].map((e, i) => {
                                return (
                                    //console.log("I Value",i),
                                    <tbody>

                                        <tr class="page-wrapper-tr" style={{ pageBreakInside: "avoid", pageBreakAfter: "auto", position: "relative" }}>
                                            <td>
                                                <div class="page-wrapper" style={{ margin: "0px auto", position: "relative" }}>
                                                    <PageHeader data={this.props.data} currencySymbol={currencySymbol} />
                                                    <PageContent orderDetails={this.state.orderDetails} count={i} qrCodeImage={this.state.qrCodeImage}
                                                        totalAmount={this.state.totalAmount}
                                                        totalAmount1={this.state.totalAmount1}
                                                        totalcgst={this.state.totalcgst}
                                                        totalsgst={this.state.totalsgst}
                                                        totalFinalAmount={this.state.totalFinalAmount}
                                                        totalcgst1={this.state.totalcgst1}
                                                        totalsgst1={this.state.totalsgst1}
                                                        TotalProductDiscountAmount={this.state.TotalProductDiscountAmount}
                                                        currencySymbol={currencySymbol}
                                                        totalQty={this.state.totalQty} />
                                                    <PageFooter totalQty={this.state.totalQty}
                                                        totalAmount={this.state.totalAmount}
                                                        totalAmount1={this.state.totalAmount1}
                                                        totalcgst={this.state.totalcgst}
                                                        totalsgst={this.state.totalsgst}
                                                        totalFinalAmount={this.state.totalFinalAmount}
                                                        totalcgst1={this.state.totalcgst1}
                                                        totalsgst1={this.state.totalsgst1}
                                                        productgst={this.state.productgst.toLocaleString()}
                                                        servicegst={this.state.servicegst.toLocaleString()}
                                                        totalgst={this.state.totalgst}
                                                        totalFinalAmount1={this.state.totalFinalAmount1}
                                                        discount={this.state.discount}
                                                        balanceAmt={this.state.balanceAmt}
                                                        advance={this.state.advance}
                                                        qrCodeImage={this.state.qrCodeImage}
                                                        currencySymbol={currencySymbol}
                                                    />
                                                </div></td></tr>
                                    </tbody>)
                            })}
                    </table>
                </div>

                <p></p>


            </div >

        );
    }
}

export default EstimatePrintFormat;