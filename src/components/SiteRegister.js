import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';

import LoginPage from './LoginPage';
import OTPSignUp from './OTPSignUp';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import moment from 'moment-timezone';
import SelectSearch from 'react-select';
import _ from 'underscore';
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
  GetCurrencies,SetCurrentPage } from './ConstSiteFunction';

  import * as BsIcons from 'react-icons/bs';
  import ReactTooltip from 'react-tooltip';
  
  import currencyFormatter from "currency-formatter";


const ct = require('countries-and-timezones');

var currencies;
var currencyArray = [];

class SiteRegister extends Component {


  constructor(props) {
    super(props)
    var proprietor;
    var date = moment()
      .add(2, 'd') //replace 2 with number of days you want to add
      .toDate();

    this.state = {

      date: date,
      emailId: '',
      contactNo: '',
      companyId: '',
      companyName: '',
      planName: '',
      permission: [],
      permissionHeader: [],
      doorNo: '',
      floor: '',
      street: '',
      city: '',
      area: '',
      zipCode: '',
      pincode: '',
      addressState: '',

      // attendanceoption:'',
      roleName: proprietor,
      timezone: '',
      currencyOptions: [],


      formErrors: {
        companyName: '',
        emailId: '',
        contactNo: '',


        //attendanceoption:'',
        planName: '',
        zipCode: '',
      },

      companyNameValid: false,
      emailIdValid: false,
      contactNoValid: false,

      planNameValid: false,
      zipCodeValid: false,



    }
    this.setState({
      roleName: proprietor,
      date: date,
    })

  }

