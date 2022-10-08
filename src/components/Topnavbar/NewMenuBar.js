import React, { Component } from 'react';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import $ from "jquery";
import CryptoJS from 'crypto-js';
import 'react-pro-sidebar/dist/css/styles.css';
import * as FaIcons from 'react-icons/fa';
import sidebarBg from './images/bg.jpg';
import DashboardOverall from '../MaincontentDashboard/DashboardOverall';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ReactDOM from 'react-dom';
import './GenericDashboardCSS.css';
import './TopNavbarCss.css';
import * as RiIcons from 'react-icons/ri';
import * as FiIcons from 'react-icons/fi';
import * as GrIcons from 'react-icons/gr';
import * as AiIcons from 'react-icons/ai';
import * as TiIcons from 'react-icons/ti';
import * as BsIcons from 'react-icons/bs';
import * as HiIcons from 'react-icons/hi';
import * as ImIcons from 'react-icons/im';
import * as BiIcons from 'react-icons/bi';
import * as GiIcons from 'react-icons/gi';
import toplogo from './images/logo.png';
import { IconContext } from "react-icons";
import VehicleRegistrationList from '../VehicleRegistrationList';
import VehicleList1 from '../VehicleList';
import ProductList1 from '../ProductList';
import VendorList1 from '../VendorList';
import CustomerList1 from '../CustomerList';
import InvoiceList1 from '../InvoiceList';
import EstimateList1 from '../EstimateList';
import Expense1 from '../Expense';
import PurchaseInvoiceList1 from '../PurchaseInvoiceList';
import EnquiryMenuPage from '../EnquiryMenuPage';
import AddAppointment from '../AddAppointment';
import AppointmentConfirmation from '../AppointmentConfirmation';
import StaffList1 from '../StaffList';
import AddRole1 from '../AddRole';
import Salary from '../Salary';
import SalaryReport1 from '../SalaryReport';
import BankReport from '../BankReport';
import Checkinout from '../Checkinout';
import Attendance from '../Attendance';
import AttendanceReportMenuPage from '../AttendanceReportMenuPage';
import ReportMenuPage from '../ReportMenuPage';
import MessageCenterEmailPage from '../Communication/MessageCenterEmailPage';
import MessageCenterMessagePage from '../Communication/MessageCenterMessagePage';
import TaskMappingElite from '../TaskMappingElite';
import AppointmentCalendar from '../AppointmentCalendar';
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import ImportLogo from '../ImportLogo';
import ImportQRCode from '../ImportQRCode';
import CompanySetting from '../CompanySettings';
import ExportMenuPage from '../ExportMenuPage';
import LocationPage from '../LocationPage';
import LoginPage from '../LoginPage';
import Help from '../Help';
import _ from 'underscore';
import { GetEmployeeSite,GetPreviousPage } from '../ConstSiteFunction';
import ChangePassword1 from '../ChangePassword';
import SelectSearch from 'react-select';
import ImportMenuPage from '../ImportMenuPage';
import ServiceRegistration from '../ServiceRegistration/ServiceRegistration';
import CustomerInvoiceList from '../CustomerPayment/CustomerInvoiceList';
import ConfigurationPage from '../ConfigurationPage';

import CustomerwisePayment from '../CustomerPayment/CustomerwisePayment';


import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import VehicleMakeModelComponent from '../ServiceRegistration/VehicleMakeModelComponent';
import VehicleMakeModel from '../ServiceRegistration/VehicleMakeModel';
import GlobalSearch from "../Global Search/GlobalSearch";

import SaleOrder1, {SaleOrder_CurrencyChange,CheckSaleOrderCart} from "../SaleOrder";
import LastLocation from '../LastLocation';
import {demo} from '../LastLocation';
import withRouter from '../LastLocation';
import SaleInvoice, { SaleInvoice_CurrencyChange } from '../Invoice/SaleInvoice';
import LanguagePage from '../Invoice/LanguagePage';
import { EstimateInvoice_CurrencyChange } from '../Estimate';
import { PurchaseInvoice_CurrencyChange } from '../PurchaseInvoice';
import InvoiceMenuPage from '../Invoice/InvoiceMenuPage';
import InvoiceListMenuPage from '../Invoice/InvoiceListMenuPage';
import GoogleTranslate from '../GoogleTranslate/GoogleTranslate';
import * as SiIcons from 'react-icons/si';


var image = true;
var rtl = 0;
var collapsed = false;
var toggled = false;
//var [toggled, setToggled] = false;
let closedStyle = {
    height: 0
}

let openStyle = {
    height: "auto"
}

// AWS URL : 15.206.129.105
//API:ThroughBooksCOAPI

//http://15.206.129.105:8080/ThroughBooksCOAPI
//http://15.206.129.105:8080/ThroughBooksCOAPI
export default class NewMenuBar extends Component {

