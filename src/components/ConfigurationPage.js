import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';


import AddCategory from './AddCategory';
import AddUser from './AddUser';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import './datepicker.css';

import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import { FormErrors } from './FormErrors';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './DownloadButton.css';
import SelectSearch from 'react-select';
import "./MainPageRedirectButton.css";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import PaymentReceivablesComponent from './CustomerPayment/PaymentReceivablesComponent';
import {
    ClearButtonComponent, CancelButtonComponent,
    AddButtonComponent, UpdateButtonComponent,
    SubmitProceedButtonComponent, EditButtonComponent, SaveButtonComponent
} from './ServiceRegistration/ButtonComponent';
import CreatableSelect from 'react-select/creatable';
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import NotificationComponent from './Notifications/NotificationComponent';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
import FieldsConfiguration from './FieldsConfiguration/FieldsConfiguration';
//import Help from './Help';
var helpFuncValue = "expense";
var helpClassValue;
var userarray = [];
var key = "shinchanbaby";
var dataLimitArray = [];

class ConfigurationPage extends Component {
    constructor() {
        super()
        var today = new Date();

        var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        this.state = {
            isPaymentReceivablesPaneOpen: false,
            isNotificationPaneOpen:false,
            dataLimit: 50,
            dataLimitReadOnly: true,

        }

        this.EditDataLimitFunc = this.EditDataLimitFunc.bind(this);
        this.SaveDataLimitFunc = this.SaveDataLimitFunc.bind(this);
        this.CancelDataLimitFunc = this.CancelDataLimitFunc.bind(this);

    }

    componentDidMount() {
        SetCurrentPage("Configurationpage");
        $(".dataLimitSaveButton").hide();
        $(".dataLimitCancelButton").hide();

        var startData = 10;
        var endData = 100;

        while (startData <= endData) {

            dataLimitArray.push({ value: startData, label: startData });
            startData = Number(startData) + Number(5);
        }

        this.state.selectedDataLimit = { value: 50, label: 50 };

        this.setState({
            selectedDataLimit: this.state.selectedDataLimit,
        })


    }


    /* ******************* PAYMENT RECEIVABLES CONFIG DETAILS ************************** */
    PaymentRecivablesFunc() {
        this.state.isPaymentReceivablesPaneOpen = true;

        this.setState({
            isPaymentReceivablesPaneOpen: this.state.isPaymentReceivablesPaneOpen,
        })

    }

    ClosePaymentReceivables() {

        this.state.isPaymentReceivablesPaneOpen = false;

        this.setState({
            isPaymentReceivablesPaneOpen: this.state.isPaymentReceivablesPaneOpen,
        })


    }

/* ******************* PAYMENT RECEIVABLES CONFIG DETAILS OVER ************************** */


/* ****************** DATA LIMIT CONFIG DETAILS ************************* */

    EditDataLimitFunc() {
        $(".dataLimitEditButton").hide();
        $(".dataLimitSaveButton").show();
        $(".dataLimitCancelButton").show();

        this.state.oldDataLimit = this.state.dataLimit;
        this.state.dataLimitReadOnly = false;
        this.setState({
            dataLimitReadOnly: this.state.dataLimitReadOnly,
            oldDataLimit: this.state.oldDataLimit
        });
    }

    handleChangeDataLimitHandleUserInput = (newValue, actionMeta) => {


        this.state.selectedDataLimit = newValue;
        this.state.dataLimit = newValue.value;

        this.setState({
            selectedDataLimit: this.state.selectedDataLimit,
            dataLimit: this.state.dataLimit
        })

    }


    SaveDataLimitFunc() {

        $(".dataLimitSaveButton").hide();
        $(".dataLimitEditButton").show();
        $(".dataLimitCancelButton").hide();

        this.state.dataLimitReadOnly = true;

        this.setState({
            dataLimitReadOnly: this.state.dataLimitReadOnly,
        });


    }

    CancelDataLimitFunc() {
        $(".dataLimitSaveButton").hide();
        $(".dataLimitEditButton").show();
        $(".dataLimitCancelButton").hide();

        this.state.dataLimit = this.state.oldDataLimit
        this.state.dataLimitReadOnly = true;
        this.state.selectedDataLimit = { value: this.state.dataLimit, label: this.state.dataLimit };

        this.setState({
            selectedDataLimit: this.state.selectedDataLimit,
        })

        this.setState({
            dataLimitReadOnly: this.state.dataLimitReadOnly,
            dataLimit: this.state.dataLimit
        });


    }

    /* ****************** DATA LIMIT CONFIG DETAILS OVER************************* */
    BackbtnFunc() {
        ReactDOM.render(
          <Router>
            <div>
    
              <Route path="/" component={DashboardOverall} />
    
    
            </div>
          </Router>,
          document.getElementById('contentRender'));
        registerServiceWorker();
      }

/* ****************** NOTIFICATION CONFIG DETAILS ************************* */
    NotificationFunc(){
       
       /* this.state.isNotificationPaneOpen = true;

        this.setState({
            isNotificationPaneOpen: this.state.isNotificationPaneOpen,
        })
        */

       Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'In Progrss',
        showConfirmButton: false,
        timer: 2000
      })
    }

    CloseNotificationFunc() {

        this.state.isNotificationPaneOpen = false;

        this.setState({
            isNotificationPaneOpen: this.state.isNotificationPaneOpen,
        })


    }

/* ****************** NOTIFICATION CONFIG DETAILS OVER ************************* */

/* ****************** DYNAMIC FIELDS CONFIG DETAILS BEGINS ************************* */

