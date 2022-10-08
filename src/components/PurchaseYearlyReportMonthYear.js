import datepicker from 'jquery-ui/ui/widgets/datepicker';
import './datepicker.css';
import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';
import CryptoJS from 'crypto-js';
import registerServiceWorker from './registerServiceWorker';
import ReportMenuPage from './ReportMenuPage';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import { confirmAlert } from 'react-confirm-alert';
import FooterText from './FooterText';
import { appendFile } from 'fs';
import _ from 'underscore';
import moment from 'moment';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import {Delete_DownloadIcons, Invoice_xlDownldBtn} from './ServiceRegistration/IconComponents';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './DownloadButton.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { SiteDropDown, FilterOptions } from './SiteDropDown';
//import { GetCurrentSite, GetEmployeeSite } from './ConstSiteFunction';
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import * as SiIcons from 'react-icons/si';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
  GetCurrencies,SetCurrentPage } from './ConstSiteFunction';

var i;
var days1;
var currentRow;
var dataList = [];
class PurchaseYearlyReportMonthYear extends Component {
  constructor(props) {
    super(props)
    var today = new Date();
    var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    var year = today.getFullYear();

    this.state = {
      date: today1,
      year: year,
      companyId: companyId,
      companyName: companyName,
      totalSubTotal: '0',
      totalBalance: '0',
      data: [],
      columns: [],
      site: GetCurrentSite(),
    }

  }
  componentDidMount() {
    SetCurrentPage("PurchaseYearlyReportMonthYear");
    window.scrollTo(0, 0);
    $("#tableHeadings").hide();
    $("#totalSale").hide();
    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
    $("#nodata").hide();
    $("#totalSale").hide();
    $("#myInput").hide();


    $(".hideContent").hide();
    var self = this;
    $(".monthPicker").datepicker({
      dateFormat: "MM yy",
      changeMonth: true,
      changeYear: true,
      showButtonPanel: true,
      yearRange: new Date().getFullYear() - 10 + ":" + new Date().getFullYear(),
      onClose: function (dateText, inst) {
        var month = $(
          "#ui-datepicker-div .ui-datepicker-month :selected"
        ).val();
        var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
        $(this).val($.datepicker.formatDate("MM yy", new Date(year, month, 1)));
        var selectedMonth = Number(month) + 1;
        self.state.monthName = moment().month(selectedMonth - 1).format('MMMM');
        self.state.dispyear = year;
        self.GetMonthData(selectedMonth, year);
      }
    });

    $(".monthPicker").focus(function () {
      $(".ui-datepicker-calendar").hide();
      $("#ui-datepicker-div").position({
        my: "center top",
        at: "center bottom",
        of: $(this)
      });
    });

  }

