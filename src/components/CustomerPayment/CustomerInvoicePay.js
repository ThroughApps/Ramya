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
import {CustomRazorPayFunc} from './RazorPay';
import * as moment from "moment";
import CustomerInvoiceCopy from './CustomerInvoiceCopy';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from '../ConstSiteFunction';

var paymentConfigArray=[];
export default class CustomerInvoicePay extends Component {
  constructor(data) {
    super(data)

    this.state = {
     companyId:'',
     customerId:'',
     data:[],
     columns:[],
     selected:-1,
     invoiceNo:'',
     paymentGateway:'',
    }

    this.PaymentChanges=this.PaymentChanges.bind(this);

  }


  componentDidMount() {
    SetCurrentPage("customerInvoicePay");
    var self=this;

    $("#nopayoption").empty();
    $(".razorpay").hide();

    console.log("PROPS STATEdATA :",this.props.stateData); //currentInvoiceArray
 //   console.log("PROPS paymentConfigArray :",this.props.paymentConfigArray);
 //   console.log("PROPS timeZoneArray :",this.props.timeZoneArray);
 

 this.state.currentInvoiceArray=this.props.stateData.currentInvoiceArray;
 this.state.bankDetailsArray=this.props.stateData.bankDetailsArray;


 this.state.customerInvoiceArray= this.state.currentInvoiceArray;

 console.log("CUSTOMER INVOICE PAY :this.state.currentInvoiceArray :",this.state.currentInvoiceArray); 

 this.setState({
    customerInvoiceArray:this.state.customerInvoiceArray,
    bankDetailsArray:this.state.bankDetailsArray,
 })

    var orderIdCheck="Exist";
    if(this.props.stateData.invoiceNo!=undefined || 
        this.props.stateData.invoiceNo!=null  ){
    //    console.log("STATE DATA :",this.props.stateData);
        //POPULATE INVOICE DETAILS
     
        this.state.orderId=this.props.stateData.orderId;

    /*    console.log("GENERATE ORDER ID CONDITION :","this.props.stateData.orderId==undefined :",this.props.stateData.orderId==undefined,
          "this.props.stateData.orderId :",this.props.stateData.orderId,
       " this.props.stateData.amount != this.props.stateData.amountatorderid :", this.props.stateData.amount != this.props.stateData.amountatorderid,
     "this.props.stateData.amount :",this.props.stateData.amount,
    "this.props.stateData.amountatorderid  :",this.props.stateData.amountatorderid );
*/

        if(this.props.stateData.orderId==undefined || this.props.stateData.orderId=="" ||
            this.props.stateData.amount != this.props.stateData.amountatorderid  ){
            orderIdCheck="Not_Exist";
            this.state.orderId=this.props.stateData.companyId+"_"+this.props.stateData.invoiceNo;
        }
        this.state.companyId=this.props.stateData.companyId;
        this.state.customerId=this.props.stateData.customerId;
        this.state.invoiceNo=this.props.stateData.invoiceNo;
        this.state.amount=this.props.stateData.amount;
     
        this.state.invoiceAmount=this.props.stateData.amount;

        this.state.garageName=this.props.stateData.garageName;
        this.state.contactNo=this.props.stateData.contactNo;
        this.state.emailId=this.props.stateData.emailId;
        this.state.customerName=this.props.stateData.customerName;

        this.state.siteName=this.props.stateData.siteName;
        this.state.type=this.props.stateData.type;
        this.state.amountatorderid=this.props.stateData.amountatorderid;

     //   console.log("SITE NAME :",this.state.siteName);

        var timeZoneArray=this.props.timeZoneArray;

      /*  if(orderIdCheck=="Not_Exist"){
        this.GenerateOrderId(timeZoneArray);
        } */

        this.setState({
            amountatorderid:this.state.amountatorderid,
        })

    } 

     paymentConfigArray=[];
     paymentConfigArray=this.props.paymentConfigArray;
   

    if(paymentConfigArray.length >0){

        var active_Payment_Gateway_Array=_.where(paymentConfigArray,{status:"1"});

     //   console.log("active_Payment_Gateway_Array :",active_Payment_Gateway_Array);

        if(active_Payment_Gateway_Array.length >0){
            $("#nopayoption").empty();

            $.each(active_Payment_Gateway_Array, function (i, item) {
                $("."+item.paymentGateway).show();
                
                self.state.paymentGateway=item.paymentGateway;

                self.setState({
                    paymentGateway:self.state.paymentGateway,
                })
            });

            if(orderIdCheck=="Not_Exist"){
                //
                this.GenerateOrderId(timeZoneArray);
                }

        }else{
            $("#nopayoption").append("No Payment Option Provided");
            $(".razorpay").hide();
        }

    }else{
        $("#nopayoption").append("No Payment Option Provided");
        $(".razorpay").hide();
    }

    this.CallCustomerInvoiceCopyView();

  }

