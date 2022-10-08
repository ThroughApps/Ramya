import React, { Component } from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import { FormErrors } from "./FormErrors";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import CryptoJS from "crypto-js";
import FooterText from "./FooterText";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import SelectSearch from 'react-select';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
  GetCurrencies,SetCurrentPage } from './ConstSiteFunction';




class TaskMappingElite extends Component {
  constructor() {
    super();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)



    this.state = {
      permission: [],
      permissionHeader: [],
      roleName: "",
      valid: false,
      companyId: companyId,
      staffId: staffId,
      employeeName: employeeName,
      role: role,

    };
  }

  handleUserInput = e => {
    // const name = e.target.name;
    // const value = e.target.value;
    // this.setState({
    //   [name]: [value],
    //   valid: true
    // });
    this.state.roleOption = e;
    this.state.roleName = e.value;

    this.setState({
      roleOption: this.state.roleOption,
      roleName: this.state.roleName,
      valid: true
    });

    var companyId = CryptoJS.AES.decrypt(
      localStorage.getItem("CompanyId"),
      "shinchanbaby"
    ).toString(CryptoJS.enc.Utf8);
    this.state.companyId = companyId;
    // this.state.roleName = value;
    this.setState({
      companyId: companyId
    });
    var self = this;
    $.ajax({
      type: "POST",
      data: JSON.stringify({
        roleName: this.state.roleName.toString(),
        companyId: this.state.companyId.toString()
      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/taskmapping/retrievePermissionNew",

      //  url: " http://15.206.129.105:8080/ThroughBooksCOAPI/taskmapping/retrievePermissionNew",




      contentType: "application/json",
      dataType: "json",
      async: false,
      success: function (data, textStatus, jqXHR) {
        self.state.permission = [];


        self.state.permissionHeader = [];

        $(".checkBoxClass").prop("checked", false);

        if (data.employeePermisionlist.length != 0) {
          if (data.employeePermisionlist[0].permission != "") {
            $.each(data.employeePermisionlist, function (i, item) {
              $("#" + item.permission).prop("checked", true);

              self.state.permission.push(item.permission);
            });
          }
        }
        if (data.headerPermissionList.length != 0) {
          if (data.headerPermissionList[0].permission != "") {

            $.each(data.headerPermissionList, function (i, item) {

              $('input[name =' + item.permission + ']').prop("checked", true);
              self.state.permissionHeader.push(item.permission);
            });

          }
        }

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
  };


  handleCheckBoxJobCard = e => {
    const name = e.target.name;
    var i = this.state.permission.length;

    if ($("#" + name).is(":checked")) {
      $("#" + name).attr("value", "true");
      this.state.permission.push(name);

      //checking header is cjhecked or not
      if ($("#JobCard").is(":checked")) {
        //alert("no change");

      } else {
        /*  $("#navigation").attr("value", "true"); */
        $("#JobCard").prop("checked", true);
        this.state.permissionHeader.push("JobCard");

      }
    }
    //"uncheck"
    else {

      while (i--) {
        if (name == this.state.permission[i]) {
          this.state.permission.splice(i, 1);

        }
      }
      //checking all submenu is checked or not becz to remove haeder
      if (
        !$("#Jobcard").is(":checked") &&
        !$("#SaleInvoice").is(":checked") &&
        !$("#EstimateInvoice").is(":checked") &&
        !$("#CustomerPayment").is(":checked") &&
        !$("#SalesReport").is(":checked") &&
        !$("#EstimateReport").is(":checked") &&
        !$("#PaymentHistoryReport").is(":checked") &&
        !$("#PaymentReceivablesReports").is(":checked") &&
        !$("#BillDueReport").is(":checked") &&
        !$("#FeedBackReport").is(":checked") &&
        !$("#AuditReport").is(":checked") &&
        !$("#ImportLogo").is(":checked") &&
        !$("#ImportQRcode").is(":checked") &&
        !$("#Location").is(":checked") &&
        !$("#CompanySetting").is(":checked")
      ) {
        var iHeader = this.state.permissionHeader.length;
        while (iHeader--) {
          if ("JobCard" == this.state.permissionHeader[iHeader]) {
            this.state.permissionHeader.splice(iHeader, 1);

          }
        }
        $("#JobCard").prop("checked", false);
      } else {

      }
    }
  };

  handleCheckBoxInventory = e => {
    const name = e.target.name;
    var i = this.state.permission.length;

    if ($("#" + name).is(":checked")) {
      $("#" + name).attr("value", "true");
      this.state.permission.push(name);

      //checking header is cjhecked or not
      if ($("#Inventory").is(":checked")) {
        //alert("no change");

      } else {
        /*  $("#navigation").attr("value", "true"); */
        $("#Inventory").prop("checked", true);
        this.state.permissionHeader.push("Inventory");

      }
    }
    //"uncheck"
    else {

      while (i--) {
        if (name == this.state.permission[i]) {
          this.state.permission.splice(i, 1);

        }
      }
      //checking all submenu is checked or not becz to remove haeder
      if (
        !$("#ProductService").is(":checked") &&
        !$("#Vendor").is(":checked") &&
        !$("#PurchaseInvoice").is(":checked") &&
        !$("#PurchaseReport").is(":checked") &&
        !$("#ProfitandLossReport").is(":checked") &&
        !$("#InventoryReport").is(":checked")
      ) {
        var iHeader = this.state.permissionHeader.length;
        while (iHeader--) {
          if ("Inventory" == this.state.permissionHeader[iHeader]) {
            this.state.permissionHeader.splice(iHeader, 1);

          }
        }
        $("#Inventory").prop("checked", false);
      } else {

      }
    }
  };
  handleCheckBoxCRM = e => {
    const name = e.target.name;
    var i = this.state.permission.length;

    if ($("#" + name).is(":checked")) {
      $("#" + name).attr("value", "true");
      this.state.permission.push(name);

      //checking header is cjhecked or not
      if ($("#CRM").is(":checked")) {
        //alert("no change");

      } else {
        /*  $("#communication").attr("value", "true"); */
        $("#CRM").prop("checked", true);
        this.state.permissionHeader.push("CRM");

      }
    }
    //"uncheck"
    else {

      while (i--) {
        if (name == this.state.permission[i]) {
          this.state.permission.splice(i, 1);

        }
      }
      //checking all submenu is checked or not becz to remove haeder
      if (
        !$("#Vehicle").is(":checked") &&
        !$("#Customer").is(":checked") &&
        !$("#VehicleMakeandModel").is(":checked") &&
        !$("#ExportExcel").is(":checked") &&
        !$("#ImportExcel").is(":checked")
      ) {
        var iHeader = this.state.permissionHeader.length;
        while (iHeader--) {
          if ("CRM" == this.state.permissionHeader[iHeader]) {
            this.state.permissionHeader.splice(iHeader, 1);

          }
        }
        $("#CRM").prop("checked", false);
      } else {

      }
    }
  };

  handleCheckBoxEnquiry = e => {
    const name = e.target.name;
    var i = this.state.permission.length;

    if ($("#" + name).is(":checked")) {
      $("#" + name).attr("value", "true");
      this.state.permission.push(name);

      //checking header is cjhecked or not
      if ($("#Enquiry").is(":checked")) {
        //alert("no change");

      } else {
        /*  $("#timeSheet").attr("value", "true"); */
        $("#Enquiry").prop("checked", true);
        this.state.permissionHeader.push("Enquiry");

      }
    }
    //"uncheck"
    else {

      while (i--) {
        if (name == this.state.permission[i]) {
          this.state.permission.splice(i, 1);

        }
      }
      //checking all submenu is checked or not becz to remove haeder
      if (
        !$("#AddEnquiry").is(":checked") &&
        !$("#EnquiryReport").is(":checked")

      ) {
        var iHeader = this.state.permissionHeader.length;
        while (iHeader--) {
          if ("Enquiry" == this.state.permissionHeader[iHeader]) {
            this.state.permissionHeader.splice(iHeader, 1);

          }
        }
        $("#Enquiry").prop("checked", false);
      } else {

      }
    }
  };

  handleCheckBoxBookService = e => {
    const name = e.target.name;
    var i = this.state.permission.length;

    if ($("#" + name).is(":checked")) {
      $("#" + name).attr("value", "true");
      this.state.permission.push(name);

      //checking header is cjhecked or not
      if ($("#BookService").is(":checked")) {
        //alert("no change");

      } else {
        /*  $("#timeSheet").attr("value", "true"); */
        $("#BookService").prop("checked", true);
        this.state.permissionHeader.push("Enquiry");

      }
    }
    //"uncheck"
    else {

      while (i--) {
        if (name == this.state.permission[i]) {
          this.state.permission.splice(i, 1);

        }
      }
      //checking all submenu is checked or not becz to remove haeder
      if (
        !$("#AddBookService").is(":checked") &&
        !$("#BookedServiceReports").is(":checked")

      ) {
        var iHeader = this.state.permissionHeader.length;
        while (iHeader--) {
          if ("BookService" == this.state.permissionHeader[iHeader]) {
            this.state.permissionHeader.splice(iHeader, 1);

          }
        }
        $("#BookService").prop("checked", false);
      } else {

      }
    }
  };

  handleCheckBoxExpense = e => {
    const name = e.target.name;
    var i = this.state.permission.length;

    if ($("#" + name).is(":checked")) {
      $("#" + name).attr("value", "true");
      this.state.permission.push(name);

      //checking header is cjhecked or not
      if ($("#Expense").is(":checked")) {
        //alert("no change");

      } else {
        /*  $("#timeSheet").attr("value", "true"); */
        $("#Expense").prop("checked", true);
        this.state.permissionHeader.push("Expense");

      }
    }
    //"uncheck"
    else {

      while (i--) {
        if (name == this.state.permission[i]) {
          this.state.permission.splice(i, 1);

        }
      }
      //checking all submenu is checked or not becz to remove haeder
      if (
        !$("#AddExpense").is(":checked") &&
        !$("#ExpenseReport").is(":checked")

      ) {
        var iHeader = this.state.permissionHeader.length;
        while (iHeader--) {
          if ("Expense" == this.state.permissionHeader[iHeader]) {
            this.state.permissionHeader.splice(iHeader, 1);

          }
        }
        $("#Expense").prop("checked", false);
      } else {

      }
    }
  };


  handleCheckBoxEnquiry = e => {
    const name = e.target.name;
    var i = this.state.permission.length;

    if ($("#" + name).is(":checked")) {
      $("#" + name).attr("value", "true");
      this.state.permission.push(name);

      //checking header is cjhecked or not
      if ($("#Enquiry").is(":checked")) {
        //alert("no change");

      } else {
        /*  $("#timeSheet").attr("value", "true"); */
        $("#Enquiry").prop("checked", true);
        this.state.permissionHeader.push("Enquiry");

      }
    }
    //"uncheck"
    else {

      while (i--) {
        if (name == this.state.permission[i]) {
          this.state.permission.splice(i, 1);

        }
      }
      //checking all submenu is checked or not becz to remove haeder
      if (
        !$("#AddEnquiry").is(":checked") &&
        !$("#EnquiryReport").is(":checked")

      ) {
        var iHeader = this.state.permissionHeader.length;
        while (iHeader--) {
          if ("Enquiry" == this.state.permissionHeader[iHeader]) {
            this.state.permissionHeader.splice(iHeader, 1);

          }
        }
        $("#Enquiry").prop("checked", false);
      } else {

      }
    }
  };



  handleCheckBoxEmployee = e => {
    const name = e.target.name;
    var i = this.state.permission.length;

    if ($("#" + name).is(":checked")) {
      $("#" + name).attr("value", "true");
      this.state.permission.push(name);

      //checking header is cjhecked or not
      if ($("#Employee").is(":checked")) {
        //alert("no change");

      } else {
        /*  $("#navigation").attr("value", "true"); */
        $("#Employee").prop("checked", true);
        this.state.permissionHeader.push("Employee");

      }
    }
    //"uncheck"
    else {

      while (i--) {
        if (name == this.state.permission[i]) {
          this.state.permission.splice(i, 1);

        }
      }

      //checking all submenu is checked or not becz to remove haeder
      if (
        !$("#EmployeeDetails").is(":checked") &&
        !$("#AddRole").is(":checked") &&
        !$("#Salary").is(":checked") &&
        !$("#SalaryReport").is(":checked")
      ) {
        var iHeader = this.state.permissionHeader.length;
        while (iHeader--) {
          if ("Employee" == this.state.permissionHeader[iHeader]) {
            this.state.permissionHeader.splice(iHeader, 1);

          }
        }
        $("#Employee").prop("checked", false);
      } else {

      }
    }
  };




  handleCheckBoxCommunication = e => {
    const name = e.target.name;
    var i = this.state.permission.length;

    if ($("#" + name).is(":checked")) {
      $("#" + name).attr("value", "true");
      this.state.permission.push(name);

      //checking header is cjhecked or not
      if ($("#Communication").is(":checked")) {
        //alert("no change");

      } else {
        /*  $("#navigation").attr("value", "true"); */
        $("#Communication").prop("checked", true);
        this.state.permissionHeader.push("Communication");

      }
    }
    //"uncheck"
    else {

      while (i--) {
        if (name == this.state.permission[i]) {
          this.state.permission.splice(i, 1);

        }
      }
      //checking all submenu is checked or not becz to remove haeder
      if (
        !$("#OfferMessages").is(":checked") &&
        !$("#Emails").is(":checked") &&
        !$("#MessageCenterReport").is(":checked")
      ) {
        var iHeader = this.state.permissionHeader.length;
        while (iHeader--) {
          if ("Communication" == this.state.permissionHeader[iHeader]) {
            this.state.permissionHeader.splice(iHeader, 1);

          }
        }
        $("#Communication").prop("checked", false);
      } else {

      }
    }
  };


  handleCheckBoxAttendance = e => {
    const name = e.target.name;
    var i = this.state.permission.length;

    if ($("#" + name).is(":checked")) {
      $("#" + name).attr("value", "true");
      this.state.permission.push(name);

      //checking header is cjhecked or not
      if ($("#Attendance").is(":checked")) {
        //alert("no change");

      } else {
        /*  $("#navigation").attr("value", "true"); */
        $("#Attendance").prop("checked", true);
        this.state.permissionHeader.push("Attendance");

      }
    }
    //"uncheck"
    else {

      while (i--) {
        if (name == this.state.permission[i]) {
          this.state.permission.splice(i, 1);

        }
      }

      //checking all submenu is checked or not becz to remove haeder
      if (
        !$("#CheckInOut").is(":checked") &&
        !$("#ManualAttendance").is(":checked") &&
        !$("#Report").is(":checked")
      ) {
        var iHeader = this.state.permissionHeader.length;
        while (iHeader--) {
          if ("Attendance" == this.state.permissionHeader[iHeader]) {
            this.state.permissionHeader.splice(iHeader, 1);

          }
        }
        $("#Attendance").prop("checked", false);
      } else {

      }
    }
  };


  handleCheckBoxHeader = e => {
    const name = e.target.name;


    switch (name) {


      case "Expense":
        {
          /*  alert("1"); */
          if (name == "Expense") {
            /*  alert("2"); */
            if ($("#" + name).is(":checked")) {
              /*  alert("3"); */
              //sub menu checked

              $("#AddExpense").prop("checked", true);
              $("#ExpenseReport").prop("checked", true);
              this.state.permissionHeader.push(name);
              this.state.permission.push(
                "AddExpense",
                "ExpenseReport",
              );

            } else {

              $("#AddExpense").prop("checked", false);
              $("#ExpenseReport").prop("checked", false);
              var i = this.state.permission.length;
              var iHeader = this.state.permissionHeader.length;

              while (i--) {
                if ("AddExpense" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }
                if ("ExpenseReport" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }

              }
              while (iHeader--) {
                if ("Expense" == this.state.permissionHeader[iHeader]) {
                  this.state.permissionHeader.splice(iHeader, 1);

                }
              }
            }
          }
        }
        break;
      case "Enquiry":
        {
          /*  alert("1"); */
          if (name == "Enquiry") {
            /*  alert("2"); */
            if ($("#" + name).is(":checked")) {
              /*  alert("3"); */
              //sub menu checked

              $("#AddEnquiry").prop("checked", true);
              $("#EnquiryReport").prop("checked", true);
              this.state.permissionHeader.push(name);
              this.state.permission.push(
                "AddEnquiry",
                "EnquiryReport",
              );

            } else {

              $("#AddEnquiry").prop("checked", false);
              $("#EnquiryReport").prop("checked", false);
              var i = this.state.permission.length;
              var iHeader = this.state.permissionHeader.length;

              while (i--) {
                if ("AddEnquiry" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }
                if ("EnquiryReport" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }

              }
              while (iHeader--) {
                if ("Enquiry" == this.state.permissionHeader[iHeader]) {
                  this.state.permissionHeader.splice(iHeader, 1);

                }
              }
            }
          }
        }
        break;

      case "BookService":
        {
          /*  alert("1"); */
          if (name == "BookService") {
            /*  alert("2"); */
            if ($("#" + name).is(":checked")) {
              /*  alert("3"); */
              //sub menu checked

              $("#AddBookService").prop("checked", true);
              $("#BookedServiceReports").prop("checked", true);
              this.state.permissionHeader.push(name);
              this.state.permission.push(
                "AddBookService",
                "BookedServiceReports",
              );

            } else {

              $("#AddBookService").prop("checked", false);
              $("#BookedServiceReports").prop("checked", false);
              var i = this.state.permission.length;
              var iHeader = this.state.permissionHeader.length;

              while (i--) {
                if ("AddBookService" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }
                if ("BookedServiceReports" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }

              }
              while (iHeader--) {
                if ("BookService" == this.state.permissionHeader[iHeader]) {
                  this.state.permissionHeader.splice(iHeader, 1);

                }
              }
            }
          }
        }
        break;

      case "ServiceCalendar":
        {
          /*  alert("1"); */

          if (name == "ServiceCalendar") {
            /*  alert("2"); */
            if ($("#" + name).is(":checked")) {
              /*  alert("3"); */
              //sub menu checked
              $("#ServiceCalendar").prop("checked", true);
              this.state.permissionHeader.push(name);

            } else {
              /*  alert("4"); */
              var iHeader = this.state.permissionHeader.length;

            }
            while (iHeader--) {
              if ("ServiceCalendar" == this.state.permissionHeader[iHeader]) {
                this.state.permissionHeader.splice(iHeader, 1);

              }
            }
          }
        }
        break;
      case "ServiceConfirmation":
        {
          /*  alert("1"); */

          if (name == "ServiceConfirmation") {
            /*  alert("2"); */
            if ($("#" + name).is(":checked")) {
              /*  alert("3"); */
              //sub menu checked
              $("#ServiceConfirmation").prop("checked", true);
              this.state.permissionHeader.push(name);

            } else {
              /*  alert("4"); */
              var iHeader = this.state.permissionHeader.length;

            }
            while (iHeader--) {
              if ("ServiceConfirmation" == this.state.permissionHeader[iHeader]) {
                this.state.permissionHeader.splice(iHeader, 1);

              }
            }
          }
        }
        break;
      case "Bank":
        {
          /*  alert("1"); */

          if (name == "Bank") {
            /*  alert("2"); */
            if ($("#" + name).is(":checked")) {
              /*  alert("3"); */
              //sub menu checked
              $("#Bank").prop("checked", true);
              this.state.permissionHeader.push(name);

            } else {
              /*  alert("4"); */
              var iHeader = this.state.permissionHeader.length;

            }
            while (iHeader--) {
              if ("Bank" == this.state.permissionHeader[iHeader]) {
                this.state.permissionHeader.splice(iHeader, 1);

              }
            }
          }
        }
        break;
      case "Employee":
        {
          /*  alert("1"); */

          if (name == "Employee") {
            /*  alert("2"); */
            if ($("#" + name).is(":checked")) {
              /*  alert("3"); */
              //sub menu checked
              $("#EmployeeDetails").prop("checked", true);
              $("#AddRole").prop("checked", true);
              $("#Salary").prop("checked", true);
              $("#SalaryReport").prop("checked", true);

              this.state.permissionHeader.push(name);
              this.state.permission.push("EmployeeDetails", "AddRole", "Salary", "SalaryReport");


            } else {
              /*  alert("4"); */


              $("#EmployeeDetails").prop("checked", false);
              $("#AddRole").prop("checked", false);
              $("#Salary").prop("checked", false);
              $("#SalaryReport").prop("checked", false);

              var i = this.state.permission.length;
              var iHeader = this.state.permissionHeader.length;


              while (i--) {
                if ("EmployeeDetails" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);


                }
                if ("AddRole" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);


                }
                if ("Salary" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);


                }
                if ("SalaryReport" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);


                }


              }
              while (iHeader--) {
                if ("Employee" == this.state.permissionHeader[iHeader]) {
                  this.state.permissionHeader.splice(iHeader, 1);

                }
              }
            }
          }
        }
        break;
      case "Communication":
        {
          /*  alert("1"); */
          if (name == "Communication") {
            /*  alert("2"); */
            if ($("#" + name).is(":checked")) {
              /*  alert("3"); */
              //sub menu checked

              $("#OfferMessages").prop("checked", true);
              $("#Emails").prop("checked", true);
              $("#MessageCenterReport").prop("checked", true);
              this.state.permissionHeader.push(name);
              this.state.permission.push(
                "OfferMessages",
                "Emails",
                "MessageCenterReport",
              );

            } else {

              $("#OfferMessages").prop("checked", false);
              $("#Emails").prop("checked", false);
              $("#MessageCenterReport").prop("checked", false);
              var i = this.state.permission.length;
              var iHeader = this.state.permissionHeader.length;

              while (i--) {
                if ("OfferMessages" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }
                if ("Emails" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }
                if ("MessageCenterReport" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }

              }
              while (iHeader--) {
                if ("Communication" == this.state.permissionHeader[iHeader]) {
                  this.state.permissionHeader.splice(iHeader, 1);

                }
              }
            }
          }
        }
        break;

      case "Configuration":
        {
          /*  alert("1"); */

          if (name == "Configuration") {
            /*  alert("2"); */
            if ($("#" + name).is(":checked")) {
              /*  alert("3"); */
              //sub menu checked
              $("#Configuration").prop("checked", true);
              this.state.permissionHeader.push(name);

            } else {
              /*  alert("4"); */
              var iHeader = this.state.permissionHeader.length;

            }
            while (iHeader--) {
              if ("Configuration" == this.state.permissionHeader[iHeader]) {
                this.state.permissionHeader.splice(iHeader, 1);

              }
            }
          }
        }
        break;

      case "TaskMapping":
        {
          /*  alert("1"); */

          if (name == "TaskMapping") {
            /*  alert("2"); */
            if ($("#" + name).is(":checked")) {
              /*  alert("3"); */
              //sub menu checked
              $("#TaskMapping").prop("checked", true);
              this.state.permissionHeader.push(name);

            } else {
              /*  alert("4"); */
              var iHeader = this.state.permissionHeader.length;

            }
            while (iHeader--) {
              if ("TaskMapping" == this.state.permissionHeader[iHeader]) {
                this.state.permissionHeader.splice(iHeader, 1);

              }
            }
          }
        }
        break;



      case "JobCard":
        {
          /*  alert("1"); */

          if (name == "JobCard") {
            /*  alert("2"); */
            if ($("#" + name).is(":checked")) {
              /*  alert("3"); */
              //sub menu checked
              $("#Jobcard").prop("checked", true);
              $("#SaleInvoice").prop("checked", true);
              $("#EstimateInvoice").prop("checked", true);
              $("#CustomerPayment").prop("checked", true);
              $("#SalesReport").prop("checked", true);
              $("#EstimateReport").prop("checked", true);
              $("#PaymentHistoryReport").prop("checked", true);
              $("#PaymentReceivablesReports").prop("checked", true);
              $("#BillDueReport").prop("checked", true);
              $("#FeedBackReport").prop("checked", true);
              $("#AuditReport").prop("checked", true);
              $("#ImportLogo").prop("checked", true);
              $("#ImportQRcode").prop("checked", true);
              $("#Location").prop("checked", true);
              $("#CompanySetting").prop("checked", true);

              this.state.permissionHeader.push(name);
              this.state.permission.push("Jobcard",
                "SaleInvoice", "EstimateInvoice",
                "CustomerPayment", "SalesReport", "EstimateReport",
                "PaymentHistoryReport", "PaymentReceivablesReports",
                "BillDueReport", "FeedBackReport", "AuditReport", "ImportLogo",
                "ImportQRcode", "Location", "CompanySetting");


            } else {
              $("#Jobcard").prop("checked", false);
              $("#SaleInvoice").prop("checked", false);
              $("#EstimateInvoice").prop("checked", false);
              $("#CustomerPayment").prop("checked", false);
              $("#SalesReport").prop("checked", false);
              $("#EstimateReport").prop("checked", false);
              $("#PaymentHistoryReport").prop("checked", false);
              $("#PaymentReceivablesReports").prop("checked", false);
              $("#BillDueReport").prop("checked", false);
              $("#FeedBackReport").prop("checked", false);
              $("#AuditReport").prop("checked", false);
              $("#ImportLogo").prop("checked", false);
              $("#ImportQRcode").prop("checked", false);
              $("#Location").prop("checked", false);
              $("#CompanySetting").prop("checked", false);

              var i = this.state.permission.length;
              var iHeader = this.state.permissionHeader.length;


              while (i--) {
                if ("Jobcard" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);


                }
                if ("SaleInvoice" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }
                if ("EstimateInvoice" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);


                }
                if ("CustomerPayment" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }
                if ("SalesReport" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }
                if ("EstimateReport" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }
                if ("PaymentHistoryReport" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }
                if ("PaymentReceivablesReports" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }
                if ("BillDueReport" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }
                if ("FeedBackReport" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }
                if ("AuditReport" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }
                if ("ImportLogo" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }
                if ("ImportQRcode" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }
                if ("Location" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }
                if ("CompanySetting" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }

              }
              while (iHeader--) {
                if ("JobCard" == this.state.permissionHeader[iHeader]) {
                  this.state.permissionHeader.splice(iHeader, 1);

                }
              }
            }
          }
        }
        break;

      case "Inventory":
        {
          /*  alert("1"); */

          if (name == "Inventory") {
            /*  alert("2"); */
            if ($("#" + name).is(":checked")) {
              /*  alert("3"); */
              //sub menu checked
              $("#ProductService").prop("checked", true);
              $("#Vendor").prop("checked", true);
              $("#PurchaseInvoice").prop("checked", true);
              $("#PurchaseReport").prop("checked", true);
              $("#ProfitandLossReport").prop("checked", true);
              $("#InventoryReport").prop("checked", true);

              this.state.permissionHeader.push(name);
              this.state.permission.push("ProductService", "Vendor",
                "PurchaseInvoice", "PurchaseReport",
                "ProfitandLossReport", "InventoryReport");


            } else {
              /*  alert("4"); */
              $("#ProductService").prop("checked", false);
              $("#Vendor").prop("checked", false);
              $("#PurchaseInvoice").prop("checked", false);
              $("#PurchaseReport").prop("checked", false);
              $("#ProfitandLossReport").prop("checked", false);
              $("#InventoryReport").prop("checked", false);

              var i = this.state.permission.length;
              var iHeader = this.state.permissionHeader.length;


              while (i--) {
                if ("ProductService" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);


                }
                if ("Vendor" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);


                }
                if ("PurchaseInvoice" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);


                }
                if ("PurchaseReport" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);


                }
                if ("ProfitandLossReport" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);


                }
                if ("InventoryReport" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);


                }

              }
              while (iHeader--) {
                if ("Inventory" == this.state.permissionHeader[iHeader]) {
                  this.state.permissionHeader.splice(iHeader, 1);

                }
              }
            }
          }
        }
        break;

      case "CRM":
        {
          /*  alert("1"); */
          if (name == "CRM") {
            /*  alert("2"); */
            if ($("#" + name).is(":checked")) {
              /*  alert("3"); */
              //sub menu checked
              $("#Vehicle").prop("checked", true);
              $("#Customer").prop("checked", true);
              $("#VehicleMakeandModel").prop("checked", true);
              $("#ExportExcel").prop("checked", true);
              $("#ImportExcel").prop("checked", true);

              this.state.permissionHeader.push(name);
              this.state.permission.push("Vehicle", "Customer",
                "VehicleMakeandModel", "ExportExcel", "ImportExcel");

            } else {
              $("#Vehicle").prop("checked", false);
              $("#Customer").prop("checked", false);
              $("#VehicleMakeandModel").prop("checked", false);
              $("#ExportExcel").prop("checked", false);
              $("#ImportExcel").prop("checked", false);

              var i = this.state.permission.length;
              var iHeader = this.state.permissionHeader.length;


              while (i--) {
                if ("Vehicle" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);


                }
                if ("Customer" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);


                }
                if ("VehicleMakeandModel" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);


                }
                if ("ExportExcel" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);


                }
                if ("ImportExcel" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);


                }
              }
              while (iHeader--) {
                if ("CRM" == this.state.permissionHeader[iHeader]) {
                  this.state.permissionHeader.splice(iHeader, 1);

                }
              }
            }
          }
        }
        break;
      case "Attendance":
        {

          if ($("#" + name).is(":checked")) {

            //sub menu checked
            $("#CheckInOut").prop("checked", true);
            $("#ManualAttendance").prop("checked", true);
            $("#Report").prop("checked", true);
            this.state.permissionHeader.push(name);
            this.state.permission.push(
              "CheckInOut",
              "ManualAttendance",
              "Report"
            );


          } else {
            $("#CheckInOut").prop("checked", false);
            $("#ManualAttendance").prop("checked", false);
            $("#Report").prop("checked", false);

            var i = this.state.permission.length;
            var iHeader = this.state.permissionHeader.length;


            while (i--) {
              if ("CheckInOut" == this.state.permission[i]) {
                this.state.permission.splice(i, 1);

                if ("ManualAttendance" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);
                }
                if ("Report" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);
                }
              }
            }
            while (iHeader--) {
              if ("Attendance" == this.state.permissionHeader[iHeader]) {
                this.state.permissionHeader.splice(iHeader, 1);

                break;
              }

            }



          }

        }
        break;
    }


  };



  componentDidMount() {
    SetCurrentPage("TaskMappingElite");

    window.scrollTo(0, 0);

    var self = this;
    var roleName;
    var Roles = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Roles'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
    console.log("ROLES:", Roles);
    roleName += '<option  value="" disabled selected hidden>Select a Role</option>';
    $.each(Roles, function (i, item) {

      roleName += '<option value="' + item.roleName + '">' + item.roleName + '</option>'

    });
    $("#roleName").append(roleName);
    this.state.roleOptions = [];

    var roleOptions_Var = [];

    $.each(Roles, function (i, item) {
      // //console.log("ROLE :",item.role);
      roleOptions_Var.push({ label: item.roleName, value: item.roleName });
    });

    var self = this;

    this.setState({
      roleOptions: roleOptions_Var,
    })

    $(document).ready(function () {
      $(".CheckBoxClass").click(function () {
        if ($("#ckbCheckAll").is(":checked")) {

          self.state.permissionHeader.push("JobCard,Inventory,CRM,Expense,Enquiry,BookService,ServiceCalendar,"
            + "ServiceConfirmation,Employee,Bank,Attendance,Reports,Communication,Configuration,TaskMapping");
          self.state.permission.push("Jobcard,"
            + "SaleInvoice,"
            + "EstimateInvoice,CustomerPayment,"
            + "ProductService,Vendor,"
            + "PurchaseInvoice,Vehicle,"
            + "Customer,VehicleMakeandModel,AddExpense,AddEnquiry,AddBookService,"
            + "ServiceCalendar,ServiceConfirmation,"
            + "EmployeeDetails,AddRole,Salary,SalaryReport,"
            + "BankDetails,CheckInOut,ManualAttendance,Report,Reports,SalesReport,EstimateReport,"
            + "ExpenseReport,PurchaseReport,MessageCenterReport,ProfitandLossReport,"
            + "InventoryReport,AuditReport,BillDueReport,EnquiryReport,FeedBackReport,"
            + "PaymentHistoryReport,BookedServiceReports,"
            + "PaymentReceivablesReports,OfferMessages,Emails,Configuration,"
            + "TaskMapping,Location,CompanySetting,ImportQRcode,ImportLogo,ExportExcel,ImportExcel");


        } else {
          self.state.permission = [];
          self.state.permissionHeader = [];


        }
        $(".checkBoxClass").prop('checked', $(this).prop('checked'));
        self.setState({
          permission: self.state.permission,
          permissionHeader: self.state.permissionHeader,

        })
      });
    });

  }


  Submit() {
    var companyId = CryptoJS.AES.decrypt(
      localStorage.getItem("CompanyId"),
      "shinchanbaby"
    ).toString(CryptoJS.enc.Utf8);
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId
    });

    this.state.permission = this.state.permission.toString();
    this.state.roleName = this.state.roleName.toString();
    this.state.permissionHeader = this.state.permissionHeader.toString();

    this.setState({
      permission: this.state.permission.toString(),
      permissionHeader: this.state.permissionHeader.toString(),
      roleName: this.state.roleName.toString(),
      companyId: this.state.companyId.toString(),

    });
    var self = this;
    $.ajax({
      type: "POST",
      data: JSON.stringify({
        permission: this.state.permission.toString(),
        permissionHeader: this.state.permissionHeader.toString(),
        roleName: this.state.roleName.toString(),
        companyId: this.state.companyId.toString(),

        staffId: self.state.staffId,
        employeeName: self.state.employeeName,
        role: self.state.role,
      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/taskmapping/taskMappingPermission",

      contentType: "application/json",
      dataType: "json",
      async: false,
      success: function (data, textStatus, jqXHR) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Successfully Updated Permission for ' + self.state.roleName,
          showConfirmButton: false,
          timer: 2000
        })


        var roleName = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Roles'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

        console.log("current role name:", roleName);
        console.log("this page rolename", self.state.roleName);

        /*
         *UPDATING PERMISSION FOR roleName MATCHING THE CHANGED PERMISSION roleName
         */
        if (self.state.roleName == roleName) {
          localStorage.setItem("Permissions", CryptoJS.AES.encrypt(JSON.stringify(data.permissionList), "shinchanbaby"));
          localStorage.setItem("PermissionHeader", CryptoJS.AES.encrypt(JSON.stringify(data.headerPermissionList), "shinchanbaby"));
        }

        self.state.permission = [];
        self.state.permissionHeader = [];


        self.state.roleName = "";
        self.state.roleOption = "";
        $("#roleName").val(" ");
        self.setState({
          permission: self.state.permission,
          permissionHeader: self.state.permissionHeader,
          roleName: self.state.roleName,
          roleOption: self.state.roleOption,
        })

        $(".checkBoxClass").prop("checked", false);
        $("#ckbCheckAll").prop("checked", false);
        /*
         *UPDATING PERMISSION AFTER CHANGE
         */
        //self.ResetPermission();

        ReactDOM.render(
          <Router>
            <div>
              {/*  <Route path="/" component={taskMapping} />
               */}{" "}
              <Route path="/" component={TaskMappingElite} />
            </div>
          </Router>,
          document.getElementById("contentRender")
        );
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

  render() {
    return (
      <div class="container" style={{ paddingTop: "5px", marginBottom: "10%" }}>
        <div className="">
          <div className="">
            <BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
          </div>
          <div class="inv_HeaderCls">
            <h3 className="text-center">Task Mapping</h3>
          </div>
        </div>
        <div style={{ paddingBottom: "20px", position: "inline-block" }}>
          <div className="col-xs-12 col-sm-12 col-lg-12">
            <label>Role*</label>
            <div
              style={{ width: "230px" }}>
              <SelectSearch
                options={this.state.roleOptions}
                value={this.state.roleOption}
                onChange={(e) => this.handleUserInput(e)}
                name="roleName" placeholder="Select Role " />
            </div>
          </div>
        </div>
        <input class="CheckBoxClass" name="checkbox" type="checkbox" id="ckbCheckAll" /> Select All
        <div class="row">
          <div>
            <div className="col-xs-12 col-sm-6 col-lg-6">


              <div>
                <label>
                  <input
                    type="checkbox"
                    value={this.state.JobCard}
                    name="JobCard"
                    onChange={this.handleCheckBoxHeader}
                    id="JobCard"
                    class="checkBoxClass"
                    style={{ marginRight: "5px" }}
                  />{" "}
                  CheckOuts
                </label>
                <div style={{ paddingLeft: "45px" }}>
                  {/*} <div class="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.Jobcard}
                        name="Jobcard"
                        onChange={this.handleCheckBoxJobCard}
                        id="Jobcard"
                        class="checkBoxClass"
                      />
                     Jobcard - Add/List/View/Update/Delete
                    </label>
                  </div> */}
                  <div class="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.SaleInvoice}
                        name="SaleInvoice"
                        onChange={this.handleCheckBoxJobCard}
                        id="SaleInvoice"
                        class="checkBoxClass"
                      />
                      SaleInvoice - Add/List/View/Print/Pay/Update/Delete
                    </label>
                  </div>
                  <div class="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.EstimateInvoice}
                        name="EstimateInvoice"
                        onChange={this.handleCheckBoxJobCard}
                        id="EstimateInvoice"
                        class="checkBoxClass"
                      />
                      EstimateInvoice - Add/List/View/Print/Pay/Update/Delete
                    </label>
                  </div>
                  <div class="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.CustomerPayment}
                        name="CustomerPayment"
                        onChange={this.handleCheckBoxJobCard}
                        id="CustomerPayment"
                        class="checkBoxClass"
                      />
                      Customer Payment
                    </label>
                  </div>

                  <div class="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.SalesReport}
                        name="SalesReport"
                        onChange={this.handleCheckBoxJobCard}
                        id="SalesReport"
                        class="checkBoxClass"
                      />
                      Sales Report - Daily/Monthly/Yearly/Datewise/CustomerStatement
                                  </label>
                  </div>

                  <div class="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.EstimateReport}
                        name="EstimateReport"
                        onChange={this.handleCheckBoxJobCard}
                        id="EstimateReport"
                        class="checkBoxClass"
                      />
                      Estimate Report - Daily/Monthly/Yearly/Datewise/CustomerStatement
                    </label>
                  </div>

                  <div class="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.PaymentHistoryReport}
                        name="PaymentHistoryReport"
                        onChange={this.handleCheckBoxJobCard}
                        id="PaymentHistoryReport"
                        class="checkBoxClass"
                      />
                      Payment History Report
                    </label>
                  </div>

                  <div class="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.PaymentReceivablesReports}
                        name="PaymentReceivablesReports"
                        onChange={this.handleCheckBoxJobCard}
                        id="PaymentReceivablesReports"
                        class="checkBoxClass"
                      />
                      Payment Receivables Reports
                    </label>
                  </div>
                  <div class="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.BillDueReport}
                        name="BillDueReport"
                        onChange={this.handleCheckBoxJobCard}
                        id="BillDueReport"
                        class="checkBoxClass"
                      />
                      Bill Due Report
                    </label>
                  </div>
                  <div class="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.FeedBackReport}
                        name="FeedBackReport"
                        onChange={this.handleCheckBoxJobCard}
                        id="FeedBackReport"
                        class="checkBoxClass"
                      />
                      FeedBack Report
                    </label>
                  </div>
                  <div class="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.AuditReport}
                        name="AuditReport"
                        onChange={this.handleCheckBoxJobCard}
                        id="AuditReport"
                        class="checkBoxClass"
                      />
                      Audit Report
                    </label>
                  </div>
                  <div class="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.ImportLogo}
                        name="ImportLogo"
                        onChange={this.handleCheckBoxJobCard}
                        id="ImportLogo"
                        class="checkBoxClass"
                      />
                      Import Logo
                    </label>
                  </div>
                  <div class="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.ImportQRcode}
                        name="ImportQRcode"
                        onChange={this.handleCheckBoxJobCard}
                        id="ImportQRcode"
                        class="checkBoxClass"
                      />
                      Import QRcode
                    </label>
                  </div>
                  <div class="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.Location}
                        name="Location"
                        onChange={this.handleCheckBoxJobCard}
                        id="Location"
                        class="checkBoxClass"
                      />
                      Location
                    </label>
                  </div>
                  <div class="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.CompanySetting}
                        name="CompanySetting"
                        onChange={this.handleCheckBoxJobCard}
                        id="CompanySetting"
                        class="checkBoxClass"
                      />
                      Company Setting
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label>
                  <input
                    type="checkbox"
                    value={this.state.Inventory}
                    name="Inventory"
                    onChange={this.handleCheckBoxHeader}
                    id="Inventory"
                    class="checkBoxClass"
                    style={{ marginRight: "5px" }}
                  />{" "}
                  Inventory
                </label>
                <div style={{ paddingLeft: "45px" }}>
                  <div class="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.ProductService}
                        name="ProductService"
                        onChange={this.handleCheckBoxInventory}
                        id="ProductService"
                        class="checkBoxClass"
                      />
                      Add Product/Service - Add/List/View/Update/Delete
                    </label>
                  </div>
                  <div class="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.Vendor}
                        name="Vendor"
                        onChange={this.handleCheckBoxInventory}
                        id="Vendor"
                        class="checkBoxClass"
                      />
                      Vendor - Add/List/View/Update/Delete
                    </label>
                  </div>
                  <div class="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.PurchaseInvoice}
                        name="PurchaseInvoice"
                        onChange={this.handleCheckBoxInventory}
                        id="PurchaseInvoice"
                        class="checkBoxClass"
                      />
                      Purchase - Add/List/View/Print/Pay/Update/Delete
                    </label>
                  </div>
                  <div class="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.PurchaseReport}
                        name="PurchaseReport"
                        onChange={this.handleCheckBoxInventory}
                        id="PurchaseReport"
                        class="checkBoxClass"
                      />
                      Purchase Report - Daily/Monthly/Yearly/Datewise/VendorStatement
                    </label>
                  </div>
                  <div class="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.ProfitandLossReport}
                        name="ProfitandLossReport"
                        onChange={this.handleCheckBoxInventory}
                        id="ProfitandLossReport"
                        class="checkBoxClass"
                      />
                      Profit and Loss Report
                    </label>
                  </div>
                  <div class="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.InventoryReport}
                        name="InventoryReport"
                        onChange={this.handleCheckBoxInventory}
                        id="InventoryReport"
                        class="checkBoxClass"
                      />
                      Inventory Report
                    </label>
                  </div>


                </div>
              </div>

              <div>
                <label>
                  <input
                    type="checkbox"
                    value={this.state.CRM}
                    name="CRM"
                    onChange={this.handleCheckBoxHeader}
                    id="CRM"
                    class="checkBoxClass"
                    style={{ marginRight: "5px" }}
                  />
                  CRM
                </label>
                <div style={{ paddingLeft: "45px" }}>
                  {/* <div class="checkbox ">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.Vehicle}
                        name="Vehicle"
                        onChange={this.handleCheckBoxCRM}
                        id="Vehicle"
                        class="checkBoxClass"
                      />
                      Vehicle - Add/List/View/Update/Delete
                    </label>
                  </div> */}
                  <div class="checkbox ">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.Customer}
                        name="Customer"
                        onChange={this.handleCheckBoxCRM}
                        id="Customer"
                        class="checkBoxClass"
                      />
                      Customer - Add/List/View/Update/Delete
                    </label>
                  </div>
                  {/* <div class="checkbox ">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.VehicleMakeandModel}
                        name="VehicleMakeandModel"
                        onChange={this.handleCheckBoxCRM}
                        id="VehicleMakeandModel"
                        class="checkBoxClass"
                      />
                      Vehicle Make and Model - Add/List/View/Update/Delete
                    </label>
                  </div>
                  */}


                  <div class="checkbox ">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.ExportExcel}
                        name="ExportExcel"
                        onChange={this.handleCheckBoxCRM}
                        id="ExportExcel"
                        class="checkBoxClass"
                      />
                      Export Excel
                    </label>
                  </div>
                  <div class="checkbox ">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.ImportExcel}
                        name="ImportExcel"
                        onChange={this.handleCheckBoxCRM}
                        id="ImportExcel"
                        class="checkBoxClass"
                      />
                      Import Excel
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xs-12 col-sm-6 col-lg-6">

            <div>
              <label>
                <input
                  type="checkbox"
                  value={this.state.Expense}
                  name="Expense"
                  onChange={this.handleCheckBoxHeader}
                  id="Expense"
                  class="checkBoxClass"
                  style={{ marginRight: "5px" }}
                />
                Expense
                </label>
              <div style={{ paddingLeft: "45px" }}>
                <div class="checkbox ">
                  <label>
                    <input
                      type="checkbox"
                      value={this.state.AddExpense}
                      name="AddExpense"
                      onChange={this.handleCheckBoxExpense}
                      id="AddExpense"
                      class="checkBoxClass"
                    />
                    Expense
                    </label>
                </div>
                <div class="checkbox ">
                  <label>
                    <input
                      type="checkbox"
                      value={this.state.ExpenseReport}
                      name="ExpenseReport"
                      onChange={this.handleCheckBoxExpense}
                      id="ExpenseReport"
                      class="checkBoxClass"
                    />
                    Expense Report - Daily/Monthly/Yearly/Datewise
                    </label>
                </div>
              </div>

            </div>

            <div>
              <label>
                <input
                  type="checkbox"
                  value={this.state.Enquiry}
                  name="Enquiry"
                  onChange={this.handleCheckBoxHeader}
                  id="Enquiry"
                  class="checkBoxClass"
                  style={{ marginRight: "5px" }}
                />
                Enquiry
                </label>
              <div style={{ paddingLeft: "45px" }}>
                <div class="checkbox ">
                  <label>
                    <input
                      type="checkbox"
                      value={this.state.AddEnquiry}
                      name="AddEnquiry"
                      onChange={this.handleCheckBoxEnquiry}
                      id="AddEnquiry"
                      class="checkBoxClass"
                    />
                    Enquiry
                    </label>
                </div>
                <div class="checkbox ">
                  <label>
                    <input
                      type="checkbox"
                      value={this.state.EnquiryReport}
                      name="EnquiryReport"
                      onChange={this.handleCheckBoxEnquiry}
                      id="EnquiryReport"
                      class="checkBoxClass"
                    />
                    Enquiry Report
                    </label>
                </div>
              </div>

            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value={this.state.BookService}
                  name="BookService"
                  onChange={this.handleCheckBoxHeader}
                  id="BookService"
                  class="checkBoxClass"
                  style={{ marginRight: "5px" }}
                />
                Book Service
                </label>
              <div style={{ paddingLeft: "45px" }}>
                <div class="checkbox ">
                  <label>
                    <input
                      type="checkbox"
                      value={this.state.AddBookService}
                      name="AddBookService"
                      onChange={this.handleCheckBoxBookService}
                      id="AddBookService"
                      class="checkBoxClass"
                    />
                    Book Service
                    </label>
                </div>
                <div class="checkbox ">
                  <label>
                    <input
                      type="checkbox"
                      value={this.state.BookedServiceReports}
                      name="BookedServiceReports"
                      onChange={this.handleCheckBoxBookService}
                      id="BookedServiceReports"
                      class="checkBoxClass"
                    />
                    Booked Service Reports
                    </label>
                </div>
              </div>

            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value={this.state.ServiceCalendar}
                  name="ServiceCalendar"
                  onChange={this.handleCheckBoxHeader}
                  id="ServiceCalendar"
                  class="checkBoxClass"
                  style={{ marginRight: "5px" }}
                />
                Service Calendar
                </label>

            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value={this.state.ServiceConfirmation}
                  name="ServiceConfirmation"
                  onChange={this.handleCheckBoxHeader}
                  id="ServiceConfirmation"
                  class="checkBoxClass"
                  style={{ marginRight: "5px" }}
                />
                Service Confirmation
                </label>

            </div>

            <div>
              <label>
                <input
                  type="checkbox"
                  value={this.state.Employee}
                  name="Employee"
                  onChange={this.handleCheckBoxHeader}
                  id="Employee"
                  class="checkBoxClass"
                  style={{ marginRight: "5px" }}
                />
                Employee
                </label>
              <div style={{ paddingLeft: "45px" }}>
                <div class="checkbox ">
                  <label>
                    <input
                      type="checkbox"
                      value={this.state.EmployeeDetails}
                      name="EmployeeDetails"
                      onChange={this.handleCheckBoxEmployee}
                      id="EmployeeDetails"
                      class="checkBoxClass"
                    />
                    Employee - Add/List/View/Update/Delete
                    </label>
                </div>
                <div class="checkbox ">
                  <label>
                    <input
                      type="checkbox"
                      value={this.state.AddRole}
                      name="AddRole"
                      onChange={this.handleCheckBoxEmployee}
                      id="AddRole"
                      class="checkBoxClass"
                    />
                    Add Role
                    </label>
                </div>
                <div class="checkbox ">
                  <label>
                    <input
                      type="checkbox"
                      value={this.state.Salary}
                      name="Salary"
                      onChange={this.handleCheckBoxEmployee}
                      id="Salary"
                      class="checkBoxClass"
                    />
                    Salary
                    </label>
                </div>
                <div class="checkbox ">
                  <label>
                    <input
                      type="checkbox"
                      value={this.state.SalaryReport}
                      name="SalaryReport"
                      onChange={this.handleCheckBoxEmployee}
                      id="SalaryReport"
                      class="checkBoxClass"
                    />
                    Salary Report
                    </label>
                </div>
              </div>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value={this.state.Bank}
                  name="Bank"
                  onChange={this.handleCheckBoxHeader}
                  id="Bank"
                  class="checkBoxClass"
                  style={{ marginRight: "5px" }}
                />
                Bank - Add/List/View/Update/Delete
                </label>

            </div>

            <div>
              <label>
                <input
                  type="checkbox"
                  value={this.state.Attendance}
                  name="Attendance"
                  onChange={this.handleCheckBoxHeader}
                  id="Attendance"
                  class="checkBoxClass"
                  style={{ marginRight: "5px" }}
                />
                Attendance
                </label>
              <div style={{ paddingLeft: "45px" }}>
                <div class="checkbox ">
                  <label>
                    <input
                      type="checkbox"
                      value={this.state.CheckInOut}
                      name="CheckInOut"
                      onChange={this.handleCheckBoxAttendance}
                      id="CheckInOut"
                      class="checkBoxClass"
                    />
                    CheckIn/CheckOut
                    </label>
                </div>
                <div class="checkbox ">
                  <label>
                    <input
                      type="checkbox"
                      value={this.state.ManualAttendance}
                      name="ManualAttendance"
                      onChange={this.handleCheckBoxAttendance}
                      id="ManualAttendance"
                      class="checkBoxClass"
                    />
                    Manual Attendance
                    </label>
                </div>
                <div class="checkbox ">
                  <label>
                    <input
                      type="checkbox"
                      value={this.state.Report}
                      name="Report"
                      onChange={this.handleCheckBoxAttendance}
                      id="Report"
                      class="checkBoxClass"
                    />
                    Report
                    </label>
                </div>
              </div>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value={this.state.Configuration}
                  name="Configuration"
                  onChange={this.handleCheckBoxHeader}
                  id="Configuration"
                  class="checkBoxClass"
                  style={{ marginRight: "5px" }}
                />
                Configuration
                </label>

            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value={this.state.TaskMapping}
                  name="TaskMapping"
                  onChange={this.handleCheckBoxHeader}
                  id="TaskMapping"
                  class="checkBoxClass"
                  style={{ marginRight: "5px" }}
                />
                Task Mapping
                </label>

            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value={this.state.Communication}
                  name="Communication"
                  onChange={this.handleCheckBoxHeader}
                  id="Communication"
                  class="checkBoxClass"
                  style={{ marginRight: "5px" }}
                />
                Configuration
                </label>
              <div style={{ paddingLeft: "45px" }}>
                <div class="checkbox ">
                  <label>
                    <input
                      type="checkbox"
                      value={this.state.OfferMessages}
                      name="OfferMessages"
                      onChange={this.handleCheckBoxCommunication}
                      id="OfferMessages"
                      class="checkBoxClass"
                    />
                    Offer Messages
                    </label>
                </div>
                <div class="checkbox ">
                  <label>
                    <input
                      type="checkbox"
                      value={this.state.Emails}
                      name="Emails"
                      onChange={this.handleCheckBoxCommunication}
                      id="Emails"
                      class="checkBoxClass"
                    />
                    Emails
                    </label>
                </div>
                <div class="checkbox ">
                  <label>
                    <input
                      type="checkbox"
                      value={this.state.MessageCenterReport}
                      name="MessageCenterReport"
                      onChange={this.handleCheckBoxCommunication}
                      id="MessageCenterReport"
                      class="checkBoxClass"
                    />
                    Message Center Report
                    </label>
                </div>

              </div>
            </div>

          </div>
          <button
            type="button"
            onClick={() => this.Submit()}
            disabled={!this.state.valid}
            class="btn btn-primary"
          >
            Give Permission
          </button>
        </div>
      </div>
    );
  }
}
export default TaskMappingElite;
