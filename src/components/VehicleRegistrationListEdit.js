import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
  GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
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
import VendorList from './VendorList';
import VehicleRegistrationList from './VehicleRegistrationList';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Select from 'react-select';

//import { GetEmployeeSite,GetCurrentSite  } from './ConstSiteFunction';

var id;
var discount = 0;
var pay = 0;
class VehicleRegistrationListEdit extends Component {

    constructor(props) {
        super(props)
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
       
        var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    
        this.state = {
            date: date,

            bookingId: this.props.bookingId,
            vehicleRegistrationNo: this.props.vehicleRegistrationNo,
            customerName: this.props.customerName,
            contactNo: this.props.contactNo,
            email: this.props.emailId,
            issues:'',
            vehicleRegistrationId: this.props.vehicleRegistrationId,
            vehicleMake:this.props.vehicleMake,
            vehicleModel:this.props.vehicleModel,
            vehicleFuelType:this.props.vehicleFuelType,  
            companyName: companyName,
            staffId: staffId,
            employeeName: employeeName,
            role: role,
            companyId: companyId,
            values: [],
            selected:[],
            formErrors: {
              
                issues:'',
               
            },
         
          
            issuesValid:true,
             
        };
        this.setState({
            date: date,
        })


    }


    
    componentDidMount() {
      SetCurrentPage("VehicleRegistrationListEdit");

        this.validateForm();
        this.GetData();
var issues=this.props.services;
this.state.issues=issues;
var issuesArray=issues.split(",");


var selectedIssuesArray=[];



this.state.selectedissues=[];

for(var i=0;i<issuesArray.length;i++){
 
   if(issuesArray[i]!=" "){
    this.state.selectedissues.push({label:issuesArray[i],value:issuesArray[i]})
   }

}

    }

   

