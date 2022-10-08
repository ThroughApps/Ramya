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
import CustomerInvoiceCopy from './CustomerInvoiceCopy';
import '../purchaseReportCss.css';
import "./PaymentReceivablesComponentcss.css";
import "../ServiceRegistration/ServiceRegistrationCSS.css";
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from '../ConstSiteFunction';
/*
RAZOR PAY DETAILS 
ID:rzp_test_4yxPzjlNHFW8EE
KEY:mKCexJWbLCSh6WOkKtxRPuIY
*/
var invoiceListArray = [];
var currentInvoiceArray = [];
var paymentConfigArray = [];
var timeZoneArray = [];
var paymentTransactionArray = [];
var bankDetailsArray=[];

class CustomerInvoiceList extends Component {
  constructor(data) {
    super(data)

    this.state = {
      companyId: '',
      customerId: '',
      data: [],
      columns: [],
      paymentOptions: [],
      selected: -1,
      invoiceNo: '',

      isPaymentPaneOpen: false,
      isViewPaneOpen: false,
      orderId: '',

    }

    this.OrderIdChangeEnable = this.OrderIdChangeEnable.bind(this);
    this.PaymentChangesInvoiceList = this.PaymentChangesInvoiceList.bind(this);
    this.onViewInvoice = this.onViewInvoice.bind(this);
    this.onInvoicePay = this.onInvoicePay.bind(this);

  }


  componentDidMount() {
    SetCurrentPage("CustomerInvoiceList");
    var self = this;

    this.state.paymentOptions = [];
    

    this.state.paymentOptions.push({ label: 'UnPaid & PartiallyPaid', value: 'UnPaid & PartiallyPaid' });
    this.state.paymentOptions.push({ label: 'UnPaid', value: 'UnPaid' });
    this.state.paymentOptions.push({ label: 'PartiallyPaid', value: 'PartiallyPaid' });
    this.state.paymentOptions.push({ label: 'Paid', value: 'Paid' });
    this.state.paymentOptions.push({ label: 'All', value: 'All' });


    this.state.selectedPaymentOption = [];

    this.state.selectedPaymentOption = { label: 'UnPaid & PartiallyPaid', value: 'UnPaid & PartiallyPaid' };
   
    this.state.payment_Status_Opted='UnPaid & PartiallyPaid';

    this.setState({
      payment_Status_Opted:this.state.payment_Status_Opted,
    })
   // var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

  //  console.log("before url companyId :", companyId);


    this.DecodeTheURL();

  /*  var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var customerId = CryptoJS.AES.decrypt(localStorage.getItem('CustomerId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state.companyId = companyId;
    this.state.customerId = customerId;

    this.setState({
      companyId: this.state.companyId,
      customerId: this.state.customerId
    })  */

    this.GetCustomerInvoiceList();

  }

  DecodeTheURL() {

    var url = window.location.href;


    var decodeComponent = decodeURIComponent(url);


    var url = new URL(decodeComponent);

    this.state.companyId = url.searchParams.get("companyId");
    this.state.customerId = url.searchParams.get("customerId");

//    console.log("  this.state.companyId :", this.state.companyId);
console.log("  this.state.customerId :", this.state.customerId);

    if (window.location.href.indexOf("?") > -1) {
      var newUrl = this.refineUrl();
      window.history.pushState("object or string", "Title", "/" + newUrl);

    }

  /*  var urlMatch = window.location.href;
    if (urlMatch.includes('?')) {
      console.log('params found');

      var url = window.location.href;


      var decodeComponent = decodeURIComponent(url);


      var url = new URL(decodeComponent);

      this.state.companyId = url.searchParams.get("companyId");
      this.state.customerId = url.searchParams.get("customerId");

      console.log("  this.state.companyId :", this.state.companyId);

      if (window.location.href.indexOf("?") > -1) {

        localStorage.setItem('CompanyId', CryptoJS.AES.encrypt(this.state.companyId, "shinchanbaby"));
        localStorage.setItem('CustomerId', CryptoJS.AES.encrypt(this.state.customerId, "shinchanbaby"));

        var newUrl = this.refineUrl();
        window.history.pushState("object or string", "Title", "/" + newUrl);
      }

    } else {
      console.log('params not found');
    } */




  }



  refineUrl() {
    //get full url
    var url = window.location.href;
    //get url after/  
    var value = url = url.slice(0, url.indexOf('?'));
    //get the part after before ?
    value = value.replace('@System.Web.Configuration.WebConfigurationManager.AppSettings["BaseURL"]', '');
    return value;
  }


