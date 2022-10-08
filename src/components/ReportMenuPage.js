import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import VendorEntryForm from './VendorEntryForm';
import CustomerList from './CustomerList';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import CryptoJS from 'crypto-js';
import './datepicker.css';
import './ReportMenuPage.css';
import { FormErrors } from './FormErrors';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import SalesDailyReport from './SalesDailyReport';

import SalesYearlyReport from './SalesYearlyReport';
import SalesMonthlyReport from './SalesMonthlyReport';
import SalesDateWiseReport from './SalesDateWiseReport';
import ExpDailyReport from './ExpDailyReport';
import ExpMonthlyReport from './ExpMonthlyReport';
import ExpYearlyReport from './ExpYearlyReport';
import ExpDateWiseReport from './ExpDateWiseReport';
import ExpYearlyReportMonthYear from './ExpYearlyReportMonthYear';
import PurchaseDailyReport from './PurchaseDailyReport';
import PurchaseMonthlyReport from './PurchaseMonthlyReport';
import PurchaseYearlyReport from './PurchaseYearlyReport';
import PurchaseDateWiseReport from './PurchaseDateWiseReport';
import PurchaseYearlyReportMonthYear from './PurchaseYearlyReportMonthYear';
import VendorCustomerStatement from './VendorCustomerStatement';
import SalesCustomerStatement from './SalesCustomerStatement';

import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import MessageCenterReport from './MessageCenterReport';


import SalesYearlyReportMonthYear from './SalesYearlyReportMonthYear';
import ProfitLossReport from './ProfitLossReport';
import TillDateProfitLossReport from './TillDateProfitLossReport';
import AvailableStockReport from './AvailableStockReport';
import InventorySummaryReport from './InventorySummaryReport';
import EstimateDailyReport from './EstimateDailyReport';
import EstimateMonthlyReport from './EstimateMonthlyReport';
import EstimateYearlyReportMonthYear from './EstimateYearlyReportMonthYear';
import EstimateDateWiseReport from './EstimateDateWiseReport';
import EstimateCustomerStatement from './EstimateCustomerStatement';
import BillDueReport from './BillDueReport';
import AuditReportMenu from './AuditReportMenu';
import EnquiryReport from './EnquiryReport';
import MonthlyFeedBackReport from './MonthlyFeedBackReport';
import AppointmentsHistory from './AppointmentsHistory';
import FutureAppointments from './FutureAppointments';
import PaymentHistoryReport from './PaymentHistoryReport';
import * as SiIcons from 'react-icons/si';
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import CustomerPaymentHistory from './CustomerPayment/CustomerPaymentHistory';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
  GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
//import Help from './Help';
var helpFuncValue = "collapsereport";
var helpClassValue;
class ReportMenuPage extends Component {
  constructor() {
    super()
    this.state = {
      categoryName: '',
      categoryDate: '',
      categoryDateValid: false,
      formErrors: {
        categoryName: '',
      },
      categoryNameValid: false,
    }

  }

  componentDidMount() {
    SetCurrentPage("ReportMenuPage");
    window.scrollTo(0, 0);

  }

