import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../registerServiceWorker';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import $ from 'jquery';
import Case from "case";
//import datepicker from 'jquery-ui/ui/widgets/datepicker';
import DashboardOverall from '../MaincontentDashboard/DashboardOverall';
//css

import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
//import './datepicker.css';
import CryptoJS from 'crypto-js';
import InvoiceList from '../InvoiceList';
import SelectSearch from 'react-select';
import { thisExpression } from '@babel/types';
import _ from 'underscore';
//import toast from 'siiimple-toast';
//import 'siiimple-toast/dist/style.css';// style required
import Notifications, { notify } from 'react-notify-toast';
import { ToastsContainer, ToastsStore } from 'react-toasts';

import toaster from "toasted-notes";
import "toasted-notes/src/styles.css"; // optional styles
import Select from 'react-select';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import moment from 'moment';


import Checkbox from '@material-ui/core/Checkbox';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
  GetCurrencies,SetCurrentPage  } from '../ConstSiteFunction';
import { SaleInvoicePDF,DeleteSaleInvoicePDF } from '../Invoices/GeneratePDF/GeneratePDF';
import {BackButtonComponent,Double_BackButtonComponent} from'../ServiceRegistration/ButtonComponent';

import convert_to_words from '@amirsanni/number-to-words';

import currencyFormatter from "currency-formatter";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {CheckNumberFormat,CheckNumberFormat_WithoutDecimal} from './InvoiceValidations';
import { InvoiceCartIcons } from '../ServiceRegistration/IconComponents';
import Modal from 'react-modal';
import { InvoiceProductQtyAddModal, InvoiceProductQtyMinusModal } from '../CommonModalPages';
import translate from "translate"; 

//import translate from 'translate-google';

//import translate from 'google-translate-open-api';

//import translate from 'google-translate-free';

//import {Translator, Translate} from 'react-auto-translate';

const cloudinary = require('cloudinary-core').Cloudinary.new()

const dataToBeTranslated={
    nameLabel:'Name',
    ageLabel:'Age'

}


//const translate = require('extended-google-translate-api');

/*
translate("parlous", "en", "de").then((res) => {
    console.log("RES :",JSON.stringify(res, undefined, 2));
}).catch(console.log);
*/



/*const res =  fetch("https://libretranslate.com/translate", {
	method: "POST",
	body: JSON.stringify({
		q: "Hi",
		source: "en",
		target: "es"
	}),
	headers: { "Content-Type": "application/json" }
});

console.log("RESPONSE :", res);
*/

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://google-translate1.p.rapidapi.com/language/translate/v2",
	"method": "POST",
	"headers": {
		"content-type": "application/x-www-form-urlencoded",
		"accept-encoding": "application/gzip",
		"x-rapidapi-key": "8557875d70msh34a5972581f5e16p16b739jsnf611cac9bf7c",
		"x-rapidapi-host": "google-translate1.p.rapidapi.com"
	},
	"data": {
		"q": "Hello, world!",
		"target": "es",
		"source": "en"
	}
};



class LanguagePage extends Component {


constructor(data) {
super(data)



this.state = {
   /* dataToBeTranslated:{
        nameLabel:'Name',
        ageLabel:'Age'
    
    },
    */
}


}


componentDidMount() {


    /*
    translate('Ik spreek Engels', {to: 'en' }).then(res => {
        console.log(res.text);
        //=> I speak English
        console.log(res.from.language.iso);
        //=> nl
    }).catch(err => {
        console.error(err);
    });
    */

  /*
    translate(dataToBeTranslated, {to: 'zh-cn'}).then(res => {
    console.log(res)
}).catch(err => {
    console.error(err)
})
*/



$.ajax(settings).done(function (response) {
	console.log(response);
});


}


handleUserInput = (e) => {
    const name = e.target.name;
    const value =e.target.value;
    
 
    
    this.setState({
    [name]: value
    });
    }

    
handleUserInput1 = (e) => {
    const name = e.target.name;
    const value =e.target.value;
    
  // this.state.name_English=translate("Name", "en");

   console.log("this.state.name_English :",this.state.name_English);

    this.setState({
    [name]: value
    });
    }

render() {
return (


<div class="container">

{/*
<Translator
 //cacheProvider={cacheProvider}
 from='en'
 to='es'
 googleApiKey='API_KEY'
>
<h3>welcome bro !!</h3>

</Translator>
*/}
     
<label>Name</label>
<input type="text" style={{ display: "none" }}  class="form-control" name="customerName" 
value={this.state.name} onChange={this.handleUserInput} placeholder="customerName" />


<label>{this.state.nameLabel}</label>
<input type="text" style={{ display: "none" }}  class="form-control"
 name="customerName1" value={this.state.customerName1} onChange={this.handleUserInput1} 
 placeholder={this.state.placeholdeName} />

</div>
);
}
}

export default LanguagePage;



 



      