import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import $ from 'jquery';
import registerServiceWorker from '../registerServiceWorker';
import Case from "case";
import CryptoJS from 'crypto-js';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "../ReactTableCSS.css";
import { FormErrors } from '../FormErrors';
import SelectSearch from 'react-select';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import _ from 'underscore';
import {BackButtonComponent} from '../ServiceRegistration/ButtonComponent';
import { GetCurrentSite } from '../ConstSiteFunction';
import DashboardOverall from '../MaincontentDashboard/DashboardOverall';

var balance;
var total;
var numberToWord = require('npm-number-to-word');
var allcustomerList = [];

class CustomerwisePayment extends Component {

constructor(props) {
super(props)
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
//this.state.companyId = companyId;
var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
this.state = {
orderno: "ORDERID_98785",
token: "",
date: date,
pay: '0',
dueAmount: 0,
userName: '',
invoiceNo: '',
customerId: '',
companyId: companyId,
payment_status: '',
staffId: staffId,
employeeName: employeeName,
role: role, staffId: staffId,
employeeName: employeeName,
role: role,
paymentMode: '',
invoiceType: "SaleInvoice",
data: [],
columns: [],
customeroptions: [],
paymentoptions: [],
formErrors: {
discount: '',
pay: '',
},
discountValid: false,
payValid: false,
paymentModeValid: false,

};
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

componentDidMount() {
window.scrollTo(0, 0);
this.GetData();
var paymentOptions = [];

paymentOptions.push({ label: "Cash", value: "Cash" });
paymentOptions.push({ label: "Cheque", value: "Cheque" });
paymentOptions.push({ label: "Card", value: "Card" });
paymentOptions.push({ label: "Online", value: "Online" });
this.state.paymentoptions = paymentOptions;
this.setState({
paymentoptions: this.state.paymentoptions
})

this.state.selectedPaymentMode = { label: "Cash", value: "Cash" };
this.state.paymentMode = "Cash";
}
errorClass(error) {
return (error.length === 0 ? '' : 'has-error');
}

handleCustomer = (e) => {
this.state.customerId = e.value;
this.state.userName = e.userName;
this.state.selectedCustomer = e;
this.setState({
customerId: this.state.customerId,
selectedCustomer: e,
userName: this.state.userName
}, () => this.GetCustomerData());

}
handlePaymentModeDetails = (e) => {
const name = e.name;
const value = e.value;
this.state.paymentMode = value;

this.setState({
[name]: value,
selectedPaymentMode: e,
paymentModeValid: true
});

}


handleUserInput = (e) => {
const name = e.target.name;
const value = e.target.value;
this.state[name] = value;
this.setState({ [name]: value },
() => { this.validateField(name, value) });
this.state.balanceAmt = this.state.dueAmount;
if (Number(this.state.pay) > Number(this.state.dueAmount)) {
this.state.pay = 0;
Swal.fire({
position: 'center',
icon: 'warning',
title: Case.capital(name) + ' Amount exceeds the due amount !',
showConfirmButton: false,
timer: 2000
})

} else if (Number(this.state.pay) < 0) {
this.state.pay = 0;
Swal.fire({
position: 'center',
icon: 'warning',
title: Case.capital(name) + ' Amount cannot be zero or less than zero !!',
showConfirmButton: false,
timer: 2000
})
} else {

var total = Number(this.state.dueAmount) - Number(this.state.pay);
this.state.balanceAmt = total;
}
this.setState({
balanceAmt: this.state.balanceAmt,
pay: this.state.pay,
});

}
validateField(fieldName, value) {
let fieldValidationErrors = this.state.formErrors;
let discountValid = this.state.discountValid;
let payValid = this.state.payValid;
let paymentModeValid = this.state.paymentModeValid;

switch (fieldName) {
case 'pay':
payValid = value.match(/^(\d*\.)?\d+$/);
fieldValidationErrors.Pay = payValid ? '' : ' is InCorrect';
if (!payValid && this.state.pay != 0) {
this.state.pay = 0;
this.state.balance = this.state.dueAmount;
}
break;
case 'paymentMode':
paymentModeValid = value.length > 0;
fieldValidationErrors.PaymentMode = paymentModeValid ? '' : ' is InCorrect';
break;

default:
break;
}
this.setState({
formErrors: fieldValidationErrors,
discountValid: discountValid,
payValid: payValid,
paymentModeValid: paymentModeValid,

}, this.validateForm);
}
validateForm() {

this.setState({
formValid:
this.state.payValid
&& this.state.paymentModeValid


});
}

GetData() {
allcustomerList = [];
this.state.customeroptions = [];
this.state.data = [];
var self = this;
$.ajax({
type: 'POST',
data: JSON.stringify({
companyId: this.state.companyId,
}),
url: " http://15.206.129.105:8080/ThroughBooksCOAPI/saleorder/AllCustomerDueSummary",
contentType: "application/json",
dataType: 'json',
async: false,
success: function (data, textStatus, jqXHR) {
allcustomerList = data;
console.log("customer due ", data)
self.RenderAllList();
},
error: function (data) {

Swal.fire({
position: 'center',
icon: 'error',
title: 'Network Connection Problem',
showConfirmButton: false,
timer: 2000
})

}
});
}
GetCustomerData() {
this.state.data = [];
this.state.columns = [];
var self = this;
$.ajax({
type: 'POST',
data: JSON.stringify({
companyId: this.state.companyId,
customerId: this.state.customerId
}),
url: " http://15.206.129.105:8080/ThroughBooksCOAPI/saleorder/CustomerDueSummary",
contentType: "application/json",
dataType: 'json',
async: false,
success: function (data, textStatus, jqXHR) {
var customerArray = [];
console.log("customer due ", data)
var dueAmt = 0;
var totalamt = 0;
$.each(data, function (i, item) {
if (item.description === self.state.invoiceType) {
dueAmt = Number(dueAmt) + Number(item.balanceAmt);
totalamt = Number(totalamt) + Number(item.subtotal1);
self.state.data.push({
"Invoice No": item.invoiceNo,
"Date": item.date,
"Name": item.userName,
"Contact No": item.contact,
"Total": item.subtotal1,
"Balance": item.balanceAmt,
"Status": item.status,
"Site": item.site
});
}
});
if (self.state.data.length > 0) {
self.state.columns = self.GetColumns();
}
self.setState({
data: self.state.data,
columns: self.state.columns,
dueAmount: dueAmt,
balanceAmt: dueAmt,
pay: 0,
});
},
error: function (data) {

Swal.fire({
position: 'center',
icon: 'error',
title: 'Network Connection Problem',
showConfirmButton: false,
timer: 2000
})

}
});
}
handleInvoiceType = (e) => {
const name = e.target.name;
const value = e.target.value;
this.state[name] = value;
console.log("[name]", name, value);
this.setState({ [name]: value });
this.clear();
this.RenderAllList();
}
GetColumns() {

return Object.keys(this.state.data[0]).map(key => {

return {
Header: key,
accessor: key,
};

});
}
RenderAllList() {
this.state.customeroptions = [];
this.state.data = [];

var self = this;
$.each(allcustomerList, function (i, item) {
var invoice = _.pluck(allcustomerList, "invoiceNo");
console.log("invoice ", invoice);
console.log("item.description === self.state.invoiceType ", item.description, self.state.invoiceType)
if (item.description === self.state.invoiceType) {
var exits = _.findWhere(self.state.customeroptions, { value: item.customerId });
var index = -1;
if (exits !== undefined) {
index = _.indexOf(self.state.customeroptions, exits);
}
console.log("exits ", exits, " index ", index);
if (index > -1) {
console.log("balance ", Number(self.state.data[index].Balance), Number(item.balanceAmt));
console.log("total ", Number(self.state.data[index].Total), Number(item.subtotal1));
self.state.data[index].Balance = Number(self.state.data[index].Balance) + Number(item.balanceAmt);
self.state.data[index].Total = Number(self.state.data[index].Total) + Number(item.subtotal1);
self.state.data[index].Status = "Unpaid";
console.log("Existing data ", self.state.data, self.state.data[index]);
} else {
self.state.data.push({
"CustomerId": item.customerId,
"Date": item.date,
"Name": item.userName,
"Contact No": item.contact,
"Total": item.subtotal1,
"Balance": item.balanceAmt,
"Status": item.status,
"Site": item.site
});
self.state.customeroptions.push({ label: item.userName + " " + item.contact, value: item.customerId, userName: item.userName });
}
}
});

if (self.state.data.length > 0) {
self.state.columns = self.GetColumns();
}
self.setState({
data: self.state.data,
columns: self.state.columns,
customeroptions: self.state.customeroptions
});
}
Submit() {
var self = this;

if ((Number(this.state.pay)) > 0 && this.state.paymentMode != '' && this.state.customerId != '') {

$.ajax({
type: 'POST',
data: JSON.stringify({
invoiceNo: this.state.invoiceNo,
userName: this.state.userName,
pay: this.state.pay,
date: this.state.date,
description: self.state.invoiceType,
paymentMode: this.state.paymentMode,
customerId: this.state.customerId,
companyId: this.state.companyId,
staffId: self.state.staffId,
employeeName: self.state.employeeName,
role: self.state.role,
site: GetCurrentSite(),

}),
url: " http://15.206.129.105:8080/ThroughBooksCOAPI/saleorder/PayCustomerDue",
contentType: "application/json",
dataType: 'json',
async: false,
success: function (data, textStatus, jqXHR) {
Swal.fire({
position: 'center',
icon: 'success',
title: 'Successfully Updated Payment Details',
showConfirmButton: false,
timer: 2000
});
self.cancelFunc();
},

error: function (data) {

Swal.fire({
position: 'center',
icon: 'error',
title: 'Network Connection Problem',
showConfirmButton: false,
timer: 2000
})
},
});

} else {


Swal.fire({
position: 'center',
icon: 'error',
title: 'Kindly Fill In All The Fields',
showConfirmButton: false,
timer: 2000
})
}


}
clear() {
this.state.pay = 0;
this.state.dueAmount = 0;
this.state.balanceAmt = 0;
this.state.selectedCustomer = "";
this.state.customerId = "";
this.state.selectedPaymentMode = { label: "Cash", value: "Cash" };
this.state.paymentMode = "Cash";
this.setState({
pay: 0,
dueAmount: 0,
balanceAmt: 0,
selectedPaymentMode: this.state.selectedPaymentMode,
paymentMode: this.state.paymentMode,
selectedCustomer: this.state.selectedCustomer,
customerId: this.state.customerId
});

}
cancelFunc() {
this.clear();
this.GetData();
}
render() {
return (
<div class="container" style={{ height: "20px" }}>
<div className="">
<div className="">
<BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
</div>
<div class="inv_HeaderCls">
<h3 class="text-center" style={{ fontWeight: "300" }}>Customerwise Payment</h3>  
 </div>
<div>
    </div>
<div class="card">

<div class="card-body">
<div className="panel panel-default">
<FormErrors formErrors={this.state.formErrors} />
</div>
<form class="form-horizontal form-bordered" name="submissions" >
<div className="form-group col-md-6">
<label class="control-label col-sm-3 font-weight-bold" for="customerName">Type<span style={{ color: "red" }}>*</span></label>
<div class="col-sm-9">
    <select className="form-control" name="invoiceType" id="invoiceType" onChange={this.handleInvoiceType}>
        <option value="SaleInvoice">Sale Invoice</option>
        <option value="EstimateInvoice">Pro Forma Invoice</option>
    </select>
</div>
</div>
<div className="form-group col-md-6">
<label class="control-label col-sm-3 font-weight-bold" for="customerName">Customer Name<span style={{ color: "red" }}>*</span></label>
<div class="col-sm-9">
    <SelectSearch options={this.state.customeroptions} value={this.state.selectedCustomer}
        onChange={(e) => this.handleCustomer(e)} name="customerName" placeholder="Select Customer" />
</div>
</div>
<div className="form-group col-md-6">
<label class="control-label col-sm-3 font-weight-bold" for="customerName">Due Amount<span style={{ color: "red" }}>*</span></label>
<div class="col-sm-9">
    <input type="text" class="form-control" id="dueamount" name="dueAmount" value={this.state.dueAmount} readOnly />
</div>
</div>
<div className={`form-group col-md-6 ${this.errorClass(this.state.formErrors.pay)}`}>
<label class="control-label col-sm-3 font-weight-bold" for="customerName">Pay<span style={{ color: "red" }}>*</span></label>
<div class="col-sm-9">
    <input type="text" class="form-control" id="pay" name="pay" value={this.state.pay} onChange={this.handleUserInput} />
</div>
</div>


<div className="form-group col-md-6">
<label class="control-label col-sm-3 font-weight-bold" for="customerName">Payment Mode<span style={{ color: "red" }}>*</span></label>
<div class="col-sm-9">
    <SelectSearch options={this.state.paymentoptions} value={this.state.selectedPaymentMode}
        onChange={(e) => this.handlePaymentModeDetails(e)} name="paymentMode" placeholder="Select Payment Mode " />

</div>
</div>
<div className="form-group col-md-6">
<label class="control-label col-sm-3 font-weight-bold" for="balanceAmt">Balance<span style={{ color: "red" }}>*</span></label>
<div class="col-sm-9">
    <input type="text" class="form-control" id="balanceAmt" name="balanceAmt" value={this.state.balanceAmt} onChange={this.handleUserInput} readOnly />
</div>
</div>
<div class="form-group">
<div class="row" style={{ marginLeft: "2px" }} >
<div class="col-md-12 text-center">
        <button style={{ fontWeight: "bold" }} type="button" onClick={() => this.Submit()} class="btn btn-primary">Submit</button> <span></span>
        <button style={{ fontWeight: "bold" }} type="button" onClick={() => this.cancelFunc()} class="btn btn-primary">Cancel</button>
    </div>
</div>
</div>
</form>
</div>
<div style={{ display: "grid"}}>
<h4 class="text-center" style={{ fontWeight: "300" }}>Customer Summary</h4>
<div id="tableOverflow">
<table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">

</table>
</div>


<ReactTable style={{ overflow: "auto", marginBottom: "5%" }}
data={this.state.data}
columns={this.state.columns}
noDataText="No Data Available"
filterable
defaultPageSize={10}
className="-striped -highlight"
defaultFilterMethod={(filter, row, column) => {
const id = filter.pivotId || filter.id;
return row[id] !== undefined
    ? String(row[id])
        .toLowerCase()
        .indexOf(filter.value.toLowerCase()) !== -1
    : true;
}}
showPaginationTop={true}
showPaginationBottom={false}
getTdProps={this.onRowClick}
/>
</div>
</div>
</div>
</div>

);
}
}

export default CustomerwisePayment;
