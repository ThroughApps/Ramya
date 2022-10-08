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


var id;
var discount = 0;
var pay = 0;
class VehicleRegistrationListView extends Component {

    constructor(props) {
        super(props)
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state = {
            date: date,

            bookingId: this.props.bookingId,
            vehicleRegistrationNo: this.props.vehicleRegistrationNo,
            customerName: this.props.customerName,
            contactNo: this.props.contactNo,
            email: this.props.emailId,
            issues: this.props.services,
            vehicleRegistrationId: this.props.vehicleRegistrationId,
            vehicleMake:this.props.vehicleMake,
            vehicleModel:this.props.vehicleModel,
            vehicleFuelType:this.props.vehicleFuelType,  

            companyId: companyId,
        };
        this.setState({
            date: date,
        })


    }


    
    componentDidMount() {

    SetCurrentPage("VehicleRegistrationListView");
      

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

                    <Route path="/" component={VehicleRegistrationList} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }




    render() {
        return (


            <div class="container" style={{ height: "20px" }}>
              
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
                        marginTop:"13px",
                        display:"inline-block"
                    }}>
                    <a  href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></ul>

                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8">
                        <div class="card-header">
                        <h3 style={{marginLeft:"150px"}}>Job Card Detail</h3>   </div>
                  
                    </div>

                    
            </div>
                    <div>
                        <div class="card-body">
                            <form class="form-horizontal form-bordered" >
                            <div class="form-group">
                                    <label class="control-label col-sm-2" for="bookingId">Booking Id</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                            onChange={this.handleUserInput}
                                            value={this.state.bookingId}
                                            id="bookingId"
                                            name="bookingId" readOnly />


                                    </div></div>
                            <div class="form-group">
                                    <label class="control-label col-sm-2" for="customerName">Customer Name</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                            onChange={this.handleUserInput}
                                            value={this.state.customerName}
                                            id="customerName"
                                            name="customerName" readOnly />


                                    </div></div>
                              

                                    <div className="form-group">
                                    <label class="control-label col-sm-2" for="contactNo">Contact No</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.contactNo}
                                            id="contactNo"
                                            name="contactNo" readOnly /></div>
                                </div>
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
                                            value={this.state.vehicleMake}
                                            id="vehicleMake"
                                            name="vehicleMake" readOnly/>
                                    </div></div>

                           


                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="vehicleModel">Vehicle Model</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.vehicleModel}
                                            id="vehicleModel"
                                            name="vehicleModel" readOnly />
                                    </div></div>

                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="vehicleFuelType">Fuel Type</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.vehicleFuelType}
                                            id="vehicleFuelType"
                                            name="vehicleFuelType" readOnly />
                                    </div></div>

                                    <div className="form-group">
                                    <label class="control-label col-sm-2" for="email">Email</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.email}
                                            id="email"
                                            name="email" readOnly />
                                    </div></div>

                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="issues">Services</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.issues}
                                            id="issues"
                                            name="issues" readOnly />
                                    </div></div>


                            </form>
                        </div>

                    </div>


                </div></div>
        );
    }
}

export default VehicleRegistrationListView;