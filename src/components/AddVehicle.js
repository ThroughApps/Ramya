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
import CustomerEntryForm from './CustomerEntryForm';
import VehicleList from './VehicleList';
import SelectSearch from 'react-select';

import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';

var bookingarray = [];
var vehicleRegistrationNoarray = [];
var vehiclearray = [];
var vehicleMakearray = [];
var vehicleModelarray = [];
var vehicleFuelTypearray = [];

/*
THIS PAGE IS USE AS AN VEHCILE EDIT OPERATION
*/
class AddVehicle extends Component {
    constructor(props) {
        super(props)
        var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state = {
          
            staffId: staffId,
            employeeName: employeeName,
            role: role,
          

            vehicleRegistrationNo: this.props.vehicleRegistrationNo,
            brand: this.props.brand,
            modelName: this.props.modelName,
            fuelType: this.props.fuelType,
            oldVehicleRegistrationNo:this.props.vehicleRegistrationNo,
            engineNumber: this.props.engineNumber,
            modelYear: this.props.modelYear,
            chasisNumber: this.props.chasisNumber,
            referenceNumber: this.props.referenceNumber,
            odometerReading:this.props.odometerReading,
            color: this.props.color,
            keyNumber: this.props.keyNumber,
         
            vehicleId:this.props.vehicleId,
            registeredDate:this.props.registeredDate,
            formErrors: {
               
                

            },
          
            

        }
    }

    componentDidMount() {
        SetCurrentPage("AddVehicle");
        window.scrollTo(0, 0);
        bookingarray.length=0;
        this.state.registeredDate = '';
    
 
        var self=this;
        $('#registeredDate').datepicker({

            onSelect: function (date) {

                var dt = new Date(date);
                self.state.registeredDate = date;

                self.setState({
                    registeredDate: self.state.registeredDate,
                });



            },

            dateFormat: 'yy-mm-dd',
            minDate: '-96M',
            maxDate: '0M',
            numberOfMonths: 1
        });
    }

 
   
  
      
