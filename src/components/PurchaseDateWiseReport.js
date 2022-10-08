import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import $ from 'jquery';
import PurchaseInvoice from './PurchaseInvoice';

import PurchaseInvoiceList from './PurchaseInvoice';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import PurchaseDateWiseReportDisplay from './PurchaseDateWiseReportDisplay';
import ReportMenuPage from './ReportMenuPage';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import moment from 'moment';
import { GetCurrentSite, GetEmployeeSite } from './ConstSiteFunction';
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import './purchaseReportCss.css';
import {Double_BackButtonComponent} from'./ServiceRegistration/ButtonComponent';

var currentRow;
class PurchaseDateWiseReport extends Component {


    constructor() {
        super()

        var today = new Date();
        var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var year = today.getFullYear();
        var dateAdd = moment().subtract(7, 'd').toDate();
        var fromdate = dateAdd.getFullYear() + '-' + (dateAdd.getMonth() + 1) + '-' + dateAdd.getDate();

        this.state = {
            year: year,
            companyId: companyId,
            companyName: companyName,
            fromDate: fromdate,
            toDate: today1,
            site: GetCurrentSite(),
        };



    }

    componentDidMount() {
        $(".btn-default").css("background-color", "#05a4b5");
        $(".btn-default").css("color", "white");
        var self = this;
        $('#toDate').datepicker({
            onSelect: function (date) {
                var dt = new Date(date);
                dt.setDate(dt.getDate() - 1);
                $("#fromDate").datepicker("option", "maxDate", dt);
                self.setState({
                    toDate: date,
                });

            },
            dateFormat: 'yy-mm-dd',
            minDate: '-3M',
            maxDate: 'M',
            numberOfMonths: 1
        });
        $('#fromDate').datepicker({
            onSelect: function (date) {
                var dt = new Date(date);
                dt.setDate(dt.getDate() + 1);
                $("#toDate").datepicker("option", "minDate", dt);
                self.setState({
                    fromDate: date,
                });
            },
            dateFormat: 'yy-mm-dd',
            minDate: '-3M',
            maxDate: 'M',
            numberOfMonths: 1
        });


    }


    handleUserInput = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });

    }

    Submit() {


        $.ajax({
            type: 'POST',
            data: JSON.stringify({

                fromDate: this.state.fromDate,
                toDate: this.state.toDate,
                companyId: this.state.companyId,
                empSites: GetEmployeeSite()
            }),
            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/PurchaseReport/DateWisePurchaseReport",
            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {

                ReactDOM.render(
                    <Router>
                        <div>
                            {/* <Route path="/" component={EmployeeMenuHeader} /> */}

                            <Route path="/" component={() => <PurchaseDateWiseReportDisplay data={data} />} />


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
        var planName = CryptoJS.AES.decrypt(localStorage.getItem("PlanName"), "shinchanbaby").toString(CryptoJS.enc.Utf8);

        //	 alert("plantype"+planName);
        if (planName.toLowerCase() == "basic") {

            ReactDOM.render(
                <Router>
                    <div >
                        <Route exact path="/" component={ReportMenuPageBasic} />

                    </div>
                </Router>, document.getElementById('contentRender'));
            registerServiceWorker();
        }
        else if (planName.toLowerCase() == "premium") {

            ReactDOM.render(
                <Router>
                    <div >
                        <Route exact path="/" component={ReportMenuPagePremium} />

                    </div>
                </Router>,
                document.getElementById('contentRender'));
            registerServiceWorker();
        }
        else if (planName.toLowerCase() == "elite") {


            ReactDOM.render(
                <Router>
                    <div >
                        <Route exact path="/" component={ReportMenuPage} />

                    </div>
                </Router>,
                document.getElementById('contentRender'));
            registerServiceWorker();
        }

    }

    render() {
        return (


            <div class="container">

<div className="">
    <div className="">
                    <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
                    </div>

                    {/*    <div class="">
                        <button type="button" id="print" class="btn btn-default "
                            onClick={() => this.printdiv('printarea')} >
                            <i class="fa fa-print" aria-hidden="true"
                                style={{ fontSize: "17px", border: "none" }}> Print</i></button>
                    </div> */}

                <div className="inv_HeaderCls">
                    <h3 id="reportHeader" >Purchase Datewise Report</h3>
                </div>
</div>

                {/*          <div class="row" style={{ marginTop: "13px" }}>
                    <div class="col-sm-3 ">
                        <ul class="previous disabled" id="backbutton"
                            style={{
                                backgroundColor: "#05a4b5", color: "white",
                                float: "none",
                                display: "inline-block",
                                marginLeft: "5px",
                                borderRadius: "5px",
                                padding: "3px 7px 3px 7px"
                            }}>
                            <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></ul>

                    </div>
                    <div class="col-sm-9">
                        <div class="card-header">
                            <h3 id="companyHeader" style={{ marginLeft: "150px" }}> {this.state.companyName}</h3>

                            <h4 id="reportHeader" style={{ marginLeft: "130px" }}>Purchase Datewise Report</h4>


                        </div>
                    </div>
                </div> */}



                <div class="" id="" >

                    <div class="from_To_clsDiv">
                        <div class="row">
                    <div class="col-md-4">
                            <label class="" for="fromDate">From<span style={{ color: "red" }}>*</span></label>
                            <div class="">
                                <input
                                    className="dateToField form-control"
                                    
                                    type="text"
                                    value={this.state.fromDate}
                                    id="fromDate" name="fromDate"
                                    onChange={this.handleUserInput} />


                            </div>
                        </div>
                        <div class="col-md-4">
                            <label class="" for="toDate">To<span style={{ color: "red" }}>*</span></label>
                            <div class="">

                                <input
                                    className="dateToField form-control"
                                    
                                    type="text"
                                    value={this.state.toDate}
                                    id="toDate" name="toDate"
                                    onChange={this.handleUserInput} />
                            </div>
                        </div>
                        <div class="col-md-4">
                        <label class=""></label>
                        <div class="">
                            <button
                                type="button"
                                onClick={() => this.Submit()}
                                className="btn btn-default rpt_submitbtn"
                            >Submit</button></div>
                    </div>
                    </div>
                    </div>

                   



                </div>






            </div>

        );
    }
}

export default PurchaseDateWiseReport;