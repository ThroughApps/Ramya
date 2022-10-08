import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import registerServiceWorker from '../registerServiceWorker';
import $ from 'jquery';

import Case from 'case';
import CryptoJS from 'crypto-js';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';

import Select from 'react-select';
import SelectSearch from 'react-select';
import { Multiselect } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';
import GenericDashboardElite from '../Topnavbar/GenericDashboardElite';
import _ from 'underscore';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import VehicleMakeModelComponent from './VehicleMakeModelComponent';
import DashboardOverall from '../MaincontentDashboard/DashboardOverall';
import './ServiceRegistrationCSS.css';
import CustomerComponent from './CustomerComponent';
import VehicleComponent from './VehicleComponent';
import{vehicleDefaultData} from './VehicleComponent';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from '../ConstSiteFunction';

import * as TiIcons from 'react-icons/ti';
import * as GrIcons from 'react-icons/gr';
import * as FaIcons from 'react-icons/fa';
import CapitalCaseFunc from './CommonTextFormatComponent';

import CreatableSelect from 'react-select/creatable';
import contactNoValidationFunc from './ValidationComponent';



var customerArray=[];
var vehicleArray=[];
var vehicleMakeModelArray=[];
var productArray=[];
var customerList=[];


class ServiceRegistration extends Component {
  constructor() {
    super()
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
 
    this.state = {
        companyId : companyId,
        staffId: staffId,
        employeeName: employeeName,
        role: role,
        customerList:[],
        vehicleList:[],
        vehcileMakeList:[],
        vehicleModelList:[],
        vehcileFuelTypeList:[],
        productServiceList:[],

        selectedCustomer:[],
        selectedVehicleRegNo:[],
        selectedVehicleMake:[],
        selectedVehicleModel:[],
        selectedVehicleFuelType:[],
        selectedServiceList:[],

       
        customerNamereadonly:true,
        emailIdreadonly:true,

        
        customerName:'',
        vehicleRegNo:'',
        vehicleMake:'',
        vehicleModel:'',
        vehicleFuelType:'',
        emailId:'',

        customerCreateStatus:'No',
        vehicleCreateStatus:'No',
        vehicleMakeCreateStatus:'No',
        vehicleModelCreateStatus:'No',
        vehicleFuelTypeCreateStatus:'No',
        serviceCreateStatus:'No',
        isPaneOpen:false,
        isVehiclePaneOpen:false,
        stateData:'',
   

    }

    this.SubmitCustomerInfoSlide = this.SubmitCustomerInfoSlide.bind(this);
    this.SubmitVehicleMakeModelInfoSlide=this.SubmitVehicleMakeModelInfoSlide.bind(this);
    this.SubmitVehicleInfoSlide=this.SubmitVehicleInfoSlide.bind(this);

  }

