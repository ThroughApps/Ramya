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
import PrintFormatComponent from './PrintFormatComponent';
import { PageHeader, PageContent, PageFooter } from './PrintFormatComponent';
import Case from "case";
import InvoiceList from './InvoiceList';
import SalesReportDisplay from './SalesReportDisplay';
import r1 from './image/talogocolornodemcu.png';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import _ from 'underscore';
import {
    GetEmployeeSite, GetCurrentSite, GetSiteDetails,
    GetCurrencies, SetCurrentPage
} from './ConstSiteFunction';
import InvoiceListMenuPage from './Invoice/InvoiceListMenuPage';
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';

//import 'jquery-printme.js';
var balance;
var total;
var numberToWord = require('npm-number-to-word');
var pageCount = 0;
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

class PrintFormat1 extends Component {

    constructor(props) {
        super(props)
        var today = new Date();
        var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var companyLogo = CryptoJS.AES.decrypt(localStorage.getItem('CompanyLogo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var qrCode = CryptoJS.AES.decrypt(localStorage.getItem('CompanyQRCode'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

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

    }

    PrintFunc() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={PrintFormat1} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }
    componentDidMount() {
        SetCurrentPage("PrintFormat");
        var newContent='';
        $('.printbutton').click(function(){
            alert("print");
            $('.printable').html(newContent);
            window.print();
        });
        $(".btn-default").css("background-color", "#05a4b5");
        $(".btn-default").css("color", "white");
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        document.getElementById('container').setAttribute("style", "backgroundColor:inherit");

        window.scrollTo(0, 0);
        this.getQRCode();



        var self = this;
        self.state.balanceAmt = (Math.trunc(this.props.data.balanceAmt)).toLocaleString();
        self.setState({
            balanceAmt: self.state.balanceAmt,
        })

        this.state.tax1LabelName = this.props.data.tax1LabelName;
        this.state.tax2LabelName = this.props.data.tax2LabelName;
        this.state.tax3LabelName = this.props.data.tax3LabelName;

    }

    getQRCode() {
        //alert("QRCODE func")
        var self = this;
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


                self.state.qrCodeImage = imageUrl1;
                self.setState({
                    qrCodeImage: self.state.qrCodeImage
                })
                console.log("PrintFormat qrCodeImage", self.state.qrCodeImage);
                // $('#qrCode')
                //     .attr('src', img2.src)
                //     .width('100px')
                //     .height('70px');

                let image_uri = { uri: blob1 };
                var BlobImage = URL.createObjectURL(blob1);
                self.GetOrderDetails();


            } else {
                // console.log("QR CODE ERROR PART -1 :",);
                self.GetOrderDetails();
                // alert("Network Error")
            }
        };
        xhr.onerror = function () {
            // console.log("** An error occurred during the transaction");
            self.GetOrderDetails();
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
            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/SalesReport/DailySalesReportData",
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


                if (groups.product !== undefined) {




                    tab += '<tr></tr>';

                    var str = "Product";
                    var result = str.bold();
                    self.state.resut = result.big();
                    self.setState({
                        resut: self.state.resut,
                    })
                    var content_holder = self.state.resut.replace(/<(?:.|\n)*?>/gm, '');
                    console.log("result", self.state.resut);
                    console.log("content_holder", content_holder);
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
                            amount: amount,
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
                            amount: amount,
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


                var SubtotalwithoutGst = ((Number(data[0].subtotal1)) - (Number((data[0].totalGst)))).toLocaleString();
                self.setState({

                    SubtotalwithoutGst: SubtotalwithoutGst,
                });
                console.log("orderDetailsLENGTH in PrintFormat", self.state.orderDetails.length);
                console.log("orderDetails in PrintFormat", self.state.orderDetails);
                console.log("productgst in PrintFormat", self.state.productgst);
                pageCount = (Math.trunc(((Number(count)) / 10))) + 1;

                self.state.count = count;
                self.state.groups = groups;
                self.state.pageCount = pageCount;
                self.setState({
                    count: count,
                    groups: groups,
                    data: data,
                    pageCount: pageCount
                })
                console.log("Groups", groups);
                console.log("COUNT:", self.state.count);
                console.log("PageCount:", self.state.pageCount);
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
        $(".pro-sidebar").hide();

        $("#sidebar").hide();
        $("#navbar_company_name").hide();
        $(".page-header").attr("style", "margin-top:0px");


        window.print(originalContents);
        $(".pro-sidebar").show();

        $("#sidebar").show();
        $("#navbar_company_name").show();
        $("#backbutton").show();
        $("#print").show();
        $(".page-header").attr("style", "margin-top:0px");

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
                    <div class="col-sm-6" id="backbutton">
                        <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />

                    </div> <div class="col-sm-6 ">
                        <div class="row">
                            <div class="col-sm-3 " >
                                <button type="button" id="print" class="btn btn-default " onClick={() => this.printData()} ><i class="fa fa-print" aria-hidden="true" style={{ fontSize: "17px", border: "none" }}> Print </i></button>
                            </div>
                            <div class="col-sm-3 pull-right">
                            </div>   </div>
                    </div>    </div>
                    <div id="totalprintarea" >
                    <table class="page-wrapper-table" style={{ margin: "0px auto", position: "relative", marginTop: "0Px" }} id="dropHere">

                {[...Array(this.state.pageCount)].map((e, i) => {
                    return (
                        // console.log("I Value", i),                
                            <tr class="page-wrapper-tr" style={{ pageBreakInside: "avoid", pageBreakAfter: "auto", position: "relative" }}><td>

                                <div class="page-wrapper" style={{ height: "1010px", paddingBottom: "50px",/* borderBottom: "3px dashed #000"*/ margin: "0px auto", position: "relative" }}>      <PageHeader data={this.props.data} tax1LabelName={this.state.tax1LabelName} tax2LabelName={this.state.tax2LabelName} />
                                    <PageContent orderDetails={this.state.orderDetails} count={i} qrCodeImage={this.state.qrCodeImage}
                                        tax1LabelName={this.state.tax1LabelName}
                                        tax2LabelName={this.state.tax2LabelName}
                                        totalAmount={this.state.totalAmount}
                                        totalAmount1={this.state.totalAmount1}
                                        totalcgst={this.state.totalcgst}
                                        totalsgst={this.state.totalsgst}
                                        totalFinalAmount={this.state.totalFinalAmount}
                                        totalcgst1={this.state.totalcgst1}
                                        totalsgst1={this.state.totalsgst1}

                                    />
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
                                        advance={this.state.advance}
                                        qrCodeImage={this.state.qrCodeImage}
                                        currencySymbol={this.props.data.currencySymbol}
                                        amountInWords={this.props.data.amountInWords}

                                    />
                                </div></td></tr>
                        )
                })}
                </table>
</div>
                <p></p>


            </div >

        );
    }
}

export default PrintFormat1;