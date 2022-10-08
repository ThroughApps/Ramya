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
import InvoiceListMenuPage from './InvoiceListMenuPage';



class InvoiceMenuPage extends Component {


constructor(data) {
super(data)

window.invoiceMenuPageComponents=this;

this.state = {
    invoiceTypeSelected:'SaleInvoice',
    invoiceName:'Sale Invoice',
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
        this.state.invoiceName='Sale Invoice';

    }else  if(this.props.data=="EstimateInvoice"){
        $("#saleinvoiceRadio").prop("checked", false);
        $("#estimateinvoiceRadio").prop("checked", true);

        this.state.invoiceTypeSelected='EstimateInvoice';
        this.state.invoiceName='Estimate Invoice';
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

    if(value=="SaleInvoice" &&  this.state.proceedBack==true){

        this.state.invoiceTypeSelected="SaleInvoice";
        this.state.invoiceName="Sale Invoice";

    }else  if(value=="EstimateInvoice" &&  this.state.proceedBack==true){

        this.state.invoiceTypeSelected="EstimateInvoice";
        this.state.invoiceName="Estimate Invoice";

    }else if(value=="SaleInvoice" &&  this.state.proceedBack==false){

      //  alert("SaleInvoice");

        $("#saleinvoiceRadio").prop("checked", false);
        $("#estimateinvoiceRadio").prop("checked", true);


        Swal.fire({
            position: 'center',
            icon: 'warning',
         //   title: 'Product is not sufficient',
            text:'Estimate Invoice is in progress, changing the invoice type might delete the invoice data',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes, change invoice type!',
            cancelButtonText: 'No, keep it'
            //   timer: 1500
          }).then((result) => {
            if (result.value) {
                this.state.invoiceTypeSelected="SaleInvoice";
                this.state.invoiceName="Sale Invoice";

                $("#saleinvoiceRadio").prop("checked", true);
                $("#estimateinvoiceRadio").prop("checked", false);
                    
                this.setState({
                  invoiceTypeSelected: this.state.invoiceTypeSelected,
                  invoiceName:this.state.invoiceName,
              })

              // For more information about handling dismissals please visit
              // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Cancelled changing invoice type',
                showConfirmButton: false,
                timer: 2000,
              })
            }
          })

    }else if(value=="EstimateInvoice" &&  this.state.proceedBack==false){

        $("#saleinvoiceRadio").prop("checked", true);
        $("#estimateinvoiceRadio").prop("checked", false);

        Swal.fire({
            position: 'center',
            icon: 'warning',
         //   title: 'Product is not sufficient',
         text:'Sale Invoice is in progress, changing the invoice type might delete the invoice data',
         showConfirmButton: true,
         showCancelButton: true,
         confirmButtonText: 'Yes, change invoice type!',
         cancelButtonText: 'No, keep it'
            //   timer: 1500
          }).then((result) => {
            if (result.value) {
                this.state.invoiceTypeSelected="EstimateInvoice";
                this.state.invoiceName="Estimate Invoice";
                    
                $("#saleinvoiceRadio").prop("checked", false);
                $("#estimateinvoiceRadio").prop("checked", true);

                this.setState({
                    invoiceTypeSelected: this.state.invoiceTypeSelected,
                    invoiceName:this.state.invoiceName,
                })

              // For more information about handling dismissals please visit
              // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Cancelled changing invoice type',
                showConfirmButton: false,
                timer: 2000,
              })
            }
          })
    }

    

  };



RenderComponenets(selectedInvoice) {

    switch(selectedInvoice) {
    case 'SaleInvoice':
        return <SaleInvoice />;
    case 'EstimateInvoice':
        return <EstimateInvoice />;
    }
}

InvoicePagesCartDataInfo(cartDataInfo){

    this.state.proceedBack=true;
    if(cartDataInfo.length>0){
        this.state.proceedBack=false;
    }

}


BackbtnFunc() {
    


    if(this.state.invoiceTypeSelected=="SaleInvoice" &&  this.state.proceedBack==true){

      ReactDOM.render(<InvoiceListMenuPage  data="SaleInvoice" />, document.getElementById("contentRender"));

    }else if(this.state.invoiceTypeSelected=="EstimateInvoice" &&  this.state.proceedBack==true){
      
      ReactDOM.render(<InvoiceListMenuPage  data="EstimateInvoice" />, document.getElementById("contentRender"));

    }else if(this.state.invoiceTypeSelected=="SaleInvoice" &&  this.state.proceedBack==false){

        Swal.fire({
            position: 'center',
            icon: 'warning',
         //   title: 'Product is not sufficient',
            text:'Sale Invoice is in progress, moving back might delete the invoice data',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes, move back!',
            cancelButtonText: 'No, keep it'
            //   timer: 1500
          }).then((result) => {
            if (result.value) {

              ReactDOM.render(<InvoiceListMenuPage  data="SaleInvoice" />, document.getElementById("contentRender"));

              // For more information about handling dismissals please visit
              // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Cancelled back operation',
                showConfirmButton: false,
                timer: 2000,
              })
            }
          })

       
            
    }else if(this.state.invoiceTypeSelected=="EstimateInvoice" &&  this.state.proceedBack==false){
       
        Swal.fire({
            position: 'center',
            icon: 'warning',
         //   title: 'Product is not sufficient',
            text:'Estimate Invoice is in progress, moving back might delete the invoice data',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes, move back!',
            cancelButtonText: 'No, keep it'
            //   timer: 1500
          }).then((result) => {
            if (result.value) {

              ReactDOM.render(<InvoiceListMenuPage  data="EstimateInvoice" />, document.getElementById("contentRender"));

              // For more information about handling dismissals please visit
              // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Cancelled back operation',
                showConfirmButton: false,
                timer: 2000,
              })
            }
          })
       
       
       
       
    }

}
    
    
render() {

return (

 

<div class="container">

<div className="">
    <div className="">
    <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
    </div>
    <div className="inv_HeaderCls">
      <h3>{this.state.invoiceName}</h3>
    </div>
    
    <div style={{display: "flex", marginLeft:'15px'}}>
   <label>Invoice Type: </label>
 <div onChange={this.handleChange}>
        <input style={{marginLeft: "11px"}} type="radio" id="saleinvoiceRadio" value="SaleInvoice" name="invoice" /> Sale Invoice
        <input style={{marginLeft: "11px"}} type="radio" id="estimateinvoiceRadio" value="EstimateInvoice" name="invoice" /> Estimate Invoice
      </div>
</div>
    

    {this.RenderComponenets(this.state.invoiceTypeSelected)}

</div>

</div>
);
}
}

export default InvoiceMenuPage;





      
    