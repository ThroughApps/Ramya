import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';
import GenericDashboardElite from './Topnavbar/GenericDashboardElite';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import NewMenuBar from './Topnavbar/NewMenuBar';
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';

class CompanySetting extends Component {

    constructor(props) {
        super(props)
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        
        this.state = {

            location: '',
            emailId: '',
            mobileNo: '',
            address: '',
            city: '',
            state: '',
            country: '',
            zipCode: '000000',
            companyId: companyId,
            siteNo: '',
            site: 1,
            siteName: '',
            firstName: '',
            lastName: '',
            planName: '',
            gstin: '',

            formErrors: {
                emailId: '',
             
                zipCode:'',
              },
        
            
            emailIdValid: true,
          
            zipCodeValid:true,
          

        }
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }
  
    

   

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
     
        let emailIdValid = this.state.emailIdValid;
      
    
        let zipCodeValid = this.state.zipCodeValid;
    
        switch (fieldName) {  
          case 'emailId':
            emailIdValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.EmailId = emailIdValid ? '' : ' is InCorrect';
            break;
    

            case 'zipCode':          
                zipCodeValid = value.match(/^[0-9]{6}$/);
              fieldValidationErrors.ZipCode = zipCodeValid ? '' : ' should be 6 digit number';
              break;
          default:
            break;
        }
        this.setState({
          formErrors: fieldValidationErrors,
          emailIdValid: emailIdValid,
        
          zipCodeValid:zipCodeValid,
    
        }, this.validateForm);
      }
    
    validateForm() {

        this.setState({
            formValid:
                this.state.emailIdValid
             
                && this.state.zipCodeValid

        });
    }
 

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    
    componentDidMount() {
        SetCurrentPage("CompanySettings");
        this.GetData();
        this.validateForm();
        window.scrollTo(0, 0);
    }

    GetData() {
        var self = this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,

            }),
             //  url: " http://15.206.129.105:8080/ThroughBooksCOAPI/CompanySettings/GetCompanyDetails",
            url: "http://15.206.129.105:8080/ThroughBooksCOAPI/CompanySettings/GetCompanyDetails",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
              
              
                self.state.siteName = data.companyName;
                self.state.emailId = data.emailId;
                self.state.mobileNo = data.contactNo;
                self.state.gstin = data.gstinNo;
                self.state.plan = data.plan;

                self.state.doorNo = data.doorNo;
                self.state.street=  data.street;
                self.state.city = data.city;
                self.state.state = data.place;
                self.state.country = data.country;
                self.state.zipCode = data.zipCode;
                self.state.feedbackNo=data.feedbackNo;
                self.state.area=data.area;
                self.state.floor=data.floor;
          
                self.state.oldsiteName = data.companyName;
                self.state.oldemailId = data.emailId;
                self.state.oldmobileNo = data.contactNo;


                self.state.olddoorNo = data.doorNo;
                self.state.oldstreet=  data.street;
                self.state.oldcity = data.city;
                self.state.oldstate = data.place;
                self.state.oldcountry = data.country;
                self.state.oldzipCode = data.zipCode;
                self.state.oldfeedbackNo=data.feedbackNo;
                self.state.oldarea=data.area;
                self.state.oldfloor=data.floor;
                self.state.oldgstin = data.gstinNo;

                self.validateField("emailId",self.state.emailId);
                self.validateField("mobileNo",self.state.mobileNo);
                self.validateField("zipCode",self.state.zipCode);

               
            },
            error: function (data) {
                confirmAlert({
                    title: 'No Internet',                        // Title dialog
                    message: 'Network Connection Problem',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                });


            },
        });


    }

 

    

    UpdateSiteDetails() {
        if ((this.state.oldsiteName!=this.state.siteName) || (this.state.oldmobileNo!=this.state.mobileNo)
            || (this.state.oldemailId!=this.state.emailId) || (this.state.olddoorNo != this.state.olddoorNo) 
            ||  (this.state.oldstreet!=this.state.street)  
            || (this.state.oldcity != this.state.city) || (this.state.oldstate != this.state.oldstate)
            || (this.state.oldzipCode!=this.state.zipCode) || (this.state.oldfeedbackNo !=this.state.feedbackNo) 
            || (this.state.oldarea != this.state.area) || (this.state.oldfloor!=this.state.floor) 
            || (this.state.oldgstin != this.state.gstin)  ) {
            var self = this;

          

            $.ajax({
                type: 'POST',
                data: JSON.stringify({
                    companyId: this.state.companyId,
                    companyName:this.state.siteName,
                    emailId:this.state.emailId,
                    contactNo:this.state.mobileNo,
                    gstinNo:this.state.gstin,
                    plan:this.state.plan,
                    doorNo:this.state.doorNo,
                    street:this.state.street,
                    city:this.state.city,
                    place:this.state.state,
                    country:this.state.country,
                    zipCode:this.state.zipCode,
                    feedbackNo:this.state.feedbackNo,
                    area:this.state.area,
                    floor:this.state.floor,
                    oldEmailId:this.state.oldemailId,
                    oldContactNo:this.state.oldmobileNo
                }),
              // url: "https://wildfly.tictoks.in:443/EmployeeAttendenceAPI/SitRegistration/UpdateCompanyDetails",
                url: "http://15.206.129.105:8080/ThroughBooksCOAPI/CompanySettings/UpdateCompanyDetails",
                contentType: "application/json",
                dataType: 'json',
                async: false,
                success: function (data, textStatus, jqXHR) {

                    if(data.response=="Success"){
                        
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Successfully Updated Company details',
                            showConfirmButton: false,
                            timer: 2000
                          })

                        localStorage.setItem('CompanyEmailId', CryptoJS.AES.encrypt(data.emailId, "shinchanbaby"));
                        localStorage.setItem('ContactNo', CryptoJS.AES.encrypt(data.contactNo, "shinchanbaby"));
  
                        localStorage.setItem('GSTNo', CryptoJS.AES.encrypt(self.state.gstin, "shinchanbaby"));

                    }else if(data.response=="Fail"){

                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'Updating Company details Failed',
                            showConfirmButton: false,
                            timer: 2000
                          })

                    }else if(data.response=="Email_Already_Exist"){

                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'EmailId Already Exist',
                            showConfirmButton: false,
                            timer: 2000
                          })

                        
                    }else if(data.response=="Mobile_No_Already_Exist"){

                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'Contact No Already Exist',
                            showConfirmButton: false,
                            timer: 2000
                          })

                        
                    }
                 

                    ReactDOM.render(
                        <Router>
                            <div>
                                <Route path="/" component={NewMenuBar} />
                            </div>
                        </Router>,
                        document.getElementById("contentRender")
                    );

                },
                error: function (data) {
                    
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Network Connection Problem',
                        showConfirmButton: false,
                        timer: 2000
                      })

                },
            });
        } else {

            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'No Change',
                showConfirmButton: false,
                timer: 2000
              })
        }

    }
    cancelFunc() {

        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={NewMenuBar} />
                </div>
            </Router>,
            document.getElementById("contentRender")
        );
    }

  
    render() {
        return (

            <div class="container" style={{ backgroundColor: "#f2f2f200", color: "black" }}>
                 <div className="">
            <div className="">
              <BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
            </div>
            <div className="inv_HeaderCls">
              <h3>Organization Details </h3>
                    </div>
                    </div>

                <div class="card">
                    
                    <div class="card-body">

                        <div className="panel panel-default" style={{ borderColor: " #f10f0f", textTransform: "capitalize", color: "black" }}>
                            <FormErrors formErrors={this.state.formErrors} />
                        </div>
                        <form class="form-horizontal form-bordered" name="submissions">
                            <div class="form-group">

                                <label class="control-label col-sm-2 font-weight-bold" for="companyId">
                                    Company Id
                             </label>
                                <div className="col-sm-2">
                                    <input type="text"
                                        class="form-control"
                                        value={this.state.companyId}
                                        style={{ textTransform: "capitalize", color: "black" }}
                                        id="companyId"
                                        name="companyId"
                                        readOnly
                                    />
                                </div>
                                <label class="control-label col-sm-2 font-weight-bold" for="siteName">
                                  Company Name
                                </label>
                                <div className="col-sm-4">
                                    <input type="text"
                                        class="form-control"
                                        value={this.state.siteName}
                                        style={{ textTransform: "capitalize", color: "black" }}
                                        id="siteName"
                                        name="siteName"
                                        onChange={this.handleUserInput}
                                    />
                                </div>
                            </div>
                             <div className="form-group "> 
                               
                                <label class="control-label col-sm-2 font-weight-bold" for="mobileNo">
                                    Mobile No
                                </label>
                                <div className="col-sm-4">

                                    <input type="text"
                                        class="form-control"
                                        style={{ color: "black" }}
                                        value={this.state.mobileNo}
                                        autoComplete="off"
                                        id="mobileNo"
                                        name="mobileNo"
                                        onChange={this.handleUserInput}
                                    />
                                </div>
                               
                                <div className={`form-group ${this.errorClass(this.state.formErrors.emailId)}`}> 
                         
                                <label class="control-label col-sm-2 font-weight-bold" for="emailId">
                                    Email Id<span style={{ color: "red" }}>*</span>
                                </label>
                                <div className="col-sm-4">

                                    <input type="email"
                                        value={this.state.emailId} class="form-control"
                                        style={{ color: "black" }}
                                        id="emailId"
                                        name="emailId"
                                        onChange={this.handleUserInput}
                                        />

                                </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-sm-2 font-weight-bold" for="plan">
                                    Plan
                                </label>
                                <div className="col-sm-8">

                                    <input type="text"
                                        class="form-control"
                                        style={{ color: "black" }}
                                        value={this.state.plan}
                                        autoComplete="off"
                                        id="plan"
                                        name="plan"
                                        readOnly
                                    />
                                </div>
                               {/* <div style={{ marginTop: "5px" }} className="col-sm-2">
                                    <button onClick={() => this.ChangePlan()}>
                                        Change
                                    </button>
                                </div> */}
                            </div>  
                            <div class="row">
                  <div class="col-sm-2 col-md-2 col-lg-2">
                    <label class="control-label font-weight-bold pull-right" for="doorNo">Address</label>

                  </div>
                  <div class="col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      {/* <div className={`form-group ${this.errorClass(this.state.formErrors.doorNo)}`}> */}
                      <label class="control-label col-sm-3 font-weight-bold" for="doorNo">Door No</label>
                      <div class="col-sm-6">
                        <input type="text"
                          style={{ color: "black" }}
                          value={this.state.doorNo}
                          onChange={this.handleUserInput} class="form-control"
                          id="doorNo"
                          name="doorNo"
                          maxlength="10"
                          placeholder="Your doorNo.."
                          required />
                      </div>
                    </div>
                  </div>


                  <div class="col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      {/* <div className={`form-group ${this.errorClass(this.state.formErrors.floor)}`}> */}
                      <label class="control-label col-sm-3 font-weight-bold" for="floor">Floor No</label>
                      <div class="col-sm-6">

                        <input type="text"
                          style={{ color: "black" }}
                          value={this.state.floor}
                          onChange={this.handleUserInput} class="form-control"
                          id="floor"
                          name="floor"
                          maxlength="15"
                          placeholder="Your floor No.."
                          required />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-2 col-md-2 col-lg-2"></div>
                  <div class="col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      {/* <div className={`form-group ${this.errorClass(this.state.formErrors.street)}`}> */}
                      <label class="control-label col-sm-3 font-weight-bold" for="street">Street</label>
                      <div class="col-sm-6">

                        <input type="text"
                          style={{ color: "black" }}
                          value={this.state.street}
                          onChange={this.handleUserInput} class="form-control"
                          id="street"
                          name="street"
                          maxlength="25"
                          placeholder="Your Street.."
                          required />
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      {/* <div className={`form-group ${this.errorClass(this.state.formErrors.city)}`}> */}
                      <label class="control-label col-sm-3 font-weight-bold" for="city">City</label>
                      <div class="col-sm-6">

                        <input type="text"
                          style={{ color: "black" }}
                          value={this.state.city}
                          onChange={this.handleUserInput} class="form-control"
                          id="city"
                          name="city"
                          maxlength="15"
                          placeholder="Your City.."
                          required />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-2 col-md-2 col-lg-2"></div>
                  <div class="col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      {/* <div className={`form-group ${this.errorClass(this.state.formErrors.street)}`}> */}
                      <label class="control-label col-sm-3 font-weight-bold" for="area">Area</label>
                      <div class="col-sm-6">

                        <input type="text"
                          style={{ color: "black" }}
                          value={this.state.area}
                          onChange={this.handleUserInput} class="form-control"
                          id="area"
                          name="area"
                          maxlength="25"
                          placeholder="Your Area.."
                          required />
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      {/* <div className={`form-group ${this.errorClass(this.state.formErrors.street)}`}> */}
                      <label class="control-label col-sm-3 font-weight-bold" for="State">State</label>
                      <div class="col-sm-6">

                        <input type="text"
                          style={{ color: "black" }}
                          value={this.state.state}
                          onChange={this.handleUserInput} class="form-control"
                          id="state"
                          name="state"
                         // maxlength="15"
                          placeholder="Your State.."
                          required />
                      </div>
                    </div>

                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-2 col-md-2 col-lg-2"></div>
                  <div class="col-sm-4 col-md-4 col-lg-4">
              
                   <div className={`form-group ${this.errorClass(this.state.formErrors.zipCode)}`}> 
                      <label class="control-label col-sm-3 font-weight-bold" for="zipCode">Zipcode<span style={{ color: "red" }}>*</span></label>
                      <div class="col-sm-6">

                        <input type="text"
                          style={{ color: "black" }}
                          value={this.state.zipCode}
                          onChange={this.handleUserInput} class="form-control"
                          id="zipCode"
                          name="zipCode"
                          maxlength="15"
                          placeholder="Your zipCode.."
                          required />
                      </div>
                    </div> 
                   
                  </div>

                  </div>
                        
                        
                            <div class="form-group">
                                <label class="control-label col-sm-2 font-weight-bold" for="gstin">
                                    GSTIN
                                </label>
                                <div className="col-sm-3">
                                    <input type="text" class="form-control"
                                        style={{ color: "black" }}
                                        value={this.state.gstin}
                                        autoComplete="off"
                                        onChange={this.handleUserInput}
                                        id="gstin"
                                        name="gstin"
                                        placeholder="Your GST No.."
                                        required />
                                </div>
                            </div>    
                            <div class="form-group">
                                <label class="control-label col-sm-2 font-weight-bold" for="feedbackNo">
                                    Feedback No
                                </label>
                                <div className="col-sm-3">
                                    <input type="text" class="form-control"
                                        style={{ color: "black" }}
                                        value={this.state.feedbackNo}
                                        autoComplete="off"
                                        onChange={this.handleUserInput}
                                        id="feedbackNo"
                                        name="feedbackNo"
                                        placeholder="Your feedbackNo No.."
                                        required />
                                </div>
                            </div> 

                            <div id="messageDetails">
                                {/* <div class="form-group">
                                    <label class="control-label col-sm-2 font-weight-bold" for="missedCheckOutSms">
                                        Check In/Out With OTP
                                </label>
                                    <div className="col-sm-2">
                                        <Switch name="checkInOTP" id="checkInOTP" onClick={() => this.handleUserCheckInSwitch("checkInOTP")} on={this.state.checkInOTPStatus} />

                                    </div>
                                    <label class="control-label col-sm-3 font-weight-bold allowCheckIn" for="missedCheckOutSms">
                                        Allow Check In/Out If Message Balance is ZERO
                                    </label>
                                    <div className="col-sm-2 allowCheckIn">
                                        <Switch name="allowCheckIn" id="allowCheckIn" onClick={() => this.handleUserSwitch("allowCheckIn")} on={this.state.allowCheckInStatus} />

                                    </div>
                                </div> */}
                               {/* <div class="form-group">
                                    <label class="control-label col-sm-2 font-weight-bold" for="checkInOutSms">
                                        Check In/Out SMS
                                </label>
                                    <div className="col-sm-2">
                                        <Switch name="checkInOutSms" id="checkInOutSms" onClick={() => this.handleUserSwitch("checkInOutSms")} on={this.state.checkInOutSmsStatus} />
                                    </div>
                                    <label class="control-label col-sm-3 font-weight-bold" for="missedCheckOutSms">
                                        Missed Check Out SMS
                                </label>
                                    <div className="col-sm-2">
                                        <Switch name="missedCheckOutSms" id="missedCheckOutSms" onClick={() => this.handleUserSwitch("missedCheckOutSms")} on={this.state.missedCheckOutSmsStatus} />

                                    </div>
                                </div>  */}
                                <div class="form-group">

                                </div>
                               {/* <div class="form-group">
                                    <label class="control-label col-sm-2 font-weight-bold" for="gstin">
                                        Daily Attendance SMS to Proprietor
                                </label>
                                    <div className="col-sm-10">
                                        <input type="checkbox"
                                            value={this.state.dailyAttendSms}
                                            name="dailyAttendSms"
                                            onChange={this.handleCheckBox}
                                            id="dailyAttendSms" /> <label for="sms">Sms</label>&ensp;
                                    <input type="checkbox"
                                            value={this.state.dailyAttendEmail}
                                            name="dailyAttendEmail"
                                            onChange={this.handleCheckBox}
                                            id="dailyAttendEmail" /><label for="email">Email</label>
                                    </div>
                                </div>  */}
                               {/* <div class="form-group">
                                    <label class="control-label col-sm-2 font-weight-bold" for="gstin">
                                        Message Center Communication Sms
                                </label>
                                    <div className="col-sm-2">
                                        <Switch name="messageCenterSms" id="messageCenterSms" onClick={() => this.handleUserSwitch("messageCenterSms")} on={this.state.messageCenterSmsStatus} />
                                    </div>
                                   
                                </div> */}
                              {/*  <div class="form-group">
                                    <label class="control-label col-sm-2 font-weight-bold" for="gstin">
                                        Message Balance
                                </label>
                                    <div className="col-sm-4">
                                        <input type="text"
                                            class="form-control"
                                            style={{ color: "black" }}
                                            value={this.state.messagePlan}
                                            autoComplete="off"
                                            id="messagePlan"
                                            name="messagePlan"
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-sm-4">
                                        <input type="text"
                                            class="form-control"
                                            style={{ color: "black" }}
                                            value={this.state.messageCount}
                                            autoComplete="off"
                                            id="messageCount"
                                            name="messageCount"
                                            readOnly
                                        /></div>
                                    <div className="col-sm-2">
                                        <button onClick={() => this.BuyMessage()}>
                                            Buy
                                    </button>  </div>
                                </div> */}
                            </div>
                            <div class="form-group">
                                <div class="row" style={{ marginLeft: "2px" }}>
                                    <div class="col-sm-offset-2 col-sm-10">
                                        <button type="button" disabled={!this.state.formValid} onClick={() => this.UpdateSiteDetails()} className="btn btn-primary" style={{ marginLeft: "20px", marginLeft: "auto", marginRight: "auto", marginBottom: "45px", marginTop: "20px", display: "inline-block" }}>Save</button><span></span>
                                        &ensp;<button type="button" onClick={() => this.cancelFunc()} className="btn btn-primary" style={{ marginLeft: "20px", marginLeft: "auto", marginRight: "auto", marginBottom: "45px", marginTop: "20px", display: "inline-block" }}>Cancel</button>
                                    </div></div></div>
                        </form>
                    </div>
                </div>
            </div>

        );
    }

}


export default CompanySetting;