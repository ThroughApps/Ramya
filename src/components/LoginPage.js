import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import GenericDashboard from './Topnavbar/GenericDashboard';

import ForgotPassword from './ForgotPassword';
import CryptoJS from 'crypto-js';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
    GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
import SiteRegister from './SiteRegister';
import LicenseEntryForm from './LicenseEntryForm';

import dpalogo1 from './image/garagemanagementlogo.png';
import THROUGHBOOKS from './image/THROUGHBOOKS.png';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import GenericDashboardBasic from './Topnavbar/GenericDashboardBasic';
import GenericDashboardPremium from './Topnavbar/GenericDashboardPremium';
import GenericDashboardElite from './Topnavbar/GenericDashboardElite';
import './LoginPage.css';
import LandingPage_tagarage from './LandingPage_tagarage/LandingPage_tagarage';
import _ from 'underscore';
import NewMenuBar from './Topnavbar/NewMenuBar';

class LoginPage extends Component {


    constructor() {

        super()
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


        this.state = {
            emailId: '',
            password: '',
            date: date,
            formErrors: { emailId: '', password: '' },
            emailIdValid: false,
            passwordValid: false,

        };
        this.setState({
            date: date,
        });
    }

    componentDidMount() {
        SetCurrentPage("LoginPage");
        
        window.scrollTo(0, 0);
        var uri = window.location.toString();
        if (uri.indexOf("?") > 0) {
            var clean_uri = uri.substring(0, uri.indexOf("?"));
            window.history.replaceState({}, document.title, clean_uri);
        }

    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailIdValid = this.state.emailIdValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {

            case 'emailId':
                emailIdValid = value.length >= 10;
                { /*  emailIdValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);*/ }
                fieldValidationErrors.EmailId = emailIdValid ? '' : ' is invalid';
                break;
            case 'password':

                passwordValid = value.length >= 5 && value.match(/^((?=.*[0-9])(?=.*[A-Z])(?=.{8,}))/);
                fieldValidationErrors.Password = passwordValid ? '' : 'should be at least 8 character long/include at least one capital letter and number';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailIdValid: emailIdValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailIdValid && this.state.passwordValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    Fpassword() {
        ReactDOM.render(< ForgotPassword />, document.getElementById('root'));

    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) }
        );
    }

    Login() {
        var key = "shinchanbaby";

        localStorage.setItem('EmailId', CryptoJS.AES.encrypt(this.state.emailId, key));
        localStorage.setItem('Password', CryptoJS.AES.encrypt(this.state.password, key));
        var self = this;

        $.ajax({
            type: 'POST',
            data: JSON.stringify({

                emailId: this.state.emailId,
                password: this.state.password,
                date: this.state.date,

            }),

            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/Login/LoginCheck1",

            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {

                console.log("LOGIN DATA :",data);
                console.log("path ", window.location.pathname.toLowerCase());
                if (window.location.pathname.toLowerCase() === "/signup") {
                    var url_string = window.location.href;
                    var newurl = '/';
                    window.history.replaceState({}, document.title, newurl);

                }

                if (data.staffId == "NOT_REGISTERED") {

                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Please Register to Login',
                        showConfirmButton: false,
                        timer: 2000
                    })



                    ReactDOM.render(
                        <Router>
                            <div>

                                <Route path="/" component={LoginPage} />


                            </div>
                        </Router>, document.getElementById('root'));
                    registerServiceWorker();



                }
                else if (data.staffId == "PASSWORD_INCORRECT") {

                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Incorrect Password.Enter Correct Password or Click on Forgot Password to reset',
                        showConfirmButton: false,
                        timer: 2000
                    })


                    ReactDOM.render(
                        <Router>
                            <div>

                                <Route path="/" component={LoginPage} />


                            </div>
                        </Router>, document.getElementById('root'));
                    registerServiceWorker();


                }

                else if (data.status == "active") {
                    if (data.emailId == "Success") {

                        var notificationsConfigList=data.notificationsConfigList;
                       
                   
                        var whatsAppArray=_.where(notificationsConfigList,{moduleName:"whatsApp"});

                        console.log("data.fieldList :",data.fieldList);

                        localStorage.setItem('WhatsAppKeyId', CryptoJS.AES.encrypt(whatsAppArray[0].keyId, key));
                        localStorage.setItem('WhatsAppKeyToken', CryptoJS.AES.encrypt(whatsAppArray[0].keyToken, key));
                        localStorage.setItem('WhatsAppSenderNo', CryptoJS.AES.encrypt(whatsAppArray[0].senderNo, key));

                         localStorage.setItem('DynamicFields', CryptoJS.AES.encrypt((JSON.stringify(data.fieldList)), key));
                  
                        localStorage.setItem('isLoggedIn', CryptoJS.AES.encrypt("true".toString(), key));


                        localStorage.setItem('CompanyId', CryptoJS.AES.encrypt(data.companyId, key));
                        localStorage.setItem('CompanyEmailId', CryptoJS.AES.encrypt(data.companyEmailId, key));
                        localStorage.setItem('ContactNo', CryptoJS.AES.encrypt(data.contactNo, key));

                        localStorage.setItem('CompanyAddress', CryptoJS.AES.encrypt(JSON.stringify(data.companyAddress), key));
                        localStorage.setItem('DoorNo', CryptoJS.AES.encrypt(data.doorNo, key));
                        localStorage.setItem('Floor', CryptoJS.AES.encrypt(data.floor, key));
                        localStorage.setItem('Street', CryptoJS.AES.encrypt(data.street, key));
                        localStorage.setItem('Place', CryptoJS.AES.encrypt(data.place, key));
                        localStorage.setItem('State', CryptoJS.AES.encrypt(data.state, key));
                        localStorage.setItem('Area', CryptoJS.AES.encrypt(data.area, key));
                        localStorage.setItem('Zipcode', CryptoJS.AES.encrypt(data.zipCode, key));



                        localStorage.setItem('LandlineNo', CryptoJS.AES.encrypt(data.landlineNo, key));
                        localStorage.setItem('FeedbackNo', CryptoJS.AES.encrypt(data.feedbackNo, key));
                        localStorage.setItem('CompanyName', CryptoJS.AES.encrypt(data.companyName, key));
                        localStorage.setItem('LicenseKey', CryptoJS.AES.encrypt(data.licenseKey, key));
                        localStorage.setItem('Status', CryptoJS.AES.encrypt(data.status, key));
                        localStorage.setItem('Roles', CryptoJS.AES.encrypt(JSON.stringify(data.employeeRolelist), key));
                        localStorage.setItem('Permissions', CryptoJS.AES.encrypt(JSON.stringify(data.employeePermisionlist), key));
                        localStorage.setItem('PermissionHeader', CryptoJS.AES.encrypt(JSON.stringify(data.headerPermissionList), key));
                        localStorage.setItem('SiteDetails', CryptoJS.AES.encrypt((JSON.stringify(data.siteDetailList)), key));
                  
                  
                  
                        if (data.roleName == "Proprietor") {
                            localStorage.setItem('EmpSites', CryptoJS.AES.encrypt(_.pluck(data.siteDetailList, 'siteName').toString(), key));
                        } else {
                            localStorage.setItem('EmpSites', CryptoJS.AES.encrypt(data.empSites, key));
                        }

                        
                        localStorage.setItem('CurrentSite', CryptoJS.AES.encrypt("", key));
                        console.log("data.roleName ", data.roleName);
                        localStorage.setItem('Role', CryptoJS.AES.encrypt(data.roleName, key));
                        localStorage.setItem('staffId', CryptoJS.AES.encrypt(data.staffId, key));
                        localStorage.setItem('EmployeeName', CryptoJS.AES.encrypt(data.employeeName, key));
                        localStorage.setItem('EmpList', CryptoJS.AES.encrypt(JSON.stringify(data.employeeList), key));
                        localStorage.setItem('VendorList', CryptoJS.AES.encrypt(JSON.stringify(data.vendorList), key));
                        localStorage.setItem('CustomerList', CryptoJS.AES.encrypt(JSON.stringify(data.customerList), key));
                        localStorage.setItem('CategoryList', CryptoJS.AES.encrypt(JSON.stringify(data.categoryList), key));
                        localStorage.setItem('UserList', CryptoJS.AES.encrypt(JSON.stringify(data.userList), key));
                        localStorage.setItem('PlanName', CryptoJS.AES.encrypt(data.planName, key));

                        localStorage.setItem('AttendanceDate', CryptoJS.AES.encrypt(data.attendanceDate, key));
                        localStorage.setItem('LandlineNo', CryptoJS.AES.encrypt(data.landlineNo, key));
                        localStorage.setItem('FeedbackNo', CryptoJS.AES.encrypt(data.feedbackNo, key));
                        localStorage.setItem('ConfigValue', CryptoJS.AES.encrypt(data.configValue, key));
                        localStorage.setItem('ToggleValue', CryptoJS.AES.encrypt(data.toggleValue, key));


                        localStorage.setItem('GSTNo', CryptoJS.AES.encrypt(data.gstNo, key));
                        localStorage.setItem('BankName', CryptoJS.AES.encrypt(data.bankName, key));
                        localStorage.setItem('BranchName', CryptoJS.AES.encrypt(data.branchName, key));
                        localStorage.setItem('AccountNo', CryptoJS.AES.encrypt(data.accountNo, key));
                        localStorage.setItem('IfscCode', CryptoJS.AES.encrypt(data.ifscCode, key));
                        localStorage.setItem('AccountName', CryptoJS.AES.encrypt(data.accountName, key));
                        localStorage.setItem('CompanyLogo', CryptoJS.AES.encrypt(data.companyLogo, key));
                        localStorage.setItem('CompanyQRCode', CryptoJS.AES.encrypt(data.qrCodeFileName, key));

                      
                        localStorage.setItem('CompanyRegisteredDate', CryptoJS.AES.encrypt(data.companyRegisteredDate, key));
                        //    localStorage.setItem('OpeningBalance', CryptoJS.AES.encrypt(data.openingBalance, key));

                        var planName = CryptoJS.AES.decrypt(localStorage.getItem("PlanName"), "shinchanbaby").toString(CryptoJS.enc.Utf8);

                        //	 alert("plantype"+planName);
                        if (planName.toLowerCase() == "basic") {

                            ReactDOM.render(
                                <Router>
                                    <div >
                                        <Route exact path="/" component={GenericDashboardBasic} />

                                    </div>
                                </Router>, document.getElementById('root'));
                            registerServiceWorker();
                        }
                        else if (planName.toLowerCase() == "premium") {

                            ReactDOM.render(
                                <Router>
                                    <div >
                                        <Route exact path="/" component={GenericDashboardPremium} />

                                    </div>
                                </Router>, document.getElementById('root'));
                            registerServiceWorker();
                        }
                        else if (planName.toLowerCase() == "elite") {


                            ReactDOM.render(
                                <Router>
                                    <div >
                                        <Route path="/" component={NewMenuBar} />
                                    </div>
                                </Router>, document.getElementById('root'));
                            registerServiceWorker();
                        }




                        // ReactDOM.render(
                        //     <Router>
                        //         <div>

                        //             <Route path="/" component={() => <GenericDashboard />} />



                        //         </div>
                        //     </Router>,
                        //     document.getElementById('root'));
                        // registerServiceWorker();
                    }
                    else {

                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'Login Id or Password Incorrect',
                            showConfirmButton: false,
                            timer: 2000
                        })

                    }
                }
                else if (data.status == "inactive") {

                    localStorage.setItem('ConfigValue', CryptoJS.AES.encrypt(data.configValue, key));
                    localStorage.setItem('ToggleValue', CryptoJS.AES.encrypt(data.toggleValue, key));
                    localStorage.setItem('isLoggedIn', CryptoJS.AES.encrypt("false".toString(), key));
                  
                    var notificationsConfigList=data.notificationsConfigList;
                       
                   
                    var whatsAppArray=_.where(notificationsConfigList,{moduleName:"whatsApp"});

                    localStorage.setItem('WhatsAppKeyId', CryptoJS.AES.encrypt(whatsAppArray[0].keyId, key));
                    localStorage.setItem('WhatsAppKeyToken', CryptoJS.AES.encrypt(whatsAppArray[0].keyToken, key));
                    localStorage.setItem('WhatsAppSenderNo', CryptoJS.AES.encrypt(whatsAppArray[0].senderNo, key));

                    localStorage.setItem('DynamicFields', CryptoJS.AES.encrypt((JSON.stringify(data.fieldList)), key));
                                   
                    localStorage.setItem('CompanyId', CryptoJS.AES.encrypt(data.companyId, key));
                    localStorage.setItem('CompanyEmailId', CryptoJS.AES.encrypt(data.companyEmailId, key));
                    localStorage.setItem('ContactNo', CryptoJS.AES.encrypt(data.contactNo, key));

                    localStorage.setItem('CompanyAddress', CryptoJS.AES.encrypt(JSON.stringify(data.companyAddress), key));
                    localStorage.setItem('DoorNo', CryptoJS.AES.encrypt(data.doorNo, key));
                    localStorage.setItem('Floor', CryptoJS.AES.encrypt(data.floor, key));
                    localStorage.setItem('Street', CryptoJS.AES.encrypt(data.street, key));
                    localStorage.setItem('Place', CryptoJS.AES.encrypt(data.place, key));
                    localStorage.setItem('State', CryptoJS.AES.encrypt(data.state, key));
                    localStorage.setItem('Area', CryptoJS.AES.encrypt(data.area, key));
                    localStorage.setItem('Zipcode', CryptoJS.AES.encrypt(data.zipCode, key));



                    localStorage.setItem('LandlineNo', CryptoJS.AES.encrypt(data.landlineNo, key));
                    localStorage.setItem('FeedbackNo', CryptoJS.AES.encrypt(data.feedbackNo, key));
                    localStorage.setItem('CompanyName', CryptoJS.AES.encrypt(data.companyName, key));
                    localStorage.setItem('LicenseKey', CryptoJS.AES.encrypt(data.licenseKey, key));
                    localStorage.setItem('Status', CryptoJS.AES.encrypt(data.status, key));
                    localStorage.setItem('Roles', CryptoJS.AES.encrypt(JSON.stringify(data.employeeRolelist), key));
                    localStorage.setItem('Permissions', CryptoJS.AES.encrypt(JSON.stringify(data.employeePermisionlist), key));
                    localStorage.setItem('PermissionHeader', CryptoJS.AES.encrypt(JSON.stringify(data.headerPermissionList), key));
                    localStorage.setItem('SiteDetails', CryptoJS.AES.encrypt((JSON.stringify(data.siteDetailList)), key));
              
              
              
                    if (data.roleName == "Proprietor") {
                        localStorage.setItem('EmpSites', CryptoJS.AES.encrypt(_.pluck(data.siteDetailList, 'siteName').toString(), key));
                    } else {
                        localStorage.setItem('EmpSites', CryptoJS.AES.encrypt(data.empSites, key));
                    }

                    
                    localStorage.setItem('CurrentSite', CryptoJS.AES.encrypt("", key));
                    console.log("data.roleName ", data.roleName);
                    localStorage.setItem('Role', CryptoJS.AES.encrypt(data.roleName, key));
                    localStorage.setItem('staffId', CryptoJS.AES.encrypt(data.staffId, key));
                    localStorage.setItem('EmployeeName', CryptoJS.AES.encrypt(data.employeeName, key));
                    localStorage.setItem('EmpList', CryptoJS.AES.encrypt(JSON.stringify(data.employeeList), key));
                    localStorage.setItem('VendorList', CryptoJS.AES.encrypt(JSON.stringify(data.vendorList), key));
                    localStorage.setItem('CustomerList', CryptoJS.AES.encrypt(JSON.stringify(data.customerList), key));
                    localStorage.setItem('CategoryList', CryptoJS.AES.encrypt(JSON.stringify(data.categoryList), key));
                    localStorage.setItem('UserList', CryptoJS.AES.encrypt(JSON.stringify(data.userList), key));
                    localStorage.setItem('PlanName', CryptoJS.AES.encrypt(data.planName, key));

                    localStorage.setItem('AttendanceDate', CryptoJS.AES.encrypt(data.attendanceDate, key));
                    localStorage.setItem('LandlineNo', CryptoJS.AES.encrypt(data.landlineNo, key));
                    localStorage.setItem('FeedbackNo', CryptoJS.AES.encrypt(data.feedbackNo, key));
                    localStorage.setItem('ConfigValue', CryptoJS.AES.encrypt(data.configValue, key));
                    localStorage.setItem('ToggleValue', CryptoJS.AES.encrypt(data.toggleValue, key));


                    localStorage.setItem('GSTNo', CryptoJS.AES.encrypt(data.gstNo, key));
                    localStorage.setItem('BankName', CryptoJS.AES.encrypt(data.bankName, key));
                    localStorage.setItem('BranchName', CryptoJS.AES.encrypt(data.branchName, key));
                    localStorage.setItem('AccountNo', CryptoJS.AES.encrypt(data.accountNo, key));
                    localStorage.setItem('IfscCode', CryptoJS.AES.encrypt(data.ifscCode, key));
                    localStorage.setItem('AccountName', CryptoJS.AES.encrypt(data.accountName, key));
                    localStorage.setItem('CompanyLogo', CryptoJS.AES.encrypt(data.companyLogo, key));
                    localStorage.setItem('CompanyQRCode', CryptoJS.AES.encrypt(data.qrCodeFileName, key));

                  
                    localStorage.setItem('CompanyRegisteredDate', CryptoJS.AES.encrypt(data.companyRegisteredDate, key));
                    //    localStorage.setItem('OpeningBalance', CryptoJS.AES.encrypt(data.openingBalance, key));
ReactDOM.render(<LicenseEntryForm />, document.getElementById("root"));
                    registerServiceWorker();
                }
                else {

                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'License Renewal is Required',
                        showConfirmButton: false,
                        timer: 2000
                    })

                    ReactDOM.render(<LoginPage />, document.getElementById("root"));
                }

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
    SignUpFunc() {


        ReactDOM.render(< SiteRegister />, document.getElementById('root'));

    }

    HomeFunc() {

        ReactDOM.render(< LandingPage_tagarage />, document.getElementById('root'));

    }

    render() {
        return (
            <div id="loginpagebg">
            <div class="container" >
            <div className="loginpage_1 responsive ">
            <div className="login-container"
            /* style={{boxShadow: "10px 10px 5px grey"}} */>
            <div className="container" id="logbg" >
            <div className="row">
            <div className="col-sm-hide col-xs-hide col-md-5 col-lg-5" style={{backgroundColor: "#ffffff"  }}>
            <div className="welcome_cont">
                <h2 className="wel_text"> Welcome </h2>
            </div>
            <div class="imgcontainer" id="imgtic" >
            <img src={THROUGHBOOKS} alt="Avatar" class="avatar" id="imgcont" />
            </div>
            </div>
            <div className="col-sm-hide col-xs-hide col-md-7 col-lg-7 " style={{ backgroundColor: "rgb(9 14 92)" }}>
            {/*  <div class="imgcontainer" id="imgtic" >
            <img src={dpalogo1} alt="Avatar" style={{ borderRadius: "0px", marginTop: "10%" }} class="avatar" id="imgcont" />
            </div> */}
            <div className="containerlogin" id="loginpage">
            <div className="form-signin-heading text-muted" id="loginname">
            <h2 className="lod_Id"> LogIn </h2>
            </div>
            <div className="form-signin" id="login_details" style={{ paddingtop: "33px!important" }}>
            <label style={{  color: "#f3f1ee", textShadow: "2px 2px 2px #000"}}>email-ID / Mobile No</label>
            <div class="inputicons">
            <span class="fa fa-user"></span>
            <input type="text" value={this.state.emailId} onChange={this.handleUserInput}
            name="emailId" id="emailId" className="form-control text_feild" required="" autoFocus="" placeholder="email-ID / Mobile No" />
            </div>
            <label style={{ color: "#f3f1ee", textShadow: "2px 2px 2px #000" }}>password</label>
            <div class="inputicons">
            <span class="fa fa-lock"></span>
            <input type="password" value={this.state.password} onChange={this.handleUserInput}
            name="password" id="password" className="form-control text_feild" required="" placeholder="Password" />
            </div>
            <div className="checkbox check_1">
            <button type="button" id="forgetpwdID" onClick={() => this.Fpassword()} className="btn btn-link">Forgot Password ?</button>
            <button type="button" id="forgetpwdID" onClick={() => this.SignUpFunc()} className="btn btn-link" >Sign Up</button>
            <button style={{ float: "right" }} type="button" id="forgetpwdID" onClick={() => this.HomeFunc()} className="btn btn-link" ><span class="fa fa-home"></span></button>
            </div>
            <div id="loginSubmitButton1">
            <button type="submit" id="loginSubmitButton" disabled={!this.state.formValid}
            style={{ marginTop: "0%" }}
            onClick={() => this.Login()} className="btn btn-md" ><span class="fa fa-angle-double-right" style={{ paddingRight: "10px" }}></span>LOGIN </button>
            </div>
            </div>
            </div>
            </div>
            </div>{/* row ends */}
            </div>
            </div>
            </div>
            </div>
            </div>
            );
            }
            }
            export default LoginPage;