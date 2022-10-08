import datepicker from "jquery-ui/ui/widgets/datepicker";
import "./datepicker.css";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import CryptoJS from "crypto-js";
import registerServiceWorker from "./registerServiceWorker";
import { confirmAlert } from "react-confirm-alert";
import AttendanceReportMenuPage from './AttendanceReportMenuPage';
import PeriodAttendanceReport from './PeriodAttendanceReport';
import * as XLSX from 'xlsx';
import _ from 'underscore';
import moment from 'moment';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
//css
import './AttenRptmenucss.css';
import {Delete_DownloadIcons, Invoice_xlDownldBtn} from './ServiceRegistration/IconComponents';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { SiteDropDown, FilterOptions, EmpIdFilterOptions, EmpFilterOptions } from './SiteDropDown';
import { GetCurrentSite, GetEmployeeSite } from './ConstSiteFunction';
var dataList = [];
var i;

var month;
var employeearray = [];
var xlsRows = [];
var xlsSummaryRows = [];
var summaryTableDataCount = 0;
var dataTableDataCount = 0;

class MonthlyAttendanceReport extends Component {
  constructor(props) {
    super(props);
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem("CompanyId"), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var employeeId = CryptoJS.AES.decrypt(localStorage.getItem("staffId"), "shinchanbaby").toString(CryptoJS.enc.Utf8);


    this.state = {
      date: "",
      companyId: companyId,
      employeeId: employeeId,
      fromDate: "",
      toDate: "",
      month: "",
      summaryData: [],
      saleData: [],
      summaryColumns: [],
      saleColumns: [],
      summarytableData: [],
      summaryColumns: [],
      data: [],
      columns: [],
      site: GetCurrentSite(),

    };
  }

