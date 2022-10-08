import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import LoginPage from './LoginPage';
import CryptoJS from 'crypto-js';
import SiteRegister from './SiteRegister';
import moment from 'moment';
import GenericDashboard from './Topnavbar/GenericDashboard';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import registerServiceWorker from './registerServiceWorker';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
class LicenseEntryForm extends Component {
    constructor(props) {
        super(props)
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)


        var proprietor;
        this.state = {
            otp: '',
            date: date,
            licenseKey: '',
            companyId: companyId,
            formErrors: {
                licenseKey: '',
            },
            licenseKeyValid: false,
        };
        this.setState({
            roleName: proprietor,
            companyId: companyId,
            date: date,
        });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let licenseKeyValid = this.state.licenseKeyValid;


        switch (fieldName) {
            case 'licenseKey':
                licenseKeyValid = value.length >= 2;
                fieldValidationErrors.LicenseKey = licenseKeyValid ? '' : ' is InCorrect';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            licenseKeyValid: licenseKeyValid,
        }, this.validateForm);
    }
    validateForm() {

        this.setState({
            formValid:
                this.state.licenseKeyValid

        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    handleChangeotp(name, value) {
        // const name = e.target.name;

        this.setState({
            licenseKey: value
        },
            () => { this.validateField(name, value) });

    }

    componentDidMount() {
        SetCurrentPage("LicenseEntryForm");
        window.scrollTo(0, 0);
    }

    BackbtnFunc() {
        ReactDOM.render(<LoginPage />, document.getElementById("root"));
    }

    LicenseKeyverify() {
        var self = this;
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var key = "shinchanbaby";

        var LicenseKey = CryptoJS.AES.decrypt(localStorage.getItem('LicenseKey'), "shinchanbaby").toString(CryptoJS.enc.Utf8)




        if (this.state.licenseKey == LicenseKey) {




            $.ajax({
                type: 'POST',
                data: JSON.stringify({
                    companyId: this.state.companyId,
                }),
                url: " http://15.206.129.105:8080/ThroughBooksCOAPI/Login/UpdateStatus",
                contentType: "application/json",
                dataType: 'json',
                async: false,
                success: function (data, textStatus, jqXHR) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'License key verified Successfully',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    localStorage.clear();
                    ReactDOM.render(
                        <Router>
                            <div>

                                <Route path="/" component={LoginPage} />


                            </div>
                        </Router>, document.getElementById('root'));

                    // localStorage.clear();



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
                title: "LicenseKey You Have Entered Is Wrong Kindly Re-Enter The Correct LicenseKey",
                showConfirmButton: false,
                timer: 2000
            })
        }

    }

    render() {

        return (

            <div className="container">
                <ul class="previous disabled" id="backbutton"
                    style={{
                        backgroundColor: "#05a4b5", color: "white",
                        float: "none",
                        display: "inline-block",
                        marginLeft: "5px",
                        borderRadius: "5px",
                        padding: "3px 7px 3px 7px",
                        marginTop: "13px"
                    }}>
                    <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></ul>
                <div className="jumbotron " style={{ paddingBottom: "150px" }}>
                    <div className="form-group">
                        <label htmlFor="licenseKey">License Key:</label>
                        <input type="text" id="licenseKey" value={this.state.licenseKey} onChange={(e) => this.handleChangeotp(e.target.name, e.target.value)} className="form-control" placeholder="Enter licenseKey" />


                    </div>
                    <div class="row form-group " style={{ textAlign: "center" }}>
                        <button type="button" onClick={() => this.LicenseKeyverify()} class="btn btn-primary">Submit</button>
                    </div>
                    <br />
                    <br />

                    <br />
                    <br />
                    <div class=" row form-group col-lg-6 col-sm-6 col-md-6">
                        <h4>To get your License Key, kindly contact</h4>
                        <h5>Arun,</h5>
                        <h5>CEO of ThroughApps,</h5>
                        <h5><b>ContactNo:</b>9003015420</h5>
                        <h5><b>Email:</b>throughapps@gmail.com</h5>
                    </div>
                </div>
            </div>
        );
    }

}
export default LicenseEntryForm;