import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

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
import ProductList from './ProductList';
import {Double_BackButtonComponent} from'./ServiceRegistration/ButtonComponent';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
    GetCurrencies,SetCurrentPage } from './ConstSiteFunction';

var id;
var discount = 0;
var pay = 0;
class ProductListView extends Component {

    constructor(props) {
        super(props)
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state = {
            date: date,

            productName: this.props.productName,
            productType: this.props.productType,
            cgst: this.props.cgst,
            sgst: this.props.sgst,
            igst: this.props.igst,
            hsnCode: this.props.hsnCode,
            saleRate: this.props.saleRate,
            purchaseRate:this.props.purchaseRate,
            quantityLimit:this.props.quantityLimit,
            description:this.props.description,          
            productId:this.props.productId,
            quantity:this.props.quantity, 
            productCategory:this.props.productCategory,   
            companyId: companyId,
        };
        this.setState({
            date: date,
        })


    }



    componentDidMount() {
        SetCurrentPage("ProductListView");
 
       
        //$("#submit").hide();
        // this.GetOrderDetails();
        if (this.props.productCategory == "Own") {
           
        }
        if (this.props.productCategory == "Purchase") {
            
            $("#quantity1").hide();
        }

        if(this.props.productType=="service" || this.props.productType=="general" || this.props.productType=="labour")
        {
          $(".service").hide();
       //   $("#fieldName").prop("readonly", true);
        }
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

                    <Route path="/" component={ProductList} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }




    render() {
        return (


            <div class="container" style={{ height: "20px" }}>
                 <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
                 <div class="inv_HeaderCls">
                        <h3>Product Details</h3>   
                        </div>
                <div class="card" style={{marginBottom:"5%"}}>
                   
                    <div>
                        <div class="card-body">
                            <form class="form-horizontal form-bordered" >
                                <div class="form-group">
                                    <label class="control-label col-sm-2" for="customerName">Product Name</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                            onChange={this.handleUserInput}
                                            value={this.state.productName}
                                            id="productName"
                                            name="productName" readOnly />
                                    </div></div>

                                    <div class="form-group">
                                    <label class="control-label col-sm-2" for="productType">Product Type</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                            onChange={this.handleUserInput}
                                            value={this.state.productType}
                                            id="productType"
                                            name="productType" readOnly />
                                    </div></div>
                                    <div class="form-group">
                                    <label class="control-label col-sm-2" for="productCategory">Quantity Config</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                            onChange={this.handleUserInput}
                                            value={this.state.productCategory}
                                            id="productCategory"
                                            name="productCategory" readOnly />
                                    </div></div>

                                    <div className="form-group service" id="quantity1">
                                    <label class="control-label col-sm-2" for="quantity">Quantity</label>
                                    <div class="col-sm-10">

                                        <input type="number" readOnly min="0" class="form-control" value={this.state.quantity} onChange={this.handleUserInput} name="quantity" id="quantity" placeholder="Enter Quantity...  " />
                                    </div>
                                </div>

                                <div className="form-group service">
                                    <label class="control-label col-sm-2" for="quantityLimit">Quantity Limit</label>
                                    <div class="col-sm-10">

                                        <input type="number" min="0" readOnly class="form-control" value={this.state.quantityLimit} onChange={this.handleUserInput} name="quantityLimit" id="quantityLimit" placeholder="Quantity alert limit...  " />
                                    </div>
                                </div>



                                <div class="form-group">
                                    <label class="control-label col-sm-2" for="cgst">{this.props.tax1LabelName}</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                            onChange={this.handleUserInput}
                                            value={this.state.cgst}
                                            id="cgst"
                                            name="cgst" readOnly />
                                    </div>
                                </div>
                            
                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="sgst">{this.props.tax2LabelName}</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.sgst}
                                            id="sgst"
                                            name="sgst" readOnly  />
                                    </div></div>

                               {/* <div className="form-group">
                                    <label class="control-label col-sm-2" for="igst">Igst</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.igst}
                                            id="igst"
                                            name="igst" readOnly />
                                    </div></div>*/}


                            
                                    <div className="form-group">
                                    <label class="control-label col-sm-2" for="hsnCode">Hsn Code</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.hsnCode}
                                            id="hsnCode"
                                            name="hsnCode" readOnly />
                                    </div></div>

                                <div className="form-group">
                                    <label class="control-label col-sm-2" for="city">sale Rate</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.saleRate}
                                            id="saleRate"
                                            name="saleRate" readOnly />
                                    </div></div>


                                <div className="form-group service">
                                    <label class="control-label col-sm-2" for="purchaseRate">purchase Rate</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.purchaseRate}
                                            id="purchaseRate"
                                            name="purchaseRate" readOnly />
                                    </div></div>

                            
                             
                                    <div className="form-group">
                                    <label class="control-label col-sm-2" for="description">Description</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" type="text"
                                            onChange={this.handleUserInput}
                                            value={this.state.description}
                                            id="description"
                                            name="description" readOnly />
                                    </div></div>


                            </form>
                        </div>

                    </div>


                </div></div>
        );
    }
}

export default ProductListView;