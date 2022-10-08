import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import VendorEntryForm from './VendorEntryForm';
import CustomerList from './CustomerList';
import AddCategory from './AddCategory';
import AddUser from './AddUser';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import './datepicker.css';

import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import { FormErrors } from './FormErrors';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './AddAppointment.css';
import Timekeeper from 'react-timekeeper';
import Select from 'react-select';
 import _ from 'underscore';
 import moment from 'moment';
import LandingPage_tagarage from './LandingPage_tagarage/LandingPage_tagarage';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';

var serviceArray=[];
var employeeArray=[];
var serviceListArray=[];
var serviceTimeArray=[];
var appointmentArray=[];

class CustomerAppointments extends Component {

    
    constructor(){
        super()
        
        var today = new Date();
        
        var date = today.getFullYear() + '-' + ('0'+(today.getMonth() + 1)).slice(-2) + '-' +('0'+ today.getDate()).slice(-2);
        // var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
         var currentTime = today.getHours() + ":" + today.getMinutes() ;

        this.state={
            currentDate: date,
            data:[],
            columns:[],
            timekeeperData:false,
            time:currentTime,
            appointmentTime:currentTime,
          
            customerName:"",
            mobileNo:"",
            gender:"",
            appointmentDate:"",
            employeeDetails:"",
          

        }
        this.setState({
          currentDate: date,
           }) 
    }

