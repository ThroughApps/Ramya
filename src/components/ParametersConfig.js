import React, { Component } from 'react';
import logo from './logo.svg';
import $ from 'jquery';
import * as XLSX from 'xlsx';
import { confirmAlert } from 'react-confirm-alert';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
    GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
    
import registerServiceWorker from './registerServiceWorker';
import MobileDetect from 'mobile-detect/mobile-detect';
import CryptoJS from 'crypto-js';

import _ from 'underscore';

import Switch from 'react-toggle-switch';
import '../../node_modules/react-toggle-switch/dist/css/switch.min.css';
const ct = require('countries-and-timezones');



var stylep_config ={
    display: "flex",
    justifyContent: "space-between",
    padding: "0px 5%",
}

class ParametersConfig extends Component {

    constructor() {
        super()
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

        this.state = {

            companyId: companyId,
            saleinvoiceordernotoggle: true,
            saleinvoiceduedatetoggle: true,
            saleinvoiceamounttobepaidtoggle: true,
            saleinvoiceamountinwordstoggle: true,

            saleinvoiceprinttermsconditiontoggle: true,

            purchaseinvoiceinvoicenotoggle: true,
            purchaseinvoiceordernotoggle: true,

        }

    }

    componentDidMount() {
        SetCurrentPage("ParametersConfig"); 
        this.GetParameterData();


    }

