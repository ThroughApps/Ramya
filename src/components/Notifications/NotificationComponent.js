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
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from '../ConstSiteFunction';
import CapitalCaseFunc from '../ServiceRegistration/CommonTextFormatComponent';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import SelectSearch from 'react-select';
import Checkbox from '@material-ui/core/Checkbox';

var whatsAppOptionsArray=[];
var serviceOptions=[];
var notificationConfigDetailsArray=[];
export default class NotificationComponent extends Component {

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
          //  whatsAppKeyId: 'AC5eb89e0454dbc8f8653e4b3c0e761da0',
         //   whatsAppKeyToken: '0961bfc1a307b49ebe2418af948a084f',
            keyId: '',
            keyToken: '',
            senderNo:'',
            whatsAppsenderNo:'',
            whatsApp: false,
            selectedwhatsappOptions:'',

        }
        this.handleToogleChange = this.handleToogleChange.bind(this);
        this.AddKeyDetails = this.AddKeyDetails.bind(this);
        this.EditKeyDetails = this.EditKeyDetails.bind(this);

    }

    componentDidMount() {
      SetCurrentPage("NotificationComponents");
        $(".saveFields").hide();
        $(".editFields").hide();
        
       
        this.state.whatsappOptions = [];

    

        this.state.whatsappOptions.push({ label: 'SaleInvoice', value: 'SaleInvoice' });
        this.state.whatsappOptions.push({ label: 'EstimateInvoice', value: 'EstimateInvoice' });
        this.state.whatsappOptions.push({ label: 'PurchaseInvoice', value: 'PurchaseInvoice' });
        this.state.whatsappOptions.push({ label: 'Appointment', value: 'Appointment' });
        this.state.whatsappOptions.push({ label: 'All', value: 'All' });
    
           this.setState({
                whatsappOptions:this.state.whatsappOptions
            })

            this.GetNotificationDetails();
    }

    GetNotificationDetails(){

        var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
        //empSites:GetEmployeeSite(),

      }),
      url: "http://15.206.129.105:8080/ThroughBooksCOAPI/NotificationsConfig/GetNotificationsConfigDetails",
      contentType: "application/json",
      dataType: 'json',
      success: function (data, textStatus, jqXHR) {

            console.log("GATEWAY data", data);

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
    
        notificationConfigDetailsArray = [];
        notificationConfigDetailsArray = data.notificationConfigDetailsList;
    
        if (data.notificationConfigDetailsList.length > 0) {
          $.each(data.notificationConfigDetailsList, function (i, item) {
    
            if (item.status == 0) {
              self.state[item.moduleName] = false;
              $("#" + item.notificationModule + "FieldsData").hide();
    
              self.setState({
                [item.moduleName]: false,
              })
            } else {
              self.state[item.moduleName] = true;
    
              var keyId = item.moduleName + "KeyId";
              var KeyToken = item.moduleName + "KeyToken";
              var senderNo = item.moduleName + "senderNo";
              var oldsenderNo = "old"+item.moduleName + "senderNo";
              var serviceOptions = item.moduleName + "serviceOptions";
              var oldserviceOptions = "old"+item.moduleName + "serviceOptions";
    
              self.state[keyId] = item.keyId;
              self.state[KeyToken] = item.keyToken;

              var currentModuleArray=_.where(notificationConfigDetailsArray,{moduleName:item.moduleName})
             
              self.state[senderNo] = currentModuleArray[0].senderNo;
              self.state[oldsenderNo] = currentModuleArray[0].senderNo;
              self.state[serviceOptions] = currentModuleArray[0].serviceOptions;
              self.state[oldserviceOptions] = currentModuleArray[0].serviceOptions;

              console.log("serviceOptions :",self.state[serviceOptions] );
             
              var selectedOptions="selected"+item.moduleName+"Options";
            
              self.state[selectedOptions]="";
           //    whatsAppOptionsArray=[];
          var OptionsArray=[];

              if(self.state[serviceOptions]!=null){
              var serviceOptionsLength=self.state[serviceOptions].split(",");
              console.log("serviceOptions LENGTH :",serviceOptionsLength);

              if(serviceOptionsLength.length >1  ){
                  $.each(serviceOptionsLength,function(i,item){
                    OptionsArray.push({label:item,value:item})
                  });
              }else{
                OptionsArray.push({label:item,value:item})
              }

              self.state[selectedOptions]=OptionsArray;
              self.setState({
                [selectedOptions]:self.state[selectedOptions]
              })
            }

              $("#" + item.moduleName + "FieldsData").show();
              self.setState({
                [item.moduleName]: true,
              })

            }
    
            //    console.log("SELF.STATE.PAYTM :",self.state.paytm);
    
          });
    
    
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
    
    
        var currentOptionStatusData = _.where(notificationConfigDetailsArray, { moduleName: toogleName });
    
        if (currentOptionStatusData.length > 0) {
          if (currentOptionStatusData[0].keyId == null || currentOptionStatusData[0].keyToken == "") {
            if (toogleValue == false) {
              $("." + toogleName + "Fields").hide();
            } else {
              $("." + toogleName + "Fields").show();
            }
    
            self.Update_NotificationStatus_With_IdandKey_Only();
    
          } else if (currentOptionStatusData[0].keyId != null && currentOptionStatusData[0].keyToken != "") {
    
            /*   var merchantId=currentOptionStatusData[0].paymentGateway+"MerchantId";
               var merchantKey=currentOptionStatusData[0].paymentGateway+"MerchantKey";
    
    
            self.state[merchantId] = currentOptionStatusData[0].keyId;
            self.state[merchantKey] = currentOptionStatusData[0].keyToken;
    */
            var keyId = currentOptionStatusData[0].keyId;
            var keyToken = currentOptionStatusData[0].keyToken;
            var senderNo=currentOptionStatusData[0].senderNo;
            var serviceOptions=currentOptionStatusData[0].serviceOptions;
    
            if (toogleValue == false) {
              $("." + toogleName + "FieldsData").hide();
            } else {
              $("." + toogleName + "FieldsData").show();
            }
    
            self.Update_NotificationStatus_Only(toogleName, keyId, keyToken, toogleValue,senderNo,serviceOptions);
    
          }
    
        } else {
          if (toogleValue == false) {
            $("." + toogleName + "Fields").hide();
          } else {
            $("." + toogleName + "Fields").show();
          }
        }
    
    
      }


      Update_NotificationStatus_With_IdandKey_Only() {
        var self = this;
    
          //   alert("ONLY WITH KEY");
    
        /*   console.log("  this.state.toogleData :",self.state.toogleData,
           "this.state.toogleStatus :",self.state.toogleStatus);
    */
    
      }
    
    
    
      Update_NotificationStatus_Only(moduleName, keyId, keyToken, status,senderNo,serviceOptions) {
        var self = this;
    
        //     alert("ONLY WITH STATUS");
    
        /* console.log("  this.state.toogleData :",self.state.toogleData,
         "this.state.toogleStatus :",self.state.toogleStatus);
    */
    
        self.state.editModuleName = moduleName;
        self.state.keyId = keyId;
        self.state.keyToken = keyToken;
        self.state.status = 0;
        self.state.senderNo=senderNo;
        serviceOptions=serviceOptions;

        if (status == true) {
          self.state.status = 1;
        }
    
        self.UpdateAjax();
    
    
    
    
      }


      UpdateAjax() {

        var self = this;
    
            console.log("UPDATE AJAX :",JSON.stringify({
                companyId: this.state.companyId,
                moduleName: self.state.toogleData,
                keyId: self.state.keyId,
                keyToken: self.state.keyToken,
                status: self.state.status,
                senderNo:self.state.senderNo,
                serviceOptions:serviceOptions.toString(),
            }));
            
            var key = "shinchanbaby";
        $.ajax({
          type: 'POST',
          data: JSON.stringify({
            companyId: this.state.companyId,
            moduleName: self.state.toogleData,
            keyId: self.state.keyId,
            keyToken: self.state.keyToken,
            status: self.state.status,
            senderNo:self.state.senderNo,
            serviceOptions:serviceOptions.toString(),
          }),
          //    url: "http://15.206.129.105:8080/ThroughBooksCOAPI/CustomerPayment/GetCustomerInvoiceDetails",
          url: "http://15.206.129.105:8080/ThroughBooksCOAPI/NotificationsConfig/NotificationsConfigUpdate",
          contentType: "application/json",
          dataType: 'json',
          success: function (data, textStatus, jqXHR) {
    
            console.log("PAYMENT CONFIG UPDATE :", data);

            var notificationsConfigList=data.notificationConfigDetailsList;
            var whatsAppArray=_.where(notificationsConfigList,{moduleName:"whatsApp"});

            localStorage.setItem('WhatsAppKeyId', CryptoJS.AES.encrypt(whatsAppArray[0].keyId, key));
            localStorage.setItem('WhatsAppKeyToken', CryptoJS.AES.encrypt(whatsAppArray[0].keyToken, key));
            localStorage.setItem('WhatsAppSenderNo', CryptoJS.AES.encrypt(whatsAppArray[0].senderNo, key));


            self.SetToogleStatus(data);
    
            Swal.fire({
              position: 'center',
              icon: 'success',
              text: 'Updated '+self.state.toogleData+' Credentials',
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
        this.state.keyId = "";
        this.state.keyToken = "";
        this.state.status = "";
        this.state.senderNo = "";
        whatsAppOptionsArray=[];
        serviceOptions=[];
        this.state.whatsAppserviceOptions=[];

        this.setState({
          toogleData: this.state.toogleData,
          keyId: this.state.keyId,
          keyToken: this.state.keyToken,
          status: this.state.status,
          senderNo:this.state.senderNo,
          whatsAppserviceOptions:this.state.whatsAppserviceOptions,
        })
    
    
      }


      AddKeyDetails() {

        var self = this;
        var editGateWay;
    
          console.log("ADD KEY DETAILS :");
          console.log("  this.state.toogleData :",self.state.toogleData,
          "this.state.toogleStatus :",self.state.toogleStatus,
          "this.state.merchantId :",self.state.keyId,
          "self.state.merchantKey :",self.state.keyToken);
    
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
    
        if (self.state.keyId != "" && self.state.keyToken != "") {
                if(self.state.toogleData=="whatsApp" && self.state.whatsAppsenderNo!=""){
                    self.UpdateAjax();
                }else{
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        text: 'Kindly Fill In WhatsApp SenderNo',
                        showConfirmButton: false,
                        timer: 2000
                      })
                }
          
    
        } else {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            text: 'Kindly Fill In KeyId & KeyToken',
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
    
            console.log(" EDIT DATA :",JSON.stringify({
              companyId: this.state.companyId,
              paymentGateway:self.state.editGateWayName,  
              merchantId:self.state.merchantId,
              merchantKey:self.state.merchantKey,
              status:self.state.status,
              oldwhatsAppserviceOptions:self.state.oldwhatsAppserviceOptions,
              whatsAppserviceOptions:self.state.whatsAppserviceOptions
            })); 
    
            console.log(" full :",self.state.toogleData=="whatsApp" && ((self.state.keyId != "" && self.state.keyToken != "" && 
            self.state.whatsAppsenderNo!="" &&
            self.state.oldwhatsAppsenderNo!=self.state.whatsAppsenderNo) || 
            (self.state.oldwhatsAppserviceOptions != self.state.whatsAppserviceOptions)));


            console.log("(self.state.keyId != '' && self.state.keyToken != '' && self.state.whatsAppsenderNo!='' && self.state.oldwhatsAppsenderNo!=self.state.whatsAppsenderNo) :",(self.state.keyId != "" && self.state.keyToken != "" && 
            self.state.whatsAppsenderNo!="" &&
            self.state.oldwhatsAppsenderNo!=self.state.whatsAppsenderNo));

            console.log("self.state.oldwhatsAppserviceOptions != self.state.whatsAppserviceOptions :",self.state.oldwhatsAppserviceOptions != self.state.whatsAppserviceOptions);

            console.log("PART :",((self.state.keyId != "" && self.state.keyToken != "" && 
            self.state.whatsAppsenderNo!="" &&
            self.state.oldwhatsAppsenderNo!=self.state.whatsAppsenderNo) || 
            (self.state.oldwhatsAppserviceOptions != self.state.whatsAppserviceOptions)));

            console.log("self.state.toogleData==whatsApp :",self.state.toogleData=="whatsApp");

       

        if ( self.state.toogleData=="whatsApp" && ((self.state.keyId != "" && self.state.keyToken != "" && 
              self.state.whatsAppsenderNo!="" &&
              self.state.oldwhatsAppsenderNo!=self.state.whatsAppsenderNo) || 
              (self.state.oldwhatsAppserviceOptions != self.state.whatsAppserviceOptions))  )  {
          
                if(self.state.keyId=="" || self.state.keyToken=="" || self.state.whatsAppsenderNo=="" ){
                  var defaultConfigData=_.where(notificationConfigDetailsArray,{moduleName:self.state.toogleData})
                if(defaultConfigData.length >0){
                  self.state.keyId=defaultConfigData[0].keyId;
                  self.state.keyToken=defaultConfigData[0].keyToken;
                  self.state.senderNo=defaultConfigData[0].senderNo;
                }

                if(self.state.whatsAppserviceOptions==""){
                  self.state.whatsAppserviceOptions=defaultConfigData[0].serviceOptions;
                  self.state.serviceOptions=defaultConfigData[0].serviceOptions;

                }
          }
                    self.UpdateAjax();

        } else {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            text: 'No Changes In KeyId & KeyToken & SenderNo or ServiceOption',
            showConfirmButton: false,
            timer: 2000
          })
        }
    
      
    
    
      }

      
      
        handlewhatsappOptions = (e) => {

            var self = this;
            
            alert("OPTIONS CALLED");
            this.state.whatsAppserviceOptions="";
            this.state.selectedwhatsappOptions="";
            this.state.selectedwhatsappOptions = e;
            //this.state.payment_Status_Opted=e.value;
        
            this.setState({
                selectedwhatsappOptions: this.state.selectedwhatsappOptions,
             // payment_Status_Opted:this.state.payment_Status_Opted,
            })
        
            whatsAppOptionsArray=[];
            this.state.toogleData="whatsApp";

            $.each(e,function(i,item){
                   /* if(item.value=="All"){
                        whatsAppOptionsArray=[];
                        whatsAppOptionsArray.push("SaleInvoice");
                        whatsAppOptionsArray.push("EstimateInvoice");
                        whatsAppOptionsArray.push("PurchaseInvoice");
                        whatsAppOptionsArray.push("Appointment");



                    }else{
                        whatsAppOptionsArray.push(item.value);
                    } */
                    whatsAppOptionsArray.push(item.value);

            })
            serviceOptions=whatsAppOptionsArray.toString();
            this.state.whatsAppserviceOptions=serviceOptions;
            console.log("whatsAppOptionsArray :",whatsAppOptionsArray);

            this.setState({
              selectedwhatsappOptions:this.state.selectedwhatsappOptions,
            })
          }

          handleUserInputWhatsAppKeyId = (e) => {
            const name = e.target.name;
            const value = e.target.value;
        
            this.state.keyId = e.target.value;
        
            this.state[name] = value;
            this.setState({ [name]: value });
        
        
            if (name == "whatsAppKeyId") {
              this.state.toogleData = "whatsApp";
            } else if (name == "razorpayMerchantId") {
              this.state.toogleData = "razorpay";
            }
        
          }
        
          handleUserInputwhatsAppKeyToken = (e) => {
            const name = e.target.name;
            const value = e.target.value;
        
            this.state.keyToken = e.target.value;
        
            this.state[name] = value;
            this.setState({ [name]: value });
        
        
            if (name == "whatsAppKeyToken") {
              this.state.toogleData = "whatsApp";
            } else if (name == "razorpayMerchantKey") {
              this.state.toogleData = "razorpay";
            }
        
        
        
          }

          handleUserInputWhatsAppSenderNo=(e) =>{

            const name = e.target.name;
            const value = e.target.value;
        
            this.state.whatsAppsenderNo = e.target.value;
            this.state.senderNo=e.target.value;

            this.state[name] = value;
            this.setState({ [name]: value });

          }





    render() {
        return (

            <div>

                <div className="mandatory_feilds" style={{ backgroundColor: "Light-grey" }}>


                    {/* WHATS APP CONFIGURATION */}

                    <div class="">
                        <div className="r_Pay_tog_cls">
                            <div className="r_Pay_Labl">
                                <label>WhatsApp</label>
                            </div>
                            <div className="r_Pay_Inp">
                                <Toggle
                                    name="whatsApp"
                                    checked={this.state.whatsApp}
                                    icons={true}
                                    aria-label='No label tag'
                                    onChange={this.handleToogleChange} />
                            </div>
                        </div>

     {/*   <Checkbox
            checked={this.state.defaultWhatsApp}
            onChange={this.handleChangeDefaultWhatsAppSetting}
            name="defaultWhatsApp"  color="primary" />Use Default Credentials

              <Checkbox
            checked={this.state.myWhatsApp}
            onChange={this.handleChangeMyWhatsAppSetting}
            name="myWhatsApp"  color="primary" />Use My Credentials
*/}

                        <div id="whatsAppFields" class="whatsAppFields saveFields">
                            <div class="razorpayFieldsData_cls ">
                                <div className="r_merch_keydiv">
                                    <div className="r_merch_keylabl">
                                        <label>Add WhatsApp KeyId</label>
                                    </div>
                                    <div className="r_merch_keyInpt">
                                        <input name="whatsAppKeyId" id="whatsAppKeyId" value={this.state.whatsAppKeyId}
                                            onChange={this.handleUserInputWhatsAppKeyId}></input>
                                    </div>
                                    <div className="r_merch_keylabl">
                                        <label>WhatsApp SenderNo</label>
                                    </div>
                                    <div className="r_merch_keyInpt">
                                        <input name="whatsAppsenderNo" id="whatsAppsenderNo" value={this.state.whatsAppsenderNo}
                                            onChange={this.handleUserInputWhatsAppSenderNo}></input>
                                    </div>
                                </div>

                                <div className="r_merch_keydiv">
                                    <div className="r_merch_keylabl">
                                        <label>WhatsApp KeyToken</label>
                                    </div>
                                    <div className="r_merch_keyInpt">
                                        <input name="whatsAppKeyToken" id="whatsAppKeyToken" value={this.state.whatsAppKeyToken}
                                            onChange={this.handleUserInputwhatsAppKeyToken}></input>
                                    </div>
                                </div>
                            </div>

                            <div className="inv_list_cls_sel_search">
                                <label >Select Whatsapp Options</label>
                                <SelectSearch options={this.state.whatsappOptions} value={this.state.selectedwhatsAppOptions}
                                    isMulti={true}
                                    onChange={(e) => this.handlewhatsappOptions(e)} name="whatsappOption" placeholder="Select Options " />
                            </div>..
                <div>
                                <SaveButtonComponent onClick={this.AddKeyDetails} />
                            </div>

                        </div>


                   
            <div id="whatsAppFieldsData" class="whatsAppFieldsData editFields">
              <div class="razorpayFieldsData_cls ">
                <div className="r_merch_keydiv">
                  <div className="r_merch_keylabl">
                    <label>Edit WhatsApp KeyId</label>
                  </div>
                  <div className="r_merch_keyInpt">
                    <input name="whatsAppKeyId" id="whatsAppKeyId" value={this.state.whatsAppKeyId}
                      onChange={this.handleUserInputWhatsAppKeyId}></input>
                  </div>
                </div>
                <div className="r_merch_keydiv">
                  <div className="r_merch_keylabl">
                    <label>WhatsApp KeyToken</label>
                  </div>
                  <div className="r_merch_keyInpt">
                    <input name="whatsAppKeyToken" id="whatsAppKeyToken" value={this.state.whatsAppKeyToken}
                      onChange={this.handleUserInputwhatsAppKeyToken}></input>
                  </div>
                  <div className="r_merch_keylabl">
                                        <label>WhatsApp SenderNo</label>
                                    </div>
                                    <div className="r_merch_keyInpt">
                                        <input name="whatsAppsenderNo" id="whatsAppsenderNo" value={this.state.whatsAppsenderNo}
                                            onChange={this.handleUserInputWhatsAppSenderNo}></input>
                                    </div>
                                    <div className="inv_list_cls_sel_search">
                                <label >Select Whatsapp Options</label>
                                <SelectSearch options={this.state.whatsappOptions} value={this.state.selectedwhatsAppOptions}
                                    isMulti={true}
                                    onChange={(e) => this.handlewhatsappOptions(e)} name="whatsappOption" placeholder="Select Options " />
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


