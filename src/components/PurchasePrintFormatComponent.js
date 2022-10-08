import React, { Component } from 'react';
import $ from 'jquery';
import _ from 'underscore';
import CryptoJS from 'crypto-js';
import './print.css';
import {
    GetEmployeeSite, GetCurrentSite, GetSiteDetails,
    GetCurrencies, SetCurrentPage
} from './ConstSiteFunction';

var HeaderAsProduct;
var ContentAsProduct;
var HeaderAsService;
var ContentAsService;

var productArray = [];
var productArrayFinal = [];
var serviceArray = [];
const td1Style = {
    padding: "0px 10px",
    fontSize: "9px",
    verticalAlign: "top",
    lineHeight: "15px",
    textAlign: "center",

}
const td1StyleContent = {
    borderRight:"1px solid #0070C0",
    borderLeft:"1px solid #0070C0",
    padding: "0px 10px",
    fontSize: "9px",
    verticalAlign: "top",
    lineHeight: "15px",
    textAlign: "left",
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
    borderRight:"1px solid #0070C0",
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
    textAlign: "center",

}
const td3StyleContent = {
    borderRight:"1px solid #0070C0",
    padding: "0px 3px",
    fontSize: "9px",
    verticalAlign: "top",
    lineHeight: "15px",
    textAlign: "left",
}
const td456StyleContent = {
    borderRight:"1px solid #0070C0",
    padding: "0px 5px",
    fontSize: "9px",
    verticalAlign: "top",
    lineHeight: "15px",
    textAlign: "left",
}
const td45StyleContent = {
    borderRight:"1px solid #0070C0",
    padding: "0px 22px",
    fontSize: "9px",
    verticalAlign: "top",
    lineHeight: "15px",
    textAlign: "left",
}
const td7StyleContent = {
    borderRight:"1px solid #0070C0",
    padding: "0px 22px",
    fontSize: "9px",
    verticalAlign: "top",
    lineHeight: "15px",

}
const td8StyleContent = {
    borderRight:"1px solid #0070C0",
    padding: "0px 5px",
    fontSize: "9px",
    verticalAlign: "top",
    lineHeight: "15px",
    textAlign: "left",

}
const td9StyleContent = {
    borderRight:"1px solid #0070C0",
    padding: "0px 20px",
    fontSize: "9px",
    verticalAlign: "top",
    lineHeight: "15px",
    textAlign: "left",

}
const td10StyleContent = {
    borderRight:"1px solid #0070C0",
    padding: "0px 2px",
    fontSize: "9px",
    verticalAlign: "top",
    lineHeight: "15px",
    textAlign: "left",

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
export class PageHeader extends React.Component {

    constructor(props) {
        super(props)
        var today = new Date();
        var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

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
        var area = CryptoJS.AES.decrypt(localStorage.getItem('Area'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var zipCode = CryptoJS.AES.decrypt(localStorage.getItem('Zipcode'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var GstNo = CryptoJS.AES.decrypt(localStorage.getItem('GSTNo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var userName;

        if (this.props.data.companyName == " " || this.props.data.companyName == null || this.props.data.companyName == "-") {
            userName = this.props.data.userName;
        } else {
            userName = this.props.data.companyName;
        }

        this.state = {

            date: today1,
            companyId: companyId,
            companyName: companyName,
            companyAddress: companyAddress,
            companyEmail: companyEmail,
            contactNo: contactNo,
            doorNo: doorNo,
            floor: floor,
            street: street,
            place: place,
            state: state,
            landlineNo: landlineNo,
            feedbackNo: feedbackNo,
            area: area,
            zipCode: zipCode,
            // companyLogo:companyLogo,
            GstNo: GstNo,
                }

    }
    componentDidMount() {

        SetCurrentPage("PurchasePrintFormatComponent");



        $(".btn-default").css("background-color", "#05a4b5");
        $(".btn-default").css("color", "white");
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        console.log("PageHeader", this.props.data.logo);
        if (companyId == "127") {

            $(".centerPositionCompany").hide();
            $(".centerPositionCompany").css("visibility", "hidden");
            $(".centerPositionCompany").css("display", "none");
            $(".leftPosition").hide();
            $(".centerPositionLogo").show();
        console.log("PageContent orderDetails", this.props.orderDetails);
        console.log("PageContent orderDetailsLENGTH", this.props.orderDetails.length);


        } else {
            $(".centerPositionLogo").hide();
            $(".centerPositionCompany").show();
            $(".leftPosition").show();
        }

        window.scrollTo(0, 0);






    }


    render() {
        return (
            <div class="page-header" style={{ position: "relative", marginBottom: "0px", marginTop: "0px" }}>

                <table cellspacing="0" cellpadding="0" class="branding " width="100%" style={{ borderLeft: "1px solid", borderRight: " 1px solid", borderTop: "1px solid", borderColor: "#0070C0" }} >
                    <tbody><tr style={{display:"flex", alignItems:"center",justifyContent:"space-between"}}>
                        <td style={{ position: "relative", verticalAlign: "top" }}>
                            <img id="photo" src={this.props.data.logo} class="leftPosition" style={{ width: "100px", padding: "0.1%", margin: "0", padding: "14px", border: "0", fontSize: "100%", font: "inherit", verticalAlign: "baseline" }} />
                        </td>
                        <td style={{ position: "relative", verticalAlign: "top", textAlign: "center",padding:"0px 5px" }}>
                <span id="lbl_company_name" class="centerPositionCompany" style={{ verticalAlign: "top", fontSize: "23px", textAlign: "center", fontWeight: "bold", lineHeight: "30px", paddingLeft: "0px", paddingBottom: "5px", paddingRight: "0px" }}> {this.state.companyName}</span>
                <img id="photo1" src={this.props.data.logo} class="centerPositionLogo" style={{ height: "5rem", width: "24rem", margin: "0", padding: "4px", border: "0", fontSize: "100%", font: "inherit", verticalAlign: "baseline" }} /><br />
                            <span style={{ fontSize: "12px"}} >{this.state.doorNo},{this.state.floor},</span><br />
                            <span style={{ fontSize: "12px"}}>{this.state.street},</span><br />
                            <span style={{ fontSize: "12px"}}>{this.state.place},{this.state.state}</span><br />
                            </td>
                        <td style={{ verticalAlign: "top", marginRight: "5%",padding:"14px 0px"}}>
                                            <b>Phone: </b>  <span style={{ fontSize: "12px" }} id="ContentPlaceHolder1_lbl_company_contact">{this.state.contactNo}</span><br />                                     
                                            <b>Email:</b> <span style={{ fontSize: "11px"}} id="ContentPlaceHolder1_lbl_company_email">{this.state.companyEmail}</span>
                                        </td>
                                    </tr>
                                </tbody></table>
                <table cellspacing="0" cellpadding="0" style={{ width: "100%", border: "1px solid #0070C0", padding: "0", margin: "0" }} class="invoice">
                    <tbody>
                    <tr style={{ borderRight: "1px solid #0070C0", borderBottom: "1px solid #0070C0" }}>
                            <td style={{ paddingLeft: "7px", borderBottom: "1px solid #0070C0"  }} class="gstin"><span >GSTIN :</span> <span style={{ fontWeight: "bold", textAlign: "left" }} id="lbl_company_gst">{this.state.GstNo}</span></td>
                            <td style={{ textAlign: "center", fontSize: "20px", color: "#0070C0", padding: "3px 82px", fontWeight: "bold", borderBottom: "1px solid #0070C0"  }} class="invoice-title"> TAX Invoice <span style={{ textAlign: "right", paddingRight: "5px", fontSize: "11px", fontWeight: "bold" }} class="copyname"></span></td>
                        </tr>
                        <tr>
                            <td style={{ borderRight: "1px solid #0070c0",verticalAlign:"top" }}>
                                <table style={{width:"100%"}}>
                                    <tbody>
                                        <tr>
                                            <td colspan="2" style={{textAlign: "top",  fontWeight: "bold", textAlign: "center", padding: "2px 5px 0px 5px", fontSize: "11px", verticalAlign: "top" }}>Customer Detail</td></tr>
                                        <tr>
                                            <td style={{ fontWeight: "bold", padding: "2px 5px 0px 5px", fontSize: "11px", verticalAlign: "top"}} >Customer Name:</td>
                                            <td style={{ fontWeight: "bold", overflow: "hidden", padding: "2px 5px 0px 5px", fontSize: "11px", verticalAlign: "top" }}><span >{this.state.userName}</span></td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontWeight: "bold", padding: "2px 5px 0px 5px", fontSize: "11px", verticalAlign: "top"}}>Phone:</td>
                                            <td style={{ fontWeight: "bold", padding: "2px 5px 0px 5px", fontSize: "11px", verticalAlign: "top"}}><span >{this.state.customerContactno}</span></td>
                                        </tr>
                                    </tbody></table>
                            </td>

                            <td style={{ borderBottom: "1px solid #0070C0", verticalAlign: "top" }}>
                                <table cellspacing="0" class="invoicedata ">
                                    <tbody>

                                        <tr>
                                            <td style={{ fontWeight: "bold", padding: "3px 5px 0px 5px", fontSize: "11px", verticalAlign: " top"}}>Invoice No.</td>
                                            <td style={{ fontWeight: "bold", fontSize: "12px", padding: "3px 5px 0px 5px", fontSize: "11px", verticalAlign: " top"}}><span >{this.state.id}</span></td>

                                        </tr>
                                        <tr>
                                            <td style={{ fontWeight: "bold", padding: "3px 5px 0px 5px", fontSize: "11px", verticalAlign: " top"}}>Invoice Date</td>
                                            <td style={{ padding: "3px 5px 0px 5px", fontSize: "11px", verticalAlign: " top"}}><span >{this.state.invoiceDate}</span></td>

                                        </tr>

                                        <tr>
                                            <td style={{ fontWeight: "bold", padding: "3px 5px 0px 5px", fontSize: "11px", verticalAlign: " top"}}>Order No.</td>
                                            <td style={{ padding: "3px 5px 0px 5px", fontSize: "11px", verticalAlign: " top"}} colspan="3"><span >{this.state.orderNumber}</span></td>
                                        </tr>

                                        <tr>
                                            <td style={{ fontWeight: "bold", padding: "3px 5px 0px 5px", fontSize: "11px", verticalAlign: " top"}}>GST No.</td>
                                            <td style={{ padding: "3px 5px 0px 5px", fontSize: "11px", verticalAlign: " top"}} colspan="3"><span >{this.state.customerGstNo}</span></td>
                                        </tr>

                                        <tr>
                                            <td style={{ fontWeight: "bold", padding: "3px 5px 0px 5px", fontSize: "11px", verticalAlign: " top"}}>Email:</td>
                                            <td style={{ padding: "3px 5px 0px 5px", fontSize: "11px", verticalAlign: " top"}} colspan="3"><span >{this.state.customerEmail}</span></td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontWeight: "bold", padding: "3px 5px 0px 5px", fontSize: "11px", verticalAlign: " top"}}>Address:</td>
                                            <td style={{ padding: "3px 5px 0px 5px", fontSize: "11px", verticalAlign: " top"}} colspan="3"><div style={{ height: "40px", overflow: "hidden" }}><span >{this.state.customerAddress}</span></div></td>
                                        </tr>

                                    </tbody></table>

                            </td>
                        </tr>

                    </tbody></table>
            </div>
        );
    }
}

export class PageContent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

            orderDetails: this.props.orderDetails,

        }

    }
    componentDidMount() {
        SetCurrentPage("PurchasePrintFormatComponent");
        //this.productArrayDetails(this.props.count)

    }
    productArrayDetails(pageCount) {
        console.log("loop iterating")

        console.log("PageContent orderDetails", this.props.orderDetails);
        console.log("PageContent orderDetailsLENGTH", this.props.orderDetails.length);

        var self = this;
        productArrayFinal = [];
        self.state.totalQty = 0;
        self.state.totalAmount = 0;
        self.state.totalFinalAmount = 0;


        //   var groups = _.groupBy(data, function (value) {                  
        //       return value.productType;
        //                   });

        var pageStart = pageCount * 10;
        var pageEnd = (((pageCount + 1) * 10) - 1);

        var temp;
        for (var i = pageStart; i <= pageEnd && i < (this.props.orderDetails.length); i++) {
            //temp = JSON.parse(JSON.stringify(this.props.orderDetails[i]));

            console.log("for loop iterating", i);


            ContentAsProduct = <tr><td style={td1StyleContent}>{this.props.orderDetails[i].SNO}</td>
                <td style={td2StyleContent}> {this.props.orderDetails[i].product} </td>
                <td style={td3StyleContent}>{this.props.orderDetails[i].rate}</td>
                <td style={td45StyleContent}>{this.props.orderDetails[i].quantity}</td>
                <td style={td45StyleContent}>{this.props.orderDetails[i].sTotal}</td>
                <td style={td456StyleContent}>{this.props.orderDetails[i].cgst}</td>
                <td style={td7StyleContent}>{this.props.orderDetails[i].cgstAmount}</td>
                <td style={td8StyleContent}>{this.props.orderDetails[i].sgst}</td>
                <td style={td9StyleContent}>{this.props.orderDetails[i].sgstAmount}</td>
                <td style={td10StyleContent}>{this.props.orderDetails[i].amount}</td>
            </tr>;

            productArrayFinal.push(ContentAsProduct);


            self.state.productArrayFinal = productArrayFinal;




        }
        console.log("ProductArray", productArrayFinal)
        return productArrayFinal;
    }



    render() {
        return (
            <div>
                <div class="page-content" style={{ position: "relative"}}>
                    <table class="tabl" cellspacing="0" border="0" cellpadding="0" style={{ padding: "5px 2px", fontSize: "11px", verticalAlign: "top", lineHeight: "15px", width: "100%" }}>
                        <thead class="billdetailsthead" style={{ borderTop: "1px solid #0070C0", borderBottom: "1px solid #0070C0" }}>
                            <tr>
                                <td class="valign-mid" style={{ verticalAlign: "middle", fontSize: "9px", backgroundColor: "#E8F3FD", textAlign: "center", fontWeight: "bold", border: "1px solid #0070C0", padding: "5px 2px" }} rowspan="2">S.No</td>
                                <td class="valign-mid" style={{ verticalAlign: "middle", fontSize: "9px", backgroundColor: "#E8F3FD", textAlign: "center", fontWeight: "bold", border: "1px solid #0070C0", padding: "5px 2px" }} rowspan="2">Name of Product / Service</td>
                                <td class="valign-mid" style={{ verticalAlign: "middle", fontSize: "9px", backgroundColor: "#E8F3FD",  border: "1px solid #0070C0",textAlign: "center", fontWeight: "bold", padding: "5px 2px" }} rowspan="2">Rate</td>
                                <td class="valign-mid" style={{ verticalAlign: "middle", border: "1px solid #0070C0",  fontSize: "9px", backgroundColor: "#E8F3FD", textAlign: "center", fontWeight: "bold", padding: "5px 2px" }} rowspan="2">Qty</td>
                                <td class="valign-mid" style={{ verticalAlign: "middle", fontSize: "9px", backgroundColor: "#E8F3FD", textAlign: "center", border: "1px solid #0070C0",  fontWeight: "bold", padding: "5px 2px" }} rowspan="2">Taxable Value</td>
                                <td class="valign-mid" style={{ fontSize: "9px", backgroundColor: "#E8F3FD", textAlign: "center", fontWeight: "bold",border: "1px solid #0070C0", padding: "5px 2px" }} colspan="2" >CGST</td>
                                <td class="valign-mid" style={{ fontSize: "9px", backgroundColor: "#E8F3FD", textAlign: "center", fontWeight: "bold",border: "1px solid #0070C0",padding: "5px 2px" }} colspan="2" >SGST</td>
                                <td class="valign-mid" style={{ fontSize: "9px", backgroundColor: "#E8F3FD", textAlign: "center", fontWeight: "bold",border: "1px solid #0070C0", padding: "5px 2px" }} rowspan="2">Total </td>
                            </tr>
                            <tr> 
                                <td style={{ fontSize: "9px", borderLeft: "none", backgroundColor: "#E8F3FD", textAlign: "center", fontWeight: "bold", padding: "5px 2px",border: "1px solid #0070C0" }}>%</td>
                                <td style={{ fontSize: "9px", backgroundColor: "#E8F3FD", textAlign: "center", fontWeight: "bold", padding: "5px 2px",border: "1px solid #0070C0" }}>Amount</td>
                                <td style={{ fontSize: "9px", backgroundColor: "#E8F3FD", textAlign: "center", fontWeight: "bold", padding: "5px 2px",border: "1px solid #0070C0" }}>%</td>
                                <td style={{ fontSize: "9px", backgroundColor: "#E8F3FD", textAlign: "center", fontWeight: "bold", padding: "5px 2px",border: "1px solid #0070C0" }}>Amount</td>

                            </tr>
                        </thead>
                        <tbody class="billdetailstbody" id="billdetailstbody" >
                            {this.productArrayDetails(this.props.count)}
                            {/* {this.state.productArray}  */}
                        </tbody>
                        <tbody class="invoicedataFooter" cellspacing="0" style={{ width: "100%" }}><tr>
                            <td colspan="3" class="txt-bold txt-right" style={{ textAlign: "right", fontSize: "10px", backgroundColor: "#E8F3FD", padding: "5px 1px 5px 0px", border: "1px solid #0070C0" }}><span>Total </span></td>
                            <td class="txt-bold txt-right" style={{ textAlign: "center", fontSize: "10px", backgroundColor: "#E8F3FD", padding: "5px 1px 5px 0px", border: "1px solid #0070C0" }}><span> {this.props.totalQty}</span></td>
                            <td class="txt-bold txt-right" style={{ textAlign: "center", fontSize: "10px", backgroundColor: "#E8F3FD", padding: "5px 1px 5px 0px", border: "1px solid #0070C0" }}><span id="lbl_total_taxable">{this.props.totalAmount}</span></td>
                            <td colspan="2" class="txt-bold txt-right" style={{ textAlign: "center", fontSize: "10px", backgroundColor: "#E8F3FD", padding: "5px 1px 5px 0px", border: "1px solid #0070C0" }}><span id="lbl_total_cgst">{this.props.totalcgst}</span></td>
                            <td colspan="2" class="txt-bold txt-right" style={{ textAlign: "center", fontSize: "10px", backgroundColor: "#E8F3FD", padding: "5px 1px 5px 0px", border: "1px solid #0070C0" }}><span id="lbl_total_sgst">{this.props.totalsgst}</span></td>
                            <td class="txt-bold txt-right" style={{ textAlign: "center", fontSize: "10px", backgroundColor: "#E8F3FD", padding: "5px 1px 5px 0px", border: "1px solid #0070C0" }}><span id="lbl_sub_total">{this.props.totalFinalAmount}</span></td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}

export class PageFooter extends React.Component {

    constructor(props) {
        super(props)
        var bankName = CryptoJS.AES.decrypt(localStorage.getItem('BankName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var branchName = CryptoJS.AES.decrypt(localStorage.getItem('BranchName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var accountNo = CryptoJS.AES.decrypt(localStorage.getItem('AccountNo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var ifscCode = CryptoJS.AES.decrypt(localStorage.getItem('IfscCode'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var accountName = CryptoJS.AES.decrypt(localStorage.getItem('AccountName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)


        this.state = {
            options: [],
            bankName: bankName,
            branchName: branchName,
            accountNo: accountNo,
            ifscCode: ifscCode,
            accountName: accountName,
            qrCodeImage: this.props.qrCodeImage


        }

    }
    componentDidMount() {
        SetCurrentPage("PurchasePrintFormatComponent");
        console.log("PageFooter qrCodeImage ", this.props.qrCodeImage);
    }



    render() {
        return (
            <div class="page-footer">
                <table cellspacing="0" cellpadding="0" class="invoice" style={{ width: "100%" }}>
                    <tbody><tr>
                        <td class="main-border" style={{ borderBottom: "none", borderTop: "none", border: "1px solid #0070C0", padding: "0", margin: "0" }}>

                            <table cellspacing="0" style={{ width: "100%" }}>

                                <tbody><tr>
                                    <td style={{ borderTop: "none", borderRight: "none", borderLeft: "none", verticalAlign: "top",width:"50%" }}>

                                        <table cellspacing="0" style={{ width: "100%", borderCollapse: "collapse",border:"1px solid #0070C0"  }} class="invoiceInfo">
                                            <tbody><tr>
                                                <td colspan="2" style={{ width: "100%", textAlign: "center", padding: "3px 5px", fontSize: "11px",fontWeight: "bold", border: "1px solid #0070C0", borderBottom: "none", borderLeft: "none", borderRight: "none" }}>{/*Invoice Total in words*/}</td>
                                            </tr>
                                                <tr>
                                                    <td colspan="2" style={{ width: "100%", textAlign: "center", fontSize: "11px", lineHeight: "15px", height: "30px", verticalAlign: "middle", textTransform: "capitalize", padding: "3px 5px", fontSize: "11px",fontWeight: "bold", border: "1px solid #0070C0", borderTop: "none", borderLeft: "none", borderRight: "none" }}>
                                                        Amount Chargeable :{this.props.amountInWords}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" style={{ width: "100%", textAlign: "center", borderBottom: "none", padding: "3px 5px", fontSize: "11px",fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>Bank Details</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ borderRight: "none", borderBottom: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px",fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>Accountant Name</td>
                                                    <td style={{ borderLeft: "none", borderBottom: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px",fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}><span id="lbl_bank_name">{this.state.accountName}</span> </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ borderRight: "none", borderBottom: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px",fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>Bank Name</td>
                                                    <td style={{ borderLeft: "none", borderBottom: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px",fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}><span id="lbl_bank_name">{this.state.bankName}</span> </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ borderRight: "none", borderBottom: "none", borderTop: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px",fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>Branch Name</td>
                                                    <td style={{ borderLeft: "none", borderBottom: "none", borderTop: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px",fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}><span id="lbl_branch_name">{this.state.branchName}</span> </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ borderRight: "none", borderTop: "none", borderBottom: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px",fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>Bank Account Number</td>
                                                    <td style={{ borderLeft: "none", borderTop: "none", borderBottom: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px",fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}><span id="lbl_ac_no">{this.state.accountNo}</span> </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ borderRight: "none", borderTop: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px",fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>Bank Branch IFSC</td>
                                                    <td style={{ borderLeft: "none", borderTop: "none", fontWeight: "normal", padding: "3px 5px", fontSize: "11px",fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}><span id="lbl_ifsc">{this.state.ifscCode}</span> </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" style={{ width: "100%", textAlign: "center", borderBottom: "none", padding: "0px 5px", fontSize: "11px",fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>Feedback</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" style={{ width: "100%", borderBottom: "none", padding: "3px 5px", fontSize: "11px",fontWeight: "bold", border: "1px solid #0070C0", borderLeft: "none", borderRight: "none" }}>

                                                        <div style={{ height: "150px", width: "100%", overflow: "hidden", fontWeight: "bold", fontSize: "10px", borderBottom: "none" }}>


                                                        </div>


                                                    </td>

                                                </tr>
                                            </tbody></table>
                                    </td>
                                    <td style={{ borderTop: "none", verticalAlign: "top",border:"1px solid #0070C0" }}>
                                        <table cellspacing="0" style={{ width: "100%", borderCollapse: "collapse",border:"1px solid #0070C0" }} class="invoiceTotal">

                                            <tbody><tr>
                                                <td class="txt-bg" style={{ padding: "3px 5px", fontSize: "10px",fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}>Taxable Amount ({this.props.currencySymbol})</td>
                                                <td class="txt-bg txt-right" style={{ padding: "3px 5px", fontSize: "10px",fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD", textAlign: "right" }}><span id="lbl_total_taxable2">{this.props.totalAmount1}</span></td>
                                            </tr>
                                                <tr>
                                                    <td style={{ padding: "3px 5px", fontSize: "10px",fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}>{this.state.tax1LabelName} ({this.props.currencySymbol})</td>
                                                    <td class=" txt-right" style={{ padding: "3px 5px", fontSize: "10px",fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD", textAlign: "right" }}><span id="lbl_total_cgst2">{this.props.totalcgst1}</span></td>
                                                </tr>
                                                <tr>
                                                    <td style={{ padding: "3px 5px", fontSize: "10px",fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}>{this.state.tax1LabelName} ({this.props.currencySymbol})</td>
                                                    <td class=" txt-right" style={{ padding: "3px 5px", fontSize: "10px",fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD", textAlign: "right" }}><span id="lbl_total_sgst2">{this.props.totalsgst1}</span></td>
                                                </tr>

                                                <tr>
                                                    <td class="txt-bg" style={{ padding: "3px 5px", fontSize: "10px",fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}>Product Tax ({this.props.currencySymbol})</td>
                                                    <td class="txt-bg txt-right" style={{ padding: "3px 5px", fontSize: "10px",fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD", textAlign: "right" }}><span id="lbl_product_gst">{this.props.productgst}</span></td>
                                                </tr>
                                                <tr>
                                                    <td class="txt-bg" style={{ padding: "3px 5px", fontSize: "10px",fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}>Service Tax ({this.props.currencySymbol})</td>
                                                    <td class="txt-bg txt-right" style={{ padding: "3px 5px", fontSize: "10px",fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD", textAlign: "right" }}><span id="lbl_service_gst">{this.props.servicegst}</span></td>
                                                </tr>
                                                <tr>
                                                    <td class="txt-bg" style={{ padding: "3px 5px", fontSize: "10px",fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}>Total Tax ({this.props.currencySymbol})</td>
                                                    <td class="txt-bg txt-right" style={{ padding: "3px 5px", fontSize: "10px",fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD", textAlign: "right" }}><span id="lbl_total_gst">{this.props.totalgst}</span></td>
                                                </tr>
                                                <tr>
                                                    <td class="txt-bg" style={{ padding: "3px 5px", fontSize: "10px",fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}>Total Amount After Tax ({this.props.currencySymbol})</td>
                                                    <td class="txt-bg txt-right" style={{ padding: "3px 5px", fontSize: "10px",fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD", textAlign: "right" }}><span id="lbl_sub_total2">{this.props.totalFinalAmount1}</span></td>
                                                </tr>
                                                <tr>
                                                    <td class="txt-bg" style={{ padding: "3px 5px", fontSize: "10px",fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}>Discount ({this.props.currencySymbol})</td>
                                                    <td class="txt-bg txt-right" style={{ padding: "3px 5px", fontSize: "10px",fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD", textAlign: "right" }}><span id="lbl_discount">{this.props.discount}</span></td>
                                                </tr>
                                                <tr>
                                                    <td class="txt-bg" style={{ padding: "3px 5px", fontSize: "10px",fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD" }}>Total Paid Amount ({this.props.currencySymbol})</td>
                                                    <td class="txt-bg txt-right" style={{ padding: "3px 5px", fontSize: "14px",fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none", backgroundColor: "#E8F3FD", textAlign: "right" }}><span id="lbl_adjustment">{this.props.advance}</span></td>
                                                </tr>


                                                <tr>
                                                    <td colspan="2" style={{ borderBottom: "none", textAlign: "center", fontSize: "8px", padding: "3px 5px",fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none" }}>Certified that the particulars given above are true and correct.</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" style={{ borderTop: "none", borderBottom: "none", textAlign: "center", fontSize: "12px", padding: "3px 5px",fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none" }}>QRCode for Payment</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" style={{ borderBottom: "none", height: "60px", textAlign: "center", padding: "3px 5px", fontSize: "14px",fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none" }}>
                                                        <img id="qrCode" src={this.state.qrCodeImage} style={{ width: "100px" }} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" style={{ borderBottom: "none", textAlign: "center", fontSize: "8px", padding: "3px 5px",fontWeight: "bold", border: "1px solid #0070C0", borderRight: "none" }}>Authorised Sign</td>
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

        );
    }
}