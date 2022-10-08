import React, { Component,forwardRef } from 'react';
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

import * as FaIcons from "react-icons/fa";  
import * as GiIcons from 'react-icons/gi';
import ReactTooltip from 'react-tooltip';

import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from '../ConstSiteFunction';

var itemData;
var localPageData=[] ;
var dataCountArray =[];
var count = 0;

export default class NormalReactTableComponent extends  Component {

  constructor(data) {
    super(data)
  
    this.state = {
     companyId:'',
     customerId:'',
     data:[],
     columns:[],
     paymentOptions:[],
     invoiceNo:'',
    
    }

    this.RowDeleteFunc=this.RowDeleteFunc.bind(this);
    this.UnselectRow=this.UnselectRow.bind(this);
  }


  componentWillReceiveProps(nextProps){

    var self=this;
    console.log("componentWillReceiveProps called",nextProps);

    this.props.onRef(this);

    /*  if(nextProps.stateData.oldPageAcces=="true" && nextProps.stateData.deleteStatus=="false"){
      //  alert("TRUE");
      this.PopulateTableOldData(nextProps);
    //  this.UnselectRow();
    }else if (nextProps.stateData.oldPageAcces=="false" && nextProps.stateData.deleteStatus=="false"){
     // alert("FALSE");
      this.PopulateTableData(nextProps.data);
     // this.UnselectRow();
    }  */

   /* if(this.props.stateData.deleteStatus=="false"){
      self.props.AfterDelete();
    } */

  if (nextProps.stateData.deleteStatus=="false"){
     // alert("FALSE");
      this.PopulateTableData(nextProps.data);
    }  

    if(nextProps.stateData.deleteStatus=="true"){
      self.props.AfterDelete();
      }


  }

  componentDidMount() {
    SetCurrentPage("NormalReactTable");
    console.log("COMPONENT DID MOUNT called",this.props);
    
var self=this;

this.props.onRef(this);

   /* if(this.props.stateData.oldPageAcces=="true" && this.props.stateData.deleteStatus=="false"){
    //  alert("TRUE");
      this.PopulateTableOldData(this.props);
    //  this.UnselectRow();
    }else if(this.props.stateData.oldPageAcces=="false" && this.props.stateData.deleteStatus=="false"){
   //   alert("FALSE");
      this.PopulateTableData(this.props.data);
   //   this.UnselectRow();
    }  */
    
   
  //  this.props.onSelectRowRef(this);

  if(this.props.stateData.deleteStatus=="false"){
   //   alert("FALSE");
      this.PopulateTableData(this.props.data);
   //   this.UnselectRow();
    } 
  
    if(this.props.stateData.deleteStatus=="true"){
      self.props.AfterDelete();
      }

  }


  componentWillUnmount() {

  //  this.UnselectRow();

    this.props.onRef(undefined);
 //   this.props.onSelectRowRef(undefined);
  }
 


