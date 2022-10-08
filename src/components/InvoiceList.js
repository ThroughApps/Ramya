import React, { Component, useRef } from 'react';
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
import Pagination from "react-js-pagination";
import _ from 'underscore';
import SelectSearch from 'react-select';
import { GetEmployeeSite, GetCurrentSite } from './ConstSiteFunction';
import './invoiceListcss.css';
import { InvoiceIcons, Invoice_xlDownldBtn } from './ServiceRegistration/IconComponents';
import ReactTooltip from 'react-tooltip';
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import NormalReactTableComponent from './ReactTableComponents/NormalReactTableComponent';
import SearchReactTableComponent from './ReactTableComponents/SearchReactTableComponent';
import { RowDeleteFunc } from './ReactTableComponents/NormalReactTableComponent';
import * as XLSX from 'xlsx';
import { LastLocationProvider } from 'react-router-last-location';
import InvoiceMenuPage from './Invoice/InvoiceMenuPage';
import SaleInvoiceUpdate from './Invoice/SaleInvoiceUpdate';




var currentRow;
var count = 0;
var xlsRows = [];
var dataCount = 0;
var dataCountArray = [];
var itemData = 1;
var pageArray = [];
var iconsData;
var normalInvoiceData;
var searchInvoiceData;
var pageData_Status;


class InvoiceList1 extends Component {
  constructor(data) {
    super(data)
    var staffId1 = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)


    var today = new Date();
    var today1 = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var month = today.getMonth() + 1;

    this.state = {
      date: today1,
      companyId: companyId,
      month: month,
      staffId1: staffId1,
      employeeName: employeeName,
      role: role,
      data: [],
      data1: [],
      columns: [],
      columns1: [],
      totlaItemCount: 0,
      itemsPerPage: 10,
      activePage: 1,
      search: '',
      paymentStatus: "all",
      site: GetCurrentSite(),
      options: [],
      reactTableData: '',
      oldPageAcces: "false",
      deleteStatus: "false",

    };

    //   this.normalChild = React.createRef();
    //  this.searchChild = React.createRef();


    this.setState({

      companyId: companyId,
      paymentStatus: this.state.paymentStatus,

    })