    constructor() {
        super()

        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var companyName_mobile;
        if (companyName.length > 20) {
            companyName_mobile = companyName.substr(0, 20) + "..";
        } else {
            companyName_mobile = companyName;
        }

        this.state = {

            companyId: companyId,
            companyName: companyName,
            companyName_mobile: companyName_mobile,
            staffId: staffId,
            employeeName: employeeName,
            options: [],
            employeeName: employeeName,
            options: [],
            modal: true,
            toggled: true,
            collapsed: false,
            contentWidth: "81%",
            modal: true,
            options: true,

        }
    }
    handleToggleSidebar() {

        this.setState(prevState => {
            return {
                contentWidth: prevState.collapsed ? "81%" : "95%",
                toggled: !prevState.toggled,
                collapsed: !prevState.collapsed
            };
        });
    }
    CloseToggleSidebar() {
        if (!this.state.collapsed) {
            this.setState(prevState => {
                return {
                    contentWidth: prevState.collapsed ? "81%" : "95%",
                    collapsed: !prevState.collapsed
                };
            });
        }
    }
    HandleCollapse() {
        this.setState(prevState => {
            return {
                contentWidth: prevState.collapsed ? "81%" : "95%",
                collapsed: !prevState.collapsed
            };
        });
    }

    componentDidMount() {

        
        console.log("path ",window.location.pathname);
      
        this.Dashboard();
        var empSites = GetEmployeeSite();
        var currentSite = CryptoJS.AES.decrypt(localStorage.getItem('CurrentSite'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        var emparray = empSites.split(",");
        console.log("emparray.length ", emparray.length, empSites);
        if (emparray.length === 1) {
            localStorage.setItem('CurrentSite', CryptoJS.AES.encrypt(emparray[0], "shinchanbaby"));
            this.state.modal = false;
        } else {
            this.state.options = _.map(emparray, function (site) { return { label: site, value: site }; });
            if (currentSite === "") {
                this.state.modal = true;
            } else {
                this.state.modal = false;
            }
        }
        this.setState({
            modal: this.state.modal,
            options: this.state.options
        })
        console.log("Modal ", this.state.options, this.state.modal);
       
        $(".dropdown-toggle1").click(function(){
            $(".dropdown-menu1").addClass("show");
            $(".contentRender").removeClass("show");
        });
        $(".contentRender").click(function(){
            $(".dropdown-menu1").removeClass("show");
        })

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
    Dashboard() {

        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={DashboardOverall}
                    />
                </div>
            </Router>,
            document.getElementById("contentRender"));

    }
    AccesDeniedMessage() {

      /*  var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
        w.document.write('You are not Allowed to Access this Page')
        w.focus()
        setTimeout(function () { w.close(); }, 2000)
        */

        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: "Access Denied",
            text:"You are not Allowed to Access this Page",
            showConfirmButton: false,
            timer: 2000
        }) 




    }
    VehicleRegistrationList() {
        var flag = this.CheckPermission("Jobcard");

        console.log("CHECKIN OUT FLAG :",flag);
        if (flag == 0) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={VehicleRegistrationList} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));
        }else{
            this.AccesDeniedMessage();
        }
      
    }
    VehicleList() {
        var flag = this.CheckPermission("Vehicle");

        console.log("CHECKIN OUT FLAG :",flag);
        if (flag == 0) {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={VehicleList1} />
                </div>
            </Router>,
            document.getElementById('contentRender'));
        }
        else{
            this.AccesDeniedMessage();
              }
    }
    CustomerList() {
        var flag =  this.CheckPermission("Customer");
        if (flag == 0) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={CustomerList1} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));
        }
        else {
            this.AccesDeniedMessage();
                    }
    }

    VehicleMakeModelFuelType(){
        var flag = this.CheckPermission("VehicleMakeandModel");
        if (flag == 0) {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={VehicleMakeModel} />
                </div>
            </Router>,
            document.getElementById('contentRender'));
        }
        else {
            this.AccesDeniedMessage();
                    }
    }
    VendorList() {
        var flag = this.CheckPermission("Vendor");
        if (flag == 0) {

            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={VendorList1} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));
        }
        else {
            this.AccesDeniedMessage();
        }



    }
    ProductList() {
        var flag = this.CheckPermission("ProductService");
        if (flag == 0) {

            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={ProductList1} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));
        }
        else {
            this.AccesDeniedMessage(); 
         
        }



    }
    InvoiceList() {
        var flag = this.CheckPermission("SaleInvoice");
        if (flag == 0) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={InvoiceList1} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

        }
        else {
            this.AccesDeniedMessage(); 
        }


    }

    InvoiceFunc(){
        var flag = this.CheckPermission("SaleInvoice");
        if (flag == 0) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={InvoiceMenuPage} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

        }
        else {
            this.AccesDeniedMessage(); 
        }
    }

    InvoiceListFunc(){
        var flag = this.CheckPermission("SaleInvoice");
        if (flag == 0) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={InvoiceListMenuPage} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

        }
        else {
            this.AccesDeniedMessage(); 
        }

    }

    LanguageFunc(){
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={LanguagePage} />
                </div>
            </Router>,
            document.getElementById('contentRender'));
    }
    EstimateList() {
        var flag = this.CheckPermission("EstimateInvoice");

        if (flag == 0) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={EstimateList1} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

        }
        else {
            this.AccesDeniedMessage(); 
        }


    }

    CustomerWisePayment(){
        var flag = this.CheckPermission("CustomerPayment");

        if (flag == 0) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={CustomerwisePayment} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

        }
        else {
            this.AccesDeniedMessage(); 
        }
    }

    PurchaseInvoiceList() {
        var flag = this.CheckPermission("PurchaseInvoice");

        if (flag == 0) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={PurchaseInvoiceList1} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

        }
        else {
            this.AccesDeniedMessage(); 
        }



    }
    Expense() {
        var flag = this.CheckPermission("Expense");

        if (flag == 0) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={Expense1} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

        }
        else {
            this.AccesDeniedMessage(); 
        }




    }
    EnquiryFunc() {
        var flag = this.CheckPermission("Enquiry");
        if (flag == 0) {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EnquiryMenuPage} />
                </div>
            </Router>,
            document.getElementById('contentRender'));
   
        }
        else {
            this.AccesDeniedMessage(); 
        }

        }
    BookServiceFunc() {
        var flag = this.CheckPermission("BookService");
        if (flag == 0) {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={AddAppointment} />
                </div>
            </Router>,
            document.getElementById('contentRender'));
         } else {
            this.AccesDeniedMessage(); 
            }
        }



    ServiceCalendarFunc() {
        var flag = this.CheckPermission("ServiceCalendar");
        if (flag == 0) {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={AppointmentCalendar} />
                </div>
            </Router>,
            document.getElementById('contentRender'));
        }
        else {
            this.AccesDeniedMessage(); 
        }
    }

    BookServiceConfirmationFunc() {
        var flag = this.CheckPermission("ServiceConfirmation");
        if (flag == 0) {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={AppointmentConfirmation} />
                </div>
            </Router>,
            document.getElementById('contentRender'));
        }
        else {
            this.AccesDeniedMessage(); 
        } 
    }
    StaffList() {
        var flag = this.CheckPermission("Employee");
        if (flag == 0) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={StaffList1} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

        }
        else {
            this.AccesDeniedMessage(); 
        }


    }

    AddRole() {
        var flag = this.CheckPermission("AddRole");
        if (flag == 0) {
            ReactDOM.render(
                <Router>
                    <div>

                        <Route path="/" component={AddRole1} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));
        }
        else {
            this.AccesDeniedMessage(); 
        }
    }
    Salary() {
        var flag = this.CheckPermission("Salary");
        if (flag == 0) {

        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={Salary} />
                </div>
            </Router>,
            document.getElementById('contentRender'));
        }else {
            this.AccesDeniedMessage(); 
            }


    }
    SalaryReport() {
        var flag = this.CheckPermission("SalaryReport");
        if (flag == 0) {

        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={SalaryReport1} />
                </div>
            </Router>,
            document.getElementById('contentRender'));

        }else {
            this.AccesDeniedMessage(); 
        }

    }
    BankDetails() {
        var flag = this.CheckPermission("Bank");
        if (flag == 0) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={BankReport} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));
        }
        else {
            this.AccesDeniedMessage(); 
        }
    }
    CheckInOutAttendance() {

        var flag = this.CheckPermission("CheckInOut");
        if (flag == 0) {


            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={Checkinout} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

        }
        else {
            this.AccesDeniedMessage(); 
        }

    }
    Attendance() {

        var flag = this.CheckPermission("ManualAttendance");
        if (flag == 0) {


            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={Attendance} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

        }
        else {
            this.AccesDeniedMessage(); 
        }


    }

    AttendanceReportMenuPage() {
        var flag = this.CheckPermission("Report");

        if (flag == 0) {


            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={AttendanceReportMenuPage} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

        }
        else {
            this.AccesDeniedMessage(); 
        }

    }



    ReportFunc() {     


            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={ReportMenuPage} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));
 }
    MessageFunc() {
      
        var flag = this.CheckPermission("OfferMessages");
        if (flag == 0) {

            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={MessageCenterMessagePage} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

        }
        else {
            this.AccesDeniedMessage(); 
        }



    }

    EmailFunc() {
        var flag = this.CheckPermission("Emails");
        if (flag == 0) {

            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={MessageCenterEmailPage} />
                    </div>
                </Router>,
                document.getElementById('contentRender'));

        }
        else {
            this.AccesDeniedMessage(); 
        }


    }

    ConfigurationFunc(){

        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
   
      //  if(companyId=="129"){
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={ConfigurationPage} />
                </div>
            </Router>,
            document.getElementById('contentRender'));
      /*  }else{
            Swal.fire({
                position: 'center',
                icon: 'warning',
                text: 'In Progress',
                showConfirmButton: false,
                timer: 2000
            })
        }
        */
    }

   
    TaskmappingElite() {
        var flag = this.CheckPermission("TaskMapping");
        if (flag == 0) {
            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={TaskMappingElite} />
                    </div>
                </Router>,
                document.getElementById("contentRender")
            );
        }
        else {
            this.AccesDeniedMessage(); 

        }

    }


    CustomerPayment(){
        var flag = this.CheckPermission("CustomerPayment");
        if (flag == 0) {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={CustomerInvoiceList} />
                </div>
            </Router>,
            document.getElementById("contentRender")
        );
    }
    else {
        this.AccesDeniedMessage(); 

    }
    }

    ImportLogoFunc() {
        var flag = this.CheckPermission("ImportLogo");
        if (flag == 0) {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={ImportLogo} />
                </div>
            </Router>,
            document.getElementById("contentRender")
        );
    }
    else {
        this.AccesDeniedMessage(); 

    }
    }
    ImportQRCodeFunc() {
        var flag = this.CheckPermission("ImportQRcode");
        if (flag == 0) {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={ImportQRCode} />
                </div>
            </Router>,
            document.getElementById("contentRender")
        );
    }
    else {
        this.AccesDeniedMessage(); 

    }
    }
    ExportFunc() {
        var flag = this.CheckPermission("ExportExcel");
        if (flag == 0) {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={ExportMenuPage} />
                </div>
            </Router>,
            document.getElementById('contentRender'));
        }
        else {
            this.AccesDeniedMessage(); 
    
        }  }

    LocationFunc() {
        var flag = this.CheckPermission("Location");
        if (flag == 0) {
        ReactDOM.render(
            <Router>
                <div>
                    <Route exact path="/" component={LocationPage} />

                </div>
            </Router>,
            document.getElementById('contentRender'));
        }
        else {
            this.AccesDeniedMessage(); 
    
        }    }
    ImportFunc() {
        var flag = this.CheckPermission("ImportExcel");
        if (flag == 0) {
        ReactDOM.render(
          <Router>
            <div>
              <Route path="/" component={ImportMenuPage} />
            </div>
          </Router>,
          document.getElementById("contentRender")
        );
    }
    else {
        this.AccesDeniedMessage(); 

    } 
      }
    setModal(status) {
        this.setState({
            modal: status
        })
    }

    OpenModal(status) {

        var PreviousVistedPage = GetPreviousPage();
        console.log("PreviousVistedPage :",PreviousVistedPage);

      if(PreviousVistedPage=="SaleInvoice"){
      //  alert("WARNING SALE ORDER !!!");
      this.CheckCartDataInfo("Sale Invoice",status);
      }else if(PreviousVistedPage=="EstimateInvoice"){
       // alert("WARNING ESTIMATE INVOICE !!!");
       this.CheckCartDataInfo("Estimate Invoice",status);
      }else if(PreviousVistedPage=="PurchaseInvoice"){
        this.CheckCartDataInfo("Purchase Invoice",status);
      }else{
       // alert(" CHANGE LOCATION FREELY ");
      this.DisplayModal(status);
    
    }

    }

    CheckCartDataInfo(moduleName,status){

        var cartDataInfo = CryptoJS.AES.decrypt(localStorage.getItem('CartDataInfo'),"shinchanbaby").toString(CryptoJS.enc.Utf8);
        alert("cartDataInfo :"+cartDataInfo);
        if(cartDataInfo=="Empty"){
            this.DisplayModal(status);
          }else{
            Swal.fire({
                position: 'center',
                icon: 'warning',
                text: 'Location Cannot Be Changed - '+moduleName+' InProgress',
                showConfirmButton: false,
                timer: 2000
              })
          }
    }


    DisplayModal(status){
        var empSites = GetEmployeeSite();
        var emparray = empSites.split(",");
        this.state.options = _.map(emparray, function (site) { return { label: site, value: site }; });
        var currentSite = CryptoJS.AES.decrypt(localStorage.getItem('CurrentSite'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        this.setState({
            options: this.state.options,
            selectedSite: { label: currentSite, value: currentSite },
            modal: status
        })
    }


    handleCurrentSite = (e) => {
        const value = e.value;
        this.state.currentSite = value;
        localStorage.setItem('CurrentSite', CryptoJS.AES.encrypt(value, "shinchanbaby"));

        this.setState({
            selectedSite: e,
            modal: false

        });

       var PreviousVistedPage = GetPreviousPage();
        console.log("PreviousVistedPage :",PreviousVistedPage);
      if(PreviousVistedPage=="SaleInvoice"){
        SaleInvoice_CurrencyChange();
    }else if(PreviousVistedPage=="EstimateInvoice"){
        EstimateInvoice_CurrencyChange();
    }else if(PreviousVistedPage=="PurchaseInvoice"){
        PurchaseInvoice_CurrencyChange();
 
    }

}

    CompanySetting() {
        var flag = this.CheckPermission("CompanySetting");
        if (flag == 0) {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={CompanySetting} />
                </div>
            </Router>,
            document.getElementById('contentRender'));
        }
        else {
            this.AccesDeniedMessage(); 
    
        } 
    }
    LogoutFunc() {
        localStorage.clear();
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={LoginPage} />

                </div>
            </Router>, document.getElementById('root'));
    }
    HelpFunc() {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={Help} />
                </div>
            </Router>,
            document.getElementById('contentRender'));

    }
    ChangePassword() {
        // helpFuncValue= "helpchangepassword";

        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={ChangePassword1} />
                </div>
            </Router>,
            document.getElementById('contentRender'));
    }

    render() {

        return (
            <div >

                {/* <div className="btn-toggle" style={{ fontSize: "28px" }} onClick={() => this.handleToggleSidebar()}>
                    <FaIcons.FaBars />
                </div> */}

              {/*  <LastLocation />  */}
                
                <div className="main_header main_Header_sm">
                    <div className="header_sm_device">
                        <a href="index2.html" className="logo header_sm_device_logo">
                            {/* mini logo for sidebar mini 50x50 pixels 
 <span className="logo-mini"><b>A</b>LT</span>*/}
                            {/* logo for regular state and mobile devices */}
                            <span className="logo-lg">
                                <b style={{ fontWeight: "100", fontSize: "17px" }}>
                                    {this.state.companyName_mobile}</b></span>
                        </a>
                    </div>
                    {/*  <img class="navbar_company_name" id="navbar_company_name" src={t_l1} /> */}
                    {/* <a class="navbar_company_name" id="navbar_company_name" style={{ backgroundColor: "",fontFamily: "Monotype Corsiva" ,fontStyle: "italic"}}>garage management</a>
  */}
                    {/*     <div class="navbar-header" style={{ position: " absolute" }}>
              <a class="navbar-brand" style={{ color: "#ffffff" }} href="#" /* id="sidebarCollapse" *>
                <span id="sidebarCollapseone" class="glyphicon glyphicon-menu-hamburger" onClick={() => this.openNav()} ></span>
                <span id="sidebarCollapsetwo" class="glyphicon glyphicon-menu-hamburger" onClick={() => this.closeNav()}></span>&nbsp;</a>
              <a class="navbar-brand" style={{ color: "#ffffff" }} href="#" ><span onClick={() => this.DashBoardDisplay()} class="glyphicon glyphicon-home"></span> &nbsp;</a>
               </div> */}






                    <nav class="navbar navbar-inverse navbar_css" style={{ background: "linear-gradient(to right, #0033cc 0%, #cc0066 100%)", borderColor: "none" }}>

                        <div className="btn-toggle" style={{ fontSize: "28px" }} >
                            <FaIcons.FaBars onClick={() => this.handleToggleSidebar()} /> <span style={{ marginLeft: "16px" }}> <ImIcons.ImHome onClick={() => this.Dashboard()} /></span>
                        </div>
                        <div className="btn-homepage" style={{ fontSize: "28px" }} >
                        </div>
                        <div className="comp_name_cent" >
                            <a class="" style={{ color: "#ffffff" }} href="#"> {this.state.companyName}</a>
                        </div>
                        <div>
                            <ul class="nav navbar-nav navbar-right pull-right " style={{ display: "flex", marginRight: "15px", marginTop: "-60px" }}>
                                <li className="topnav_glb_search_btn">
                                    <div class="search-container">
                                        <GlobalSearch />
                                    </div>
                                </li>

                        <li className="">
                                <a href="#" class="dropdown-toggle dropdown-toggle1 user_profile sidemenu_autoclose_settings " data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" >
                                <SiIcons.SiGoogletranslate style={{ color: "#ffffff",fontSize:"20px" }}  />&nbsp;</a>
                                <ul class="">
                                    <div class="dropdown-menu dropdown-menu1 goog">
                                <GoogleTranslate />
                                </div>
                                </ul>

                                </li>

                                <li>
                                    <a href="#" class="dropdown-toggle user_profile sidemenu_autoclose_settings " data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" >
                                        <span class="glyphicon glyphicon-cog glyphicon-spin" style={{ color: "#ffffff" }} ></span> &nbsp;</a>
                                    <ul class="dropdown-menu" style={{ marginLeft: "-110px", zIndex: "20" }}>
                                        <li><a href="#" className="user_p_menu">Emp_ID: {this.state.staffId}</a></li>
                                        <li role="separator" className="set_divider" />
                                        <li><a href="#" className="user_p_menu"
                                            style={{ backgroundColor: "", color: "black" }}>
                                            <span
                                                class="glyphicon glyphicon-user"
                                                style={{
                                                    float: "", color: "#3c3b3b"
                                                }}>
                                                <span className="settings_Top_Submenu" style={{ paddingLeft: "10px" }}>{this.state.employeeName}</span>
                                            </span>
                                        </a>
                                        </li>

                                        <li role="separator" class=" set_divider" ></li>
                                        <li><a href="#" className="user_p_menu"
                                            style={{ backgroundColor: "", color: "black" }}>
                                            <span
                                                class="glyphicon glyphicon-import"
                                                onClick={() => this.ImportLogoFunc()}
                                                style={{
                                                    float: "", color: "#3c3b3b"
                                                }}>
                                                <span className="settings_Top_Submenu" style={{ paddingLeft: "10px" }}>Import&ensp;Logo</span>
                                            </span>
                                        </a>
                                        </li>

                                        <li role="separator" class=" set_divider" ></li>
                                        <li><a href="#" className="user_p_menu"
                                            style={{ backgroundColor: "", color: "black" }}>
                                            <span
                                                class="glyphicon glyphicon-import"
                                                onClick={() => this.ImportQRCodeFunc()}
                                                style={{
                                                    float: "", color: "#3c3b3b"
                                                }}>
                                                <span className="settings_Top_Submenu" style={{ paddingLeft: "10px" }}>Import&ensp;QRCode</span>
                                            </span>
                                        </a>
                                        </li>

                                        <li role="separator" class=" set_divider" ></li>
                                        <li><a href="#" className="user_p_menu"
                                            style={{ backgroundColor: "", color: "black" }}>
                                            <span
                                                class="glyphicon glyphicon-export"
                                                onClick={() => this.ExportFunc()}
                                                style={{
                                                    float: "", color: "#3c3b3b"
                                                }}>
                                                <span className="settings_Top_Submenu" style={{ paddingLeft: "10px" }}>Export&ensp;Excel</span>
                                            </span>
                                        </a>
                                        </li>
                                        <li>
                                            <a href="#" className="user_p_menu"
                                                style={{ backgroundColor: "", color: "black" }}>
                                                <span
                                                    class="glyphicon glyphicon-map-marker setbtn_glyp_icon"
                                                    onClick={() => this.LocationFunc()}

                                                >
                                                    <span className="settings_Top_Submenu" style={{ paddingLeft: "10px" }}>Location</span>
                                                </span>
                                            </a>
                                        </li>
                                        <li role="separator" class=" set_divider" ></li>
                                        <li>
                                            <a href="#" className="user_p_menu"
                                                style={{ backgroundColor: "", color: "black" }}>
                                                <span
                                                    class="glyphicon glyphicon-map-marker setbtn_glyp_icon"
                                                    onClick={() => this.OpenModal(true)}
                                                >
                                                    <span className="settings_Top_Submenu" style={{ paddingLeft: "10px" }}>Change Location</span>
                                                </span>
                                            </a>
                                        </li>
                                        <li role="separator" class=" set_divider" ></li>
                                        <li><a href="#" className="user_p_menu"
                                            style={{ backgroundColor: "", color: "black" }}>
                                            <span
                                                class="glyphicon glyphicon-import"
                                                onClick={() => this.ImportFunc()}
                                                style={{
                                                    float: "", color: "#3c3b3b"
                                                }}>
                                                <span className="settings_Top_Submenu" style={{ paddingLeft: "10px" }}>Import&ensp;Excel</span>
                                            </span>
                                        </a>
                                        </li>


                                        <li role="separator" className="set_divider" />
                                        <li><a href="#" className="user_p_menu"
                                            style={{ backgroundColor: "", color: "black" }}>
                                            <span
                                                class="glyphicon glyphicon-question-sign"
                                                onClick={() => this.HelpFunc()}
                                                style={{
                                                    float: "", color: "#3c3b3b"
                                                }}>
                                                <span className="settings_Top_Submenu" style={{ paddingLeft: "10px" }}>Help</span>
                                            </span>
                                        </a>
                                        </li>
                                        <li role="separator" className="set_divider" />
                                        <li><a href="#" className="user_p_menu"
                                            style={{ backgroundColor: "", color: "black" }}>
                                            <span
                                                class="glyphicon glyphicon-eye-open"
                                                onClick={() => this.ChangePassword()}
                                                style={{
                                                    float: "", color: "#3c3b3b"
                                                }}>
                                                <span className="settings_Top_Submenu" style={{ paddingLeft: "10px" }}>Change Password</span>
                                            </span>
                                        </a>
                                        </li>
                                        <li role="separator" className="set_divider" />
                                        <li><a href="#" className="user_p_menu"
                                            style={{ backgroundColor: "", color: "black" }}>
                                            <span
                                                class="fa fa-cogs setbtn_glyp_icon"
                                                onClick={() => this.CompanySetting()}
                                                style={{
                                                    float: "", color: "#3c3b3b"
                                                }}>
                                                <span className="settings_Top_Submenu" style={{ paddingLeft: "10px" }}>Company Setting</span>
                                            </span>
                                        </a>
                                        </li>
                                        <li><a href="#" className="user_p_menu"
                                            style={{ backgroundColor: "", color: "black" }}>
                                            <span
                                                class="fa fa-viacoin setbtn_glyp_icon"
                                                style={{
                                                    float: "", color: "#3c3b3b"
                                                }}>
                                                <span className="settings_Top_Submenu" style={{ paddingLeft: "10px" }}>v5.7.2</span>
                                            </span>
                                        </a>
                                        </li>
                                        <li role="separator" className="set_divider" />
                                        <li><a href="#" className="user_p_menu"
                                            style={{ backgroundColor: "", color: "black" }}>
                                            <span
                                                class="glyphicon glyphicon-log-out"
                                                onClick={() => this.LogoutFunc()}
                                                style={{
                                                    float: "", color: "#3c3b3b"
                                                }}>
                                                <span className="settings_Top_Submenu" style={{ paddingLeft: "10px" }}>Logout</span>
                                            </span>
                                        </a>
                                        </li>
                                        <li role="separator" className="set_divider" />

                                    </ul>
                                </li>
                            </ul>
                        </div>


                    </nav>
                </div>






                <IconContext.Provider value={{ color: "white", style: { fontSize: "22px" } }}>
                    <div class="wrapper" >

                        <ProSidebar
                            /*  style={{ position: "fixed" }} */
                            // image={image ? sidebarBg : false}
                            rtl={rtl}
                            collapsed={this.state.collapsed}
                            toggled={this.state.toggled}
                            breakPoint={"md"}
                            onToggle={() => this.handleToggleSidebar()}
                        /*  onClick={() => this.HandleCollapse()} */
                        >
                            <SidebarHeader>
                                <div class="toplogoimg"
                                    style={{
                                        padding: '5px 70px',
                                        textTransform: 'uppercase',
                                        fontWeight: 'bold',
                                        fontSize: 14,
                                        letterSpacing: '1px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    <img collapsed={this.state.collapsed}
                                        toggled={this.state.toggled}
                                        breakPoint={"md"}
                                        onToggle={() => this.handleToggleSidebar()} src={toplogo} alt="Avatar" />
                                </div>
                            </SidebarHeader>

                            <SidebarContent>
                                <Menu iconShape="round">
                                    <SubMenu
                                        onOpenChange={(open) => open ? openStyle : closedStyle}
                                        title={'Sales'}
                                        icon={<RiIcons.RiDashboardLine />}
                                    >
                                        {// <MenuItem onClick={() => this.VehicleRegistrationList()}>Job Card</MenuItem>
                                        }
                                      {/*  <MenuItem onClick={() => this.InvoiceList()}>Sale Invoice</MenuItem> */}
                                        <MenuItem onClick={() => this.InvoiceFunc()}>Invoice</MenuItem>
                                        <MenuItem onClick={() => this.InvoiceListFunc()}>Invoice List</MenuItem>
                                       {/* <MenuItem onClick={() => this.LanguageFunc()}>Language</MenuItem> */}
                                     {/*   <MenuItem onClick={() => this.EstimateList()}>Estimate Invoice</MenuItem> */}
                                        <MenuItem onClick={() => this.CustomerWisePayment()}>Customer Payment</MenuItem>
                                    </SubMenu>

                                    <SubMenu
                                        onOpenChange={(open) => open ? openStyle : closedStyle}
                                        title={'Inventory'}
                                        icon={<GiIcons.GiStoneBlock />}
                                    >
                                        <MenuItem onClick={() => this.ProductList()}>Add Product/Service</MenuItem>
                                        <MenuItem onClick={() => this.VendorList()}>Vendor</MenuItem>
                                        <MenuItem onClick={() => this.PurchaseInvoiceList()}>Purchase </MenuItem>

                                    </SubMenu>

                                    <SubMenu
                                        onOpenChange={(open) => open ? openStyle : closedStyle}
                                        title={'CRM'}
                                        icon={<GiIcons.GiHumanTarget />}
                                    >
                                        { //<MenuItem onClick={() => this.VehicleList()}>Vehicle</MenuItem>
                                        }
                                        <MenuItem onClick={() => this.CustomerList()}>Customer</MenuItem>
                                        { //<MenuItem onClick={() => this.VehicleMakeModelFuelType()}>Vehicle Make&Model</MenuItem>
                                        }
                                    </SubMenu>

                                    {/* <SubMenu
                                        onOpenChange={(open) => open ? openStyle : closedStyle}
                                        title={'Master'}
                                        icon={<RiIcons.RiDashboardLine />}
                                    >
                                        <MenuItem onClick={() => this.VehicleRegistrationList()}>Service Registration</MenuItem>
                                        <MenuItem onClick={() => this.VehicleList()}>Vehicle</MenuItem>
                                        <MenuItem onClick={() => this.CustomerList()}>Customer</MenuItem>
                                        <MenuItem onClick={() => this.VendorList()}>Vendor</MenuItem>
                                        <MenuItem onClick={() => this.ProductList()}>Product</MenuItem>
                                    </SubMenu> */}
                                    {/*  <SubMenu
                                        title={'Sale'}

                                        icon={<FaIcons.FaFileInvoiceDollar />}
                                    >
                                        <MenuItem onClick={() => this.InvoiceList()}>Sale Invoice</MenuItem>
                                        <MenuItem onClick={() => this.EstimateList()}>Pro Forma Invoice</MenuItem>
                                        <MenuItem onClick={() => this.CustomerWisePayment()}>Customer Payment</MenuItem>
                                    </SubMenu>
                                    */}
                                    {/*  <MenuItem onClick={() => this.PurchaseInvoiceList()} icon={<FiIcons.FiShoppingCart />}>Purchase </MenuItem> */}
                                    <MenuItem onClick={() => this.Expense()} icon={<RiIcons.RiCurrencyFill />}>Expense </MenuItem>
                                    <MenuItem onClick={() => this.EnquiryFunc()} icon={<AiIcons.AiFillMessage />}>Enquiry </MenuItem>
                                    <MenuItem onClick={() => this.BookServiceFunc()} icon={<FaIcons.FaAddressBook />}>Book Service </MenuItem>
                                    <MenuItem onClick={() => this.ServiceCalendarFunc()} icon={<FaIcons.FaCalendarAlt />}>Service Calendar </MenuItem>
                                    <MenuItem onClick={() => this.BookServiceConfirmationFunc()} icon={<BsIcons.BsFillPersonCheckFill />}>Service Confirmation </MenuItem>
                                    <SubMenu
                                        title={'Employee'}
                                        icon={<BsIcons.BsFillPersonLinesFill />}
                                    >
                                        <MenuItem onClick={() => this.StaffList()}>Employee </MenuItem>
                                        <MenuItem onClick={() => this.AddRole()}>Add Role </MenuItem>
                                        <MenuItem onClick={() => this.Salary()}>Salary </MenuItem>
                                        <MenuItem onClick={() => this.SalaryReport()} >Salary Report </MenuItem>
                                    </SubMenu>
                                    <MenuItem onClick={() => this.BankDetails()} icon={<RiIcons.RiBankLine />}>Bank</MenuItem>
                                    <SubMenu
                                        title={'Attendance'}
                                        icon={<FaIcons.FaRegIdCard />}
                                    >
                                        <MenuItem onClick={() => this.CheckInOutAttendance()} >Check In/Out </MenuItem>
                                        <MenuItem onClick={() => this.Attendance()}>Manual Attendance </MenuItem>
                                        <MenuItem onClick={() => this.AttendanceReportMenuPage()}>Report </MenuItem>
                                    </SubMenu>
                                    <MenuItem onClick={() => this.ReportFunc()} icon={<HiIcons.HiOutlineDocumentReport />}>Reports</MenuItem>
                                    <SubMenu
                                        title={'Communication'}
                                        icon={<BiIcons.BiMailSend />}
                                    >
                                        <MenuItem onClick={() => this.MessageFunc()}>Offer Messages </MenuItem>
                                        <MenuItem onClick={() => this.EmailFunc()}>Emails </MenuItem>
                                    </SubMenu>
                                    <MenuItem onClick={() => this.ConfigurationFunc()} icon={<FiIcons.FiSettings />}>Configuration</MenuItem>


                                    {/* <SubMenu
                                        title={'Configuration'}
                                        icon={<FiIcons.FiSettings />}
                                    >
                                        <MenuItem onClick={() => this.openingBalance()}>Opening Balance </MenuItem>
                                    </SubMenu>  */}
                                    <MenuItem onClick={() => this.TaskmappingElite()} icon={<BsIcons.BsShieldLock />}>Task Mapping</MenuItem>
                                    {/*  <MenuItem onClick={() => this.CustomerPayment()} icon={<BsIcons.BsShieldLock />}>Customer Payment</MenuItem> 
                        */}

                                </Menu>

                            </SidebarContent>



                            <SidebarFooter style={{ textAlign: 'center' }}>
                                {/* <div
                                    className="sidebar-btn-wrapper"
                                    style={{
                                        padding: '20px 24px',
                                    }}
                                >
                                    <a
                                        href="https://github.com/azouaoui-med/react-pro-sidebar"
                                        target="_blank"
                                        className="sidebar-btn"
                                        rel="noopener noreferrer"
                                    >

                                        <span> viewSource</span>
                                    </a>
                                </div> */}
                            </SidebarFooter>
                        </ProSidebar>
                        <PureModal
                            header="Choose Site"
                            footer={""
                                /*  <div>
                                   <button>Cancel</button>
                                   <button>Save</button>
                                 </div> */
                            }
                            isOpen={this.state.modal}
                            closeButton="close"
                            closeButtonPosition="bottom"
                            onClose={() => {
                                if (localStorage.getItem('CurrentSite')) {
                                    var currentSite = CryptoJS.AES.decrypt(localStorage.getItem('CurrentSite'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
                                    if (currentSite !== "") {
                                        this.setModal(false);
                                        return true;
                                    }
                                }
                            }}
                            width={400}
                        >

                        
                            <div style={{ height: "200px" }}>
                                <p>Select the Site going to handle</p>
                                <SelectSearch options={this.state.options} value={this.state.selectedSite}
                                    onChange={(e) => this.handleCurrentSite(e)} name="WorkingSite" placeholder="Select Working Site " />
                            </div>
                        </PureModal>
                        <div>
                            <div>
                                <div id="contentRender" onClick={() => this.CloseToggleSidebar()} style={{
                                    position: "fixed",
                                    overflow: "auto",
                                    width: this.state.contentWidth
                                }} className="contentRender contentRender_sm">
                                </div>
                            </div>
                        </div>
                    </div>
                </IconContext.Provider>

                 
            </div>

        );
    };

}