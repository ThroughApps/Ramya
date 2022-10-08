import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import $ from 'jquery';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ReportMenuPage from './ReportMenuPage';
import CustomerStatement from './CustomerStatement';
import CryptoJS from 'crypto-js';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import Case from "case";


import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import moment from 'moment';
import FooterText from './FooterText';
// import ReactTable from "react-table";
// import "react-table/react-table.css";
import "./ReactTableCSS.css";
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import * as SiIcons from 'react-icons/si';
import './purchaseReportCss.css';

var currentRow;
var inputarray = [];
var testarray = [];
var customerarray = [];
var rougharray = [];
var tablecontentarray = [];
var advancebalance_calc;
var subtotal_cgst = 0;
var subtotal_sgst = 0;
var subtotal_igst = 0;

class EstimateCustomerStatement extends Component {


  constructor() {
    super()

    var today = new Date();
    var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    var year = today.getFullYear();
    var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var dateAdd = moment().subtract(7, 'd').toDate();
    var fromdate = dateAdd.getFullYear() + '-' + (dateAdd.getMonth() + 1) + '-' + dateAdd.getDate();

    this.state = {
      year: year,
      fromDate: fromdate,
      customerName: '',
      toDate: today1,
      companyId: companyId,

    };



  }
  handleCustomerDetails = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.state.customerId = value;

    rougharray.push(this.state.customerId);


    this.setState({
      [name]: value,
      customerNameValid: true
    });

