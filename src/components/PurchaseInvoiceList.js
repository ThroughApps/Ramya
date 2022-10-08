import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
//import './gstdashboard.css';
import PurchaseReportEdit from './PurchaseReportEdit';
import PurchaseReportDisplay from './PurchaseReportDisplay';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import PurchaseReportUpdate from './PurchaseReportUpdate';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './DownloadButton.css';
import "./MainPageRedirectButton.css";
import PurchaseInvoice1 from './PurchaseInvoice';
import { SiteDropDown, FilterOptions } from './SiteDropDown';
//import { GetCurrentSite, GetEmployeeSite } from './ConstSiteFunction';
import { InvoiceIcons, Invoice_xlDownldBtn } from './ServiceRegistration/IconComponents';
import ReactTooltip from 'react-tooltip';
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import {
  GetEmployeeSite, GetCurrentSite, GetSiteDetails,
  GetCurrencies, SetCurrentPage, GetDynamicFieldsName
} from './ConstSiteFunction';
import _ from 'underscore';


var dataList = [];
var currentRow;
class PurchaseInvoiceList1 extends Component {
  constructor(data) {
    super(data)
    var today = new Date();
    var today1 = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var month = today.getMonth() + 1;
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)


    this.state = {
      date: today1,
      companyId: companyId,
      month: month,
      staffId: staffId,
      employeeName: employeeName,
      role: role,
      data: [],
      columns: [],
      site: GetCurrentSite(),
      tax1LabelName: '',
      tax2LabelName: '',
      tax3LabelName: '',

    };


