import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import { FormErrors } from './FormErrors';
import $ from 'jquery';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import SalesReportDisplay from './SalesReportDisplay';
import SalesDailyReport from './SalesDailyReport';
import ReportMenuPage from './ReportMenuPage';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import CryptoJS from 'crypto-js';
import CustomerList from './CustomerList';
import FooterText from './FooterText';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import Case from 'case';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
var id;
var discount = 0;
var pay = 0;

class CustomerListEdit extends Component {

constructor(props) {
super(props)
var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

this.state = {

customerName: this.props.customerName,
companyName: this.props.companyName,
address: this.props.address,
contactNo: this.props.contactNo,
// city: this.props.city,
alternateContactNo: this.props.alternateContactNo,
gstNo: this.props.gstNo,
email: this.props.email,
customerId: this.props.customerId,
date: date,
companyId: companyId,
staffId: staffId,
employeeName: employeeName,
role: role,

landlineNo:this.props.landlineNo,
state:this.props.city,

oldCustomerName: this.props.customerName,
oldCompanyName:this.props.companyName,
oldAddress: this.props.address,
oldContactNo: this.props.contactNo,
oldstate: this.props.state,
oldAlternateContactNo: this.props.oldAlternateContactNo,
oldGstNo:this.props.oldGstNo,
oldEmail: this.props.oldEmail,
oldLandlineNo:this.props.landlineNo,


};
this.setState({
date: date,
})


}


componentDidMount() {
SetCurrentPage("CustomerListEdit");
//  console.log("PROPS :",this.props)
$(".contactnoerror").hide();
$("#emailIderror").hide();
$(".landlinenoerror").hide();


this.state.contactNoErrorCount=0;
this.state.emailIderrorCount=0;
this.state.landlineNoErrorCount=0;


}



handleUserInput = (e) => {

const name = e.target.name;
const value = e.target.value;
this.setState({ [name]: value});

}

handleUserInputEmailId = (e) => {
const name = e.target.name;
const value = e.target.value;

var emailIdReg=  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

if (emailIdReg.test(value) == true || value=="") 
{
$("#emailIderror").hide();

this.state.emailIderrorCount=0;
}else{

$("#emailIderror").show();
this.setState({
[name]: " "
});
this.state.emailIderrorCount=1;
}

this.setState({
[name]: value
});

}


handleUserInputLandlineNo = (e) => {
const name = e.target.name;
const value = e.target.value;


var landlineNo = /^\d{12}$/;
if ((value.match(landlineNo)) || value=="") {

$(".landlinenoerror").hide();

this.state.landlineNoErrorCount=0;

}else{

$(".landlinenoerror").show();

this.state.landlineNoErrorCount=1;
}

this.setState({
[name]: value
});

}

handleUserInputContactNo = (e) => {
const name = e.target.name;
const value = e.target.value;


var phoneno = /^\d{10}$/;
if ((value.match(phoneno)) || value=="") {

$(".contactnoerror").hide();

this.state.contactNoErrorCount=0;

}else{

$(".contactnoerror").show();

this.setState({
[name]: " "
});
this.state.contactNoErrorCount=1;
}

this.setState({
[name]: value
});

}




UpdateSubmit() {

var self = this;

if(this.state.oldCustomerName!=this.state.customerName || this.state.oldContactNo!=this.state.contactNo ||
this.state.oldCompanyName!=this.state.companyName || this.state.oldEmail!=this.state.email ||
this.state.oldAddress!=this.state.address || this.state.oldstate !=this.state.staffId ||
this.state.oldGstNo!=this.state.gstNo || this.state.oldLandlineNo!=this.state.landlineNo ){ 

if(this.state.contactNo!="" && this.state.customerName!="" ){

if(this.state.contactNoErrorCount==0 && this.state.emailIderrorCount==0 && this.state.landlineNoErrorCount==0){

$.ajax({
type: 'POST',
data: JSON.stringify({
customerName: Case.capital(self.state.customerName),
companyName: Case.capital(self.state.companyName),
address: self.state.address,
contactNo: self.state.contactNo,
city: self.state.state,
alternateContactNo: self.state.alternateContactNo,
gstNo: self.state.gstNo,
email: self.state.email,
customerId: self.state.customerId,

staffId: self.state.staffId,
employeeName: self.state.employeeName,
role: self.state.role,
landlineNo:self.state.landlineNo,

/* oldCustomerName: self.state.oldCustomerName,
oldCompanyName: self.state.oldCompanyName,
oldAddress: self.state.oldAddress,
oldContactNo: self.state.oldContactNo,
oldCity: self.state.oldCity,
oldAlternateContactNo: self.state.oldAlternateContactNo,
oldGstNo: self.state.oldGstNo,
oldEmail: self.state.oldEmail, */

companyId: this.state.companyId,

}),
url: " http://15.206.129.105:8080/ThroughBooksCOAPI/master/CustomerDetailsUpdate",
contentType: "application/json",
dataType: 'json',
async: false,

success: function (data, textStatus, jqXHR) {

var tab;

Swal.fire({
position: 'center',
icon: 'success',
title: 'Customer Details Updated Successfully',
showConfirmButton: false,
timer: 2000
})

ReactDOM.render(
<Router>
<div>

<Route path="/" component={CustomerList} />


</div>
</Router>,
document.getElementById('contentRender'));
registerServiceWorker();


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

}else{
Swal.fire({
position: 'center',
icon: 'warning',
title: 'Kindly note the errors',
showConfirmButton: false,
timer: 2000
})
}
}else{
Swal.fire({
position: 'center',
icon: 'warning',
title: 'Kindly fillin manadatory fields to proceed',
showConfirmButton: false,
timer: 2000
})
}

}else{
Swal.fire({
position: 'center',
icon: 'warning',
title: 'No Changes Made',
showConfirmButton: false,
timer: 2000
})
}



}





BackbtnFunc() {
ReactDOM.render(
<Router>
<div>

<Route path="/" component={CustomerList} />


</div>
</Router>,
document.getElementById('contentRender'));
registerServiceWorker();
}




render() {
return (


<div class="container" style={{ height: "20px" }}>


<div className="">
<div className="">
<Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
</div>
<div className="inv_HeaderCls">
<h3>Customer Profile Edit</h3>
</div>
</div>

<div class="card">
<div class="card-body">


<form class="form-horizontal form-bordered" >
<div className="form-group">
<label class="control-label col-sm-2" for="customerName">Customer Name <span style={{ color: "red", fontWeight: "700" }}>*</span></label>
<div class="col-sm-10">
<input type="text" class="form-control"
onChange={this.handleUserInput}
value={this.state.customerName}
id="customerName"
name="customerName" />


</div></div>


<div className="form-group">
<label class="control-label col-sm-2" for="companyName">Company Name</label>
<div class="col-sm-10">
<input type="text" class="form-control"
onChange={this.handleUserInput}
value={this.state.companyName}
id="companyName"
name="companyName" />
</div>
</div>
<div className="form-group">
<label class="control-label col-sm-2" for="contactNo">Contact No <span style={{ color: "red", fontWeight: "700" }}>*</span></label>
<div class="col-sm-10">
<input class="form-control" type="text"
onChange={this.handleUserInputContactNo}
value={this.state.contactNo}
id="contactNo"
name="contactNo" />
<span id="contactnoerror" class="contactnoerror" style={{ color: "red", fontWeight: "700" }}>! ContactNo Invalid</span>

</div>
</div>

{/*  <div className="form-group">
<label class="control-label col-sm-2" for="alternateContactNo">Alternate Contact No</label>
<div class="col-sm-10">
<input class="form-control" type="text"
onChange={this.handleUserInput}
value={this.state.alternateContactNo}
id="alternateContactNo"
name="alternateContactNo" />
</div></div>  */}

<div className="form-group">

<label class="control-label col-sm-2" for="email">Email</label>
<div class="col-sm-10">
<input class="form-control" type="text"
onChange={this.handleUserInputEmailId}
value={this.state.email}
id="email"
name="email" />
<span id="emailIderror" style={{ color: "red", fontWeight: "700" }}>! EmailId Invalid</span>

</div></div>


<div className="form-group">
<label class="control-label col-sm-2" for="address">Address</label>
<div class="col-sm-10">
<input class="form-control" type="text"
onChange={this.handleUserInput}
value={this.state.address}
id="address"
name="address" />
</div></div>

<div className="form-group">
<label class="control-label col-sm-2" for="city">State</label>
<div class="col-sm-10">

<input class="form-control" type="text"
onChange={this.handleUserInput}
value={this.state.state}
id="state"
name="state" />
</div></div>

<div className="form-group">
<label class="control-label col-sm-2" for="gstNo">GST No</label>
<div class="col-sm-10">
<input class="form-control" type="text"
onChange={this.handleUserInput}
value={this.state.gstNo}
id="gstNo"
name="gstNo" />
</div></div>


<div className="form-group">
<label class="control-label col-sm-2" for="gstNo">LandlineNo</label>
<div class="col-sm-10">
<input class="form-control" type="text"
onChange={this.handleUserInputLandlineNo}
value={this.state.landlineNo}
id="landlineNo"
name="landlineNo"  />
<span id="landlinenoerror" class="landlinenoerror" style={{ color: "red", fontWeight: "700" }}>! LandlineNo Invalid</span>

</div></div>

</form>
<div class="form-group">
<div class="row">
<div class="col-sm-offset-2 col-sm-10">
<button type="button" style={{ fontWeight: "bold" }}  class="btn btn-primary" onClick={() => this.UpdateSubmit()}>Update</button>

</div></div></div>
</div>

</div>



</div>
);
}
}

export default CustomerListEdit;