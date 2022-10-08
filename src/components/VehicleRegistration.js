import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import VendorEntryForm from './VendorEntryForm';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { FormErrors } from './FormErrors';
import { confirmAlert } from 'react-confirm-alert'; // Import
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
  GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
import Case from 'case';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import CryptoJS from 'crypto-js';
import CustomerExcelImport from './CustomerExcelImport';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import CustomerEntryForm from './CustomerEntryForm';
import VehicleList1 from './VehicleList';
import VehicleRegistrationList from './VehicleRegistrationList';
import Select from 'react-select';
import SelectSearch from 'react-select';
var Multiselect = require('react-bootstrap-multiselect/dist/index.js');

var localIssuesArray = [];
var staffData = [];
var inputarray = [];
var saleRateArray = [];
var purchaseRateArray = [];
var testarray = [];
var customerarray = [];
var rougharray = [];
var tablecontentarray = [];
var advancebalance_calc;
var subtotal_cgst = 0;
var subtotal_sgst = 0;
var subtotal_igst = 0;
var vehicleRegistrationNoarray = [];
var vehicleMakearray = [];
var vehicleModelarray = [];
var vehicleFuelTypearray = [];
var vehiclearray = [];
class VehicleRegistration extends Component {
  constructor() {
    super()
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state = {
      vehicleRegistrationNo: '',
      customerName: '',
      contactNo: '',
      email: '',
      issues: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleFuelType: '',
      companyName: companyName,
      staffId: staffId,
      employeeName: employeeName,
      role: role,
      modalCustomerName: '',
      modalContactNo: '',
      modalVehicleRegistrationNo: '',
      modalVehicleMake: '',
      modalVehicleModel: '',
      modalVehicleFuelType: '',

      modalVehicleRegistrationNo1:'',
      modalVehicleMake1: '',
      modalVehicleModel1: '',
      modalVehicleFuelType1: '',
      formErrors: {
        modalCustomerName: '',
        modalContactNo: '',
        modalVehicleRegistrationNo: '',
        modalVehicleMake: '',
      modalVehicleModel: '',
      modalVehicleFuelType: '',
        modalVehicleRegistrationNo1:'',
        modalVehicleMake1: '',
        modalVehicleModel1: '',
        modalVehicleFuelType1: '',
        vehicleRegistrationNo: '',
        customerName: '',
        contactNo: '',
        email: '',
        issues: '',
        vehicleMake:'',
        vehicleModel:'',
        vehicleFuelType:'',
      },
      modalCustomerNameValid: false,
      modalContactNoValid: false,
      modalVehicleRegistrationNoValid: false,
      modalVehicleMakeValid: false,
      modalVehicleModelValid: false,
      modalVehicleFuelTypeValid: false,
      
      modalVehicleRegistrationNo1Valid:false,
      modalVehicleMake1Valid: false,
      modalVehicleModel1Valid: false,
      modalVehicleFuelType1Valid: false,
      vehicleRegistrationNoValid: false,
      customerNameValid: false,
      contactNoValid: false,
      emailValid: false,
      issuesValid: false,
      vehicleMakeValid:false,
      vehicleModelValid:false,
      vehicleFuelTypeValid:false,


    }
  }

