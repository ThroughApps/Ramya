import React, { Component } from 'react'
import './GenericDashboardCSS.css'
import $ from "jquery";
import '../../../node_modules/jquery/dist/jquery.min.js';
//import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { Pie, Bar, HorizontalBar, Doughnut, Bubble, Line } from 'react-chartjs-2';

//css

//Components

import DashboardOverall from '../MaincontentDashboard/DashboardOverall';

import CustomerList1 from '../CustomerList';
import VendorEntryForm1 from '../VendorEntryForm';
import VendorList1 from '../VendorList';
import VendorEntryForm from '../VendorEntryForm';
import AddProduct from '../AddProduct';
import CustomerList from '../CustomerList';
import VendorList from '../VendorList';
import ProductList from '../ProductList';
import SaleOrder from '../SaleOrder';
import InvoiceList from '../InvoiceList';
import PurchaseInvoice from '../PurchaseInvoice';
import PurchaseInvoiceList from '../PurchaseInvoiceList';
import registerServiceWorker from '../registerServiceWorker';
import Attendance from '../Attendance';
import Checkinout from '../Checkinout';
import AttendanceReportMenuPage from '../AttendanceReportMenuPage';
import AddStaff from '../AddStaff';
import StaffList from '../StaffList';

import Expense from '../Expense';
import MessageCenterEmailPage from '../Communication/MessageCenterEmailPage';
import MessageCenterMessagePage from '../Communication/MessageCenterMessagePage';



// import TimeSheetAdmin from './TimeSheetAdmin';
// import TimeSheetDisplay from './TimeSheetDisplay';
import AddBank from '../AddBank';
import BankReport from '../BankReport';

import Help from '../Help';
import ImportLogo from '../ImportLogo';

import LoginPage from '../LoginPage';
import AddRole from '../AddRole';
import ChangePassword from '../ChangePassword';

import ExportMenuPage from '../ExportMenuPage';
import ImportMenuPage from '../ImportMenuPage';
import CustomerEntryForm from '../CustomerEntryForm';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import TaskMappingPremium from '../TaskMappingPremium'; 

import ReportMenuPagePremium from '../ReportMenuPagePremium';
import VehicleList from '../VehicleList';

import VehicleRegistrationList from '../VehicleRegistrationList';
export default class GenericDashboardPremium extends Component {
 constructor() {
 super()
 var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
 var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
 var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
 var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
 var companyName_mobile;

 if(companyName.length>20){
 companyName_mobile=companyName.substr(0,20)+"..";
 }else{
 companyName_mobile= companyName;
 }

 this.state = {

 companyId: companyId,
 companyName: companyName,
 companyName_mobile:companyName_mobile,
 staffId:staffId,
 employeeName:employeeName,
 }
 }
 variableChanged = (val) => {
 this.setState({backButtonVariable: val});
 }
 componentDidMount() {

 $(document).ready(function () {
 
 $('#side-menu a[data-toggle="collapse"]').on("click", function (e) {
 var ulId1 = this.getAttribute("href");

 $('.collapsiable').not(ulId1).removeClass('show in');
 // $(ulId1).slideToggle("slow").addClass("show");
 $(ulId1).addClass("show");
 // $('.collapsiable').removeClass('show').addClass('collapsed');
 
 });
 })
 
 
 $(document).ready(function () {
 
 $('#sidebarCollapse').on('click', function () {
 /* $('#side-menu span').not.collapse("hide"); */
 /* $('.dashboard_List').css('opacity', '1'); */
 $('#sidebar').toggleClass('active');
 /* $("#sidebar").show(); */
 
 });
 });
 
 
 $(document).ready(function () {
 
 $('.contentRender').on('click', function () {
 $('#sidebar').addClass('active');
 });
 });
 
 $(document).ready(function () {
 
 $('.sidemenu_autoclose').on('click', function () {
 $('#sidebar').addClass('active');
 
 });
 });
 $(document).ready(function () {
 
 $('.sidemenu_autoclose_settings').on('click', function () {
 $('#sidebar').addClass('active');
 });
 });
 

 this.Dashboard();
 
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
 ImportFunc() {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={ImportLogo} />
 </div>
 </Router>,
 document.getElementById("contentRender")
 );
 
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
 ChangePassword(){
 // helpFuncValue= "helpchangepassword";
 
 ReactDOM.render(
 <Router>
 <div>
 
 <Route path="/" component={ChangePassword} />
 </div>
 </Router>,
 document.getElementById('contentRender'));
 }

 DashBoardDisplay() {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={DashboardOverall}
 />
 </div>
 </Router>,
 document.getElementById('contentRender'));
 
 }
 CustomerEntryForm() {


 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
 
 var flag = 1;//false
 var i = permission.length;
 
 $.each(permission, function (i, item) { 
 if (item.permission == "addCustomer") {
 flag = 0;//true
 }
 });
 
 if (flag == 0) {
 
 ReactDOM.render(
 <Router>
 <div>
 
 <Route path="/" component={CustomerEntryForm} />
 </div>
 </Router>,
 document.getElementById('contentRender'));
 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }
 
 
 
 }

