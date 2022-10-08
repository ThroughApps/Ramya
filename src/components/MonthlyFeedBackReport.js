import React, { Component } from 'react';
import logo from './logo.svg';
import $ from 'jquery';
import * as XLSX from 'xlsx';
import { confirmAlert } from 'react-confirm-alert';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import MobileDetect from 'mobile-detect/mobile-detect';
import CryptoJS from 'crypto-js';

import _ from 'underscore';
import { Multiselect } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';
import Case from "case";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Modal from 'react-modal';
import { EnquiryProductTypeModal } from './CommonModalPages';

import ReactTable from "react-table";
import "react-table/react-table.css";
import ReportMenuPage from './ReportMenuPage';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import moment from 'moment';
import { SiteDropDown, FilterOptions } from './SiteDropDown';
//import { GetCurrentSite, GetEmployeeSite } from './ConstSiteFunction';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
  GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import * as SiIcons from 'react-icons/si';
import {ReportIcons, Delete_DownloadIcons, Invoice_xlDownldBtn} from './ServiceRegistration/IconComponents';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


var dataList = [];
const ct = require('countries-and-timezones');


var days1;

class MonthlyFeedBackReport extends Component {

  constructor() {
    super()
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8);


    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    var year = today.getFullYear();
    var month = (today.getMonth() + 1);

    var fromDate = new Date(today.getFullYear(), today.getMonth(), 1);

    var toDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    fromDate = moment(fromDate).format("YYYY-MM-DD");
    toDate = moment(toDate).format("YYYY-MM-DD");

    var monthName = moment().month(month - 1).format('MMMM');