    componentDidMount() {     
      SetCurrentPage("CustomerAppointments");
        window.scrollTo(0, 0);      
       var self=this;
       $("#timekeeperdiv").hide();
     
       $(".btn-default").css("background-color","#05a4b5");
       $(".btn-default").css("color","white");
       $('#appointmentdate').datepicker({

        onSelect: function (date) {
  
          var dt = new Date(date);
          self.state.appointmentDate=date;

          self.setState({
            appointmentDate: self.state.appointmentDate,
          });

        },
  
        dateFormat: 'yy-mm-dd',
        minDate: '0',
        maxDate: '1M',
        numberOfMonths: 1
      });

      var genderArray=[];
      genderArray.push({ label: 'Male', value: 'Male'});
      genderArray.push({ label: 'Female', value: 'Female'});
      genderArray.push({ label: 'Other', value: 'Other'});
      this.state.genderOptions=genderArray;
      this.setState({
        genderOptions:this.state.genderOptions
      })


     this.GetSaloonDetails();
    
     
  
 
}
   
   
GetSaloonDetails()
    {
       var self=this;

  $.ajax({
            type: 'POST',
            data: JSON.stringify({
                     date:this.state.currentDate
            }),
          
              url: " http://15.206.129.105:8080/ThroughBooksCOAPI/Appointments/GetAllGarageDetails",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
             
                                 var saloonArray=[];
                               serviceArray=[];
                               employeeArray=[];
                               appointmentArray=[];

                              $.each(data.saloonDetails, function (i, item) {

                                saloonArray.push({ label: item.companyName+" - "+item.site+" - "+item.area,
                                    value: item.companyId,site:item.site,
                                    comp_ContactNo:item.comp_ContactNo,companyName:item.companyName });

                              });

                              serviceArray=data.serviceDetails;
                              employeeArray=data.employeeDetails;
                              appointmentArray=data.appointmentDetails;


                       

                              self.state.saloonOptions=saloonArray;
                          
                           self.setState({
                             saloonOptions:self.state.saloonOptions,
                          
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
          
      
            },
        });
    }
   
    handleUserInput = (e) => {
      const name = e.target.name;
      const value = (e.target.value).replace(/[^A-Za-z]/g, "");
      this.setState({
        [name]: value,
      });
  
    }    

    handleUserInputMobileNo =(e) =>{
      const name = e.target.name;
      const value = (e.target.value).replace(/[^0-9.,]+/, '');
      this.setState({
        [name]: value,
      });
    }
  
    handleChangeSelectedGenderOption = (e) => {
        // Display selected value for user
        var currentValue=e;
        this.state.genderOption=e;
        this.state.gender=e.value;
        this.setState({
          genderOption:this.state.genderOption,
          gender:this.state.gender
        })
    }

handleChangeSelectedSaloonOption = (e) => {
      
        // Display selected value for user
        var currentValue=e;
        this.state.saloonOption=e;
        var companyId=e.value;
        var site=e.site;
        var companyName=e.companyName;
        var comp_ContactNo=e.comp_ContactNo;

        this.setState({
          saloonOption:this.state.saloonOption,
          companyId:companyId,
          site:site,
          companyName:companyName,
          comp_ContactNo:comp_ContactNo,

        })

        this.state.serviceOption="";
        this.state.employeeOption="";

                serviceListArray=[];
       
                var currentServiceArray=[];
                var serviceArrayOptions=[];
                currentServiceArray=_.where(serviceArray, {companyId: companyId});
                $.each(currentServiceArray, function (i, item) {
                  serviceArrayOptions.push({ label:item.serviceName , value: item.serviceName });
                  });
              //    serviceArrayOptions.push({ label:'Towe', value:'Towe' });


                var currentEmployeeArray=[];
                var employeeArrayOptions=[];
                currentEmployeeArray=_.where(employeeArray, {companyId: companyId});
                $.each(currentEmployeeArray, function (i, item) {
                  employeeArrayOptions.push({ label: item.employeeName, value: item.employeeId+','+item.employeeName });   
                  });
                              
                   this.state.serviceOptions=serviceArrayOptions;
                   this.state.employeeOptions=employeeArrayOptions;
           
                            this.setState({
                               serviceOptions:this.state.serviceOptions,
                               employeeOptions:this.state.employeeOptions
                         
                            })
        
     
           }

handleChangeSelectedServiceOption = (e) => {
      
            // Display selected value for user
            var currentValue=e;
            this.state.serviceOption=e;
            this.setState({
              serviceOption:this.state.serviceOption
            })

            serviceListArray=[];
            serviceTimeArray=[];
            $.each(e, function (i, item) {
              serviceListArray.push(item.value);
              var timeArray=_.where(serviceArray, {serviceName: item.value});
              serviceTimeArray.push(timeArray[0].serviceTime);
              });

              
          
                       
     }

handleChangeSelectedEmployeeOption = (e) => {
      
 

  
                      // Display selected value for user
                      var currentValue=e;
                      this.state.employeeOption=e;
                      this.state.employeeDetails=e.value;
                      this.setState({
                        employeeOption:this.state.employeeOption,
                        employeeDetails:this.state.employeeDetails
                      })

                   
                  
                     
                     
                            
                         
      }
          
      keeperchangetime(newTime){
        this.state.appointmentTime=newTime;
        this.setState({
          appointmentTime:this.state.appointmentTime
        })
      }
      
      OpenTimeKeeper(){
      
        if(this.state.timekeeperData==true){
          $("#timekeeperdiv").hide();
        }else{
          $("#timekeeperdiv").show();
        }
       
      }
      
      CloseTimeKeeper(){
        this.state.timekeeperData=false;
        $("#timekeeperdiv").hide();
      }

    



BackbtnFunc() {
  ReactDOM.render(< LandingPage_tagarage />, document.getElementById('root'));
  }
  
 



  MakeAppointmentFunc(){

    var self=this;


    var proceedData="Yes";


    if(  this.state.customerName!="" && this.state.mobileNo!=""
     && this.state.appointmentDate!="" && serviceListArray.length!=0 ){

    var appointmentFixedDate = Date.parse(this.state.appointmentDate);
    var currentDate = Date.parse(this.state.currentDate);
 
 
     if(appointmentFixedDate==currentDate){
    
 
       var currentTime=new Date();
       var appointmentFixedTime =new Date();
  
        currentTime.setHours((this.state.time).split(":")[0], (this.state.time).split(":")[1],'0');
        appointmentFixedTime.setHours((this.state.appointmentTime).split(":")[0], (this.state.appointmentTime).split(":")[1],'0');
  
        if(appointmentFixedTime<=currentTime){
       
          proceedData="No";
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Select Service Time In Future',
            showConfirmButton: false,
            timer: 2000
          })
        }
 
     }

    if(proceedData=="Yes"){
     $.ajax({
      type: 'POST',
      data: JSON.stringify({
        customerName: this.state.customerName,
        mobileNo: this.state.mobileNo,
     //   gender:this.state.gender,
        appointmentDate: this.state.appointmentDate,
        bookingDate: this.state.currentDate,
        appointmentTime: this.state.appointmentTime,
//        appointmentEndTime:endTimings,
        companyId: this.state.companyId,
        service: serviceListArray.toString(),
       // employeedetails:this.state.employeeDetails,
        appointmentBy:'Client',
        modeofAppointment:'Online',
        getDataType:'AllGarage',
        date:this.state.currentDate,
        status:'0',
        description:"-",
        site:this.state.site,
        companyName:this.state.companyName,
        comp_ContactNo:this.state.comp_ContactNo,
      }),

      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/Appointments/MakeAppointments",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

      
      
          if(data.response=="Success"){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Service Booked Successfully',
              showConfirmButton: false,
              timer: 2000
            })
            self.cancelFunc();

         
          }else if(data.response=="EmployeeEngaged"){
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Employee Is Already Engaged Kindly Select Some Other Time',
              showConfirmButton: false,
              timer: 2000
            })
          }

          
  
         
           var saloonArray=[];
           serviceArray=[];
           employeeArray=[];
           appointmentArray=[];