  componentDidMount() {
    SetCurrentPage("VehicleRegistration");
    
    window.scrollTo(0, 0);

    this.GetData();
    this.SelectCustomer();

    vehicleRegistrationNoarray = [];
    vehicleMakearray=[];
    vehicleModelarray=[];
    vehicleFuelTypearray=[];
  }
  SelectCustomer() {


    var self = this;
    var customerName;
    customerarray = [];
    saleRateArray = [];
    vehiclearray=[];
    vehicleRegistrationNoarray = [];
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,

      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/saleorder/selectcustomer",


      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        var options1 = [];
        var options = [];
        var optionsBok = [];
        customerName += '<option value ="" disabled selected hidden >Select a customer</option>';
        $.each(data.selectcustomernamelist, function (i, item) {


          options1.push({ label: item.customerName + ' ' + item.contactNo, value: item.customerId });
          optionsBok.push({ label: item.bookingId, value: item.bookingId });

          

          // customerName += '<option value="' + item.customerId + '">' + item.customerName + '</option>'
          var content = JSON.stringify({
            customerName: item.customerName,
            orderNumber: item.orderNumber,
            customerId: item.customerId,
            contactNo: item.contactNo,
            address: item.address,
            gstNo: item.gstNo,
            email: item.email,
            companyName: item.companyName,
            serviceBy: item.serviceBy,
            bookingId: item.bookingId,
            vehicleRegistrationNo: item.vehicleRegistrationNo,
            vehicleMake:item.vehicleMake,
            vehicleModel:item.vehicleModel,
            vehicleFuelType:item.vehicleFuelType,
            issues: item.issues

          });



          customerarray.push(content);



        });

        // $("#customerName").append(customerName);
        self.state.options1 = options1;
        self.state.optionsBok = optionsBok;
        self.setState({
          options1: self.state.options1,
          optionsBok: self.state.optionsBok,
        })


  
        $.each(data.selectsaleproductlist, function (i, item) {

          var arr = item.producttype;
          var arr1 = item.producttype;




          //    options.push({ label: item.productName, value: item.productName });
          //   productName += '<option value="' + item.productName + '">' + item.productName + '</option>'
          var feed = JSON.stringify({
            productName: item.productName,
            rate: item.saleRate,
            description: item.description,
            cgsta: item.cgst,
            sgsta: item.sgst,
            igsta: item.igst,
            productType: item.productType,
            quantity: item.quantity,
            productId: item.productId,
            quantityLimit: item.quantityLimit


          });
          saleRateArray.push(feed);


        });



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
  handleCustomerDetails = (e) => {
    const name = e.name;
    const value = e.value;
    this.state.customerId = value;
this.state.selectedVehicleRegistrationNo="";

this.state.vehicleMake="";
this.state.vehicleModel="";


    rougharray.push(this.state.customerId);


    this.setState({
      [name]: value,
      selectedCustomerId: e,
      selectedCustomerName:e,
      customerIdValid: true
    });

    var self = this;
    var vehicleRegistrationNo;

    for (var k = 0; k < customerarray.length; k++) {
      var temp = JSON.parse(customerarray[k]);

      if (temp.customerId == this.state.customerId) {
   
        self.state.vehicleRegistrationNo = temp.vehicleRegistrationNo;
        self.state.customerName = temp.customerName;
        self.state.contactNo = temp.contactNo;
        self.state.email = temp.email;
        self.state.customerId=temp.customerId;
        // self.state.issues =temp.issues;
        self.state.bookingId = temp.bookingId;
        var options2 = [];
        self.state.vehicleRegistrationNo = temp.vehicleRegistrationNo;
        self.state.companyName1 = temp.companyName;
        self.state.address=temp.address;
        self.state.gstNo=temp.gstNo;
          console.log("vehicleRegistrationNo:",temp.vehicleRegistrationNo);
       
       if(temp.vehicleRegistrationNo == null)
       {

       }else{
        if (temp.vehicleRegistrationNo != "-" ) {
          vehicleRegistrationNoarray = temp.vehicleRegistrationNo.split(',');
        }}
        if(temp.vehicleMake == null)
       {

       }else{
        if (temp.vehicleMake != "-" ) {
          vehicleMakearray = temp.vehicleMake.split(',');
        }}
        if(temp.vehicleModel == null)
       {

       }else{
        if (temp.vehicleModel != "-" ) {
          vehicleModelarray = temp.vehicleModel.split(',');
        }}
        if(temp.vehicleFuelType == null)
       {

       }else{
        if (temp.vehicleFuelType != "-" ) {
          vehicleFuelTypearray = temp.vehicleFuelType.split(',');
        }}
        vehicleRegistrationNo += '<option value ="" disabled selected hidden >Select a Vehicle</option>';
        if (vehicleRegistrationNoarray.length != 0) {

         
            for (var i = 0; i < vehicleRegistrationNoarray.length; i++) {
              // for (var j = 0; j < vehicleMakearray.length; j+Number(vehicleRegistrationNoarray.length)) {
              //   for (var k = 0; k < vehicleModelarray.length; k+Number(vehicleRegistrationNoarray.length)) {
              //     for (var l = 0; l < vehicleFuelTypearray.length; l+Number(vehicleRegistrationNoarray.length)) {

              options2.push({ label: vehicleRegistrationNoarray[i], value: vehicleRegistrationNoarray[i] });
              var content = JSON.stringify({
               
                vehicleRegistrationNo:vehicleRegistrationNoarray[i],
                vehicleMake:vehicleMakearray[i],
                vehicleModel:vehicleModelarray[i],
                vehicleFuelType:vehicleFuelTypearray[i],
            
    
              });
     vehiclearray.push(content);
    
            }
          // }}}
          
          
          }
  
      
         
        self.state.options2 = options2;
       
        self.setState({
          options2: self.state.options2,
        
        })
       }
       
      }
    }




  
  handleVehicleDetails= (e) => {
    const name = e.name;
    const value = e.value;
    this.state.vehicleRegistrationNo = value;
    rougharray.push(this.state.vehicleRegistrationNo);
    this.setState({
      [name]: value,
      selectedVehicleRegistrationNo: e,
      vehicleRegistrationNoValid: true
    });  
    var self=this;
    for (var k = 0; k < vehiclearray.length; k++) {
      var temp = JSON.parse(vehiclearray[k]);

      if (temp.vehicleRegistrationNo == this.state.vehicleRegistrationNo) {
    
             self.state.vehicleRegistrationNo = temp.vehicleRegistrationNo;
     
        self.state.vehicleMake=temp.vehicleMake;
        self.state.vehicleModel=temp.vehicleModel;
        self.state.vehicleFuelType=temp.vehicleFuelType;
       console.log("vehicleRegistrationNo:",temp.vehicleRegistrationNo);
     
      
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

        console.log("datat", data);


        var issues = data.saleProductRetrievelist;
        localIssuesArray = [];

        var issuesValue = [];
        $.each(issues, function (i, item) {
          if (item.productType === "service" || item.productType === "general" || item.productType === "labour" ) {
            issuesValue.push({ label: item.productName, value: item.productName });
            localIssuesArray.push({ label: item.productName, value: item.productName });

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
        confirmAlert({
          title: 'No Internet',                        // Title dialog
          message: 'Network Connection Problem',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
        });


      },

    });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let vehicleRegistrationNoValid = this.state.vehicleRegistrationNoValid;
    let customerNameValid = this.state.customerNameValid;
    let contactNoValid = this.state.contactNoValid;
    let emailValid = this.state.emailValid;
    let issuesValid = this.state.issuesValid;
    let vehicleMakeValid=this.state.vehicleMakeValid;
    let vehicleModelValid=this.state.vehicleModelValid;
    let vehicleFuelTypeValid=this.state.vehicleFuelTypeValid;

    switch (fieldName) {

      case 'vehicleRegistrationNo':
        vehicleRegistrationNoValid = value.match(/^[a-zA-Z]([a-zA-Z0-9]|[- @\.#&!])*$/);
        fieldValidationErrors.vehicleRegistrationNo = vehicleRegistrationNoValid ? '' : ' is InCorrect';
        break;
      case 'customerName':
        customerNameValid = value.match(/^(\s?\.?[a-zA-Z]+)+$/);
        fieldValidationErrors.CustomerName = customerNameValid ? '' : ' is InCorrect';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.Email = emailValid ? '' : ' is InCorrect';
        break;
      case 'contactNo':
        contactNoValid = value.match(/^(\d{10})$/);
        fieldValidationErrors.ContactNo = contactNoValid ? '' : ' is InCorrect';
        break;
        case 'vehicleMake':
          vehicleMakeValid = value.length >= 1;
          fieldValidationErrors.vehicleMake = vehicleMakeValid ? '' : ' is InCorrect';
          break;

          case 'vehicleModel':
            vehicleModelValid = value.length >= 1;
            fieldValidationErrors.vehicleModel = vehicleModelValid ? '' : ' is InCorrect';
            break;

            case 'vehicleFuelType':
              vehicleFuelTypeValid = value.length >= 1;
              fieldValidationErrors.vehicleFuelType = vehicleFuelTypeValid ? '' : ' is InCorrect';
              break;

      case 'issues':
        if (value == "NO") {
          issuesValid = value.length < 0;
          fieldValidationErrors.issues = issuesValid ? '' : ' is InCorrect';
          break;
        } else {

          issuesValid = value.length >= 1;

          fieldValidationErrors.issues = issuesValid ? '' : ' is InCorrect';
          break;
        }


      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
   
 
      issuesValid: issuesValid,
      vehicleMakeValid:vehicleMakeValid,
      vehicleModelValid:vehicleModelValid,
      vehicleFuelTypeValid:vehicleFuelTypeValid,


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
  validateField1(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let modalCustomerNameValid = this.state.modalCustomerNameValid;
    let modalContactNoValid = this.state.modalContactNoValid;
    let modalVehicleRegistrationNoValid = this.state.modalVehicleRegistrationNoValid;
    let modalVehicleMakeValid=this.state.modalVehicleMakeValid;
    let modalVehicleModelValid=this.state.modalVehicleModelValid;
    let modalVehicleFuelTypeValid=this.state.modalVehicleFuelTypeValid;

    switch (fieldName) {
      case 'modalCustomerName':
        modalCustomerNameValid = value.match(/^([a-zA-Z]+)([a-zA-Z ])*$/);
        fieldValidationErrors.CustomerName = modalCustomerNameValid ? '' : ' is InCorrect';
        break;

      case 'modalContactNo':
        modalContactNoValid = value.match(/^[0-9]{8,10}$/);
        fieldValidationErrors.ContactNo = modalContactNoValid ? '' : ' is InCorrect';
        break;

      case 'modalVehicleRegistrationNo':
        modalVehicleRegistrationNoValid = value.match(/^[a-zA-Z]([a-zA-Z0-9]|[- @\.#&!])*$/);
        fieldValidationErrors.modalVehicleRegistrationNo = modalVehicleRegistrationNoValid ? '' : ' is InCorrect';
        break;

      
        case 'modalVehicleMake':
          modalVehicleMakeValid = value.length>=1;
          fieldValidationErrors.modalVehicleMake = modalVehicleMakeValid ? '' : ' is InCorrect';
          break;

        
      case 'modalVehicleModel':
        modalVehicleModelValid = value.length>=1;
        fieldValidationErrors.modalVehicleModel = modalVehicleModelValid ? '' : ' is InCorrect';
        break;


      
        case 'modalVehicleFuelType':
          modalVehicleFuelTypeValid =  value.length>=1;
          fieldValidationErrors.modalVehicleFuelType = modalVehicleFuelTypeValid ? '' : ' is InCorrect';
          break;

      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      modalCustomerNameValid: modalCustomerNameValid,
      modalContactNoValid: modalContactNoValid,
      modalVehicleRegistrationNoValid: modalVehicleRegistrationNoValid,
      modalVehicleMakeValid:modalVehicleMakeValid,
      modalVehicleModelValid:modalVehicleModelValid,
      modalVehicleFuelTypeValid:modalVehicleFuelTypeValid,

    }, this.validateForm1);
  }
  validateForm1() {

    this.setState({
      formValid1:
        this.state.modalCustomerNameValid
        && this.state.modalContactNoValid
        && this.state.modalVehicleRegistrationNoValid
        && this.state.modalVehicleMakeValid
        && this.state.modalVehicleModelValid
        && this.state.modalVehicleFuelType


    });
  }

  errorClass1(error) {
    return (error.length === 0 ? '' : 'has-error');
  }

  validateField2(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;

    let modalVehicleRegistrationNo1Valid = this.state.modalVehicleRegistrationNo1Valid;
    let modalVehicleMake1Valid=this.state.modalVehicleMake1Valid;
    let modalVehicleModel1Valid=this.state.modalVehicleModel1Valid;
    let modalVehicleFuelType1Valid=this.state.modalVehicleFuelType1Valid;
    switch (fieldName) {
   

      case 'modalVehicleRegistrationNo1':
        modalVehicleRegistrationNo1Valid = value.match(/^[a-zA-Z]([a-zA-Z0-9]|[- @\.#&!])*$/);
        fieldValidationErrors.modalVehicleRegistrationNo1 = modalVehicleRegistrationNo1Valid ? '' : ' is InCorrect';
        break;


        case 'modalVehicleMake1':
          modalVehicleMake1Valid =  value.length>=1;
          fieldValidationErrors.modalVehicleMake1 = modalVehicleMake1Valid ? '' : ' is InCorrect';
          break;

        
      case 'modalVehicleModel1':
        modalVehicleModel1Valid =  value.length>=1;
        fieldValidationErrors.modalVehicleModel1 = modalVehicleModel1Valid ? '' : ' is InCorrect';
        break;


      
        case 'modalVehicleFuelType1':
          modalVehicleFuelType1Valid =  value.length>=1;
          fieldValidationErrors.modalVehicleFuelType1 = modalVehicleFuelType1Valid ? '' : ' is InCorrect';
          break;

      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
  
      modalVehicleRegistrationNo1Valid: modalVehicleRegistrationNo1Valid,
      modalVehicleMake1Valid:modalVehicleMake1Valid,
      modalVehicleModel1Valid:modalVehicleModel1Valid,
      modalVehicleFuelType1Valid:modalVehicleFuelType1Valid,

    }, this.validateForm2);
  }
  validateForm2() {

    this.setState({
      formValid2:
       
        this.state.modalVehicleRegistrationNo1Valid &&
        this.state.modalVehicleMake1Valid &&
        this.state.modalVehicleModel1Valid &&
        this.state.modalVehicleFuelType1Valid


    });
  }

  errorClass2(error) {
    return (error.length === 0 ? '' : 'has-error');
  }
  VehicleRegistrationFunc() {
    var self = this;
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });

if(this.state.vehicleRegistrationNo.length>0){
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
      companyName: this.state.companyName,
      vehicleMake: this.state.vehicleMake,
      vehicleModel: this.state.vehicleModel,
      vehicleFuelType: this.state.vehicleFuelType,
      customerId:this.state.customerId,
      companyName1:this.state.companyName1,
      address:this.state.address,
      gstNo:this.state.gstNo,


    }),
    url: " http://15.206.129.105:8080/ThroughBooksCOAPI/master/vehicleregistration",
    contentType: "application/json",
    dataType: 'json',
    async: false,
    success: function (data, textStatus, jqXHR) {



      Swal.fire({
        position: 'center',
        icon: 'success',
        title: ' Your BookingId [' + data.bookingId + '] '
          + ' Has Been Created. ',
        timer: 2000
      })

      self.state.vehicleRegistrationNo = "";
      self.state.customerName = "";
      self.state.contactNo = "";
      self.state.email = "";
      self.state.issues = "";
      self.state.vehicleMake = "";
      self.state.vehicleModel = "";
      self.state.vehicleFuelType = "";
      self.state.issues = "";

      self.state.formValid = false;
      self.state.vehicleRegistrationNoValid = false;
      self.state.customerNameValid = false;
      self.state.contactNoValid = false;
      self.state.issuesValid = false;



      self.setState({
        vehicleRegistrationNo: '',
        customerName: '',
        contactNo: '',
        email: '',
        issues: '',
        vehicleMake: '',
        vehicleModel: '',
        vehicleFuelType: '',
        formValid: false,
        vehicleRegistrationNoValid: false,
        customerNameValid: false,
        contactNoValid: false,
        emailValid: false,
        issuesValid: false,



      });
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

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }
  handleUserInput1 = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value },
      () => { this.validateField1(name, value) });
  }
  handleUserInput2 = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value },
      () => { this.validateField2(name, value) });
  }


  handleChange = (e) => {
    // Display selected value for user
    var currentValue = e;
    if (currentValue == null) {
      currentValue = "NO";
    }
    // alert("CURRENT VALUE :"+currentValue);
    var name = "issues";
    this.state.selectedissues = e;

    this.setState({ selectedissues: this.state.selectedissues },
      () => { this.validateField(name, currentValue) });



    console.log("e-VALUE:" + e);
    // for our use getting value in array
    var issues = [];
    $.each(e, function (i, item) {
      issues.push(item.value);
    });
    this.state.issues = issues;
    console.log("issues", issues);

  }




  cancelFunc() {
    this.state.vehicleRegistrationNo = "";
    this.state.customerName = "";
    this.state.contactNo = "";
    this.state.email = "";
    this.state.issues = "";
    this.state.vehicleMake = "";
    this.state.vehicleModel = "";
    this.state.vehicleFuelType = "";
    this.state.formValid = false;
    this.state.vehicleRegistrationNoValid = false;
    this.state.customerNameValid = false;
    this.state.contactNoValid = false;
    this.state.emailValid = false;



    this.setState({
      vehicleRegistrationNo: this.state.vehicleRegistrationNo,
      customerName: this.state.customerName,
      contactNo: this.state.contactNo,
      email: this.state.email,
      issues: this.state.issues,
      vehicleMake: this.state.vehicleMake,
      vehicleModel: this.state.vehicleModel,
      vehicleFuelType: this.state.vehicleFuelType,
      formValid: false,
      vehicleRegistrationNoValid: false,
      customerNameValid: false,
      contactNoValid: false,
      emailValid: false,
      issuesValid: false,

    })
    ReactDOM.render(<VehicleRegistration />, document.getElementById("contentRender"));
  }

  AddCustomerFunc() {
    var self = this;
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });
    if (this.state.modalContactNo.trim().length > 2) {

      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          customerName: Case.capital(this.state.modalCustomerName),
          contactNo: this.state.modalContactNo,
          companyId: this.state.companyId,
          vehicleRegistrationNo: this.state.modalVehicleRegistrationNo,
          staffId: this.state.staffId,
          employeeName: this.state.employeeName,
          role: this.state.role,
          vehicleMake:this.state.modalVehicleMake,
          vehicleModel:this.state.modalVehicleModel,
          vehicleFuelType:this.state.modalVehicleFuelType,

        }),
        url: " http://15.206.129.105:8080/ThroughBooksCOAPI/master/addcustomer",

        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
          if (data.contactNo == "Mobile") {

            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'The Mobile Number is Already Exists',
              showConfirmButton: false,
              timer: 2000
            })



          }
          else {

            self.state.modalCustomerName = "";
            self.state.modalContactNo = "";
            self.state.modalVehicleRegistrationNo = "";
            self.state.modalVehicleMake = "";
            self.state.modalVehicleModel = "";
           // self.state.modalVehicleFuelType = "";
            self.state.formValid1 = false;
            self.state.customerName="";
        //    $('#modalVehicleFuelType').html('');
          //  $("#modalVehicleFuelType").html('');
            self.state.selectedCustomerId = "";
            self.state.selectedCustomerName="";
            self.setState({
              modalCustomerName: '',
              modalContactNo: '',
              modalVehicleRegistrationNo: '',
              formValid1: false,
              customerName:'',
              modalVehicleMake:'',
              modalVehicleModel:'',
            //  modalVehicleFuelType:'',
              selectedCustomerName:'',
            });


            ReactDOM.render(
              <Router >
                <div>
                  <Route path="/" component={VehicleRegistration} />
                </div>
              </Router>, document.getElementById('contentRender'));
            $('#customerName').html('');
            self.SelectCustomer();

          }



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

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Fill all the details',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }

  ClearCustomerFunc() {
    var self = this;
    self.state.modalCustomerName = "";
    self.state.modalContactNo = "";
    self.state.modalVehicleRegistrationNo="";

    self.setState({
      modalCustomerName: self.state.modalCustomerName,
      modalContactNo: self.state.modalContactNo,
      modalVehicleRegistrationNo:self.state.modalVehicleRegistrationNo,
    })

  }
  AddVehicleRegistrationNoFunc() {
    var self = this;
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });
 
   
    if (String(this.state.customerId)!="undefined") {

      $.ajax({
        type: 'POST',
        data: JSON.stringify({
         
          customerId: this.state.customerId,
          companyId: this.state.companyId,
          vehicleRegistrationNo: this.state.modalVehicleRegistrationNo1,
          vehicleMake:this.state.modalVehicleMake1,
          vehicleModel:this.state.modalVehicleModel1,
          vehicleFuelType:this.state.modalVehicleFuelType1,

        }),
        url: " http://15.206.129.105:8080/ThroughBooksCOAPI/master/updateVehicleRegistrationNo",

        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
          
         

         
            self.state.modalVehicleRegistrationNo1 = "";
            self.state.modalVehicleMake1="";
            self.state.modalVehicleModel1="";
            self.state.modalVehicleFuelType1="";
            self.state.formValid2 = false;
            self.state.options1 = "";
            self.state.contactNo="";
            self.state.selectedVehicleRegistrationNo="";
            self.state.selectedCustomerName="";
          self.state.customerName="";
          self.state.customerId="";
         self.state.vehicleMake="";
         self.state.vehicleModel="";
         self.state.vehicleFuelType="";

            self.setState({
              
              modalVehicleRegistrationNo1: '',
              modalVehicleMake1:'',
              modalVehicleModel1:'',
              modalVehicleFuelType1:'',
              selectedVehicleRegistrationNo:'',
              selectedCustomerName:'',
              selectedCustomerId:'',
              vehicleMake:'',
              vehicleModel:'',
              vehicleFuelType:'',


              formValid2: false,
            });
           
            self.SelectCustomer();

            ReactDOM.render(
              <Router >
                <div>
                  <Route path="/" component={VehicleRegistration} />
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
    } else {
      self.state.modalVehicleRegistrationNo1 = "";
      self.state.formValid2 = false;

      self.setState({
        
        modalVehicleRegistrationNo1: '',
        formValid2: false,
      });
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Select Customer',
        showConfirmButton: false,
        timer: 2000
      })
    }
  
  }

  ClearVehicleRegistrationNoFunc() {
    var self = this;
    self.state.modalVehicleRegistrationNo1 = "";
    

    self.setState({
      modalVehicleRegistrationNo1: self.state.modalVehicleRegistrationNo1,
   
    })

  }

  BackbtnFunc() {

    if (this.state.vehicleRegistrationNo.length == 0 && this.state.customerName.length == 0 &&
      this.state.contactNo.length == 0 && this.state.email.length == 0 &&
      this.state.issues.length == 0 && this.state.vehicleMake.length == 0 && this.state.vehicleModel.length == 0 && this.state.vehicleFuelType.length == 0) {

      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={VehicleRegistrationList} />
          </div>
        </Router>,
        document.getElementById('contentRender'));
      registerServiceWorker();
    }
    else {
      confirmAlert({
        title: "Confirmation", // Title dialog
        message: "Unsaved changes are there. Do you really want to go back?", // Message dialog
        buttons: [
          {
            label: 'Confirm',
            onClick: () => this.ConfirmBack()
          },
          {
            label: 'Cancel',
            onClick: () => this.CancelBack()
          }
        ]
      });
    }

  }
  ConfirmBack() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={VehicleRegistrationList} />


        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }
  CancelBack() {


  }
  closeFunc() {
    //alert("MODAL CLOSE");
    var self = this;

    self.state.modalCustomerNameValid = false;
    self.state.modalContactNoValid = false;
    self.state.modalCustomerName = "";
    self.state.modalContactNo = "";
    self.state.modalVehicleRegistrationNo="";
    self.state.modalVehicleRegistrationNo1="";
    self.state.modalVehicleRegistrationNoValid=false;
    self.state.modalVehicleRegistrationNo1Valid=false;

    self.setState({

      modalCustomerNameValid: self.state.modalCustomerNameValid,
      modalContactNoValid: self.state.modalContactNoValid,
      modalCustomerName: self.state.modalCustomerName,
      modalContactNo: self.state.modalContactNo,
      modalVehicleRegistrationNo:self.state.modalVehicleRegistrationNo,
      modalVehicleRegistrationNo1:self.state.modalVehicleRegistrationNo1,
      modalVehicleRegistrationNoValid:self.state.modalVehicleRegistrationNoValid,
      modalVehicleRegistrationNo1Valid:self.state.modalVehicleRegistrationNo1Valid,






    })



  }
  render() {
    return (

      <div class="container">

        <div class="card">
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
                <h3 >Vehicle Registration Form</h3>   </div>

            </div>



            <div className="panel panel-default" style={{ borderColor: "white", marginBottom: "1px" }}>
              <FormErrors formErrors={this.state.formErrors} />
            </div>

            <form class="form-horizontal form-bordered" name="submissions">
            <div className="form-group" >

                <label class="control-label selectpicker col-sm-2" for="customerName">Customer Name<span style={{ color: "red" }}>*</span></label>
                <div class="col-sm-10">
                <SelectSearch options={this.state.options1} value={this.state.selectedCustomerName}
                  onChange={(e) => this.handleCustomerDetails(e)} name="customerName" placeholder="Select Customer " />
                <a href="#myModal" data-toggle="modal" data-target="#myModal" >
                  <span
                    style={{
                      color: "blue",
                    }}> +Add Customer</span>
                </a>
                </div>
              </div>





<div className="form-group" >
                <label class="control-label col-sm-2" style={{ fontWeight: "bold" }} for="vehicleRegistrationNo">Vehicle RegistrationNo<span style={{ color: "red" }}>*</span></label>
                <div class="col-sm-10">
                {/* <input type="text" class="form-control" style={{ color: "black" }} id="vehicleRegistrationNo" name="vehicleRegistrationNo" value={this.state.vehicleRegistrationNo} onChange={this.handleUserInput} placeholder="Vehicle RegistrationNo" />
               */}
                 <SelectSearch options={this.state.options2} value={this.state.selectedVehicleRegistrationNo} id="vehicleRegistrationNo"
                  onChange={(e) => this.handleVehicleDetails(e)} name="vehicleRegistrationNo" placeholder="Select Vehicle " />
              
                <a href="#myModal1" data-toggle="modal" data-target="#myModal1" >
                  <span
                    style={{
                      color: "blue",
                    }}> +Add Vehicle</span>
                </a>
                </div>
              </div>

            
              <div className="form-group" >
                <label class="control-label col-sm-2" style={{ fontWeight: "bold" }} for="vehicleMake">Vehicle Make</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" style={{ color: "black" }} id="vehicleMake" name="vehicleMake" value={this.state.vehicleMake} onChange={this.handleUserInput} placeholder="Vehicle Make" />
                </div>
              </div>
              <div className="form-group ">
                <label class="control-label col-sm-2" style={{ fontWeight: "bold" }} for="vehicleModel">Vehicle Model</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" style={{ color: "black" }} id="vehicleModel" name="vehicleModel" value={this.state.vehicleModel} onChange={this.handleUserInput} placeholder="Vehicle Model" />
                </div>
              </div>
              <div className="form-group ">
                <label class="control-label col-sm-2" style={{ fontWeight: "bold" }} for="vehicleFuelType">FuelType</label>
                <div class="col-sm-10">
                   <input type="text" class="form-control" style={{ color: "black" }} id="vehicleFuelType" name="vehicleFuelType" value={this.state.vehicleFuelType} onChange={this.handleUserInput} placeholder="Vehicle FuelType" />
                  
                 
                  {/* <select name="vehicleFuelType" id="vehicleFuelType" onChange={this.handleUserInput} class="form-control">
                    <option selected="selected" disabled selected hidden value="--Select--">Select FuelType</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                  </select> */}
               
                </div>
              </div>

              <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>

<label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="email">Email ID</label>
<div class="col-sm-10">
  <input type="email" class="form-control" name="email" value={this.state.email} onChange={this.handleUserInput} id="email" placeholder="Email ID" />
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
                    <button style={{ fontWeight: "bold" }} type="button" disabled={!this.state.formValid} onClick={() => this.VehicleRegistrationFunc()} class="btn btn-default">Submit</button> <span></span>
                    <button style={{ fontWeight: "bold" }} type="button" onClick={() => this.cancelFunc()} class="btn btn-default">Clear</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div style={{ position: " ", zIndex: "0" }}>
          <div class="modal fade" id="myModal" data-backdrop="false"  >
            <div class="modal-dialog">

              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" style={{ align: "center", display: "contents" }}>Add Customer</h4>
                  <button type="button" class="close" style={{ color: "black" }}
                    onClick={() => this.closeFunc()} data-dismiss="modal">&times;</button>


                </div>
                <div id="mymodal" class="modal-body" >
                  <div class="form-body">
                    <div style={{ color: "red" }} className="panel panel-default">
                      <FormErrors style={{ color: "red" }} formErrors={this.state.formErrors} />
                    </div>

                    <form class="form-horizontal form-bordered" name="submissions">
                      <div className={`form-group ${this.errorClass1(this.state.formErrors.modalCustomerName)}`}>
                        <label class="control-label col-sm-5 font-weight-bold" for="modalCustomerName">CustomerName<span style={{ color: "red" }}>*</span></label>
                        <div class="col-sm-7">
                          <input type="text" class="form-control" id="modalCustomerName"
                            name="modalCustomerName" value={this.state.modalCustomerName}
                            onChange={this.handleUserInput1} placeholder="Customer Name" />
                        </div>
                      </div>

                      <div className={`form-group ${this.errorClass1(this.state.formErrors.modalContactNo)}`}>
                        <label style={{ fontWeight: "bold" }} class="control-label col-sm-5" for="contactNo"> Contact no<span style={{ color: "red" }}>*</span></label>

                        <div class="col-sm-7">
                          <input type="number" min="1" maxLength="10" class="form-control"
                            name="modalContactNo"
                            value={this.state.modalContactNo} onChange={this.handleUserInput1}
                            id="modalContactNo" placeholder="Contact no" />
                        </div>
                      </div>
                      <div className={`form-group ${this.errorClass1(this.state.formErrors.modalVehicleRegistrationNo)}`}>
                        <label class="control-label col-sm-5" style={{ fontWeight: "bold" }} for="modalVehicleRegistrationNo">Vehicle No<span style={{ color: "red" }}>*</span></label>
                        <div class="col-sm-7">
                          <input type="text" class="form-control"  id="modalVehicleRegistrationNo" name="modalVehicleRegistrationNo" value={this.state.modalVehicleRegistrationNo} onChange={this.handleUserInput1} placeholder="Vehicle No" />
                        </div>
                      </div>
                      <div className={`form-group ${this.errorClass1(this.state.formErrors.modalVehicleMake)}`}>
                <label class="control-label col-sm-5" style={{ fontWeight: "bold" }} for="modalVehicleMake">Vehicle Make<span style={{ color: "red" }}>*</span></label>
                <div class="col-sm-7">
                  <input type="text" class="form-control" style={{ color: "black" }} id="modalVehicleMake" name="modalVehicleMake" value={this.state.modalVehicleMake} onChange={this.handleUserInput1} placeholder="Vehicle Make" />
                </div>
              </div>
              <div className={`form-group ${this.errorClass1(this.state.formErrors.modalVehicleModel)}`}>
                <label class="control-label col-sm-5" style={{ fontWeight: "bold" }} for="modalVehicleModel">Vehicle Model<span style={{ color: "red" }}>*</span></label>
                <div class="col-sm-7">
                  <input type="text" class="form-control" style={{ color: "black" }} id="modalVehicleModel" name="modalVehicleModel" value={this.state.modalVehicleModel} onChange={this.handleUserInput1} placeholder="Vehicle Model" />
                </div>
              </div>
              <div className={`form-group ${this.errorClass1(this.state.formErrors.modalVehicleFuelType)}`}>
                <label class="control-label col-sm-5" style={{ fontWeight: "bold" }} for="modalVehicleFuelType">FuelType<span style={{ color: "red" }}>*</span></label>
                <div class="col-sm-7">
                  {/* <input type="text" class="form-control" style={{ color: "black" }} id="modalVehicleFuelType" name="modalVehicleFuelType" value={this.state.modalVehicleFuelType} onChange={this.handleUserInput1} placeholder="FuelType" />
              */}
                  <select name="modalVehicleFuelType" id="modalVehicleFuelType" onChange={this.handleUserInput1} class="form-control">
                    <option selected="selected" disabled selected hidden value="--Select--">Select FuelType</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                  </select>
             
                </div>
              </div>
                      <div class="modal-footer">
                        <div class="form-group">
                          <div class="row" style={{ marginLeft: "2px" }}>
                            <div class="col-sm-offset-4 col-sm-8">
                              <button style={{ fontWeight: "bold" }} type="button"
                                disabled={!this.state.formValid1} onClick={() => this.AddCustomerFunc()}
                                data-dismiss="modal" class="btn btn-primary">Submit</button> <span></span>

                              <button style={{ fontWeight: "bold" }} type="button"
                                onClick={() => this.ClearCustomerFunc()}
                                class="btn btn-primary">Clear</button>
                            </div>
                          </div>
                        </div></div>
                    </form>

                  </div>


                </div>
              </div>

            </div>

          </div>

        </div>

        <div style={{ position: " ", zIndex: "0" }}>
          <div class="modal fade" id="myModal1" data-backdrop="false"  >
            <div class="modal-dialog">

              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" style={{ align: "center", display: "contents" }}>Add Vehicle</h4>
                  <button type="button" class="close" style={{ color: "black" }}
                    onClick={() => this.closeFunc()} data-dismiss="modal">&times;</button>


                </div>
                <div id="mymodal" class="modal-body" >
                  <div class="form-body">
                    <div style={{ color: "red" }} className="panel panel-default">
                      <FormErrors style={{ color: "red" }} formErrors={this.state.formErrors} />
                    </div>

                    <form class="form-horizontal form-bordered" name="submissions">
                    
                      <div className={`form-group ${this.errorClass2(this.state.formErrors.modalVehicleRegistrationNo1)}`}>
                        <label class="control-label col-sm-5" style={{ fontWeight: "bold" }} for="modalVehicleRegistrationNo1">Vehicle RegistrationNo<span style={{ color: "red" }}>*</span></label>
                        <div class="col-sm-7">
                          <input type="text" class="form-control" style={{ color: "black" }} id="modalVehicleRegistrationNo1" name="modalVehicleRegistrationNo1" value={this.state.modalVehicleRegistrationNo1} onChange={this.handleUserInput2} placeholder="Vehicle RegistrationNo" />
                        </div>
                      </div>

                      <div className={`form-group ${this.errorClass2(this.state.formErrors.modalVehicleMake1)}`}>
                <label class="control-label col-sm-5" style={{ fontWeight: "bold" }} for="modalVehicleMake1">Vehicle Make<span style={{ color: "red" }}>*</span></label>
                <div class="col-sm-7">
                  <input type="text" class="form-control" style={{ color: "black" }} id="modalVehicleMake1" name="modalVehicleMake1" value={this.state.modalVehicleMake1} onChange={this.handleUserInput2} placeholder="Vehicle Make" />
                </div>
              </div>
              <div className={`form-group ${this.errorClass2(this.state.formErrors.modalVehicleModel1)}`}>
                <label class="control-label col-sm-5" style={{ fontWeight: "bold" }} for="modalVehicleModel1">Vehicle Model<span style={{ color: "red" }}>*</span></label>
                <div class="col-sm-7">
                  <input type="text" class="form-control" style={{ color: "black" }} id="modalVehicleModel1" name="modalVehicleModel1" value={this.state.modalVehicleModel1} onChange={this.handleUserInput2} placeholder="Vehicle Model" />
                </div>
              </div>
              <div className={`form-group ${this.errorClass2(this.state.formErrors.modalVehicleFuelType1)}`}>
                <label class="control-label col-sm-5" style={{ fontWeight: "bold" }} for="modalVehicleFuelType1">FuelType<span style={{ color: "red" }}>*</span></label>
                <div class="col-sm-7">
                  {/* <input type="text" class="form-control" style={{ color: "black" }} id="modalVehicleFuelType1" name="modalVehicleFuelType1" value={this.state.modalVehicleFuelType1} onChange={this.handleUserInput2} placeholder="FuelType" />
              */}
                  <select name="modalVehicleFuelType1" id="modalVehicleFuelType1" onChange={this.handleUserInput2} class="form-control">
                    <option selected="selected" disabled selected hidden value="--Select--">Select FuelType</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                  </select>
                </div>
              </div>
                      <div class="modal-footer">
                        <div class="form-group">
                          <div class="row" style={{ marginLeft: "2px" }}>
                            <div class="col-sm-offset-4 col-sm-8">
                              <button style={{ fontWeight: "bold" }} type="button"
                                disabled={!this.state.formValid2} onClick={() => this.AddVehicleRegistrationNoFunc()}
                                data-dismiss="modal" class="btn btn-primary">Submit</button> <span></span>

                              <button style={{ fontWeight: "bold" }} type="button"
                                onClick={() => this.ClearVehicleRegistrationNoFunc()}
                                class="btn btn-primary">Clear</button>
                            </div>
                          </div>
                        </div></div>
                    </form>

                  </div>


                </div>
              </div>

            </div>

          </div>

        </div>


      
      
      
      </div>

    );
  }
}

export default VehicleRegistration;