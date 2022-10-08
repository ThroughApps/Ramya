import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import { FormErrors } from './FormErrors';
import $ from 'jquery';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import SalesReportDisplay from './SalesReportDisplay';
import SalesDailyReport from './SalesDailyReport';
import ReportMenuPage from './ReportMenuPage';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import InvoiceList from './InvoiceList';
import CryptoJS from 'crypto-js';
import Case from 'case';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";

import "./MainPageRedirectButton.css";
import SelectSearch from 'react-select';
//import { GetEmployeeSite, GetCurrentSite } from './ConstSiteFunction';
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import { Invoice_xlDownldBtn } from './ServiceRegistration/IconComponents';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
    GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
    import InvoiceListMenuPage from './Invoice/InvoiceListMenuPage';
    
var id;
var discount = 0;
var pay = 0;
class SalesReportEdit extends Component {

    constructor(props) {
        super(props)
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        //this.state.companyId = companyId;
        var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)


        this.state = {
            date: date,
            discount: '0',
            pay: '0',
            dueAmount: this.props.balanceAmt,
            userName: this.props.userName,
            invoiceNo: this.props.invoiceNo,
            customerId: this.props.customerId,
            companyId: companyId,
            payment_status: '',
            staffId: staffId,
            employeeName: employeeName,
            role: role, staffId: staffId,
            employeeName: employeeName,
            role: role,
            paymentMode: '',
            data: [],
            columns: [],

            paymentoptions: [],


            formErrors: {
                discount: '',
                pay: '',

            },

            discountValid: false,
            payValid: false,
            paymentModeValid: false,


        };


        this.setState({
            date: date,
            data: []

        })

    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let discountValid = this.state.discountValid;
        let payValid = this.state.payValid;
        let paymentModeValid = this.state.paymentModeValid;