  componentDidMount() {
    SetCurrentPage("ServiceRegistration");
    window.scrollTo(0, 0);

    $("#emailerrormsg").empty();
    $("#contactnoerror").hide();

    this.GetData();
 
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


GetData(){

  var self=this;
  $(".btn-default").css("background-color","#05a4b5");
  $(".btn-default").css("color","white");
    $.ajax({
        type: 'POST',
        data: JSON.stringify({
          companyId: this.state.companyId,
          empSites:GetEmployeeSite(),
        }),
        url: "http://15.206.129.105:8080/ThroughBooksCOAPI/ServiceRegistration/GetServiceDetails",
        contentType: "application/json",
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
  
          console.log("datat", data);
  
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

  var self=this;

      customerArray=[];
      vehicleArray=[];
      vehicleMakeModelArray=[];
      productArray=[];

      customerArray=data.customerList;
      productArray=data.productServiceList;
      vehicleArray=data.vehicleList;
      vehicleMakeModelArray=data.vehicleMakeModelList;

      var subVehicleMakeArray=_.uniq(vehicleMakeModelArray, 'vehicleMake');
      var subVehicleModelArray=_.uniq(vehicleMakeModelArray, 'vehicleModel');
      var subVehicleFuelTypeArray=_.uniq(vehicleMakeModelArray, 'vehicleFuelType');

      self.state.customerList=[];
      self.state.productList=[];
      self.state.vehcileMakeList=[];
      self.state.vehicleModelList=[];
      self.state.vehcileFuelTypeList=[];
      self.state.vehicleList=[];
    
      $.each(data.customerList, function (i, item) {
        self.state.customerList.push({value:item.contactNo,label:item.contactNo+" - "+item.customerName});
    });

      $.each(data.productServiceList, function (i, item) {
        self.state.productList.push({value:item.serviceName,label:item.serviceName});
    });

   
    $.each(subVehicleMakeArray, function (i, item) {
      self.state.vehcileMakeList.push({value:item.vehicleMake,label:item.vehicleMake});
  });
  
    $.each(subVehicleModelArray, function (i, item) {
      self.state.vehicleModelList.push({value:item.vehicleModel,label:item.vehicleModel});
  });

  $.each(subVehicleFuelTypeArray, function (i, item) {
    self.state.vehcileFuelTypeList.push({value:item.vehicleFuelType,label:item.vehicleFuelType});
  }); 

  $.each(data.vehicleList, function (i, item) {
    self.state.vehicleList.push({value:item.vehicleRegNo,label:item.vehicleRegNo});
  });


  self.setState({
    customerList:self.state.customerList,
    productList:self.state.productList,
    vehcileMakeList:self.state.vehcileMakeList,
    vehicleModelList:self.state.vehicleModelList,
    vehcileFuelTypeList: self.state.vehcileFuelTypeList,
    vehicleList:self.state.vehicleList,

})


}


handleUserInputCustomerName= (e) => {
  const name = e.target.name;
  const value = e.target.value;
 
  var customerNameData=CapitalCaseFunc(value);
  this.state.customerName=customerNameData;

  this.setState({ 
    customerName:this.state.customerName
  })
  
}

handleUserInputEmailId = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  this.state.EmailErrorCount=0;
  $("#emailerrormsg").empty();

  this.state[name]=value;
  this.setState({ [name]: value });

 if( value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) || value==""){
   //   this.state.emailId=value;
      this.state.EmailErrorCount=0;
      $("#emailerrormsg").empty();
  }else{
   // this.state.emailId="";
    this.state.EmailErrorCount=1;
    $("#emailerrormsg").append("Incorrect EmailId");
  } 
 
 // this.state.emailId=value;
  this.setState({ 
 //   emailId: this.state.emailId ,
    EmailErrorCount:this.state.EmailErrorCount,
  })

}

VehicleRegistrationFunc(){

  var self=this;
  if(this.state.selectedCustomer.length!=0 && this.state.vehicleRegNo!="" && 
        this.state.selectedServiceList.length!=0 ){
          
    

          console.log(JSON.stringify({
            companyId:this.state.companyId,
            contactNo:this.state.selectedCustomer.value,
            customerName:this.state.customerName,
            vehicleRegNo:this.state.vehicleRegNo,
            vehicleMake:this.state.vehicleMake,
            vehicleModel:this.state.vehicleModel,
            vehicleFuelType:this.state.vehicleFuelType,
            emailId:this.state.emailId,
            serviceName:this.state.serviceList.toString(),
            customerCreateStatus:this.state.customerCreateStatus,
            vehicleCreateStatus:this.state.vehicleCreateStatus,
            vehicleMakeCreateStatus:this.state.vehicleMakeCreateStatus,
            vehicleModelCreateStatus:this.state.vehicleModelCreateStatus,
            vehicleFuelTypeCreateStatus:this.state.vehicleFuelTypeCreateStatus,
            serviceCreateStatus:this.state.serviceCreateStatus,
            customerId:this.state.selectedCustomerId,
          }));


          $.ajax({
            type: 'POST',
            data: JSON.stringify({
              companyId:this.state.companyId,
              contactNo:this.state.selectedCustomer.value,
              customerName:this.state.customerName,
              vehicleRegNo:this.state.vehicleRegNo,
              vehicleMake:this.state.vehicleMake,
              vehicleModel:this.state.vehicleModel,
              vehicleFuelType:this.state.vehicleFuelType,
              emailId:this.state.emailId,
              customerId:this.state.selectedCustomerId,
              serviceName:this.state.serviceList.toString(), 
          
              customerCreateStatus:this.state.customerCreateStatus,
              vehicleCreateStatus:this.state.vehicleCreateStatus,
              vehicleMakeCreateStatus:this.state.vehicleMakeCreateStatus,
              vehicleModelCreateStatus:this.state.vehicleModelCreateStatus,
              vehicleFuelTypeCreateStatus:this.state.vehicleFuelTypeCreateStatus ,
              staffId: this.state.staffId,
              employeeName: this.state.employeeName,
              role: this.state.role,
              site:GetCurrentSite()  ,
            }),
            url:"http://15.206.129.105:8080/ThroughBooksCOAPI/ServiceRegistration/AddServiceRegistration",
           //   url:"http://15.206.129.105:8080/ThroughBooksCOAPI/QuickLinkWebservices/GetVehiclemakemodelDetails",
            contentType: "application/json",
            dataType: "json",
            async: false,
          //  crossDomain: true,

            success: function (data, textStatus, jqXHR) {

                console.log("BASIC DATA :", data);

      
               
               if( _.contains(data.responseList,'NoDuplicateCustomer')){

                    Swal.fire({
                      position: 'center',
                      icon: 'success',
                      text: 'Added Customer Successfuly',
                      showConfirmButton: false,
                      timer: 2000
                    })


                }else if(_.contains(data.responseList,'DuplicateCustomer')){
                    Swal.fire({
                      position: 'center',
                      icon: 'warning',
                      text: 'Customer Already Exist',
                      showConfirmButton: false,
                      timer: 2000
                    })
                }

                if( _.contains(data.responseList,'NoDuplicateVehicle')){
                      Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'Added Vehicle Successfuly',
                        showConfirmButton: false,
                        timer: 2000
                      })
                }else if(_.contains(data.responseList,'DuplicateVehicle')){
                    Swal.fire({
                      position: 'center',
                      icon: 'warning',
                      text: 'Vehicle Already Exist',
                      showConfirmButton: false,
                      timer: 2000
                    })
                }

                if( _.contains(data.responseList,'NoDuplicateVehicleMakeModel')){

                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    text: 'Added Vehicle Make & Model Information Successfuly',
                    showConfirmButton: false,
                    timer: 2000
                  })

                }else if(_.contains(data.responseList,'DuplicateVehicleMakeModel')){
                    Swal.fire({
                      position: 'center',
                      icon: 'warning',
                      text: 'Vehicle MakeModel Information Already Exist Already Exist',
                      showConfirmButton: false,
                      timer: 2000
                    })
                }

                if( _.contains(data.responseList,'Addded_BookingDetails')){
                    Swal.fire({
                      position: 'center',
                      icon: 'success',
                      text: 'Added Service Registartion Successfuly',
                      showConfirmButton: false,
                      timer: 2000
                    })
                }

                  self.ClearFunc();
            },
            error: function (data) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Network Connection Problem on add',
                    showConfirmButton: false,
                    timer: 2000
                  })


            }

        });
     
     
        }else{
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Kindly FillIn All Mandatory Fields',
                showConfirmButton: false,
                timer: 2000
            })
        }



}

OpenSlide(){
  this.state.isPaneOpen= true;
  
  this.setState({
      isPaneOpen:this.state.isPaneOpen
  })
}


CloseSlide(){
  this.state.isPaneOpen= false;
      
  this.setState({
      isPaneOpen:this.state.isPaneOpen
  })
}