 VehicleRegistrationList(){
  ReactDOM.render(
    <Router>
    <div>
    <Route path="/" component={VehicleRegistrationList} />
    </div>
    </Router>,
    document.getElementById('contentRender'));
 }
 VehicleList(){
  ReactDOM.render(
    <Router>
    <div>
    <Route path="/" component={VehicleList} />
    </div>
    </Router>,
    document.getElementById('contentRender'));
 }
 CustomerList() {
 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
 
 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {
 
 if (item.permission == "listOfCustomer") {
 flag = 0;//true
 }
 });
 
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
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }
 
 
 
 }
 
 VendorEntryForm() {

 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "addVendor") {
 flag = 0;//true
 }
 });

 if (flag == 0) {

 ReactDOM.render(
 <Router>
 <div>

 <Route path="/" component={VendorEntryForm1} />
 </div>
 </Router>,
 document.getElementById('contentRender'));
 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }


 }
 
 VendorList() {
 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "listOfVendor") {
 flag = 0;//true
 }
 });

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
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }



 }
 
 AddProduct() {
 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "addProduct") {
 flag = 0;//true
 }
 });

 if (flag == 0) {

 ReactDOM.render(
 <Router>
 <div>

 <Route path="/" component={AddProduct} />
 </div>
 </Router>,
 document.getElementById('contentRender'));
 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }


 }
 
 ProductList() {
 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "listOfProduct") {
 flag = 0;//true
 }
 });

 if (flag == 0) {

 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={ProductList} />
 </div>
 </Router>,
 document.getElementById('contentRender'));
 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }



 }
 
 SaleOrder() {
 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "saleOrder") {
 flag = 0;//true
 }
 });

 if (flag == 0) {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={SaleOrder} />
 </div>
 </Router>,
 document.getElementById('contentRender'));

 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }



 }
 
 InvoiceList() {
 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "saleInvoice") {
 flag = 0;//true
 }
 });

 if (flag == 0) {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={InvoiceList} />
 </div>
 </Router>,
 document.getElementById('contentRender'));

 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }


 }

 AddStaff() {
 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "addEmployee") {
 flag = 0;//true
 }
 });

 if (flag == 0) {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={AddStaff} />
 </div>
 </Router>,
 document.getElementById('contentRender'));

 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }


 }
 StaffList() {
 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "listOfEmployee") {
 flag = 0;//true
 }
 });

 if (flag == 0) {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={StaffList} />
 </div>
 </Router>,
 document.getElementById('contentRender'));

 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }


 }

 AddRole(){
   var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

   var flag = 1;//false
   var i = permission.length;
   $.each(permission, function (i, item) {
  
   if (item.permission == "addRole") {
   flag = 0;//true
   }
   });
   if (flag == 0) {
 ReactDOM.render(
 <Router>
 <div>
 
 <Route path="/" component={AddRole} />
 </div>
 </Router>,
 document.getElementById('contentRender'));
   }
   else {
      var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
      w.document.write('You are not Allowed to Access this Page')
      w.focus()
      setTimeout(function () { w.close(); }, 2000)
      }
 }
 PurchaseInvoice() {
  var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
 
  var flag = 1;//false
  var i = permission.length;
  $.each(permission, function (i, item) {
 
  if (item.permission == "purchaseOrder") {
  flag = 0;//true
  }
  });
 
  if (flag == 0) {
  ReactDOM.render(
  <Router>
  <div>
  <Route path="/" component={PurchaseInvoice} />
  </div>
  </Router>,
  document.getElementById('contentRender'));
 
  }
  else {
  var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
  w.document.write('You are not Allowed to Access this Page')
  w.focus()
  setTimeout(function () { w.close(); }, 2000)
  }
 
 
  }
 
  PurchaseInvoiceList() {
  var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
 
  var flag = 1;//false
  var i = permission.length;
  $.each(permission, function (i, item) {
 
  if (item.permission == "purchaseInvoice") {
  flag = 0;//true
  }
  });
 
  if (flag == 0) {
  ReactDOM.render(
  <Router>
  <div>
  <Route path="/" component={PurchaseInvoiceList} />
  </div>
  </Router>,
  document.getElementById('contentRender'));
 
  }
  else {
  var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
  w.document.write('You are not Allowed to Access this Page')
  w.focus()
  setTimeout(function () { w.close(); }, 2000)
  }
 
 
 
  }
  Expense() {


    var PermissionHeader = JSON.parse(
      CryptoJS.AES.decrypt(
        localStorage.getItem("PermissionHeader"),
        "shinchanbaby"
      ).toString(CryptoJS.enc.Utf8)
    );
   
    var flag = 1; //false
    var i = PermissionHeader.length;
    $.each(PermissionHeader, function (i, item) {
      if (item.permissionHeader == "expense") {
        flag = 0; //true
      }
    });
    if (flag == 0) {
    ReactDOM.render(
    <Router>
    <div>
    <Route path="/" component={Expense} />
    </div>
    </Router>,
    document.getElementById('contentRender'));
   
    }
    else {
    var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
    w.document.write('You are not Allowed to Access this Page')
    w.focus()
    setTimeout(function () { w.close(); }, 2000)
    }
   
   
   
   
    }
 Bank() {
   var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

   var flag = 1;//false
   var i = permission.length;
   $.each(permission, function (i, item) {
  
   if (item.permission == "addBank") {
   flag = 0;//true
   }
   });
   if (flag == 0) {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={AddBank} />
 </div>
 </Router>,
 document.getElementById('contentRender'));
}
 else {
   var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
   w.document.write('You are not Allowed to Access this Page')
   w.focus()
   setTimeout(function () { w.close(); }, 2000)
   }

 }
 BankDetails() {
   var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

   var flag = 1;//false
   var i = permission.length;
   $.each(permission, function (i, item) {
  
   if (item.permission == "listOfBank") {
   flag = 0;//true
   }
   });
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
      var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
      w.document.write('You are not Allowed to Access this Page')
      w.focus()
      setTimeout(function () { w.close(); }, 2000)
      }
 }
 

 CheckInOutAttendance() {

  var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
 
  var flag = 1;//false
  var i = permission.length;
  $.each(permission, function (i, item) {
 
  if (item.permission == "CheckInCheckOut") {
  flag = 0;//true
  }
  });
 
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
  var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
  w.document.write('You are not Allowed to Access this Page')
  w.focus()
  setTimeout(function () { w.close(); }, 2000)
  }
 
  }
  Attendance() {
 
  var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
 
  var flag = 1;//false
  var i = permission.length;
  $.each(permission, function (i, item) {
 
  if (item.permission == "manualAttendance") {
  flag = 0;//true
  }
  });
 
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
  var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
  w.document.write('You are not Allowed to Access this Page')
  w.focus()
  setTimeout(function () { w.close(); }, 2000)
  }
 
 
  }
 
  AttendanceReportMenuPage() {
  var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
 
  var flag = 1;//false
  var i = permission.length;
  $.each(permission, function (i, item) {
 
  if (item.permission == "report") {
  flag = 0;//true
  }
  });
 
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
  var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
  w.document.write('You are not Allowed to Access this Page')
  w.focus()
  setTimeout(function () { w.close(); }, 2000)
  }
 
  }
  
 
 ReportFunc() {

   var PermissionHeader = JSON.parse(
      CryptoJS.AES.decrypt(
        localStorage.getItem("PermissionHeader"),
        "shinchanbaby"
      ).toString(CryptoJS.enc.Utf8)
    );
   
    var flag = 1; //false
    var i = PermissionHeader.length;
    $.each(PermissionHeader, function (i, item) {
      if (item.permissionHeader == "reports") {
        flag = 0; //true
      }
    });

 if (flag == 0) {


 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={ReportMenuPagePremium} />
 </div>
 </Router>,
 document.getElementById('contentRender'));

 }
 else {
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }


 }

 

 MessageFunc() {
 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "OfferMessages") {
 flag = 0;//true
 }
 });

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
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }



 }

 EmailFunc() {
 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

 if (item.permission == "emails") {
 flag = 0;//true
 }
 });

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
 var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
 w.document.write('You are not Allowed to Access this Page')
 w.focus()
 setTimeout(function () { w.close(); }, 2000)
 }


 }

 


   TaskMappingPremium(){
      var PermissionHeader = JSON.parse(
         CryptoJS.AES.decrypt(
           localStorage.getItem("PermissionHeader"),
           "shinchanbaby"
         ).toString(CryptoJS.enc.Utf8)
       );
      
       var flag = 1; //false
       var i = PermissionHeader.length;
       $.each(PermissionHeader, function (i, item) {
         if (item.permissionHeader == "taskMapping") {
           flag = 0; //true
         }
       });
   
    if (flag == 0) {
      ReactDOM.render(
         <Router>
         <div>
         <Route path="/" component={TaskMappingPremium} />
         </div>
         </Router>,
         document.getElementById("contentRender")
         );
      }
      else {
         var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
         w.document.write('You are not Allowed to Access this Page')
         w.focus()
         setTimeout(function () { w.close(); }, 2000)
        
         }

   }
  
 ExportFunc(){
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={ExportMenuPage} />
 </div>
 </Router>,
 document.getElementById('contentRender'));
 }

 ImportFunc(){
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={ImportMenuPage} />
 </div>
 </Router>,
 document.getElementById('contentRender'));
 }

 ImportLogoFunc() {
 ReactDOM.render(
 <Router>
 <div>
 <Route path="/" component={ImportLogo} />
 </div>
 </Router>,
 document.getElementById("contentRender")
 );

 

 }
 render() {
 return (
 <div>
 <div className="main_header">
 <div className="header_sm_device">
 <a href="index2.html" className="logo header_sm_device_logo">
 {/* mini logo for sidebar mini 50x50 pixels 
 <span className="logo-mini"><b>A</b>LT</span>*/}
 {/* logo for regular state and mobile devices */}
 <span className="logo-lg"><b style={{fontWeight: "100",fontSize: "17px"}}> 
 {this.state.companyName_mobile}</b></span>
 </a>
 </div>

 <a class="navbar_company_name" id="navbar_company_name" style={{ backgroundColor: "",fontFamily: "Monotype Corsiva",fontStyle: "italic" }}>ThroughBooks</a>
 <nav class="navbar navbar-inverse navbar_css" style={{backgroundColor:"#05a4b5",borderColor:"#05a4b5"}}>
 <div class="navbar-header" style={{ position: " absolute" }}>
 <a class="navbar-brand"  style={{color:"#ffffff" }} href="#" id="sidebarCollapse"><span class="glyphicon glyphicon-menu-hamburger"></span> &nbsp;</a>
 <a class="navbar-brand"  style={{color:"#ffffff" }} href="#" ><span onClick={() => this.DashBoardDisplay()} class="glyphicon glyphicon-home"></span> &nbsp;</a>
 <a class="navbar-brand nav_brand_client_sm"  style={{color:"#ffffff" }} href="#"> {this.state.companyName}</a>
 </div>

 <ul class="nav navbar-nav navbar-right pull-right " style={{ display: "flex", marginRight: "15px" }}>
 <li>
 <a href="#" class="dropdown-toggle user_profile sidemenu_autoclose_settings " data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" >
 <span class="glyphicon glyphicon-cog glyphicon-spin" style={{color:"#ffffff" }} ></span> &nbsp;</a>
 <ul class="dropdown-menu" style={{marginLeft: "-110px",zIndex: "20"}}>
 <li><a href="#" className="user_p_menu">Emp_ID: {this.state.staffId}</a></li>
 <li role="separator" className="set_divider" />
 <li><a href="#" className="user_p_menu"
 style={{ backgroundColor: "", color: "black" }}>
 <span
 class="glyphicon glyphicon-user"
 style={{
 float: "",color:"#3c3b3b"
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
 float: "",color:"#3c3b3b"
 }}>
 <span className="settings_Top_Submenu" style={{ paddingLeft: "10px" }}>Import&ensp;Logo</span>
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
 float: "",color:"#3c3b3b"
 }}>
 <span className="settings_Top_Submenu" style={{ paddingLeft: "10px" }}>Export&ensp;Excel</span>
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
 float: "",color:"#3c3b3b"
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
 float: "",color:"#3c3b3b"
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
 float: "",color:"#3c3b3b"
 }}>
 <span className="settings_Top_Submenu" style={{ paddingLeft: "10px" }}>Change Password</span>
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
 float: "",color:"#3c3b3b"
 }}>
 <span className="settings_Top_Submenu" style={{ paddingLeft: "10px" }}>Logout</span>
 </span>
 </a>
 </li>
 <li role="separator" className="set_divider" />
 
 </ul>
 </li>
 </ul>

 </nav>
 
 
 
 

 
 
 </div>

 <div class="wrapper">
 {/* <!-- Sidebar --> */}
 <div>

 <div id="side-menu" className="">

 <nav id="sidebar" className = "active" style={{ zIndex: "20" }} >
 <div className="dasdboard_div"  style={{backgroundColor:"#00a6a4",borderColor:"#00a6a4"}}><a onClick={() => this.DashBoardDisplay()}>
 <i class="fa fa-pie-chart fa-chart" aria-hidden="true" style={{paddingLeft:"12px"}}>
 </i><span id="span_dash" className="span_dash" style={{fontSize:"17px"}}> DASHBOARD</span></a></div>
 <div className="screen_overlay" >
 <ul class="list-unstyled components" style={{ paddingTop: "0px", fontSize: "11px",paddingBottom: "100px" }} >
 
 <li >
 <div>
 <a href="#MasterSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"
 ><i class="fa fa-universal-access i_sidebar" style={{ border: "none", display: "inline-block",paddingRight: "14px" }} aria-hidden="true"></i><span id="spanmas" className="sidebar_Title"> Garage Master</span></a>

 <ul class="collapse list-unstyled collapsiable" id="MasterSubmenu">
 {/* <li><a onClick={() => this.LocationFunc()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block" }} aria-hidden="true"></i><span id="spantask">Location</span></a></li>
 */} 
  <li><a className="sidemenu_autoclose" onClick={() => this.VehicleRegistrationList()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Service Registration</span></a></li>
 
 <li><a className="sidemenu_autoclose" onClick={() => this.VehicleList()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Vehicle</span></a></li>

 <li><a className="sidemenu_autoclose" onClick={() => this.CustomerList()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Customer</span></a></li>
  <li><a className="sidemenu_autoclose" onClick={() => this.VendorList()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Vendor</span></a></li>
  <li><a className="sidemenu_autoclose" onClick={() => this.ProductList()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Product</span></a></li>
 </ul>
 </div>

 </li>
 <li>
 <a href="#SaleSubmenu" data-toggle="collapse" aria-expanded="false"
 class="dropdown-toggle" ><i class="fa fa-dollar i_sidebar" style={{ border: "none", display: "inline-block" }} aria-hidden="true"></i><span id="spansale"className="sidebar_Title"> &nbsp; Sale</span></a>
 <ul class="collapse list-unstyled collapsiable" id="SaleSubmenu">
  <li><a className="sidemenu_autoclose" onClick={() => this.InvoiceList()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Sale Invoice</span></a></li>
  </ul>
 </li>


 <li>
 <a href="#InvoiceSubmenu" data-toggle="collapse" aria-expanded="false"
 class="dropdown-toggle"><i class="fa fa-shopping-cart i_sidebar" style={{ border: "none", display: "inline-block",paddingRight: "11px" }} aria-hidden="true"></i><span id="spanpurchase"className="sidebar_Title"> Purchase</span></a>
 <ul class="collapse list-unstyled collapsiable" id="InvoiceSubmenu">
 <li><a className="sidemenu_autoclose" onClick={() => this.PurchaseInvoice()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Purchase Order</span></a></li>
 <li><a className="sidemenu_autoclose" onClick={() => this.PurchaseInvoiceList()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Purchase Invoice</span></a></li>

 </ul>
 </li>
 <li>
 <a href="#ExpenseSubmenu"
 class="dropdown-toggle sidemenu_autoclose" onClick={() => this.Expense()}>
 <i class="fa fa-money i_sidebar" style={{ border: "none", display: "inline-block",paddingRight: "13px" }} aria-hidden="true"></i><span id="spanexpense"className="sidebar_Title"> Expense</span></a>

 </li>
 <li >
 <a href="#StaffSubmenu" data-toggle="collapse" aria-expanded="false"
 class="dropdown-toggle"><i class="fa fa-users i_sidebar" style={{ border: "none", display: "inline-block",paddingRight: "13px" }} aria-hidden="true"></i><span id="spanemp"className="sidebar_Title"> Employee</span></a>
 <ul class="collapse list-unstyled collapsiable" id="StaffSubmenu">
 <li><a className="sidemenu_autoclose" onClick={() => this.AddStaff()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Add Employee</span></a></li>
 <li><a className="sidemenu_autoclose" onClick={() => this.StaffList()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> List of Employee</span></a></li>
 <li><a className="sidemenu_autoclose" onClick={() => this.AddRole()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Add Role</span></a></li>
 
 </ul>
 </li>

 <li >
 <a href="#BankSubmenu" data-toggle="collapse" aria-expanded="false"
 class="dropdown-toggle" ><i class="fa fa-university i_sidebar" style={{ border: "none", display: "inline-block",paddingRight: "12px" }} aria-hidden="true"></i><span id="spanbank"className="sidebar_Title"> Bank</span></a>
 <ul class="collapse list-unstyled collapsiable" id="BankSubmenu">
 {/* <li><a className="sidemenu_autoclose" onClick={() => this.Bank()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Add Bank</span></a></li> */}


 <li><a className="sidemenu_autoclose" onClick={() => this.BankDetails()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Bank</span></a></li>
 </ul>
 </li>
 <li>
 <a href="#attendanceSubmenu" data-toggle="collapse" aria-expanded="false"
 class="dropdown-toggle"><i class="fa fa-address-card i_sidebar " style={{ border: "none", display: "inline-block",paddingRight: "11px" }} aria-hidden="true"></i><span id="spanatt"className="sidebar_Title"> Attendance</span></a>
 <ul class="collapse list-unstyled collapsiable" id="attendanceSubmenu">


 <li><a className="sidemenu_autoclose" id="CheckInOutAttendance" onClick={() => this.CheckInOutAttendance()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font">CheckIn/CheckOut</span></a></li>
 <li><a className="sidemenu_autoclose" onClick={() => this.Attendance()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Manual Attendance</span></a></li>
 <li><a className="sidemenu_autoclose" onClick={() => this.AttendanceReportMenuPage()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Report</span></a></li>

 </ul>
 </li>
 
 <li>
 <a className="sidemenu_autoclose" onClick={() => this.ReportFunc()}><i class="fa fa-clipboard i_sidebar" style={{ border: "none", display: "inline-block",paddingRight: "13px"}} aria-hidden="true"></i><span id="spanrep"className="sidebar_Title"> Reports</span></a>
 </li>

 <li>

 <a href="#SettingsSubmenu" data-toggle="collapse" aria-expanded="false"
 class="dropdown-toggle"><i class="fa fa-cogs i_sidebar" style={{ border: "none", display: "inline-block",paddingRight: "12px" }} aria-hidden="true"></i><span id="spancon"className="sidebar_Title">Configuration</span></a>
 <ul class="collapse list-unstyled collapsiable" id="SettingsSubmenu">
 <li><a className="sidemenu_autoclose" onClick={() => this.MessageFunc()} ><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Offer Messages </span></a></li>
 <li><a className="sidemenu_autoclose" onClick={() => this.EmailFunc()}><i class="fa fa-angle-right fa_submenu" style={{ border: "none", display: "inline-block", fontSize: "15px" }} aria-hidden="true"></i><span className="sbar_smenu_font"> Emails</span></a></li>

 </ul>
 </li>
 <li>
 <a className="sidemenu_autoclose" onClick={() => this.TaskMappingPremium()}><i class="fa fa-superpowers i_sidebar" style={{ border: "none", display: "inline-block" ,paddingRight: "14px"}} aria-hidden="true"></i><span id="spantask" className="sidebar_Title"> Task Mapping</span></a>
 </li>

 </ul>
 {/* <div className="side_menu_image">
 </div> */}
 </div>
 </nav>

 </div>
 </div>


 {/* 
 <!-- Page Content --> */}


 <div id="contentRender" className="contentRender">


 </div>

 </div>

 </div>
 )
 }
}