  SalesDaily() {

    helpFuncValue = "helpdailysalesreport";
    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "SalesReport") {
        flag = 0;//true
      }
    });
    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={SalesDailyReport} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
    }
    else {
      this.AccessDenied();

    }

  }
  SalesMonthly() {
    helpFuncValue = "helpmonthlysalesreport";
    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "SalesReport") {
        flag = 0;//true
      }
    });
    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={SalesMonthlyReport} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
    }
    else {
      this.AccessDenied();

    }

  }

  SalesYearly() {
    helpFuncValue = "helpyearlysalesreport";

    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "SalesReport") {
        flag = 0;//true
      }
    });
    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={SalesYearlyReportMonthYear} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
    }
    else {
      this.AccessDenied();

    }
  }

  SalesDatewise() {
    helpFuncValue = "helpdatewisesalesreport";
    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "SalesReport") {
        flag = 0;//true
      }
    });
    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={SalesDateWiseReport} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
    }
    else {
      this.AccessDenied();

    }

  }




  SalesCustomerStmt() {
    helpFuncValue = "helpcustomerstatementsalesreport";
    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "SalesReport") {
        flag = 0;//true
      }
    });
    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={SalesCustomerStatement} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
    } else {
      this.AccessDenied();

    }
  }
  ExpDaily() {
    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "ExpenseReport") {
        flag = 0;//true
      }
    });
    if (flag == 0) {
      helpFuncValue = "helpdailyexpensereport";
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={ExpDailyReport} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
    }
    else {
      this.AccessDenied()

    }
  }

  ExpMonthly() {
    helpFuncValue = "helpmonthlyexpensereport";
    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "ExpenseReport") {
        flag = 0;//true
      }
    });
    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={ExpMonthlyReport} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
    }
    else {
      this.AccessDenied()

    }

  }

  ExpYearly() {
    helpFuncValue = "helpyearlyexpensereport";
    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "ExpenseReport") {
        flag = 0;//true
      }
    });
    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={ExpYearlyReportMonthYear} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
    }
    else {
      this.AccessDenied()
    }

  }

  ExpDatewise() {
    helpFuncValue = "helpdatewiseexpensereport";
    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "ExpenseReport") {
        flag = 0;//true
      }
    });
    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={ExpDateWiseReport} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
    }
    else {
      this.AccessDenied()
    }
  }

  PurDaily() {
    helpFuncValue = "helpdailypurchasereport";
    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "PurchaseReport") {
        flag = 0;//true
      }
    });
    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={PurchaseDailyReport} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
    }
    else {
      this.AccessDenied();

    }

  }

  PurMonthly() {
    helpFuncValue = "helpmonthlypurchasereport";
    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "PurchaseReport") {
        flag = 0;//true
      }
    });
    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={PurchaseMonthlyReport} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
    }
    else {
      this.AccessDenied();

    }
  }

  PurYearly() {

    helpFuncValue = "helpyearlypurchasereport";
    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "PurchaseReport") {
        flag = 0;//true
      }
    });
    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={PurchaseYearlyReportMonthYear} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
    }
    else {
      this.AccessDenied();

    }

  }

  PurDatewise() {
    helpFuncValue = "helpdatewisepurchasereport";
    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "PurchaseReport") {
        flag = 0;//true
      }
    });
    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={PurchaseDateWiseReport} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
    }
    else {
      this.AccessDenied();
    }

  }
  PurVendorStmt() {
    helpFuncValue = "helpvendorstatementpurchasereport";
    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "PurchaseReport") {
        flag = 0;//true
      }
    });
    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={VendorCustomerStatement} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
    }
    else {
      this.AccessDenied();
    }

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

  MessageCenter() {


    helpFuncValue = "helpmessagecenterreport";
    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "MessageCenterReport") {
        flag = 0;//true
      }
    });
    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>

            <Route path="/" component={MessageCenterReport} />


          </div>
        </Router>,
        document.getElementById('contentRender'));
      registerServiceWorker();
    }
    else {
      this.AccessDenied();
    }

  }
  ProfitLossReportFunc() {
    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "ProfitandLossReport") {
        flag = 0;//true
      }
    });
    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={ProfitLossReport} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
      registerServiceWorker();
    }
    else {
      this.AccessDenied();
    }
  }
  TillDateProfitLossReportFunc() {
    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "ProfitandLossReport") {
        flag = 0;//true
      }
    });
    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={TillDateProfitLossReport} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
      registerServiceWorker();
    }
    else {
      this.AccessDenied();
    }
  }

  AvailableStockFunc() {
    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "InventoryReport") {
        flag = 0;//true
      }
    });
    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={AvailableStockReport} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
      registerServiceWorker();
    } else {
      this.AccessDenied();
    }

  }

  StockSummaryFunc() {
    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "InventoryReport") {
        flag = 0;//true
      }
    });
    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={InventorySummaryReport} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
      registerServiceWorker();
    } else {
      this.AccessDenied();
    }

  }


  AuditReportFunc() {

    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "AuditReport") {
        flag = 0;//true
      }
    });
    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={AuditReportMenu} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
      registerServiceWorker();
    } else {
      this.AccessDenied();
    }
  }
  billDueReport() {

    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "BillDueReport") {
        flag = 0;//true
      }
    });
    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={BillDueReport} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
      registerServiceWorker();
    } else {
      this.AccessDenied();
    }
  }

  EnquiryReportFunc() {

    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "EnquiryReport") {
        flag = 0;//true
      }
    });
    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={EnquiryReport} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
    } else {
      this.AccessDenied();
    }
  }

  FeedBackReportFunc() {

    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "FeedBackReport") {
        flag = 0;//true
      }
    });
    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={MonthlyFeedBackReport} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
    } else {
      this.AccessDenied()
    }

  }

  AppointmentHistoryFunc() {


    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "BookedServiceReports") {
        flag = 0;//true
      }
    });
    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={AppointmentsHistory} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
      registerServiceWorker();
    } else {
      this.AccessDenied()
    }
  }

  FutureAppointmentFunc() {

    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "BookedServiceReports") {
        flag = 0;//true
      }
    });
    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={FutureAppointments} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
      registerServiceWorker();
    } else {
      this.AccessDenied()
    }
  }

  CustomerPaymentHistoryFunc() {

    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "PaymentReceivablesReports") {
        flag = 0;//true
      }
    });
    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={CustomerPaymentHistory} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
    } else {
      this.AccessDenied()
    }


  }

  PaymentHistoryReportFunc() {

    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "PaymentHistoryReport") {
        flag = 0;//true
      }
    });


    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={PaymentHistoryReport} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
    } else {
      this.AccessDenied();
    }
  }

  EstimateDaily() {

    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "EstimateReport") {
        flag = 0;//true
      }
    });


    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={EstimateDailyReport} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
    } else {
      this.AccessDenied();
    }
  }

  EstimateMonthly() {

    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "EstimateReport") {
        flag = 0;//true
      }
    });

    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={EstimateMonthlyReport} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
    } else {
      this.AccessDenied();
    }
  }

  EstimateYearly() {

    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "EstimateReport") {
        flag = 0;//true
      }
    });

    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={EstimateYearlyReportMonthYear} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
    } else {
      this.AccessDenied()
    }
  }

  EstimateDatewise() {

    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "EstimateReport") {
        flag = 0;//true
      }
    });

    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={EstimateDateWiseReport} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
    } else {
      this.AccessDenied();
    }

  }

  EstimateCustomerStmt() {


    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {

      if (item.permission == "EstimateReport") {
        flag = 0;//true
      }
    });

    if (flag == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={EstimateCustomerStatement} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
    } else {
      this.AccessDenied();
    }

  }


  AccessDenied() {

    /*  var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
      w.document.write('You are not Allowed to Access this Page')
      w.focus()
      setTimeout(function () { w.close(); }, 2000)
      */

    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: "Access Denied",
      text: "You are not Allowed to Access this Page",
      showConfirmButton: false,
      timer: 2000
    })




  }

  render() {
    return (
      <div class="container">


        <div className="repot_headercls">
          <div class=" ">
            <BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
          </div>

          {/*  <div class="">
                        <button type="button" id="print" class="btn btn-default "
                            onClick={() => this.printdiv()} >
                            <i class="fa fa-print" aria-hidden="true"
                                style={{ fontSize: "17px", border: "none" }}> Print</i></button>
                    </div> */}
        </div>
        <div className="inv_HeaderCls">
          <h3>Reports</h3>
        </div>

        {/*     <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4">
            <ul class="previous disabled" id="backbutton"
              style={{
                backgroundColor: "#05a4b5", color: "white",
                float: "none",
                display: "inline-block",
                marginLeft: "5px",
                borderRadius: "5px",
                padding: "3px 7px 3px 7px",
                marginTop: "13px",
                display: "inline-block"
              }}>
              <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></ul>

          </div>
          <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8">


          </div>


        </div> */}

        <div className="rpt_MenuDiv">
          <div class="row">
            <div class="col-sm-4 col-md-4 col-lg-4" >
              <div class="card1" style={{ boxSizing: "borderBox", backgroundColor: "white" }}>
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="mail-contnet">
                        <h3>Sales Report</h3>
                        <ul style={{ listStyleType: "disclosure-closed" }}>
                          <li><a href="#" onClick={() => this.SalesDaily()}>Daily</a></li>
                          <li><a href="#" onClick={() => this.SalesMonthly()}>Monthly</a></li>
                          <li><a href="#" onClick={() => this.SalesYearly()}>Yearly</a></li>
                          <li><a href="#" onClick={() => this.SalesDatewise()}>Date wise</a></li>
                          <li><a href="#" onClick={() => this.SalesCustomerStmt()}>Customer Statement</a></li>
                        </ul></div></div></div></div></div></div>


            <div class="col-sm-4 col-md-4 col-lg-4" style={{ boxSizing: "borderBox" }}>
              <div class="card1">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="mail-contnet">
                        <h3>Estimate Report</h3>
                        <ul style={{ listStyleType: "disclosure-closed" }}>
                          <li><a href="#" onClick={() => this.EstimateDaily()}>Daily</a></li>
                          <li><a href="#" onClick={() => this.EstimateMonthly()}>Monthly</a></li>
                          <li><a href="#" onClick={() => this.EstimateYearly()}>Yearly</a></li>
                          <li><a href="#" onClick={() => this.EstimateDatewise()}>Date wise</a></li>
                          <li><a href="#" onClick={() => this.EstimateCustomerStmt()}>Customer Statement</a></li>
                        </ul></div></div></div></div></div></div>

            <div class="col-sm-4 col-md-4 col-lg-4" style={{ boxSizing: "borderBox" }}>
              <div class="card1">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="mail-contnet">
                        <h3>Purchase Report</h3>
                        <ul style={{ listStyleType: "disclosure-closed" }}>
                          <li><a href="#" onClick={() => this.PurDaily()}>Daily</a></li>
                          <li><a href="#" onClick={() => this.PurMonthly()}>Monthly</a></li>
                          <li><a href="#" onClick={() => this.PurYearly()}>Yearly</a></li>
                          <li><a href="#" onClick={() => this.PurDatewise()}>Date wise</a></li>
                          <li><a href="#" onClick={() => this.PurVendorStmt()}>Vendor Statement</a></li>

                        </ul></div></div></div></div></div></div>

          </div>
          <div class="row">
            <div class="col-sm-4 col-md-4 col-lg-4" style={{ boxSizing: "borderBox" }}>
              <div class="card1">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="mail-contnet">
                        <h3>Expense Report</h3>
                        <ul style={{ listStyleType: "disclosure-closed" }}>
                          <li><a href="#" onClick={() => this.ExpDaily()}>Daily</a></li>
                          <li><a href="#" onClick={() => this.ExpMonthly()}>Monthly</a></li>
                          <li><a href="#" onClick={() => this.ExpYearly()}>Yearly</a></li>
                          <li><a href="#" onClick={() => this.ExpDatewise()}>Date wise</a></li>
                        </ul></div></div></div></div></div></div>




            <div class="col-sm-4 col-md-4 col-lg-4" style={{ boxSizing: "borderBox" }}>
              <div class="card1">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="mail-contnet">
                        <h3>Message Center</h3>
                        <ul style={{ listStyleType: "disclosure-closed" }}>
                          <li><a href="#" onClick={() => this.MessageCenter()}>Message Center Report</a></li>

                        </ul></div></div></div></div></div></div>
            <div class="col-sm-4 col-md-4 col-lg-4" style={{ boxSizing: "borderBox" }}>
              <div class="card1">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="mail-contnet">
                        <h3>Profit & Loss</h3>
                        <ul style={{ listStyleType: "disclosure-closed" }}>
                          <li><a href="#" onClick={() => this.ProfitLossReportFunc()}>Profit & Loss Report</a></li>
                          <li><a href="#" onClick={() => this.TillDateProfitLossReportFunc()}>Till Date Profit & Loss Report</a></li>


                        </ul></div></div></div></div></div></div>
          </div>
          <div class="row">
            <div class="col-sm-4 col-md-4 col-lg-4" style={{ boxSizing: "borderBox" }}>
              <div class="card1">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="mail-contnet">
                        <h3>Inventory</h3>
                        <ul style={{ listStyleType: "disclosure-closed" }}>
                          <li><a href="#" onClick={() => this.AvailableStockFunc()}>Available Stock</a></li>
                          <li><a href="#" onClick={() => this.StockSummaryFunc()}>Stock Summary Report</a></li>
                        </ul></div></div></div></div></div></div>




            <div class="col-sm-4 col-md-4 col-lg-4" style={{ boxSizing: "borderBox" }}>
              <div class="card1">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="mail-contnet">
                        <h3>Audit Report</h3>
                        <ul style={{ listStyleType: "disclosure-closed" }}>
                          <li><a href="#" onClick={() => this.AuditReportFunc()}>Audit Report</a></li>
                        </ul></div></div></div></div></div></div>


            <div class="col-sm-4 col-md-4 col-lg-4" style={{ boxSizing: "borderBox" }}>
              <div class="card1">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="mail-contnet">
                        <h3>Bill Due Report</h3>
                        <ul style={{ listStyleType: "disclosure-closed" }}>
                          <li><a href="#" onClick={() => this.billDueReport()}>Bill Due Report</a></li>
                        </ul></div></div></div></div></div></div>
          </div>
          <div class="row">
            <div class="col-sm-4 col-md-4 col-lg-4" style={{ boxSizing: "borderBox" }}>
              <div class="card1">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="mail-contnet">
                        <h3>Enquiry Report</h3>
                        <ul style={{ listStyleType: "disclosure-closed" }}>
                          <li><a href="#" onClick={() => this.EnquiryReportFunc()}>Enquiry Report</a></li>
                        </ul></div></div></div></div></div></div>

            <div class="col-sm-4 col-md-4 col-lg-4" style={{ boxSizing: "borderBox" }}>
              <div class="card1">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="mail-contnet">
                        <h3>Feedback Report</h3>
                        <ul style={{ listStyleType: "disclosure-closed" }}>
                          <li><a href="#" onClick={() => this.FeedBackReportFunc()}>Feedback Report</a></li>
                        </ul></div></div></div></div></div></div>
            <div class="col-sm-4 col-md-4 col-lg-4" style={{ boxSizing: "borderBox" }}>
              <div class="card1">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="mail-contnet">
                        <h3>Payment History Report</h3>
                        <ul style={{ listStyleType: "disclosure-closed" }}>
                          <li><a href="#" onClick={() => this.PaymentHistoryReportFunc()}>Payment History Report</a></li>
                        </ul></div></div></div></div></div></div>
          </div>
          <div class="row" style={{ marginBottom: "30px" }}>
            <div class="col-sm-4 col-md-4 col-lg-4" style={{ boxSizing: "borderBox" }}>
              <div class="card1">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="mail-contnet">
                        <h3>Booked Service Reports</h3>
                        <ul style={{ listStyleType: "disclosure-closed" }}>
                          <li><a href="#" onClick={() => this.AppointmentHistoryFunc()}>Booked Service History</a></li>
                          <li><a href="#" onClick={() => this.FutureAppointmentFunc()}>Booked Services in Future</a></li>
                        </ul></div></div></div></div></div></div>
            <div class="col-sm-4 col-md-4 col-lg-4" style={{ boxSizing: "borderBox" }}>
              <div class="card1">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="mail-contnet">
                        <h3>Payment Receivables Reports</h3>
                        <ul style={{ listStyleType: "disclosure-closed" }}>
                          <li><a href="#" onClick={() => this.CustomerPaymentHistoryFunc()}>Customer History</a></li>
                        </ul></div></div></div></div></div></div>


          </div>

          <div class="row" style={{ marginBottom: "30px" }}>

          </div>

        </div>





      </div>
    );
  }

}
export default ReportMenuPage;