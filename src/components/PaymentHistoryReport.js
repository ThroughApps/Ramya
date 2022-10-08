import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
  GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
  import {Delete_DownloadIcons, Invoice_xlDownldBtn} from './ServiceRegistration/IconComponents';
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
import { SiteDropDown, FilterOptions } from './SiteDropDown';
//import { GetCurrentSite, GetEmployeeSite } from './ConstSiteFunction';
import * as SiIcons from 'react-icons/si';
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';

var dataList = [];

var id;
var discount = 0;
var pay = 0;
class PaymentHistoryReport extends Component {

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

      companyId: companyId,
      payment_status: '',
      staffId: staffId,
      employeeName: employeeName,
      role: role,
      paymentMode: '',
      data: [],
      columns: [],
      paymentMode: '',
      paymentoptions: [],


      formErrors: {
        discount: '',
        paymentMode: '',
        pay: '',

      },

      discountValid: false,
      payValid: false,
      paymentModeValid: false,
      site: GetCurrentSite(),

    };


    this.setState({
      date: date,
      data: []

    })

  }


  componentDidMount() {
    SetCurrentPage("PaymentHistoryReport"); 


    $("#tableHeadings").hide();


    var self = this;


    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
        empSites: GetEmployeeSite()
      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/SalesReport/invoicepaymenthistoryreport",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {
        dataList = data.invoicepaymentreportlist;

        self.handleSite(self.state.site);
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




  BackbtnFunc() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={ReportMenuPage} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }

  getColumns() {

    return Object.keys(this.state.data[0]).map(key => {
      return {
        Header: key,
        accessor: key
      };
    });
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
    var tab = '<thead><tr class="headcolor"><th>Date</th><th>Invoice</th><th>Customer Name</th><th>Due Amount</th><th>Discount</th><th>Pay</th><th>Balance</th><th>PaymentMode</th></tr></thead>';
   
    if (result.length != 0) {
      $.each(result, function (i, item) {
        if (item.paymentMode == "-") {
          self.state.paymentMode = "Unpaid";
          self.setState({
            paymentMode: self.state.paymentMode,
          })
        } else {
          self.state.paymentMode = item.paymentMode;
          self.setState({
            paymentMode: self.state.paymentMode,
          })
        }

        tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + item.date + '</td>'
          + '<td>' + item.invoiceNo + '</td><td>' + item.userName + '</td>'
          + '<td class="number">' + (Math.round(item.dueAmount * 100) / 100).toFixed(2) + '</td>'
          + '<td>' + (Math.round(item.discount * 100) / 100).toFixed(2) + '</td>'
          + '<td>' + (Math.round(item.pay * 100) / 100).toFixed(2) + '</td>'
          + '<td>' + (Math.round(item.balanceAmt * 100) / 100).toFixed(2) + '</td><td>' + self.state.paymentMode + '</td></tr></tbody>';

        var dueAmount = (Math.round(item.dueAmount * 100) / 100).toFixed(2);
        var discount = (Math.round(item.discount * 100) / 100).toFixed(2);
        var pay = (Math.round(item.pay * 100) / 100).toFixed(2);
        var balanceAmt = (Math.round(item.balanceAmt * 100) / 100).toFixed(2);
        self.state.data[i] = {
          "Date": item.date,
          "Invoice": item.invoiceNo,
          "UserName": item.userName,
          "DueAmount": dueAmount,
          "Discount": discount,
          "Pay": pay,
          "Balance": balanceAmt,
          "PaymentMode": self.state.paymentMode,
          "Site": item.site
        };
      });
      $("#tableHeadings").append(tab);
    }
   

    self.state.columns = self.getColumns();

    self.setState({
      data: self.state.data,
      columns: self.state.columns
    })
  }

  render() {
    const downloadButtonData = <Invoice_xlDownldBtn/>;  
    return (
      <div class="container">
        <div className="repot_headercls">
        <div className="">
    <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
                    </div>
                    <div className="report_card_header">
                      <h3 id="reportHeader">Invoice Payment List</h3>
                </div>
                <div className="report_reactIcon_Dcls">
                <button type="button" style={{marginTop:"10px", border: "1px solid #ddd"}} id="print" class="btn btn-default btn_rpt_print "
              onClick={() => this.printdiv()} >
              <i class="fa fa-print" aria-hidden="true"
                style={{ fontSize: "17px", border: "none" }}> Print</i></button>
         
         
                                <ReactHTMLTableToExcel
                                    id="test-table-xls-button"
                                    className="download-table-xls-button1"
                                    table="tableHeadings"
                                    filename="DailyPurchase_List"
                                    sheet="tablexls"
                                    buttonText={downloadButtonData}
                                />
                            </div>
                            </div>
                            <div className="repot_sub_dwldbtn_cls_daily">
                                <div class="text-right_report" style={{paddingBottom:"10px"}}>
                                    <SiteDropDown onSiteDropDown={this.handleSite}
                                     data={this.state.site} />
                                </div>
                      
                </div>
        <div id="printarea " >
                
                
              
        <div class="">
{/*           <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4">
              <ul class="previous disabled" id="backbutton"
                style={{
                  backgroundColor: "#05a4b5", color: "white",
                  float: "none",
                  display: "inline-block",
                  marginLeft: "5px",
                  borderRadius: "5px",
                  padding: "3px 7px 3px 7px",
                  marginTop: "13px",
                  display: "inline-block"
                }}>
                <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></ul>
            </div>
            <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8">
              <div class="card-header">
                <h3 style={{ marginLeft: "150px" }}>Invoice Payment List</h3>   </div>
            </div>
            <div class="card-body">
              <div class="form-horizontal form-bordered">
                <div class="text-right">
                  <SiteDropDown onSiteDropDown={this.handleSite} data={this.state.site} />
                </div>
              </div>
            </div>
          </div> */}
          <div>
            <div style={{ display: "grid" }}>
      {/*         <div className="row">
                <div className="col-sm-4 col-lg-8 col-md-8">
                </div>
                <div className="col-sm-4 col-lg-2 col-md-2">
                </div>
                <div className="col-sm-4 col-lg-2 col-md-2">
                  <div class="buttonright" >
                    <ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      table="tableHeadings"
                      filename="Payment_List"
                      sheet="tablexls"
                      className="download-table-xls-button "
                      buttonText={downloadButtonData} />
                  </div>
                </div>
              </div> */}
              <div id="tableOverflow">
                <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">
                </table>
              </div>
              <ReactTable 
                data={this.state.data}
                columns={this.state.columns}
                noDataText="No Data Available"
                filterable
                defaultPageSize={10}
                className="-striped -highlight reactTable_cls"
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
        </div>
        </div>
        </div>
    );
  }
}
export default PaymentHistoryReport;