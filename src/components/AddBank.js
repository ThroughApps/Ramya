import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import VendorEntryForm from './VendorEntryForm';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { FormErrors } from './FormErrors';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import {Double_BackButtonComponent} from './ServiceRegistration/ButtonComponent';
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';

import VendorList from './VendorList';
import ProductList from './ProductList';
import SaleOrder from './SaleOrder';
import CustomerList from './CustomerList';
import AddProduct from './AddProduct';
import InvoiceList from './InvoiceList';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import FooterText from './FooterText';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import Case from 'case';
import BankReport from './BankReport';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';


class AddBank extends Component {
    constructor() {
        super()
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
       
       
        this.state = {
            bankName: '',
            accountName: '',
            accountNo: '',
            ifscCode: '',
            branchName:'',
            staffId:staffId,
            employeeName:employeeName,
           role:role, 
            formErrors: {
                bankName: '',
                accountName: '',
                accountNo: '',
                ifscCode: '',
                branchName:'',

            },

            bankNameValid: false,
            accountNameValid: false,
            accountNoValid: false,
            ifscCodeValid: false,
            branchNameValid:false,
         
        }
        this.setState({
            date: date,
        })
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let bankNameValid = this.state.bankNameValid;
        let accountNameValid = this.state.accountNameValid;
        let accountNoValid = this.state.accountNoValid;
        let ifscCodeValid = this.state.ifscCodeValid;
        let branchNameValid =this.state.branchNameValid;
       

        switch (fieldName) {
            case 'bankName':
                bankNameValid = value.match(/^([a-zA-Z]+)([a-zA-Z ])*$/);
                fieldValidationErrors.BankName = bankNameValid ? '' : ' is InCorrect';
                break;
            case 'accountName':
                accountNameValid = value.length>0;
                fieldValidationErrors.AccountName = accountNameValid ? '' : ' is InCorrect';
                break;


            case 'accountNo':
            accountNoValid = value.length > 5;
                fieldValidationErrors.AccountNo = accountNoValid ? '' : ' is too short';
                break;

            case 'ifscCode':
            ifscCodeValid = value.length > 5;
                fieldValidationErrors.IfscCode = ifscCodeValid ? '' : ' is InCorrect';
                break;

                case 'branchName':
                branchNameValid = value.length >5;
                    fieldValidationErrors.BranchName = branchNameValid ? '' : ' is too short';
                    break;
    

            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            bankNameValid: bankNameValid,
            accountNameValid: accountNameValid,
            accountNoValid: accountNoValid,
            ifscCodeValid: ifscCodeValid,
            branchNameValid:branchNameValid,

        }, this.validateForm);
    }
    validateForm() {

        this.setState({
            formValid:

                this.state.bankNameValid
                && this.state.accountNameValid
                && this.state.accountNoValid
                && this.state.ifscCodeValid
                && this.state.branchNameValid
            

        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    AddBankFunc() {
        var self = this;
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.setState({
            companyId: companyId,
        });
        if (this.state.accountNo.trim().length > 2) {
            $.ajax({
                type: 'POST',
                data: JSON.stringify({
                    bankName: Case.capital(this.state.bankName),
                    accountName: Case.capital(this.state.accountName),
                    accountNo:this.state.accountNo,
                    ifscCode: this.state.ifscCode,  
                    branchName: Case.capital(this.state.branchName),                  
                    companyId: this.state.companyId,
                    staffId: self.state.staffId,
                   employeeName: self.state.employeeName,
                   role: self.state.role,
                }),
                url: " http://15.206.129.105:8080/ThroughBooksCOAPI/staff/addBank",
                contentType: "application/json",
                dataType: 'json',
                async: false,
                success: function (data, textStatus, jqXHR) {
                    if (data.accountNo == "AccountNo") {
                      
                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'The Account Number Already Exists',
                            showConfirmButton: false,
                            timer: 2000
                          })
                    }                
                    else {

                        
                    //     var bankNamee = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('BankName'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
                    //    alert("bankName"+bankNamee)
                    //     bankNamee.push({bankName: self.state.bankName});
                        localStorage.setItem('BankName', CryptoJS.AES.encrypt(self.state.bankName, "shinchanbaby"));
                       
                        // var branchNamee = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('BranchName'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
                        // branchNamee.push({branchName: self.state.branchName});
                        localStorage.setItem('BranchName', CryptoJS.AES.encrypt(self.state.branchName, "shinchanbaby"));
                     

                        // var accountNoo = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('AccountNo'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
                        // accountNoo.push({accountNo: self.state.accountNo});
                        localStorage.setItem('AccountNo', CryptoJS.AES.encrypt(self.state.accountNo, "shinchanbaby"));
                    

                        // var ifscCodee = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('IfscCode'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
                        // ifscCodee.push({ifscCode: self.state.ifscCode});
                        localStorage.setItem('IfscCode', CryptoJS.AES.encrypt(self.state.ifscCode, "shinchanbaby"));
                   
                        // var accountNamee = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('AccountName'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
                        // accountNamee.push({accountName: self.state.accountName});
                       localStorage.setItem('AccountName', CryptoJS.AES.encrypt(self.state.accountName, "shinchanbaby"));
          
                      
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title:'Successfully Added Bank Details',  
                            showConfirmButton: false,
                            timer: 2000
                          })

                        self.state.bankName = "";
                        self.state.accountName = "";
                        self.state.accountNo = "";
                        self.state.ifscCode = "";
                        self.state.branchName = "";


                        self.state.formValid = false;
                        self.state.bankNameValid = false;
                        self.state.accountNameValid = false;
                        self.state.accountNoValid = false;
                        self.state.ifscCodeValid = false;
                        self.state.branchNameValid = false;
                          

                        self.setState({
                            bankName: '',
                            accountName: '',
                            accountNo: '',
                            ifscCode: '',
                            branchName:'',
                       

                            formValid: false,
                            bankNameValid: false,
                            accountNameValid: false,
                            accountNoValid: false,
                            ifscCodeValid: false,
                            branchNameValid:false,
                        

                        });
                        ReactDOM.render(
                            <Router >
                                <div>
                                    <Route path="/" component={AddBank} />
                                </div>
                            </Router>, document.getElementById('contentRender'));



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


                },
            });
        } else {
          
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Please verify your Account Number',
                showConfirmButton: false,
                timer: 2000
              })
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    componentDidMount() {
        SetCurrentPage("AddBank");
        window.scrollTo(0, 0);
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.setState({
            companyId: companyId,
        });  
        $(".btn-default").css("background-color","#05a4b5");
        $(".btn-default").css("color","white");

    }

    cancelFunc() {
        
        ReactDOM.render(<AddBank />, document.getElementById("contentRender"));
    }
    BackbtnFunc() {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={BankReport} />
                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }
    render() {
        return (

            <div class="container">
               
                
                    <div className="">
            <div className="">
              <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
            </div>
            <div className="inv_HeaderCls">
              <h3>Add Bank</h3>
                    </div>
                    </div>
    
                
                <div class="card" style={{ width: "100%" }}>
                    <div class="card-body" >
                            <div className="panel panel-default" style={{borderColor:"lightGrey"}}>
                                <FormErrors formErrors={this.state.formErrors} />
                            </div>

                            <form class="form-horizontal form-bordered">
                                <div className={`form-group ${this.errorClass(this.state.formErrors.bankName)}`}>
                                    <label class="control-label col-sm-2" for="bankName">Bank Name<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10" >
                                        <input type="text" class="form-control" id="bankName" name="bankName" value={this.state.bankName} onChange={this.handleUserInput} placeholder="Bank Name" />
                                    </div>
                                </div>
                                <div className={`form-group ${this.errorClass(this.state.formErrors.accountName)}`}>
                                    <label class="control-label col-sm-2" for="accountName">Accountant Name<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10"  >
                                    <input type="text" class="form-control" name="accountName" value={this.state.accountName} onChange={this.handleUserInput} id="accountName" placeholder="Account Name" /> 
                                    </div>
                                </div>
                    
                                <div className={`form-group ${this.errorClass(this.state.formErrors.accountNo)}`}>
                                    <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="accountNo">Account No<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10" >
                                        <input type="text" class="form-control" name="accountNo" value={this.state.accountNo} onChange={this.handleUserInput} id="accountNo" placeholder="Account No" />
                                    </div>
                                </div>
                                <div className={`form-group ${this.errorClass(this.state.formErrors.branchName)}`}>
                                    <label class="control-label col-sm-2" for="branchName"> Branch Name<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10" >
                                        <input type="text" class="form-control"  name="branchName" value={this.state.branchName} onChange={this.handleUserInput} id="branchName" placeholder="Branch Name" />
                                    </div>
                                </div>
          
                                <div className={`form-group ${this.errorClass(this.state.formErrors.ifscCode)}`}>
                                    <label class="control-label col-sm-2" for="ifscCode"> IFSC Code<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10" >
                                        <input type="text" class="form-control" name="ifscCode" value={this.state.ifscCode} onChange={this.handleUserInput} id="ifscCode" placeholder="IFSC Code" />
                                    </div>
                                </div>
                       

                                <div class="form-group" >
                                    <div class="row"  style={{ marginLeft: "2px", marginBottom: "10%" }}>
                                    <div class="col-sm-offset-2 col-sm-10">
                                            <button style={{ fontWeight: "bold" }} type="button" disabled={!this.state.formValid} onClick={() => this.AddBankFunc()}  class="btn btn-default">Submit</button> <span></span>
                                            <button style={{ fontWeight: "bold" }} type="button" onClick={() => this.cancelFunc()} class="btn btn-default">Clear</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div></div>
            
        );
    }
}

export default AddBank;