
import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import "./DownloadButton.css";
import "./MainPageRedirectButton.css";
import SalaryReportDisplay from './SalaryReportDisplay';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import { GetEmployeeSite, GetCurrentSite } from './ConstSiteFunction';
import ReactTooltip from 'react-tooltip';
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import './EstimateCss.css';
import { SiteDropDown, FilterOptions } from './SiteDropDown';
import {Delete_DownloadIcons, Invoice_xlDownldBtn} from './ServiceRegistration/IconComponents';

var dataList = [];
var currentRow;
class SalaryReport1 extends Component {
  constructor(data) {
    super(data)

    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    this.state = {
      StaffId: '',
      month: '',
      columns: [],
      dataList: [],
      site: GetCurrentSite(),
    };

    this.DeleteSalary = this.DeleteSalary.bind(this);
    this.DownLoadSalaryList = this.DownLoadSalaryList.bind(this);

  }
  componentDidMount() {

    var self = this;
    $("#nodata").hide();
    $("#tableOverflow1").hide();
    window.scrollTo(0, 0);
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });
    $("ReactHTMLTableToExcel").css("background-color", "#05a4b5");
    $(".btn-default").css("background-color", "#05a4b5");

    $(".btn-default").css("color", "white");
    $("ReactHTMLTableToExcel").css("color", "white");

    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
        empSites: GetEmployeeSite()
      }),
      url: "http://15.206.129.105:8080/ThroughBooksCOAPI/Payroll/salaryreport",
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
    //search button func 
    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
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
    self.state.dataList = [];
    $("#tableHeadings").empty();
    if (result.length != 0) {
      var tab = '<thead><tr class="headcolor"><th>StaffId</th><th>StaffName</th><th>Month</th><th>TotalWorkingHrs</th><th>GeneralWorkingHrs</th><th>OTWorkingHrs</th><th>Salary</th></tr></thead>';
      $.each(result, function (i, item) {
        tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + item.staffId + '</td><td>' + item.staffName + '</td><td>' + item.month + '</td><td>' + item.totalWorkingHrs + '</td><td>' + item.workingHrs + '</td><td>' + item.otWorkingHrs + '</td><td>' + item.empTotalWorkingHrsSalary + '</td>'

          + '</tr></tbody>';


        self.state.dataList[i] = {
          "Staff Id": item.staffId,
          "Staff Name": item.staffName,
          "Month": item.month,
          "Salary Date":item.salaryCreditedDate,
          "Salary Date":item.salaryCreditedDate,
          "Total Working Hrs": item.totalWorkingHrs,
          "General Working Hrs": item.workingHrs,
          "OT Working Hrs": item.otWorkingHrs,
          "Salary": item.empTotalWorkingHrsSalary,
          "Site": item.site,
        };
      });


      $("#tableHeadings").append(tab);
      if (self.state.dataList.length > 0) {
        self.state.columns = self.GetColumns();
      }
    } else {
      $("#nodata").show();

    }

    self.setState({
      dataList: self.state.dataList,
      columns: self.state.columns
    });
    console.log("after drop down ", self.state.dataList);
  }
  GetColumns() {

    return Object.keys(this.state.dataList[0]).map(key => {
      return {
        Header: key,
        accessor: key,

      };
    });
  }



  NoAction() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={SalaryReport1} />
        </div>
      </Router>,
      document.getElementById('contentRender'));

  }
  DeleteFunc(rowIndexValue) {


    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });
    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        staffId: self.state.staffId,
        month: self.state.month,
        companyId: this.state.companyId,
      }),
      url: "http://15.206.129.105:8080/ThroughBooksCOAPI/Payroll/salaryreportDelete",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {

        var array = [...self.state.dataList]; // make a new copy of array instead of mutating the same array directly.
        array.splice(rowIndexValue, 1);
        self.state.dataList = [];
        self.state.dataList = array;
        self.setState({ dataList: array });

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
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={DashboardOverall} />


        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
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



          var staffId = rowInfo.original["Staff Id"];
          var staffName = rowInfo.original["Staff Name"];
          var month = rowInfo.original["Month"];

          this.state.staffId = staffId;
          this.state.staffName = staffName;
          this.state.month = month;
          this.setState({
            staffId: this.state.staffId,
            staffName: this.state.staffName,
            month: this.state.month,
          });

          this.state.rowIndexValue = rowInfo.index;
        },
       style: {
          background: rowInfo.index === this.state.selected ? 'rgb(66 139 202)' : '',
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



  /* ***** NEW ICON FUNCTION ************* */

  DeleteSalary() {
    var self = this;

    if (this.state.staffId === undefined) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select StaffName ',

      })
    } else {
      if (this.state.id != "") {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Do you Want to Delete ' + self.state.staffName,
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
              title: 'Cancelled Deletion Of ' + self.state.staffName,
              showConfirmButton: false,
              timer: 2000,
            })
          }
        })
      }
    }

  }

  DownLoadSalaryList() {

  }

  render() {
    // const downloadButtonData = <i style={{ color: "black" }} class="glyphicon glyphicon-download-alt" ></i>
const downloadButtonData = <Invoice_xlDownldBtn/>;
    return (

      <div class="container">

        <div className="">
          <div className="">
            <BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
          </div>
          <div className="inv_HeaderCls">
            <h3>Salary Report</h3>
          </div>
        </div>


        <div className="inv_list_cls">
        <div class="inv_list_cls_sel_search">
          <SiteDropDown onSiteDropDown={this.handleSite} data={this.state.site} />
        </div>
    

        <div className="reactIcon_Dcls">
          <Delete_DownloadIcons onDelete={this.DeleteSalary}
            onDownload={this.DownLoadSalaryList} />
                 <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button "
            table="tableHeadings"
            filename="Salary_List"
            sheet="tablexls"
            buttonText={downloadButtonData}
          />
        </div>

</div>

        <div id="tableOverflow" class="hideContent">

          <ReactTable style={{ overflow: "auto", marginBottom: "5%" }}
            data={this.state.dataList}
            columns={this.state.columns}
            noDataText="No Data Available"
            filterable
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
            getTrProps={this.onTrRowClick}
          />


          <div id="tableOverflow1">
            <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">
            </table>
          </div>

        </div>




      </div>

    );
  }

}

export default SalaryReport1;