    GetParameterData() {

        var self = this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,
            }),
            url: "http://15.206.129.105:8080/ThroughBooksCOAPI/ParameterFieldsConfig/GetAllFieldsData",
          
            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {

                console.log("GET ALL DATA :", data);

                if (data.allfieldDataList.length == 0) {
                    self.state.saleinvoiceorderno = 0;
                    self.setState({
                        saleinvoiceorderno: self.state.saleinvoiceorderno,
                    })


                } else {

                    $.each(data.allfieldDataList, function (i, item) {

                        if (item.field == "saleinvoiceordernotoggle") {
                            if (item.toggleData == "0") {
                                self.state.saleinvoiceordernotoggle = 0;
                            } else {
                                self.state.saleinvoiceordernotoggle = 1;
                            }
                            self.setState({
                                saleinvoiceordernotoggle: self.state.saleinvoiceordernotoggle,
                            })
                        }



                        if (item.field == "saleinvoiceduedatetoggle") {
                            if (item.toggleData == "0") {
                                self.state.saleinvoiceduedatetoggle = 0;
                            } else {
                                self.state.saleinvoiceduedatetoggle = 1;
                            }
                            self.setState({
                                saleinvoiceduedatetoggle: self.state.saleinvoiceduedatetoggle,
                            })
                        }

                        if (item.field == "saleinvoiceamounttobepaidtoggle") {
                            if (item.toggleData == "0") {
                                self.state.saleinvoiceamounttobepaidtoggle = 0;
                            } else {
                                self.state.saleinvoiceamounttobepaidtoggle = 1;
                            }
                            self.setState({
                                saleinvoiceamounttobepaidtoggle: self.state.saleinvoiceamounttobepaidtoggle,
                            })
                        }

                        if (item.field == "saleinvoiceamountinwordstoggle") {
                            if (item.toggleData == "0") {
                                self.state.saleinvoiceamountinwordstoggle = 0;
                            } else {
                                self.state.saleinvoiceamountinwordstoggle = 1;
                            }
                            self.setState({
                                saleinvoiceamountinwordstoggle: self.state.saleinvoiceamountinwordstoggle,
                            })
                        }


                        if (item.field == "saleinvoiceprinttermsconditiontoggle") {
                            if (item.toggleData == "0") {
                                self.state.saleinvoiceprinttermsconditiontoggle = 0;
                            } else {
                                self.state.saleinvoiceprinttermsconditiontoggle = 1;
                            }
                            self.setState({
                                saleinvoiceprinttermsconditiontoggle: self.state.saleinvoiceprinttermsconditiontoggle,
                            })
                        }

                        if (item.field == "purchaseinvoiceinvoicenotoggle") {
                            if (item.toggleData == "0") {
                                self.state.purchaseinvoiceinvoicenotoggle = 0;
                            } else {
                                self.state.purchaseinvoiceinvoicenotoggle = 1;
                            }
                            self.setState({
                                purchaseinvoiceinvoicenotoggle: self.state.purchaseinvoiceinvoicenotoggle,
                            })
                        }


                        if (item.field == "purchaseinvoiceordernotoggle") {
                            if (item.toggleData == "0") {
                                self.state.purchaseinvoiceordernotoggle = 0;
                            } else {
                                self.state.purchaseinvoiceordernotoggle = 1;
                            }
                            self.setState({
                                purchaseinvoiceordernotoggle: self.state.purchaseinvoiceordernotoggle,
                            })
                        }




                    });




                }


            },
            error: function (data) {
                confirmAlert({
                    title: 'No Internet',                        // Title dialog
                    message: 'Network Connection Problem',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                });


            }

        });

    }






    SaleInvoiceOrderNoFunc() {

        if (this.state.saleinvoiceordernotoggle == 0) {
            this.state.saleinvoiceordernotoggle = 1;

            this.setState({
                saleinvoiceordernotoggle: 1,
            })

        } else {
            this.state.saleinvoiceordernotoggle = 0;

            this.setState({
                saleinvoiceordernotoggle: 0,
            })

        }

        this.state.module = "SaleInvoice";
        this.state.field = "saleinvoiceordernotoggle";
        this.state.status = this.state.saleinvoiceordernotoggle;
  
        this.ToggleAjaxCallFunc();
    }


    SaleInvoiceDueDateFunc() {


        if (this.state.saleinvoiceduedatetoggle == 0) {
            this.state.saleinvoiceduedatetoggle = 1;

            this.setState({
                saleinvoiceduedatetoggle: 1,
            })

        } else {
            this.state.saleinvoiceduedatetoggle = 0;

            this.setState({
                saleinvoiceduedatetoggle: 0,
            })

        }

        this.state.module = "SaleInvoice";
        this.state.field = "saleinvoiceduedatetoggle";
        this.state.status = this.state.saleinvoiceduedatetoggle;
      
        this.ToggleAjaxCallFunc();

    }


    SaleInvoiceAmountToBePaidFunc() {

    
        if (this.state.saleinvoiceamounttobepaidtoggle == 0) {
            this.state.saleinvoiceamounttobepaidtoggle = 1;

            this.setState({
                saleinvoiceamounttobepaidtoggle: 1,
            })

        } else {
            this.state.saleinvoiceamounttobepaidtoggle = 0;

            this.setState({
                saleinvoiceamounttobepaidtoggle: 0,
            })

        }

        this.state.module = "SaleInvoice";
        this.state.field = "saleinvoiceamounttobepaidtoggle";
        this.state.status = this.state.saleinvoiceamounttobepaidtoggle;
  
        this.ToggleAjaxCallFunc();

    }

    SaleInvoiceAmountInWordsFunc() {


        if (this.state.saleinvoiceamountinwordstoggle == 0) {
            this.state.saleinvoiceamountinwordstoggle = 1;

            this.setState({
                saleinvoiceamountinwordstoggle: 1,
            })

        } else {
            this.state.saleinvoiceamountinwordstoggle = 0;

            this.setState({
                saleinvoiceamountinwordstoggle: 0,
            })

        }

        this.state.module = "SaleInvoice";
        this.state.field = "saleinvoiceamountinwordstoggle";
        this.state.status = this.state.saleinvoiceamountinwordstoggle;

        this.ToggleAjaxCallFunc();

    }

    SaleInvoicePrintTerms_ConditionsFunc() {

        if (this.state.saleinvoiceprinttermsconditiontoggle == 0) {
            this.state.saleinvoiceprinttermsconditiontoggle = 1;

            this.setState({
                saleinvoiceprinttermsconditiontoggle: 1,
            })

        } else {
            this.state.saleinvoiceprinttermsconditiontoggle = 0;

            this.setState({
                saleinvoiceprinttermsconditiontoggle: 0,
            })

        }

        this.state.module = "SaleInvoicePrintFormat";
        this.state.field = "saleinvoiceprinttermsconditiontoggle";
        this.state.status = this.state.saleinvoiceprinttermsconditiontoggle;
    
        this.ToggleAjaxCallFunc();
    }


    PurchaseinvoiceOrderNoFunc() {

        if (this.state.purchaseinvoiceordernotoggle == 0) {
            this.state.purchaseinvoiceordernotoggle = 1;

            this.setState({
                purchaseinvoiceordernotoggle: 1,
            })

        } else {
            this.state.purchaseinvoiceordernotoggle = 0;

            this.setState({
                purchaseinvoiceordernotoggle: 0,
            })

        }

        this.state.module = "PurchaseInvoice";
        this.state.field = "purchaseinvoiceordernotoggle";
        this.state.status = this.state.purchaseinvoiceordernotoggle;
    
        this.ToggleAjaxCallFunc();

    }

    Purchaseinvoice_InvoiceNoFunc() {
        if (this.state.purchaseinvoiceinvoicenotoggle == 0) {
            this.state.purchaseinvoiceinvoicenotoggle = 1;

            this.setState({
                purchaseinvoiceinvoicenotoggle: 1,
            })

        } else {
            this.state.purchaseinvoiceinvoicenotoggle = 0;

            this.setState({
                purchaseinvoiceinvoicenotoggle: 0,
            })

        }

        this.state.module = "PurchaseInvoice";
        this.state.field = "purchaseinvoiceinvoicenotoggle";
        this.state.status = this.state.purchaseinvoiceinvoicenotoggle;
   
        this.ToggleAjaxCallFunc();
    }


    ToggleAjaxCallFunc() {


        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var switchdata = this.state.shiftSwitched;

        this.state.companyId = companyId;

        this.setState({
            companyId: this.state.companyId,
            module: this.state.module,
            field: this.state.field,
            toggleData: this.state.status,
            superiorId: this.state.superiorId,
        })
        var self = this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,
                module: this.state.module,
                field: this.state.field,
                toggleData: this.state.status,
                superiorId: this.state.superiorId,
            }),
            url: "http://15.206.129.105:8080/ThroughBooksCOAPI/ParameterFieldsConfig/EnableDisableParameter",
            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {



            },
            error: function (data) {
                confirmAlert({
                    title: 'No Internet',                        // Title dialog
                    message: 'Network Connection Problem',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                });


            }

        });



    }



    render() {




        return (

            <div className="container" style={{ marginBottom: '0%', paddingTop: "0px" }}>
         
                <div class="" style={{ marginTop: "0px" }}>
                    <h4 style={{ textAlign: "center" }}>Parameter Field Details</h4>


                    <fieldset style={{ padding: ".35em .625em .75em", margin: "0 2px", border: " 3px solid rgba(11,56,47,.44)" }}>
                        <legend style={{ width: "auto" }}>SaleInvoice </legend>

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="row_sub1"  style={stylep_config}>
                                    <div>
                                        <label>Display OrderNo</label>
                                    </div>
                                    <div>
                                        <Switch id="ssid" onClick={() => this.SaleInvoiceOrderNoFunc()} on={this.state.saleinvoiceordernotoggle} />
                                    </div>
                                </div>
                                <div className="row_sub1" style={stylep_config}>
                                    <div>
                                        <label>Display DueDate</label>
                                    </div>
                                    <div>
                                        <Switch id="ssid" onClick={() => this.SaleInvoiceDueDateFunc()} on={this.state.saleinvoiceduedatetoggle} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="row_sub1" style={stylep_config}>
                                    <div>
                                        <label>Automate Amount To Be Paid</label>
                                    </div>
                                    <div>
                                        <Switch id="ssid" onClick={() => this.SaleInvoiceAmountToBePaidFunc()} on={this.state.saleinvoiceamounttobepaidtoggle} />
                                    </div>
                                </div>
                                <div className="row_sub1" style={stylep_config}>
                                    <div>
                                        <label>Display Amount In Words</label>
                                    </div>
                                    <div>
                                        <Switch id="ssid" onClick={() => this.SaleInvoiceAmountInWordsFunc()} on={this.state.saleinvoiceamountinwordstoggle} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>


                    <fieldset style={{ padding: ".35em .625em .75em", margin: "0 2px", border: " 3px solid rgba(11,56,47,.44)" }}>
                        <legend style={{ width: "auto" }}>SaleInvoice PrintFormat </legend>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="row_sub1">
                                    <div>
                                        <label>Display Terms & Condition</label>
                                    </div>
                                    <div>
                                        <Switch id="ssid" onClick={() => this.SaleInvoicePrintTerms_ConditionsFunc()} on={this.state.saleinvoiceprinttermsconditiontoggle} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="row_sub1">
                                    {/* <div>
                                        <label>Automate Amount To Be Paid</label>
                                    </div>
                                    <div>
                                        <Switch id="ssid" onClick={() => this.SaleInvoiceAmountToBePaidFunc()} on={this.state.saleinvoiceordernotoggle} />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset style={{ padding: ".35em .625em .75em", margin: "0 2px", border: " 3px solid rgba(11,56,47,.44)" }}>
                        <legend style={{ width: "auto" }}>PurchaseInvoice </legend>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="row_sub1">
                                    <div>
                                        <label>Display OrderNo</label>
                                    </div>
                                    <div>
                                        <Switch id="ssid" onClick={() => this.PurchaseinvoiceOrderNoFunc()} on={this.state.purchaseinvoiceordernotoggle} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="row_sub1">
                                    <div>
                                        <label>Automated InvoiceNo</label>
                                    </div>
                                    <div>
                                        <Switch id="ssid" onClick={() => this.Purchaseinvoice_InvoiceNoFunc()} on={this.state.purchaseinvoiceinvoicenotoggle} />
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </fieldset>


                
                </div>




            </div >


        );
    }
}

export default ParametersConfig;