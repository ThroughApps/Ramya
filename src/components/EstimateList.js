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
import EstimateReportDisplay from './EstimateReportDisplay';
import SalesReportDisplay from './SalesReportDisplay';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import EstimateReportUpdate from './EstimateReportUpdate';
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
import Estimate from './Estimate';
import EstimateReportEdit from './EstimateReportEdit';
import { SiteDropDown, FilterOptions } from './SiteDropDown';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';

import SelectSearch from 'react-select';
import './invoiceListcss.css';
import {InvoiceIcons,Invoice_xlDownldBtn} from './ServiceRegistration/IconComponents';
import ReactTooltip from 'react-tooltip';
import {BackButtonComponent} from './ServiceRegistration/ButtonComponent';
import './BackButtoncss.css';
import InvoiceMenuPage from './Invoice/InvoiceMenuPage';
import EstimateInvoiceUpdate from './Invoice/EstimateInvoiceUpdate';


var dataList = [];
var currentRow;


class EstimateList1 extends Component {
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
      columns: [],
      site: GetCurrentSite(),

    };

    this.setState({

      companyId: companyId,

    })

    this.ViewInvoice = this.ViewInvoice.bind(this);
    this.DeleteInvoice = this.DeleteInvoice.bind(this);
    this.EditInvoice = this.EditInvoice.bind(this);
    this.PayInvoice = this.PayInvoice.bind(this);
    this.DownLoadInvoiceList = this.DownLoadInvoiceList.bind(this);

  }


  componentDidMount() {
    SetCurrentPage("EstimateInvoiceList");

    $("#tableHeadings").hide();
    $("ReactHTMLTableToExcel").css("background-color", "#05a4b5");
    $(".btn-default").css("background-color", "#05a4b5");
    $("ReactHTMLTableToExcel").css("color", "white");
    $(".btn-default").css("color", "white");
    var today = new Date();
    var today1 = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var month = today.getMonth() + 1;

    var self = this;

    window.scrollTo(0, 0);
    this.setState({
      date: this.state.date,

    });
    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
        month: month,
        empSites: GetEmployeeSite()
      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/saleorder/estimateinvoicereport",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        dataList = data.saleinvoicereportlist;

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

  remove = (rowId) => {

    // Array.prototype.filter returns new array
    // so we aren't mutating state here
    const arrayCopy = this.state.data.filter((row) => row.id !== rowId);
    this.state.data = arrayCopy;
    this.setState({ data: arrayCopy });

  };

  NoAction() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={EstimateList1} />
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
    self.state.data = [];

    console.log("RESULT IN RENDER :", result);
    if (result.length != 0) {
      var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Invoice</th><th>Date</th><th>Customer</th><th>Contact</th><th>Status</th><th>Total</th><th>Balance</th></tr></thead>';

      var no = 0;



      $.each(result, function (i, item) {
        no = Number(no) + 1;
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
        

        tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + no + '</td><td>' + item.invoiceNo + '</td><td>' + item.date + '</td>'
          + ' <td>' + item.customerName + '</td><td>' + item.contactNo + '</td>'
          + '<td>' + self.state.payment_status + '</td><td>' + item.subtotal1 + '</td>'
          + '<td>' + item.balance_amount + '</td></tr></tbody>';
        var viewclass = "";
        // if(self.state.payment_status=="Paid"){
        //   viewclass="fa fa-exclamation-circle";
        // }else{
        //   viewclass="fas fa-wallet";
        // }
        self.state.data[i] = {
          "SNo": no,
          "Invoice": item.invoiceNo,
          "Date": item.date,
       //   "Booking Id": item.bookingId,
        //  "Vehicle No": item.vehicleRegistrationNo,
          "Customer": item.customerName,
          "Contact": item.contactNo,
          "Status": self.state.payment_status,
          "Total": item.subtotal1,
          "Paid Amount": item.advance,
          "Balance": item.balance_amount,
          "BilledBy": item.staffId,
          "CustomerId": item.customerId,
          "CompanyName": item.companyName,
          "orderNumber": item.orderNumber,
          "invoiceDate": item.invoiceDate,
          "dueDate": item.dueDate,
          "address": item.address,
          "gstNo": item.gstNo,
          "email": item.email,
          "advance": item.advance,
          "discount": item.discount,
          "PaymentMode": item.paymentMode,
          "StaffId": item.staffId,
          "ServiceBy": item.serviceBy,
          "Advisor": item.advisor,
          "Site": item.site,

        };




      });

      self.state.columns = self.getColumns();

      $("#tableHeadings").append(tab);

    }
    else {

      $("#test-table-xls-button").hide();
      $("#myInput").hide();
    }

    self.setState({
      data: self.state.data,
      columns: self.state.columns
    });
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
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/SalesReport/DailyEstimateReportDelete",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {

        var array = [...self.state.data]; // make a new copy of array instead of mutating the same array directly.
        array.splice(rowIndexValue, 1);

        self.state.data = [];
        self.state.data = array;
        dataList = array;
        self.setState({ data: array });



        // Swal.fire({
        //   position: 'center',
        //   icon: 'success',
        //   title: 'Successfully Removed Invoice' + self.state.id,
        //   showConfirmButton: false,
        //   timer: 1500
        // })

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



          self.state.id = rowInfo.original["Invoice"];
          self.state.date = rowInfo.original["Date"];
          self.state.customerName = rowInfo.original["Customer"];
          self.state.contact = rowInfo.original["Contact"];
          self.state.status = rowInfo.original["Status"];
          self.state.balanceAmt = rowInfo.original["Balance"];
          self.state.subtotal1 = rowInfo.original["Total"];
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
          self.state.bookingId = rowInfo.original["Booking Id"];
          self.state.vehicleRegistrationNo = rowInfo.original["Vehicle No"];
          self.state.advisor = rowInfo.original["Advisor"];
          self.state.siteName=rowInfo.original["Site"];

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
            siteName:self.state.siteName,

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







  /* ******** NEW ICON FUNCTIONS ******* */

  AddInvoice() {

    ReactDOM.render(<InvoiceMenuPage  data="EstimateInvoice" />, document.getElementById("contentRender"));
 
  }

  EditInvoice() {

    var self = this;


    if (this.state.id === undefined) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Invoice ',

      })
    } else {

      ReactDOM.render(<EstimateInvoiceUpdate id={self.state.id}
        date={self.state.date} customerName={self.state.customerName} orderNumber={self.state.orderNumber} invoiceDate={self.state.invoiceDate} dueDate={self.state.dueDate} contact={self.state.contact}
        status={self.state.status} balanceAmt={self.state.balanceAmt} subtotal1={self.state.subtotal1} customerId={self.state.customerId} companyName={self.state.companyName} address={self.state.address}
        gstNo={self.state.gstNo} advance={self.state.advance}
        discount={self.state.discount} paymentMode={self.state.paymentMode}
        staffId={self.state.staffId}
       serviceBy={self.state.serviceBy}
        bookingId={self.state.bookingId}
        vehicleRegistrationNo={self.state.vehicleRegistrationNo}
        advisor={self.state.advisor}
        siteName={self.state.siteName}

      />, document.getElementById("contentRender"));


    }

  }

  ViewInvoice() {

    var self = this;

    if (this.state.id === undefined) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Invoice ',

      })
    } else {

      ReactDOM.render(<EstimateReportDisplay id={self.state.id} bookingId={self.state.bookingId} vehicleRegistrationNo={self.state.vehicleRegistrationNo}
        date={self.state.date} userName={self.state.customerName} contact={self.state.contact} customerEmail={self.state.customerEmail} discount={self.state.discount}  invoiceDate={self.state.invoiceDate} customerContactNo={self.state.customerContactNo} customerGstNo={self.state.customerGstNo}
        status={self.state.status} balanceAmt={self.state.balanceAmt}
         orderNumber={self.state.orderNumber} subtotal1={self.state.subtotal1} 
         customerId={self.state.customerId} companyName={self.state.companyName}
         siteName={self.state.siteName} />, document.getElementById("contentRender"));


    }


  }

  DeleteInvoice() {

    var self = this;

    if (this.state.id === undefined) {
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

  }

  PayInvoice() {
    var self = this;


    if (this.state.id === undefined) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Invoice ',

      })
    } else {

      if (self.state.status == "PartiallyPaid" || self.state.status == "UnPaid") {
        ReactDOM.render(<EstimateReportEdit invoiceNo={self.state.id}
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
  render() {
    //   const  downloadButtonData=<span style={{width:"80px"}} class="glyphicon glyphicon-download-alt" ><span style={{fontFamily:"Roboto, sans-serif"}}>&nbsp;Download</span></span>
    //const downloadButtonData = <i style={{ color: "black" }} class="glyphicon glyphicon-download-alt" ></i>
    const downloadButtonData = <Invoice_xlDownldBtn/>;
    return (
      <div class="container" style={{marginBottom: "50px" }}>
        <div class="">
         {/* <div className="">
            <div className="">
              <BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
            </div>
            <div className="inv_HeaderCls">
              <h3>Estimate Invoice List</h3> 
            </div>
          </div> */}
          <div className="inv_list_cls">
            <div className="inv_list_cls_sel_search">
            <SiteDropDown onSiteDropDown={this.handleSite} data={this.state.site} />
            </div>
          </div>
          <div className="reactIcon_Dcls">
            <InvoiceIcons onInvoiceAdd={this.AddInvoice} onInvoiceView={this.ViewInvoice}
              onInvoiceEdit={this.EditInvoice} onInvoicePay={this.PayInvoice} onInvoiceDelete={this.DeleteInvoice}
              onInvoiceDownload={this.DownLoadInvoiceList} />
              <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button "
                    table="tableHeadings"
                    filename="Sale_Invoice_List"
                    sheet="tablexls"
                    buttonText={downloadButtonData}
                  />
          </div>
          <div>
      
                <div id="tableOverflow">
                  <table style={{ margin: "auto" }} class="table table-bordered"
                   id="tableHeadings">
                  </table>
                </div>
<div className="sale_Order_Rw_Div">
                <ReactTable style={{ overflow: "auto", marginBottom: "2%" }}
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
         </div>
            </div>
        </div>
      </div>
    );
  }
}
export default EstimateList1;
