import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { FormErrors } from './FormErrors';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import StaffList from './StaffList';
import { Multiselect } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import Case from 'case';
import _ from 'underscore';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';


class AddStaff extends Component {
  constructor() {
    super()
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state = {
      staffName: '',
      address: '',
      contactNo: '',
      staffId: staffId,
      employeeName: employeeName,
      role: role,
      dob: '',
      city: '',
      gender: '',
      date: date,
      nationality: '',
      modalRoleName: '',
      roleName: '',
      salary: '',
      joiningDate: '',
      email: '',
      siteList: [],
      siteHandled: [],

      formErrors: {
        staffName: '',
        address: '',
        contactNo: '',
        city: '',
        gender: '',
        roleName: '',
        salary: '',
        email: '',
        modalRoleName: '',
       
      },
      staffNameValid: false,
      addressValid: false,
      contactNoValid: false,
      salaryValid: false,
      roleNameValid: false,
      emailValid: false,
      modalRoleNameValid: false,
    }
    this.setState({
      date: date,
    })
  }

  validateField1(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let modalRoleNameValid = this.state.modalRoleNameValid;

    switch (fieldName) {
      case 'modalRoleName':
        modalRoleNameValid = value.length >= 2;
        fieldValidationErrors.RoleName = modalRoleNameValid ? '' : ' is InCorrect';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      modalRoleNameValid: modalRoleNameValid,
    }, this.validateForm1);
  }
  validateForm1() {

    this.setState({
      formValid1:
        this.state.modalRoleNameValid

    });
  }

  errorClass1(error) {
    return (error.length === 0 ? '' : 'has-error');
  }
  handleUserRoleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField1(name, value) }
    );
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) }
    );
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let staffNameValid = this.state.staffNameValid;
    let addressValid = this.state.addressValid;
    let contactNoValid = this.state.contactNoValid;
    let salaryValid = this.state.salaryValid;
    let roleNameValid = this.state.roleNameValid;
    let emailValid = this.state.emailValid;


    switch (fieldName) {
      case 'staffName':
        staffNameValid = value.match(/^([a-zA-Z]+)([a-zA-Z ])*$/);
        fieldValidationErrors.StaffName = staffNameValid ? '' : ' is InCorrect';
        break;

      case 'address':
        addressValid = value.length >= 5;
        fieldValidationErrors.Address = addressValid ? '' : ' is too short';
        break;

      case 'contactNo':
        contactNoValid = value.match(/^[0-9]{10}$/);
        fieldValidationErrors.ContactNo = contactNoValid ? '' : ' is InCorrect';
        break;

      case 'salary':
        salaryValid = value.match(/^[0-9]*$/);
        fieldValidationErrors.Salary = salaryValid ? '' : ' should contain numbers only';
        break;

      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.Email = emailValid ? '' : ' is InCorrect';
        break;

      case 'roleName':
        roleNameValid = value.length >= 2;
        fieldValidationErrors.RoleName = roleNameValid ? '' : ' is not selected';
        break;

      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      staffNameValid: staffNameValid,
      addressValid: addressValid,
      contactNoValid: contactNoValid,
      salaryValid: salaryValid,
      emailValid: emailValid,
      roleNameValid: roleNameValid,
    }, this.validateForm);
  }
  validateForm() {

    this.setState({
      formValid:

        this.state.staffNameValid
        && this.state.addressValid
        && this.state.contactNoValid
        && this.state.salaryValid
        && this.state.roleNameValid
        && this.state.emailValid

    });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }
  AddStaffFunc() {
    var self = this;
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });
    var category = "Staff";
 //   console.log("this.state.siteHandled ",this.state.siteHandled);
    if (this.state.address.trim().length > 2) {
      if (this.state.siteHandled.toString() !== "") {

        console.log("ADD STAFF DATA :",JSON.stringify({
          staffName: Case.capital(this.state.staffName),
          address: this.state.address,
          city: this.state.city,
          contactNo: this.state.contactNo,
          dob: this.state.dob,
          gender: this.state.gender,
          nationality: this.state.nationality,
          salary: this.state.salary,
          date: this.state.date,
          roleName: this.state.roleName,
          email: this.state.email,
          companyId: this.state.companyId,
          category: category,
          staffId: this.state.staffId,
          employeeName: this.state.employeeName,
          role: this.state.role,
          siteHandled: this.state.siteHandled.toString(),
        }));

        $.ajax({
          type: 'POST',
          data: JSON.stringify({
            staffName: Case.capital(this.state.staffName),
            address: this.state.address,
            city: this.state.city,
            contactNo: this.state.contactNo,
            dob: this.state.dob,
            gender: this.state.gender,
            nationality: this.state.nationality,
            salary: this.state.salary,
            date: this.state.date,
            roleName: this.state.roleName,
            email: this.state.email,
            companyId: this.state.companyId,
            category: category,
            staffId: this.state.staffId,
            employeeName: this.state.employeeName,
            role: this.state.role,
            siteHandled: this.state.siteHandled.toString(),
          }),
          url: "http://15.206.129.105:8080/ThroughBooksCOAPI/staff/addstaff",
          contentType: "application/json",
          dataType: 'json',
          async: false,
          success: function (data, textStatus, jqXHR) {
            if (data.contactNo == "Mobile") {

              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'The Mobile Number Already Exists',
                showConfirmButton: false,
                timer: 2000
              })

            }
            else if (data.email == "Email") {

              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'The EmailId is Already Exists',
                showConfirmButton: false,
                timer: 2000
              })


            }
            else {

              var employees = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('EmpList'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
              //  employees.push({staffId:data.employeeId});
              employees.push({ staffName: self.state.staffName,site: self.state.siteHandled.toString(), staffId: self.state.staffId, contactNo: self.state.contactNo, });

              localStorage.setItem('EmpList', CryptoJS.AES.encrypt(JSON.stringify(employees), "shinchanbaby"));
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Successfully Added staff Details',
                showConfirmButton: false,
                timer: 2000
              })

              self.state.staffName = "";
              self.state.nationality = "";
              self.state.address = "";
              self.state.contactNo = "";

              self.state.dob = "";
              self.state.salary = "";
              self.state.joiningDate = "";
              self.state.email = "";
              self.state.city = "";
              self.state.siteHandled = [];
              self.state.formValid = false;
              self.state.staffNameValid = false;
              self.state.addressValid = false;
              self.state.contactNoValid = false;
              self.state.salaryValid = false;

              self.state.emailValid = false;

              //  $('[name=city]').val('');
              $('[name=gender]').val('');
              $('[name=roleName]').val('');

              self.setState({
                staffName: '',
                address: '',
                contactNo: '',
                dob: '',
                city: '',
                gender: '',
                siteHandled:[],
                nationality: '',
                roleName: '',
                salary: '',
                joiningDate: '',
                email: '',
                formValid: false,
                staffNameValid: false,
                addressValid: false,
                contactNoValid: false,
                salaryValid: false,

                emailValid: false,

              });
              ReactDOM.render(
                <Router >
                  <div>
                    <Route path="/" component={AddStaff} />
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
          icon: 'error',
          title: 'Select Site to handled by employee',
          showConfirmButton: false,
          timer: 2000
        })

      }
    } else {

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'address Should Contain Atleast 10 Character',
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
    SetCurrentPage("AddStaff");
    window.scrollTo(0, 0);
    this.selectRole();
    $(".btn-default").css("background-color", "#05a4b5");
    $(".btn-default").css("color", "white");
    
    /*var siteDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('SiteDetails'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var siteName = [];
    $.each(siteDetails, function (i, item) {
      siteName.push(item.siteName);
    });
    this.setState({
      siteList: siteName
    })
    */

   this.state.siteList=[];
   var empSites = GetEmployeeSite();
   var siteDetails=GetSiteDetails();


   var currentSite = CryptoJS.AES.decrypt(localStorage.getItem('CurrentSite'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
   var emparray = empSites.split(",");
  
   var totalSiteArray = JSON.parse(`[ ${siteDetails}]`);	
   var totalSiteNameArray=_.pluck(totalSiteArray[0], 'siteName');	
   var siteHandledDropdownArray=_.intersection(emparray, totalSiteNameArray);

   console.log("emparray.length ", emparray.length, empSites);
   console.log("emparray ", emparray);

  this.state.options = _.map(siteHandledDropdownArray, function (site) { return site; });

  /* if (emparray.length === 1) {
       localStorage.setItem('CurrentSite', CryptoJS.AES.encrypt(emparray[0], "shinchanbaby"));
   } else {
       this.state.siteList = _.map(emparray, function (site) { return site; });
      
   }
*/


   console.log("this.state.siteList :",this.state.siteList);

   this.setState({
    siteList: this.state.options
  })

  }
  selectRole() {
    var roleName;
    $("#roleName").empty();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });
    var Roles = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Roles'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    roleName += '<option  value="" disabled selected hidden>Select a Role</option>';
    $.each(Roles, function (i, item) {

      roleName += '<option value="' + item.roleName + '">' + item.roleName + '</option>'

    });
    $("#roleName").append(roleName);

  }

  cancelFunc() {
    var self = this;
    //$('[name=city]').val('');
    $('[name=gender]').val('');
    $('[name=roleName]').val('');
    this.state.staffName = '';
    this.state.address = '';
    this.state.contactNo = '';
    this.state.dob = '';
    this.state.city = '';
    this.state.nationality = '';
    this.state.contactNo = '';
    this.state.salary = '';
    this.state.joiningDate = '';
    this.state.email = '';

    this.state.staffNameValid = false;
    this.state.addressValid = false;
    this.state.contactNoValid = false;
    this.state.salaryValid = false;
    this.state.roleNameValid = false;
    this.state.emailValid = false;
    ReactDOM.render(<AddStaff />, document.getElementById("contentRender"));
  }

  closeFunc() {

    var self = this;
    self.state.modalRoleNameValid = false;
    self.state.modalRoleName = "";

    self.setState({
      modalRoleNameValid: self.state.modalRoleNameValid,
      modalRoleName: self.state.modalRoleName
    })


  }
  AddRoleFunc() {
    var self = this;
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });
    if (this.state.modalRoleName.trim().length > 0) {
      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          roleName: Case.capital(this.state.modalRoleName),
          companyId: this.state.companyId,
          //      date: this.state.date
          staffId: this.state.staffId,
          employeeName: this.state.employeeName,
          role: this.state.role,


        }),

        url: " http://15.206.129.105:8080/ThroughBooksCOAPI/admin/addrole",
        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
          if (data.roleName == "RoleName") {

            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'The roleName Already Exists',
              showConfirmButton: false,
              timer: 2000
            })



          } else {

            var roles = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Roles'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
            roles.push({ roleName: self.state.modalRoleName });
            localStorage.setItem('Roles', CryptoJS.AES.encrypt(JSON.stringify(roles), "shinchanbaby"));

            //localStorage.setItem('Roles', CryptoJS.AES.encrypt(Case.capital(self.state.modalRoleName), "shinchanbaby"));


            self.state.roleName = "";
            self.state.formValid1 = false;
            self.state.modalRoleNameValid = false;
            self.setState({
              roleName: '',
              formValid1: false,
              modalRoleNameValid: false,
            })

            self.selectRole();
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
    }
    else {

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Enter Role Name',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }
  cancelFunc1() {
    this.state.modalRoleName = "";

    this.setState({
      modalRoleName: "",
      modalRoleNameValid: false,
    })
  }

  BackbtnFunc() {

    if ((this.state.staffName.length == 0)) {
      this.setState({
        staffNameValid: false,

      })

    }
    if ((this.state.salary.length == 0)) {
      this.setState({
        salaryValid: false,
      })

    }
    if ((this.state.address.length == 0)) {
      this.setState({
        addressValid: false,
      })

    }
    if ((this.state.contactNo.length == 0)) {
      this.setState({
        contactNoValid: false,
      })

    }
    if ((this.state.roleName.length == 0)) {
      this.setState({
        roleNameValid: false,
      })

    }
    if ((this.state.email.length == 0)) {
      this.setState({
        emailValid: false,
      })

    }



    if (this.state.staffName.length == 0 && this.state.address.length == 0 &&
      this.state.contactNo.length == 0 &&
      this.state.city.length == 0 &&
      this.state.nationality.length == 0 && this.state.email.length == 0 &&
      this.state.salary.length == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={StaffList} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
      registerServiceWorker();
    }
    else {
      confirmAlert({
        title: "Confirmation", // Title dialog
        message: "Unsaved changes are there. Do you really want to go back?", // Message dialog
        buttons: [
          {
            label: 'Confirm',
            onClick: () => this.ConfirmBack()
          },
          {
            label: 'Cancel',
            onClick: () => this.CancelBack()
          }
        ]
      });
    }

  }
  ConfirmBack() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={StaffList} />


        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }
  CancelBack() {

  }
  handleSiteList(list) {
   // console.log("list ", list);
    this.setState({

      siteHandled: list,
    });

  }
  render() {	
    return (	
      <div class="container">	
        <div class="card" style={{ width: "100%" }}>	
          <div class="row" style={{ marginTop: "13px" }}>	
            <div class="col-lg-3 col-sm-3 col-md-3 col-xs-3">	
            <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />	
            </div>	
            <div class="card-header">	
              <div class="col-lg-9 col-sm-9 col-md-9 col-xs-9">	
                <h3 style={{ marginLeft: "150px" }}>Add Employee</h3>	
              </div>	
            </div>	
          </div>	
          <div class="card-body" >	
            <div className="panel panel-default">	
              <FormErrors formErrors={this.state.formErrors} />	
            </div>	
            <form class="form-horizontal form-bordered"  >	
              <div className={`form-group ${this.errorClass(this.state.formErrors.staffName)}`} style={{ marginBottom: "1%" }}>	
                <label class="control-label col-sm-2" for="staffName">Employee Name<span style={{ color: "red" }}>*</span></label>	
                <div class="col-sm-10" style={{ marginBottom: "0px" }} >	
                  <input type="text" class="form-control" id="staffName" name="staffName" value={this.state.staffName} onChange={this.handleUserInput} placeholder="Staff Name" />	
                </div>	
              </div>	
              <div className={`form-group ${this.errorClass(this.state.formErrors.address)}`} style={{ marginBottom: "1%" }}>	
                <label class="control-label col-sm-2" for="address">Address<span style={{ color: "red" }}>*</span></label>	
                <div class="col-sm-10" style={{ marginBottom: "0px" }} >	
                  <textarea rows="2" cols="20" class="form-control" name="address" value={this.state.address} onChange={this.handleUserInput} id="address" placeholder="Address"> </textarea>	
                </div>	
              </div>	
              <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`} style={{ marginBottom: "1%" }}>	
                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="email">Email ID<span style={{ color: "red" }}>*</span></label>	
                <div class="col-sm-10" style={{ marginBottom: "0px" }}>	
                  <input type="email" class="form-control" name="email" value={this.state.email} onChange={this.handleUserInput} id="email" placeholder="Email ID" />	
                </div>	
              </div>	
              <div className={`form-group ${this.errorClass(this.state.formErrors.contactNo)}`} style={{ marginBottom: "1%" }}>	
                <label class="control-label col-sm-2" for="contactNo"> Contact no<span style={{ color: "red" }}>*</span></label>	
                <div class="col-sm-10" style={{ marginBottom: "0px" }}>	
                  <input type="number" class="form-control" maxlength="10" name="contactNo" value={this.state.contactNo} onChange={this.handleUserInput} id="contactNo" placeholder="Contact no" />	
                </div>	
              </div>	
              <div className={`form-group ${this.errorClass(this.state.formErrors.salary)}`} style={{ marginBottom: "1%" }}>	
                <label class="control-label col-sm-2" for="salary">Salary / Month<span style={{ color: "red" }}>*</span><span>(With Deduction)</span></label>	
                <div class="col-sm-10" style={{ marginBottom: "0px" }}>	
                  <input type="text" class="form-control" name="salary" value={this.state.salary} onChange={this.handleUserInput} id="salary" placeholder="Salary" />	
                </div>	
              </div>	
              <div className={`form-group ${this.errorClass(this.state.formErrors.roleName)}`} style={{ marginBottom: "1%" }}>	
                <label class="control-label col-sm-2" for="roleName">Designation<span style={{ color: "red" }}>*</span></label>	
                <div class="col-sm-10" style={{ marginBottom: "0px" }}>	
                  <select id="roleName" className="form-control" onChange={this.handleUserInput} name="roleName" required>	
                  </select>	
                  <div class="text-center" class="col-sm-4">	
                    <a href="#myModal" data-toggle="modal" data-target="#myModal" >	
                      <span	
                        style={{	
                          color: "blue",	
                        }}> Add Role</span>	
                    </a>	
                  </div>	
                </div>	
              </div>	
              <div class="form-group" style={{ marginBottom: "1%" }}>	
                <label class="control-label col-sm-2" for="city">Sites handled<span style={{ color: "red" }}>*</span></label>	
                <div class="col-sm-10" style={{ marginBottom: "0px" }}>	
                  <Multiselect	
                    onChange={value => this.handleSiteList(value)}	
                    busySpinner={	
                      <span className="fas fa-sync fa-spin" />	
                    }	
                    placeholder="Select Sites handled"	
                    data={this.state.siteList}	
                    value={this.state.siteHandled}	
                  />	
                </ div>	
              </div>	
              <div class="form-group" style={{ marginBottom: "1%" }}>	
                <label class="control-label col-sm-2" for="city">State</label>	
                <div class="col-sm-10" style={{ marginBottom: "0px" }}>	
                  <input type="text" class="form-control" name="city" value={this.state.city} onChange={this.handleUserInput} id="city" placeholder="State Name" />	
                </ div>	
              </div>	
              <div class="form-group" style={{ marginBottom: "1%" }}>	
                <label for="dob" class="control-label col-sm-2"> DOJ</label>	
                <div class="col-sm-10" style={{ marginBottom: "0px" }}>	
                  <input type="text" onChange={this.handleUserInput} class="form-control" id="dob" name="dob" placeholder="Your DOB.."	
                    value={this.state.dob}	
                    required /></div></div>	
              <div class="form-group" style={{ marginBottom: "1%" }}>	
                <label class="control-label col-sm-2" for="gender">Gender</label>	
                <div class="col-sm-10" style={{ marginBottom: "0px" }}>	
                  <select name="gender" id="gender" onChange={this.handleUserInput} class="form-control">	
                    <option selected="selected" disabled selected hidden value="--Select--">Select a Gender</option>	
                    <option value="Male">Male</option>	
                    <option value="Female">Female</option>	
                    <option value="Others">Others</option>	
                  </select>	
                </div>	
              </div>	
              <div className="form-group" style={{ marginBottom: "1%" }}>	
                <label class="control-label col-sm-2" for="nationality"> Nationality</label>	
                <div class="col-sm-10" style={{ marginBottom: "0px" }}>	
                  <input type="text" class="form-control" name="nationality" value={this.state.nationality} onChange={this.handleUserInput} id="nationality" placeholder="Nationality" />	
                </div>	
              </div>	
              <div class="form-group"  >	
                <div class="row" style={{ marginLeft: "2px", marginBottom: "10%" }}>	
                  <div class="col-sm-offset-2 col-sm-10">	
                    <button style={{ fontWeight: "bold" }} type="button" disabled={!this.state.formValid} onClick={() => this.AddStaffFunc()} class="btn btn-default">Submit</button> <span></span>	
                    <button style={{ fontWeight: "bold" }} type="button" onClick={() => this.cancelFunc()} class="btn btn-default">Clear</button></div>	
                </div>	
              </div>	
            </form>	
          </div>	
        </div>	
        <div style={{ position: " ", zIndex: "0" }}>	
          <div class="modal fade" id="myModal" data-backdrop="false"  >	
            <div class="modal-dialog">	
              <div class="modal-content">	
                <div class="modal-header">	
                  <h4 class="modal-title" style={{ align: "center", display: "contents" }}>Add Role</h4>	
                  <button type="button" class="close" style={{ color: "black" }}	
                    onClick={() => this.closeFunc()} data-dismiss="modal">&times;</button>	
                </div>	
                <div id="mymodal" class="modal-body" >	
                  <div class="form-body">	
                    <div style={{ color: "red" }} className="panel panel-default">	
                      <FormErrors style={{ color: "red" }} formErrors={this.state.formErrors} />	
                    </div>	
                    <form class="form-horizontal form-bordered" name="submissions">	
                      <div className={`form-group ${this.errorClass1(this.state.formErrors.modalRoleName)}`}>	
                        <label class="control-label col-sm-5 font-weight-bold" for="modalRoleName">Role Name<span style={{ color: "red" }}>*</span></label>	
                        <div class="col-sm-7">	
                          <input type="text" class="form-control" id="modalRoleName"	
                            name="modalRoleName" value={this.state.modalRoleName}	
                            onChange={this.handleUserRoleInput} placeholder="Role Name" />	
                        </div>	
                      </div>	
                      <div class="modal-footer">	
                        <div class="form-group">	
                          <div class="row" style={{ marginLeft: "2px" }}>	
                            <div class="col-sm-offset-4 col-sm-8">	
                              <button style={{ fontWeight: "bold" }} type="button"	
                                disabled={!this.state.formValid1} onClick={() => this.AddRoleFunc()}	
                                data-dismiss="modal" class="btn btn-primary">Submit</button> <span></span>	
                              <button style={{ fontWeight: "bold" }} type="button"	
                                onClick={() => this.cancelFunc1()}	
                                class="btn btn-primary">Clear</button>	
                            </div>	
                          </div>	
                        </div></div>	
                    </form>	
                  </div>	
                </div>	
              </div>	
            </div>	
          </div>	
        </div>	
      </div>	
    );	
  }	
}	
export default AddStaff;	