CloseCancelMakeModelInfoSlide= (currentState) => {
    var self=this;
    self.state.isPaneOpen= false;            
    self.setState({
        isPaneOpen:self.state.isPaneOpen
    })
  }


  OpenCustomerSlide(){
    this.state.isCustomerPaneOpen= true;
  
    this.setState({
      isCustomerPaneOpen:this.state.isCustomerPaneOpen
    })
  }

  CloseCustomerSlide(){
    this.state.isCustomerPaneOpen= false;
  
    this.setState({
      isCustomerPaneOpen:this.state.isCustomerPaneOpen
    })
  }

  CloseCancelCustomerInfoSlide= (currentState) => {
    var self=this;
    self.state.isCustomerPaneOpen= false;            
    self.setState({
      isCustomerPaneOpen:self.state.isCustomerPaneOpen
    })
  }

  SubmitCustomerInfoSlide(stateData,submit_proceed){
    console.log("stateDate :",stateData);
    console.log("this :",this);
  
    console.log("selfStateData :",submit_proceed);

    if(submit_proceed=='Yes'){
        this.state.isCustomerPaneOpen=false;
        this.state.isVehiclePaneOpen=true;

        this.setState({
          isCustomerPaneOpen:this.state.isCustomerPaneOpen,
          isVehiclePaneOpen:this.state.isVehiclePaneOpen
        })
        this.state.stateData=stateData;
        this.setState({
          stateData:this.state.stateData
        })
      
    }

   
  
    this.state.selectedCustomerList=[];
    this.state.customerList=[];

    this.setState({
      selectedCustomerList:this.state.selectedCustomerList,
      customerList:this.state.customerList,
    })


      var self=this;

      customerArray=[];
	
      customerArray=stateData.customerList;
       self.state.customerList=[];
       
       
        $.each(stateData.customerList, function (i, item) {
          self.state.customerList.push(item.contactNo);
      });

        this.setState({
      customerList:[...this.state.customerList],
    })


   }
  

  ClearFunc(){

    this.state.selectedCustomer=[];
    this.state.customerName="";
    this.state.vehicleRegNo="";
    this.state.vehicleMak="";
    this.state.vehicleFuelType="";
    this.state.emailId="";
    this.state.selectedServiceList=[];
    this.state.customerCreateStatus='No';
    this.state.vehicleCreateStatus='No';
    this.state.vehicleMakeCreateStatus='No';
    this.state.vehicleModelCreateStatus='No';
    this.state.vehicleFuelTypeCreateStatus='No';
    this.state.serviceCreateStatus='No';
    this.state.selectedCustomerId='';
    
    this.state.selectedVehicleRegNo=[];
    this.state.selectedVehicleMake=[];
    this.state.selectedVehicleModel=[];
    this.state.selectedVehicleFuelType=[];
    this.state.serviceList=[];



    this.setState({
     
      selectedCustomer:this.state.selectedCustomer,
      customerName:this.state.customerName,
      vehicleRegNo:this.state.vehicleRegNo,
      vehicleMake:this.state.vehicleMake,
      vehicleModel:this.state.vehicleModel,
      vehicleFuelType:this.state.vehicleFuelType,
      emailId:this.state.emailId,
      selectedServiceList:this.state.selectedServiceList,
      customerCreateStatus:this.state.customerCreateStatus,
      vehicleCreateStatus:this.state.vehicleCreateStatus,
      vehicleMakeCreateStatus:this.state.vehicleMakeCreateStatus,
      vehicleModelCreateStatus:this.state.vehicleModelCreateStatus,
      vehicleFuelTypeCreateStatus:this.state.vehicleFuelTypeCreateStatus,
      serviceCreateStatus:this.state.serviceCreateStatus,
      customerId:this.state.selectedCustomerId,

      selectedVehicleRegNo:this.state.selectedVehicleRegNo,
      selectedVehicleMake:this.state.selectedVehicleMake,
      selectedVehicleMake:this.state.selectedVehicleMake,
      selectedVehicleFuelType:this.state.selectedVehicleFuelType,

      serviceList:this.state.serviceList,
    })





  }


  SubmitVehicleMakeModelInfoSlide(stateData){

    console.log(" SubmitVehicleMakeModelInfoSlide stateDate :",stateData);
    console.log("this :",this);

    var self=this;

    vehicleMakeModelArray=[];
    vehicleMakeModelArray=stateData.vehicleMakeModelList;

    var subVehicleMakeArray=_.uniq(vehicleMakeModelArray, 'vehicleMake');
    var subVehicleModelArray=_.uniq(vehicleMakeModelArray, 'vehicleModel');
    var subVehicleFuelTypeArray=_.uniq(vehicleMakeModelArray, 'vehicleFuelType');

    this.state.vehcileMakeList=[];
    this.state.vehicleModelList=[];
    this.state.vehcileFuelTypeList=[];

    this.state.selectedVehicleMakeList=[];
    this.state.selectedVehicleModelList=[];
    this.state.selectedFuelTypeList=[];

    this.setState({
      vehcileMakeList:[...this.state.vehcileMakeList],
      vehicleModelList:[...this.state.vehicleModelList],
      vehcileFuelTypeList:[...this.state.vehcileFuelTypeList],

      selectedVehicleMakeList:[...this.state.selectedVehicleMakeList],
      selectedVehicleModelList:[...this.state.selectedVehicleModelList],
      selectedFuelTypeList:[...this.state.selectedFuelTypeList],
    })

    $.each(subVehicleMakeArray, function (i, item) {
      console.log("vehicleMake :",item.vehicleMake);
      self.state.vehcileMakeList.push(item.vehicleMake);
  });
  
    $.each(subVehicleModelArray, function (i, item) {
      console.log("vehicleModel :",item.vehicleModel);
      self.state.vehicleModelList.push(item.vehicleModel);
  });

  $.each(subVehicleFuelTypeArray, function (i, item) {
    console.log("vehicleFuelType :",item.vehicleFuelType);
    self.state.vehcileFuelTypeList.push(item.vehicleFuelType);
  }); 


 this.setState({
      vehcileMakeList:[...this.state.vehcileMakeList],
      vehicleModelList:[...this.state.vehicleModelList],
      vehcileFuelTypeList:[...this.state.vehcileFuelTypeList],
    })

  }

  OpenVehicleSlide(){
    this.state.isVehiclePaneOpen= true;
    this.state.stateData="";
  
    this.setState({
      isVehiclePaneOpen:this.state.isVehiclePaneOpen,
      stateData:this.state.stateData
    })
  }

  CloseVehicleSlide(){
    this.state.isVehiclePaneOpen= false;
    this.state.stateData="";

    this.setState({
      isVehiclePaneOpen:this.state.isVehiclePaneOpen,
      stateData:this.state.stateData
    })
  }

  CloseCancelVehicleSlide= () => {

    var self=this;
    self.state.isVehiclePaneOpen= false;
    self.state.stateData="";

    self.setState({
      isVehiclePaneOpen:self.state.isVehiclePaneOpen,
      stateData:self.state.stateData
    })
  }

  SubmitVehicleInfoSlide(stateData){
      console.log("SubmitVehicleInfoSlide stateData :",stateData);

      this.state.selectedVehicleRegNoList=[];
      this.state.vehicleList=[];
  
      this.setState({
        selectedVehicleRegNoList:this.state.selectedVehicleRegNoList,
        vehicleList:this.state.vehicleList,
      })
  
  
        var self=this;
  
        vehicleArray=[];
    
        vehicleArray=stateData.vehicleList;
         self.state.vehicleList=[];
         
         
          $.each(stateData.vehicleList, function (i, item) {
            self.state.vehicleList.push(item.vehicleRegNo);
        });
  
          this.setState({
            vehicleList:[...this.state.vehicleList],
      })
  

  }

  handleChangeSelectCustomer = (newValue, actionMeta) => {
    /*console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd(); */

    console.log("SELECT CUSTOMER :",newValue);
  //  console.log("SELECT CUSTOMER MOBILE NO:",newValue.value);
    
    var self=this;
    $("#contactnoerror").hide();
    this.state.errorStatus=0;

  this.state.customerName = "";
  this.state.selectedCustomerId="";
  this.state.emailId="";
  this.state.selectedServiceList = [];

  this.state.vehicleRegNo="";
  this.state.vehicleMake="";
  this.state.vehicleFuelType="";
  this.state.customerCreateStatus='No';
  this.state.selectedCustomer="";

  this.state.selectedVehicleRegNo=[];
  this.state.selectedVehicleMake=[];
  this.state.selectedVehicleModel=[];
  this.state.selectedVehicleFuelType=[];
  this.state.selectedProductList=[];



  this.setState({
      customerName: this.state.customerName,
      selectedCustomerId:this.state.selectedCustomerId,
      emailId:this.state.emailId,
      vehicleRegNo:this.state.vehicleRegNo,
      vehicleMake:this.state.vehicleMake,
      vehicleFuelType:this.state.vehicleFuelType,
      selectedProductList:this.state.selectedProductList,
      customerCreateStatus:this.state.customerCreateStatus,
      selectedCustomer:this.state.selectedCustomer,
      selectedVehicleRegNo:this.state.selectedVehicleRegNo,

      selectedVehicleMake:this.state.selectedVehicleMake,
      selectedVehicleFuelType:this.state.selectedVehicleFuelType,
      selectedVehicleFuelType:this.state.selectedVehicleFuelType,
      selectedServiceList:this.state.selectedServiceList,

  })

  
if(newValue!=null){
    var currentCustomerArray=_.where(customerArray, { contactNo: newValue.value })
    
    this.state.selectedCustomer=newValue;


    console.log("currentCustomerArray :",currentCustomerArray);


      var vehicleRegDetails=_.where(vehicleArray, { customerId: currentCustomerArray[0].customerId })

      self.state.vehicleList=[];
      $.each(vehicleRegDetails, function (i, item) {
        self.state.vehicleList.push({value:item.vehicleRegNo,label:item.vehicleRegNo});
     });
      
      this.state.selectedCustomerId=currentCustomerArray[0].customerId;
      this.state.customerName = currentCustomerArray[0].customerName;
      this.state.emailId=currentCustomerArray[0].emailId;
      this.state.customerNamereadonly = true;
      this.state.emailIdreadonly=true;

      this.setState({
          customerName: this.state.customerName,
          customerNamereadonly: this.state.customerNamereadonly,
          emailIdreadonly:this.state.emailIdreadonly,
          emailId:this.state.emailId,
          vehicleList:self.state.vehicleList,
          selectedCustomerId:this.state.selectedCustomerId,
          selectedCustomer:this.state.selectedCustomer,
      })

    }

  };

  handleInputChangeCustomer = (inputValue, actionMeta) => {
   /* console.group('Input Changed');
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd(); */

    var self=this;
    this.state.errorStatus=0;

    console.log("CREATE CUSTOMER :",inputValue);

    $("#contactnoerror").hide();

    this.state.selectedCustomer="";
    this.state.customerName="";

    this.state.selectedCustomerId="";
    this.state.emailId="";
  
    this.state.vehicleRegNo="";
    this.state.vehicleMake="";
    this.state.vehicleFuelType="";
    this.state.customerCreateStatus='No';
    this.state.selectedCustomer="";
  
    this.state.selectedVehicleRegNo=[];
    this.state.selectedVehicleMake=[];
    this.state.selectedVehicleModel=[];
    this.state.selectedVehicleFuelType=[];
    this.state.selectedServiceList=[];
  
  
  
    this.setState({
        customerName: this.state.customerName,
        selectedCustomerId:this.state.selectedCustomerId,
        emailId:this.state.emailId,
        vehicleRegNo:this.state.vehicleRegNo,
        vehicleMake:this.state.vehicleMake,
        vehicleFuelType:this.state.vehicleFuelType,
        selectedServiceList:this.state.selectedServiceList,
        customerCreateStatus:this.state.customerCreateStatus,
        selectedCustomer:this.state.selectedCustomer,
        selectedVehicleRegNo:this.state.selectedVehicleRegNo,
  
        selectedVehicleMake:this.state.selectedVehicleMake,
        selectedVehicleFuelType:this.state.selectedVehicleFuelType,
        selectedVehicleFuelType:this.state.selectedVehicleFuelType,
        selectedProductList:this.state.selectedProductList,
  
    })

    var validationData=contactNoValidationFunc(inputValue);

    if (validationData==true) {

        $("#contactnoerror").hide();
        self.state.customerCreateStatus='Yes';
        self.setState({
            customerCreateStatus:self.state.customerCreateStatus,   
        })

        this.state.selectedCustomer={value:inputValue,label:inputValue};


        self.state.customerNamereadonly = false;
        self.state.emailIdreadonly=false;

        self.setState({
            customerNamereadonly: self.state.customerNamereadonly,
            emailIdreadonly:self.state.emailIdreadonly,
            selectedCustomer:this.state.selectedCustomer,
            customerName:this.state.customerName,
        })


    } else {
        $("#contactnoerror").show();
        this.state.errorStatus = Number(this.state.errorStatus) + Number(1);
    }

  };