  componentDidMount() {

    window.scrollTo(0, 0);
    var self = this;
    var today = new Date();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem("CompanyId"), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var employeeId = CryptoJS.AES.decrypt(localStorage.getItem("staffId"), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var year = today.getFullYear();
    var currentMonth = today.getMonth() + 1;
    this.state.fromDate = year + "-" + currentMonth + "-" + "01";
    this.state.toDate = year + "-" + currentMonth + "-" + today.getDate();

    this.state.companyId = companyId;
    this.state.employeeId = employeeId;
    this.setState({
      companyId: this.state.companyId,
      employeeId: this.state.employeeId,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
    });

    var category = "Staff";
    var getMonthlyAttendanceReportData = "{'companyId':'" + this.state.companyId + "','fromDate':'" + this.state.fromDate + "','toDate':'" + this.state.toDate + "','category':'" + category + "'}";

    $.ajax({
      type: "GET",

      url: "https://wildfly.tictoks.in:443/EmployeeAttendenceAPI/AttendanceAPICall/employeeOrganizationAttendanceMonthlyReport/" + getMonthlyAttendanceReportData,


      contentType: "application/json",
      dataType: "json",
      async: false,
      success: function (data, textStatus, jqXHR) {
        dataList = data.employeeRetrievelist;
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

    $(".hideContent").hide();

    $("#goTop").hide();
    $("#exceldownloadbutton").hide();
    $("#empListData").hide();


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

        self.setState({
          year: year
        })


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



    $("a[href='#top']").click(function () {
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    });




  }

  handleSite = (e) => {
    this.handleSite = this.handleSite.bind(this);
    this.state.site = e.toString();
    this.setState({
      site: e.toString()
    });
    var EmpList = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('EmpList'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
    var result = EmpFilterOptions(EmpList, this.state.site, "site");
    var staffIds = _.pluck(result, "staffId");
    if (staffIds.length > 0) {
      var result1 = EmpIdFilterOptions(dataList, staffIds.toString());
      this.RendData(result1);
    } else {
      this.RendData([]);
    }
  }
  RendData(result) {
    var self = this;
    $(".hideContent").hide();
    $("#goTop").hide();

    window.scrollTo(0, 0);
    employeearray = [];
    xlsRows = [];
    xlsSummaryRows = [];

    var Presentcount = 0;
    var Leavecount = 0;
    var Absentcount = 0;
    var employeeId = null;
    var employeeName;
    var totalCancel = 0;
    var totalCompo = 0;

    var totalWorkHour = "00:00:00";
    var status;
    var color;
    self.state.data = [];
    $("#summary").empty();
    xlsRows = [];
    xlsSummaryRows = [];
    if (result.length != 0) {
      $(".hideContent").show();
      $("#goTop").show();
      $("#exceldownloadbutton").show();
      self.state.summarytableData = [];
      self.state.summaryColumns = [];
      summaryTableDataCount = 0;
      $.each(result, function (i, item) {
        var content = JSON.stringify({
          date: item.date,
          employeeId: item.employeeId,
          name: item.name,
          department: item.department,
          checkinTime: item.checkinTime,
          checkoutTime: item.checkoutTime,
          totalWorkHour: item.totalWorkHour,
          status: item.status,
          employeeType: item.employeeType,
        });

        employeearray.push(content);

        if (employeeId == null) {
          employeeId = item.employeeId;

        }

        if (employeeId == item.employeeId) {
          //count block

          employeeName = item.name;


          if (item.status == "P") {
            Presentcount++;
            status = "Present";
            color = "#ffffff";
          } else if (item.status == "A") {
            Absentcount++;
            status = "Absent";
            color = "#ffffff";
          } else if (item.status == "Cancel") {
            totalCancel++;

            status = "Cancel";

          } else if (item.status == "Compo") {
            totalCompo++;

            status = "Compo";

          }
          //  tab += '<tbody id= "myTable" ><tr style="background-color:' + color + ';"><td>' + item.date + '</td><td>' + item.employeeId + '</td><td>' + item.name + '</td><td>' + item.department + '</td><td>' + item.checkinTime + '</td><td>' + item.checkoutTime + '</td><td>' + item.totalWorkHour + '</td><td>' + status + '</td><td>' + item.employeeType + '</td></tr></tbody>';
          if ((item.checkInOutTimings != null) && (item.checkInOutTimings != "-")) {

            xlsRows.push(item.date);
            xlsRows.push(item.employeeId);
            xlsRows.push(item.name);
            //   xlsRows.push(item.role);
            //  xlsRows.push(item.department);
            xlsRows.push(item.checkinTime);
            xlsRows.push(item.checkoutTime);
            xlsRows.push(item.totalWorkHour);
            xlsRows.push(item.status);
            //   xlsRows.push(item.employeeType);
            xlsRows.push("+");



            var str_array = item.checkInOutTimings.split(',');
            var inOut = '';

            for (var i = 0; i < str_array.length; i += 2) {


              if (str_array[i + 1]) {

                inOut += str_array[i] + '&nbsp - &nbsp' + str_array[i + 1] + '&nbsp&nbsp,&nbsp&nbsp';
              } else {

                inOut += str_array[i] + '&nbsp - &nbsp&nbsp -';

              }
            }


          } else {

            xlsRows.push(item.date);
            xlsRows.push(item.employeeId);
            xlsRows.push(item.name);
            //   xlsRows.push(item.role);
            //   xlsRows.push(item.department);
            xlsRows.push(item.checkinTime);
            xlsRows.push(item.checkoutTime);
            xlsRows.push(item.totalWorkHour);
            xlsRows.push(item.status);
            //    xlsRows.push(item.employeeType);
            xlsRows.push("+");

          }
          if (item.totalWorkHour != "-") {
            var start = totalTimeString([totalWorkHour, item.totalWorkHour]);
            totalWorkHour = start;

          }

        } else {

          var summary = '<tbody id= "myTable" ><tr class="success" ><td>' + employeeId + '</td>'
            + '<td>' + employeeName + '</td><td>' + Presentcount + '</td><td>' + Absentcount + '</td>'
            + '<td>' + totalWorkHour + '</td>'
            + '<td ><a href="#topDiv" id="view"><span class="glyphicon glyphicon-eye-open" style="color:black"></span>View</a></td></tr></tbody>';

          xlsSummaryRows.push(employeeId);
          xlsSummaryRows.push(employeeName);
          xlsSummaryRows.push(Presentcount);
          xlsSummaryRows.push(Absentcount);
          xlsSummaryRows.push(totalWorkHour);
          xlsSummaryRows.push("+");

          $("#summary").append(summary);

          self.state.summarytableData[summaryTableDataCount] = {
            "Emp Id": employeeId,
            "Emp Name": employeeName,
            "#Present": Presentcount,
            "#Absent": Absentcount,
            "#Work": totalWorkHour,
            "View": < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
              <i class="glyphicon glyphicon-eye-open" style={{
                border: "none",
                padding: "6px 7px 5px 7px",
                fontSize: "1em",
                color: "white",
                borderRadius: "18px",
                backgroundColor: "#337ab7"
              }}></i>
            </span></div>,
          }
          summaryTableDataCount = Number(summaryTableDataCount) + 1;


          employeeId = item.employeeId;
          employeeName = item.name;
          //initalize count to 0
          Presentcount = 0;
          Leavecount = 0;
          Absentcount = 0;
          totalWorkHour = "00:00:00";
          var totalCancel = 0;
          var totalCompo = 0;
          var totalEmp = 0;
          if (item.status == "P") {
            Presentcount++;
            status = "Present";
            color = "#ffffff";

          } else if (item.status == "A") {
            Absentcount++;
            status = "Absent";
            color = "#ffffff";
          } else if (item.status == "Cancel") {
            totalCancel++;
            totalEmp++;
            status = "Cancel";

          } else if (item.status == "Compo") {
            totalCompo++;
            totalEmp++;
            status = "Compo";

          }


          //   tab += '<tbody id= "myTable" ><tr style="background-color:' + color + ';"><td>' + item.date + '</td><td>' + item.employeeId + '</td><td>' + item.name + '</td><td>' + item.department + '</td><td>' + item.checkinTime + '</td><td>' + item.checkoutTime + '</td><td>' + item.totalWorkHour + '</td><td>' + status + '</td><td>' + item.employeeType + '</td></tr></tbody>';
          if ((item.checkInOutTimings != null) && (item.checkInOutTimings != "-")) {

            xlsRows.push(item.date);
            xlsRows.push(item.employeeId);
            xlsRows.push(item.name);
            //   xlsRows.push(item.role);
            //   xlsRows.push(item.department);
            xlsRows.push(item.checkinTime);
            xlsRows.push(item.checkoutTime);
            xlsRows.push(item.totalWorkHour);
            xlsRows.push(item.status);
            //  xlsRows.push(item.employeeType);
            xlsRows.push("+");

            var str_array = item.checkInOutTimings.split(',');
            var inOut = '';

            for (var i = 0; i < str_array.length; i += 2) {


              if (str_array[i + 1]) {

                inOut += str_array[i] + '&nbsp - &nbsp' + str_array[i + 1] + '&nbsp&nbsp,&nbsp&nbsp';
              } else {

                inOut += str_array[i] + '&nbsp - &nbsp&nbsp -';

              }
            }

          } else {

            xlsRows.push(item.date);
            xlsRows.push(item.employeeId);
            xlsRows.push(item.name);
            xlsRows.push(item.checkinTime);
            xlsRows.push(item.checkoutTime);
            xlsRows.push(item.totalWorkHour);
            xlsRows.push(item.status);
            xlsRows.push("+");
          }
          if (item.totalWorkHour != "-") {
            var start = totalTimeString([totalWorkHour, item.totalWorkHour]);
            totalWorkHour = start;

          }
        }
      });
      xlsSummaryRows.push(employeeId);
      xlsSummaryRows.push(employeeName);
      xlsSummaryRows.push(Presentcount);
      xlsSummaryRows.push(Absentcount);
      xlsSummaryRows.push(totalWorkHour);
      xlsSummaryRows.push("+");

      self.state.summarytableData[summaryTableDataCount] = {
        "Emp Id": employeeId,
        "Emp Name": employeeName,
        "#Present": Presentcount,
        "#Absent": Absentcount,
        "#Work": totalWorkHour,
        "View": < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
          <i class="glyphicon glyphicon-eye-open" style={{
            border: "none",
            padding: "6px 7px 5px 7px",
            fontSize: "1em",
            color: "white",
            borderRadius: "18px",
            backgroundColor: "#337ab7"
          }}></i>
        </span></div>,
      }

      summaryTableDataCount = Number(summaryTableDataCount) + 1;


      self.state.summaryColumns = [
        { Header: "Emp Id", accessor: 'Emp Id' },
        { Header: "Emp Name", accessor: 'Emp Name' },
        { Header: "#Present", accessor: '#Present' },
        { Header: "#Absent", accessor: '#Absent' },
        { Header: "#Work", accessor: '#Work' },
        { Header: "View", accessor: 'View' }
      ];


      self.setState({
        summarytableData: self.state.summarytableData,
        summaryColumns: self.state.summaryColumns
      })




    } else {

      $("#exceldownloadbutton").hide();
    }

    function zeroPad(num) {
      var str = String(num);
      if (str.length < 2) {
        return '0' + str;
      }
      return str;
    }

    // assuming your time strings will always be (H*:)(m{0,2}:)s{0,2} and never negative
    function totalTimeString(timeStrings) {
      var totals = timeStrings.reduce(function (a, timeString) {
        var parts = timeString.split(':');
        var temp;
        if (parts.length > 0) {
          temp = Number(parts.pop()) + a.seconds;
          a.seconds = temp % 60;
          if (parts.length > 0) {
            temp = (Number(parts.pop()) + a.minutes) + ((temp - a.seconds) / 60);
            a.minutes = temp % 60;
            a.hours = a.hours + ((temp - a.minutes) / 60);
            if (parts.length > 0) {
              a.hours += Number(parts.pop());
            }
          }
        }

        return a;
      }, {
          hours: 0,
          minutes: 0,
          seconds: 0
        });

      // returned string will be HH(H+):mm:ss
      return [
        zeroPad(totals.hours),
        zeroPad(totals.minutes),
        zeroPad(totals.seconds)
      ].join(':');
    }

  }

  GetMonthData(selectedMonth, year) {
    var today = new Date();
    var currentMonth = today.getMonth() + 1;

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



    this.Submit(selectedMonth, year);

  }


  Submit(selectedMonth, year) {
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
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem("CompanyId"), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        var employeeId = CryptoJS.AES.decrypt(localStorage.getItem("staffId"), "shinchanbaby").toString(CryptoJS.enc.Utf8);


        this.state.companyId = companyId;
        this.state.employeeId = employeeId;
        this.setState({
          companyId: this.state.companyId,
          employeeId: this.state.employeeId
        });

        var category = "Staff";
        var getMonthlyAttendanceReportData = "{'companyId':'" + this.state.companyId + "','fromDate':'" + this.state.fromDate + "','toDate':'" + this.state.toDate + "','category':'" + category + "'}";

        $.ajax({
          type: "GET",

          url: "https://wildfly.tictoks.in:443/EmployeeAttendenceAPI/AttendanceAPICall/employeeOrganizationAttendanceMonthlyReport/" + getMonthlyAttendanceReportData,


          contentType: "application/json",
          dataType: "json",
          async: false,
          success: function (data, textStatus, jqXHR) {




            $(".hideContent").hide();
            $("#goTop").hide();

            window.scrollTo(0, 0);
            employeearray = [];
            xlsRows = [];
            xlsSummaryRows = [];

            var Presentcount = 0;
            var Leavecount = 0;
            var Absentcount = 0;
            var employeeId = null;
            var employeeName;
            var totalCancel = 0;
            var totalCompo = 0;

            var totalWorkHour = "00:00:00";
            var status;
            var color;

            if (data.employeeRetrievelist.length != 0) {
              $(".hideContent").show();
              $("#goTop").show();
              $("#exceldownloadbutton").show();
              self.state.summarytableData = [];
              self.state.summaryColumns = [];
              summaryTableDataCount = 0;





              $.each(data.employeeRetrievelist, function (i, item) {
                var content = JSON.stringify({
                  date: item.date,
                  employeeId: item.employeeId,
                  name: item.name,
                  department: item.department,
                  checkinTime: item.checkinTime,
                  checkoutTime: item.checkoutTime,
                  totalWorkHour: item.totalWorkHour,
                  status: item.status,
                  employeeType: item.employeeType,
                });

                employeearray.push(content);

                if (employeeId == null) {
                  employeeId = item.employeeId;

                }

                if (employeeId == item.employeeId) {
                  //count block

                  employeeName = item.name;


                  if (item.status == "P") {
                    Presentcount++;
                    status = "Present";
                    color = "#ffffff";
                  } else if (item.status == "A") {
                    Absentcount++;
                    status = "Absent";
                    color = "#ffffff";
                  } else if (item.status == "Cancel") {
                    totalCancel++;

                    status = "Cancel";

                  } else if (item.status == "Compo") {
                    totalCompo++;

                    status = "Compo";

                  }
                  //  tab += '<tbody id= "myTable" ><tr style="background-color:' + color + ';"><td>' + item.date + '</td><td>' + item.employeeId + '</td><td>' + item.name + '</td><td>' + item.department + '</td><td>' + item.checkinTime + '</td><td>' + item.checkoutTime + '</td><td>' + item.totalWorkHour + '</td><td>' + status + '</td><td>' + item.employeeType + '</td></tr></tbody>';
                  if ((item.checkInOutTimings != null) && (item.checkInOutTimings != "-")) {

                    xlsRows.push(item.date);
                    xlsRows.push(item.employeeId);
                    xlsRows.push(item.name);
                    //   xlsRows.push(item.role);
                    //  xlsRows.push(item.department);
                    xlsRows.push(item.checkinTime);
                    xlsRows.push(item.checkoutTime);
                    xlsRows.push(item.totalWorkHour);
                    xlsRows.push(item.status);
                    //   xlsRows.push(item.employeeType);
                    xlsRows.push("+");



                    var str_array = item.checkInOutTimings.split(',');
                    var inOut = '';

                    for (var i = 0; i < str_array.length; i += 2) {


                      if (str_array[i + 1]) {

                        inOut += str_array[i] + '&nbsp - &nbsp' + str_array[i + 1] + '&nbsp&nbsp,&nbsp&nbsp';
                      } else {

                        inOut += str_array[i] + '&nbsp - &nbsp&nbsp -';

                      }
                    }


                  } else {

                    xlsRows.push(item.date);
                    xlsRows.push(item.employeeId);
                    xlsRows.push(item.name);
                    //   xlsRows.push(item.role);
                    //   xlsRows.push(item.department);
                    xlsRows.push(item.checkinTime);
                    xlsRows.push(item.checkoutTime);
                    xlsRows.push(item.totalWorkHour);
                    xlsRows.push(item.status);
                    //    xlsRows.push(item.employeeType);
                    xlsRows.push("+");

                  }
                  if (item.totalWorkHour != "-") {
                    var start = totalTimeString([totalWorkHour, item.totalWorkHour]);
                    totalWorkHour = start;

                  }

                } else {

                  var summary = '<tbody id= "myTable" ><tr class="success" ><td>' + employeeId + '</td>'
                    + '<td>' + employeeName + '</td><td>' + Presentcount + '</td><td>' + Absentcount + '</td>'
                    + '<td>' + totalWorkHour + '</td>'
                    + '<td ><a href="#topDiv" id="view"><span class="glyphicon glyphicon-eye-open" style="color:black"></span>View</a></td></tr></tbody>';

                  xlsSummaryRows.push(employeeId);
                  xlsSummaryRows.push(employeeName);
                  xlsSummaryRows.push(Presentcount);
                  xlsSummaryRows.push(Absentcount);
                  xlsSummaryRows.push(totalWorkHour);
                  xlsSummaryRows.push("+");

                  $("#summary").append(summary);



                  self.state.summarytableData[summaryTableDataCount] = {
                    "Emp Id": employeeId,
                    "Emp Name": employeeName,
                    "#Present": Presentcount,
                    "#Absent": Absentcount,
                    "#Work": totalWorkHour,
                    "View": < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
                      <i class="glyphicon glyphicon-eye-open" style={{
                        border: "none",
                        padding: "6px 7px 5px 7px",
                        fontSize: "1em",
                        color: "white",
                        borderRadius: "18px",
                        backgroundColor: "#337ab7"
                      }}></i>
                    </span></div>,
                  }
                  summaryTableDataCount = Number(summaryTableDataCount) + 1;


                  employeeId = item.employeeId;
                  employeeName = item.name;
                  //initalize count to 0
                  Presentcount = 0;
                  Leavecount = 0;
                  Absentcount = 0;
                  totalWorkHour = "00:00:00";
                  var totalCancel = 0;
                  var totalCompo = 0;
                  var totalEmp = 0;


                  if (item.status == "P") {
                    Presentcount++;
                    status = "Present";
                    color = "#ffffff";

                  } else if (item.status == "A") {
                    Absentcount++;
                    status = "Absent";
                    color = "#ffffff";
                  } else if (item.status == "Cancel") {
                    totalCancel++;
                    totalEmp++;
                    status = "Cancel";

                  } else if (item.status == "Compo") {
                    totalCompo++;
                    totalEmp++;
                    status = "Compo";

                  }


                  //   tab += '<tbody id= "myTable" ><tr style="background-color:' + color + ';"><td>' + item.date + '</td><td>' + item.employeeId + '</td><td>' + item.name + '</td><td>' + item.department + '</td><td>' + item.checkinTime + '</td><td>' + item.checkoutTime + '</td><td>' + item.totalWorkHour + '</td><td>' + status + '</td><td>' + item.employeeType + '</td></tr></tbody>';
                  if ((item.checkInOutTimings != null) && (item.checkInOutTimings != "-")) {

                    xlsRows.push(item.date);
                    xlsRows.push(item.employeeId);
                    xlsRows.push(item.name);
                    //   xlsRows.push(item.role);
                    //   xlsRows.push(item.department);
                    xlsRows.push(item.checkinTime);
                    xlsRows.push(item.checkoutTime);
                    xlsRows.push(item.totalWorkHour);
                    xlsRows.push(item.status);
                    //  xlsRows.push(item.employeeType);
                    xlsRows.push("+");

                    var str_array = item.checkInOutTimings.split(',');
                    var inOut = '';

                    for (var i = 0; i < str_array.length; i += 2) {


                      if (str_array[i + 1]) {

                        inOut += str_array[i] + '&nbsp - &nbsp' + str_array[i + 1] + '&nbsp&nbsp,&nbsp&nbsp';
                      } else {

                        inOut += str_array[i] + '&nbsp - &nbsp&nbsp -';

                      }
                    }

                  } else {

                    xlsRows.push(item.date);
                    xlsRows.push(item.employeeId);
                    xlsRows.push(item.name);
                    //   xlsRows.push(item.role);
                    //   xlsRows.push(item.department);
                    xlsRows.push(item.checkinTime);
                    xlsRows.push(item.checkoutTime);
                    xlsRows.push(item.totalWorkHour);
                    xlsRows.push(item.status);
                    //   xlsRows.push(item.employeeType);
                    xlsRows.push("+");
                  }
                  if (item.totalWorkHour != "-") {
                    var start = totalTimeString([totalWorkHour, item.totalWorkHour]);
                    totalWorkHour = start;


                  }

                }
              });


              xlsSummaryRows.push(employeeId);
              xlsSummaryRows.push(employeeName);
              xlsSummaryRows.push(Presentcount);
              xlsSummaryRows.push(Absentcount);
              xlsSummaryRows.push(totalWorkHour);
              xlsSummaryRows.push("+");

              self.state.summarytableData[summaryTableDataCount] = {
                "Emp Id": employeeId,
                "Emp Name": employeeName,
                "#Present": Presentcount,
                "#Absent": Absentcount,
                "#Work": totalWorkHour,
                "View": < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
                  <i class="glyphicon glyphicon-eye-open" style={{
                    border: "none",
                    padding: "6px 7px 5px 7px",
                    fontSize: "1em",
                    color: "white",
                    borderRadius: "18px",
                    backgroundColor: "#337ab7"
                  }}></i>
                </span></div>,
              }

              summaryTableDataCount = Number(summaryTableDataCount) + 1;


              self.state.summaryColumns = [
                { Header: "Emp Id", accessor: 'Emp Id' },
                { Header: "Emp Name", accessor: 'Emp Name' },
                { Header: "#Present", accessor: '#Present' },
                { Header: "#Absent", accessor: '#Absent' },
                { Header: "#Work", accessor: '#Work' },
                { Header: "View", accessor: 'View' }
              ];


              self.setState({
                summarytableData: self.state.summarytableData,
                summaryColumns: self.state.summaryColumns
              })




            } else {

              $("#exceldownloadbutton").hide();
            }

            function zeroPad(num) {
              var str = String(num);
              if (str.length < 2) {
                return '0' + str;
              }
              return str;
            }

            // assuming your time strings will always be (H*:)(m{0,2}:)s{0,2} and never negative
            function totalTimeString(timeStrings) {
              var totals = timeStrings.reduce(function (a, timeString) {
                var parts = timeString.split(':');
                var temp;
                if (parts.length > 0) {
                  temp = Number(parts.pop()) + a.seconds;
                  a.seconds = temp % 60;
                  if (parts.length > 0) {
                    temp = (Number(parts.pop()) + a.minutes) + ((temp - a.seconds) / 60);
                    a.minutes = temp % 60;
                    a.hours = a.hours + ((temp - a.minutes) / 60);
                    if (parts.length > 0) {
                      a.hours += Number(parts.pop());
                    }
                  }
                }

                return a;
              }, {
                  hours: 0,
                  minutes: 0,
                  seconds: 0
                });

              // returned string will be HH(H+):mm:ss
              return [
                zeroPad(totals.hours),
                zeroPad(totals.minutes),
                zeroPad(totals.seconds)
              ].join(':');
            }

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


  DailyStaffAttedanceReport() {
    //window.location.reload();
    ReactDOM.render(
      <Router>
        <div>
          <Route
            path="/"
            component={() => <AttendanceReportMenuPage />}
          />
        </div>
      </Router>,
      document.getElementById("contentRender")
    );
    registerServiceWorker();


  }

  MonthlyStaffAttedanceReport() {

    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={() => <MonthlyAttendanceReport />} />
        </div>
      </Router>,
      document.getElementById("contentRender")
    );
    registerServiceWorker();

  }

  PeriodStaffAttedanceReport() {

    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={() => <PeriodAttendanceReport />} />
        </div>
      </Router>,
      document.getElementById("contentRender")
    );
    registerServiceWorker();

  }

  DownloadExcel() {

    var createXLSLFormatObj = [];

    /* XLS Head Columns */
    var xlsHeaderMain = ["MONTHLY  ATTENDANCE REPORT LIST" + " [ " + this.state.monthName + " " + this.state.year + " ]" + " - TEACHER "];
    createXLSLFormatObj.push(xlsHeaderMain);

    /* XLS Head Columns */
    var xlsHeader = ["Date", "EmployeeId", "Name",
      "CheckIn", "CheckOut", "Duration", "Status"];
    createXLSLFormatObj.push(xlsHeader);

    var indexValue = 0;




    var listInnerRowData = [];

    for (var z = 0; z < xlsRows.length; z++) {

      if (xlsRows[z] != "+") {
        listInnerRowData.push(xlsRows[z]);
      } else {
        createXLSLFormatObj.push(listInnerRowData);
        listInnerRowData = [];
      }
      indexValue = z;
    }
    var emptyRowData = [];
    createXLSLFormatObj.push(emptyRowData);

    var xlsHeaderMain = ["MONTHLY ATTENDANCE REPORT SUMMARY"];
    createXLSLFormatObj.push(xlsHeaderMain);

    /* XLS Head Columns */
    var xlsHeader = ["EmployeeId", "Name", "PresentCount",
      "AbsentCount", "TotalWrkHr"];
    createXLSLFormatObj.push(xlsHeader);

    var summaryInnerRowData = [];

    for (var i = 0; i < xlsSummaryRows.length; i++) {
      if (xlsSummaryRows[i] != "+") {
        summaryInnerRowData.push(xlsSummaryRows[i]);
      } else {
        createXLSLFormatObj.push(summaryInnerRowData);
        summaryInnerRowData = [];
      }
    }



    /* File Name */
    var filename = "TeacherMonthlyAttendanceReport.xlsx";

    /* Sheet Name */
    var ws_name = "MonthlyAttendanceSheet";

    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);

    var newIndexValue = Number(indexValue) + 4;
    newIndexValue = Number(newIndexValue) / 8;
    newIndexValue = Math.round(newIndexValue);
    newIndexValue = Number(newIndexValue) + 3;

    //alert("INDEX VALUE :"+newIndexValue);

    /* merge cells A1:B1 */
    var merge = { s: { r: 0, c: 0 }, e: { r: 0, c: 8 } };

    /* merge cells A1:B1 */
    var merge1 = { s: { r: newIndexValue, c: 0 }, e: { r: newIndexValue, c: 8 } };

    /* add merges */
    if (!ws['!merges']) ws['!merges'] = [];
    ws['!merges'].push(merge);

    /* add merges */
    if (!ws['!merges']) ws['!merges'] = [];
    ws['!merges'].push(merge1);

    /* set column width */
    var wscols = [
      { wch: 15 }, //DATE
      { wch: 10 }, //ID
      { wch: 50 }, //NAME
      { wch: 25 }, //ROLE
      { wch: 25 }, //DEPT
      { wch: 15 }, //CHECKIN
      { wch: 15 }, //CHECOUT
      { wch: 10 }, //DURATION
      { wch: 10 }, //STATUS
      { wch: 15 }, //TYPE
      ,
      { hidden: true }, // hide column,

    ];

    /* set row height */
    var wsrows = [
      { hpt: 25 }, // "points"
      //	{hpx: 16}, // "pixels"
      ,
      //	{hpx: 24, level:3},
      //	{hidden: true}, // hide row
      //	{hidden: false}
    ];

    /*add column width */
    ws['!cols'] = wscols;

    /* add row height */
    ws['!rows'] = wsrows;

    /* Add worksheet to workbook */
    XLSX.utils.book_append_sheet(wb, ws, ws_name);

    /* Write workbook and Download */
    XLSX.writeFile(wb, filename, { cellStyles: true });



  }



  DownloadExcelSummary() {



    var createXLSLFormatObj = [];

    /* XLS Head Columns */
    var xlsHeaderMain = ["MONTHLY ATTENDANCE REPORT SUMMARY" + " [ " + this.state.monthName + " " + this.state.year + " ]" + " - TEACHER "];
    createXLSLFormatObj.push(xlsHeaderMain);

    /* XLS Head Columns */
    var xlsHeader = ["EmployeeId", "Name", "PresentCount",
      "AbsentCount", "TotalWrkHr"];
    createXLSLFormatObj.push(xlsHeader);

    var summaryInnerRowData = [];

    for (var i = 0; i < xlsSummaryRows.length; i++) {
      if (xlsSummaryRows[i] != "+") {
        summaryInnerRowData.push(xlsSummaryRows[i]);
      } else {
        createXLSLFormatObj.push(summaryInnerRowData);
        summaryInnerRowData = [];
      }
    }




    /* File Name */
    var filename = "TeacherMonthlyAttendanceReportSummary.xlsx";

    /* Sheet Name */
    var ws_name = "MonthlyAttendanceSheet";

    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);


    /* merge cells A1:B1 */
    var merge = { s: { r: 0, c: 0 }, e: { r: 0, c: 8 } };


    /* add merges */
    if (!ws['!merges']) ws['!merges'] = [];
    ws['!merges'].push(merge);


    /* set column width */
    var wscols = [

      { wch: 10 }, //ID
      { wch: 50 }, //NAME
      { wch: 10 }, //PRESENT COUNT
      { wch: 10 }, //ABSENT COUNT
      { wch: 10 }, //DURATION

      ,
      { hidden: true }, // hide column,

    ];

    /* set row height */
    var wsrows = [
      { hpt: 25 }, // "points"
      //	{hpx: 16}, // "pixels"
      ,
      //	{hpx: 24, level:3},
      //	{hidden: true}, // hide row
      //	{hidden: false}
    ];

    /*add column width */
    ws['!cols'] = wscols;

    /* add row height */
    ws['!rows'] = wsrows;

    /* Add worksheet to workbook */
    XLSX.utils.book_append_sheet(wb, ws, ws_name);

    /* Write workbook and Download */
    XLSX.writeFile(wb, filename, { cellStyles: true });



  }


  onRowClick = (state, rowInfo, column, instance) => {
    var self = this;
    return {

      onClick: (e, handleOriginal) => {

        if (column.Header == "View") {

          self.state.data = [];
          self.state.columns = [];
          dataTableDataCount = 0;

          if (rowInfo != undefined) {

            var empId = rowInfo.original["Emp Id"];
            $("#empListData").show();



            for (var k = 0; k < employeearray.length; k++) {
              var temp = JSON.parse(employeearray[k]);

              while (temp.employeeId == empId) {

                self.state.data[dataTableDataCount] = {
                  "Date": temp.date,
                  "Id": temp.employeeId,
                  "Name": temp.name,
                  "CheckInTime": temp.checkinTime,
                  "CheckOutTime": temp.checkoutTime,
                  "WrkHr": temp.totalWorkHour,
                  "Status": temp.status
                }
                dataTableDataCount = Number(dataTableDataCount) + 1;
                break;
              }

            }


            self.state.columns = [
              { Header: "Date", accessor: "Date" },
              { Header: "Id", accessor: "Id" },
              { Header: "Name", accessor: "Name" },
              { Header: "CheckInTime", accessor: "CheckInTime" },
              { Header: "CheckOutTime", accessor: "CheckOutTime" },
              { Header: "WrkHr", accessor: "WrkHr" },
              { Header: "Status", accessor: "Status" },
            ]

            self.setState({
              data: self.state.data,
              columns: self.state.columns
            })


          }

        }

      }

    };
  };



  render() {
    const downloadButtonData = <Invoice_xlDownldBtn/>;
    return (
      <div
        className="container attcont_div" >

        <h4 style={{ textAlign: "center" }}>
          Monthly Report - Staff
        </h4>

        <div class="btn-group btn-group-justified attheadmenu" >
          <a href="#" class="btn btn-primary" onClick={() => this.DailyStaffAttedanceReport()}>Daily</a>
          <a href="#" class="btn btn-primary" onClick={() => this.MonthlyStaffAttedanceReport()}>Monthly</a>
          <a href="#" class="btn btn-primary" onClick={() => this.PeriodStaffAttedanceReport()}>Period</a>
        </div>

        {/* <ul class="nav nav-tabs nav-justified"  id="horMenunew"
            style={{
              backgroundColor: "#05a4b5",color:"white",
              textAlign: " center",
              padding: "10px 0px!important",
              
            }}>
   
    <li ><a style={{ padding: "10px 0px",color:"white" }}
                className=" target " href="#"onClick={() => this.DailyStaffAttedanceReport()}>Daily</a></li>
    <li class="active"><a style={{ padding: "10px 0px",color:"black" }}
                className=" target " href="#"onClick={() => this.MonthlyStaffAttedanceReport()}>Monthly</a></li>
    <li ><a style={{ padding: "10px 0px",color:"white" }}
                className=" target " href="#"onClick={() => this.PeriodStaffAttedanceReport()}>Period</a></li>
  </ul> */}


        <div class="btn-group" style={{ marginBottom: "0%" }}>
          <label for="month">Month: </label>
          <input
            type="text"
            id="month"
            name="month"
            style={{ color: "black", marginBottom: "10px" }}
            class="monthPicker form-control"
            autocomplete="off"
          />
        </div>

  
  <div id="exceldownloadbutton " className="montlybtn">
<div className="reactIcon_Dcls">
     <ReactHTMLTableToExcel
       id="test-table-xls-button"
       className="download-table-xls-button1 "
       table="tableHeadings"
       filename="Role_List"
       sheet="tablexls"
      buttonText={downloadButtonData}   
       />
            <button class="download-table-xls-button1" href="#" onClick={() => this.DownloadExcelSummary()}><i class="fa fa-file-pdf-o"></i></button>

        </div>
        </div>

       
            <div class="form-horizontal form-bordered" style={{paddingBottom:"10px"}}>
              <div class="text-right mt-bot">
                <SiteDropDown onSiteDropDown={this.handleSite} data={this.state.site} />
              </div>
            </div>
          <h4 className="centerAlign" id="tableHeadingssummary" style={{ textAlign: "center" }}>Summary</h4>


          <ReactTable style={{ overflow: "auto" }}
           data={this.state.summarytableData}
            columns={this.state.summaryColumns}
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



          <div id="empListData">
            <h4 className="centerAlign" id="detailReportHeader" style={{ textAlign: "center" }}>Detailed Report List</h4>

            <ReactTable style={{ overflow: "auto", marginBottom: "5%" }} 
            id="reactTable" data={this.state.data}
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
          </div>


        </div>

        <div className="row" style={{ paddingBottom: "2%", margin: "12px" }}>
          <div class="col-sm-11 col-lg-11 col-md-11 "></div>

          <div class="col-sm-1 col-lg-1 col-md-1 ">
            <a id="goTop" style={{ textAlign: "right" }} href='#top'><span class="glyphicon glyphicon-circle-arrow-up"></span>Go Top</a>


          </div>
        </div>









      </div>
    );
  }
}
export default MonthlyAttendanceReport;
