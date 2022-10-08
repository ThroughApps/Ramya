import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import VendorEntryForm from './VendorEntryForm';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { FormErrors } from './FormErrors';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import './datepicker.css';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import Case from "case";
import CryptoJS from 'crypto-js';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import PurchaseInvoiceList from './PurchaseInvoiceList';
import SelectSearch from 'react-select';
import AddProduct from './AddProduct';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
//import { GetEmployeeSite, GetCurrentSite } from './ConstSiteFunction';
import convert_to_words from '@amirsanni/number-to-words';
import {
  GetEmployeeSite, GetCurrentSite, GetSiteDetails,
  GetCurrencies, SetCurrentPage
} from './ConstSiteFunction';
import { SiteCurrencySymbol } from './Invoice/CurrencyFormater';

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
var updateData = [];

class PurchaseReportUpdate extends Component {

  getInitialState() {
    return { height: '' }
  }
  constructor(props) {
    super(props)
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)


    this.state = {

      vendorName: this.props.vendorName,
      contactNo: this.props.contact,
      invoiceNo: this.props.id,
      orderNumber: this.props.orderNumber,
      invoiceDate: this.props.invoiceDate,
      dueDate: this.props.dueDate,
      gstNo: this.props.gstNo,
      email: this.props.email,
      address: this.props.address,
      vendorId: this.props.vendorId,
      id: this.props.id,
      adjustment: this.props.adjustment,
      shipping: this.props.shipping,
      discount: this.props.discount,
      date: this.props.date,
      companyName: this.props.companyName,
      balance_amount: '',
      staffId: staffId,
      employeeName: employeeName,
      purchaseInvoiceNo: this.props.purchaseInvoiceNo,
      role: role,
      productName: '',
      modalproductName: '',
      modalproductCategory: '',
      modalproductType: '',
      modalquantity: 0,
      modalquantityLimit: 0,
      modalcgst: 0,
      modalsgst: 0,
      modaligst: 0,
      discountAmount: 0,
      discountPercentage: 0,
      prefinalAmount: 0,
      modalhsnCode: '',
      modalpurchaseRate: '',
      modalsaleRate: '',
      modaldescription: '',
      saleType: '',
      description: '',
      companyId: companyId,
      updateQuantity: '',
      rate: '',
      quantity: '1',
      total: '',
      cgsta: '',
      sgsta: '',
      igsta: '',
      invoiceData: '',
      finalAmount: 0,
      totalqty: '',
      subtotal1: 0,
      totalitemqty: 0,
      TotalWithoutGST: 0,
      totalgst: 0,
      balance_amount: '',

      saleSale: '',
      purchaseSale: '',
      payment_status: this.props.status,

      options: [],
      formErrors: {
        modalVendorName: '',
        modalContactNo: '',
        modalproductName: '',
        modalpurchaseRate: '',
        modalsaleRate: '',
        modalproductType: '',
        modalproductCategory: '',
      },
      modalVendorNameValid: false,
      modalContactNoValid: false,
      modalpurchaseRateValid: false,
      modalsaleRateValid: false,
      modalproductNameValid: false,
      modalproductTypeValid: false,
      modalproductCategoryValid: false,
      siteName: this.props.siteName,
      currencySymbol: '',
      cnurrencyCode: '',
      amountInWords: '',
    }
    this.setState({
      //date: date,

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

    if (this.state.modalproductType == "service" || this.state.modalproductType == "general" || this.state.modalproductType == "labour") {
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

  handleUserInput = (e) => {
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

            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Value Cannot Be Zero',
              showConfirmButton: false,
              timer: 2000
            })
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

  handleUserHeightWidthComplete() {

    var self = this;

    if (this.state.productType == "service" || this.state.productType == "general" || this.state.productType == "labour") {
      self.state.total = self.state.rate;

    } else {
      self.state.total = Math.round(Number(self.state.rate) * Number(self.state.quantity));
    }

    self.state.discountAmount = (Number(self.state.total) * (0.01 * Number(self.state.discountPercentage))).toFixed(2);

    if (Number(self.state.discountAmount) > Number(self.state.total)) {

      Swal.fire({
        position: 'center',
        icon: 'warning',
        text: "Discount Amount Exceeds Total" + self.state.discountAmount,
        showConfirmButton: false,
        timer: 2000
      })


      self.state.discountAmount = 0;
      self.state.discountPercentage = 0;
      self.setState({
        discountAmount: '0',
        discountPercentage: '0',
      })
    } else {
      self.state.discountAmount = (Number(self.state.total) * (0.01 * Number(self.state.discountPercentage))).toFixed(2);

      self.state.discountPercentage = Number(self.state.discountPercentage).toFixed(2);
    }

    self.state.prefinalAmount = (Number(self.state.total) - Number(self.state.discountAmount)).toFixed(2);

    self.state.finalAmount = (Number(self.state.prefinalAmount) + (((0.01 * Number(self.state.cgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.sgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.igsta)) * Number(self.state.prefinalAmount)))).toFixed(2);

    self.state.totalgst_rs = (((0.01 * Number(self.state.cgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.sgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.igsta)) * Number(self.state.prefinalAmount))).toFixed(2);

    self.setState({

      total: self.state.total,
      finalAmount: self.state.finalAmount,
      totalgst_rs: self.state.totalgst_rs,
      discountAmount: self.state.discountAmount,
      prefinalAmount: self.state.prefinalAmount,



    });



  }


  AdjustmentShippingCalc = (e) => {

    const name = e.target.name;
    const value = e.target.value;

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
        name: state_value,
        finalAmountTotal: total,
        discount: 0,
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
        name: state_value,
        finalAmountTotal: total,
        discount: 0,
      })
      var numtoword = numberToWord(Number(this.state.finalAmountTotal));
      $("#numWords").text(Case.capital(numtoword));

    }


