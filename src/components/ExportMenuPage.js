
import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import SalesReportEdit from './SalesReportEdit';
import SalesReportDisplay from './SalesReportDisplay';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import SalesReportUpdate from './SalesReportUpdate';
// import 'sweetalert2/src/sweetalert2.scss';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './DownloadButton.css';
import './ExportMenuPage.css';
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';

var currentRow;
class ExportMenuPage extends Component {
  constructor(data) {
    super(data)

    var today = new Date();
    var today1 = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var month= today.getMonth() + 1; 
    
   
   
   
    this.state = {
      date: today1,
      companyId: companyId,
      month:month,
      data:[],
      columns:[],


    };

    this.setState({

      companyId: companyId,

    })

  }
  

  componentDidMount() {
    SetCurrentPage("ExportMenuPage");
    $("#customerexportinstruction").hide();
    $("#productexportinstruction").hide();  
    $("#employeeexportinstruction").hide();  
    $("#vendorexportinstruction").hide();
    $("#vehiclemakemodelexportinstruction").hide();


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

  CustomerExportFunc(){

    $("#customerexportinstruction").show();
    $("#productexportinstruction").hide();  
    $("#employeeexportinstruction").hide();  
    $("#vendorexportinstruction").hide();
    $("#vehiclemakemodelexportinstruction").hide();
  
  }

  CustomerExportDownloadFunc(){

    $("#customerexportinstruction").hide();

    var companyId = CryptoJS.AES.decrypt(
        localStorage.getItem("CompanyId"),
        "shinchanbaby"
      ).toString(CryptoJS.enc.Utf8);
      this.state.companyId = companyId;
      var today = new Date();
      var today1 =
        today.getFullYear() +
        "_" +
        (today.getMonth() + 1) +
        "_" +
        today.getDate();
  
      var totalName =
        companyId +
        "_" +
        today.getHours() +
        "_" +
        today.getMinutes() +
        "_" +
        today.getSeconds() +
        "_" +
        today1 +"customer"+
        ".xlsx";
  
      this.state.customerFileName = totalName;
  
  
      this.setState({
        customerFileName: this.state.customerFileName,
        companyId: this.state.companyId
      });
  
      $.ajax({
        type: "POST",
        data: JSON.stringify({
          customerFileName: this.state.customerFileName,
          companyId: this.state.companyId
        }),
  
  
        url: " http://15.206.129.105:8080/ThroughBooksCOAPI/Excel/ExportCustomerFile",
        contentType: "application/json",
        dataType: "json",
        async: false,
        success: function (data, textStatus, jqXHR) {
  
          
                 Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: "The File Requested For Import Is Downloaded Successfully", // Message dialog  
                  showConfirmButton: false,
                  timer: 2000
                })
  
  
        },
        error: function (data) {
        
          Swal.fire({
              position: 'center',
              icon: 'error',
              title: "Network Connection Problem", 
              showConfirmButton: false,
              timer: 1500
            })
            
        }
      });
  }
  EmployeeExportFunc(){

    $("#customerexportinstruction").hide();
    $("#productexportinstruction").hide();  
    $("#employeeexportinstruction").show();  
    $("#vendorexportinstruction").hide();
    $("#vehiclemakemodelexportinstruction").hide();
  }

  EmployeeExportDownloadFunc(){
  
    $("#employeeexportinstruction").hide();  

    var companyId = CryptoJS.AES.decrypt(
        localStorage.getItem("CompanyId"),
        "shinchanbaby"
      ).toString(CryptoJS.enc.Utf8);
      this.state.companyId = companyId;
      var today = new Date();
      var today1 =
        today.getFullYear() +
        "_" +
        (today.getMonth() + 1) +
        "_" +
        today.getDate();
  
      var totalName =
        companyId +
        "_" +
        today.getHours() +
        "_" +
        today.getMinutes() +
        "_" +
        today.getSeconds() +
        "_" +
        today1 +"employee"+
        ".xlsx";
  
      this.state.employeeFileName = totalName;
  
  
      this.setState({
          employeeFileName: this.state.employeeFileName,
          companyId: this.state.companyId
      });
  
      $.ajax({
        type: "POST",
        data: JSON.stringify({
          employeeFileName: this.state.employeeFileName,
          companyId: this.state.companyId
        }),
  
  
        url: " http://15.206.129.105:8080/ThroughBooksCOAPI/Excel/ExportEmployeeFile",
        contentType: "application/json",
        dataType: "json",
        async: false,
        success: function (data, textStatus, jqXHR) {
  
  
  
            Swal.fire({
                position: 'center',
                icon: 'success',
                title:  "The File Requested For Import Is Downloaded Successfully", 
                showConfirmButton: false,
                timer: 2000
              })
          
  
  
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
 
  ProductExportFunc(){

    $("#customerexportinstruction").hide();
    $("#productexportinstruction").show();  
    $("#employeeexportinstruction").hide();  
    $("#vendorexportinstruction").hide();
    $("#vehiclemakemodelexportinstruction").hide();

  }
  ProductExportDownloadFunc(){

  
    $("#productexportinstruction").hide(); 

    var companyId = CryptoJS.AES.decrypt(
        localStorage.getItem("CompanyId"),
        "shinchanbaby"
      ).toString(CryptoJS.enc.Utf8);
      this.state.companyId = companyId;
      var today = new Date();
      var today1 =
        today.getFullYear() +
        "_" +
        (today.getMonth() + 1) +
        "_" +
        today.getDate();
  
      var totalName =
        companyId +
        "_" +
        today.getHours() +
        "_" +
        today.getMinutes() +
        "_" +
        today.getSeconds() +
        "_" +
        today1 +"product"+
        ".xlsx";
  
      this.state.productFileName = totalName;
  
  
      this.setState({
        productFileName: this.state.productFileName,
        companyId: this.state.companyId
      });
  
      $.ajax({
        type: "POST",
        data: JSON.stringify({
          productFileName: this.state.productFileName,
          companyId: this.state.companyId
        }),
  
  
        url: " http://15.206.129.105:8080/ThroughBooksCOAPI/Excel/ExportProductFile",
        contentType: "application/json",
        dataType: "json",
        async: false,
        success: function (data, textStatus, jqXHR) {
  
          Swal.fire({
            position: 'center',
            icon: 'success',
            title:  "The File Requested For Import Is Downloaded Successfully", 
            showConfirmButton: false,
            timer: 2000
          })
  
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

  VendorExportFunc(){

    $("#customerexportinstruction").hide();
    $("#productexportinstruction").hide();  
    $("#employeeexportinstruction").hide();  
    $("#vendorexportinstruction").show();
    $("#vehiclemakemodelexportinstruction").hide();

  }
 
  VendorExportDownloadFunc(){

    $("#vendorexportinstruction").hide();

    var companyId = CryptoJS.AES.decrypt(
        localStorage.getItem("CompanyId"),
        "shinchanbaby"
      ).toString(CryptoJS.enc.Utf8);
      this.state.companyId = companyId;
      var today = new Date();
      var today1 =
        today.getFullYear() +
        "_" +
        (today.getMonth() + 1) +
        "_" +
        today.getDate();
  
      var totalName =
        companyId +
        "_" +
        today.getHours() +
        "_" +
        today.getMinutes() +
        "_" +
        today.getSeconds() +
        "_" +
        today1 +"vendor"+
        ".xlsx";
  
      this.state.vendorFileName = totalName;
  
  
      this.setState({
          vendorFileName: this.state.vendorFileName,
        companyId: this.state.companyId
      });
  
      $.ajax({
        type: "POST",
        data: JSON.stringify({
          vendorFileName: this.state.vendorFileName,
          companyId: this.state.companyId
        }),
  
  
        url: " http://15.206.129.105:8080/ThroughBooksCOAPI/Excel/ExportVendorFile",
        contentType: "application/json",
        dataType: "json",
        async: false,
        success: function (data, textStatus, jqXHR) {
  
                     Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: "The File Requested For Import Is Downloaded Successfully", // Message dialog
                      showConfirmButton: false,
                      timer: 2000
                    })
  
  
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
 
  VehicleMakemodelExportFunc(){
    $("#customerexportinstruction").hide();
    $("#productexportinstruction").hide();  
    $("#employeeexportinstruction").hide();  
    $("#vendorexportinstruction").hide();
    $("#vehiclemakemodelexportinstruction").show();
  }

  VehicleMakemodelExportDownloadFunc(){
    $("#vehiclemakemodelexportinstruction").hide();

    var companyId = CryptoJS.AES.decrypt(
        localStorage.getItem("CompanyId"),
        "shinchanbaby"
      ).toString(CryptoJS.enc.Utf8);
      this.state.companyId = companyId;
      var today = new Date();
      var today1 =
        today.getFullYear() +
        "_" +
        (today.getMonth() + 1) +
        "_" +
        today.getDate();
  
      var totalName =
        companyId +
        "_" +
        today.getHours() +
        "_" +
        today.getMinutes() +
        "_" +
        today.getSeconds() +
        "_" +
        today1 +"vehiclemakemodel"+
        ".xlsx";
  
      this.state.vehicleMakeModelFileName = totalName;
  
  
      this.setState({
        vehicleMakeModelFileName: this.state.vehicleMakeModelFileName,
        companyId: this.state.companyId
      });
  
      $.ajax({
        type: "POST",
        data: JSON.stringify({
          vehicleMakeModelFileName: this.state.vehicleMakeModelFileName,
          companyId: this.state.companyId
        }),
  
  
        url: " http://15.206.129.105:8080/ThroughBooksCOAPI/Excel/ExportVehicleMakeModelFile",
        contentType: "application/json",
        dataType: "json",
        async: false,
        success: function (data, textStatus, jqXHR) {
  
                     Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: "The File Requested For Import Is Downloaded Successfully", // Message dialog
                      showConfirmButton: false,
                      timer: 2000
                    })
  
  
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
      <div class="container">
      <div className="">
            <div className="">
              <BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
            </div>
        
          <div className="inv_HeaderCls">
            <h3 style={{textAlign:"center"}}>Export Menu</h3>
          </div>
          </div>
        <div class="card">
         
          <div>
            <div class="card-body">
            <div>
            <ul>
               
                  {/* CUSTOMER FUNC */}
                  <div id="rcorners1">
                  <a  href="#" >
                  <span onClick={() => this.CustomerExportFunc()}  class="glyphicon glyphicon-import">
                  <span style={{ paddingLeft: "10px" ,textAlign:"center"}}>Customer</span>
                  </span> &nbsp;</a>
                  </div>
                 <br/>
             
                
                <div id="customerexportinstruction" >
                  <ol>
                    <li>
                      Ensure <b>Customer Name</b> contains only Alphabets
                    </li>
                    <li>
                      Ensure <b>ContactNo</b>,<b>AlternateNo</b> are only Numbers
                    </li>
                    <li>
                      Ensure <b>Email Id</b> is of correct Format
                    </li>
                  
                  </ol>
                  <a
                    href="ExportCustomer.xlsx"
                    style={{ color: "red", textDecoration: "none", borderBottom: "1px solid blue" }}
                    // href="#myModal"
                    //  data-toggle="modal" data-target="#myModal" 
                    download={this.state.customerFileName}
                    onClick={() => this.CustomerExportDownloadFunc()}
                  //  style={{ backgroundColor: "#677785", color: "white" }}
                  >  <span style={{ fontSize: "20px" }}
                    class="glyphicon glyphicon-download"
                  >
                      <span style={{ paddingLeft: "10px", fontSize: "24px" }}>Export&ensp;<b>[</b>Download&ensp;Excel&ensp;File<b>]</b></span></span>
                  </a>
                </div>
                <br/>
                {/* EMPLOYEE FUNC */}
                <div id="rcorners1">
                  <a href="#">
                  <span onClick={() => this.EmployeeExportFunc()} class="glyphicon glyphicon-import">
               
               <span style={{ paddingLeft: "10px" }}>Employee</span>
                  </span> &nbsp;</a>
                </div>
                <br/>
                <div id="employeeexportinstruction" class="modal-body" >
                  <ol>
                  <li>
                    1.Ensure EmployeeName,Address,EmailId,contactNo,
                    Salary,Designation Are Filled For Sure
                    </li>
                  <li>2.Ensure State,Nationality are only alphabets</li>
                  <li>3.Date Formats of <b>DOB</b> Should be Provided in DD-MM-YYYY Format (date formats should be followed strictly)</li>
                  </ol>
                  <a
                    href="EmployeeExport.xlsx"
                    style={{ color: "red", textDecoration: "none", borderBottom: "1px solid blue" }}
                    // href="#myModal"
                    //  data-toggle="modal" data-target="#myModal" 
                    download={this.state.employeeFileName}
                    onClick={() => this.EmployeeExportDownloadFunc()}
                  //  style={{ backgroundColor: "#677785", color: "white" }}
                  >  <span style={{ fontSize: "20px" }}
                    class="glyphicon glyphicon-download"
                  >
                      <span style={{ paddingLeft: "10px", fontSize: "24px" }}>Export&ensp;<b>[</b>Download&ensp;Excel&ensp;File<b>]</b></span></span>
                  </a>
               
          </div>
                <br/>
            {/* PRODUCT FUNC */}
            <div id="rcorners1">
            <a href="#">
            <span onClick={() => this.ProductExportFunc()} class="glyphicon glyphicon-import">
               
               <span style={{ paddingLeft: "10px" }}>Product</span>
                  </span> &nbsp;</a>
                  </div>
                    <br/>
            
         
                <div id="productexportinstruction">
                  <ol>
                  <li>
                  1.Ensure ProductName,ProductType,Productategory Are Filled For Sure
                    </li>
                  <li>2.Ensure Quantity,QuantityLimit,Statetax,SGST,IGST are only Numbers</li>
                  <li>3.Ensure SaleRate,PurchaseRate are Numbers or Numbers With 2 Decimals Places</li>
                  <li>4.Ensure Service Time is Mentioned For Services</li>
                  </ol>
                  <a
                    href="ProductExport.xlsx"
                    style={{ color: "red", textDecoration: "none", borderBottom: "1px solid blue" }}
                    // href="#myModal"
                    //  data-toggle="modal" data-target="#myModal" 
                    download={this.state.productFileName}
                    onClick={() => this.ProductExportDownloadFunc()}
                  //  style={{ backgroundColor: "#677785", color: "white" }}
                  >  <span style={{ fontSize: "20px" }}
                    class="glyphicon glyphicon-download"
                  >
                      <span style={{ paddingLeft: "10px", fontSize: "24px" }}>Export&ensp;<b>[</b>Download&ensp;Excel&ensp;File<b>]</b></span></span>
                  </a>
                
          </div>
                <br/>
                   {/* VENDOR FUNC */}
             <div id="rcorners1">
            <a href="#">
            <span onClick={() => this.VendorExportFunc()}  class="glyphicon glyphicon-import">
               
               <span style={{ paddingLeft: "10px" }}>Vendor</span>
                  </span> &nbsp;</a>
                    </div>
                    <br/>
                   
                <div id="vendorexportinstruction">
                  <ol>
                    <li>
                      Ensure <b>VendorName</b> contains only Alphabets
                    </li>
                    <li>
                      Ensure <b>ContactNo</b>,<b>AlternateNo</b> are only Numbers
                    </li>
                    <li>
                      Ensure <b>Email Id</b> is of correct Format
                    </li>
                  
                  </ol>
                  <a
                    href="ExportVendor.xlsx"
                    style={{ color: "red", textDecoration: "none", borderBottom: "1px solid blue" }}
                    // href="#myModal"
                    //  data-toggle="modal" data-target="#myModal" 
                    download={this.state.vendorFileName}
                    onClick={() => this.VendorExportDownloadFunc()}
                  //  style={{ backgroundColor: "#677785", color: "white" }}
                  >  <span style={{ fontSize: "20px" }}
                    class="glyphicon glyphicon-download"
                  >
                      <span style={{ paddingLeft: "10px", fontSize: "24px" }}>Export&ensp;<b>[</b>Download&ensp;Excel&ensp;File<b>]</b></span></span>
                  </a>
                
          </div>
                {/* VEHICLE MAKE MODEL FUNC */}
     {/*  <div id="rcorners1">
            <a href="#">
            <span onClick={() => this.VehicleMakemodelExportFunc()}  class="glyphicon glyphicon-import">
               
               <span style={{ paddingLeft: "10px" }}>Vehicle MakeModel</span>
                  </span> &nbsp;</a>
                    </div>
                    <br/>
                   
                <div id="vehiclemakemodelexportinstruction">
                  <ol>
                    <li>
                      Ensure <b>Vehicle Make </b>  is Entered
                    </li>
                    <li>
                      Ensure atleast One<b>Vehicle Model</b>is Provided for Every<b>Vehicle Make</b>
                    </li>
                    <li>
                      Ensure <b>Fuelype</b>  is Selected for Every Vehicle Make & Model
                    </li>
                   
                  </ol>
                  <a
                    href="VehicleMakeModelExport.xlsx"
                    style={{ color: "red", textDecoration: "none", borderBottom: "1px solid blue" }}
                    // href="#myModal"
                    //  data-toggle="modal" data-target="#myModal" 
                    download={this.state.vehicleMakeModelFileName}
                    onClick={() => this.VehicleMakemodelExportDownloadFunc()}
                  //  style={{ backgroundColor: "#677785", color: "white" }}
                  >  <span style={{ fontSize: "20px" }}
                    class="glyphicon glyphicon-download"
                  >
                      <span style={{ paddingLeft: "10px", fontSize: "24px" }}>Export&ensp;<b>[</b>Download&ensp;Excel&ensp;File<b>]</b></span></span>
                  </a>
                
          </div>
                */}
                 
     </ul>
            
            
            </div>
            
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ExportMenuPage;