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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Select from 'react-select';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import moment from 'moment';


import Checkbox from '@material-ui/core/Checkbox';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
  GetCurrencies,SetCurrentPage, OffsetValueCalcFunc  } from '../ConstSiteFunction';
import { SaleInvoicePDF,DeleteSaleInvoicePDF } from '../Invoices/GeneratePDF/GeneratePDF';
import {BackButtonComponent,Double_BackButtonComponent} from'../ServiceRegistration/ButtonComponent';

import convert_to_words from '@amirsanni/number-to-words';

import currencyFormatter from "currency-formatter";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {CheckNumberFormat,CheckNumberFormat_WithoutDecimal, Truncate_2DecimalPlaces} from './InvoiceValidations';
import { InvoiceCartIcons } from '../ServiceRegistration/IconComponents';
import Modal from 'react-modal';
import { InvoiceProductQtyAddModal, InvoiceProductQtyMinusModal } from '../CommonModalPages';
import number_to_words from '@amirsanni/number-to-words';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import InvoiceEnquiry,{AddEnquiryDataFunc} from './InvoiceEnquiry';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import AddProduct1 from '../AddProduct';
import CustomerComponent from '../ServiceRegistration/CustomerComponent';
import EstimateInvoice from './EstimateInvoice';
import SaleInvoice from './SaleInvoice';
import EstimateList1 from '../EstimateList';
import InvoiceList1 from '../InvoiceList';



class InvoiceListMenuPage extends Component {


constructor(data) {
super(data)

window.invoiceMenuPageComponents=this;

this.state = {
    invoiceTypeSelected:'SaleInvoice',
    invoiceName:'Sale Invoice List',
    proceedBack:true,
}
this.handleChange = this.handleChange.bind(this);
}


componentDidMount() {

  var self=this;
  $("#saleinvoiceRadio").prop("checked", true);


  if(this.props.data!=undefined){
        if(this.props.data=="SaleInvoice"){
            $("#saleinvoiceRadio").prop("checked", true);
            $("#estimateinvoiceRadio").prop("checked", false);

            this.state.invoiceTypeSelected='SaleInvoice';
            this.state.invoiceName='Sale Invoice List';

        }else  if(this.props.data=="EstimateInvoice"){
            $("#saleinvoiceRadio").prop("checked", false);
            $("#estimateinvoiceRadio").prop("checked", true);

            this.state.invoiceTypeSelected='EstimateInvoice';
            this.state.invoiceName='Estimate Invoice List';
        }

        this.setState({
            invoiceTypeSelected:this.state.invoiceTypeSelected,
            invoiceName:this.state.invoiceName,
        })
    }
}


handleChange = event => {

    const value=event.target.value;

    this.state.invoiceType=value;
    this.setState({ 
        invoiceType: this.state.invoiceType,
     });


console.log("handleChange :",value);

    if(value=="SaleInvoice"){

        this.state.invoiceTypeSelected="SaleInvoice";
        this.state.invoiceName="Sale Invoice List";

    }else  if(value=="EstimateInvoice"){

        this.state.invoiceTypeSelected="EstimateInvoice";
        this.state.invoiceName="Estimate Invoice List";

    }
    
  };



RenderComponenets(selectedInvoice) {

    switch(selectedInvoice) {
    case 'SaleInvoice':
        return <InvoiceList1 />;
    case 'EstimateInvoice':
        return <EstimateList1 />;
    }
}

InvoicePagesCartDataInfo(cartDataInfo){

    this.state.proceedBack=true;
    if(cartDataInfo.length>0){
        this.state.proceedBack=false;
    }

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

<div className="">
    <div className="">
    <BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
   </div>
    <div className="inv_HeaderCls">
      <h3>{this.state.invoiceName}</h3>
    </div>
    
   <div style={{display: "flex"}}>
   <label>Invoice List Type: </label>
 <div onChange={this.handleChange}>
        <input style={{marginLeft: "11px"}} type="radio" id="saleinvoiceRadio" value="SaleInvoice" name="invoice" /> Sale Invoice List
        <input style={{marginLeft: "11px"}} type="radio" id="estimateinvoiceRadio" value="EstimateInvoice" name="invoice" /> Estimate Invoice List
      </div>
</div>
    

    {this.RenderComponenets(this.state.invoiceTypeSelected)}

</div>

</div>
);
}
}

export default InvoiceListMenuPage;





      
    