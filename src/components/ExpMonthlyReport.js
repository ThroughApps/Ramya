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
import ExpenseReportEdit from './ExpenseReportEdit';
import ExpenseReportView from './ExpenseReportView';
import CryptoJS from 'crypto-js';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './DownloadButton.css';
import { SiteDropDown, FilterOptions } from './SiteDropDown';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
import './purchaseReportCss.css';
import * as RiIcons from 'react-icons/ri';
import * as SiIcons from 'react-icons/si';
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import {Delete_DownloadIcons, Invoice_xlDownldBtn} from './ServiceRegistration/IconComponents';



var dataList = [];
var expenseSummaryList = [];
var currentRow;
class ExpMonthlyReport extends Component {

  constructor() {
    super()
    var today = new Date();
    var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    var month = today.getMonth() + 1;

    this.state = {
      month: month,
      companyId: companyId,
      companyName: companyName,
      totalSubTotal: '0',
      amount: '',
      data: [],
      columns: [],
      site: GetCurrentSite(),
    };



  }






  componentDidMount() {
SetCurrentPage("ExpMonthlyReport");
    $("#nodata").hide();
    $("#nodata").hide();
    $("#totalSale").hide();
    $("#myInput").hide();
    $("#tableOverflow").hide();
    $(".hideContent").hide();
    $(".btn-default").css("background-color", "#05a4b5");
    $(".btn-default").css("color", "white");
    $("#companyname").hide();
    $("#reportheader").hide();
    var self = this;
    $("#myInput").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("#myTable tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)


      });
      //   $(function(){
      //    var grandTotal=0;
      //    $("[id*=amountRs]").each(function(){
      //   grandTotal=grandTotal+parseFloat($(this).html());
      //     });
      //     $("[id*=ContentPlaceHolder1_lbl_subtotal]").html(grandTotal.toString());
      //   })

    });
    self.state.data = [];
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        month: this.state.month,
        companyId: this.state.companyId,
        empSites: GetEmployeeSite()
      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/ExpenseReport/MonthlyExpenseReport",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {
        dataList = data.dailyExpenseList;
        expenseSummaryList = data.summaryExpenseList;
        console.log("data.summaryExpenseList :", data.summaryExpenseList);
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
  }

  GetColumns() {
    return Object.keys(this.state.data[0]).map(key => {

      if (
        key != "ExpenseId"
      ) {
        return {
          Header: key,
          accessor: key
        };
      } else {
        return {
          Header: key,
          accessor: key,
          show: false
        };
      }
    });
  }

  onRowClick = (state, rowInfo, column, instance) => {
    var self = this;
    return {

      onClick: (e, handleOriginal) => {

        if (column.Header === "Update") {

          var rowIndexValue = rowInfo["index"];

          var id = rowInfo.original["ExpenseId"];
          var date = rowInfo.original["Date"];
          var categoryName = rowInfo.original["Category Name"];
          var userName = rowInfo.original["User Name"];
          var amount = rowInfo.original["Amount"];

          self.state.categoryName = categoryName;
          self.state.userName = userName;
          self.state.amount = amount;
          self.state.date = date;
          self.state.id = id;


          self.state.oldCategoryName = self.state.categoryName;
          self.state.oldUserName = self.state.userName;
          self.state.oldAmount = self.state.amount;
          self.state.oldDate = self.state.date;

          self.setState({

            categoryName: self.state.categoryName,
            userName: self.state.userName,
            amount: self.state.amount,
            date: self.state.date,
            oldCategoryName: self.state.oldCategoryName,
            oldUserName: self.state.oldUserName,
            oldAmount: self.state.oldAmount,
            oldDate: self.state.oldDate,
            id: self.state.id

          })
          ReactDOM.render(<ExpenseReportEdit categoryName={self.state.categoryName}
            userName={self.state.userName} amount={self.state.amount} date={self.state.date}
            oldCategoryName={self.state.oldCategoryName} oldUserName={self.state.oldUserName} oldAmount={self.state.oldAmount} oldDate={self.state.oldDate} id={self.state.id} />, document.getElementById("contentRender"));


        } else if (column.Header === "Delete") {

          var rowIndexValue = rowInfo["index"];

          var id = rowInfo.original["ExpenseId"];
          var date = rowInfo.original["Date"];
          var categoryName = rowInfo.original["Category Name"];
          var userName = rowInfo.original["User Name"];
          var amount = rowInfo.original["Amount"];

          self.state.categoryName = categoryName;
          self.state.userName = userName;
          self.state.amount = amount;
          self.state.date = date;
          self.state.id = id;
          self.state.totalSubTotal = amount;


          self.setState({

            categoryName: self.state.categoryName,
            userName: self.state.userName,
            amount: self.state.amount,
            date: self.state.date,
            totalSubTotal: self.state.amount,
            id: self.state.id

          })

          var rowIndexValue = rowInfo.index;


          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Do you Want to Delete ' + self.state.categoryName,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
            //   timer: 1500
          }).then((result) => {
            if (result.value) {
              self.DeleteFunc(rowIndexValue)

              // For more information about handling dismissals please visit
              // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Cancelled Deletion Of ' + self.state.categoryName,
                showConfirmButton: false,
                timer: 2000,
              })
            }
          })
        } else if (column.Header === "View") {

          var rowIndexValue = rowInfo["index"];


          var id = rowInfo.original["ExpenseId"];
          var date = rowInfo.original["Date"];
          var categoryName = rowInfo.original["Category Name"];
          var userName = rowInfo.original["User Name"];
          var amount = rowInfo.original["Amount"];

          self.state.categoryName = categoryName;
          self.state.userName = userName;
          self.state.amount = amount;
          self.state.date = date;
          self.state.id = id;


          self.setState({

            categoryName: self.state.categoryName,
            userName: self.state.userName,
            amount: self.state.amount,
            date: self.state.date,

            id: self.state.id

          })
          ReactDOM.render(<ExpenseReportView categoryName={self.state.categoryName}
            userName={self.state.userName} amount={self.state.amount} date={self.state.date}
            oldCategoryName={self.state.oldCategoryName} oldUserName={self.state.oldUserName} oldAmount={self.state.oldAmount} oldDate={self.state.oldDate} id={self.state.id} />, document.getElementById("contentRender"));
        }
      }
    };
  };


  DeleteFunc(rowIndexValue) {
    var self = this;

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        id: self.state.id,
        date: self.state.date,
        companyId: this.state.companyId,
      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/ExpenseReport/DailyExpenseReportDelete",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {

        self.state.totalSubTotal = Number(self.state.totalSubTotal) - Number(self.state.amount);

        self.setState({
          totalSubTotal: self.state.totalSubTotal,
        })

        var array = [...self.state.data]; // make a new copy of array instead of mutating the same array directly.
        array.splice(rowIndexValue, 1);
        self.state.data = [];
        self.state.data = array;
        dataList = array;
        self.setState({ data: array });

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

  printdiv(printarea) {
    var originalContents = document.body.innerHTML;
    $("#test-table-xls-button").hide();
    $("#backbutton").hide();
    $("#print").hide();
    $("#myInput").hide();
    $("#tableOverflow1").hide();
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
    $("#tableOverflow1").show();
    // $(w.document.body).html(html);
    $("#companyname").hide();
    $("#reportheader").hide();
    $("#companyHeader").show();
    $("#reportHeader").show();
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
    var resultexpense = FilterOptions(expenseSummaryList, this.state.site);
    console.log(" expenseSummaryList :", expenseSummaryList);
    this.RendData(result, resultexpense);

    console.log("RESULT :", result, "RESULT EXPENSE :", resultexpense);

  }
  RendData(result, resultexpense) {
    var no;
    var self = this;
    self.state.data = [];
    self.state.totalSubTotal = 0;
    $("#summary").empty();
    if (result.length != 0) {
      var ivalue = 0;
      var tab = '<thead><tr class="headcolor"><th>S.No</th><th>CategoryName</th><th>UserName</th><th>Amount</th><th>Date</th></tr></thead>';
      $.each(result, function (i, item) {
        no = parseInt(i) + 1;
        tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + no + '</td><td>' + item.categoryName + '</td><td>' + item.userName + '</td><td id="amountRs' + i + '">' + item.amount + '</td><td>' + item.date + '</td>'
          + '</tr></tbody>';

        self.state.totalSubTotal = Number(self.state.totalSubTotal) + Number(item.amount);

        self.setState({
          totalSubTotal: self.state.totalSubTotal,
        })
        self.state.data[i] = {
          "SNo": no,
          "Date": item.date,
          "Category Name": item.categoryName,
          "User Name": item.userName,
          "Amount": item.amount,
          "ExpenseId": item.id,
          "Site": item.site,
          "Delete": < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
            <i class="fa fa-trash" style={{
              border: "none",
              padding: "6px 7px 5px 7px",
              fontSize: "1em",
              color: "white",
              borderRadius: "18px",
              backgroundColor: "tomato"

            }}>  </i>
          </span></div>,
          "View": < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
            <i class="glyphicon glyphicon-eye-open" style={{
              border: "none",
              padding: "6px 7px 5px 7px",
              fontSize: "1em",
              color: "white",
              borderRadius: "18px",
              backgroundColor: "#a4176b"
            }}></i>
          </span></div>,
          "Update": < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{
            fontSize: '1em', color: 'white', padding: "3px 3px 5px 4px",
            fontSize: "1em",
            borderRadius: "12px",
            backgroundColor: "mediumseagreen"
          }}>
            <i class="glyphicon glyphicon-pencil" style={{ border: "none" }}></i>
          </span></div>

        };

        ivalue = i;

      });
      $("#tableHeadings").append(tab);
      $(".expenseId").hide();

      self.state.data[Number(ivalue) + 1] = {
        "SNo": "",
        "Date": "",
        "Category Name": "",
        "User Name": <div style={{ fontWeight: "600" }}>{"Total"}</div>,
        "Amount": <div style={{ fontWeight: "600" }}>{self.state.totalSubTotal}</div>
      };
      if (self.state.data.length > 0) {
        self.state.columns = self.GetColumns()
      }

      var summary = '<thead><tr><th>S.No</th><th>User Name</th><th>Total Expense</th></tr></thead>';
      $.each(resultexpense, function (i, item) {
        no = parseInt(i) + 1;
        summary += '<tr class="success" ><td>' + no + '</td><td>' + item.userName + '</td><td>' + item.amount + '</td></tr>';
      });


      $("#summary").append(summary);
    } else {
      $("#nodata").show();
      $("#test-table-xls-button").hide();
      $("#totalSale").hide();
      $("#myInput").hide();
    }
    self.setState({
      data: self.state.data,
      columns: self.state.columns
    })
    console.log("after drop down ", self.state.data);
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
            <h3 id="reportHeader" >Expense Monthly Report</h3>
          </div>
          <div className="report_reactIcon_Dcls">
            <ReactHTMLTableToExcel
              id="test-table-xls-button1"
              className="download-table-xls-button1"
              table="tableHeadings"
              filename="Monthly_Expense_List"
              sheet="tablexls"
              buttonText={downloadButtonData}
            />
          </div>

        
        </div>
        <div id="printarea " >

          <div class="">
         
            <div id="tableOverflow1" class="table-responsive">
              <div class="col-md-12">
                <h3 className="text-center" style={{ textAlign: "center" }}>Summary</h3>
              </div>
              <div className="repot_sub_dwldbtn_cls_expense_daily">
                <div class="text-right_report">
                  <SiteDropDown onSiteDropDown={this.handleSite} data={this.state.site} />
                </div>

              </div>
              <table class="table" id="summary"  >
              </table>
            </div>
            <div style={{ display: "grid" }}>
             
              <input style={{
                color: "black", width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }} type="text" id="myInput" placeholder="Search.." title="Type in a name" />
              <div id="tableOverflow">
                <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">
                </table>
              </div>
              <br />  <div class="row" id="totalSale">
                <div class="col-lg-8 col-md-8 text-right">
                </div>
                <div class="col-lg-4 col-md-4 text-right">
                  <div class="table-responsive">
                    <table class="table table-bordered">
                      <tbody><tr>
                        <th style={{ width: "30%" }}>Total:</th>
                        <td style={{ width: "30%", color: "red", textAlign: "left" }}>$ <span style={{ color: "red", textAlign: "left" }} id="ContentPlaceHolder1_lbl_subtotal">{this.state.totalSubTotal}</span></td>
                      </tr>
                      </tbody></table>
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
          </div>
        </div>
      </div>
    );
  }
}
export default ExpMonthlyReport;