    this.state = {
      companyId: companyId,
      companyName: companyName,
      date: date,
      data: [],
      columns: [],
      year: year,
      month: month,
      fromDate: fromDate,
      toDate: toDate,
      monthName: monthName,
      dispyear: year,
      site: GetCurrentSite(),
    }
  }

  componentDidMount() {
   
    SetCurrentPage("MonthlyFeedBackReport");
    var self = this;




    $(".btn-default").css("background-color", "#05a4b5");
    $(".btn-default").css("color", "white");

    $('.checkboxclass').prop('checked', false);



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



    this.GetReportData();

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

    this.SubmitFunc();
  }

  SubmitFunc() {

    var self = this;

    self.state.data = [];
    self.state.columns = [];

    self.setState({
      data: self.state.data,
      columns: self.state.columns

    })

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

        this.GetReportData()

      }
    }



  }



  GetReportData() {

    var self = this;


    self.state.data = [];
    self.state.columns = [];

    self.setState({
      data: self.state.data,
      columns: self.state.columns

    })

    var no = 0;


    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
        year: this.state.year,
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        empSites: GetEmployeeSite()
      }),
      url: "http://15.206.129.105:8080/ThroughBooksCOAPI/feedback/MonthlyFeedBackReport",
      // url: "http://localhost:8081/EmployeeAttendenceAPI/MandatoryFieldsConfig/GetAllFieldsData",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {
        dataList = data.feedbackList;
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
    var no = 0;
    var self = this;
    self.state.data = [];
    if (result.length != 0) {
      $.each(result, function (i, item) {

        no = Number(no) + Number(1);
        self.state.data.push({
          "SNo": no,
          "Invoice Id": item.invoiceNo,
          "Service Date": item.serviceDate,
          "FeedBack Date": item.date,
          "Ratings": item.ratings,
          "Comments": item.comments,
          "Customer Name": item.customerName,
          "FeedBack Mode": item.feedBackMode,
          "Site": item.site
        });

      });

      self.state.columns = self.getColumns();

      self.setState({
        data: self.state.data,
        columns: self.state.columns,
      });

    }

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


  getColumns() {
    return Object.keys(this.state.data[0]).map(key => {
      if (
        key != "CustomerId" &&
        key != "rowopted"

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



  render() {
	
    const downloadButtonData = <Invoice_xlDownldBtn/>;  

    return (

      <div className="container" >

        <div  className="repot_headercls">
          <div class=" ">
            <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
          </div>
          <div class="report_card_header">
            <h3 id="reportHeader" >FeedBack Report <span className="centerAlign hideContent"> for {this.state.monthName} {this.state.dispyear}</span>
            </h3>
          </div>
          <div  class="report_reactIcon_Dcls">
          <button type="button" id="print" style={{marginTop:"10px"}} class="btn btn-default btn_rpt_print "
              onClick={() => this.printdiv('printarea')} >
              <i class="fa fa-print" aria-hidden="true"
                style={{ fontSize: "17px", border: "none" }}> Print</i></button>
                <ReactHTMLTableToExcel
                                id="test-table-xls-button1"
                                className="download-table-xls-button1"
                                table="tableHeadings"
                                filename="FutureAppoinment_List"
                                sheet="tablexls"
                                buttonText={downloadButtonData}
                            />
          </div>
        </div>
        <div className="" id="printarea " >

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
              <div>
                <SiteDropDown onSiteDropDown={this.handleSite}
                  data={this.state.site} />
              </div>

              {/*  <div class="buttonright_report" >
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



          <div class="" >
            {/*  <h3 style={{ textAlign: "center" }}>FeedBack Report</h3>


          <div class="btn-group" style={{ marginBottom: "0%" }}>
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
          </div> 
              <h4 className="centerAlign " style={{ textAlign: "center" }}><span className="centerAlign hideContent">  {this.state.monthName} {this.state.dispyear}</span> </h4>

*/}




            <div >

              <ReactTable
                id="reportTable"
                data={this.state.data}
                columns={this.state.columns}
                noDataText="No Data Available "
                filterable
                defaultPageSize={10}
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
                // getTdProps={this.onColumnClick}
                getTdProps={this.onTrRowClickNew}
                getTrProps={(state, rowInfo, column) => {
                  return {
                    style: {
                      backgroundColor: rowInfo ? rowInfo.original.rowopted === "yes" ? 'rgb(164, 23, 107)' : '' : '',
                      color: rowInfo ? rowInfo.original.rowopted === "yes" ? 'white' : '': ''
                    }
                  }
                }}

              /*   getTrProps={(state, rowInfo) => {
   
                   if (rowInfo && rowInfo.row) {
                     return {
                       onClick: (e) => {
                       
                         if (rowInfo !== undefined) {
                           var self = this;
                           self.state.optedData= this.onTrRowClick(self, state, rowInfo);
                           console.log("OPTED DATA :",self.state.optedData);
                         }
   
                        /* if (this.state.selected.indexOf(rowInfo.index) >= 0 ) {
                           var selected = this.state.selected;
                           selected.splice(selected.indexOf(rowInfo.index), 1);
                           this.setState({ selected: selected });
                       } else {
                           var selected = this.state.selected;
                           selected.push(rowInfo.index);
                           this.setState({ selected: selected });
                       }
                       *
                         if(self.state.optedData=="Yes"){
                             var selected = this.state.selected;
                             selected.push(rowInfo.index);
                             this.setState({ selected: selected });
                     }else if(self.state.optedData=="No" && _.contains(this.state.selected,rowInfo.index)){
   
                       var selected = this.state.selected;
                       selected.splice(selected.indexOf(rowInfo.index), 1);
                       this.setState({ selected: selected });
   
                     }
   
                   },
                   style: {
                       background: this.state.selected.indexOf(rowInfo.index) >= 0 ? '#00afec' : '',
                  //     color: this.state.selected.indexOf(rowInfo.index) >= 0 ? 'white' : 'black'
                   }
                        },
   
                       style: {
                         background: _.contains(rowIndexArray, rowInfo.index) ? '#00afec' : _.contains(rowIndexRemoveArray, rowInfo.index) ? "" : "",
   
                       //  color: rowInfo.index === this.state.selected ? 'white' : 'black'
                       } 
                     }
   
                   } else {
                     return {}
                   }
                 }} */



              />
            </div>

          </div>

        </div>
      </div >


    );
  }
}

export default MonthlyFeedBackReport;