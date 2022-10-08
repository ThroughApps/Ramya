import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import AddProduct from './AddProduct';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
    GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
import { FormErrors } from './FormErrors';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';

import VendorList from './VendorList';
import ProductList from './ProductList';
import SaleOrder from './SaleOrder';


import CustomerList from './CustomerList';


import InvoiceList from './InvoiceList';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import VendorExcelImport from './VendorExcelImport';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import Case from 'case';
//import { GetEmployeeSite, GetCurrentSite } from './ConstSiteFunction';
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';

class VendorEntryForm1 extends Component {
    constructor() {
        super()

        var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state = {
            vendorName: '',
            companyName: '',
            address: '',
            contactNo: '',
            alternateContactNo: '',
            gstNo: '',
            email: '',
            city: '',
            description: '',
            staffId: staffId,
            employeeName: employeeName,
            role: role,
            formErrors: {
                vendorName: '',
                companyName: '',
                address: '',
                contactNo: '',
                gstNo: '',
                email: '',
                alternateContactNo: ''
            },
            vendorNameValid: false,
            companyNameValid: false,
            contactNoValid: false,
            alternateContactNoNoValid: false,
            //   addressValid: false,
            // gstNoValid: false,
            // emailValid: false,
            backButtonVariable: true,
        }
    }

