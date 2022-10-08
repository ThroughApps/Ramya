import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
    GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
import { FormErrors } from './FormErrors';
import $ from 'jquery';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import SalesReportDisplay from './SalesReportDisplay';
import SalesDailyReport from './SalesDailyReport';
import ReportMenuPage from './ReportMenuPage';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import CryptoJS from 'crypto-js';
import VendorList from './VendorList';
import VehicleRegistrationList from './VehicleRegistrationList';
import VehicleList from './VehicleList';

var id;
var discount = 0;
var pay = 0;
class VehicleListView extends Component {

    constructor(props) {
        super(props)
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state = {
            date: date,

            vehicleRegistrationNo: this.props.vehicleRegistrationNo,
            brand: this.props.brand,
            modelName: this.props.modelName,
            fuelType: this.props.fuelType,
       
            engineNumber: this.props.engineNumber,
            modelYear: this.props.modelYear,
            chasisNumber: this.props.chasisNumber,
            referenceNumber: this.props.referenceNumber,
            odometerReading:this.props.odometerReading,
            color: this.props.color,
            keyNumber: this.props.keyNumber,
            vehicleId:this.props.vehicleId,
            registeredDate: this.props.registeredDate,
            companyId: companyId,
        };
        this.setState({
            date: date,
        })


    }


    
    componentDidMount() {

    SetCurrentPage("VehicleListView");
      

    }




    handleUserInput = (e) => {

        const name = e.target.name;
        const value = e.target.value;
       
        this.setState({
            [name]: value

        },
        );

    }






    BackbtnFunc() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={VehicleList} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }




    render() {
        return (


            <div class="container" style={{ height: "20px" }}>
                <ul class="previous disabled" id="backbutton"
                    style={{
                        backgroundColor: "#05a4b5",color:"white",
                        float: "none",
                        display: "inline-block",
                        marginLeft: "5px",
                        borderRadius: "5px",
                        padding: "3px 7px 3px 7px",
                        marginTop:"13px"
                    }}>
                    <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></ul>
                <div class="card">
                    <div class="card-header">
                        <h4 style={{marginLeft:"150px"}}>Vehicle Detail</h4>   </div>
                    <div>
                        <div class="card-body">
                            <form class="form-horizontal form-bordered" >

                            <div class="form-group">
                                    <label class="control-label col-sm-2" for="vehicleRegistrationNo">Vehicle No</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                            onChange={this.handleUserInput}
                                            value={this.state.vehicleRegistrationNo}
                                            id="vehicleRegistrationNo"
                                            name="vehicleRegistrationNo" readOnly />
                                    </div>
                                </div>
                             
                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="vehicleMake">Vehicle Make</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.brand}
                                            id="brand"
                                            name="brand" readOnly/>
                                    </div></div>

                           


                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="vehicleModel">Vehicle Model</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.modelName}
                                            id="modelName"
                                            name="modelName" readOnly />
                                    </div></div>

                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="vehicleFuelType">Fuel Type</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.fuelType}
                                            id="fuelType"
                                            name="fuelType" readOnly />
                                    </div></div>

                  
                                    <div className="form-group">
                                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="modelYear">Model Year</label>
                                <div class="col-sm-10">
                                    <input readOnly type="text" class="form-control" name="modelYear" value={this.state.modelYear} onChange={this.handleUserInput} id="modelYear" placeholder="Year" />
                                </div>
                            </div>
                          
                            <div className="form-group ">
                                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="chasisNumber">ChasisNumber</label>
                                <div class="col-sm-10">
                                    <input readOnly type="text" class="form-control" name="chasisNumber" value={this.state.chasisNumber} onChange={this.handleUserInput} id="chasisNumber" placeholder="ChasisNumber" />


                                </div>
                            </div>
                            <div class="form-group">
                                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="referenceNumber">ReferenceNumber</label>
                                <div class="col-sm-10">
                                    <input readOnly type="text" class="form-control" name="referenceNumber" value={this.state.referenceNumber} onChange={this.handleUserInput} id="referenceNumber" placeholder="Reference Number" />

                                </div>
                            </div>

                        
                            <div className="form-group">
                                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="engineNumber"> Engine Number</label>
                                <div class="col-sm-10">
                                    <input readOnly type="text" class="form-control" name="engineNumber" value={this.state.engineNumber} onChange={this.handleUserInput} id="engineNumber" placeholder="EngineNumber" />
                                </div>
                            </div>


                            <div class="form-group">

                                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="registeredDate">RegisteredDate</label>
                                <div class="col-sm-10">
                                    <input readOnly type="text" class="form-control" name="registeredDate" value={this.state.registeredDate} onChange={this.handleUserInput} id="registeredDate" placeholder="RegisteredDate" />
                                </div>
                            </div>

                            <div class="form-group">

                                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="odometerReading">Odometer Reading</label>
                                <div class="col-sm-10">
                                    <input readOnly type="text" class="form-control" name="odometerReading" value={this.state.odometerReading} onChange={this.handleUserInput} id="odometerReading" placeholder="OdometerReading" />
                                </div>
                            </div>
                            <div class="form-group">

                                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="color">Color</label>
                                <div class="col-sm-10">
                                    <input readOnly type="text" class="form-control" name="color" value={this.state.color} onChange={this.handleUserInput} id="color" placeholder="Color" />
                                </div>
                            </div>
                            <div class="form-group">

                                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="keyNumber">KeyNumber</label>
                                <div class="col-sm-10">
                                    <input readOnly type="text" class="form-control" name="keyNumber" value={this.state.keyNumber} onChange={this.handleUserInput} id="keyNumber" placeholder="KeyNumber" />
                                </div>
                            </div>
                          
   
   


                            </form>
                        </div>

                    </div>


                </div></div>
        );
    }
}

export default VehicleListView;