import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from '../registerServiceWorker';
import CryptoJS from 'crypto-js';


import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';

//css
import * as moment from "moment";
import _ from 'underscore';
import Select from 'react-select';
import ReactTable from "react-table";
import "react-table/react-table.css";
import SubmitButtonComponent from '../ServiceRegistration/ButtonComponent';
import {
  ClearButtonComponent, CancelButtonComponent,
  AddButtonComponent, UpdateButtonComponent,
  SubmitProceedButtonComponent, EditButtonComponent, SaveButtonComponent
} from '../ServiceRegistration/ButtonComponent';
import Case from 'case';
import { Multiselect } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';
import { GetEmployeeSite, GetCurrentSite } from '../ConstSiteFunction';
import CapitalCaseFunc from '../ServiceRegistration/CommonTextFormatComponent';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import "./PaymentReceivablesComponentcss.css";

var paymentConfigDetailsArray = [];
export default class PaymentReceivablesComponent extends Component {

  constructor() {
    super()
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)


    this.state = {
      companyId: companyId,
      staffId: staffId,
      employeeName: employeeName,
      merchantId: '',
      merchantKey: '',

      paytmMerchantId: '',
      paytmMerchantKey: '',

      paytm: false,



    }

    this.handleToogleChange = this.handleToogleChange.bind(this);
    this.AddKeyDetails = this.AddKeyDetails.bind(this);
    this.EditKeyDetails = this.EditKeyDetails.bind(this);
    //   this.AssignData_Fields=this.AssignData_Fields.bind(this);

  }

  componentDidMount() {

    $(".saveFields").hide();
    $(".editFields").hide();

    // $("#paytmFields").hide();

    this.GetData();


  }

  GetData() {

    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
        //empSites:GetEmployeeSite(),

      }),
        url:  "http://15.206.129.105:8080/ThroughBooksCOAPI/PaymentConfig/GetPaymentConfigDetails",
      contentType: "application/json",
      dataType: 'json',
      success: function (data, textStatus, jqXHR) {

        //    console.log("GATEWAY data", data);

        self.SetToogleStatus(data);


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


  SetToogleStatus(data) {

    var self = this;

    $(".saveFields").hide();
    $(".editFields").hide();

    paymentConfigDetailsArray = [];
    paymentConfigDetailsArray = data.paymentConfigList;

    if (data.paymentConfigList.length > 0) {
      $.each(data.paymentConfigList, function (i, item) {

        if (item.status == 0) {
          self.state[item.paymentGateway] = false;
          $("#" + item.paymentGateway + "FieldsData").hide();

          self.setState({
            [item.paymentGateway]: false,
          })
        } else {
          self.state[item.paymentGateway] = true;

          var merchantId = item.paymentGateway + "MerchantId";
          var merchantKey = item.paymentGateway + "MerchantKey";

          self.state[merchantId] = item.merchantId;
          self.state[merchantKey] = item.merchantKey;

          $("#" + item.paymentGateway + "FieldsData").show();
          self.setState({
            [item.paymentGateway]: true,
          })
        }

        //    console.log("SELF.STATE.PAYTM :",self.state.paytm);

      });


    }
  }

  handleUserInputMerchantId = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.state.merchantId = e.target.value;

    this.state[name] = value;
    this.setState({ [name]: value });


    if (name == "paytmMerchantId") {
      this.state.toogleData = "paytm";
    } else if (name == "razorpayMerchantId") {
      this.state.toogleData = "razorpay";
    }

  }

  handleUserInputMerchantKey = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.state.merchantKey = e.target.value;

    this.state[name] = value;
    this.setState({ [name]: value });


    if (name == "paytmMerchantKey") {
      this.state.toogleData = "paytm";
    } else if (name == "razorpayMerchantKey") {
      this.state.toogleData = "razorpay";
    }



  }

  handleToogleChange(event) {

    //    console.log("toogleCalledBy EVENT :",event);
    //     console.log("event.target.checked :",event.target.checked);

    //    console.log("event.target.name :",event.target.name);

    const toogleName = event.target.name;
    const toogleValue = event.target.checked;

    var self = this;

    self.state[toogleName] = toogleValue;
    self.setState({
      [toogleName]: toogleValue
    })


    this.state.toogleData = toogleName;
    this.state.toogleStatus = toogleValue;

    this.setState({
      toogleData: this.state.toogleData,
      toogleStatus: this.state.toogleStatus,
    })


    var currentOptionStatusData = _.where(paymentConfigDetailsArray, { paymentGateway: toogleName });

    if (currentOptionStatusData.length > 0) {
      if (currentOptionStatusData[0].merchantId == null || currentOptionStatusData[0].merchantId == "") {
        if (toogleValue == false) {
          $("#" + toogleName + "Fields").hide();
        } else {
          $("#" + toogleName + "Fields").show();
        }

        self.Update_PaymentStatus_With_IdandKey_Only();

      } else if (currentOptionStatusData[0].merchantId != null && currentOptionStatusData[0].merchantId != "") {

        /*   var merchantId=currentOptionStatusData[0].paymentGateway+"MerchantId";
           var merchantKey=currentOptionStatusData[0].paymentGateway+"MerchantKey";
*/

        self.state[merchantId] = currentOptionStatusData[0].merchantId;
        self.state[merchantKey] = currentOptionStatusData[0].merchantKey;

        var merchantId = currentOptionStatusData[0].merchantId;
        var merchantKey = currentOptionStatusData[0].merchantKey;

        if (toogleValue == false) {
          $("#" + toogleName + "FieldsData").hide();
        } else {
          $("#" + toogleName + "FieldsData").show();
        }

        self.Update_PaymentStatus_Only(toogleName, merchantId, merchantKey, toogleValue);

      }

    } else {
      if (toogleValue == false) {
        $("#" + toogleName + "Fields").hide();
      } else {
        $("#" + toogleName + "Fields").show();
      }
    }


  }


  Update_PaymentStatus_With_IdandKey_Only() {
    var self = this;

    //     alert("ONLY WITH KEY");

    /*   console.log("  this.state.toogleData :",self.state.toogleData,
       "this.state.toogleStatus :",self.state.toogleStatus);
*/

  }



  Update_PaymentStatus_Only(gateWayName, merchantId, merchantKey, status) {
    var self = this;

    //     alert("ONLY WITH STATUS");

    /* console.log("  this.state.toogleData :",self.state.toogleData,
     "this.state.toogleStatus :",self.state.toogleStatus);
*/

    self.state.editGateWayName = gateWayName;
    self.state.merchantId = merchantId;
    self.state.merchantKey = merchantKey;
    self.state.status = 0;
    if (status == true) {
      self.state.status = 1;
    }

    self.UpdateAjax();




  }


  AddKeyDetails() {

    var self = this;
    var editGateWay;

    /*  console.log("ADD KEY DETAILS :");
      console.log("  this.state.toogleData :",self.state.toogleData,
      "this.state.toogleStatus :",self.state.toogleStatus,
      "this.state.merchantId :",self.state.merchantId,
      "self.state.merchantKey :",self.state.merchantKey);
*/
    self.state.status = 0;
    if (self.state.toogleStatus == true) {
      self.state.status = 1;
    }

    /*    console.log(" ADD DATA :",JSON.stringify({
          companyId: this.state.companyId,
          paymentGateway:self.state.toogleData,  
          merchantId:self.state.merchantId,
          merchantKey:self.state.merchantKey,
          status:self.state.status,
        })); */

    if (self.state.merchantId != "" && self.state.merchantKey != "") {

      self.UpdateAjax();

    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        text: 'Kindly Fillin MerchantId & MerchantKey',
        showConfirmButton: false,
        timer: 2000
      })
    }



  }

  EditKeyDetails() {

    var self = this;

    /*   console.log("EDIT KEY DETAILS :");
       console.log("  this.state.toogleData :",self.state.toogleData,
       "this.state.toogleStatus :",self.state.toogleStatus,
       "this.state.merchantId :",self.state.merchantId,
       "self.state.merchantKey :",self.state.merchantKey);
*/
    self.state.status = 1;

    /*    console.log(" EDIT DATA :",JSON.stringify({
          companyId: this.state.companyId,
          paymentGateway:self.state.editGateWayName,  
          merchantId:self.state.merchantId,
          merchantKey:self.state.merchantKey,
          status:self.state.status,
        })); */

    if (self.state.merchantId != "" && self.state.merchantKey != "") {

      self.UpdateAjax();


    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        text: 'No Change In MerchantId & MerchantKey',
        showConfirmButton: false,
        timer: 2000
      })
    }



  }


  UpdateAjax() {

    var self = this;

       console.log("UPDATE AJAX :",JSON.stringify({
          companyId: this.state.companyId,
          paymentGateway:self.state.toogleData,  
          merchantId:self.state.merchantId,
          merchantKey:self.state.merchantKey,
          status:self.state.status,
        }));
        

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
        paymentGateway: self.state.toogleData,
        merchantId: self.state.merchantId,
        merchantKey: self.state.merchantKey,
        status: self.state.status,
      }),
      //    url: "http://15.206.129.105:8080/ThroughBooksCOAPI/CustomerPayment/GetCustomerInvoiceDetails",
        url:  "http://15.206.129.105:8080/ThroughBooksCOAPI/PaymentConfig/PaymentConfigUpdate",
      contentType: "application/json",
      dataType: 'json',
      success: function (data, textStatus, jqXHR) {

        //    console.log("PAYMENT CONFIG UPDATE :", data);
        self.SetToogleStatus(data);

        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Updated Payment Gateway Credentials',
          showConfirmButton: false,
          timer: 3000
        })

        self.ClearFunc();

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

  ClearFunc() {

    this.state.toogleData = "";
    this.state.merchantId = "";
    this.state.merchantKey = "";
    this.state.status = "";

    this.setState({
      toogleData: this.state.toogleData,
      merchantId: this.state.merchantId,
      merchantKey: this.state.merchantKey,
      status: this.state.status,

    })


  }


  render() {
    return (

      <div>

        <div className="mandatory_feilds" style={{ backgroundColor: "Light-grey" }}>

          {/* PAYTM CONFIGURATION */}
          {/*
<div class="row" style={{ backgroundColor: "" }}>

<span>Paytm</span>
 <Toggle
  name="paytm"
  checked={this.state.paytm}
  icons={true}
  aria-label='No label tag'
  onChange={this.handleToogleChange} />

  

<div id="paytmFields" class="paytmFields saveFields">
<input name="paytmMerchantId" id="paytmMerchantId" value={this.state.paytmMerchantId} onChange={this.handleUserInputMerchantId}></input>
<input name="paytmMerchantKey" id="paytmMerchantKey" value={this.state.paytmMerchantKey} onChange={this.handleUserInputMerchantKey}></input>

<SaveButtonComponent  onClick={this.AddKeyDetails} /> 
</div>


<div id="paytmFieldsData" class="paytmFieldsData editFields">
<input name="paytmMerchantId" id="paytmMerchantId" value={this.state.paytmMerchantId} onChange={this.handleUserInputMerchantId}></input>
<input name="paytmMerchantKey" id="paytmMerchantKey" value={this.state.paytmMerchantKey} onChange={this.handleUserInputMerchantKey}></input>

<EditButtonComponent name="paytm" id="paytm" class="edit" onClick={this.EditKeyDetails} /> 

</div> 
            
  </div> */}

          {/* RAZOR PAY CONFIGURATION */}

          <div class="">
            <div className="r_Pay_tog_cls">
              <div className="r_Pay_Labl">
                <label>RazorPay</label>
              </div>
              <div className="r_Pay_Inp">
                <Toggle
                  name="razorpay"
                  checked={this.state.razorpay}
                  icons={true}
                  aria-label='No label tag'
                  onChange={this.handleToogleChange} />
              </div>
            </div>


{/*             <div id="razorpayFields" class="razorpayFields saveFields">
              <label>MerchantId</label>
              <input name="razorpayMerchantId" id="razorpayMerchantId" value={this.state.razorpayMerchantId} onChange={this.handleUserInputMerchantId}></input>
              <label>MerchantKey</label>
              <input name="razorpayMerchantKey" id="razorpayMerchantKey" value={this.state.razorpayMerchantKey} onChange={this.handleUserInputMerchantKey}></input>

              <SaveButtonComponent onClick={this.AddKeyDetails} />
            </div> */}

            <div id="razorpayFields" class="razorpayFieldsData saveFields">
              <div class="razorpayFieldsData_cls ">
                <div className="r_merch_keydiv">
                  <div className="r_merch_keylabl">
                    <label>MerchantId</label>
                  </div>
                  <div className="r_merch_keyInpt">
                    <input name="razorpayMerchantId" id="razorpayMerchantId" value={this.state.razorpayMerchantId}
                      onChange={this.handleUserInputMerchantId}></input>
                  </div>
                </div>
                <div className="r_merch_keydiv">
                  <div className="r_merch_keylabl">
                    <label>MerchantKey</label>
                  </div>
                  <div className="r_merch_keyInpt">
                    <input name="razorpayMerchantKey" id="razorpayMerchantKey" value={this.state.razorpayMerchantKey}
                      onChange={this.handleUserInputMerchantKey}></input>
                  </div>
                </div>
                </div>
                <div>
                  <SaveButtonComponent onClick={this.AddKeyDetails} />
                </div>
             
            </div>



            <div id="razorpayFieldsData" class="razorpayFieldsData editFields">
              <div class="razorpayFieldsData_cls ">
                <div className="r_merch_keydiv">
                  <div className="r_merch_keylabl">
                    <label>MerchantId</label>
                  </div>
                  <div className="r_merch_keyInpt">
                    <input name="razorpayMerchantId" id="razorpayMerchantId" value={this.state.razorpayMerchantId}
                      onChange={this.handleUserInputMerchantId}></input>
                  </div>
                </div>
                <div className="r_merch_keydiv">
                  <div className="r_merch_keylabl">
                    <label>MerchantKey</label>
                  </div>
                  <div className="r_merch_keyInpt">
                    <input name="razorpayMerchantKey" id="razorpayMerchantKey" value={this.state.razorpayMerchantKey}
                      onChange={this.handleUserInputMerchantKey}></input>
                  </div>
                </div>
              </div>

              <div>
                <SaveButtonComponent onClick={this.EditKeyDetails} />
              </div>
            </div>


          </div>

        </div>



      </div>
    )
  }
}