  PopulateTableData(data){

 //   console.log("NORMAL TABLE PROPS DATA :",data);

    var self=this;
    self.state.data=[];
    self.state.columns=[];
    this.state.toweResponse=data.toweResponse;
    
    this.setState({
      toweResponse:this.state.toweResponse,
    })
    if (data.saleinvoicereportlist.length != 0) {
      // var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Invoice</th><th>Date</th><th>Customer</th><th>Contact</th><th>Status</th><th>Total$</th><th>Balance$</th></tr></thead>';

      var no = 0;
      self.state.downloadData = "yes";
      if (itemData == "1") {
        self.state.totlaItemCount=data.totlaItemCount;

        itemData = Number(itemData) + 1;
      }


      localPageData[self.state.activePage] = [];
      localPageData[self.state.activePage].push(data.saleinvoicereportlist);
      var datavalue = 0;
      var count = 0;

      $.each(data.saleinvoicereportlist, function (i, item) {
        no = Number(no) + 1;

   
      
        var viewclass = "";

        if (self.state.toweResponse == "DataExist") {

          self.state.data[i] = {
            "SNo": no,
            "Invoice": item.invoiceNo,
            "Date": item.date,
           // "Booking Id": item.bookingId,
           // "Vehicle No": item.vehicleRegistrationNo,
            "Customer": item.customerName,
            "Contact": item.contactNo,
            "Status": item.payment_status,
            "Total": item.subtotal1,
            "Paid Amount": item.advance,
            "Balance": item.balance_amount,
            "BilledBy": item.staffId,
            "CustomerId": item.customerId,
            "CompanyName": item.companyName,
            "orderNumber": item.orderNumber,
            "invoiceDate": item.invoiceDate,
            "dueDate": item.dueDate,
            "address": item.address,
            "gstNo": item.gstNo,
            "email": item.email,
            "advance": item.advance,
            "discount": item.discount,
            "PaymentMode": item.paymentMode,
            "StaffId": item.staffId,
            "ServiceBy": item.serviceBy,
            "Advisor": item.advisor,
            "Remark": item.remark,
            "Site": item.site,
          };




        } else {

          self.state.data[i] = {
            "SNo": no,
            "Invoice": item.invoiceNo,
            "Date": item.date,
          //  "Booking Id": item.bookingId,
         //   "Vehicle No": item.vehicleRegistrationNo,
            "Customer": item.customerName,
            "Contact": item.contactNo,
            "Status": item.payment_status,
            "Total": item.subtotal1,
            "Paid Amount": item.advance,
            "Balance": item.balance_amount,
            "BilledBy": item.staffId,
            "CustomerId": item.customerId,
            "CompanyName": item.companyName,
            "orderNumber": item.orderNumber,
            "invoiceDate": item.invoiceDate,
            "dueDate": item.dueDate,
            "address": item.address,
            "gstNo": item.gstNo,
            "email": item.email,
            "advance": item.advance,
            "discount": item.discount,
            "PaymentMode": item.paymentMode,
            "StaffId": item.staffId,
            "ServiceBy": item.serviceBy,
            "Advisor": item.advisor,
            "Site": item.site,
          };


        }

      });

      self.state.columns = self.getColumns();

      // $("#tableHeadings").append(tab);
      var dataCount1 = data.dataCount;

      var dataCount_Status = _.contains(dataCountArray, dataCount1);


      if (dataCount_Status == false) {
        dataCountArray.push(dataCount1);
      }


    } else {
      itemData = "1";
      self.state.totlaItemCount = 0;
      self.state.downloadData = "no";
      $("#test-table-xls-button").hide();
      $("#myInput").hide();
   
    }

   

  }

