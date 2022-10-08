import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import $ from 'jquery';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import PurchaseDateWiseReport from './PurchaseDateWiseReport';
import PurchaseReportDisplay from './PurchaseReportDisplay';
import PurchaseReportEdit from './PurchaseReportEdit';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import './DownloadButton.css';
import { SiteDropDown, FilterOptions } from './SiteDropDown';
//import { GetCurrentSite, GetEmployeeSite } from './ConstSiteFunction';
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import * as SiIcons from 'react-icons/si';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
  GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
import { Invoice_xlDownldBtn} from './ServiceRegistration/IconComponents';

var dataList = [];

var currentRow;

class PurchaseDateWiseReportDisplay extends Component {

  constructor(data) {
    super(data)

    var today = new Date();
    var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var year = today.getFullYear();
    var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state = {
      year: year,
      fromDate: '',
      toDate: '',
      companyName: companyName,
      totalSubTotal: '0',
      totalBalance: '0',
      data: [],
      columns: [],
      site: GetCurrentSite()
    };


  }
  componentDidMount() {
    SetCurrentPage("PurchaseDateWiseReportDisplay");
    $(".btn-default").css("background-color", "#05a4b5");
    $(".btn-default").css("color", "white");
    $("#nodata").hide();
    var self = this;
    $("#tableHeadings").hide();
    $("#totalSale").hide();
    $("#companyname").hide();
    $("#reportheader").hide();
    self.state.data = [];
    self.setState({
      data: self.state.data,
    })

    dataList = this.props.data;
    self.handleSite(self.state.site);

  }
  GetColumns() {

    return Object.keys(this.state.data[0]).map(key => {

      return {
        Header: key,
        accessor: key,

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
    var ivalue = 0;
    self.state.totalSubTotal = 0;
    self.state.totalBalance = 0;
    if (result.length != 0) {
      var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Invoice</th><th>Date</th><th>Name</th><th>Contact</th><th>Status</th><th>Total</th><th>Balance</th></tr></thead>';
      var no;

      $.each(result, function (i, item) {

        no = parseInt(i) + 1;
        tab += '<tbody id= "myTable" ><tr  id="tabletextcol" ><td>' + no + '</td><td>' + item.invoiceNo + '</td><td>' + item.date + '</td><td>' + item.userName + '</td><td>' + item.contact + '</td>'
          + '<td>' + item.status + '</td><td>' + item.subtotal1 + '</td><td>' + item.finalAmountTotal + '</td></tr></tbody>';

        self.state.totalSubTotal = Number(self.state.totalSubTotal) + Number(item.subtotal1);
        self.state.totalBalance = Number(self.state.totalBalance) + Number(item.finalAmountTotal);

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
          "Balance(+Tax)": item.finalAmountTotal,
          "Site": item.site
        };

        ivalue = i;
      });
      $("#tableHeadings").append(tab);
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

      self.state.columns = self.GetColumns();
    } else {
      $("#nodata").show();
      $("#totalSale").hide();
      $("#test-table-xls-button").hide();
      $("#myInput").hide();
    }
    self.setState({
      data: self.state.data,
      columns: self.state.columns
    });
  }



  BackbtnFunc() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={PurchaseDateWiseReport} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }

  /*   printdiv(printarea) {
      var originalContents = document.body.innerHTML;
      $("#test-table-xls-button").hide();
      $("#backbutton").hide();
      $("#print").hide();
      $("#myInput").hide();
      $("#sidebar").hide();
      $("#navbar_company_name").hide();
  
  
      $("#companyname").show();
      $("#reportheader").show();
      $("#companyHeader").hide();
      $("#reportHeader").hide();
     
      window.print(originalContents);
      $("#sidebar").show();
      $("#navbar_company_name").show();
      $("#backbutton").show();
      $("#print").show();
      $("#test-table-xls-button").show();
      $("#myInput").show();
      // $(w.document.body).html(html);
      $("#companyname").hide();
      $("#reportheader").hide(); 
      $("#companyHeader").show();
      $("#reportHeader").show();
  
    }
   */
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


      <div class="container" >

        <div className="repot_headercls">
          <div class=" ">
            <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
          </div>
          <div class="report_card_header">
            <h3 id="reportHeader" >Purchase Datewise Report</h3>
          </div>
          <div class="report_reactIcon_Dcls">
            <button type="button" style={{marginTop:"10px"}} id="print" class="btn btn-default "
              onClick={() => this.printdiv('printarea')} >
              <i class="fa fa-print" aria-hidden="true"
                style={{ fontSize: "17px", border: "none" }}> Print</i></button>
                  <ReactHTMLTableToExcel
              id="test-table-xls-button1"
              className="download-table-xls-button1"
              table="tableHeadings"
              filename="PurchaseDatewise_List"
              sheet="tablexls"
              buttonText={downloadButtonData}
            />
          </div>
        </div>

        <div className="repot_sub_dwldbtn_cls">
          <div class="text-right_report">
            <SiteDropDown onSiteDropDown={this.handleSite} data={this.state.site} />
         
          </div>
        </div>

        <div class="">
         
          <div id="printarea">
        
            <div style={{ display: "grid" }}>

            
              <div class="row" id="totalSale">
                <div class="col-lg-8 col-md-8 text-right">
                </div>
                <div class="col-lg-4 col-md-4 text-right">

                  <div class="table-responsive">
                    <table class="table table-bordered">
                      <tbody><tr>
                        <th style={{ width: "30%" }}>Total Amount:</th>
                        <td style={{ width: "30%", color: "red", textAlign: "left" }}>$ <span style={{ color: "red", textAlign: "left" }} id="ContentPlaceHolder1_lbl_subtotal">{this.state.totalSubTotal}</span></td>
                      </tr>
                        <tr>
                          <th style={{ width: "30%" }}>Balance Amount:</th>
                          <td style={{ width: "30%", color: "red", textAlign: "left" }}>$ <span style={{ color: "red", textAlign: "left" }} id="ContentPlaceHolder1_lbl_subtotal">{this.state.totalBalance}</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>
          
            <ReactTable
              data={this.state.data}
              columns={this.state.columns}
              noDataText="No Data Available"
              filterable={true}
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

export default PurchaseDateWiseReportDisplay;