    GetData() {

        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        this.state.companyId = companyId;
    
        this.setState({
          companyId: this.state.companyId,
    
        });
        $(".btn-default").css("background-color","#05a4b5");
        $(".btn-default").css("color","white");
        var self = this;
        $.ajax({
          type: 'POST',
          data: JSON.stringify({
            companyId: this.state.companyId,
    
          }),
          url: "http://15.206.129.105:8080/ThroughBooksCOAPI/master/saleproductreport",
          contentType: "application/json",
          dataType: 'json',
          success: function (data, textStatus, jqXHR) {
    
            
    
    
            var issues = data.saleProductRetrievelist;
         
    
            var issuesValue = [];
            $.each(issues, function (i, item) {
              if (item.productType === "service" || item.productType === "general" || item.productType === "labour" ) {
                issuesValue.push({ label: item.productName, value: item.productName });
           
    
              }
            });
    
            self.state.values = issuesValue;
            self.setState({
              values: issuesValue,
            })
    
    
    
            self.state.myData = issuesValue;
            self.state.values = issuesValue;
    
            self.state.selected = issuesValue;
            self.setState({
              myData: issuesValue,
              values: issuesValue,
              selected: issuesValue,
    
            })
    
    
          },
          error: function (data, textStatus, jqXHR) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Network Connection Problem',
                showConfirmButton: false,
                timer: 2000
              })
    
    
          },
    
        });
      }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
      
        let issuesValid=this.state.issuesValid;


        switch (fieldName) {
     
               
          case 'issues':
                if(value=="NO"){
                    
                 issuesValid = value.length < 0;
           //      alert("ACTIVITY :"+value.length +"   "+activityValid);
                 fieldValidationErrors.issues = issuesValid ? '' : ' is InCorrect';
                 break;
                } else{
                
                    issuesValid = value.length >= 1;
              //   alert("ACTIVITY :"+value.length +"   "+activityValid);
                 fieldValidationErrors.issues = issuesValid ? '' : ' is InCorrect';
                 break;
                }
 

            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
       
            issuesValid: issuesValid,
          
     

        }, this.validateForm);
    }

    validateForm() {

        this.setState({
            formValid:
              
                 this.state.issuesValid
      


        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    

    handleUserInput = (e) => {

        const name = e.target.name;
        const value = e.target.value;
       
        this.setState({
            [name]: value

        },
        );

    }




    handleChange = (e) => {
        // Display selected value for user
        var currentValue= e;

        if(currentValue==null){
            currentValue="NO";
        }
    //    alert("CURRENT VALUE :"+currentValue);
       var name="issues";
       this.state.selectedissues=e;
                 
                 this.setState({   selectedissues:this.state.selectedissues},
                    () => { this.validateField(name, currentValue) });

// alert( this.state.issues)

             
        // for our use getting value in array
                var issues=[];
                $.each(e, function (i, item) {

                    issues.push(item.value);
                });
                this.state.issues=issues;
               
            
            }

    BackbtnFunc() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={VehicleRegistrationList} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }
    UpdateVehicleRegistrationFunc() {
        var self = this;
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.setState({
          companyId: companyId,
        });
    
    if(this.state.vehicleRegistrationNo.length>0){
        // alert(JSON.stringify({
        //     vehicleRegistrationNo: this.state.vehicleRegistrationNo,
        //     customerName: this.state.customerName,
        //     contactNo: this.state.contactNo,
        //     email: this.state.email,
        //     issues: this.state.issues.toString(),
        //     companyId: this.state.companyId,
        //     staffId: this.state.staffId,
        //     employeeName: this.state.employeeName,
        //     role: this.state.role,
        //  vehicleRegistrationId:this.state.vehicleRegistrationId,
        //     bookingId:this.state.bookingId,
        
      
      
        //   }),)
      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          vehicleRegistrationNo: this.state.vehicleRegistrationNo,
          customerName: this.state.customerName,
          contactNo: this.state.contactNo,
          email: this.state.email,
          issues: this.state.issues.toString(),
          companyId: this.state.companyId,
          staffId: this.state.staffId,
          employeeName: this.state.employeeName,
          role: this.state.role,
       vehicleRegistrationId:this.state.vehicleRegistrationId,
          bookingId:this.state.bookingId,
      
    
    
        }),
        url: " http://15.206.129.105:8080/ThroughBooksCOAPI/master/vehicleregistrationupdate",
        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
    
    
    
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: ' Your BookingId '
              + ' Has Been Updated. ',
            timer: 2000
          })
    

          ReactDOM.render(
            <Router >
              <div>
                <Route path="/" component={VehicleRegistrationList} />
              </div>
            </Router>, document.getElementById('contentRender'));
    
    
    
    
    
        },
    
        error: function (data) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Network Connection Problem',
            showConfirmButton: false,
            timer: 2000
          })
        },
      });
    }
     
      
      else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Select VehicleRegistration No',
          showConfirmButton: false,
          timer: 2000
        })
      }
    
    
      }



    render() {
        return (


            <div class="container" style={{ height: "20px" }}>
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
                <div class="card">
                    <div class="card-header">
                        <h4 style={{marginLeft:"150px"}}>Update Job card</h4>   </div>
                    <div>
                        <div class="card-body">
                            <form class="form-horizontal form-bordered" >
                            <div class="form-group">
                                    <label class="control-label col-sm-2" for="bookingId">Booking Id</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                            onChange={this.handleUserInput}
                                            value={this.state.bookingId}
                                            id="bookingId"
                                            name="bookingId" readOnly />


                                    </div></div>
                            <div class="form-group">
                                    <label class="control-label col-sm-2" for="customerName">CustomerName</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                            onChange={this.handleUserInput}
                                            value={this.state.customerName}
                                            id="customerName"
                                            name="customerName" readOnly />


                                    </div></div>
                              

                                    <div className="form-group">
                                    <label class="control-label col-sm-2" for="contactNo">Contact No</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.contactNo}
                                            id="contactNo"
                                            name="contactNo" readOnly /></div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-2" for="vehicleRegistrationNo">Vehicle No</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                            onChange={this.handleUserInput}
                                            value={this.state.vehicleRegistrationNo}
                                            id="vehicleRegistrationNo"
                                            name="vehicleRegistrationNo" readOnly />
                                    </div>
                                </div>
                             
                               

                                    <div className={`form-group ${this.errorClass(this.state.formErrors.issues)}`}>
                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="batch"> Services<span style={{ color: "red" }}>*</span></label>
                <div class="col-sm-10" >
                  {/*   <Multiselect

                                            onChange={this.handleChange} ref="myRef" data={this.state.myData} value={this.state.myData} multiple />
                                    </div> */}
                  <Select
                    id="issues"
                    name="issues"
                    isMulti={true}
                    value={this.state.selectedissues}
                    options={this.state.values}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div class="form-group">
                <div class="row" style={{ marginLeft: "2px", marginBottom: "10%" }}>
                  <div class="col-sm-offset-2 col-sm-10">
                    <button style={{ fontWeight: "bold" }} type="button" disabled={!this.state.formValid} onClick={() => this.UpdateVehicleRegistrationFunc()} class="btn btn-default">Submit</button> <span></span>
                    <button style={{ fontWeight: "bold" }} type="button" onClick={() => this.cancelFunc()} class="btn btn-default">Clear</button>
                  </div>
                </div>
              </div>

                            </form>
                        </div>

                    </div>


                </div></div>
        );
    }
}

export default VehicleRegistrationListEdit;