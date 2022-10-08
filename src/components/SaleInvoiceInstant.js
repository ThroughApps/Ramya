import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import $ from 'jquery';
import Case from "case";

import { FormErrors } from './FormErrors';
//import datepicker from 'jquery-ui/ui/widgets/datepicker';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
//css

import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
//import './datepicker.css';
import CryptoJS from 'crypto-js';
import InvoiceList from './InvoiceList';
import SelectSearch from 'react-select';
import { thisExpression } from '@babel/types';
import _ from 'underscore';
//import toast from 'siiimple-toast';
//import 'siiimple-toast/dist/style.css';// style required
import Notifications, { notify } from 'react-notify-toast';
import { ToastsContainer, ToastsStore } from 'react-toasts';

import toaster from "toasted-notes";
import "toasted-notes/src/styles.css"; // optional styles
import Select from 'react-select';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import moment from 'moment';
import ServiceRegistration from './ServiceRegistration/ServiceRegistration';
import Checkbox from '@material-ui/core/Checkbox';
import VehicleRegistrationList from './VehicleRegistrationList';
import SaleOrder1 from './SaleOrder';
//import { GetEmployeeSite,GetCurrentSite  } from './ConstSiteFunction';

import {Double_BackButtonComponent} from './ServiceRegistration/ButtonComponent';
import { LastLocationProvider } from 'react-router-last-location';
 import convert_to_words from '@amirsanni/number-to-words';
 import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
  GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
var numberToWord = require('npm-number-to-word');


var customerVehicleArray=[];
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

var bookingarray = [];
var issuesarray = [];
var vehicleRegistrationNoarray = [];
var vehicleMakearray = [];
var vehicleModelarray = [];
var vehicleFuelTypearray = [];
var bookingIdarray = [];
var vehiclearray = [];
//const numToWords = require('num-to-words');
var count=0;
var currentItemQuantity;
var currentItemLimitQuantity;

var customerArrayNewFormat=[];

var  bookingDetailsArray=[];
var  productArray=[];
var options = [];
var cartLength=0;
var staffNameOption="";
class SaleInvoiceInstant extends Component {

  getInitialState() {
    return { height: '' }
  }
  constructor(props) {
    super(props)
    this.show = notify.createShowQueue();
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    // this.state.companyId = companyId;

    this.state = {
      date: date,
      customerName:this.props.customerName,
customerId:this.props.customerId,
vehicleRegistrationNo:this.props.vehicleRegistrationNo,
bookingId: this.props.bookingId,
contactNo: this.props.contactNo,
      modalproductName: '',
      modalproductCategory: '',
      modalproductType: '',
      modalquantity: 0,
      modalquantityLimit: 0,
      modalcgst: 0,
      modalsgst: 0,
      modaligst: 0,
      modalhsnCode: '',
      modalpurchaseRate: '',
      modalsaleRate: '',
      modaldescription: '',
      advisor:'',
      staffId: staffId,
      employeeName: employeeName,
      role: role,
     
      totalVisit: '',
      // invoiceNo: '',
      discountAmount:0,
      discountPercentage:0,
      prefinalAmount:0,
      orderNumber: '',
     
      invoiceDate: date,
      dueDate: date,
      productName: '',
 
      


      email: '',
      issues: '',
      description: '',
      sms: '',
      emailoption: '',
      rate: '',

      quantity: '1',
      total: '',
      cgsta: '',
      sgsta: '',
      igsta: '',
      companyId: companyId,
      finalAmount: '',
      totalqty: '',
      TotalWithoutGST: 0,
      subtotal1: 0,
      totalitemqty: 0,
      totalgst: 0,
      balance_amount: '',
      advance: 0,
      discount: 0,
      balance: '',
  
      options: [],
      saleSale: '',
      purchaseSale: '',
      paymentoptions: [],
      payment_status: 'UnPaid',
      paymentMode: '',
      staffName: '',
      formErrors: {
 
        modalproductName: '',
        modalproductType: '',
        modalproductCategory: '',
        modalpurchaseRate: '',
        modalsaleRate: '',
       

      },

      modalpurchaseRateValid: false,
      modalsaleRateValid: false,
      modalproductNameValid: false,
      modalproductTypeValid: false,
      modalproductCategoryValid: false,

      fromAddress:'',
      toAddress:'',
      remark:'',
      dealer:'',

    }
    this.setState({
      date: date,
      //    companyId: companyId,
      customerId:this.props.customerId,
      customerName:this.state.customerName,
      vehicleRegistrationNo:this.state.vehicleRegistrationNo,
      bookingId:this.props.bookingId

    })

  }

