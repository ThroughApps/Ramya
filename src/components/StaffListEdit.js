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
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import Case from 'case';
import { Multiselect } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
    GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
var id;
var discount = 0;
var pay = 0;
class StaffListEdit extends Component {

    constructor(props) {
        super(props)
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var staffId1 = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)




        this.state = {

            staffId: this.props.staffId,
            staffName: this.props.staffName,
            address: this.props.address,
            contactNo: this.props.contactNo,
            city: this.props.city,
            roleName: this.props.roleName,
            salary: this.props.salary,
            email: this.props.email,
            dob: this.props.dob,
            gender: this.props.gender,

            nationality: this.props.nationality,
            joiningDate: this.props.joiningDate,


            staffId1: staffId1,
            employeeName: employeeName,
            siteList: [],
            siteHandled: this.props.siteHandled,
            oldSiteHandled: this.props.oldSiteHandled,
            role: role,
            oldStaffName: this.props.oldStaffName,
            oldAddress: this.props.oldAddress,
            oldContactNo: this.props.oldContactNo,
            oldRoleName: this.props.oldRoleName,
            oldSalary: this.props.oldSalary,
            oldCity: this.props.oldCity,
            oldDob: this.props.oldDob,
            oldGender: this.props.oldGender,

            oldNationality: this.props.oldNationality,
            oldJoiningDate: this.props.oldJoiningDate,
            oldEmail: this.props.oldEmail,
            date: date,
            companyId: companyId,

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
        };
        this.setState({
            date: date,
        })


    }



    componentDidMount() {

        SetCurrentPage("StaffListEdit");
        var roleName;
        var self = this;

        //$("#submit").hide();
        // this.GetOrderDetails();
        //alert("roleName"+this.props.roleName);
        var Roles = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Roles'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

        //roleName += '<option  value="" disabled selected hidden>Select a Role</option>';
        $.each(Roles, function (i, item) {

            roleName += '<option value="' + item.roleName + '">' + item.roleName + '</option>'

        });
        $("#roleName").append(roleName);
        self.state.roleName = self.props.roleName;
        self.setState({
            roleName: self.state.roleName,
        })

        var siteDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('SiteDetails'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

        var siteName = [];
        $.each(siteDetails, function (i, item) {
            siteName.push(item.siteName);
        });
        this.setState({
            siteList: siteName
        })

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

        let addressValid = this.state.addressValid;
        let contactNoValid = this.state.contactNoValid;
        let salaryValid = this.state.salaryValid;
        let roleNameValid = this.state.roleNameValid;
        let emailValid = this.state.emailValid;


        switch (fieldName) {


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


                this.state.addressValid
                && this.state.contactNoValid
                && this.state.salaryValid
                && this.state.roleNameValid
                && this.state.emailValid

        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }


    UpdateSubmit() {

        var self = this;
        if (this.state.address !== this.state.oldAddress || this.state.contactNo !== this.state.oldContactNo ||
            this.state.city !== this.state.oldCity || this.state.roleName !== this.state.oldRoleName ||
            this.state.email !== this.state.olEmail || this.state.salary !== this.state.oldSalary ||
            this.state.dob !== this.state.oldDob || this.state.gender !== this.state.oldGender ||
            this.state.religion !== this.state.oldReligion ||
            this.state.nationality !== this.state.oldNationality ||
            this.state.joiningDate !== this.state.oldJoiningDate ||
            this.state.siteHandled.toString() !== this.state.oldSiteHandled.toString()
        ) {
            $.ajax({
                type: 'POST',
                data: JSON.stringify({
                    staffId: self.state.staffId,
                    staffName: Case.capital(self.state.staffName),
                    address: self.state.address,
                    contactNo: self.state.contactNo,
                    city: self.state.city,
                    roleName: self.state.roleName,
                    salary: self.state.salary,
                    email: self.state.email,
                    dob: self.state.dob,
                    gender: self.state.gender,
                    siteHandled: self.state.siteHandled.toString(),
                    nationality: self.state.nationality,
                    joiningDate: self.state.joiningDate,

                    companyId: this.state.companyId,
                    staffId1: self.state.staffId1,
                    employeeName: self.state.employeeName,
                    role: self.state.role,

                }),
                url: " http://15.206.129.105:8080/ThroughBooksCOAPI/staff/EmployeeDetailsUpdate",
                contentType: "application/json",
                dataType: 'json',
                async: false,

                success: function (data, textStatus, jqXHR) {

                    var tab;


                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Employee Details Updated Successfully',
                        showConfirmButton: false,
                        timer: 2000
                    })

                    ReactDOM.render(
                        <Router>
                            <div>

                                <Route path="/" component={StaffList} />


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
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'No Change',
                showConfirmButton: false,
                timer: 2000
            })
        }
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


    handleSiteList(list) {
        console.log("list ", list);
        this.setState({

            siteHandled: list,
        });

    }

    render() {
        return (


            <div class="container" style={{ marginBottom: "30px" }}>
                <div class="card">
                    <div className="">
                        <div className="">
                            <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
                        </div>
                        <div className="inv_HeaderCls">
                            <h3>Employee Details Edit</h3>
                        </div>
                    </div>
                    <div>
                        <div class="card-body">
                            <div className="panel panel-default">
                                <FormErrors formErrors={this.state.formErrors} />
                            </div>
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
                                <div className={`form-group ${this.errorClass(this.state.formErrors.address)}`} style={{ marginBottom: "1%" }}>
                                    <label class="control-label col-sm-2" for="address">Address</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.address}
                                            id="address"
                                            name="address" />
                                    </div></div>
                                <div className={`form-group ${this.errorClass(this.state.formErrors.contactNo)}`} style={{ marginBottom: "1%" }}>

                                    <label class="control-label col-sm-2" for="contactNo">Contact No</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.contactNo}
                                            id="contactNo"
                                            name="contactNo" /></div>
                                </div>

                                <div className={`form-group ${this.errorClass(this.state.formErrors.salary)}`} style={{ marginBottom: "1%" }}>

                                    <label class="control-label col-sm-2" for="salary">Salary</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.salary}
                                            id="salary"
                                            name="salary" />
                                    </div></div>
                                <div className={`form-group ${this.errorClass(this.state.formErrors.roleName)}`} style={{ marginBottom: "1%" }}>

                                    <label class="control-label col-sm-2" for="roleName">Designation</label>
                                    <div class="col-sm-10">
                                        <select id="roleName" className="form-control" value={this.state.roleName} onChange={this.handleUserInput} name="roleName">

                                        </select>


                                    </div></div>


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

                                <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`} style={{ marginBottom: "1%" }}>

                                    <label class="control-label col-sm-2" for="email">Email</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.email}
                                            id="email"
                                            name="email" />
                                    </div></div>
                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="gender">Gender</label>
                                    <div class="col-sm-10">


                                        <select name="gender" id="gender" value={this.state.gender} onChange={this.handleUserInput} class="form-control">
                                            <option value="" disabled selected hidden>--Select--</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>


                                    </div></div>
                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="city">State</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.city}
                                            id="city"
                                            name="city" />
                                    </div></div>



                                <div class="form-group">
                                    <label class="control-label col-sm-2" for="dob">DOB</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                            onChange={this.handleUserInput}
                                            value={this.state.dob}
                                            id="dob"
                                            name="dob" />
                                    </div>
                                </div>








                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="nationality">Nationality</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.nationality}
                                            id="nationality"
                                            name="nationality" />
                                    </div></div>

                            </form>
                        </div>

                    </div>
                    <div class="form-group" style={{ marginBottom: "12px" }}>
                        <div class="row">
                            <div class="col-sm-offset-2 col-sm-10">
                                <button type="button" style={{ fontWeight: "bold" }} class="btn btn-primary" onClick={() => this.UpdateSubmit()}>Update</button>

                            </div></div></div>


                </div></div>
        );
    }
}

export default StaffListEdit;