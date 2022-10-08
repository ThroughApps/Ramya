import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import VendorEntryForm from './VendorEntryForm';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { FormErrors } from './FormErrors';
import { confirmAlert } from 'react-confirm-alert'; // Import
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';

import Case from 'case';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import CryptoJS from 'crypto-js';
import CustomerExcelImport from './CustomerExcelImport';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import SelectSearch from 'react-select';
import CustomerList from './CustomerList';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';

var _isDirty = false;
var bookingarray = [];
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


class CustomerEntryForm extends Component {
  constructor() {
    super()
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state = {
      customerName: '',
      companyName: '',
      companyName1: '',
      address: '',
      contactNo: '',
      vehicleName:'',
      vehicleNo:'',
      alternateContactNo: '',
      gstNo: '',
      landlineNo: '',
      staffId: staffId,
      employeeName: employeeName,
      role: role,
      email: '',
      city: '',
      formErrors: {
      
        companyName: '',
        address: '',       
        gstNo: '',
        email: '',
        vehicleName:'',
        vehicleNo:'',
      },
     
      companyNameValid: false,
      addressValid: false,
     
      emailValid: false,
      vehicleNoValid: false,
      vehicleNameValid: false,
      backButtonVariable: true,
    }
  }

  componentDidMount() {
    SetCurrentPage("CustomerEntry");
    window.scrollTo(0, 0);

    var _isDirty = false;
    $(':input').change(function () {
      _isDirty = true;
    });
    this.GetData();
    this.SelectCustomer();
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
  GetData() {
    var self = this;
    bookingarray=[];
    $(".btn-default").css("background-color","#05a4b5");
    $(".btn-default").css("color","white");
    var vehicleRegistrationNo;
    var bookingId;
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,

      }),
      contentType: "application/json",
      dataType: 'json',
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/master/vehicleregistrationreport",
      async: false,
      crossDomain: true,
      success: function (data, textStatus, jqXHR) {
        var no;

        self.state.dataList=[];

        var options1 = [];
        var options = [];
        vehicleRegistrationNo += '<option value ="" disabled selected hidden >Select a Vehicle</option>';
          
        bookingId += '<option value ="" disabled selected hidden >Select BookingId</option>';
          
    
      

         $.each(data.vehicleRegistrationRetrievelist, function (i, item) {
            options1.push({ label: item.vehicleRegistrationNo, value: item.vehicleRegistrationNo });
            options.push({ label: item.bookingId, value: item.bookingId });

            var content = JSON.stringify({
                vehicleRegistrationNo: item.vehicleRegistrationNo,
                bookingId: item.bookingId,
                customerName: item.customerName,
                contactNo: item.contactNo,                   
                email: item.email,
                issues: item.issues,
         });
    bookingarray.push(content);
           
          });
          self.state.options1 = options1;
          self.state.options = options;
          self.setState({
              options1: self.state.options1,
              options:self.state.options,
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

  CustomerExcelExportFunc() {

    var companyId = CryptoJS.AES.decrypt(
      localStorage.getItem("CompanyId"),
      "shinchanbaby"
    ).toString(CryptoJS.enc.Utf8);
    this.state.companyId = companyId;
    var today = new Date();
    var today1 =
      today.getFullYear() +
      "_" +
      (today.getMonth() + 1) +
      "_" +
      today.getDate();

    var totalName =
      companyId +
      "_" +
      today.getHours() +
      "_" +
      today.getMinutes() +
      "_" +
      today.getSeconds() +
      "_" +
      today1 +
      ".xlsx";

    this.state.customerFileName = totalName;


    this.setState({
      customerFileName: this.state.customerFileName,
      companyId: this.state.companyId
    });

    $.ajax({
      type: "POST",
      data: JSON.stringify({
        customerFileName: this.state.customerFileName,
        companyId: this.state.companyId
      }),


      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/Excel/ExportCustomerFile",
      contentType: "application/json",
      dataType: "json",
      async: false,
      success: function (data, textStatus, jqXHR) {


        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "The File Requested For Import Is Downloaded Successfully", // Message dialog  
          showConfirmButton: false,
          timer: 2000
        })


      },
      error: function (data) {

        Swal.fire({
          position: 'center',
          icon: 'error',
          title: "Network Connection Problem",
          showConfirmButton: false,
          timer: 1500
        })

      }
    });
  }

  ImportFunc1() {

    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={CustomerExcelImport} />
        </div>
      </Router>,
      document.getElementById("contentRender")
    );

  }


  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let customerNameValid = this.state.customerNameValid;
    let companyNameValid = this.state.companyNameValid;
    let addressValid = this.state.addressValid;
    let contactNoValid = this.state.contactNoValid;
    let emailValid = this.state.emailValid;

