import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
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
import SubmitButtonComponent from './ButtonComponent';
import{  ClearButtonComponent,CancelButtonComponent,AddButtonComponent,UpdateButtonComponent,SubmitProceedButtonComponent} from './ButtonComponent';
import Case from 'case';
import VehicleComponent from './VehicleComponent';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

import CapitalCaseFunc from './CommonTextFormatComponent';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from '../ConstSiteFunction';
export default class CustomerComponent extends  Component {

    constructor() {
        super()
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
  
  
    this.state={
        companyId:companyId,
        employeeName: employeeName,
        role: role,
        staffId: staffId,
        contactNo:"",
        customerName:"",
        companyName:"",
        emailId:"",
        address:"",
        state:"",
        gstNo:"",
        contactNoErrorCount:0,
        emailIderrorCount:0,
        landlineNoErrorCount:0,
        customerList:[],
        isVehiclePaneOpen:false,
        submit_proceed:'No',
        landlineNo:'',
    }
    this.SubmitFunc = this.SubmitFunc.bind(this);
    this.CancelFunc = this.CancelFunc.bind(this);
    this.ClearFunc = this.ClearFunc.bind(this);
    this.Submit_ProceedFunc = this.Submit_ProceedFunc.bind(this);


}

    componentDidMount(){
        SetCurrentPage("CustomerComponent");
     
        $(".contactnoerror").hide();
        $("#emailIderror").hide();
        $(".landlinenoerror").hide();


        this.state.contactNoErrorCount=0;
        this.state.emailIderrorCount=0;
        this.state.landlineNoErrorCount=0;

    }
  
    handleUserInputContactNo = (e) => {
        const name = e.target.name;
        const value = e.target.value;
     

        var phoneno = /^\d{10}$/;
        if ((value.match(phoneno)) || value=="") {

            $(".contactnoerror").hide();

            this.state.contactNoErrorCount=0;

        }else{
        
            $(".contactnoerror").show();

            this.setState({
                [name]: " "
            });
            this.state.contactNoErrorCount=1;
        }

        this.setState({
            [name]: value
        });

    }

    handleUserInputLandlineNo = (e) => {
        const name = e.target.name;
        const value = e.target.value;
     

        var landlineNo = /^\d{11}$/;
        if ((value.match(landlineNo)) || value=="") {

            $(".landlinenoerror").hide();

            this.state.landlineNoErrorCount=0;

        }else{
        
            $(".landlinenoerror").show();

            this.state.landlineNoErrorCount=1;
        }

        this.setState({
            [name]: value
        });

    }

    handleUserInputCustomerName = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        var capitalCaseData=CapitalCaseFunc(value);

        this.state[name]=capitalCaseData;

