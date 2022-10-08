import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';


import $ from 'jquery';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css 
import { FormErrors } from './FormErrors';

import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import FooterText from './FooterText';

import ProductExcelImport from './ProductExcelImport';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import Case from 'case';
import moment from 'moment';
import Select from 'react-select';
import ProductList from './ProductList';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage, GetDynamicFieldsName } from './ConstSiteFunction';
import {Double_BackButtonComponent} from'./ServiceRegistration/ButtonComponent';

class AddProduct1 extends Component {
  constructor() {
    super()
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state = {
      productName: '',
      productType: '',
      productCategory: '',
      quantity: 0,
      quantityLimit: '',
      statetax: 0,
      sgst: 0,
      igst: 0,
      hsnCode: '',
      staffId:staffId,
      employeeName:employeeName,
     role:role, 
      saleRate:'',
      purchaseRate:'',
  
      description: '',
      formErrors: {
        productName: '',
        productType: '',
        productCategory: '',
        statetax: 0,
        sgst: 0,
        igst: 0,   
        saleRate:'',
        purchaseRate:'',
        quantityLimit: '',


      },
      productNameValid: false,
      productTypeValid: false,
      saleRateValid:false,
      purchaseRateValid:false,
      quantityLimitValid: false,   
      productCategoryValid: false,

    }
  }

  handleUserInputProductType = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.state.quantity = 0;
    this.state.quantityLimit = 0;

    if (value == "service" || value == "general" || value == "labour") {


      this.state.purchaseRateValid = true;
      this.state.productCategoryValid = true;


      $("#quantity1").hide();
      $("#quantityLimit1").hide();
      $("#productCategory1").hide();
      $("#serviceminimumtime").show();

      this.state.productCategory = "-";
      $("#purchaseRate1").hide();
      this.state.purchaseRate = "-";


      this.setState({
        productCategory: this.state.productCategory,
        purchaseRate: this.state.purchaseRate,
      })
    } 
  
    else if (value == "product" && this.state.productCategory == "Purchase") {
      $("#quantity1").hide();
      $("#quantityLimit1").show();
      this.state.purchaseRateValid = false;
      this.state.productCategoryValid = false;
      $("#productCategory1").show();
      $("#serviceminimumtime").hide();
      this.state.productCategory = "";
      $("#purchaseRate1").show();
      this.state.purchaseRate = "";
    }
    else if (value == "product" && this.state.productCategory == "Own") {

      $("#quantity1").show();
      $("#quantityLimit1").show();
      this.state.purchaseRateValid = false;
      this.state.productCategoryValid = false;
      $("#productCategory1").show();
      $("#serviceminimumtime").hide();
      this.state.productCategory = "";
      $("#purchaseRate1").show();
      this.state.purchaseRate = "";
    }
    else if (value == "product") {
      this.state.productCategory = "";
      this.state.purchaseRateValid = false;
      this.state.productCategoryValid = false;
     $("#productCategory").val('');
      $("#quantity1").show();
      $("#quantityLimit1").show();
      $("#productCategory1").show();
      $("#serviceminimumtime").hide();


      this.state.productCategory = "";
      $("#purchaseRate1").show();
      this.state.purchaseRate = "";
    }