    componentDidMount() {
        SetCurrentPage("VendorEntryForm");
        window.scrollTo(0, 0);
        $(".btn-default").css("background-color", "#05a4b5");
        $(".btn-default").css("color", "white");

    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let vendorNameValid = this.state.vendorNameValid;
        let companyNameValid = this.state.companyNameValid;
        let contactNoValid = this.state.contactNoValid;
        let alternateContactNoValid = this.state.alternateContactNoValid;


        let gstNoValid = this.state.gstNoValid;
        let emailValid = this.state.emailValid;

        switch (fieldName) {
            case 'vendorName':
                vendorNameValid = value.match(/^([a-zA-Z]+)([a-zA-Z ])*$/);
                fieldValidationErrors.VendorName = vendorNameValid ? '' : ' is InCorrect';
                break;
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

            case 'alternateContactNo':
                alternateContactNoValid = value.match(/^(\d{10})$/);
                fieldValidationErrors.AlternateContactNo = alternateContactNoValid ? '' : ' is InCorrect';
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
    AddVendorFunc() {
        var self = this;

        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.setState({
            companyId: companyId,
        });

        if (this.state.vendorName.length == 0) {
            this.state.vendorName = this.state.companyName;
            self.setState({
                vendorName: this.state.vendorName,
            })
        }

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                vendorName: Case.capital(this.state.vendorName),
                companyName: Case.capital(this.state.companyName),
                address: this.state.address,
                contactNo: this.state.contactNo,
                alternateContactNo: this.state.alternateContactNo,
                gstNo: this.state.gstNo,
                email: this.state.email,
                city: this.state.city,
                companyId: this.state.companyId,
                description: this.state.description,
                staffId: self.state.staffId,
                employeeName: self.state.employeeName,
                role: self.state.role,
                site: GetCurrentSite(),
            }),
            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/master/addvendor",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                if (data.contactNo == "Mobile") {

                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'The Mobile Number is Already Exists',
                        showConfirmButton: false,
                        timer: 2000
                    })

                }
                else {

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Successfully Added vendor Details',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    ReactDOM.render(
                        <Router >
                            <div>
                                <Route path="/" component={VendorList} />
                            </div>
                        </Router>, document.getElementById('contentRender'));

                    self.state.vendorName = "";
                    self.state.companyName = "";
                    self.state.address = "";
                    self.state.contactNo = "";
                    self.state.alternateContactNo = "";
                    self.state.gstNo = "";
                    self.state.email = "";
                    self.state.description = "";
                    self.state.city = "";
                    self.state.formValid = false;
                    self.state.vendorNameValid = false;
                    self.state.companyNameValid = false;

                    self.state.contactNoValid = false;


                    // $('[name=city]').val('');

                    self.setState({
                        vendorName: '',
                        companyName: '',
                        address: '',
                        description: '',
                        contactNo: '',
                        alternateContactNo: '',
                        gstNo: '',
                        email: '',
                        city: '',
                        description: '',
                        formValid: false,
                        vendorNameValid: false,
                        companyNameValid: false,

                        contactNoValid: false,


                    });


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



    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.state.backButtonVariable = false;
        this.setState({
            backButtonVariable: this.state.backButtonVariable,
        })
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    cancelFunc() {
        this.state.vendorName = "";
        this.state.companyName = "";
        this.state.address = "";
        this.state.contactNo = "";
        this.state.alternateContactNo = "";
        this.state.gstNo = "";
        this.state.email = "";
        this.state.city = "";
        this.state.description = "";
        this.state.formValid = false;
        this.state.vendorNameValid = false;
        this.state.companyNameValid = false;
        this.state.contactNoValid = false;
        this.setState({
            vendorName: this.state.vendorName,
            companyName: this.state.companyName,
            address: this.state.address,
            city: this.state.city,
            contactNo: this.state.contactNo,
            alternateContactNo: this.state.alternateContactNo,
            gstNo: this.state.gstNo,
            email: this.state.email,
            description: this.state.description,

            vendorNameValid: false,
            companyNameValid: false,
            addressValid: false,
            contactNoValid: false,
            emailValid: false,
        })

        ReactDOM.render(<VendorEntryForm1 />, document.getElementById("contentRender"));
    }

    VendorExcelExportFunc() {

        var companyId = CryptoJS.AES.decrypt(
            localStorage.getItem("CompanyId"),
            "shinchanbaby"
        ).toString(CryptoJS.enc.Utf8);
        this.state.companyId = companyId;
        var today = new Date();
        var today1 =
            today.getFullYear() +
            "_" +
            (today.getMonth() + 1) +
            "_" +
            today.getDate();

        var totalName =
            companyId +
            "_" +
            today.getHours() +
            "_" +
            today.getMinutes() +
            "_" +
            today.getSeconds() +
            "_" +
            today1 +
            ".xlsx";

        this.state.vendorFileName = totalName;


        this.setState({
            vendorFileName: this.state.vendorFileName,
            companyId: this.state.companyId
        });

        $.ajax({
            type: "POST",
            data: JSON.stringify({
                vendorFileName: this.state.vendorFileName,
                companyId: this.state.companyId
            }),


            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/Excel/ExportVendorFile",
            contentType: "application/json",
            dataType: "json",
            async: false,
            success: function (data, textStatus, jqXHR) {

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: "The File Requested For Import Is Downloaded Successfully", // Message dialog
                    showConfirmButton: false,
                    timer: 2000
                })


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

    ImportFunc1() {

        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={VendorExcelImport} />
                </div>
            </Router>,
            document.getElementById("contentRender")
        );

    }

    BackbtnFunc() {
        //   alert(this.state.backButtonVariable)
        var dirtyValue = "false";

        if ((this.state.vendorName.length == 0)) {
            this.setState({
                vendorNameValid: false,

            })

        }
        if ((this.state.companyName.length == 0)) {
            this.setState({
                companyNameValid: false,
            })

        }

        if ((this.state.contactNo.length == 0)) {
            this.setState({
                contactNoValid: false,
            })

        }




        if (this.state.vendorName.length == 0 && this.state.companyName.length == 0 &&
            this.state.address.length == 0 && this.state.contactNo.length == 0 &&
            this.state.alternateContactNo.length == 0 && this.state.gstNo.length == 0 &&
            this.state.description.length == 0 && this.state.email.length == 0 &&
            this.state.city.length == 0) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={VendorList} />
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

                    <Route path="/" component={VendorList} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }
    CancelBack() {
        //   this.setState({
        //       vendorName:this.state.vendorName,
        //       companyName:this.state.companyName,
        //       address:this.state.address,
        //       city:this.state.city,
        //       contactNo:this.state.contactNo,
        //       alternateContactNo:this.state.alternateContactNo,
        //       gstNo:this.state.gstNo,
        //       email:this.state.email,
        //       description:this.state.description,
        //       vendorNameValid: false,
        //       companyNameValid: false,
        //       addressValid: false,
        //       contactNoValid: false,
        //       emailValid: false,


        //   })

    }

    render() {
        return (


            <div class="container">
                <div className="">
                    <div className="">
                        <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
                    </div>
                    <div class="inv_HeaderCls">
                        <h3 className="text-center">Vendor Entry Form</h3>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <div class="card-body">
                            <div className="panel panel-default" style={{ borderColor: "white", marginBottom: "1px" }}>
                                <FormErrors formErrors={this.state.formErrors} />
                            </div>

                            <form class="form-horizontal form-bordered" name="submissions" action="/action_page.php">

                                <div className={`form-group col-lg-4 ${this.errorClass(this.state.formErrors.companyName)}`}>
                                    <label class="control-label col-sm-5" for="companyName">Company Name<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-7">
                                        <input type="text" class="form-control" name="companyName" value={this.state.companyName} onChange={this.handleUserInput} id="companyName" placeholder="Company Name" />
                                    </div>
                                </div>
                                <div className={`form-group col-lg-4 ${this.errorClass(this.state.formErrors.contactNo)}`}>
                                    <label style={{ fontWeight: "bold" }} class="control-label col-sm-5" for="contactNo"> Contact No<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-7">
                                        <input type="text" class="form-control" /*min="1" max="10"*/ name="contactNo" value={this.state.contactNo} onChange={this.handleUserInput} id="contactNo" placeholder="Contact no" />
                                    </div>
                                </div>
                                <div className={`form-group col-lg-4 ${this.errorClass(this.state.formErrors.vendorName)}`}>
                                    <label class="control-label col-sm-5" for="vendorName">Contact Person</label>
                                    <div class="col-sm-7">
                                        <input type="text" class="form-control" id="vendorName" name="vendorName" value={this.state.vendorName} onChange={this.handleUserInput} placeholder="Vendor Name" />
                                    </div>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label class="control-label col-sm-5" for="address">Address<span style={{ color: "red" }}></span></label>
                                    <div class="col-sm-7">
                                        <input type="text" class="form-control" name="address" value={this.state.address}
                                            onChange={this.handleUserInput} id="address" placeholder="Address" ></input>

                                    </div>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label class="control-label col-sm-5" for="city">State</label>
                                    <div class="col-sm-7">
                                        <input type="text" class="form-control" name="city" value={this.state.city} onChange={this.handleUserInput} id="city" placeholder="State Name" />

                                    </div>
                                </div>

                                <div class="form-group col-lg-4">
                                    <label class="control-label col-sm-5" for="alternateContactNo">Alternate No</label>
                                    <div class="col-sm-7">
                                        <input type="number" class="form-control" min="1" maxlength="10" name="alternateContactNo" value={this.state.alternateContactNo} onChange={this.handleUserInput} id="alternateContactNo" placeholder="Alternate Contact no" />
                                    </div>
                                </div>
                                <div className={`form-group col-lg-4 ${this.errorClass(this.state.formErrors.gstNo)}`}>
                                    <label class="control-label col-sm-5" for="gstNo">GST No</label>
                                    <div class="col-sm-7">
                                        <input type="text" class="form-control" name="gstNo" value={this.state.gstNo} onChange={this.handleUserInput} id="gstNo" placeholder="GST no" />
                                    </div>
                                </div>

                                <div className={`form-group col-lg-4 ${this.errorClass(this.state.formErrors.email)}`}>
                                    <label class="control-label col-sm-5" for="email">Email ID</label>
                                    <div class="col-sm-7">
                                        <input type="email" class="form-control" name="email" value={this.state.email} onChange={this.handleUserInput} id="email" placeholder="Email ID" />
                                    </div>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label class="control-label col-sm-5 remove" for="description">Description</label>
                                    <div class="col-sm-7">
                                        <input type="text" class="form-control" name="description" value={this.state.description}
                                            onChange={this.handleUserInput} id="description" placeholder="Description" />



                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="row" style={{ marginLeft: "3px", marginBottom: "5%" }}>
                                        <div class="col-md-12 text-center">
                                            <button style={{ fontWeight: "bold" }} type="button" disabled={!this.state.formValid} onClick={() => this.AddVendorFunc()} class="btn btn-default">Submit</button> <span></span>
                                            <button style={{ fontWeight: "bold" }} type="button" onClick={() => this.cancelFunc()} class="btn btn-default">Clear</button>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div></div>


                <div class="modal fade" id="myModal" data-backdrop="false"  >
                    <div class="modal-dialog">

                        <div class="modal-content">
                            <div class="modal-header" style={{ paddingTop: "0px", paddingBottom: "0px" }}>
                                <h5 class="modal-title" style={{ align: "center", display: "contents" }}>Please NOTE:</h5>
                                <button type="button" class="close" style={{ color: "black" }}
                                    data-dismiss="modal">&times;</button>


                            </div>
                            <div id="mymodal" class="modal-body" >
                                <ol>
                                    <li>
                                        Ensure <b>VendorName</b> contains only Alphabets
            </li>
                                    <li>
                                        Ensure <b>ContactNo</b>,<b>AlternateNo</b> are only Numbers
            </li>
                                    <li>
                                        Ensure <b>Email Id</b> is of correct Format
            </li>

                                </ol>
                                <a
                                    href="ExportVendor.xlsx"
                                    style={{ color: "red", textDecoration: "none", borderBottom: "1px solid blue" }}
                                    // href="#myModal"
                                    //  data-toggle="modal" data-target="#myModal" 
                                    download={this.state.vendorFileName}
                                    onClick={() => this.VendorExcelExportFunc()}
                                //  style={{ backgroundColor: "#677785", color: "white" }}
                                >  <span style={{ fontSize: "20px" }}
                                    class="glyphicon glyphicon-download"

                                >
                                        <span style={{ paddingLeft: "10px", fontSize: "24px" }}>Export&ensp;<b>[</b>Download&ensp;Excel&ensp;File<b>]</b></span></span>
                                </a>


                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default VendorEntryForm1;