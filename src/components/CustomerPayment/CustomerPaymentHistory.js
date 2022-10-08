import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from '../registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
// import 'sweetalert2/src/sweetalert2.scss';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
import ReactTable from "react-table";
import "react-table/react-table.css";
//import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import _ from 'underscore';
import SelectSearch from 'react-select';
import RazorPay from './RazorPay';

import * as FaIcons from "react-icons/fa";  
import * as GiIcons from 'react-icons/gi';
import ReactTooltip from 'react-tooltip';

import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import CustomerInvoicePay from './CustomerInvoicePay';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from '../ConstSiteFunction';
import ReportMenuPage from '../ReportMenuPage';
import { Double_BackButtonComponent } from '../ServiceRegistration/ButtonComponent';
var invoiceListArray=[];

class CustomerPaymentHistory extends Component {

constructor(data) {
    super(data)
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
       

   
    this.state = {
     companyId:companyId,
     data:[],
     columns:[],
     paymentOptions:[],
     selected:-1,
     invoiceNo:'',
    
     isPaymentPaneOpen:false,
     isViewPaneOpen:false,

    }

  }


  componentDidMount() {
    SetCurrentPage("CustomerPaymentHistory");
    var self=this;

    this.state.paymentOptions=[];

    this.state.paymentOptions.push({label:'Attempeted',value:'Attempeted'});
    this.state.paymentOptions.push({label:'Success',value:'Success'});
    this.state.paymentOptions.push({label:'Failed',value:'Failed'});
    this.state.paymentOptions.push({label:'All',value:'All'});


    this.state.selectedPaymentOption=[];

    this.state.selectedPaymentOption={label:'All',value:'All'};

   this.GetCustomerInvoiceListTransactionHistory();


   

 
  }

  
  GetCustomerInvoiceListTransactionHistory(){

    var self=this;

    $.ajax({
        type: 'POST',
        data: JSON.stringify({
          companyId: this.state.companyId,
          customerId:this.state.customerId,  
        }),
    //    url: "http://15.206.129.105:8080/ThroughBooksCOAPI/CustomerPayment/GetCustomerInvoiceDetails",
      url:  "http://15.206.129.105:8080/ThroughBooksCOAPI/CustomerPayment/GetCustomerInvoiceTransactionDetails",
        contentType: "application/json",
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
  
          console.log("CUSTOMER HISTORY TRANSACTION  LIST DATA :", data);
  
            self.AssignData_Fields(data);
  
  
        },
        error: function (data, textStatus, jqXHR) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Network Connection Problem',
            showConfirmButton: false,
            timer: 2000
          })
  
  
        },
  
      });

  }


  AssignData_Fields(data){

    var count=0;
    var self=this;

    self.state.data=[];
    self.state.columns=[];
    invoiceListArray=[];
    var count=0;
    var no=1;

    var transactionListArray=data.paymentTransactionList;
    invoiceListArray= data.customerInvoiceList;

    if(transactionListArray.length >0){
   var grp_TransactionList_Array= _.groupBy(transactionListArray,"invoiceNo" );
  console.log("grp_TransactionList_Array :",grp_TransactionList_Array);

  var grp_TransactionList_Array_Size=_.size(grp_TransactionList_Array);
  console.log("grp_TransactionList_Array SIZE :",grp_TransactionList_Array_Size);


  _.each(
    _.sortBy(
        _.toArray(grp_TransactionList_Array), function (grp_TransactionList_Array) {
            return data;
        }
    ).reverse(),
    function (currentData) {
        console.log("v :",currentData);

       var attemptedCount=_.partition(currentData, {status:'Attempted'});
       var successCount=_.partition(currentData, {status:'Success'});;
       var failCount=_.partition(currentData, {status:'Failed'});


        console.log("attemptedCount :",_.size(attemptedCount[0]),
        " successCount: ",_.size(successCount[0]),
      " failCount :",_.size(failCount[0]) );

     // alert("currentData[0].invoiceNo :"+currentData[0].invoiceNo);
    var custInfo=_.where(invoiceListArray,{invoiceNo:currentData[0].invoiceNo});

    var currentData_Size=_.size(currentData);

    console.log("currentData_Size :",currentData_Size);

    var arrayValue=Number(currentData_Size)
    if(currentData_Size >0){
     arrayValue=Number(currentData_Size)-Number(1);
    }
    console.log("currentData_Size OrderId :",currentData[arrayValue].orderId);
    console.log("count :",count);
    console.log("custInfo :",custInfo);

    if(custInfo.length>0){
      self.state.data[count]={
        "SNO":no,
        "InvoiceNo":currentData[0].invoiceNo,
        "CustomerName":custInfo[0].customerName,
        "ContactNo":custInfo[0].contactNo,
        "Attempeted":_.size(attemptedCount[0]),
        "Success":_.size(successCount[0]),
        "Failed":_.size(failCount[0]),
        "OrderId":currentData[arrayValue].orderId,
      }


      no=Number(no)+Number(1);
      count=Number(count)+Number(1);

    }



    }
);

self.state.columns=self.getColumns();
        
    }

self.setState({
      data:self.state.data,
      columns:self.state.columns
    })
  
  }
 

  
  
  getColumns() {

    return Object.keys(this.state.data[0]).map(key => {
      
     
        return {
          Header: key,
          accessor: key
        };
      
      
    });
  }


