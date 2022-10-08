import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import {
    BrowserRouter as Router,
    Route,
    NavLink
} from 'react-router-dom';
import registerServiceWorker from '../registerServiceWorker';
import CryptoJS from 'crypto-js';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import * as moment from "moment";
import _ from 'underscore';
import Select from 'react-select';
import FilterResults from 'react-filter-search';
import "./GlobalSearchCSS.css";
import ServiceRegistration from '../ServiceRegistration/ServiceRegistration';
import VehicleRegistrationList from '../VehicleRegistrationList';
import SaleOrder1 from '../SaleOrder';
import InvoiceList1 from '../InvoiceList';
import EstimateList from '../EstimateList';
import Estimate from '../Estimate';
import CustomerwisePayment from '../CustomerPayment/CustomerwisePayment';
import AddProduct1 from '../AddProduct';
import ProductList1 from '../ProductList';
import VendorEntryForm1 from '../VendorEntryForm';
import VendorList1 from '../VendorList';
import PurchaseInvoice1 from '../PurchaseInvoice';
import PurchaseInvoiceList1 from '../PurchaseInvoiceList';
import AddVehicle from '../AddVehicle';
import VehicleList1 from '../VehicleList';
import CustomerList1 from '../CustomerList';
import VehicleMakeModel from '../ServiceRegistration/VehicleMakeModel';
import Expense1 from '../Expense';
import AddCategory1 from '../AddCategory';
import AddUser1 from '../AddUser';
import Enquiry from '../Enquiry';
import AddAppointment from '../AddAppointment';
import AppointmentCalendar from '../AppointmentCalendar';
import AppointmentConfirmation from '../AppointmentConfirmation';
import AddStaff from '../AddStaff';
import StaffList1 from '../StaffList';
import AddRole1 from '../AddRole';
import Salary from '../Salary';
import SalaryReport1 from '../SalaryReport';
import AddBank from '../AddBank';
import BankReport from '../BankReport';
import Checkinout from '../Checkinout';
import Attendance from '../Attendance';
import AttendanceReportMenuPage from '../AttendanceReportMenuPage';
import ReportMenuPage from '../ReportMenuPage';
import SalesDailyReport from '../SalesDailyReport';
import SalesMonthlyReport from '../SalesMonthlyReport';
import SalesYearlyReportMonthYear from '../SalesYearlyReportMonthYear';
import SalesDateWiseReport from '../SalesDateWiseReport';
import SalesCustomerStatement from '../SalesCustomerStatement';
import EstimateDailyReport from '../EstimateDailyReport';
import EstimateMonthlyReport from '../EstimateMonthlyReport';
import EstimateYearlyReportMonthYear from '../EstimateYearlyReportMonthYear';
import EstimateDateWiseReport from '../EstimateDateWiseReport';
import EstimateCustomerStatement from '../EstimateCustomerStatement';
import PurchaseDailyReport from '../PurchaseDailyReport';
import PurchaseMonthlyReport from '../PurchaseMonthlyReport';
import PurchaseYearlyReportMonthYear from '../PurchaseYearlyReportMonthYear';
import PurchaseDateWiseReport from '../PurchaseDateWiseReport';
import VendorCustomerStatement from '../VendorCustomerStatement';
import ExpDailyReport from '../ExpDailyReport';
import ExpMonthlyReport from '../ExpMonthlyReport';
import ExpYearlyReportMonthYear from '../ExpYearlyReportMonthYear';
import ExpDateWiseReport from '../ExpDateWiseReport';
import MessageCenterReport from '../MessageCenterReport';
import ProfitLossReport from '../ProfitLossReport';
import TillDateProfitLossReport from '../TillDateProfitLossReport';
import AvailableStockReport from '../AvailableStockReport';
import InventorySummaryReport from '../InventorySummaryReport';
import AuditReportMenu from '../AuditReportMenu';
import BillDueReport from '../BillDueReport';
import EnquiryReport from '../EnquiryReport';
import MonthlyFeedBackReport from '../MonthlyFeedBackReport';
import PaymentHistoryReport from '../PaymentHistoryReport';
import AppointmentsHistory from '../AppointmentsHistory';
import FutureAppointments from '../FutureAppointments';
import CustomerPaymentHistory from '../CustomerPayment/CustomerPaymentHistory';

