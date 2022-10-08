import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../registerServiceWorker';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import $ from 'jquery';
import Case from "case";
//import datepicker from 'jquery-ui/ui/widgets/datepicker';
import DashboardOverall from '../MaincontentDashboard/DashboardOverall';
//css

import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
//import './datepicker.css';
import CryptoJS from 'crypto-js';
import InvoiceList from '../InvoiceList';
import SelectSearch from 'react-select';
import { thisExpression } from '@babel/types';
import _ from 'underscore';
//import toast from 'siiimple-toast';
//import 'siiimple-toast/dist/style.css';// style required
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Select from 'react-select';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import moment from 'moment';


import Checkbox from '@material-ui/core/Checkbox';
import {
  GetEmployeeSite, GetCurrentSite, GetSiteDetails,
  GetCurrencies, SetCurrentPage, OffsetValueCalcFunc, GetDynamicFieldsName
} from '../ConstSiteFunction';
import { SaleInvoicePDF, DeleteSaleInvoicePDF } from '../Invoices/GeneratePDF/GeneratePDF';
import { BackButtonComponent, Double_BackButtonComponent } from '../ServiceRegistration/ButtonComponent';

import convert_to_words from '@amirsanni/number-to-words';

import currencyFormatter from "currency-formatter";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { CheckNumberFormat, CheckNumberFormat_WithoutDecimal, Truncate_2DecimalPlaces } from './InvoiceValidations';
import { InvoiceCartIcons, ToastWarningIcons, ToastSuccessIcons, InformationIcon } from '../ServiceRegistration/IconComponents';
import Modal from 'react-modal';
import { InvoiceProductQtyAddModal, InvoiceProductQtyMinusModal } from '../CommonModalPages';
import number_to_words from '@amirsanni/number-to-words';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import InvoiceEnquiry, { AddEnquiryDataFunc } from './InvoiceEnquiry';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import AddProduct1 from '../AddProduct';
import CustomerComponent from '../ServiceRegistration/CustomerComponent';
import { CurrencyFormat } from './CurrencyFormater';
import { Notification } from 'rsuite';

/* INVOICE CALCULATION FORMULA

//APPLICABLE CALCULATIONS 
CALCULATION-1 //USED IN CODE
    //CART ITEM CALCULATION
1. item price x item amount = item subtotal
2. (item subtotal - item discount ) + item tax = item total
    //SUMMARY CALCULATION
3. (item total - invoice discount ) + invoice tax = invoice total

CALCULATION-2 //NOT USED IN CODE BUT ANOTHER WAY OF IMMPLEMENTATION
    //CART ITEM CALCULATION
1. item price x item amount = item subtotal
2. (item subtotal + item tax ) - item discount = item total
    //SUMMARY CALCULATION
3. (item total + invoice tax ) - invoice discount = invoice total


*/



const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: "491px"
  }
};

var AjaxData = "";
var AjaxData_ProductList = "";



class EstimateInvoice extends Component {


  constructor(data) {
    super(data)

    window.estimateInvoiceComponent = this;

    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var staffName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    this.state = {
      organizationName: companyName,
      companyId: companyId,
      staffId: staffId,
      staffName: staffName,
      cartDataInfo: 'Empty',
      customerArrayList: '',
      productArrayList: '',
      staffArrayList: '',
      productInventoryArrayList: '',

      customerOptions: [],
      productOptions: [],
      staffOptions: [],

      selectedCustomerName: '',
      selectedProductName: '',
      selectedstaffName: '',

      orderNumber: '',
      invoiceDate: '',
      dueDate: '',

      productQuantity: '',
      productRate_Each: '',
      productTotal: '',

      productDiscountPercentage: '',
      productDiscountAmount: '',
      productSubtotalAmount: '',

      product_CGST_Percentage: 0,
      product_SGST_Percentage: 0,
      productFinalAmount: '',

      productQtyAddModal: false,
      productQtyMinusModal: false,

      selected: -1,

      cartProductId: '',
      invoiceAmt_Paid: '',
      discountAmt: 0,

      emailCheckBox: false,
      smsCheckBox: false,

      emailId: '',
      contactNo: '',
      invoice_withEnquiry: "no",

      customerName: '',

      cartData: [],
      cartColumns: [],

      //INVOICE ENQUIRY DETAILS VARIABLE
      isEnquiryPaneOpen: false,
      enquiryCartData: [],


    }
    //this.CurrencyFormat=this.CurrencyFormat.bind(this);
    this.EstimateInvoice_CurrencyChange = EstimateInvoice_CurrencyChange.bind(this);

    this.EditProductDetails = this.EditProductDetails.bind(this);
    this.AddProductQtyFunc = this.AddProductQtyFunc.bind(this);
    this.MinusProductQtyFunc = this.MinusProductQtyFunc.bind(this);

    this.ProductQtyAddcloseModal = this.ProductQtyAddcloseModal.bind(this);
    this.ProductQtyMinuscloseModal = this.ProductQtyMinuscloseModal.bind(this);

    this.DeleteCartProductFunc = this.DeleteCartProductFunc.bind(this);
    this.DeleteAllProductInCartFunc = this.DeleteAllProductInCartFunc.bind(this);

    this.DeleteProduct_ServiceFunc = this.DeleteProduct_ServiceFunc.bind(this);

    this.SetEnquiryTableData = this.SetEnquiryTableData.bind(this);
    this.AddEnquiryFunc = this.AddEnquiryFunc.bind(this);

    this.AddCustomerQuickLinkFunc = this.AddCustomerQuickLinkFunc.bind(this);
    this.AddCustomerQuickLinkCloseFunc = this.AddCustomerQuickLinkCloseFunc.bind(this);
    this.SubmitCustomerInfoSlide = this.SubmitCustomerInfoSlide.bind(this);

    this.AddProductQuickLinkFunc = this.AddProductQuickLinkFunc.bind(this);
    this.AddProductQuickLinkCloseFunc = this.AddProductQuickLinkCloseFunc.bind(this);
    this.SubmitProductInfoSlide = this.SubmitProductInfoSlide.bind(this);

  }


  componentDidMount() {

    var self = this;

    //CLEAR THE PAGE DATA FIRST
    ProductClear(this);
    Above_CartFieldClear(this);
    SummaryClear(this);

    //SET THE CURRENT PAGE/COMPONENET NAME IN LOCAL STORAGE
    SetCurrentPage("EstimateInvoice");
    localStorage.setItem('CartDataInfo', CryptoJS.AES.encrypt(this.state.cartDataInfo, "shinchanbaby"));

    //INITIALLY INSUFFICIENT MSG PROPMT WILL NOT BE AVAILABLE
    this.InsufficientDiv_ShowHide("hide");

    //INITIALLY AN INVOICE WILL NOT HAVE THE ENQUIRY SO THE SAVEINVOICE & ENQUIRY BUTTON IS DISABLED
    $("#saveinvoicewithenquiry").prop('disabled', true);

    /*
    FUNCTION FOR KEY PRESS LIKE 
    ENTER - ADDTOCART & SAVEINVOICE & SAVEINVOICE WITH ENQUIRY
    */
    $(document).keypress(function (event) {
      // alert('Handler for .keypress() called. - ' + event.charCode);

      if (event.charCode == 13) {
        //  alert("ENTER PRESSED");
        if (self.state.productId != "" && self.state.productId != undefined &&
          (self.state.isAddCustomerPaneOpen == false || self.state.isAddCustomerPaneOpen == undefined)
          && (self.state.isAddProductPaneOpen == false || self.state.isAddProductPaneOpen == undefined)
          && (self.state.isEnquiryPaneOpen == false || self.state.isEnquiryPaneOpen == undefined)
          && (self.state.productQtyAddModal == false || self.state.productQtyAddModal == undefined)
          && (self.state.productQtyMinusModal == false || self.state.productQtyMinusModal == undefined)) {
          //   alert("ADD TO CART CALLED");
          self.AddToCart();
        } else if (self.state.cartData.length != 0 &&
          (self.state.isAddCustomerPaneOpen == false || self.state.isAddCustomerPaneOpen == undefined)
          && (self.state.isAddProductPaneOpen == false || self.state.isAddProductPaneOpen == undefined)
          && (self.state.isEnquiryPaneOpen == false || self.state.isEnquiryPaneOpen == undefined)
          && (self.state.productQtyAddModal == false || self.state.productQtyAddModal == undefined)
          && (self.state.productQtyMinusModal == false || self.state.productQtyMinusModal == undefined)) {
          //   alert("SAVE INVOICE MAIN ELSE  CALLED");
          if (self.state.enquiryCartData.length != 0) {
            //     alert("SAVE INVOICE WITH ENQUIRY CALLED");
            self.SaveInvoice_WithEnquiryFunc();
            self.SaveInvoiceFunc();
          } else {
            //   alert("SAVE INVOICE CALLED");
            self.SaveInvoiceFunc();
          }

        } else if (self.state.cartData.length == 0 &&
          (self.state.isAddCustomerPaneOpen == false || self.state.isAddCustomerPaneOpen == undefined)
          && (self.state.isAddProductPaneOpen == false || self.state.isAddProductPaneOpen == undefined)
          && (self.state.isEnquiryPaneOpen == false || self.state.isEnquiryPaneOpen == undefined)
          && (self.state.productQtyAddModal == false || self.state.productQtyAddModal == undefined)
          && (self.state.productQtyMinusModal == false || self.state.productQtyMinusModal == undefined)) {
          toast.error("! Cart is empty", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            marginTop: "60px",
          });
        }
      }

    });

    /*
    FUNCTION FOR KEY PRESS LIKE 
    shft+u - CLEAR CART FIELDS
    shft+y - CANCEL ENTIRE INVOICE 
    */
    $(document).keydown(function (e) {
      if (e.keyCode == 85 && e.shiftKey) {
        //shit+u
        //    alert('ctrl clear');
        self.ProductClearFunc();
      } else if (e.keyCode == 89 && e.shiftKey) {
        //shift+y
        //  alert('ctrl cancel');
        self.CancelFunc();
      }
    });

    //SETTING UP DROPDOWN DATA FOR PAYMENT MODE
    var paymentOptions = [];
    paymentOptions.push({ label: "Cash", value: "Cash" });
    paymentOptions.push({ label: "Card", value: "Card" });
    paymentOptions.push({ label: "Cheque", value: "Cheque" });
    paymentOptions.push({ label: "Online", value: "Online" });
    paymentOptions.push({ label: "UPI", value: "UPI" });

    this.state.paymentoptions = paymentOptions;
    this.setState({
      paymentoptions: this.state.paymentoptions
    })

    /*
    GET BASIC INFO REQUIRED FOR RENDERING THE
    INVOICE PAGE INITIALLY
    */
    this.GetData_For_Invoice();

    //SETTING UP INVOICE DATE BASED ON EMPLOYEE WORKING SITE TIMEZONE
    var dateTimeData = OffsetValueCalcFunc();

    console.log("dateTimeData :", dateTimeData);
    this.state.date = dateTimeData.date;
    this.state.time = dateTimeData.time;
    this.state.invoiceDate = dateTimeData.date;
    this.state.invoiceDueDate = dateTimeData.date;

    this.setState({
      date: this.state.date,
      time: this.state.time,
      invoiceDate: this.state.invoiceDate,
      invoiceDueDate: this.state.invoiceDueDate,
    })

    //DATE PICKER FUNCTIONALITY FOR INVOICE DATE
    $('#invoicedate').datepicker({

      onSelect: function (date) {

        var dt = new Date(date);
        self.state.invoiceDate = date;

        self.setState({
          invoiceDate: self.state.invoiceDate,
        });
      },

      dateFormat: 'yy-mm-dd',
      minDate: '0',
      maxDate: '1M',
      numberOfMonths: 1
    });