handleChangeSelectVehicleRegNo = (newValue, actionMeta) => {
  
  console.log("VEHCILE :",newValue);

  this.state.vehicleRegNo = "";

  this.state.selectedVehicleMake=[];
  this.state.selectedVehicleModel=[];
  this.state.selectedVehicleFuelType=[];
  this.state.selectedProductList=[];
  this.state.vehicleCreateStatus='No';

  this.setState({
    vehicleRegNo: this.state.vehicleRegNo,
    selectedVehicleMake:this.state.selectedVehicleMake,
    selectedVehicleModel:this.state.selectedVehicleModel,
    selectedVehicleFuelType:this.state.selectedVehicleFuelType,
    selectedProductList:this.state.selectedProductList,
    vehicleCreateStatus:this.state.vehicleCreateStatus
  })

  if(newValue!=null){
  this.state.selectedVehicleRegNo=newValue;
  this.state.vehicleRegNo=newValue.value;
  this.setState({ 
    selectedVehicleRegNo: this.state.selectedVehicleRegNo,
    vehicleRegNo:this.state.vehicleRegNo,
   });

  
   var vehicleRegDetails = _.where(vehicleArray, { vehicleRegNo:newValue.value })

   console.log("vehicleRegDetails ARRAY :",vehicleRegDetails);

   this.state.customerId= vehicleRegDetails[0].customerId;
   this.state.vehicleRegNo = vehicleRegDetails[0].vehicleRegNo;
   this.state.vehicleMake=vehicleRegDetails[0].vehicleMake;
   this.state.vehicleModel = vehicleRegDetails[0].vehicleModel;
   this.state.vehicleFuelType = vehicleRegDetails[0].vehicleFuelType;

   this.state.selectedVehicleMake={value:vehicleRegDetails[0].vehicleMake,label:vehicleRegDetails[0].vehicleMake};
   this.state.selectedVehicleModel={value:vehicleRegDetails[0].vehicleModel,label:vehicleRegDetails[0].vehicleModel};
   this.state.selectedVehicleFuelType={value:vehicleRegDetails[0].vehicleFuelType,label:vehicleRegDetails[0].vehicleFuelType};


   if(this.state.selectedCustomerId != this.state.customerId){
         this.state.customerName="";
         this.state.selectedCustomerId="";
         this.state.emailId="";

         var customerName = _.where(customerArray, { customerId:this.state.customerId })

         this.state.customerName=customerName[0].customerName;
         this.state.emailId=customerName[0].emailId;
         this.state.selectedCustomer={value:customerName[0].contactNo,label:customerName[0].contactNo+" - "+customerName[0].customerName};

   }


   this.setState({
       vehicleRegNo: this.state.vehicleRegNo,
       vehicleMake: this.state.vehicleMake,
       vehicleModel:this.state.vehicleModel,
       vehicleFuelType:this.state.vehicleFuelType,
       selectedVehicleMake:this.state.selectedVehicleMake,
       selectedVehicleModel:this.state.selectedVehicleModel,
       selectedVehicleFuelType:this.state.selectedVehicleFuelType,
       customerId:this.state.customerId,

       customerName:this.state.customerName,
       emailId:this.state.emailId,
       selectedCustomer:this.state.selectedCustomer,

   })

  }


}

