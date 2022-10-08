import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import SalesReportEdit from './SalesReportEdit';
import SalesReportDisplay from './SalesReportDisplay';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import SalesReportUpdate from './SalesReportUpdate';
// import 'sweetalert2/src/sweetalert2.scss';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './DownloadButton.css';
import "./MainPageRedirectButton.css";
import SaleOrder1 from './SaleOrder';
import ReportMenuPage from './ReportMenuPage';
import moment from 'moment';
import { SiteDropDown, FilterOptions } from './SiteDropDown';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
import * as SiIcons from 'react-icons/si';
import {Double_BackButtonComponent} from'./ServiceRegistration/ButtonComponent';
import { Invoice_xlDownldBtn} from './ServiceRegistration/IconComponents';

var dataList = [];
var days1;
class AppointmentsHistory extends Component {
  constructor() {
    super()

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)


    this.state = {
      companyId: companyId,
      data: [],
      columns: [],
      site: GetCurrentSite(),

    };

    this.setState({
      companyId: companyId,
    })

  }


  componentDidMount() {

  SetCurrentPage("AppointmentsHistory");

    window.scrollTo(0, 0);

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

    this.GetMonthData();

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


    this.GetAppointmentsHistoryFunc();
  }

  GetAppointmentsHistoryFunc() {

    var self = this;



    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        empSites: GetEmployeeSite()
      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/AppointmentReport/GetAppointmentHistory",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        console.log("Data ",data);
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


  getColumns() {

    return Object.keys(this.state.data[0]).map(key => {
      if (

        key != "Gender" &&
        key != "Service Booking Mode" &&
        key != "Service BookedBy"
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
    var self = this;
    self.state.data = [];
    self.state.columns = [];
    if (result.length != 0) {

      var no = 0;
      $.each(result, function (i, item) {
        no = Number(no) + 1;

        var status = "Active";
        if (item.status == "1") {
          status = "Cancelled";
        } else if (item.status == "2") {
          status = "Confirmed";
        } else if (item.status == "4") {
          status = "Rescheduled";
        } else if (item.status == "5") {
          status = "Reedemed";
        }

        var serviceTime = item.appointmentTime + " - " + item.appointmentEndTime;

        self.state.data[i] = {
          "SNo": no,
          "Booking Date": item.bookingDate,
          "Service Booked Date": item.appointmentDate,
          "Customer Name": item.customerName,
          "Contact No": item.mobileNo,
     //     "Timings": serviceTime,
          "Service": item.service,
     //     "Employee": item.employeedetails.split(",")[0] + " " + item.employeedetails.split(",")[1],
          "Status": status,
          "Description": item.description,
      //    "Gender": item.gender,
          "Service Booking Mode": item.modeofAppointment,
          "Service BookedBy": item.appointmentBy,
          "Site": item.site,
          "View": < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
            <i class="glyphicon glyphicon-eye-open" style={{
              border: "none",
              padding: "6px 7px 5px 7px",
              fontSize: "1em",
              color: "white",
              borderRadius: "50px",
              backgroundColor: "#a4176b"
            }}></i>
          </span></div>,

        };




      });

      self.state.columns = self.getColumns();

    }


    self.setState({
      data: self.state.data,
      columns: self.state.columns,
    });
  }

  onRowClick = (state, rowInfo, column, instance) => {
    var self = this;
    return {

      onClick: (e, handleOriginal) => {


        if (column.Header == "View") {

          if (rowInfo != undefined) {


            self.state.bookingDate = rowInfo.original["Booking Date"];
            self.state.appointmentDate = rowInfo.original["Service Booked Date"];
            self.state.customerName = rowInfo.original["Customer Name"];// get current row 1st TD value
            self.state.contactNo = rowInfo.original["Contact No"];
        //    self.state.timings = rowInfo.original["Timings"];
            self.state.service = rowInfo.original["Service"];
         //   self.state.employeedetails = rowInfo.original["Employee"];
            self.state.status = rowInfo.original["Status"];
          //  self.state.gender = rowInfo.original["Gender"];
            self.state.modeofAppointment = rowInfo.original["Service Booking Mode"];
            self.state.appointmentBy = rowInfo.original["Service BookedBy"];


            self.setState({
              bookingDate: self.state.bookingDate,
              appointmentDate: self.state.appointmentDate,
              customerName: self.state.customerName,
              contactNo: self.state.contactNo,
      //      timings: self.state.timings,
              service: self.state.service,
       //     employeedetails: self.state.employeedetails,
              status: self.state.status,
       //     gender: self.state.gender,
              modeofAppointment: self.state.modeofAppointment,
              appointmentBy: self.state.appointmentBy
            })




            $("#myModal1").modal('show');

            /*  ReactDOM.render(<SalesReportDisplay id={self.state.id}
                date={self.state.date} userName={self.state.userName} contact={self.state.contact}
                status={self.state.status} balanceAmt={self.state.balanceAmt} subtotal1={self.state.subtotal1} customerId={self.state.customerId} companyName={self.state.companyName} />, document.getElementById("contentRender"));
            */
          }

        }
      }
    };
  };

  render() {
    const downloadButtonData = <Invoice_xlDownldBtn/>; 


    return (

      <div class="container">
        
        <div className="repot_headercls">
                   <div className="">
    <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
                    </div>
                    <div class="report_card_header">
              <h3 id="reportHeader" >Booked Service History</h3>
                </div>
                <div className="report_reactIcon_Dcls">
            
                            <ReactHTMLTableToExcel
                                id="test-table-xls-button1"
                                className="download-table-xls-button1"
                                table="tableHeadings"
                                filename="AppoinmentHistory_List"
                                sheet="tablexls"
                                buttonText={downloadButtonData}
                            />
                        </div>
                        </div>
     

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
      
      
                <div class="repot_sub_dwldbtn_cls_daily">
                  <div style={{padding:"0px"}} >
                  <SiteDropDown onSiteDropDown={this.handleSite} data={this.state.site} />
                </div>
      
          {/*       <div class="buttonright_report" >
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn_exceldld"
                    table="tableHeadings"
                    filename="YearlyEstimate_List"
                    sheet="tablexls"
                    buttonText={downloadButtonData}
                  />
                </div> */}
                </div>
              </div>


        <div class="">
         {/*  <div class="row">
            <div class="col-sm-2 ">
              <ul class="previous disabled" id="backbutton"
                style={{
                  backgroundColor: "#05a4b5",
                  float: "none",
                  display: "inline-block",
                  marginLeft: "5px",
                  borderRadius: "5px",
                  padding: "3px 7px 3px 7px",
                  color: "white"
                }}>
                <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></ul>

            </div>
            <div class="col-sm-10 ">
              <div class="card-header">
                <h3 id="companyHeader" style={{ marginLeft: "150px" }}> {this.state.companyName}</h3>

                <h4 id="reportHeader" style={{ marginLeft: "130px" }}>Booked Service History</h4>


              </div>
            </div>
          </div>
 */}

     {/*      <div class="btn-group" style={{ marginBottom: "0%" }}>
            <label for="month">Select Month and Year:  </label>
            <input
              type="text"
              id="month"
              name="month"
              style={{ color: "black", marginBottom: "0px" }}
              class="monthPicker form-control"
              autocomplete="off"
              placeholder="Select Month And Year"
            />
            <div class="card-body">
              <div class="form-horizontal form-bordered">
                <div class="text-right">
                  <SiteDropDown onSiteDropDown={this.handleSite} data={this.state.site} />
                </div>
              </div>
            </div>
          </div> */}

          <div>
            <div class="card-body">

              <div>

               {/*  <div className="row">
                  <div className="col-sm-4 col-lg-8 col-md-8">

                  </div>

                  <div className="col-sm-4 col-lg-2 col-md-2">


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
                  defaultPageSize={5}
                  className="-striped -highlight reactTable_cls "
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


                <div style={{ opacity: "1" }} class="modal fade" id="myModal1"  >
                  <div style={{ marginTop: "158px" }} class="modal-dialog">

                    <div class="modal-content">
                      <div class="modal-header">
                        <h4 class="modal-title" style={{ align: "center", display: "contents" }}>Customer Details</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>

                      </div>
                      <div class="modal-body" >
                        <div class="form-body">


                          <form class="form-horizontal form-bordered" name="submissions">
                            <div className={"form-group"}>
                              <div class="col-sm-10" style={{ textAlign: "-webkit-center" }}>
                                <table id="customermodaltable">
                                  <tr><td>Customer Name</td><td style={{ paddingLeft: "31px" }}>{this.state.customerName}</td></tr>
                                  <tr><td>Contact No</td><td style={{ paddingLeft: "31px" }}>{this.state.contactNo}</td></tr>
                                  {/* <tr><td>Gender</td><td style={{paddingLeft: "31px"}}>{this.state.gender}</td></tr> */}
                                  <tr><td>Booking Date</td><td style={{ paddingLeft: "31px" }}>{this.state.bookingDate}</td></tr>
                                  <tr><td>Service Booked Date</td><td style={{ paddingLeft: "31px" }}>{this.state.appointmentDate}</td></tr>
                                  <tr><td>Timings</td><td style={{ paddingLeft: "31px" }}>{this.state.timings}</td></tr>
                                  <tr><td>Service</td><td style={{ paddingLeft: "31px" }}>{this.state.service}</td></tr>
                                  <tr><td>Employee Details</td><td style={{ paddingLeft: "31px" }}>{this.state.employeedetails}</td></tr>
                                  <tr><td>Service Booking Mode</td><td style={{ paddingLeft: "31px" }}>{this.state.modeofAppointment}</td></tr>
                                  <tr><td>Service BookedBy</td><td style={{ paddingLeft: "31px" }}>{this.state.appointmentBy}</td></tr>
                                  <tr><td>Booking Status</td><td style={{ paddingLeft: "31px" }}>{this.state.status}</td></tr>
                                </table>
                              </div>
                            </div>


                          </form>
                        </div>


                      </div>
                    </div>

                  </div>

                </div>

              </div>


            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default AppointmentsHistory;
