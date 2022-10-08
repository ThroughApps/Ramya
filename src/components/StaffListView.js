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
import StaffList from './StaffList';
import { Multiselect } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
    GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
var id;
var discount = 0;
var pay = 0;
class StaffListView extends Component {

    constructor(props) {
        super(props)
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state = {
            date: date,
            staffName: this.props.staffName,
            roleName: this.props.roleName,
            address: this.props.address,
            contactNo: this.props.contactNo,
            city: this.props.city,
            salary: this.props.salary,
            dob: this.props.dob,
            email: this.props.email,
            gender: this.props.gender,
            religion: this.props.religion,
            nationality: this.props.nationality,
            joiningDate: this.props.joiningDate,
            staffId: this.props.staffId,
            siteHandled: this.props.siteHandled,
            companyId: companyId,
        };
        this.setState({
            date: date,
        })


    }


    /*validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let discountValid  = this.state.discountValid ;
        let payValid  = this.state.payValid ;
         let paymentModeValid=this.state.paymentModeValid;
       
        switch (fieldName) {
            case 'discount':
        discountValid = value.match(/^(\d*\.)?\d+$/);
                fieldValidationErrors.disount = discountValid ? '' : ' is InCorrect';
                break;
            case 'pay':
                payValid = value.match(/^(\d*\.)?\d+$/);
                fieldValidationErrors.pay = payValid ? '' : ' is InCorrect';
                break;
          case 'paymentMode':
                paymentModeValid = value.length > 0;  
                fieldValidationErrors.paymentMode = paymentModeValid ? '' : ' is InCorrect';
                break;
    
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            discountValid: discountValid,
            payValid: payValid,
            paymentModeValid:paymentModeValid,
           
        }, this.validateForm);
    }
    validateForm() {
    
        this.setState({
            formValid:
                this.state.discountValid
                && this.state.payValid
                && this.state.paymentModeValid
            
    
        });
    }
    
    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    
     */


    componentDidMount() {

        SetCurrentPage("StaffListView");



    }




    handleUserInput = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value

        },
        );

    }






    BackbtnFunc() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={StaffList} />


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
                        <h3>Employee Profile</h3>   </div>
                </div>
                <div class="card">
                    <div>
                        <div class="card-body">
                            <form class="form-horizontal form-bordered" >
                                <div class="form-group">
                                    <label class="control-label col-sm-2" for="staffName">Employee Name</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                            onChange={this.handleUserInput}
                                            value={this.state.staffName}
                                            id="staffName"
                                            name="staffName" readOnly />


                                    </div></div>
                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="address">Address</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.address}
                                            id="address"
                                            name="address" readOnly />
                                    </div></div>



                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="contactNo">Contact No</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.contactNo}
                                            id="contactNo"
                                            name="contactNo" readOnly /></div>
                                </div>

                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="salary">Salary</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.salary}
                                            id="salary"
                                            name="salary" readOnly />
                                    </div></div>


                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="roleName">Designation</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.roleName}
                                            id="roleName"
                                            name="roleName" readOnly />
                                    </div></div>
                                <div class="form-group" style={{ marginBottom: "1%" }}>
                                    <label class="control-label col-sm-2" for="city">Sites handled</label>
                                    <div class="col-sm-10" style={{ marginBottom: "0px" }}>
                                        <Multiselect
                                            busySpinner={
                                                <span className="fas fa-sync fa-spin" />
                                            }
                                            readOnly
                                            placeholder="Select Sites handled"
                                            data={this.state.siteList}
                                            value={this.state.siteHandled}
                                        />
                                    </ div>
                                </div>
                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="gender">Gender</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.gender}
                                            id="gender"
                                            name="gender" readOnly />
                                    </div></div>

                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="email">Email</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.email}
                                            id="email"
                                            name="email" readOnly />
                                    </div></div>


                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="city">State</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.city}
                                            id="city"
                                            name="city" readOnly />
                                    </div></div>



                                <div class="form-group">
                                    <label class="control-label col-sm-2" for="dob">DOB</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                            onChange={this.handleUserInput}
                                            value={this.state.dob}
                                            id="dob"
                                            name="dob" readOnly />
                                    </div>
                                </div>






                                <div className="form-group" style={{ marginBottom: "12px" }}>
                                    <label class="control-label col-sm-2" for="nationality">Nationality</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.nationality}
                                            id="nationality"
                                            name="nationality" readOnly />
                                    </div></div>







                            </form>
                        </div>

                    </div>


                </div></div >
        );
    }
}

export default StaffListView;