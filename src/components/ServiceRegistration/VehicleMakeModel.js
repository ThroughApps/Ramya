import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import registerServiceWorker from '../registerServiceWorker';
import $ from 'jquery';

import Case from 'case';
import CryptoJS from 'crypto-js';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';

import Select from 'react-select';
import SelectSearch from 'react-select';
import { Multiselect } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';
import GenericDashboardElite from '../Topnavbar/GenericDashboardElite';
import _ from 'underscore';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import VehicleMakeModelComponent from './VehicleMakeModelComponent';
import DashboardOverall from '../MaincontentDashboard/DashboardOverall';
import './ServiceRegistrationCSS.css';
import CustomerComponent from './CustomerComponent';
import VehicleComponent from './VehicleComponent';
import{vehicleDefaultData} from './VehicleComponent';
import { GetEmployeeSite,GetCurrentSite  } from '../ConstSiteFunction';

import * as TiIcons from 'react-icons/ti';
import * as GrIcons from 'react-icons/gr';
import * as FaIcons from 'react-icons/fa';
import CapitalCaseFunc from './CommonTextFormatComponent';

import CreatableSelect from 'react-select/creatable';
import contactNoValidationFunc from './ValidationComponent';



var customerArray=[];
var vehicleArray=[];
var vehicleMakeModelArray=[];
var productArray=[];
var customerList=[];


class VehicleMakeModel extends Component {
  constructor() {
    super()
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
 
    this.state = {
        companyId : companyId,
        staffId: staffId,
        employeeName: employeeName,
        role: role,
        customerList:[],
        vehicleList:[],
        vehcileMakeList:[],
        vehicleModelList:[],
        vehcileFuelTypeList:[],
        productServiceList:[],

        selectedCustomer:[],
        selectedVehicleRegNo:[],
        selectedVehicleMake:[],
        selectedVehicleModel:[],
        selectedVehicleFuelType:[],
        selectedServiceList:[],

       
        customerNamereadonly:true,
        emailIdreadonly:true,

        
        customerName:'',
        vehicleRegNo:'',
        vehicleMake:'',
        vehicleModel:'',
        vehicleFuelType:'',
        emailId:'',

        customerCreateStatus:'No',
        vehicleCreateStatus:'No',
        vehicleMakeCreateStatus:'No',
        vehicleModelCreateStatus:'No',
        vehicleFuelTypeCreateStatus:'No',
        serviceCreateStatus:'No',
        isPaneOpen:false,
        isVehiclePaneOpen:false,
        stateData:'',
   

    }

  }

  componentDidMount() {
    window.scrollTo(0, 0);

    $("#emailerrormsg").empty();
    $("#contactnoerror").hide();

 
  }

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
                <h3 >Vehicle Make Model</h3>   </div>

            </div>

      <VehicleMakeModelComponent />

       </div>

      </div>
      </div>

    );
  }
}

export default VehicleMakeModel;