        this.setState({
            [name]: capitalCaseData
        });
    }

    handleUserInputCompanyName = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        var capitalCaseData=CapitalCaseFunc(value);

        this.state[name]=capitalCaseData;
        this.setState({
            [name]: capitalCaseData
        });
    }

    handleUserInputEmailId = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        var emailIdReg=  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (emailIdReg.test(value) == true || value=="") 
        {
            $("#emailIderror").hide();

            this.state.emailIderrorCount=0;
        }else{

            $("#emailIderror").show();
            this.setState({
                [name]: " "
            });
            this.state.emailIderrorCount=1;
        }

        this.setState({
            [name]: value
        });
    
    }

    handleUserInputAddress = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        var capitalCaseData=CapitalCaseFunc(value);

        this.state[name]=capitalCaseData;


        this.setState({
            [name]: capitalCaseData
        });
    }

    handleUserInputState = (e) => {
        const name = e.target.name;
        const value =e.target.value;

 var capitalCaseData=CapitalCaseFunc(value);

        this.state[name]=capitalCaseData;


        this.setState({
            [name]: capitalCaseData
        });
    }


    handleUserInputGSTNO = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        var capitalCaseData=CapitalCaseFunc(value);

        this.state[name]=capitalCaseData;

        this.setState({
            [name]: capitalCaseData,
        });
    }


    ClearFunc(){

        console.log("CLEAR CALLED");
        $(".contactnoerror").hide();
        $(".contactnoerror").hide();
        $("#emailIderror").hide();

        this.state.contactNoErrorCount=0;
        this.state.emailIderrorCount=0;
        this.state.landlineNoErrorCount=0;

        this.state.contactNo="";
        this.state.customerName="";
        this.state.companyName="";
        this.state.emailId="";
        this.state.address="";
        this.state.state="";
        this.state.gstNo="";
        this.state.submit_proceed='No';
        this.state.landlineNo="";

        this.setState({
            contactNo:this.state.contactNo,
            customerName:this.state.customerName,
            companyName:this.state.companyName,
            emailId:this.state.emailId,
            address:this.state.address,
            state:this.state.state,
            gstNo:this.state.gstNo,
            submit_proceed:this.state.submit_proceed,
            landlineNoErrorCount:this.state.landlineNoErrorCount,
            landlineNo:this.state.landlineNo,

        })
    
    }


    SubmitFunc(){

        var self = this;
        var statusData;

        if(this.state.contactNo!="" && this.state.customerName!="" ){

                    if(this.state.contactNoErrorCount==0 && this.state.emailIderrorCount==0 && this.state.landlineNoErrorCount==0){

                        $.ajax({
                            type: 'POST',
                            data: JSON.stringify({
                                companyId: this.state.companyId,
                                contactNo:this.state.contactNo,
                                customerName:this.state.customerName,
                                companyName:this.state.companyName,
                                emailId:this.state.emailId,
                                address:this.state.address,
                                state:this.state.state,
                                gstinNo:this.state.gstNo,
                                landlineNo:this.state.landlineNo,
                                staffId: this.state.staffId,
                                employeeName: this.state.employeeName,
                                role: this.state.role,
                                site:GetCurrentSite(),
                            }),
                           // url: "http://15.206.129.105:8080/ThroughBooksCOAPI/enquiry/AddEnquiry",
                             url: "http://15.206.129.105:8080/ThroughBooksCOAPI/QuickLinkWebservices/AddCustomerDetails",
                            contentType: "application/json",
                            dataType: 'json',
                            async: false,
                
                            success: function (data, textStatus, jqXHR) {
                
                                console.log("BASIC DATA :", data);
                
                                if (data.response == "Success") {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Added Customer Successfully',
                                        showConfirmButton: false,
                                        timer: 2000
                                    })

                                    self.props.SubmitClicked(data,self.state.submit_proceed);
                                  
                                    if(self.state.submit_proceed=='Yes'){
                                   
                                    }
    

                                }else if(data.response == "Duplicate"){
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'warning',
                                        title: 'ContactNo or EmailId or LandlineNo Already Exist',
                                        showConfirmButton: false,
                                        timer: 2000
                                    })
                                }
                
                                self.ClearFunc();
                
                
                
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


                    }else{
                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'Kindly note the errors',
                            showConfirmButton: false,
                            timer: 2000
                          })
                    }



        }else{
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Kindly fillin manadatory fields to proceed',
                showConfirmButton: false,
                timer: 2000
              })


        }


    }


    CancelFunc(){
        this.ClearFunc();

        this.props.CancelClicked(this);
    }

    Submit_ProceedFunc(){

        var self=this;

           self.state.submit_proceed='Yes';
           

           self.setState({
            submit_proceed:self.state.submit_proceed,
           })


           self.SubmitFunc();

    }

    OpenVehicleSlide(){
        this.state.isVehiclePaneOpen= true;
      
        this.setState({
          isVehiclePaneOpen:this.state.isVehiclePaneOpen
        })
      }
    
      CloseVehicleSlide(){
        this.state.isVehiclePaneOpen= false;
      
        this.setState({
          isVehiclePaneOpen:this.state.isVehiclePaneOpen
        })
      }
    
      CloseCancelVehicleSlide= () => {
    
        var self=this;
        self.state.isVehiclePaneOpen= false;
      
        self.setState({
          isVehiclePaneOpen:self.state.isVehiclePaneOpen
        })
      }

   render() {
     return (

        <div>
               <div className="row">
                    <div className="col-xs-12 col-md-4 col-lg-4 enq_col1" style={{}}>
                        <div className="enq_Lab">
                            <label>Contact No</label><span style={{ color: "red", fontWeight: "700" }}>*</span>
                     

                            <div className="enq_Input">
                           
                                <input type="text" name="contactNo"
                                    onChange={this.handleUserInputContactNo} 
                                    value={this.state.contactNo} className="form-control" style={{ width: "100%" }} />

                            </div>
                            <span id="contactnoerror" class="contactnoerror" style={{ color: "red", fontWeight: "700" }}>! ContactNo Invalid</span>
                     
                        </div>
                         
                        <div className="enq_Lab">
                            <label>Name</label><span style={{ color: "red", fontWeight: "700" }}>*</span>
                            <div className="enq_Input">
                                <input type="text" name="customerName"
                                    onChange={this.handleUserInputCustomerName} readOnly={this.state.customerNamereadonly}
                                    maxlength="75" size="75"
                                    value={this.state.customerName} className="form-control" style={{ width: "100%" }} />
                            </div>
                        </div>


                     <div className="enq_Lab">
                            <label>CompanyName</label>
                            <div className="enq_Input">
                                <input type="text" name="companyName"
                                    onChange={this.handleUserInputCompanyName} readOnly={this.state.companyNamereadonly}
                                    maxlength="150" size="150"
                                    value={this.state.companyName} className="form-control" style={{ width: "100%" }} />
                            </div>
                        </div>

                         <div className="enq_Lab">
                            <label>EmailId</label>
                            <div className="enq_Input">
                                <input type="text" name="emailId"
                                    onChange={this.handleUserInputEmailId} readOnly={this.state.emailIdreadonly}
                                    value={this.state.emailId} className="form-control" style={{ width: "100%" }} />
                            </div>
                        </div>
                        <span id="emailIderror" style={{ color: "red", fontWeight: "700" }}>! EmailId Invalid</span>
              

                          <div className="enq_Lab">
                            <label>Address</label>
                            <div className="enq_Input">
                                <input type="text" name="address"
                                    onChange={this.handleUserInputAddress} readOnly={this.state.addressreadonly}
                                    maxlength="150" size="150"
                                    value={this.state.address} className="form-control" style={{ width: "100%" }} />
                            </div>
                        </div>


                     <div className="enq_Lab">
                            <label>State</label>
                            <div className="enq_Input">
                                <input type="text" name="state"
                                    onChange={this.handleUserInputState} readOnly={this.state.statereadonly}
                                    maxlength="100" size="100"
                                    value={this.state.state} className="form-control" style={{ width: "100%" }} />
                            </div>
                        </div>


                    <div className="enq_Lab">
                            <label>GSTNO</label>
                            <div className="enq_Input">
                                <input type="text" name="gstNo"
                                    onChange={this.handleUserInputGSTNO} readOnly={this.state.gstnoreadonly}
                                    maxlength="20" size="20"
                                    value={this.state.gstNo} className="form-control" style={{ width: "100%" }} />
                            </div>


                        </div>
                        <div className="enq_Lab">
                            <label>Landline No</label><span style={{ color: "red", fontWeight: "700" }}></span>
                     

                            <div className="enq_Input">
                           
                                <input type="text" name="landlineNo"
                                    onChange={this.handleUserInputLandlineNo} 
                                    value={this.state.landlineNo} className="form-control"
                                    placeholder="Landline No With State Code" style={{ width: "100%" }} />

                            </div>
                            <span id="landlinenoerror" class="landlinenoerror" style={{ color: "red", fontWeight: "700" }}>! LandlineNo Invalid</span>
                     
                        </div>

                      {/*  <div className="enq_Lab">
                            <div className="r_Pay_Labl">
                                <label>WhatsApp Notification</label>
                            </div>
                            <div className="r_Pay_Inp">
                                <Toggle
                                    name="whatsApp"
                                    checked={this.state.whatsApp}
                                    icons={true}
                                    aria-label='No label tag'
                                    onChange={this.handleToogleChange} />
                            </div>
                        </div> */}

<SubmitButtonComponent  onClick={this.SubmitFunc} >Submit</SubmitButtonComponent>
{//<SubmitProceedButtonComponent  onClick={this.Submit_ProceedFunc} >Proceed to Addvehicle</SubmitProceedButtonComponent>
}<CancelButtonComponent onClick={this.CancelFunc}>Cancel</CancelButtonComponent>
<ClearButtonComponent onClick={this.ClearFunc} >Clear</ClearButtonComponent>

                          </div>
                   
                  
                </div>
               
      </div>
        )
   }
}