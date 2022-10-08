import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
//import './SalaryReportDisplay.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import SalaryReport from './SalaryReport';
import Case from "case";
//import { GetEmployeeSite,GetCurrentSite  } from './ConstSiteFunction';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
    GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
var numberToWord = require('npm-number-to-word');



class SalaryReportDisplay extends Component {
    constructor(props) {
      super(props)
  
      var today = new Date();
      today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
     
      this.state = {
        StaffId:'',
        month:''
        
      };
  
    }
    componentDidMount() {
        SetCurrentPage("SalaryReportDisplay");
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.setState({
            companyId: companyId,
        });

        $.ajax({
            type: 'POST',
           data:JSON.stringify({
            staffId:this.props.staffId,
            month:this.props.month,
            companyId:this.state.companyId,
            empSites:GetEmployeeSite()
           }),
           url: "http://15.206.129.105:8080/ThroughBooksCOAPI/salaryreportView",
            contentType: "application/json",
            dataType: 'json',
            async: false,
      
            success: function (data, textStatus, jqXHR) {
       
      var tab;
      $("#ContentPlaceHolder1_lbl_customer_name").append(data[1].staffName);
      $("#ContentPlaceHolder1_lbl_customer_address").append(data[0].address);
      $("#ContentPlaceHolder1_lbl_customer_contact").append(data[0].contactNo);

      $("#ContentPlaceHolder1_lbl_payslip_month").append(data[1].month);
      $("#ContentPlaceHolder1_lbl_company_hrs").append(data[1].companyWorkingHrs);
      $("#ContentPlaceHolder1_lbl_cmp_pay_gel").append(data[1].companyWorkingHrsSalary);
      $("#ContentPlaceHolder1_lbl_cmp_pay_ot").append(data[1].companyOtHrsSalary);
       
tab +='<tr><td>'+data[1].days+'</td><td>'+data[1].presentDays+'</td><td>'+data[1].absentDays+'</td>'
+'<td>'+data[1].leaveDays+'</td><td>'+data[1].holidayDays+'</td>'
+'<td>'+data[1].totalWorkingHrs+'</td><td>'+data[1].workingHrs+'</td>'
+'<td>'+data[1].otWorkingHrs+'</td><td>'+data[1].empTotalWorkingHrsSalary+'</td></tr>';
var numtoword = numberToWord(Number(data[1].empTotalWorkingHrsSalary));

$("#numWords").text(Case.capital(numtoword));
$("#salarytable").append(tab);

    },
        error: function (data) {
        
          confirmAlert({
            title: 'No Internet',                        // Title dialog
            message: 'Network Connection Problem',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          });
      
        }
      });



    }
    BackbtnFunc() {
        ReactDOM.render(
          <Router>
            <div>
            
              <Route path="/" component={SalaryReport} />
            
      
            </div>
          </Router>,
          document.getElementById('contentRender'));
        registerServiceWorker();
      }
      
    
render() {
    return (


        <div class="container" >
         <ul class="previous disabled" id="backbutton"
                    style={{
                        backgroundColor: "#05a4b5",color:"white",
                        float: "none",
                        display: "inline-block",
                        marginLeft: "5px",
                        borderRadius: "5px",
                        padding: "3px 7px 3px 7px"
                    }}>
                    <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></ul>


        <div id="dropHere" class="card">

            <div class="card-body">

                <div class="row">

                    <div class="col-lg-12 m-b-3">

                        <h3 class="text-black">
                         <span id="ContentPlaceHolder1_lbl_status" class="pay_status" style={{color:"Red",backgroundColor:"White",marginLeft:"10px"}}></span>
                            <span class="pull-right">Salary Slip</span> </h3>
                    </div>


                </div>

                <div class="row">
                    <div class="col-sm-8 invoice-col">

                      
                    </div>

                    <div class="col-sm-4 invoice-col text-right">

                        <h4> <strong> <span id="ContentPlaceHolder1_lbl_company_name">Omr Art Printer</span></strong></h4>

                        <span id="ContentPlaceHolder1_lbl_company_address">No.75, KKJ Complex, 2nd floor,</span><br />
                        <span>Kalaingar Karunanidhi Salai,</span><br /><span>Sholinganallur, Chennai - 600 119 </span><br />
Phone: <span id="ContentPlaceHolder1_lbl_company_contact">9087878995 / 92</span><br />
GST no: <span id="ContentPlaceHolder1_lbl_company_gst">DPK12345</span><br />
Email: <span id="ContentPlaceHolder1_lbl_company_email">omrprinter@gmail.com</span>

                    </div>
                    <hr></hr>
                </div>

                <hr></hr>
                <div class="row">
                    <div class="col-sm-6 invoice-col"> To
         <address>
                            <strong>
                               <p> <span id="ContentPlaceHolder1_lbl_customer_name"></span></p></strong>
                               <p> Address: <span id="ContentPlaceHolder1_lbl_customer_address"></span></p>
                               <p> Phone: <span id="ContentPlaceHolder1_lbl_customer_contact"></span> </p> 
                         </address>
                    </div>

                    <div class="col-sm-6 invoice-col text-right">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <tbody>

                                    <tr>
                                        <th style={{width:"50%"}}>Pay Slip Of Month</th>
                                        <td><span id="ContentPlaceHolder1_lbl_payslip_month"></span></td>
                                    </tr>

                                    <tr>
                                        <th style={{width:"50%"}}>Company General Working Hrs</th>
                                        <td><span id="ContentPlaceHolder1_lbl_company_hrs"></span></td>
                                    </tr>

                                     <tr>
                                        <th style={{width:"50%"}}>Company Salary For General Hrs</th>
                                        <td><span id="ContentPlaceHolder1_lbl_cmp_pay_gel"></span></td>
                                    </tr>


                                     <tr>
                                        <th style={{width:"50%"}}>Company Salary For OT Hrs</th>
                                        <td><span id="ContentPlaceHolder1_lbl_cmp_pay_ot"></span></td>
                                    </tr>

                                </tbody></table>
                        </div>



                    </div>
                </div>

                <div class="table-responsive">
                    <div>
                       
                            <table class="table table-bordered" id="salarytable">
                                <thead id="ContentPlaceHolder1_ths" style={{color:"black",backgroundColor:"white"}}>
                                    <tr>
                                         <th scope="col">Total Working Days</th>
                                        <th scope="col">#Present</th>
                                        <th scope="col">#Absent</th>
                                        <th scope="col">#Leave</th>
                                        <th scope="col">#Holiday</th>
                                        <th scope="col">Total Working Hrs</th>
                                        <th scope="col">General Working Hrs</th>
                                        <th scope="col">OT Working Hrs</th>
                                        <th scope="col">Salary</th>
               
                                    </tr>
                                </thead>

                                <tbody>
                              
                                </tbody>

                            </table>
       </div>

                    </div>


                                    </div>

                        <div class="col-md-12"><div style={{borderTop: "1px solid rgba(0,0,0,.1)",borderBottom: "1px solid rgba(0,0,0,.1)",padding: "5px"}}>
                            <span ><b> In Words : </b><span id="numWords"></span> Dollar ONLY</span>
                        </div></div>

                        <div class="col-md-12 m-t-6">
                            <div class="row">
                                <div class="col-md-7"></div>
                                <div class="col-md-3" style={{borderBottom:"1px solid rgba(0,0,0,.2)"}}></div>
                                <div class="col-md-2"></div>

                            </div>
                        </div>
                        <div class="col-md-12 m-t-6">
                            <div class="row">
                                <div class="col-md-7"></div>
                                <div class="col-md-2">Provider Sign</div>
                                <div class="col-md-3" ></div>
                                

                            </div>
                        </div>
                    </div>






        </div >

);
}
}
export default SalaryReportDisplay;

