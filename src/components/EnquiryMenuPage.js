
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

import ReactTable from "react-table";
import "react-table/react-table.css";

import moment from 'moment';
import Enquiry from './Enquiry';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
import { SiteDropDown, FilterOptions } from './SiteDropDown';
import { EnquiryIcons } from './ServiceRegistration/IconComponents';
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import * as SiIcons from 'react-icons/si';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';



const ct = require('countries-and-timezones');



var productArray = [];
var enquiryProductListArray = [];

var days1;
var smsDetailsArray = [];

var rowIndexArray = [];
var rowIndexRemoveArray = [];
var dataList = [];

class EnquiryMenuPage extends Component {

  constructor() {
    super()
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8);


    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    var year = today.getFullYear();
    var month = (today.getMonth() + 1);

    var fromDate = new Date(today.getFullYear(), today.getMonth(), 1);

    var toDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    fromDate = moment(fromDate).format("YYYY-MM-DD");
    toDate = moment(toDate).format("YYYY-MM-DD");

    var monthName = moment().month(month - 1).format('MMMM');



    this.state = {
      companyId: companyId,
      companyName: companyName,
      date: date,
      data: [],
      columns: [],
      year: year,
      month: month,
      fromDate: fromDate,
      toDate: toDate,
      monthName: monthName,
      dispyear: year,
      selected: [],
      site: GetCurrentSite(),

    }