          $.each(data.saloonDetails, function (i, item) {

            saloonArray.push({ label: item.companyName+" - "+item.site+" - "+item.area,
            value: item.companyId,site:item.site,
            comp_ContactNo:item.comp_ContactNo,companyName:item.companyName });

          });

          serviceArray=data.serviceDetails;
          employeeArray=data.employeeDetails;
          appointmentArray=data.appointmentDetails;


   

          self.state.saloonOptions=saloonArray;
      
       self.setState({
         saloonOptions:self.state.saloonOptions,
      
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
      },
    });
  }else{
    /*Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Select Appointment Time In Future',
      showConfirmButton: false,
      timer: 2000
    })
    */
  }

}else{
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'Kindly Fill In All Fields To Proceed',
    showConfirmButton: false,
    timer: 2000
  })
}
  }





cancelFunc(){

 

  this.state.customerName="";
  this.state.mobileNo="";
  this.state.gender="";
  this.state.appointmentDate="";
  this.state.bookingDate="";
  this.state.appointmentTime=this.state.time;
  this.state.companyId="";
  serviceListArray=[];
  serviceTimeArray=[];
  this.state.employeeDetails="";
  this.state.saloonOption="";
  this.state.serviceOption="";
  this.state.employeeOption="";
  this.state.genderOption="";
  this.state.empAppointmentTime="";
  
  this.state.employeeOptions=[];
  this.state.serviceOptions=[];
  


  this.setState({
    customerName: this.state.customerName,
    mobileNo: this.state.mobileNo,
    gender:this.state.gender,
    appointmentDate: this.state.appointmentDate,
    bookingDate: this.state.currentDate,
    appointmentTime: this.state.appointmentTime,
    companyId: this.state.companyId,
    employeeDetails:this.state.employeeDetails,
    saloonOption:this.state.saloonOption,
    serviceOption:this.state.serviceOption,
    employeeOption:this.state.employeeOption,
    genderOption:this.state.genderOption,
    empAppointmentTime:this.state.empAppointmentTime,
    employeeArrayOptions:this.state.employeeArrayOptions,
    serviceOptions:this.state.serviceOptions,
  })

}