handleInputChangeVehicleRegNo = (inputValue, actionMeta) => {

console.log("INPUT VECHILE CHANGE :",inputValue);

  this.state.vehicleRegNo = "";

  this.state.selectedVehicleMake=[];
  this.state.selectedVehicleModel=[];
  this.state.selectedVehicleFuelType=[];
  this.state.selectedProductList=[];
  this.state.vehicleCreateStatus='Yes';
  

  this.setState({
    vehicleRegNo: this.state.vehicleRegNo,
    selectedVehicleMake:this.state.selectedVehicleMake,
    selectedVehicleModel:this.state.selectedVehicleModel,
    selectedVehicleFuelType:this.state.selectedVehicleFuelType,
    selectedProductList:this.state.selectedProductList,
    vehicleCreateStatus:this.state.vehicleCreateStatus,
  })


  var regNoData=inputValue.toUpperCase();

  this.state.selectedVehicleRegNo={value:regNoData,label:regNoData};
  this.state.vehicleRegNo=regNoData;
  this.setState({ 
    selectedVehicleRegNo: this.state.selectedVehicleRegNo,
    vehicleRegNo:this.state.vehicleRegNo,
   });



}

handleChangeSelectVehicleMake= (newValue, actionMeta) => {

  var self=this;
  this.state.selectedVehicleModel=[];
  this.state.selectedVehicleFuelType=[];
  this.state.vehicleMakeCreateStatus='No';

  this.state.vehicleModel="";
  this.state.vehicleFuelType="";

  this.setState({
    selectedVehicleModel:this.state.selectedVehicleModel,
    selectedVehicleFuelType:this.state.selectedVehicleFuelType,
    vehicleMakeCreateStatus:this.state.vehicleMakeCreateStatus,
    vehicleModel:this.state.vehicleModel,
    vehicleFuelType:this.state.vehicleFuelType,
  })

  if(newValue!=null){
  this.state.selectedVehicleMake = newValue;


  this.setState({
    selectedVehicleMake: this.state.selectedVehicleMake,
  })

  var vehicleMakeModelDetails = _.where(vehicleMakeModelArray, { vehicleMake: newValue.value })

  var subVehicleModelArray=_.uniq(vehicleMakeModelDetails, 'vehicleModel');
 
  self.state.vehicleModelList=[];
  $.each(subVehicleModelArray, function (i, item) {
    self.state.vehicleModelList.push({value:item.vehicleModel,label:item.vehicleModel});
  });

  this.state.vehicleMake=newValue.value;
  this.state.vehicleModel = "";
  this.state.vehicleFuelType ="";

  this.state.selectedVehicleModel=[];
  this.state.selectedVehicleFuelType=[];


  

  this.setState({
  
      vehicleMake: this.state.vehicleMake,
      vehicleModel:this.state.vehicleModel,
      vehicleFuelType:this.state.vehicleFuelType,

      selectedVehicleMake:this.state.selectedVehicleMake,
      selectedVehicleModel:this.state.selectedVehicleModel,
      selectedVehicleFuelType:this.state.selectedVehicleFuelType,

      vehicleModelList:self.state.vehicleModelList,
    
  })



  }


}