    //DATE PICKER FUNCTIONALITY FOR INVOICE DUE DATE
    $('#invoiceduedate').datepicker({

      onSelect: function (date) {

        var dt = new Date(date);
        var dateCheck = moment(date).isBefore(self.state.invoiceDate);

        if (dateCheck == true) {
          toast.error("! Due date cannot be before Invoice date ", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            marginTop: "60px",
          });

        } else {
          self.state.invoiceDueDate = date;

          self.setState({
            invoiceDueDate: self.state.invoiceDueDate,
          });
        }

      },

      dateFormat: 'yy-mm-dd',
      minDate: '0',
      maxDate: '3M',
      numberOfMonths: 3
    });


    //CURRENCY FORMATTER
    this.CurrencyFormat();


    //DYNAMIC FIELD NAMES
    var dynamicTaxData = GetDynamicFieldsName("Tax");
    console.log("dynamicTaxData :", dynamicTaxData);
    var tax1LabelName = _.findWhere(dynamicTaxData, { fieldLabelName: 'tax1' });
    this.state.tax1LabelName = tax1LabelName.fieldTextName;
    var tax2LabelName = _.findWhere(dynamicTaxData, { fieldLabelName: 'tax2' });
    this.state.tax2LabelName = tax2LabelName.fieldTextName;
    var tax3LabelName = _.findWhere(dynamicTaxData, { fieldLabelName: 'tax3' });
    this.state.tax3LabelName = tax3LabelName.fieldTextName;
    this.setState({
      tax1LabelName: this.state.tax1LabelName,
      tax2LabelName: this.state.tax2LabelName,
      tax3LabelName: this.state.tax3LabelName,
    })
    this.state.cartColumns = [
      {
        Header: 'SNO',
        accessor: 'SNO'
      },
      {
        Header: 'Item',
        accessor: 'Item'
      },
      {
        Header: 'ProductId',
        accessor: 'ProductId',
        show: false
      }, {
        Header: 'ProductType',
        accessor: 'ProductType',
        // show:false 
      },
      {
        Header: 'Rate',
        accessor: 'Rate'
      },
      {
        Header: 'Qty',
        accessor: 'Qty'
      },
      {
        Header: 'Total',
        accessor: 'Total'
      },
      {
        Header: 'Discount(%)',
        accessor: 'DiscountPercentage'
      },
      {
        Header: 'Discount Amt',
        accessor: 'DiscountAmt'

      },
      {
        Header: 'Sub Total',
        accessor: 'SubTotal',
      },
      {
        Header: this.state.tax1LabelName + '(%)',
        accessor: 'CGST_Percentage',
        show: false,
      },
      {
        Header: this.state.tax2LabelName + '(%)',
        accessor: 'SGST_Percentage',
        show: false,
      },
      {
        Header: this.state.tax1LabelName + 'Amt',
        accessor: 'CGSTAmt',
        show: false,
      },
      {
        Header: this.state.tax2LabelName + 'Amt',
        accessor: 'SGSTAmt',
        show: false,
      },
      {
        Header: 'Final Amt',
        accessor: 'FinalAmt',
      },
    ]

  }

  /*
  FUNCTION FOR SETTING UP THE CURRENCY DETAILS BY DEFAULT
  */
  CurrencyFormat() {


    var currencyData = CurrencyFormat();
    console.log("currencyData :", currencyData);

    this.state.currencySymbol = currencyData.currencySymbol;
    this.state.currencyCode = currencyData.currencyCode;
    this.state.amountInWords = "";

    this.setState({
      currencySymbol: this.state.currencySymbol,
      currencyCode: this.state.currencyCode,
      amountInWords: this.state.amountInWords,
    })

  }

  /*
  THIS FUNCTION IS USED TO GET DATA
  THAT ARE SUPPOSED TO BE PRE-POPULATED
  WHEN THE INVOICE PAGE IS LOADED
  CustomerDetails & Product/Service Details
  */
  GetData_For_Invoice() {

    var self = this;
    AjaxData = "";
    AjaxData_ProductList = "";

    self.state.customerArrayList = "";
    self.state.productArrayList = "";
    self.state.staffArrayList = "";
    self.state.productInventoryArrayList = "";

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,

      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/saleInvoice/SelectBasicInvoiceDetails",


      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {

        console.log("DID MOUNT INVOICE DETAILS :", data);


        AjaxData = data;
        AjaxData_ProductList = [...data.productList];
        PopulateFields(self, AjaxData, AjaxData_ProductList, "FromSelectUpdateDetails");


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


  /*
  THIS FUNCTION IS USED TO SELECT THE CUSTOMER 
  DETAILS
  */
  handleCustomerNameDetails = (e) => {

    var self = this;

    if (this.state.cartData.length > 0) {
      //ask for confirmation since cart has some data
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Cart has data',
        text: 'Invoice cart has data, on changing the customer the cart details will be deleted',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes, change customer!',
        cancelButtonText: 'No, keep it'
        //   timer: 1500
      }).then((result) => {
        if (result.value) {
          self.ChangeCustomerFunc()
          self.SetCustomerData(e);
          // For more information about handling dismissals please visit
          // https://sweetalert2.github.io/#handling-dismissals
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Cancelled to change customer details',
            showConfirmButton: false,
            timer: 2000,
          })
        }
      })

    } else {

      //clear all data since cart empty & set new customer data
      ProductClear(this);
      Above_CartFieldClear(this);
      SummaryClear(this);
      this.SetCustomerData(e);
    }

  }

  /*
  FUNCTION TO SET CUSTOMER DATA
  */
  SetCustomerData(e) {

    const name = e.name;
    const value = e.value;

    this.state.customerId = value;
    this.state.selectedCustomerName = e;

    var customerDetails = _.findWhere(this.state.customerArrayList, { customerId: this.state.customerId });
    console.log("customerDetails :", customerDetails);
    this.state.customerEmailId = customerDetails.cust_EmailId;
    this.state.orderNumber = customerDetails.orderNo;
    this.state.emailCheckBox = false;
    this.state.smsCheckBox = false;
    this.state.emailId = "";
    this.state.contactNo = "";

    this.setState({
      customerId: this.state.customerId,
      selectedCustomerName: this.state.selectedCustomerName,
      orderNumber: this.state.orderNumber,
      customerEmailId: this.state.customerEmailId,
      emailCheckBox: this.state.emailCheckBox,
      smsCheckBox: this.state.smsCheckBox,

      emailId: this.state.emailId,
      contactNo: this.state.contactNo,

    })
    $("#customerEmailIdAlertMsg").empty();


    this.state.contactNo = customerDetails.cust_ContactNo;
    this.state.customerName = customerDetails.customerName;
    this.state.customerAddress = customerDetails.cust_address;
    this.state.customerGSTINNO = customerDetails.cust_gstNo;
    this.state.companyName = customerDetails.companyName;

    this.setState({
      contactNo: this.state.contactNo,
      customerName: this.state.customerName,
      customerAddress: this.state.customerAddress,
      customerGSTINNO: this.state.customerGSTINNO,
      companyName: this.state.companyName,

    })

    if (customerDetails.cust_EmailId == "" || customerDetails.cust_EmailId == null) {

      $("#customerEmailIdAlertMsg").append(" ! Email-Id doesnot exist for the customer");
      this.state.emailCheckBox = false;
      this.setState({
        emailCheckBox: this.state.emailCheckBox
      })

    } else {
      this.state.emailId = customerDetails.cust_EmailId;

      this.setState({
        emailId: this.state.emailId,
      })
    }

  }

  /*
  FUNCTION USED TO CHANGE THE 
  CUSTOMER DETAILS
  */
  ChangeCustomerFunc() {

    //POPULATE INVENTORY DATA WITH ORIGINAL DATA
    PopulateFields(this, AjaxData, AjaxData_ProductList);
    this.CancelFunc();

  }

  /*
  THIS IS FUNCTION IS USED TO SELECT THE
  PRODUCT
  */
  handleProductDetails = (e) => {

    const name = e.name;
    const value = e.value;

    ProductClear(this);
    this.Remove_QuantityAlertMsg();

    var productDetails = _.findWhere(this.state.productArrayList, { productId: value });

    this.state.productQuantity = 1;
    this.state.selectedProductName = e;
    this.state.productId = productDetails.productId;

    console.log("productDetails :", productDetails);

    if (productDetails.productType == "product") {
      $('#productQuantity').attr('readonly', false);
      /*
      INVENTORY CHECK NOT NECESSARY BUT FUNCTION IS AVAILABLE 
      CAN BE USED IN FUTURE IF REQUIRED
      */
      //  this.CheckInventory(value);

      // this.SetProduct_ServiceDetails(value,this.state.productQuantity);
      this.SetProduct_ServiceDetails(value, this.state.productQuantity, productDetails.productRate, productDetails.product_CGST_Percentage,
        productDetails.product_SGST_Percentage, 0, 0);

    } else if (productDetails.productType == "service") {
      $('#productQuantity').attr('readonly', true);
      // this.SetProduct_ServiceDetails(value,this.state.productQuantity);

      this.SetProduct_ServiceDetails(value, this.state.productQuantity, productDetails.productRate, productDetails.product_CGST_Percentage,
        productDetails.product_SGST_Percentage, 0, 0);

    }

    this.setState({
      productQuantity: this.state.productQuantity,
      selectedProductName: this.state.selectedProductName,
      productId: this.state.productId,
    })


  }

  /*
  FUNCTION TO CHECK WHETEHR THE PRODUCT QUANTITY OPTED IS 
  AVAILABLE IN THE LOCAL INVENTORY -- FUNCTION NOT USED IN ESTIMATE INVOICE
  */
  CheckInventory(value) {

    var inventoryProductDetails = _.findWhere(this.state.productInventoryArrayList, { productId: value });

    //CHECK WITH INVENTORY QUANTITY
    if (inventoryProductDetails.productQty >= this.state.productQuantity) {
      //PRODUCT AVAILABLE IN INVENTORY SO PROCEED
      //  this.UpdateInventory(value,this);
      this.SetProduct_ServiceDetails(value, this.state.productQuantity);
    } else {
      //PRODUCT NOT AVAILABLE IN INVENTORY SO STOP PROCEEDING

      //ADD TO ENQUIRY 

      this.AddEnquiryFunc(this.state.productId, 1, inventoryProductDetails);

      this.state.selectedProductName = "";
      this.state.productId = "";

      this.setState({
        selectedProductName: this.state.selectedProductName,
        productId: this.state.productId,
      })

      toast.error("! Insufficient Quantity. Total Quantity Available in Inventory are "
        + inventoryProductDetails.productQty, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          marginTop: "60px",
        });

      /*
       Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Insufficient Quantity',
        title: 'Total Quantity Available in Inventory are '+inventoryProductDetails.productQty,
        showConfirmButton: false,
        timer: 2000
      })
      */

    }

  }

  /*
  FUNCTION TO UPDATE THE LOCAL INVENTORY
  ONCE THE PRODUCT QTY OPTED IS AVAILABLE IN THE INVENTORY
  */
  UpdateInventory(value, currentState, quantity, status) {

    // alert("value :"+value);

    var self = this;

    //var self=currentState;

    var inventoryProductDetails = _.findWhere(this.state.productInventoryArrayList, { productId: value });
    var productDetails = _.findWhere(this.state.productArrayList, { productId: value });

    var originalQty = inventoryProductDetails.productQty;

    //alert("originalQty :"+originalQty);
    //alert("quantity :"+quantity);

    //var newQty=originalQty - this.state.productQuantity;
    var newQty = 0;
    if (status == "AddQuantity") {
      //alert("ADD QUANTITY");
      newQty = Number(originalQty) - Number(quantity);
    } else if (status == "MinusQuantity") {
      // alert("MINUS QUANTITY");
      newQty = Number(originalQty) + Number(quantity);
    }

    var inventoryIndex = _.findLastIndex(this.state.productInventoryArrayList, { productId: value });

    this.state.productInventoryArrayList.splice(inventoryIndex, 1);

    var newQty_InventoryData = {
      productId: productDetails.productId,
      productName: productDetails.productName,
      productQty: newQty,
      productQtyLimit: productDetails.productQtyLimit,
      productRate: productDetails.productRate,
      productType: productDetails.productType,
      product_CGST_Percentage: productDetails.product_CGST_Percentage,
      product_IGST_Percentage: productDetails.product_IGST_Percentage,
      product_SGST_Percentage: productDetails.product_SGST_Percentage,
    };

    this.state.productInventoryArrayList.push(newQty_InventoryData);


    this.setState({
      productInventoryArrayList: this.state.productInventoryArrayList,
    })

    console.log("this.state.productInventoryArrayList :", this.state.productInventoryArrayList);

    //UPDATE THE PRODUCT DROPDOWN WITH NEW QTY AS WELL
    //this.UpdateProductDropDown(value);

  }

  /*
  FUNCTION USED TO UPDATE THE PRODUCT DROPDOWN
  WITH NEW QTY
  */
  UpdateProductDropDown() {

    // var inventoryProductDetails=_.findWhere(this.state.productInventoryArrayList,{productId:value});

    var productOptions = [];
    $.each(this.state.productInventoryArrayList, function (i, item) {

      if (item.productType == "product") {

        productOptions.push({ label: item.productName + " ( " + item.productQty + " ) ", value: item.productId });
      }
      else {
        productOptions.unshift({ label: item.productName, value: item.productId });

      }
    })

    this.state.productOptions = productOptions;
    //this.state.selectedProductName={label:inventoryProductDetails.productName+ " ( " + inventoryProductDetails.productQty + " ) ", value:value}


    this.setState({
      productOptions: this.state.productOptions,
      //  selectedProductName:this.state.selectedProductName,

    })

  }


  /*
  FUNCTION USED TO SET THE PRODUCT/SERVICE DETAILS OPTED
  */
  SetProduct_ServiceDetails(value, quantity, productRate, productCGST_Percentage,
    productSGST_Percentage, discountPercentage, discountAmount) {

    var productDetails = _.findWhere(this.state.productArrayList, { productId: value });


    // console.log("productArrayList on SetProduct_ServiceDetails :",this.state.productArrayList);
    //  console.log("productDetails on SetProduct_ServiceDetails :",productDetails);

    this.state.productName = productDetails.productName;
    // this.state.productRate_Each=Truncate_2DecimalPlaces(productDetails.productRate);
    // this.state.product_CGST_Percentage=productDetails.product_CGST_Percentage;
    // this.state.product_SGST_Percentage=productDetails.product_SGST_Percentage;

    this.state.productRate_Each = Truncate_2DecimalPlaces(productRate);
    this.state.product_CGST_Percentage = 0;
    this.state.product_SGST_Percentage = 0;


    this.state.productTotal = Truncate_2DecimalPlaces(Number(quantity) * Number(this.state.productRate_Each));

    //this.state.productDiscountAmount=Truncate_2DecimalPlaces(0);
    //this.state.productDiscountPercentage=Truncate_2DecimalPlaces(0);

    this.state.productDiscountAmount = Truncate_2DecimalPlaces(discountAmount);
    this.state.productDiscountPercentage = Truncate_2DecimalPlaces(discountPercentage);

    this.state.productSubtotalAmount = Truncate_2DecimalPlaces(Number(this.state.productTotal) - Number(this.state.productDiscountAmount));


    this.state.product_CGST_Amount = Truncate_2DecimalPlaces((Number(this.state.productSubtotalAmount) * Number(this.state.product_CGST_Percentage)) / 100);
    this.state.product_SGST_Amount = Truncate_2DecimalPlaces((Number(this.state.productSubtotalAmount) * Number(this.state.product_SGST_Percentage)) / 100);

    this.state.productFinalAmount = Truncate_2DecimalPlaces(Number(this.state.productSubtotalAmount) + Number(this.state.product_CGST_Amount) + Number(this.state.product_SGST_Amount));


    this.setState({
      selectedProductName: this.state.selectedProductName,
      productName: this.state.productName,
      productRate_Each: this.state.productRate_Each,
      product_CGST_Percentage: this.state.product_CGST_Percentage,
      product_SGST_Percentage: this.state.product_SGST_Percentage,
      productQuantity: this.state.productQuantity,
      productTotal: this.state.productTotal,
      productDiscountAmount: this.state.productDiscountAmount,
      productDiscountPercentage: this.state.productDiscountPercentage,
      productSubtotalAmount: this.state.productSubtotalAmount,
      product_CGST_Amount: this.state.product_CGST_Amount,
      product_SGST_Amount: this.state.product_SGST_Amount,
      productFinalAmount: this.state.productFinalAmount,
    })




  }
  /*
  THIS FUNCTION IS USED WHEN QUANTITY FIELD IS CHANGED
  Quantity(productQuantity).THIS CHANGE WILL UPDATE THE 
  LOCAL INVENTORY & CALCULATIONS AS WELL
  */
  handleUserProductQuantity = (e) => {

    var inventoryProductDetails = _.findWhere(this.state.productInventoryArrayList, { productId: this.state.productId });

    // alert("inventoryProductDetails.productQty :"+inventoryProductDetails.productQty);

    // alert("e.target.value :"+e.target.value);

    // alert("this.state.productCartFieldKeys :"+this.state.productCartFieldKeys);

    if (this.state.selectedProductName != "") {


      var qtyValidationData = CheckNumberFormat_WithoutDecimal(this.state.productCartFieldKeys, e.target.value);

      if (qtyValidationData == true) {
        //check with the local inventory
        //  if (Number(inventoryProductDetails.productQty) >= Number(e.target.value)){
        //new qty is within the limit of inventory qty
        this.state.productQuantity = e.target.value;
        this.setState({
          productQuantity: this.state.productQuantity,
        })
        this.Remove_QuantityAlertMsg();
        /*
      CALL FOR RATE FIELDS CALCULATION SINCE CHANGE IN QUANTITY
      */
        this.Total_CartFields_CalFunc();

        /*  }else{
            //alert with no updation since inventoy is not sufficient 
            this.Set_QuantityAlertMsg(inventoryProductDetails,"InsufficientQty");
    
            //ADD TO ENQUIRY
            var qty=e.target.value;
            this.AddEnquiryFunc(inventoryProductDetails.productId,qty,inventoryProductDetails);
          } */
      } else {
        // alert("INCORRECT QTY");
        this.Set_QuantityAlertMsg(inventoryProductDetails, "IncorrectFormat");
        var fieldId = "quantityalertmsg";
        HideFieldErroeMsgs(fieldId);
      }


    } else {

      toast.error("! Kindly Select Product/Service", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        marginTop: "60px",
      });
      /*
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Kindly Select Product/Service',
          showConfirmButton: false,
          timer: 2000
        })
      */

    }



  }

  Set_QuantityAlertMsg(inventoryProductDetails, messageInfo) {

    $("#quantityalertmsg").empty();
    if (messageInfo == "InsufficientQty") {
      $("#quantityalertmsg").append("! Available Quantity In Stock " + inventoryProductDetails.productQty);
    } else if (messageInfo == "IncorrectFormat") {
      $("#quantityalertmsg").append("! Incorrect Number Format");
    } else if (messageInfo == "IncorrectQtyValue") {
      $("#quantityalertmsg").append("! Incorrect Quantity Value Specified");
    }
  }

  Remove_QuantityAlertMsg() {
    $("#quantityalertmsg").empty();
  }

  /*
  FUNCTION FOR GETTING THE INFO OF KEY PRESSED 
  IN FIELDS LIKE PRODUCT - RATE,DISCOUNTAMT,DISCOUNT PERCENTAGE,CGST & SGST TAX,FINAL AMOUNT
  */
  handleUser_Product_Rate_Discount_Tax_KeyPress_Func = (e) => {

    //  console.log("handleUser_Product_Rate_Discount_Tax_KeyPress_Func EVENT:",e);
    //  console.log("e.charCode",e.charCode);


    this.state.productCartFieldKeys = e.charCode;

    this.setState({
      productCartFieldKeys: this.state.productCartFieldKeys,
    })


  }
  /*
  THIS FUNCTION IS USED FOR THE CALCULATION WHEN 
  ANY CHANGES ARE MADE IN FIELDS LIKE
  Rate(productRate_Each),Dicsount(%)(productDiscountPercentage),Discount(productDiscountAmount),
  CGST(%)(product_CGST_Percentage),
  SGST(%)(product_SGST_Percentage),FinalAmount(productFinalAmount)
  */
  handleUser_Product_Rate_Discount_Tax_CalcFunc = (e) => {

    // console.log("handleUser_Product_Rate_Discount_Tax_CalcFunc called");

    // alert("e.name :"+e.target.name+"e.vlue :"+e.target.value);

    const name = e.target.name;
    const value = e.target.value;

    var productDetails = _.findWhere(this.state.productArrayList, { productId: this.state.productId });


    //IF CHANGE IN FINAL AMOUNT THEN CHANGE PRODUCT RATE & PROCEED FURTHER

    //console.log("this.state.productCartFieldKeys :",this.state.productCartFieldKeys);
    //alert("value :"+value);
    if (this.state.productId != "" || this.state.productId != undefined) {


      var numberFormatValidationData = CheckNumberFormat(this.state.productCartFieldKeys, value);

      //alert("numberFormatValidationData :"+numberFormatValidationData);

      if (numberFormatValidationData == true) {

        $("#" + name + "NumberFormatErrorMsg").empty();

        if (name == "productFinalAmount") {
          /*
          GST Amount = Original Cost – (Original Cost * (100 / (100 + GST% ) ) )
          Net Price = Original Cost – GST Amount
          */

          this.state.productFinalAmount = value;
          this.state.productDiscountAmount = Truncate_2DecimalPlaces(0);
          this.state.productDiscountPercentage = Truncate_2DecimalPlaces(0);

          var taxAmt = Truncate_2DecimalPlaces(Number(value) - (Number(value) * Number(100 / (100 + (Number(this.state.product_CGST_Percentage)
            + Number(this.state.product_SGST_Percentage))))));

          var product_RateEach = Truncate_2DecimalPlaces(Number(value) - Number(taxAmt));

          this.state.productRate_Each = product_RateEach;

          this.setState({
            productRate_Each: this.state.productRate_Each
          })


          var productTotal = Number(this.state.productQuantity) * Number(this.state.productRate_Each);
          this.state.productTotal = Truncate_2DecimalPlaces(productTotal);

          var productSubtotalAmount = Number(this.state.productTotal) - Number(this.state.productDiscountAmount);
          this.state.productSubtotalAmount = Truncate_2DecimalPlaces(productSubtotalAmount);

          var product_CGST_Amount = (Number(this.state.productSubtotalAmount) * Number(this.state.product_CGST_Percentage)) / 100;
          this.state.product_CGST_Amount = Truncate_2DecimalPlaces(product_CGST_Amount);

          var product_SGST_Amount = (Number(this.state.productSubtotalAmount) * Number(this.state.product_SGST_Percentage)) / 100;
          this.state.product_SGST_Amount = Truncate_2DecimalPlaces(product_SGST_Amount);

          var productFinalAmount = Number(this.state.productSubtotalAmount) + Number(this.state.product_CGST_Amount) + Number(this.state.product_SGST_Amount);
          this.state.productFinalAmount = Truncate_2DecimalPlaces(productFinalAmount);


          this.setState({
            productTotal: this.state.productTotal,
            productDiscountAmount: this.state.productDiscountAmount,
            productDiscountPercentage: this.state.productDiscountPercentage,
            productSubtotalAmount: this.state.productSubtotalAmount,
            product_CGST_Amount: this.state.product_CGST_Amount,
            product_SGST_Amount: this.state.product_SGST_Amount,
            productFinalAmount: this.state.productFinalAmount,
          })


        }


        //IF CHANGE IN DISCOUNT AMT THEN CHANGE DISCOUNT PERCENTAGE & PROCEED FURTHER
        if (name == "productDiscountAmount") {

          //CHECK IF DISCOUNT EXCEEDS PRODUCT AMOUNT

          this.state.productDiscountAmount = value;

          var discAmtValue = value;

          if (discAmtValue == "") {
            discAmtValue = 0;
          }

          var option = {
            style: 'percent'
          };

          /*
          var formatter = new Intl.NumberFormat("en-US", option);
          var percentFormat = formatter.format(value / 100);
          this.state.productDiscountPercentage=percentFormat;
          */

          /* FORMULA FOR CALCULATING DISCOUNT PERCENTAGE
         FROM DISCOUNT AMOUNT BEING PROVIDED
     
         Discount_Percentage=(discount/total) *100
         */

          this.state.productDiscountPercentage = Truncate_2DecimalPlaces((value / this.state.productTotal) * 100);

          this.setState({
            productDiscountPercentage: this.state.productDiscountPercentage
          })

        }
        //IF CHANGE IN DISCOUNT PERCENTAGE THE CHANGE DISCOUNT AMT & PROCEED FUTHER
        if (name == "productDiscountPercentage") {

          if (Number(value) <= 100) {
            this.state.productDiscountPercentage = value;

            var productDiscountAmount = this.state.productTotal * (this.state.productDiscountPercentage) / 100;
            this.state.productDiscountAmount = Truncate_2DecimalPlaces(productDiscountAmount);

            //this.state.productDiscountAmount= parseFloat(value) / 100.0;

            this.setState({
              productDiscountPercentage: this.state.productDiscountPercentage,
              productDiscountAmount: this.state.productDiscountAmount
            })
          } else {
            this.state.productDiscountPercentage = Truncate_2DecimalPlaces(0);;
            this.state.productDiscountAmount = Truncate_2DecimalPlaces(0);


            this.setState({
              productDiscountPercentage: this.state.productDiscountPercentage,
              productDiscountAmount: this.state.productDiscountAmount
            })

            toast.error("! Discount cannot exceed 100%", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              marginTop: "60px",
            });

          }

        }

        //FOR CHANGE IN RATE OR CGST OR SGST JUST PROCEED FURTHER

        if (name == "productRate_Each" || name == "product_CGST_Percentage" || name == "product_SGST_Percentage") {

          this.state[name] = value;

          this.setState({
            [name]: value
          })
        }

        this.state.oldFinalAmount = Truncate_2DecimalPlaces(this.state.productFinalAmount);
        if (name != "productFinalAmount") {
          this.Total_CartFields_CalFunc();
        }


        if (name != "productDiscountPercentage") {
          this.Check_Discount_Exceeds_Rate();
        }

      } else {

        $("#" + name + "NumberFormatErrorMsg").empty();

        if (numberFormatValidationData == "ExtraDecimal") {
          //alert("EXTRA DECIMAL");
          $("#" + name + "NumberFormatErrorMsg").append("! Only 2 Decimal Digits Allowed");

        } else {
          //alert("INCORRECT NUMBER FORMAT");
          $("#" + name + "NumberFormatErrorMsg").append("! Incorrect Number Format");
        }

        var fieldId = name + "NumberFormatErrorMsg";
        HideFieldErroeMsgs(fieldId);

      }

    } else {
      toast.error("Kindly select product/service !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        marginTop: "60px",
      });
    }


  }

  /*
  FUNCTION USED TO CALCULATE THE CART FIELD VALUE
  */

  Total_CartFields_CalFunc() {

    var productTotal = Number(this.state.productQuantity) * Number(this.state.productRate_Each);
    this.state.productTotal = Truncate_2DecimalPlaces(productTotal);

    var productSubtotalAmount = Number(this.state.productTotal) - Number(this.state.productDiscountAmount);
    this.state.productSubtotalAmount = Truncate_2DecimalPlaces(productSubtotalAmount);

    var product_CGST_Amount = (Number(this.state.productSubtotalAmount) * Number(this.state.product_CGST_Percentage)) / 100;
    this.state.product_CGST_Amount = Truncate_2DecimalPlaces(product_CGST_Amount);

    var product_SGST_Amount = (Number(this.state.productSubtotalAmount) * Number(this.state.product_SGST_Percentage)) / 100;
    this.state.product_SGST_Amount = Truncate_2DecimalPlaces(product_SGST_Amount);

    var productFinalAmount = Number(this.state.productSubtotalAmount) + Number(this.state.product_CGST_Amount) + Number(this.state.product_SGST_Amount);
    this.state.productFinalAmount = Truncate_2DecimalPlaces(productFinalAmount);


    this.setState({
      productTotal: this.state.productTotal,
      productDiscountAmount: this.state.productDiscountAmount,
      productDiscountPercentage: this.state.productDiscountPercentage,
      productSubtotalAmount: this.state.productSubtotalAmount,
      product_CGST_Amount: this.state.product_CGST_Amount,
      product_SGST_Amount: this.state.product_SGST_Amount,
      productFinalAmount: this.state.productFinalAmount,
    })

  }

  /*
  FUNCTION FOR CHECKING WHETHER DISCOUNT EXCEEDS RATE 
  */
  Check_Discount_Exceeds_Rate() {

    // var productFinalAmount=this.state.productFinalAmount - this.state.productDiscountAmount;

    //console.log("this.state.productDiscountAmount :",this.state.productDiscountAmount);
    //console.log("productFinalAmount :",this.state.productFinalAmount );


    if (Number(this.state.productDiscountAmount) > Number(this.state.productTotal)) {
      this.state.productDiscountAmount = Truncate_2DecimalPlaces(0);
      this.state.productDiscountPercentage = Truncate_2DecimalPlaces(0);
      this.state.productFinalAmount = this.state.oldFinalAmount;

      //  console.log("Check_Discount_Exceeds_Rate called EXCEED");

      //RECALCULATE WITH NEW DISCOUNT AMT & PERCENTAGE
      this.Total_CartFields_CalFunc();

      toast.error("! Discount Exceeds Amount", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        marginTop: "60px",
      });

      /* Swal.fire({
         position: 'center',
         icon: 'warning',
         title: 'Discount Exceeds Amount',
         showConfirmButton: false,
         timer: 2000
       })
       */

    } else {

      //  console.log("Check_Discount_Exceeds_Rate called NO EXCEED");

      this.state.productDiscountAmount = this.state.productDiscountAmount;
      this.state.productDiscountPercentage = this.state.productDiscountPercentage;
      this.state.productFinalAmount = this.state.productFinalAmount;
    }

    this.setState({
      productDiscountAmount: this.state.productDiscountAmount,
      productDiscountPercentage: this.state.productDiscountPercentage,
      productFinalAmount: this.state.productFinalAmount,
    })

  }

  /*
  THIS FUNCTION IS USED TO ADD ALL THE PRODUCT DETAILS 
  INTO THE CART AFTER THE BASIC VALIDATIONS LIKE
  CustomerName & Product/Service IS SELECTED FOR SURE
  */
  AddToCart() {


    //UPDATE PRODUCT INVENTORY
    var value = this.state.productId;

    if (this.state.customerId != "" && this.state.customerId != undefined) {
      if (value != "" && value != undefined) {

        if (this.state.productQuantity != "" && this.state.productQuantity != 0 && this.state.productQuantity != undefined) {

          if ((this.state.productRate_Each != "" || this.state.productRate_Each != undefined) &&
            (this.state.productFinalAmount != "" || this.state.productFinalAmount != undefined)) {



            //CHECK IF PRODUCT/SERVICE ALREADY EXIST IN THE CART
            this.Product_Service_AlreadyExistCheck();

            //alert(" this.state.product_Service_AlreadyExistCheck :"+ this.state.product_Service_AlreadyExistCheck);

            if (this.state.product_Service_AlreadyExistCheck == "Product_Service_NotExist") {

              //ADD CURRENT CART DATA TO CART TABLE


              //console.log("cartData variable :",cartData);

              //var cartDataLength=this.state.cartData.length;
              //alert("cartDataLength :"+cartDataLength);

              this.UpdateInventory(value, this, this.state.productQuantity, "AddQuantity");

              //UPDATE PRODUCT DROP DOWN
              this.UpdateProductDropDown();

              var productQty = this.state.productQuantity;
              var productDetails = _.findWhere(this.state.productArrayList, { productId: this.state.productId });

              if (productDetails.productType == "service") {
                productQty = "";
              }

              var count = 1;
              var newCartData = {
                SNO: count,
                ProductId: this.state.productId,
                Item: this.state.productName,
                ProductType: productDetails.productType,
                Rate: this.state.productRate_Each,
                Qty: productQty,
                Total: this.state.productTotal,
                DiscountPercentage: this.state.productDiscountPercentage,
                DiscountAmt: this.state.productDiscountAmount,
                SubTotal: this.state.productSubtotalAmount,
                CGST_Percentage: this.state.product_CGST_Percentage,
                SGST_Percentage: this.state.product_SGST_Percentage,
                CGSTAmt: this.state.product_CGST_Amount,
                SGSTAmt: this.state.product_SGST_Amount,
                FinalAmt: this.state.productFinalAmount,
              }

              this.state.cartData.unshift(newCartData);

              this.setState({
                cartdata: this.state.cartdata,
              })
              var cartData = [...this.state.cartData];
              this.state.cartData = [];
              this.PopulateCartData(cartData, 0);

              /* if(cartDataLength >=1){
               this.PopulateCartData(cartData,count);
               }
               */

            } else if (this.state.product_Service_AlreadyExistCheck == "ProductExist") {

              // var cartData=[...this.state.cartData];

              //this.PopulateCartData(cartData,0);

              //IF SERVICE ALREADY EXIST NO UPDATION NEEDED

              /* this.state.cartData=this.state.cartData;
               this.setState({
                 cartData:this.state.cartData,
                })
                */

            }

            // console.log("this.state.cartData :",this.state.cartData);
            //CLEAR THE PRODUCT FIELDS
            ProductClear(this);
          } else {
            toast.error("Rate & FinalAmount cannot be empty!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              marginTop: "60px",
            });
          }
        } else {
          this.Set_QuantityAlertMsg("", "IncorrectQtyValue");
          var fieldId = "quantityalertmsg";
          HideFieldErroeMsgs(fieldId);
        }

      } else {
        toast.error("Kindly select product/service !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          marginTop: "60px",
        });
      }
    } else {
      toast.error("Kindly select customer details !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        marginTop: "60px",
      });

    }

  }

  /*
  FUNCTION USED TO POPULATE
  EXISTING CART DATA BACK
  */
  PopulateCartData(cartData, count) {

    var arrayCount = 0;
    var self = this;
    // self.state.cartData=[];

    console.log("PopulateCartData BEFORE LOOP :", cartData);

    var totalWithoutGST = 0.00;
    var totalGst = 0.00;
    var invoiceAmt = 0.00;
    var amountInWords = "";
    var totalItemQty = 0.00;
    var totalCGSTAmt = 0.00;
    var totalSGSTAmt = 0.00;
    var totalIGSTAmt = 0.00;
    var balanceAmt = 0.00;
    var discountAmt = 0.00;
    var invoiceAmt_Paid = 0.00;

    if (self.state.discountAmt != "" && self.state.discountAmt != undefined) {
      discountAmt = Truncate_2DecimalPlaces(self.state.discountAmt);
    }

    if (self.state.invoiceAmt_Paid != "" && self.state.invoiceAmt_Paid != undefined) {
      invoiceAmt_Paid = Truncate_2DecimalPlaces(self.state.invoiceAmt_Paid);
    }

    this.state.totalWithoutGST = "";
    this.state.totalGst = "";
    this.state.invoiceAmt = "";
    this.state.amountInWords = "";
    this.state.paymentStatus = "";
    this.state.total_Itemqty = "";
    this.state.totalCGSTAmt = 0;
    this.state.totalSGSTAmt = 0;
    this.state.totalIGSTAmt = 0;
    this.statebalanceAmt = "";

    this.state.cartData = [];

    if (cartData.length > 0) {

      this.state.cartDataInfo = 'NotEmpty';
      localStorage.setItem('CartDataInfo', CryptoJS.AES.encrypt(this.state.cartDataInfo, "shinchanbaby"));

      $.each(cartData, function (i, item) {

        console.log("POPULATE CART DATA ITEM :", item);

        if (!_.isEmpty(cartData[i]) && cartData[i] != undefined) {

          count = Number(count) + 1;
          arrayCount = Number(arrayCount) + 1;

          self.state.cartData[arrayCount] = {
            'SNO': count,
            'ProductId': item.ProductId,
            'Item': item.Item,
            'ProductType': item.ProductType,
            'Rate': Truncate_2DecimalPlaces(item.Rate),
            'Qty': item.Qty,
            'Total': item.Total,
            'DiscountPercentage': item.DiscountPercentage,
            'DiscountAmt': Truncate_2DecimalPlaces(item.DiscountAmt),
            'SubTotal': item.SubTotal,
            'CGST_Percentage': Truncate_2DecimalPlaces(item.CGST_Percentage),
            'SGST_Percentage': Truncate_2DecimalPlaces(item.SGST_Percentage),
            'CGSTAmt': item.CGSTAmt,
            'SGSTAmt': item.SGSTAmt,
            'FinalAmt': Truncate_2DecimalPlaces(item.FinalAmt),
          }

          //SUMMARY CALCUALTION DETAILS

          totalWithoutGST = Number(totalWithoutGST) + Number(item.SubTotal);
          totalGst = Number(totalGst) + Number(item.CGSTAmt) + Number(item.SGSTAmt);
          totalCGSTAmt = Number(totalCGSTAmt) + Number(item.CGSTAmt);
          totalSGSTAmt = Number(totalSGSTAmt) + Number(item.SGSTAmt);
          invoiceAmt = Number(invoiceAmt) + Number(item.FinalAmt);

          console.log("totalWithoutGST :", totalWithoutGST, "totalGst: ", totalGst, "totalCGSTAmt :", totalCGSTAmt,
            "totalSGSTAmt :", totalSGSTAmt, "invoiceAmt :", invoiceAmt);

          if (item.Qty != 0 && item.Qty != "") {
            totalItemQty = Number(totalItemQty) + Number(item.Qty);
          }

        }

      });

      if (Number(discountAmt) > (Number(invoiceAmt) - Number(invoiceAmt_Paid))) {
        self.state.discountAmt = 0.00;
        discountAmt = 0.00;
      }
      if (Number(self.state.invoiceAmt_Paid) > Number(invoiceAmt)) {
        self.state.invoiceAmt_Paid = 0.00;
        invoiceAmt_Paid = 0.00;
      }
      console.log("invoiceAmt :", invoiceAmt);
      balanceAmt = Number(invoiceAmt) - Number(invoiceAmt_Paid) - Number(discountAmt);

      var amount_InWrdsTruncated = Truncate_2DecimalPlaces(invoiceAmt);
      console.log("amount_InWrdsTruncated :", amount_InWrdsTruncated);
      amountInWords = convert_to_words(Number(amount_InWrdsTruncated), this.state.currencyCode);

      this.state.amountInWords = Case.capital(amountInWords);
      this.state.totalWithoutGST = Truncate_2DecimalPlaces(totalWithoutGST);
      this.state.totalGst = Truncate_2DecimalPlaces(totalGst);
      this.state.invoiceAmt = Truncate_2DecimalPlaces(invoiceAmt);
      this.state.total_Itemqty = Truncate_2DecimalPlaces(totalItemQty);

      this.state.totalCGSTAmt = Truncate_2DecimalPlaces(totalCGSTAmt);
      this.state.totalSGSTAmt = Truncate_2DecimalPlaces(totalSGSTAmt);
      this.state.totalIGSTAmt = Truncate_2DecimalPlaces(totalIGSTAmt);
      this.state.balanceAmt = Truncate_2DecimalPlaces(balanceAmt);

      this.state.total_Itemqty = Truncate_2DecimalPlaces(totalItemQty);

      if (this.state.invoiceAmt != 0.00 && this.state.invoiceAmt != "" &&
        (this.state.invoiceAmt_Paid == 0.00 || this.state.invoiceAmt_Paid == "" || this.state.invoiceAmt_Paid == undefined)) {
        this.state.paymentStatus = "UnPaid";

      } else if (this.state.invoiceAmt != 0.00 && this.state.invoiceAmt != "" &&
        (this.state.invoiceAmt_Paid != 0.00 || this.state.invoiceAmt_Paid != "" || this.state.invoiceAmt_Paid != undefined)
        && (this.state.invoiceAmt == (this.state.discountAmt + this.state.invoiceAmt_Paid))) {

        this.state.paymentStatus = "Paid";

      } else if (this.state.invoiceAmt != 0.00 && this.state.invoiceAmt != "" &&
        (this.state.invoiceAmt_Paid != 0.00 || this.state.invoiceAmt_Paid != "" || this.state.invoiceAmt_Paid != undefined)) {

        this.state.paymentStatus = "PartiallyPaid";
      }

      this.setState({
        cartData: this.state.cartData,
        amountInWords: this.state.amountInWords,
        totalWithoutGST: this.state.totalWithoutGST,
        totalGst: this.state.totalGst,
        invoiceAmt: this.state.invoiceAmt,
        paymentStatus: this.state.paymentStatus,
        total_Itemqty: this.state.total_Itemqty,

        totalCGSTAmt: this.state.totalCGSTAmt,
        totalSGSTAmt: this.state.totalSGSTAmt,
        totalIGSTAmt: this.state.totalIGSTAmt,
        balanceAmt: this.state.balanceAmt,
        selected: '-1',

      })

      console.log("PopulateCartData AFTER LOOP :", this.state);

      //ADD SUMMARY CALCULATION
      //  this.InvoiceSummaryCalculation();
    }

    window.invoiceMenuPageComponents.InvoicePagesCartDataInfo(this.state.cartData);


  }



  /*
  THIS FUNCTION IS USED TO CHECK IF THE 
  CURRENT PRODUCT/SERVICE OPTED FOR ADDING TO CART
  ALREADY EXIST
  */
  Product_Service_AlreadyExistCheck() {

    var currentProductServiceDetails = _.findWhere(this.state.cartData, { ProductId: this.state.productId });
    var productDetails = _.findWhere(this.state.productArrayList, { productId: this.state.productId });

    //alert("currentProductServiceDetails :"+currentProductServiceDetails);

    if (currentProductServiceDetails != undefined) {

      if (productDetails.productType == "product") {
        // alert("PRO EXIST");

        $("#product_servicealertmsg").empty();
        $("#product_servicealertmsg").append("! Product Already Exist Update Qty In Cart");


        this.state.product_Service_AlreadyExistCheck = "ProductExist";

        /*
      var newQty=currentProductServiceDetails.Qty+this.state.productQuantity;
     // alert("newQty :"+newQty);
      
      var cartProductDetails=_.findWhere(this.state.cartData,{ProductId:this.state.productId});
   
      var productIndex=_.findLastIndex(this.state.cartData,{ProductId:this.state.productId});
  
      this.state.cartData.splice(productIndex, 1);
  
      this.setState({
        cartData:this.state.cartData,
       })
  
       console.log("this.state.cartData after splice :",this.state.cartData);
  
      var newCartData={
      SNO: cartProductDetails.SNO,
      ProductId:cartProductDetails.ProductId,
      Item: cartProductDetails.Item,
      Rate: cartProductDetails.Rate,
      Qty: newQty,
      Total:cartProductDetails.Total,
      DiscountPercentage: cartProductDetails.DiscountPercentage,
      DiscountAmt: cartProductDetails.DiscountAmt,
      SubTotal: cartProductDetails.SubTotal,
      CGST_Percentage: cartProductDetails.CGST_Percentage,
      SGST_Percentage: cartProductDetails.SGST_Percentage,
      CGSTAmt:cartProductDetails.CGSTAmt,
      SGSTAmt:cartProductDetails.SGSTAmt,
      FinalAmt: cartProductDetails.FinalAmt
     }
    
     this.state.cartData.unshift(newCartData);
     this.setState({
      cartData:this.state.cartData,
     })
     */

        //console.log("this.state.cartData AFTER UNSHIFT :",this.state.cartData);


      } else if (productDetails.productType == "service") {
        //  alert("SERVICE EXIST");
        $("#product_servicealertmsg").empty();
        $("#product_servicealertmsg").append("! Service Already Exist In Cart");
        this.state.product_Service_AlreadyExistCheck = "ServiceExist";

      }

      var fieldName = "product_servicealertmsg";
      HideFieldErroeMsgs(fieldName);

    } else {
      //PRODUCT/SERVICE DOESNOT EXIST IN THE CART ADD NEWLY
      this.state.product_Service_AlreadyExistCheck = "Product_Service_NotExist";

      //  alert("PRO NOT EXIST");

    }


  }


  onTrRowClick = (state, rowInfo, column, instance) => {
    var self = this;

    //  console.log("ROW INFO :",rowInfo);

    if (typeof rowInfo !== "undefined") {
      return {
        onClick: (e, handleOriginal) => {
          this.setState({
            selected: rowInfo.index
          });
          if (handleOriginal) {
            handleOriginal()
          }


          self.state.cartProductId = rowInfo.original["ProductId"];
          self.state.cartItem = rowInfo.original["Item"];
          self.state.cartItem_ProductType = rowInfo.original["ProductType"];
          self.state.cart_ItemRate = rowInfo.original["Rate"];
          self.state.cart_ItemQty = rowInfo.original["Qty"];
          self.state.cart_ItemTotal = rowInfo.original["Total"];
          self.state.cart_ItemDiscountPercentage = rowInfo.original["DiscountPercentage"];
          self.state.cart_ItemDiscountAmt = rowInfo.original["DiscountAmt"];
          self.state.cart_ItemSubtotal = rowInfo.original["SubTotal"];
          self.state.cart_ItemCGST_Percentage = rowInfo.original["CGST_Percentage"];
          self.state.cart_ItemSGST_Percentage = rowInfo.original["SGST_Percentage"];
          self.state.cart_ItemCGSTAmt = rowInfo.original["CGSTAmt"];
          self.state.cart_ItemSGSTAmt = rowInfo.original["SGSTAmt"];
          self.state.cart_ItemFinalAmt = rowInfo.original["FinalAmt"];

          this.state.rowIndexValue = rowInfo.index;


          self.setState({
            cartProductId: self.state.cartProductId,
            cartItem: self.state.cartItem,
            cartItem_ProductType: self.state.cartItem_ProductType,
            cart_ItemRate: self.state.cart_ItemRate,
            cart_ItemQty: self.state.cart_ItemQty,
            cart_ItemTotal: self.state.cart_ItemTotal,
            cart_ItemDiscountPercentage: self.state.cart_ItemDiscountPercentage,
            cart_ItemDiscountAmt: self.state.cart_ItemDiscountAmt,
            cart_ItemSubtotal: self.state.cart_ItemSubtotal,
            cart_ItemCGST_Percentage: self.state.cart_ItemCGST_Percentage,
            cart_ItemSGST_Percentage: self.state.cart_ItemSGST_Percentage,
            cart_ItemCGSTAmt: self.state.cart_ItemCGSTAmt,
            cart_ItemSGSTAmt: self.state.cart_ItemSGSTAmt,
            cart_ItemFinalAmt: self.state.cart_ItemFinalAmt,

            rowIndexValue: self.state.rowIndexValue,
          })


        },
        style: {
          //background: rowInfo.index === this.state.selected ? 'rgb(164, 23, 107)' : '',
          background: rowInfo.index === this.state.selected ? 'rgb(66, 139, 202)' : '',
          color: rowInfo.index === this.state.selected ? 'white' : ''
          // color: rowInfo.index === this.state.selected ? 'white' : 'black'
        },
      }
    }
    else {
      return {
        onClick: (e, handleOriginal) => {
          if (handleOriginal) {
            handleOriginal()
          }
        },
        style: {
          // background: 'white',
          // color: 'black'
        },
      }
    }

  };

  /*
  FUNCTION FOR EDITING THE INVOICE CART ITEMS
  */
  EditProductDetails() {

    var self = this;

    if (self.state.cartProductId !== "") {
      /*
      SET ROW INFO DATA TO CART FIELDS AND REMOVE 
      FROM THE CART & ADD THE QUANTITY TO INVENTORY */

      var rowIndexValue = self.state.rowIndexValue;
      var newQty = self.state.cart_ItemQty;
      var cartProductId = self.state.cartProductId;

      var cartProductRate = self.state.cart_ItemRate;
      var cartProductCGST_Percentage = self.state.cart_ItemCGST_Percentage;
      var cartProductSGST_Percentage = self.state.cart_ItemSGST_Percentage;
      var cartProductDiscount_Percentage = self.state.cart_ItemDiscountPercentage;
      var cartProductDiscountAmount = self.state.cart_ItemDiscountAmt;
      self.state.productQuantity = newQty;
      self.state.productId = cartProductId;
      if (newQty == "") {
        self.state.productQuantity = 1
      }
      self.SetProduct_ServiceDetails(cartProductId, self.state.productQuantity, cartProductRate,
        cartProductCGST_Percentage, cartProductSGST_Percentage,
        cartProductDiscount_Percentage, cartProductDiscountAmount);

      //this.SetProduct_ServiceDetails(cartProductId,this.state.productQuantity);
      //this.UpdateInventory(cartProductId,this,this.state.productQuantity,"MinusQuantity");
      //this.UpdateProductDropDown();
      this.DeleteProduct_ServiceFunc(rowIndexValue, this.state.productQuantity,
        cartProductId);

      //SET THE VALUE IN DROP DOWN

      var inventoryProductDetails = _.findWhere(self.state.productInventoryArrayList, { productId: cartProductId });
      if (newQty != "") {
        this.state.selectedProductName = { label: inventoryProductDetails.productName + " ( " + inventoryProductDetails.productQty + " ) ", value: inventoryProductDetails.productId };
      } else {
        this.state.selectedProductName = { label: inventoryProductDetails.productName, value: inventoryProductDetails.productId };

      }

      this.setState({
        selectedProductName: this.state.selectedProductName,
      })
    } else {
      toast.warning("! Kindly select product from cart", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        marginTop: "60px",
      });
    }

  }



  /*
  FUNCTION USED TO OPEN MODAL TO ADD PRODUCT QTY
  */
  AddProductQtyFunc() {
    var self = this;

    var productDetails = _.findWhere(self.state.productArrayList, { productId: self.state.cartProductId });

    if (self.state.cartProductId !== "" && productDetails.productType != "service") {
      self.state.productQtyAddModal = true;
      self.setState({
        productQtyAddModal: self.state.productQtyAddModal
      })
    } else {
      if (self.state.cartProductId == "") {

        toast.error("! Kindly select product from cart to add quantity", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          marginTop: "60px",
        });

        /*  Swal.fire({
            position: 'center',
            icon: 'warning',
            title:'Product not selected',
            text: 'Kindly select product from cart to add quantity',
            showConfirmButton: false,
            timer: 2000
          })
          */
      }
      else if (productDetails.productType == "service") {
        self.state.selected = -1;
        self.setState({
          selected: self.state.selected
        })

        toast.error("! Quantity for service cannot be increemented", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          marginTop: "60px",
        });

        /* Swal.fire({
           position: 'center',
           icon: 'warning',
           title:'Service quantity cannot be added',
           text: 'Quantity for service cannot be increemented',
           showConfirmButton: false,
           timer: 2000
         })
         */
      }
    }

  }

  /*
  FUNCTION USED TO CLOSE MODAL TO ADD PRODUCT QTY
  */
  ProductQtyAddcloseModal(buttonData) {
    var self = this;

    //alert("buttonData :"+buttonData);

    if (buttonData == "Save") {
      var newQty = Number(this.state.newQtyAdded) + Number(self.state.cart_ItemQty);

      var inventoryProductDetails = _.findWhere(this.state.productInventoryArrayList, { productId: self.state.cartProductId });

      //CHECK WITH INVENTORY QUANTITY --NOT NECESSARY
      //  if(inventoryProductDetails.productQty >=  newQty){
      this.ReplaceCart_With_Updated_Qty(newQty);
      this.UpdateInventory(self.state.cartProductId, this, this.state.newQtyAdded, "AddQuantity");
      this.UpdateProductDropDown();
      /*  }else{
         // alert("INVENTORY NOT SUFFICIENT");
          toast.error("INVENTORY NOT SUFFICIENT !", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            marginTop: "60px",
          });
    
        } */
    }

    self.state.productQtyAddModal = false;
    self.state.productQtyAddcloseModal = true;
    self.state.cartProductId = "";
    self.state.selected = -1;
    self.setState({
      productQtyAddcloseModal: self.state.productQtyAddcloseModal,
      productQtyAddModal: self.state.productQtyAddModal,
      cartProductId: self.state.cartProductId,
      selected: self.state.selected = -1,
    })




  }

  /*
  FUNCTION USED TO OPEN MODAL TO MINUS PRODUCT QTY
  */
  MinusProductQtyFunc() {
    var self = this;

    var productDetails = _.findWhere(self.state.productArrayList, { productId: self.state.cartProductId });

    if (self.state.cartProductId !== "" && productDetails.productType != "service") {
      self.state.productQtyMinusModal = true;
      self.setState({
        productQtyMinusModal: self.state.productQtyMinusModal
      })
    } else {
      if (self.state.cartProductId == "") {

        toast.error("! Kindly select product from cart to add quantity", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          marginTop: "60px",
        });

        /*  Swal.fire({
            position: 'center',
            icon: 'warning',
            title:'Product not selected',
            text: 'Kindly select product from cart to add quantity',
            showConfirmButton: false,
            timer: 2000
          })
          */
      }
      else if (productDetails.productType == "service") {
        self.state.selected = -1;
        self.setState({
          selected: self.state.selected
        })

        toast.error("! Quantity for service cannot be reduced", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          marginTop: "60px",
        });

        /* Swal.fire({
           position: 'center',
           icon: 'warning',
           title:'Service quantity cannot be added',
           text: 'Quantity for service cannot be reduced',
           showConfirmButton: false,
           timer: 2000
         })
         */
      }
    }



  }
  /*
  FUNCTION USED TO CLOSE MODAL TO MINUS PRODUCT QTY
  */
  ProductQtyMinuscloseModal(buttonData) {
    var self = this;

    //alert("buttonData :"+buttonData);

    if (buttonData == "Save") {
      var newQty = Number(self.state.cart_ItemQty) - Number(this.state.newQtyMinus);

      var rowIndexValue = self.state.rowIndexValue;
      var newQtyMinus = this.state.newQtyMinus;
      var cartProductId = self.state.cartProductId;

      if (Number(newQty) == 0 || Number(newQty) < 0) {

        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Product is not sufficient',
          text: 'Product quantity is not sufficient to be in cart',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
          //   timer: 1500
        }).then((result) => {
          if (result.value) {
            self.DeleteProduct_ServiceFunc(rowIndexValue, newQtyMinus,
              cartProductId)
            // For more information about handling dismissals please visit
            // https://sweetalert2.github.io/#handling-dismissals
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Cancelled Deletion Of ' + self.state.cartItem,
              showConfirmButton: false,
              timer: 2000,
            })
          }
        })

      } else if (newQty > 0) {
        this.ReplaceCart_With_Updated_Qty(newQty);
        this.UpdateInventory(self.state.cartProductId, this, this.state.newQtyMinus, "MinusQuantity");
        this.UpdateProductDropDown();
      }

    }

    self.state.productQtyMinusModal = false;
    self.state.productQtyMinuscloseModal = true;
    self.state.cartProductId = "";
    self.state.selected = -1;


    self.setState({
      productQtyMinuscloseModal: self.state.productQtyMinuscloseModal,
      productQtyMinusModal: self.state.productQtyMinusModal,
      cartProductDetails: self.state.cartProductId,
      selected: self.state.selected
    })
  }

  /*
  FUNCTION FOR DELETING PRODUCT / SERVICE
  FROM CART
  */
  DeleteProduct_ServiceFunc(rowIndexValue, newQty, cartProductId) {

    //alert( "DeleteProduct_ServiceFunc cartProductId "+cartProductId);
    //alert( "DeleteProduct_ServiceFunc rowIndexValue "+rowIndexValue);
    //alert( "DeleteProduct_ServiceFunc newQty "+newQty);

    var self = this;
    //UPDATE INVENTORY
    this.UpdateInventory(cartProductId, this, newQty, "MinusQuantity");
    this.UpdateProductDropDown();

    this.state.cartData.splice(rowIndexValue, 1);
    var cartData = [...this.state.cartData];
    this.state.cartData = [];
    this.state.selected = -1;
    this.setState({
      cartData: this.state.cartData,
      selected: this.state.selected,
    });

    this.PopulateCartData(cartData, 0);


  }


  /*
  FUNCTION TO ADD QTY TO THE PRODUCT
  */
  ProductQtyAddFunc = (value) => {

    var self = this;
    //console.log("ProductQtyAddFunc :",value);
    this.state.newQtyAdded = value;


  }

  /*
  FUCNTION TO MINUS QTY TO THE PRODUCT
  */
  ProductQtyMinusFunc = (value) => {

    var self = this;
    //  console.log("ProductQtyMinusFunc :",value);
    this.state.newQtyMinus = value;

  }

  /*
  FUNCTION USED TO CALCUALTE THE PRODUCT RATE AND 
  REMAINING FIELDS WHEN IT'S QTY IS ADDED OR REDUCED
  */
  ReplaceCart_With_Updated_Qty(newQty) {

    //   alert("ReplaceCart_With_Updated_Qty called "+newQty);

    var self = this;
    var rate = self.state.cart_ItemRate;

    var productTotal_BeforeTruncate = Number(newQty) * Number(rate);
    var productTotal = Truncate_2DecimalPlaces(productTotal_BeforeTruncate);

    var productSubtotalAmount_BeforeTruncate = Number(productTotal) - Number(self.state.cart_ItemDiscountAmt);
    var productSubtotalAmount = Truncate_2DecimalPlaces(productSubtotalAmount_BeforeTruncate);

    var product_CGST_Percentage = self.state.cart_ItemCGST_Percentage;
    var product_SGST_Percentage = self.state.product_SGST_Percentage;

    var product_CGST_Amount_BeforeTruncate = (Number(productSubtotalAmount) * Number(product_CGST_Percentage)) / 100;
    var product_CGST_Amount = Truncate_2DecimalPlaces(product_CGST_Amount_BeforeTruncate);

    var product_SGST_Amount_BeforeTruncate = (Number(productSubtotalAmount) * Number(product_SGST_Percentage)) / 100;
    var product_SGST_Amount = Truncate_2DecimalPlaces(product_SGST_Amount_BeforeTruncate);

    var productFinalAmount_BeforeTruncate = Number(productSubtotalAmount) + Number(product_CGST_Amount)
      + Number(product_SGST_Amount);
    var productFinalAmount = Truncate_2DecimalPlaces(productFinalAmount_BeforeTruncate);

    var rowIndex = self.state.rowIndexValue;
    //    alert("rowIndex :"+rowIndex);

    var carData = [...self.state.cartData];
    carData.splice(rowIndex, 1);

    self.state.cartData = carData;
    self.setState({
      cartData: self.state.cartData,
    })


    console.log("self.state.cartData SPLICE :", self.state.cartData);


    var newCartData = {
      SNO: '1',
      ProductId: self.state.cartProductId,
      Item: self.state.cartItem,
      ProductType: self.state.cartItem_ProductType,
      Rate: rate,
      Qty: newQty,
      Total: productTotal,
      DiscountPercentage: self.state.cart_ItemDiscountPercentage,
      DiscountAmt: self.state.cart_ItemDiscountAmt,
      SubTotal: productSubtotalAmount,
      CGST_Percentage: self.state.cart_ItemCGST_Percentage,
      SGST_Percentage: self.state.cart_ItemSGST_Percentage,
      CGSTAmt: product_CGST_Amount,
      SGSTAmt: product_SGST_Amount,
      FinalAmt: productFinalAmount,
    }

    self.state.cartData.unshift(newCartData)

    self.setState({
      cartData: self.state.cartData,
    })

    console.log("ReplaceCart_With_Updated_Qty cartdata :", self.state.cartData);

    var cartData = [...self.state.cartData];
    self.state.cartData = [];

    self.setState({
      cartData: self.state.cartData,
    })

    this.PopulateCartData(cartData, 0);

  }
  /*
  FUNCTION USED TO DELETE ONLY SELECTED
  PRODUCT FROM CART
  */
  DeleteCartProductFunc() {

    var self = this;
    if (self.state.cartProductId !== "") {

      var productDetails = _.findWhere(self.state.productArrayList, { productId: self.state.cartProductId });


      var rowIndex = self.state.rowIndexValue;

      /* var array = [...this.state.cartData]; 
       array.splice(rowIndex, 1);
     
       this.state.cartData=[];
       this.state.cartData=array;
       this.setState({
         cartData: this.state.cartData
        });
        */

      this.state.cartData.splice(rowIndex, 1);
      var cartData = [...this.state.cartData];
      this.state.cartData = [];
      this.state.selected = -1;
      this.setState({
        cartData: this.state.cartData,
        selected: this.state.selected,
      });

      this.PopulateCartData(cartData, 0);



      //UPDATE INVENTORY 
      if (productDetails.productType == "product") {
        // alert("CALLING UPDATE INVENTORY");

        this.UpdateInventory(self.state.cartProductId, this, self.state.cart_ItemQty, "MinusQuantity");
        this.UpdateProductDropDown();
      }


      //SUMMARY CALCULATION



    } else {

      toast.error("! Kindly select product from cart to remove", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        marginTop: "60px",
      });

      /*  Swal.fire({
          position: 'center',
          icon: 'warning',
          title:'Product not selected',
          text: 'Kindly select product from cart to remove',
          showConfirmButton: false,
          timer: 2000
        })
        */
    }
  }

  /*
  FUCNTION USED TO DELETE ENTIRE CART
  (i.e) REMOVE ALL THE PRODUCTS FROM THE CART
  */
  DeleteAllProductInCartFunc() {

    var self = this;
    if (self.state.cartData.length > 0) {

      // console.log("DeleteAllProductInCartFunc :",self.state.cartData);


      $.each(self.state.cartData, function (i, item) {
        if (!_.isEmpty(item)) {
          //  console.log("DeleteAllProductInCartFunc :",item);

          if (item.Qty != 0 && item.Qty != "") {
            //UPDATE INVENTORY
            self.UpdateInventory(item.ProductId, this, item.Qty, "MinusQuantity");

          }
        }
      });

      self.UpdateProductDropDown();

      self.state.cartData = [];
      self.setState({
        cartData: self.state.cartData,
      })

      //RESET SUMMARY CALCULATION
      self.SummaryClear();

      self.state.cartDataInfo = 'Empty';

    } else {

      toast.error("! Cart has no data to be deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        marginTop: "60px",
      });

      /*  Swal.fire({
          position: 'center',
          icon: 'warning',
          title:'Product cannot be deleted',
          text: 'Cart has no data to be deleted',
          showConfirmButton: false,
          timer: 2000
        })
        */
    }

  }

  /*
  FUNCTION USED TO CALCULATE THE SUMMARY INFO 
  BASED UPON THE CHANGE OF DATA IN FIELDS 
  LIKE - Discount,AmountPaid
  */

  handleUser_Summary_Discount_AmountPaid_CalcFunc = (e) => {

    console.log("handleUser_Summary_Discount_AmountPaid_CalcFunc");


    const name = e.target.name;
    const value = e.target.value;


    //alert("name :"+name+" value :"+value);

    var numberFormatValidationData = CheckNumberFormat(this.state.productCartFieldKeys, value);

    //alert("numberFormatValidationData :"+numberFormatValidationData);
    if (this.state.cartData.length > 0) {
      if (numberFormatValidationData == true) {


        $("#" + name + "NumberFormatErrorMsg").empty();

        if (name == "discountAmt") {

          if (Number(this.state.invoiceAmt) > Number(value)) {

            this.state.discountAmt = value;

            var balanceAmt = Number(this.state.invoiceAmt) - Number(this.state.discountAmt);
            this.state.balanceAmt = Truncate_2DecimalPlaces(balanceAmt);

            this.setState({
              balanceAmt: this.state.balanceAmt,
              discountAmt: this.state.discountAmt,
            })

          } else {
            $("#" + name + "NumberFormatErrorMsg").append("! Discount amount exceeds invoice amount");
          }


        } else if (name == "invoiceAmt_Paid") {

          var totalValue_Debited = Number(this.state.discountAmt) + Number(value);

          //alert("totalValue_Debited :"+totalValue_Debited+" this.state.invoiceAmt :"+this.state.invoiceAmt);

          if (Number(this.state.invoiceAmt) >= Number(totalValue_Debited)) {

            var balanceAmt = Number(this.state.invoiceAmt) - Number(this.state.discountAmt) - Number(value);
            this.state.balanceAmt = Truncate_2DecimalPlaces(balanceAmt);

            this.state.invoiceAmt_Paid = Number(value);

            if (Number(this.state.invoiceAmt) == Number(totalValue_Debited)) {
              this.state.paymentStatus = "Paid";
            } else if (Number(this.state.invoiceAmt) > Number(totalValue_Debited)) {
              this.state.paymentStatus = "PartiallyPaid";
            } else {
              this.state.paymentStatus = "UnPaid";
            }

            this.setState({
              balanceAmt: this.state.balanceAmt,
              invoiceAmt_Paid: this.state.invoiceAmt_Paid,
              paymentStatus: this.state.paymentStatus
            })

            console.log(" this.state.balanceAmt :", this.state.balanceAmt);
            console.log(" this.state.invoiceAmt :", this.state.invoiceAmt);

          } else {
            $("#" + name + "NumberFormatErrorMsg").append("! Amount mismatch with invoice amount");
          }

          var fieldId = name + "NumberFormatErrorMsg";
          HideFieldErroeMsgs(fieldId);
        }




      } else {
        $("#" + name + "NumberFormatErrorMsg").empty();

        if (numberFormatValidationData == "ExtraDecimal") {
          //alert("EXTRA DECIMAL");
          $("#" + name + "NumberFormatErrorMsg").append("! Only 2 Decimal Digits Allowed");

        } else {
          //alert("INCORRECT NUMBER FORMAT");
          $("#" + name + "NumberFormatErrorMsg").append("! Incorrect Number Format");
        }

        var fieldId = name + "NumberFormatErrorMsg";
        HideFieldErroeMsgs(fieldId);


      }

    } else {
      toast.error("Kindly add product/service to the cart !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        marginTop: "60px",
      });
    }
  }

  /*
  FUNCTION FOR GETTING THE INFO OF KEY PRESSED 
  IN FIELDS LIKE INVOICE SUMMARY - DISCOUNT,AMOUNTPAID
  */
  handleUser_Summary_Discount_AmountPaid_KeyPress_Func = (e) => {

    console.log("handleUser_Summary_Discount_AmountPaid_KeyPress_Func called");

    this.state.invoiceSummaryFieldKeys = e.charCode;

    this.setState({
      invoiceSummaryFieldKeys: this.state.invoiceSummaryFieldKeys,
    })


  }

  /*
  FUNCTION FOR SELECTING THE INVOICE ADVISOR
  */
  handleAdvisorDetails = (e) => {

    const value = e.value;
    this.state.selectedAdvisor = e;

    var InvoiceAdvisorDetails = _.findWhere(this.state.staffArrayList, { staffId: value });

    this.state.invoiceAdvisorId = InvoiceAdvisorDetails.staffId;
    this.state.advisorName = InvoiceAdvisorDetails.staffName;

    this.setState({
      invoiceAdvisorId: this.state.invoiceAdvisorId,
      advisorName: this.state.advisorName,

    })

  }

  /*
  FUNCTION USED TO SET THE 
  PAYMENT MODE OPTED
  */
  handlePaymentModeDetails = (e) => {
    const name = e.name;
    const value = e.value;

    this.state.paymentMode = "";
    this.state.selectedPaymentMode = "";

    this.setState({
      paymentMode: this.state.paymentMode,
      selectedPaymentMode: this.state.selectedPaymentMode,
    })

    // alert("this.state.invoiceAmt_Paid  :"+this.state.invoiceAmt_Paid );

    if (Number(this.state.invoiceAmt_Paid) != 0 && this.state.invoiceAmt_Paid != undefined &&
      this.state.invoiceAmt_Paid != "") {

      this.state.paymentMode = value;

      this.setState({
        [name]: value,
        selectedPaymentMode: e,
        paymentMode: this.state.paymentMode,
      });

    } else {
      toast.error("Kindly specify amount paid !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        marginTop: "60px",
      });

    }

  }


  /*
  FUNCTION USED FOR SETTING UP THE SMS 
  OPTION DETAILS
  */
  handleChangeSMS = (event) => {

    if (this.state.customerId != "" && this.state.customerId != undefined) {

      this.state.smsCheckBox = event.target.checked;
      this.setState({ [event.target.name]: event.target.checked });

    } else {
      toast.error("Kindly select customer !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        marginTop: "60px",
      });
    }
  }

  /*
  FUNCTION USED FOR SETTING UP
  EMAIL OPTION DETAILS
  */
  handleChangeEmail = (event) => {

    var customerDetails = _.findWhere(this.state.customerArrayList, { customerId: this.state.customerId });

    if (this.state.customerId != "" && this.state.customerId != undefined) {
      if (customerDetails.cust_EmailId != "" && customerDetails.cust_EmailId != null) {

        this.state.emailCheckBox = event.target.checked;
        this.setState({ [event.target.name]: event.target.checked });

      } else {

        this.state.emailCheckBox = false;
        this.setState({ emailCheckBox: this.state.emailCheckBox });

        toast.error("Customer doesnot have emailId !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          marginTop: "60px",
        });
      }

    } else {
      toast.error("Kindly select customer !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        marginTop: "60px",
      });
    }

  }





  /*
  THIS FUNCTION IS USED TO CLEAR ALL THE FILEDS LIKE
  Product/Service(productName),Quantity(productQuantity),
  (Rate(productRate_Each),Dicsount(%)(productDiscountPercentage),Discount(productDiscountAmount),
  CGST(%)(product_CGST_Percentage),
  SGST(%)(product_SGST_Percentage),FinalAmount(productFinalAmount)
  BEFORE THE PRODUCT IS ADDED INTO THE CART
  */
  ProductClearFunc() {
    ProductClear(this);
  }

  /*
  THIS FUNCTION IS USED TO CLEAR ALL THE FILEDS 
  IN THE INVOICE
  */
  CancelFunc() {
    ProductClear(this);
    Above_CartFieldClear(this);
    SummaryClear(this);
    PopulateFields(this, AjaxData, AjaxData_ProductList);
  }

  /*
  THIS FUNCTION IS USED TO CLEAR ALL THE FILEDS 
  IN THE INVOICE SUMMARY PART 
  LIKE - TOTAL WITHOUT GST,TOTAL GST,INVOICE AMT,AMOUNT PAID,BALANCE AMOUNT,
  DISCOUNT,PYMENT MODE,ADVISOR,AMOUNT IN WORDS,PAYMENT STATUS
  */
  SummaryClear() {
    SummaryClear(this);
  }

  /**********************************************************************************************
   * ********************************************************************************************
   * INVOICE ENQUIRY DETAILS FUNCTIONALITY CODE BEGINS
   *  ***************** CODE IN THIS MODULE IS NOT IN USE
   */

  //FUCNTION USED TO OPEN THE ENQUIRY PANE
  InvoiceEnquiryFunc() {
    this.state.isEnquiryPaneOpen = true;
    this.setState({
      isEnquiryPaneOpen: this.state.isEnquiryPaneOpen,
    })
  }

  //FUNCTION USED TO CLOSE THE ENQUIRY PANE
  CloseEnquirySlide() {
    this.state.isEnquiryPaneOpen = false;
    this.setState({
      isEnquiryPaneOpen: this.state.isEnquiryPaneOpen,
    })
  }

  //FUNCTION CALLED WHEN EVER AN CHANGE IS MADE IN THE ENQUIRY MODULE 
  SetEnquiryTableData(enquiryCartData) {

    console.log("SetEnquiryTableData enquiryCartData :", enquiryCartData);
    this.state.enquiryCartData = [];
    this.state.enquiryCartData = enquiryCartData;

    $("#saveinvoicewithenquiry").prop('disabled', true);

    if (this.state.enquiryCartData.length > 0) {
      $("#saveinvoicewithenquiry").prop('disabled', false);
    }

  }

  //FUCNTION USED TO ADD THE OUT OF STOCK PRODUCTS TO ENQUIRY MODULE -- NOT IN USE
  AddEnquiryFunc(productId, productQty, inventoryProductDetails) {

    console.log("AddEnquiryFunc");
    console.log("productId :", productId, "productQty :", productQty);
    // AddEnquiryDataFunc(productId,selectedProductName,productQty,inventoryProductDetails,this.state.enquiryCartData);

    var checkEnquiryDataExist = _.findWhere(this.state.enquiryCartData, { ProductId: productId });

    if (checkEnquiryDataExist == undefined) {
      var newEnquiryProductData = {
        ProductId: productId,
        ProductName: inventoryProductDetails.productName,
        ProductType: inventoryProductDetails.productType,
        Quantity: productQty
      }

      this.state.enquiryCartData.unshift(newEnquiryProductData);

    } else {
      // alert("ENQUIRY  EXIST");
      var indexValue = _.findLastIndex(this.state.enquiryCartData, { ProductId: productId });
      //  alert("indexValue :"+indexValue);

      var newQty = Number(productQty) + Number(checkEnquiryDataExist.Quantity);

      var newEnquiryProductData = {
        ProductId: productId,
        ProductName: inventoryProductDetails.productName,
        ProductType: inventoryProductDetails.productType,
        Quantity: newQty,
      }

      var enquiryCartDataVar = [... this.state.enquiryCartData]
      enquiryCartDataVar.splice(indexValue, 1);
      console.log("enquiryCartDataVar after splice :", enquiryCartDataVar);

      enquiryCartDataVar.unshift(newEnquiryProductData);


      this.state.enquiryCartData = [];
      this.state.enquiryCartData = enquiryCartDataVar;


    }
    console.log("this.state.enquiryCartData :", this.state.enquiryCartData);

    if (this.state.enquiryCartData.length > 0) {
      $("#saveinvoicewithenquiry").prop('disabled', false);
    }

  }

  /********************************************************************************************
   * INVOICE ENQUIRY DETAILS FUNCTIONALITY CODE ENDS
   *  ***************** CODE IN THIS MODULE IS NOT IN USE
   ***********************************************************************************************/
  handleUser_Button_KeyPress_Func = (e) => {

    console.log("handleUser_Button_KeyPress_Func :", e);
    console.log("e.charCode", e.charCode);
    this.state.productCartFieldKeys = e.charCode;
    this.setState({
      productCartFieldKeys: this.state.productCartFieldKeys,
    })
  }

  /*
  FUCNTION CALLED WHEN SAVE INVOICE WITH ENQUIRY IS CALLED TO 
  ENABLE THE SAVE INVOICE WITH ENQUIRY OPTION
  */
  SaveInvoice_WithEnquiryFunc() {

    this.state.invoice_withEnquiry = "yes";
    this.setState({
      invoice_withEnquiry: this.state.invoice_withEnquiry,
    })

    this.SaveInvoiceFunc();
  }

  /*
  FUNCTION USED TO SAVE THE INVOICE DATA
  */
  SaveInvoiceFunc() {

    var self = this;

    if (this.state.cartData.length > 0) {

      if (this.state.paymentStatus != "UnPaid" && this.state.paymentMode == "") {
        //SELECT PAYMENT MODE SINCE AMOUNT IN PAID
        toast.error("! Select payment mode to proceed", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          marginTop: "60px",
        });
      } else {
        //CALL SERVER

        console.log("SALE INVOICE AJAX DATA :", JSON.stringify({
          companyId: this.state.companyId,

          //STAFF INFO
          staffId: this.state.staffId,
          staffName: this.state.staffName,

          //CUSTOMER INFO
          customerId: this.state.customerId,
          cust_ContactNo: this.state.contactNo,
          cust_EmailId: this.state.emailId,
          cust_address: this.state.customerAddress,
          cust_gstNo: this.state.customerGSTINNO,
          customerName: this.state.customerName,
          companyName: this.customerCompanyName,



          //INVOICE DETAILS
          product_serviceByStaffName: '',
          product_serviceByStaffId: '',
          date: this.state.date,
          cartProduct: JSON.stringify(this.state.cartData),
          enquiryCartProduct: JSON.stringify(this.state.enquiryCartData),
          invoice_withEnquiry: this.state.invoice_withEnquiry,
          sms: this.state.smsCheckBox,
          email: this.state.emailCheckBox,
          orderNo: this.state.orderNumber,
          invoiceDate: this.state.invoiceDate,
          invoiceDueDate: this.state.invoiceDueDate,

          totalWithoutGST: this.state.totalWithoutGST,
          totalGst: this.state.totalGst,
          invoiceAmt: this.state.invoiceAmt,
          discountAmt: this.state.discountAmt,
          invoiceAmt_Paid: this.state.invoiceAmt_Paid,
          balanceAmt: this.state.balanceAmt,
          invoiceAdvisor: this.state.invoiceAdvisor,
          invoiceAdvisorId: this.state.invoiceAdvisor,
          paymentStatus: this.state.paymentStatus,
          paymentMode: this.state.paymentMode,
          total_Itemqty: this.state.total_Itemqty,
          totalCGSTAmt: this.state.totalCGSTAmt,
          totalSGSTAmt: this.state.totalSGSTAmt,
          totalIGSTAmt: this.state.totalIGSTAmt,
          whatsAppOption: true,

          organizationName: this.state.organizationName,
          currencySymbol: this.state.currencySymbol,
          currencyCode: this.state.currencyCode,


          site: GetCurrentSite()
        }));

        if (this.state.discountAmt == "" || this.state.discountAmt == undefined) {
          this.state.discountAmt = 0.00;
        }
        if (this.state.invoiceAmt_Paid == "" || this.state.invoiceAmt_Paid == undefined) {
          this.state.invoiceAmt_Paid = 0.00;
        }

        $.ajax({
          type: 'POST',
          data: JSON.stringify({
            companyId: this.state.companyId,

            //STAFF INFO
            staffId: this.state.staffId,
            staffName: this.state.staffName,

            //CUSTOMER INFO
            customerId: this.state.customerId,
            customerName: this.state.customerName,
            cust_address: this.state.customerAddress,
            cust_gstNo: this.state.customerGSTINNO,
            cust_ContactNo: this.state.contactNo,
            cust_EmailId: this.state.emailId,
            companyName: this.customerCompanyName,



            //INVOICE DETAILS
            product_serviceByStaffName: '',
            product_serviceByStaffId: '',
            date: this.state.date,
            cartProduct: JSON.stringify(this.state.cartData),
            enquiryCartProduct: JSON.stringify(this.state.enquiryCartData),
            invoice_withEnquiry: this.state.invoice_withEnquiry,
            sms: this.state.smsCheckBox,
            email: this.state.emailCheckBox,

            orderNo: this.state.orderNumber,
            invoiceDate: this.state.invoiceDate,
            invoiceDueDate: this.state.invoiceDueDate,

            totalWithoutGST: this.state.totalWithoutGST,
            totalGst: this.state.totalGst,
            invoiceAmt: this.state.invoiceAmt,
            discountAmt: this.state.discountAmt,
            invoiceAmt_Paid: this.state.invoiceAmt_Paid,
            balanceAmt: this.state.balanceAmt,
            invoiceAdvisor: this.state.invoiceAdvisor,
            invoiceAdvisorId: this.state.invoiceAdvisor,
            paymentStatus: this.state.paymentStatus,
            paymentMode: this.state.paymentMode,
            total_Itemqty: this.state.total_Itemqty,
            totalCGSTAmt: this.state.totalCGSTAmt,
            totalSGSTAmt: this.state.totalSGSTAmt,
            totalIGSTAmt: this.state.totalIGSTAmt,
            whatsAppOption: true,

            organizationName: this.state.organizationName,
            currencySymbol: this.state.currencySymbol,
            currencyCode: this.state.currencyCode,

            site: GetCurrentSite()
          }),
          url: " http://15.206.129.105:8080/ThroughBooksCOAPI/saleInvoice/AddEstimateInvoiceDetails",

          contentType: "application/json",
          dataType: 'json',
          async: false,
          success: function (data, textStatus, jqXHR) {

            AjaxData = data;
            if (data.invoiceResponse == "Success") {

              Above_CartFieldClear(self);
              ProductClear(self);
              SummaryClear(self);

              console.log("SALE INVOICE SUCCESS AJAX DATA :", data);

              toast.success("! Added invoice successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                marginTop: "60px",
              });


              AjaxData_ProductList = [...data.productList];
              PopulateFields(self, AjaxData, AjaxData_ProductList);

            } else if (data.invoiceResponse == "InsufficientQuantity") {

              console.log("SALE INVOICE INSUFFICIENT AJAX DATA :", data);
              self.InsufficientDiv_ShowHide("show");
              PopulateFields(self, AjaxData, AjaxData_ProductList);
              RepopulateCartData_InsufficientQty(self, AjaxData);

            } else if (data.invoiceResponse == "Failed") {


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

      }

    } else {
      //NO ITEM AVAILABLE IN CART
      toast.error("! No item available in cart ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        marginTop: "60px",
      });


    }





  }

  //FUCNTION USED TO SHOW & HIDE THE INSUFFICIENT ALERT DETAILS
  InsufficientDiv_ShowHide(data) {
    if (data == "show") {
      $("#insufficientdiv").show();
    } else if (data == "hide") {
      $("#insufficientdiv").hide();
    }
  }

  /************************************************************************************
   * *********************************************************************************
   * QUICK LINK FUNCTIONALITY CODE BEGINS
  */

  //FUNCTION FOR OPENING THE ADD CUSTOMER QUICK LINK MODULE
  AddCustomerQuickLinkFunc() {
    this.state.isAddCustomerPaneOpen = true;
    this.setState({
      isAddCustomerPaneOpen: this.state.isAddCustomerPaneOpen,
    })
  }

  //FUNCTION FOR CLOSING THE ADD CUSTOMER QUICK LINK MODULE
  AddCustomerQuickLinkCloseFunc() {
    this.state.isAddCustomerPaneOpen = false;
    this.setState({
      isAddCustomerPaneOpen: this.state.isAddCustomerPaneOpen,
    })
  }

  /*FUNCTION FOR ADDING  THE  CUSTOMER
  IN TO THE DROPDOWN ADDED VIA QUICK LINK MODULE
  */
  SubmitCustomerInfoSlide(stateData, submit_proceed) {

    var self = this;
    console.log("stateDate :", stateData);
    console.log("this :", this);

    console.log("selfStateData :", submit_proceed);

    if (submit_proceed == 'Yes') {
      this.state.isAddCustomerPaneOpen = false;
      this.state.isVehiclePaneOpen = true;

      this.setState({
        isAddCustomerPaneOpen: this.state.isAddCustomerPaneOpen,
        isVehiclePaneOpen: this.state.isVehiclePaneOpen
      })
      this.state.stateData = stateData;
      this.setState({
        stateData: this.state.stateData
      })

    }

    var self = this;

    var customerArrayList = [...self.state.customerArrayList];
    var addCustomerList = stateData.customerList;


    /* if you want to compare all the properties
   var result = _.reject(customerArrayList, _.partial(_.findWhere, addCustomerList, _));
   
   console.log("All attributes", result); */

    // if the username is the identifying field
    var newCustomerDetails = _.pluck(customerArrayList, 'customerId');
    var newCustomerArray = _.reject(addCustomerList, (customer) => _.indexOf(newCustomerDetails, customer.customerId) > -1);

    console.log("newCustomerArray", newCustomerArray);

    $.each(newCustomerArray, function (i, item) {

      var customerData = {
        companyName: item.companyName,
        cust_ContactNo: item.contactNo,
        cust_EmailId: item.emailId,
        cust_address: item.address,
        cust_gstNo: item.gstinNo,
        customerId: item.customerId,
        customerName: item.customerName
      }

      self.state.customerArrayList.push(customerData);


    })

    console.log(" self.state.customerArrayList :", self.state.customerArrayList);



    var customerOptions = [];
    self.state.customerOptions = [];

    $.each(self.state.customerArrayList, function (i, item) {
      customerOptions.push({ label: item.customerName + ' ' + item.cust_ContactNo, value: item.customerId });
    })

    self.state.customerOptions = customerOptions;
    this.setState({
      customerOptions: self.state.customerOptions,
    });

    console.log("SubmitCustomerInfoSlide self.state.options1 :", self.state.customerOptions);
  }

  /*FUNCTION FOR CLOSING THE ADD CUSTOMER QUICK LINK 
  MODULE WHEN CANCEL IN ADD CUSTOMER QUICK LINK
   MODULE IS CLICKED
  */
  CloseCancelCustomerInfoSlide = (currentState) => {
    var self = this;
    self.state.isAddCustomerPaneOpen = false;
    self.setState({
      isAddCustomerPaneOpen: self.state.isAddCustomerPaneOpen
    })
  }

  //FUNCTION TO OPEN ADD PRODUCT QUICK LINK MODULE
  AddProductQuickLinkFunc() {
    this.state.isAddProductPaneOpen = true;
    this.setState({
      isAddProductPaneOpen: this.state.isAddProductPaneOpen,
    })
  }

  //FUNCTION TO CLOSE ADD PRODUCT QUICK LINK MODULE
  AddProductQuickLinkCloseFunc() {
    this.state.isAddProductPaneOpen = false;
    this.setState({
      isAddProductPaneOpen: this.state.isAddProductPaneOpen,
    })
  }

  /*FUNCTION FOR ADDING THE ADDED PRODUCT/SERVICE
   IN TO THE DROPDOWN ADDED VIA QUICK LINK MODULE
   */
  SubmitProductInfoSlide(stateData) {

    var self = this;
    console.log("PRODUCT ADD DATA :", stateData);

    if (stateData.productName == "ProductName") {
      toast.error("! Product name already exist", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        marginTop: "60px",
      });
    } else {
      /* toast.success(" Product added successfully", {
         position: "top-left",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         marginTop: "60px",
       });
       */
    }

    var productArrayList = [...self.state.productArrayList];
    var productInventoryArrayList = [...self.state.productInventoryArrayList];
    var addProductList = stateData.productList;


    var newProductDetails = _.pluck(productArrayList, 'productId');
    var newProductArray = _.reject(addProductList, (product) => _.indexOf(newProductDetails, product.productId) > -1);

    console.log("newProductArray", newProductArray);

    $.each(newProductArray, function (i, item) {


      var newQty_InventoryData = {
        productId: item.productId,
        productName: item.productName,
        productQty: item.productQty,
        productQtyLimit: item.productQtyLimit,
        productRate: item.productRate,
        productType: item.productType,
        product_CGST_Percentage: item.product_CGST_Percentage,
        product_IGST_Percentage: item.product_IGST_Percentage,
        product_SGST_Percentage: item.product_SGST_Percentage,
      };

      self.state.productArrayList.push(newQty_InventoryData);
      self.state.productInventoryArrayList.push(newQty_InventoryData);
    })

    var productOptions = [];
    self.state.productOptions = [];

    $.each(self.state.productInventoryArrayList, function (i, item) {

      if (item.productType == "product") {
        productOptions.push({ label: item.productName + " ( " + item.productQty + " ) ", value: item.productId });
      }
      else {
        productOptions.unshift({ label: item.productName, value: item.productId });
      }
    })

    self.state.productOptions = productOptions;
    self.setState({
      productOptions: self.state.productOptions,
    })
  }


  /*FUNCTION FOR CLOSING THE ADD PRODUCT QUICK LINK 
  MODULE WHEN CANCEL IN ADD PRODUCT QUICK LINK
   MODULE IS CLICKED
  */
  CloseCancelProductInfoSlide() {
    this.state.isAddProductPaneOpen = false;
    this.setState({
      isAddProductPaneOpen: this.state.isAddProductPaneOpen,
    })
  }

  /*********************************************************************************
     * QUICK LINK FUNCTIONALITY CODE ENDS
    ************************************************************************************/


  /******************************************************************************		
    * PAGE INFORMATION CODE BEGINS		
    *****************************************************************************/

  InfoDetails() {
    var self = this;
    Notification['info']({
      title: 'Shortcut keys provided for sale invoice',
      description: <div> <p style={{ width: 320 }} rows={4}>
        1.Use shift+y to cancel the invoice <br />
        2.Use shit+u  to clear the product/service fields <br />
        3.Press Enter to add product to cart or to submit the invoice
                  </p>
        <button onClick={CloseInfo} >Got it !</button>
      </div>,
      duration: 0,
      closable: true,

    });
  }
  NotificationClose() {
    //  alert("NotificationClose called");		
  }

  /******************************************************************************		
   * PAGE INFORMATION CODE END		
   *****************************************************************************/


  render() {

    return (



      <div class="container">

        {/* <div className="">
  {/*  <div className="">
    <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
    </div>
    <div className="inv_HeaderCls">
      <h3>Sale Invoice</h3>
    </div> 
    <a href="#" className="user_p_menu"
      style={{ backgroundColor: "", color: "black" }}>
      <span
      // class="glyphicon glyphicon-question-sign"
      onClick={() => this.InvoiceEnquiryFunc()}
      style={{
      float: "", color: "#3c3b3b"
      }}>
      <span className="settings_Top_Submenu"
      style={{ color: "blue", fontWeight: "800", textDecorationLine: "underline",
       marginLeft: "996px" }} >Invoice Enquiry</span>
      </span>
      </a>
  </div> */}


        <div class="">
          <div>
            {/* section 1.0 new frame */}
            {/* section 1 selction for bill */}
            <div className="row" style={{}} >
              <div className="col-lg-8" style={{ backgroundColor: "" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                  </div>
                  <InformationIcon onInformationIconClicked={this.InfoDetails} />
                </div>
                <div class="row" style={{ backgroundColor: "" }}>
                  <div class="col-xs-12 col-sm-4 col-lg-4 ">
                    <label class="control-label selectpicker " for="customerName">Customer Name</label>
                    <input type="text" style={{ display: "none" }} readOnly class="form-control" name="customerName" value={this.state.customerName} onChange={this.handleUserInput} id="customerName" placeholder="customerName" />

                    <SelectSearch options={this.state.customerOptions} value={this.state.selectedCustomerName} id="customerName"
                      onChange={(e) => this.handleCustomerNameDetails(e)} name="customerName" placeholder="Select Customer" />
                    <span id="customerEmailIdAlertMsg" style={{ color: 'red' }} ></span>
                    <span id="customerIdAlertMsg" style={{ color: 'red' }} ></span>
                    <a href="#myModal" data-toggle="modal" data-target="#myModal" >
                      <span
                        style={{
                          color: "blue",
                        }} onClick={() => this.AddCustomerQuickLinkFunc()}  > + Customer</span>
                    </a>
                  </div>


                </div>

                <div class="row" style={{ marginTop: '10px' }}>
                  <div class="col-xs-12 col-sm-4 col-lg-4 ">
                    <label class="control-label " for="orderNumber">Order Number</label>
                    <input readOnly type="text" class="form-control" value={this.state.orderNumber}
                      onChange={this.handleUserInput} name="orderNumber" id="orderNumber" />

                  </div>
                  <div class="col-xs-12 col-sm-4 col-lg-4 ">
                    <label class="control-label " for="invoiceDate">Invoice Date</label>
                    <input type="text" class="form-control" value={this.state.invoiceDate}
                      id="invoicedate" name="invoiceDate"
                      onChange={this.handleUserInput} />
                  </div>
                  <div class="col-xs-12 col-sm-4 col-lg-4 ">
                    <label class="control-label " for="dueDate">Due Date</label>
                    <input type="text" class="form-control" value={this.state.invoiceDueDate} id="invoiceduedate" name="dueDate"
                      onChange={this.handleUserInput} />
                  </div>

                </div>



                <div class="row" style={{ marginTop: '15px' }}>

                  <div class="col-xs-12 col-sm-4 col-lg-4 ">
                    <label class="control-label selectpicker " for="customerName">Product/Service</label>
                    <SelectSearch options={this.state.productOptions} value={this.state.selectedProductName} id="productName"
                      onChange={(e) => this.handleProductDetails(e)} name="productName" placeholder="Select Product " />
                    <span id="product_servicealertmsg" style={{ color: "red" }}></span>
                    <a href="#myModal2" data-toggle="modal" data-target="#myModal2" >
                      <span onClick={() => this.AddProductQuickLinkFunc()}
                        style={{
                          color: "blue",
                        }}> + Product</span>
                    </a>
                  </div>
                  <div class="col-xs-12 col-sm-4 col-lg-4 ">
                    <label class="control-label selectpicker" id="quantity" for="customerName">Quantity</label>
                    <input
                      class="form-control" value={this.state.productQuantity}
                      onChange={this.handleUserProductQuantity} name="productQuantity"
                      onKeyPress={this.handleUser_Product_Rate_Discount_Tax_KeyPress_Func} id="productQuantity" />
                    <span id="quantityalertmsg" style={{ color: "red" }}></span>
                  </div>

                  <div class="col-xs-12 col-sm-2 col-lg-2 ">
                    <label>
                      <button type="button" onClick={() => this.AddToCart()}
                        onKeyPress={this.handleUser_Button_KeyPress_Func}
                        style={{ marginTop: "30px" }}
                        class="btn btn-default pull-right">AddToCart</button> <span></span>
                    </label>

                  </div>
                  <div class="col-xs-12 col-sm-2 col-lg-2 ">

                    <label>

                      <button onClick={() => this.ProductClearFunc()} type="button" style={{ marginTop: "30px" }} class="btn btn-default pull-right ">Clear</button> <span></span>
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
                            <th >Discount(Rs)</th>

                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><input class="col-sm-3" type="text"
                              class="form-control" value={this.state.productRate_Each}
                              onChange={this.handleUser_Product_Rate_Discount_Tax_CalcFunc} name="productRate_Each"
                              id="productRate_Each" onKeyPress={this.handleUser_Product_Rate_Discount_Tax_KeyPress_Func} />
                              <span id="productRate_EachNumberFormatErrorMsg" style={{ color: "red" }}></span>
                            </td>

                            <td id="total_Input"><input type="text" readOnly
                              class="form-control" value={this.state.productTotal}
                              onChange={this.handleUser_Product_Rate_Discount_Tax_CalcFunc} name="productTotal"
                              id="productTotal" />
                            </td>

                            <td><input class="form-control" value={this.state.productDiscountPercentage}
                              onChange={this.handleUser_Product_Rate_Discount_Tax_CalcFunc} name="productDiscountPercentage"
                              id="productDiscountPercentage"
                              onKeyPress={this.handleUser_Product_Rate_Discount_Tax_KeyPress_Func}
                              autocomplete="off" />
                              <span id="productDiscountPercentageNumberFormatErrorMsg" style={{ color: "red" }}></span>
                            </td>
                            <td><input class="form-control"
                              value={this.state.productDiscountAmount} onChange={this.handleUser_Product_Rate_Discount_Tax_CalcFunc}
                              name="productDiscountAmount" id="productDiscountAmount" onKeyPress={this.handleUser_Product_Rate_Discount_Tax_KeyPress_Func}
                              autocomplete="off" />
                              <span id="productDiscountAmountNumberFormatErrorMsg" style={{ color: "red" }}></span>
                            </td>

                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div class="table-responsive" style={{ marginTop: '-11px' }}>
                      <table class="table" fv>
                        <thead>
                          <tr>

                            <th >SubTotal</th>
                            {/* <th>CGST(%)</th>
                    <th>SGST(%)</th> */}
                            <th>Final Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>

                            <td><input type="number" readOnly class="form-control" value={this.state.productSubtotalAmount}
                              onChange={this.handleUser_Product_Rate_Discount_Tax_CalcFunc} name="productSubtotalAmount" id="productSubtotalAmount"
                              autocomplete="off" />
                            </td>
                            {/* <td>
                      <td><input  class="form-control" value={this.state.product_CGST_Percentage} 
                      onChange={this.handleUser_Product_Rate_Discount_Tax_CalcFunc} 
                      name="product_CGST_Percentage" id="product_CGST_Percentage" onKeyPress={this.handleUser_Product_Rate_Discount_Tax_KeyPress_Func}
                       autocomplete="off" />
                      <span id="product_CGST_PercentageNumberFormatErrorMsg" style={{color:"red"}}></span>
                      </td>
                    </td>
                    <td>
                      <input class="form-control" value={this.state.product_SGST_Percentage} 
                      onChange={this.handleUser_Product_Rate_Discount_Tax_CalcFunc} 
                      name="product_SGST_Percentage" id="product_SGST_Percentage" onKeyPress={this.handleUser_Product_Rate_Discount_Tax_KeyPress_Func} 
                      autocomplete="off" />
                       <span id="product_SGST_PercentageNumberFormatErrorMsg" style={{color:"red"}}></span>
                    </td> */}
                            <td>
                              <input class="form-control"
                                value={this.state.productFinalAmount} onChange={this.handleUser_Product_Rate_Discount_Tax_CalcFunc}
                                name="productFinalAmount" id="productFinalAmount" onKeyPress={this.handleUser_Product_Rate_Discount_Tax_KeyPress_Func}
                                autocomplete="off" />
                              <span id="productFinalAmountNumberFormatErrorMsg" style={{ color: "red" }}></span>

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

                    <div class="reactIcon_Dcls">
                      <InvoiceCartIcons
                        onInvoiceCartProductEdit={this.EditProductDetails}
                        onInvoiceCartProductAdd={this.AddProductQtyFunc}
                        onInvoiceCartProductMinus={this.MinusProductQtyFunc}
                        onInvoiceCartProductDelete={this.DeleteCartProductFunc}
                        onInvoiceCartFullyDelete={this.DeleteAllProductInCartFunc}
                      />
                    </div>
                    <div id="tableOverflow">
                      <div style={{ marginBottom: '20%' }}>
                        <ReactTable style={{ height: '200px' }}
                          data={this.state.cartData}
                          columns={this.state.cartColumns}
                          //  noDataText=""
                          filterable
                          //defaultPageSize={10}
                          className="-striped -highlight"
                          defaultFilterMethod={(filter, row, column) => {
                            const id = filter.pivotId || filter.id;
                            return row[id] !== undefined
                              ? String(row[id])
                                .toLowerCase()
                                .indexOf(filter.value.toLowerCase()) !== -1
                              : true;
                          }}
                          showPaginationTop={false}
                          showPaginationBottom={false}
                          getTdProps={this.onTrRowClick}

                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>




              <div className="col-lg-4" style={{ borderRadius: "30px", backgroundColor: "rgba(202, 198, 198, 0.19)", border: "1px #423b3882 solid", marginBottom: "50px" }}>
                {/* section 3 grand total calculation */}

                <div className="row">

                  <div class="form-group">
                    {/*  <div class="col-sm-6">
  <p class="lead">Total Qty: {this.state.totalitemqty} <span name="totalitemqty" id="totalitemqty"></span></p>
  <p class="lead">Amount In Words:  <span id="numWords"></span> Rupees Only</p>
padding-top: "30px";
}
 </div> */}
                    <div class="">
                      <div class="table-responsive">

                        <table class="table" style={{ borderTop: "none", marginTop: "20px" }} >
                          <tbody>
                            {/* <tr><th style={{ width: "50%", borderTop: "none" }}>TotalWithoutGST</th>
                      <td style={{ borderTop: "none", width: "175%",display:"flex" }}>
                      <span id="currencysymbolSpan" style={{fontSize: "19px",marginRight: "10px"}}>{this.state.currencySymbol}</span>
                      <input name="totalWithoutGST" readOnly type="text" 
                      value={this.state.totalWithoutGST} id="totalWithoutGST" class="form-control" />
                      {/* ₹ <span id="subtotal"></span> *</td>
                      <input type="hidden" name="totalWithoutGST" id="TotalWithoutGST" /> 
                      </tr>

                    <tr><th style={{ width: "50%", borderTop: "none" }}>Total GST</th>
                      <td style={{ borderTop: "none",display:"flex" }}>
                      <span id="currencysymbolSpan" style={{fontSize: "19px",marginRight: "10px"}}>{this.state.currencySymbol}</span>
                      <input name="totalGst" readOnly type="text" value={this.state.totalGst} 
                      id="totalGst" class="form-control" />{/* ₹ <span id="subtotal"></span> *</td>
                      <input type="hidden" name="totalGst" id="totalGst" />
                      {/*  <td> ₹ {this.state.totalgst} <span id="tgst"></span></td>*
                    </tr> */}
                            <tr><th style={{ width: "50%", borderTop: "none" }}>NetAmount</th>
                              <td style={{ borderTop: "none", display: "flex" }}>
                                <span id="currencysymbolSpan" style={{ fontSize: "19px", marginRight: "10px" }}>{this.state.currencySymbol}</span>
                                <input name="invoiceAmt" readOnly type="text" value={this.state.invoiceAmt} id="subtotal" class="form-control" />{/* ₹ <span id="subtotal"></span> */}</td>
                              <input type="hidden" name="subtotal1" id="subtotal1" /> </tr>



                            <tr><th style={{ width: "50%", borderTop: "none" }}>Discount</th>
                              <td style={{ borderTop: "none", display: "flex" }}>
                                <span id="currencysymbolSpan" style={{ fontSize: "19px", marginRight: "10px" }}>{this.state.currencySymbol}</span>
                                <input name="discountAmt" type="text" id="discountAmt"
                                  value={this.state.discountAmt}
                                  onChange={this.handleUser_Summary_Discount_AmountPaid_CalcFunc}
                                  onKeyPress={this.handleUser_Summary_Discount_AmountPaid_KeyPress_Func}
                                  class="form-control discount" />
                                <span id="discountAmtNumberFormatErrorMsg" style={{ color: "red" }}></span>
                              </td>
                            </tr>


                            <tr><th style={{ width: "50%", borderTop: "none" }}>Amount Paid</th>
                              <td style={{ borderTop: "none", display: "flex" }}>
                                <span id="currencysymbolSpan" style={{ fontSize: "19px", marginRight: "10px" }}>{this.state.currencySymbol}</span>
                                <input name="invoiceAmt_Paid" type="text" id="invoiceAmt_Paid"
                                  value={this.state.invoiceAmt_Paid}
                                  onChange={this.handleUser_Summary_Discount_AmountPaid_CalcFunc}
                                  onKeyPress={this.handleUser_Summary_Discount_AmountPaid_KeyPress_Func}
                                  class="form-control advance" />
                                <span id="invoiceAmt_PaidNumberFormatErrorMsg" style={{ color: "red" }}></span>
                              </td>
                            </tr>



                            <tr> <th style={{ width: "50%", borderTop: "none" }}>Balance Amount</th>
                              <td style={{ borderTop: "none", display: "flex" }} name="balance" class="grand_total" >
                                <span id="currencysymbolSpan" style={{ fontSize: "19px", marginRight: "10px" }}>{this.state.currencySymbol}</span>
                                <input name="balanceAmt" readOnly type="text" value={this.state.balanceAmt}
                                  id="balanceAmt" class="form-control" />
                              </td>
                            </tr>
                            <tr> <th style={{ width: "50%", borderTop: "none" }}>Select Advisor:</th>
                              <td style={{ borderTop: "none" }} >
                                <SelectSearch options={this.state.staffOptions} value={this.state.selectedAdvisor} id="selectedAdvisor"
                                  onChange={(e) => this.handleAdvisorDetails(e)} name="selectedAdvisor" placeholder="Select Advisor" />

                              </td>
                            </tr>
                            <tr> <th style={{ width: "50%", borderTop: "none" }}>Total Parts Qty:</th>
                              <td style={{ borderTop: "none" }} name="" class="" > {this.state.total_Itemqty} </td>
                            </tr>
                            <tr> <th style={{ width: "50%", borderTop: "none" }}>Net Amount In Words:</th>
                              <td style={{ borderTop: "none" }} name="" class="" > <span id="numWords">{this.state.amountInWords}</span></td>
                            </tr>
                            <tr> <th style={{ width: "50%", borderTop: "none" }}>Payment Status:</th>
                              <td style={{ borderTop: "none" }} name="payment_status" class="grand_total" >
                                {this.state.paymentStatus} <span id="payment_status"></span></td>
                            </tr>
                            <tr id="paymentmodetd"><th style={{ borderTop: "none" }}>Payment Mode</th>
                              <td style={{ borderTop: "none" }} >
                                <SelectSearch options={this.state.paymentoptions} value={this.state.selectedPaymentMode}
                                  onChange={(e) => this.handlePaymentModeDetails(e)} name="paymentMode" placeholder="Payment Option " />

                              </td>
                            </tr>
                            <tr > <th style={{ borderTop: "none", textAlign: "right" }}>
                              <td style={{ borderTop: "none" }}>
                                <Checkbox
                                  checked={this.state.smsCheckBox}
                                  onChange={this.handleChangeSMS}
                                  name="smsCheckBox" color="primary"
                                />SMS
                      </td></th><td style={{ borderTop: "none" }}>
                                <Checkbox
                                  //  disabled={this.state.emaildisabledCheckBox}
                                  checked={this.state.emailCheckBox}
                                  onChange={this.handleChangeEmail}
                                  name="emailCheckBox" color="primary"
                                />Email
                        </td>


                            </tr>
                            {/* <tr > <th style={{ borderTop: "none" }}></th>
                      <td style={{ borderTop: "none" }}>
                        <input type="checkbox" class="CheckBoxClass" name="emailoption" onChange={this.handleUserInput} value="emailoption" id="defaultUnchecked" />
                        <label class="custom-control-label" for="defaultUnchecked"> Email</label></td>
                    </tr> */}
                            <tr>
                              <td style={{ borderTop: "none" }}>
                                <button type="button" onClick={() => this.SaveInvoiceFunc()} style={{ marginRight: "5px" }} class="btn btn-default pull-right">SaveInvoice</button> <span></span>
                              </td>
                              {/* <td style={{ borderTop: "none" }}>
                        <button type="button" onClick={() => this.SaveInvoice_WithEnquiryFunc()} 
                        id="saveinvoicewithenquiry"
                        style={{ marginRight: "5px" }} class="btn btn-default pull-right">SaveInvoice & Enquiry</button> <span></span>
                      </td> */}
                              <td style={{ borderTop: "none", marginRight: "-24px" }}>
                                <button onClick={() => this.CancelFunc()} type="button" class="btn btn-default ">Cancel</button>
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


          <Modal
            isOpen={this.state.productQtyAddModal}
            //  onAfterOpen={this.customerafterOpenModal}
            onRequestClose={this.state.productQtyAddcloseModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <InvoiceProductQtyAddModal ProductQtyAddFunc={this.ProductQtyAddFunc} />
            <button onClick={() => this.ProductQtyAddcloseModal("Save")} >Save</button>
            <button onClick={() => this.ProductQtyAddcloseModal("Close")} >close</button>
          </Modal>

          <Modal
            isOpen={this.state.productQtyMinusModal}
            //  onAfterOpen={this.customerafterOpenModal}
            onRequestClose={this.state.productQtyMinuscloseModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <InvoiceProductQtyMinusModal ProductQtyMinusFunc={this.ProductQtyMinusFunc} />
            <button onClick={() => this.ProductQtyMinuscloseModal("Save")} >Save</button>
            <button onClick={() => this.ProductQtyMinuscloseModal("Close")} >Close</button>
          </Modal>

          <ToastContainer style={{ marginTop: "60px" }} />


          <SlidingPane
            className="some-custom-class"
            overlayClassName="some-custom-overlay-class"
            isOpen={this.state.isEnquiryPaneOpen}
            title={"Invoice Enquiry Details"}
            subtitle="Can Add Items not Sufficient in Cart as Enquiry"
            onRequestClose={() => {
              // triggered on "<" on left top click or on outside click
              // setState({ isPaneOpen: false });
              this.CloseEnquirySlide()
            }}
          >

            <InvoiceEnquiry stateData={this.state} enquiryCartData={this.state.enquiryCartData}
              SetEnquiryTableData={this.SetEnquiryTableData}
            />
          </SlidingPane>

          <SlidingPane
            className="some-custom-class"
            overlayClassName="some-custom-overlay-class"
            isOpen={this.state.isAddCustomerPaneOpen}
            title={"Customer Info"}
            subtitle="Can Add Customer Info Here"
            onRequestClose={() => {
              // triggered on "<" on left top click or on outside click
              // setState({ isPaneOpen: false });
              this.AddCustomerQuickLinkCloseFunc()
            }}
          >
            {/* {this.RenderUpdateComponenets(this.state.taskSelected)} */}
            <CustomerComponent SubmitClicked={this.SubmitCustomerInfoSlide} CancelClicked={this.CloseCancelCustomerInfoSlide} />
          </SlidingPane>


          <SlidingPane
            className="some-custom-class"
            overlayClassName="some-custom-overlay-class"
            isOpen={this.state.isAddProductPaneOpen}
            title={"Product Info"}
            subtitle="Can Add Product Info Here"
            onRequestClose={() => {
              // triggered on "<" on left top click or on outside click
              // setState({ isPaneOpen: false });
              this.AddProductQuickLinkCloseFunc()
            }}
          >

            <AddProduct1 pageCalledData="SaleInvoice" SubmitClicked={this.SubmitProductInfoSlide} CancelClicked={this.CloseCancelProductInfoSlide} />

          </SlidingPane>



        </div>

      </div>
    );
  }
}

export default EstimateInvoice;



export const EstimateInvoice_CurrencyChange = (InvoicePageStates) => {

  var self = InvoicePageStates;
  console.log("InvoicePageStates :", InvoicePageStates);

  //alert("LOCATION CHANGED since cart empty");

  window.estimateInvoiceComponent.CurrencyFormat();

}



export const PopulateFields = (currentState, AjaxData, AjaxData_ProductList, calledFrom) => {

  //console.log("PopulateFields DATA CALLED ");

  var self = currentState;
  var customerOptions = [];
  var productOptions = [];
  var staffOptions = [];

  console.log("PopulateFields DATA CALLED AjaxData :", AjaxData);
  const productList = [...AjaxData_ProductList];

  console.log("PopulateFields DATA CALLED productList :", productList);

  self.state.customerArrayList = "";
  self.state.productArrayList = "";
  self.state.staffArrayList = "";
  self.state.productInventoryArrayList = "";

  self.state.customerArrayList = AjaxData.customerList;
  self.state.productArrayList = productList;
  self.state.staffArrayList = AjaxData.staffList;
  self.state.productInventoryArrayList = AjaxData.productList;


  $.each(self.state.customerArrayList, function (i, item) {
    customerOptions.push({ label: item.customerName + ' ' + item.cust_ContactNo, value: item.customerId });
  })

  $.each(self.state.productArrayList, function (i, item) {

    if (item.productType == "product") {
      productOptions.push({ label: item.productName + " ( " + item.productQty + " ) ", value: item.productId });
    }
    else {
      productOptions.unshift({ label: item.productName, value: item.productId });
    }
  })

  $.each(self.state.staffArrayList, function (i, item) {
    staffOptions.push({ label: item.staffName + " - " + item.staffRole, value: item.staffId });
  })

  self.state.customerOptions = customerOptions;
  self.state.productOptions = productOptions;
  self.state.staffOptions = staffOptions;


  self.setState({
    customerOptions: self.state.customerOptions,
    productOptions: self.state.productOptions,
    staffOptions: self.state.staffOptions,
    productInventoryArrayList: self.state.productInventoryArrayList,
    productArrayList: productList
  })

}

export const ProductClear = (currentState) => {

  var self = currentState;

  console.log("ProductClear FUNC CALLED ");

  $("#saveinvoicewithenquiry").prop('disabled', true);
  self.state.invoice_withEnquiry = "no";

  self.state.productId = "";
  self.state.selectedProductName = "";
  self.state.productQuantity = "";
  self.state.productRate_Each = "";
  self.state.productTotal = "";
  self.state.productDiscountPercentage = "";
  self.state.productDiscountAmount = "";
  self.state.productSubtotalAmount = "";
  self.state.product_CGST_Percentage = "";
  self.state.product_SGST_Percentage = "";
  self.state.productFinalAmount = "";



  self.setState({
    productId: self.state.productId,
    selectedProductName: self.state.selectedProductName,
    productQuantity: self.state.productQuantity,
    productRate_Each: self.state.productRate_Each,

    productTotal: self.state.productTotal,
    productDiscountPercentage: self.state.productDiscountPercentage,
    productDiscountAmount: self.state.productDiscountAmount,

    productSubtotalAmount: self.state.productSubtotalAmount,
    product_CGST_Percentage: self.state.product_CGST_Percentage,
    product_SGST_Percentage: self.state.product_SGST_Percentage,

    productFinalAmount: self.state.productFinalAmount,
    invoice_withEnquiry: self.state.invoice_withEnquiry,
  })

}



export const Above_CartFieldClear = (currentState) => {

  var self = currentState;

  console.log("Above_CartFieldClear FUNC CALLED ");

  $("#saveinvoicewithenquiry").prop('disabled', true);
  $("#customerEmailIdAlertMsg").empty();

  self.state.selectedCustomerName = "";
  self.state.orderNumber = "";
  self.state.invoiceDate = self.state.date;
  self.state.invoiceDueDate = self.state.date;
  self.state.cartData = [];
  self.state.invoice_withEnquiry = "no";

  self.state.customerName = "";
  self.state.customerAddress = "";
  self.state.customerGSTINNO = "";
  self.state.companyName = "";

  self.setState({
    selectedCustomerName: self.state.selectedCustomerName,
    orderNumber: self.state.orderNumber,
    invoiceDate: self.state.invoiceDate,

    dueDate: self.state.dueDate,
    cartData: self.state.cartData,
    invoice_withEnquiry: self.state.invoice_withEnquiry,

    customerName: self.state.customerName,
    cust_address: self.state.customerAddress,
    cust_gstNo: self.state.customerGSTINNO,
    companyName: self.state.companyName,

  })

}

export const SummaryClear = (currentState) => {

  var self = currentState;

  console.log("SummaryClear FUNC CALLED ");




  $("#discountAmtNumberFormatErrorMsg").empty();
  $("#invoiceAmt_PaidNumberFormatErrorMsg").empty();
  $("#invoiceAmt_PaidNumberFormatErrorMsg").empty();
  $("#customerEmailIdAlertMsg").empty();

  $("#saveinvoicewithenquiry").prop('disabled', true);
  self.state.invoice_withEnquiry = "no";
  self.state.cartDataInfo = 'Empty';

  self.state.totalWithoutGST = "";
  self.state.totalGst = "";
  self.state.invoiceAmt = "";
  self.state.invoiceAmt_Paid = "";
  self.state.balanceAmt = "";
  self.state.selectedAdvisor = "";
  self.state.invoiceAdvisor = "";
  self.state.invoiceAdvisorId = "";
  self.state.total_Itemqty = "";
  self.state.amountInWords = "";
  self.state.paymentStatus = "";
  self.state.paymentMode = "";
  self.state.discountAmt = "";
  self.state.selectedPaymentMode = "";
  self.state.smsCheckBox = false;
  self.state.emailCheckBox = false;
  self.state.enquiryCartData = [];
  self.state.emailId = "";
  self.state.contactNo = "";


  self.setState({
    totalWithoutGST: self.state.totalWithoutGST,
    totalGst: self.state.totalGst,
    invoiceAmt: self.state.invoiceAmt,

    invoiceAmt_Paid: self.state.invoiceAmt_Paid,
    balanceAmt: self.state.balanceAmt,

    selectedAdvisor: self.state.selectedAdvisor,
    invoiceAdvisor: self.state.invoiceAdvisor,
    invoiceAdvisorId: self.state.invoiceAdvisorId,

    total_Itemqty: self.state.total_Itemqty,
    amountInWords: self.state.amountInWords,
    paymentStatus: self.state.paymentStatus,

    paymentMode: self.state.paymentMode,
    discountAmt: self.state.discountAmt,
    selectedPaymentMode: self.state.selectedPaymentMode,

    smsCheckBox: self.state.smsCheckBox,
    emailCheckBox: self.state.emailCheckBox,
    enquiryCartData: self.state.enquiryCartData,

    emailId: self.state.emailId,
    contactNo: self.state.contactNo,

    invoice_withEnquiry: self.state.invoice_withEnquiry,
    cartDataInfo: self.state.cartDataInfo,
  })

  localStorage.setItem('CartDataInfo', CryptoJS.AES.encrypt(self.state.cartDataInfo, "shinchanbaby"));
}


/*
USED TO REPOPULATE THE CART WITH AVAILABLE SUFFICIENT QUANTITY
*/
export const RepopulateCartData_InsufficientQty = (currentState, AjaxData) => {

  var self = currentState;

  self.state.cartData = [];

  var totalWithoutGST = 0;
  var totalGst = 0;
  var invoiceAmt = 0;
  var amountInWords = "";
  var totalItemQty = 0;
  var totalCGSTAmt = 0;
  var totalSGSTAmt = 0;
  var totalIGSTAmt = 0;
  var balanceAmt = 0;

  self.state.totalWithoutGST = "";
  self.state.totalGst = "";
  self.state.invoiceAmt = "";
  self.state.amountInWords = "";
  self.state.paymentStatus = "";
  self.state.total_Itemqty = "";
  self.state.totalCGSTAmt = 0;
  self.state.totalSGSTAmt = 0;
  self.state.totalIGSTAmt = 0;
  self.statebalanceAmt = "";

  console.log("AjaxData.insufficientProductList :", AjaxData.insufficientProductList);

  var count = 0;
  $.each(AjaxData.insufficientProductList, function (i, item) {
    count = Number(count) + 1;


    var productRate_Each = Truncate_2DecimalPlaces(item.productRate);
    var product_CGST_Percentage = item.product_CGST_Percentage;
    var product_SGST_Percentage = item.product_SGST_Percentage;


    var productTotal = Truncate_2DecimalPlaces(Number(item.productQty) * Number(productRate_Each));
    var productDiscountAmount = Truncate_2DecimalPlaces(item.productDiscountAmount);
    var productDiscountPercentage = Truncate_2DecimalPlaces(item.productDiscountPercentage);

    var productSubtotalAmount = Truncate_2DecimalPlaces(Number(productTotal) - Number(productDiscountAmount));


    var product_CGST_Amount = Truncate_2DecimalPlaces((Number(productSubtotalAmount) * Number(product_CGST_Percentage)) / 100);
    var product_SGST_Amount = Truncate_2DecimalPlaces((Number(productSubtotalAmount) * Number(product_SGST_Percentage)) / 100);

    var productFinalAmount = Truncate_2DecimalPlaces(Number(productSubtotalAmount) + Number(product_CGST_Amount) + Number(product_SGST_Amount));


    if (Number(productDiscountAmount) > Number(productSubtotalAmount)) {
      productDiscountAmount = 0.00;
      productDiscountPercentage = 0;
    }

    self.state.cartData[i] = {
      'SNO': count,
      'ProductId': item.ProductId,
      'Item': item.productName,
      'ProductType': item.productType,
      'Rate': item.productRate,
      'Qty': item.productQty,
      'Total': productTotal,
      'DiscountPercentage': productDiscountPercentage,
      'DiscountAmt': productDiscountAmount,
      'SubTotal': productSubtotalAmount,
      'CGST_Percentage': item.product_CGST_Percentage,
      'SGST_Percentage': item.product_SGST_Percentage,
      'CGSTAmt': product_CGST_Amount,
      'SGSTAmt': product_SGST_Amount,
      'FinalAmt': productFinalAmount,
    }

  });

  var cartData = [...self.state.cartData];
  console.log("RepopulateCartData_InsufficientQty cartData: ", cartData);

  self.state.cartData = [];
  self.setState({
    cartData: self.state.cartData,
  })

  window.estimateInvoiceComponent.PopulateCartData(cartData, 0);

}

/*
  USED TO HIDE THE ERROR MESSAGES OF THE FIELDS DISPLAYED
  */
function HideFieldErroeMsgs(fieldId) {
  setTimeout(function () {
    $("#" + fieldId).empty();
  }, 4000);
}


/*	
USED TO CLOSE NOTIFICATION INFO	
*/
function CloseInfo() {
  // alert("closeinfo called ");	
  Notification.close();
  window.estimateInvoiceComponent.NotificationClose();
}