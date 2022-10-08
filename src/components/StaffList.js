
import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import VendorEntryForm from './VendorEntryForm';


import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import VendorList from './VendorList';
import ProductList from './ProductList';
import SaleOrder from './SaleOrder';
import InvoiceList from './InvoiceList';


import AddProduct from './AddProduct';
import CustomerList from './CustomerList';

import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import StaffListView from './StaffListView';
import StaffListEdit from './StaffListEdit';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './DownloadButton.css';
import "./MainPageRedirectButton.css";
import AddStaff from './AddStaff';
import { SiteDropDown, FilterOptions, EmpFilterOptions } from './SiteDropDown';
//import { GetCurrentSite, GetEmployeeSite } from './ConstSiteFunction';
import { Employee_Vendor_Customer_Icons, Invoice_xlDownldBtn } from './ServiceRegistration/IconComponents';
import ReactTooltip from 'react-tooltip';
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
  GetCurrencies,SetCurrentPage } from './ConstSiteFunction';


var dataList = [];
class StaffList1 extends Component {
  constructor(data) {
    super(data)
    var staffId1 = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    this.state = {
      contactNo: '',
      data: [],
      columns: [],
      staffId1: staffId1,
      employeeName: employeeName,
      role: role,
      site: GetCurrentSite(),
    }


    this.ViewEmp_Cust_Vend = this.ViewEmp_Cust_Vend.bind(this);
    this.DeleteEmp_Cust_Vend = this.DeleteEmp_Cust_Vend.bind(this);
    this.EditEmp_Cust_Vend = this.EditEmp_Cust_Vend.bind(this);
    this.DownLoadEmp_Cust_Vend_List = this.DownLoadEmp_Cust_Vend_List.bind(this);

  }
  componentDidMount() {

    SetCurrentPage("StaffList");

    var self = this;
    $("#nodata").hide();
    $("#tableHeadings").hide();
    window.scrollTo(0, 0);
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });
    var self = this;
    $("ReactHTMLTableToExcel").css("background-color", "#05a4b5");
    $(".btn-default").css("background-color", "#05a4b5");
    $(".btn-default").css("color", "white");
    $("ReactHTMLTableToExcel").css("color", "white");

    self.state.data = [];
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,

      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/staff/selectstaff",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {
        dataList = data.staffRetrievelist;

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

  NoAction() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={StaffList1} />
        </div>
      </Router>,
      document.getElementById('contentRender'));

  }

  handleSite = (e) => {
    this.handleSite = this.handleSite.bind(this);
    this.state.site = e.toString();
    this.setState({
      site: e.toString()
    });
    var result = EmpFilterOptions(dataList, this.state.site, "site");
    this.RendData(result);
  }
  RendData(result) {
    var no;
    var self = this;
    self.state.data = [];
    $("#tableHeadings").empty();
    if (result.length != 0) {
      var tab = '<thead><tr class="headcolor"><th>Staff Id</th>'
        + '<th>StaffName</th><th>Address</th>'
        + '<th>Contact</th><th>Designation</th><th>Salary</th>'
        + '<th>City</th><th>DOJ</th><th>Gender</th>'
        + '<th>Nationality</th><th>Date-Of-Joining</th><th>Eamil</th></tr></thead>';

      $.each(result, function (i, item) {
        tab += '<tbody id= "myTable" ><tr  id="tabletextcol" ><td>' + item.staffId + '</td>'
          + '<td>' + item.staffName + '</td><td>' + item.address + '</td>'
          + '<td>' + item.contactNo + '</td><td>' + item.roleName + '</td>'
          + '<td>' + item.salary + '</td><td class="city">' + item.city + '</td>'
          + '<td class="dob">' + item.dob + '</td><td class="gender">' + item.gender + '</td>'
          + '<td class="nationality">' + item.nationality + '</td>'
          + '<td class="joiningDate">' + item.joiningDate + '</td><td class="email">' + item.email + '</td>'
          + '</tr></tbody>';

        self.state.data[i] = {
          "Emp Id": item.staffId,
          "Name": item.staffName,
          "Address": item.address,
          "Contact": item.contactNo,
          "Designation": item.roleName,
          "Salary": item.salary,
          "City": item.city,
          "DOJ": item.dob,
          "Gender": item.gender,
          "Religion": item.religion,
          "Nationality": item.nationality,
          "JoiningDate": item.joiningDate,
          "Email": item.email,
          "SiteHandled": item.siteHandled
        };

      });
      $("#tableHeadings").append(tab);
      self.state.columns = self.getColumns();

      $(".city").hide();
      $(".dob").hide();
      $(".gender").hide();
      $(".religion").hide();
      $(".nationality").hide();
      $(".joiningDate").hide();
      $(".email").hide();
    } else {
      $("#nodata").show();
      $("#test-table-xls-button").hide();
      $("#myInput").hide();
    }
    self.setState({
      data: self.state.data,
      columns: self.state.columns
    });
  }

  getColumns() {

    return Object.keys(this.state.data[0]).map(key => {
      if (

        key != "City" &&
        key != "DOJ" &&
        key != "Gender" &&
        key != "Religion" &&
        key != "Nationality" &&
        key != "JoiningDate" &&
        key != "Email"

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
        contactNo: self.state.contactNo,
        companyId: this.state.companyId,
        staffId1: this.state.staffId1,
        employeeName: this.state.employeeName,
        role: this.state.role,
        staffName: this.state.staffName,
        staffId: this.state.staffId,
      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/staff/deletestaff",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {

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


  NoAction() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={StaffList1} />
        </div>
      </Router>,
      document.getElementById('contentRender'));

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


          self.state.staffId = rowInfo.original["Emp Id"];
          self.state.staffName = rowInfo.original["Name"];
          self.state.address = rowInfo.original["Address"]; // get current row 1st TD value
          self.state.contactNo = rowInfo.original["Contact"];
          self.state.roleName = rowInfo.original["Designation"];
          self.state.salary = rowInfo.original["Salary"]; // get current row 1st TD value
          self.state.city = rowInfo.original["City"];
          self.state.dob = rowInfo.original["DOJ"];
          self.state.gender = rowInfo.original["Gender"];
          self.state.religion = rowInfo.original["Religion"];
          self.state.nationality = rowInfo.original["Nationality"];
          self.state.joiningDate = rowInfo.original["JoiningDate"];
          self.state.email = rowInfo.original["Email"];
          self.state.siteHandled = rowInfo.original["SiteHandled"].split(",");

          self.state.oldStaffName = self.state.staffName;
          self.state.oldAddress = self.state.address;
          self.state.oldContactNo = self.state.contactNo;
          self.state.oldRoleName = self.state.roleName;
          self.state.oldSalary = self.state.salary;
          self.state.oldCity = self.state.city;
          self.state.oldDob = self.state.dob;
          self.state.oldGender = self.state.gender;
          self.state.oldReligion = self.state.religion;
          self.state.oldNationality = self.state.nationality;
          self.state.oldJoiningDate = self.state.joiningDate;
          self.state.oldEmail = self.state.email;
          self.state.oldSiteHandled = self.state.siteHandled;



          if (self.state.address == "null" || self.state.address == "-") {
            self.state.address = " ";
          } if (self.state.contactNo == "null" || self.state.contactNo == "-") {
            self.state.contactNo = " ";
          } if (self.state.roleName == "null" || self.state.roleName == "-") {
            self.state.roleName = " ";
          } if (self.state.salary == "null" || self.state.salary == "-") {
            self.state.salary = " ";
          } if (self.state.city == "null" || self.state.city == "-") {
            self.state.city = " ";
          }
          if (self.state.dob == "null" || self.state.dob == "-") {
            self.state.dob = " ";
          } if (self.state.gender == "null" || self.state.gender == "-") {
            self.state.gender = " ";
          } if (self.state.religion == "null" || self.state.religion == "-") {
            self.state.religion = " ";
          } if (self.state.nationality == "null" || self.state.nationality == "-") {
            self.state.nationality = " ";
          } if (self.state.joiningDate == "null" || self.state.joiningDate == "-") {
            self.state.joiningDate = " ";
          }

          if (self.state.email == "null" || self.state.email == "-") {
            self.state.email = " ";
          }


          self.setState({
            staffId: self.state.staffId,
            staffName: self.state.staffName,
            address: self.state.address,
            contactNo: self.state.contactNo,
            city: self.state.city,
            roleName: self.state.roleName,
            salary: self.state.salary,
            email: self.state.email,
            dob: self.state.dob,
            gender: self.state.gender,
            religion: self.state.religion,
            nationality: self.state.nationality,
            joiningDate: self.state.joiningDate,

            oldStaffName: self.state.oldStaffName,
            oldAddress: self.state.oldAddress,
            oldContactNo: self.state.oldContactNo,
            oldRoleName: self.state.oldRoleName,
            oldSalary: self.state.oldSalary,
            oldCity: self.state.oldCity,
            oldDob: self.state.oldDob,
            oldGender: self.state.oldGender,
            oldReligion: self.state.oldReligion,
            oldNationality: self.state.oldNationality,
            oldJoiningDate: self.state.oldJoiningDate,
            oldEmail: self.state.oldEmail,





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




  /* ************ NEW ICON FUNCTION ************  */
  AddEmp_Cust_Vend() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={AddStaff} />


        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }

  ViewEmp_Cust_Vend() {

    var self = this;

    if (this.state.staffId === undefined) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Staff ',

      })
    } else {

      ReactDOM.render(<StaffListView staffId={self.state.staffId}
        staffName={self.state.staffName}
        address={self.state.address} contactNo={self.state.contactNo}
        city={self.state.city} roleName={self.state.roleName}
        email={self.state.email} salary={self.state.salary}
        dob={self.state.dob} gender={self.state.gender} religion={self.state.religion}
        nationality={self.state.nationality} joiningDate={self.state.joiningDate}
        siteHandled={self.state.siteHandled}
      />, document.getElementById("contentRender"));


    }
  }

  EditEmp_Cust_Vend() {
    var self = this;

    if (this.state.staffId === undefined) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Staff ',

      })
    } else {

      ReactDOM.render(<StaffListEdit staffId={self.state.staffId}
        staffName={self.state.staffName}
        address={self.state.address} contactNo={self.state.contactNo}
        city={self.state.city} roleName={self.state.roleName}
        email={self.state.email} salary={self.state.salary}
        dob={self.state.dob} gender={self.state.gender} religion={self.state.religion}
        nationality={self.state.nationality} joiningDate={self.state.joiningDate}
        siteHandled={self.state.siteHandled}
        oldStaffName={self.state.oldStaffName}
        oldAddress={self.state.oldAddress}
        oldContactNo={self.state.oldContactNo}
        oldRoleName={self.state.oldRoleName}
        oldSalary={self.state.oldSalary}
        oldCity={self.state.oldCity}
        oldDob={self.state.oldDob}
        oldGender={self.state.oldGender}
        oldReligion={self.state.oldReligion}
        oldNationality={self.state.oldNationality}
        oldJoiningDate={self.state.oldJoiningDate}
        oldEmail={self.state.oldEmail}
        oldSiteHandled={self.state.oldSiteHandled}
      />, document.getElementById("contentRender"));

    }
  }

  DeleteEmp_Cust_Vend() {

    var self = this;

    if (this.state.staffId === undefined) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Staff ',

      })
    } else {
      if (this.state.staffId != "") {


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

  DownLoadEmp_Cust_Vend_List() {

  }



  render() {
    // const downloadButtonData = <i style={{ color: "black" }} class="glyphicon glyphicon-download-alt" ></i>

    const downloadButtonData = <Invoice_xlDownldBtn />;

    return (

      <div class="container">

        <div className="">
          <div className="">
            <BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
          </div>
          <div className="inv_HeaderCls">
            <h3>Employee List</h3>
          </div>
        </div>

        <div className="inv_list_cls">

          <div className="inv_list_cls_sel_search">
            <SiteDropDown onSiteDropDown={this.handleSite} data={this.state.site} />
          </div>
        </div>
        <div className="reactIcon_Dcls">
          <Employee_Vendor_Customer_Icons onAddEmpVendCust={this.AddEmp_Cust_Vend} onViewEmpVendCust={this.ViewEmp_Cust_Vend}
            onEditEmpVendCust={this.EditEmp_Cust_Vend} onDeleteEmpVendCust={this.DeleteEmp_Cust_Vend}
            onDownload={this.DownLoadEmp_Cust_Vend_List} />
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button "

            table="tableHeadings"
            filename="Staff_List"
            sheet="tablexls"
            buttonText={downloadButtonData}
          />
        </div>


        <ReactTable style={{ overflow: "auto", marginBottom: "5%" }}
          data={this.state.data}
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


        <div id="tableOverflow">
          <table style={{ margin: "auto", marginBottom: "5%" }} class="table table-bordered" id="tableHeadings">

          </table>
        </div>



      </div>
    );
  }

}

export default StaffList1;