  onTrRowClick = (state, rowInfo, column, instance) => {
    var self = this;

       console.log("ROW INFO :",rowInfo);

    if (typeof rowInfo !== "undefined") {
      return {
        onClick: (e, handleOriginal) => {
          this.setState({
            selected: rowInfo.index
          });
          if (handleOriginal) {
            handleOriginal()
          }



          self.state.id = rowInfo.original["Invoice"];
          self.state.date = rowInfo.original["Date"];
          self.state.customerName = rowInfo.original["Customer"];
          self.state.contact = rowInfo.original["Contact"];
          self.state.status = rowInfo.original["Status"];
          self.state.balanceAmt = rowInfo.original["Balance"];
          self.state.subtotal1 = rowInfo.original["Total"];
          self.state.customerId = rowInfo.original["CustomerId"];
          self.state.companyName = rowInfo.original["CompanyName"];
          self.state.orderNumber = rowInfo.original["orderNumber"];
          self.state.invoiceDate = rowInfo.original["invoiceDate"];
          self.state.dueDate = rowInfo.original["dueDate"];
          self.state.address = rowInfo.original["address"];
          self.state.gstNo = rowInfo.original["gstNo"];
          self.state.email = rowInfo.original["email"];
          self.state.advance = rowInfo.original["advance"];
          self.state.discount = rowInfo.original["discount"];
          self.state.paymentMode = rowInfo.original["PaymentMode"];
          self.state.staffId = rowInfo.original["StaffId"];
          self.state.serviceBy = rowInfo.original["ServiceBy"];
          self.state.advisor = rowInfo.original["Advisor"];
          self.state.siteName= rowInfo.original["Site"];
       //   self.state.vehicleMake = rowInfo.original["VehicleMake"];
       //   self.state.vehicleModel = rowInfo.original["VehicleModel"];
        //  self.state.vehicleFuelType = rowInfo.original["VehicleFuelType"];
//

          this.state.rowIndexValue = rowInfo.index;

          self.setState({
            id:self.state.id,
            date:self.state.date,
            customerName:self.state.customerName ,
            contact:self.state.contact,
            status:self.state.status,
            balanceAmt:self.state.balanceAmt,
            subtotal1:self.state.subtotal1,
            customerId:self.state.customerId,
            companyName:self.state.companyName,
            orderNumber:self.state.orderNumber ,
            invoiceDate:self.state.invoiceDate,
            dueDate:self.state.dueDate,
            address:self.state.address,
            gstNo:self.state.gstNo,
            email:self.state.email,
            advance:self.state.advance,
            discount:self.state.discount ,
            paymentMode:self.state.paymentMode,
            staffId:self.state.staffId,
          
            serviceBy:self.state.serviceBy,
         //   bookingId:self.state.bookingId,
          //  vehicleRegistrationNo:self.state.vehicleRegistrationNo,
          
            advisor:self.state.advisor,
        
         //   vehicleMake:self.state.vehicleMake,
         //   vehicleModel:self.state.vehicleModel,
          //  vehicleFuelType: self.state.vehicleFuelType,
            rowIndexValue:self.state.rowIndexValue,
            siteName:self.state.siteName,

          })

          self.props.RowClickFunc(self.state);
        },
        style: {
          //background: rowInfo.index === this.state.selected ? 'rgb(164, 23, 107)' : '',
          background: rowInfo.index === this.state.selected ? 'rgb(66 139 202)' : '',
          color: rowInfo.index === this.state.selected ? 'white' : ''
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

  RowDeleteFunc(rowIndexValue) {
  //  alert("NORMAL DATA DELETE func "+rowIndexValue);

   // console.log("ROW DELETE THIS before :",this);
    var self=this;
    var array = [...self.state.data]; // make a new copy of array instead of mutating the same array directly.
    array.splice(rowIndexValue, 1);

    self.state.data = [];
    self.state.data = array;
    self.setState({ data: array }); 
       
  //  console.log("ROW DELETE THIS AFTER :",this);
  
    self.state.selected=-1;
    self.setState({
      selected:self.state.selected
    })
  //  self.props.AfterDelete();

   // self.UnselectRow();
  } 

  UnselectRow(){

  //  alert("NORMAL UNSELECT");
    var self=this;

    self.state.selected=-1;
    self.setState({
      selected:self.state.selected
    })
  }

  getColumns() {



    return Object.keys(this.state.data[0]).map(key => {
      if (
        key != "CustomerId" &&
        key != "CompanyName" &&
        key != "orderNumber" &&
        key != "invoiceDate" &&
        key != "dueDate" &&
        key != "address" &&
        key != "gstNo" &&
        key != "email" &&
        key != "advance" &&
        key != "discount" &&
        key != "PaymentMode" &&
        key != "StaffId" &&
        key != "ServiceBy" &&
        key != "BilledBy" &&
        key != "Advisor"  &&
        key != "VehicleMake" &&
        key != "VehicleModel" &&
        key != "VehicleFuelType"


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



  render() {
  
    return (

      <div class="container">

    

{/* <h3>NORMAL TABLE</h3>  */}
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
    );
  }

}