  validateField1(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;

    let modalproductNameValid = this.state.modalproductNameValid;
    let modalpurchaseRateValid = this.state.modalpurchaseRateValid;
    let modalsaleRateValid = this.state.modalsaleRateValid;
    let modalproductTypeValid = this.state.modalproductTypeValid;
    let modalproductCategoryValid = this.state.modalproductCategoryValid;

    switch (fieldName) {

      case 'modalproductName':
        modalproductNameValid = value.length >= 2;
        fieldValidationErrors.ProductName = modalproductNameValid ? '' : ' is InCorrect';
        break;

      case 'modalsaleRate':
        modalsaleRateValid = value.length >= 1;
        fieldValidationErrors.SaleRate = modalsaleRateValid ? '' : ' is InCorrect';
        break;
      case 'modalpurchaseRate':
        modalpurchaseRateValid = value.length >= 1;
        fieldValidationErrors.PurchaseRate = modalpurchaseRateValid ? '' : ' is InCorrect';
        break;

      case 'modalproductType':
        modalproductTypeValid = value.length >= 1;
        fieldValidationErrors.ProductType = modalproductTypeValid ? '' : ' is not selected';
        break;


      case 'modalproductCategory':
        modalproductCategoryValid = value.length >= 1;
        fieldValidationErrors.ProductCategory = modalproductCategoryValid ? '' : ' is not selected';
        break;

      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,

      modalproductNameValid: modalproductNameValid,
      modalsaleRateValid: modalsaleRateValid,
      modalpurchaseRateValid: modalpurchaseRateValid,
      modalproductCategoryValid: modalproductCategoryValid,
      modalproductTypeValid: modalproductTypeValid,

    }, this.validateForm1);
  }
  validateForm1() {

    this.setState({
      formValid1:
        this.state.modalproductNameValid
        && this.state.modalsaleRateValid
        && this.state.modalpurchaseRateValid
        && this.state.modalproductCategoryValid
        && this.state.modalproductTypeValid
    });
  }
  errorClass1(error) {
    return (error.length === 0 ? '' : 'has-error');
  }
  handleUserInputProduct = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value },
      () => { this.validateField1(name, value) });
  }
  handleUserInputProductType = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.state.modalquantity = 0;
    this.state.modalquantityLimit = 0;


    if (value == "service" || value == "general" || value == "labour") {
      this.state.modalpurchaseRateValid = true;
      this.state.modalproductCategoryValid = true;
      $("#quantity2").hide();
      $("#quantityLimit2").hide();
      $("#productCategory1").hide();
    
      this.state.modalproductCategory = "-";
      $("#purchaseRate1").hide();
      this.state.modalpurchaseRate = "-";
      this.setState({
        modalproductCategory: this.state.modalproductCategory,
        modalpurchaseRate: this.state.modalpurchaseRate,
      })
   
    }
    else if (value == "product" && this.state.modalproductCategory == "Purchase") {
      this.state.modalpurchaseRateValid = false;
   this.state.modalproductCategoryValid = false;
   $("#productCategory1").show();
   $("#serviceminimumtime").hide();
   this.state.modalproductCategory = "";
   $("#purchaseRate1").show();
   this.state.modalpurchaseRate = "";
      $("#quantity2").hide();
      $("#quantityLimit2").show();
    }
    else if (value == "product" && this.state.modalproductCategory == "Own") {
      this.state.modalpurchaseRateValid = false;
      this.state.modalproductCategoryValid = false;
      $("#productCategory1").show();
      $("#serviceminimumtime").hide();
      this.state.modalproductCategory = "";
      $("#purchaseRate1").show();
      this.state.modalpurchaseRate = "";
      $("#quantity2").show();
      $("#quantityLimit2").show();
    }
    else if (value == "product") {
      this.state.modalproductCategory = "";
      this.state.modalpurchaseRateValid = false;
      this.state.modalproductCategoryValid = false;
     $("#modalproductCategory").val('');
      $("#quantity2").show();
      $("#quantityLimit2").show();
      $("#productCategory1").show();
      $("#serviceminimumtime").hide();


      this.state.modalproductCategory = "";
      $("#purchaseRate1").show();
      this.state.modalpurchaseRate = "";
    }

    this.setState({ [name]: value },
      () => { this.validateField1(name, value) });



  }

  handleUserInputProductCategory = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.state.modalquantity = 0;
    this.state.modalquantityLimit = 0;

    if (this.state.modalproductType == "service" || this.state.modalproductType == "general" || this.state.modalproductType == "labour") {
      $("#quantity2").hide();
      $("#quantityLimit2").hide();
      $("#productCategory1").hide();
   $("#purchaseRate1").hide();
   this.state.modalproductCategory = "-";
   this.state.modalpurchaseRate = "-";
   this.state.modalpurchaseRateValid = true;
   this.state.modalproductCategoryValid = true;
   this.setState({
    modalproductCategory: this.state.modalproductCategory,
    modalpurchaseRate: this.state.modalpurchaseRate,
   })

    }
    else if (this.state.modalproductType == "product" && value == "Purchase") {
      this.state.modalpurchaseRateValid = false;
   this.state.modalproductCategoryValid = false;
   $("#productCategory1").show();
   $("#serviceminimumtime").hide();
   this.state.modalproductCategory = "";
   $("#purchaseRate1").show();
   this.state.modalpurchaseRate = "";
      $("#quantity2").hide();
      $("#quantityLimit2").show();
     
    }
    else if (this.state.modalproductType == "product" && value == "Own") {
      this.state.modalpurchaseRateValid = false;
      this.state.modalproductCategoryValid = false;
      $("#productCategory1").show();
      $("#serviceminimumtime").hide();
      this.state.modalproductCategory = "";
      $("#purchaseRate1").show();
      this.state.modalpurchaseRate = "";
      $("#quantity2").show();
      $("#quantityLimit2").show();
    }
    else if (this.state.modalproductType == "product") {
      this.state.modalpurchaseRateValid = false;
      this.state.modalproductCategoryValid = false;
      $("#modalproductCategory").val('');
      $("#quantity2").show();
      $("#quantityLimit2").show();
      $("#productCategory1").show();
      $("#serviceminimumtime").hide();

      this.state.modalproductCategory = "";
      $("#purchaseRate1").show();
      this.state.modalpurchaseRate = "";
      
    }

    this.setState({ [name]: value },
      () => { this.validateField1(name, value) });



  }

  AddProductFunc() {
    var self = this;
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });

    if (self.state.modalproductCategory == "Purchase") {
      self.state.modalquantity = 0;
    }

    var errorData = "No";
    if (this.state.modalproductType == "service" || this.state.modalproductType == "general" || this.state.modalproductType == "labour") {
      self.state.modalproductCategory = "Own";
      self.state.modalpurchaseRate = 0;
      self.setState({
        modalproductCategory: self.state.modalproductCategory,
        modalpurchaseRate: self.state.modalpurchaseRate,
      })
    }
    else if (this.state.modalproductType == "product" && this.state.modalproductCategory == "Purchase") {

      if (this.state.modalquantityLimit == '') {
        errorData = "Yes";
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Kindly Add Quantity Limit',
          showConfirmButton: false,
          timer: 2000
        })
      }

    }
    else if (this.state.modalproductType == "product" && this.state.modalproductCategory == "Own") {



      if (Number(this.state.modalquantity) == 0 || this.state.modalquantityLimit == '') {
        errorData = "Yes";

        if (Number(this.state.modalquantity) == 0) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Kindly Add Quantity',
            showConfirmButton: false,
            timer: 2000
          })
        } else if (this.state.modalquantityLimit == '') {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Kindly Add Quantity Limit',
            showConfirmButton: false,
            timer: 2000
          })
        }
      }

    }






    if (errorData == "No") {
      if (this.state.modalproductName.trim().length > 0) {
       
        $.ajax({
          type: 'POST',
          data: JSON.stringify({
            productName: Case.capital(this.state.modalproductName),
            productType: this.state.modalproductType,
            productCategory: this.state.modalproductCategory,
            quantity: this.state.modalquantity,
            quantityLimit: this.state.modalquantityLimit,
            cgst: this.state.modalcgst,
            sgst: this.state.modalsgst,
            igst: this.state.modaligst,
            hsnCode: this.state.modalhsnCode,
            description: this.state.modaldescription,
            companyId: this.state.companyId,
            saleRate: (Math.round(this.state.modalsaleRate * 100) / 100).toFixed(2),
            purchaseRate: (Math.round(this.state.modalpurchaseRate * 100) / 100).toFixed(2),
            staffId: this.state.staffId,
            employeeName: this.state.employeeName,
            role: this.state.role,
            site:GetCurrentSite()
          }),
         url: " http://15.206.129.105:8080/ThroughBooksCOAPI/master/addproduct",
          contentType: "application/json",
          dataType: 'json',
          async: false,
          success: function (data, textStatus, jqXHR) {
            if (data.productName == "ProductName") {

              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'The product name is Already Exists',
                showConfirmButton: false,
                timer: 2000
              })

            }
            else {

              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Successfully Added Product ',
                showConfirmButton: false,
                timer: 2000
              })
            
      
              self.SelectProductB4Customer();
              self.selectProduct();
            //  $('#myModal1').modal('hide');
              self.state.modalproductName = "";
              self.state.modaldescription = "";
              self.state.modalhsnCode = "";
              self.state.modalsaleRate = "";
              self.state.modalpurchaseRate = "";
              self.state.modalquantity = 0;
              self.state.modalquantityLimit = "";
              self.state.modalcgst = 0;
              self.state.modalsgst = 0;
              self.state.modaligst = 0;
              self.state.formValid1 = false;
              self.state.modalproductNameValid = false;

              self.state.modalquantityLimitValid = false;
              self.state.modalsaleRateValid = false;
              self.state.modalproductTypeValid = false;
              self.state.modalpurchaseValid = false;
              self.state.modalproductCategoryValid = false;



              $('[name=modalproductType]').val('');
              $('[name=modalproductCategory]').val('');
              $("#quantity2").show();
              $("#quantityLimit2").show();
              self.setState({
                modalproductName: '',
                modaldescription: '',
                modalproductCategory: '',
                modalsaleRate: '',
                modalpurchaseRate: '',
                modalquantity: 0,
                modalquantityLimit: '',
                modalhsnCode: '',
                modalproductType: '',
                modalcgst: 0,
                modalsgst: 0,
                modaligst: 0,
                formValid1: false,
                modalproductNameValid: false,
                modalsaleRateValid: false,
                modalproductTypeValid: false,
                modalquantityLimitValid: false,
                modalpurchaseRateValid: false,
                modalproductCategoryValid: false,

              });
              self.closeFunc1();
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
          title: 'Enter Product Name',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }
  }


  ClearProductFunc() {
    var self = this;


    $('[name=modalproductCategory]').val('');
    $('[name=modalproductType]').val('');
    this.state.modalproductName = "";
    this.state.modaldescription = "";
    this.state.modalquantityLimit = "";
    this.state.modalhsnCode = "";
    this.state.modalsaleRate = "";
    this.state.modalpurchaseRate = "";
    this.state.modalquantity = 0;
    this.state.modalcgst = 0;
    this.state.modalsgst = 0;
    this.state.modaligst = 0;
    self.setState({
      modalproductName: self.state.modalproductName,
      modaldescription: self.state.modaldescription,
      modalquantityLimit: self.state.modalquantityLimit,
      modalhsnCode: self.state.modalhsnCode,
      modalsaleRate: self.state.modalsaleRate,
      modalpurchaseRate: self.state.modalpurchaseRate,
      modalquantity: self.state.modalquantity,
      modalproductCategory: self.state.modalproductCategory,
      modalproductType: self.state.modalproductType,
      modalcgst: self.state.modalcgst,
      modalsgst: self.state.modalsgst,
      modaligst: self.state.modaligst,

    })
  }
  componentDidMount() {
    SetCurrentPage("SaleInvoiceInstant");

    window.scrollTo(0, 0);
  // alert("CustomerId:"+this.props.customerId+",Customername:"+this.props.vehicleRegistrationNo
  // +",BookingId:"+this.props.bookingId+",ContactNo:"+this.props.contactNo)
    $(".text").hide();
    $(".toweclass").hide();
    $(".selectsearchhide").show();
    staffData = [];
    issuesarray = [];
    $("#tableHeadings").hide();
    $("#paymentmodetd").hide();
    $(".producttype").hide();
    $("#insufficientdiv").hide();
    $(".btn-default").css("background-color", "#05a4b5");
    $(".btn-default").css("color", "white");
    this.DeleteButton();
  
    this.selectAdvisor();
    // this.GetData();
    var self = this;
    var productName;
    window.scrollTo(0, 0);


    customerarray.length = 0;
    $('#dueDate').datepicker({
      onSelect: function (date) {
        var dt = new Date(date);
        dt.setDate(dt.getDate() - 1);
        $("#invoiceDate").datepicker("option", "maxDate", dt);
        self.setState({
          dueDate: date,
        });

      },
      dateFormat: 'yy-mm-dd',
      minDate: '-3M',
      maxDate: '3M',
      numberOfMonths: 1
    });
    $('#invoiceDate').datepicker({
      onSelect: function (date) {
        var dt = new Date(date);
        dt.setDate(dt.getDate() + 1);
        $("#dueDate").datepicker("option", "minDate", dt);
        self.setState({
          invoiceDate: date,
        });
      },
      dateFormat: 'yy-mm-dd',
      minDate: '-3M',
      maxDate: 'M',
      numberOfMonths: 1
    });
    $("#invoiceDate").datepicker().datepicker("setDate", new Date());
    $("#dueDate").datepicker().datepicker("setDate", new Date());
    $('#customerName').html('');
    var paymentOptions1 = [];
    paymentOptions1.push({ label: "Cash", value: "Cash" });
    paymentOptions1.push({ label: "Card", value: "Card" });
    paymentOptions1.push({ label: "Cheque", value: "Cheque" });
    paymentOptions1.push({ label: "Online", value: "Online" });
    paymentOptions1.push({ label: "UPI", value: "UPI" });

    self.state.paymentoptions = paymentOptions1;
    this.setState({
      paymentoptions: self.state.paymentoptions
    })
   
    this.SelectCustomer();
    this.selectProduct();
    this.handleCustomerNameDetails();
    this.handleVehicleDetails();
    this.handleBookingDetails();
    $(".btn-default").css("background-color", "#05a4b5");
    $(".btn-default").css("color", "white");
  }



  selectProduct() {

    var self = this;
     options = [];
    for (var k = 0; k < saleRateArray.length; k++) {
      var temp = JSON.parse(saleRateArray[k]);
      if (temp.productType == "product") {

        options.push({ label: temp.productName + " ( " + temp.quantity + " ) ", value: temp.productName });
      }
      else {
        options.unshift({ label: temp.productName, value: temp.productName });

      }
      self.state.options = options;
      self.setState({
        options: options,
      })
    }

  }

  selectServiceBy(totalLength){

    
        var staffName2="";
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId:this.state.companyId,
        
      }),
     url: " http://15.206.129.105:8080/ThroughBooksCOAPI/staff/selectstaff",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {
      
        if(data.staffRetrievelist.length!=0){
  
  
    staffName2 += '<option  value="" disabled selected hidden>StaffName</option>';
    $.each(data.staffRetrievelist, function (i, item) {
      
   
      staffName2 += '<option value="' + item.staffName + '"> ' + item.staffName + '</option>'

   
    });
    cartLength=totalLength;
    staffNameOption=staffName2;
  for(var i=0;i<totalLength;i++){
    $("#staffName"+i).append(staffName2);
  }
    
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

  }
});
  }
  selectAdvisor(){
    var advisor;
   
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId:this.state.companyId,
        
      }),
     url: " http://15.206.129.105:8080/ThroughBooksCOAPI/staff/selectstaff",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {
      
        if(data.staffRetrievelist.length!=0){
  
    advisor += '<option  value="" disabled selected hidden>Advisor Name</option>';
   
    $.each(data.staffRetrievelist, function (i, item) {
      
   
    
   if(item.roleName=="Advisor" || item.roleName=="advisor"){

    advisor += '<option value="' + item.staffName + '"> ' + item.staffName + '</option>'
  

   }
   
   
    });
    $("#advisor").append(advisor);
  

  
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

  }
});
  }

  validateField2(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let staffNameValid = this.state.staffNameValid;

    switch (fieldName) {

      case 'staffName':
        if (value == "NO") {
          staffNameValid = value.length < 0;
          fieldValidationErrors.StaffName = staffNameValid ? '' : ' is InCorrect';
          break;
        } else {
          staffNameValid = value.length >= 1;
          fieldValidationErrors.StaffName = staffNameValid ? '' : ' is InCorrect';
          break;
        }


      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      staffNameValid: staffNameValid,

    }, this.validateForm2);
  }
  validateForm2() {

    this.setState({
      formValid:
        this.state.staffNameValid
    });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }


  SelectCustomer() {

    $("#tablecontents").empty();
    $("#tableHeadings").hide();
    var self = this;
    var customerName;

    customerarray = [];
    saleRateArray = [];

    customerArrayNewFormat=[];
   
    bookingDetailsArray=[];
    productArray=[];

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,

      }),
    // url: " http://15.206.129.105:8080/ThroughBooksCOAPI/saleorder/selectcustomer",
     url: " http://15.206.129.105:8080/ThroughBooksCOAPI/saleorder/selectcustomerNew",


      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        var options1 = [];
        var options = [];
        var optionsBok = [];
        var optionsVeh = [];
   

        customerArrayNewFormat=data.selectcustomernamelist;
     
        bookingDetailsArray=data.selectbookingdetailslist;
        productArray=data.selectsaleproductlist;



        $.each(data.selectcustomernamelist, function (i, item) {

          options1.push({ label: item.customerName + ' ' + item.contactNo, value: item.customerId });
        
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
           


          });



          customerarray.push(content);



        });

        // $("#customerName").append(customerName);
        self.state.options1 = options1;
        //  self.state.optionsBok = optionsBok;
        self.setState({
          options1: self.state.options1,
          // optionsBok: self.state.optionsBok,
        })


        $.each(data.selectsaleproductlist, function (i, item) {

          var arr = item.producttype;
          var arr1 = item.producttype;

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

  SelectProductB4Customer() {


    var self = this;

    saleRateArray = [];

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,

      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/saleorder/selectcustomerNew",


      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {



        $.each(data.selectsaleproductlist, function (i, item) {
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



  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // alert("value"+e.target.value)

    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }


  handleUserInputMobileNo = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });

    var isNumberDt = $.isNumeric(value);
    if (isNumberDt !== false) {
      var sign_data = Math.sign(value);
      // alert("SIGN VALUE :"+sign_data);
      if (sign_data != -1) {

        var decimal_data = (value - Math.floor(value)) !== 0;
        //   alert("DECIMAL DATA :"+decimal_data);
        if (decimal_data == false) {
          $("input[name=modalContactNo]").val(); // get current row 1st TD value



        } else {
          $("input[name=modalContactNo]").val(); // get current row 1st TD value

          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Decimal Values Not Accepted',
            showConfirmButton: false,
            timer: 2000
          })

        }
      } else {

        $("input[name=modalContactNo]").val(); // get current row 1st TD value

        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Negative Values Not Accepted',
          showConfirmButton: false,
          timer: 2000
        })

      }
    } else {

      $("input[name=modalContactNo]").val(); // get current row 1st TD value

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Kindly Enter An Number To Proceed',
        showConfirmButton: false,
        timer: 2000
      })

    }


  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let modalCustomerNameValid = this.state.modalCustomerNameValid;
    let modalContactNoValid = this.state.modalContactNoValid;
    let modalEmailValid=this.state.modalEmailValid;

    switch (fieldName) {
      case 'modalCustomerName':
        modalCustomerNameValid = value.match(/^([a-zA-Z]+)([a-zA-Z ])*$/);
        fieldValidationErrors.CustomerName = modalCustomerNameValid ? '' : ' is InCorrect';
        break;

      case 'modalContactNo':
        modalContactNoValid = value.match(/^[0-9]{10}$/);
        fieldValidationErrors.ContactNo = modalContactNoValid ? '' : ' is InCorrect';
        break;

        case 'modalEmail':
          modalEmailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          fieldValidationErrors.modalEmail = modalEmailValid ? '' : ' is InCorrect';
          break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      modalCustomerNameValid: modalCustomerNameValid,
      modalContactNoValid: modalContactNoValid,

    }, this.validateForm);
  }
  validateForm() {

    this.setState({
      formValid:
        this.state.modalCustomerNameValid
        && this.state.modalContactNoValid


    });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }
  handlediscountAmount = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    var value1 = value;
    var cleanNum;


    if (value1 != "") {

      var isNumberDt = $.isNumeric(value1);
      if (isNumberDt !== false) {
        var sign_data = Math.sign(value1);
        // alert("SIGN VALUE :"+sign_data);
        if (sign_data != -1) {

          cleanNum = value1.match(/^\d+\.?\d{0,2}/);
          /*this.state[name] = cleanNum;
          this.setState({ [name]: cleanNum });
          */
        
            this.state[name] = cleanNum;
            this.setState({ [name]: cleanNum });
            this.handleUserHeightWidthComplete1();
          

        } else {

          //  $("#"+name).val(); // get current row 1st TD value
          this.state[name] = '';
          this.setState({ [name]: '' });
          /*   confirmAlert({
                   title: 'Error',                        // Title dialog
                   message: 'Negative Values Not Accepted',               // Message dialog
                   confirmLabel: 'Ok',                           // Text button confirm
               });
               */
        }
      } else {

        // $("#"+name).val(); // get current row 1st TD value
        this.state[name] = '';
        this.setState({ [name]: '' });
        /*  confirmAlert({
                title: 'Error',                        // Title dialog
                message: 'Kindly Enter An Number To Proceed',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
            });
            */
      }

    } else {

      this.state[name] = '';
      this.setState({ [name]: '' });
      this.handleUserHeightWidthComplete1();
    }

  }
  handleUserHeightWidthComplete1() {

    var self = this;

    if(this.state.productType=="service" ||this.state.productType=="general"||this.state.productType=="labour"){
      self.state.total=self.state.rate;

    }else{
      self.state.total = Math.round(Number(self.state.rate) * Number(self.state.quantity));
    }

    if(Number(self.state.discountAmount)>Number(self.state.total)){
      // alert("Value of Total"+self.state.total);
       alert("Discount Amount Exceeds Total" + self.state.discountAmount);
    
      self.state.discountAmount= 0;
      self.state.discountPercentage=0;
      self.setState({
        discountAmount:'0',
        discountPercentage:'0',
      })
    }else{
      self.state.discountPercentage=Number(self.state.discountAmount)*(100/(Number(self.state.total))).toFixed(2);
      self.state.discountAmount= Number(self.state.discountAmount).toFixed(2);
    }
    

    self.state.prefinalAmount=(Number(self.state.total)-Number(self.state.discountAmount)).toFixed(2);

    self.state.finalAmount =(Number(self.state.prefinalAmount) + (((0.01 * Number(self.state.cgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.sgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.igsta)) * Number(self.state.prefinalAmount)))).toFixed(2);

    self.state.totalgst_rs = (((0.01 * Number(self.state.cgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.sgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.igsta)) * Number(self.state.prefinalAmount))).toFixed(2);

      self.setState({

        total: self.state.total,
        finalAmount: self.state.finalAmount,
        totalgst_rs: self.state.totalgst_rs,
        discountPercentage:self.state.discountPercentage,
        prefinalAmount:self.state.prefinalAmount,
      


      });
 


  }
  handlecgstSgstIgst = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    var value1 = value;
    var cleanNum;


    if (value1 != "") {

      var isNumberDt = $.isNumeric(value1);
      if (isNumberDt !== false) {
        var sign_data = Math.sign(value1);
        // alert("SIGN VALUE :"+sign_data);
        if (sign_data != -1) {

          cleanNum = value1.match(/^\d+\.?\d{0,2}/);
          /*this.state[name] = cleanNum;
          this.setState({ [name]: cleanNum });
          */

          this.state[name] = cleanNum;
          this.setState({ [name]: cleanNum });
          this.handleUserHeightWidthComplete();


        } else {

          //  $("#"+name).val(); // get current row 1st TD value
          this.state[name] = '';
          this.setState({ [name]: '' });
          /*   confirmAlert({
                   title: 'Error',                        // Title dialog
                   message: 'Negative Values Not Accepted',               // Message dialog
                   confirmLabel: 'Ok',                           // Text button confirm
               });
               */
        }
      } else {

        // $("#"+name).val(); // get current row 1st TD value
        this.state[name] = '';
        this.setState({ [name]: '' });
        /*  confirmAlert({
                title: 'Error',                        // Title dialog
                message: 'Kindly Enter An Number To Proceed',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
            });
            */
      }

    } else {

      this.state[name] = '';
      this.setState({ [name]: '' });
      this.handleUserHeightWidthComplete();
    }

  }

  handleUserHeightWidth = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    var value1 = value;
    var cleanNum;


    if (value1 != "") {

      var isNumberDt = $.isNumeric(value1);
      if (isNumberDt !== false) {
        var sign_data = Math.sign(value1);
        if (sign_data != -1) {

          cleanNum = value1.match(/^\d+\.?\d{0,2}/);
          if (value == "0") {
            alert("Value Cant Be Zero");
          }
          else {
            this.state[name] = cleanNum;
            this.setState({ [name]: cleanNum });
            this.handleUserHeightWidthComplete();
            //--test here
          }

        } else {

          //  $("#"+name).val(); // get current row 1st TD value
          this.state[name] = '';
          this.setState({ [name]: '' });
          /*   confirmAlert({
                   title: 'Error',                        // Title dialog
                   message: 'Negative Values Not Accepted',               // Message dialog
                   confirmLabel: 'Ok',                           // Text button confirm
               });
               */
        }
      } else {

        // $("#"+name).val(); // get current row 1st TD value
        this.state[name] = '';
        this.setState({ [name]: '' });
        /*  confirmAlert({
                title: 'Error',                        // Title dialog
                message: 'Kindly Enter An Number To Proceed',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
            });
            */
      }

    } else {

      this.state[name] = '';
      this.setState({ [name]: '' });
      this.handleUserHeightWidthComplete();
    }

  }


  handleUserQuantity = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    var value1 = value;
    var cleanNum;



    if (value1 != "") {

      var isNumberDt = $.isNumeric(value1);
      if (isNumberDt !== false) {
        var sign_data = Math.sign(value1);
        if (sign_data != -1) {

          cleanNum = value1.match(/^\d+\.?\d{0,2}/);
          if (value == "0") {
            alert("Value Cant Be Zero");
          }
          else {

            if (Number(value1) <= Number(currentItemQuantity)) {
              this.state[name] = cleanNum;
              this.setState({ [name]: cleanNum });
              this.handleUserHeightWidthComplete();
              $("#quantityalertmsg").empty();
            } else {
              this.state[name] = '';
              this.setState({ [name]: '' });
              $("#quantityalertmsg").empty();
              $("#quantityalertmsg").append("! Available Quantity In Stock " + currentItemQuantity);
            }

          }

        } else {

          //  $("#"+name).val(); // get current row 1st TD value
          this.state[name] = '';
          this.setState({ [name]: '' });
          /*   confirmAlert({
                   title: 'Error',                        // Title dialog
                   message: 'Negative Values Not Accepted',               // Message dialog
                   confirmLabel: 'Ok',                           // Text button confirm
               });
               */
        }
      } else {

        // $("#"+name).val(); // get current row 1st TD value
        this.state[name] = '';
        this.setState({ [name]: '' });
        /*  confirmAlert({
                title: 'Error',                        // Title dialog
                message: 'Kindly Enter An Number To Proceed',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
            });
            */
      }

    } else {

      this.state[name] = '';
      this.setState({ [name]: '' });
      this.handleUserHeightWidthComplete();

    }

  }

  ToastMsg(productName) {
    ToastsStore.warning("Stock Under Limit - " + productName);
  }
  handleUserHeightWidthComplete() {

    // alert("self.state.quantity" +self.state.quantity);
    var self = this;


    if (this.state.productType == "service" || this.state.productType == "general" || this.state.productType == "labour") {
      self.state.total = self.state.rate;

    } else {
      self.state.total = Math.round(Number(self.state.rate) * Number(self.state.quantity));
    }

    self.state.discountAmount=(Number(self.state.total)*(0.01 *Number(self.state.discountPercentage))).toFixed(2);

    if(Number(self.state.discountAmount)>Number(self.state.total)){
      alert("Discount Amount Exceeds Total" + self.state.discountAmount);    
      self.state.discountAmount= 0;
      self.state.discountPercentage=0;
      self.setState({
        discountAmount:'0',
        discountPercentage:'0',
      })
    }else{
      self.state.discountAmount=(Number(self.state.total)*(0.01 *Number(self.state.discountPercentage))).toFixed(2);
      self.state.discountPercentage= Number(self.state.discountPercentage).toFixed(2);
    }

    self.state.prefinalAmount=(Number(self.state.total)-Number(self.state.discountAmount)).toFixed(2);
    self.state.finalAmount =(Number(self.state.prefinalAmount) + (((0.01 * Number(self.state.cgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.sgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.igsta)) * Number(self.state.prefinalAmount)))).toFixed(2);

    self.state.totalgst_rs = (((0.01 * Number(self.state.cgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.sgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.igsta)) * Number(self.state.prefinalAmount))).toFixed(2);

    self.setState({
      total: self.state.total,
      finalAmount: self.state.finalAmount,
      totalgst_rs: self.state.totalgst_rs,
      discountAmount:self.state.discountAmount,
      prefinalAmount:self.state.prefinalAmount,
    });


  }


  AdvanceCalc = (e) => {

    const name = e.target.name;
    const value = e.target.value;
    //If Entered Amount Exceed the subtotal
    var state_value = 0;

    var value1 = value;
    var self = this;
    if (value1 != "") {
      var isNumberDt = $.isNumeric(value1);
      if (isNumberDt !== false) {
        var sign_data = Math.sign(value1);
        // alert("SIGN VALUE :"+sign_data);
        if (sign_data != -1) {

          var decimal_data = (value1 - Math.floor(value1)) !== 0;
          //   alert("DECIMAL DATA :"+decimal_data);
          if (decimal_data == false) {

            this.state[name] = value1;
            this.setState({ [name]: value1 });



          } else {

            //   $("#"+name).val(); // get current row 1st TD value
            this.state[name] = 0;
            this.setState({ [name]: 0 });
            // alert("NO NUMBER FOR DECI");
            /*  confirmAlert({
                        title: 'Error',                        // Title dialog
                        message: 'Decimal Values Not Accepted',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });
                    */
          }

        } else {

          //  $("#"+name).val(); // get current row 1st TD value
          this.state[name] = 0;
          this.setState({ [name]: 0 });

        }
        //   alert("NO NUMBER IN -");
      } else {

        // $("#"+name).val(); // get current row 1st TD value
        this.state[name] = 0;
        this.setState({ [name]: 0 });
        /*  confirmAlert({
                title: 'Error',                        // Title dialog
                message: 'Kindly Enter An Number To Proceed',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
            }); */
        //   alert("NO NUMBER FOR CHAR");
      }

    } else {
      this.state[name] = 0;
      this.setState({ [name]: 0 });

      //   alert("NO NUMBER FOR EMPTY STRING ");
    }



    if (isNumberDt != false && sign_data != -1 && decimal_data != true) {

      self.state.compareValue = this.state.subtotal1;
      self.state.compareValue1 = Math.round(Number(self.state.compareValue) );
      self.setState({
        compareValue: self.state.compareValue,
        compareValue1: self.state.compareValue1,
      })
      if (value1 > self.state.compareValue1) {


        alert("Advance Exceeds Total" + value1);

        state_value = 0;
        this.AdvanceCalcComplete(value1, state_value);

      } else {

        state_value = value1;
        this.AdvanceCalcComplete(value1, state_value);

      }
    } else {
      self.state.compareValue = this.state.subtotal1;
      self.state.compareValue1 = Math.round(Number(self.state.compareValue) );
      self.setState({
        compareValue: self.state.compareValue,
        compareValue1: self.state.compareValue1,
      })

      if (value1 > self.state.compareValue1) {


        alert("Advance Exceeds Total" + value1);
        state_value = 0;
        this.AdvanceCalcComplete(value1, state_value);

      } else {

        state_value = 0;
        this.AdvanceCalcComplete(value1, state_value);


      }
    }

  }


  AdvanceCalcComplete(value1, state_value) {

    this.state.advance = state_value;
    var self = this;
    var tot_adv_diff = Math.round(Number(this.state.subtotal1) - (Number(this.state.advance) ));
    var advanceRedeemamount = (Number(this.state.advance) );
    if (this.state.subtotal1 == advanceRedeemamount) {

      $('#discount').prop('disabled', true)
      this.state.discount = 0;

    } else if (this.state.discount > tot_adv_diff) {
      this.state.discount = 0;
      $('#discount').prop('disabled', false)

    } else {
      $('#discount').prop('disabled', false)

    }


    this.state.balance_amount = Math.round(Number(this.state.subtotal1) - (Number(this.state.advance) + Number(this.state.discount) ));

    if (this.state.balance_amount == 0) {
      this.state.payment_status = "Paid";
      $("#paymentmodetd").show();

    } else if (this.state.subtotal1 == this.state.balance_amount) {
      this.state.payment_status = "UnPaid";
      $("#paymentmodetd").hide();
    } else {
      this.state.payment_status = "PartiallyPaid";
      $("#paymentmodetd").show();
    }



    this.setState({
      advance: state_value,
      discount: this.state.discount,
      balance_amount: this.state.balance_amount,
      payment_status: this.state.payment_status,
    })

  }


  //Onchange For Discount
  DiscountCalc = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    var value1 = value;
    var state_value = 0;
    var self = this;
    if (value1 != "") {

      var isNumberDt = $.isNumeric(value1);
      if (isNumberDt !== false) {
        var sign_data = Math.sign(value1);
        // alert("SIGN VALUE :"+sign_data);
        if (sign_data != -1) {

          var decimal_data = (value1 - Math.floor(value1)) !== 0;
          //   alert("DECIMAL DATA :"+decimal_data);
          if (decimal_data == false) {

            this.state[name] = value1;
            this.setState({ [name]: value1 });

          } else {

            //   $("#"+name).val(); // get current row 1st TD value
            this.state[name] = 0;
            this.setState({ [name]: 0 });

            /*  confirmAlert({
                        title: 'Error',                        // Title dialog
                        message: 'Decimal Values Not Accepted',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                    });  */
          }
        } else {

          //  $("#"+name).val(); // get current row 1st TD value
          this.state[name] = 0;
          this.setState({ [name]: 0 });
          /* confirmAlert({
                 title: 'Error',                        // Title dialog
                 message: 'Negative Values Not Accepted',               // Message dialog
                 confirmLabel: 'Ok',                           // Text button confirm
             }); */
        }
      } else {

        // $("#"+name).val(); // get current row 1st TD value
        this.state[name] = 0;
        this.setState({ [name]: 0 });
        /* confirmAlert({
               title: 'Error',                        // Title dialog
               message: 'Kindly Enter An Number To Proceed',               // Message dialog
               confirmLabel: 'Ok',                           // Text button confirm
           }); */
      }

    } else {
      this.state[name] = 0;
      this.setState({ [name]: 0 });
    }


    if (isNumberDt != false && sign_data != -1 && decimal_data != true) {
      var tot_minus_adv = Math.round(Number(this.state.subtotal1) - (Number(this.state.advance) ));
      //If discount Exceeds the balance Amount
      if (value1 > tot_minus_adv) {
        alert("Exceeds Balance" + value1);
        state_value = 0;
        this.DiscountCalcComplete(value1, state_value);

      } else {

        state_value = value1;
        this.DiscountCalcComplete(value1, state_value);

      }


    } else {
      var tot_minus_adv = Math.round(Number(this.state.subtotal1) - (Number(this.state.advance) ));
      //If discount Exceeds the balance Amount
      if (value1 > tot_minus_adv) {
        alert("Exceeds Balance" + value1);
        state_value = 0;
        this.DiscountCalcComplete(value1, state_value);
      } else {

        state_value = 0;
        this.DiscountCalcComplete(value1, state_value);

      }
    }

  }


  DiscountCalcComplete(value1, state_value) {

    this.state.discount = state_value;
    //this.state.advance=Math.round(Number(this.state.subtotal1)-Number(this.state.discount) );
    this.state.balance_amount = Math.round(Number(this.state.subtotal1) - (Number(this.state.advance) + Number(this.state.discount)));

    var self = this;
    if (this.state.balance_amount == 0) {
      this.state.payment_status = "Paid";
      $("#paymentmodetd").show();

    } else if (this.state.subtotal1 == this.state.balance_amount) {
      this.state.payment_status = "UnPaid";
      $("#paymentmodetd").hide();
    } else {
      this.state.payment_status = "PartiallyPaid";
      $("#paymentmodetd").show();
    }



    this.setState({
      discount: state_value,
      // advance:this.state.advance,
      balance_amount: this.state.balance_amount,
      payment_status: this.state.payment_status,
    })
  }
  handleVehicleDetails(){
   
    this.state.productName = "";
    this.state.quantity = "";
  
    this.handleVehicleemptyFunc();
   // this.SelectProductB4Customer();
    this.selectProduct();
 


    this.setState({
   
      vehicleRegistrationNoValid: true
    });

    var self = this;
  
    self.state.vehicleDetails="";
    self.setState({
    
      vehicleDetails:self.state.vehicleDetails,
    })
    
  
    $("#tablecontents").empty();
    $("#tableHeadings").hide();
 
   
   var optionsBok=[];
    var localbookingIdArray=[];
if(this.state.vehicleRegistrationNo==null || this.state.vehicleRegistrationNo==" " ||this.state.vehicleRegistrationNo=="Null"){

}else{
  var bookingIdArray=_.where(customerVehicleArray,{vehicleRegistrationNo:this.state.vehicleRegistrationNo});

  $.each(bookingIdArray, function (i, item) {
    
      if(!_.contains(localbookingIdArray,item.bookingId)){
        localbookingIdArray.push( item.bookingId );
        optionsBok.push({ label: item.bookingId, value: item.bookingId });
      }
      

  });


self.state.optionsBok=optionsBok;
self.setState({
optionsBok:self.state.optionsBok,
})

}
    




  }


  handleBookingDetails() {
    
    $("#tablecontents").empty();
    $("#tableHeadings").hide();
    
    
    this.state.productName = "";
    this.state.quantity = "";
    this.handleBookingemptyFunc();
    //this.SelectProductB4Customer();
    this.selectProduct();
   
    //  rougharray.push(this.state.customerId);


    this.setState({
     
      bookingIdValid: true
    });

    var self = this;
 
    $("#tablecontents").empty();
    $("#tableHeadings").hide();
  
    if(this.state.bookingId==null || this.state.bookingId==" " ||this.state.bookingId=="Null"){

    }else{
      var bookingIdArray=_.where(customerVehicleArray,{bookingId:this.state.bookingId});

    
   if(bookingIdArray[0].issues!=null){
    issuesarray = bookingIdArray[0].issues.split(',');

   }
       
    
     for (var m = 0; m < saleRateArray.length; m++) {
            var temp = JSON.parse(saleRateArray[m]);
           
            for (var i = 0; i < issuesarray.length; i++) {
           
              if (temp.productName == issuesarray[i]) {
  
                this.state.productName = temp.productName;
                this.state.total = temp.rate;
                this.state.rate = temp.rate;
                this.state.cgsta = temp.cgsta;
                this.state.sgsta = temp.sgsta;
                this.state.igsta = temp.igsta;
                this.state.description = temp.description;
  
                this.state.finalAmount = "";
  
                this.state.quantity = "-";
                this.state.productType = temp.productType;
                this.state.productQuantity = temp.quantity;
                this.state.productId = temp.productId;
                currentItemQuantity = temp.quantity;
                currentItemLimitQuantity = temp.quantityLimit;
  
  
                self.state.prefinalAmount=(Number(self.state.total)-Number(self.state.discountAmount)).toFixed(2);
                this.state.finalAmount = Math.round(Number(this.state.total) + ((0.01 * Number(this.state.cgsta)) * Number(this.state.total)) + (0.01 * Number(this.state.sgsta) * Number(this.state.total)) + (0.01 * Number(this.state.igsta) * Number(this.state.total)));
                this.state.totalgst_rs = Math.round(((0.01 * Number(this.state.cgsta)) * Number(this.state.total)) + (0.01 * Number(this.state.sgsta) * Number(this.state.total)) + (0.01 * Number(this.state.igsta) * Number(this.state.total)));
  
                this.setState({
                  total: this.state.total,
                  finalAmount: this.state.finalAmount,
                  totalgst_rs: this.state.totalgst_rs,
                  productName: this.state.productName1,
                });
  
               
                  var currentproductvalue;
  
                  this.selectProduct();
               
  
                  if (this.state.quantity != "-") {
                    this.state.totalitemqty = Math.round(Number(this.state.totalitemqty) + Number(this.state.quantity));
                  }
  
                  //var tab = '<thead><tr class="headcolor" style="color: white; background-color: #486885; font-size: 12px;">  <th>ProductName</th><th>Size</th><th>Rate</th><th>Amount</th><th>Quantity</th><th>Total</th><th>cgst (%)</th><th>SGST (%)</th><th>IGST (%)</th><th>Final Amount</th></tr></thead>';
                  this.state.subtotal1 = Math.round(Number(this.state.subtotal1) + Number(this.state.finalAmount));
  
                  this.state.totalgst = Math.round(Number(this.state.totalgst) + Math.round(Number(this.state.totalgst_rs)));
                  this.state.TotalWithoutGST = Math.round(Number(this.state.TotalWithoutGST) + Number(this.state.total));
  
  
                  subtotal_cgst = Math.round(Number(subtotal_cgst) + ((0.01 * Number(this.state.cgsta)) * Number(this.state.total)));
                  subtotal_sgst = Math.round(Number(subtotal_sgst) + ((0.01 * Number(this.state.sgsta)) * Number(this.state.total)));
                  subtotal_igst = Math.round(Number(subtotal_igst) + ((0.01 * Number(this.state.igsta)) * Number(this.state.total)));
  
  
               
                  //  var tab = '<tr style={{backgroundColor: "white",fontColor:"black",fontWeight:"bold"}} id="tabletextcol" ><td>' + self.state.productName + '</td><td>' + self.state.total + '</td><td>' + self.state.cgsta + '</td><td>' + self.state.sgsta + '</td><td  id="Gstcal" >' + self.state.igsta + '</td><td  id="finalAmountcal" >' + self.state.finalAmount + '</td><td  class="heightWidth" >' + self.state.description + '</td><td><button id="delete">Delete</button></td></tr>';
  
                  var tab = '<tr style={{backgroundColor: "white",fontColor:"black",fontWeight:"bold"}} id="tabletextcol" >'
                    + '<td>'+ temp.productName +'</td><td>' + self.state.rate + '</td>'
                    + '<td>' + "-" + '</td><td>' + self.state.total + '</td><td>' + self.state.discountPercentage + '</td>'
                    +'<td>' + self.state.discountAmount + '</td><td>' + self.state.prefinalAmount + '</td>'
                    + '<td>' + self.state.cgsta + '</td><td>' + self.state.sgsta + '</td>'
                    + '<td  id="Gstcal" >' + self.state.igsta + '</td>'
                    + '<td  id="finalAmountcal" >' + self.state.finalAmount + '</td>'
            
                    + '<td  class="heightWidth" >' + self.state.description + '</td>'
                    + '<td  class="heightWidth" >' + self.state.productId + '</td>'
                    + '<td class="producttype">' + self.state.productType + '</td>'
                    +'<td width="auto"><select id="staffName'+i+'" class="SelectOption"  name="staffName2" ></select></td>'
                 
                    + '<td><button id="delete">Delete</button></td>'
                    + '</tr>';
               
                  $("#tableHeadings").append(tab);
                //  self.selectServiceBy();
                  $("#tableHeadings").show();
                  $(".producttype").hide();
  
                  $("#advance").bind('keydown', function (event) {
                    if (event.keyCode === 13) {
                      event.preventDefault();
                      //  $("#saleinvoice").click();
                    }
                  });
  
                  $("#discount").bind('keydown', function (event) {
                    if (event.keyCode === 13) {
                      event.preventDefault();
                      //  $("#saleinvoice").click();
                    }
                  });
  
  
  
                  self.state.description = "";
                  self.state.rate = "";
                  self.state.quantity = "";
                  self.state.total = "";
                  self.state.cgsta = "";
                  self.state.sgsta = "";
                  self.state.igsta = "";
                  self.state.finalAmount = "";
                  self.state.productId = "";
                  //   self.state.TotalWithoutGST="";
                  $('[name=productName]').val('');
                  $("#quantity").show();
                  $("#quantity1").show();
                  $('[name=staffName]').val('');
                  $("#total").show();
                  $("#total1_Input").show();
                  $("#total1").show();
                  $("#quantity1_Input").show();
  
                  self.setState({
  
                    description: '',
                    rate: '',
                    amount: '',
                    quantity: '',
                    total: '',
                    cgsta: '',
                    sgsta: '',
                    igsta: '',
                    finalAmount: '',
                    productName: '',
                    productId: '',
                    TotalWithoutGST: self.state.TotalWithoutGST,
                    totalgst: self.state.totalgst,
                    totalitemqty: self.state.totalitemqty,
                   balance_amount: self.state.subtotal1,
                    subtotal1: self.state.subtotal1,
                    discount: 0,
                   advance: 0,
                    staffName1: '',
                  //   balance_amount: 0,
                  //  // discount: 0,
                  //   advance: this.state.subtotal1,
  
                  });
                  advancebalance_calc = this.state.subtotal1;
               
  
                  var numtoword = numberToWord(Number(self.state.subtotal1));
                  this.state.amountInWords=convert_to_words(Number(self.state.subtotal1),'USD');
              this.state.amountInWords=Case.capital(this.state.amountInWords)
  
  
                
  
                break;
              }
  
            }
          }
  
          self.selectServiceBy(issuesarray.length);
    }
  
     

  }

  handleCustomerNameDetails () {
    var self=this;
    var finalRowCount = $('#tableHeadings tbody tr').length;
 
        if ((finalRowCount == 0)) {
          vehicleRegistrationNoarray = [];
          vehicleMakearray = [];
          vehicleModelarray = [];
          vehicleFuelTypearray = [];
          issuesarray=[];
          self.state.email="";
          self.state.gstNo ="";
          self.state.companyName ="";
          self.state.issues ="";
              self.state.orderNumber = "";
          
                  self.state.contactNo = "";
                  self.state.address = "";
                  self.state.customerName = "";
               
                  self.state.customerId1 ="";
                
             
     
          this.state.productName = "";
          this.state.quantity = "";
          
              
          this.emptyFunc();
          this.SelectProductB4Customer();
          this.selectProduct();
          rougharray.push(this.state.customerId);
      
      
          this.setState({
         
            customerNameValid: true,
          
          });
      
          var self = this;
        
      
          $("#tablecontents").empty();
          $("#tableHeadings").hide();
        
          for (var k = 0; k < customerarray.length; k++) {
            var temp = JSON.parse(customerarray[k]);
     
            if (temp.customerId == this.state.customerId) {
           
              self.state.orderNumber = temp.orderNumber + 1;
              self.state.customerId = temp.customerId;
              self.state.contactNo = temp.contactNo;
              self.state.address = temp.address;
              self.state.customerName = temp.customerName;
         
              self.state.customerId1 = temp.customerId;
            
      
              vehicleRegistrationNoarray = [];
              vehicleMakearray = [];
              vehicleModelarray = [];
              vehicleFuelTypearray = [];
      
              self.setState({
                customerId1: self.state.customerId1,
             
      
      
              })
              if (temp.companyName == " " || temp.companyName == "null" || temp.companyName == "-") {
                self.state.companyName = " "
              }
              else {
                self.state.companyName = temp.companyName;
              }
      
              if (temp.gstNo == " ") {
                self.state.gstNo = '-';
              } else {
                self.state.gstNo = temp.gstNo;
              }
      
              self.state.email = temp.email;
      
          
            
              self.setState({
                orderNumber: self.state.orderNumber,
                customerId: self.state.customerId,
                contactNo: self.state.contactNo,
                address: self.state.address,
                gstNo: self.state.gstNo,
                email: self.state.email,
                customerName: self.state.customerName,
                companyName: self.state.companyName,
      
                issues: self.state.issues,
              })
      
             
              break;
            }
      
          }
      
             customerVehicleArray=[];
             if(this.state.customerId==null || this.state.customerId==" " ||this.state.customerId=="Null"){
              customerVehicleArray =_.where(bookingDetailsArray, {vehicleRegistrationNo:this.state.vehicleRegistrationNo });
            }else{
              customerVehicleArray =_.where(bookingDetailsArray, {customerId:this.state.customerId });
            }
           
         
      
            //GENERATE BOOKINGID DROPDOWN & VEHICLE DROPDOWN
      
              this.GetVehicle_BookingIdList(customerVehicleArray,this.state.customerId )
      
      
      
        }
    
 

 


  }


  GetVehicle_BookingIdList(customerVehicleArray,customerId ){
   
    var optionsVeh = [];
    var self=this;
    var optionsBok = [];

    var localVehicleArray=[];
    var localbookingIdArray=[];

    $.each(customerVehicleArray, function (i, item) {
      
        if(!_.contains(localVehicleArray,item.vehicleRegistrationNo)){
          localVehicleArray.push(item.vehicleRegistrationNo );
          optionsVeh.push({ label: item.vehicleRegistrationNo, value: item.vehicleRegistrationNo });
        }

        if(!_.contains(localbookingIdArray,item.bookingId)){
          localbookingIdArray.push( item.bookingId );
          optionsBok.push({ label: item.bookingId, value: item.bookingId });
        }
  
    });

    self.state.optionsVeh = optionsVeh;
    self.state.optionsBok = optionsBok;

    self.setState({
      optionsVeh: self.state.optionsVeh,
      optionsBok: self.state.optionsBok,

    })
  }

  handleProductDetails = (e) => {

    const name = e.name;
    const value = e.value;
    const product_Quantity = e.quantity;
  
  
    this.state.productName = value;
    this.state.prod_quantity = product_Quantity;
    $("#cgsta").prop("readonly", false);
    $("#sgsta").prop("readonly", false);
    $("#quantity").show();
    $("#total1").show();
    $("#quantity1").show();
    $("#total").show();
    $("#quantity1_Input").show();
    $("#total_Input").show();
    // $("#quantityalertmsg").val(" ");
    $("#quantityalertmsg").empty();
  
    testarray.push(this.state.productName + " " + this.state.currentItemQuantity);
  
  
    this.setState({
      [name]: value,
      selectedProductName: e,
      productNameValid: true
    });
  
    var self = this;
  
  
    for (var k = 0; k < saleRateArray.length; k++) {
      var temp = JSON.parse(saleRateArray[k]);
  
  
      if (temp.productName == self.state.productName) {
  
  
        if (temp.productType == "product") {
          //FOR PRODUCT QUANTITY BASED CALCULATION WAS DONE
          if (Number(temp.quantity) != 0) {
            //INVENTORY CHECK
            self.state.quantity = 1;
            self.state.total = "";
            self.state.finalAmount = "";
            self.state.discountPercentage = 0;
            self.state.discountAmount = 0;
            self.state.prefinalAmount = 0;
            self.state.description = temp.description;
            self.state.rate = temp.rate;
            self.state.cgsta = temp.cgsta;
            self.state.sgsta = temp.sgsta;
            self.state.igsta = temp.igsta;
            self.state.productType = temp.productType;
            self.state.productQuantity = temp.quantity;
            self.state.productId = temp.productId;
            currentItemQuantity = temp.quantity;
            currentItemLimitQuantity = temp.quantityLimit;
        
  
            self.setState({
              description: temp.description,
              rate: temp.rate,
              cgsta: temp.cgsta,
              sgsta: temp.sgsta,
              igsta: temp.igsta,
              productQuantity: temp.quantity,
              productType: temp.productType,
              productId: temp.productId,
        
              quantity: 1,
              total: "",
              finalAmount: "",
              discountPercentage: 0,
              discountAmount: 0,
              prefinalAmount: 0,
            })
  
  
            //FOR PRODUCTS TOTAL IS RATE*QUANTITY
            self.state.total = Number(self.state.rate) * Number(self.state.quantity);
            // prefinalAmount=total-discountAmount
            self.state.prefinalAmount = (Number(self.state.total) - Number(self.state.discountAmount)).toFixed(2);
            //totalgst_rs=prefinalAmount*(GST/100)
            self.state.totalgst_rs = ((Number(self.state.prefinalAmount) * (Number(self.state.cgsta) + Number(self.state.sgsta))) / 100).toFixed(2);
            //finalAmount=prefinalAmount+totalgst_rs
            self.state.finalAmount = (((Number(self.state.prefinalAmount) + Number(self.state.totalgst_rs)) * 100) / 100).toFixed(2);
  
  
            //    self.state.finalAmount = (Number(self.state.prefinalAmount) + (((0.01 * Number(self.state.cgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.sgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.igsta)) * Number(self.state.prefinalAmount)))).toFixed(2);
  
            //    self.state.totalgst_rs = (((0.01 * Number(self.state.cgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.sgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.igsta)) * Number(self.state.prefinalAmount))).toFixed(2);
  
  
  
  
            self.setState({
              total: self.state.total,
              finalAmount: self.state.finalAmount,
              totalgst_rs: self.state.totalgst_rs,
              prefinalAmount: self.state.prefinalAmount
            });
  
            break;
  
  
          }
          else {
            //IF PRODUCT IS NOT IN SUFFICIENT QUANTITY IT SHOWS AN ALERT
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Check Product Quantity!!',
              showConfirmButton: false,
              timer: 2000,
            })
            self.state.productName = "";
            self.state.selectedProductName = "";
            self.state.quantity = 1;
            self.state.total = "";
            self.state.finalAmount = "";
            self.state.description = "";
            self.state.rate = "";
            self.state.cgsta = "";
            self.state.sgsta = "";
            self.state.igsta = "";
            self.state.productType = "";
            self.state.productQuantity = "";
            self.state.productId = "";
            currentItemQuantity = "";
            currentItemLimitQuantity = "";
         
            self.setState({
              description: '',
              rate: '',
              cgsta: '',
              sgsta: '',
              igsta: '',
              productQuantity: '',
              productType: '',
              productId: '',
              quantity: 1,
              total: '',
              finalAmount: '',
            
              selectedProductName: '',
              productName: '',
  
            })
            //  self.emptyFunc();
            self.selectProduct();
            self.SelectProductB4Customer();
  
          }
        }
        else {
          //SERVICE TYPE PRODUCT CALCULATION 
          self.state.quantity = 1;
          self.state.total = "";
          self.state.finalAmount = "";
          self.state.discountPercentage = 0;
          self.state.discountAmount = 0;
          self.state.prefinalAmount = 0;
          self.state.description = temp.description;
          self.state.rate = temp.rate;
          self.state.cgsta = temp.cgsta;
          self.state.sgsta = temp.sgsta;
          self.state.igsta = temp.igsta;
          self.state.productType = temp.productType;
          self.state.productQuantity = temp.quantity;
          self.state.productId = temp.productId;
          currentItemQuantity = temp.quantity;
          currentItemLimitQuantity = temp.quantityLimit;
        
  
  
          self.setState({
            description: temp.description,
            rate: temp.rate,
            cgsta: temp.cgsta,
            sgsta: temp.sgsta,
            igsta: temp.igsta,
            productQuantity: temp.quantity,
            productType: temp.productType,
            productId: temp.productId,
            quantity: 1,
            total: "",
            finalAmount: "",
            discountPercentage: 0,
            discountAmount: 0,
            prefinalAmount: 0,
          
  
          })
  
          if (this.state.productType == "service" || this.state.productType == "general" || this.state.productType == "labour") {
            $("#quantity").hide();
            $("#quantity1").hide();
            $("#quantity1_Input").hide();
            $("#total").hide();
            $("#total1").hide();
            $("#total_Input").hide();
            //SERVICE,GENERAL,LABOUR TYPE PRODUCTS DOESN'T HAVE QUANTITY 
            //SO TOTAL WILL BE AS SAME AS RATE
            self.state.total = self.state.rate;
            this.state.quantity = "-";
            this.setState({
              quantity: this.state.quantity,
            })
          }
          // prefinalAmount=total-discountAmount
          self.state.prefinalAmount = (Number(self.state.total) - Number(self.state.discountAmount)).toFixed(2);
          //totalgst_rs=prefinalAmount*(GST/100)
          self.state.totalgst_rs = ((Number(self.state.prefinalAmount) * (Number(self.state.cgsta) + Number(self.state.sgsta))) / 100).toFixed(2);
          //finalAmount=prefinalAmount+totalgst_rs
          self.state.finalAmount = (((Number(self.state.prefinalAmount) + Number(self.state.totalgst_rs)) * 100) / 100).toFixed(2);
  
  
          //     self.state.finalAmount = (Number(self.state.prefinalAmount) + (((0.01 * Number(self.state.cgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.sgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.igsta)) * Number(self.state.prefinalAmount)))).toFixed(2);
  
          //   self.state.totalgst_rs = (((0.01 * Number(self.state.cgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.sgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.igsta)) * Number(self.state.prefinalAmount))).toFixed(2);
  
  
          self.setState({
            total: self.state.total,
            finalAmount: self.state.finalAmount,
            totalgst_rs: self.state.totalgst_rs,
            prefinalAmount: self.state.prefinalAmount,
          });
          break;
  
  
        }
  
      }
  
    }
  }



  ClearProductFunc() {
    var self = this;

    $('[name=modalproductCategory]').val('');
    $('[name=modalproductType]').val('');
    this.state.modalproductName = "";
    this.state.modaldescription = "";
    this.state.modalpurchaseRate = "";
    this.state.modalhsnCode = "";
    this.state.modalsaleRate = "";
    this.state.modalcgst = 0;
    this.state.modaligst = 0;
    this.state.modalsgst = 0;

    self.setState({
      modalproductName: self.state.modalproductName,
      modaldescription: self.state.modaldescription,
      modalpurchaseRate: self.state.modalpurchaseRate,
      modalhsnCode: self.state.modalhsnCode,
      modalsaleRate: self.state.modalsaleRate,
      modalproductCategory: self.state.modalproductCategory,
      modalproductType: self.state.modalproductType,
      modalcgst: this.state.modalcgst,
      modalsgst: this.state.modalsgst,
      modaligst: this.state.modaligst
    })
  }

  closeFunc1() {
    //alert("MODAL CLOSE");
    var self = this;

    $('[name=modalproductCategory]').val('');
    $('[name=modalproductType]').val('');
    this.state.modalproductName = "";
    this.state.modaldescription = "";
    this.state.modalpurchaseRate = "";
    this.state.modalhsnCode = "";
    this.state.modalsaleRate = "";
    this.state.modalcgst = 0;
    this.state.modaligst = 0;
    this.state.modalsgst = 0;
    this.state.modalpurchaseRateValid= false;
    this.state.modalsaleRateValid= false;
    this.state.modalproductNameValid= false;
    this.state.modalproductTypeValid= false;
    this.state.modalproductCategoryValid= false;


    self.setState({
      modalproductName: self.state.modalproductName,
      modaldescription: self.state.modaldescription,
      modalpurchaseRate: self.state.modalpurchaseRate,
      modalhsnCode: self.state.modalhsnCode,
      modalsaleRate: self.state.modalsaleRate,
      modalproductCategory: self.state.modalproductCategory,
      modalproductType: self.state.modalproductType,
      modalcgst: this.state.modalcgst,
      modalsgst: this.state.modalsgst,
      modaligst: this.state.modaligst,
      modalpurchaseRateValid:this.state.modalpurchaseRateValid,
      modalsaleRateValid:this.state.modalsaleRateValid,
      modalproductNameValid:this.state.modalproductNameValid,
      modalproductTypeValid:this.state.modalproductTypeValid,
      modalproductCategoryValid:this.state.modalproductCategoryValid,

    })


  }






  SaleInvoiceFunc() {
    var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

  
    var self = this;
  

    var arrData = [];
  

    staffData = [];
    var checkboxArray = [];
    var checkboxArray1 = [];
    $.each($("input[name='sms']:checked"), function () {
      checkboxArray.push($(this).val());
    });
    $.each($("input[name='emailoption']:checked"), function () {
      checkboxArray1.push($(this).val());
    });
    this.state.sms = checkboxArray.toString();
    this.state.emailoption = checkboxArray1.toString();
    this.setState({
      sms: this.state.sms,
      emailoption: this.state.emailoption,
      // message:this.state.message
    });

    // alert("checkboxArray"+this.state.sms);
    // loop over each table row (tr)

  
    $("#tablecontents tr").each(function () {
      var currentRow = $(this);


      var productName = currentRow.find("td:eq(0)").text();
      var rate = (Math.round(currentRow.find("td:eq(1)").text() * 100) / 100).toFixed(2);
      var quantity = currentRow.find("td:eq(2)").text();
      var total = (Math.round(currentRow.find("td:eq(3)").text() * 100) / 100).toFixed(2);
      var discountPercentage = currentRow.find("td:eq(4)").text();
      var discountAmount = currentRow.find("td:eq(5)").text();
      var subtotal = currentRow.find("td:eq(6)").text();

      var cgst = currentRow.find("td:eq(7)").text();
      var sgst = currentRow.find("td:eq(8)").text();
      var igst = currentRow.find("td:eq(9)").text();
      var finalAmount = (Math.round(currentRow.find("td:eq(10)").text() * 100) / 100).toFixed(2);

      var description = currentRow.find("td:eq(11)").text();
      var productId = currentRow.find("td:eq(12)").text();
      var productType = currentRow.find("td:eq(13)").text();
      var staffName = currentRow.find("option:selected").text();
      if(staffName=="" || staffName=="StaffName")
      {
        staffName="-";
      }
    
    //  find(".SelectOption").val();
      if (description == "") {
        description = '-';
      }


      arrData.push(productName + "@");
      arrData.push(rate + "@");
      arrData.push(quantity + "@");
      arrData.push(total + "@");
      arrData.push(discountPercentage + "@");
      arrData.push(discountAmount + "@");
      arrData.push(subtotal + "@");
      arrData.push(cgst + "@");
      arrData.push(sgst + "@");
      arrData.push(igst + "@");
      arrData.push(finalAmount + "@");
      arrData.push(description + "@");
      arrData.push(productId + "@");
      arrData.push(productType + "@");
      arrData.push(staffName + "@");

    });
   
 
    this.state.invoiceData = arrData.toString();

    // self.state.staffData1 = staffData.toString();

    // self.setState({
    //   staffData1: staffData.toString(),
    // })

    this.setState({
      invoiceData: arrData.toString(),


    });

    if (this.state.payment_status == "UnPaid") {
      this.state.paymentMode = "-";
    }



if(this.state.bookingId==null)
{
   var b=0;
}else{
  var b=1;
}
    // if ((this.state.customerName.length > 0)) {
  
        if ((this.state.invoiceData.trim().length > 1)) {
          if ((this.state.invoiceDate.trim().length > 1) && (this.state.dueDate.trim().length > 1)) {
            if ((this.state.paymentMode != "")) {
              $.ajax({
                type: 'POST',
                data: JSON.stringify({
                  customerName: this.state.customerName,
                  //  invoiceNo: this.state.invoiceNo,
                  orderNumber: this.state.orderNumber,
                  companyName: this.state.companyName,
                  invoiceDate: this.state.invoiceDate,
                  dueDate: this.state.dueDate,
                  organizationName: companyName,
                  invoiceData: this.state.invoiceData.toString(),
              
                  staffData1: staffData.toString(),
                  date: this.state.date,
                  customerId: this.state.customerId,
                  contactNo: this.state.contactNo,
                  totalcgst: (Math.round(subtotal_cgst * 100) / 100).toFixed(2),
                  totalsgst: (Math.round(subtotal_sgst * 100) / 100).toFixed(2),
                  totaligst: (Math.round(subtotal_igst * 100) / 100).toFixed(2),
                  discount: (Math.round(this.state.discount * 100) / 100).toFixed(2),
                  subtotal1: (Math.round(this.state.subtotal1 * 100) / 100).toFixed(2),
                  totalgst: (Math.round(this.state.totalgst * 100) / 100).toFixed(2),
                  balance_amount: (Math.round(this.state.balance_amount * 100) / 100).toFixed(2),
                  advance: (Math.round(this.state.advance * 100) / 100).toFixed(2),
                  totalitemqty: this.state.totalitemqty,
                  payment_status: this.state.payment_status,
                  address: this.state.address,
                  gstNo: this.state.gstNo,
                  email: this.state.email,
                  companyId: this.state.companyId,
                  sms: this.state.sms,
                  emailoption: this.state.emailoption,
                  paymentMode: this.state.paymentMode,
                advisor:this.state.advisor,
                  //    staffId: this.state.staffName.toString(),
                  staffId: self.state.staffId,
                  employeeName: self.state.employeeName,
                  role: self.state.role,
                  bookingId: self.state.bookingId,
                  vehicleRegistrationNo: self.state.vehicleRegistrationNo,
                  issues: self.state.issues,

                  fromAddress:this.state.fromAddress,
                  toAddress:this.state.toAddress,
                  remark:this.state.remark,
                  dealer:this.state.dealer,
                  site:GetCurrentSite()
                }),
  
            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/saleorder/addsaleorder",
                contentType: "application/json",
                dataType: 'json',
                async: false,
                success: function (data, textStatus, jqXHR) {
  
                  if (data.invoiceResponseData == "Invoice_Failed") {
  
                    Swal.fire({
                      position: 'center',
                      icon: 'error',
                      title: 'Invoice Failed Due To Insufficient Quantity',
                      showConfirmButton: false,
                      timer: 2000
                    })
  
                    self.ResponseCalculation(data);
  
  
  
  
                  }
  
  
  
                  if (data.invoiceResponseData == "Invoice_Success") {
  
                    var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
  
                    Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'Hello ' + self.state.customerName + ' Welcome To ' + companyName + ' Your Invoice [' + data.invoiceNo + '] '
                        + ' Has Been Created. Your Invoice Amount is Rs. ' + self.state.subtotal1, // Message dialog  
                      showConfirmButton: true,
                      showCancelButton: true,
                      confirmButtonText: 'Yes, view it!',
                      //  confirmButtonText: 'Print Slip!',
                      cancelButtonText: 'No, cancel it'
                      //   timer: 1500
                    }).then((result) => {
                      if (result.value) {
                        self.ViewFunc()
  
                        // For more information about handling dismissals please visit
                        // https://sweetalert2.github.io/#handling-dismissals
                      } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire({
                          position: 'center',
                          icon: 'warning',
                          title: 'View Cancelled For Sale order [' + data.invoiceNo + '] for amount Rs.' + self.state.subtotal1 + ' is Generated', // Message dialog  
                          showConfirmButton: false,
                          timer: 2000,
                        })
  
                        ReactDOM.render(
                          <Router>
                               <LastLocationProvider>
                            <div>
                                <Route path="/" component={SaleOrder1} />
                            </div>
                            </LastLocationProvider>
                          </Router>,
                          document.getElementById('contentRender'));
                        registerServiceWorker();
                      }
                    })
  
                    var today = new Date();
                    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  
  
  
  
                    //   self.state.invoiceNo = "";
                    self.state.orderNumber = "";
                    self.state.description = "";
                    self.state.rate = "";
                    self.state.quantity = "";
                    self.state.total = "";
                    self.state.cgsta = "";
                    self.state.sgsta = "";
                    self.state.igsta = "";
                    self.state.finalAmount = "";
                    self.state.payment_status = "UnPaid";
                    self.state.subtotal1 = 0;
                    self.state.totalgst = 0;
                    self.state.totalitemqty = 0;
                    self.state.discount = 0;
                    self.state.advance = "";
                    self.state.TotalWithoutGST = 0;
                    self.state.formValid = false;
                    self.state.formValid1 = false;
              
                    $("#tablecontents").empty();
                    $("#tableHeadings").hide();
                 
                    $('[name=productName]').val('');
                    $('[name=customerName]').val('');
                    $('#productName').html('');
                    $('#customerName').html('');
                    self.setState({
                      customerName: '',
                      //  invoiceNo: '',
                      orderNumber: '',
                      totalVisit: '',
                      invoiceDate: date,
                      dueDate: date,
                      description: '',
                      rate: '',
                      quantity: '',
                      total: '',
                      cgsta: '',
                      sgsta: '',
                      igsta: '',
                      finalAmount: '',
  
                      productName: '',
                      totalqty: '',
                      subtotal1: 0,
                      TotalWithoutGST: 0,
                      totalitemqty: 0,
                   
                      totalgst: 0,
                      balance_amount: '',
                      advance: '',
                      discount: 0,
                      balance: '',
                      saleSale: '',
                      purchaseSale: '',
                      payment_status: 'UnPaid',
                      formValid: false,
                      formValid1: false,
                      paymentMode: '',
                      selectedPaymentMode: '',
                      staffName: '',
  
  
                    });
  
                    subtotal_cgst = 0;
                    subtotal_igst = 0;
                    subtotal_sgst = 0;
                    //  self.GetInvoiceNo();
                    self.SelectCustomer();
                    //    self.handleCustomerDetails();
  
  
  
  
  
  
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
              if (this.state.paymentMode == "") {
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Kindly Select PaymentMode',
                  showConfirmButton: false,
                  timer: 2000
                })
              }
            }
          } else {
  
  
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Kindly Select Due Dates',
              showConfirmButton: false,
              timer: 2000
            })
          }
  
        }
        else {
  
  
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No items in Cart',
            showConfirmButton: false,
            timer: 2000
          })
        }
  
 
    
    
   // }
    // else {


    //   Swal.fire({
    //     position: 'center',
    //     icon: 'error',
    //     title: 'Kindly Select Customer Name',
    //     showConfirmButton: false,
    //     timer: 2000
    //   })
    // }
    var numtoword = numberToWord(Number(self.state.subtotal1));
    $("#numWords").text(Case.capital(numtoword));
  }

  ViewFunc() {
    ReactDOM.render(
      <Router >
        <div>
          <Route path="/" component={InvoiceList} />
        </div>
      </Router>, document.getElementById('contentRender'));
  }
  NoAction() {
    ReactDOM.render(
      <Router >
        <div>
          <Route path="/" component={SaleInvoiceInstant} />
        </div>
      </Router>, document.getElementById('contentRender'));
  }
  handleVehicleemptyFunc(){
    var self = this;
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    self.state.description = "";
    self.state.rate = "";
    self.state.quantity = 1;
    self.state.total = "";
    self.state.cgsta = "";
    self.state.sgsta = "";
    self.state.igsta = "";
    self.state.finalAmount = "";
    self.state.payment_status = "UnPaid";
    self.state.subtotal1 = 0;
    self.state.totalgst = 0;
    self.state.totalitemqty = 0;
    self.state.discount = 0;
    self.state.advance = "";
    self.state.TotalWithoutGST = 0;
    self.state.formValid = false;
    self.state.formValid1 = false;
    self.state.productName = "";
    self.state.selectedProductName="";
    self.state.selectedBookingId="";
    this.SelectProductB4Customer();
    this.selectProduct();
    $("#tablecontents").empty();
    $("#tableHeadings").hide();
 

    self.setState({

      //  invoiceNo: '',
    
      invoiceDate: date,
      dueDate: date,
      description: '',
      rate: '',
      quantity: 1,
      total: '',
      cgsta: '',
      sgsta: '',
      igsta: '',
      finalAmount: '',
     
      productName: '',
      totalqty: '',
      subtotal1: 0,
      TotalWithoutGST: 0,
      totalitemqty: 0,
      totalgst: 0,
      balance_amount: '',
      advance: '',
      discount: 0,
      balance: '',
      saleSale: '',
      purchaseSale: '',
      payment_status: 'UnPaid',
      formValid: false,
      formValid1: false,
      paymentMode: '',
      selectedPaymentMode: '',
      staffName: '',


    });
    var numtoword = numberToWord(Number(self.state.subtotal1));
    $("#numWords").text(Case.capital(numtoword));
    subtotal_cgst = 0;
    subtotal_igst = 0;
    subtotal_sgst = 0;
  }
  handleBookingemptyFunc(){
    var self = this;
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    self.state.description = "";
    self.state.rate = "";
    self.state.quantity = 1;
    self.state.total = "";
    self.state.cgsta = "";
    self.state.sgsta = "";
    self.state.igsta = "";
    self.state.finalAmount = "";
    self.state.payment_status = "UnPaid";
    self.state.subtotal1 = 0;
    self.state.totalgst = 0;
    self.state.totalitemqty = 0;
    self.state.discount = 0;
    self.state.advance = "";
    self.state.TotalWithoutGST = 0;
    self.state.formValid = false;
    self.state.formValid1 = false;
    self.state.productName = "";
    self.state.selectedProductName="";
    this.SelectProductB4Customer();
    this.selectProduct();
    $("#tablecontents").empty();
    $("#tableHeadings").hide();


    self.setState({

      //  invoiceNo: '',
    
      invoiceDate: date,
      dueDate: date,
      description: '',
      rate: '',
      quantity: 1,
      total: '',
      cgsta: '',
      sgsta: '',
      igsta: '',
      finalAmount: '',
     
      productName: '',
      totalqty: '',
      subtotal1: 0,
      TotalWithoutGST: 0,
      totalitemqty: 0,
      totalgst: 0,
      balance_amount: '',
      advance: '',
      discount: 0,
      balance: '',
      saleSale: '',
      purchaseSale: '',
      payment_status: 'UnPaid',
      formValid: false,
      formValid1: false,
      paymentMode: '',
      selectedPaymentMode: '',
      staffName: '',


    });
    var numtoword = numberToWord(Number(self.state.subtotal1));
    $("#numWords").text(Case.capital(numtoword));
    subtotal_cgst = 0;
    subtotal_igst = 0;
    subtotal_sgst = 0;
  }
  emptyFunc() {
    var self = this;
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    //   self.state.invoiceNo = "";
    self.state.orderNumber = "";
    self.state.description = "";
    self.state.rate = "";
    self.state.quantity = 1;
    self.state.total = "";
    self.state.cgsta = "";
    self.state.sgsta = "";
    self.state.igsta = "";
    self.state.finalAmount = "";
    self.state.payment_status = "UnPaid";
    self.state.subtotal1 = 0;
    self.state.totalgst = 0;
    self.state.totalitemqty = 0;
    self.state.discount = 0;
    self.state.advance = "";
    self.state.TotalWithoutGST = 0;
    self.state.formValid = false;
    self.state.formValid1 = false;
    self.state.productName = "";
    self.state.prefinalAmount="";
    self.state.discountAmount=0;
    self.state.discountPercentage=0;
    self.state.selectedProductName="";
    self.state.selectedBookingId="";
    this.SelectProductB4Customer();
    this.selectProduct();


    self.setState({

      //  invoiceNo: '',
      orderNumber: '',
      totalVisit: '',
      invoiceDate: date,
      dueDate: date,
      description: '',
      rate: '',
      quantity: 1,
      total: '',
      cgsta: '',
      sgsta: '',
      igsta: '',
      finalAmount: '',

      productName: '',
      totalqty: '',
      subtotal1: 0,
      TotalWithoutGST: 0,
      totalitemqty: 0,
      totalgst: 0,
      balance_amount: '',
      advance: '',
      discount: 0,
      balance: '',
      saleSale: '',
      purchaseSale: '',
      payment_status: 'UnPaid',
      formValid: false,
      formValid1: false,
      paymentMode: '',
      selectedPaymentMode: '',
      staffName: '',
      prefinalAmount:'',
      discountAmount:0,
      discountPercentage:0,


    });
    var numtoword = numberToWord(Number(self.state.subtotal1));
    $("#numWords").text(Case.capital(numtoword));
    subtotal_cgst = 0;
    subtotal_igst = 0;
    subtotal_sgst = 0;
  }
  AddToCart() {
    var self = this;

    $("#numWords").show();
    // if((this.state.customerName.length > 0)){
      if ((this.state.finalAmount != 0) && (this.state.cgsta.length != 0) && (this.state.sgsta.length != 0) && (this.state.igsta.length != 0)) {
        var currentproductvalue;
  
        this.AddToCartQuantityUpdate();
        self.selectProduct();
      
  
  
        //var tab = '<thead><tr class="headcolor" style="color: white; background-color: #486885; font-size: 12px;">  <th>ProductName</th><th>Size</th><th>Rate</th><th>Amount</th><th>Quantity</th><th>Total</th><th>cgst (%)</th><th>SGST (%)</th><th>IGST (%)</th><th>Final Amount</th></tr></thead>';
        this.state.subtotal1 = Math.round(Number(this.state.subtotal1) + (Number(this.state.finalAmount)));
  
        if (this.state.quantity != "-") {
          this.state.totalitemqty = Math.round(Number(this.state.totalitemqty) + Number(this.state.quantity));
        }
  
        this.state.totalgst = Math.round(Number(this.state.totalgst) + Math.round(Number(this.state.totalgst_rs)));
        this.state.TotalWithoutGST =(Number(this.state.TotalWithoutGST) + Number(this.state.prefinalAmount)).toFixed(2);
  
  
  
        subtotal_cgst = (Number(subtotal_cgst) + ((0.01 * Number(self.state.cgsta)) * Number(self.state.prefinalAmount))).toFixed(2);
        subtotal_sgst =( Number(subtotal_sgst) + ((0.01 * Number(self.state.sgsta)) * Number(self.state.prefinalAmount))).toFixed(2);
        subtotal_igst = (Number(subtotal_igst) + ((0.01 * Number(self.state.igsta)) * Number(self.state.prefinalAmount))).toFixed(2);
      
      
        var payament_status_details;
  
        count=Number(count)+1;
        if (self.state.productType == "product") {
          var tab = '<tr style={{backgroundColor: "white",fontColor:"black",fontWeight:"bold"}} id="tabletextcol" >'
          + '<td>' +self.state.productName+ '</td><td>' + self.state.rate + '</td>'
          + '<td>' + self.state.quantity + '</td><td>' + self.state.total + '</td>'
          +'<td>' + self.state.discountPercentage + '</td><td>' + self.state.discountAmount + '</td>'
          +'<td>' + self.state.prefinalAmount + '</td>'
          + '<td>' + self.state.cgsta + '</td><td>' + self.state.sgsta + '</td>'
          + '<td  id="Gstcal" >' + self.state.igsta + '</td>'
          + '<td  id="finalAmountcal" >' + self.state.finalAmount + '</td>'
          // + ' <td> ' + self.state.staffName + ' </td>'
          + '<td  class="heightWidth" >' + self.state.description + '</td>'
          + '<td  class="heightWidth" >' + self.state.productId + '</td>'
          + '<td class="producttype">' + self.state.productType + '</td>'
          +'<td width="auto">-</td>'
                 
          + '<td><button id="delete">Delete</button></td>'
          + '</tr>';
  
          $("#tableHeadings").append(tab);
      
        }else{
  
          var tab = '<tr style={{backgroundColor: "white",fontColor:"black",fontWeight:"bold"}} id="tabletextcol" >'
          + '<td>' +self.state.productName+ '</td><td>' + self.state.rate + '</td>'
          + '<td>' + self.state.quantity + '</td><td>' + self.state.total + '</td>'
          +'<td>' + self.state.discountPercentage + '</td><td>' + self.state.discountAmount + '</td>'
          +'<td>' + self.state.prefinalAmount + '</td>'
          + '<td>' + self.state.cgsta + '</td><td>' + self.state.sgsta + '</td>'
          + '<td  id="Gstcal" >' + self.state.igsta + '</td>'
          + '<td  id="finalAmountcal" >' + self.state.finalAmount + '</td>'
          // + ' <td> ' + self.state.staffName + ' </td>'
          + '<td  class="heightWidth" >' + self.state.description + '</td>'
          + '<td  class="heightWidth" >' + self.state.productId + '</td>'
          + '<td class="producttype">' + self.state.productType + '</td>'
          +'<td width="auto"><select id="staffName'+cartLength+'"  class="SelectOption" name="staffName3" ></select></td>'
                 
          + '<td><button id="delete">Delete</button></td>'
          + '</tr>';
        
       
          if(staffNameOption ===""){
           
       
            self.selectServiceBy(-1);
            cartLength=0;
           
          }
        
          $("#tableHeadings").append(tab);
          $("#staffName"+cartLength).append(staffNameOption);
          
          cartLength=cartLength+1;
        
       
  
        }
     
  
        $("#tableHeadings").show();
        $(".producttype").hide();
  
        $("#advance").bind('keydown', function (event) {
          if (event.keyCode === 13) {
            event.preventDefault();
            //  $("#saleinvoice").click();
          }
        });
  
        $("#discount").bind('keydown', function (event) {
          if (event.keyCode === 13) {
            event.preventDefault();
            //  $("#saleinvoice").click();
          }
        });
  
   
  
        self.state.description = "";
        self.state.rate = "";
        self.state.quantity = "";
        self.state.total = "";
        self.state.cgsta = "";
        self.state.sgsta = "";
        self.state.igsta = "";
        self.state.finalAmount = "";
        self.state.prefinalAmount="";
        self.state.discountAmount=0;
        self.state.discountPercentage=0;
        self.state.productId = "";
        self.state.selectedProductName = "";
        self.state.payment_status="UnPaid";
        //   self.state.TotalWithoutGST="";
        $('[name=productName]').val('');
        $("#quantity").show();
        $("#quantity1").show();
        $('[name=staffName]').val('');
        $("#total").show();
        $("#total1_Input").show();
        $("#total1").show();
        $("#quantity1_Input").show();
       // $("#paymentmodetd").show();
  
        self.setState({
  
          description: '',
          rate: '',
          amount: '',
          quantity: '',
          total: '',
          cgsta: '',
          sgsta: '',
          igsta: '',
          finalAmount: '',
          productName: '',
          productId: '',
          selectedProductName: '',
          TotalWithoutGST: this.state.TotalWithoutGST,
          totalgst: this.state.totalgst,
          totalitemqty: this.state.totalitemqty,
          balance_amount: this.state.subtotal1,
          discount: 0,
          advance: 0,
          staffName: '',
          payment_status:"UnPaid",
          discountAmount:0,
          discountPercentage:0,
          prefinalAmount:'',
  
        });
        advancebalance_calc = this.state.subtotal1;
  
        var numtoword = numberToWord(Number(self.state.subtotal1));
        $("#numWords").text(Case.capital(numtoword));
        $(".heightWidth").hide();
  
  
      } else {
  
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Select Product and Make sure rate is specified',
          showConfirmButton: false,
          timer: 2000
        })
      }
    // }else{
    //   Swal.fire({
    //     position: 'center',
    //     icon: 'error',
    //     title: 'Kindly Select Customer',
    //     showConfirmButton: false,
    //     timer: 2000
    //   })
    // }
 
  }







  DeleteButton() {


    var self = this;
 
    $("#tableHeadings").on('click', "#delete", function () {

      var currentRow = $(this).closest("tr");


      var productName_item_qty_rowcell = currentRow.find("td:eq(0)").html();
      var rate_item_qty_rowcell = currentRow.find("td:eq(1)").html(); // get current row 2nd table cell TD value

      var total_item_qty_rowcell = currentRow.find("td:eq(2)").html(); // get current row 2nd table cell TD value
      var TotalWithoutGST_rowcell = currentRow.find("td:eq(6)").html(); // get current row 2nd table cell TD value

      var cgst_item_qty_rowcell = currentRow.find("td:eq(7)").html(); // get current row 2nd table cell TD value
      var sgst_item_qty_rowcell = currentRow.find("td:eq(8)").html(); // get current row 2nd table cell TD value
      var igst_item_qty_rowcell = currentRow.find("td:eq(9)").html();
  

      var subtotalvaluedecrement = currentRow.find("td:eq(10)").html(); // get current row 2nd table cell TD value

if (total_item_qty_rowcell != "-") {
      self.DeleteQuantityUpdate(productName_item_qty_rowcell, total_item_qty_rowcell);

}

      self.state.TotalWithoutGST = Math.round(Number(self.state.TotalWithoutGST) - Number(TotalWithoutGST_rowcell));
      self.state.subtotal1 = Math.round(Number(self.state.subtotal1) - (Number(subtotalvaluedecrement)));

      if (total_item_qty_rowcell != "-") {
        self.state.totalitemqty = Math.round(Number(self.state.totalitemqty) - Number(total_item_qty_rowcell));
      }

      var In_rs_gst = Math.round(((Number(cgst_item_qty_rowcell) + Number(sgst_item_qty_rowcell) + Number(igst_item_qty_rowcell)) * 0.01) * Number(TotalWithoutGST_rowcell));
      self.state.totalgst = Math.round(Number(self.state.totalgst) - Number(In_rs_gst));

      subtotal_cgst = Math.round(Number(subtotal_cgst) - ((0.01 * Number(cgst_item_qty_rowcell)) * Number(TotalWithoutGST_rowcell)));
      subtotal_sgst = Math.round(Number(subtotal_sgst) - ((0.01 * Number(sgst_item_qty_rowcell)) * Number(TotalWithoutGST_rowcell)));
      subtotal_igst = Math.round(Number(subtotal_igst) - ((0.01 * Number(igst_item_qty_rowcell)) * Number(TotalWithoutGST_rowcell)));


      var cgst_item_qty_rowcell = Math.round((0.01 * (Number(cgst_item_qty_rowcell)) * Number(subtotalvaluedecrement)));
      var cgst_item_qty_rowcell_another = Math.round((0.01 * (Number(cgst_item_qty_rowcell)) * (subtotalvaluedecrement)));

     
      self.setState({
        subtotal1: self.state.subtotal1,
        TotalWithoutGST: self.state.TotalWithoutGST,
        totalitemqty: self.state.totalitemqty,
        totalgst: self.state.totalgst,
        advance: 0,
        discount: 0,
        balance_amount: self.state.subtotal1,
        payment_status: "UnPaid",
       
      });


      currentRow.remove();


      var subtotal1 = self.state.subtotal1;

      if (subtotal1 == 0) {
        $("#tableHeadings").hide();
      }
      var numtoword = numberToWord(Number(self.state.subtotal1));
      $("#numWords").text(Case.capital(numtoword));



    });
  }

  AddToCartQuantityUpdate() {

    var self = this;

    for (var k = 0; k < saleRateArray.length; k++) {
      var temp = JSON.parse(saleRateArray[k]);

      if (temp.productName == self.state.productName) {

        var productName = temp.productName;
        var rate = temp.rate;
        var description = temp.description;
        var cgsta = temp.cgsta;
        var sgsta = temp.sgsta;
        var igsta = temp.igsta;


        var productType = temp.productType;
        //  var quantity= temp.quantity;

        var quantity = Number(temp.quantity) - Number(self.state.quantity);

        var productId = temp.productId;
        var quantityLimit = temp.quantityLimit;


        saleRateArray.splice(k, 1);

        //INSERT NEW UPDATED QUANTITY INTO ARRAY
        var feed = JSON.stringify({
          productName: productName,
          rate: rate,
          description: description,
          cgsta: cgsta,
          sgsta: sgsta,
          igsta: igsta,

          productType: productType,
          quantity: quantity,
          quantityLimit: quantityLimit,
          productId: productId
        });
        saleRateArray.push(feed);

        if (Number(quantity) <= Number(quantityLimit)) {


          toaster.notify(<div><div style={{ color: "Red" }}>Stock Below Limit - {this.state.productName}</div>
            <div style={{ color: "Red" }}>Available Quantity - {quantity}</div></div>, {
            position: "top", // top-left, top, top-right, bottom-left, bottom, bottom-right
            duration: null, // This notification will not automatically close
          });

        }
        break;
      }

    }

  }


  DeleteQuantityUpdate(productName_item_qty_rowcell, total_item_qty_rowcell) {


    for (var k = 0; k < saleRateArray.length; k++) {
      var temp = JSON.parse(saleRateArray[k]);
     
    
      if (String(temp.productName )== String(productName_item_qty_rowcell)) {

        var productName = temp.productName;
        var rate = temp.rate;
        var description = temp.description;
        var cgsta = temp.cgsta;
        var sgsta = temp.sgsta;
        var igsta = temp.igsta;


        var productType = temp.productType;
        //  var quantity= temp.quantity;
        var quantity = Number(temp.quantity) + Number(total_item_qty_rowcell);
        var productId = temp.productId;
        var quantityLimit = temp.quantityLimit;


        saleRateArray.splice(k, 1);

        //INSERT NEW UPDATED QUANTITY INTO ARRAY
        var feed = JSON.stringify({
          productName: productName,
          rate: rate,
          description: description,
          cgsta: cgsta,
          sgsta: sgsta,
          igsta: igsta,

          productType: productType,
          quantity: quantity,
          quantityLimit: quantityLimit,
          productId: productId


        });
        saleRateArray.push(feed);
        this.selectProduct();
        break;
      }

    }

  }


  CancelFunc() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={VehicleRegistrationList} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
   
  }

  BackbtnFunc() {
    //   alert(this.state.backButtonVariable)
    var dirtyValue = "false";

    var finalRowCount = $('#tableHeadings tbody tr').length;

    if ((finalRowCount == 0)) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={InvoiceList} />
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
  ClearFunc() {
    var dirtyValue = "false";

    var finalRowCount = $('#tableHeadings tbody tr').length;

    if ((this.state.customerName.length == 0) && this.state.orderNumber.length == 0 && (finalRowCount == 0)) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={InvoiceList} />
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

          <Route path="/" component={DashboardOverall} />


        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }
  CancelBack() {



  }


  handlePaymentModeDetails = (e) => {
    const name = e.name;
    const value = e.value;
    this.state.paymentMode = value;

    this.setState({
      [name]: value,
      selectedPaymentMode: e,
      paymentModeValid: true
    });


  }

  ResponseCalculation(data) {

    var self = this;
    $("#tablecontents").empty();


    var tab = "";

    var subtotal_cgst = 0;
    var subtotal_sgst = 0;
    var subtotal_igst = 0;
    self.state.TotalWithoutGST = 0;
    self.state.totalgst = 0;
    self.state.subtotal1 = 0;
    self.state.totalitemqty = 0;


    $.each(data.responseListdata, function (i, item) {

      //CALCULATION FOR sale ROW


      if (item.productType == "service" || item.productType == "general" || item.productType == "labour") {
        self.state.total = item.rate;  //near quantity

      } else {
        self.state.total = Math.round(Number(item.rate) * Number(item.quantity));
      }

      self.state.finalAmount = Math.round(Number(self.state.total) + ((0.01 * Number(item.cgst)) * Number(self.state.total)) +
        (0.01 * Number(item.sgst) * Number(self.state.total)) + (0.01 * Number(item.igst) * Number(self.state.total)));

      self.state.totalgst_rs = Math.round(((0.01 * Number(item.cgst)) * Number(self.state.total)) +
        (0.01 * Number(item.sgst) * Number(self.state.total)) + (0.01 * Number(item.igst) * Number(self.state.total)));

      self.setState({
        total: self.state.total,
        finalAmount: self.state.finalAmount,
        totalgst_rs: self.state.totalgst_rs,
      });


      //CALCULATION FOR FINAL AMOUNTS
      self.state.subtotal1 = Math.round(Number(self.state.subtotal1) + (Number(self.state.finalAmount)));


      if (item.quantity != "-") {
        self.state.totalitemqty = Math.round(Number(self.state.totalitemqty) + Number(item.quantity));
      }

      self.state.totalgst = Math.round(Number(self.state.totalgst) + Math.round(Number(self.state.totalgst_rs)));
      self.state.TotalWithoutGST = Math.round(Number(self.state.TotalWithoutGST) + Number(self.state.total));


      subtotal_cgst = Math.round(Number(subtotal_cgst) + ((0.01 * Number(item.cgst)) * Number(self.state.total)));
      subtotal_sgst = Math.round(Number(subtotal_sgst) + ((0.01 * Number(item.sgst)) * Number(self.state.total)));
      subtotal_igst = Math.round(Number(subtotal_igst) + ((0.01 * Number(item.igst)) * Number(self.state.total)));

      self.setState({

        TotalWithoutGST: self.state.TotalWithoutGST,
        totalgst: self.state.totalgst,
        totalitemqty: self.state.totalitemqty,
        balance_amount: self.state.subtotal1,
        discount: 0,
        advance: 0,

      });


      tab += '<tr style={{backgroundColor: "white",fontColor:"black",fontWeight:"bold"}} id="tabletextcol" >'
        + '<td>'+item.productName+ ' </td><td>' + item.rate + '</td><td>' + item.quantity + '</td>'
        + '<td>' + self.state.total + '</td><td>' + self.state.discountPercentage + '</td><td>' + self.state.discountAmount + '</td>'
        +'<td>' + self.state.prefinalAmount + '</td><td>' + item.cgst + '</td><td>' + item.sgst + '</td>'
        + '<td  id="Gstcal" >' + item.igst + '</td><td  id="finalAmountcal" >' + self.state.finalAmount + '</td>'
        // + ' <td class="heightWidth" > ' + item.staffName + ' </td>'
        + '<td  class="heightWidth" >' + item.description + '</td><td  class="heightWidth" >' + item.productId + '</td>'
        + '<td class="producttype">' + item.productType + '</td>'
        +'<td>-</td>'
        + '<td><button id="delete">Delete</button></td></tr>';



    });

    // advancebalance_calc = self.state.subtotal1;

    var numtoword = numberToWord(Number(self.state.subtotal1));
    $("#numWords").text(Case.capital(numtoword));
    $(".heightWidth").hide();


    $("#tableHeadings").append(tab);
    $(".heightWidth").hide();
    $(".producttype").hide();

    var tabInfo = "";

    $("#insufficienttable").empty();
    $.each(data.responseListdataInfo, function (i, item) {

      tabInfo += '<tr style={{backgroundColor: "white",fontColor:"black",fontWeight:"bold"}} id="tabletextcol" >'
        + '<td>'+item.productName + '</td><td> - ' + item.quantity + '</td></tr>';


    })

    $("#insufficienttable").append(tabInfo);
    $("#insufficientdiv").show();


  }

  handleEmployeeDetails = (e) => {

    const name = e.name;
    const value = e.value;
    this.state.staffName = value;

    this.setState({
        [name]: value,
        selectedStaffName: e,

    });
}


AddJobFunc() {
  var self = this;
  var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
  this.state.companyId = companyId;
  this.setState({
      companyId: companyId,
  });



      if (this.state.staffName.length > 0) {
 
              $.ajax({
                  type: 'POST',
                  data: JSON.stringify({
                           staffName: this.state.staffName,
                      jobDescription: this.state.jobDescription,
                    
                      companyId: this.state.companyId,
                      staffId: this.state.staffId,
                      employeeName: this.state.employeeName,
                      role: this.state.role,
                   
                  }),
          //        url: " http://15.206.129.105:8080/ThroughBooksCOAPI/master/addjob",
                  contentType: "application/json",
                  dataType: 'json',
                  async: false,
                  success: function (data, textStatus, jqXHR) {


                      Swal.fire({
                          position: 'center',
                          icon: 'success',
                          title: 'Successfully Assigned Job to  ' + self.state.staffName,               // Message dialog 
                          showConfirmButton: false,
                          timer: 2000
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

       

      } else {
          Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Kindly Select StaffName',
              showConfirmButton: false,
              timer: 2000
          })
      }


  


}
vehicleRegistrationFunc() {
  ReactDOM.render(
    <Router>
      <div>

        <Route path="/" component={ServiceRegistration} />
      </div>
    </Router>,
    document.getElementById('contentRender'));
  registerServiceWorker();
}

handleChangeTwoe= (event) => {

  $(".toweclass").show();
  this.state.withTowe= event.target.checked ;
  this.setState({  [event.target.name]: event.target.checked });

  console.log("TWOE :",event," : ","eventTarget :",[event.target.name]," : ",event.target.checked  );

  if(event.target.checked==false){
    $(".toweclass").hide();
  }
}


  render() {
    return (


      <div class="container">
<div className="">
            <div className="">
              <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
            </div>
            <div className="inv_HeaderCls">
              <h3>Sale Invoice</h3>
            </div>
          </div>

 {/*<div className="">
        
        <Checkbox
            checked={this.state.withTowe}
            onChange={this.handleChangeTwoe}
            name="withTowe"  className="check_towebtn" color="primary" />WithTowe
       
            <div className="inv_HeaderCls">
<button type="button"  onClick={() => this.vehicleRegistrationFunc()}
             class="btn btn-default" style={{width:"75px"}} >
            <span class="glyphicon glyphicon-plus"></span>Intake</button> 
          </div>
          </div> */}

        <div class="">
         
 
          <div>
            {/* section 1.0 new frame */}
            {/* section 1 selction for bill */}
            <div className="row" style={{}} >
              <div className="col-lg-8" style={{ backgroundColor: "", }}>
                <div class="row" style={{ backgroundColor: "" }}>
                  <div class="col-xs-12 col-sm-4 col-lg-4 ">
                    <label class="control-label  " for="customerName">Customer Name</label>
                    <input type="text"  readOnly class="form-control" name="customerName" value={this.state.customerName} onChange={this.handleUserInput} id="customerName" placeholder="customerName" />

               

                  </div>
               {/*   <div class="col-xs-12 col-sm-4 col-lg-4 ">
                    <label class="control-label " for="vehicleRegistrationNo">Vehicle</label>
                    <input readOnly type="text" class="form-control" value={this.state.vehicleRegistrationNo} onChange={this.handleUserInput} name="vehicleRegistrationNo" id="vehicleRegistrationNo" />

                
                  </div>

                  <div class="col-xs-12 col-sm-4 col-lg-4 ">

                    <label class="control-label " for="bookingId">Booking Id</label>

             
<input readOnly type="text" class="form-control" value={this.state.bookingId} onChange={this.handleUserInput} name="bookingId" id="bookingId" />

                    


                  </div>
                  */}


                </div>

                <div class="row" style={{ backgroundColor: "" }}>
                  <div class="col-xs-12 col-sm-4 col-lg-4 ">
                    <label class="control-label " for="orderNumber">Order Number</label>
                    <input readOnly type="text" class="form-control" value={this.state.orderNumber} onChange={this.handleUserInput} name="orderNumber" id="orderNumber" />

                  </div>
                  <div class="col-xs-12 col-sm-4 col-lg-4 ">
                    <label class="control-label " for="invoiceDate">Invoice Date</label>
                    <input type="text" class="form-control" value={this.state.invoiceDate} id="invoiceDate" name="invoiceDate"
                      onChange={this.handleUserInput} />
                  </div>
        
        
                  <div class="col-xs-12 col-sm-4 col-lg-4 ">
                    <label class="control-label " for="dueDate">Due Date</label>
                    <input type="text" class="form-control" value={this.state.dueDate} id="dueDate" name="dueDate"
                      onChange={this.handleUserInput} />
                  </div>

                </div>

                   <div class="row toweclass" style={{ backgroundColor: "" }}>
                  <div class="col-xs-12 col-sm-4 col-lg-4 ">
                    <label class="control-label " for="orderNumber">From</label>
                    <input type="text" class="form-control" value={this.state.fromAddress} onChange={this.handleUserInput} 
                    name="fromAddress" id="fromAddress"  maxlength="150" size='150'/>

                  </div>
                  <div class="col-xs-12 col-sm-4 col-lg-4 ">
                    <label class="control-label " for="invoiceDate">To</label>
                    <input type="text" class="form-control" value={this.state.toAddress} 
                    id="toAddress" name="toAddress"
                      onChange={this.handleUserInput}  maxlength="150" size='150' />
                  </div>
                  <div class="col-xs-12 col-sm-4 col-lg-4 ">
                    <label class="control-label " for="dueDate">Remark</label>
                    <input type="text" class="form-control" value={this.state.remark} id="remark" name="remark"
                      onChange={this.handleUserInput}  maxlength="150" size='150'/>
                  </div>

                </div>
             

                 <div class="row toweclass" style={{ backgroundColor: "" }}>
                  <div class="col-xs-12 col-sm-4 col-lg-4 ">
                    <label class="control-label " for="orderNumber">Dealer</label>
                    <input type="text" class="form-control" value={this.state.dealer} onChange={this.handleUserInput} 
                    name="dealer" id="dealer"  maxlength="150" size='150'/>

                  </div>
                  <div class="col-xs-12 col-sm-4 col-lg-4 ">
                   
                  </div>
                  <div class="col-xs-12 col-sm-4 col-lg-4 ">
                 
                  </div>

                </div>
             
             
               <div class="row" style={{ backgroundColor: "" }}>

                  <div class="col-xs-12 col-sm-4 col-lg-4 ">
                    <label class="control-label selectpicker " for="customerName">Product/Service</label>
                    <SelectSearch options={this.state.options} value={this.state.selectedProductName} id="productName"
                      onChange={(e) => this.handleProductDetails(e)} name="productName" placeholder="Select Product " />

                    <a href="#myModal1" data-toggle="modal" data-target="#myModal1" >
                      <span
                        style={{
                          color: "blue"
                        }}> Add Product</span>
                    </a>
                  </div>
                  <div class="col-xs-12 col-sm-4 col-lg-4 ">
                    <label class="control-label selectpicker" id="quantity" for="customerName">Quantity</label>
                    <input type="number" min="1"
                      class="form-control" value={this.state.quantity}
                      onChange={this.handleUserQuantity} name="quantity" id="quantity1_Input" />
                    <span id="quantityalertmsg" style={{ color: "red" }}></span>
                  </div>

                  <div class="col-xs-12 col-sm-2 col-lg-2 ">
                    <label>
                      <button type="button" onClick={() => this.AddToCart()} style={{ marginTop: "30px" }} class="btn btn-default pull-right">AddToCart</button> <span></span>
                    </label>

                  </div>
                  <div class="col-xs-12 col-sm-2 col-lg-2 ">

                    <label>

                      <button onClick={() => this.CancelFunc()} type="button" style={{ marginTop: "30px" }} class="btn btn-default pull-right ">Clear</button> <span></span>
                    </label>
                  </div>

                </div>


                <div class="">
                  <form class="form-horizontal form-bordered">

                    <div class="table-responsive">
                      <table class="table" style={{ marginBottom: "0px" }}>
                        <thead>
                          <tr>
                            <th>Rate</th>                          
                            <th id="total1">Total</th>
                            <th >Discount(%)</th>
                          <th >Discount$</th>
                 
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><input class="col-sm-3" type="text"
                              class="form-control" value={this.state.rate}
                              onChange={this.handleUserHeightWidth} name="rate" id="rate" />
                            </td>

                            <td id="total_Input"><input type="text" readOnly
                              class="form-control" value={this.state.total}
                              onChange={this.handleUserHeightWidth} name="total" id="total" />
                            </td>

                            <td><input type="number" class="form-control" value={this.state.discountPercentage}  onChange={this.handlecgstSgstIgst} name="discountPercentage" id="discountPercentage" autocomplete="off"/>
                          </td>                          
                          <td><input type="number" class="form-control" value={this.state.discountAmount} onChange={this.handlediscountAmount} name="discountAmount" id="discountAmount" autocomplete="off"/>
                            </td>
                          
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div class="table-responsive">
                      <table class="table" style={{ marginBottom: "0px" }}>
                        <thead>
                          <tr>
                        
                          <th >SubTotal</th>
                            <th>cgst(%)</th>
                            <th>SGST(%)</th>
                            <th>Final Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                          
                            <td><input type="number" readOnly class="form-control" value={this.state.prefinalAmount} onChange={this.handlecgstSgstIgst} name="prefinalAmount" id="prefinalAmount" autocomplete="off"/>
                            </td>
                            <td>
                              <td><input type="number" class="form-control" value={this.state.cgsta} onChange={this.handlecgstSgstIgst} name="cgsta" id="cgsta" autocomplete="off" />
                              </td>
                            </td>
                            <td>
                              <input type="number" class="form-control" value={this.state.sgsta} onChange={this.handlecgstSgstIgst} name="sgsta" id="sgsta" autocomplete="off" />
                            </td>
                            <td>
                              <input type="text" readOnly class="form-control"
                                value={this.state.finalAmount} onChange={this.handleUserHeightWidth}
                                name="finalAmount " id="finalAmount " />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* section 1 end */}
                    <div id="insufficientdiv">
                      <span>Insufficient Quantity For The Products</span>
                      <table id="insufficienttable">
                      </table>
                      <span style={{ color: "red" }}>**Cart Is Updated With Available Quantity </span>
                    </div>
                    {/* section 2 table for selected products */}
                    <div id="tableOverflow" style={{ overflow: "auto" }}>
                      <table class="table" id="tableHeadings">
                        <thead>
                          <tr>
                            <th>ProductName</th>
                            <th>Rate</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th >Discount(%)</th>
                          <th >Discount$</th>
                          <th >SubTotal</th>
                            <th>cgst (%)</th>
                            <th>SGST (%)</th>
                            <th>IGST (%)</th>
                            <th>Final Amount</th>
                            <th>Staff Name</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody id="tablecontents" style={{ backgroundColor: "white" }}></tbody>
                      </table>
                    </div>
                

                    {/*///// section 2 end*/}
                  </form>
                </div>
              </div>
              <div className="col-lg-4" style={{ borderRadius: "30px", backgroundColor: "rgba(202, 198, 198, 0.19)", border: "1px #423b3882 solid" }}>
                {/* section 3 grand total calculation */}
                <div className="row">
                  <div class="form-group">
                    {/*  <div class="col-sm-6">
          <p class="lead">Total Qty: {this.state.totalitemqty} <span name="totalitemqty" id="totalitemqty"></span></p>
          <p class="lead">Amount In Words:  <span id="numWords"></span> Dollar Only</p>
padding-top: 30px;
}
         </div> */}
                    <div class="">
                      <div class="table-responsive">
                        <table class="table" style={{ borderTop: "none", marginTop: "20px" }} >
                          <tbody>
                            <tr><th style={{ width: "50%", borderTop: "none" }}>TotalWithoutGST$:</th>
                              <td style={{ borderTop: "none", width: "175%" }}><input name="TotalWithoutGST" readOnly type="text" value={this.state.TotalWithoutGST} id="TotalWithoutGST" class="form-control" />{/* $ <span id="subtotal"></span> */}</td>
                              <input type="hidden" name="TotalWithoutGST" id="TotalWithoutGST" /> </tr>
                            <tr><th style={{ width: "50%", borderTop: "none" }}>Total GST$</th>
                              <td style={{ borderTop: "none" }}><input name="totalgst" readOnly type="text" value={this.state.totalgst} id="totalgst" class="form-control" />{/* $ <span id="subtotal"></span> */}</td>
                              <input type="hidden" name="totalgst" id="totalgst" />
                              {/*  <td> $ {this.state.totalgst} <span id="tgst"></span></td>*/}
                            </tr>
                            <tr><th style={{ width: "50%", borderTop: "none" }}>NetAmount$:</th>
                              <td style={{ borderTop: "none" }}><input name="subtotal" readOnly type="text" value={this.state.subtotal1} id="subtotal" class="form-control" />{/* $ <span id="subtotal"></span> */}</td>
                              <input type="hidden" name="subtotal1" id="subtotal1" /> </tr>

                     

                            <tr><th style={{ width: "50%", borderTop: "none" }}>Discount$:</th>
                              <td style={{ borderTop: "none" }}>
                                <input name="discount" type="text" id="discount"
                                  value={this.state.discount}
                                  onChange={this.DiscountCalc} class="form-control discount" /></td>
                            </tr>


                            <tr><th style={{ width: "50%", borderTop: "none" }}>Amount Paid$:</th>
                              <td style={{ borderTop: "none" }}>
                                <input name="advance" type="text" id="advance"
                                  value={this.state.advance}
                                  onChange={this.AdvanceCalc} class="form-control advance" /></td>
                            </tr>

                            <tr> <th style={{ width: "50%", borderTop: "none" }}>Balance Amount$:</th>
                              <td style={{ borderTop: "none" }} name="balance" class="grand_total" >$ {this.state.balance_amount} <span id="total"></span></td>
                            </tr>
                            <tr> <th style={{ width: "50%", borderTop: "none" }}>Select Advisor:</th>
                              <td style={{ borderTop: "none" }} >
                              <select id="advisor" className="form-control" onChange={this.handleUserInput} name="advisor" >
                  </select>
                              </td>
                            </tr>
                            <tr> <th style={{ width: "50%", borderTop: "none" }}>Total Parts Qty:</th>
                              <td style={{ borderTop: "none" }} name="" class="" > {this.state.totalitemqty} </td>
                            </tr>
                            <tr> <th style={{ width: "50%", borderTop: "none" }}>Net Amount In Words:</th>
                              <td style={{ borderTop: "none" }} name="" class="" > <span id="numWords"></span> Dollar Only </td>
                            </tr>
                            <tr> <th style={{ width: "50%", borderTop: "none" }}>Payment Status:</th>
                              <td style={{ borderTop: "none" }} name="payment_status" class="grand_total" >$ {this.state.payment_status} <span id="payment_status"></span></td>
                            </tr>
                            <tr id="paymentmodetd"><th style={{ borderTop: "none" }}>Payment Mode</th>
                              <td style={{ borderTop: "none" }} >
                                <SelectSearch options={this.state.paymentoptions} value={this.state.selectedPaymentMode}
                                  onChange={(e) => this.handlePaymentModeDetails(e)} name="paymentMode" placeholder="Select Payment Mode " />
                              </td>
                            </tr>
                            <tr > <th style={{ borderTop: "none", textAlign: "right" }}>
                              <td style={{ borderTop: "none" }}>
                                <input type="checkbox" class="CheckBoxClass" name="sms" value="sms" onChange={this.handleUserInput} id="defaultUnchecked" />
                                <label class="custom-control-label" for="defaultUnchecked"> SMS</label>
                              </td></th><td style={{ borderTop: "none" }}>
                                <input type="checkbox" class="CheckBoxClass" name="emailoption" onChange={this.handleUserInput} value="emailoption" id="defaultUnchecked" />
                                <label class="custom-control-label" for="defaultUnchecked"> Email</label></td>


                            </tr>
                            {/* <tr > <th style={{ borderTop: "none" }}></th>
                              <td style={{ borderTop: "none" }}>
                                <input type="checkbox" class="CheckBoxClass" name="emailoption" onChange={this.handleUserInput} value="emailoption" id="defaultUnchecked" />
                                <label class="custom-control-label" for="defaultUnchecked"> Email</label></td>
                            </tr> */}
                            <tr>
                              <td style={{ borderTop: "none" }}>
                                <button type="button" onClick={() => this.SaleInvoiceFunc()} style={{ marginRight: "5px" }} class="btn btn-default pull-right">SaveInvoice</button> <span></span>
                              </td>
                              <td style={{ borderTop: "none", marginRight: "-24px" }}>
                                <button onClick={() => this.ClearFunc()} type="button" class="btn btn-default ">Cancel</button>
                              </td>
                              {/* <td style={{ borderTop: "none" }}> <button onClick={() => this.CancelFunc()} type="button" class="btn btn-default ">Clear</button>
                              </td> */}
                            </tr>
                          </tbody>
                        </table></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* row ends */}
            </div>
          </div>
        </div>
     
        <div style={{ position: " ", zIndex: "0" }}>
          <div class="modal fade" id="myModal1" data-backdrop="false"  >
            <div class="modal-dialog">

              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" style={{ align: "center", display: "contents" }}>Add Product</h4>
                  <button type="button" onClick={() => this.closeFunc1()} class="close" data-dismiss="modal">&times;</button>

                </div>
                <div class="modal-body" >
                  <div class="form-body">
                    <div style={{ color: "red" }} className="panel panel-default">
                      <FormErrors style={{ color: "red" }} formErrors={this.state.formErrors} />
                    </div>

                    <form class="form-horizontal form-bordered" name="submissions">
                      <div className={`form-group ${this.errorClass1(this.state.formErrors.modalproductName)}`}>
                        <label class="control-label col-sm-2 remove" for="modalproductName">Product Name<span style={{ color: "red" }}>*</span></label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" value={this.state.modalproductName} onChange={this.handleUserInputProduct} name="modalproductName" id="modalproductName" placeholder="Product Name" />
                        </div>
                      </div>
                      <div className={`form-group ${this.errorClass1(this.state.formErrors.modalproductType)}`}>
                        <label class="control-label col-sm-2 " for="modalproductType">Product Type<span style={{ color: "red" }}>*</span></label>
                        <div class=" col-sm-10">
                          <select name="modalproductType" id="modalproductType" onChange={this.handleUserInputProductType} class="form-control">
                            <option disabled selected hidden value="">--Select--</option>
                            <option value="product">Parts</option>
                            <option value="service">Service</option>
                            {/* <option value="general">General</option>
                            <option value="labour">Labour</option> */}

                          </select>
                        </div>
                      </div>
                      <div id="productCategory1" className={`form-group ${this.errorClass1(this.state.formErrors.modalproductCategory)}`}>
                        <label class="control-label col-sm-2 " for="modalproductCategory">Quantity Config<span style={{ color: "red" }}>*</span></label>
                        <div class="col-sm-10">
                          <select name="modalproductCategory" id="modalproductCategory" onChange={this.handleUserInputProductCategory} class="form-control">
                            <option disabled selected hidden value="">--Select--</option>
                            <option value="Own">Add quantity mannually</option>
                    <option value="Purchase">Add quantity on purchase invoice</option>
                          </select>

                        </div>
                      </div>
                      <div className="form-group " id="quantity2">
                        <label class="control-label col-sm-2" for="modalquantity"> Quantity<span style={{ color: "red" }}>*</span></label>
                        <div class=" col-sm-10">
                          <input type="number" min="0" class="form-control" value={this.state.modalquantity} onChange={this.handleUserInputProduct} name="modalquantity" id="modalquantity" placeholder="Quantity...  " />

                        </div>
                      </div>

                      <div class="form-group" id="quantityLimit2">
                        <label class="control-label col-sm-2 remove" for="modalquantityLimit">Quantity Limit<span style={{ color: "red" }}>*</span></label>
                        <div class=" col-sm-10">
                          <input type="number" min="0" class="form-control" value={this.state.modalquantityLimit} onChange={this.handleUserInputProduct} name="modalquantityLimit" id="modalquantityLimit" placeholder="Quantity alert limit...  " />
                        </div>
                        <label class="control-label col-sm-2 remove" for="modalquantityLimit"></label>
                        <div class=" col-sm-10">
                          <span style={{ color: "red" }}>*Enter quantity when you want an alert ?</span>
                        </div>
                      </div>


                      <div class="form-group">
                        <label class="control-label col-sm-2">cgst(%)</label>
                        <div class="col-sm-10">

                          <input type="number" min="0" class="form-control" value={this.state.modalcgst} onChange={this.handleUserInputProduct} name="modalcgst" id="modalcgst" placeholder="cgst...  " />


                        </div>
                      </div>
                      <div class="form-group">
                        <label class="control-label col-sm-2">SGST(%)</label>
                        <div class="col-sm-10">
                          <input type="number" min="0" class="form-control" value={this.state.modalsgst} onChange={this.handleUserInputProduct} name="modalsgst" id="modalsgst" placeholder="SGST...  " />

                        </div>
                      </div>

                      <div class="form-group">
                        <label class="control-label col-sm-2">IGST(%)</label>
                        <div class="col-sm-10">
                          <input type="number" min="0" class="form-control" value={this.state.modaligst} onChange={this.handleUserInputProduct} name="modaligst" id="modaligst" placeholder="IGST...  " />

                        </div>
                      </div>
                      <div class="form-group">
                        <label class="control-label col-sm-2" for="modalhsnCode"> HSN Code</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" value={this.state.modalhsnCode} onChange={this.handleUserInputProduct} name="modalhsnCode" id="modalhsnCode" placeholder="HSN Code" />
                        </div>
                      </div>
                      <div className={`form-group ${this.errorClass1(this.state.formErrors.modalsaleRate)}`}>
                        <label class="control-label col-sm-2" for="modalsaleRate"> Sale Rate $<span style={{ color: "red" }}>*</span></label>
                        <div class="col-sm-10">
                          <input type="number" min="0" class="form-control" value={this.state.modalsaleRate} onChange={this.handleUserInputProduct} name="modalsaleRate" id="modalsaleRate" placeholder="saleRate...  " />
                        </div>
                      </div>

                      <div id="purchaseRate1" className={`form-group ${this.errorClass1(this.state.formErrors.modalpurchaseRate)}`}>
                        <label class="control-label col-sm-2" for="modalpurchaseRate"> Purchase Rate $<span style={{ color: "red" }}>*</span></label>
                        <div class="col-sm-10">
                          <input type="number" min="0" class="form-control" value={this.state.modalpurchaseRate} onChange={this.handleUserInputProduct} name="modalpurchaseRate" id="modalpurchaseRate" placeholder="purchaseRate..  " />
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="control-label col-sm-2 remove" for="modaldescription">description</label>
                        <div class="col-sm-10">
                          <textarea rows="2" cols="20" class="form-control" value={this.state.modaldescription} onChange={this.handleUserInputProduct} name="modaldescription" id="modaldescription" > </textarea>
                        </div>
                      </div>

                      <div class="modal-footer">
                        <div class="form-group">
                          <div class="row" style={{ marginLeft: "2px" }}>
                            <div class="col-sm-offset-4 col-sm-8">
                              <button style={{ fontWeight: "bold" }} type="button" disabled={!this.state.formValid1} onClick={() => this.AddProductFunc()} class="btn btn-primary">Submit</button> <span></span>
                              <button style={{ fontWeight: "bold" }} type="button" onClick={() => this.ClearProductFunc()} class="btn btn-primary">Clear</button>

                            </div>
                          </div>
                        </div></div>
                    </form>
                  </div>


                </div>
              </div>

            </div>

          </div>

          <div className='main'>
            <Notifications />
            ...
        </div>


          <div>
            <ToastsContainer store={ToastsStore} />
          </div>



        </div>


      </div>
    );
  }
}

export default SaleInvoiceInstant;