import ConfigurationPage from '../ConfigurationPage';
import TaskMappingElite from '../TaskMappingElite';
import ImportLogo from '../ImportLogo';
import CompanySetting from '../CompanySettings';
import ChangePassword1 from '../ChangePassword';
import Help from '../Help';
import LocationPage from '../LocationPage';
import ImportMenuPage from '../ImportMenuPage';
import ExportMenuPage from '../ExportMenuPage';
import ImportQRCode from '../ImportQRCode';
import MessageCenterEmailPage from '../Communication/MessageCenterEmailPage';
import MessageCenterMessagePage from '../Communication/MessageCenterMessagePage';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from '../ConstSiteFunction';
import { LastLocationProvider } from 'react-router-last-location';


export default class GlobalSearch extends Component {

    constructor(props) {
        super(props)

                
window.globalSearchComponent = this;

this.EmptyGlobalSearch=this.EmptyGlobalSearch.bind(this);

        this.state = {

            data: [
                /*{
                mainModuleName: "Job Card",
                subModuleName: "Job Card - Add",
                keyWords: "Job Service Registration "
                    + "Customer add vehicle",
            },
            */
          /*  {
                mainModuleName: "Job Card",
                subModuleName: "Job card - List/View/Update/Delete",
                keyWords: "Job Service Registration delete update list report "
                    + "view",
            },
            */
            {
                mainModuleName: "Job Card",
                subModuleName: "Add Sale Invoice",
                keyWords: "make invoice job service billing print staff payment cart product add sale",
            },
            {
                mainModuleName: "Job Card",
                subModuleName: "Sale Invoice - List/View/Print/Pay/Update/Delete",
                keyWords: "sale invoice list edit report excel download print view pay update add make"
                    + " deleteinvoice status",
            },
            {
                mainModuleName: "Job Card",
                subModuleName: "Add Estimate Invoice",
                keyWords: "make invoice job Pro forma service billing print staff payment cart product add Estimate",
            },
            {
                mainModuleName: "Job Card",
                subModuleName: "Estimate Invoice - List/View/Print/Pay/Update/Delete",
                keyWords: "Estimate invoice edit Pro forma list report excel download print view pay update add make"
                    + " deleteinvoice status",
            },
            {
                mainModuleName: "Job Card",
                subModuleName: "Customer Payment",
                keyWords: "payment pay invoice amount total money overall customer",
            },
            {
                mainModuleName: "Inventory",
                subModuleName: "Add Product/Service",
                keyWords: "add product service quantity rate limit",
            },
            {
                mainModuleName: "Inventory",
                subModuleName: "Product/Service - List/View/Update/Delete",
                keyWords: "add product service quantity inventory rate limit list report view delete edit update",
            },
            {
                mainModuleName: "Inventory",
                subModuleName: "Add Vendor",
                keyWords: "vendor vendorname  gstno add addvendor",
            },
            {
                mainModuleName: "Inventory",
                subModuleName: "Vendor - List/View/Update/Delete",
                keyWords: "vendor vendorname  gstno add addvendor list report view delete edit update",
            },
            {
                mainModuleName: "Inventory",
                subModuleName: "Add Purchase Invoice",
                keyWords: "make invoice job service billing inventory print staff payment cart product add purchase payment pay invoice amount total money overall vendor",
            },
            {
                mainModuleName: "Inventory",
                subModuleName: "Purchase Invoice - List/View/Print/Pay/Update/Delete",
                keyWords: "make invoice job service billing inventory print staff payment cart product add purchase payment pay invoice amount total money overall vendor invoice list edit report excel download print view pay update add make deleteinvoice status",
            },
          /*  {
                mainModuleName: "CRM",
                subModuleName: "Vehicle - Add/List/View/Update/Delete",
                keyWords: "vehicle list edit report excel download view update add "
                    + " delete",
            },
            */
            {
                mainModuleName: "CRM",
                subModuleName: "Customer - Add/List/View/Update/Delete",
                keyWords: "customer list edit report excel download view update add  delete",
            },
          /*  {
                mainModuleName: "CRM",
                subModuleName: "Vehicle Make and Model",
                keyWords: "vehicle make model modal fueltype add list edit report delete",
            },
            */
            {
                mainModuleName: "Expense",
                subModuleName: "Add Expense",
                keyWords: "expense expensereport",
            },
            {
                mainModuleName: "Expense",
                subModuleName: "Add Category",
                keyWords: "category  addcategory",
            },
            {
                mainModuleName: "Expense",
                subModuleName: "Add User",
                keyWords: "admin adduser",
            },
            {
                mainModuleName: "Enquiry",
                subModuleName: "Add Enquiry",
                keyWords: "Enquiry addenquiry",
            },
            {
                mainModuleName: "Book Service",
                subModuleName: "Book a service",
                keyWords: "book bookservice customerservice appointment",
            },
            {
                mainModuleName: "Service Calendar",
                subModuleName: "View Service Calendar",
                keyWords: "Calendar bookservice viewCalendar appointment",
            },
            {
                mainModuleName: "Service Confirmation",
                subModuleName: "Booked Service Confirmation",
                keyWords: "accept reject Booked Confirmation bookservice deny confirm appointment",
            },
            {
                mainModuleName: "Employee",
                subModuleName: "Add Employee",
                keyWords: "employee staff addstaff addemployee",
            },
            {
                mainModuleName: "Employee",
                subModuleName: "Employee - List/View/Update/Delete",
                keyWords: "employee staff addstaff addemployee list report view update delete edit",
            },
            {
                mainModuleName: "Employee",
                subModuleName: "Add Role",
                keyWords: "role addrole employee staff addstaff addemployee",
            },
            {
                mainModuleName: "Employee",
                subModuleName: "Salary",
                keyWords: "employee staff salary addemployee",
            },
            {
                mainModuleName: "Employee",
                subModuleName: "Salary Report",
                keyWords: "employee staff salary salaryreport addemployee",
            },
            {
                mainModuleName: "Bank",
                subModuleName: "Add Bank",
                keyWords: "bank addBank account billingaddress",
            },
            {
                mainModuleName: "Bank",
                subModuleName: "Bank - List/Update/Delete",
                keyWords: "bank addBank account bankdetails list delete update billingaddress",
            },
            {
                mainModuleName: "Attendance",
                subModuleName: "CheckIn/Out",
                keyWords: "attendance checkin checkout",
            },
            {
                mainModuleName: "Attendance",
                subModuleName: "Manual Attendance",
                keyWords: "attendance checkin checkout manual",
            },
            {
                mainModuleName: "Attendance",
                subModuleName: "Report",
                keyWords: "attendance checkin checkout manual report daily monthly period",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Reports",
                keyWords: "Reports report overall",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Sales Report - Daily Sales",
                keyWords: "sales today daily dailysales current report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Sales Report - Monthly Sales",
                keyWords: "sales Monthly monthlysales report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Sales Report - Yearly Sales",
                keyWords: "sales Yearly yearlysales report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Sales Report - Date Wise Sales",
                keyWords: "sales Date Wise datewise datewisesales period report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Sales Report - Customer Statement",
                keyWords: "sales Customer Statement customerstatement report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Estimate Report - Daily Estimate",
                keyWords: "Estimate today daily dailyestimate current report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Estimate Report - Monthly Estimate",
                keyWords: "Estimate Monthly monthlyestimate report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Estimate Report - Yearly Estimate",
                keyWords: "Estimate Yearly yearlyestimate report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Estimate Report - Date Wise Estimate",
                keyWords: "Estimate Date Wise datewiseEstimate period report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Estimate Report - Customer Statement",
                keyWords: "Estimate Customer Statement customerstatement report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Purchase Report - Daily Purchase",
                keyWords: "Purchase today daily dailyPurchase current report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Purchase Report - Monthly Purchase",
                keyWords: "Purchase Monthly monthlyPurchase report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Purchase Report - Yearly Purchase",
                keyWords: "Purchase Yearly yearlyPurchase report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Purchase Report - Date Wise Purchase",
                keyWords: "Purchase Date Wise datewisePurchase period report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Purchase Report - Vendor Statement",
                keyWords: "Purchase Vendor Statement Vendorstatement report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Expense Report - Daily Expense",
                keyWords: "Expense today daily dailyExpense current report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Expense Report - Monthly Expense",
                keyWords: "Expense Monthly monthlyExpense report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Expense Report - Yearly Expense",
                keyWords: "Expense Yearly yearlyExpense report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Expense Report - Date Wise Expense",
                keyWords: "Expense Date Wise datewiseExpense period report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Message Center Report",
                keyWords: "Message Center Report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Profit and Loss Report - Profit and Loss",
                keyWords: "Profit and Loss Report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Profit and Loss Report - Till Date Profit and Loss",
                keyWords: "Till Date Profit and Loss Report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Inventory - Available Stock",
                keyWords: "Inventory Available Stock report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Inventory - Stock Summary Report",
                keyWords: "Inventory Stock Summary Stock report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Audit Report",
                keyWords: "Audit Report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Bill Due Report",
                keyWords: "Bill Due Report remainder",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Enquiry Report",
                keyWords: "Enquiry Report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "FeedBack Report",
                keyWords: "FeedBack Report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Payment History Report",
                keyWords: "Payment History Report",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Booked Service Reports - Booked Service History",
                keyWords: "Booked Service History Reports",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Booked Service Reports - Booked Services in Future",
                keyWords: "Booked Service Future Reports",
            },
            {
                mainModuleName: "Reports",
                subModuleName: "Payment Receivables Reports - Customer History",
                keyWords: "Payment Receivables Reports Customer History",
            },
            {
                mainModuleName: "Communication",
                subModuleName: "Offer Messages",
                keyWords: "Communication Offer Messages sms",
            },
            {
                mainModuleName: "Communication",
                subModuleName: "Emails",
                keyWords: "Communication Offer Emails notification",
            },
            {
                mainModuleName: "Configuration",
                subModuleName: "Configuration",
                keyWords: "Configuration settings",
            },
            {
                mainModuleName: "Task Mapping",
                subModuleName: "Task Mapping",
                keyWords: "Task Mapping permission role access settings",
            },
            {
                mainModuleName: "Logo",
                subModuleName: "Import Logo",
                keyWords: "logo importlogo import companylogo symbol brand",
            },
            {
                mainModuleName: "QRCode",
                subModuleName: "Import QRCode",
                keyWords: "Import QRCode importqrcode pay link",
            },
            {
                mainModuleName: "Excel",
                subModuleName: "Export Excel",
                keyWords: "Export Excel bluck customer vendor product staff employee add",

            },
            {
                mainModuleName: "Excel",
                subModuleName: "Import Excel",
                keyWords: "Import Excel bluck customer vendor product staff employee add",
            }, {
                mainModuleName: "Location",
                subModuleName: "Add Location",
                keyWords: "Add Location site sitename multiplesite multiple",
            },
            {
                mainModuleName: "Help",
                subModuleName: "About Modules",
                keyWords: "About Modules help content flow",
            },
            {
                mainModuleName: "Password",
                subModuleName: "Change Password",
                keyWords: "Change Password forgot password",
            },
            {
                mainModuleName: "Company Settings",
                subModuleName: "Company Details",
                keyWords: "Company Details settings contactno companyid",
            },
            ],
            value: '',


        }
    }
    componentDidMount() {
        SetCurrentPage("GlobalSearch");
        var self = this;
        window.scrollTo(0, 0);

        $("#renderData").hide();
        $("#accessDeniedSpan").hide();


    }



