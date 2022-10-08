import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
    GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
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
import VendorList from './VendorList';
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';

var id;
var discount = 0;
var pay = 0;
class VendorListView extends Component {

    constructor(props) {
        super(props)
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state = {
            date: date,
            vendorName: this.props.vendorName,
            companyName: this.props.companyName,
            address: this.props.address,
            contactNo: this.props.contactNo,
            city: this.props.city,
            alternateContactNo: this.props.alternateContactNo,
            gstNo: this.props.gstNo,
            email: this.props.email,
            vendorId: this.props.vendorId,

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
        SetCurrentPage("VendorListView");



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

                    <Route path="/" component={VendorList} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }





    render() {
        return (
            <div class="container">
                <div classname="">
                    <div classname="">
                        <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
                    </div>
                    <div class="inv_HeaderCls">
                        <h3 className="text-center">Vendor Profile</h3>
                    </div>

                </div>
                <div class="">
                    <div>
                        <div class="card-body">

                            <form class="form-horizontal form-bordered" >
                                <div class="form-group col-md-6">
                                    <label class="control-label col-sm-3" for="customerName">Vendor Name</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control"
                                            onChange={this.handleUserInput}
                                            value={this.state.vendorName}
                                            id="vendorName"
                                            name="vendorName" readOnly />
                                    </div></div>
                                <div className="form-group col-md-6">
                                    <label class="control-label col-sm-3" for="contactNo">Contact No</label>
                                    <div class="col-sm-9">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.contactNo}
                                            id="contactNo"
                                            name="contactNo" readOnly /></div>
                                </div>
                                <div class="form-group col-md-6">
                                    <label class="control-label col-sm-3" for="companyName">Company Name</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control"
                                            onChange={this.handleUserInput}
                                            value={this.state.companyName}
                                            id="companyName"
                                            name="companyName" readOnly />
                                    </div>
                                </div>

                                <div className="form-group col-md-6">
                                    <label class="control-label col-sm-3" for="alternateContactNo">Alternate Contact No</label>
                                    <div class="col-sm-9">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.alternateContactNo}
                                            id="alternateContactNo"
                                            name="alternateContactNo" readOnly />
                                    </div></div>
                                <div className="form-group col-md-6">
                                    <label class="control-label col-sm-3" for="email">Email</label>
                                    <div class="col-sm-9">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.email}
                                            id="email"
                                            name="email" readOnly />
                                    </div></div>
                                <div className="form-group col-md-6">
                                    <label class="control-label col-sm-3" for="address">Address</label>
                                    <div class="col-sm-9">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.address}
                                            id="address"
                                            name="address" readOnly />
                                    </div></div>
                                <div className="form-group col-md-6">
                                    <label class="control-label col-sm-3" for="city">State</label>
                                    <div class="col-sm-9">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.city}
                                            id="city"
                                            name="city" readOnly />
                                    </div></div>
                                <div className="form-group col-md-6">
                                    <label class="control-label col-sm-3" for="gstNo">GST No</label>
                                    <div class="col-sm-9">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.gstNo}
                                            id="gstNo"
                                            name="gstNo" readOnly />
                                    </div></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default VendorListView;