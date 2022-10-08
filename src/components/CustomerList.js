
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

import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import CustomerListView from './CustomerListView';
import CustomerListEdit from './CustomerListEdit';
import FooterText from './FooterText';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import "./DownloadButton.css";
import "./MainPageRedirectButton.css";
import CustomerEntryForm from './CustomerEntryForm';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import CustomerComponent from './ServiceRegistration/CustomerComponent';
import VehicleComponent from './ServiceRegistration/VehicleComponent';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
import { SiteDropDown, FilterOptions } from './SiteDropDown';
import {Employee_Vendor_Customer_Icons, Invoice_xlDownldBtn} from './ServiceRegistration/IconComponents';
import ReactTooltip from 'react-tooltip';
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';

var currentRow;
var i = 1;
var dataList = [];
class CustomerList1 extends Component {
  constructor(data) {
    super(data)
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    this.state = {
      staffId: staffId,
      employeeName: employeeName,
      role: role,
      contactNo: '',
      columns: [],
      dataList: [],
      isCustomerPaneOpen: false,
      isVehiclePaneOpen: false,
      site: GetCurrentSite(),
    }

    this.SubmitCustomerInfoSlide = this.SubmitCustomerInfoSlide.bind(this);
    this.SubmitVehicleInfoSlide = this.SubmitVehicleInfoSlide.bind(this);

    this.AddEmp_Cust_Vend=this.AddEmp_Cust_Vend.bind(this);
    this.ViewEmp_Cust_Vend = this.ViewEmp_Cust_Vend.bind(this);
    this.DeleteEmp_Cust_Vend=this.DeleteEmp_Cust_Vend.bind(this);
    this.EditEmp_Cust_Vend = this.EditEmp_Cust_Vend.bind(this);
    this.DownLoadEmp_Cust_Vend_List=this.DownLoadEmp_Cust_Vend_List.bind(this);


  }
  componentDidMount() {
    SetCurrentPage("customerlist");
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

    var self = this;
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
        empSites: GetEmployeeSite(),
      }),
      contentType: "application/json",
      dataType: 'json',
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/master/customerreport",
      async: false,
      crossDomain: true,
      success: function (data, textStatus, jqXHR) {

        console.log("CUSTOMER LIST DATA :",data);

        dataList = data.customerRetrievelist;
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
        key != "CustomerId" &&
        key != "LandlineNo"
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



  Delete(rowIndexValue) {
    var self = this;

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        contactNo: self.state.contactNo,
        companyId: self.state.companyId,
        staffId: this.state.staffId,
        employeeName: this.state.employeeName,
        role: this.state.role,
        customerId: self.state.customerId,
        customerName: self.state.customerName,

      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/master/deletecustomer",
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

  NoAction() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={CustomerList1} />
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



    if (typeof rowInfo !== "undefined") {
      return {
        onClick: (e, handleOriginal) => {
          this.setState({
            selected: rowInfo.index
          });
          if (handleOriginal) {
            handleOriginal()
          }



          var customerName = rowInfo.original["Customer Name"];
          var companyName = rowInfo.original["Company Name"];
          var address = rowInfo.original["Address"];
          var contactNo = rowInfo.original["Contact No"];
          var city = rowInfo.original["City"];
          var alternateContactNo = rowInfo.original["AlternateNo"];
          var gstNo = rowInfo.original["GstNo"];
          var email = rowInfo.original["Email"];
          var customerId = rowInfo.original["CustomerId"];
          var landlineNo = rowInfo.original["LandlineNo"];



          this.state.customerName = customerName;
          this.state.companyName = companyName;
          this.state.address = address;
          this.state.contactNo = contactNo;
          this.state.city = city;
          this.state.alternateContactNo = alternateContactNo;
          this.state.gstNo = gstNo;
          this.state.email = email;
          this.state.customerId = customerId;
          this.state.landlineNo = landlineNo;

          this.setState({
            customerName: this.state.customerName,
            companyName: this.state.companyName,
            address: this.state.address,
            contactNo: this.state.contactNo,
            city: this.state.city,
            alternateContactNo: this.state.alternateContactNo,
            gstNo: this.state.gstNo,
            email: this.state.email,
            customerId: this.state.customerId,
            landlineNo: this.state.landlineNo,

          });

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



  AddCustomerSlidePane() {
    this.state.isCustomerPaneOpen = true;

    this.setState({
      isCustomerPaneOpen: this.state.isCustomerPaneOpen
    })
  }

  CloseCustomerSlide() {
    this.state.isCustomerPaneOpen = false;

    this.setState({
      isCustomerPaneOpen: this.state.isCustomerPaneOpen
    })
  }

  CloseCancelCustomerInfoSlide = (currentState) => {
    var self = this;
    self.state.isCustomerPaneOpen = false;
    self.setState({
      isCustomerPaneOpen: self.state.isCustomerPaneOpen
    })
  }

  SubmitCustomerInfoSlide(stateData, submit_proceed) {

    // console.log("stateDate :",stateData);
    //  console.log("this :",this);

    // console.log("selfStateData :",submit_proceed);

    var self = this;
    dataList = stateData.customerList;
    this.handleSite(self.state.site);
    if (submit_proceed == 'Yes') {
      this.state.isCustomerPaneOpen = false;
      this.state.isVehiclePaneOpen = true;

      this.setState({
        isCustomerPaneOpen: this.state.isCustomerPaneOpen,
        isVehiclePaneOpen: this.state.isVehiclePaneOpen
      })
      this.state.stateData = stateData;
      this.setState({
        stateData: this.state.stateData
      })

    }



  }

  CloseVehicleSlide() {
    this.state.isVehiclePaneOpen = false;
    this.state.stateData = "";

    this.setState({
      isVehiclePaneOpen: this.state.isVehiclePaneOpen,
      stateData: this.state.stateData
    })
  }

  CloseCancelVehicleSlide = () => {

    var self = this;
    self.state.isVehiclePaneOpen = false;
    self.state.stateData = "";

    self.setState({
      isVehiclePaneOpen: self.state.isVehiclePaneOpen,
      stateData: self.state.stateData
    })
  }

  SubmitVehicleInfoSlide(stateData) {
    var self = this;
    self.state.isVehiclePaneOpen = false;
    self.state.stateData = "";

    self.setState({
      isVehiclePaneOpen: self.state.isVehiclePaneOpen,
      stateData: self.state.stateData
    })

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
    var no;
    self.state.dataList = [];
    $("#tableHeadings").empty();
    if (result.length != 0) {
      var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Customer Name</th>'
        + '<th>Company Name</th><th>Address</th><th>Contact No</th>'
        + '<th>EmailId</th><th>State</th>'
        + '<th>GSTNo</th></tr></thead>';

      $.each(result, function (i, item) {
        no = parseInt(i) + 1;
        tab += '<tbody id= "myTable" ><tr  id="tabletextcol" ><td>' + no + '</td>'
          + '<td>' + item.customerName + '</td><td>' + item.companyName + '</td>'
          + '<td>' + item.address + '</td><td>' + item.contactNo + '</td>'
          + '<td>' + item.email + '</td><td>' + item.city + '</td>'
          + '<td class="gstNo">' + item.gstNo + '</td><td>' + item.landlineNo + '</td></tr></tbody>';

        self.state.dataList[i] = {
          "SNo": no,
          "Customer Name": item.customerName,
          "Company Name": item.companyName,
          "Address": item.address,
          "Contact No": item.contactNo,
          "City": item.city,
          "GstNo": item.gstNo,
          "Email": item.email,
          "CustomerId": item.customerId,
          "LandlineNo": item.landlineNo,
          "Site":item.site,  
        };

      });
      $("#tableHeadings").append(tab);
      if (self.state.dataList.length > 0) {
        self.state.columns = self.getColumns();
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

   /* ************ NEW ICON FUNCTION ************  */
   AddEmp_Cust_Vend(){
     var self=this;

   self.AddCustomerSlidePane();
  }

  ViewEmp_Cust_Vend(){

    var self = this;

    if (this.state.customerId === undefined) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Customer ',

      })
    } else {

      ReactDOM.render(
        <Router>
          <div>

            <Route path="/" component={() => <CustomerListView customerName={this.state.customerName}
              companyName={this.state.companyName} address={this.state.address} landlineNo={this.state.landlineNo} 
              contactNo={this.state.contactNo} city={this.state.city} 
              gstNo={this.state.gstNo} email={this.state.email} 
              alternateContactNo={this.state.alternateContactNo} 
              customerId={this.state.customerId}
            />} />

          </div>
        </Router>,
        document.getElementById('contentRender'));
    }
  }

  EditEmp_Cust_Vend(){
    var self = this;
    if (this.state.customerId === undefined) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Customer ',

      })
    } else {


      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={() => <CustomerListEdit customerName={this.state.customerName}
              companyName={this.state.companyName} address={this.state.address}
              contactNo={this.state.contactNo} city={this.state.city} gstNo={this.state.gstNo}
              email={this.state.email} alternateContactNo={this.state.alternateContactNo}
              customerId={this.state.customerId} landlineNo={this.state.landlineNo}
            />} />


          </div>
        </Router>,
        document.getElementById('contentRender'));
    }
  }

  DeleteEmp_Cust_Vend(){

    var self = this;

    if (this.state.customerId === undefined) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Customer ',

      })
    } else {
      if (this.state.customerId != "") {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Do you Want to Delete ' + self.state.customerName,
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
              title: 'Cancelled Deletion Of ' + self.state.customerName,
              showConfirmButton: false,
              timer: 2000,
            })
          }
        })
      }
    }

  }

  DownLoadEmp_Cust_Vend_List(){

  }


  render() {
    //  const  downloadButtonData=<span style={{width:"80px"}} class="glyphicon glyphicon-download-alt" ><span style={{fontFamily:"Roboto, sans-serif"}}>&nbsp;Download</span></span>
  //  const downloadButtonData = <i style={{ color: "black" }} class="glyphicon glyphicon-download-alt" ></i>
  const downloadButtonData = <Invoice_xlDownldBtn/>;       

    return (

      <div className="container" style={{ paddingTop: "0px" }}>
        
        <div className="">
            <div className="">
              <BackButtonComponent name={"Dashboard"}click={()=>this.BackbtnFunc()} />
                  </div>
            <div className="inv_HeaderCls">
              <h3>Customer List</h3>
            </div>
          </div>
 
           <div className="inv_list_cls">

<div className="inv_list_cls_sel_search">
<SiteDropDown onSiteDropDown={this.handleSite} data={this.state.site} />
</div>
    
</div>
<div className="reactIcon_Dcls">

<Employee_Vendor_Customer_Icons  onAddEmpVendCust={this.AddEmp_Cust_Vend} onViewEmpVendCust={this.ViewEmp_Cust_Vend} 
    onEditEmpVendCust={this.EditEmp_Cust_Vend} onDeleteEmpVendCust={this.DeleteEmp_Cust_Vend}
    onDownload={this.DownLoadEmp_Cust_Vend_List} />
         <ReactHTMLTableToExcel
                          id="test-table-xls-button"
                          className="download-table-xls-button "

                          table="tableHeadings"
                          filename="Customer_List"
                          sheet="tablexls"
                          buttonText={downloadButtonData}
                        />

</div>
<div className="row">
          <div class="card-body">
           

            <div style={{ display: "grid", overflow: "auto" }}>

              <div id="tableOverflow1">
                <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">
                </table>
              </div>

              <div id="tableOverflow" class="hideContent" style={{ marginBottom: "2%" }}>

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
              </div>
            </div>



          </div>
        </div>
        <SlidingPane
          className="some-custom-class"
          overlayClassName="some-custom-overlay-class"
          isOpen={this.state.isCustomerPaneOpen}
          title={"Customer Info"}
          subtitle="Can Add Customer Info Here"
          onRequestClose={() => {
            // triggered on "<" on left top click or on outside click
            // setState({ isPaneOpen: false });
            this.CloseCustomerSlide()
          }}
        >
          {/* {this.RenderUpdateComponenets(this.state.taskSelected)} */}
          <CustomerComponent SubmitClicked={this.SubmitCustomerInfoSlide} CancelClicked={this.CloseCancelCustomerInfoSlide} />
        </SlidingPane>

 {/*
        <SlidingPane
          className="some-custom-class"
          overlayClassName="some-custom-overlay-class"
          isOpen={this.state.isVehiclePaneOpen}
          title={"Vehicle Info"}
          subtitle="Can Add Vehicle Info Here"
          onRequestClose={() => {
            // triggered on "<" on left top click or on outside click
            // setState({ isPaneOpen: false });
            this.CloseVehicleSlide()
          }}
        >
          {//this.RenderUpdateComponenets(this.state.taskSelected)
          } 
        
          <VehicleComponent stateData={this.state.stateData} SubmitClicked={this.SubmitVehicleInfoSlide} CancelClicked={this.CloseCancelVehicleSlide} />
        </SlidingPane>  */}
      </div>
    );
  }

}

export default CustomerList1;