DynamicFieldsFunc(){
   
    this.state.isDynamicFieldsPaneOpen = true;

        this.setState({
            isDynamicFieldsPaneOpen: this.state.isDynamicFieldsPaneOpen,
        })
   
    
    }

    CloseDynamicFieldsFunc() {

        this.state.isDynamicFieldsPaneOpen = false;

        this.setState({
            isDynamicFieldsPaneOpen: this.state.isDynamicFieldsPaneOpen,
        })


    }


/* ****************** DYNAMIC FIELDS CONFIG DETAILS OVER ************************* */
    render() {
        const downloadButtonData = <i style={{ color: "black" }} class="glyphicon glyphicon-download-alt" ></i>

        return (
            <div className="container" style={{ marginBottom: '0%', paddingTop: "0px" }}>
                <div className="">
                        <div className="">
              <BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
            </div>
            <div class="inv_HeaderCls">
                        <h3 className="text-center">Configuration</h3>
                          </div>
</div>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>

                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr className="SimpleShift">
                                    <td>Payment Receivables</td>
                                    <td> <button type="button" onClick={() => this.PaymentRecivablesFunc()} className="btn btn-default" style={{ color: " #fff", backgroundColor: "#c8e5ff" }}>Edit</button>
                                    </td>
                                </tr>

                                 <tr className="SimpleShift">
                                    <td>Notification</td>
                                    <td> <button type="button" onClick={() => this.NotificationFunc()} className="btn btn-default" style={{ color: " #fff", backgroundColor: "#c8e5ff" }}>Edit</button>
                                    </td>
                                </tr>

                                    <tr className="SimpleShift">
                                    <td>Dynamic Field </td>
                                    <td> <button type="button" onClick={() => this.DynamicFieldsFunc()} className="btn btn-default" style={{ color: " #fff", backgroundColor: "#c8e5ff" }}>Edit</button>
                                    </td>
                                </tr>

                              {/*  <tr className="SimpleShift">
                                    <td>No.of Data to be Displayed</td>

                                    <td>
                                        <CreatableSelect
                                            //   isClearable
                                            onChange={this.handleChangeDataLimitHandleUserInput}
                                            isDisabled={this.state.dataLimitReadOnly}
                                            //   onCreateOption={this.handleInputChangeVehicleMake}
                                            options={dataLimitArray}
                                            value={this.state.selectedDataLimit}
                                        />
                                        <div style={{ marginTop: "20px" }}>
                                        <div id="dataLimitEditButton" class="dataLimitEditButton">
                                            <EditButtonComponent id="dataLimitEditButton" class="dataLimitEditButton" onClick={this.EditDataLimitFunc} />
                                        </div>
                                        <div id="dataLimitSaveButton" class="dataLimitSaveButton">
                                            <SaveButtonComponent id="dataLimitSaveButton" class="dataLimitSaveButton" onClick={this.SaveDataLimitFunc} />
                                        </div>
                                        <div id="dataLimitCancelButton" class="dataLimitCancelButton">
                                            <CancelButtonComponent id="dataLimitCancelButton" class="dataLimitCancelButton" onClick={this.CancelDataLimitFunc} />
                                        </div>
                                        </div>
                                        <p>(Applicable for list & Reports)</p>
                                    </td>
                                </tr>   */}

                            </tbody>
                        </table>

                    </div>
            

                <SlidingPane
                    className="some-custom-class"
                    overlayClassName="some-custom-overlay-class"
                    isOpen={this.state.isPaymentReceivablesPaneOpen}
                    title={"Payment Receivables Config Info"}
                    subtitle="Can Add & Edit Payment Receivables Config Info Here"
                    onRequestClose={() => {
                        // triggered on "<" on left top click or on outside click
                        // setState({ isPaneOpen: false });
                        this.ClosePaymentReceivables()
                    }}
                >
                    {/* {this.RenderUpdateComponenets(this.state.taskSelected)} */}
                    <PaymentReceivablesComponent/>
                </SlidingPane>



             <SlidingPane
                    className="some-custom-class"
                    overlayClassName="some-custom-overlay-class"
                    isOpen={this.state.isNotificationPaneOpen}
                    title={"WhatsApp Config Info"}
                    subtitle="Can Add & Edit WhatsApp Config Info Here"
                    onRequestClose={() => {
                        // triggered on "<" on left top click or on outside click
                        // setState({ isPaneOpen: false });
                        this.CloseNotificationFunc()
                    }}
                >
                    {/* {this.RenderUpdateComponenets(this.state.taskSelected)} */}
                    <NotificationComponent stateData={this.state.stateData} SubmitClicked={this.SubmitVehicleInfoSlide} CancelClicked={this.CloseCancelVehicleSlide} />
                </SlidingPane>



             <SlidingPane
                    className="some-custom-class"
                    overlayClassName="some-custom-overlay-class"
                    isOpen={this.state.isDynamicFieldsPaneOpen}
                    title={"Dynamic Fields Config Info"}
                    subtitle="Can Add & Edit Fields Config Info Here"
                    onRequestClose={() => {
                        // triggered on "<" on left top click or on outside click
                        // setState({ isPaneOpen: false });
                        this.CloseDynamicFieldsFunc()
                    }}
                >
                    <FieldsConfiguration stateData={this.state.stateData} SubmitClicked={this.SubmitVehicleInfoSlide} CancelClicked={this.CloseCancelVehicleSlide} />
                </SlidingPane>

</div>



        );
    }

}
export default ConfigurationPage