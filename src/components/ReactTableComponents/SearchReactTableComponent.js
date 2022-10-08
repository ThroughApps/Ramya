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

import * as FaIcons from "react-icons/fa";
import * as GiIcons from 'react-icons/gi';
import ReactTooltip from 'react-tooltip';

import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from '../ConstSiteFunction';


export default class SearchReactTableComponent extends Component {

  constructor(data) {
    super(data)

    this.state = {
      companyId: '',
      customerId: '',
      data: [],
      columns: [],
      paymentOptions: [],
      invoiceNo: '',

    }


    this.RowDeleteFunc = this.RowDeleteFunc.bind(this);
    this.UnselectRow = this.UnselectRow.bind(this);
  }
  componentWillReceiveProps(nextProps) {

    var self = this;

    this.props.onRef(this);
    //  console.log("componentWillReceiveProps called");
    if (nextProps.stateData.deleteStatus == "false") {
      this.PopulateTableData(nextProps.data);
    }

    if (nextProps.stateData.deleteStatus == "true") {
      self.props.AfterDelete();
    }

  }

  componentDidMount() {
    SetCurrentPage("SearchReactTable");
    var self = this;

    if (this.props.stateData.deleteStatus == "false") {
      this.PopulateTableData(this.props.data)
    }

    this.props.onRef(this);
    //   this.props.onSelectRowRef(this);

    if (this.props.stateData.deleteStatus == "true") {
      self.props.AfterDelete();
    }

  }

  componentWillUnmount() {
    this.props.onRef(undefined);
    //  this.props.onSelectRowRef(undefined);
  }

  UnselectRow() {

    // alert("SEARCH UNSELECT");
    var self = this;

    self.state.selected = -1;
    self.setState({
      selected: self.state.selected
    })
  }

  RowDeleteFunc(rowIndexValue) {
    //  alert("SEARCH DATA DELETE func "+rowIndexValue);

    var self = this;
    var array = [...self.state.data]; // make a new copy of array instead of mutating the same array directly.
    array.splice(rowIndexValue, 1);

    self.state.data = [];
    self.state.data = array;
    self.setState({ data: array });

    self.state.selected = -1;
    self.setState({
      selected: self.state.selected
    })
    //  self.props.AfterDelete();

    //    self.UnselectRow();
  }

  PopulateTableData(data) {

    //   console.log("SEARCH TABLE PROPS DATA :",data);


    var self = this;
    self.state.data = [];
    self.state.columns = [];

    //    var retrieveListBased_On_Condition=_.where(data.invoiceRetrievelist,{payment_status})

    if (data.invoiceRetrievelist.length != 0) {
      // var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Invoice</th><th>Date</th><th>Customer</th><th>Contact</th><th>Status</th><th>Total$</th><th>Balance$</th></tr></thead>';

      var no = 0;
      var datavalue = 0;
      var count = 0;

      $.each(data.invoiceRetrievelist, function (i, item) {
        no = Number(no) + 1;



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
          "Site": item.site,


        };




      });

      self.state.columns = self.getColumns();
      self.setState({
        data: self.state.data,
        columns1: self.state.columns,
      })

      if (data.deleteStatus == "true") {
        self.props.AfterDelete();
      }

    }

    //  self.UnselectRow();
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
        key != "Advisor" //&&
        // key != "VehicleMake" &&
        // key != "VehicleModel" &&
        // key != "VehicleFuelType"


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

  onTrRowClick = (state, rowInfo, column, instance) => {
    var self = this;

    //   console.log("ROW INFO :",rowInfo);

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
          // self.state.bookingId = rowInfo.original["Booking Id"];
          //  self.state.vehicleRegistrationNo = rowInfo.original["Vehicle No"];
          self.state.advisor = rowInfo.original["Advisor"];
          //  self.state.vehicleMake = rowInfo.original["VehicleMake"];
          //    self.state.vehicleModel = rowInfo.original["VehicleModel"];
          //   self.state.vehicleFuelType = rowInfo.original["VehicleFuelType"];


          self.setState({
            id: self.state.id,
            date: self.state.date,
            customerName: self.state.customerName,
            contact: self.state.contact,
            status: self.state.status,
            balanceAmt: self.state.balanceAmt,
            subtotal1: self.state.subtotal1,
            customerId: self.state.customerId,
            companyName: self.state.companyName,
            orderNumber: self.state.orderNumber,
            invoiceDate: self.state.invoiceDate,
            dueDate: self.state.dueDate,
            address: self.state.address,
            gstNo: self.state.gstNo,
            email: self.state.email,
            advance: self.state.advance,
            discount: self.state.discount,
            paymentMode: self.state.paymentMode,
            staffId: self.state.staffId,
            serviceBy: self.state.serviceBy,
            bookingId: self.state.bookingId,
            vehicleRegistrationNo: self.state.vehicleRegistrationNo,
            advisor: self.state.advisor,
            vehicleMake: self.state.vehicleMake,
            vehicleModel: self.state.vehicleModel,
            vehicleFuelType: self.state.vehicleFuelType,


          })

          this.state.rowIndexValue = rowInfo.index;
          self.props.RowClickFunc(self.state);
        },
        style: {
      // background: rowInfo.index === this.state.selected ? 'rgb(164, 23, 107)' : '',
      background: rowInfo.index === this.state.selected ? 'rgb(66 139 202)' : '',
      color: rowInfo.index === this.state.selected ? 'white' : '' // color: rowInfo.index === this.state.selected ? 'white' : 'black'
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

  render() {

    return (

      <div class="container">

        <h3> Search Results </h3>
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