  GetMonthData(selectedMonth, year) {
    var today = new Date();
    var currentMonth = today.getMonth() + 1;
    days1 = new Date(year, selectedMonth, 0).getDate();

    if (
      selectedMonth == "01" ||
      selectedMonth == "03" ||
      selectedMonth == "05" ||
      selectedMonth == "07" ||
      selectedMonth == "08" ||
      selectedMonth == "10" ||
      selectedMonth == "12"
    ) {
      if (selectedMonth == currentMonth) {
        this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
        this.state.toDate = year + "-" + selectedMonth + "-" + today.getDate();
      } else {
        this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
        this.state.toDate = year + "-" + selectedMonth + "-" + "31";
      }

      this.setState({
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        month: this.state.month
      });
    } else if (
      selectedMonth == "04" ||
      selectedMonth == "06" ||
      selectedMonth == "09" ||
      selectedMonth == "11"
    ) {
      if (selectedMonth == currentMonth) {
        this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
        this.state.toDate = year + "-" + selectedMonth + "-" + today.getDate();
      } else {
        this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
        this.state.toDate = year + "-" + selectedMonth + "-" + "30";
      }
      this.setState({
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        month: this.state.month
      });
    } else if (selectedMonth == "02") {
      if (year % 100 == 0 && year % 400 == 0 && year % 4 == 0) {
        if (selectedMonth == currentMonth) {
          this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
          this.state.toDate =
            year + "-" + selectedMonth + "-" + today.getDate();
        } else {
          this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
          this.state.toDate = year + "-" + selectedMonth + "-" + "29";
        }
        this.setState({
          fromDate: this.state.fromDate,
          toDate: this.state.toDate,
          month: this.state.month
        });
      } else {
        if (selectedMonth == currentMonth) {
          this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
          this.state.toDate =
            year + "-" + selectedMonth + "-" + today.getDate();
        } else {
          this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
          this.state.toDate = year + "-" + selectedMonth + "-" + "28";
        }
        this.setState({
          fromDate: this.state.fromDate,
          toDate: this.state.toDate,
          month: this.state.month
        });
      }
    }

    this.Submit();
  }
  Submit() {

    var CurrentDate = new Date();
    var GivenDate = new Date(this.state.fromDate);
    var self = this;
    if (this.state.fromDate.trim().length > 0 && this.state.toDate.trim().length > 0) {
      if (GivenDate > CurrentDate) {
        this.state.fromDate = "";
        this.state.today = "";

        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: "You Cannot See Reports For Future Dates.",
          showConfirmButton: false,
          timer: 2000
        })
        $(".monthPicker").val("");
      } else {

        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;

        this.setState({
          companyId: this.state.companyId,

          month: this.state.month,
        });
        // alert("fromDate:"+this.state.fromDate);
        // alert("toDate:"+this.state.toDate);
        // alert("companyId:"+this.state.companyId);
        var self = this;

        self.state.data = [];
        $.ajax({
          type: 'POST',
          data: JSON.stringify({
            year: this.state.year,
            fromDate: this.state.fromDate,
            toDate: this.state.toDate,
            companyId: this.state.companyId,
            empSites: GetEmployeeSite()
          }),
          url: " http://15.206.129.105:8080/ThroughBooksCOAPI/PurchaseReport/YearlyPurchaseReport",
          contentType: "application/json",
          dataType: 'json',
          async: false,

          success: function (data, textStatus, jqXHR) {

            dataList = data;

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
    } else {

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: "Select Month And Year",
        showConfirmButton: false,
        timer: 2000
      })

    }



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
    self.state.totalSubTotal = 0;
    self.state.totalBalance = 0;
    $(".hideContent").show();
    if (result.length != 0) {
      $("#tableHeadings").empty();

      var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Invoice</th><th>Date</th><th>Name</th><th>Contact</th><th>Status</th><th>Total</th><th>Balance</th></tr></thead>';
      var ivalue = 0;
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

      $("#tableHeadings").append(tab);
      $(".vendorId").hide();
      $("#nodata").hide();

    } else {
      $("#nodata").show();
      $("#totalSale").hide();
      $("#test-table-xls-button").hide();
      $("#tableHeadings").empty();

      $("#myInput").hide();
    }
    self.setState({
      data: self.state.data,
      columns: self.state.columns
    })
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


  printdiv() {
    var originalContents = document.body.innerHTML;

    $(".repot_headercls_yearly").hide();
    $(".buttonright_report").hide();
    $("#test-table-xls-button").hide();
    $(".pro-sidebar").hide();

    //.pro-sidebar

    window.print(originalContents);
    $(".repot_headercls_yearly").show();
    $(".buttonright_report").show();
    $("#test-table-xls-button").show();
    $(".pro-sidebar").show();

  }

  render() {
    const downloadButtonData = <Invoice_xlDownldBtn/>;  
    return (
      <div className="container" >
        <div className="repot_headercls_yearly">
          <div class=" ">
            <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
          </div>
          <div class="report_card_header">
            <h3 id="reportHeader" >Purchase Yearly Report</h3>
          </div>
          <div className="reactIcon_Dcls">
            <button type="button" style={{ marginTop: "10px", border: "1px solid #ddd" }} class="btn btn-default btn_rpt_print "
              onClick={() => this.printdiv('printarea')} >
              <i class="fa fa-print" aria-hidden="true"
                style={{ fontSize: "17px", border: "none" }}> Print</i></button>
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button1"
              table="tableHeadings"
              filename="PurchaseYearly_List"
              sheet="tablexls"
              buttonText={downloadButtonData}
            />
          </div>
        </div>
        <div className="" id="printarea">
          <div className="repot_sub_dwldbtn_cls_yearly">

            <div class="btn-group" >
              {/* <label for="month">Select Month and Year:  </label> */}
              <input
                type="text"
                id="month"
                name="month"
                class="monthPicker form-control"
                autocomplete="off"
                placeholder="Select Month And Year"
              />
            </div>
            <div class="text_right_report_yerly">
              <div>
                <SiteDropDown onSiteDropDown={this.handleSite} data={this.state.site} />
              </div>
            </div>
          </div>
          <div class="row" id="totalSale" style={{ marginBottom: "5%" }}>
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
                  </tbody></table>

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









    );
  }

}
export default PurchaseYearlyReportMonthYear;