    this.AddInvoice = this.AddInvoice.bind(this);
    this.ViewInvoice = this.ViewInvoice.bind(this);
    this.DeleteInvoice = this.DeleteInvoice.bind(this);
    this.EditInvoice = this.EditInvoice.bind(this);
    this.PayInvoice = this.PayInvoice.bind(this);
    this.DownLoadInvoiceList = this.DownLoadInvoiceList.bind(this);
  }


  componentDidMount() {

    SetCurrentPage("PurchaseInvoiceList");

    var today = new Date();

    //DYNAMIC FIELD NAMES
    var dynamicTaxData = GetDynamicFieldsName("Tax");
    console.log("dynamicTaxData :", dynamicTaxData);

    var tax1LabelName = _.findWhere(dynamicTaxData, { fieldLabelName: 'tax1' });
    this.state.tax1LabelName = tax1LabelName.fieldTextName;
    console.log(tax1LabelName.fieldTextName);

    var tax2LabelName = _.findWhere(dynamicTaxData, { fieldLabelName: 'tax2' });
    this.state.tax2LabelName = tax2LabelName.fieldTextName;

    console.log(tax2LabelName.fieldTextName);
    var tax3LabelName = _.findWhere(dynamicTaxData, { fieldLabelName: 'tax3' });
    this.state.tax3LabelName = tax3LabelName.fieldTextName;


    this.setState({
      tax1LabelName: this.state.tax1LabelName,
      tax2LabelName: this.state.tax2LabelName,
      tax3LabelName: this.state.tax3LabelName,

    })


    $("#tableHeadings").hide();
    $("ReactHTMLTableToExcel").css("background-color", "#05a4b5");
    $(".btn-default").css("background-color", "#05a4b5");
    $("ReactHTMLTableToExcel").css("color", "white");
    $(".btn-default").css("color", "white");
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
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/vendororder/purchaseinvoicereport",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        dataList = data.purchaseinvoicereportlist;

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
    var no;
    var self = this;
    self.state.data = [];
    if (result.length != 0) {

      var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Invoice</th><th>Date     </th><th>Vendor  </th><th>Description</th><th>Contact</th><th>Status</th><th>Total</th><th>Shipping</th><th>Balance</th></tr></thead>'; var no;
      $.each(result, function (i, item) {
        no = parseInt(i) + 1;

        if ((item.subtotal1 == item.finalAmountTotal) || (item.subtotal1 < item.finalAmountTotal)) {
          self.state.payment_status = "UnPaid";

          self.setState({
            payment_status: self.state.payment_status,
          })
        }
        if (item.finalAmountTotal == 0) {
          self.state.payment_status = "Paid";
          self.setState({
            payment_status: self.state.payment_status,
          })
        }

        if ((item.subtotal1 > item.finalAmountTotal) && (item.finalAmountTotal != 0)) {
          self.state.payment_status = "PartiallyPaid";
          self.setState({
            payment_status: self.state.payment_status,
          })
        }
        tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + no + '</td>'
          + '<td>' + item.invoiceNo + '</td><td>' + item.date + '</td>'
          + '<td>' + item.vendorName + '</td><td>' + item.description + '</td><td>' + item.contactNo + '</td>'
          + '<td>' + self.state.payment_status + '</td><td>' + item.subtotal1 + '</td>'
          + '<td>' + item.shipping + '</td><td>' + item.finalAmountTotal + '</td></tr></tbody>';

        self.state.data[i] = {
          "SNo": no,
          "Invoice No": item.purchaseInvoiceNo,
          " Date": item.invoiceDate,
          "Date": item.date,
          "Vendor": item.vendorName,
          "Description": item.description,
          "Contact": item.contactNo,
          "Total": item.subtotal1,
          "Shipping": item.shipping,
          "Balance": item.finalAmountTotal,
          "VendorId": item.vendorId,
          "CompanyName": item.companyName,
          "orderNumber": item.orderNumber,
          "invoiceDate": item.invoiceDate,
          "dueDate": item.dueDate,
          "address": item.address,
          "gstNo": item.gstNo,
          "email": item.email,
          "adjustment": item.adjustment,
          "discount": item.discount,
          "discountPercentage": item.discountPercentage,
          "discountAmount": item.discountAmount,
          "prefinalAmount": item.prefinalAmount,
          "Invoice": item.invoiceNo,
          "Status": self.state.payment_status,
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

  NoAction() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={PurchaseInvoiceList1} />
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
        staffId: self.state.staffId,
        employeeName: self.state.employeeName,
        role: self.state.role,
        vendorName: self.state.vendorName,
      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/PurchaseReport/DailyPurchaseReportDelete",
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


        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Successfully Removed Invoice" + self.state.id,
          showConfirmButton: false,
          timer: 2000
        })
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

        key != "VendorId" &&
        key != "CompanyName" &&
        key != "orderNumber" &&
        key != "invoiceDate" &&
        key != "dueDate" &&
        key != "address" &&
        key != "gstNo" &&
        key != "email" &&
        key != "adjustment" &&
        key != "discount" &&
        key != "discountPercentage" &&
        key != "discountAmount" &&
        key != "prefinalAmount" &&
        key != "Invoice" &&
        key != "Status" &&
        key != "Date"
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
          self.state.vendorName = rowInfo.original["Vendor"];
          self.state.contact = rowInfo.original["Contact"];
          self.state.status = rowInfo.original["Status"];
          self.state.balanceAmt = rowInfo.original["Balance"];
          self.state.subtotal1 = rowInfo.original["Total"];
          self.state.vendorId = rowInfo.original["VendorId"];
          self.state.companyName = rowInfo.original["CompanyName"];
          self.state.orderNumber = rowInfo.original["orderNumber"];
          self.state.invoiceDate = rowInfo.original["invoiceDate"];
          self.state.dueDate = rowInfo.original["dueDate"];
          self.state.address = rowInfo.original["address"];
          self.state.gstNo = rowInfo.original["gstNo"];
          self.state.email = rowInfo.original["email"];
          self.state.adjustment = rowInfo.original["adjustment"];
          self.state.discount = rowInfo.original["discount"];
          self.state.shipping = rowInfo.original["Shipping"];
          self.state.description = rowInfo.original["Description"];
          self.state.finalAmountTotal = rowInfo.original["Balance"];
          self.state.discountPercentage = rowInfo.original["discountPercentage"];
          self.state.discountAmount = rowInfo.original["discountAmount"];
          self.state.prefinalAmount = rowInfo.original["prefinalAmount"];
          self.state.purchaseInvoiceNo = rowInfo.original["Invoice No"];
          self.state.siteName = rowInfo.original["Site"];



          self.setState({
            id: self.state.id,
            vendorName: self.state.vendorName,
            date: self.state.date,
            vendorId: self.state.vendorId,
            companyName: self.state.companyName,
            orderNumber: self.state.orderNumber,
            invoiceDate: self.state.invoiceDate,
            dueDate: self.state.dueDate,
            address: self.state.address,
            gstNo: self.state.gstNo,
            email: self.state.email,
            adjustment: self.state.adjustment,
            discount: self.state.discount,
            shipping: self.state.shipping,
            contact: self.state.contact,
            status: self.state.status,
            balanceAmt: self.state.balanceAmt,
            subtotal1: self.state.subtotal1,
            description: self.state.description,
            discountPercentage: self.state.discountPercentage,
            discountAmount: self.state.discountAmount,
            prefinalAmount: self.state.prefinalAmount,
            purchaseInvoiceNo: self.state.purchaseInvoiceNo,
            siteName: self.state.siteName,


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


    ReactDOM.render(<PurchaseInvoice1 tax1LabelName={this.state.tax1LabelName}
      tax2LabelName={this.state.tax2LabelName}
      tax3LabelName={this.state.tax3LabelName}
      siteName={this.state.siteName} />, document.getElementById('contentRender'));

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


      ReactDOM.render(<PurchaseReportUpdate id={self.state.id}
        date={self.state.date} vendorName={self.state.vendorName} orderNumber={self.state.orderNumber} invoiceDate={self.state.invoiceDate} dueDate={self.state.dueDate} contact={self.state.contact}
        status={self.state.status} balanceAmt={self.state.balanceAmt} subtotal1={self.state.subtotal1} vendorId={self.state.vendorId} companyName={self.state.companyName} address={self.state.address}
        gstNo={self.state.gstNo} email={self.state.email} adjustment={self.state.adjustment} discount={self.state.discount} shipping={self.state.shipping}
        purchaseInvoiceNo={self.state.purchaseInvoiceNo}
        tax1LabelName={this.state.tax1LabelName}
        tax2LabelName={this.state.tax2LabelName}
        tax3LabelName={this.state.tax3LabelName}
        siteName={this.state.siteName}

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

      ReactDOM.render(<PurchaseReportDisplay description={self.state.description} id={self.state.id} invoiceNo={self.state.invoiceNo}
        date={self.state.date} userName={self.state.userName} contact={self.state.contact}
        companyName={self.state.companyName} status={self.state.status}
        discountPercentage={self.state.discountPercentage}
        discountAmount={self.state.discountAmount}
        prefinalAmount={self.state.prefinalAmount}
        finalAmountTotal={self.state.finalAmountTotal} subtotal1={self.state.subtotal1}
        purchaseInvoiceNo={self.state.purchaseInvoiceNo}
        tax1LabelName={this.state.tax1LabelName}
        tax2LabelName={this.state.tax2LabelName}
        tax3LabelName={this.state.tax3LabelName}
        siteName={this.state.siteName}
      />, document.getElementById("contentRender"));



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


        ReactDOM.render(<PurchaseReportEdit invoiceNo={self.state.id}
          date={self.state.date} userName={self.state.vendorName} contact={self.state.contact}
          status={self.state.status}
          finalAmountTotal={self.state.balanceAmt}
          subtotal1={self.state.subtotal1}
          vendorId={self.state.vendorId}
          siteName={this.state.siteName} />, document.getElementById("contentRender"));


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
    //  const downloadButtonData = <i style={{ color: "black" }} class="glyphicon glyphicon-download-alt" ></i>	
    const downloadButtonData = <Invoice_xlDownldBtn />;
    return (
      <div class="container" style={{ marginBottom: "50px" }}>
        <div className="">
          <div className="">
            <BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
          </div>
          <div className="inv_HeaderCls">
            <h3>Purchase Invoice Report</h3>
          </div>
        </div>
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
            filename="Purchase_Invoice_List"
            sheet="tablexls"
            buttonText={downloadButtonData}
          />
        </div>
        <div id="tableOverflow">
          <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">
          </table>
        </div>


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
    );
  }

}

export default PurchaseInvoiceList1;