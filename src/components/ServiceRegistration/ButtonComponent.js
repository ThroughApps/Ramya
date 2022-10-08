import datepicker from 'jquery-ui/ui/widgets/datepicker';
import '../datepicker.css';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {BrowserRouter as Router,Route,NavLink} from 'react-router-dom';
import registerServiceWorker from '../registerServiceWorker';
import CryptoJS from 'crypto-js';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import * as IoIcons from 'react-icons/io5';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from '../ConstSiteFunction';



const buttonStyles={
    borderRadius:'25px',
    backgroundColor:'#05a4b5',  
    color:'#FFFFFF',  
    textAlign :'center',
    fontFamily:'Roboto,sans-serif',
    padding: '5px 10px 10px 10px', 
    fontWeight:'bold',
    width:'140px',
    height:'30px', 
    marginRight: '10px',
}  

const backBtnStyle={
  fontSize: '35px',
  cursor: 'pointer',
  display: 'inline-block',
}


let SubmitButtonComponent
export  default  SubmitButtonComponent = ({ onClick }) => (
    <button style={buttonStyles} onClick={onClick} className="btn btn-default submitLeave_Form">Submit</button>
  );

  export const  SubmitProceedButtonComponent = ({ onClick }) => (
    <button style={buttonStyles} onClick={onClick} className="btn btn-default submitLeave_Form">Next</button>
  );

  export const ClearButtonComponent = ({ onClick }) => (
    <button style={buttonStyles} onClick={onClick} className="btn btn-default submitLeave_Form">Clear</button>
  );

  export const CancelButtonComponent = ({ onClick }) => (
    <button style={buttonStyles} onClick={onClick} className="btn btn-default submitLeave_Form">Cancel</button>
  );

  export const AddButtonComponent = ({ onClick }) => (
    <button style={buttonStyles} onClick={onClick} className="btn btn-default submitLeave_Form">Add</button>
  );

  export const UpdateButtonComponent = ({ onClick }) => (
    <button style={buttonStyles} onClick={onClick} className="btn btn-default submitLeave_Form">Update</button>
  );

  export const EditButtonComponent = ({ onClick }) => (
    <button style={buttonStyles} onClick={onClick} className="btn btn-default submitLeave_Form">Edit</button>
  );

  export const SaveButtonComponent = ({ onClick }) => (
    <button style={buttonStyles} onClick={onClick} className="btn btn-default submitLeave_Form">Save</button>
  );

  export const BackButtonComponent=(props)=> {
    console.log("pop ",props)
    return (
      <div style={backBtnStyle} className="cmn_backbtn">
        <IoIcons.IoCaretBackCircle onClick={props.click} />
      </div>
    );
  };


  

  export const Double_BackButtonComponent=(props)=> {
    console.log("pop ",props)
    return (
      <div style={backBtnStyle} className="cmn_backbtn">
        <IoIcons.IoPlayBackCircle onClick={props.click} />
      </div>
    );
  };