    this.setState({ [name]: value },
      () => { this.validateField(name, value) });



  }

  handleUserInputProductCategory = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.state.quantity = 0;
    this.state.quantityLimit = 0;

    if (this.state.productType == "service" || this.state.productType == "general" || this.state.productType == "labour" ) {


      $("#quantity1").hide();
      $("#quantityLimit1").hide();
      $("#productCategory1").hide();
      $("#purchaseRate1").hide();
       $("#serviceminimumtime").show();

      this.state.productCategory = "-";
      this.state.purchaseRate = "-";
      this.state.purchaseRateValid = true;
      this.state.productCategoryValid = true;

      this.setState({
        productCategory: this.state.productCategory,
        purchaseRate: this.state.purchaseRate,
      })

    }
 
    else if (this.state.productType == "product" && value == "Purchase") {
      $("#quantity1").hide();
      $("#quantityLimit1").show();
      this.state.purchaseRateValid = false;
      this.state.productCategoryValid = false;
      $("#productCategory1").show();
      $("#serviceminimumtime").hide();
      this.state.productCategory = "";
      $("#purchaseRate1").show();
      this.state.purchaseRate = "";
    }
    else if (this.state.productType == "product" && value == "Own") {

      $("#quantity1").show();
      $("#quantityLimit1").show();
      this.state.purchaseRateValid = false;
      this.state.productCategoryValid = false;
      $("#productCategory1").show();
      $("#serviceminimumtime").hide();
      this.state.productCategory = "";
      $("#purchaseRate1").show();
      this.state.purchaseRate = "";
    }
   else if (this.state.productType == "product") {
      this.state.purchaseRateValid = false;
      this.state.productCategoryValid = false;
      $("#productCategory").val('');
      $("#quantity1").show();
      $("#quantityLimit1").show();
      $("#productCategory1").show();
      $("#serviceminimumtime").hide();

      this.state.productCategory = "";
      $("#purchaseRate1").show();
      this.state.purchaseRate = "";
      
    }

    this.setState({ [name]: value },
      () => { this.validateField(name, value) });



  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value },
      () => { this.validateField(name, value) });



  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let productNameValid = this.state.productNameValid;
    let saleRateValid = this.state.saleRateValid;
    let productTypeValid = this.state.productTypeValid;
    let productCategoryValid = this.state.productCategoryValid;
    let quantityLimitValid = this.state.quantityLimitValid;
    let purchaseRateValid = this.state.purchaseRateValid;

    switch (fieldName) {
      case 'productName':
        productNameValid = value.length >= 2;
        fieldValidationErrors.ProductName = productNameValid ? '' : ' is InCorrect';
        break;
      case 'saleRate':
        saleRateValid = value.length >= 1 && value >0 ;
        fieldValidationErrors.SaleRate = saleRateValid ? '' : ' is InCorrect';
        break;
      case 'purchaseRate':
        purchaseRateValid = value.length >= 1 && value >0 ;
        fieldValidationErrors.PurchaseRate = purchaseRateValid ? '' : ' is InCorrect';
        break;

      case 'productType':
        productTypeValid = value.length >= 1;
        fieldValidationErrors.ProductType = productTypeValid ? '' : ' is not selected';
        break;


      case 'productCategory':
        productCategoryValid = value.length >= 1;
        fieldValidationErrors.ProductCategory = productCategoryValid ? '' : ' is not selected';
        break;


      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      productNameValid: productNameValid,
      saleRateValid: saleRateValid,
      productTypeValid: productTypeValid,
      purchaseRateValid: purchaseRateValid,
      productCategoryValid: productCategoryValid,
    }, this.validateForm);
  }
  validateForm() {

    this.setState({
      formValid:
        this.state.productNameValid
        && this.state.saleRateValid
        && this.state.productTypeValid
        && this.state.purchaseRateValid
        && this.state.productCategoryValid
    });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }

  componentDidMount() {

    this.state.pageCalledProps=false;
    if(this.props.pageCalledData!=undefined && this.props.pageCalledData!=""){
        this.state.pageCalledProps=true;
    }
    SetCurrentPage("AddProduct");
    window.scrollTo(0, 0);
  
    $(".btn-default").css("background-color","#05a4b5");
    $(".btn-default").css("color","white");
    

  }
  AddProductFunc() {
    var self = this;
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });
  
    if (self.state.productCategory == "Purchase") {
      self.state.quantity = 0;
    }

    var errorData = "No";
    if (this.state.productType == "service" || this.state.productType == "general" ||
    this.state.productType == "labour") {

      self.state.productCategory = "Own";
      self.state.purchaseRate = 0;
      self.setState({
        productCategory: self.state.productCategory,
        purchaseRate: self.state.purchaseRate,
      })
    }
    else if (this.state.productType == "product" && this.state.productCategory == "Purchase") {

      if (this.state.quantityLimit == '') {
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
    else if (this.state.productType == "product" && this.state.productCategory == "Own") {

      if (Number(this.state.quantity) == 0 || this.state.quantityLimit == '') {
        errorData = "Yes";

        if (Number(this.state.quantity) == 0) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Kindly Add Quantity',
            showConfirmButton: false,
            timer: 2000
          })
        } else if (this.state.quantityLimit == '') {
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

         if(this.state.statetax==""){
          this.state.statetax=0;
         }
          if(this.state.sgst==""){
          this.state.sgst=0;
         }
         if(this.state.igst==""){
          this.state.igst=0;
         }

      if (this.state.productName.trim().length > 0) {
        $.ajax({
          type: 'POST',
          data: JSON.stringify({
            productName: Case.capital(this.state.productName),
            productType: this.state.productType,
            productCategory: this.state.productCategory,
            quantity: this.state.quantity,
            quantityLimit: this.state.quantityLimit,
            cgst: this.state.statetax,
            sgst: this.state.sgst,
            igst: this.state.igst,
            hsnCode: this.state.hsnCode,
            description: this.state.description,
            companyId: this.state.companyId,
            saleRate: (Math.round(this.state.saleRate * 100) / 100).toFixed(2),
            purchaseRate: (Math.round(this.state.purchaseRate * 100) / 100).toFixed(2),
        
            staffId: self.state.staffId,
            employeeName: self.state.employeeName,
            role: self.state.role,
            site:GetCurrentSite() ,
          }),
        
          url: "http://15.206.129.105:8080/ThroughBooksCOAPI/master/addproduct",
          contentType: "application/json",
          dataType: 'json',
          async: false,
          success: function (data, textStatus, jqXHR) {

            if( self.state.pageCalledProps==true){
            self.props.SubmitClicked(data);
          }

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
            /*  ReactDOM.render(
                <Router >
                  <div>
                    <Route path="/" component={ProductList} />
                  </div>
                </Router>, document.getElementById('contentRender'));
                */
              self.state.productName = "";
              self.state.description = "";
              self.state.hsnCode = "";
              self.state.saleRate = "";
              self.state.purchaseRate = "";
              self.state.quantity = 0;
              self.state.quantityLimit = "";
              self.state.statetax = 0;
              self.state.sgst = 0;
              self.state.igst = 0;
              self.state.formValid = false;
              self.state.productNameValid = false;

              self.state.quantityLimitValid = false;
              self.state.saleRateValid = false;
              self.state.productTypeValid = false;
              self.state.purchaseRateValid = false;
              self.state.productCategoryValid = false;
         


              $('[name=productType]').val('');
              $('[name=productCategory]').val('');
              $("#quantity1").show();
              $("#quantityLimit1").show();
              self.setState({
                productName: '',
                description: '',
                productCategory: '',
                saleRate: '',
                purchaseRate: '',
                quantity: 0,
                quantityLimit: '',
                hsnCode: '',
                productType: '',
                statetax: 0,
                sgst: 0,
                igst: 0,
                formValid: false,
                productNameValid: false,
                saleRateValid: false,
                productTypeValid: false,
                quantityLimitValid: false,
                purchaseRateValid: false,
                productCategoryValid: false,
               

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
          title: 'Enter Product Name',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }
  }


  cancelFunc() {

    $('[name=productType]').val('');
    $('[name=productCategory]').val('');
    this.state.productName = "";
    this.state.description = "";
    this.state.quantityLimit = "";
    this.state.hsnCode = "";
    this.state.saleRate = "";
    this.state.purchaseRate = "";
    this.state.quantity = 0;
    this.state.statetax = 0;
    this.state.sgst = 0;
    this.state.igst = 0;
  

    this.setState({
      productName: this.state.productName,
      productType: this.state.productType,
      productCategory: this.state.productCategory,
      quantity: this.state.quantity,
      quantityLimit: this.state.quantityLimit,
      statetax: this.state.statetax,
      sgst: this.state.sgst,
      igst: this.state.igst,
      hsnCode: this.state.hsnCode,
      purchaseRate: this.state.purchaseRate,
      saleRate: this.state.saleRate,
      description: this.state.description,
 

      productCategoryValid: false,
      productNameValid: false,
      productTypeValid: false,
      quantityLimitValid: false,
      purchaseRateValid: false,
      saleRateValid: false,

    })
    ReactDOM.render(<AddProduct1 />, document.getElementById("contentRender"));
  }

  BackbtnFunc() {
    //   alert(this.state.backButtonVariable)
    var dirtyValue = "false";
    if((this.state.productName.length == 0))
    {
      this.setState({
        productCategoryValid: false,
        productNameValid:false,
        productTypeValid:false,
      })

    }
    if((this.state.purchaseRate.length == 0))
    {
      this.setState({
        purchaseRateValid: false,
      })

    }
    if((this.state.saleRate.length == 0))
    {
      this.setState({
        saleRateValid: false,      
      })

    }
   

    if ((this.state.productName.length == 0 || this.state.productType.length == 0 ||this.state.productCategory.length == 0 ) &&
      this.state.hsnCode.length == 0 && this.state.saleRate.length == 0
      && this.state.description.length == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={ProductList} />
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

          <Route path="/" component={ProductList} />


        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }
  CancelBack() {
  

  }

  
  

  render() {
    return (
      <div class="container">
     <div class="row" style={{marginTop:"13px"}}>
          <div class="col-lg-3 col-md-3 col-sm-3 col-xd-3">
          <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
          </div>
          <div class="col-lg-9 col-md-9 col-sm-9 col-xd-9">
            <h3 style={{marginLeft:"150px"}}>Product Entry Form</h3>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <div className="panel panel-default">
              <FormErrors formErrors={this.state.formErrors} />
            </div>

            <form class="form-horizontal form-bordered" >
              <div className={`form-group ${this.errorClass(this.state.formErrors.productName)}`}>
                <label class="control-label col-sm-2 remove" for="productName">Product Name<span style={{ color: "red" }}>*</span></label>
                <div class=" col-sm-10">
                  <input type="text" class="form-control" value={this.state.productName} onChange={this.handleUserInput} name="productName" id="productName" placeholder="Product Name" />
                </div>
              </div>

              <div className={`form-group ${this.errorClass(this.state.formErrors.productType)}`}>
                <label class="control-label col-sm-2 " for="productType">Product Type<span style={{ color: "red" }}>*</span></label>
                <div class=" col-sm-10">
                  <select name="productType" id="productType" onChange={this.handleUserInputProductType} class="form-control">
                    <option disabled selected hidden value="">--Select--</option>
                    <option value="product">Product</option>
                    <option value="service">Service</option>
                    {/* <option value="general">General</option>
                    <option value="labour">Labour</option> */}
                 
                  </select>
                </div>
              </div>

              <div id="productCategory1" className={`form-group ${this.errorClass(this.state.formErrors.productCategory)}`}>
                <label class="control-label col-sm-2 " for="productCategory">Quantity Config<span style={{ color: "red" }}>*</span></label>
                <div class=" col-sm-10">
                  <select name="productCategory" id="productCategory" onChange={this.handleUserInputProductCategory} class="form-control">
                    <option disabled selected hidden value="">--Select--</option>
                    <option value="Own">Add quantity mannually</option>
                    <option value="Purchase">Add quantity on purchase invoice</option>
                  </select>
                </div>
              </div>

              <div className="form-group " id="quantity1">
                <label class="control-label col-sm-2" for="quantity"> Quantity<span style={{ color: "red" }}>*</span></label>
                <div class=" col-sm-10">
                  <input type="number" min="0" class="form-control" value={this.state.quantity} onChange={this.handleUserInput} name="quantity" id="quantity" placeholder="Quantity...  " />
                </div>
              </div>



              <div className="form-group" id="quantityLimit1">
                <label class="control-label col-sm-2 remove" for="quantityLimit">Quantity Limit<span style={{ color: "red" }}>*</span></label>
                <div class=" col-sm-10">
                  <input type="number" min="0" class="form-control" value={this.state.quantityLimit} onChange={this.handleUserInput} name="quantityLimit" id="quantityLimit" placeholder="Quantity alert limit...  " />
                </div>
                <label class="control-label col-sm-2 remove" for="quantityLimit"></label>
                <div class=" col-sm-10">
                  <span style={{ color: "red" }}>*Enter quantity when you want an alert ?</span>
                </div>
              </div>

          

              <div className="form-group ">

                <label class="control-label col-sm-2">{this.props.tax1LabelName}(%)</label>
                <div class=" col-sm-10">

                  <input type="number" min="0" class="form-control" value={this.state.statetax} onChange={this.handleUserInput} name="statetax" id="statetax" placeholder="statetax...  " />

                </div>
              </div>
              <div className="form-group">

                <label class="control-label col-sm-2">{this.props.tax2LabelName}(%)</label>
                <div class=" col-sm-10">
                  <input type="number" min="0" class="form-control" value={this.state.sgst} onChange={this.handleUserInput} name="sgst" id="sgst" placeholder="SGST...  " />

                </div>
              </div>
              <div className="form-group ">

               {/* <label class="control-label col-sm-2">IGST(%)</label>
                <div class=" col-sm-10">
                  <input type="number" min="0" class="form-control" value={this.state.igst} onChange={this.handleUserInput} name="igst" id="igst" placeholder="IGST...  " />

                </div>*/}
              </div>
              <div class="form-group">
                <label class="control-label col-sm-2" for="hsnCode"> HSN Code</label>
                <div class=" col-sm-10">
                  <input type="text" class="form-control" value={this.state.hsnCode} onChange={this.handleUserInput} name="hsnCode" id="hsnCode" placeholder="HSN Code" />
                </div>
              </div>
              <div className={`form-group ${this.errorClass(this.state.formErrors.saleRate)}`}>
                <label class="control-label col-sm-2" for="saleRate"> Sale Rate(/unit)<span style={{ color: "red" }}>*</span></label>
                <div class=" col-sm-10">
                  <input type="number" min="0" class="form-control" value={this.state.saleRate} onChange={this.handleUserInput} name="saleRate" id="saleRate" placeholder="Enter price...  " />
                </div>
              </div>
              <div id="purchaseRate1" className={`form-group ${this.errorClass(this.state.formErrors.purchaseRate)}`}>
                <label class="control-label col-sm-2" for="purchaseRate"> Purchase Rate(/unit)<span style={{ color: "red" }}>*</span></label>
                <div class=" col-sm-10">
                  <input type="number" min="0" class="form-control" value={this.state.purchaseRate} onChange={this.handleUserInput} name="purchaseRate" id="purchaseRate" placeholder="Enter price...  " />
                </div>
              </div>

              <div class="form-group">
                <label class="control-label col-sm-2 remove" for="description">Description</label>
                <div class=" col-sm-10">
                  <textarea rows="2" cols="20" class="form-control" value={this.state.description} onChange={this.handleUserInput} name="description" id="description" > </textarea>
                </div>
              </div>


              <div class="form-group">
                <div class="row" style={{ marginLeft: "3px", marginBottom: "5%" }}>
                  <div class="col-sm-offset-2 col-sm-10">
                    <button style={{ fontWeight: "bold" }} type="button" disabled={!this.state.formValid} onClick={() => this.AddProductFunc()} class="btn btn-default">Submit</button> <span></span>
                    <button style={{ fontWeight: "bold" }} type="button" onClick={() => this.cancelFunc()} class="btn btn-default">Clear</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>

    );
  }
}

export default AddProduct1;