    handleChange = event => {
        const { value } = event.target;

        $("#accessDeniedSpan").hide();

        this.setState({ value });

        if (event.target.value != "") {
            $("#renderData").show();
        } else {
            $("#renderData").hide();
        }

    };
    ModuleOnClickFunc(moduleName) {
        console.log("MODULE CLICK :", moduleName);

        var self = this;
        $("#accessDeniedSpan").hide();
        switch (moduleName) {
            case 'Job Card - Job Card - Add':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={ServiceRegistration} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;

            case 'Job Card - Job card - List/View/Update/Delete':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={VehicleRegistrationList} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;

            case 'Job Card - Add Sale Invoice':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>
                        <LastLocationProvider>
                            <Route path="/" component={SaleOrder1} />
                            </LastLocationProvider>
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;

            case 'Job Card - Sale Invoice - List/View/Print/Pay/Update/Delete':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={InvoiceList1} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Job Card - Add Estimate Invoice':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={Estimate} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Job Card - Estimate Invoice - List/View/Print/Pay/Update/Delete':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={EstimateList} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Job Card - Customer Payment':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={CustomerwisePayment} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;

            case 'Inventory - Add Product/Service':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={AddProduct1} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;

            case 'Inventory - Product/Service - List/View/Update/Delete':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={ProductList1} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;

            case 'Inventory - Add Vendor':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={VendorEntryForm1} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;

            case 'Inventory - Vendor - List/View/Update/Delete':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={VendorList1} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;

            case 'Inventory - Add Purchase Invoice':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={PurchaseInvoice1} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;

            case 'Inventory - Purchase Invoice - List/View/Print/Pay/Update/Delete':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={PurchaseInvoiceList1} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;


            case 'CRM - Vehicle - Add/List/View/Update/Delete':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={VehicleList1} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'CRM - Customer - Add/List/View/Update/Delete':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={CustomerList1} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'CRM - Vehicle Make and Model':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={VehicleMakeModel} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;

            case 'Expense - Add Expense':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={Expense1} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;

            case 'Expense - Add Category':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={AddCategory1} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;

            case 'Expense - Add User':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={AddUser1} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Enquiry - Add Enquiry':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={Enquiry} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Book Service - Book a service':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={AddAppointment} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;

            case 'Service Calendar - View Service Calendar':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={AppointmentCalendar} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Service Confirmation - Booked Service Confirmation':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={AppointmentConfirmation} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Employee - Add Employee':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={AddStaff} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Employee - Employee - List/View/Update/Delete':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={StaffList1} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Employee - Add Role':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={AddRole1} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Employee - Salary':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={Salary} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Employee - Salary Report':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={SalaryReport1} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Bank - Add Bank':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={AddBank} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Bank - Bank - List/Update/Delete':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={BankReport} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Attendance - CheckIn/Out':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={Checkinout} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Attendance - Manual Attendance':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={Attendance} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Attendance - Report':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={AttendanceReportMenuPage} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Reports':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={ReportMenuPage} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Sales Report - Daily Sales':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={SalesDailyReport} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;

            case 'Reports - Sales Report - Monthly Sales':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={SalesMonthlyReport} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Sales Report - Yearly Sales':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={SalesYearlyReportMonthYear} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Sales Report - Date Wise Sales':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={SalesDateWiseReport} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Sales Report - Customer Statement':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={SalesCustomerStatement} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;

            case 'Reports - Estimate Report - Daily Estimate':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={EstimateDailyReport} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;

            case 'Reports - Estimate Report - Monthly Estimate':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={EstimateMonthlyReport} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Estimate Report - Yearly Estimate':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={EstimateYearlyReportMonthYear} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Estimate Report - Date Wise Estimate':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={EstimateDateWiseReport} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Estimate Report - Customer Statement':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={EstimateCustomerStatement} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Purchase Report - Daily Purchase':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={PurchaseDailyReport} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Purchase Report - Monthly Purchase':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={PurchaseMonthlyReport} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Purchase Report - Yearly Purchase':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={PurchaseYearlyReportMonthYear} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Purchase Report - Date Wise Purchase':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={PurchaseDateWiseReport} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Purchase Report - Vendor Statement':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={VendorCustomerStatement} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Expense Report - Daily Expense':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={ExpDailyReport} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Expense Report - Monthly Expense':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={ExpMonthlyReport} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Expense Report - Yearly Expense':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={ExpYearlyReportMonthYear} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Expense Report - Date Wise Expense':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={ExpDateWiseReport} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Message Center Report':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={MessageCenterReport} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Profit and Loss Report - Profit and Loss':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={ProfitLossReport} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Profit and Loss Report - Till Date Profit and Loss':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={TillDateProfitLossReport} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;

            case 'Reports - Inventory - Available Stock':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={AvailableStockReport} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Inventory - Stock Summary Report':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={InventorySummaryReport} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;

            case 'Reports - Audit Report':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={AuditReportMenu} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Bill Due Report':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={BillDueReport} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Enquiry Report':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={EnquiryReport} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - FeedBack Report':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={MonthlyFeedBackReport} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Payment History Report':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={PaymentHistoryReport} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Booked Service Reports - Booked Service History':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={AppointmentsHistory} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Booked Service Reports - Booked Services in Future':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={FutureAppointments} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Reports - Payment Receivables Reports - Customer History':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={CustomerPaymentHistory} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Communication - Offer Messages':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={MessageCenterMessagePage} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Communication - Emails':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={MessageCenterEmailPage} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Configuration - Configuration':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={ConfigurationPage} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Task Mapping - Task Mapping':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={TaskMappingElite} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Logo - Import Logo':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={ImportLogo} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'QRCode - Import QRCode':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={ImportQRCode} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Excel - Export Excel':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={ExportMenuPage} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Excel - Import Excel':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={ImportMenuPage} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Location - Add Location':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={LocationPage} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;

            case 'Help - About Modules':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={Help} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Password - Change Password':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={ChangePassword1} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;
            case 'Company Settings - Company Details':

                // var flag = self.CheckPermission("checkinout");

                //  console.log("CHECKIN OUT FLAG :",flag);
                //  if (flag == 0) {
                ReactDOM.render(
                    <Router>
                        <div>

                            <Route path="/" component={CompanySetting} />
                        </div>
                    </Router>,
                    document.getElementById("contentRender"))
                // } else {
                //     //ACCESS DENIED
                //     self.AccesDeniedMessage();
                // }
                break;


            default:
                console.log("DEFAULT FUNC CALL");
        }
    }



