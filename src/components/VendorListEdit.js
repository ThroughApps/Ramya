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
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import Case from 'case';
//import { GetEmployeeSite, GetCurrentSite } from './ConstSiteFunction';
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';


var id;
var discount = 0;
var pay = 0;
class VendorListEdit extends Component {

  constructor(props) {
    super(props)
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state = {

      vendorName: this.props.vendorName,
      companyName: this.props.companyName,
      address: this.props.address,
      contactNo: this.props.contactNo,
      city: this.props.city,
      alternateContactNo: this.props.alternateContactNo,
      gstNo: this.props.gstNo,
      email: this.props.email,
      vendorId: this.props.vendorId,
      date: date,
      companyId: companyId,

      staffId: staffId,
      employeeName: employeeName,
      role: role,


      formErrors: {
        companyName: '',
        address: '',
        contactNo: '',
        gstNo: '',
        email: '',
      },

      companyNameValid: false,
      addressValid: false,
      contactNoValid: false,
      gstNoValid: false,
      emailValid: false,
    };
    this.setState({
      date: date,
    })


  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;

    let companyNameValid = this.state.companyNameValid;
    let contactNoValid = this.state.contactNoValid;

    let gstNoValid = this.state.gstNoValid;
    let emailValid = this.state.emailValid;

    switch (fieldName) {

      case 'companyName':
        companyNameValid = value.match(/^[a-zA-Z]([a-zA-Z0-9]|[- @\.#&!])*$/);
        fieldValidationErrors.CompanyName = companyNameValid ? '' : ' is InCorrect';
        break;

      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.Email = emailValid ? '' : ' is InCorrect';
        break;

      case 'contactNo':
        contactNoValid = value.match(/^(\d{10})$/);
        fieldValidationErrors.ContactNo = contactNoValid ? '' : ' is InCorrect';
        break;

      case 'gstNo':
        gstNoValid = value.length >= 2;
        fieldValidationErrors.GstNo = gstNoValid ? '' : ' is too short';
        break;

      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,

      companyNameValid: companyNameValid,

      contactNoValid: contactNoValid,
      gstNoValid: gstNoValid,
      emailValid: emailValid
    }, this.validateForm);
  }
  validateForm() {

    this.setState({
      formValid:

        this.state.companyNameValid
        && this.state.contactNoValid


    });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }
  componentDidMount() {

    SetCurrentPage("VendorListEdit");

  }




  handleUserInput = (e) => {

    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });

  }




  UpdateSubmit() {

    var self = this;

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        vendorName: Case.capital(self.state.vendorName),
        companyName: Case.capital(self.state.companyName),
        address: self.state.address,
        contactNo: self.state.contactNo,
        city: self.state.city,
        alternateContactNo: self.state.alternateContactNo,
        gstNo: self.state.gstNo,
        email: self.state.email,
        vendorId: self.state.vendorId,
        companyId: this.state.companyId,
        staffId: self.state.staffId,
        employeeName: self.state.employeeName,
        role: self.state.role,


      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/master/VendorDetailsUpdate",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {

        var tab;


        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Vendor Details Updated Successfully',
          showConfirmButton: false,
          timer: 2000
        })

        ReactDOM.render(
          <Router>
            <div>

              <Route path="/" component={VendorList} />


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

          <Route path="/" component={VendorList} />


        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }




  render() {
    return (


      <div class="container" style={{ height: "20px" }}>
        <div classname="">
          <div classname="">
            <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
          </div>
          <div class="inv_HeaderCls">
            <h3 class="text-center">Vendor Details Edit</h3>   </div>
        </div>
        <div>

          <div class="card">
            <div class="card-body">
              <div className="panel panel-default" style={{ borderColor: "white", marginBottom: "1px" }}>
                <FormErrors formErrors={this.state.formErrors} />
              </div>
              <form class="form-horizontal form-bordered" >
                <div class="form-group col-md-6">
                  <label class="control-label col-sm-3" for="vendorName">Contact Person</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control"
                      onChange={this.handleUserInput}
                      value={this.state.vendorName}
                      id="vendorName"
                      name="vendorName" />


                  </div></div>
                <div className={`form-group col-md-6 ${this.errorClass(this.state.formErrors.companyName)}`}>
                  <label class="control-label col-sm-3" for="companyName">Company Name<span style={{ color: "red" }}>*</span></label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control"
                      onChange={this.handleUserInput}
                      value={this.state.companyName}
                      id="companyName"
                      name="companyName" />
                  </div>
                </div>
                <div className={`form-group col-md-6 ${this.errorClass(this.state.formErrors.contactNo)}`}>
                  <label class="control-label col-sm-3" for="contactNo">Contact No<span style={{ color: "red" }}>*</span></label>
                  <div class="col-sm-9">
                    <input class="form-control" type="text"
                      onChange={this.handleUserInput}
                      value={this.state.contactNo}
                      id="contactNo"
                      name="contactNo" /></div>
                </div>
                <div className="form-group col-md-6">
                  <label class="control-label col-sm-3" for="alternateContactNo">Alternate Contact No</label>
                  <div class="col-sm-9">
                    <input class="form-control" type="text"
                      onChange={this.handleUserInput}
                      value={this.state.alternateContactNo}
                      id="alternateContactNo"
                      name="alternateContactNo" />
                  </div></div>

                <div className={`form-group col-md-6 ${this.errorClass(this.state.formErrors.email)}`}>

                  <label class="control-label col-sm-3" for="email">Email ID</label>
                  <div class="col-sm-9">
                    <input class="form-control" type="text"
                      onChange={this.handleUserInput}
                      value={this.state.email}
                      id="email"
                      name="email" />
                  </div></div>

                <div className={`form-group col-md-6 ${this.errorClass(this.state.formErrors.address)}`}>
                  <label class="control-label col-sm-3" for="address">Address</label>
                  <div class="col-sm-9">
                    <input class="form-control" type="text"
                      onChange={this.handleUserInput}
                      value={this.state.address}
                      id="address"
                      name="address" />
                  </div></div>

                <div className="form-group col-md-6">
                  <label class="control-label col-sm-3" for="city">State</label>
                  <div class="col-sm-9">
                    <input class="form-control" type="text"
                      onChange={this.handleUserInput}
                      value={this.state.city}
                      id="city"
                      name="city" />
                  </div></div>
                <div className={`form-group col-md-6 ${this.errorClass(this.state.formErrors.gstNo)}`}>

                  <label class="control-label col-sm-3" for="gstNo">GST No</label>
                  <div class="col-sm-9">
                    <input class="form-control" type="text"
                      onChange={this.handleUserInput}
                      value={this.state.gstNo}
                      id="gstNo"
                      name="gstNo" />
                  </div></div>


              </form>

              <div class="form-group">
                <div class="row">
                  <div class="col-md-12 text-center">
                    <button type="button" style={{ fontWeight: "bold" }} class="btn btn-primary" onClick={() => this.UpdateSubmit()}>Update</button>
                  </div></div></div>
            </div>
          </div>
        </div></div>
    );
  }
}

export default VendorListEdit;