    self.state.amountInWords = Case.capital(convert_to_words(Number(this.state.finalAmountTotal), self.state.currencyCode));




  }



  DiscountCalc = (e) => {
    const name = e.target.name;
    const value = e.target.value;

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


        Swal.fire({
          position: 'center',
          icon: 'warning',
          text: "Exceeds Balance" + value,
          showConfirmButton: false,
          timer: 2000
        })

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

        Swal.fire({
          position: 'center',
          icon: 'warning',
          text: "Exceeds Balance" + value,
          showConfirmButton: false,
          timer: 2000
        })

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



    self.state.amountInWords = Case.capital(convert_to_words(Number(this.state.finalAmountTotal), self.state.currencyCode));


  }


  handleVendorDetails = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.state.vendorId = value;

    rougharray.push(this.state.vendorId);


    this.setState({
      [name]: value,
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
        if (temp.companyName == " " || temp.companyName == "null" || temp.companyName == "-") {
          self.state.companyName = " "
        }
        else {
          self.state.companyName = temp.companyName;
        }
        self.setState({
          orderNumber: self.state.orderNumber,
          vendorId: self.state.vendorId,
          contactNo: self.state.contactNo,
          companyName: self.state.companyName,
          vendorName: self.state.vendorName,
        })

        break;
      }
    }

  }

  selectProduct() {
    subtotal_cgst = 0;
    subtotal_igst = 0;
    subtotal_sgst = 0;
    updateData = [];
    inputarray.length = 0;
    var self = this;
    var productName;
    var rate;
    var saleSale;
    var purchaseSale;
    var feed;

    self.state.saleType = "saleSale";
    self.setState({
      saleType: self.state.saleType,
    })
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        saleType: this.state.saleType,
        companyId: this.state.companyId,
      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/vendororder/selectvendor",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        var options = [];

        //  productName += '<option value ="" disabled selected hidden >Select a product</option>';
        var fisrt_data = data.selectsaleproductlist[0].productName;

        self.state.selectedProductName = fisrt_data;
        self.setState({
          selectedProductName: self.state.selectedProductName,
        })


        $.each(data.selectsaleproductlist, function (i, item) {
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


      },
    });
  }
  handleProductDetails = (e) => {

    const name = e.name;
    const value = e.value;
    this.state.productName = value;
    $("#quantity").show();
    $("#total1").show();
    $("#quantity1").show();
    $("#total").show();

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
          discountPercentage: 0,
          discountAmount: 0,
          prefinalAmount: 0,


        })

        if (this.state.productType == "service" || this.state.productType == "general" || this.state.productType == "labour") {
          $("#quantity").hide();
          $("#quantity1").hide();
          $("#expiryDate").hide();
          $("#total").hide();
          $("#total1").hide();
          $("#expiryDate1").hide();
          self.state.total = self.state.rate;
          this.state.quantity = "-";
          this.setState({
            quantity: this.state.quantity,
          })
        } else {
          self.state.total = Math.round(Number(self.state.rate) * Number(self.state.quantity));
        }

        self.state.prefinalAmount = (Number(self.state.total) - Number(self.state.discountAmount)).toFixed(2);

        self.state.finalAmount = (Number(self.state.prefinalAmount) + (((0.01 * Number(self.state.cgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.sgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.igsta)) * Number(self.state.prefinalAmount)))).toFixed(2);

        self.state.totalgst_rs = (((0.01 * Number(self.state.cgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.sgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.igsta)) * Number(self.state.prefinalAmount))).toFixed(2);




        self.setState({

          total: self.state.total,
          finalAmount: self.state.finalAmount,
          totalgst_rs: self.state.totalgst_rs,
          prefinalAmount: self.state.prefinalAmount

        });

        break;
      }
    }

  }


  componentDidMount() {
    SetCurrentPage("PurchaseReportUpdate");


    var siteCurrencyData = SiteCurrencySymbol(this.props.siteName);
    this.state.currencySymbol = siteCurrencyData.currencySymbol;
    this.state.currencyCode = siteCurrencyData.currencyCode;

    window.scrollTo(0, 0);
    var rowCount = $('#tableHeadings tr').length;
    this.state.rowCount = rowCount;
    $(".btn-default").css("background-color", "#05a4b5");
    $(".btn-default").css("color", "white");

    updateData = [];
    this.setState({
      rowCount: rowCount,
    })
    this.GetOrderDetails();
    this.DeleteButton();
    window.scrollTo(0, 0);
    this.selectProduct();
    this.calculationFunc();

  }
  calculationFunc() {
    var self = this;
    self.state.subtotal1 = "0 ";
    self.state.totalitemqty = "0";
    self.state.totalgst = "0";
    self.state.TotalWithoutGST = "0";
    self.state.subtotal_cgst = "0";
    self.state.subtotal_sgst = "0";
    self.state.subtotal_igst = "0";
    self.state.totalgst_rs = "0";


    self.setState({
      rate: self.state.rate,
      quantity: self.state.quantity,
      totalitemqty: self.state.totalitemqty,
      TotalWithoutGST: self.state.TotalWithoutGST,
      subtotal_cgst: self.state.subtotal_cgst,
      subtotal_sgst: self.state.subtotal_sgst,
      subtotal_igst: self.state.subtotal_igst,
      totalgst_rs: self.state.totalgst_rs,
      totalgst: self.state.totalgst,
      total: self.state.total,
      cgsta: self.state.cgsta,
      sgsta: self.state.sgsta,
      igsta: self.state.igsta,
      subtotal1: self.state.subtotal1,
      finalAmount: self.state.finalAmount,
      shipping: self.state.shipping,
      adjustment: self.state.adjustment,
      discount: self.state.discount,

    })

    $("#tablecontents tr").each(function () {
      var currentRow = $(this);

      self.state.rate = currentRow.find("td:eq(1)").text();
      self.state.quantity = currentRow.find("td:eq(2)").text();
      self.state.total = currentRow.find("td:eq(6)").text();
      self.state.cgst = currentRow.find("td:eq(7)").text();
      self.state.sgst = currentRow.find("td:eq(8)").text();
      self.state.igst = currentRow.find("td:eq(9)").text();
      self.state.finalAmount = currentRow.find("td:eq(10)").text();




      self.state.subtotal1 = Math.round((Number(self.state.subtotal1) + Number(self.state.finalAmount)));
      if (self.state.quantity != "-") {
        self.state.totalitemqty = Math.round(Number(self.state.totalitemqty) + Number(self.state.quantity));
      }


      self.state.totalgst_rs = Math.round(((0.01 * Number(self.state.cgst)) * Number(self.state.total)) + (0.01 * Number(self.state.sgst) * Number(self.state.total)) + (0.01 * Number(self.state.igst) * Number(self.state.total)));

      self.state.totalgst = Math.round(Number(self.state.totalgst) + Math.round(Number(self.state.totalgst_rs)));
      self.state.TotalWithoutGST = Math.round(Number(self.state.TotalWithoutGST) + Number(self.state.total));


      subtotal_cgst = Math.round(Number(self.state.subtotal_cgst) + ((0.01 * Number(self.state.cgst)) * Number(self.state.total)));
      subtotal_sgst = Math.round(Number(self.state.subtotal_sgst) + ((0.01 * Number(self.state.sgst)) * Number(self.state.total)));
      subtotal_igst = Math.round(Number(self.state.subtotal_igst) + ((0.01 * Number(self.state.igst)) * Number(self.state.total)));
      var sum = Math.round(Number(self.state.subtotal1) + Number(self.state.adjustment) + Number(self.state.shipping));
      self.state.finalAmountTotal = Math.round(Number(sum) - Number(self.state.discount));

    });
    self.state.description = "";
    self.state.rate = "";
    self.state.quantity = "";
    self.state.total = "";
    self.state.cgsta = "";
    self.state.sgsta = "";
    self.state.igsta = "";
    self.state.finalAmount = "";
    //   self.state.TotalWithoutGST="";
    $('[name=productName]').val('');

    self.setState({

      description: '',
      rate: '',

      quantity: '',
      total: '',
      cgsta: '',
      sgsta: '',
      igsta: '',
      finalAmount: '',
      productName: '',
      TotalWithoutGST: self.state.TotalWithoutGST,
      subtotal1: self.state.subtotal1,
      totalgst: self.state.totalgst,
      totalitemqty: self.state.totalitemqty,
      finalAmountTotal: this.state.finalAmountTotal,
      subtotal_cgst: self.state.subtotal_cgst,
      subtotal_sgst: self.state.subtotal_sgst,
      subtotal_igst: self.state.subtotal_igst,
      shipping: self.state.shipping,
      adjustment: self.state.adjustment,
      discount: self.state.discount,
      advance: 0,

    });


    self.state.amountInWords = Case.capital(convert_to_words(Number(self.state.subtotal1), self.state.currencyCode));

  }
  GetOrderDetails() {

    var self = this;


    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        date: this.props.date,
        id: this.props.id,
        companyId: this.state.companyId,
        empSites: GetEmployeeSite()
      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/PurchaseReport/DailyPurchaseReportData",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {


        var tab;
        var count = data.length;

        var no;
        $.each(data, function (i, item) {
          no = parseInt(i + 1);
          if (item.product != null) {


            self.state.productName = item.product;
            self.state.rate = item.rate;
            self.state.quantity = item.qty;
            self.state.total = item.total;
            self.state.cgsta = item.cgst;
            self.state.sgsta = item.sgst;
            self.state.igsta = item.igst;
            self.state.finalAmount = item.amount;
            self.state.description = item.description;
            self.state.productId = item.productId;
            self.state.discountAmount1 = item.discountAmount;
            self.state.discountPercentage1 = item.discountPercentage;
            self.state.prefinalAmount1 = item.prefinalAmount;


        
            self.setState({
              productName: self.state.productName,
              rate: self.state.rate,
              quantity: self.state.quantity,
              total: self.state.total,
              cgsta: self.state.cgsta,
              sgsta: self.state.sgsta,
              igsta: self.state.igsta,
              finalAmount: self.state.finalAmount,
              description: self.state.description,
              productId: self.state.productId,
              discountAmount1: self.state.discountAmount,
              discountPercentage1: self.state.discountPercentage,
              prefinalAmount1: self.state.prefinalAmount,
            })

            tab += '<tr><td>' + self.state.productName + '</td>'
              + '<td>' + self.state.rate + '</td><td>' + self.state.quantity + '</td>'
              + '<td>' + self.state.total + '</td><td>' + self.state.discountPercentage1 + '</td><td>' + self.state.discountAmount1 + '</td>'
              + '<td>' + self.state.prefinalAmount1 + '</td><td>' + self.state.cgsta + '</td><td>' + self.state.sgsta + '</td>'
              + '<td>' + self.state.igsta + '</td><td>' + self.state.finalAmount + '</td><td  class="heightWidth" >' + self.state.description + '</td> <td class="heightWidth">' + self.state.productId + '</td>'
              + ' <td  class="heightWidth" >Exist</td> '
              + ' <td><button id="delete">Delete</button></td></tr>';



          }
        })

        $("#tablecontents").append(tab);
        $(".heightWidth").hide();
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





  PurchaseInvoiceFunc() {

    var self = this;

    var arrData = [];
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
      var status = currentRow.find("td:eq(13)").text();

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
      arrData.push(status + "@");
    });

    this.state.saleType = "saleSale";
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
              invoiceNo: this.state.invoiceNo,
              orderNumber: this.state.orderNumber,
              invoiceDate: this.state.invoiceDate,
              expiryDate: this.state.date,
              dueDate: this.state.dueDate,
              saleType: this.state.saleType,
              invoiceData: this.state.invoiceData.toString(),
              updateQuantity: this.state.updateQuantity.toString(),
              date: this.state.date,
              vendorId: this.state.vendorId,
              contactNo: this.state.contactNo,
              totalcgst: subtotal_cgst,
              totalsgst: subtotal_sgst,
              totaligst: subtotal_igst,
              discount: this.state.discount,
              purchaseInvoiceNo: this.state.purchaseInvoiceNo,
              subtotal1: this.state.subtotal1,
              totalgst: this.state.totalgst,
              finalAmountTotal: this.state.finalAmountTotal,
              adjustment: this.state.adjustment,
              totalitemqty: this.state.totalitemqty,
              totalgst: this.state.totalgst,
              shipping: this.state.shipping,
              payment_status: this.state.payment_status,
              companyId: this.state.companyId,
              address: this.state.address,
              gstNo: this.state.gstNo,
              email: this.state.email,
              companyName: this.state.companyName,
              staffId: self.state.staffId,
              employeeName: self.state.employeeName,
              role: self.state.role,
              site: GetCurrentSite()
            }),

            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/vendororder/updatepurchaseorder",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {

              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Purchase order is Updated Successfully',
                showConfirmButton: false,
                timer: 2000
              })



              self.state.invoiceNo = "";
              self.state.orderNumber = "";
              self.state.invoiceDate = "";
              self.state.dueDate = "";
              self.state.description = "";
              self.state.productId = "";
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
              self.state.selectedProductName = "";
              $("#tablecontents").empty();
              $("#tableHeadings").hide();
              $('#productName').html('');


              $('[name=productName]').val('');
              $('[name=vendorName]').val('');
              $('#vendorName').html('');
              self.setState({
                vendorName: '',
                invoiceNo: '',
                orderNumber: '',
                invoiceDate: '',
                dueDate: '',
                description: '',

                rate: '',
                selectedProductName: '',
                quantity: '',
                total: '',
                cgsta: '',
                sgsta: '',
                igsta: '',
                finalAmount: '',
                saleType: '',
                productName: '',
                subtotal1: 0,
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

              });

              ReactDOM.render(
                <Router >
                  <div>
                    <Route path="/" component={PurchaseInvoiceList} />
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
        else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Please Select Due Dates',
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
        title: 'Kindly Select Vendor Name',
        showConfirmButton: false,
        timer: 2000
      })
    }
    //  var numtoword = numberToWord(Number(self.state.subtotal1));
    // $("#numWords").text(Case.capital(numtoword));

    self.state.amountInWords = Case.capital(convert_to_words(Number(self.state.subtotal1), self.state.currencyCode));
  }

  ViewFunc() {
    ReactDOM.render(
      <Router >
        <div>
          <Route path="/" component={PurchaseInvoiceList} />
        </div>
      </Router>, document.getElementById('contentRender'));
  }

  CancelFunc() {
    ReactDOM.render(
      <Router >
        <div>
          <Route path="/" component={PurchaseInvoiceList} />
        </div>
      </Router>, document.getElementById('contentRender'));
  }


  AddToCart() {
    var self = this;

    var currentproductvalue;
    if (this.state.finalAmount != 0 && (this.state.productName != 0) && (this.state.cgsta != '') && (this.state.sgsta != '') && (this.state.igsta != '')) {
      //var tab = '<thead><tr class="headcolor" style="color: white; background-color: #486885; font-size: 12px;">  <th>ProductName</th><th>Size</th><th>Rate</th><th>Amount</th><th>Quantity</th><th>Total</th><th>cgst (%)</th><th>SGST (%)</th><th>IGST (%)</th><th>Final Amount</th></tr></thead>';
      this.state.subtotal1 = Math.round(Number(this.state.subtotal1) + Number(this.state.finalAmount));
      if (this.state.quantity != "-") {
        this.state.totalitemqty = Math.round(Number(this.state.totalitemqty) + Number(this.state.quantity));
      }


      var sum = Math.round(Number(self.state.subtotal1) + Number(self.state.adjustment) + Number(self.state.shipping));
      self.state.finalAmountTotal = Math.round(Number(sum) - Number(self.state.discount));


      this.state.totalgst = Math.round(Number(this.state.totalgst) + Math.round(Number(this.state.totalgst_rs)));
      this.state.TotalWithoutGST = (Number(this.state.TotalWithoutGST) + Number(this.state.prefinalAmount)).toFixed(2);

      subtotal_cgst = (Number(subtotal_cgst) + ((0.01 * Number(self.state.cgsta)) * Number(self.state.prefinalAmount))).toFixed(2);
      subtotal_sgst = (Number(subtotal_sgst) + ((0.01 * Number(self.state.sgsta)) * Number(self.state.prefinalAmount))).toFixed(2);
      subtotal_igst = (Number(subtotal_igst) + ((0.01 * Number(self.state.igsta)) * Number(self.state.prefinalAmount))).toFixed(2);

      var payament_status_details;

      var tab = '<tr style={{backgroundColor: "white",fontColor:"black",fontWeight:"bold"}} id="tabletextcol" ><td>' + self.state.productName + '</td>'
        + '<td>' + self.state.rate + '</td><td>' + self.state.quantity + '</td>'
        + '<td>' + self.state.total + '</td><td>' + self.state.discountPercentage + '</td>'
        + '<td>' + self.state.discountAmount + '</td><td>' + self.state.prefinalAmount + '</td>'
        + '<td>' + self.state.cgsta + '</td>'
        + '<td>' + self.state.sgsta + '</td><td  id="Gstcal" >' + self.state.igsta + '</td>'
        + '<td  id="finalAmountcal" >' + self.state.finalAmount + '</td>'
        + '<td  class="heightWidth" >' + self.state.description + '</td>'
        + '<td  class="heightWidth" >' + self.state.productId + '</td>'
        + '<td  class="heightWidth" >New</td> <td><button id="delete">Delete</button></td></tr>';

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
      // self.state.TotalWithoutGST="";

      self.state.discountPercentage = 0;
      self.state.discountAmount = 0;
      self.state.prefinalAmount = 0;
      $('[name=productName]').val('');
      $("#quantity").show();
      $("#quantity1").show();
      $("#total").show();
      $("#total1").show();
      self.setState({
        discountPercentage: 0,
        discountAmount: 0,
        prefinalAmount: '',
        description: '',
        rate: '',
        quantity: '',
        total: '',
        cgsta: '',
        sgsta: '',
        igsta: '',
        finalAmount: '',
        productName: '',
        totalgst: this.state.totalgst,
        finalAmountTotal: this.state.finalAmountTotal,
        totalitemqty: this.state.totalitemqty,
        TotalWithoutGST: this.state.TotalWithoutGST,

        shipping: this.state.shipping,
        adjustment: this.state.adjustment,
        discount: this.state.discount,

      });
      advancebalance_calc = this.state.subtotal1;

      // var numtoword = numberToWord(Number(self.state.subtotal1));
      this.state.amountInWords = convert_to_words(Number(self.state.subtotal1), this.state.currencyCode);
      this.state.amountInWords = Case.capital(this.state.amountInWords)

    }
    else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Select Product and Make sure rate is specified',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }
  cancelFunc() {

    ReactDOM.render(<PurchaseReportUpdate />, document.getElementById("contentRender"));
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
      var igst_item_qty_rowcell = currentRow.find("td:eq(9)").html(); // get current row 2nd table cell TD value

      var subtotalvaluedecrement = currentRow.find("td:eq(10)").html(); // get current row 2nd table cell TD value
      var productId = currentRow.find("td:eq(12)").html();
      var status = currentRow.find("td:eq(13)").html(); // get current row 2nd table cell TD value

      var zero = "Exist";

      if ((String(status) === String(zero))) {
        updateData.push(total_item_qty_rowcell);
        updateData.push(productId);
        updateData.push(self.state.companyId);


        self.state.updateQuantity = updateData.toString();

        self.setState({
          updateQuantity: updateData.toString(),
        })
        self.state.subtotal1 = Math.round(Number(self.state.subtotal1) - Number(subtotalvaluedecrement));

        if (total_item_qty_rowcell != "-") {
          self.state.totalitemqty = Math.round(Number(self.state.totalitemqty) - Number(total_item_qty_rowcell));
        }
        var sum = Math.round(Number(self.state.subtotal1));
        self.state.finalAmountTotal = self.state.subtotal1;
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
          finalAmountTotal: self.state.finalAmountTotal,
          shipping: 0,
        });
        currentRow.remove();
        var subtotal1 = self.state.subtotal1;

        if (subtotal1 == 0) {
          $("#tableHeadings").hide();
        }

        var numtoword = numberToWord(Number(self.state.subtotal1));
        $("#numWords").text(Case.capital(numtoword));

      }
      else {
        self.state.subtotal1 = Math.round(Number(self.state.subtotal1) - Number(subtotalvaluedecrement));

        if (total_item_qty_rowcell != "-") {
          self.state.totalitemqty = Math.round(Number(self.state.totalitemqty) - Number(total_item_qty_rowcell));
        }
        var sum = Math.round(Number(self.state.subtotal1));
        self.state.finalAmountTotal = self.state.subtotal1;

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
          finalAmountTotal: self.state.finalAmountTotal,
          shipping: 0,
        });
        currentRow.remove();
        var subtotal1 = self.state.subtotal1;

        if (subtotal1 == 0) {
          $("#tableHeadings").hide();
        }

        //  var numtoword = numberToWord(Number(self.state.subtotal1));
        //  $("#numWords").text(Case.capital(numtoword));

        self.state.amountInWords = Case.capital(convert_to_words(Number(self.state.subtotal1), self.state.currencyCode));

      }



    });
  }



  BackbtnFunc() {
    var finalRowCount = $('#tableHeadings tbody tr').length;

    if (this.state.rowCount == finalRowCount) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={PurchaseInvoiceList} />
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

          <Route path="/" component={PurchaseInvoiceList} />


        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }
  CancelBack() {



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
    if (this.state.modalproductType == "service") {

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
            site: GetCurrentSite()
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
              self.selectProduct();
            }

            // self.GetOrderDetails();
            // self.DeleteButton();
            // window.scrollTo(0, 0);
            // self.selectProduct();
            // self.calculationFunc();

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




  clearFunc() {
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

    if (this.state.productType == "service" || this.state.productType == "general" || this.state.productType == "labour") {
      self.state.total = self.state.rate;

    } else {
      self.state.total = Math.round(Number(self.state.rate) * Number(self.state.quantity));
    }
    if (Number(self.state.discountAmount) > Number(self.state.total)) {

      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: "Discount Amount Exceeds Total" + self.state.discountAmount,
        showConfirmButton: false,
        timer: 2000
      })

      self.state.discountAmount = 0;
      self.state.discountPercentage = 0;
      self.setState({
        discountAmount: '0',
        discountPercentage: '0',
      })
    } else {
      self.state.discountPercentage = Number(self.state.discountAmount) * (100 / (Number(self.state.total))).toFixed(2);
      self.state.discountAmount = Number(self.state.discountAmount).toFixed(2);
    }


    self.state.prefinalAmount = (Number(self.state.total) - Number(self.state.discountAmount)).toFixed(2);

    self.state.finalAmount = (Number(self.state.prefinalAmount) + (((0.01 * Number(self.state.cgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.sgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.igsta)) * Number(self.state.prefinalAmount)))).toFixed(2);

    self.state.totalgst_rs = (((0.01 * Number(self.state.cgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.sgsta)) * Number(self.state.prefinalAmount)) + ((0.01 * Number(self.state.igsta)) * Number(self.state.prefinalAmount))).toFixed(2);

    self.setState({

      total: self.state.total,
      finalAmount: self.state.finalAmount,
      totalgst_rs: self.state.totalgst_rs,
      discountPercentage: self.state.discountPercentage,
      prefinalAmount: self.state.prefinalAmount,



    });



  }
  render() {
    return (
      <div class="container">
        <div className="">
          <div className="">
            <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
          </div>
          <div class="inv_HeaderCls">
            <h3>Update Purchase Invoice</h3>
          </div>
        </div>
        <div class="card">
          <div>
            <div class="card-body">
              <form class="form-horizontal form-bordered">
                <div class="form-group">
                  <label class="control-label col-sm-2" for="vendorName">Vendor/Company Name</label>
                  <div class="col-sm-10">
                    <input readOnly type="text" class="form-control" value={this.state.vendorName} onChange={this.handleUserInput} name="vendorName" id="vendorName" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-sm-2" for="invoiceNo">InvoiceNo</label>
                  <div class="col-sm-10">
                    <input readOnly type="text" class="form-control" value={this.state.invoiceNo} onChange={this.handleUserInput} name="invoiceNo" id="invoiceNo" />

                  </div>

                </div>


                <div class="form-group">
                  <label class="control-label col-sm-2" for="orderNumber">Order Number</label>
                  <div class="col-sm-10">
                    <input type="text" readOnly class="form-control" value={this.state.orderNumber} onChange={this.handleUserInput} name="orderNumber" id="orderNumber" />
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
                        <td><input type="number" class="form-control" value={this.state.discountPercentage} onChange={this.handlecgstSgstIgst} name="discountPercentage" id="discountPercentage" autocomplete="off" />
                        </td>
                        <td><input type="number" class="form-control" value={this.state.discountAmount} onChange={this.handlediscountAmount} name="discountAmount" id="discountAmount" autocomplete="off" />
                        </td>
                        <td><input type="number" readOnly class="form-control" value={this.state.prefinalAmount} onChange={this.handlecgstSgstIgst} name="prefinalAmount" id="prefinalAmount" autocomplete="off" />
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
                        {/*<th>IGST (%)</th>*/}
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
                    <p class="lead">Amount in Words:   <span >{this.state.amountInWords}</span></p>

                  </div>

                  <div class="col-sm-6">
                    <div class="table-responsive">
                      <table class="table">
                        <tbody>
                          <tr><th style={{ width: "50%" }}>Total(WithoutTax):</th>
                            <td><input name="TotalWithoutGST" readOnly type="text" value={this.state.TotalWithoutGST} id="TotalWithoutGST" class="form-control" />{this.state.currencySymbol}</td>
                            <input type="hidden" name="TotalWithoutGST" id="TotalWithoutGST" />  </tr>

                          <tr><th>Total Tax</th>
                            <td>  {this.state.totalgst} <span id="tgst"></span></td>
                          </tr>

                          <tr><th style={{ width: "50%" }}>Subtotal:</th>
                            <td><input name="subtotal" readOnly type="text" value={this.state.subtotal1} id="subtotal" onChange={this.subtotalcalculationFunc} class="form-control" />{this.state.currencySymbol}</td>
                            <input type="hidden" name="subtotal1" id="subtotal1" />  </tr>

                          <tr><th>Shipping:</th>
                            <td>
                              <input name="shipping" type="text" id="shipping" value={this.state.shipping} onkeyup="final_total();" onChange={this.AdjustmentShippingCalc} class="form-control" /></td>
                          </tr>
                          <tr><th>Adjustment:</th>
                            <td>
                              <input name="adjustment" value={this.state.adjustment} type="number" min="1" id="adjustment" onkeyup="final_total();" onChange={this.AdjustmentShippingCalc} class="form-control" /></td>
                          </tr>
                          <tr><th>Discount ({this.state.currencySymbol}:</th><td>
                            <input name="discount" type="number" min="1" value={this.state.discount} id="discount" onkeyup="final_total();" onChange={this.DiscountCalc} class="form-control" /></td>
                          </tr>
                          <tr> <th>Total:</th>
                            <td name="finalAmountTotal" class="grand_total" >{this.state.currencySymbol}  {this.state.finalAmountTotal} <span id="finalAmountTotal"></span></td>
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
          <div class="modal fade" id="myModal1" data-backdrop="false"   >
            <div class="modal-dialog">

              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" style={{ align: "center", display: "contents" }}>Add Product</h4>
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
                            <option value="product">Product</option>
                            <option value="service">Service</option>
                          </select>
                        </div>
                      </div>
                      <div className={`form-group ${this.errorClass1(this.state.formErrors.modalproductCategory)}`}>
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
                        <label class="control-label col-sm-2" for="modalsaleRate"> Sale Rate <span style={{ color: "red" }}>*</span></label>
                        <div class="col-sm-10">
                          <input type="number" min="0" class="form-control" value={this.state.modalsaleRate} onChange={this.handleUserInputProduct} name="modalsaleRate" id="modalsaleRate" placeholder="saleRate...  " />
                        </div>
                      </div>

                      <div className={`form-group ${this.errorClass1(this.state.formErrors.modalpurchaseRate)}`}>
                        <label class="control-label col-sm-2" for="modalpurchaseRate"> Purchase Rate <span style={{ color: "red" }}>*</span></label>
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

export default PurchaseReportUpdate;