/*
 handlePaymentStatus = (e) => {

  var self=this;

  this.state.selected=-1;

  this.setState({
    selected:this.state.selected,
  })

      this.state.selectedPaymentOption=e;
      this.setState({
        selectedPaymentOption:this.state.selectedPaymentOption,
      })

var sub_customerInvoiceListArray= _.uniq(invoiceListArray, 'invoiceNo');

var optedPaymentOptionInvoiceArray=sub_customerInvoiceListArray;

if(e.value!='All'){
optedPaymentOptionInvoiceArray=_.where(sub_customerInvoiceListArray,{paymentStatus:e.value});
}

self.state.data=[];
self.state.columns=[];

self.PopulateTable(optedPaymentOptionInvoiceArray);


 }


 onTrRowClick = (state, rowInfo, column, instance) => {
  var self = this;

  //   console.log("ROW INFO :",rowInfo);
   currentInvoiceArray=[];

  if (typeof rowInfo !== "undefined") {
    return {
      onClick: (e, handleOriginal) => {
        this.setState({
          selected: rowInfo.index
        });
        if (handleOriginal) {
          handleOriginal()
        }

        self.state.invoiceNo = rowInfo.original["Invoice"];
        self.state.amount = rowInfo.original["Balance Amouhnt$"];
        self.state.garageName=rowInfo.original["GarageName"];
        self.state.contactNo=rowInfo.original["ContactNo"];
        self.state.emailId=rowInfo.original["EmailId"];
        self.state.customerName=rowInfo.original["CustomerName"];
        self.state.orderId=rowInfo.original["OrderId"];
        self.state.siteName=rowInfo.original["Site"];

        self.setState({
         invoiceNo:self.state.invoiceNo,
         amount:self.state.amount,
         garageName:self.state.garageName,
         contactNo:self.state.contactNo,
         emailId:self.state.emailId,
         customerName:self.state.customerName,
         orderId:self.state.orderId,
         siteName:self.state.siteName,

        })

        this.state.rowIndexValue = rowInfo.index;
        console.log("invoiceNo :",self.state.invoiceNo," - ",self.state.amount," - ",self.state.garageName);

         currentInvoiceArray=_.where(invoiceListArray,{invoiceNo:self.state.invoiceNo});

         this.state.currentInvoiceArray=currentInvoiceArray;

        console.log("currentInvoiceArray :",currentInvoiceArray);




      },
        style: {
          background: rowInfo.index === this.state.selected ? '#00afec' : '',
          // color: rowInfo.index === this.state.selected ? 'white' : 'black'
        },
      
    }
  }
  else {
    return {
      onClick: (e, handleOriginal) => {
        if (handleOriginal) {
          handleOriginal()
        }
      },
      style: {
        // background: 'white',
        // color: 'black'
      },
    }
  }



};

*/

onViewInvoice(){
  if(this.state.invoiceNo!=""){
    //SHOW SLIDE
    this.state.selected=-1;

    this.setState({
      selected:this.state.selected,
    })


  }else{
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Kindly, Select Invoice ',

    })
  }

}


onInvoicePay(){

  if(this.state.invoiceNo!=""){
        //SHOW SLIDE
        this.state.selected=-1;

        this.setState({
          selected:this.state.selected,
        })

        this.OpenPaymentFunc();
  }else{
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Kindly, Select Invoice ',

    })
  }


  
}

OpenPaymentFunc(){
  this.state.isPaymentPaneOpen= true;

  this.setState({
    isPaymentPaneOpen:this.state.isPaymentPaneOpen,
  })

}

ClosePaymentFunc(){

  this.state.isPaymentPaneOpen= false;

  this.setState({
    isPaymentPaneOpen:this.state.isPaymentPaneOpen,
  })


}


BackbtnFunc() {
  ReactDOM.render(
  <Router>
  <div>
  
  <Route path="/" component={ReportMenuPage} />
  
  
  </div>
  </Router>,
  document.getElementById('contentRender'));
  registerServiceWorker();
  }

  render() {
  
    return (

      <div class="container">

{/* <RazorPay/>  */}

<div className="">
                    <div class=" ">
            <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />

            </div>
                <div class="inv_HeaderCls">
                <h3 className="text-center"> Payment Report</h3>   
                </div>
          </div>
{/* <div class="">
<button type="button" id="print" class="btn btn-default "
onClick={() => this.printdiv()} >
<i class="fa fa-print" aria-hidden="true"
style={{ fontSize: "17px", border: "none",color:"#fff"}}> Print</i></button>
</div> */}

          
{/* <div className="inv_list_cls_sel_search">
<label>Payment Status</label>
                    <SelectSearch options={this.state.paymentOptions} value={this.state.selectedPaymentOption}
                      isMulti={false}
                      onChange={(e) => this.handlePaymentStatus(e)} name="WorkingSite" placeholder="Select Working Site " />
                  </div> */}

          <div>

{/*
               <FaIcons.FaEye data-tip data-for="viewInvoiceTip"  onClick={() => this.onViewInvoice()}   /> 
               <GiIcons.GiWallet data-tip data-for="payInvoiceTip"  onClick={() => this.onInvoicePay()} />
 
               <ReactTooltip id="viewInvoiceTip" place="top" effect="solid">
            View Invoice
      </ReactTooltip>

        <ReactTooltip id="payInvoiceTip" place="top" effect="solid">
            Pay Invoice
      </ReactTooltip>  */}


          
     
              <div>
            
               <ReactTable style={{ overflow: "auto" }}
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
                  getTdProps={this.onTrRowClick}
                 /* getTrProps={(state, rowInfo, column) => {
                    return {
                      style: {
                        backgroundColor: rowInfo ? rowInfo.original.rowopted === "yes" ? '#00afec' : '' : '',
                      }
                    }
                  }} */
                />

              </div>


   

          </div>
        </div>


    );
  }

}

export default CustomerPaymentHistory;