    this.ViewInvoice = this.ViewInvoice.bind(this);
    this.DeleteInvoice = this.DeleteInvoice.bind(this);
    //   this.EditInvoice = this.EditInvoice.bind(this);
    this.EditInvoiceFunc = this.EditInvoiceFunc.bind(this);
    this.PayInvoice = this.PayInvoice.bind(this);
    this.DownLoadInvoiceList = this.DownLoadInvoiceList.bind(this);
    this.RowClickFunc = this.RowClickFunc.bind(this);
    this.AfterDelete = this.AfterDelete.bind(this);
    this.SearchFunc = this.SearchFunc.bind(this);
    this.ClearFunc = this.ClearFunc.bind(this);


  }


  componentDidMount() {

    $("#tableHeadings").hide();
    $("#searchTable").hide();

    $("ReactHTMLTableToExcel").css("background-color", "#05a4b5");
    $(".btn-default").css("background-color", "#05a4b5");
    $("ReactHTMLTableToExcel").css("color", "white");
    $(".btn-default").css("color", "white");
    var today = new Date();
    var today1 = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var month = today.getMonth() + 1;
    this.setState({

      paymentStatus: "all",

    })
    var empSites = CryptoJS.AES.decrypt(localStorage.getItem('EmpSites'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var emparray = empSites.split(",");
    this.state.options = _.map(emparray, function (site) { return { label: site, value: site }; });
    this.state.options.push({ label: "All", value: "All" });
    this.setState({
      options: this.state.options,
      selectedSite: [{ label: this.state.site, value: this.state.site }]
    })
    var self = this;

    window.scrollTo(0, 0);
    dataCount = 0;
    dataCountArray = [];
    itemData = 1;
    pageArray = [];

    dataCountArray.push(0);
    pageArray.push(1);
    this.Submit();

  }



  remove = (rowId) => {

    // Array.prototype.filter returns new array
    // so we aren't mutating state here
    const arrayCopy = this.state.data.filter((row) => row.id !== rowId);
    this.state.data = arrayCopy;
    this.setState({ data: arrayCopy });

  };


  handleUserInputPaymentStatus = (e) => {

    var self = this;

    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
    // Display selected value for user
    var currentValue = e;

    this.state.paymentStatus = e.target.value;

    this.setState({
      paymentStatus: this.state.paymentStatus,
    })


    itemData = 1;
    this.state.totlaItemCount = 0;
    dataCountArray = [];
    dataCount = 0;
    pageArray = [];

    xlsRows = [];
    dataCountArray.push(dataCount);
    pageArray.push(1);


    if (this.state.reactTableData == "SearchTable") {
      this.SearchFunc();
      this.ClearFunc();
    } else {
      this.Submit();
      this.ClearFunc();
    }

    if (this.state.reactTableData == "NormalTable") {
      self.normalChild.UnselectRow();
    } else if (this.state.reactTableData == "SearchTable") {
      self.searchChild.UnselectRow();
    }

  }

  Submit() {

    var today = new Date();
    var today1 = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var month = today.getMonth() + 1;

    var self = this;

    //   dataCountArray.push(dataCount);
    //  pageArray.push(1);
    this.setState({
      date: this.state.date,

    });

    var self = this;

    /*   console.log(JSON.stringify({
         companyId: this.state.companyId,
         month: month,
         dataCount: dataCount,
         totlaItemCount: this.state.totalItemCount,
         paymentStatus: this.state.paymentStatus,
         empSites: this.state.site
       })); */

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
        month: month,
        dataCount: dataCount,
        totlaItemCount: this.state.totalItemCount,
        paymentStatus: this.state.paymentStatus,
        empSites: this.state.site
      }),
      //   url: " http://15.206.129.105:8080/ThroughBooksCOAPI/saleorder/saleinvoicereport",
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/saleorder/saleinvoicereport",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        console.log("NORMAL INVOICE LIST DATA :", data);

        self.state.reactTableData = "NormalTable";
        normalInvoiceData = data;

        self.state.deleteStatus = "false";
        self.setState({
          reactTableData: self.state.reactTableData,
          deleteStatus: self.state.deleteStatus
        })
        //    console.log("this.state.reactTableData 111:", self.state.reactTableData );





        if (data.saleinvoicereportlist !== null && data.saleinvoicereportlist.length != 0) {
          // var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Invoice</th><th>Date</th><th>Customer</th><th>Contact</th><th>Status</th><th>Total(Rs)</th><th>Balance(Rs)</th></tr></thead>';

          var no = 0;
          self.state.downloadData = "yes";
          if (itemData == "1") {
            self.state.totlaItemCount = data.totlaItemCount;

            itemData = Number(itemData) + 1;
          }


          /*   localPageData[self.state.activePage] = [];
             localPageData[self.state.activePage].push(data.saleinvoicereportlist);
   
             var datavalue = 0;
             var count = 0;
   
             var dataCount1 = data.dataCount;
   
             var dataCount_Status = _.contains(dataCountArray, dataCount1);
   
             if (dataCount_Status == false) {
               dataCountArray.push(dataCount1);
             }  */


        } else {
          itemData = "1";
          self.state.totlaItemCount = 0;
          self.state.downloadData = "no";
          $("#test-table-xls-button").hide();
          $("#myInput").hide();

        }




        if (data.saleinvoicedetailedlist != null && data.saleinvoicedetailedlist.length != 0) {
          var tab = '<thead><tr class="headcolor">'
            + '<th>Invoice No</th><th>Customer Name</th><th>GSTIN</th><th>Invoice Date</th>'
            + '<th>Invoice Value</th><th>TAX Rate(%)</th><th>Taxable Value</th><th>CENTRAL TAX</th>'
            + '<th>STATE TAX</th><th>IGST</th><th>Payment Mode</th></tr></thead>';

          $.each(data.saleinvoicedetailedlist, function (i, item) {

            if (item.subtotal1 == item.balance_amount) {
              self.state.payment_status = "UnPaid";

              self.setState({
                payment_status: self.state.payment_status,
              })
            }
            if (item.balance_amount == 0) {
              self.state.payment_status = "Paid";
              self.setState({
                payment_status: self.state.payment_status,
              })
            }

            if ((item.subtotal1 != item.balance_amount) && (item.balance_amount != 0)) {
              self.state.payment_status = "PartiallyPaid";
              self.setState({
                payment_status: self.state.payment_status,
              })
            }

            self.state.taxRate = Number(item.cgsta) + Number(item.sgsta) + Number(item.igsta);
            self.setState({
              taxRate: self.state.taxRate,

            })
            self.state.taxableValue = Number(item.subtotal1) - Number(item.totalgst);
            self.setState({

              taxableValue: self.state.taxableValue,
            });

            tab += '<tbody id= "myTable" ><tr id="tabletextcol"><td>' + item.invoiceNo + '</td><td>' + item.customerName + '</td>'
              + '<td>' + item.gstNo + '</td><td>' + item.invoiceDate + '</td><td>' + item.subtotal1 + '</td>'
              + ' <td>' + self.state.taxRate + '</td>'
              + '<td>' + item.prefinalAmount + '</td>'
              + '<td>' + Math.round(((0.01 * Number(item.cgsta)) * Number(item.prefinalAmount))) + '</td>'
              + '<td>' + Math.round(((0.01 * Number(item.sgsta)) * Number(item.prefinalAmount))) + '</td>'
              + '<td>' + Math.round(((0.01 * Number(item.igsta)) * Number(item.prefinalAmount))) + '</td><td>' + item.paymentMode + '</td>'
              + '</tr></tbody>';
          });


          $("#tableHeadings").append(tab);
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

  handlePageChange(pageNumber) {

    this.state.activePage = pageNumber;
    this.setState({ activePage: pageNumber });

    var self = this;


    pageData_Status = false;
    pageData_Status = _.contains(pageArray, this.state.activePage);

    dataCount = 0;
    self.state.oldPageAcces = "false";
    self.setState({
      oldPageAcces: self.state.oldPageAcces
    });

    //    console.log("pageData_Status :",pageData_Status);

    if (pageData_Status == false) {

      pageArray.push(pageNumber);
      dataCount = Math.round((Number(dataCount)) + ((Number(pageNumber) - 1) * 10));
      dataCountArray.push(dataCount);

    } else if (pageData_Status == true) {

      var currentPageIndex = _.indexOf(pageArray, this.state.activePage);
      dataCount = dataCountArray[currentPageIndex];

      //    console.log("currentPageArray :",currentPageIndex);

    }

    //   console.log("pageArray :",pageArray);
    //   console.log("dataCountArray :",dataCountArray);


    this.Submit();


    //    console.log("AFTER SUBMIT pageArray :",pageArray);
    //    console.log("AFTER SUBMIT dataCountArray :",dataCountArray);

    if (this.state.reactTableData == "NormalTable") {
      self.normalChild.UnselectRow();
    } else if (this.state.reactTableData == "SearchTable") {
      self.searchChild.UnselectRow();
    }

  }


  NoAction() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={InvoiceList1} />
        </div>
      </Router>,
      document.getElementById('contentRender'));

  }

  DeleteFunc(rowIndexValue) {
    var self = this;

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        id: self.state.id,
        date: self.state.date,
        contactNo: self.state.contactNo,
        companyId: self.state.companyId,
        customerName: self.state.customerName,
        status: self.state.status,
        staffId: self.state.staffId1,
        employeeName: self.state.employeeName,
        role: self.state.role,
        bookingId: self.state.bookingId,
      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/SalesReport/DailySalesReportDelete",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {

        //   alert("rowIndexValue :"+rowIndexValue);


        self.state.deleteStatus = "true";


        self.setState({
          reactTableData: self.state.reactTableData,
          deleteStatus: self.state.deleteStatus
        })

        if (self.state.reactTableData == "NormalTable") {
          self.normalChild.RowDeleteFunc(rowIndexValue);
        } else if (self.state.reactTableData == "SearchTable") {
          self.searchChild.RowDeleteFunc(rowIndexValue);
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

  handleUserInput = (e) => {

    var self = this;
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
    );

    if (value == "") {

      this.Submit();

      this.state.reactTableData = "NormalTable";
      this.setState({
        reactTableData: this.state.reactTableData,
      })

      this.ClearFunc();

    } else if (this.state.reactTableData == "SearchTable") {
      this.searchChild.UnselectRow();
      this.ClearFunc();
    }


  }




  getColumns() {



    return Object.keys(this.state.data[0]).map(key => {
      if (
        key != "CustomerId" &&
        key != "CompanyName" &&
        key != "orderNumber" &&
        key != "invoiceDate" &&
        key != "dueDate" &&
        key != "address" &&
        key != "gstNo" &&
        key != "email" &&
        key != "advance" &&
        key != "discount" &&
        key != "PaymentMode" &&
        key != "StaffId" &&
        key != "ServiceBy" &&
        key != "BilledBy" &&
        key != "Advisor"
        //&&
        //key != "VehicleMake" &&
        // key != "VehicleModel" &&
        //  key != "VehicleFuelType"


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



  AddSaleInvoicePageFunc() {
    ReactDOM.render(
      <Router>
        <LastLocationProvider>
          <div>

            <Route path="/" component={SaleOrder1} />


          </div>
        </LastLocationProvider>
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



          self.state.id = rowInfo.original["Invoice"];
          self.state.date = rowInfo.original["Date"];
          self.state.customerName = rowInfo.original["Customer"];
          self.state.contact = rowInfo.original["Contact"];
          self.state.status = rowInfo.original["Status"];
          self.state.balanceAmt = rowInfo.original["Balance(Rs)"];
          self.state.subtotal1 = rowInfo.original["Total(Rs)"];
          self.state.customerId = rowInfo.original["CustomerId"];
          self.state.companyName = rowInfo.original["CompanyName"];
          self.state.orderNumber = rowInfo.original["orderNumber"];
          self.state.invoiceDate = rowInfo.original["invoiceDate"];
          self.state.dueDate = rowInfo.original["dueDate"];
          self.state.address = rowInfo.original["address"];
          self.state.gstNo = rowInfo.original["gstNo"];
          self.state.email = rowInfo.original["email"];
          self.state.advance = rowInfo.original["advance"];
          self.state.discount = rowInfo.original["discount"];
          self.state.paymentMode = rowInfo.original["PaymentMode"];
          self.state.staffId = rowInfo.original["StaffId"];
          self.state.serviceBy = rowInfo.original["ServiceBy"];
          self.state.advisor = rowInfo.original["Advisor"];
          self.state.vehicleMake = rowInfo.original["VehicleMake"];
          self.state.vehicleModel = rowInfo.original["VehicleModel"];
          self.state.vehicleFuelType = rowInfo.original["VehicleFuelType"];
          self.state.siteName = rowInfo.original["Site"];

          self.setState({
            id: self.state.id,
            customerName: self.state.customerName,
            amount: self.state.amount,
            date: self.state.date,
            customerId: self.state.customerId,
            companyName: self.state.companyName,
            orderNumber: self.state.orderNumber,
            invoiceDate: self.state.invoiceDate,
            dueDate: self.state.dueDate,
            address: self.state.address,
            gstNo: self.state.gstNo,
            email: self.state.email,
            advance: self.state.advance,
            discount: self.state.discount,
            paymentMode: self.state.paymentMode,
            staffId: self.state.staffId,
            serviceBy: self.state.serviceBy,
            bookingId: self.state.bookingId,
            vehicleRegistrationNo: self.state.vehicleRegistrationNo,
            advisor: self.state.advisor,
            vehicleMake: self.state.vehicleMake,
            vehcileModel: self.state.vehicleModel,
            vehicleFuelType: self.state.vehicleFuelType,
            siteName: self.state.siteName,

          })

          this.state.rowIndexValue = rowInfo.index;
        },
        style: {
          // background: rowInfo.index === this.state.selected ? 'rgb(164, 23, 107)' : '',
          background: rowInfo.index === this.state.selected ? 'rgb(66 139 202)' : '',
          color: rowInfo.index === this.state.selected ? 'white' : ''
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


  ClearFunc() {

    //  alert("CLEAR");
    var self = this;

    self.state.id = "";
    self.state.date = "";
    self.state.customerName = "";
    self.state.contact = "";
    self.state.status = "";
    self.state.balanceAmt = "";
    self.state.subtotal1 = "";
    self.state.customerId = "";
    self.state.companyName = "";
    self.state.orderNumber = "";
    self.state.invoiceDate = "";
    self.state.dueDate = "";
    self.state.address = "";
    self.state.gstNo = "";
    self.state.email = "";
    self.state.advance = "";
    self.state.discount = "";
    self.state.paymentMode = "";
    self.state.staffId = "";
    self.state.serviceBy = "";
    self.state.bookingId = "";
    self.state.vehicleRegistrationNo = "";
    self.state.advisor = "";
    self.state.vehicleMake = "";
    self.state.vehicleModel = "";
    self.state.vehicleFuelType = "";


    self.setState({
      id: self.state.id,
      customerName: self.state.customerName,
      amount: self.state.amount,
      date: self.state.date,
      customerId: self.state.customerId,
      companyName: self.state.companyName,
      orderNumber: self.state.orderNumber,
      invoiceDate: self.state.invoiceDate,
      dueDate: self.state.dueDate,
      address: self.state.address,
      gstNo: self.state.gstNo,
      email: self.state.email,
      advance: self.state.advance,
      discount: self.state.discount,
      paymentMode: self.state.paymentMode,
      staffId: self.state.staffId,
      serviceBy: self.state.serviceBy,
      // bookingId: self.state.bookingId,
      // vehicleRegistrationNo: self.state.vehicleRegistrationNo,
      advisor: self.state.advisor,
      // vehicleMake: self.state.vehicleMake,
      // vehcileModel: self.state.vehicleModel,
      // vehicleFuelType: self.state.vehicleFuelType,


    })

  }


  SearchFunc() {
    //  console.log("current value srch result", this.state.search);

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;

    var self = this;



    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
        search: this.state.search,
        empSites: this.state.site,
        paymentStatus: this.state.paymentStatus,
      }),

      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/saleorder/searchinvoice",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {


        searchInvoiceData = data;

        self.state.reactTableData = "SearchTable";
        self.state.deleteStatus = "false";
        self.setState({
          reactTableData: self.state.reactTableData,
          deleteStatus: self.state.deleteStatus
        })



      },
      error: function (data) {
        //    console.log('#####################error:################################' + data);
        //   alert('Login Invalid'+ data);

      },
    });

  }

  handleCurrentSite = (e) => {
    var sites = "";

    var self = this;
    if (e !== null) {
      const value = e.value;
      var status = e.filter(x => x.label === "All");
      sites = _.pluck(e, "label");
      if (status.length > 0) {
        e = { label: "All", value: sites }
        sites = CryptoJS.AES.decrypt(localStorage.getItem('EmpSites'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

      }
    } else {
      sites = CryptoJS.AES.decrypt(localStorage.getItem('EmpSites'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
      e = [];
    }

    this.state.site = sites.toString();
    this.setState({
      selectedSite: e,
      site: sites.toString()
    });

    itemData = 1;
    this.state.totlaItemCount = 0;
    dataCountArray = [];
    dataCount = 0;
    pageArray = [];
    xlsRows = [];
    dataCountArray.push(dataCount);
    pageArray.push(1);


    if (this.state.reactTableData == "SearchTable") {
      this.SearchFunc();
      this.ClearFunc();
    } else {
      this.Submit();
      this.ClearFunc();
    }

    if (this.state.reactTableData == "NormalTable") {
      self.normalChild.UnselectRow();
    } else if (this.state.reactTableData == "SearchTable") {
      self.searchChild.UnselectRow();
    }

  }

  /* ******** NEW ICON FUNCTIONS ********* */
  AddInvoice() {

    ReactDOM.render(<InvoiceMenuPage data="SaleInvoice" />, document.getElementById("contentRender"));

  }

  /*
  EditInvoice() {

    var self = this;

    if (this.state.id === undefined || this.state.id ==="") {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Invoice ',

      })
    } else {

   //   console.log("self.state.balanceAmt :",self.state.balanceAmt);

   if(self.state.status!='Paid'){
      ReactDOM.render(<SalesReportUpdate id={self.state.id}
        date={self.state.date} customerName={self.state.customerName} orderNumber={self.state.orderNumber} invoiceDate={self.state.invoiceDate} dueDate={self.state.dueDate} contact={self.state.contact}
        status={self.state.status} balanceAmt={self.state.balanceAmt} subtotal1={self.state.subtotal1} customerId={self.state.customerId} companyName={self.state.companyName} address={self.state.address}
        gstNo={self.state.gstNo} email={self.state.email} advance={self.state.advance}
        discount={self.state.discount} paymentMode={self.state.paymentMode}
        staffId={self.state.staffId}
        serviceBy={self.state.serviceBy}
        //bookingId={self.state.bookingId}
       // vehicleRegistrationNo={self.state.vehicleRegistrationNo}
       // vehicleMake={self.state.vehicleMake}
        //vehicleModel={self.state.vehicleModel}
        //vehicleFuelType={self.state.vehicleFuelType}
        advisor={self.state.advisor}


      />, document.getElementById("contentRender"));

      }else{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Paid Invoice Cannot be Edited',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }

   

  }
*/

  EditInvoiceFunc() {

    var self = this;

    if (this.state.id === undefined || this.state.id === "") {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Invoice ',

      })
    } else {

      //   console.log("self.state.balanceAmt :",self.state.balanceAmt);

      if (self.state.status != 'Paid') {
        ReactDOM.render(<SaleInvoiceUpdate id={self.state.id}
          date={self.state.date} customerName={self.state.customerName} orderNumber={self.state.orderNumber} invoiceDate={self.state.invoiceDate} dueDate={self.state.dueDate} contact={self.state.contact}
          status={self.state.status} balanceAmt={self.state.balanceAmt} subtotal1={self.state.subtotal1} customerId={self.state.customerId} companyName={self.state.companyName} address={self.state.address}
          gstNo={self.state.gstNo} email={self.state.email} advance={self.state.advance}
          discount={self.state.discount} paymentMode={self.state.paymentMode}
          staffId={self.state.staffId}
          serviceBy={self.state.serviceBy}
          //bookingId={self.state.bookingId}
          // vehicleRegistrationNo={self.state.vehicleRegistrationNo}
          // vehicleMake={self.state.vehicleMake}
          //vehicleModel={self.state.vehicleModel}
          //vehicleFuelType={self.state.vehicleFuelType}
          advisor={self.state.advisor}
          siteName={self.state.siteName}

        />, document.getElementById("contentRender"));

      } else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Paid Invoice Cannot be Edited',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }



  }

  ViewInvoice() {

    var self = this;

    if (self.state.id === undefined || this.state.id == "") {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Invoice ',

      })
    } else {

      ReactDOM.render(<SalesReportDisplay id={self.state.id}
        //bookingId={self.state.bookingId} 

        //vehicleRegistrationNo={self.state.vehicleRegistrationNo}
        date={self.state.date} userName={self.state.customerName} contact={self.state.contact} discount={self.state.discount}
        status={self.state.status} balanceAmt={self.state.balanceAmt}// vehicleMake={self.state.vehicleMake}
        // vehicleModel={self.state.vehicleModel}
        //  vehicleFuelType={self.state.vehicleFuelType}
        orderNumber={self.state.orderNumber} subtotal1={self.state.subtotal1} customerId={self.state.customerId}
        companyName={self.state.companyName} siteName={self.state.siteName} />, document.getElementById("contentRender"));


    }


  }

  DeleteInvoice() {

    var self = this;

    if (this.state.id === undefined || this.state.id == "") {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Invoice ',

      })
    } else {
      if (this.state.id != "") {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Do you Want to Delete ' + self.state.id,
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
              title: 'Cancelled Deletion Of ' + self.state.id,
              showConfirmButton: false,
              timer: 2000,
            })
          }
        })
      }
    }



  }

  DownLoadInvoiceList() {
    var self = this;
    if (xlsRows.length != 0) {
      self.GenerateExcel();
    } else {
      if (self.state.downloadData == "yes") {
        self.excelDownload();
        self.GenerateExcel();
      } else {
        confirmAlert({
          title: "Download Failed", // Title dialog
          message: "No File For Download Since No Data", // Message dialog
          confirmLabel: "Ok" // Text button confirm
        });
      }

    }
  }
  excelDownload() {




    var self = this;
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    xlsRows = [];
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: companyId,


      }),

      url: "http://15.206.129.105:8080/ThroughBooksCOAPI/saleorder/saleinvoicereportExcelDownload",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        console.log("excel INVOICE LIST DATA :", data);


        count = 0;

        if (data.saleinvoicedetailedlist.length != 0) {



          $.each(data.saleinvoicedetailedlist, function (i, item) {


            var taxRate = Number(item.cgsta) + Number(item.sgsta) + Number(item.igsta);

            xlsRows.push(item.invoiceNo);
            xlsRows.push(item.customerName);
            xlsRows.push(item.gstNo);
            xlsRows.push(item.invoiceDate);

            xlsRows.push(item.subtotal1);
            xlsRows.push(taxRate);

            xlsRows.push(item.prefinalAmount);
            xlsRows.push(Math.round(((0.01 * Number(item.cgsta)) * Number(item.prefinalAmount))));
            xlsRows.push(Math.round(((0.01 * Number(item.sgsta)) * Number(item.prefinalAmount))));
            xlsRows.push(Math.round(((0.01 * Number(item.igsta)) * Number(item.prefinalAmount))));
            xlsRows.push(item.paymentMode);
            xlsRows.push("+");



          });



        } else {

          xlsRows = [];
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
  GenerateExcel() {
    var createXLSLFormatObj = [];
    /* XLS Head Columns */
    var xlsHeaderMain = ["INVOICE REPORT LIST"]
    createXLSLFormatObj.push(xlsHeaderMain);
    /* XLS Head Columns */
    var xlsHeader = ["Invoice No", "Customer Name", "GSTIN", "Invoice Date", "Invoice Value", "TAX Rate(%)", "Taxable Value", "CENTRAL TAX", "STATE TAX", "IGST", "Payment Mode"];
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
    /* File Name */
    var filename = "Invoicelist.xlsx";
    /* Sheet Name */
    var ws_name = "Invoicelist";
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);
    /* set column width */
    var wscols = [
      { wch: 10 },
      { wch: 15 },
      { wch: 16 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { hidden: true }, // hide column,
    ];
    /* set row height */
    var wsrows = [
      { hpt: 25 }, // "points"
      // {hpx: 16}, // "pixels"
      ,
      // {hpx: 24, level:3},
      // {hidden: true}, // hide row
      // {hidden: false}
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
  PayInvoice() {
    var self = this;


    if (this.state.id === undefined || this.state.id == "") {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Invoice ',

      })
    } else {

      if (self.state.status == "PartiallyPaid" || self.state.status == "UnPaid") {
        ReactDOM.render(<SalesReportEdit invoiceNo={self.state.id}
          date={self.state.date} userName={self.state.customerName} contact={self.state.contact}
          status={self.state.status} balanceAmt={self.state.balanceAmt}
          subtotal1={self.state.subtotal1} customerId={self.state.customerId}
          siteName={self.state.siteName} />, document.getElementById("contentRender"));

      } else {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Already Paid',
          showConfirmButton: false,
          timer: 2000
        })
      }


    }


  }

  RowClickFunc(rowData) {

    var self = this;

    console.log("ROW CLICK FUNC :", rowData);


    self.state.id = rowData.id;
    self.state.date = rowData.date;
    self.state.customerName = rowData.customerName;
    self.state.contact = rowData.contact;
    self.state.status = rowData.status;
    self.state.balanceAmt = rowData.balanceAmt;
    self.state.subtotal1 = rowData.subtotal1;
    self.state.customerId = rowData.customerId;
    self.state.companyName = rowData.companyName;
    self.state.orderNumber = rowData.orderNumber;
    self.state.invoiceDate = rowData.invoiceDate;
    self.state.dueDate = rowData.dueDate;
    self.state.address = rowData.address;
    self.state.gstNo = rowData.gstNo;
    self.state.email = rowData.email;
    self.state.advance = rowData.advance;
    self.state.discount = rowData.discount;
    self.state.paymentMode = rowData.paymentMode;
    self.state.staffId = rowData.staffId;
    self.state.serviceBy = rowData.serviceBy;
    self.state.advisor = rowData.advisor;
    //  self.state.vehicleMake = rowData.vehicleMake;
    //  self.state.vehicleModel = rowData.vehicleModel;
    // self.state.vehicleFuelType = rowData.vehicleFuelType;
    self.state.rowIndexValue = rowData.rowIndexValue;
    self.state.siteName = rowData.siteName;


    self.setState({
      id: self.state.id,
      date: self.state.date,
      customerName: self.state.customerName,
      contact: self.state.contact,
      status: self.state.status,
      balanceAmt: self.state.balanceAmt,
      subtotal1: self.state.subtotal1,
      customerId: self.state.customerId,
      companyName: self.state.companyName,
      orderNumber: self.state.orderNumber,
      invoiceDate: self.state.invoiceDate,
      dueDate: self.state.dueDate,
      address: self.state.address,
      gstNo: self.state.gstNo,
      email: self.state.email,
      advance: self.state.advance,
      discount: self.state.discount,
      paymentMode: self.state.paymentMode,
      staffId: self.state.staffId,
      serviceBy: self.state.serviceBy,
      bookingId: self.state.bookingId,
      vehicleRegistrationNo: self.state.vehicleRegistrationNo,
      advisor: self.state.advisor,
      vehicleMake: self.state.vehicleMake,
      vehicleModel: self.state.vehicleModel,
      vehicleFuelType: self.state.vehicleFuelType,
      rowIndexValue: self.state.rowIndexValue,
      siteName: self.state.siteName,
    })


  }

  AfterDelete() {

    console.log("AfterDelete ");

    this.state.deleteStatus = "false";
    this.setState({
      deleteStatus: this.state.deleteStatus
    })

    //  this.ClearFunc();

    var self = this;

    self.state.id = "";
    self.state.date = "";
    self.state.customerName = "";
    self.state.contact = "";
    self.state.status = "";
    self.state.balanceAmt = "";
    self.state.subtotal1 = "";
    self.state.customerId = "";
    self.state.companyName = "";
    self.state.orderNumber = "";
    self.state.invoiceDate = "";
    self.state.dueDate = "";
    self.state.address = "";
    self.state.gstNo = "";
    self.state.email = "";
    self.state.advance = "";
    self.state.discount = "";
    self.state.paymentMode = "";
    self.state.staffId = "";
    self.state.serviceBy = "";
    self.state.bookingId = "";
    self.state.vehicleRegistrationNo = "";
    self.state.advisor = "";
    self.state.vehicleMake = "";
    self.state.vehicleModel = "";
    self.state.vehicleFuelType = "";
    self.state.siteName = "";

  }


  RenderComponenets(reactTableData) {

    var self = this;


    //  console.log("RENDER COMPONENTS FUNC : reactTableData:", reactTableData);
    switch (reactTableData) {
      case 'NormalTable':
        $("#paginationdiv").show();

        return <NormalReactTableComponent stateData={this.state} data={normalInvoiceData} itemData={itemData}
          dataCountArray={dataCountArray} pageDataStatus={pageData_Status}
          oldPageAcces={this.state.oldPageAcces} RowClickFunc={this.RowClickFunc}
          onRef={ref => (this.normalChild = ref)} AfterDelete={this.AfterDelete}

        />

      case 'SearchTable':
        $("#paginationdiv").hide();
        return <SearchReactTableComponent data={searchInvoiceData} stateData={this.state}
          RowClickFunc={this.RowClickFunc} onRef={ref => (this.searchChild = ref)}
          AfterDelete={this.AfterDelete} />;
      default:
        return <div></div>;


    }

    /*  console.log("*************** AFTER SWITCH ********");
      if(this.state.reactTableData=="NormalTable" && this.state.deleteStatus=="true"){
        alert("NORMAL TABLE DELETE");
      //  self.normalChild.UnselectRow();
        self.normalChild.RowDeleteFunc();
  
      }else if(this.state.reactTableData=="SearchTable" && this.state.deleteStatus=="true"){
        alert("SEARCH TABLE DELETE");
          //  self.searchChild.UnselectRow();
            self.searchChild.RowDeleteFunc();
  
      }/*else  if(this.state.reactTableData=="NormalTable" && this.state.deleteStatus=="false"){
        self.normalChild.UnselectRow();
  
      }else if(this.state.reactTableData=="SearchTable" && this.state.deleteStatus=="false"){
            self.searchChild.UnselectRow();
  
      } */

    /*
    alert("NORMAL TABLE UNSELECT");
    self.normalChild.UnselectRow();
    alert("SEARCH TABLE UNSELECT");
    self.searchChild.UnselectRow();
*/


  }





  render() {
    //   const  downloadButtonData=<span style={{width:"80px"}} class="glyphicon glyphicon-download-alt" ><span style={{fontFamily:"Roboto, sans-serif"}}>&nbsp;Download</span></span>
    // const downloadButtonData = <i style={{ color: "black" }} class="glyphicon glyphicon-download-alt" ></i>
    const downloadButtonData = <Invoice_xlDownldBtn />;

    return (
      <div class="container">
        <div class="">
          {/* <div className="">
            <div className="">
              <BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
            </div>
            <div className="inv_HeaderCls">
              <h3>Sale Invoice List</h3>
            </div>
          </div> */}
          <div className="inv_list_cls">
            <div class="input-group add-on inv_list_cls_search" style={{ marginTop: "6px" }}>
              <input
                type="text"
                value={this.state.search}
                class="form-control"
                placeholder="Search"
                onChange={this.handleUserInput}
                name="search"
                id="srch-term"
              />
              <div class="input-group-btn">
                <button class="btn btn-default" id="searchbtn" type="submit" onClick={() => this.SearchFunc()}><i class="glyphicon glyphicon-search"></i></button>
              </div>
            </div>
            <div className="inv_list_cls_sel_search">
              <SelectSearch options={this.state.options} value={this.state.selectedSite}
                isMulti={true}
                onChange={(e) => this.handleCurrentSite(e)} name="WorkingSite" placeholder="Select Working Site " />
            </div>
            <div className="inv_list_cls_pay_div">
              <label class="control-label " for="paymentStatus">Payment Status:</label>
              <select name="paymentStatus" id="paymentStatus" onChange={this.handleUserInputPaymentStatus} class="form-control">
                {/* <option disabled selected hidden value="">Select Payment Status</option> */}
                <option value="Paid">Paid</option>
                <option value="UnPaid">UnPaid</option>
                <option value="PartiallyPaid">PartiallyPaid</option>
                <option selected value="all">All</option>
              </select>
            </div>

          </div>
          <div className="reactIcon_Dcls">
            <InvoiceIcons onInvoiceAdd={this.AddInvoice} onInvoiceView={this.ViewInvoice}
              onInvoiceEdit={this.EditInvoiceFunc}
              onInvoicePay={this.PayInvoice} onInvoiceDelete={this.DeleteInvoice}
              onInvoiceDownload={this.DownLoadInvoiceList} />
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button"
              table="tableHeadings"
              filename="Sale_Invoice_List"
              sheet="tablexls"
              buttonText={downloadButtonData}
            />
          </div>

          {this.RenderComponenets(this.state.reactTableData)}

          <div id="tableOverflow">
            <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">
            </table>
          </div>
          <div style={{ marginBottom: "3%" }} className="pull-right" id="paginationdiv">
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.itemsPerPage}
              totalItemsCount={this.state.totlaItemCount}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange.bind(this)}
            /></div>
        </div>
      </div>
    );
  }
}
export default InvoiceList1;
