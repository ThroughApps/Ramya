import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import VendorEntryForm from './VendorEntryForm';
import CustomerList from './CustomerList';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import './datepicker.css';

import { FormErrors } from './FormErrors';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import SalesDailyReport from './SalesDailyReport';

import SalesYearlyReport from './SalesYearlyReport';
import SalesMonthlyReport from './SalesMonthlyReport';
import SalesDateWiseReport from './SalesDateWiseReport';

import SalesCustomerStatement from './SalesCustomerStatement';

import VendorCustomerStatement from './VendorCustomerStatement';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import MessageCenterReport from './MessageCenterReport';

import SalesYearlyReportMonthYear from './SalesYearlyReportMonthYear';
import ProfitLossReport from './ProfitLossReport';
import AuditReportMenu from './AuditReportMenu';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
  GetCurrencies,SetCurrentPage } from './ConstSiteFunction';

//import Help from './Help';
var helpFuncValue="collapsereport";
var helpClassValue;
class ReportMenuPagePremium extends Component {
    constructor(){
        super()
        this.state={
            categoryName:'',
            categoryDate:'',
            categoryDateValid:false,
            formErrors: {
                categoryName:'',                   
            },
            categoryNameValid: false,
        }
      
    }
  
componentDidMount(){
  SetCurrentPage("ReportMenuPagePremium");

    window.scrollTo(0, 0);    
    // var shortcut = {
    //     'all_shortcuts': {},//All the shortcuts are stored in this array
    //     'add': function (shortcut_combination, callback, opt) {
    //         //Provide a set of default options
    //         var default_options = {
    //             'type': 'keydown',
    //             'propagate': false,
    //             'disable_in_input': false,
    //             'target': document,
    //             'keycode': false
    //         }
    //         if (!opt) opt = default_options;
    //         else {
    //             for (var dfo in default_options) {
    //                 if (typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
    //             }
    //         }
      
    //         var ele = opt.target;
    //         if (typeof opt.target == 'string') ele = document.getElementById(opt.target);
    //         var ths = this;
    //         shortcut_combination = shortcut_combination.toLowerCase();
      
    //         //The function to be called at keypress
    //         var func = function (e) {
    //             e = e || window.event;
      
    //             if (opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
    //                 var element;
    //                 if (e.target) element = e.target;
    //                 else if (e.srcElement) element = e.srcElement;
    //                 if (element.nodeType == 3) element = element.parentNode;
      
    //                 if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
    //             }
    //             var code;
    //             var k;
    //             //Find Which key is pressed
    //             if (e.keyCode) code = e.keyCode;
    //             else if (e.which) code = e.which;
    //             var character = String.fromCharCode(code).toLowerCase();
      
    //             if (code == 188) character = ","; //If the user presses , when the type is onkeydown
    //             if (code == 190) character = "."; //If the user presses , when the type is onkeydown
      
    //             var keys = shortcut_combination.split("+");
    //             //Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
    //             var kp = 0;
      
    //             //Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
    //             var shift_nums = {
    //                 "`": "~",
    //                 "1": "!",
    //                 "2": "@",
    //                 "3": "#",
    //                 "4": "$",
    //                 "5": "%",
    //                 "6": "^",
    //                 "7": "&",
    //                 "8": "*",
    //                 "9": "(",
    //                 "0": ")",
    //                 "-": "_",
    //                 "=": "+",
    //                 ";": ":",
    //                 "'": "\"",
    //                 ",": "<",
    //                 ".": ">",
    //                 "/": "?",
    //                 "\\": "|"
    //             }
    //             //Special Keys - and their codes
    //             var special_keys = {
    //                 'esc': 27,
    //                 'escape': 27,
    //                 'tab': 9,
    //                 'space': 32,
    //                 'return': 13,
    //                 'enter': 13,
    //                 'backspace': 8,
      
    //                 'scrolllock': 145,
    //                 'scroll_lock': 145,
    //                 'scroll': 145,
    //                 'capslock': 20,
    //                 'caps_lock': 20,
    //                 'caps': 20,
    //                 'numlock': 144,
    //                 'num_lock': 144,
    //                 'num': 144,
      
    //                 'pause': 19,
    //                 'break': 19,
      
    //                 'insert': 45,
    //                 'home': 36,
    //                 'delete': 46,
    //                 'end': 35,
      
    //                 'pageup': 33,
    //                 'page_up': 33,
    //                 'pu': 33,
      
    //                 'pagedown': 34,
    //                 'page_down': 34,
    //                 'pd': 34,
      
    //                 'left': 37,
    //                 'up': 38,
    //                 'right': 39,
    //                 'down': 40,
      
    //                 'f1': 112,
    //                 'f2': 113,
    //                 'f3': 114,
    //                 'f4': 115,
    //                 'f5': 116,
    //                 'f6': 117,
    //                 'f7': 118,
    //                 'f8': 119,
    //                 'f9': 120,
    //                 'f10': 121,
    //                 'f11': 122,
    //                 'f12': 123
    //             }
      
    //             var modifiers = {
    //                 shift: { wanted: false, pressed: false },
    //                 ctrl: { wanted: false, pressed: false },
    //                 alt: { wanted: false, pressed: false },
    //                 meta: { wanted: false, pressed: false }   //Meta is Mac specific
    //             };
      
    //             if (e.ctrlKey) modifiers.ctrl.pressed = true;
    //             if (e.shiftKey) modifiers.shift.pressed = true;
    //             if (e.altKey) modifiers.alt.pressed = true;
    //             if (e.metaKey) modifiers.meta.pressed = true;
      
    //             for (var i = 0; k = keys[i], i < keys.length; i++) {
    //                 //Modifiers
    //                 if (k == 'ctrl' || k == 'control') {
    //                     kp++;
    //                     modifiers.ctrl.wanted = true;
      
    //                 } else if (k == 'shift') {
    //                     kp++;
    //                     modifiers.shift.wanted = true;
      
    //                 } else if (k == 'alt') {
    //                     kp++;
    //                     modifiers.alt.wanted = true;
    //                 } else if (k == 'meta') {
    //                     kp++;
    //                     modifiers.meta.wanted = true;
    //                 } else if (k.length > 1) { //If it is a special key
    //                     if (special_keys[k] == code) kp++;
      
    //                 } else if (opt['keycode']) {
    //                     if (opt['keycode'] == code) kp++;
      
    //                 } else { //The special keys did not match
    //                     if (character == k) kp++;
    //                     else {
    //                         if (shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
    //                             character = shift_nums[character];
    //                             if (character == k) kp++;
    //                         }
    //                     }
    //                 }
    //             }
      
    //             if (kp == keys.length &&
    //                 modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
    //                 modifiers.shift.pressed == modifiers.shift.wanted &&
    //                 modifiers.alt.pressed == modifiers.alt.wanted &&
    //                 modifiers.meta.pressed == modifiers.meta.wanted) {
    //                 callback(e);
      
    //                 if (!opt['propagate']) { //Stop the event
    //                     //e.cancelBubble is supported by IE - this will kill the bubbling process.
    //                     e.cancelBubble = true;
    //                     e.returnValue = false;
      
    //                     //e.stopPropagation works in Firefox.
    //                     if (e.stopPropagation) {
    //                         e.stopPropagation();
    //                         e.preventDefault();
    //                     }
    //                     return false;
    //                 }
    //             }
    //         }
    //         this.all_shortcuts[shortcut_combination] = {
    //             'callback': func,
    //             'target': ele,
    //             'event': opt['type']
    //         };
    //         //Attach the function with the event
    //         if (ele.addEventListener) ele.addEventListener(opt['type'], func, false);
    //         else if (ele.attachEvent) ele.attachEvent('on' + opt['type'], func);
    //         else ele['on' + opt['type']] = func;
    //     },
      
    //     //Remove the shortcut - just specify the shortcut and I will remove the binding
    //     'remove': function (shortcut_combination) {
    //         shortcut_combination = shortcut_combination.toLowerCase();
    //         var binding = this.all_shortcuts[shortcut_combination];
    //         delete (this.all_shortcuts[shortcut_combination])
    //         if (!binding) return;
    //         var type = binding['event'];
    //         var ele = binding['target'];
    //         var callback = binding['callback'];
      
    //         if (ele.detachEvent) ele.detachEvent('on' + type, callback);
    //         else if (ele.removeEventListener) ele.removeEventListener(type, callback, false);
    //         else ele['on' + type] = false;
    //     }
    //   }
      
      
    //     shortcut.add("F1", function () {
      
    //         var helpFuncId= helpFuncValue;
    //         switch(true){


    //           case helpFuncId.includes("helpdailysalesreport") :
    //           helpClassValue= "collapsedailysalesreport";
    //           console.log("class",helpClassValue);
    //           break;
            
    //           case helpFuncId.includes("helpmonthlysalesreport") :
    //           helpClassValue= "collapsemonthlysalesreport";
    //           console.log("clas s",helpClassValue);
    //           break;
    
    //           case helpFuncId.includes("helpyearlysalesreport") :
    //           helpClassValue= "collapseyearlysalesreport";
    //           console.log("clas s",helpClassValue);
    //           break;

    //           case helpFuncId.includes("helpdatewisesalesreport") :
    //           helpClassValue= "collapsedatewisesalesreport";
    //           console.log("clas s",helpClassValue);
    //           break;

    //           case helpFuncId.includes("helpcustomerstatementsalesreport") :
    //           helpClassValue= "collapsecustomerstatementsalesreport";
    //           console.log("clas s",helpClassValue);
    //           break;
    
    //           case helpFuncId.includes("helpdailyexpensereport") :
    //           helpClassValue= "collapsedailyexpensereport";
    //           console.log("clas s",helpClassValue);
    //           break;

    //           case helpFuncId.includes("helpmonthlyexpensereport") :
    //           helpClassValue= "collapsemonthlyexpensereport";
    //           console.log("clas s",helpClassValue);
    //           break;

    //           case helpFuncId.includes("helpyearlyexpensereport") :
    //           helpClassValue= "collapseyearlyexpensereport";
    //           console.log("clas s",helpClassValue);
    //           break;

    //           case helpFuncId.includes("helpdatewiseexpensereport") :
    //           helpClassValue= "collapsedatewiseexpensereport";
    //           console.log("clas s",helpClassValue);
    //           break;

    //           case helpFuncId.includes("helpdailypurchasereport") :
    //           helpClassValue= "collapsedailypurchasereport";
    //           console.log("clas s",helpClassValue);
    //           break;

            

    //           case helpFuncId.includes("helpmonthlypurchasereport") :
    //           helpClassValue= "collapsemonthlypurchasereport";
    //           console.log("clas s",helpClassValue);
    //           break;

    //           case helpFuncId.includes("helpyearlypurchasereport") :
    //           helpClassValue= "collapseyearlypurchasereport";
    //           console.log("clas s",helpClassValue);
    //           break;

           
    //           case helpFuncId.includes("helpdatewisepurchasereport") :
    //           helpClassValue= "collapsedatewisepurchasereport";
    //           console.log("clas s",helpClassValue);
    //           break;

    //           case helpFuncId.includes("helpvendorstatementpurchasereport") :
    //           helpClassValue= "collapsevendorstatementpurchasereport";
    //           console.log("clas s",helpClassValue);
    //           break;

    //           case helpFuncId.includes("helpdailyestimatereport") :
    //           helpClassValue= "collapsedailyestimatereport";
    //           console.log("clas s",helpClassValue);
    //           break;

    //           case helpFuncId.includes("helpmonthlyestimatereport") :
    //           helpClassValue= "collapsemonthlyestimatereport";
    //           console.log("clas s",helpClassValue);
    //           break;

    //           case helpFuncId.includes("helpyearlyestimatereport") :
    //           helpClassValue= "collapseyearlyestimatereport";
    //           console.log("clas s",helpClassValue);
    //           break;

    //           case helpFuncId.includes("helpdatewiseestimatereport") :
    //           helpClassValue= "collapsedatewiseestimatereport";
    //           console.log("clas s",helpClassValue);
    //           break;

    //           case helpFuncId.includes("helpcustomerstatementestimatereport") :
    //           helpClassValue= "collapsecustomerstatementestimatereport";
    //           console.log("clas s",helpClassValue);
    //           break;


    //           case helpFuncId.includes("helpgstquotationreport") :
    //           helpClassValue= "collapsegstquotationreport";
    //           console.log("clas s",helpClassValue);
    //           break;

    //           case helpFuncId.includes("helpwithoutgstquotationreport") :
    //           helpClassValue= "collapsewithoutgstquotationreport";
    //           console.log("clas s",helpClassValue);
    //           break;

    //           case helpFuncId.includes("helpmessagecenterreport") :
    //           helpClassValue= "collapsemessagecenterreport";
    //           console.log("clas s",helpClassValue);
    //           break;

            
    //         default:
    //         /*   alert("default"); */
            
    //           helpClassValue= "collapsereport";
    //         console.log("clas",helpClassValue);
            
    //           break;
       
    //        } 
    //     ReactDOM.render(
    //       <Router>
    //         <div>
    //           <Route path="/" component={() => <Help data={helpClassValue}  />} />
             
    //         </div>  
    //       </Router>,
    //       document.getElementById("contentRender")
    //       );
    
         
         
             
                  
    //       });  
   
}

SalesDaily(){
  
    helpFuncValue="helpdailysalesreport";
    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "salesReport") {
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
      var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
      w.document.write('You are not Allowed to Access this Page')
      w.focus()
      setTimeout(function () { w.close(); }, 2000)
     
      }
    
}
SalesMonthly(){
 helpFuncValue="helpmonthlysalesreport";
 var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

 var flag = 1;//false
 var i = permission.length;
 $.each(permission, function (i, item) {

   if (item.permission == "salesReport") {
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
      var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
      w.document.write('You are not Allowed to Access this Page')
      w.focus()
      setTimeout(function () { w.close(); }, 2000)
     
      }
    
}

SalesYearly(){
    helpFuncValue="helpyearlysalesreport";
   
    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
   
    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {
   
      if (item.permission == "salesReport") {
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
      var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
      w.document.write('You are not Allowed to Access this Page')
      w.focus()
      setTimeout(function () { w.close(); }, 2000)
     
      }
}

SalesDatewise(){
    helpFuncValue="helpdatewisesalesreport";
    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
   
    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {
   
      if (item.permission == "salesReport") {
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
      var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
      w.document.write('You are not Allowed to Access this Page')
      w.focus()
      setTimeout(function () { w.close(); }, 2000)
     
      }

}

SalesCustomerStmt(){
    helpFuncValue="helpcustomerstatementsalesreport";
    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
   
    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {
   
      if (item.permission == "salesReport") {
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
    }   else {
      var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
      w.document.write('You are not Allowed to Access this Page')
      w.focus()
      setTimeout(function () { w.close(); }, 2000)
     
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

  MessageCenter(){
    helpFuncValue="helpmessagecenterreport";
    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
   
    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {
   
      if (item.permission == "messageCenterReport") {
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
      var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
      w.document.write('You are not Allowed to Access this Page')
      w.focus()
      setTimeout(function () { w.close(); }, 2000)
    }

  }
  ProfitLossReportFunc(){
    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
   
    var flag = 1;//false
    var i = permission.length;
    $.each(permission, function (i, item) {
   
      if (item.permission == "profitLossReport") {
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
      var w = window.open('', '', 'resizable=yes,top=250,left=500,width=500,height=100')
      w.document.write('You are not Allowed to Access this Page')
      w.focus()
      setTimeout(function () { w.close(); }, 2000)
    }
  } 
  AuditReportFunc(){
    ReactDOM.render(
      <Router>
        <div>         
          <Route path="/" component={AuditReportMenu} />        
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }
    render() {
        return(
            <div class="container">
             <ul class="previous disabled" id="backbutton"
                    style={{
                        backgroundColor: "#05a4b5",color:"white",
                        float: "none",
                        display: "inline-block",
                        marginLeft: "5px",
                        borderRadius: "5px",
                        padding: "3px 7px 3px 7px",
                        marginTop:"13px"
                    }}>
                    <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></ul>
     <div class="row">
         <div class="col-sm-4 col-md-4 col-lg-4" >
             <div class="card" style={{boxSizing:"borderBox",backgroundColor:"white"}}>
               <div class="card-body">
                  <div class="row">
                     <div class="col-lg-12">
                      <div class="mail-contnet">
                    <h3>Sales Report</h3>
     <ul>
         <li><a href="#" onClick={() => this.SalesDaily()}>Daily</a></li>
         <li><a href="#"  onClick={() => this.SalesMonthly()}>Monthly</a></li>
         <li><a href="#"  onClick={() => this.SalesYearly()}>Yearly</a></li>
         <li><a href="#"  onClick={() => this.SalesDatewise()}>Date wise</a></li>
        <li><a href="#"  onClick={() => this.SalesCustomerStmt()}>Customer Statement</a></li> 
     </ul></div></div></div></div></div></div>
   




    


     <div class="col-sm-4 col-md-4 col-lg-4" style={{boxSizing:"borderBox"}}>
             <div class="card">
               <div class="card-body">
                  <div class="row">
                     <div class="col-lg-12">
                      <div class="mail-contnet">
      <h3>Message Center</h3>
      <ul>
         <li><a href="#"  onClick={() => this.MessageCenter()}>Message Center Report</a></li>
       
     </ul></div></div></div></div></div></div>

     <div class="col-sm-4 col-md-4 col-lg-4" style={{boxSizing:"borderBox"}}>
             <div class="card">
               <div class="card-body">
                  <div class="row">
                     <div class="col-lg-12">
                      <div class="mail-contnet">
      <h3>Profit & Loss</h3>
      <ul>
         <li><a href="#"  onClick={() => this.ProfitLossReportFunc()}>Profit & Loss Report</a></li>
       
     </ul></div></div></div></div></div></div>

     <div class="col-sm-4 col-md-4 col-lg-4" style={{boxSizing:"borderBox"}}>
             <div class="card">
               <div class="card-body">
                  <div class="row">
                     <div class="col-lg-12">
                      <div class="mail-contnet">
      <h3>Audit Report</h3>
      <ul>
         <li><a href="#"  onClick={() => this.AuditReportFunc()}>Audit Report</a></li>
   </ul></div></div></div></div></div></div>


 
   
             </div>
        
            
              </div> 
                    );
    }

}
export default ReportMenuPagePremium;