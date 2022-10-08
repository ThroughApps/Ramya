import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import _ from 'underscore'; 
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
    import { PageHeader, PageContent, PageFooter } from './PurchasePrintFormatComponent';
//import 'jquery-printme.js';
var balance;
var total;
var numberToWord = require('npm-number-to-word');
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

class PurchasePrintFormat1 extends Component {

    constructor(props) {
        super(props)
        var today = new Date();
        var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var companyLogo = CryptoJS.AES.decrypt(localStorage.getItem('CompanyLogo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var area = CryptoJS.AES.decrypt(localStorage.getItem('Area'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var zipCode = CryptoJS.AES.decrypt(localStorage.getItem('Zipcode'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var qrCode;


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
        var newContent='';
        $('.printbutton').click(function(){
            alert("print");
            $('.printable').html(newContent);
            window.print();
        });
        $(".btn-default").css("background-color", "#05a4b5");
        $(".btn-default").css("color", "white");

        document.getElementById('container').setAttribute("style", "backgroundColor:inherit");

        window.scrollTo(0, 0);
        this.GetOrderDetails();
    }


    GetOrderDetails() {
alert("im working");    
        var self = this;

        console.log("groups 123");
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                date: this.props.data.date,
                id: this.props.data.id,
                companyId: this.state.companyId,
            }),
            
            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/PurchaseReport/DailyPurchaseReportData",
            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {



                var tab;
                var count = data.length;
                console.log("Data from backend:", data);
                self.state.data = data;
                orderDetails = [];

                self.state.totalQty = 0;
                self.state.totalAmount = 0;
                self.state.totalFinalAmount = 0;

                // var groups = _.groupBy(data, function (value) {
                //     return value.productType;
                // });

console.log("data1", data);

                self.state.totalcgst = "0";
                self.state.totalsgst = "0";
                self.state.totaligst = "0";
                self.state.productgst = "0";
                self.state.servicegst = "0";
                // var testdata=<div>hiii</div>;
var no;
                $.each(data, function (i, item) {
                    no = parseInt(i + 1);
                if (item.product !== null) {




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
                    for (var i = 0; i < item.product.length; i++) {

                        if (item.product[i].qty == 0) {
                            self.state.quantity = "-";
                        } else {
                            self.state.quantity = item.product[i].qty;
                        }
                        self.setState({
                            quantity: self.state.quantity,
                        })
                        var sTotal = ((item.product[i].sTotal * 100) / 100).toFixed(2);
                        var prefinalAmount = (Math.trunc(item.product[i].prefinalAmount)).toLocaleString();
                        var amount = ((item.product[i].amount * 100) / 100).toFixed(2);
                        var discountAmount = (Math.trunc(item.product[i].discountAmount)).toLocaleString();
                        var rate = ((item.product[i].rate * 100) / 100).toFixed(2);


                        orderDetails.push({ 
                            SNO: Number(i + 1),
                            product: item.product[i].product,
                            rate: rate,
                            quantity: self.state.quantity,
                            sTotal: sTotal,
                            cgst: item.product[i].cgst,
                            cgstAmount: Math.round(((0.01 * Number(item.product[i].cgst)) * Number(item.product[i].sTotal))),
                            sgst: item.product[i].sgst,
                            sgstAmount: Math.round(((0.01 * Number(item.product[i].sgst)) * Number(item.product[i].sTotal))),
                            amount: amount,
                        });
                        self.state.totalAmount = (Math.round(Number(self.state.totalAmount) + Number(item.product[i].sTotal)));
                        self.state.totalQty = (Math.round(Number(self.state.totalQty)) + Math.round(Number(item.product[i].qty)));
                        self.state.totalcgst = (Math.round(Number(self.state.totalcgst) + ((0.01 * Number(item.product[i].cgst)) * Number(item.product[i].sTotal))));

                        self.state.totalsgst = (Math.round(Number(self.state.totalsgst) + ((0.01 * Number(item.product[i].sgst)) * data(item.product[i].sTotal))));
                        self.state.totaligst = (Math.round(Number(self.state.totaligst) + ((0.01 * Number(item.product[i].igst)) * Number(item.product[i].sTotal))));

                        // self.state.productgst = (Math.round(Number(self.state.productgst) + 
                        // ((((0.01 * Number(groups.product[i].cgst)) * Number(groups.product[i].sTotal))) +
                        //  (((0.01 * Number(groups.product[i].sgst)) * Number(groups.product[i].sTotal))) + 
                        //  (((0.01 * Number(groups.product[i].igst)) * Number(groups.product[i].sTotal))))));
                        self.state.productgst = Math.round(Number(self.state.productgst) +
                            ((((0.01 * Number(item.product[i].cgst)) * Number(item.product[i].sTotal))) +
                                (((0.01 * Number(item.product[i].sgst)) * Number(item.product[i].sTotal))) +
                                (((0.01 * Number(item.product[i].igst)) * Number(item.product[i].sTotal)))));

                        self.state.totalgst = (Math.round(item.product[i].totalGst));
                        self.state.totalFinalAmount = (Math.round(Number(self.state.totalFinalAmount) + (Number(item.product[i].amount))));
                        self.state.advance = (Math.round(item.product[i].advance));
                        self.state.discount = (Math.round(item.product[i].discount));
                        self.state.subtotal1 = (Math.round(item.product[i].subtotal1));

                        self.state.orderDetails = orderDetails; 
                        console.log("self.state.orderDetails", orderDetails);
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

                            orderDetails: self.state.orderDetails
                        })
console.log("self.state.orderDetails", self.state.orderDetails);


                    }
                }
                })
                // var SubtotalwithoutGst = ((Number(data[0].subtotal1)) - (Number((data[0].totalGst)))).toLocaleString();
                // self.setState({

                //     SubtotalwithoutGst: SubtotalwithoutGst,
                // });
                pageCount = (Math.trunc(((Number(count)) / 10))) + 1;

                self.state.count = count;
                // self.state.groups = groups;
                self.state.pageCount = pageCount;
                self.setState({
                    count: count,
                    // groups: groups,
                    data: data,
                    pageCount: pageCount
                })
                console.log("orderdetailsssss", self.state.orderDetails);
                console.log("orderDetailsLENGTH in PrintFormat", self.state.orderDetails.length);
                console.log("orderDetails in PrintFormat", self.state.orderDetails);
                console.log("productgst in PrintFormat", self.state.productgst);
                // console.log("Groups", groups);
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
                {[...Array(this.state.pageCount)].map((e, i) => {
                    return (
                        // console.log("I Value", i),                
                            <tr class="page-wrapper-tr" style={{ pageBreakInside: "avoid", pageBreakAfter: "auto", position: "relative" }}><td>

                                <div class="page-wrapper" style={{ height: "1010px", paddingBottom: "50px",/* borderBottom: "3px dashed #000"*/ margin: "0px auto", position: "relative" }}>      <PageHeader data={this.props.data} />
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
                                        currencySymbol={this.props.item.currencySymbol}
                                        amountInWords={this.props.item.amountInWords}

                                    />
                                </div></td></tr>
                        )
                })}
            </table>

                <p></p>


            </div >

        );
    }
}

export default PurchasePrintFormat1;