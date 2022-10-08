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
import ExpenseReportEdit from './ExpenseReportEdit';
import ExpenseReportView from './ExpenseReportView';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './DownloadButton.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { SiteDropDown, FilterOptions } from './SiteDropDown';
import {ReportIcons, Delete_DownloadIcons, Invoice_xlDownldBtn} from './ServiceRegistration/IconComponents';import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import * as SiIcons from 'react-icons/si';

var dataList = [];
var i;
var days1;
var currentRow;
class ExpYearlyReportMonthYear extends Component {
  constructor(props) {
    super(props)
    var today = new Date();
    var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var year = today.getFullYear();

    this.state = {
      date: '',
      year: year,
      companyId: companyId,
      totalSubTotal: '0',
      fromDate: '',
      toDate: '',
      month: '',
      data: [],
      columns: [],
      site: GetCurrentSite(),
    }

    this.ViewCommonFunc=this.ViewCommonFunc.bind(this);
    this.UpdateCommonFunc=this.UpdateCommonFunc.bind(this);
    this.DeleteCommonFunc=this.DeleteCommonFunc.bind(this);
  }
  componentDidMount() {
    SetCurrentPage("ExpYearlyReportMonthYear");
    window.scrollTo(0, 0);
    $(".btn-default").css("background-color", "#05a4b5");
    $(".btn-default").css("color", "white");
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
    $("#tableOverflow").hide();

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
          icon: 'error',
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
          url: " http://15.206.129.105:8080/ThroughBooksCOAPI/ExpenseReport/YearlyExpenseReport",
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
  onTrRowClick = (state, rowInfo, column, instance) => {
    var self = this;

    //   console.log("ROW INFO :",rowInfo);

    if (typeof rowInfo !== "undefined") {
      return {
        onClick: (e, handleOriginal) => {
          this.setState({
            selected: rowInfo.index
          });
          if (handleOriginal) {
            handleOriginal()
          }



          var id = rowInfo.original["ExpenseId"];
          var categoryName = rowInfo.original["Category Name"];
          var userName = rowInfo.original["User Name"];
          var amount = rowInfo.original["Amount"];
          var date = rowInfo.original["Date"];



          this.state.id = id;
          this.state.categoryName = categoryName;
          this.state.userName = userName;
          this.state.amount = amount;
          this.state.date = date;
          this.state.oldCategoryName = this.state.categoryName;
          this.state.oldUserName = this.state.userName;
          this.state.oldAmount = this.state.amount;
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

          this.state.rowIndexValue = rowInfo.index;
        },
        style: {
          background: rowInfo.index === this.state.selected ? 'rgb(66, 139, 202)' : '',
          color: rowInfo.index === this.state.selected ? '#fff' : ''
          // color: rowInfo.index === this.state.selected ? 'white' : 'black'
        },
      }
    }
    else {
      return {
        onClick: (e, handleOriginal) => {
          if (handleOriginal) {
            handleOriginal()
          }
        },
        style: {
          // background: 'white',
          // color: 'black'
        },
      }
    }



  };

  ViewCommonFunc() {
    var self = this;

    if (this.state.id === undefined) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Category ',

      })
    } else {
      ReactDOM.render(<ExpenseReportView categoryName={self.state.categoryName}
        userName={self.state.userName} amount={self.state.amount} date={self.state.date}
        oldCategoryName={self.state.oldCategoryName} oldUserName={self.state.oldUserName} oldAmount={self.state.oldAmount} oldDate={self.state.oldDate} id={self.state.id} />, document.getElementById("contentRender"));


    }
  }

  UpdateCommonFunc() {
    var self = this;
    if (this.state.id === undefined) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Category ',

      })
    } else {


      ReactDOM.render(<ExpenseReportEdit categoryName={self.state.categoryName}
        userName={self.state.userName} amount={self.state.amount} date={self.state.date}
        oldCategoryName={self.state.oldCategoryName} oldUserName={self.state.oldUserName} oldAmount={self.state.oldAmount} oldDate={self.state.oldDate} id={self.state.id} />, document.getElementById("contentRender"));

    }
  }
  DeleteCommonFunc() {
    var self = this;

    if (this.state.id === undefined) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Category ',

      })
    } else {
      if (this.state.id != "") {
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
            self.DeleteFunc(this.state.rowIndexValue)

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
      }
    }


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
    var no;
    self.state.totalSubTotal = "";

    $(".hideContent").show();
    if (result.length != 0) {
      $("#tableHeadings").empty();
      var ivalue = 0;
      var tab = '<thead><tr class="headcolor"><th>S.No</th><th>CategoryName</th><th>UserName</th><th>Amount</th><th>Date</th></tr></thead>';
      $.each(result, function (i, item) {

        no = parseInt(i) + 1;
        tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + no + '</td><td>' + item.categoryName + '</td><td>' + item.userName + '</td><td>' + item.amount + '</td><td>' + item.date + '</td></tr></tbody>';
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


        };

        ivalue = i;
      });


      self.state.data[Number(ivalue) + 1] = {
        "SNo": "",
        "Date": "",
        "Category Name": "",
        "User Name": <div style={{ fontWeight: "600" }}>{"Total"}</div>,
        "Amount": <div style={{ fontWeight: "600" }}>{self.state.totalSubTotal}</div>
      };

      self.state.columns = self.GetColumns();

      $("#tableHeadings").append(tab);
      $(".expenseId").hide();
      $("#nodata").hide();
      // $("#totalSale").show();
      // $("#myInput").show();
    } else {
      $("#tableHeadings").empty();

      $("#nodata").show();
      $("#totalSale").hide();

      $("#myInput").hide();
    }
    self.setState({
      data: self.state.data,
      columns: self.state.columns
    })
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
        <div className="repot_headercls">
          <div class=" ">
            <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
          </div>
          <div class="report_card_header">
            <h3 id="reportHeader" >Expense Report</h3>
          </div>
          <div className="report_reactIcon_Dcls">
            <ReactHTMLTableToExcel
              id="test-table-xls-button1"
              className="download-table-xls-button1"
              table="tableHeadings"
              filename="PurchaseYearly_List"
              sheet="tablexls"
              buttonText={downloadButtonData}
            />
          </div>
        </div>
        <div className="repot_headercls_yearly">

          <div class="col-md-3 btn-group">
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
          <div class="col-md-4">
            <div className="">
              <SiteDropDown className="" onSiteDropDown={this.handleSite} data={this.state.site} />
            </div>

          </div>
          <div className="col-md-4 est_inv_list_cls_Dwn_Btn_expense">
          <ReportIcons onReportView={this.ViewCommonFunc}
              onReportEdit={this.UpdateCommonFunc} onReportDelete={this.DeleteCommonFunc}
            />
          </div>
        </div>

        <div class="row" id="totalSale" style={{ marginBottom: "5%" }}>
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
        {/* <div id="nodata"><p>No Data</p></div> */}
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
          getTrProps={this.onTrRowClick}
        />
        <div id="tableOverflow">
          <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">
          </table>
        </div>
        <br />
      </div>
    );
  }
}
export default ExpYearlyReportMonthYear;