  componentDidMount() {
    SetCurrentPage("SiteRegister");
    this.GetCountry();

    //CODE FOR CURRENCY DROPDOWN
    this.state.currencyOptions = [];

    currencies = currencyFormatter.currencies;
    console.log("currencies :", currencies);

    if (currencies.length != 0) {
      $.each(currencies, function (i, item) {
        currencyArray.push({ label: item.code + " - " + item.symbol, value: item.code });
      });
      this.state.currencyOptions = currencyArray;
    }

    this.setState({
      currencyOptions: this.state.currencyOptions,
    })


    var currentCurrencyFormatChosen = _.findWhere(currencies, { code: "ARS" });
    console.log("currentCurrencyFormatChosen DID MOUNT :", currentCurrencyFormatChosen);
    this.state.currencyCode = "ARS";
    this.state.currencyOption = { label: "ARS" + " - " + "$", value: "ARS" }
    this.SetCurrencyValue(currentCurrencyFormatChosen);


  }
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });

  }



  handleUserPackageInput = (e) => {

    const name = e.target.name;
    const value = e.target.value;
    if (value == "basic") {
      this.setState({

        planName: "basic",

        permission: "Jobcard,"
          + "SaleInvoice,"
          + "EstimateInvoice,CustomerPayment,"
          + "ProductService,Vendor,"
          + "PurchaseInvoice,Vehicle,"
          + "Customer,VehicleMakeandModel,AddExpense,AddEnquiry,AddBookService,"
          + "ServiceCalendar,ServiceConfirmation,"
          + "EmployeeDetails,AddRole,Salary,SalaryReport,"
          + "BankDetails,CheckInOut,ManualAttendance,Report,Reports,SalesReport,EstimateReport,"
          + "ExpenseReport,PurchaseReport,MessageCenterReport,ProfitandLossReport,"
          + "InventoryReport,AuditReport,BillDueReport,EnquiryReport,FeedBackReport,"
          + "PaymentHistoryReport,BookedServiceReports,"
          + "PaymentReceivablesReports,OfferMessages,Emails,Configuration,"
          + "TaskMapping,Location,CompanySetting,ImportQRcode,ImportLogo,ExportExcel,ImportExcel",
        permissionHeader: "JobCard,Inventory,CRM,Expense,Enquiry,BookService,ServiceCalendar,"
          + "ServiceConfirmation,Employee,Bank,Attendance,Reports,Communication,Configuration,TaskMapping",
      });
    }
    else if (value == "premium") {
      this.setState({
        planName: "premium",
        permission: "Jobcard,"
          + "SaleInvoice,"
          + "EstimateInvoice,CustomerPayment,"
          + "ProductService,Vendor,"
          + "PurchaseInvoice,Vehicle,"
          + "Customer,VehicleMakeandModel,AddExpense,AddEnquiry,AddBookService,"
          + "ServiceCalendar,ServiceConfirmation,"
          + "EmployeeDetails,AddRole,Salary,SalaryReport,"
          + "BankDetails,CheckInOut,ManualAttendance,Report,Reports,SalesReport,EstimateReport,"
          + "ExpenseReport,PurchaseReport,MessageCenterReport,ProfitandLossReport,"
          + "InventoryReport,AuditReport,BillDueReport,EnquiryReport,FeedBackReport,"
          + "PaymentHistoryReport,BookedServiceReports,"
          + "PaymentReceivablesReports,OfferMessages,Emails,Configuration,"
          + "TaskMapping,Location,CompanySetting,ImportQRcode,ImportLogo,ExportExcel,ImportExcel",
        permissionHeader: "JobCard,Inventory,CRM,Expense,Enquiry,BookService,ServiceCalendar,"
          + "ServiceConfirmation,Employee,Bank,Attendance,Reports,Communication,Configuration,TaskMapping",
      });
    }
    else {

      this.setState({
        planName: "elite",
        permission: "Jobcard,"
          + "SaleInvoice,"
          + "EstimateInvoice,CustomerPayment,"
          + "ProductService,Vendor,"
          + "PurchaseInvoice,Vehicle,"
          + "Customer,VehicleMakeandModel,AddExpense,AddEnquiry,AddBookService,"
          + "ServiceCalendar,ServiceConfirmation,"
          + "EmployeeDetails,AddRole,Salary,SalaryReport,"
          + "BankDetails,CheckInOut,ManualAttendance,Report,Reports,SalesReport,EstimateReport,"
          + "ExpenseReport,PurchaseReport,MessageCenterReport,ProfitandLossReport,"
          + "InventoryReport,AuditReport,BillDueReport,EnquiryReport,FeedBackReport,"
          + "PaymentHistoryReport,BookedServiceReports,"
          + "PaymentReceivablesReports,OfferMessages,Emails,Configuration,"
          + "TaskMapping,Location,CompanySetting,ImportQRcode,ImportLogo,ExportExcel,ImportExcel",
        permissionHeader: "JobCard,Inventory,CRM,Expense,Enquiry,BookService,ServiceCalendar,"
          + "ServiceConfirmation,Employee,Bank,Attendance,Reports,Communication,Configuration,TaskMapping",

      });
    }
    this.validateField(name, value);
  }



  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let companyNameValid = this.state.companyNameValid;
    let emailIdValid = this.state.emailIdValid;
    let contactNoValid = this.state.contactNoValid;

    //   let attendanceoptionValid=this.state.attendanceoptionValid;
    let planNameValid = this.state.planNameValid;
    let zipCodeValid = this.state.zipCodeValid;

    switch (fieldName) {
      case 'companyName':
        companyNameValid = value.length > 0;
        fieldValidationErrors.CompanyName = companyNameValid ? '' : ' is InCorrect';
        break;

      case 'emailId':
        emailIdValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.EmailId = emailIdValid ? '' : ' is InCorrect';
        break;

      case 'contactNo':


        contactNoValid = value.match(/^[0-9]{10}$/);
        fieldValidationErrors.ContactNo = contactNoValid ? '' : ' should be 10 digit number';
        break;

      // case 'attendanceoption':
      //         attendanceoptionValid =value.match(/^([\w.%+-]+)$/i);
      //         fieldValidationErrors.attendanceoption = attendanceoptionValid ? '' : ' is InCorrect';
      //         break;
      case 'planName':
        planNameValid = value.length >= 1;
        fieldValidationErrors.PlanName = planNameValid ? '' : ' is too short';
        break;

      case 'zipCode':
        zipCodeValid = value.match(/^[0-9]{6}$/);
        fieldValidationErrors.ZipCode = zipCodeValid ? '' : ' should be 6 digit number';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      companyNameValid: companyNameValid,
      emailIdValid: emailIdValid,
      contactNoValid: contactNoValid,
      //  attendanceoptionValid:attendanceoptionValid,


      planNameValid: planNameValid,
      zipCodeValid: zipCodeValid,

    }, this.validateForm);
  }

  validateForm() {

    this.setState({
      formValid:
        this.state.companyName
        && this.state.emailIdValid
        && this.state.contactNoValid
        // && this.state.attendanceoptionValid


        && this.state.planNameValid
    });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }

  EmptyValue() {
    this.state.emailId = '';
    this.state.contactNo = '';
    this.state.companyName = '';
    this.state.planName = '';
    //  this.state.attendanceoption='';
    this.state.emailIdValid = false;
    this.state.contactNoValid = false;
    this.state.companyNameValid = false;
    //  this.state.attendanceoptionValid = false;
    this.state.planNameValid = false;
    this.state.zipCodeValid = false;

    this.setState({
      emailId: '',
      contactNo: '',
      companyName: '',
      // attendanceoption:'',
      planName: '',
      emailIdValid: false,
      contactNoValid: false,
      companyNameValid: false,
      zipCodeValid: false,
      //   attendanceoptionValid: false,


    });
    this.validateForm();
  }

  SiteRegcistrationFun() {

    var key = "shinchanbaby";


    var companyZone = this.state.timeZone;
    var offset = moment.tz(moment.utc(), companyZone).utcOffset();
    var offsetValue = Number(offset) / 60; //CONVERTING MIN INTO HRS

    var todayDate = this.GetTimeZoneDate(offsetValue);



    var hostedZone = "Asia/Kolkata";
    //var hostedZone="ohio";
    var offset = moment.tz(moment.utc(), hostedZone).utcOffset();
    var offsetValue = Number(offset) / 60; //CONVERTING MIN INTO HRS

    var decDate = this.GetTimeZoneDate(offsetValue); // EX:2019-12-25

    // var decDateConstraint=decDate.split("-")[0]+"-"+"12"+"-"+"22";

    var hostedYear = decDate.split("-")[0];

    //new Date(year, month, date, hours, minutes, seconds, ms)
    var decDateConstraint = new Date(hostedYear, 11, 28, 23, 30, 0, 0);
    decDate = new Date(decDate);
    decDateConstraint = new Date(decDateConstraint);

    var startDate = new Date(todayDate);
    var endDate = new Date(decDate);




    if (decDate >= decDateConstraint) {
      // if( startDate >= endDate){
      this.state.holidayTableNextYear = "Yes";
      //   alert("YES CREATE TABLE FOR FUTURE");
      //   }
    } else {
      //  alert("DON'T CREATE TABLE FOR FUTURE");
    }

    	
    if(this.state.pincode==""){	
      this.state.pincode= '000000';	
    }
    if (this.state.zipCode == "" || !this.state.zipCodeValid) {
      this.state.zipCode = '000000';
    }

    this.setState({
      zipCode: this.state.zipCode,
    })


    localStorage.setItem('companyName', CryptoJS.AES.encrypt(this.state.companyName, key));
    localStorage.setItem('CurrencyCode', CryptoJS.AES.encrypt(this.state.currencyCode, key));
    localStorage.setItem('EmailId', CryptoJS.AES.encrypt(this.state.emailId, key));
    localStorage.setItem('contactNo', CryptoJS.AES.encrypt(this.state.contactNo, key));
    localStorage.setItem('Password', CryptoJS.AES.encrypt(this.state.password, key));
    //  localStorage.setItem('Address', CryptoJS.AES.encrypt(this.state.address, key));
    localStorage.setItem('planName', CryptoJS.AES.encrypt(this.state.planName, key));
    localStorage.setItem('permission', CryptoJS.AES.encrypt(this.state.permission, key));
    localStorage.setItem('permissionHeader', CryptoJS.AES.encrypt(this.state.permissionHeader, key));
    localStorage.setItem('DoorNo', CryptoJS.AES.encrypt(this.state.doorNo, key));
    localStorage.setItem('Floor', CryptoJS.AES.encrypt(this.state.floor, key));
    localStorage.setItem('Street', CryptoJS.AES.encrypt(this.state.street, key));
    localStorage.setItem('City', CryptoJS.AES.encrypt(this.state.city, key));
    localStorage.setItem('Area', CryptoJS.AES.encrypt(this.state.area, key));
    localStorage.setItem('Zipcode', CryptoJS.AES.encrypt(this.state.zipCode, key));
    localStorage.setItem('Pincode', CryptoJS.AES.encrypt(this.state.pincode, key));
    localStorage.setItem('State', CryptoJS.AES.encrypt(this.state.addressState, key));
    // localStorage.setItem('AttendanceOption', CryptoJS.AES.encrypt(this.state.attendanceoption, key));

    localStorage.setItem('Date', CryptoJS.AES.encrypt(todayDate, key));
    localStorage.setItem('TimeZone', CryptoJS.AES.encrypt(this.state.timeZone, key));
    localStorage.setItem('HolidayTableNextYear', CryptoJS.AES.encrypt(this.state.holidayTableNextYear, key));


    var self = this;



    if (this.state.timeZone != "" && this.state.timeZone != undefined && this.state.currencyCode!="") {



      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          companyName: this.state.companyName,
          emailId: this.state.emailId,
          password: this.state.password,
          contactNo: this.state.contactNo,
          roleName: this.state.roleName,
          doorNo: this.state.doorNo,
          floor: this.state.floor,
          street: this.state.street,
          city: this.state.city,
          area: this.state.area,
          zipCode: this.state.zipCode,
          state: this.state.addressState,// Address State is the state variable 
          currencyCode:this.state.currencyCode,
          //    attendanceoption:this.state.attendanceoption,
          //  holidayTableNextYear:this.state.holidayTableNextYear,
          //  timeZone:this.state.timeZone,
          //   date:todayDate,

        }),
        url: " http://15.206.129.105:8080/ThroughBooksCOAPI/SiteRegistration/RegisterSite",
        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {

          if (data.emailId == "EMAILID") {


            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: "The Email Id You Have Entered Is Already Registered For An Organization ",
              showConfirmButton: false,
              timer: 2000
            })
            self.state.companyName = self.state.companyName;

            self.state.emailId = self.state.emailId;
            self.state.password = self.state.password;
            self.state.contactNo = self.state.contactNo;
            self.state.roleName = self.state.roleName;
            self.state.doorNo = self.state.doorNo;
            self.state.floor = self.state.floor;
            self.state.street = self.state.street;
            self.state.city = self.state.city;
            self.state.area = self.state.area;
            self.state.pincode = self.state.pincode;
            self.state.zipCode = self.state.zipCode;
            self.state.addressState = self.state.addressState;
            self.state.timeZone = self.state.timeZone;
            self.state.planName = self.state.planName;

            self.setState({
              companyName: self.state.companyName,

              emailId: self.state.emailId,
              password: self.state.password,
              contactNo: self.state.contactNo,
              roleName: self.state.roleName,
              doorNo: self.state.doorNo,
              floor: self.state.floor,
              street: self.state.street,
              city: self.state.city,
              area: self.state.area,
              zipCode: self.state.zipCode,
              pincode: self.state.pincode,
              addressState: self.state.addressState,
              timeZone: self.state.timeZone,
              date: todayDate,
              region: self.state.selectedRegion,
              planName: self.state.planName
            });



          } else if (data.contactNo == "MOBILE") {


            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: "The Mobile No You Have Entered Is Already Registered For An Organization",               // Message dialog
              showConfirmButton: false,
              timer: 2000
            })


            self.state.companyName = self.state.companyName;

            self.state.emailId = self.state.emailId;
            self.state.password = self.state.password;
            self.state.contactNo = self.state.contactNo;
            self.state.roleName = self.state.roleName;
            self.state.doorNo = self.state.doorNo;
            self.state.floor = self.state.floor;
            self.state.street = self.state.street;
            self.state.city = self.state.city;
            self.state.area = self.state.area;
            self.state.zipCode = self.state.zipCode;
            self.state.pincode = self.state.pincode;
            self.state.addressState = self.state.addressState;
            self.state.timeZone = self.state.timeZone;
            self.state.planName = self.state.planName;

            self.setState({
              companyName: self.state.companyName,

              emailId: self.state.emailId,
              password: self.state.password,
              contactNo: self.state.contactNo,
              roleName: self.state.roleName,
              doorNo: self.state.doorNo,
              floor: self.state.floor,
              street: self.state.street,
              city: self.state.city,
              area: self.state.area,
              zipCode: self.state.zipCode,
              pincode:self.state.pincode,
              addressState: self.state.addressState,
              timeZone: self.state.timeZone,
              date: todayDate,
              region: self.state.selectedRegion,
              planName: self.state.planName
            });


          } else if (data.response != "Mailed_Otp") {


            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: "Error Occured While Mailing OTP , Kindly Try Registering Again ",               // Message dialog
              showConfirmButton: false,
              timer: 2000
            })
            ReactDOM.render(<LoginPage />, document.getElementById("root"));

          } else {


            Swal.fire({
              position: 'center',
              icon: 'success',
              title: "Mailed OTP To Your Registered EmailId",
              showConfirmButton: false,
              timer: 2000
            })

            //localStorage.setItem('otp1',data.otp);
            localStorage.setItem('OTP', CryptoJS.AES.encrypt(JSON.stringify(data.otp), key));
            ReactDOM.render(<OTPSignUp />, document.getElementById("root"));
          }

          self.state.timezone = "";



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
    } else {
      if(this.state.timeZone == "" || this.state.timeZone == undefined){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Kindly Select TimeZone',
          showConfirmButton: false,
          timer: 2000
        })
  }else if(this.state.currencyCode==""){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Kindly Select CurrencyCode for your Organization',
        showConfirmButton: false,
        timer: 2000
      })
  }

  }

}


  cancelFunc() {

    ReactDOM.render(<LoginPage />, document.getElementById("root"));
  }

  BackbtnFunc() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={LoginPage} />


        </div>
      </Router>,
      document.getElementById('root'));
    registerServiceWorker();
  }
  AttendanceFunc = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,

    }, () => { this.validateField(name, value) });


  }


  handleUserInputRegion = (e) => {

    var self = this;

    const value = e.value;
    this.setState({
      region: value,
      selectedRegion: e,
      valid: true,
      timeZone: '',
    },
    );

    const Timezones = ct.getTimezonesForCountry(value);
    var timeZoneOptions = [];
    for (var i = 0; i < Timezones.length; i++) {
      timeZoneOptions.push({
        label: Timezones[i].name,
        value: Timezones[i].name
      });
    }

    self.state.timeZoneOptions = timeZoneOptions;
    self.setState({
      timeZoneOptions: timeZoneOptions,
    })

  }

  handleUserInputTimeZone(e) {
    var self = this;

    const value = e.value;
    this.setState({
      timeZone: value,
      selectedTimeZone: e,
      valid: true,
    },
    );
  }

  GetCountry() {

    var self = this;

    const countries = ct.getAllCountries();

    var groupedData = _.groupBy(countries, "id");

    var partionedData = _.partition(groupedData, ",")[1];

    var options = [];
    var tabdata = "";
    for (var z = 0; z < _.size(partionedData); z++) {
      var partionedData1 = partionedData[z];
      options.push({
        label: partionedData1[0].name,
        value: partionedData1[0].id
      });
    }

    self.state.options = options;
    self.setState({
      options: options,
    })

  }

  GetTimeZoneDate(offset) {
    //  var offset = -8;
    var todayDate = new Date(new Date().getTime() + offset * 3600 * 1000).toUTCString().replace(/ GMT$/, "")


    var d1 = new Date(todayDate);
    var d2 = d1.getFullYear() + "-"
      + ('0' + (d1.getMonth() + 1)).slice(-2) + "-"
      + ('0' + d1.getDate()).slice(-2);


    return d2;

  }


   /*
  CODE FOR CURRENCY DROPDOWN
  */
 handleUserInputCurrency = (e) => {

  var self = this;

  console.log("E VALUE :", e);

  this.state.currencyOption = e;
  this.setState({
    currencyOption: this.state.currencyOption,
  })
  var currentCurrencyFormatChosen = _.findWhere(currencies, { code: e.value });
  console.log("currentCurrencyFormatChosen :", currentCurrencyFormatChosen);

  this.state.currencyCode = e.value;
  this.SetCurrencyValue(currentCurrencyFormatChosen);


}


