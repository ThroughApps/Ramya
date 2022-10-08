import React, { Component } from 'react';
import logo from './logo.svg';
import $ from 'jquery';
import * as XLSX from 'xlsx';
import { confirmAlert } from 'react-confirm-alert';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import MobileDetect from 'mobile-detect/mobile-detect';
import CryptoJS from 'crypto-js';

import _ from 'underscore';
import { Multiselect } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';
import Case from "case";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Modal from 'react-modal';
import { EnquiryProductTypeModal } from './CommonModalPages';
import './Enquirycss.css';
import moment from 'moment';
import ReactTable from "react-table";
import "react-table/react-table.css";
import EnquiryReport from './EnquiryReport';
import EnquiryMenuPage from './EnquiryMenuPage';
import { GetEmployeeSite, GetCurrentSite } from './ConstSiteFunction';
import ServiceRegistration from './ServiceRegistration/ServiceRegistration';
import {Double_BackButtonComponent} from'./ServiceRegistration/ButtonComponent';
import { SiteDropDown, FilterOptions } from './SiteDropDown';
import CapitalCaseFunc from './ServiceRegistration/CommonTextFormatComponent';
import './SiteDropDownCSS.css'; // optional customStyles

const ct = require('countries-and-timezones');

var productArray = [];
var customerArray = [];
var dataList = [];

var productDetailsArray = [];
var localProductDetailsArray = [];


const customStyles = {
content: {
top: '50%',
left: '50%',
right: 'auto',
bottom: 'auto',
marginRight: '-50%',
transform: 'translate(-50%, -50%)',
width: "491px"
}
};


class Enquiry extends Component {

constructor(props) {
super(props)
var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
var staffName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8);


var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

var year = today.getFullYear();
var month = (today.getMonth() + 1);

var fromDate = new Date(today.getFullYear(), today.getMonth(), 1);

var toDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

fromDate = moment(fromDate).format("YYYY-MM-DD");
toDate = moment(toDate).format("YYYY-MM-DD");



var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();



this.state = {
companyId: companyId,
staffId: staffId,
staffName: staffName,
customerList: [],
selectedCustomerList: [],
productList: [],
selectedProductList: [],
contactnoreadonly: true,
showModal: false,
productType: '',
newProduct: '',
quantityErrorStatus: 0,
errorStatus: 0,
date: date,
fromDate: fromDate,
toDate: toDate,
year: year,
data: [],
columns: [],
site: GetCurrentSite(),
}



}

componentDidMount() {

var self = this;

$(".btn-default").css("background-color", "#05a4b5");
$(".btn-default").css("color", "white");

//   $("#customerName").hide();
$("#contactnoerror").hide();
$("#productListTable").empty();


this.GetBasicDetailsList();

}