  GetCustomerInvoiceList() {

    var self = this;
    invoiceListArray = [];

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
        customerId: this.state.customerId,
      }),
      //    url: "http://15.206.129.105:8080/ThroughBooksCOAPI/CustomerPayment/GetCustomerInvoiceDetails",
        url:  "http://15.206.129.105:8080/ThroughBooksCOAPI/CustomerPayment/GetCustomerInvoiceDetails",
      contentType: "application/json",
      dataType: 'json',
      success: function (data, textStatus, jqXHR) {

          console.log("CUSTOMER INVOICE LIST DATA :", data);

        self.AssignData_Fields(data);


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


  AssignData_Fields(data) {

    var count = 0;
    var self = this;

    self.state.data = [];
    self.state.columns = [];

    invoiceListArray = [];
    paymentConfigArray = [];
    timeZoneArray = [];
    paymentTransactionArray = [];
    bankDetailsArray=[];

    var sub_customerInvoiceListArray = _.uniq(data.customerInvoiceList, 'invoiceNo');

    invoiceListArray = data.customerInvoiceList;
    paymentConfigArray = data.paymentConfigList;
    timeZoneArray = data.timeZoneAreaList;
    paymentTransactionArray = data.paymentTransactionList;
    bankDetailsArray=data.bankList;

    self.state.bankDetailsArray=bankDetailsArray;
    
     console.log("sub_customerInvoiceListArray :",sub_customerInvoiceListArray,);
     console.log(" self.state.bankDetailsArray :", self.state.bankDetailsArray,);


    self.PopulateTable(sub_customerInvoiceListArray);


  }

  PopulateTable(sub_customerInvoiceListArray) {

    var self = this;
    this.state.count = 0;
    this.state.i=0;
 //   console.log("sub_customerInvoiceListArray :", sub_customerInvoiceListArray);

    if (sub_customerInvoiceListArray.length > 0) {

     var partiallyPaidArray=_.groupBy(sub_customerInvoiceListArray,{paymentStatus:'PartiallyPaid'})
     var unPaidArray=_.groupBy(sub_customerInvoiceListArray,{paymentStatus:'UnPaid'})
     var paidArray=_.groupBy(sub_customerInvoiceListArray,{paymentStatus:'Paid'})

    console.log("partiallyPaidArray :", partiallyPaidArray);
     console.log("unPaidArray :", unPaidArray);     
     console.log("paidArray :", paidArray);

      
     console.log("paidArray TRUE:", paidArray.true);

     console.log("partiallyPaidArray TRUE:", partiallyPaidArray.true);

     console.log("unPaidArray TRUE:", unPaidArray.true);
     
     var partionedPartiallyPaidData = partiallyPaidArray.true;
     var partionedUnPaidData =  unPaidArray.true;
     var partionedPaidData =  paidArray.true;

    
   //  alert("payment_Status_Opted :"+this.state.payment_Status_Opted);

        if(this.state.payment_Status_Opted=="UnPaid"){
    //      alert(" IF :"+"UnPaid");

          this.PopulateUnPaidData(partionedUnPaidData);

        }else if(this.state.payment_Status_Opted=="PartiallyPaid"){
       //   alert(" IF :"+"PartiallyPaid");
          this.PopulatePartiallyPaidData(partionedPartiallyPaidData);

        }else if(this.state.payment_Status_Opted=="Paid"){
       //   alert(" IF :"+"Paid");
          this.PopulatePaidData(partionedPaidData);

        }else if(this.state.payment_Status_Opted=="UnPaid & PartiallyPaid"){
       //   alert(" IF :"+"UnPaid & PartiallyPaid");
         
          this.PopulatePartiallyPaidData(partionedPartiallyPaidData);
          this.PopulateUnPaidData(partionedUnPaidData);

        }else if(this.state.payment_Status_Opted=="All"){
      //    alert(" IF :"+"All");
          
          this.PopulatePartiallyPaidData(partionedPartiallyPaidData);
          this.PopulateUnPaidData(partionedUnPaidData);
          this.PopulatePaidData(partionedPaidData);
        }

        self.setState({
          data: self.state.data,
        });

   //     console.log("self.state.data :",self.state.data);

      if(partionedUnPaidData!=undefined || partionedPartiallyPaidData!=undefined ||
          partionedPaidData!=undefined){
            self.state.columns = self.getColumns();
          }

      self.setState({
        data: self.state.data,
        columns: self.state.columns
      })

    }
  }

  PopulateUnPaidData(partionedUnPaidData){
    var self=this;
  //  alert("PopulateUnPaidData called");

    if(partionedUnPaidData != undefined){
      for (var y = 0; y < partionedUnPaidData.length; y++) {
       var currentPartionedData = partionedUnPaidData[y];
       this.state.count = Number(this.state.count) + Number(1);
 
       self.state.data[this.state.i] = {
         "SNO": this.state.count,
         "Invoice": currentPartionedData.invoiceNo,
         "Date": currentPartionedData.invoiceDate,
         "Booking Id": currentPartionedData.bookingId,
         "Vehilce No": currentPartionedData.vehicleRegNo,
         "Contact No": currentPartionedData.contactNo,
         "Status": currentPartionedData.paymentStatus,
         "Total$": currentPartionedData.subTotal,
         "Paid Amount": currentPartionedData.amountPaid,
         "Balance Amount$": currentPartionedData.dueAmount,
         "GarageName": currentPartionedData.companyName + " - " + currentPartionedData.site,
         "EmailId": currentPartionedData.emailId,
         "ContactNo": currentPartionedData.contactNo,
         "CustomerName": currentPartionedData.customerName,
         // "OrderId":item.orderId,
         "Site": currentPartionedData.site,
         "Type": currentPartionedData.type,
 
 
 
       }
 
       this.state.i = Number(this.state.i) + Number(1);
 
      }
     }
  }




  PopulatePartiallyPaidData(partionedPartiallyPaidData){
  //  alert("PopulatePartiallyPaidData called");
    var self=this;
    if(partionedPartiallyPaidData != undefined){
      for (var x = 0; x < partionedPartiallyPaidData.length; x++) {
       var currentPartionedData = partionedPartiallyPaidData[x];
       this.state.count = Number(this.state.count) + Number(1);
 
       self.state.data[this.state.i] = {
         "SNO": this.state.count,
         "Invoice": currentPartionedData.invoiceNo,
         "Date": currentPartionedData.invoiceDate,
         "Booking Id": currentPartionedData.bookingId,
         "Vehilce No": currentPartionedData.vehicleRegNo,
         "Contact No": currentPartionedData.contactNo,
         "Status": currentPartionedData.paymentStatus,
         "Total$": currentPartionedData.subTotal,
         "Paid Amount": currentPartionedData.amountPaid,
         "Balance Amount$": currentPartionedData.dueAmount,
         "GarageName": currentPartionedData.companyName + " - " + currentPartionedData.site,
         "EmailId": currentPartionedData.emailId,
         "ContactNo": currentPartionedData.contactNo,
         "CustomerName": currentPartionedData.customerName,
         // "OrderId":item.orderId,
         "Site": currentPartionedData.site,
         "Type": currentPartionedData.type,
       }
 
       this.state.i = Number(this.state.i) + Number(1);
 
      }
     }
  }



  PopulatePaidData(partionedPaidData){
//    alert("PopulatePaidData CALLED");

    var self=this;
    if(partionedPaidData != undefined){
      for (var z = 0; z < partionedPaidData.length; z++) {
       var currentPartionedData = partionedPaidData[z];
       this.state.count = Number(this.state.count) + Number(1);
 
       self.state.data[this.state.i] = {
         "SNO": this.state.count,
         "Invoice": currentPartionedData.invoiceNo,
         "Date": currentPartionedData.invoiceDate,
         "Booking Id": currentPartionedData.bookingId,
         "Vehilce No": currentPartionedData.vehicleRegNo,
         "Contact No": currentPartionedData.contactNo,
         "Status": currentPartionedData.paymentStatus,
         "Total$": currentPartionedData.subTotal,
         "Paid Amount": currentPartionedData.amountPaid,
         "Balance Amount$": currentPartionedData.dueAmount,
         "GarageName": currentPartionedData.companyName + " - " + currentPartionedData.site,
         "EmailId": currentPartionedData.emailId,
         "ContactNo": currentPartionedData.contactNo,
         "CustomerName": currentPartionedData.customerName,
         // "OrderId":item.orderId,
         "Site": currentPartionedData.site,
         "Type": currentPartionedData.type,
 
 
 
       }
       this.state.i = Number(this.state.i) + Number(1);
      }
 
     }
  }







  getColumns() {

    return Object.keys(this.state.data[0]).map(key => {
        if (
       
          key != "Booking Id" &&
          key !="Vehilce No" &&
          key !="EmailId" &&
          key !="ContactNo" &&
          key !="CustomerName" &&
          key !="Type"
           ) {
          return {
            Header: key,
            accessor: key,
          //  show: false
          };
        } else {
          return {
            Header: key,
            accessor: key,
            show: false  
          };
        }
     });

  }


  handlePaymentStatus = (e) => {

    var self = this;

    this.state.selected = -1;

    this.setState({
      selected: this.state.selected,
    })

    this.state.selectedPaymentOption = e;
    this.state.payment_Status_Opted=e.value;

    this.setState({
      selectedPaymentOption: this.state.selectedPaymentOption,
      payment_Status_Opted:this.state.payment_Status_Opted,
    })

    var sub_customerInvoiceListArray = _.uniq(invoiceListArray, 'invoiceNo');

    var optedPaymentOptionInvoiceArray = sub_customerInvoiceListArray;

    if (e.value != 'All' && e.value != 'UnPaid & PartiallyPaid') {
      optedPaymentOptionInvoiceArray = _.where(sub_customerInvoiceListArray, { paymentStatus: e.value });

    }else if(e.value == 'UnPaid & PartiallyPaid'){
      var unpaidArray  =_.where(sub_customerInvoiceListArray, { paymentStatus: 'UnPaid'});
      var partiallypaidArray  =_.where(sub_customerInvoiceListArray, {paymentStatus: 'PartiallyPaid'});
   
      $.each(unpaidArray, function (i, item) {
        optedPaymentOptionInvoiceArray.push(unpaidArray[i]);
      });

      $.each(partiallypaidArray, function (i, item) {
        optedPaymentOptionInvoiceArray.push(partiallypaidArray[i]);
      });

     //   console.log("Unpaid & PartiallyPaid **** optedPaymentOptionInvoiceArray :",optedPaymentOptionInvoiceArray);
   
   
      }

    self.state.data = [];
    self.state.columns = [];

    self.PopulateTable(optedPaymentOptionInvoiceArray);


  }


  onTrRowClick = (state, rowInfo, column, instance) => {
    var self = this;

    //   console.log("ROW INFO :",rowInfo);
    currentInvoiceArray = [];

    if (typeof rowInfo !== "undefined") {
      return {
        onClick: (e, handleOriginal) => {
          this.setState({
            selected: rowInfo.index
          });
          if (handleOriginal) {
            handleOriginal()
          }

          self.state.invoiceNo = rowInfo.original["Invoice"];
          self.state.amount = rowInfo.original["Balance Amount$"];
          self.state.garageName = rowInfo.original["GarageName"];
          self.state.contactNo = rowInfo.original["ContactNo"];
          self.state.emailId = rowInfo.original["EmailId"];
          self.state.customerName = rowInfo.original["CustomerName"];
          self.state.siteName = rowInfo.original["Site"];
          self.state.type = rowInfo.original["Type"];

          self.state.bankDetailsArray=[];
          self.state.bankDetailsArray= bankDetailsArray;

          self.setState({
            invoiceNo: self.state.invoiceNo,
            amount: self.state.amount,
            garageName: self.state.garageName,
            contactNo: self.state.contactNo,
            emailId: self.state.emailId,
            customerName: self.state.customerName,
            orderId: self.state.orderId,
            siteName: self.state.siteName,
            type: self.state.type,
            bankDetailsArray:self.state.bankDetailsArray
          })


          var orderIdArray = _.where(paymentTransactionArray, { invoiceNo: self.state.invoiceNo });

          if (orderIdArray.length > 0) {
            var orderId = orderIdArray[0].orderId;
            self.state.orderId = orderId;
            //  self.state.amountatorderid=Number(orderIdArray[0].amount)/100;
            self.state.amountatorderid = orderIdArray[0].amount;


          } else {
            self.state.orderId = "";
            self.state.amountatorderid = 0;
          }

          self.setState({
            orderId: self.state.orderId,
            amountatorderid: self.state.amountatorderid
          })
          //   console.log(" ON ROW CLICK ");
          //   console.log("  orderId :",  orderId);
          //   console.log("  self.state.orderId :",  self.state.orderId);

          this.state.rowIndexValue = rowInfo.index;
          //     console.log("invoiceNo :",self.state.invoiceNo," - ",self.state.amount," - ",self.state.garageName);

          currentInvoiceArray = _.where(invoiceListArray, { invoiceNo: self.state.invoiceNo });

          this.state.currentInvoiceArray =[];
          this.state.currentInvoiceArray = currentInvoiceArray;
          this.state.bankDetailsArray=bankDetailsArray;

          console.log("currentInvoiceArray :", currentInvoiceArray);
          console.log("this.state.bankDetailsArray :", this.state.bankDetailsArray);

          this.setState({
            currentInvoiceArray: this.state.currentInvoiceArray,
            bankDetailsArray:this.state.bankDetailsArray,
          })

          // this.CallCustomerInvoiceCopyView();

          //    self.payChild.PopulateViewData(this.state.currentInvoiceArray);


        },
        style: {
          //background: rowInfo.index === this.state.selected ? 'rgb(164, 23, 107)' : '',
          background: rowInfo.index === this.state.selected ? 'rgb(66 139 202)' : '',
          color: rowInfo.index === this.state.selected ? 'white' : ''
           // color: rowInfo.index === this.state.selected ? 'white' : 'black'
        },

      }
    }
    else {
      return {
        onClick: (e, handleOriginal) => {
          if (handleOriginal) {
            handleOriginal()
          }
        },
        style: {
          // background: 'white',
          // color: 'black'
        },
      }
    }



  };


  onViewInvoice() {

    if (this.state.invoiceNo != "") {
      //SHOW SLIDE

      this.OpenViewFunc();

      this.state.selected = -1;

      this.setState({
        selected: this.state.selected,
      })


    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Invoice ',

      })
    }

  }


  onInvoicePay() {

    if (this.state.invoiceNo != "") {
      //SHOW SLIDE
      this.state.selected = -1;

      this.setState({
        selected: this.state.selected,
      })

      if (this.state.amount > 0) {

        if (paymentConfigArray.length > 0) {

          var active_Payment_Gateway_Array = _.where(paymentConfigArray, { status: "1" });

          //    console.log("active_Payment_Gateway_Array :",active_Payment_Gateway_Array);

          if (active_Payment_Gateway_Array.length > 0) {
            this.OpenPaymentFunc();
          } else {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'No Payment Option Provided',

            })
          }

        } else {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'No Payment Option Provided',

          })
        }


        //   this.OpenPaymentFunc();
      } else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Amount Paid for the Invoice',

        })
      }

    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Invoice ',

      })
    }



  }

  OpenPaymentFunc() {
    this.state.isPaymentPaneOpen = true;

    this.setState({
      isPaymentPaneOpen: this.state.isPaymentPaneOpen,
    })

  }

  ClosePaymentFunc() {

    this.state.isPaymentPaneOpen = false;

    this.setState({
      isPaymentPaneOpen: this.state.isPaymentPaneOpen,
    })

    this.ClearFunc();


  }

  OpenViewFunc() {
    this.state.isViewPaneOpen = true;

    this.setState({
      isViewPaneOpen: this.state.isViewPaneOpen,
    })

  }

  CloseViewFunc() {

    this.state.isViewPaneOpen = false;

    this.setState({
      isViewPaneOpen: this.state.isViewPaneOpen,
    })

    this.ClearFunc();


  }

  ClearFunc() {

    var self = this;
    self.state.invoiceNo = "";
    self.state.amount = "";
    self.state.garageName = "";
    self.state.contactNo = "";
    self.state.emailId = "";
    self.state.customerName = "";
    self.state.siteName = "";
    self.state.type = "";


    self.setState({
      invoiceNo: self.state.invoiceNo,
      amount: self.state.amount,
      garageName: self.state.garageName,
      contactNo: self.state.contactNo,
      emailId: self.state.emailId,
      customerName: self.state.customerName,
      orderId: self.state.orderId,
      siteName: self.state.siteName,
      type: self.state.type,
    })

  }


  OrderIdChangeEnable(data) {

    var self = this;

    // console.log(" OrderIdChangeEnable DATA :  ",data);
    self.AssignData_Fields(data);
  }


  PaymentChangesInvoiceList(data) {

    var self = this;

    // console.log(" PaymentChanges_InvoiceList DATA :  ",data);
    self.AssignData_Fields(data);

    self.ClosePaymentFunc();

  }


  CallCustomerInvoiceCopyView() {

    var self = this;
    self.payChild.PopulateViewData(this.state.currentInvoiceArray);

  }


  render() {

    return (

      <div class="container">

        {/* <RazorPay/>  */}
<div className="r_pay_WarnNotes">
        Note:The page involves payment details, Reloading of the page is not appreciated at any point.
             Never click back button or perform any action when payment is in progress
             </div>
  <div class="report_card_header">
          {/* <h3 id="companyHeader"> {this.state.companyName}</h3> */}
          <h3 id="reportHeader" >Payment Report</h3>
        </div>

        <div className="r_payInvoice_Mail_V">
          <div class="text-right_report">
            <div className="inv_list_cls_sel_search">
              <label>Payment Status</label>
              <SelectSearch options={this.state.paymentOptions} value={this.state.selectedPaymentOption}
                isMulti={false}
                onChange={(e) => this.handlePaymentStatus(e)} name="WorkingSite" placeholder="Select Working Site " />
            </div>
          </div>

          <div class="buttonright_report" >
          <CustomerInvoiceIcons onInvoiceView={this.onViewInvoice} onInvoicePay={this.onInvoicePay} />

          </div>
        </div>


        <div class="card">
       {/*    <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4">


            </div>
            <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8">
              <div class="card-header">
                <h3 style={{ marginLeft: "150px" }}>Payment Report</h3>   </div>

            </div>
          </div>

          <div className="inv_list_cls_sel_search">
            <label>Payment Status</label>
            <SelectSearch options={this.state.paymentOptions} value={this.state.selectedPaymentOption}
              isMulti={false}
              onChange={(e) => this.handlePaymentStatus(e)} name="WorkingSite" placeholder="Select Working Site " />
          </div> 
 <CustomerInvoiceIcons onInvoiceView={this.onViewInvoice} onInvoicePay={this.onInvoicePay} />
*/}
          <div>

           

            <div>

              <ReactTable style={{ overflow: "auto" }}
                data={this.state.data}
                columns={this.state.columns}
                noDataText="No Data Available"
                filterable
                defaultPageSize={10}
                className="-striped -highlight"
                defaultFilterMethod={(filter, row, column) => {
                  const id = filter.pivotId || filter.id;
                  return row[id] !== undefined
                    ? String(row[id])
                      .toLowerCase()
                      .indexOf(filter.value.toLowerCase()) !== -1
                    : true;
                }}
                showPaginationTop={true}
                showPaginationBottom={false}
                getTdProps={this.onTrRowClick}
              /* getTrProps={(state, rowInfo, column) => {
                 return {
                   style: {
                     backgroundColor: rowInfo ? rowInfo.original.rowopted === "yes" ? '#00afec' : '' : '',
                   }
                 }
               }} */
              />

            </div>




          </div>
        </div>


 <SlidingPane
 style={{marginTop:"0px!important"}}
           className="some-custom-class"
           overlayClassName="some-custom-overlay-class"
          isOpen={this.state.isPaymentPaneOpen}
          title={"Payment Info"}
          subtitle="Can Make Payment Here"
          onRequestClose={() => {
            // triggered on "<" on left top click or on outside click
            // setState({ isPaneOpen: false });
            this.ClosePaymentFunc()
          }}
        >
       

          {/* {this.RenderUpdateComponenets(this.state.taskSelected)} */}
          <CustomerInvoicePay stateData={this.state} paymentConfigArray={paymentConfigArray}
            timeZoneArray={timeZoneArray} OrderIdChange={this.OrderIdChangeEnable}
            PaymentChangesInvoiceList={this.PaymentChangesInvoiceList}
            invoiceListArray={invoiceListArray}
            bankDetailsArray={bankDetailsArray}
            SubmitClicked={this.SubmitPaymentlide}
            CancelClicked={this.CloseCancelPaymentSlide}
          />
        </SlidingPane>

     
     <div className="slide_pane_mail_view_c_invlistdiv">
        <SlidingPane 
         style={{marginTop:"0px!important"}}
          className="some-custom-class slide-pane__header_mail_view"
             overlayClassName="some-custom-overlay-class"
          isOpen={this.state.isViewPaneOpen}
          title={"Invoice Info"}
          subtitle="Can View Invoice Details Here"
          onRequestClose={() => {
            // triggered on "<" on left top click or on outside click
            // setState({ isPaneOpen: false });
            this.CloseViewFunc()
          }}>
          <CustomerInvoiceCopy onRef={ref => (this.payChild = ref)} 
          currentInvoiceArray={this.state.currentInvoiceArray} 
          bankDetailsArray={this.state.bankDetailsArray}
          />
        </SlidingPane>
        </div>


      </div>
    );
  }

}

export default CustomerInvoiceList;