    var self = this;
    for (var k = 0; k < customerarray.length; k++) {
      var temp = JSON.parse(customerarray[k]);

      if (temp.customerId == this.state.customerId) {

        self.state.orderNumber = temp.orderNumber + 1;
        self.state.customerId = temp.customerId;
        self.state.contactNo = temp.contactNo;
        self.state.address = temp.address;
        self.state.customerName = temp.customerName;
        if (temp.gstNo == " ") {
          self.state.gstNo = '-';
        } else {
          self.state.gstNo = temp.gstNo;
        }

        self.state.email = temp.email;


        self.setState({
          orderNumber: self.state.orderNumber,
          customerId: self.state.customerId,
          customerName: self.state.customerName,
          contactNo: self.state.contactNo,
          address: self.state.address,
          gstNo: self.state.gstNo,
          email: self.state.email,
        })

        $.ajax({
          type: 'POST',
          data: JSON.stringify({

            fromDate: this.state.fromDate,
            toDate: this.state.toDate,
            customerId: this.state.customerId,
            companyId: this.state.companyId,

          }),
          url: "http://15.206.129.105:8080/ThroughBooksCOAPI/EstimateReport/Estimatecustomerstatementreport",
          contentType: "application/json",
          dataType: 'json',
          async: false,

          success: function (data, textStatus, jqXHR) {


            self.state.date = data.date;
            self.state.invoiceNo = data.invoiceNo;
            self.state.dueAmount = data.dueAmount;
            self.state.discount = data.discount;
            self.state.paymentMode = data.paymentMode;
            self.state.balanceAmt = data.balanceAmt;

            self.setState({

              date: self.state.date,
              invoiceNo: self.state.invoiceNo,
              dueAmount: self.state.dueAmount,
              discount: self.state.discount,
              paymentMode: self.state.paymentMode,
              balanceAmt: self.state.balanceAmt,

            })

            ReactDOM.render(
              <Router>
                <div>


                  <Route path="/" component={() => <CustomerStatement pageCalledFrom="EstimateCustomerStatement" data={data} />} />


                </div>
              </Router>,
              document.getElementById('contentRender'));
            registerServiceWorker();

          },
          error: function (data) {

            confirmAlert({
              title: 'No Internet',                        // Title dialog
              message: 'Network Connection Problem',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm
            });

          }
        });

        break;
      }
    }

  }
  componentDidMount() {
    window.scrollTo(0, 0);

    var self = this;
    var customerName;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,

      }),
      url: "http://15.206.129.105:8080/ThroughBooksCOAPI/saleorder/selectcustomerNew",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        customerName += '<option value ="" disabled selected hidden >Select a customer</option>';
        $.each(data.selectcustomernamelist, function (i, item) {
          customerName += '<option value="' + item.customerId + '">' + item.customerName + '</option>'
          var content = JSON.stringify({
            customerName: item.customerName,
            orderNumber: item.orderNumber,
            customerId: item.customerId,
            contactNo: item.contactNo,
            address: item.address,
            gstNo: item.gstNo,
            email: item.email,
          });

          customerarray.push(content);


        });
        $("#customerName").append(customerName);

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
    const downloadButtonData = <SiIcons.SiMicrosoftexcel />

    return (


      <div class="container">
       <div className="">
    <div className="">
    <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
                    </div>


          {/*     <div class="">
                        <button type="button" id="print" class="btn btn-default "
                            onClick={() => this.printdiv('printarea')} >
                            <i class="fa fa-print" aria-hidden="true"
                                style={{ fontSize: "17px", border: "none" }}> Print</i></button>
                    </div> */}
        
 <div className="inv_HeaderCls">

          <h3 id="reportHeader" >Customer Statement</h3>
        </div>
        </div>

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
            <div class=" col-md-4">
            <label>Customer</label>
             <div className="">
            <select
              id="customerName"
              className="form-control"
              onChange={this.handleCustomerDetails}
              name="customerName"
            >

            </select>

            {/*    <select id="customerName"

    className="form-control"
    onChange={this.handleCustomerDetails}
    name="customerName" /> */}
          </div>

        </div>
</div>
            </div>
          </div>

         
        {/*    <div className="row" style={{marginTop:"13px"}}>
              <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
                <ul class="previous disabled" id="backbutton"
                  style={{
                    backgroundColor: "#05a4b5",color:"white",
                    float: "none",
                    display: "inline-block",
                    marginLeft: "5px",
                    borderRadius: "5px",
                    padding: "3px 7px 3px 7px"
                  }}>
    
                  <a onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></ul>
              </div>
              <div className="col-lg-9 col-md-9 col-sm-8 col-xs-6">
                <h3 >Customer Statement</h3>
              </div>
            </div> */}


        <div class="">
{/* 
          <div class="card-body">
            <div class="form-group row">
              <div class="col-md-3">
                <form style={{ paddingBottom: '50px', position: 'inline-block', color: "black" }}>

                  <label htmlFor="fromDate" style={{ paddingRight: '50px', color: "black" }}> From:</label>

                  <input
                    style={{
                      width: '46%',
                      color: "black!important"
                    }}
                    type="text" className="form-control"
                    value={this.state.fromDate}
                    id="fromDate" name="fromDate"
                    onChange={this.handleUserInput} />
                </form>
              </div>
              <div class="col-md-3">
                <form style={{ paddingBottom: '50px', position: 'inline-block', color: "black" }}>
                  <label
                    htmlFor="toDate"
                    style={{ marginRight: '70px', color: "black" }}> To:</label>
                  <input
                    style={{
                      width: '50%',
                      color: "black!important"
                    }}
                    type="text" className="form-control"
                    value={this.state.toDate}
                    id="toDate" name="toDate"
                    onChange={this.handleUserInput} />
                </form>
              </div>
              <div class="col-md-3">
                <form style={{ paddingBottom: '50px', position: 'inline-block', color: "black" }}>
                  <label
                    htmlFor="toDate"
                    style={{ marginRight: '70px', color: "black" }}> </label>
                  <select style={{
                    width: '60%',
                    color: "black!important"
                  }} id="customerName" className="form-control" onChange={this.handleCustomerDetails} name="customerName"
                  >

                  </select>
                </form>
              </div>

            </div>
          </div> */}

        </div>

      </div>

    );
  }
}

export default EstimateCustomerStatement;