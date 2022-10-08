import React, { Component } from 'react';

import $ from 'jquery';
import ReactDOM from 'react-dom';

import CryptoJS from 'crypto-js';

import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
  GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
  
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import PeriodAttendanceReport from './PeriodAttendanceReport';


class PeriodAttendanceReportDisplay extends Component {


  constructor(data) {
    super(data)

    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    this.state = {
      date: today,


    };
  }
  componentDidMount() {
    SetCurrentPage("PeriodAttendanceReportDisplay"); 
    window.scrollTo(0, 0);


   
    var Presentcount = 0;
    var Leavecount = 0;
    var Absentcount = 0;
    var staffId = null;
    var staffName;
    var totalWorkHour = "00:00:00";
    var status;
    var color;
    var tab1;
    //var tab = '<thead><tr class="headcolor"><th>Date</th><th>Id</th><th>Name</th><th>Desgination</th><th>Status</th></tr></thead>';

    var j = 1, k = 1;

    var staffName = null; var tabe;
    if (this.props.data.staffRetrievelist.length != 0) {
      var summaryIn = '<thead><tr class="headcolor"><th>Id</th><th>Name</th><th>#Present</th><th>#Absent</th><th>#Leave</th></tr></thead>';
      $("#summary").append(summaryIn);
   
      $.each(this.props.data.staffRetrievelist, function (i, item) {
      if (staffName == null) {
        staffId = item.staffId;
        staffName = item.staffName;
      }
      if (item.status == "Present") {
        Presentcount++;

      } else if (item.status == "Absent") {
        Absentcount++;
        status = "Absent";
      } else if (item.status == "Leave") {
        Leavecount++;

      } else {
        status = "Holiday";

      }
    //  alert("staffName p" + item.staffName+" s"+staffName+"i "+k)
      if ((staffName == item.staffName) && (k == 1)) {          //count block
     //   alert("staffName m" + item.staffName+" s"+staffName)
     
        tab1+='<th class=" verticalTableHeader " style="color:green" >'+item.date+'</th>';

      }
      else{
        k=2;
      }

        
      if (j == 1) {
        tabe += '<tbody><tr><td>' + item.staffName + ' </td>';
        j = 2;
      }
       
      if (staffName == item.staffName) {
       // alert("staffNamey" + item.staffName)

        tabe += '<td>' + item.status + '</td>';
      } else {
        var summary = '<tbody id= "myTable" ><tr class="success" ><td>' + staffId + '</td><td>' + staffName + '</td><td>' + Presentcount + '</td><td>' + Absentcount + '</td><td>' + Leavecount + '</td></tr></tbody>';

          $("#summary").append(summary);
          staffId = item.staffId;
        Presentcount = 0;
        Leavecount = 0;
        Absentcount = 0;
        if (item.status == "Present") {
          Presentcount++;


        } else if (item.status == "Absent") {
          Absentcount++;

        } else if (item.status == "Leave") {
          Leavecount++;

        } else {
          color = "#428bcab3";
        }
           tabe+='</tr></tbody>';
       // alert("staffName" + item.staffName)
        $("#tableDynamic").append(tabe);
        tabe = '';

        staffName = item.staffName;
      //  alert("staffName" + staffName)

        tabe += '<tbody><tr><td>' + item.staffName + '</td><td>' + item.status + '</td>';
      }

    });
    $("#tableheader").append("Name").append(tab1);
    $("#tableDynamic").append(tabe);
    var summary = '<tbody id= "myTable" ><tr class="success" ><td>' + staffId + '</td><td>' + staffName + '</td><td>' + Presentcount + '</td><td>' + Absentcount + '</td><td>' + Leavecount + '</td></tr></tbody>';

    $("#summary").append(summary);
  }
  else {
    $("#tableHeadings").append('<h3 align="center">No Data</h3>');
    $("#sum").hide();
  }
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

  BackbtnFunc() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={PeriodAttendanceReport} />

        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }

  render() {

    return (

      <div class="container">
        <ul class="previous disabled" id="backbutton"
          style={{
            backgroundColor: "#05a4b5",color:"white",
            float: "none",
            display: "inline-block",
            marginLeft: "5px",
            borderRadius: "5px",
            padding: "3px 7px 3px 7px",
            marginTop:"13px"
          }}>
          <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></ul>

          <h3 className="centerAlign" style={{ textAlign: "center" }}>Period Attendance Report</h3>
     
       
          <input style={{
          color: "black", width: "100%",
          padding: "12px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
          type="text" id="myInput" placeholder="Search.." title="Type in a name" />

          <div id="tableOverflow">
            <h3 className="centerAlign" id="sum"  style={{ textAlign: "center" }}>Summary</h3>


            <table class="table" id="summary" style={{ marginBottom: "2%" }}>

            </table>
          </div>



          <div id="tableOverflow">
            <h3 className="centerAlign" style={{ textAlign: "center" }}>Detailed Report List</h3>
            <table class="table" id="tableDynamic" style={{ marginBottom: "10%" }}>
          <thead id="tableheader">
          </thead>

        </table>

          </div>
      
      </div>
    );
  }

}

export default PeriodAttendanceReportDisplay;