closeFunc(){

}

    render() {
        
   
      const label_style={
        paddingTop: "20px"
      }
      
      
          return (
            <div class="container">
           <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4">
              <ul class="previous disabled" id="backbutton"
                style={{
                  backgroundColor: "#05a4b5",color:"white",
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
              <div class="card-header">
                <h3>Book a Service-Customer</h3>   </div>

            </div>
          </div>
      
              <div class="row" style={{ backgroundColor: "" }}>
                <div class="col-xs-12 col-sm-4 col-lg-4 " style={label_style}>
                  <label class="control-label selectpicker" for="customerName">Contact No:</label>
                  <input
                    type="text"
                    id="mobileno"
                    name="mobileNo"
                    style={{ color: "black", marginBottom: "0px" }}
                    onChange={this.handleUserInputMobileNo}
                    value={this.state.mobileNo}
                    class="form-control"
                    autocomplete="off"
                    placeholder="Contact No" />
      
                </div>
                <div class="col-xs-12 col-sm-4 col-lg-4 " style={label_style}>
                  <label class="control-label selectpicker " for="customerName">Customer Name:</label>
                  <input
                    type="text"
                    id="customername"
                    name="customerName"
                    onChange={this.handleUserInput}
                    value={this.state.customerName}
                    style={{ color: "black", marginBottom: "0px" }}
                    class="form-control"
                    autocomplete="off"
                    placeholder="customer Name" />
      
                </div>
            
              </div>
      
              <div class="row" style={{ backgroundColor: "" }}>
                <div class="col-xs-12 col-sm-4 col-lg-4 " style={label_style}>
                  <label class="control-label selectpicker" for="customerName">Date Of Service Visit:</label>
                  <input onChange={this.handleUserInput} class="form-control"
                    id="appointmentdate" name="appointmentDate" placeholder="Date Of Visit" value={this.state.appointmentDate} required />
                </div>
                <div class="col-xs-12 col-sm-4 col-lg-4 " style={label_style}>
                  <label class="control-label selectpicker " for="customerName"> Time Of Service Visit:</label>
                  <input onClick={() => this.OpenTimeKeeper()} class="form-control"
                    id="appointmenttime" name="appointmentTime" placeholder="Visit Time" value={this.state.appointmentTime} readOnly />
      
                </div>
                <div class="col-xs-12 col-sm-4 col-lg-4 " style={label_style}>
                  <div id="timekeeperdiv"
                    style={{
                      position: "absolute",
                      display: "none",
                      zIndex: "10",
                       marginTop: "20px",
          }}>
                  <Timekeeper
                    onChange={(newTime) => this.keeperchangetime(newTime.formatted24)}
                    hour24Mode
                    //   coarseMinutes={15}
                    //  forceCoarseMinutes
                    switchToMinuteOnHourSelect
                    doneButton={(newTime) => (
                      <div
                        style={{ textAlign: 'center', padding: '10px 0' }}
                        onClick={() => this.CloseTimeKeeper()}
                      >
                        Done
                      </div>
                    )}
      
                  />
                </div>
              </div>
            </div>
      
      
            <div class="row" style={{ backgroundColor: "" }}>
              <div class="col-xs-12 col-sm-4 col-lg-4 " style={label_style}>
                <label class="control-label selectpicker" for="customerName"> Shop List:</label>
                <Select
                  id="selectedOption"
                  name="selectedOption"
                  isMulti={false}
                  options={this.state.saloonOptions}
                  onChange={this.handleChangeSelectedSaloonOption}
                  value={this.state.saloonOption}
                />
      
              </div>
              <div class="col-xs-12 col-sm-4 col-lg-4 " style={label_style}>
                <label class="control-label selectpicker " for="customerName"> Service:</label>
                <Select
                  id="selectedOption"
                  name="selectedOption"
                  isMulti={true}
                  options={this.state.serviceOptions}
                  onChange={this.handleChangeSelectedServiceOption}
                  value={this.state.serviceOption}
                />
      
              </div>
           
            {/*  <div class="col-xs-12 col-sm-4 col-lg-4 " style={label_style}>
                <label class="control-label selectpicker" id="quantity" for="customerName">Employee:</label>
                <Select
                  id="selectedOption"
                  name="selectedOption"
                  isMulti={false}
                  options={this.state.employeeOptions}
                  onChange={this.handleChangeSelectedEmployeeOption}
                  value={this.state.employeeOption}
                />
              </div>  */}
            </div>
            <div>
              <button type="button" onClick={() => this.MakeAppointmentFunc()} style={{ marginTop: " 2%" }} class="btn btn-default ">Book a Service</button>
      
            </div>
      
      
      
       
      </div >
      
      
          );
        }
      
      }
      export default CustomerAppointments