handleInputChangeVehicleMake= (inputValue, actionMeta) => {

  var self=this;
  self.state.selectedVehicleMake= [];

  self.state.selectedVehicleModel=[];
  self.state.selectedVehicleFuelType=[];
  self.state.vehicleMake="";
  self.state.vehicleModel="";
  self.state.vehicleFuelType="";
  self.state.vehicleMakeCreateStatus='Yes';

  var vechileMakeData=CapitalCaseFunc(inputValue);
  self.state.vehicleMake=vechileMakeData;

  self.state.selectedVehicleMake={value:vechileMakeData,label:vechileMakeData};

  self.setState({
    selectedVehicleMake:self.state.selectedVehicleMake,
    vehcileMakeList: self.state.vehcileMakeList,
    vehicleMake: self.state.vehicleMake,    

    selectedVehicleFuelType:self.state.selectedVehicleFuelType,
    vehicleMakeCreateStatus:self.state.vehicleMakeCreateStatus,

    vehicleModel:self.state.vehicleModel,
    vehicleFuelType:self.state.vehicleFuelType,

  })

}


handleChangeSelectVehicleModel= (newValue, actionMeta) => {

  var self=this;

  this.state.selectedVehicleFuelType=[];
  this.state.vehicleFuelType="";
  this.state.vehicleModelCreateStatus='No';

  this.setState({
    selectedVehicleFuelType:this.state.selectedVehicleFuelType,
    vehicleModelCreateStatus:this.state.vehicleModelCreateStatus,
    vehicleFuelType:this.state.vehicleFuelType,
  })

  if(newValue!=null){
  this.state.selectedVehicleModel=newValue;
  this.state.vehicleMake=newValue.value;

  this.setState({
    selectedVehicleModel:this.state.selectedVehicleModel,
    vehicleFuelType:this.state.vehicleFuelType,
  })


  var vehicleMakeModelDetails = _.where(vehicleMakeModelArray, { vehicleModel: newValue.value })


  var subVehicleFuelTypeArray=_.uniq(vehicleMakeModelDetails, 'vehicleFuelType');

  if(subVehicleFuelTypeArray.length >1){

    self.state.vehcileFuelTypeList=[];
    $.each(subVehicleFuelTypeArray, function (i, item) {
      self.state.vehcileFuelTypeList.push({value:item.vehicleFuelType,label:item.vehicleFuelType});
    });

  }else if(subVehicleFuelTypeArray.length==1){
      this.state.selectedVehicleFuelType={value:subVehicleFuelTypeArray[0].vehicleFuelType,label:subVehicleFuelTypeArray[0].vehicleFuelType};
      this.state.vehicleFuelType=subVehicleFuelTypeArray[0].vehicleFuelType;
  }

  


  this.state.vehicleModel=newValue.value;
  this.state.selectedVehicleModel=newValue;

  this.setState({   
      vehicleModel:this.state.vehicleModel,
      selectedVehicleModel:this.state.selectedVehicleModel,
      vehcileFuelTypeList:self.state.vehcileFuelTypeList,

      selectedVehicleFuelType:this.state.selectedVehicleFuelType,
      vehicleFuelType:this.state.vehicleFuelType,

    
  })

}

}

handleInputChangeVehicleModel= (inputValue, actionMeta) => {

  var self=this;
  self.state.selectedVehicleModel = [];
  self.state.selectedVehicleFuelType=[];
  self.state.vehicleModelCreateStatus='Yes';
  self.state.vehicleModel="";
  self.state.vehicleFuelType="";


  self.setState({
    selectedVehicleModel:self.state.selectedVehicleModel,
    vehicleModel: self.state.vehicleModel,    
    vehicleFuelType:self.state.vehicleFuelType,

    selectedVehicleFuelType:self.state.selectedVehicleFuelType,
    vehicleModelCreateStatus:self.state.vehicleModelCreateStatus,
  })

  var vehicleModelData=CapitalCaseFunc(inputValue);
  self.state.vehicleModel=vehicleModelData;
  self.state.selectedVehicleModel={value:vehicleModelData,label:vehicleModelData};


self.setState({
  vehicleModel:self.state.vehicleModel,
  selectedVehicleModel:self.state.selectedVehicleModel
})



}


