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
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import CustomerStatement from './CustomerStatement';
import CryptoJS from 'crypto-js';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import moment from 'moment';
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import * as SiIcons from 'react-icons/si';
import './purchaseReportCss.css';



var currentRow;
var vendorarray = [];
var inputarray = [];
var testarray = [];
var customerarray = [];
var rougharray = [];
var tablecontentarray = [];
var advancebalance_calc;
var subtotal_cgst = 0;
var subtotal_sgst = 0;
var subtotal_igst = 0;

class VendorCustomerStatement extends Component {


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
      fromDate: fromdate,
      customerName: '',
      toDate: today1,
      companyId: companyId,

    };



  }

  handleVendorDetails = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.state.vendorId = value;

    rougharray.push(this.state.vendorId);


    this.setState({
      [name]: value,
      vendorNameValid: true
    });

    var self = this;
    for (var k = 0; k < vendorarray.length; k++) {
      var temp = JSON.parse(vendorarray[k]);

      if (temp.vendorId == this.state.vendorId) {

        self.state.orderNumber = temp.orderNumber + 1;
        self.state.vendorId = temp.vendorId;
        self.state.contactNo = temp.contactNo;
        self.state.vendorName = temp.vendorName;
        self.setState({
          orderNumber: self.state.orderNumber,
          vendorId: self.state.vendorId,
          contactNo: self.state.contactNo,
          vendorName: self.state.vendorName,
        })

        $.ajax({
          type: 'POST',
          data: JSON.stringify({

            fromDate: this.state.fromDate,
            toDate: this.state.toDate,
            vendorId: this.state.vendorId,
            companyId: this.state.companyId,
          }),
          url: " http://15.206.129.105:8080/ThroughBooksCOAPI/PurchaseReport/vendorstatementreport",
          contentType: "application/json",
          dataType: 'json',
          async: false,

          success: function (data, textStatus, jqXHR) {

            ReactDOM.render(
              <Router>
                <div>


                  <Route path="/" component={() => <CustomerStatement  pageCalledFrom="VendorCustomerStatement" data={data} />} />


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
        break;
      }
    }

  }
  componentDidMount() {
    window.scrollTo(0, 0);

    var self = this;
    var customerName;

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
    var vendorName;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,

      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/vendororder/selectvendor",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        vendorName += '<option value ="" disabled selected hidden >Select a vendor Name</option>';
        $.each(data.selectvendornamelist, function (i, item) {
          vendorName += '<option value="' + item.vendorId + '">' + item.vendorName + '</option>'
          var content = JSON.stringify({
            vendorName: item.vendorName,
            orderNumber: item.orderNumber,
            vendorId: item.vendorId,
            contactNo: item.contactNo,
          });

          vendorarray.push(content);

        });
        $("#vendorName").append(vendorName);

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


      <div class="container" >

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
          <h3 id="reportHeader" >Vendor Statement</h3>
        </div>
        </div>


        {/*  <div className="row" style={{marginTop:"13px"}}>
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
          <h3 style={{marginLeft:"150px"}}>Vendor Statement</h3>
          </div>
        </div> */}

        {/* 
        <div class="">

          <div class="">
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
                    width: '50%',
                    color: "black!important"
                  }} id="vendorName" className="form-control" onChange={this.handleVendorDetails} name="vendorName"
                    style={{ marginBottom: "15px" }} >

                  </select>

                </form>
              </div>

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
              <div class=" col-md-4">
            <label>Vendor</label>
              <div className="">
            <select id="vendorName"
               
                className="form-control"
                onChange={this.handleVendorDetails}
                name="vendorName" />
            </div>
</div>
</div>
          </div>

        
            
            </div>



          <div className="repot_sub_dwldbtn_cls">
            <div class="text-right_report">

            {/*    <div class="buttonright_report" >
                                <ReactHTMLTableToExcel
                                    id="test-table-xls-button"
                                    className="download-table-xls-button btn_exceldld"
                                    table="tableHeadings"
                                    filename="DailyPurchase_List"
                                    sheet="tablexls"
                                    buttonText={downloadButtonData}
                                />
                            </div> */}
          </div>

          {/*      <div class="">
              <select  id="vendorName"
               className="form-control"
                onChange={this.handleVendorDetails} 
                name="vendorName"
                    >

                  </select>
        </div> */}

        </div>
      </div>
    );
  }
}

export default VendorCustomerStatement;