    CheckPermission(moduleName) {

        var permission = JSON.parse(
            CryptoJS.AES.decrypt(
                localStorage.getItem("Permissions"),
                "shinchanbaby"
            ).toString(CryptoJS.enc.Utf8)
        );

        var flag = 1; //false

        console.log("PERMISSION LIST :", permission);
        var presentStatus = _.where(permission, { permission: moduleName });

        if (presentStatus.length > 0) {
            flag = 0; //true
            console.log("PERMISSION FLAG 0 ");
        } else {
            var permission = JSON.parse(
                CryptoJS.AES.decrypt(
                    localStorage.getItem("PermissionHeader"),
                    "shinchanbaby"
                ).toString(CryptoJS.enc.Utf8)
            );
            var presentHeaderStatus = _.where(permission, { permissionHeader: moduleName });

            if (presentHeaderStatus.length > 0) {
                flag = 0; //true
                console.log("PERMISSION HEADER FLAG 0 ");
            }
        }

        return flag;

    }

    AccesDeniedMessage() {

        /*  Swal.fire({
              position: 'center',
              icon: 'warning',
              title: "Access Denied",
              showConfirmButton: false,
              timer: 2000
          })  */

        $("#accessDeniedSpan").show();
    }

    SpanClick(spanName) {
        console.log("SPAN CLICK :", spanName);

        this.ModuleOnClickFunc(spanName);

        this.state.value = '';
        this.setState({
            value: this.state.value
        })
        $(".renderData").hide();

    }


    EmptyGlobalSearch(){
        this.state.value="";
        this.setState({
            value:"",
        })
        $(".renderData").hide();
    }
    
    render() {
        const { data, value } = this.state;
        return (

            <div className="search_div_cls" style={{ marginTop: "8px" }}>
                <span id="accessDeniedSpan" className="search_a_denied">Access Denied !!</span>
                <input className="glb_search_btn" placeholder="Search...." type="text" value={value} onChange={this.handleChange} >

                </input>
                <FilterResults
                    value={value}
                    data={data}
                    renderResults={
                        results => (
                            <div id="renderData" className="searchresult_cls renderData">
                                {results.map(el => (
                                    <div>
                                        <span class="mainSpan" id={el.mainModuleName + " - " + el.subModuleName}
                                            onClick={(e) => this.SpanClick(el.mainModuleName + " - " + el.subModuleName)}>
                                            <span style={{ color: '#037bde', fontWeight: '600' }}>
                                                {el.mainModuleName}</span> - <span>{el.subModuleName}</span>
                                        </span>
                                    </div>
                                ))}

                            </div>
                        )

                    }
                />
            </div>





        );
    }
}