SetCurrencyValue(currentCurrencyFormatChosen) {


  this.state.infoCurrencyInputVal = 10000;
  var infoC_ForamatterVal = currencyFormatter.format(this.state.infoCurrencyInputVal, { code: currentCurrencyFormatChosen.code });

  console.log("currencyFormatter", currencyFormatter, currentCurrencyFormatChosen.code, infoC_ForamatterVal)

  this.state.infoCurrencyInputVal = this.state.infoCurrencyInputVal
  this.state.infoCurrencyCode = currentCurrencyFormatChosen.code
  this.state.infoCurrencySymbol = currentCurrencyFormatChosen.symbol
  this.state.infoC_ForamatterVal = infoC_ForamatterVal

  this.setState({
    infoCurrencyInputVal: this.state.infoCurrencyInputVal,
    infoCurrencyCode: this.state.infoCurrencyCode,
    infoCurrencySymbol: this.state.infoCurrencySymbol,
    infoC_ForamatterVal: this.state.infoC_ForamatterVal,

  })

  console.log("SetCurrencyValue ...... this.state :",this.state);
}



  render() {

    const { country, region } = this.state;

    return (

      <div class="container" style={{ backgroundColor: "#f2f2f200", color: "black" }}>


        <div className="">
          <div className="">
            <BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
          </div>
          <div className="inv_HeaderCls">
            <h3>Company Registration Form </h3>
          </div>
        </div>
        <div class="card">
          <div>
            <div class="card-body">

              <div className="panel panel-default" >
                <FormErrors formErrors={this.state.formErrors} />
              </div>
              <form class="form-horizontal form-bordered" name="submissions">

                <div className={`form-group ${this.errorClass(this.state.formErrors.companyName)}`}>
                  <label class="control-label col-sm-2 font-weight-bold" for="companyName"> Company Name<span style={{ color: "red" }}>*</span></label>
                  <div class="col-sm-10">
                    <input type="text"

                      value={this.state.companyName}
                      class="form-control"
                      style={{ textTransform: "capitalize", color: "black" }}
                      onChange={this.handleUserInput}
                      id="companyName"
                      name="companyName"
                      placeholder="Company Name.."
                      required />
                  </div>
                </div>



                <div className={`form-group ${this.errorClass(this.state.formErrors.emailId)}`}>
                  <label class="control-label col-sm-2 font-weight-bold" for="emailId">Email Id <span style={{ color: "red" }}>*</span></label>
                  <div class="col-sm-10">

                    <input type="email"
                      value={this.state.emailId}
                      style={{ color: "black" }} class="form-control"
                      onChange={this.handleUserInput}
                      id="emailId"
                      name="emailId"
                      maxlength="50"
                      placeholder="Your EmailID.." required />

                  </div>
                </div>

                <div className={`form-group ${this.errorClass(this.state.formErrors.contactNo)}`}>
                  <label class="control-label col-sm-2 font-weight-bold" for="contactNo">Contact No<span style={{ color: "red" }}>*</span></label>
                  <div class="col-sm-10">

                    <input type="text"
                      style={{ color: "black" }}
                      value={this.state.contactNo}

                      onChange={this.handleUserInput} class="form-control"
                      id="contactNo"
                      name="contactNo"


                      placeholder="Your Mobile No.."
                      required />
                  </div>
                </div>
                {/* <div className={`form-group ${this.errorClass(this.state.formErrors.attendanceoption)}`}>             <label class="control-label col-sm-2 font-weight-bold" for="contactNo">Attendance<span style={{ color: "red" }}>*</span></label>
                    <div class="col-sm-10">      
                  
                  
                   <input type="radio" name="attendanceoption"    onChange={this.AttendanceFunc} value="1" id="yes" />Yes
                    <input type="radio" name="attendanceoption"    onChange={this.AttendanceFunc} value="0" id="no" /> No
               
                    </div>
              </div> */}
                <div class="row">
                  <div class="col-sm-2 col-md-2 col-lg-2">
                    <label class="control-label font-weight-bold pull-right" for="doorNo">Address</label>

                  </div>
                  <div class="col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      {/* <div className={`form-group ${this.errorClass(this.state.formErrors.doorNo)}`}> */}
                      <label class="control-label col-sm-3 font-weight-bold" for="doorNo">Door No</label>
                      <div class="col-sm-6">
                        <input type="text"
                          style={{ color: "black" }}
                          value={this.state.doorNo}
                          onChange={this.handleUserInput} class="form-control"
                          id="doorNo"
                          name="doorNo"
                          maxlength="10"
                          placeholder="Your doorNo.."
                          required />
                      </div>
                    </div>
                  </div>


                  <div class="col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      {/* <div className={`form-group ${this.errorClass(this.state.formErrors.floor)}`}> */}
                      <label class="control-label col-sm-3 font-weight-bold" for="floor">Floor No</label>
                      <div class="col-sm-6">

                        <input type="text"
                          style={{ color: "black" }}
                          value={this.state.floor}
                          onChange={this.handleUserInput} class="form-control"
                          id="floor"
                          name="floor"
                          maxlength="15"
                          placeholder="Your floor No.."
                          required />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-2 col-md-2 col-lg-2"></div>
                  <div class="col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      {/* <div className={`form-group ${this.errorClass(this.state.formErrors.street)}`}> */}
                      <label class="control-label col-sm-3 font-weight-bold" for="street">Street</label>
                      <div class="col-sm-6">

                        <input type="text"
                          style={{ color: "black" }}
                          value={this.state.street}
                          onChange={this.handleUserInput} class="form-control"
                          id="street"
                          name="street"
                          maxlength="25"
                          placeholder="Your Street.."
                          required />
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      {/* <div className={`form-group ${this.errorClass(this.state.formErrors.city)}`}> */}
                      <label class="control-label col-sm-3 font-weight-bold" for="city">City</label>
                      <div class="col-sm-6">

                        <input type="text"
                          style={{ color: "black" }}
                          value={this.state.city}
                          onChange={this.handleUserInput} class="form-control"
                          id="city"
                          name="city"
                          maxlength="15"
                          placeholder="Your City.."
                          required />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-2 col-md-2 col-lg-2"></div>
                  <div class="col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      {/* <div className={`form-group ${this.errorClass(this.state.formErrors.street)}`}> */}
                      <label class="control-label col-sm-3 font-weight-bold" for="area">Area</label>
                      <div class="col-sm-6">

                        <input type="text"
                          style={{ color: "black" }}
                          value={this.state.area}
                          onChange={this.handleUserInput} class="form-control"
                          id="area"
                          name="area"
                          maxlength="25"
                          placeholder="Your Area.."
                          required />
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      {/* <div className={`form-group ${this.errorClass(this.state.formErrors.street)}`}> */}
                      <label class="control-label col-sm-3 font-weight-bold" for="addressState">State</label>
                      <div class="col-sm-6">

                        <input type="text"
                          style={{ color: "black" }}
                          value={this.state.addressState}
                          onChange={this.handleUserInput} class="form-control"
                          id="addressState"
                          name="addressState"
                          maxlength="15"
                          placeholder="Your State.."
                          required />
                      </div>
                    </div>

                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-2 col-md-2 col-lg-2"></div>
                  <div class="col-sm-4 col-md-4 col-lg-4">

                    <div className={`form-group ${this.errorClass(this.state.formErrors.zipCode)}`}>
                      <label class="control-label col-sm-3 font-weight-bold" for="zipCode">Zipcode</label>
                      <div class="col-sm-6">

                        <input type="text"
                          style={{ color: "black" }}
                          value={this.state.zipCode}
                          onChange={this.handleUserInput} class="form-control"
                          id="zipCode"
                          name="zipCode"
                          maxlength="15"
                          placeholder="Your Zipcode.."
                          required />
                      </div>
                    </div>

                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-2 col-md-2 col-lg-2"></div>
                  <div class="col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      {/* <div className={`form-group ${this.errorClass(this.state.formErrors.street)}`}> */}
                      <label class="control-label col-sm-4 font-weight-bold" for="street">Region<span style={{ color: "red" }}>*</span></label>
                      <div class="col-sm-5">

                        <div >
                          <SelectSearch options={this.state.options}
                            value={this.state.selectedRegion}
                            onChange={(e) => this.handleUserInputRegion(e)}
                            name="region" placeholder="Select Region " />
                        </div>

                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      {/* <div className={`form-group ${this.errorClass(this.state.formErrors.city)}`}> */}
                      <label class="control-label col-sm-4 font-weight-bold" for="city">TimeZone<span style={{ color: "red" }}>*</span></label>
                      <div class="col-sm-5">

                        <div >
                          <SelectSearch options={this.state.timeZoneOptions}
                            value={this.state.selectedTimeZone}
                            onChange={(e) => this.handleUserInputTimeZone(e)}
                            name="timeZone" placeholder="Select TimeZone " />
                        </div>

                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      {/* <div className={`form-group ${this.errorClass(this.state.formErrors.city)}`}> */}
                      <label class="control-label col-sm-4 font-weight-bold" for="city">Currency<span style={{ color: "red" }}>*</span></label>
                      <BsIcons.BsInfoCircle id="currencyToolTip" data-tip data-for="currencyToolTip" />
                      <div class="col-sm-5">

                        <div >
                        <SelectSearch options={this.state.currencyOptions}
                        value={this.state.currencyOption}
                        onChange={(e) => this.handleUserInputCurrency(e)}
                        name="currency" placeholder="Select Currency " />
                        </div>
                        <ReactTooltip id="currencyToolTip" place="top" effect="solid">
                        <div className="currencyValCls info">
              <div className="currencyInfoDiv"><div className="currencyLbl"><label style={{color:'white'}}>Input Currency :</label>  </div>
              <div className="currencyInput"><input style={{color:'black',fontWeight:'600'}} value={this.state.infoCurrencyInputVal}></input></div>
              </div>
              <div className="currencyInfoDiv"><div className="currencyLbl"><label style={{color:'white'}} >Currency Code:</label>    </div>
              <div className="currencyInput"><input  style={{color:'black',fontWeight:'600'}}  value={this.state.infoCurrencyCode}></input></div>
              </div>
              <div className="currencyInfoDiv"><div className="currencyLbl"><label style={{color:'white'}}>Currency Symbol: </label> </div>
              <div className="currencyInput"><input  style={{color:'black',fontWeight:'600'}}  value={this.state.infoCurrencySymbol}></input></div>
              </div>
              <div className="currencyInfoDiv"><div className="currencyLbl"><label style={{color:'white'}}>Currency Format: </label> </div>
              <div className="currencyInput"><input style={{color:'black',fontWeight:'600'}}   value={this.state.infoC_ForamatterVal}></input></div>
              </div>
            </div>
                      </ReactTooltip>
                      </div>
                    </div>
                  </div>
                </div>







                <div class="form-group" className={`form-group ${this.errorClass(this.state.formErrors.planName)}`}>
                  <label class="control-label col-sm-2 font-weight-bold" for="planName">Plan<span style={{ color: "red" }}>*</span></label>
                  <div class="col-sm-10">
                    {/* <select name="planName"
                      id="planName" class="form-control"
                      onChange={this.handleUserPackageInput}
                      required>
                      <option value="" disabled selected hidden>Select your Plan</option>
                      <option value="master,saleorder,purchaseorder,expense,quotation,gst,admin,report,taskMapping">Basic</option>
                      <option value="master,saleorder,purchaseorder,expense,quotation,gst,admin,report,setting,taskMapping">Premium</option>
                      <option value="master,attendance,saleorder,purchaseorder,expense,quotation,employee,gst,admin,report,setting,taskMapping">Elite</option>

                    </select> */}

                    <select name="planName" class="form-control"
                      id="planName"
                      onChange={this.handleUserPackageInput}
                      required>
                      <option value="" disabled selected hidden>Select your Plan</option>
                      <option value="basic" id="basic">Basic</option>
                      <option value="premium" id="premium">Premium</option>
                      <option value="elite" id="elite" >Elite</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row" style={{ marginLeft: "2px" }}>
                    <div class="col-sm-offset-2 col-sm-10">
                      <button type="button" disabled={!this.state.formValid} onClick={() => this.SiteRegcistrationFun()} className="btn btn-primary" style={{ marginLeft: "20px", marginLeft: "auto", marginRight: "auto", marginBottom: "45px", marginTop: "20px", display: "inline-block" }}>Submit</button> <span></span>
                      <button type="button" onClick={() => this.cancelFunc()} className="btn btn-primary" style={{ marginLeft: "20px", marginLeft: "auto", marginRight: "auto", marginBottom: "45px", marginTop: "20px", display: "inline-block" }}>Cancel</button>
                    </div></div></div>
              </form>
            </div>
          </div>
        </div></div>
    );
  }

}


export default SiteRegister;