    switch (fieldName) {
      case 'customerName':
        customerNameValid = value.match(/^(\s?\.?[a-zA-Z]+)+$/);
        fieldValidationErrors.CustomerName = customerNameValid ? '' : ' is InCorrect';
        break;
      case 'companyName':
        companyNameValid = value.match(/^[a-zA-Z]([a-zA-Z0-9]|[- @\.#&!])*$/);
        fieldValidationErrors.CompanyName = companyNameValid ? '' : ' is InCorrect';
        break;
      case 'address':
        addressValid = value.length >= 5;
        fieldValidationErrors.Address = addressValid ? '' : ' is too short';
        break;

      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.Email = emailValid ? '' : ' is InCorrect';
        break;


      case 'contactNo':
        contactNoValid = value.match(/^(\d{10})$/);
        fieldValidationErrors.ContactNo = contactNoValid ? '' : ' is InCorrect';
        break;

      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
     
      companyNameValid: companyNameValid,
      addressValid: addressValid,
      
      emailValid: emailValid
    }, this.validateForm);
  }
  validateForm() {

    this.setState({
   



    });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }
  AddCustomerFunc() {
    var self = this;
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });


    //var landlineNoTest=landlineregExp.test(this.state.landlineNo);
    var landlinenoData;
    if (this.state.landlineNo == "") {
      landlinenoData = "yes";
    } else if (this.state.landlineNo != "") {
      var landlineregExp = /^(\d{12})$/;
      var landlineNoTest = landlineregExp.test(this.state.landlineNo);
      if (landlineNoTest == true) {
        landlinenoData = "yes";
      } else {
        landlinenoData = "no";
      }

    }
    if (landlinenoData == "yes") {
      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          customerName: Case.capital(this.state.customerName),
          companyName: Case.capital(this.state.companyName1),
          address: this.state.address,
          city: this.state.city,
          contactNo: this.state.contactNo,
          alternateContactNo: this.state.alternateContactNo,
          gstNo: this.state.gstNo,
          email: this.state.email,
          companyId: this.state.companyId,
          landlineNo: this.state.landlineNo,
          staffId:this.state.staffId,
          employeeName:this.state.employeeName,
          role:this.state.role,
          bookingId:this.state.bookingId,
          vehicleRegistrationNo:this.state.vehicleRegistrationNo,
          customerId:this.state.customerId,

        }),
        url: " http://15.206.129.105:8080/ThroughBooksCOAPI/master/CustomerDetailsUpdate",
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


            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Successfully Added ' + self.state.customerName + ' Details',               // Message dialog 
              showConfirmButton: false,
              timer: 2000
            })
            self.state.customerName = "";
            self.state.companyName = "";
            self.state.address = "";
            self.state.contactNo = "";
            self.state.alternateContactNo = "";
            self.state.gstNo = "";
            self.state.email = "";
            self.state.city = "";
            self.state.landlineNo = "";
            self.state.formValid = false;

            self.state.companyNameValid = false;
            self.state.addressValid = false;
       

            // $('[name=city]').val('');

            self.setState({
              customerName: '',
              companyName: '',
              address: '',
              contactNo: '',
              alternateContactNo: '',
              gstNo: '',
              email: '',
              city: '',
              landlineNo: '',
              formValid: false,
              customerNameValid: false,
              companyNameValid: false,
              addressValid: false,
              contactNoValid: false,


            });
            self.SelectCustomer();
            ReactDOM.render(
              <Router >
                <div>
                  <Route path="/" component={CustomerList} />
                </div>
              </Router>, document.getElementById('contentRender'));

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
        title: 'Incorrect LandLine No',
        showConfirmButton: false,
        timer: 2000
      })
    }

  }
  handleBookingIdDetails = (e) => {

    const name = e.name;
    const value = e.value;
    this.state.bookingId = value;

var self=this;
    this.setState({
        [name]: value,
        selectedBookingId: e,

    });

    for (var k = 0; k < bookingarray.length; k++) {
        var temp = JSON.parse(bookingarray[k]);
  
        if (temp.bookingId == this.state.bookingId) {
   
          self.state.vehicleRegistrationNo = temp.vehicleRegistrationNo;
          self.state.customerName = temp.customerName;
          self.state.contactNo = temp.contactNo;
          self.state.email = temp.email;
          self.state.issues =temp.issues;
          self.state.bookingId=temp.bookingId;
        }
    }
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
     
     
   
       
   
     }
     
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    _isDirty = true;
    this.state.backButtonVariable = false;

    if (value.length == 0) {
      _isDirty = false;
    }
    this.setState({
      backButtonVariable: this.state.backButtonVariable,
    })
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }



  handleUserInputLandLineNo = (e) => {

    const name = e.target.name;
    const value = e.target.value;
    _isDirty = true;
    this.state.backButtonVariable = false;
    this.setState({
      backButtonVariable: this.state.backButtonVariable,
    })

    this.setState({
      landlineNo: value
    });
  }


  cancelFunc() {
    this.state.customerName = "";
    this.state.companyName = "";
    this.state.address = "";
    this.state.contactNo = "";
    this.state.alternateContactNo = "";
    this.state.gstNo = "";
    this.state.email = "";
    this.state.city = "";
    this.state.landlineNo = "";


    this.setState({
      customerName: this.state.customerName,
      companyName: this.state.companyName,
      address: this.state.address,
      city: this.state.city,
      contactNo: this.state.contactNo,
      alternateContactNo: this.state.alternateContactNo,
      gstNo: this.state.gstNo,
      email: this.state.email,
      landlineNo: this.state.landlineNo,
      customerNameValid: false,
      companyNameValid: false,
      addressValid: false,
      contactNoValid: false,
      emailValid: false,
      landlineNoValid: false,
    })
    ReactDOM.render(<CustomerEntryForm />, document.getElementById("contentRender"));
  }

  // BackbtnFunc() {
  //     //   alert(this.state.backButtonVariable)
  //        if(this.state.backButtonVariable==true)
  //        {
  //          ReactDOM.render(
  //            <Router>
  //              <div>

  //                <Route path="/" component={DashboardOverall} />


  //              </div>
  //            </Router>,
  //            document.getElementById('contentRender'));
  //          registerServiceWorker();
  //        }
  //        else{
  //          confirmAlert({
  //            title: "Confirmation", // Title dialog
  //            message: "Unsaved changes are there. Do you really want to go back?", // Message dialog
  //            buttons: [
  //              {
  //                label: 'Confirm',
  //                onClick: () => this.ConfirmBack()
  //              },
  //              {
  //                label: 'Cancel',
  //                onClick: () => this.CancelBack()
  //              }
  //            ]
  //          });
  //        }

  //      }


  //  BackbtnFunc() {
  //     alert(this.state.backButtonVariable)
  //   var dirtyValue ="false";
  //   alert(String(_isDirty));
  //   alert(String(dirtyValue));
  //      if(String(_isDirty)== String(dirtyValue))
  //      {
  //        ReactDOM.render(
  //          <Router>
  //            <div>

  //              <Route path="/" component={DashboardOverall} />


  //            </div>
  //          </Router>,
  //          document.getElementById('contentRender'));
  //        registerServiceWorker();
  //      }
  //      else{
  //        confirmAlert({
  //          title: "Confirmation", // Title dialog
  //          message: "Unsaved changes are there. Do you really want to go back?", // Message dialog
  //          buttons: [
  //            {
  //              label: 'Confirm',
  //              onClick: () => this.ConfirmBack()
  //            },
  //            {
  //              label: 'Cancel',
  //              onClick: () => this.CancelBack()
  //            }
  //          ]
  //        });
  //      }

  //    }

  BackbtnFunc() {
    //   alert(this.state.backButtonVariable)
    var dirtyValue = "false";

    if ((this.state.customerName.length == 0)) {
      this.setState({
        customerNameValid: false,

      })

    }
    if ((this.state.companyName.length == 0)) {
      this.setState({
        companyNameValid: false,
      })

    }
    if ((this.state.address.length == 0)) {
      this.setState({
        addressValid: false,
      })

    }
    if ((this.state.contactNo.length == 0)) {
      this.setState({
        contactNoValid: false,
      })

    }



    if (this.state.customerName.length == 0 && this.state.companyName.length == 0 &&
      this.state.address.length == 0 && this.state.contactNo.length == 0 &&
      this.state.alternateContactNo.length == 0 && this.state.gstNo.length == 0 &&
      this.state.landlineNo.length == 0 && this.state.email.length == 0 &&
      this.state.city.length == 0) {
      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={CustomerList} />
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

          <Route path="/" component={CustomerList} />


        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }
  CancelBack() {
    // this.setState({
    //     customerName:this.state.customerName,
    //     companyName:this.state.companyName,
    //     address:this.state.address,
    //     city:this.state.city,
    //     contactNo:this.state.contactNo,
    //     alternateContactNo:this.state.alternateContactNo,
    //     gstNo:this.state.gstNo,
    //     email:this.state.email,
    //     landlineNo:this.state.landlineNo,
    //     customerNameValid: false,
    //     companyNameValid: false,
    //     addressValid: false,
    //     contactNoValid: false,
    //     emailValid: false,
    //     landlineNoValid:false,      

    // })

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
                <h4 style={{marginLeft:"150px"}}>Update Customer Details</h4>   </div>

            </div>



            <div className="panel panel-default" style={{ borderColor: "white", marginBottom: "1px" }}>
              <FormErrors formErrors={this.state.formErrors} />
            </div>

            <form class="form-horizontal form-bordered" name="submissions">
            
            <div className="form-group">
                                <label class="control-label selectpicker col-sm-2" for="customerName">Customer Name<span style={{ color: "red" }}>*</span></label>
                                <div class="col-sm-10">
                                    {/* <SelectSearch options={this.state.options} value={this.state.selectedBookingId}
                                        onChange={(e) => this.handleBookingIdDetails(e)} name="bookingId" placeholder="Select BookingId " /> */}

<SelectSearch options={this.state.options1} value={this.state.selectedCustomerName}
                  onChange={(e) => this.handleCustomerDetails(e)} name="customerName" placeholder="Select Customer " />

                                </div>
                            </div>
                        <div className="form-group">
                                <label class="control-label selectpicker col-sm-2" for="vehicleRegistrationNo">Vehicle<span style={{ color: "red" }}>*</span></label>
                          

<div class="col-sm-10">
                                    <input type="text" readOnly class="form-control" name="vehicleRegistrationNo" value={this.state.vehicleRegistrationNo} onChange={this.handleUserInput} id="vehicleRegistrationNo" placeholder="VehicleRegistrationNo" />
                                </div>
                            </div>
            
              <div className="form-group" >
                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="contactNo"> Contact No<span style={{ color: "red" }}>*</span></label>
                <div class="col-sm-10">
                  <input type="text" readOnly class="form-control" /*min="1" */ max="10" name="contactNo" value={this.state.contactNo} onChange={this.handleUserInput} id="contactNo" placeholder="Contact no" />
                </div>
              </div>

             
              <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>


<label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="email">Email ID</label>
<div class="col-sm-10">
  <input type="email" class="form-control" name="email" value={this.state.email} onChange={this.handleUserInput} id="email" placeholder="Email ID" />
</div>
</div>

              <div className={`form-group ${this.errorClass(this.state.formErrors.companyName)}`}>
                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="companyName1">Company Name</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" name="companyName1" value={this.state.companyName1} onChange={this.handleUserInput} id="companyName1" placeholder="Company Name" />
                </div>
              </div>

              <div className={`form-group ${this.errorClass(this.state.formErrors.address)}`}>
                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="address">Address</label>
                <div class="col-sm-10">
                  <textarea rows="2" cols="20" class="form-control" name="address" value={this.state.address} onChange={this.handleUserInput} id="address" placeholder="Address"> </textarea>
                </div>
              </div>
              <div class="form-group">
                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="city">State</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" name="city" value={this.state.city} onChange={this.handleUserInput} id="city" placeholder="State Name" />

                </div>
              </div>

              <div class="form-group">
                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="alternateContactNo"> Alternate No</label>
                <div class="col-sm-10">
                  <input type="text" min="1" class="form-control" name="alternateContactNo" value={this.state.alternateContactNo} onChange={this.handleUserInput} id="alternateContactNo" placeholder="Alternate Contact no" />
                </div>
              </div>
              <div className="form-group">
                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="gstNo"> GST No</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" name="gstNo" value={this.state.gstNo} onChange={this.handleUserInput} id="gstNo" placeholder="GST no" />
                </div>
              </div>

           

              <div class="form-group">

                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="landlineno">LandLine No</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" name="landlineNo" value={this.state.landlineNo} onChange={this.handleUserInputLandLineNo} id="landlineno" placeholder="LandLine No" />
                </div>
              </div>

              <div class="form-group">
                <div class="row" style={{ marginLeft: "2px", marginBottom: "10%" }}>
                  <div class="col-sm-offset-2 col-sm-10">
                    <button style={{ fontWeight: "bold" }} type="button"  onClick={() => this.AddCustomerFunc()} class="btn btn-default">Submit</button> <span></span>
                    <button style={{ fontWeight: "bold" }} type="button" onClick={() => this.cancelFunc()} class="btn btn-default">Clear</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="modal fade" id="myModal" data-backdrop="false"  >
          <div class="modal-dialog">

            <div class="modal-content">
              <div class="modal-header" style={{ paddingTop: "0px", paddingBottom: "0px" }}>
                <h5 class="modal-title" style={{ align: "center", display: "contents" }}>Please NOTE:</h5>
                <button type="button" class="close" style={{ color: "black" }}
                  data-dismiss="modal">&times;</button>


              </div>
              <div id="mymodal" class="modal-body" >
                <ol>
                  <li>
                    Ensure <b>Customer Name</b> contains only Alphabets
                    </li>
                  <li>
                    Ensure <b>ContactNo</b>,<b>AlternateNo</b> are only Numbers
                    </li>
                  <li>
                    Ensure <b>Email Id</b> is of correct Format
                    </li>

                </ol>
                <a
                  href="ExportCustomer.xlsx"
                  style={{ color: "red", textDecoration: "none", borderBottom: "1px solid blue" }}
                  // href="#myModal"
                  //  data-toggle="modal" data-target="#myModal" 
                  download={this.state.customerFileName}
                  onClick={() => this.CustomerExcelExportFunc()}
                //  style={{ backgroundColor: "#677785", color: "white" }}
                >  <span style={{ fontSize: "20px" }}
                  class="glyphicon glyphicon-download"

                >
                    <span style={{ paddingLeft: "10px", fontSize: "24px" }}>Export&ensp;<b>[</b>Download&ensp;Excel&ensp;File<b>]</b></span></span>
                </a>


              </div>
            </div>

          </div>

        </div>
      </div>

    );
  }
}

export default CustomerEntryForm;