        switch (fieldName) {
            case 'discount':
                discountValid = value.match(/^(\d*\.)?\d+$/);
                fieldValidationErrors.Disount = discountValid ? '' : ' is InCorrect';
                break;
            case 'pay':
                payValid = value.match(/^(\d*\.)?\d+$/);
                fieldValidationErrors.Pay = payValid ? '' : ' is InCorrect';
                break;
            case 'paymentMode':
                paymentModeValid = value.length > 0;
                fieldValidationErrors.PaymentMode = paymentModeValid ? '' : ' is InCorrect';
                break;

            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            discountValid: discountValid,
            payValid: payValid,
            paymentModeValid: paymentModeValid,

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




    componentDidMount() {

        SetCurrentPage("SalesReportEdit");

        $("#submit").hide();
        $("#tableHeadings").hide();

        var paymentOptions1 = [];

        paymentOptions1.push({ label: "Cash", value: "Cash" });
        paymentOptions1.push({ label: "Cheque", value: "Cheque" });
        paymentOptions1.push({ label: "Card", value: "Card" });
        paymentOptions1.push({ label: "Online", value: "Online" });


        this.state.paymentoptions = paymentOptions1;
        this.setState({
            paymentoptions: this.state.paymentoptions
        })

        this.state.selectedPaymentMode = { label: "Cash", value: "Cash" };
        this.state.paymentMode = "Cash";

        var self = this;


        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,
                invoiceNo: this.state.invoiceNo,
                empSites: GetEmployeeSite(),

            }),
            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/SalesReport/invoicepaymentreport",
            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {

                // console.log()

                var tab = '<thead><tr class="headcolor"><th>Date</th><th>Invoice</th><th>Customer Name</th><th>Due Amount</th><th>Discount</th><th>Pay</th><th>Balance</th></tr></thead>';

                if (data.invoicepaymentreportlist.length != 0) {


                    $.each(data.invoicepaymentreportlist, function (i, item) {

                        tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + item.date + '</td>'
                            + '<td>' + item.invoiceNo + '</td><td>' + item.userName + '</td>'
                            + '<td class="number">' + (Math.round(item.dueAmount * 100) / 100).toFixed(2) + '</td>'
                            + '<td>' + (Math.round(item.discount * 100) / 100).toFixed(2) + '</td>'
                            + '<td>' + (Math.round(item.pay * 100) / 100).toFixed(2) + '</td>'
                            + '<td>' + (Math.round(item.balanceAmt * 100) / 100).toFixed(2) + '</td></tr></tbody>';

                        var dueAmount = (Math.round(item.dueAmount * 100) / 100).toFixed(2);
                        var discount = (Math.round(item.discount * 100) / 100).toFixed(2);
                        var pay = (Math.round(item.pay * 100) / 100).toFixed(2);
                        var balanceAmt = (Math.round(item.balanceAmt * 100) / 100).toFixed(2);

                        if (item.paymentMode == "-") {
                            self.state.paymentMode1 = "UnPaid";
                            self.setState({
                                paymentMode1: self.state.paymentMode1,
                            })
                        } else {
                            self.state.paymentMode1 = item.paymentMode;
                            self.setState({
                                paymentMode1: self.state.paymentMode1,
                            })
                        }

                        self.state.data[i] = {
                            "Date": item.date,
                            "Invoice": item.invoiceNo,
                            "UserName": item.userName,
                            "DueAmount": dueAmount,
                            "Discount": discount,
                            "Pay": pay,
                            "Balance": balanceAmt,
                            "PaymentMode": self.state.paymentMode1
                        };





                    });
                }
                $("#tableHeadings").append(tab);

                self.state.columns = self.getColumns();

                self.setState({
                    data: self.state.data,
                    columns: self.state.columns
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
        // this.GetOrderDetails();

    }

    handlePaymentModeDetails = (e) => {
        const name = e.name;
        const value = e.value;
        this.state.paymentMode = value;

        this.setState({
            [name]: value,
            selectedPaymentMode: e,
            paymentModeValid: true
        });

    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.state[name] = value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });

        this.state.balanceAmt = '';

        $("#submit").hide();

        if (Number(Number(this.state.discount) + Number(this.state.pay)) > Number(this.state.dueAmount)) {
            this.state.discount = 0;
            this.state.pay = 0;

            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: Case.capital(name) + ' Amount Exceeds The Due Amount',
                showConfirmButton: false,
                timer: 2000
            })

        }

        var total = Number(this.state.dueAmount) - Number(this.state.discount) - Number(this.state.pay);
        this.state.balanceAmt = total;

        this.setState({
            balanceAmt: this.state.balanceAmt,
            discount: this.state.discount,
            pay: this.state.pay,
        });


    }


    Submit() {
        var self = this;

        if ((Number(this.state.pay)) != 0 && this.state.paymentMode != '') {


            if (this.state.balanceAmt == 0) {
                self.state.payment_status = "Paid";
                self.setState({
                    payment_status: self.state.payment_status,
                })
            } else {
                self.state.payment_status = "PartiallyPaid";
                self.setState({
                    payment_status: self.state.payment_status,
                })
            }


            $.ajax({
                type: 'POST',
                data: JSON.stringify({
                    invoiceNo: this.state.invoiceNo,
                    userName: this.state.userName,
                    balanceAmt: this.state.balanceAmt,
                    discount: this.state.discount,
                    pay: this.state.pay,
                    date: this.state.date,
                    dueAmount: this.state.dueAmount,
                    paymentMode: this.state.paymentMode,
                    customerId: this.state.customerId,
                    companyId: this.state.companyId,
                    staffId: self.state.staffId,
                    employeeName: self.state.employeeName,
                    role: self.state.role,
                    payment_status: this.state.payment_status,
                    site: GetCurrentSite(),

                }),
                url: " http://15.206.129.105:8080/ThroughBooksCOAPI/SalesReport/SalesReportEdit",
                contentType: "application/json",
                dataType: 'json',
                async: false,
                success: function (data, textStatus, jqXHR) {


                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Successfully Updated Payment Details',
                        showConfirmButton: false,
                        timer: 2000
                    })

                    ReactDOM.render(
                        <Router >
                            <div>
                                <Route path="/" component={InvoiceListMenuPage} />
                            </div>
                        </Router>, document.getElementById('contentRender'));
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
                title: 'Kindly Fill In All The Fields',
                showConfirmButton: false,
                timer: 2000
            })
        }


    }

    BackbtnFunc() {
        var cash = "Cash";

        if ((this.state.discount == 0)) {
            this.setState({
                discountValid: false,
            })
        }
        if ((this.state.pay == 0)) {
            this.setState({
                payValid: false,
            })
        }

        if ((this.state.paymentMode == 0)) {
            this.setState({
                paymentModeValid: false,
            })
        }

        if ((this.state.discount == 0) && (this.state.pay == 0) && (this.state.paymentMode == "Cash")) {
            
            ReactDOM.render(<InvoiceListMenuPage  data="SaleInvoice" />, document.getElementById("contentRender"));
        } else {
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
        ReactDOM.render(<InvoiceListMenuPage  data="SaleInvoice" />, document.getElementById("contentRender"));
    }
    CancelBack() {

    }

    getColumns() {

        return Object.keys(this.state.data[0]).map(key => {

            return {
                Header: key,
                accessor: key
            };


        });
    }

    cancelFunc() {
        this.state.pay = "";
        this.state.discount = "";
        this.state.selectedPaymentMode = "";
        this.state.selectedPaymentMode = { label: "Cash", value: "Cash" };
        this.state.paymentMode = "Cash";


        this.setState({
            pay: this.state.pay,
            discount: this.state.discount,
            selectedPaymentMode: this.state.selectedPaymentMode,
            paymentMode: this.state.paymentMode
        })
    }


    render() {
        // const  downloadButtonData=<span style={{fontWeight:"700",fontWeight: "900",fontSize:"15px"}}>Download</span>
        const downloadButtonData = <Invoice_xlDownldBtn />;

        return (
            <div class="container" style={{ height: "20px" }}>
                <div className="">
                    <div className="">
                        <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
                    </div>
                    <div class="inv_HeaderCls">
                        <h3>Sale Invoice Payment</h3>   </div>
                    <div>

                    </div>
                    <div class="card">
                        <div class="card-body">
                            <div className="panel panel-default">
                                <FormErrors formErrors={this.state.formErrors} />
                            </div>
                            <form class="form-horizontal form-bordered" name="submissions" >

                                <div className="form-group">
                                    <label class="control-label col-sm-2 font-weight-bold" for="invoiceNo">Invoice<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="invoiceNo" name="invoiceNo" value={this.state.invoiceNo} onChange={this.handleUserInput} readOnly />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label class="control-label col-sm-2 font-weight-bold" for="customerName">Customer Name<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="username" name="userName" value={this.state.userName} onChange={this.handleUserInput} readOnly />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label class="control-label col-sm-2 font-weight-bold" for="customerName">Due Amount<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="dueamount" name="dueAmount" value={this.state.dueAmount} onChange={this.handleUserInput} readOnly />
                                    </div>
                                </div>
                                <div className={`form-group ${this.errorClass(this.state.formErrors.discount)}`}>
                                    <label class="control-label col-sm-2 font-weight-bold" for="customerName">Discount<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="discount" name="discount" value={this.state.discount} onChange={this.handleUserInput} />
                                    </div>
                                </div>
                                <div className={`form-group ${this.errorClass(this.state.formErrors.pay)}`}>
                                    <label class="control-label col-sm-2 font-weight-bold" for="customerName">Pay<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="pay" name="pay" value={this.state.pay} onChange={this.handleUserInput} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label class="control-label col-sm-2 font-weight-bold" for="customerName">Payment Mode<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <SelectSearch options={this.state.paymentoptions} value={this.state.selectedPaymentMode}
                                            onChange={(e) => this.handlePaymentModeDetails(e)} name="paymentMode" placeholder="Select Payment Mode " />

                                    </div>
                                </div>
                                <div className="form-group">
                                    <label class="control-label col-sm-2 font-weight-bold" for="balanceAmt">Balance<span style={{ color: "red" }}>*</span></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="balanceAmt" name="balanceAmt" value={this.state.balanceAmt} onChange={this.handleUserInput} readOnly />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row" style={{ marginLeft: "2px" }} >
                                        <div class="col-sm-offset-2 col-sm-10">
                                            <button style={{ fontWeight: "bold" }} type="button" onClick={() => this.Submit()} class="btn btn-primary">Submit</button> <span></span>
                                            <button style={{ fontWeight: "bold" }} type="button" onClick={() => this.cancelFunc()} class="btn btn-primary">Cancel</button>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div style={{ display: "grid" }}>


                            <div className="row" style={{ marginRight: "20px", marginLeft: "20px" }}>
                                <div className="col-sm-8 col-lg-6 col-md-6">
                                    <h4 style={{ fontWeight: "300", fontSize: "30px" }}>Invoice Payment List</h4>
                                </div>
                                <div className="col-sm-4 col-lg-6 col-md-6">

                                    <div className="reactIcon_Dcls">
                                        <ReactHTMLTableToExcel
                                            id="test-table-xls-button"
                                            table="tableHeadings"
                                            filename="Payment_List"
                                            sheet="tablexls"
                                            className="download-table-xls-button1 "
                                            buttonText={downloadButtonData} />
                                    </div>
                                </div>
                            </div>
                            <div id="tableOverflow">
                                <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">
                                </table>
                            </div>

                            <ReactTable style={{ overflow: "auto", marginBottom: "5%" }}
                                data={this.state.data}
                                columns={this.state.columns}
                                noDataText="No Data Available"
                                filterable
                                defaultPageSize={10}
                                className="-striped -highlight"
                                defaultFilterMethod={(filter, row, column) => {
                                    const id = filter.pivotId || filter.id;
                                    return row[id] !== undefined
                                        ? String(row[id])
                                            .toLowerCase()
                                            .indexOf(filter.value.toLowerCase()) !== -1
                                        : true;
                                }}
                                showPaginationTop={true}
                                showPaginationBottom={false}
                                getTdProps={this.onRowClick}
                            />

                        </div>
                    </div>
                </div></div>
        );
    }
}
export default SalesReportEdit;