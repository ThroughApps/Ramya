import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import CryptoJS from 'crypto-js';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import MonthlyAttendanceReport from './MonthlyAttendanceReport';
import PeriodAttendanceReport from './PeriodAttendanceReport';
import {Delete_DownloadIcons, Invoice_xlDownldBtn} from './ServiceRegistration/IconComponents';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import * as XLSX from 'xlsx';
import _ from 'underscore';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import "./SiteDropDownCSS.css"; // optional customStyles
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';


//css
import './AttenRptmenucss.css';
import { SiteDropDown, FilterOptions, EmpIdFilterOptions, EmpFilterOptions } from './SiteDropDown';
import { GetCurrentSite, GetEmployeeSite } from './ConstSiteFunction';
var dataList = [];

var report;
var employeearray = [];
var xlsRows = [];
var xlsSummaryRows = [];

class AttendanceReportMenuPage extends Component {

    constructor(data) {
        super(data)
        var today = new Date();
        var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        //  var companyType = CryptoJS.AES.decrypt(localStorage.getItem('CompanyType'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        //  var companyType = CryptoJS.AES.decrypt(localStorage.getItem('CompanyType'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)



        this.state = {
            date: today1,
            companyId: companyId,
            employeeId: employeeId,
            companyName: '',
            companyType: " ",
            data: [],
            columns: [],
            summaryData: [],
            summaryColumns: [],
            site: GetCurrentSite(),
        };
    }
    componentDidMount() {
        $("#tableHeadings").hide();
        $("#summary").hide();

        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        //  var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        // var companyId = "001";
        this.state.companyId = companyId;
        this.state.companyName = " ";
        this.setState({
            date: this.state.date,
            companyId: this.state.companyId,
            employeeId: this.state.employeeId,
            //    companyName: this.state.CompanyName,
        });
        report = "DailyReport" + this.state.date;
        var self = this;
        var category = "Staff";

        var getAttenanceData = "{'companyId':'" + this.state.companyId + "','date':'" + this.state.date + "','category':'" + category + "','data':'" + self.state.data + "'}";

        $("#exceldownloadbutton").hide();
        self.state.data = [];
        self.state.summaryData = [];

        $.ajax({
            type: 'GET',

            url: "https://wildfly.tictoks.in:443/EmployeeAttendenceAPI/AttendanceAPICall/GetAttendanceData/" + getAttenanceData,

            contentType: "application/json",
            dataType: 'json',
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
        //search button func
        $(document).ready(function () {
            $("#myInput").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                $("#myTable tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        });
        window.scrollTo(0, 0);


    }

    getColumns() {

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
        var no;
        var self = this;
        var permanentcountAbsent = 0;
        var temporarycountAbsent = 0;
        var contractcountAbsent = 0;
        var permanentcountPresent = 0;
        var temporarycountPresent = 0;
        var contractcountPresent = 0;
        var permanentcountLeave = 0;
        var temporarycountLeave = 0;
        var contractcountLeave = 0;
        var noOfPermanentEmployee = 0;
        var noOfContractEmployee = 0;
        var noOfTemporaryEmployee = 0;
        var totalPresent = 0;
        var totalAbsent = 0;
        var totalPresentAgainstAbsent = 0;
        var totalEmp = 0;
        var totalLeave = 0;
        var totalHoliday = 0;

        var status;
        var color;
        self.state.data = [];
        xlsRows = [];
        xlsSummaryRows = [];

        $("#tableHeadings").empty();
        $("#summary").empty();
        if (result.length != 0) {
            $("#exceldownloadbutton").show();
            var tab = '<thead><tr class="headcolor" style="color: white; background-color: #374850;" ><th>Id</th><th>Name</th><th>CheckIn</th><th>Location</th><th>CheckOut</th><th>Location</th></th><th>#WorkHour</th><th>Status</th></tr></thead>';
            $.each(result, function (i, item) {

                if (item.status == "P") {
                    totalPresent++;
                    totalEmp++;
                    status = "Present";

                } else if (item.status == "A") {
                    totalAbsent++;
                    totalEmp++;
                    status = "Absent";

                } else if (item.status == "L") {
                    totalLeave++;
                    totalEmp++;
                    status = "Leave";

                } else if (item.status == "H") {
                    totalHoliday++;
                    totalEmp++;
                    status = "Holiday";

                }


                // tab += '<tbody id= "myTable" ><tr style="background-color:' + color + ';" ><td>' + item.employeeId + '</td><td>' + item.name + '</td><td>' + item.department + '</td><td>' + item.employeeType + '</td><td>' + item.checkinTime + '</td><td>' + item.checkinLocation + '</td><td>' + item.checkoutTime + '</td><td>' + item.checkoutLocation + '</td><td>' + item.totalWorkHour + '</td><td>' + status + '</td><td>' + item.authorizedBy + '</td></tr></tbody>';
                if (item.checkInOutTimings != null) {
                    tab += '<tbody id= "myTable" ><tr style="background-color:' + color + ';" ><td>' + item.employeeId + '</td><td>' + item.name + '</td><td>' + item.checkinTime + '</td><td>' + item.checkinLocation + '</td><td>' + item.checkoutTime + '</td><td>' + item.checkoutLocation + '</td><td>' + item.totalWorkHour + '</td><td>' + status + '</td></tr></tbody>';

                    self.state.data[i] = {
                        "Id": item.employeeId,
                        "Name": item.name,
                        "Check In": item.checkinTime,
                        "Location": item.checkinLocation,
                        "Check Out": item.checkoutTime,
                        "Location": item.checkoutLocation,
                        "#WorkHour": item.totalWorkHour,
                        "Status": status
                    }
                    xlsRows.push(item.date);
                    xlsRows.push(item.employeeId);
                    xlsRows.push(item.name);
                    //  xlsRows.push(item.role);
                    //   xlsRows.push(item.department);
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
                    tab += '<tbody id= "myTable" ><tr class="DetailReport" style="background-color:gray;"><td>' + item.employeeId + '</td><td colspan"2" style="text-align:center;"><font color="#fff">Check In/Out Details</font></td><td colspan="9" style="text-align:left;"><font color="#fff">' + inOut + '</font></td></tr>';


                } else {
                    tab += '<tbody id= "myTable" ><tr  style="background-color:' + color + ';" ><td>' + item.employeeId + '</td><td>' + item.name + '</td><td>' + item.checkinTime + '</td><td>' + item.checkinLocation + '</td><td>' + item.checkoutTime + '</td><td>' + item.checkoutLocation + '</td><td>' + item.totalWorkHour + '</td><td>' + status + '</td></tr></tbody>';


                    self.state.data[i] = {
                        "Id": item.employeeId,
                        "Name": item.name,
                        "Check In": item.checkinTime,
                        "Location": item.checkinLocation,
                        "Check Out": item.checkoutTime,
                        "Location": item.checkoutLocation,
                        "#WorkHour": item.totalWorkHour,
                        "Status": status
                    }

                    xlsRows.push(item.date);
                    xlsRows.push(item.employeeId);
                    xlsRows.push(item.name);
                    //  xlsRows.push(item.role);
                    //   xlsRows.push(item.department);
                    xlsRows.push(item.checkinTime);
                    xlsRows.push(item.checkoutTime);
                    xlsRows.push(item.totalWorkHour);
                    xlsRows.push(item.status);
                    //   xlsRows.push(item.employeeType);
                    xlsRows.push("+");
                }
            });
            $("#tableHeadings").append(tab);
            $(".DetailReport").hide();


            if (self.state.data.length > 0) {
                self.state.columns = self.getColumns();
            }
            var summary = '<thead ><tr style="color: white; background-color: #374850;"  class="headcolor"><th>Total</th><th>Present</th><th>Absent</th><th>Leave</th><th>Holiday</th></tr></thead>';
            summary += '<tbody id= "myTable" ><tr class="success" ><td>' + totalEmp + '</td><td>' + totalPresent + '</td>'
                + '<td>' + totalAbsent + '</td><td>' + totalLeave + '</td><td>' + totalHoliday + '</td></tr></tbody>';

            self.state.summaryColumns = [
                { Header: "Total", accessor: 'Total' },
                { Header: "Present", accessor: 'Present' },
                { Header: "Absent", accessor: 'Absent' },
                { Header: "Leave", accessor: 'Leave' },
                { Header: "Holiday", accessor: 'Holiday' }
            ];

            self.state.summaryData[1] = {
                "Total": totalEmp,
                "Present": totalPresent,
                "Absent": totalAbsent,
                "Leave": totalLeave,
                "Holiday": totalHoliday
            }



            self.setState({
                summaryData: self.state.summaryData,
                summaryColumns: self.state.summaryColumns
            })


            xlsSummaryRows.push(totalEmp);
            xlsSummaryRows.push(totalPresent);
            xlsSummaryRows.push(totalAbsent);

            xlsSummaryRows.push(totalLeave);
            xlsSummaryRows.push(totalHoliday);
            xlsSummaryRows.push("+");



            $("#summary").append(summary);
        } else {
            $("#tableHeadings").append('<h3 align="center">No Data</h3>');
            $("#summary").hide();
            $("#exceldownloadbutton").hide();
        }
    }
  
    BackbtnFunc() {
        ReactDOM.render(
          <Router>
            <div>
    
              <Route path="/" component={DashboardOverall} />
    
    
            </div>
          </Router>,
          document.getElementById('contentRender'));
        registerServiceWorker();
      }

    DetailReport() {
        $(".DetailReport").show();
        $("#tableHeadings").show();
        $("#reactTable").hide();
    }

    DailyStaffAttedanceReport() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={AttendanceReportMenuPage} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }

    MonthlyStaffAttedanceReport() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={MonthlyAttendanceReport} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }

    PeriodStaffAttedanceReport() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={PeriodAttendanceReport} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }


    DownloadExcel() {

        var createXLSLFormatObj = [];

        /* XLS Head Columns */
        var xlsHeaderMain = ["DAILY ATTENDANCE REPORT LIST" + " [ " + this.state.date + " ]" + " - TEACHER "];
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

        var xlsHeaderMain = ["DAILY ATTENDANCE REPORT SUMMARY"];
        createXLSLFormatObj.push(xlsHeaderMain);




        /* XLS Head Columns */
        var xlsHeader = ["Total Teacher", "Present", "Absent",
            "Class Cancel", "Compensation"];
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
        var filename = "TeacherDailyAttendanceReport.xlsx";

        /* Sheet Name */
        var ws_name = "DailyAttendanceSheet";

        var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);

        var newIndexValue = Number(indexValue) + 4;
        newIndexValue = Number(newIndexValue) / 8;
        newIndexValue = Math.round(newIndexValue);
        newIndexValue = Number(newIndexValue) + 3;

        //  alert("INDEX VALUE :"+newIndexValue);

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













    render() {
const downloadButtonData = <Invoice_xlDownldBtn/>;
        return (

            <div className="container attcont_div" id="containerbody">



<div className="">
<div className="">
            <BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
          </div>
          <div class="inv_HeaderCls">
            <h3>Daily Report - staff {this.state.date}</h3>

            </div>
            </div>

                <div class="btn-group btn-group-justified attheadmenu">
                    <a href="#" class="btn btn-primary " onClick={() => this.DailyStaffAttedanceReport()}>Daily</a>
                    <a href="#" class="btn btn-primary " onClick={() => this.MonthlyStaffAttedanceReport()}>Monthly</a>
                    <a href="#" class="btn btn-primary " onClick={() => this.PeriodStaffAttedanceReport()}>Period</a>
                </div>

                {/*     <ul class="nav nav-tabs nav-justified" id="horMenunew"
                    style={{
                        backgroundColor: "#05a4b5",
                        color: "white",
                        textAlign: " center",
                        padding: "10px 0px!important",

                    }}>

                    <li class="active"><a style={{ padding: "10px 0px", color: "black" }}
                        className=" target " href="#" onClick={() => this.DailyStaffAttedanceReport()}>Daily</a></li>
                    <li><a style={{ padding: "10px 0px", color: "white" }}
                        className=" target " href="#" onClick={() => this.MonthlyStaffAttedanceReport()}>Monthly</a></li>
                    <li><a style={{ padding: "10px 0px", color: "white" }}
                        className=" target " href="#" onClick={() => this.PeriodStaffAttedanceReport()}>Period</a></li>
                </ul> */}

                {/* <input style={{ color: "black" }} type="text" id="myInput" class="form-control" placeholder="Search.." title="Type in a name" />
 */}

<div class="form-horizontal form-bordered SiteDropDown">
                        <div class="text-right">
                            <SiteDropDown onSiteDropDown={this.handleSite} data={this.state.site} />
                        </div>
                    </div>

                <div id="tableOverflow">
                
                    <h4 className="centerAlign" style={{ textAlign: "center" }}>Summary</h4>

                    <table class="table" id="summary" style={{ marginBottom: "2%", color: "black" }}>


                    </table>

                    <ReactTable style={{ overflow: "auto" }} data={this.state.summaryData}
                        columns={this.state.summaryColumns}
                        noDataText="No Data Available"
                        filterable={false}
                        defaultPageSize={2}
                        className="-striped -highlight"
                        defaultFilterMethod={(filter, row, column) => {
                            const id = filter.pivotId || filter.id;
                            return row[id] !== undefined
                                ? String(row[id])
                                    .toLowerCase()
                                    .indexOf(filter.value.toLowerCase()) !== -1
                                : true;
                        }}
                        showPaginationTop={false}
                        showPaginationBottom={false}


                    />

                </div>
              
                {/* <h3 className="centerAlign" style={{ textAlign: "center" }}>Detailed Report List</h3>
                <div style={{ paddingBottom: "20px", marginBottom: "10px" }}>
                    <button style={{ float: "right" }} onClick={() => this.DetailReport()} class="DetailReportSelect">Detailed Report</button>
                </div>
                <div id="tableOverflow">
                    <table style={{ margin: "auto", marginBottom: "10%" }} class="table" id="tableHeadings">
                    </table>
                </div> */}
                <div class="card-body">
                <div class="row" style={{marginBottom:"20px"}}>
                    <div class="col-lg-9 col-md-9 col-sm-9">
                        </div>
                    <div class="col-lg-3 col-md-3 col-sm-3">
                       
       <div className="reactIcon_Dcls">
     <ReactHTMLTableToExcel
       id="test-table-xls-button"
       className="download-table-xls-button1 "
       table="tableHeadings"
       filename="Role_List"
       sheet="tablexls"
      buttonText={downloadButtonData}   
       />
    </div>

                    </div>
                </div>
              

                <ReactTable style={{ overflow: "auto", marginBottom: "5%" }} id="reactTable" data={this.state.data}
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
        );
    }

}

export default AttendanceReportMenuPage;
