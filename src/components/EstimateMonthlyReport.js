import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';

import $ from 'jquery';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import SalesReportDisplay from './SalesReportDisplay';
//import SalesReportEdit from './SalesReportEdit';
import EstimateReportDisplay from './EstimateReportDisplay';
import ReportMenuPage from './ReportMenuPage';
import EstimateReportEdit from './EstimateReportEdit';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import { SiteDropDown, FilterOptions } from './SiteDropDown';
import { GetCurrentSite, GetEmployeeSite } from './ConstSiteFunction';
import './purchaseReportCss.css';
import * as RiIcons from 'react-icons/ri';
import * as SiIcons from 'react-icons/si';
import {Delete_DownloadIcons, Invoice_xlDownldBtn} from './ServiceRegistration/IconComponents';
import {Double_BackButtonComponent} from'./ServiceRegistration/ButtonComponent';



var dataList = [];
var currentRow;

class EstimateMonthlyReport extends Component {

  constructor() {
    super()
    var today = new Date();
    var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var month = today.getMonth() + 1;
    var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state = {
      date: today1,
      month: month,
      companyId: companyId,
      companyName: companyName,
      totalSubTotal: '0',
      totalBalance: '0',
      data: [],
      columns: [],
      site: GetCurrentSite(),
    };



  }