handleChangeSelectFuelType= (newValue, actionMeta) => {

  var self=this;
  this.state.selectedVehicleFuelType=[];
  this.state.vehicleFuelTypeCreateStatus='No';

  this.setState({
    selectedVehicleFuelType:this.state.selectedVehicleFuelType,
    vehicleFuelTypeCreateStatus:this.state.vehicleFuelTypeCreateStatus
  })

  if(newValue!=null){
this.state.selectedVehicleFuelType=newValue;
this.state.vehicleFuelType=newValue.value;

this.setState({
  vehicleFuelType:this.state.vehicleFuelType,
  selectedVehicleFuelType:this.state.selectedVehicleFuelType
})

  }

}

handleInputChangeVehicleFuelType= (inputValue, actionMeta) => {

  var self=this;
  this.state.selectedVehicleFuelType=[];
  this.state.vehicleFuelTypeCreateStatus='Yes';

  this.setState({
    selectedVehicleFuelType:this.state.selectedVehicleFuelType,
    vehicleFuelTypeCreateStatus:this.state.vehicleFuelTypeCreateStatus
  })

  var vechileFuelTypeData=CapitalCaseFunc(inputValue);
  this.state.vehicleFuelType=vechileFuelTypeData;
  this.state.selectedVehicleFuelType={value:vechileFuelTypeData,label:vechileFuelTypeData};

this.setState({
  vehicleFuelType:this.state.vehicleFuelType,
  selectedVehicleFuelType:this.state.selectedVehicleFuelType
})

}


