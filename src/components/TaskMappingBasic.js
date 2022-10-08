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
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
  GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
class TaskMappingBasic extends Component {
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
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: [value],
      valid: true
    });
    var companyId = CryptoJS.AES.decrypt(
      localStorage.getItem("CompanyId"),
      "shinchanbaby"
    ).toString(CryptoJS.enc.Utf8);
    this.state.companyId = companyId;
    this.state.roleName = value;
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
        confirmAlert({
          title: "No Internet", // Title dialog
          message: "Network Connection Problem", // Message dialog
          confirmLabel: "Ok" // Text button confirm
        });
      }
    });
  };


  handleCheckBoxMaster = e => {
    const name = e.target.name;
    var i = this.state.permission.length;

    if ($("#" + name).is(":checked")) {
      $("#" + name).attr("value", "true");
      this.state.permission.push(name);

      //checking header is cjhecked or not
      if ($("#master").is(":checked")) {
        //alert("no change");

      } else {
        /*  $("#navigation").attr("value", "true"); */
        $("#master").prop("checked", true);
        this.state.permissionHeader.push("master");

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
        !$("#addCustomer").is(":checked") &&
        !$("#listOfCustomer").is(":checked") &&
        !$("#addVendor").is(":checked") &&
        !$("#listOfVendor").is(":checked") &&
        !$("#addProduct").is(":checked") &&
        !$("#listOfProduct").is(":checked")
      ) {
        var iHeader = this.state.permissionHeader.length;
        while (iHeader--) {
          if ("master" == this.state.permissionHeader[iHeader]) {
            this.state.permissionHeader.splice(iHeader, 1);

          }
        }
        $("#master").prop("checked", false);
      } else {

      }
    }
  };

  handleCheckBoxSale = e => {
    const name = e.target.name;
    var i = this.state.permission.length;

    if ($("#" + name).is(":checked")) {
      $("#" + name).attr("value", "true");
      this.state.permission.push(name);

      //checking header is cjhecked or not
      if ($("#sale").is(":checked")) {
        //alert("no change");

      } else {
        /*  $("#navigation").attr("value", "true"); */
        $("#sale").prop("checked", true);
        this.state.permissionHeader.push("sale");

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
        !$("#saleOrder").is(":checked") &&
        !$("#saleInvoice").is(":checked") &&
        !$("#estimateOrder").is(":checked") &&
        !$("#estimateInvoice").is(":checked")
      ) {
        var iHeader = this.state.permissionHeader.length;
        while (iHeader--) {
          if ("sale" == this.state.permissionHeader[iHeader]) {
            this.state.permissionHeader.splice(iHeader, 1);

          }
        }
        $("#sale").prop("checked", false);
      } else {

      }
    }
  };
  handleCheckBoxPurchase = e => {
    const name = e.target.name;
    var i = this.state.permission.length;

    if ($("#" + name).is(":checked")) {
      $("#" + name).attr("value", "true");
      this.state.permission.push(name);

      //checking header is cjhecked or not
      if ($("#purchase").is(":checked")) {
        //alert("no change");

      } else {
        /*  $("#communication").attr("value", "true"); */
        $("#purchase").prop("checked", true);
        this.state.permissionHeader.push("purchase");

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
      if (!$("#purchaseOrder").is(":checked") && !$("#purchaseInvoice").is(":checked")) {
        var iHeader = this.state.permissionHeader.length;
        while (iHeader--) {
          if ("purchase" == this.state.permissionHeader[iHeader]) {
            this.state.permissionHeader.splice(iHeader, 1);

          }
        }
        $("#purchase").prop("checked", false);
      } else {

      }
    }
  };
  handleCheckBoxQuotation = e => {
    const name = e.target.name;
    var i = this.state.permission.length;

    if ($("#" + name).is(":checked")) {
      $("#" + name).attr("value", "true");
      this.state.permission.push(name);

      //checking header is cjhecked or not
      if ($("#quotation").is(":checked")) {
        //alert("no change");

      } else {
        /*  $("#approval").attr("value", "true"); */
        $("#quotation").prop("checked", true);
        this.state.permissionHeader.push("quotation");

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
        !$("#gstQuotation").is(":checked") &&
        !$("#withoutGSTQuotation").is(":checked") &&
        !$("#listOfQuotation").is(":checked")
      ) {
        var iHeader = this.state.permissionHeader.length;
        while (iHeader--) {
          if ("quotation" == this.state.permissionHeader[iHeader]) {
            this.state.permissionHeader.splice(iHeader, 1);

          }
        }
        $("#quotation").prop("checked", false);
      } else {

      }
    }
  };



  handleCheckBoxBank = e => {
    const name = e.target.name;
    var i = this.state.permission.length;

    if ($("#" + name).is(":checked")) {
      $("#" + name).attr("value", "true");
      this.state.permission.push(name);

      //checking header is cjhecked or not
      if ($("#bank").is(":checked")) {
        //alert("no change");

      } else {
        /*  $("#timeSheet").attr("value", "true"); */
        $("#bank").prop("checked", true);
        this.state.permissionHeader.push("bank");

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
        !$("#addBank").is(":checked") &&
        !$("#listOfBank").is(":checked")

      ) {
        var iHeader = this.state.permissionHeader.length;
        while (iHeader--) {
          if ("bank" == this.state.permissionHeader[iHeader]) {
            this.state.permissionHeader.splice(iHeader, 1);

          }
        }
        $("#bank").prop("checked", false);
      } else {

      }
    }
  };

  handleCheckBoxFileGST = e => {
    const name = e.target.name;
    var i = this.state.permission.length;

    if ($("#" + name).is(":checked")) {
      $("#" + name).attr("value", "true");
      this.state.permission.push(name);

      //checking header is cjhecked or not
      if ($("#fileGST").is(":checked")) {
        //alert("no change");

      } else {
        /*  $("#navigation").attr("value", "true"); */
        $("#fileGST").prop("checked", true);
        this.state.permissionHeader.push("fileGST");

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
        !$("#GST3B").is(":checked") &&
        !$("#GSTR1").is(":checked") &&
        !$("#GSTROfflineTool").is(":checked")
      ) {
        var iHeader = this.state.permissionHeader.length;
        while (iHeader--) {
          if ("fileGST" == this.state.permissionHeader[iHeader]) {
            this.state.permissionHeader.splice(iHeader, 1);

          }
        }
        $("#fileGST").prop("checked", false);
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
      if ($("#employee").is(":checked")) {
        //alert("no change");

      } else {
        /*  $("#navigation").attr("value", "true"); */
        $("#employee").prop("checked", true);
        this.state.permissionHeader.push("employee");

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
        !$("#addEmployee").is(":checked") &&
        !$("#listOfEmployee").is(":checked") &&
        !$("#addRole").is(":checked")
      ) {
        var iHeader = this.state.permissionHeader.length;
        while (iHeader--) {
          if ("employee" == this.state.permissionHeader[iHeader]) {
            this.state.permissionHeader.splice(iHeader, 1);

          }
        }
        $("#employee").prop("checked", false);
      } else {

      }
    }
  };



  handleCheckBoxReports = e => {
    const name = e.target.name;
    var i = this.state.permission.length;

    if ($("#" + name).is(":checked")) {
      $("#" + name).attr("value", "true");
      this.state.permission.push(name);

      //checking header is cjhecked or not
      if ($("#reports").is(":checked")) {
        //alert("no change");

      } else {
        /*  $("#navigation").attr("value", "true"); */
        $("#reports").prop("checked", true);
        this.state.permissionHeader.push("reports");

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
      if (!$(".reportClass").is(":checked")) {
        var iHeader = this.state.permissionHeader.length;
        while (iHeader--) {
          if ("reports" == this.state.permissionHeader[iHeader]) {
            this.state.permissionHeader.splice(iHeader, 1);

          }
        }
        $("#reports").prop("checked", false);
      } else {

      }
    }
  };




  handleCheckBoxHeader = e => {
    const name = e.target.name;


    switch (name) {


      case "expense":
        {
          /*  alert("1"); */

          if (name == "expense") {
            /*  alert("2"); */
            if ($("#" + name).is(":checked")) {
              /*  alert("3"); */
              //sub menu checked
              $("#expense").prop("checked", true);
              this.state.permissionHeader.push(name);

            } else {
              /*  alert("4"); */
              var iHeader = this.state.permissionHeader.length;

            }
            while (iHeader--) {
              if ("expense" == this.state.permissionHeader[iHeader]) {
                this.state.permissionHeader.splice(iHeader, 1);

              }
            }
          }
        }
        break;
      case "taskMapping":
        {
          /*  alert("1"); */

          if (name == "taskMapping") {
            /*  alert("2"); */
            if ($("#" + name).is(":checked")) {
              /*  alert("3"); */
              //sub menu checked
              $("#taskMapping").prop("checked", true);
              this.state.permissionHeader.push(name);

            } else {
              /*  alert("4"); */
              var iHeader = this.state.permissionHeader.length;

            }
            while (iHeader--) {
              if ("taskMapping" == this.state.permissionHeader[iHeader]) {
                this.state.permissionHeader.splice(iHeader, 1);

              }
            }
          }
        }
        break;



      case "master":
        {
          /*  alert("1"); */

          if (name == "master") {
            /*  alert("2"); */
            if ($("#" + name).is(":checked")) {
              /*  alert("3"); */
              //sub menu checked
              $("#addCustomer").prop("checked", true);
              $("#listOfCustomer").prop("checked", true);
              $("#addVendor").prop("checked", true);
              $("#listOfVendor").prop("checked", true);
              $("#addProduct").prop("checked", true);
              $("#listOfProduct").prop("checked", true);

              this.state.permissionHeader.push(name);
              this.state.permission.push("addCustomer", "listOfCustomer", "addVendor", "listOfVendor", "addProduct", "listOfProduct", );


            } else {

              $("#addCustomer").prop("checked", false);
              $("#listOfCustomer").prop("checked", false);
              $("#addVendor").prop("checked", false);
              $("#listOfVendor").prop("checked", false);
              $("#addProduct").prop("checked", false);
              $("#listOfProduct").prop("checked", false);

              var i = this.state.permission.length;
              var iHeader = this.state.permissionHeader.length;

              while (i--) {
                if ("addCustomer" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);


                }
                if ("listOfCustomer" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }
                if ("addVendor" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }
                if ("listOfVendor" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }
                if ("addProduct" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }
                if ("listOfProduct" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }
              }
              while (iHeader--) {
                if ("master" == this.state.permissionHeader[iHeader]) {
                  this.state.permissionHeader.splice(iHeader, 1);

                }
              }
            }
          }
        }
        break;

      case "sale":
        {
          /*  alert("1"); */

          if (name == "sale") {
            /*  alert("2"); */
            if ($("#" + name).is(":checked")) {
              /*  alert("3"); */
              //sub menu checked
              $("#saleOrder").prop("checked", true);
              $("#saleInvoice").prop("checked", true);
              $("#estimateOrder").prop("checked", true);
              $("#estimateInvoice").prop("checked", true);

              this.state.permissionHeader.push(name);
              this.state.permission.push("saleOrder", "saleInvoice", "estimateOrder", "estimateInvoice");

            } else {
              /*  alert("4"); */
              $("#saleOrder").prop("checked", false);
              $("#saleInvoice").prop("checked", false);
              $("#estimateOrder").prop("checked", false);
              $("#estimateInvoice").prop("checked", false);
              var i = this.state.permission.length;
              var iHeader = this.state.permissionHeader.length;


              while (i--) {
                if ("saleOrder" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);


                }
                if ("saleInvoice" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);


                }
                if ("estimateOrder" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }
                if ("estimateInvoice" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }

              }
              while (iHeader--) {
                if ("sale" == this.state.permissionHeader[iHeader]) {
                  this.state.permissionHeader.splice(iHeader, 1);

                }
              }
            }
          }
        }
        break;

      case "purchase":
        {
          /*  alert("1"); */
          if (name == "purchase") {
            /*  alert("2"); */
            if ($("#" + name).is(":checked")) {
              /*  alert("3"); */
              //sub menu checked
              $("#purchaseOrder").prop("checked", true);
              $("#purchaseInvoice").prop("checked", true);

              this.state.permissionHeader.push(name);
              this.state.permission.push("purchaseOrder", "purchaseInvoice");

            } else {

              $("#purchaseOrder").prop("checked", false);
              $("#purchaseInvoice").prop("checked", false);
              var i = this.state.permission.length;
              var iHeader = this.state.permissionHeader.length;

              while (i--) {
                if ("purchaseOrder" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }
                if ("purchaseInvoice" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);


                }
              }
              while (iHeader--) {
                if ("purchase" == this.state.permissionHeader[iHeader]) {
                  this.state.permissionHeader.splice(iHeader, 1);

                }
              }
            }
          }
        }
        break;


      case "quotation":
        {
          /*  alert("1"); */
          if (name == "quotation") {
            /*  alert("2"); */
            if ($("#" + name).is(":checked")) {
              /*  alert("3"); */
              //sub menu checked
              $("#gstQuotation").prop("checked", true);
              $("#withoutGSTQuotation").prop("checked", true);
              $("#listOfQuotation").prop("checked", true);

              this.state.permissionHeader.push(name);
              this.state.permission.push("gstQuotation", "withoutGSTQuotation", "listOfQuotation");


            } else {

              $("#gstQuotation").prop("checked", false);
              $("#withoutGSTQuotation").prop("checked", false);
              $("#listOfQuotation").prop("checked", false);
              var i = this.state.permission.length;
              var iHeader = this.state.permissionHeader.length;


              while (i--) {
                if ("gstQuotation" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }
                if ("withoutGSTQuotation" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);


                }
                if ("listOfQuotation" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);


                }
              }
              while (iHeader--) {
                if ("quotation" == this.state.permissionHeader[iHeader]) {
                  this.state.permissionHeader.splice(iHeader, 1);

                }
              }
            }
          }
        }
        break;

      case "bank":
        {
          /*  alert("1"); */
          if (name == "bank") {
            /*  alert("2"); */

            if ($("#" + name).is(":checked")) {
              /*  alert("3"); */
              //sub menu checked

              $("#addBank").prop("checked", true);
              $("#listOfBank").prop("checked", true);


              this.state.permissionHeader.push(name);
              this.state.permission.push(
                "addBank",
                "listOfBank"

              );

            } else {
              /*  alert("4"); */
              $("#addBank").prop("checked", false);
              $("#listOfBank").prop("checked", false);

              var i = this.state.permission.length;
              var iHeader = this.state.permissionHeader.length;


              while (i--) {
                if ("addBank" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                }
                if ("listOfBank" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);


                }

              }
              while (iHeader--) {
                if ("bank" == this.state.permissionHeader[iHeader]) {
                  this.state.permissionHeader.splice(iHeader, 1);

                }
              }
            }
          }
        }
        break;

      case "fileGST":
        {
          /*  alert("1"); */
          if (name == "fileGST") {
            /*  alert("2"); */
            if ($("#" + name).is(":checked")) {
              /*  alert("3"); */
              //sub menu checked
              $("#GST3B").prop("checked", true);
              $("#GSTR1").prop("checked", true);
              $("#GSTROfflineTool").prop("checked", true);

              this.state.permissionHeader.push(name);
              this.state.permission.push(
                "GST3B",
                "GSTR1",
                "GSTROfflineTool"
              );

              console.log("if checked", name, this.state.permissionHeader);
              console.log("3", this.state.permission);
            } else {


              $("#GST3B").prop("checked", false);
              $("#GSTR1").prop("checked", false);
              $("#GSTROfflineTool").prop("checked", false);

              var i = this.state.permission.length;
              var iHeader = this.state.permissionHeader.length;

              console.log("4.1", iHeader, i);
              while (i--) {
                if ("GST3B" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                  console.log(
                    "4 splice i GST3B",
                    this.state.permission
                  );
                }
                if ("GSTR1" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                  console.log("4 splice i GSTR1 ", this.state.permission);
                }
                if ("GSTROfflineTool" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                  console.log(
                    "4 splice i GSTROfflineTool ",
                    this.state.permission
                  );
                }

              }
              while (iHeader--) {
                if ("fileGST" == this.state.permissionHeader[iHeader]) {
                  this.state.permissionHeader.splice(iHeader, 1);
                  console.log("4 splice i header", this.state.permissionHeader);
                }
              }
            }
          }
        }
        break;

      case "reports":
        {
          /*  alert("1"); */
          if (name == "reports") {
            /*  alert("2"); */
            if ($("#" + name).is(":checked")) {
              /*  alert("3"); */
              //sub menu checked
              $("#salesReport").prop("checked", true);
              $("#estimateReport").prop("checked", true);
              $("#purchaseReport").prop("checked", true);
              $("#quotationReport").prop("checked", true);
              $("#expenseReport").prop("checked", true);


              this.state.permissionHeader.push(name);
              this.state.permission.push(
                "salesReport", "estimateReport", "purchaseReport",
                "quotationReport", "expenseReport"
              );

              console.log("if checked", name, this.state.permissionHeader);
              console.log("3", this.state.permission);
            } else {
              /*  alert("4"); */
              $("#salesReport").prop("checked", false);
              $("#estimateReport").prop("checked", false);
              $("#purchaseReport").prop("checked", false);

              $("#quotationReport").prop("checked", false);
              $("#expenseReport").prop("checked", false);

              var i = this.state.permission.length;
              var iHeader = this.state.permissionHeader.length;

              console.log("4.1", iHeader, i);
              while (i--) {
                switch (this.state.permission[i]) {
                  case "salesReport":
                    this.state.permission.splice(i, 1);

                    console.log("4 splice i salesReport", this.state.permission);
                    break;
                  case "estimateReport":
                    this.state.permission.splice(i, 1);
                    console.log("4 splice i estimateReport ", this.state.permission);
                    break;

                  case "purchaseReport":
                    this.state.permission.splice(i, 1);
                    console.log("4 splice i purchaseReport ", this.state.permission);
                    break;
                  case "quotationReport":
                    this.state.permission.splice(i, 1);
                    console.log("4 splice i quotationReport", this.state.permission);
                    break;

                  case "expenseReport":
                    this.state.permission.splice(i, 1);
                    console.log("4 splice i expenseReport", this.state.permission);
                    break;

                }

              }
              while (iHeader--) {
                if ("reports" == this.state.permissionHeader[iHeader]) {
                  this.state.permissionHeader.splice(iHeader, 1);
                  console.log("4 splice i header", this.state.permissionHeader);
                }
              }
            }
          }
        }
        break;

      case "employee":
        {
          /*  alert("1"); */
          if (name == "employee") {
            /*  alert("2"); */
            if ($("#" + name).is(":checked")) {
              /*  alert("3"); */
              //sub menu checked

              $("#addEmployee").prop("checked", true);
              $("#listOfEmployee").prop("checked", true);
              $("#addRole").prop("checked", true);

              this.state.permissionHeader.push(name);
              this.state.permission.push(
                "addEmployee",
                "listOfEmployee",
                "addRole"
              );

              console.log("if checked", name, this.state.permissionHeader);
              console.log("3", this.state.permission);
            } else {



              $("#addEmployee").prop("checked", false);
              $("#listOfEmployee").prop("checked", false);
              $("#addRole").prop("checked", false);

              var i = this.state.permission.length;
              var iHeader = this.state.permissionHeader.length;

              console.log("4.1", iHeader, i);
              while (i--) {
                if ("addEmployee" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                  console.log(
                    "4 splice i addEmployee",
                    this.state.permission
                  );
                }
                if ("listOfEmployee" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                  console.log("4 splice i listOfEmployee ", this.state.permission);
                }
                if ("addRole" == this.state.permission[i]) {
                  this.state.permission.splice(i, 1);

                  console.log(
                    "4 splice i addRole ",
                    this.state.permission
                  );
                }

              }
              while (iHeader--) {
                if ("employee" == this.state.permissionHeader[iHeader]) {
                  this.state.permissionHeader.splice(iHeader, 1);
                  console.log("4 splice i header", this.state.permissionHeader);
                }
              }
            }
          }
        }
        break;

    }


  };


  componentDidMount() {

    SetCurrentPage("TaskMappingBasic");


    window.scrollTo(0, 0);

    var self = this;
    var roleName;
    var Roles = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Roles'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    roleName += '<option  value="" disabled selected hidden>Select a Role</option>';
    $.each(Roles, function (i, item) {

      roleName += '<option value="' + item.roleName + '">' + item.roleName + '</option>'

    });
    $("#roleName").append(roleName);
    $(document).ready(function () {
      $(".CheckBoxClass").click(function () {
        if ($("#ckbCheckAll").is(":checked")) {
          console.log("True");
          self.state.permissionHeader.push("master,sale,purchase,expense,quotation,bank,taskMapping,fileGST,reports,employee");
          self.state.permission.push(
            "addCustomer,listOfCustomer,addVendor,"
            + "listOfVendor,"
            + "addProduct,listOfProduct,saleOrder,saleInvoice,estimateOrder,"
            + "estimateInvoice,purchaseOrder,purchaseInvoice,gstQuotation,"
            + "withoutGSTQuotation,listOfQuotation,addBank,listOfBank,GST3B"
            + "GSTR1,GSTROfflineTool,expenseReport,salesReport,estimateReport,purchaseReport,quotationReport,addEmployee,listOfEmployee,addRole");


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


        confirmAlert({
          title: "Permission", // Title dialog
          message: "Updated Permission for " + self.state.roleName, // Message dialog
          confirmLabel: "Ok" // Text button confirm
        });
        var roleName = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Roles'), "shinchanbaby").toString(CryptoJS.enc.Utf8));



        /*
         *UPDATING PERMISSION FOR roleName MATCHING THE CHANGED PERMISSION roleName
         */
        if (self.state.roleName == roleName) {
          localStorage.setItem("Permissions", CryptoJS.AES.encrypt(JSON.stringify(data), "shinchanbaby"));
        }
        /*
         *UPDATING PERMISSION AFTER CHANGE
         */
        //self.ResetPermission();

        ReactDOM.render(
          <Router>
            <div>
              {/*  <Route path="/" component={taskMapping} />
               */}{" "}
              <Route path="/" component={TaskMappingBasic} />
            </div>
          </Router>,
          document.getElementById("contentRender")
        );
      },
      error: function (data) {
        confirmAlert({
          title: "No Internet", // Title dialog
          message: "Network Connection Problem", // Message dialog
          confirmLabel: "Ok" // Text button confirm
        });
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
          <div className="col-xs-12 col-sm-12 col-lg-6">
            <label>
              Role*
              <select
                id="roleName"
                className="form-control"
                onChange={this.handleUserInput}
                name="roleName"
              />
            </label>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-lg-6">
          <input class="CheckBoxClass" name="checkbox" type="checkbox" id="ckbCheckAll" /> Select All
        <div class="row">
            <div>
              <div className="col-xs-12 col-sm-6 col-lg-6">


                <div>
                  <label>
                    <input
                      type="checkbox"
                      value={this.state.master}
                      name="master"
                      onChange={this.handleCheckBoxHeader}
                      id="master"
                      class="checkBoxClass"
                      style={{ marginRight: "5px" }}
                    />{" "}
                    ERP Master
                </label>
                  <div style={{ paddingLeft: "45px" }}>
                    <div class="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          value={this.state.addCustomer}
                          name="addCustomer"
                          onChange={this.handleCheckBoxMaster}
                          id="addCustomer"
                          class="checkBoxClass"
                        />
                        Add Customer
                    </label>
                    </div>
                    <div class="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          value={this.state.listOfCustomer}
                          name="listOfCustomer"
                          onChange={this.handleCheckBoxMaster}
                          id="listOfCustomer"
                          class="checkBoxClass"
                        />
                        List of Customer
                    </label>
                    </div>
                    <div class="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          value={this.state.addVendor}
                          name="addVendor"
                          onChange={this.handleCheckBoxMaster}
                          id="addVendor"
                          class="checkBoxClass"
                        />
                        Add Vendor
                    </label>
                    </div>
                    <div class="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          value={this.state.listOfVendor}
                          name="listOfVendor"
                          onChange={this.handleCheckBoxMaster}
                          id="listOfVendor"
                          class="checkBoxClass"
                        />
                        List of Vendor
                    </label>
                    </div>
                    <div class="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          value={this.state.addProduct}
                          name="addProduct"
                          onChange={this.handleCheckBoxMaster}
                          id="addProduct"
                          class="checkBoxClass"
                        />
                        Add Product
                    </label>
                    </div>
                    <div class="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          value={this.state.listOfProduct}
                          name="listOfProduct"
                          onChange={this.handleCheckBoxMaster}
                          id="listOfProduct"
                          class="checkBoxClass"
                        />
                        List of Product
                    </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      value={this.state.sale}
                      name="sale"
                      onChange={this.handleCheckBoxHeader}
                      id="sale"
                      class="checkBoxClass"
                      style={{ marginRight: "5px" }}
                    />{" "}
                    Sale
                </label>
                  <div style={{ paddingLeft: "45px" }}>
                    <div class="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          value={this.state.saleOrder}
                          name="saleOrder"
                          onChange={this.handleCheckBoxSale}
                          id="saleOrder"
                          class="checkBoxClass"
                        />
                        Sale Order
                    </label>
                    </div>
                    <div class="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          value={this.state.saleInvoice}
                          name="saleInvoice"
                          onChange={this.handleCheckBoxSale}
                          id="saleInvoice"
                          class="checkBoxClass"
                        />
                        Sale Invoice
                    </label>
                    </div>
                    <div class="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          value={this.state.estimateOrder}
                          name="estimateOrder"
                          onChange={this.handleCheckBoxSale}
                          id="estimateOrder"
                          class="checkBoxClass"
                        />
                        Estimate Order
                    </label>
                    </div>
                    <div class="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          value={this.state.estimateInvoice}
                          name="estimateInvoice"
                          onChange={this.handleCheckBoxSale}
                          id="estimateInvoice"
                          class="checkBoxClass"
                        />
                        Estimate Invoice
                    </label>
                    </div>

                  </div>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      value={this.state.purchase}
                      name="purchase"
                      onChange={this.handleCheckBoxHeader}
                      id="purchase"
                      class="checkBoxClass"
                      style={{ marginRight: "5px" }}
                    />
                    Purchase
                </label>
                  <div style={{ paddingLeft: "45px" }}>
                    <div class="checkbox ">
                      <label>
                        <input
                          type="checkbox"
                          value={this.state.purchaseOrder}
                          name="purchaseOrder"
                          onChange={this.handleCheckBoxPurchase}
                          id="purchaseOrder"
                          class="checkBoxClass"
                        />
                        Purchase Order
                    </label>
                    </div>
                    <div class="checkbox ">
                      <label>
                        <input
                          type="checkbox"
                          value={this.state.purchaseInvoice}
                          name="purchaseInvoice"
                          onChange={this.handleCheckBoxPurchase}
                          id="purchaseInvoice"
                          class="checkBoxClass"
                        />
                        Purchase Invoice
                    </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      value={this.state.expense}
                      name="expense"
                      onChange={this.handleCheckBoxHeader}
                      id="expense"
                      class="checkBoxClass"
                      style={{ marginRight: "5px" }}
                    />
                    Expense
                </label>

                </div>



              </div>
            </div>

            <div className="col-xs-12 col-sm-6 col-lg-6">


              <div >
                <label>
                  <input
                    type="checkbox"
                    value={this.state.quotation}
                    name="quotation"
                    onChange={this.handleCheckBoxHeader}
                    id="quotation"
                    class="checkBoxClass"
                    style={{ marginRight: "5px" }}
                  />
                  Quotation</label>
                <div style={{ paddingLeft: "45px" }}>
                  <div class="checkbox" >

                    <label>
                      <input
                        type="checkbox"
                        value={this.state.gstQuotation}
                        name="gstQuotation"
                        onChange={this.handleCheckBoxQuotation}
                        id="gstQuotation"
                        class="checkBoxClass"
                      />
                      GST Quotation
 </label>
                  </div>

                  <div class="checkbox ">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.withoutGSTQuotation}
                        name="withoutGSTQuotation"
                        onChange={this.handleCheckBoxQuotation}
                        id="withoutGSTQuotation"
                        class="checkBoxClass"
                      />
                      withoutGST Quotation
 </label>
                  </div>
                  <div class="checkbox ">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.listOfQuotation}
                        name="listOfQuotation"
                        onChange={this.handleCheckBoxQuotation}
                        id="listOfQuotation"
                        class="checkBoxClass"
                      />
                      QuotationList
 </label>
                  </div>

                </div>
              </div>


              <div>
                <label>
                  <input
                    type="checkbox"
                    value={this.state.bank}
                    name="bank"
                    onChange={this.handleCheckBoxHeader}
                    id="bank"
                    style={{ marginRight: "5px" }}
                    class="checkBoxClass"
                  />
                  Bank
              </label>
                <div style={{ paddingLeft: "45px" }}>
                  <div class="checkbox ">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.addBank}
                        name="addBank"
                        onChange={this.handleCheckBoxBank}
                        id="addBank"
                        class="checkBoxClass"
                      />
                      Add Bank
                  </label>
                  </div>
                  <div class="checkbox ">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.listOfBank}
                        name="listOfBank"
                        onChange={this.handleCheckBoxBank}
                        id="listOfBank"
                        class="checkBoxClass"
                      />
                      List of Bank
                  </label>
                  </div>


                </div>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    value={this.state.fileGST}
                    name="fileGST"
                    onChange={this.handleCheckBoxHeader}
                    id="fileGST"
                    class="checkBoxClass"
                    style={{ marginRight: "5px" }}
                  />
                  File GST
                </label>
                <div style={{ paddingLeft: "45px" }}>
                  <div class="checkbox ">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.GST3B}
                        name="GST3B"
                        onChange={this.handleCheckBoxFileGST}
                        id="GST3B"
                        class="checkBoxClass"
                      />
                      GST 3B
                    </label>
                  </div>
                  <div class="checkbox ">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.GSTR1}
                        name="GSTR1"
                        onChange={this.handleCheckBoxFileGST}
                        id="GSTR1"
                        class="checkBoxClass"
                      />
                      GSTR1
                    </label>
                  </div>
                  <div class="checkbox ">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.GSTROfflineTool}
                        name="GSTROfflineTool"
                        onChange={this.handleCheckBoxFileGST}
                        id="GSTROfflineTool"
                        class="checkBoxClass"
                      />
                      GSTR Offline Tool
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    value={this.state.employee}
                    name="employee"
                    onChange={this.handleCheckBoxHeader}
                    id="employee"
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
                        value={this.state.addEmployee}
                        name="addEmployee"
                        onChange={this.handleCheckBoxEmployee}
                        id="addEmployee"
                        class="checkBoxClass"
                      />
                      Add Employee
                    </label>
                  </div>
                  <div class="checkbox ">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.listOfEmployee}
                        name="listOfEmployee"
                        onChange={this.handleCheckBoxEmployee}
                        id="listOfEmployee"
                        class="checkBoxClass"
                      />
                      List of Employee
                    </label>
                  </div>
                  <div class="checkbox ">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.addRole}
                        name="addRole"
                        onChange={this.handleCheckBoxEmployee}
                        id="addRole"
                        class="checkBoxClass"
                      />
                      Add Role
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    value={this.state.taskMapping}
                    name="taskMapping"
                    onChange={this.handleCheckBoxHeader}
                    id="taskMapping"
                    class="checkBoxClass"
                    style={{ marginRight: "5px" }}
                  />
                  Task Mapping
                </label>

              </div>
              <label>
                <input
                  type="checkbox"
                  value={this.state.reports}
                  name="reports"
                  onChange={this.handleCheckBoxHeader}
                  id="reports"
                  class="checkBoxClass"
                  style={{ marginRight: "5px" }}
                />
                Reports
            </label>
              <div>
                <div style={{ paddingLeft: "45px" }}>
                  <form class="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.salesReport}
                        name="salesReport"
                        onChange={this.handleCheckBoxReports}
                        id="salesReport"
                        class="checkBoxClass reportClass"
                      />
                      Sales Report(Daily,Monthly,Yearly,Datewise,CustomerStatement)
                  </label>
                  </form>
                  <div class="checkbox ">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.estimateReport}
                        name="estimateReport"
                        onChange={this.handleCheckBoxReports}
                        id="estimateReport"
                        class="checkBoxClass reportClass"
                      />
                      Estimate Report(Daily,Monthly,Yearly,Datewise,CustomerStatement)
                  </label>
                  </div>
                  <div class="checkbox ">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.expenseReport}
                        name="expenseReport"
                        onChange={this.handleCheckBoxReports}
                        id="expenseReport"
                        class="checkBoxClass reportClass"
                      />
                      Expense Report(Daily,Monthly,Yearly,Datewise)
                  </label>
                  </div>

                  <div class="checkbox ">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.purchaseReport}
                        name="purchaseReport"
                        onChange={this.handleCheckBoxReports}
                        id="purchaseReport"
                        class="checkBoxClass reportClass"
                      />
                      Purchase Report(Daily,Monthly,Yearly,Datewise,VendorStatement)
                  </label>
                  </div>
                  <div class="checkbox ">
                    <label>
                      <input
                        type="checkbox"
                        value={this.state.quotationReport}
                        name="quotationReport"
                        onChange={this.handleCheckBoxReports}
                        id="quotationReport"
                        class="checkBoxClass reportClass"
                      />
                      Quotation Report(GST Quotation,WithoutGST Quotation)
                  </label>
                  </div>


                </div>
              </div>

            </div>
          </div>
          <button
            type="button"
            onClick={() => this.Submit()}
            disabled={!this.state.valid}
            style={{
              marginLeft: "20px",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "20px",
              marginBottom: "10px"
            }}
            class="btn btn-primary"
          >
            Give Permission
          </button>
        </div>
      </div>
    );
  }
}
export default TaskMappingBasic;
