
import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import VendorEntryForm from './VendorEntryForm';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
  GetCurrencies,SetCurrentPage } from './ConstSiteFunction';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import VendorListView from './VendorListView';
import VendorListEdit from './VendorListEdit';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import "./DownloadButton.css";
import "./MainPageRedirectButton.css";
import { SiteDropDown, FilterOptions } from './SiteDropDown';
//import { GetEmployeeSite, GetCurrentSite } from './ConstSiteFunction';
import { Employee_Vendor_Customer_Icons, Invoice_xlDownldBtn } from './ServiceRegistration/IconComponents';
import ReactTooltip from 'react-tooltip';
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';


var dataList = [];
var currentRow;
class VendorList1 extends Component {
  constructor(data) {
    super(data)
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    this.state = {
      date: today,
      staffId: staffId,
      employeeName: employeeName,
      role: role,

      contactNo: '',
      columns: [],
      dataList: [],
      site: GetCurrentSite()
    };

    this.AddEmp_Cust_Vend = this.AddEmp_Cust_Vend.bind(this);
    this.ViewEmp_Cust_Vend = this.ViewEmp_Cust_Vend.bind(this);
    this.DeleteEmp_Cust_Vend = this.DeleteEmp_Cust_Vend.bind(this);
    this.EditEmp_Cust_Vend = this.EditEmp_Cust_Vend.bind(this);
    this.DownLoadEmp_Cust_Vend_List = this.DownLoadEmp_Cust_Vend_List.bind(this);


  }
  componentDidMount() {
    SetCurrentPage("VendorList");

    $("#nodata").hide();
    $("#tableOverflow1").hide();
    this.GetData();
    window.scrollTo(0, 0);
  }
  GetData() {
    $("ReactHTMLTableToExcel").css("background-color", "#05a4b5");
    $(".btn-default").css("background-color", "#05a4b5");
    $(".btn-default").css("color", "white");
    $("ReactHTMLTableToExcel").css("color", "white");

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });

    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
        empSites: GetEmployeeSite(),
      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/master/vendorreport",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        dataList = data.vendorRetrievelist;
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
    return Object.keys(this.state.dataList[0]).map(key => {

      if (
        key != "City" &&
        key != "AlternateNo" &&
        key != "GstNo" &&
        key != "Email" &&
        key != "VendorId"
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



    if (typeof rowInfo !== "undefined") {
      return {
        onClick: (e, handleOriginal) => {
          this.setState({
            selected: rowInfo.index
          });
          if (handleOriginal) {
            handleOriginal()
          }



          self.state.deletevendorId = rowInfo.original["VendorId"];
          self.state.deletevendorName = rowInfo.original["Vendor Name"];
          self.state.deletecontactNo = rowInfo.original["Contact No"];

          var vendorName = rowInfo.original["Vendor Name"];
          var companyName = rowInfo.original["Company Name"];
          var address = rowInfo.original["Address"];
          var contactNo = rowInfo.original["Contact No"];
          var city = rowInfo.original["City"];
          var alternateContactNo = rowInfo.original["AlternateNo"];
          var gstNo = rowInfo.original["GstNo"];
          var email = rowInfo.original["Email"];
          var vendorId = rowInfo.original["VendorId"];


          this.state.vendorName = vendorName;
          this.state.companyName = companyName;
          this.state.address = address;
          this.state.contactNo = contactNo;
          this.state.city = city;
          this.state.alternateContactNo = alternateContactNo;
          this.state.gstNo = gstNo;
          this.state.email = email;
          this.state.vendorId = vendorId;
          this.setState({
            vendorName: this.state.vendorName,
            companyName: this.state.companyName,
            address: this.state.address,
            contactNo: this.state.contactNo,
            city: this.state.city,
            alternateContactNo: this.state.alternateContactNo,
            gstNo: this.state.gstNo,
            email: this.state.email,
            vendorId: this.state.vendorId
          });



          self.setState({
            deletevendorId: self.state.deletevendorId,
            deletevendorName: self.state.deletevendorName,
            deletecontactNo: self.state.deletecontactNo,
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



  Delete(rowIndexValue) {
    var self = this;

    $.ajax({
      type: 'POST',
      data: JSON.stringify({

        companyId: self.state.companyId,
        staffId: self.state.staffId,
        employeeName: self.state.employeeName,
        role: self.state.role,
        vendorId: this.state.deletevendorId,
        vendorName: this.state.deletevendorName,
        contactNo: this.state.deletecontactNo,
      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/master/deletevendor",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {
        var array = [...self.state.dataList]; // make a new copy of array instead of mutating the same array directly.
        array.splice(rowIndexValue, 1);
        self.state.dataList = [];
        self.state.dataList = array;
        self.setState({ dataList: array });
        dataList = array;
        self.state.deletevendorId = "";
        self.state.deletevendorName = "";
        self.state.deletecontactNo = "";
      },
      error: function (data) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Network Connection Problem',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });

  }
  NoAction() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={VendorList1} />
        </div>
      </Router>,
      document.getElementById('contentRender'));

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
      var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Vendor Name</th>'
        + '<th>Company Name</th><th>Address</th><th>Contact No</th><th>State</th>'
        + '<th>AlternateNo</th><th>EmailId</th><th>GSTNo</th></tr></thead>';
      $.each(result, function (i, item) {
        no = parseInt(i) + 1;
        tab += '<tbody id= "myTable" ><tr  id="tabletextcol" ><td>' + no + '</td>'
          + '<td>' + item.vendorName + '</td><td>' + item.companyName + '</td>'
          + '<td>' + item.address + '</td><td>' + item.contactNo + '</td>'
          + '<td class="city">' + item.city + '</td>'
          + '<td class="alternatecontactNo">' + item.alternateContactNo + '</td>'
          + '<td class="gstNo">' + item.email + '</td><td class="email">' + item.gstNo + '</td></tr></tbody>';


        self.state.dataList[i] = {
          "SNo": no,
          "Vendor Name": item.vendorName,
          "Company Name": item.companyName,
          "Address": item.address,
          "Contact No": item.contactNo,
          "City": item.city,
          "AlternateNo": item.alternateContactNo,
          "GstNo": item.gstNo,
          "Email": item.email,
          "VendorId": item.vendorId,
          "Site": item.site,

        };

      });
      $("#tableHeadings").append(tab);
      if (self.state.dataList.length > 0) {
        self.state.columns = self.getColumns();
      }
    }
    self.setState({
      dataList: self.state.dataList,
      columns: self.state.columns
    });
    console.log("after drop down ", self.state.dataList);
  }

  /* ************ NEW ICON FUNCTION ************  */
  AddEmp_Cust_Vend() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={VendorEntryForm} />


        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }

  ViewEmp_Cust_Vend() {

    var self = this;

    if (this.state.vendorId === undefined) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Vendor ',

      })
    } else {

      ReactDOM.render(
        <Router>
          <div>

            <Route path="/" component={() => <VendorListView vendorName={this.state.vendorName}
              companyName={this.state.companyName} address={this.state.address} contactNo={this.state.contactNo} city={this.state.city} gstNo={this.state.gstNo} email={this.state.email} alternateContactNo={this.state.alternateContactNo} vendorId={this.state.vendorId}
            />} />

          </div>
        </Router>,
        document.getElementById('contentRender'));
    }
  }

  EditEmp_Cust_Vend() {
    var self = this;

    if (this.state.vendorId === undefined) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Vendor ',

      })
    } else {

      ReactDOM.render(
        <Router>
          <div>

            <Route path="/" component={() => <VendorListEdit vendorName={this.state.vendorName}
              companyName={this.state.companyName} address={this.state.address} contactNo={this.state.contactNo} city={this.state.city} gstNo={this.state.gstNo} email={this.state.email} alternateContactNo={this.state.alternateContactNo} vendorId={this.state.vendorId}
            />} />

          </div>
        </Router>,
        document.getElementById('contentRender'));
    }
  }

  DeleteEmp_Cust_Vend() {

    var self = this;

    if (this.state.deletevendorId === undefined) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Vendor ',

      })
    } else {
      if (this.state.deletevendorId != "") {


        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Do you Want to Delete ' + self.state.deletevendorName,
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
          //   timer: 1500
        }).then((result) => {
          if (result.value) {
            self.Delete(this.state.rowIndexValue)

            // For more information about handling dismissals please visit
            // https://sweetalert2.github.io/#handling-dismissals
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Cancelled Deletion Of ' + self.state.deletevendorName,
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

    // const  downloadButtonData=<span style={{width:"80px"}} class="glyphicon glyphicon-download-alt" ><span style={{fontFamily:"Roboto, sans-serif"}}>&nbsp;Download</span></span>

    //  const downloadButtonData = <i style={{ color: "black" }} class="glyphicon glyphicon-download-alt" ></i>
    const downloadButtonData = <Invoice_xlDownldBtn />;
    return (

      <div className="container" style={{ paddingTop: "0px" }}>

        <div className="">
          <div className="">
            <BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
          </div>
          <div className="inv_HeaderCls">
            <h3>Vendor List</h3>
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
            filename="Vendor_List"
            sheet="tablexls"
            buttonText={downloadButtonData}
          />

        </div>
        <div id="tableOverflow1">
          <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">
          </table>
        </div>


        <div id="tableOverflow" class="hideContent" style={{ marginBottom: "2%" }}>

          <ReactTable style={{ overflow: "auto" }}
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
            //  getTdProps={this.onRowClick}
            getTrProps={this.onTrRowClick}
          />
        </div>



      </div >
    );
  }

}

export default VendorList1;