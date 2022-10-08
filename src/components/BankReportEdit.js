import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import { FormErrors } from './FormErrors';
import $ from 'jquery';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import SalesReportDisplay from './SalesReportDisplay';
import SalesDailyReport from './SalesDailyReport';
import ReportMenuPage from './ReportMenuPage';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import CryptoJS from 'crypto-js';
import BankReport from './BankReport';
import FooterText from './FooterText';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import Case from 'case';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';

var id;
var discount = 0;
var pay = 0;
class BankReportEdit extends Component {

    constructor(props) {
        super(props)
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
       
        this.state = {

            bankName: this.props.bankName,
            accountName: this.props.accountName,
            accountNo: this.props.accountNo,
            branchName: this.props.branchName,
            ifscCode: this.props.ifscCode,  
       bankId: this.props.bankId,


       staffId:staffId,
       employeeName:employeeName,
      role:role,  


            date: date,
            companyId: companyId,
        };
        this.setState({
            date: date,
        })


    }


    componentDidMount() {
        SetCurrentPage("BankReportEdit");
        window.scrollTo(0, 0);
       
        $(".btn-default").css("background-color","#05a4b5");
    $(".btn-default").css("color","white");



    }




    handleUserInput = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value

        },
        );

    }




    UpdateSubmit() {

        var self = this;
       
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                bankName: Case.capital(self.state.bankName),
                accountName: Case.capital(self.state.accountName),
                accountNo:self.state.accountNo,
                branchName: Case.capital(self.state.branchName),
                ifscCode: self.state.ifscCode,
                bankId:self.state.bankId,                
                companyId: self.state.companyId,
                staffId: self.state.staffId,
                   employeeName: self.state.employeeName,
                   role: self.state.role,

            }),
            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/staff/BankDetailsUpdate",
            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {

                var tab;

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title:  'Bank Details Updated Successfully',  
                    showConfirmButton: false,
                    timer: 2000
                  })
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={BankReport} />


                        </div>
                    </Router>,
                    document.getElementById('contentRender'));
                registerServiceWorker();


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

                    <Route path="/" component={BankReport} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }




    render() {
        return (


            <div class="container" style={{ height: "20px" }}>
                <div className="">
            <div className="">
            <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
            </div>
            <div className="inv_HeaderCls">
              <h3>Bank Details Update</h3>
                    </div>
                    </div>

               
                <div class="card">
                   
                      
                    <div>
                        <div class="card-body">
                        <form class="form-horizontal form-bordered" name="submissions" action="/action_page.php">
                        <div className="form-group">
                                    <label class="control-label col-sm-2" for="bankName">Bank Name<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10" style={{marginBottom:"0px"}} >
                                        <input type="text" class="form-control" id="bankName" name="bankName" value={this.state.bankName} onChange={this.handleUserInput} placeholder="Bank Name" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="accountName">Accountant Name<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10" style={{marginBottom:"0px"}} >
                                    <input type="text" class="form-control" name="accountName" value={this.state.accountName} onChange={this.handleUserInput} id="accountName" placeholder="Account Name" />  
                                    </div>
                                </div>
                    
                                <div className="form-group">
                                    <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="accountNo">Account No<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10" style={{marginBottom:"0px"}}>
                                        <input type="text" class="form-control" name="accountNo" value={this.state.accountNo} onChange={this.handleUserInput} id="accountNo" placeholder="Account No" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="branchName"> Branch Name<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10" style={{marginBottom:"0px"}}>
                                        <input type="text" class="form-control"  name="branchName" value={this.state.branchName} onChange={this.handleUserInput} id="branchName" placeholder="Branch Name" />
                                    </div>
                                </div>
          
                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="ifscCode"> IFSC Code<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10" style={{marginBottom:"0px"}}>
                                        <input type="text" class="form-control" name="ifscCode" value={this.state.ifscCode} onChange={this.handleUserInput} id="ifscCode" placeholder="IFSC Code" />
                                    </div>
                                </div>
                       


                            </form>
                        </div>

                    </div>
                    <div class="form-group">
                        <div class="row" style={{marginBottom:"20px"}}>
                            <div class="col-sm-offset-2 col-sm-10">
                                <button type="button" style={{ fontWeight: "bold" }} class="btn btn-default" onClick={() => this.UpdateSubmit()}>Update</button>

                            </div></div></div>


                </div></div>
        );
    }
}

export default BankReportEdit;