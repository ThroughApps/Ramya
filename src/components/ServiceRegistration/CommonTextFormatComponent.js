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
import { titleCase } from "title-case";

let CapitalCaseFunc;

export  default CapitalCaseFunc=function(textValue){

    var lowerval=textValue.toLowerCase();
    var capitalCase=titleCase(lowerval);

    return capitalCase;

}