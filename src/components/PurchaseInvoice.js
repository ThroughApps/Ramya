import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import VendorEntryForm from './VendorEntryForm';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import { FormErrors } from './FormErrors';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';

import './datepicker.css';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import Case from "case";
import CryptoJS from 'crypto-js';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import PurchaseInvoiceList from './PurchaseInvoiceList';
import SelectSearch from 'react-select';
import AddProduct from './AddProduct';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
//import { GetEmployeeSite,GetCurrentSite  } from './ConstSiteFunction';
import ServiceRegistration from './ServiceRegistration/ServiceRegistration';	
import {Double_BackButtonComponent} from'./ServiceRegistration/ButtonComponent';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
  GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
 import convert_to_words from '@amirsanni/number-to-words';
 import _ from 'underscore';

var numberToWord = require('npm-number-to-word');

var inputarray = [];
var testarray = [];
var vendorarray = [];
var rougharray = [];
var tablecontentarray = [];
var insertarray = [];
var advancebalance_calc;
var subtotal_cgst = 0;
var subtotal_sgst = 0;
var subtotal_igst = 0;

class PurchaseInvoice1 extends Component {

  getInitialState() {
    return { height: '' }
  }
  constructor(data) {
    super(data)
    window.PurchaseInvoiceComponent = this;
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
   
   
    
    this.state = {
      date: date,
      modalproductName: '',
      modalproductCategory: '',
      modalproductType:'',
      modalquantity:0,
      modalquantityLimit:0,
      modalcgst: 0,
      modalsgst: 0,
      modaligst: 0,
      modalhsnCode: '',
      modalpurchaseRate: '',
      modalsaleRate: '',
      modaldescription: '',
      staffId:staffId,
 employeeName:employeeName,
role:role,
    //  selectedVendorName:'',
      vendorName: '',
      contactNo: '',
      invoiceNo: '',
      orderNumber: '',
      invoiceDate: date,
      dueDate: date,
     
      productName: 'Miscellaneous',
      vendorId: '',
      cartData:'Empty',
      currencyCode:'',
      currencySymbol:'',
      
      description: '',
      companyId: companyId,
      sms:'',
      emailoption:'',
      address: '',
      email: '',
      gstNo: '',    
      rate: '',     
      quantity: '1',
      total: '',
      cgsta: '',
      sgsta: '',
      igsta: '',
      discountAmount:0,
      discountPercentage:0,
      prefinalAmount:0,
      invoiceData: '',
      finalAmount: 0,
      totalqty: '',
      subtotal1: 0,
      totalitemqty: 0,
      TotalWithoutGST: 0,
      totalgst: 0,
      balance_amount: '',
      adjustment: 0,
      discount: 0,
      shipping: 0,
      saleSale: '',
      purchaseSale: '',
      payment_status: 'UnPaid',
      modalVendorName: '',
      modalContactNo: '',
      options: [],
      formErrors: {
        modalVendorName: '',        
        modalContactNo: '',
        modalproductName:'',
        modalpurchaseRate:'',
        modalsaleRate:'',
        modalproductType:'',
        modalproductCategory: '',
      },
      modalVendorNameValid: false,
      modalContactNoValid: false,
      modalpurchaseRateValid:false,
      modalsaleRateValid:false,
      modalproductNameValid:false,
      modalproductTypeValid:false,
      modalproductCategoryValid:false,

    }
    this.setState({
      date: date,

    })

    // window.PurchaseInvoice1 = this;

    this.CurrencyFormat=this.CurrencyFormat.bind(this);
    this.PurchaseInvoice_CurrencyChange=PurchaseInvoice_CurrencyChange.bind(this);


  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let modalVendorNameValid = this.state.modalVendorNameValid;
    let modalContactNoValid = this.state.modalContactNoValid;
  
    switch (fieldName) {
      case 'modalVendorName':
        modalVendorNameValid = value.match(/^([a-zA-Z]+)([a-zA-Z ])*$/);
        fieldValidationErrors.VendorName = modalVendorNameValid ? '' : ' is InCorrect';
        break;

      case 'modalContactNo':
        modalContactNoValid = value.match(/^[0-9]{10}$/);
        fieldValidationErrors.ContactNo = modalContactNoValid ? '' : ' is InCorrect';
        break;

      
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      modalVendorNameValid: modalVendorNameValid,
      modalContactNoValid: modalContactNoValid,
    

    }, this.validateForm);
  }
  validateForm() {

    this.setState({
      formValid:
        this.state.modalVendorNameValid
        && this.state.modalContactNoValid


    });
  }
  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
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
 
      modalproductNameValid:modalproductNameValid,
      modalsaleRateValid:modalsaleRateValid,
      modalpurchaseRateValid:modalpurchaseRateValid,
      modalproductCategoryValid:modalproductCategoryValid,
      modalproductTypeValid:modalproductTypeValid,

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

    if (value == "service" || value == "general" || value == "labour" ) {
      $("#quantity2").hide();
      $("#quantityLimit2").hide();
    }
    else if (value == "product" && this.state.modalproductCategory == "Purchase") {
      $("#quantity2").hide();
      $("#quantityLimit2").show();
    }
    else if (value == "product" && this.state.modalproductCategory == "Own") {

      $("#quantity2").show();
      $("#quantityLimit2").show();
    }

    this.setState({ [name]: value },
      () => { this.validateField1(name, value) });



  }

  handleUserInputProductCategory = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.state.modalquantity = 0;
    this.state.modalquantityLimit = 0;

    if (this.state.modalproductType == "service" || this.state.modalproductType == "general"|| this.state.modalproductType == "labour") {
      $("#quantity2").hide();
      $("#quantityLimit2").hide();
    }
    else if (this.state.modalproductType == "product" && value == "Purchase") {
      $("#quantity2").hide();
      $("#quantityLimit2").show();
    }
    else if (this.state.modalproductType == "product" && value == "Own") {

      $("#quantity2").show();
      $("#quantityLimit2").show();
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
    if (this.state.modalproductType == "service" ||this.state.modalproductType == "general"||this.state.modalproductType == "labour" ) {

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
              ReactDOM.render(
                <Router >
                  <div>
                    <Route path="/" component={PurchaseInvoice1} />
                  </div>
                </Router>, document.getElementById('contentRender'));
              self.SelectVendor();
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
              self.SelectVendor();
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
    );
    
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
        // alert("SIGN VALUE :"+sign_data);
        if (sign_data != -1) {

          cleanNum = value1.match(/^\d+\.?\d{0,2}/);
          /*this.state[name] = cleanNum;
          this.setState({ [name]: cleanNum });
          */
          if (value == "0") {
            alert("Value Cant Be Zero");
          }
          else {
            this.state[name] = cleanNum;
            this.setState({ [name]: cleanNum });
            this.handleUserHeightWidthComplete();
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

      // self.setState({
      //   discountAmount:self.state.discountAmount,
      //   discountPercentage:self.state.discountPercentage,
      // })
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

  handleUserHeightWidthComplete() {

    var self = this;

    if(this.state.productType=="service" ||this.state.productType=="general"||this.state.productType=="labour"){
      self.state.total=self.state.rate;

    }else{
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


  AdjustmentShippingCalc = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    var state_value = 0;
    var value1 = value;

    if (value1 != "") {
      var isNumberDt = $.isNumeric(value1);
      if (isNumberDt !== false) {
        var sign_data = Math.sign(value1);
        // alert("SIGN VALUE :"+sign_data);
        if (sign_data != -1) {

          var decimal_data = (value1 - Math.floor(value1)) !== 0;
          // alert("DECIMAL DATA :"+decimal_data);
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
          /* confirmAlert({
                 title: 'Error',                        // Title dialog
                 message: 'Negative Values Not Accepted',               // Message dialog
                 confirmLabel: 'Ok',                           // Text button confirm
             }); */
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
        // alert("NO NUMBER FOR CHAR");
      }

    } else {
      this.state[name] = 0;
      this.setState({ [name]: 0 });

      //   alert("NO NUMBER FOR EMPTY STRING ");
    }


    if (isNumberDt != false && sign_data != -1 && decimal_data != true) {

      state_value = value1;
      //  this.AdjustmentShippingCalcComplete(state_value,name);

      this.state[name] = state_value;

      var total = Math.round(Number(this.state.subtotal1) + Number(this.state.adjustment) + Number(this.state.shipping));

      this.state.finalAmountTotal = total;
      this.setState({
      //  name: state_value,
        finalAmountTotal: total,
        discount:0,
      })
      var numtoword = numberToWord(Number(this.state.finalAmountTotal));
      $("#numWords").text(Case.capital(numtoword));

    } else {
      state_value = 0;
      // this.AdjustmentShippingCalcComplete(state_value,name);

      this.state[name] = state_value;

      var total = Math.round(Number(this.state.subtotal1) + Number(this.state.adjustment) + Number(this.state.shipping));

      this.state.finalAmountTotal = total;
      this.setState({
      //  name: state_value,
        finalAmountTotal: total,
        discount:0,
      })
      var numtoword = numberToWord(Number(this.state.finalAmountTotal));
      $("#numWords").text(Case.capital(numtoword));

    }

  }

  DiscountCalc = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    var state_value = 0;
    var value1 = value;

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
          /* confirmAlert({
                 title: 'Error',                        // Title dialog
                 message: 'Negative Values Not Accepted',               // Message dialog
                 confirmLabel: 'Ok',                           // Text button confirm
             }); */
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
      this.state[name] = '';
      this.setState({ [name]: '' });

      //   alert("NO NUMBER FOR EMPTY STRING ");
    }


    if (isNumberDt != false && sign_data != -1 && decimal_data != true) {

      state_value = value1;
      this.state[name] = state_value;
      var sum = Math.round(Number(this.state.subtotal1) + Number(this.state.adjustment) + Number(this.state.shipping));

      if (value > sum) {
        alert("Exceeds Balance" + value);
        state_value = 0;
        this.state.discount = state_value;
        this.state.finalAmountTotal = Math.round(Number(sum) - Number(this.state.discount));

        this.setState({
          discount: state_value,
          finalAmountTotal: this.state.finalAmountTotal,
        })

        var numtoword = numberToWord(Number(this.state.finalAmountTotal));

        $("#numWords").text(Case.capital(numtoword));

      } else {
        this.state.discount = value;
        this.state.finalAmountTotal = Math.round(Number(sum) - Number(this.state.discount));

        this.setState({
          discount: state_value,
          finalAmountTotal: this.state.finalAmountTotal,
        })
      }
      var numtoword = numberToWord(Number(this.state.finalAmountTotal));

      $("#numWords").text(Case.capital(numtoword));




    } else {
      state_value = 0;
      this.state[name] = state_value;
      var sum = Math.round(Number(this.state.subtotal1) + Number(this.state.adjustment) + Number(this.state.shipping));

      if (value > sum) {
        alert("Exceeds Balance" + value);
        this.state.discount = state_value;
        this.state.finalAmountTotal = Math.round(Number(sum) - Number(this.state.discount));

        this.setState({
          discount: state_value,
          finalAmountTotal: this.state.finalAmountTotal,
        })

        var numtoword = numberToWord(Number(this.state.finalAmountTotal));

        $("#numWords").text(Case.capital(numtoword));

      } else {
        this.state.discount = state_value;
        this.state.finalAmountTotal = Math.round(Number(sum) - Number(this.state.discount));

        this.setState({
          discount: state_value,
          finalAmountTotal: this.state.finalAmountTotal,
        })
      }
      var numtoword = numberToWord(Number(this.state.finalAmountTotal));

      $("#numWords").text(Case.capital(numtoword));

    }

  }


  handleVendorDetails = (e) => {
    const name = e.name;
    const value = e.value;
    this.state.vendorId = value;

    rougharray.push(this.state.vendorId);
  

    this.setState({
      [name]: value,
      selectedVendorName: e,
      vendorNameValid: true
    });

    var self = this;
    for (var k = 0; k < vendorarray.length; k++) {
      var temp = JSON.parse(vendorarray[k]);
     
      if (temp.vendorId == this.state.vendorId) {

        self.state.orderNumber = temp.orderNumber + 1;
        self.state.vendorId = temp.vendorId;
        self.state.contactNo = temp.contactNo;
        self.state.vendorName = temp.vendorName;
        self.state.address = temp.address;
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
          vendorId: self.state.vendorId,
          contactNo: self.state.contactNo,
          companyName: self.state.companyName,
          vendorName: self.state.vendorName,
          address: self.state.address,
          gstNo: self.state.gstNo,
          email: self.state.email,
        })

        break;
      }
    }

  }
 
  handleProductDetails = (e) => {

    const name = e.name;
    const value = e.value;
    this.state.productName = value;
    $("#quantity").show();
    $("#total1").show();    
    $("#quantity1").show();
    $("#total").show();
    $("#expiryDate").show();
    $("#expiryDate1").show();
    testarray.push(this.state.productName);


    this.setState({
      [name]: value,
      selectedProductName: e,
      productNameValid: true
    });

    var self = this;


    for (var k = 0; k < inputarray.length; k++) {
      var temp = JSON.parse(inputarray[k]);

      if (temp.productName == self.state.productName) {  
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

          self.setState({
            description: temp.description,
            rate: temp.rate,
            cgsta: temp.cgsta,
            sgsta: temp.sgsta,
            igsta: temp.igsta,
            productQuantity: temp.quantity,
            productType: temp.productType,
            productId: temp.productId, 
            quantity: "1",
            total: "",
            finalAmount: "",
            discountPercentage:0,
            discountAmount:0,
            prefinalAmount:0,
          

          })

          if(this.state.productType=="service" || this.state.productType=="general"||this.state.productType=="labour"){
            $("#quantity").hide();
            $("#quantity1").hide();
            $("#expiryDate").hide();
            $("#total").hide();
            $("#total1").hide();
            $("#expiryDate1").hide();
            self.state.total=self.state.rate;
            this.state.quantity="-";
            this.setState({
              quantity:this.state.quantity,
            })
          }else{
            self.state.total = Math.round(Number(self.state.rate) * Number(self.state.quantity));
          } 
         
          self.state.prefinalAmount=(Number(self.state.total)-Number(self.state.discountAmount)).toFixed(2);

          self.state.finalAmount =(Number(self.state.prefinalAmount) + (((0.01 * Number(self.state.cgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.sgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.igsta)) * Number(self.state.prefinalAmount)))).toFixed(2);
      
          self.state.totalgst_rs = (((0.01 * Number(self.state.cgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.sgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.igsta)) * Number(self.state.prefinalAmount))).toFixed(2);
      
          


          self.setState({
           
            total: self.state.total,
            finalAmount: self.state.finalAmount,
            totalgst_rs: self.state.totalgst_rs,
prefinalAmount:self.state.prefinalAmount

          });
   
          break;
      }
    }

  }

  componentDidMount() {
    SetCurrentPage("PurchaseInvoice");
    localStorage.setItem('CartRowCount', CryptoJS.AES.encrypt(this.state.cartData, "shinchanbaby"));
    
    
    window.scrollTo(0, 0);
    //$("#otherThanPcs").show();
 
    $("#tableHeadings").hide();
    $("#productName").val("Miscellaneous");

    this.DeleteButton();

    var self = this;
    var vendorName;
    var productName;
    window.scrollTo(0, 0);
    vendorarray.length = 0;
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

    $('#expiryDate').datepicker({
      onSelect: function (date) {
        var dt = new Date(date);
        dt.setDate(dt.getDate() + 1);
     
        self.setState({
          expiryDate: date,
        });
      },
      dateFormat: 'yy-mm-dd',
     // minDate: '-3M',
      maxDate: '36M',
      numberOfMonths: 1
    });
    $("#invoiceDate").datepicker().datepicker("setDate", new Date());
    $("#dueDate").datepicker().datepicker("setDate", new Date());
    $("#expiryDate").datepicker().datepicker("setDate", new Date());

    $('#vendorName').html('');
    this.SelectVendor();
   // this.selectProduct();
    $("#productName").prop("selectedIndex", 0);
    $("#productName option:first").attr('selected', 'selected');
    $("#productName").val(1);
    // this.GetInvoiceNo();

    $(".btn-default").css("background-color","#05a4b5");
    $(".btn-default").css("color","white");
//SITE BASED CURRENCY FORMAT

this.CurrencyFormat();

  }


  CurrencyFormat(){

    var currentSite=GetCurrentSite();
    var siteDetails=GetSiteDetails(); 
    var currencies=GetCurrencies();
    //console.log("siteDetails :",siteDetails);
    //console.log("currentSite :",currentSite);
    var siteDetailsArray=JSON.parse(`[ ${siteDetails}]`);
    console.log("currentSite_CurrencyData :",siteDetailsArray);
    console.log("currentSite_CurrencyData POSITION 0:",siteDetailsArray[0]);
    var currentSite_CurrencyData=_.findWhere(siteDetailsArray[0],{siteName:currentSite});
    console.log("currentSite_CurrencyData :",currentSite_CurrencyData);
    var currentCurrencyData=_.findWhere(currencies,{code:currentSite_CurrencyData.currencyCode});
    this.state.currencySymbol=currentCurrencyData.symbol;
    this.state.currencyCode=currentCurrencyData.code;
    this.state.amountInWords="";
    this.setState({
    currencySymbol:this.state.currencySymbol,
    currencyCode:this.state.currencyCode,
    amountInWords:this.state.amountInWords,
    })
    console.log("this.state.currencySymbol :",this.state.currencySymbol);
    console.log("this.state.currencyCode :",this.state.currencyCode);
    
    }
    






















  SelectVendor() {
    var self = this;
    var vendorName;
    vendorarray = [];
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,

      }),
    //  url: "http://13.127.217.180:8080/ERPDetails/vendororder/selectvendor",
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/vendororder/selectvendor",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        var options1 = [];
        var options = [];
        vendorName += '<option value ="" disabled selected hidden >Select a vendor</option>';
        $.each(data.selectvendornamelist, function (i, item) {

          if (item.companyName != "-") {
            self.state.vendorName1 = item.companyName;
            self.setState({
              vendorName1: self.state.vendorName1,
            })
          } else {
            self.state.vendorName1 = item.vendorName;
            self.setState({
              vendorName1: self.state.vendorName1,
            })
          }
          //vendorName += '<option value="' + item.vendorId + '">' + self.state.vendorName + '</option>'

          options1.push({ label: self.state.vendorName1+ ' ' + item.contactNo, value: item.vendorId });


          // alert(self.state.vendorName)
          var content = JSON.stringify({

            vendorName: item.vendorName,
            orderNumber: item.orderNumber,
            vendorId: item.vendorId,
            contactNo: item.contactNo,
            companyName: item.companyName,
            address: item.address,
            gstNo: item.gstNo,
            email: item.email,
          });

          vendorarray.push(content);

        });
        //   $("#vendorName").append(vendorName);
        self.state.options1 = options1;
        self.setState({
          options1: self.state.options1,
        })

        var productList=_.where(data.selectsaleproductlist,{productType:'product'});

        $.each(productList, function (i, item) {
          options.push({ label: item.productName, value: item.productName });

          //   productName += '<option value="' + item.productName + '">' + item.productName + '</option>'
          var feed = JSON.stringify({
            productName: item.productName,
            rate: item.purchaseRate,
            description: item.description,
            cgsta: item.cgst,
            sgsta: item.sgst,
            igsta: item.igst,
            productType: item.productType,
            quantity: item.quantity,
            productId: item.productId,

          });
          inputarray.push(feed);
         
        });
        //  $("#productName").append(productName);
        self.state.options = options;
        self.setState({
          options: options,
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

      }
    });
  }
 

 
  AddVendorFunc() {
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
          vendorName: this.state.modalVendorName,
          contactNo: this.state.modalContactNo,
          companyId: this.state.companyId,
          staffId: this.state.staffId,
          employeeName: this.state.employeeName,
          role: this.state.role,
          site:GetCurrentSite()   
        }),
     //   url: "http://13.127.217.180:8080/ERPDetails/master/addvendor",
        url: " http://15.206.129.105:8080/ThroughBooksCOAPI/master/addvendor",
        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
          if (data.contactNo == "Mobile") {
            
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title:  'The Mobile Number is Already Exists',     
              showConfirmButton: false,
              timer: 2000
            })

          }
          else {
            //  confirmAlert({
            //      title: 'Success',                        // Title dialog
            //      message: 'Successfully Added vendor Details',               // Message dialog
            //     confirmLabel: 'Ok',                           // Text button confirm
            //  });
            ReactDOM.render(
              <Router >
                <div>
                  <Route path="/" component={PurchaseInvoice1} />
                </div>
              </Router>, document.getElementById('contentRender'));
            $('#vendorName').html('');
            self.SelectVendor();
            self.state.modalVendorName = "";
            self.state.modalContactNo = "";
            self.state.formValid = false;

            // $('[name=city]').val('');

            self.setState({
              modalVendorName: '',
              modalContactNo: '',
              formValid: false,

            });


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
        title:  'Address Should Contain Atleast 2 Character',  
        showConfirmButton: false,
        timer: 2000
      })
    }
  }

  PurchaseInvoiceFunc() {

    var self = this;

    var arrData = [];
    var checkboxArray=[];
    var checkboxArray1=[];
    $.each($("input[name='sms']:checked"), function(){            
      checkboxArray.push($(this).val());
  });
  $.each($("input[name='emailoption']:checked"), function(){            
    checkboxArray1.push($(this).val());
});
  this.state.sms = checkboxArray.toString();
  this.state.emailoption=checkboxArray1.toString();
                this.setState({
                  sms: this.state.sms,
                  emailoption:this.state.emailoption,
                  // message:this.state.message
                });
    // loop over each table row (tr)
    $("#tablecontents tr").each(function () {
      var currentRow = $(this);

      var productName = currentRow.find("td:eq(0)").text();    
      var rate = currentRow.find("td:eq(1)").text();   
      var quantity = currentRow.find("td:eq(2)").text();
      var total = currentRow.find("td:eq(3)").text();
      var discountPercentage = currentRow.find("td:eq(4)").text();
      var discountAmount = currentRow.find("td:eq(5)").text();
      var subtotal = currentRow.find("td:eq(6)").text();

      var cgst = currentRow.find("td:eq(7)").text();
      var sgst = currentRow.find("td:eq(8)").text();
      var igst = currentRow.find("td:eq(9)").text();
      var finalAmount = currentRow.find("td:eq(10)").text();
      var description = currentRow.find("td:eq(11)").text();
      var productId = currentRow.find("td:eq(12)").text();
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
    });


 
    this.state.invoiceData = arrData.toString();

    this.setState({
      invoiceData: arrData.toString(),
  
    });
   

    if ((this.state.vendorName.length > 0)) {
      if ((this.state.invoiceData.trim().length > 1)) {
        if ((this.state.invoiceDate.trim().length > 1) && (this.state.dueDate.trim().length > 1)) {
          $.ajax({
            type: 'POST',
            data: JSON.stringify({
              vendorName: this.state.vendorName,
               purchaseInvoiceNo: this.state.invoiceNo,
              orderNumber: this.state.orderNumber,
              invoiceDate: this.state.invoiceDate,
              dueDate: this.state.dueDate,
            expiryDate:this.state.date,
              invoiceData: this.state.invoiceData.toString(),
              date: this.state.date,
              vendorId: this.state.vendorId,
              contactNo: this.state.contactNo,
              totalcgst: subtotal_cgst,
              totalsgst: subtotal_sgst,
              totaligst: subtotal_igst,
              discount: this.state.discount,
              gstNo: this.state.gstNo,
              email: this.state.email,
              address: this.state.address,

              subtotal1: this.state.subtotal1,
          
              finalAmountTotal: this.state.finalAmountTotal,
              adjustment: this.state.adjustment,
              totalitemqty: this.state.totalitemqty,
              totalgst: this.state.totalgst,
              shipping: this.state.shipping,
              payment_status: this.state.payment_status,
              companyId: this.state.companyId,
              companyName: this.state.companyName,
              sms: this.state.sms,
              emailoption:this.state.emailoption,
              staffId: self.state.staffId,
                   employeeName: self.state.employeeName,
                   role: self.state.role,
                   site:GetCurrentSite()   
            }),

          //  url: "http://13.127.217.180:8080/ERPDetails/vendororder/addpurchaseorder",
          url: " http://15.206.129.105:8080/ThroughBooksCOAPI/vendororder/addpurchaseorder",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {

              self.state.cartData='Empty';
              localStorage.setItem('CartRowCount', CryptoJS.AES.encrypt(this.state.cartData, "shinchanbaby"));
              
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Successfully Added Purchase Invoice ',    
                showConfirmButton: false,
                timer: 2000
              })
              ReactDOM.render(
                <Router >
                  <div>
                    <Route path="/" component={PurchaseInvoiceList} />
                  </div>
                </Router>, document.getElementById('contentRender'));
              var today = new Date();
              var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
           
               self.state.invoiceNo = "";
              self.state.orderNumber = "";
              self.state.invoiceDate =date;
              self.state.dueDate = date;
           
              self.state.description = "";
              self.state.productId ="";
              self.state.rate = ""; 
              self.state.quantity = "";
              self.state.total = "";
              self.state.cgsta = "";
              self.state.sgsta = "";
              self.state.igsta = "";
              self.state.finalAmount = "";
              self.state.subtotal1 = 0;
              self.state.shipping = 0;
              self.state.adjustment = 0;
              self.state.discount = 0;
              self.state.finalAmountTotal = 0;
              self.state.payment_status = "Unpaid";
              self.state.subtotal1 = 0;
              self.state.totalgst = 0;
              self.state.totalitemqty = 0;
              self.state.finalAmountTotal = 0;
              self.state.TotalWithoutGST = 0;
              self.state.selectedVendorName = "";
              $("#tablecontents").empty();
              $("#tableHeadings").hide();
              $('#productName').html('');

              self.state.productName = "";
              self.state.selectedProductName = "";
              self.state.selectedVendorName = "";
              $('[name=productName]').val('');
              $('[name=vendorName]').val('');
              $('#vendorName').html('');

              self.state.formValid = false;
              self.state.formValid1 = false;
           
              $("#tablecontents").empty();
              $("#tableHeadings").hide();
  
              $('[name=productName]').val('');
              $('[name=vendorName]').val('');
              $('#productName').html('');
              $('#vendorName').html('');
              self.setState({
                vendorName: '',
                 invoiceNo: '',
                orderNumber: '',
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
                selectedVendorName:'',
                productName: '',
                subtotal1: 0,
                productId:'',
                totalitemqty: 0,
                TotalWithoutGST: 0,
                totalgst: 0,
                balance_amount: '',
                advance: '',
                discount: 0,
                balance: '',
                saleSale: '',
                purchaseSale: '',
                payment_status: 'UnPaid',
                selectedProductName:'',
                formValid: false,
                formValid1: false,
                paymentMode: '',
                selectedPaymentMode: '',
                staffName: '',


              });
              //  self.GetInvoiceNo();
              self.SelectVendor();

             
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
        else {
          
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
    }

    else {
      
      Swal.fire({
        position: 'center',
        icon: 'error',
        title:  'Kindly Select Vendor Name', 
        showConfirmButton: false,
        timer: 2000
      })
    }
    var numtoword = numberToWord(Number(self.state.subtotal1));
    $("#numWords").text(Case.capital(numtoword));
  }

  ViewFunc() {
    ReactDOM.render(
      <Router >
        <div>
          <Route path="/" component={PurchaseInvoiceList} />
        </div>
      </Router>, document.getElementById('contentRender'));
  }

  NoAction() {
    ReactDOM.render(
      <Router >
        <div>
          <Route path="/" component={PurchaseInvoice1} />
        </div>
      </Router>, document.getElementById('contentRender'));
  }
  AddToCart() {
    var self = this;
    
    var currentproductvalue;
    if ( this.state.finalAmount != 0  && (this.state.productName != 0) && (this.state.cgsta != '')&& (this.state.sgsta != '') && (this.state.igsta != '')) {
      //var tab = '<thead><tr class="headcolor" style="color: white; background-color: #486885; font-size: 12px;">  <th>ProductName</th><th>Size</th><th>Rate</th><th>Amount</th><th>Quantity</th><th>Total</th><th>cgst (%)</th><th>SGST (%)</th><th>IGST (%)</th><th>Final Amount</th></tr></thead>';
      this.state.subtotal1 = Math.round(Number(this.state.subtotal1) + Number(this.state.finalAmount));
      if(this.state.quantity!="-")
      {
        this.state.totalitemqty = Math.round(Number(this.state.totalitemqty) + Number(this.state.quantity));
     }
    
   
   
    
    
      this.state.totalgst = (Number(this.state.totalgst) + Math.round(Number(this.state.totalgst_rs))).toFixed(2);
      this.state.TotalWithoutGST =(Number(this.state.TotalWithoutGST) + Number(this.state.prefinalAmount)).toFixed(2);

      subtotal_cgst = (Number(subtotal_cgst) + ((0.01 * Number(self.state.cgsta)) * Number(self.state.prefinalAmount))).toFixed(2);
      subtotal_sgst =( Number(subtotal_sgst) + ((0.01 * Number(self.state.sgsta)) * Number(self.state.prefinalAmount))).toFixed(2);
      subtotal_igst = (Number(subtotal_igst) + ((0.01 * Number(self.state.igsta)) * Number(self.state.prefinalAmount))).toFixed(2);
    
    
      var payament_status_details;



      var tab = '<tr style={{backgroundColor: "white",fontColor:"black",fontWeight:"bold"}} id="tabletextcol" ><td>' + self.state.productName + '</td><td>' + self.state.rate + '</td><td>' + self.state.quantity + '</td><td>' + self.state.total + '</td><td>' + self.state.discountPercentage + '</td><td>' + self.state.discountAmount + '</td><td>' + self.state.prefinalAmount + '</td><td>' + self.state.cgsta + '</td><td>' + self.state.sgsta + '</td><td  id="Gstcal" >' + self.state.igsta + '</td><td  id="finalAmountcal" >' + self.state.finalAmount + '</td><td  class="heightWidth" >' + self.state.description + '</td><td  class="heightWidth" >' + self.state.productId + '</td> <td><button id="delete">Delete</button></td></tr>';

      $("#tableHeadings").append(tab);
      $("#tableHeadings").show();
      $("#shipping").bind('keydown', function (event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          //  $("#saleinvoice").click();
        }
      });
      $("#adjustment").bind('keydown', function (event) {
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
      self.state.finalAmount = 0;

      self.state.discountPercentage = 0;
      self.state.discountAmount = 0;
      self.state.prefinalAmount = 0;

      // self.state.TotalWithoutGST="";

      self.state.selectedProductName = "";
      $('[name=productName]').val('');
      $("#quantity").show();
      $("#quantity1").show();
      $("#total").show();
      $("#total1").show();
      $("#expiryDate").show();
      $("#expiryDate1").show();
      self.setState({
discountPercentage:0,
discountAmount:0,
prefinalAmount:'',
        description: '',      
        rate: '',       
        quantity: '',
        total: '',
        cgsta: '',
        sgsta: '',
        igsta: '',
        finalAmount: '',
        productName: '',
        selectedProductName: '',
        totalgst: this.state.totalgst,
        finalAmountTotal: this.state.subtotal1,
        totalitemqty: this.state.totalitemqty,
        TotalWithoutGST: this.state.TotalWithoutGST,

        shipping: 0,
        adjustment: 0,
        discount: 0,

      });
      advancebalance_calc = this.state.subtotal1;
      this.state.cartData='NotEmpty';
      var numtoword = numberToWord(Number(self.state.subtotal1));
     //this.state.amountInWords=convert_to_words(Number(self.state.subtotal1),'USD');
              //this.state.amountInWords=Case.capital(this.state.amountInWords)
              this.state.amountInWords=convert_to_words(Number(self.state.subtotal1),this.state.currencyCode);
              this.state.amountInWords=Case.capital(this.state.amountInWords)
              
    }
    else {
     
      
      this.state.cartData='NotEmpty';
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Select Product and Make sure rate is specified',     
          showConfirmButton: false,
          timer: 2000
        })

    }



    localStorage.setItem('CartRowCount', CryptoJS.AES.encrypt(this.state.cartData, "shinchanbaby"));

  }






  CartRowCount(){
    var rowCount = $("#tableHeadings tr").length;
    
   // alert("rowCount :"+rowCount);
    if(rowCount >1 ){
    this.state.cartData='NotEmpty';
    }else{
    this.state.cartData='Empty';
    }
    localStorage.setItem('CartRowCount', CryptoJS.AES.encrypt(this.state.cartData, "shinchanbaby"));
    }
    














  CancelFunc() {
//EMPTY THE STATES

var self=this;
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

this.state.vendorName = "";
this.state.selectedVendorName = "";
this.state.orderNumber = "";
this.state.totalVisit = "";

this.state.invoiceDate = date;  //current date
this.state.dueDate = date; //current date
this.state.productName = "";
this.state.selectedProductName = "";
this.state.description = "";
this.state.expiryDate="";
this.state.rate = "";
this.state.quantity = 1;
this.state.total = "";
this.state.cgsta = "";
this.state.sgsta = "";
this.state.igsta = "";
this.state.finalAmount = "";

//EMPTY THE CART
$("#tableHeadings").hide();
$("#tablecontents").empty();
$("#numWords").val('');
var numinwords=$("#numwords");
numinwords.val("");
$("#numWords").hide();
//EMPTY THE FINAL DATA
this.state.TotalWithoutGST = 0;
self.state.subtotal1 = 0;
self.state.shipping = 0;
self.state.adjustment = 0;
self.state.discount = 0;
self.state.finalAmountTotal = 0;
self.state.totalitemqty = 0;
this.state.payment_status = "UnPaid";
this.state.staffName = "";
this.state.selectedstaffName = "";
//this.state.options2=[];
this.state.paymentMode = "";
this.state.selectedPaymentMode = "";


this.setState({

  vendorName: this.state.vendorName,
  selectedVendorName: this.state.selectedVendorName,
  orderNumber: this.state.orderNumber,

  invoiceDate: this.state.invoiceDate,//current date
  dueDate: this.state.dueDate,//current date
  productName: this.state.productName,
  selectedProductName: this.state.selectedProductName,
  description: this.state.description,
  rate: this.state.rate,
  quantity: this.state.quantity = 1,
  total: this.state.total,
  cgsta: this.state.cgsta,
  sgsta: this.state.sgsta,
  igsta: this.state.igsta,
  finalAmount: this.state.finalAmount,
expiryDate:this.state.expiryDate,

  TotalWithoutGST: this.state.TotalWithoutGST,
  totalgst: this.state.totalgst,
  subtotal1: this.state.subtotal1,
  shipping: this.state.shipping,
  discount: this.state.discount,
  adjustment: this.state.adjustment,
  payment_status: this.state.payment_status,
  finalAmountTotal: this.state.finalAmountTotal,
  selectedstaffName: this.state.selectedstaffName,
  //this.state.options2=[];
  paymentMode: this.state.paymentMode,
  selectedPaymentMode: this.state.selectedPaymentMode,
})


   
  }





  DeleteButton() {


    var self = this;
    self.CartRowCount();



    $("#tableHeadings").on('click', "#delete", function () {

      var currentRow = $(this).closest("tr");


      var rate_item_qty_rowcell = currentRow.find("td:eq(1)").html(); // get current row 2nd table cell TD value
      var total_item_qty_rowcell = currentRow.find("td:eq(2)").html(); // get current row 2nd table cell TD value
      var TotalWithoutGST_rowcell = currentRow.find("td:eq(6)").html(); // get current row 2nd table cell TD value
     
      var cgst_item_qty_rowcell = currentRow.find("td:eq(7)").html(); // get current row 2nd table cell TD value
      var sgst_item_qty_rowcell = currentRow.find("td:eq(8)").html(); // get current row 2nd table cell TD value
      var igst_item_qty_rowcell = currentRow.find("td:eq(9)").html(); // get current row 2nd table cell TD value
      
      

      var subtotalvaluedecrement = currentRow.find("td:eq(10)").html(); // get current row 2nd table cell TD value

      self.state.subtotal1 = Math.round(Number(self.state.subtotal1) - Number(subtotalvaluedecrement));

      if(total_item_qty_rowcell!="-")
      {
        self.state.totalitemqty = Math.round(Number(self.state.totalitemqty) - Number(total_item_qty_rowcell));
      }
      

 var In_rs_gst = Math.round((Number(cgst_item_qty_rowcell) + Number(sgst_item_qty_rowcell) + Number(igst_item_qty_rowcell)) * 0.01 * Number(TotalWithoutGST_rowcell));
     
     
      self.state.totalgst = Math.round(Number(self.state.totalgst) - Number(In_rs_gst));
      self.state.TotalWithoutGST = Math.round(Number(self.state.TotalWithoutGST) - Number(TotalWithoutGST_rowcell));

      subtotal_cgst = Math.round(Number(subtotal_cgst) - ((0.01 * Number(cgst_item_qty_rowcell)) * Number(TotalWithoutGST_rowcell)));
      subtotal_sgst = Math.round(Number(subtotal_sgst) - ((0.01 * Number(sgst_item_qty_rowcell)) * Number(TotalWithoutGST_rowcell)));
      subtotal_igst = Math.round(Number(subtotal_igst) - ((0.01 * Number(igst_item_qty_rowcell)) * Number(TotalWithoutGST_rowcell)));


      var cgst_item_qty_rowcell = Math.round((0.01 * (Number(cgst_item_qty_rowcell)) * Number(subtotalvaluedecrement)));
      var cgst_item_qty_rowcell_another = Math.round((0.01 * (Number(cgst_item_qty_rowcell)) * (subtotalvaluedecrement)));

  

      self.setState({
        subtotal1: self.state.subtotal1,
        totalitemqty: self.state.totalitemqty,
        TotalWithoutGST: self.state.TotalWithoutGST,
        totalgst: self.state.totalgst,
        adjustment: 0,
        discount: 0,
        finalAmountTotal: self.state.subtotal1,
        shipping: 0,
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


  BackbtnFunc() {
    //   alert(this.state.backButtonVariable)
    var dirtyValue ="false";
   
    var finalRowCount= $('#tableHeadings tbody tr').length;

if((this.state.vendorName.length==0) && this.state.orderNumber.length==0 && (finalRowCount==0))
  {
    ReactDOM.render(
      <Router>
        <div>           
          <Route path="/" component={PurchaseInvoiceList} />         
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }
  else{
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
   ConfirmBack(){
      ReactDOM.render(
        <Router>
          <div>
  
            <Route path="/" component={PurchaseInvoiceList} />
  
  
          </div>
        </Router>,
        document.getElementById('contentRender'));
      registerServiceWorker();
    }
    CancelBack(){


   
    }
 
  ClearVendorFunc() {
    var self = this;
    self.state.modalVendorName = "";
    self.state.modalContactNo = "";

    self.setState({
      modalVendorName: self.state.modalVendorName,
      modalContactNo: self.state.modalContactNo,
    })
    
  }

  closeFunc() {
    //alert("MODAL CLOSE");
    var self = this;

    self.state.modalVendorNameValid = false;
    self.state.modalContactNoValid = false;
    self.state.modalVendorName = "";
    self.state.modalContactNo = "";

    self.setState({

      modalVendorNameValid: self.state.modalVendorNameValid,
      modalContactNoValid: self.state.modalContactNoValid,
      modalVendorName: self.state.modalVendorName,
      modalContactNo: self.state.modalContactNo,


    })


  }

  
 

  render() {
    return (
      <div class="container">
     
       
      	
  <div class="card">	
  <div className="row">	
  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4">	
 <div className="">	
    <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />	
    </div>	
  </div>	
  <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8">	
  <div class="card-header">	
  <h3 class="text-center">Purchase Invoice </h3>   </div>	
  </div>	
  </div>	
  <div>	
  <div class="card-body">	
  <form class="form-horizontal form-bordered">	
  <div class="form-group">	
  <label class="control-label col-sm-2" for="vendorName">Vendor/Company Name</label>	
  <div class="col-sm-10">	
  {/* <select id="vendorName" className="form-control" onChange={this.handleVendorDetails} name="vendorName"	
  style={{ marginBottom: "15px" }} >	
  </select>  */}	
  <SelectSearch options={this.state.options1} value={this.state.selectedVendorName} onChange={(e) => this.handleVendorDetails(e)} name="vendorName" placeholder="Select Vendor " />	
  </div>	
  <label class="control-label col-sm-2" for="vendorName"></label>	
  <div class="text-center" class="col-sm-10">	
  <a href="#myModal" data-toggle="modal" data-target="#myModal" >	
  <span	
  style={{	
  color: "blue",	
  }}>  Add Vendor</span>    </a></div>	
  </div>	
  <div class="form-group">	
  <label class="control-label col-sm-2" for="orderNumber">Invoice No</label>	
  <div class="col-sm-10">	
  <input type="text"  class="form-control" value={this.state.invoiceNo} onChange={this.handleUserInput} name="invoiceNo" id="invoiceNo" placeholder="Invoice No " />	
  </div>	
  </div>	
  <div class="form-group">	
  <label class="control-label col-sm-2">Invoice Date</label>	
  <div class="col-sm-4">	
  <input type="text" class="form-control" value={this.state.invoiceDate} id="invoiceDate" name="invoiceDate"	
  onChange={this.handleUserInput} />	
  </div>	
  <label class="control-label col-sm-2">Due Date</label>	
  <div class="col-sm-4">	
  <input type="text" class="form-control" value={this.state.dueDate} id="dueDate" name="dueDate"	
  onChange={this.handleUserInput} />	
  </div>	
  </div>	
  <hr></hr>	
  <div class="form-group">	
  <label class="control-label selectpicker col-sm-2" for="productName">Product</label>	
  <div class="col-sm-4"  >	
  <SelectSearch options={this.state.options} value={this.state.selectedProductName}	
  onChange={(e) => this.handleProductDetails(e)} name="productName" placeholder="Select Product " />	
  <div class="text-center" class="col-sm-4">	
  <a href="#myModal1" data-toggle="modal" data-target="#myModal1" >	
  <span	
  style={{	
  color: "blue"	
  }}> Add Product</span>    </a>	
  </div>	
  </div>	
  <label class="control-label col-sm-2" for="description">Description</label>	
  <div class="col-sm-4">	
  <textarea type="text" class="form-control" value={this.state.description} onChange={this.handleUserInputDescription} name="description" id="description" ></textarea>	
  </div>	
  </div>	
  <hr></hr>                 	
  <div class="table-responsive">	
  <table class="table">	
  <thead>	
  <tr>	
  <th>Rate</th>                      	
  <th id="quantity1">Quantity</th>	
  <th id="total1">Total</th>	
  </tr>	
  </thead>	
  <tbody>	
  <tr>	
  <td><input class="col-sm-3" type="text" min="1" class="form-control" value={this.state.rate} onChange={this.handleUserHeightWidth} name="rate" id="rate" />	
  </td>                         	
  <td><input type="text" min="1" class="form-control" value={this.state.quantity} onChange={this.handleUserHeightWidth} name="quantity" id="quantity" />	
  </td>	
  <td><input readOnly type="text" class="form-control" value={this.state.total} onChange={this.handleUserHeightWidth} name="total" id="total" />	
  </td>	
  </tr>	
  </tbody>	
  </table>	
  </div>	
  <div class="table-responsive">	
  <table class="table">	
  <thead>	
  <tr>                         	
  <th >Discount(%)</th>	
  <th >Discount</th>	
  <th >SubTotal</th>	
  <th >{this.props.tax1LabelName}(%)</th>	
  </tr>	
  </thead>	
  <tbody>	
  <tr>                         	
  <td><input type="number" class="form-control" value={this.state.discountPercentage}  onChange={this.handlecgstSgstIgst} name="discountPercentage" id="discountPercentage" autocomplete="off"/>	
  </td>                          	
  <td><input type="number" class="form-control" value={this.state.discountAmount} onChange={this.handlediscountAmount} name="discountAmount" id="discountAmount" autocomplete="off"/>	
  </td>	
  <td><input type="number" readOnly class="form-control" value={this.state.prefinalAmount} onChange={this.handlecgstSgstIgst} name="prefinalAmount" id="prefinalAmount" autocomplete="off"/>	
  </td>	
  <td><input type="number" class="form-control" value={this.state.cgsta} onChange={this.handlecgstSgstIgst} name="cgsta" id="cgsta" autocomplete="off" />	
  </td>	
  </tr>	
  </tbody>	
  </table>	
  </div>	
  <div class="table-responsive">	
  <table class="table">	
  <thead>	
  <tr>                         	
  <th >{this.props.tax2LabelName}(%)</th>	
  {/*<th >IGST(%)</th>*/}	
  <th>Final Amount</th>	
  <th></th>	
  </tr>	
  </thead>	
  <tbody>	
  <tr>                         	
  <td><input type="number" class="form-control" value={this.state.sgsta} onChange={this.handlecgstSgstIgst} name="sgsta" id="sgsta" autocomplete="off" />	
  </td>	
  <td><input type="number" class="form-control" value={this.state.igsta} onChange={this.handlecgstSgstIgst} name="igsta" id="igsta" autocomplete="off" />	
  </td>	
  <td><input readOnly type="text" class="form-control" value={this.state.finalAmount} onChange={this.handleUserHeightWidth} name="finalAmount " id="finalAmount " />	
  </td>	
  <td>	
  <button type="button" onClick={() => this.AddToCart()} style={{ marginRight: "5px" }} class="btn btn-default pull-right">AddToCart</button> <span></span>	
  </td>	
  </tr>	
  </tbody>	
  </table>	
  </div>	
  <hr></hr>	
  <div id="tableOverflow">	
  <table class="table" id="tableHeadings">	
  <thead>	
  <tr>	
  <th>ProductName</th>                       	
  <th>Rate</th>                    	
  <th>Quantity</th>	
  <th>Total</th>	
  <th>Discount(%)</th>	
  <th>Discount</th>	
  <th>SubTotal</th>	
  <th>{this.props.tax1LabelName} (%)</th>	
  <th>{this.props.tax2LabelName} (%)</th>	
  <th>{this.props.tax3LabelName} (%)</th>	
  <th>Final Amount</th>	
  </tr>	
  </thead>	
  <tbody id="tablecontents" style={{ backgroundColor: "white" }}></tbody>	
  </table>	
  </div>	
  <hr></hr>	
  <div class="form-group">	
  <div class="col-sm-6">	
  <p class="lead">Total Qty: {this.state.totalitemqty} <span name="totalitemqty" id="totalitemqty"></span></p>	
  <p class="lead">Amount In Words:   <span id="numWords"></span> Dollar Only</p>	
  </div>	
  <div class="col-sm-6">	
  <div class="table-responsive">	
  <table class="table">	
  <tbody>	
  <tr><th style={{ width: "50%" }}>Total(without Tax):</th>	
  <td style={{  display:"flex" }}>
  <span id="currencysymbolSpan" style={{fontSize: "19px",marginRight: "10px"}}>{this.state.currencySymbol}</span>
 
  <input name="TotalWithoutGST" readOnly type="text" value={this.state.TotalWithoutGST} id="TotalWithoutGST" class="form-control" />{/* $ <span id="subtotal"></span> */}</td>	
  <input type="hidden" name="TotalWithoutGST" id="TotalWithoutGST" />  </tr>	
  <tr><th>Total Tax</th>	
  <td style={{  display:"flex" }}>
  <span id="currencysymbolSpan" style={{fontSize: "19px",marginRight: "10px"}}>{this.state.currencySymbol}</span>
 {this.state.totalgst} <span id="tgst"></span></td>	
  </tr>	
  <tr><th style={{ width: "50%" }}>Subtotal:</th>	
  <td style={{ display:"flex" }}><span id="currencysymbolSpan" style={{fontSize: "19px",marginRight: "10px"}}>{this.state.currencySymbol}</span>
  <input name="subtotal" readOnly type="text" value={this.state.subtotal1} id="subtotal" onChange={this.subtotalcalculationFunc} class="form-control" />{/* $ <span id="subtotal"></span> */}</td>	
  <input type="hidden" name="subtotal1" id="subtotal1" />  </tr>	
  <tr><th>Shipping:</th>	
  <td style={{ display:"flex" }}>
  <span id="currencysymbolSpan" style={{fontSize: "19px",marginRight: "10px"}}>{this.state.currencySymbol}</span>
  <input name="shipping" type="text" id="shipping" value={this.state.shipping} onkeyup="final_total();" onChange={this.AdjustmentShippingCalc} class="form-control" /></td>	
  </tr>	
  <tr><th>Adjustment:</th>
  <td style={{ display:"flex" }}>
  <span id="currencysymbolSpan" style={{fontSize: "19px",marginRight: "10px"}}>{this.state.currencySymbol}</span>
  <input name="adjustment" value={this.state.adjustment} type="number" min="1" id="adjustment" onkeyup="final_total();" onChange={this.AdjustmentShippingCalc} class="form-control" /></td>	
  </tr>	
  <tr><th>Discount:</th>
  <td style={{ display:"flex" }}>
  <span id="currencysymbolSpan" style={{fontSize: "19px",marginRight: "10px"}}>{this.state.currencySymbol}</span>
 
  <input name="discount" type="number" min="1" value={this.state.discount} id="discount" onkeyup="final_total();" onChange={this.DiscountCalc} class="form-control" /></td>	
  </tr>	
  <tr> <th>Total:</th>	
  <td style={{display:"flex" }}  name="finalAmountTotal" class="grand_total" >
  <span id="currencysymbolSpan" style={{fontSize: "19px",marginRight: "10px"}}>{this.state.currencySymbol}</span>
  {this.state.finalAmountTotal} <span id="finalAmountTotal"></span></td>	
  </tr>	
  <tr > <th></th>	
  <td> <input type="checkbox" class="CheckBoxClass" name="sms" value="sms" onChange={this.handleUserInput} id="defaultUnchecked" />	
  <label class="custom-control-label" for="defaultUnchecked"> SMS</label>	
  </td>	
  </tr>	
  <tr >  <th></th>	
  <td><input type="checkbox" class="CheckBoxClass" name="emailoption" onChange={this.handleUserInput} value="emailoption" id="defaultUnchecked" />	
  <label class="custom-control-label" for="defaultUnchecked"> Email</label></td>	
  </tr>	
  <tr><th></th>	
  <td>	
  <button type="button" id="saleinvoice" onClick={() => this.PurchaseInvoiceFunc()} style={{ marginRight: "5px" }} class="btn btn-default pull-right">SaveInvoice</button> <span></span>	
  </td>	
  <td> <button type="button" onClick={() => this.CancelFunc()} style={{ marginRight: "5px" }} class="btn btn-default pull-right">cancel</button> <span></span>	
  </td>	
  </tr>	
  </tbody>	
  </table></div>	
  </div>	
  </div>	
  </form>	
  </div>	
  </div></div>	
  <div style={{ position: " ", zIndex: "0" }}>	
  <div class="modal fade" id="myModal" data-backdrop="false"  >	
  <div class="modal-dialog">	
  <div class="modal-content">	
  <div class="modal-header">	
  <h4 class="modal-title" style={{ align: "center",display: "contents" }}>Add Vendor</h4>	
  <button type="button" onClick={() => this.closeFunc()} class="close" data-dismiss="modal">&times;</button>	
  </div>	
  <div class="modal-body" >	
  <div class="form-body">	
  <div style={{ color: "red" }} className="panel panel-default">	
  <FormErrors style={{ color: "red" }} formErrors={this.state.formErrors} />	
  </div>	
  <form class="form-horizontal form-bordered" name="submissions">	
  <div className={`form-group ${this.errorClass(this.state.formErrors.modalVendorName)}`}>	
  <label class="control-label col-sm-4 font-weight-bold" for="modalVendorName">Vendor/Company Name<span style={{ color: "red" }}>*</span></label>	
  <div class="col-sm-8">	
  <input type="text" class="form-control" id="modalVendorName"	
  name="modalVendorName" value={this.state.modalVendorName}	
  onChange={this.handleUserInput} placeholder="Vendor Name" />	
  </div>	
  </div>	
  <div className={`form-group ${this.errorClass(this.state.formErrors.modalContactNo)}`}>	
  <label style={{ fontWeight: "bold" }} class="control-label col-sm-4" for="contactNo"> Contact no.<span style={{ color: "red" }}>*</span></label>	
  <div class="col-sm-8">	
  <input type="number" min="1" maxLength="10" class="form-control"	
  name="modalContactNo"	
  value={this.state.modalContactNo} onChange={this.handleUserInput}	
  id="modalContactNo" placeholder="Contact no" />	
  </div>	
  </div>	
  <div class="modal-footer">	
  <div class="form-group">	
  <div class="row" style={{ marginLeft: "2px" }}>	
  <div class="col-sm-offset-4 col-sm-8">	
  <button style={{ fontWeight: "bold" }} type="button"	
  disabled={!this.state.formValid} onClick={() => this.AddVendorFunc()}	
  data-dismiss="modal" class="btn btn-default">Submit</button> <span></span>	
  <button style={{ fontWeight: "bold" }} type="button"	
  onClick={() => this.ClearVendorFunc()}	
  class="btn btn-default">Clear</button>	
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
  <h4 class="modal-title" style={{ align: "center",display: "contents" }}>Add Product</h4>	
  <button type="button" onClick={() => this.closeFunc()} class="close" data-dismiss="modal">&times;</button>	
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
  <div className={`form-group ${this.errorClass1(this.state.formErrors.modalproductCategory)}`}>	
  <label class="control-label col-sm-2 " for="modalproductCategory">Quantity Config<span style={{ color: "red" }}>*</span></label>	
  <div class="col-sm-10">	
  <select name="modalproductCategory" id="modalproductCategory" onChange={this.handleUserInputProductCategory} class="form-control">	
  <option  disabled selected hidden value="">--Select--</option>	
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
  <div className={`form-group ${this.errorClass1(this.state.formErrors.modalpurchaseRate)}`}>	
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
  <button style={{ fontWeight: "bold" }} type="button" disabled={!this.state.formValid1} onClick={() => this.AddProductFunc()} class="btn btn-default">Submit</button> <span></span>	
  <button style={{ fontWeight: "bold" }} type="button" onClick={() => this.ClearProductFunc()} class="btn btn-default">Clear</button>	
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

export default PurchaseInvoice1;
export const PurchaseInvoice_CurrencyChange = (InvoicePageStates) => {

  var self=InvoicePageStates;
  console.log("InvoicePageStates :",InvoicePageStates);
  
  alert("LOCATION CHANGED since cart empty");
  
  window.PurchaseInvoiceComponent.CurrencyFormat();
  
  }