    this.AddEnquiry = this.AddEnquiry.bind(this);
    this.SMSEnquiry = this.SMSEnquiry.bind(this);
    this.DeleteEnquiry = this.DeleteEnquiry.bind(this);

  }

  componentDidMount() {
SetCurrentPage("Enquirymenu");
    var self = this;


    $(".btn-default").css("background-color", "#05a4b5");
    $(".btn-default").css("color", "white");

    smsDetailsArray = [];
    rowIndexArray = [];
    rowIndexRemoveArray = [];


    $('.checkboxclass').prop('checked', false);

    $(document).ready(function () {
      $(":checkbox").click(function () {
        var id = $(this).attr('id');
        var isChecked = $(this).attr('checked');


        if ($('#' + id).is(":checked")) {


          var checkedData = self.state.data[id];


          var smsDetails = {
            'customerId': checkedData.CustomerId, 'customerName': checkedData.CustomerName, 'contactNo': checkedData.ContactNo,
            'productName': checkedData.ProductName, 'date': checkedData.Date
          };

          var currentProductData = _.where(productArray, { productName: checkedData.ProductName });



          if (currentProductData.length == 0) {
            //ITEM DOESNOT EXIST
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'The product ' + checkedData.ProductName + ' doesnot exist, do you still want to proceed',
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: 'Yes',
              cancelButtonText: 'No'
            }).then((result) => {
              if (result.value) {

                smsDetailsArray.push(smsDetails);

              } else if (result.dismiss === Swal.DismissReason.cancel) {
                $('#' + id).prop('checked', false);

              }
            })

          } else {
            //ITEM  EXIST CHECK FOR QUANTITY
            var currentProductQuantity = currentProductData[0].quantity;

            if (Number(currentProductQuantity) > 0 && Number(currentProductQuantity) >= Number(checkedData.Quantity)) {
              smsDetailsArray.push(smsDetails);


            } else {

              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'The product ' + checkedData.ProductName + ' is not in sufficient quantity as per the request, do you still want to proceed',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
              }).then((result) => {
                if (result.value) {

                  smsDetailsArray.push(smsDetails);

                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  $('#' + id).prop('checked', false);
                }
              })
            }



          }


        } else {
          //  console.log("NOT CHECKED ................");

          var unCheckedData = self.state.data[id];
          //   console.log("DATA :",unCheckedData);

          var indexValue = _.findLastIndex(smsDetailsArray, {
            contactNo: unCheckedData.ContactNo,
            productName: unCheckedData.ProductName, date: unCheckedData.Date
          });

          smsDetailsArray.splice(indexValue, 1);

        }


      });


    });



    $(".monthPicker").datepicker({
      dateFormat: "MM yy",
      changeMonth: true,
      changeYear: true,
      showButtonPanel: true,
      yearRange: new Date().getFullYear() - 10 + ":" + new Date().getFullYear(),
      onClose: function (dateText, inst) {
        var month = $(
          "#ui-datepicker-div .ui-datepicker-month :selected"
        ).val();
        var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
        $(this).val($.datepicker.formatDate("MM yy", new Date(year, month, 1)));
        var selectedMonth = Number(month) + 1;
        self.state.monthName = moment().month(selectedMonth - 1).format('MMMM');
        self.state.dispyear = year;
        self.GetMonthData(selectedMonth, year);
      }
    });


    $(".monthPicker").focus(function () {
      $(".ui-datepicker-calendar").hide();
      $("#ui-datepicker-div").position({
        my: "center top",
        at: "center bottom",
        of: $(this)
      });
    });



    this.GetReportData();

  }











  GetMonthData(selectedMonth, year) {
    var today = new Date();
    var currentMonth = today.getMonth() + 1;
    days1 = new Date(year, selectedMonth, 0).getDate();

    smsDetailsArray = [];

    if (
      selectedMonth == "01" ||
      selectedMonth == "03" ||
      selectedMonth == "05" ||
      selectedMonth == "07" ||
      selectedMonth == "08" ||
      selectedMonth == "10" ||
      selectedMonth == "12"
    ) {
      if (selectedMonth == currentMonth) {
        this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
        this.state.toDate = year + "-" + selectedMonth + "-" + today.getDate();
      } else {
        this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
        this.state.toDate = year + "-" + selectedMonth + "-" + "31";
      }

      this.setState({
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        month: this.state.month
      });
    } else if (
      selectedMonth == "04" ||
      selectedMonth == "06" ||
      selectedMonth == "09" ||
      selectedMonth == "11"
    ) {
      if (selectedMonth == currentMonth) {
        this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
        this.state.toDate = year + "-" + selectedMonth + "-" + today.getDate();
      } else {
        this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
        this.state.toDate = year + "-" + selectedMonth + "-" + "30";
      }
      this.setState({
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        month: this.state.month
      });
    } else if (selectedMonth == "02") {
      if (year % 100 == 0 && year % 400 == 0 && year % 4 == 0) {
        if (selectedMonth == currentMonth) {
          this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
          this.state.toDate =
            year + "-" + selectedMonth + "-" + today.getDate();
        } else {
          this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
          this.state.toDate = year + "-" + selectedMonth + "-" + "29";
        }
        this.setState({
          fromDate: this.state.fromDate,
          toDate: this.state.toDate,
          month: this.state.month
        });
      } else {
        if (selectedMonth == currentMonth) {
          this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
          this.state.toDate =
            year + "-" + selectedMonth + "-" + today.getDate();
        } else {
          this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
          this.state.toDate = year + "-" + selectedMonth + "-" + "28";
        }
        this.setState({
          fromDate: this.state.fromDate,
          toDate: this.state.toDate,
          month: this.state.month
        });
      }
    }

    this.SubmitFunc();
  }

  SubmitFunc() {

    var self = this;

    self.state.data = [];
    self.state.columns = [];

    self.setState({
      data: self.state.data,
      columns: self.state.columns

    })

    var CurrentDate = new Date();
    var GivenDate = new Date(this.state.fromDate);
    var self = this;
    if (this.state.fromDate.trim().length > 0 && this.state.toDate.trim().length > 0) {
      if (GivenDate > CurrentDate) {
        this.state.fromDate = "";
        this.state.today = "";

        Swal.fire({
          position: 'center',
          icon: 'error',
          title: "You Cannot See Reports For Future Dates.",
          showConfirmButton: false,
          timer: 2000
        })

        $(".monthPicker").val("");
      } else {

        this.GetReportData()

      }
    }



  }



  GetReportData() {

    var self = this;

    productArray = [];
    enquiryProductListArray = [];

    self.state.data = [];
    self.state.columns = [];

    self.setState({
      data: self.state.data,
      columns: self.state.columns

    })

    var no = 0;


    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
        month: this.state.month,
        year: this.state.year,
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        empSites: GetEmployeeSite(),
      }),
      url: "http://15.206.129.105:8080/ThroughBooksCOAPI/enquiry/EnquiryReport",
      // url: "http://localhost:8081/EmployeeAttendenceAPI/MandatoryFieldsConfig/GetAllFieldsData",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {

        console.log("DATA :", data);


        productArray = data.productList;
        dataList = data.enquiryProductList;
        self.handleSite(self.state.site);

        enquiryProductListArray = data.enquiryProductList;
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



  onTrRowClick = (self, state, rowInfo) => {
    var self = this;


    /*  this.setState({
        selected: rowInfo.index
      });
      */


    this.state.rowIndexValue = rowInfo.index;

    var rowIndex = rowInfo.index;

    if (!_.contains(rowIndexArray, rowInfo.index)) {
      /* if(_.contains(rowIndexRemoveArray,rowInfo.index)){
           var index=_.indexOf(rowIndexRemoveArray, rowInfo.index);
           rowIndexRemoveArray.splice(index,1);
       }
   rowIndexArray.push(rowInfo.index);
   */
      var result = this.Add_To_SMSDetailsArray(rowInfo.index)
      result.then(function (response) {



      }, function (error) {

      });


    } else {

      //  this.Remove_From_SMSDetailArray(rowInfo.index);

      var index = _.indexOf(rowIndexArray, rowInfo.index);
      rowIndexArray.splice(index, 1);
      rowIndexRemoveArray.push(rowInfo.index);


      var self = this;
      var unCheckedData = self.state.data[rowIndex];
      //   console.log("DATA :",unCheckedData);

      var indexValue = _.findLastIndex(smsDetailsArray, {
        contactNo: unCheckedData.ContactNo,
        productName: unCheckedData.ProductName, date: unCheckedData.Date
      });

      smsDetailsArray.splice(indexValue, 1);

      this.CreateNewTable();


    }



    return self.state.addStatus;



  };


  Add_To_SMSDetailsArray = async (rowIndex) => {
    return new Promise((resolve, reject) => {
      var self = this;

      //  console.log("ADD TO SMS DETAILS ARRAY ..............");

      var checkedData = self.state.data[rowIndex];
      //    console.log("DATA :",checkedData);

      var smsDetails = {
        'customerId': checkedData.CustomerId, 'customerName': checkedData.CustomerName, 'contactNo': checkedData.ContactNo,
        'productName': checkedData.ProductName, 'date': checkedData.Date
      };

      var currentProductData = _.where(productArray, { productName: checkedData.ProductName });

      // console.log("CURRENT PRODUCT DATA :", currentProductData);

      if (currentProductData.length == 0) {
        //ITEM DOESNOT EXIST

        Promise.all([
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'The product ' + checkedData.ProductName + ' doesnot exist, do you still want to proceed',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.value) {

              smsDetailsArray.push(smsDetails);

              this.state.addStatus = "Yes";
              if (_.contains(rowIndexRemoveArray, rowIndex)) {
                //   console.log("REMOVE INDEX CONTAINS THE INDEX :",rowIndex);
                var index = _.indexOf(rowIndexRemoveArray, rowIndex);
                rowIndexRemoveArray.splice(index, 1);
              }
              rowIndexArray.push(rowIndex);
              //     console.log("INDEX  ARRAY IN IF :",rowIndexArray);


            } else if (result.dismiss === Swal.DismissReason.cancel) {


              this.state.addStatus = "No";
              var index = _.indexOf(rowIndexArray, rowIndex);
              rowIndexArray.splice(index, 1);
              rowIndexRemoveArray.push(rowIndex);


            }
          })
          //  asyncFunc2(),
        ])
          .then(([result1, result2]) => {
            //   console.log("RESOLVE SUCCESS ......");

            //    console.log("SMMS DETAILS ARRAY :", smsDetailsArray);

            //    console.log("INDEX  ARRAY :", rowIndexArray);
            //    console.log("REMOVE INDEX  ARRAY :", rowIndexRemoveArray);
          })
          .catch(err => {
            // Receives first rejection among the Promises
            //   console.log("REJECT ERROR ......");
          });




      } else {
        //ITEM  EXIST CHECK FOR QUANTITY
        var currentProductQuantity = currentProductData[0].quantity;

        if (Number(currentProductQuantity) > 0 && Number(currentProductQuantity) >= Number(checkedData.Quantity)) {
          smsDetailsArray.push(smsDetails);

          if (_.contains(rowIndexRemoveArray, rowIndex)) {
            //    console.log("REMOVE INDEX CONTAINS THE INDEX :",rowIndex);
            var index = _.indexOf(rowIndexRemoveArray, rowIndex);
            rowIndexRemoveArray.splice(index, 1);
          }
          rowIndexArray.push(rowIndex);
          //     console.log("INDEX  ARRAY IN IF :",rowIndexArray);

          this.state.addStatus = "Yes";

        } else {


          Promise.all([
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'The product ' + checkedData.ProductName + ' is not in sufficient quantity as per the request, do you still want to proceed',
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: 'Yes',
              cancelButtonText: 'No'
            }).then((result) => {
              if (result.value) {

                smsDetailsArray.push(smsDetails);
                this.state.addStatus = "Yes";
                if (_.contains(rowIndexRemoveArray, rowIndex)) {
                  //   console.log("REMOVE INDEX CONTAINS THE INDEX :",rowIndex);
                  var index = _.indexOf(rowIndexRemoveArray, rowIndex);
                  rowIndexRemoveArray.splice(index, 1);
                }
                rowIndexArray.push(rowIndex);
                //    console.log("INDEX  ARRAY IN IF :",rowIndexArray);

                resolve(this.state.addStatus);

              } else if (result.dismiss === Swal.DismissReason.cancel) {

                var index = _.indexOf(rowIndexArray, rowIndex);
                rowIndexArray.splice(index, 1);
                rowIndexRemoveArray.push(rowIndex);

                this.state.addStatus = "No";

              }
              resolve(this.state.addStatus);
            })
          ])
            .then(([result1, result2]) => {



            })
            .catch(err => {
              // Receives first rejection among the Promises

            });



        }



      }

      this.setState({
        addStatus: this.state.addStatus
      })

    });

  }


  Remove_From_SMSDetailArray(rowIndex) {


    var self = this;
    var unCheckedData = self.state.data[rowIndex];


    var indexValue = _.findLastIndex(smsDetailsArray, {
      contactNo: unCheckedData.ContactNo,
      productName: unCheckedData.ProductName, date: unCheckedData.Date
    });

    smsDetailsArray.splice(indexValue, 1);

    this.CreateNewTable();



  }


  onTrRowClickNew = (state, rowInfo, column, instance) => {
    var self = this;

    if (typeof rowInfo !== "undefined") {
      return {
        onClick: (e, handleOriginal) => {
          this.setState({
            selected: rowInfo.index
          });
          if (handleOriginal) {
            handleOriginal()
          }

          this.state.rowIndexValue = rowInfo.index;

          var rowIndex = rowInfo.index;

          if (!_.contains(rowIndexArray, rowInfo.index)) {

            /*if(_.contains(rowIndexRemoveArray,rowInfo.index)){
                  var index=_.indexOf(rowIndexRemoveArray, rowInfo.index);
                  rowIndexRemoveArray.splice(index,1);
              }
                
              rowIndexArray.push(rowInfo.index);
              */



            var checkedData = this.state.data[rowIndex];


            var smsDetails = {
              'customerId': checkedData.CustomerId, 'customerName': checkedData.CustomerName, 'contactNo': checkedData.ContactNo,
              'productName': checkedData.ProductName, 'date': checkedData.Date
            };

            var currentProductData = _.where(productArray, { productName: checkedData.ProductName });



            if (currentProductData.length == 0 && checkedData.ProductType == "product") {
              //ITEM DOESNOT EXIST

              this.AddData_To_SMS_NotExist(rowIndex, checkedData, smsDetails);


            } else if (currentProductData.length > 0 && checkedData.ProductType == "product") {
              //ITEM  EXIST CHECK FOR QUANTITY
              var currentProductQuantity = currentProductData[0].quantity;

              if (Number(currentProductQuantity) > 0 && Number(currentProductQuantity) >= Number(checkedData.Quantity)) {
                smsDetailsArray.push(smsDetails);

                if (_.contains(rowIndexRemoveArray, rowIndex)) {

                  var index = _.indexOf(rowIndexRemoveArray, rowIndex);
                  rowIndexRemoveArray.splice(index, 1);
                }
                rowIndexArray.push(rowIndex);


                this.state.addStatus = "Yes";

              } else {

                this.AddData_To_SMS_OutOfStock(rowIndex, checkedData, smsDetails);


              }



            } else if (checkedData.ProductType == "service") {
              if (_.contains(rowIndexRemoveArray, rowInfo.index)) {
                var index = _.indexOf(rowIndexRemoveArray, rowInfo.index);
                rowIndexRemoveArray.splice(index, 1);
              }

              rowIndexArray.push(rowInfo.index);

              smsDetailsArray.push(smsDetails);


            }


          } else {

            //  this.Remove_From_SMSDetailArray(rowInfo.index);

            /* var index = _.indexOf(rowIndexArray, rowInfo.index);
             rowIndexArray.splice(index, 1);
             rowIndexRemoveArray.push(rowInfo.index);
 
 
             smsDetailsArray.splice(index, 1);
 */
            //   this.CreateNewTable();

            var index = _.indexOf(rowIndexArray, rowInfo.index);
            rowIndexArray.splice(index, 1);
            rowIndexRemoveArray.push(rowInfo.index);


            var self = this;
            var unCheckedData = self.state.data[rowIndex];


            var indexValue = _.findLastIndex(smsDetailsArray, {
              contactNo: unCheckedData.ContactNo,
              productName: unCheckedData.ProductName, date: unCheckedData.Date
            });

            smsDetailsArray.splice(indexValue, 1);

            this.CreateNewTable();


          }

        },
        style: {
          background: _.contains(rowIndexArray, rowInfo.index) ? 'rgb(164, 23, 107)' : _.contains(rowIndexRemoveArray, rowInfo.index) ? "" : "",
          color: _.contains(rowIndexArray, rowInfo.index)  ? 'white' :_.contains(rowIndexRemoveArray, rowInfo.index) ? "" : ""
          //   background: rowInfo.index === this.state.selected ? '#00afec' :'',
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


  AddData_To_SMS_NotExist(rowIndex, checkedData, smsDetails) {


    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'The product ' + checkedData.ProductName + ' doesnot exist, do you still want to proceed',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {

        smsDetailsArray.push(smsDetails);

        this.state.addStatus = "Yes";
        if (_.contains(rowIndexRemoveArray, rowIndex)) {

          var index = _.indexOf(rowIndexRemoveArray, rowIndex);
          rowIndexRemoveArray.splice(index, 1);
        }
        rowIndexArray.push(rowIndex);

        this.CreateNewTable();

      } else if (result.dismiss === Swal.DismissReason.cancel) {


        this.state.addStatus = "No";

        /*var index=_.indexOf(rowIndexArray, rowIndex);
          rowIndexArray.splice(index,1);
          rowIndexRemoveArray.push(rowIndex);  
          */
        this.CreateNewTable();

      }
    })


  }


  AddData_To_SMS_OutOfStock(rowIndex, checkedData, smsDetails) {


    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'The product ' + checkedData.ProductName + ' is not in sufficient quantity as per the request, do you still want to proceed',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {

        smsDetailsArray.push(smsDetails);
        this.state.addStatus = "Yes";
        if (_.contains(rowIndexRemoveArray, rowIndex)) {
          var index = _.indexOf(rowIndexRemoveArray, rowIndex);
          rowIndexRemoveArray.splice(index, 1);
        }
        rowIndexArray.push(rowIndex);
        this.CreateNewTable();


      } else if (result.dismiss === Swal.DismissReason.cancel) {

        /*  var index=_.indexOf(rowIndexArray,rowIndex);
              rowIndexArray.splice(index,1);
              rowIndexRemoveArray.push(rowIndex); 
              */

        this.state.addStatus = "No";
        this.CreateNewTable();

      }

    })




  }

  CreateNewTable() {



    var self = this;

    self.state.data = [];
    self.state.columns = [];

    self.setState({
      data: self.state.data,
      columns: self.state.columns
    })


    var no = 0;
    $.each(enquiryProductListArray, function (i, item) {

      no = Number(no) + Number(1);

      var rowopted = "no";

      if (_.contains(rowIndexArray, i)) {
        rowopted = "yes";
      }

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
      }


      self.state.data[i] = {
        "SNo": no,
        /* "Select": <div id="enquirycheckbox" style={{ textAlign: "center" }}>
           <span style={{ fontSize: '1em', color: 'white' }}>
             <input type="checkbox" id={i} class="checkboxclass" />
           </span></div>,
           */
        "Date": item.date,
        "ProductName": item.productName,
        "ProductType": item.productType,
        "Quantity": item.quantity,
        "CustomerName": item.customerName,
        "ContactNo": item.contactNo,
        "AssistedBy": item.staffName,
        "CustomerId": item.customerId,
        "MessageCount": item.messageCount,
        "rowopted": rowopted,
        "Status": productStatus,
      };

    });

    self.state.columns = self.getColumns();

    self.setState({
      data: self.state.data,
      columns: self.state.columns,
    });

  }



  SendDataToDB(url) {

    var self = this;

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
        smsDetails: JSON.stringify(smsDetailsArray),
        companyName: this.state.companyName,
        year: this.state.year,
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        empSites: GetEmployeeSite(),
      }),
      url: url,
      // url: "http://localhost:8081/EmployeeAttendenceAPI/MandatoryFieldsConfig/GetAllFieldsData",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {



        if (data.response == "SMSSuccess") {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Reminder message for the customers are sent',
            showConfirmButton: false,
            timer: 2000
          })
        } else if (data.response == "DeleteSuccess") {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Delete the selected Enquiry',
            showConfirmButton: false,
            timer: 2000
          })
        }

        smsDetailsArray = [];
        productArray = [];
        enquiryProductListArray = [];


        self.state.data = [];
        self.state.columns = [];
        rowIndexArray = [];
        rowIndexRemoveArray = [];

        self.setState({
          data: self.state.data,
          columns: self.state.columns
        })

        productArray = data.productList;
        //     $('.checkboxclass').prop('checked', false);
        dataList = data.enquiryProductList;
        self.handleSite(self.state.site);
        enquiryProductListArray = data.enquiryProductList;


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
        } else if (item.productType == "service") {
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

      self.setState({
        data: self.state.data,
        columns: self.state.columns,
      });

    }


    console.log("after drop down ", self.state.data);
  }


  /* ********** NEW ICON FUNCTIONS ************ */
  AddEnquiry() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={Enquiry} />
        </div>
      </Router>,
      document.getElementById('contentRender'));

  }

  SMSEnquiry() {
    var self = this;



    if (smsDetailsArray.length > 0) {

      var url = "http://15.206.129.105:8080/ThroughBooksCOAPI/enquiry/SMSEnquiry";
      this.SendDataToDB(url);

    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'No item selected to remind your customer',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }

  DeleteEnquiry() {

    var self = this;

    if (smsDetailsArray.length > 0) {

      var url = "http://15.206.129.105:8080/ThroughBooksCOAPI/enquiry/DeleteEnquiry";
      this.SendDataToDB(url);

    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'No item selected to delete',
        showConfirmButton: false,
        timer: 2000
      })
    }

  }

  BackbtnFunc(){
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

      <div className="container" >
       <div className="">
<div className="">
            <BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
          </div>
          <div class="inv_HeaderCls">
            <h3>Enquiry Report <span className="centerAlign hideContent">
                for {this.state.monthName} {this.state.dispyear}</span>
            </h3>
          </div>
          <div class="">
       {/*      <button type="button" id="print" class="btn btn-default btn_rpt_print "
              onClick={() => this.printdiv('printarea')} >
              <i class="fa fa-print" aria-hidden="true"
                style={{ fontSize: "17px", border: "none" }}> Print</i></button> */}
          </div>
        </div>
        <div className="" id="printarea " >

       

          <div className="repot_sub_dwldbtn_cls_yearly">

            <div class="btn-group" >
              {/* <label for="month">Select Month and Year:  </label> */}
              <input
                type="text"
                id="month"
                name="month"
                class="monthPicker form-control"
                autocomplete="off"
                placeholder="Select Month And Year"
              />
            </div>


            <div class="text_right_report_yerly">
              <div>
                <SiteDropDown onSiteDropDown={this.handleSite} data={this.state.site} />
              </div>

              <div class="buttonright_report" >
                <EnquiryIcons onAddEnquiry={this.AddEnquiry}
                  onSmsEnquiry={this.SMSEnquiry}
                  onEnquiryDelete={this.DeleteEnquiry} />
              </div>
            </div>
          </div>

          <div class="" style={{ marginTop: "0px" }}>
            {/*      <h3 style={{ textAlign: "center" }}>Enquiry Report</h3>
          <h4 className="centerAlign " style={{ textAlign: "center" }}><span className="centerAlign hideContent">  {this.state.monthName} {this.state.dispyear}</span> </h4>

 <div class="card-body">
            <div class="form-horizontal form-bordered">
              <div class="text-right">
                <SiteDropDown onSiteDropDown={this.handleSite} data={this.state.site}/>
              </div>
            </div>
          </div>
  */}


    {/*         <div className="row" >
              <div className="col-sm-4 col-lg-2 col-md-2 ">
              </div>
              <div className="col-sm-4 col-lg-2 col-md-2 ">


              </div>
              <div className="col-sm-4 col-lg-2 col-md-2 ">


              </div>
              <div className="col-sm-4 col-lg-2 col-md-2 ">


              </div>


              <div className="col-sm-4 col-lg-4 col-md-4" >

                <div style={{ display: "flex" }} >

                  <EnquiryIcons onAddEnquiry={this.AddEnquiry}
                    onSmsEnquiry={this.SMSEnquiry}
                    onEnquiryDelete={this.DeleteEnquiry} />

                </div>
              </div>



            </div> */}

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
              // getTdProps={this.onColumnClick}
              getTdProps={this.onTrRowClickNew}
              getTrProps={(state, rowInfo, column) => {
                return {
                  style: {
                    backgroundColor: rowInfo ? rowInfo.original.rowopted === "yes" ?'rgb(164, 23, 107)' : '' : '',
                    color: rowInfo ? rowInfo.original.rowopted === "yes"  ? 'white' : '': ''
                  }
                }
              }}
            />
          </div>
        </div >
        </div >

    );
  }
}

export default EnquiryMenuPage;