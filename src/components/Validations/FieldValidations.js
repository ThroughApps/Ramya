import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import registerServiceWorker from '../registerServiceWorker';
import CryptoJS from 'crypto-js';


import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';

//css
import * as moment from "moment";
import _ from 'underscore';
import Select from 'react-select';
import ReactTable from "react-table";
import "react-table/react-table.css";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

let contactNoValidationFunc;

export  default contactNoValidationFunc=function(contactNo){

    var validationData=false;

    var phoneno = /^\d{10}$/;
    if ((contactNo.match(phoneno))) {
        validationData=true;
    }

    return validationData;

}

export const fieldLength_Validation=function(text,textLength){

    var validationData=false;

    if(text.length <= textLength){
        validationData=true;
    }

    return validationData;

}