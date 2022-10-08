
import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import VendorEntryForm from './VendorEntryForm';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
  GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import DashboardOverall from './MaincontentDashboard/DashboardOverall';

import FooterText from './FooterText';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import "./DownloadButton.css";
import "./MainPageRedirectButton.css";
import VehicleRegistrationListView from './VehicleRegistrationListView';
import AddVehicle from './AddVehicle';

import VehicleRegistrationListEdit from './VehicleRegistrationListEdit';
import SaleInvoiceInstant from './SaleInvoiceInstant';
import ServiceRegistration from './ServiceRegistration/ServiceRegistration';
//import { GetEmployeeSite,GetCurrentSite  } from './ConstSiteFunction';
import {ServiceRegistrationIcons,Invoice_xlDownldBtn} from  './ServiceRegistration/IconComponents';
import ReactTooltip from 'react-tooltip';
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';


var currentRow;
var i = 1;

class VehicleRegistrationList extends Component {
  constructor(data) {
    super(data)
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    this.state = {
      staffId:staffId,
      employeeName:employeeName,
     role:role,      
      contactNo: '',   
      columns: [],
      dataList: [],
    }

    
    this.InstantSaleInvoice=this.InstantSaleInvoice.bind(this);
    this.AddService=this.AddService.bind(this);
    this.ViewService=this.ViewService.bind(this);
    this.EditService=this.EditService.bind(this);
    this.DeleteService=this.DeleteService.bind(this);
    this.DownLoadService=this.DownLoadService.bind(this);

  }
  componentDidMount() {
    SetCurrentPage("VehicleRegistrationList");

    $("#nodata").hide();
    $("#tableOverflow1").hide();
  
    this.GetData();
    window.scrollTo(0, 0);
   
  }
 
