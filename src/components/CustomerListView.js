import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';
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
import CustomerList from './CustomerList';
import FooterText from './FooterText';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';


var id;
var discount = 0;
var pay = 0;
class CustomerListView extends Component {

    constructor(props) {
        super(props)
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state = {
            date: date,
            customerName: this.props.customerName,
            companyName: this.props.companyName,
            address: this.props.address,
            contactNo: this.props.contactNo,
            city: this.props.city,
            alternateContactNo: this.props.alternateContactNo,
            gstNo: this.props.gstNo,
            email: this.props.email,
            customerId: this.props.customerId,
            landlineNo:this.props.landlineNo,
          
            companyId: companyId,
        };
        this.setState({
            date: date,
        })


    }



    componentDidMount() {
    SetCurrentPage("CustomerListView");


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

                    <Route path="/" component={CustomerList} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }




    render() {
        return (


            <div class="container" style={{ height: "20px" }}>
              
              <div className="">
            <div className="">
              <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
            </div>
            <div className="inv_HeaderCls">
              <h3>Customer Profile</h3>
                    </div>
                    </div>
                    <div>
                    <div class="card">
                        <div class="card-body">
                            <form class="form-horizontal form-bordered" >
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
                                    <label class="control-label col-sm-2" for="companyName">Company Name</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                            onChange={this.handleUserInput}
                                            value={this.state.companyName}
                                            id="companyName"
                                            name="companyName" readOnly />
                                    </div>
                                </div>
                            
                               {/* <div className="form-group">
                                    <label class="control-label col-sm-2" for="alternateContactNo">Alternate No</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.alternateContactNo}
                                            id="alternateContactNo"
                                            name="alternateContactNo" readOnly  />
                                    </div></div>  */}

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
                                    <label class="control-label col-sm-2" for="address">Address</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.address}
                                            id="address"
                                            name="address" readOnly />
                                    </div></div>

                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="city">State</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.city}
                                            id="city"
                                            name="city" readOnly />
                                    </div></div>

                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="gstNo">GST No</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.gstNo}
                                            id="gstNo"
                                            name="gstNo" readOnly />
                                    </div></div>

                                    <div className="form-group">
                                    <label class="control-label col-sm-2" for="gstNo">LandlineNo</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.landlineNo}
                                            id="landlineNo"
                                            name="landlineNo" readOnly />
                                    </div></div>


                            </form>
                        </div>

                    </div>


                </div></div>
        );
    }
}

export default CustomerListView;