  CallCustomerInvoiceCopyView(){

    var self=this;
    self.payChild.PopulateViewData(this.state.currentInvoiceArray,this.state.bankDetailsArray);

  }
  calcTime(city, offset) {
    // create Date object for current location
    var d = new Date();


    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000 * offset));

    // return time as a string
    return nd;
}


GetTimeZoneDate(offset) {
    //  var offset = -8;
    var todayDate = new Date(new Date().getTime() + offset * 3600 * 1000).toUTCString().replace(/ GMT$/, "")


    var d1 = new Date(todayDate);
    var d2 = d1.getFullYear() + "-"
        + ('0' + (d1.getMonth() + 1)).slice(-2) + "-"
        + ('0' + d1.getDate()).slice(-2);


    return d2;

}

  GenerateOrderId(timeZoneArray){

    console.log("timeZoneArray :",timeZoneArray);
    var siteName=(this.state.siteName).toString();

    var currentSiteDetails=_.where(timeZoneArray,{siteName:this.state.siteName});

 //   console.log("currentSiteDetails :",currentSiteDetails," SITE NAME :",this.state.siteName);

    var offset = moment.tz(moment.utc(), currentSiteDetails[0].timeZone).utcOffset();
    var offsetValue = Number(offset) / 60; //CONVERTING MIN INTO HRS

    
    var timings = this.calcTime(currentSiteDetails[0].timeZone, offsetValue);
    var date = this.GetTimeZoneDate(offsetValue);
    var time = timings.toLocaleTimeString([], { hour12: false });

   var decimalCheck=this.state.amount.indexOf(".") ;

    var razorpayAmount=0;

    if(decimalCheck== -1){
        //NOT A DECIMAL
        razorpayAmount=this.state.amount * 100;
    }else{
        //DECIMAL
        var beforeDecimal=this.state.amount.split(".")[0];
        var afterDecimal=this.state.amount.split(".")[1];

        razorpayAmount=Number(beforeDecimal*100)+Number(afterDecimal);

    }

 //   console.log("razorpayAmount :",razorpayAmount);
    var self=this;

    var razorPayMerchantId_Key=_.where(paymentConfigArray,{paymentGateway:'razorpay'});


      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          companyId: this.state.companyId,
          customerId:this.state.customerId,  
          invoiceAmount:this.state.invoiceAmount,
          amount:razorpayAmount,
          receipt:this.state.orderId,
          invoiceNo:this.state.invoiceNo,
          date:date,
          time:time,
          razorPayMerchantId:razorPayMerchantId_Key[0].merchantId,
          razorPayMerchantKey:razorPayMerchantId_Key[0].merchantKey,

        }),
          url:  "http://15.206.129.105:8080/ThroughBooksCOAPI/CustomerPayment/GetOrderId",
 //   url: "https://checkout.razorpay.com/v1/orders",
        contentType: "application/json",
        dataType: 'json',
        crossDomain:true,
        success: function (data, textStatus, jqXHR) {
  
       //     console.log("ORDERS :",data);
            self.state.orderId=data.orderId;

            self.setState({
                orderId:self.state.orderId
            })
      
            self.props.OrderIdChange(data);
        },
        error: function (data, textStatus, jqXHR) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Network Connection Problem',
            showConfirmButton: false,
            timer: 2000
          })
  
  
        },
  
      });
      
  }

  PaymentChanges(data){

    var self=this;
  //  console.log(" *********** PaymentChanges ***************:",data);
    self.props.PaymentChangesInvoiceList(data);

  }


  render() {
  
    return (

      <div class="container">

<div class="">
<div id="razorpay" class="razorpay">
      <CustomRazorPayFunc data={this.state} amount={this.state.amount} garageName={this.state.garageName}
       paymentConfigArray={this.props.paymentConfigArray} orderId={this.state.orderId} 
       contactNo={this.state.contactNo} emailId={this.state.emailId} 
       amountatorderid={this.state.amountatorderid}
       customerName={this.state.customerName} 
       timeZoneArray={this.props.timeZoneArray} siteName={this.state.siteName} 
       companyId={this.state.companyId} customerId={this.state.customerId} 
       invoiceNo={this.state.invoiceNo} type={this.state.type} 
       PaymentChanges={this.PaymentChanges}
       invoiceListArray={this.props.invoiceListArray}  /> 
</div>
</div>


    <CustomerInvoiceCopy onRef={ref => (this.payChild = ref)}/>


<div id="nopayoption"></div>

      </div>
    );
  }

}