    AddVehicleFunc() {
        var self = this;
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state.companyId = companyId;
        this.setState({
            companyId: companyId,
        });

    $.ajax({
        type: 'POST',
        data: JSON.stringify({
            vehicleRegistrationNo: this.state.vehicleRegistrationNo,
            modelYear: this.state.modelYear,
            brand: this.state.brand,
            chasisNumber: this.state.chasisNumber,
            referenceNumber: this.state.referenceNumber,
            fuelType: this.state.fuelType,
            engineNumber: this.state.engineNumber,
          
            registeredDate: this.state.registeredDate,
            odometerReading: this.state.odometerReading,
            color: this.state.color,
            keyNumber: this.state.keyNumber,
       
            modelName: this.state.modelName,
          
           // bookingId:this.state.bookingId,
            companyId: this.state.companyId,

            staffId: this.state.staffId,
            employeeName: this.state.employeeName,
            role: this.state.role,
            vehicleId:this.state.vehicleId,
            oldVehicleRegistrationNo:this.state.oldVehicleRegistrationNo,
            site:GetCurrentSite(),
        }),
   url: " http://15.206.129.105:8080/ThroughBooksCOAPI/master/addvehicle",
        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
          
            


                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Successfully Updated ' + self.state.vehicleRegistrationNo + ' Details',               // Message dialog 
                    showConfirmButton: false,
                    timer: 2000
                })

                self.state.vehicleRegistrationNo = "";
                self.state.modelYear = "";
                self.state.brand = "";
                self.state.chasisNumber = "";
                self.state.referenceNumber = "";
                self.state.fuelType = "";
                self.state.engineNumber = "";
       
                self.state.registeredDate = "";
                self.state.odometerReading = "";
                self.state.color = "";
                self.state.keyNumber = "";
              
                self.state.modelName = "";
               
              self.state.bookingId="";


                self.setState({
                    vehicleRegistrationNo: '',
                    bookingId:'',
                    modelYear: '',
                    brand: '',
                    chasisNumber: '',
                    referenceNumber: '',
                    fuelType: '',
                    engineNumber: '',
                   
                    registeredDate: '',
                    odometerReading: '',
                    color: '',
                    keyNumber: '',
                  
                    modelName: '',
               
                  



                });
                ReactDOM.render(
                    <Router >
                        <div>
                            <Route path="/" component={VehicleList} />
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

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: value });
    }

    // handleVehicleDetails = (e) => {
    //     const name = e.name;
    //     const value = e.value;
    //     this.state.vehicleRegistrationNo = value;

    //     this.setState({
    //         [name]: value,
    //         selectedVehicleRegistrationNo: e,

    //     });

    // }

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




    cancelFunc() {
        this.state.vehicleRegistrationNo = "";
        this.state.bookingId="";
        this.state.selectedBookingId="";
        this.state.modelYear = "";
        this.state.brand = "";
        this.state.chasisNumber = "";
        this.state.referenceNumber = "";
        this.state.fuelType = "";
        this.state.engineNumber = "";
     
        this.state.registeredDate = "";
        this.state.odometerReading = "";
        this.state.color = "";
        this.state.keyNumber = "";
    
        this.state.modelName = "";
     

      

        this.setState({
            vehicleRegistrationNo: this.state.vehicleRegistrationNo,
            bookingId:this.state.bookingId,
            selectedBookingId:this.state.bookingId,
            modelYear: this.state.modelYear,
            brand: this.state.brand,
            chasisNumber: this.state.chasisNumber,
            referenceNumber: this.state.referenceNumber,
            fuelType: this.state.fuelType,
            engineNumber: this.state.engineNumber,
           
            registeredDate: this.state.registeredDate,
            odometerReading: this.state.odometerReading,
            color: this.state.color,
            keyNumber: this.state.keyNumber,
       
            modelName: this.state.modelName,
           
           

        })
        ReactDOM.render(<AddVehicle />, document.getElementById("contentRender"));
    }


    BackbtnFunc() {
     



        if (this.state.vehicleRegistrationNo.length == 0 && this.state.modelYear.length == 0 &&
            this.state.brand.length == 0 && this.state.chasisNumber.length == 0 &&
            this.state.referenceNumber.length == 0 && this.state.fuelType.length == 0 &&
            this.state.engineNumber.length == 0 &&
            this.state.registeredDate.length == 0 && this.state.odometerReading.length == 0 &&
            this.state.color.length == 0 && this.state.keyNumber.length == 0 &&
          
            this.state.modelName.length == 0 ) {

            ReactDOM.render(
                <Router>
                    <div>
                        <Route path="/" component={VehicleList} />
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
                                <h3 style={{marginLeft:"150px"}}>Update Vehicle Details</h3>   </div>

                        </div>



                        <div className="panel panel-default" style={{ borderColor: "white", marginBottom: "1px" }}>
                            <FormErrors formErrors={this.state.formErrors} />
                        </div>

                        <form class="form-horizontal form-bordered" name="submissions">
                        <div class="form-group">
                                    <label class="control-label col-sm-2" for="vehicleRegistrationNo">Vehicle No</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                            onChange={this.handleUserInput}
                                            value={this.state.vehicleRegistrationNo}
                                            id="vehicleRegistrationNo"
                                            name="vehicleRegistrationNo"  />
                                    </div>
                                </div>
                        {/* <div className="form-group">
                                <label class="control-label selectpicker col-sm-2" for="vehicleRegistrationNo">Vehicle<span style={{ color: "red" }}>*</span></label>
                          

<div class="col-sm-10">
                                    <input type="text" readOnly class="form-control" name="vehicleRegistrationNo" value={this.state.vehicleRegistrationNo} onChange={this.handleUserInput} id="vehicleRegistrationNo" placeholder="VehicleRegistrationNo" />
                                </div>
                            </div> */}

<div className="form-group">
                                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="brand">Brand</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="brand" value={this.state.brand} onChange={this.handleUserInput} id="brand" placeholder="Brand" />
                                </div>
                            </div>
                            <div class="form-group">

<label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="modelName">Vehicle Model</label>
<div class="col-sm-10">
    <input type="text" class="form-control" name="modelName" value={this.state.modelName} onChange={this.handleUserInput} id="modelName" placeholder="ModelName" />
</div>
</div>
                         

                            <div class="form-group">
                                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="fuelType"> Fuel Type</label>
                                <div class="col-sm-10">
                                    <input type="text"  class="form-control" name="fuelType" value={this.state.fuelType} onChange={this.handleUserInput} id="fuelType" placeholder="FuelType" />
                                </div>
                            </div>
                          
                           

                            <div className="form-group">
                                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="modelYear">Model Year</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="modelYear" value={this.state.modelYear} onChange={this.handleUserInput} id="modelYear" placeholder="Year" />
                                </div>
                            </div>
                            <div className="form-group ">
                                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="chasisNumber">ChasisNumber</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="chasisNumber" value={this.state.chasisNumber} onChange={this.handleUserInput} id="chasisNumber" placeholder="ChasisNumber" />


                                </div>
                            </div>
                            <div class="form-group">
                                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="referenceNumber">ReferenceNumber</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="referenceNumber" value={this.state.referenceNumber} onChange={this.handleUserInput} id="referenceNumber" placeholder="Reference Number" />

                                </div>
                            </div>

                        
                            <div className="form-group">
                                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="engineNumber"> Engine Number</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="engineNumber" value={this.state.engineNumber} onChange={this.handleUserInput} id="engineNumber" placeholder="EngineNumber" />
                                </div>
                            </div>

                            <div class="form-group">

                                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="registeredDate">RegisteredDate</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="registeredDate" value={this.state.registeredDate} onChange={this.handleUserInput} id="registeredDate" placeholder="RegisteredDate" />
                                </div>
                            </div>

                            <div class="form-group">

                                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="odometerReading">Odometer Reading</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="odometerReading" value={this.state.odometerReading} onChange={this.handleUserInput} id="odometerReading" placeholder="OdometerReading" />
                                </div>
                            </div>
                            <div class="form-group">

                                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="color">Color</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="color" value={this.state.color} onChange={this.handleUserInput} id="color" placeholder="Color" />
                                </div>
                            </div>
                            <div class="form-group">

                                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="keyNumber">KeyNumber</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="keyNumber" value={this.state.keyNumber} onChange={this.handleUserInput} id="keyNumber" placeholder="KeyNumber" />
                                </div>
                            </div>
                         
     
                        


                            <div class="form-group">
                                <div class="row" style={{ marginLeft: "2px", marginBottom: "10%" }}>
                                    <div class="col-sm-offset-2 col-sm-10">
                                        <button style={{ fontWeight: "bold" }} type="button"  onClick={() => this.AddVehicleFunc()} class="btn btn-default">Submit</button> <span></span>
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

export default AddVehicle;