  componentDidMount() {
    window.scrollTo(0, 0);
    $(".btn-default").css("background-color", "#05a4b5");
    $(".btn-default").css("color", "white");
    $("#companyname").hide();
    $("#reportheader").hide();
    $("#nodata").hide();
    var self = this;
    $("#tableHeadings").hide();
    $("#totalSale").hide();
    var self = this;
    self.state.data = [];
    self.setState({
      data: self.state.data,
    })

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        month: this.state.month,
        companyId: this.state.companyId,
        empSites: GetEmployeeSite()

      }),
      url: "http://15.206.129.105:8080/ThroughBooksCOAPI/EstimateReport/MonthlyEstimateReport",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {
        dataList = data;

        self.handleSite(self.state.site);

      },
      error: function (data) {

        confirmAlert({
          title: 'No Internet',                        // Title dialog
          message: 'Network Connection Problem',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });

      }
    });




  }




  handleUserInput = (e) => {

    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    },
    );

  }
  handleSite = (e) => {
    this.handleSite = this.handleSite.bind(this);
    this.state.site = e.toString();
    console.log("e ", this.state.site);
    this.setState({
      site: e.toString()
    });
    console.log("e ", dataList, e.toString());
    var result = FilterOptions(dataList, this.state.site);
    this.RendData(result);
  }
  RendData(result) {
    var no;
    var self = this;
    self.state.data = [];
    self.state.totalSubTotal = 0;
    self.state.totalBalance = 0;
    if (result.length != 0) {
      var ivalue = 0;
      $.each(result, function (i, item) {
        no = parseInt(i) + 1;

        self.state.totalSubTotal = Number(self.state.totalSubTotal) + Number(item.subtotal1);
        self.state.totalBalance = Number(self.state.totalBalance) + Number(item.balanceAmt);

        self.setState({
          totalSubTotal: self.state.totalSubTotal,
          totalBalance: self.state.totalBalance,
        })
        self.state.data[i] = {
          "SNo": no,
          "Invoice": item.invoiceNo,
          "Date": item.date,
          "Name": item.userName,
          "Contact": item.contact,
          "Status": item.status,
          "Total": item.subtotal1,
          "Balance(+Tax)": item.balanceAmt,
          "Site": item.site
        };
        ivalue = i;

      });
      self.state.data[Number(ivalue) + 1] = {
        "SNo": "",
        "Invoice": "",
        "Date": "",
        "Name": "",
        "Contact": "",
        "Status": "",
        "Total": <div style={{ fontWeight: "600" }}>{"Total Amount"}</div>,
        "Balance(+Tax)": <div style={{ fontWeight: "600" }}>{self.state.totalSubTotal}</div>
      };
      self.state.data[Number(ivalue) + 2] = {
        "SNo": "",
        "Invoice": "",
        "Date": "",
        "Name": "",
        "Contact": "",
        "Status": "",
        "Total": <div style={{ fontWeight: "600" }}>{"Balance Amount"}</div>,
        "Balance(+Tax)": <div style={{ fontWeight: "600" }}>{self.state.totalBalance}</div>
      };

      $(".customerId").hide();
      self.state.columns = self.GetColumns();
    } else {
      $("#nodata").show();
      $("#totalSale").hide();
      $("#test-table-xls-button").hide();
    }
    if (result.length != 0) {
      var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Invoice</th><th>Date</th><th>Name</th><th>Contact</th><th>Status</th><th>Total</th><th>Balance</th></tr></thead>';

      $.each(result, function (i, item) {
        if (item.subtotal1 == item.balance_amount) {
          self.state.payment_status = "UnPaid";

          self.setState({
            payment_status: self.state.payment_status,
          })
        }
        if (item.balance_amount == 0) {
          self.state.payment_status = "Paid";
          self.setState({
            payment_status: self.state.payment_status,
          })
        }

        if ((item.subtotal1 != item.balance_amount) && (item.balance_amount != 0)) {
          self.state.payment_status = "PartiallyPaid";
          self.setState({
            payment_status: self.state.payment_status,
          })
        }
       
        tab += '<tbody id= "myTable" ><tr  id="tabletextcol" ><td>' + no + '</td><td>' + item.invoiceNo + '</td><td>' + item.date + '</td><td>' + item.userName + '</td><td>' + item.contact + '</td>'
          + '<td>' + item.status + '</td><td>' + item.subtotal1 + '</td><td>' + item.balanceAmt + '</td></tr></tbody>';

      });
      $("#tableHeadings").append(tab);
    }
    self.setState({
      data: self.state.data,
      columns: self.state.columns
    });
  }
  GetColumns() {

    return Object.keys(this.state.data[0]).map(key => {

      return {
        Header: key,
        accessor: key,

      };

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


/*   printdiv(printarea) {
    var originalContents = document.body.innerHTML;
    $("#test-table-xls-button").hide();
    $("#backbutton").hide();
    $("#print").hide();

    window.print(originalContents);
    $("#backbutton").show();
    $("#print").show();
    $("#test-table-xls-button").show();
    // $(w.document.body).html(html);

  } */

  
  printdiv() {
    var originalContents = document.body.innerHTML;
    
    $(".repot_headercls").hide();
    $(".buttonright_report").hide();
    $("#test-table-xls-button").hide();
    $(".pro-sidebar").hide();

    //.pro-sidebar

    window.print(originalContents);
    $(".repot_headercls").show();
    $(".buttonright_report").show();
    $("#test-table-xls-button").show();
    $(".pro-sidebar").show();
   
}



  render() {
    const downloadButtonData = <Invoice_xlDownldBtn/>;  
    return (


      <div class="container">
<div className="repot_headercls">
                    <div class=" ">
                    <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
                </div>
                <div class="report_card_header">
                        {/* <h3 id="companyHeader"> {this.state.companyName}</h3> */}
                        <h3 id="reportHeader" >Estimate Monthly Report</h3>
                    </div>
                    <div className="report_reactIcon_Dcls">
                    <button type="button" style={{marginTop:"10px", border: "1px solid #ddd"}} id="print" class="btn btn-default btn_rpt_print"
                            onClick={() => this.printdiv('printarea')} >
                            <i class="fa fa-print" aria-hidden="true"
                                style={{ fontSize: "17px", border: "none" }}> Print</i></button>
                    <ReactHTMLTableToExcel
                                id="test-table-xls-button1"
                                className="download-table-xls-button1"
                                table="tableHeadings"
                                filename="MothlyEstimate_List"
                                sheet="tablexls"
                                buttonText={downloadButtonData}
                            />
                    </div>
                </div>
                <div className="" id="printarea">
                  

                    <div className="repot_sub_dwldbtn_cls">
                        <div class="text-right_report mt-bot">
                            <SiteDropDown onSiteDropDown={this.handleSite} data={this.state.site} />
                        </div>

                    </div>

        <div class="">
         {/*  <div class="row" style={{ marginTop: "13px" }}>

            <div class="col-sm-4 ">
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

            <div class="col-sm-4 ">
              <div class="card-header">
                <h3 id="companyHeader" style={{ marginLeft: "150px" }}> {this.state.companyName}</h3>

                <h4 id="reportHeader" style={{ marginLeft: "130px" }}>Estimate Monthly Report</h4>


              </div>
              <div class="card-body">
                <div class="form-horizontal form-bordered">
                  <div class="text-right">
                    <SiteDropDown onSiteDropDown={this.handleSite} data={this.state.site} />
                  </div>
                </div>
              </div>
            </div>

            <div class="col-sm-4 ">
              <div class="row">
                <div class="col-sm-3 pull-right">
                  {/* <button type="button" id="print" class="btn btn-default " onClick={() => this.printdiv('printarea')} ><i class="fa fa-print" aria-hidden="true" style={{ fontSize: "17px", border: "none" }}> Print1</i></button>
                  *
                </div>
                <div class="col-sm-3 pull-right">
                </div>   </div>
            </div>    </div> */}
      {/*       <div style={{ display: "grid" }}>

              <h3 id="companyname" style={{ marginLeft: "150px" }}> {this.state.companyName}</h3>
              <h4 id="reportheader" style={{ marginLeft: "130px" }}>Estimate Monthly Report</h4>
            </div>
 */}

            <div >
             {/*  <div class="row">
                <div class="col-lg-9 col-md-9 col-sm-6 col-xs-6">

                </div>
                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                  <div class="buttonright" >
                    <ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      className="download-table-xls-button "

                      table="tableHeadings"
                      filename="MothlyEstimate_List"
                      sheet="tablexls"
                      buttonText={downloadButtonData}
                    />


                  </div>
                </div>
              </div>
 */}


              <div class="row" id="totalSale">
                <div class="col-lg-8 col-md-8 text-right">
                </div>
                <div class="col-lg-4 col-md-4 text-right">

                  <div class="table-responsive">
                    <table class="table table-bordered">
                      <tbody><tr>
                        <th style={{ width: "30%" }}>Total Amount:</th>
                        <td style={{ width: "30%", color: "red", textAlign: "left" }}>₹ <span style={{ color: "red", textAlign: "left" }} id="ContentPlaceHolder1_lbl_subtotal">{this.state.totalSubTotal}</span></td>
                      </tr>
                        <tr>
                          <th style={{ width: "30%" }}>Balance Amount:</th>
                          <td style={{ width: "30%", color: "red", textAlign: "left" }}>₹ <span style={{ color: "red", textAlign: "left" }} id="ContentPlaceHolder1_lbl_subtotal">{this.state.totalBalance}</span></td>
                        </tr>
                      </tbody></table>


                  </div>
                </div>
              </div>
            </div>

            <ReactTable style={{ overflow: "auto", marginBottom: "5%" }}
              data={this.state.data}
              columns={this.state.columns}
              noDataText="No Data Available"
              filterable={true}
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

            <div id="tableOverflow">
              <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">

              </table>
            </div>
            <br />

          </div>

        </div>
      </div>

    );
  }
}

export default EstimateMonthlyReport;