import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import { FormErrors } from './FormErrors';
import $ from 'jquery';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import SalesReportDisplay from './SalesReportDisplay';
import SalesDailyReport from './SalesDailyReport';
import ReportMenuPage from './ReportMenuPage';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import CryptoJS from 'crypto-js';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';

var id;
var discount = 0;
var pay = 0;
class ExpenseReportEdit extends Component {

  constructor(props) {
    super(props)
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
   
    this.state = {
      date: date,
      categoryName: this.props.categoryName,
      userName: this.props.userName,
      amount: this.props.amount,
      date: this.props.date,
      oldCategoryName: this.props.oldCategoryName,
      oldUserName: this.props.oldUserName,
      oldAmount: this.props.oldAmount,
      oldDate: this.props.oldDate,
      id: this.props.id,
      companyId: companyId,
      staffId:staffId,
      employeeName:employeeName,
      role:role,
    };
    this.setState({
      date: date,
    })


  }


  /*validateField(fieldName, value) {
      let fieldValidationErrors = this.state.formErrors;
      let discountValid  = this.state.discountValid ;
      let payValid  = this.state.payValid ;
       let paymentModeValid=this.state.paymentModeValid;
     
      switch (fieldName) {
          case 'discount':
      discountValid = value.match(/^(\d*\.)?\d+$/);
              fieldValidationErrors.disount = discountValid ? '' : ' is InCorrect';
              break;
          case 'pay':
              payValid = value.match(/^(\d*\.)?\d+$/);
              fieldValidationErrors.pay = payValid ? '' : ' is InCorrect';
              break;
        case 'paymentMode':
              paymentModeValid = value.length > 0;  
              fieldValidationErrors.paymentMode = paymentModeValid ? '' : ' is InCorrect';
              break;
  
          default:
              break;
      }
      this.setState({
          formErrors: fieldValidationErrors,
          discountValid: discountValid,
          payValid: payValid,
          paymentModeValid:paymentModeValid,
         
      }, this.validateForm);
  }
  validateForm() {
  
      this.setState({
          formValid:
              this.state.discountValid
              && this.state.payValid
              && this.state.paymentModeValid
          
  
      });
  }
  
  errorClass(error) {
      return (error.length === 0 ? '' : 'has-error');
  }
  
   */


  componentDidMount() {
SetCurrentPage("ExpenseReportEdit");


  }




  handleUserInput = (e) => {

    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value

    },
    );

  }




  UpdateSubmit() {

    var self = this;

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        categoryName: self.state.categoryName,
        userName: self.state.userName,
        amount: self.state.amount,
        date: self.state.date,
        oldCategoryName: self.state.oldCategoryName,
        oldUserName: self.state.oldUserName,
        oldAmount: self.state.oldAmount,
        oldDate: self.state.oldDate,
        id: self.state.id,
        companyId: this.state.companyId,
        staffId:this.state.staffId,
        employeeName:this.state.employeeName,
        role:this.state.role,

      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/ExpenseReport/DailyExpenseReportUpdate",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {

        var tab;
        tab += '<tbody id= "myTable" ><tr  id="tabletextcol" ><td>' + self.state.id + '</td><td>' + self.state.categoryName + '</td><td>' + self.state.userName + '</td><td>' + self.state.amount + '</td><td>' + self.state.date + '</td>'
          + '<td><button id="delete">Delete</button></td>'
          + '<td><button id="view" class="Update" data-toggle="modal" data-target="#myModalview" >View</button></td>'
          + '<td><button id="edit" class="Update" data-toggle="modal" data-target="#myModaledit">Edit</button></td></tr></tbody>';




        $("#tableHeadings").append(tab);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Amount Updated Successfully.',
          showConfirmButton: false,
          timer: 2000
        })

        ReactDOM.render(
          <Router>
            <div>

              <Route path="/" component={ReportMenuPage} />


            </div>
          </Router>,
          document.getElementById('contentRender'));
        registerServiceWorker();


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
    var planName = CryptoJS.AES.decrypt(localStorage.getItem("PlanName"),"shinchanbaby").toString(CryptoJS.enc.Utf8);

  //	 alert("plantype"+planName);
   if(planName.toLowerCase() =="basic"){
   
       ReactDOM.render(
           <Router>
               <div >
                   <Route exact path="/" component={ReportMenuPageBasic} />
               
                   </div>
           </Router>, document.getElementById('contentRender'));
       registerServiceWorker();
   }
   else if(planName.toLowerCase() =="premium"){
    
       ReactDOM.render(
           <Router>
               <div >			
                   <Route exact path="/" component={ReportMenuPagePremium} />
                
               </div>
           </Router>,
              document.getElementById('contentRender'));
       registerServiceWorker();
   }
  else if(planName.toLowerCase() =="elite"){
 
  
   ReactDOM.render(
       <Router>
           <div >	
               <Route exact path="/" component={ReportMenuPage} />
             
               </div>
       </Router>, 
       document.getElementById('contentRender'));
   registerServiceWorker();
  }
  
  }




  render() {
    return (


      <div class="container" style={{ height: "20px" }}>
   <div class="row" style={{marginTop:"13px"}}>
          <div class="col-lg-3 col-md-3 col-sm-3 col-xd-3">
            <div class="previous disabled" id="backbutton"
              style={{
                backgroundColor: "#05a4b5",
                float: "none",
                display: "inline-block",
                marginLeft: "5px",
                borderRadius: "5px",
                padding: "3px 7px 3px 7px",color:"white"
              }}>
              <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></div>

          </div>
          <div class="col-lg-9 col-md-9 col-sm-9 col-xd-9">
            <h4>Expense Report Edit</h4>
          </div>
        </div>
        <div class="card">
        
          <div>
            <div class="card-body">
              <form class="form-horizontal form-bordered" >
                <div class="form-group">
                  <label class="control-label col-sm-2" for="categoryName">Category Name</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control"
                      onChange={this.handleUserInput}
                      value={this.state.categoryName}
                      id="categoryname"
                      name="categoryName" readOnly />


                  </div></div>
                <div class="form-group">
                  <label class="control-label col-sm-2" for="userName">User Name<span style={{ color: "red" }}>*</span></label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control"
                      onChange={this.handleUserInput}
                      value={this.state.userName}
                      id="userName"
                      name="userName" readOnly />
                  </div>
                </div>
                <div className="form-group">
                  <label class="control-label col-sm-2" for="amount">Amount</label>
                  <div class="col-sm-10">
                    <input class="form-control" type="text"
                      onChange={this.handleUserInput}
                      value={this.state.amount}
                      id="amount"
                      name="amount" /></div>
                </div>
                <div className="form-group">
                  <label class="control-label col-sm-2" for="date">Date</label>
                  <div class="col-sm-10">
                    <input class="form-control" type="text"
                      onChange={this.handleUserInput}
                      value={this.state.date}
                      id="date"
                      name="date" readOnly />
                  </div></div>
              </form>
            </div>

          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-sm-offset-2 col-sm-10">
                <button type="button" style={{ fontWeight: "bold" }} class="btn btn-primary" onClick={() => this.UpdateSubmit()}>Update</button>

              </div></div></div>


        </div></div>
    );
  }
}

export default ExpenseReportEdit;