handleChangeSelectService= (newValue, actionMeta) => {

  var self=this;
  this.state.selectedServiceList=[];
  this.state.serviceList=[];
  this.state.serviceCreateStatus='No';

  this.setState({
    selectedServiceList:this.state.selectedServiceList,
    serviceCreateStatus:this.state.serviceCreateStatus,
    serviceList:this.state.serviceList,
  })

  console.log("SELECTED SERVICE NEW VALUE :",newValue);

  this.state.selectedServiceList=newValue;
  var selectedServiceArray=newValue;

  if(selectedServiceArray.length >0){
      $.each(selectedServiceArray, function (i, item) {
        self.state.serviceList.push(item.value);
      });  
  }

  this.setState({
    selectedServiceList:this.state.selectedServiceList,
    serviceList:this.state.serviceList,
  })



}

  render() {
    return (

      <div class="container">

        <div class="card">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4">
              <ul class="previous disabled" id="backbutton"
                style={{
                  backgroundColor: "#05a4b5",color:"white",
                  float: "none",
                  display: "inline-block",
                  marginLeft: "5px",
                  borderRadius: "5px",
                  padding: "3px 7px 3px 7px",
                  marginTop: "13px",
                  display: "inline-block"
                }}>
                <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></ul>

            </div>
            <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8">
              <div class="card-header">
                <h3 >Job Card Form</h3>   </div>

            </div>
<div className="ser_reg_info">
  <a href="#" class="" onClick={() => this.OpenSlide()}  style={{ marginRight:'10px'}}><span><TiIcons.TiInfo/></span>Vehicle MakeModel Info</a>

 <a href="#" class="" onClick={() => this.OpenCustomerSlide()}  style={{ marginRight:'10px'}}><span><GrIcons.GrDocumentUser/></span>Customer Info</a>

 <a href="#" class="" onClick={() => this.OpenVehicleSlide()}  style={{ marginRight:'10px'}}><span><FaIcons.FaCar/></span>Vehicle Info</a>
 </div>
      

            <form class="form-horizontal form-bordered" name="submissions">
            <div className="form-group" >

                <label class="control-label selectpicker col-sm-2" for="customerName">Contact No<span style={{ color: "red" }}>*</span></label>
                <div class="col-sm-10">
               {/* <Multiselect
                                    onChange={value => this.handleChangeSelectCustomer(value)}
                                    allowCreate={true}
                                    onCreate={value => this.handleChangeCreateCustomer(value)}
                                    data={this.state.customerList}
                                  // data={customerList}
                                    value={this.state.selectedCustomerList}
                                    maxlength={1}
               /> */}
               <CreatableSelect
                  isClearable
                  onChange={this.handleChangeSelectCustomer}
                  onCreateOption={this.handleInputChangeCustomer}
                  options={this.state.customerList}
                  value={this.state.selectedCustomer}
                />
                   <span id="contactnoerror" style={{ color: "red", fontWeight: "700" }}>! ContactNo Invalid</span>

                 </div>
              </div>

<div className="form-group" >
                <label class="control-label col-sm-2" style={{ fontWeight: "bold" }} for="vehicleRegistrationNo">Customer Name<span style={{ color: "red" }}>*</span></label>
                <div class="col-sm-10">
            
                <input type="text" name="customerName"
                     onChange={this.handleUserInputCustomerName} readOnly={this.state.customerNamereadonly}
                    value={this.state.customerName} className="form-control" style={{ width: "100%" }} />
                      </div>
              </div>



<div className="form-group" >
                <label class="control-label col-sm-2" style={{ fontWeight: "bold" }} for="vehicleRegistrationNo">Vehicle No<span style={{ color: "red" }}>*</span></label>
                <div class="col-sm-10">
            
               {/* <Multiselect
                                    onChange={value => this.handleChangeSelectVehicleRegNo(value)}
                                    allowCreate={true}
                                    onCreate={value => this.handleChangeCreateVehicleRegNo(value)}
                                    data={this.state.vehicleList}
                                    value={this.state.selectedVehicleRegNoList}
                                    maxlength={1}
                                />   */}

                 <CreatableSelect
                  isClearable
                  onChange={this.handleChangeSelectVehicleRegNo}
                  onCreateOption={this.handleInputChangeVehicleRegNo}
                  options={this.state.vehicleList}
                  value={this.state.selectedVehicleRegNo}
                />     
                                 </div>
              </div>

            
              <div className="form-group" >
                <label class="control-label col-sm-2" style={{ fontWeight: "bold" }} for="vehicleMake">Vehicle Make</label>
                <div class="col-sm-10">
              {/*  <Multiselect
                                    onChange={value => this.handleChangeSelectVehicleMake(value)}
                                    allowCreate={true}
                                    onCreate={value => this.handleChangeCreateVehicleMake(value)}
                                    data={this.state.vehcileMakeList}
                                    value={this.state.selectedVehicleMakeList}
                                    maxlength={1}
                                /> */}
                  <CreatableSelect
                  isClearable
                  onChange={this.handleChangeSelectVehicleMake}
                  onCreateOption={this.handleInputChangeVehicleMake}
                  options={this.state.vehcileMakeList}
                  value={this.state.selectedVehicleMake}
                />  
                                    </div>
              </div>
              <div className="form-group ">
                <label class="control-label col-sm-2" style={{ fontWeight: "bold" }} for="vehicleModel">Vehicle Model</label>
                <div class="col-sm-10">
                {/* <Multiselect
                                    onChange={value => this.handleChangeSelectVehicleModel(value)}
                                    allowCreate={true}
                                    onCreate={value => this.handleChangeCreateVehicleModel(value)}
                                    data={this.state.vehicleModelList}
                                    value={this.state.selectedVehicleModelList}
                                    maxlength={1}
                                />  */}
                                
                                <CreatableSelect
                  isClearable
                  onChange={this.handleChangeSelectVehicleModel}
                  onCreateOption={this.handleInputChangeVehicleModel}
                  options={this.state.vehicleModelList}
                  value={this.state.selectedVehicleModel}       />   
                                
                                
                                   </div>
              </div>
              <div className="form-group ">
                <label class="control-label col-sm-2" style={{ fontWeight: "bold" }} for="vehicleFuelType">FuelType</label>
                <div class="col-sm-10">
               {/* <Multiselect
                                    onChange={value => this.handleChangeSelectFuelType(value)}
                                    allowCreate={true}
                                    onCreate={value => this.handleChangeCreateFuelType(value)}
                                    data={this.state.vehcileFuelTypeList}
                                    value={this.state.selectedFuelTypeList}
                                    maxlength={1}
                                /> */}
                    <CreatableSelect
                  isClearable
                  onChange={this.handleChangeSelectFuelType}
                  onCreateOption={this.handleInputChangeVehicleFuelType}
                  options={this.state.vehcileFuelTypeList}
                  value={this.state.selectedVehicleFuelType}       />   
               
                </div>
              </div>

              <div className="form-group ">

<label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="email">Email ID</label>
<div class="col-sm-10">
  <input type="email" class="form-control" name="emailId" 
  value={this.state.emailId} onChange={this.handleUserInputEmailId} 
  readOnly={this.state.emailIdreadonly}
  id="email" placeholder="Email ID" />
  <p id="emailerrormsg" style={{color:'red',fontWeight:'12px' }}></p>
</div>
</div>
            

              <div className="form-group ">
                <label style={{ fontWeight: "bold" }} class="control-label col-sm-2" for="batch"> Services<span style={{ color: "red" }}>*</span></label>
                <div class="col-sm-10" >
               
                 {/* <Select
                    id="issues"
                    name="issues"
                    isMulti={true}
                    value={this.state.selectedissues}
                    options={this.state.values}
                    onChange={this.handleChange}
                  /> */}
                  
                  <CreatableSelect
                 // isClearable.
                  isMulti={true}
                  onChange={this.handleChangeSelectService}
              /*  onCreateOption={this.handleInputChangeVehicleFuelType}  */
                  options={this.state.productList}
                  value={this.state.selectedServiceList}       />   


                 {/* <Multiselect
                                    onChange={value => this.handleChangeSelectService(value)}
                                    allowCreate={false}
                                    onCreate={value => this.handleChangeCreateService(value)}
                                    data={this.state.productList}
                                    value={this.state.selectedServiceList}
                                    maxlength={1}
                                /> */}
                </div>
              </div>


              <div class="form-group">
                <div class="row" style={{ marginLeft: "2px", marginBottom: "20%" }}>
                  <div class="col-sm-offset-2 col-sm-10">
                    <button style={{ fontWeight: "bold" }} type="button" onClick={() => this.VehicleRegistrationFunc()} class="btn btn-default">Submit</button> <span></span>
                    <button style={{ fontWeight: "bold" }} type="button" onClick={() => this.ClearFunc()} class="btn btn-default">Clear</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
  
        <SlidingPane
        className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        isOpen={this.state.isPaneOpen}
        title={"Vehicle MakeModel Info"}
        subtitle="Can Add & Edit Vehicle MakeModel Info Here"
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
         // setState({ isPaneOpen: false });
         this.CloseSlide()
        }}
      >
     {/* {this.RenderUpdateComponenets(this.state.taskSelected)} */}
        <VehicleMakeModelComponent SubmitClicked={this.SubmitVehicleMakeModelInfoSlide} CancelClicked={this.CloseCancelMakeModelInfoSlide}/>
         </SlidingPane>
      

      
      <SlidingPane
        className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        isOpen={this.state.isCustomerPaneOpen}
        title={"Customer Info"}
        subtitle="Can Add Customer Info Here"
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
         // setState({ isPaneOpen: false });
         this.CloseCustomerSlide()
        }}
      >
     {/* {this.RenderUpdateComponenets(this.state.taskSelected)} */}
        <CustomerComponent SubmitClicked={this.SubmitCustomerInfoSlide} CancelClicked={this.CloseCancelCustomerInfoSlide}/>
         </SlidingPane>
         

         <SlidingPane
        className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        isOpen={this.state.isVehiclePaneOpen}
        title={"Vehicle Info"}
        subtitle="Can Add Vehicle Info with Customer Here"
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
         // setState({ isPaneOpen: false });
         this.CloseVehicleSlide()
        }}
      >
     {/* {this.RenderUpdateComponenets(this.state.taskSelected)} */}
        <VehicleComponent stateData={this.state.stateData} SubmitClicked={this.SubmitVehicleInfoSlide} CancelClicked={this.CloseCancelVehicleSlide}/>
         </SlidingPane>

      </div>

    );
  }
}

export default ServiceRegistration;