GetBasicDetailsList() {

var self = this;

productArray = [];
this.state.productList = [];

customerArray = [];
this.state.customerList = [];



self.state.data = [];
self.state.columns = [];

self.setState({
data: self.state.data,
columns: self.state.columns,
customerList: [...self.state.customerList],
productList: [...self.state.productList],

})

var no = 0;


$.ajax({
type: 'POST',
data: JSON.stringify({
companyId: this.state.companyId,
fromDate: this.state.fromDate,
toDate: this.state.toDate,
year: this.state.year,
empSites: GetEmployeeSite(),
}),
url: "http://15.206.129.105:8080/ThroughBooksCOAPI/enquiry/selectbasicdetails",
// url: "http://localhost:8081/EmployeeAttendenceAPI/MandatoryFieldsConfig/GetAllFieldsData",
contentType: "application/json",
dataType: 'json',
async: false,

success: function (data, textStatus, jqXHR) {


console.log("DATA :", data);

productArray = data.productList;

$.each(data.productList, function (i, item) {
self.state.productList.push(item.productName);
});


$.each(data.customerList, function (i, item) {
self.state.customerList.push(item.contactNo);
});
customerArray = data.customerList;


self.setState({
customerList: [...self.state.customerList],
productList: [...self.state.productList],
})


dataList = data.enquiryProductList;
self.handleSite(self.state.site);

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

getColumns() {
return Object.keys(this.state.data[0]).map(key => {
if (
key != "CustomerId" &&
key != "rowopted"

) {
return {
Header: key,
accessor: key
};
} else {
return {
Header: key,
accessor: key,
show: false
};
}
});

}

handleChangeSelectCustomer(list) {


$("#contactnoerror").hide();
$("#productListTable").empty();
this.state.selectedProductList = [];
this.state.customerName = "";


this.state.errorStatus = 0;

this.setState({
selectedProductList: this.state.selectedProductList,
customerName: this.state.customerName,
errorStatus: this.state.errorStatus
})

if (list.length == 1) {


this.state.selectedCustomerList = list;

this.setState({
selectedCustomerList: [...this.state.selectedCustomerList],
})

var customerName = _.where(customerArray, { contactNo: this.state.selectedCustomerList[0] })


if (customerName.length > 0) {


this.state.customerName = customerName[0].customerName;
this.state.customerNamereadonly = true;

this.setState({
customerName: this.state.customerName,
customerNamereadonly: this.state.customerNamereadonly
})

//     $("#customerName").show();

} else {

this.state.customerNamereadonly = false;

this.setState({
customerNamereadonly: this.state.customerNamereadonly,
})
}


} else if (list.length > 1) {


var listLength = list.length;
this.state.selectedCustomerList = list.slice(-1 * 1);

this.setState({
selectedCustomerList: [...this.state.selectedCustomerList],
})

var customerName = _.where(customerArray, { contactNo: this.state.selectedCustomerList[0] })

if (customerName.length > 0) {



this.state.customerName = customerName[0].customerName;
this.state.customerNamereadonly = true;
this.setState({
customerName: this.state.customerName,
customerNamereadonly: this.state.customerNamereadonly

})

} else {

this.state.customerNamereadonly = false;

this.setState({
customerNamereadonly: this.state.customerNamereadonly,
})
}
//  $("#customerName").show();


} else if (list.length == 0) {

this.state.customerName = "";
this.state.customerNamereadonly = true;
this.state.selectedCustomerList = [];

this.setState({
customerName: this.state.customerName,
customerNamereadonly: this.state.customerNamereadonly,
selectedCustomerList: this.state.selectedCustomerList
})


}


}

handleChangeCreateCustomer(value) {


$("#productListTable").empty();

this.state.errorStatus = 0;
var self = this;

self.state.selectedCustomerList = [];
self.state.customerName = "";
self.state.selectedProductList = [];

self.setState({
selectedCustomerList: self.state.selectedCustomerList,
customerName: self.state.customerName,
selectedProductList: self.state.selectedProductList,
errorStatus: this.state.errorStatus

})

var phoneno = /^\d{10}$/;
if ((value.match(phoneno))) {

$("#contactnoerror").hide();

self.state.selectedCustomerList = [];
self.state.customerName = "";

self.state.selectedCustomerList.push(value);
self.state.customerList.push(value);

self.setState({
selectedCustomerList: [...self.state.selectedCustomerList],
customerList: [...self.state.customerList],
customerName: self.state.customerName
})




self.state.customerNamereadonly = false;

//  $("#customerName").show();
self.setState({
customerNamereadonly: self.state.customerNamereadonly,
})


} else {
$("#contactnoerror").show();
this.state.errorStatus = Number(this.state.errorStatus) + Number(1);
}

}



handleChangeSelectProduct(list) {


var self = this;
this.state.selectedProductList = list;

this.setState({
selectedProductList: [...this.state.selectedProductList],
})

self.ProductTableDataFunc();
$("#productListTable").empty();

var tab = '<table id="tablecontent" className="table_Cont" style="width:100%;align=center;">'
+ '<thead classname="enq_th_cls" ><th  style="text-align: center;">ProductName</th><th style="text-align: center;">Type</th><th style="text-align: center;">Quantity</th></thead><tbody style="text-align: center;">'


$.each(this.state.selectedProductList, function (i, item) {

var productList = _.where(productArray, { productName: item });

var quantity = _.where(localProductDetailsArray, { productName: item });


if (quantity.length > 0) {
if (productList[0].productType == "product") {

var qty = quantity[0].quantity;
if (qty == undefined) {
qty = "";
}

tab += '<tr ><td  style= "width: 50%;word-break: break-word;">' + productList[0].productName + '</td><td>' + productList[0].productType + '</td>'
+ '<td><input id="quantity" type="text" value=' + qty + '></input></td></tr>'
} else {
tab += '<tr ><td  style= "width: 50%;word-break: break-word;">' + productList[0].productName + '</td><td>' + productList[0].productType + '</td>'
+ '<td><input style="border: 0px none;" readonly></input></td></tr>'
}
} else {
if (productList[0].productType == "product") {
tab += '<tr ><td  style= "width: 50%;word-break: break-word;">' + productList[0].productName + '</td><td>' + productList[0].productType + '</td>'
+ '<td><input id="quantity" type="text"> </input></td></tr>'
} else {
tab += '<tr ><td  style= "width: 50%;word-break: break-word;">' + productList[0].productName + '</td><td>' + productList[0].productType + '</td>'
+ '<td><input style="border: 0px none;" readonly></input></td></tr>'
}
}



});
tab += '</tbody></table>';

$("#productListTable").append(tab);



}

handleChangeCreateProduct(value) {

var capitalCaseData=CapitalCaseFunc(value);

this.state.newProduct = capitalCaseData;
this.setState({
newProduct: this.state.newProduct,
})

this.openModalProductType();

}


handleUserInputCustomerName = (e) => {
const name = e.target.name;
const value =e.target.value;

var capitalCaseData=CapitalCaseFunc(value);

this.state[name]=capitalCaseData;
this.setState({
[name]: capitalCaseData
});
}



openModalProductType() {
this.state.productTypemodalIsOpen = true;

this.setState({
productTypemodalIsOpen: this.state.productTypemodalIsOpen
})
}



closeModalProductType() {

var self = this;

this.state.productTypemodalIsOpen = false;
this.state.productTypecloseModal = true;


this.setState({
productTypemodalIsOpen: this.state.productTypemodalIsOpen,
productTypecloseModal: this.state.productTypecloseModal
})



if (this.state.productType != "" && this.state.productType != undefined) {

self.ProductTableDataFunc();
$("#productListTable").empty();

var tab = '<table id="tablecontent" className="table_Cont" style="width:100%;align=center;">'
+ '<thead classname="enq_th_cls" ><th  style="text-align: center;">ProductName</th><th style="text-align: center;">Type</th><th style="text-align: center;">Quantity</th></thead><tbody style="text-align: center;">'

$.each(this.state.selectedProductList, function (i, item) {



var productList = _.where(productArray, { productName: item });


var quantity = _.where(localProductDetailsArray, { productName: item });


if (quantity.length > 0) {
if (productList[0].productType == "product") {

var qty = quantity[0].quantity;
if (qty == undefined) {
qty = "";
}
tab += '<tr><td style="width:50%;word-break:break-word;">' + productList[0].productName + '</td><td>' + productList[0].productType + '</td>'
+ '<td><input id="quantity" type="text" value=' + qty + '></input></td></tr>'
} else {
tab += '<tr><td style= "width: 50%;word-break: break-word;"> ' + productList[0].productName + '</td><td>' + productList[0].productType + '</td>'
+ '<td><input style="border: 0px none;" readonly></input></td></tr>'
}
} else {

if (productList[0].productType == "product") {

tab += '<tr ><td  style= "width: 50%;word-break: break-word;">' + productList[0].productName + '</td><td>' + productList[0].productType + '</td>'
+ '<td><input id="quantity" type="text"></input></td></tr>'
} else {
tab += '<tr><td  style= "width: 50%;word-break: break-word;">' + productList[0].productName + '</td><td>' + productList[0].productType + '</td>'
+ '<td><input style="border: 0px none;" readonly></input></td></tr>'
}


}

});

if (self.state.productType == "product") {
tab += '<tr ><td  style= "width: 50%;word-break: break-word;">' + self.state.newProduct + '</td><td>' + self.state.productType + '</td>'
+ '<td><input id="quantity" type="text"></input></td></tr>'
} else {
tab += '<tr><td  style= "width: 50%;word-break: break-word;">' + self.state.newProduct + '</td><td>' + self.state.productType + '</td>'
+ '<td><input style="border: 0px none;" readonly></input></td></tr>'
}


tab += '</tbody></table>';

$("#productListTable").append(tab);


this.state.selectedProductList.push(this.state.newProduct);
this.state.productList.push(this.state.newProduct);

this.setState({
selectedProductList: [...this.state.selectedProductList],
productList: [...this.state.productList],
})


var newProductDetails = {
'productName': self.state.newProduct,
'productType': self.state.productType,
};

productArray.push(newProductDetails);



self.state.newProduct = "";
self.state.productType = "";
self.setState({
productType: self.state.productType,
newProduct: self.state.newProduct,
})


} else {
Swal.fire({
position: 'center',
icon: 'error',
title: 'No Product Type Opted For The Product ' + this.state.newProduct,
showConfirmButton: false,
timer: 2000
})

this.state.newProduct = "";
this.state.productType = "";
this.setState({
newProduct: this.state.newProduct,
productType: this.state.productType
})


}


}


handleChangeProductType = (value) => {
this.state.productType = value;
this.setState({ productType: value });



}


SubmitFunc() {

var self = this;

this.state.quantityErrorStatus = 0;

productDetailsArray = [];
var isnumRegExp = /^\d+$/;


if (this.state.selectedCustomerList.length > 0 && this.state.customerName != "" && this.state.selectedProductList.length > 0) {


$("#productListTable #tablecontent >tbody > tr").each(function () {
var currentRow = $(this);
var productName = currentRow.find("td:eq(0)").text();
var productType = currentRow.find("td:eq(1)").text();
var quantity = currentRow.find("td:eq(2) input[type='text']").val();

var productDetails;



if (productType == "product") {


if (isnumRegExp.test(quantity)) {
productDetails = { productName: productName, productType: productType, quantity: quantity }
productDetailsArray.push(productDetails);
} else {
self.state.quantityErrorStatus = Number(self.state.quantityErrorStatus) + Number(1);
}
} else {
productDetails = { productName: productName, productType: productType, quantity: 0 }
productDetailsArray.push(productDetails);
}

})

if (this.state.errorStatus != 0) {
Swal.fire({
position: 'center',
icon: 'warning',
title: 'Kindly Check For The Displayed Errors',
showConfirmButton: false,
timer: 2000
})
} else if (this.state.quantityErrorStatus != 0) {
Swal.fire({
position: 'center',
icon: 'warning',
title: 'Kindly Check For The Quantity [1.Format Should Only Be Number 2.Field Should Not be Empty]',
showConfirmButton: false,
timer: 2000
})
} else {
this.SubmitDataFunc();
}

} else {
Swal.fire({
position: 'center',
icon: 'warning',
title: 'Kindly Fill In All Fields To Proceed',
showConfirmButton: false,
timer: 2000
})
}




}


SubmitDataFunc() {



var self = this;
$.ajax({
type: 'POST',
data: JSON.stringify({
companyId: this.state.companyId,
productDetails: JSON.stringify(productDetailsArray),
//   productDetails:productDetailsArray.toString(),
contactNo: this.state.selectedCustomerList.toString(),
customerName: this.state.customerName,
date: this.state.date,
staffId: this.state.staffId,
staffName: this.state.staffName,
fromDate: this.state.fromDate,
toDate: this.state.toDate,
year: this.state.year,
site: GetCurrentSite(),
empSites: GetEmployeeSite(),

}),
url: "http://15.206.129.105:8080/ThroughBooksCOAPI/enquiry/AddEnquiry",
// url: "http://localhost:8081/EmployeeAttendenceAPI/MandatoryFieldsConfig/GetAllFieldsData",
contentType: "application/json",
dataType: 'json',
async: false,

success: function (data, textStatus, jqXHR) {



if (data.response == "Success") {
Swal.fire({
position: 'center',
icon: 'success',
title: 'Enquiry Add Successfully',
showConfirmButton: false,
timer: 2000
})
}

self.state.data = [];
self.state.columns = [];

self.setState({
data: self.state.data,
columns: self.state.columns

})

var no = 0;

self.state.customerList = [];
self.state.productList = [];

self.setState({
customerList: [...self.state.customerList],
productList: [...self.state.productList],
})

$.each(data.productList, function (i, item) {
self.state.productList.push(item.productName);
});
productArray = data.productList;

$.each(data.customerList, function (i, item) {
self.state.customerList.push(item.contactNo);
});
customerArray = data.customerList;


self.setState({
customerList: [...self.state.customerList],
productList: [...self.state.productList],
})

dataList = data.enquiryProductList;
self.handleSite(self.state.site);
self.ClearFunc();


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

ClearFunc() {

this.state.selectedCustomerList = [];
this.state.selectedProductList = [];
localProductDetailsArray = [];

this.state.customerName = "";
this.state.newProduct = "";
this.state.productType = "";

this.state.errorStatus = 0;
this.state.quantityErrorStatus = 0;

$("#contactnoerror").hide();
$("#productListTable").empty();

this.setState({
selectedCustomerList: this.state.selectedCustomerList,
selectedProductList: this.state.selectedProductList,
customerName: this.state.customerName,
newProduct: this.state.newProduct,
productType: this.state.productType,
errorStatus: this.state.errorStatus,
quantityErrorStatus: this.state.quantityErrorStatus,


})

}


ProductTableDataFunc() {

localProductDetailsArray = [];

$("#productListTable #tablecontent >tbody > tr").each(function () {
var currentRow = $(this);
var productName = currentRow.find("td:eq(0)").text();
var productType = currentRow.find("td:eq(1)").text();
var quantity = currentRow.find("td:eq(2) input[type='text']").val();

var productDetails;

if (productType == "product") {

productDetails = { productName: productName, productType: productType, quantity: quantity }
localProductDetailsArray.push(productDetails);

} else {
productDetails = { productName: productName, productType: productType, quantity: 0 }
localProductDetailsArray.push(productDetails);
}

})

}
handleSite = (e) => {
this.handleSite = this.handleSite.bind(this);
this.state.site = e.toString();
console.log("e ", this.state.site);
this.setState({
site: e.toString()
});
console.log("e ", dataList, e.toString());
var result = FilterOptions(dataList, this.state.site);
this.RendData(result);
}
RendData(result) {
var no = 0;
var self = this;
self.state.data = [];
if (result.length != 0) {
$.each(result, function (i, item) {

no = Number(no) + Number(1);

var productAvailable = _.where(productArray, { productName: item.productName });

var productStatus = <span style={{ color: "white" }}></span>;
if (item.productType == "product") {
productStatus = <span style={{ color: "green" }}>In Stock</span>;
if (productAvailable.length == 0) {
productStatus = <span style={{ color: "red" }}>Not Available</span>;
} else {
if (Number(productAvailable[0].quantity) == 0) {
productStatus = <span style={{ color: "red" }}>Out of Stock</span>;
} else if (Number(productAvailable[0].quantity) < Number(item.quantity)) {
productStatus = <span style={{ color: "red" }}>Insufficient Stock</span>;
}
}
}else if(item.productType == "service"){
productStatus = <span style={{ color: "green" }}>Service Available</span>;
if (productAvailable.length == 0) {
productStatus = <span style={{ color: "red" }}>Service Not Available</span>;
}
}


self.state.data[i] = {
"SNo": no,
"Date": item.date,
"ProductName": item.productName,
"ProductType": item.productType,
"Quantity": item.quantity,
"CustomerName": item.customerName,
"ContactNo": item.contactNo,
"AssistedBy": item.staffName,
"CustomerId": item.customerId,
"MessageCount": item.messageCount,
"Status": productStatus,
"Site": item.site,
};

});

self.state.columns = self.getColumns();
}
self.setState({
data: self.state.data,
columns: self.state.columns,
});

console.log("after drop down ", self.state.data);
}
EnquiryMonthlyReportFunc() {
ReactDOM.render(
<Router>
<div>
<Route path="/" component={EnquiryReport} />
</div>
</Router>,
document.getElementById('contentRender'));
}
BackbtnFunc() {
ReactDOM.render(
<Router>
<div>

<Route path="/" component={EnquiryMenuPage} />


</div>
</Router>,
document.getElementById('contentRender'));
registerServiceWorker();
}

render() {


return (

<div className="container" style={{ marginBottom: '0%', paddingTop: "0px" }}>
 <div className="">
            <div className="">
              <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
            </div>
            <div className="inv_HeaderCls">
                <h3>Enquiry</h3>
</div>
</div>
{/* <button style={{backgroundColor:"white",padding: "0",border: "none"}}>
<a href="#" target="_blank" style={{color: "blue",fontWeight: "800",textDecorationLine: "underline",marginLeft: "996px"}} 
onClick={() => this.EnquiryMonthlyReportFunc()}>Enquiry History</a>
</button> */}

<a href="#" className="user_p_menu"
style={{ backgroundColor: "", color: "black" }}>
<span
// class="glyphicon glyphicon-question-sign"
onClick={() => this.EnquiryMonthlyReportFunc()}
style={{
float: "", color: "#3c3b3b"
}}>
<span className="settings_Top_Submenu"
style={{ color: "blue", fontWeight: "800", textDecorationLine: "underline", marginLeft: "996px" }} >Enquiry History</span>
</span>
</a>

<div className="row">
<div className="col-xs-12 col-md-4 col-lg-4" style={{}}>
<div className="enq_Lab">
<label>Contact No</label>
<div className="enq_Input">
<Multiselect
onChange={value => this.handleChangeSelectCustomer(value)}
allowCreate={true}
onCreate={value => this.handleChangeCreateCustomer(value)}
data={this.state.customerList}
value={this.state.selectedCustomerList}
maxlength={1}
/>
</div>
</div>
<span id="contactnoerror" style={{ color: "red", fontWeight: "700" }}>! ContactNo Invalid</span>

<div className="enq_Lab">
<label>Name</label>
<div className="enq_Input">
<input type="text" name="customerName"
onChange={this.handleUserInputCustomerName} readOnly={this.state.customerNamereadonly}
value={this.state.customerName} className="form-control" style={{ width: "100%" }} />
</div>
</div>

<div className="enq_Lab">
<label>Product</label>
<div className="enq_Input">
<Multiselect
onChange={value => this.handleChangeSelectProduct(value)}
allowCreate={true}
onCreate={value => this.handleChangeCreateProduct(value)}
data={this.state.productList}
value={this.state.selectedProductList}
/>
</div>
</div>

<div >
<button className="btn btn-default" onClick={() => this.SubmitFunc()} >Submit</button>
<button className="btn btn-default" onClick={() => this.ClearFunc()} >Clear</button>
</div>

</div>
<div className="col-xs-12 col-md-8 col-lg-8 ">
<h4 className="productlist_Header" style={{ textAlign: "center" }}>Product List</h4>
<div id="productListTable" style={{ overflow: "auto"}} ></div>
</div>
</div>




{/*  <label>Product</label>
<Multiselect
onChange={value => this.handleChangeSelectProduct(value)}
allowCreate={true}
onCreate={value => this.handleChangeCreateProduct(value)}
data={this.state.productList}
value={this.state.selectedProductList}
/>
<div class="" style={{ marginTop: "0px" }}>


<label>Contact No</label>
<Multiselect
onChange={value => this.handleChangeSelectCustomer(value)}
allowCreate={true}
onCreate={value => this.handleChangeCreateCustomer(value)}
data={this.state.customerList}
value={this.state.selectedCustomerList}
maxlength={1}
/>
<span id="contactnoerror" style={{ color: "red", fontWeight: "700" }}>! ContactNo Invalid</span>

<div id="customerName">
<label>Name</label>
<input type="text" name="customerName"
onChange={this.handleUserInputCustomerName} readOnly={this.state.customerNamereadonly}
value={this.state.customerName} />
</div>

<label>Product</label>
<Multiselect
onChange={value => this.handleChangeSelectProduct(value)}
allowCreate={true}
onCreate={value => this.handleChangeCreateProduct(value)}
data={this.state.productList}
value={this.state.selectedProductList}
/>


</div>

<div id="productListTable"></div>
*/}



<Modal
isOpen={this.state.productTypemodalIsOpen}
//  onAfterOpen={this.customerafterOpenModal}
onRequestClose={this.state.productTypecloseModal}
style={customStyles}
contentLabel="Example Modal"
>

< div class="updatedevice" id="updatedevice" onClick={() => this.closeModalProductType()} style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
<i class="glyphicon glyphicon-remove" style={{
border: "none",
padding: "6px 7px 5px 7px",
fontSize: "1em",
color: "black",
borderRadius: "18px",
marginRight: "-416px",


}}>   </i>

</span>


</div>


{/* <button onClick={() => this.closeModalProductType()} >close</button> */}
<EnquiryProductTypeModal onSelectProductType={this.handleChangeProductType} />

{/*  class="glyphicon glyphicon-ok"  <button onClick={() => this.closeModalProductType()} >Ok</button> */}
<button type="button" class="btn-default " onClick={() => this.closeModalProductType()}
style={{
borderRadius: "18px",
backgroundColor: "#05a4b5",
color: "white",
width: "75px",
marginLeft: "193px",
marginTop: "20px"
}}

>
<span class="glyphicon glyphicon-ok" style={{ fontWeight: "800" }} ></span> Ok
</button>

{/* < div class="updatedevice" id="updatedevice" onClick={() => this.closeModalProductType()} style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
<i class="glyphicon glyphicon-ok" style={{
border: "none",
padding: "6px 7px 5px 7px",
fontSize: "1em",
color: "black",
borderRadius: "18px",
marginRight: "-416px",


}}>   </i>

</span>


</div> */}


</Modal>

<div class="row" style={{margin:"10px 0px"}}>
<div class="form-horizontal form-bordered SiteDropDown">
<div class="text-right">
<SiteDropDown onSiteDropDown={this.handleSite} data={this.state.site} />
</div>
</div>
</div>

<ReactTable style={{ marginBottom: "5%" }}
id="reportTable"
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
/>


</div >


);
}
}

export default Enquiry;