  GetData() {
    $("ReactHTMLTableToExcel").css("background-color","#05a4b5");
    $(".btn-default").css("background-color","#05a4b5");
    $("ReactHTMLTableToExcel").css("color","white");
    $(".btn-default").css("color","white");
    
    var self = this;
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
        empSites:GetEmployeeSite() ,
      }),
      contentType: "application/json",
      dataType: 'json',
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/ServiceRegistration/ServiceRegistrationList",
      async: false,
      crossDomain: true,
      success: function (data, textStatus, jqXHR) {
        var no;
  
        self.state.dataList=[];
        if (data.serviceRegistrationList.length != 0) {
      
      
            
            
            
            
            
     var tab = '<thead><tr class="headcolor"><th>BookingId</th><th>Vehicle RegistrationNo</th>'
          +'<th>CustomerName</th><th>ContactNo</th><th>Email Id</th><th>Services</th>'
          +'</tr></thead>';

         $.each(data.serviceRegistrationList, function (i, item) {
            no = parseInt(i) + 1;
            tab += '<tbody id= "myTable" ><tr  id="tabletextcol" ><td>' + item.bookingId + '</td>'
            +'<td>' + item.vehicleRegNo + '</td>'
          
            +'<td>' + item.customerName + '</td>'
            +'<td>' + item.contactNo + '</td>'
            +'<td>' + item.email + '</td>'
            +'<td>' + item.serviceName + '</td></tr></tbody>';

           self.state.dataList[i] = {
              "Booking Id":item.bookingId,
              "Vehicle Registration No":item.vehicleRegNo,
              "Customer Name":item.customerName,
              "Contact No":item.contactNo,
              "Email Id":item.emailId,  
              "Services":item.serviceName, 
              "Vehicle Make":item.vehicleMake,
              "Vehicle Model":item.vehicleModel,
              "Vehicle FuelType":item.vehicleFuelType,
              "CustomerId":item.customerId,
              "Status":item.status,
              
           };
        
          });
          $("#tableHeadings").append(tab);
         // self.state.columns = self.GetColumns();
          if (self.state.dataList.length > 0) {
            self.state.columns = self.GetColumns();
          }
            } else {
          $("#nodata").show();
        
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

  }
  GetColumns(){

    return Object.keys(this.state.dataList[0]).map(key => {
      if (
     
        key != "CustomerId" &&
        key !="Status"
         ) {
        return {
          Header: key,
          accessor: key,
        //  show: false
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



  onTrRowClick = (state, rowInfo, column, instance) => {
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
            
           
  


            var vehicleRegistrationNo =rowInfo.original["Vehicle Registration No"];
            var bookingId =rowInfo.original["Booking Id"];
            var customerName = rowInfo.original["Customer Name"];
            var contactNo =rowInfo.original["Contact No"];
            var emailId = rowInfo.original["Email Id"];
            var services = rowInfo.original["Services"];
      
            var vehicleMake=rowInfo.original["Vehicle Make"];
            var vehicleModel=rowInfo.original["Vehicle Model"];
            var vehicleFuelType=rowInfo.original["Vehicle FuelType"];
            var customerId=rowInfo.original["CustomerId"];
            var status=rowInfo.original["Status"];


            this.state.vehicleRegistrationNo = vehicleRegistrationNo;
            this.state.bookingId = bookingId;
            this.state.customerName = customerName;
            this.state.contactNo = contactNo;
            this.state.emailId = emailId;
            this.state.services = services;
         
            this.state.vehicleMake=vehicleMake;
            this.state.vehicleModel=vehicleModel;
            this.state.vehicleFuelType=vehicleFuelType;
            this.state.customerId=customerId;
            this.state.status=status;

            this.setState({
              vehicleRegistrationNo: this.state.vehicleRegistrationNo,
         
              bookingId: this.state.bookingId,
              customerName: this.state.customerName,
              contactNo: this.state.contactNo,
              emailId: this.state.emailId,
              services: this.state.services,
              vehicleMake:this.state.vehicleMake,
              vehicleModel:this.state.vehicleModel,
              vehicleFuelType:this.state.vehicleFuelType,
              customerId:this.state.customerId,
              status:this.state.status,
               });
  
                this.state.rowIndexValue=rowInfo.index;
        },
        style: {
            background: rowInfo.index === this.state.selected ? '#00afec' :'',
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



  Delete(rowIndexValue) {
    var self = this;

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
     
        companyId: self.state.companyId,
        staffId:this.state.staffId,
        employeeName:this.state.employeeName,
      role:this.state.role,
      bookingId:self.state.bookingId,
 
 
       

      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/master/deleteVehicleRegistration",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {
       
        var array = [...self.state.dataList]; // make a new copy of array instead of mutating the same array directly.
        array.splice(rowIndexValue, 1);
        self.state.dataList=[];
        self.state.dataList=array;
        self.setState({dataList: array});

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

  NoAction() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={VehicleRegistrationList} />
        </div>
      </Router>,
      document.getElementById('contentRender'));

  }

  /* *********** NEW ICON FUNCTION ************** */

  InstantSaleInvoice(){

    var self=this;

    if( this.state.bookingId===undefined){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select BookingId ',
       
      })
    }
    
    else{
   if(this.state.status=="2"){
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Invoice is already generated for this BookingId ',
     
    })
   }else{
     console.log("data to instant from list:",this.state.vehicleRegistrationNo,this.state.bookingId,
     this.state.customerName,this.state.contactNo,this.state.customerId)
    ReactDOM.render(

      <Router>
        <div>
      
          <Route path="/" component={() => <SaleInvoiceInstant 
           vehicleRegistrationNo={this.state.vehicleRegistrationNo}
           
           bookingId={this.state.bookingId}
           customerName={this.state.customerName}
           contactNo={this.state.contactNo}
           emailId={ this.state.emailId}
           services={ this.state.services} vehicleMake={this.state.vehicleMake}
           vehicleModel={this.state.vehicleModel}
           vehicleFuelType={this.state.vehicleFuelType}
           customerId={this.state.customerId}
          
          
/>} />

        </div>
      </Router>,
      document.getElementById('contentRender'));
   }
     
    }
  }

  AddService(){
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={ServiceRegistration} />


        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }

  ViewService(){
    var self=this;

    if( this.state.bookingId===undefined){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select BookingId ',
       
      })
    }else{
      
      ReactDOM.render(
        <Router>
          <div>
        
            <Route path="/" component={() => <VehicleRegistrationListView 
             vehicleRegistrationNo={this.state.vehicleRegistrationNo}
     
             bookingId={this.state.bookingId}
             customerName={ this.state.customerName}
             contactNo={this.state.contactNo}
             emailId={ this.state.emailId}
             services={ this.state.services} vehicleMake={this.state.vehicleMake}
             vehicleModel={this.state.vehicleModel}
             vehicleFuelType={this.state.vehicleFuelType}
            
            
 />} />

          </div>
        </Router>,
        document.getElementById('contentRender'));
    }
  }

  EditService(){
    var self=this;

    if( this.state.bookingId===undefined){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select BookingId ',
       
      })
    }else{
      
      ReactDOM.render(
        <Router>
          <div>
        
          <Route path="/" component={() => <VehicleRegistrationListEdit 
             vehicleRegistrationNo={this.state.vehicleRegistrationNo}
            
             bookingId={this.state.bookingId}
             customerName={ this.state.customerName}
             contactNo={this.state.contactNo}
             emailId={ this.state.emailId}
             services={ this.state.services} vehicleMake={this.state.vehicleMake}
             vehicleModel={this.state.vehicleModel}
             vehicleFuelType={this.state.vehicleFuelType}

/>} />

          </div>
        </Router>,
        document.getElementById('contentRender'));
    }
  }

  DeleteService(){

    var self=this;
  
    if( this.state.bookingId===undefined){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select BookingId ',
       
      })
    }else{
      if(this.state.bookingId!="" ){
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Do you Want to Delete '+self.state.bookingId,
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
       //   timer: 1500
        }).then((result) => {
          if (result.value) {
            self.Delete(this.state.rowIndexValue) 
  
          // For more information about handling dismissals please visit
          // https://sweetalert2.github.io/#handling-dismissals
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              position:'center',
              icon:'warning',
              title:'Cancelled Deletion Of '+self.state.vehicleRegistrationNo,
              showConfirmButton: false,
              timer:2000,
            })
          }
        })
      }
    }
      
  }

  DownLoadService(){

  }
  render() {
  //  const  downloadButtonData=<span style={{width:"80px"}} class="glyphicon glyphicon-download-alt" ><span style={{fontFamily:"Roboto, sans-serif"}}>&nbsp;Download</span></span>
 // const  downloadButtonData=<i  style={{color:"black"}} class="glyphicon glyphicon-download-alt" ></i>
 const downloadButtonData = <Invoice_xlDownldBtn/>;       
  
    return (

      <div className="container" style={{ paddingTop: "0px" }}>
       
        <div className="">
            <div className="">
              <BackButtonComponent name={"Dashboard"}click={()=>this.BackbtnFunc()} />
                  </div>
            <div className="inv_HeaderCls">
              <h3>Job Card List</h3>
            </div>
          </div>
                     
              
 <div className=" est_inv_list_cls_Dwn_Btn">
    <div>
    <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button "
                    table="tableHeadings"
                    filename="Service_Registration_List"
                    sheet="tablexls"
                   buttonText={downloadButtonData}   
                    />
    </div>
    </div>

      <div className="reactIcon_Dcls">
<ServiceRegistrationIcons onInstantInvoice={this.InstantSaleInvoice}  
ondAddService={this.AddService} onViewService={this.ViewService}  
onEditService={this.EditService} 
    onDeleteBank={this.DeleteService} onDownloadService={this.DownLoadService} />
    </div>
  
        

     <div id="tableOverflow1">
                  <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">
                  </table>
                </div>

          <div id="tableOverflow" class="hideContent" style={{marginBottom:"2%"}}>
        
            <ReactTable style={{overflow:"auto",marginBottom:"5%"}}
              data={this.state.dataList}
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
            //  getTdProps={this.onRowClick}
            getTrProps={this.onTrRowClick}
            />
          </div>
  



 
    </div>
    );
  }

}

export default VehicleRegistrationList;