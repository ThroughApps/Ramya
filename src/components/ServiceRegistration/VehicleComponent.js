import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import registerServiceWorker from '../registerServiceWorker';
import CryptoJS from 'crypto-js';


import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';

//css
import * as moment from "moment";
import _ from 'underscore';
import Select from 'react-select';
import ReactTable from "react-table";
import "react-table/react-table.css";
import SubmitButtonComponent from './ButtonComponent';
import{  ClearButtonComponent,CancelButtonComponent,AddButtonComponent,UpdateButtonComponent,SubmitProceedButtonComponent} from './ButtonComponent';
import Case from 'case';
import { Multiselect } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from '../ConstSiteFunction';
import CapitalCaseFunc from './CommonTextFormatComponent';


var customerArray=[];
var vehicleMakeModelArray=[];

export default class VehicleComponent extends  Component {

    constructor() {
        super()
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
   var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
  
  
    this.state={
       companyId:companyId,
       staffId: staffId,
       employeeName: employeeName,
       role: role,
       customerNamereadonly:true,
       vehicleRegNo:'',
       vehcileMake:'',
       vehicleModel:'',
       vehcileFuelType:'',
       vehcileMakeList:[],
       vehcileModelList:[],
       vehcileFuelTypeList:[],
       contactNo:'',

       selectedVehicleMakeList:[],
       selectedVehicleModelList:[],
       selectedVehicleFuelTypeList:[],
    }
  
    this.AddVehicleSubmitFunc = this.AddVehicleSubmitFunc.bind(this);
    this.CancelVehicleFunc = this.CancelVehicleFunc.bind(this);
    this.ClearVehicleFunc = this.ClearVehicleFunc.bind(this);
}

    componentDidMount(){
      SetCurrentPage("VehicleComponent");
        
        console.log("VEHICLE INFO DATA stateData :",this.props.stateData);

     if(this.props.stateData.customerName!=undefined){
        console.log("STATE DATA :",this.props.stateData);
        console.log("TASK OPTIONS :",this.props.stateData.customerName);
     
        this.state.contactNo=this.props.stateData.contactNo;
        this.state.selectedCustomerList=this.props.stateData.contactNo;
        this.state.customerName=this.props.stateData.customerName;

        this.setState({
            selectedCustomerList:this.state.selectedCustomerList,
            customerName:this.state.customerName,
            contactNo:this.state.contactNo,
        })

     } 

     this.GetData();

     console.log("customerArray :",customerArray);
     
  
    }
  
    GetData(){

        var self=this;
          $.ajax({
              type: 'POST',
              data: JSON.stringify({
                companyId: this.state.companyId,
                empSites:GetEmployeeSite(),
        
              }),
              url: "http://15.206.129.105:8080/ThroughBooksCOAPI/QuickLinkWebservices/GetCustVehicleBasicDetails",
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
            vehicleMakeModelArray=[];
      
            customerArray=data.customerList;
            vehicleMakeModelArray=data.vehicleMakeModelList;
      
            var subVehicleMakeArray=_.uniq(vehicleMakeModelArray, 'vehicleMake');
            var subVehicleModelArray=_.uniq(vehicleMakeModelArray, 'vehicleModel');
            var subVehicleFuelTypeArray=_.uniq(vehicleMakeModelArray, 'vehicleFuelType');
      
            self.state.customerList=[];
            self.state.vehcileMakeList=[];
            self.state.vehicleModelList=[];
            self.state.vehcileFuelTypeList=[];
          
            $.each(data.customerList, function (i, item) {
                self.state.customerList.push(item.contactNo);
            });

          $.each(subVehicleMakeArray, function (i, item) {
            self.state.vehcileMakeList.push(item.vehicleMake);
        });
        
          $.each(subVehicleModelArray, function (i, item) {
            self.state.vehicleModelList.push(item.vehicleModel);
        });
      
        $.each(subVehicleFuelTypeArray, function (i, item) {
          self.state.vehcileFuelTypeList.push(item.vehicleFuelType);
        }); 
      
    
      
        self.setState({
          vehcileMakeList:[... self.state.vehcileMakeList],
          vehicleModelList:[... self.state.vehicleModelList],
          vehcileFuelTypeList:[... self.state.vehcileFuelTypeList],      
      })
      
      if(self.state.contactNo!=''){
        var customerName = _.where(customerArray, { contactNo: this.state.contactNo})
            
        this.state.selectedCustomerId=customerName[0].customerId;
        this.setState({
            selectedCustomerId:this.state.selectedCustomerId
        })
    }
      }
   

    ClearVehicleFunc(){


        this.state.customerName="";
        this.state.vehicleRegNo="";
        this.state.vehcileMake="";
        this.state.vehicleModel="";
        this.state.vehcileFuelType="";
        this.state.contactNo="";
   
 
        this.state.selectedCustomerList=[];
        this.state.selectedVehicleMakeList=[];
        this.state.selectedVehicleModelList=[];
        this.state.selectedFuelTypeList=[];

        this.setState({
            customerName:'',
            vehicleRegNo:'',
            vehcileMake:'',
            vehicleModel:'',
            vehcileFuelType:'',
            contactNo:'',
         
     
            selectedCustomerList:[],
            selectedVehicleMakeList:[],
            selectedVehicleModelList:[],
            selectedFuelTypeList:[],

        })
    
    }


    AddVehicleSubmitFunc(){

        var self = this;
 
        console.log("ADD VEHCUILE DATA :",JSON.stringify({
            companyId: this.state.companyId,
            customerId:this.state.selectedCustomerId,
            customerName:this.state.customerName,
            vehicleRegNo:this.state.vehicleRegNo,
            vehicleMake:this.state.vehicleMake,
            vehicleModel:this.state.vehicleModel,
            vehicleFuelType:this.state.vehicleFuelType,

        }));

                        $.ajax({
                            type: 'POST',
                            data: JSON.stringify({
                                companyId: this.state.companyId,
                                customerId:this.state.selectedCustomerId,
                                customerName:this.state.customerName,
                                vehicleRegNo:this.state.vehicleRegNo,
                                vehicleMake:this.state.vehicleMake,
                                vehicleModel:this.state.vehicleModel,
                                vehicleFuelType:this.state.vehicleFuelType,
                                staffId: this.state.staffId,
                                employeeName: this.state.employeeName,
                                role: this.state.role,
                                site:GetCurrentSite() ,
                                empSites:GetEmployeeSite(),
                            }),
                           // url: "http://15.206.129.105:8080/ThroughBooksCOAPI/enquiry/AddEnquiry",
                             url: "http://15.206.129.105:8080/ThroughBooksCOAPI/QuickLinkWebservices/AddVehicleDetails",
                            contentType: "application/json",
                            dataType: 'json',
                            async: false,
                
                            success: function (data, textStatus, jqXHR) {
                
                                console.log("BASIC DATA :", data);
                
                                if (data.response == "Success") {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Added Vehicle Successfully',
                                        showConfirmButton: false,
                                        timer: 2000
                                    })

                                    self.props.SubmitClicked(data);
                                    self.ClearVehicleFunc();
                                    
                                }else if(data.response == "Duplicate"){
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'warning',
                                        title: 'Vehicle RegistrationNo Already Exist',
                                        showConfirmButton: false,
                                        timer: 2000
                                    })
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








       /* }else{
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Kindly fillin manadatory fields to proceed',
                showConfirmButton: false,
                timer: 2000
              })


        } */


    


    CancelVehicleFunc(){
        this.ClearVehicleFunc();

        this.props.CancelClicked();
    }


    handleUserInput= (e) => {
        const name = e.target.name;
        const value = e.target.value;

      //  var capitalCaseData=CapitalCaseFunc(value);

      var res = value.toUpperCase();

        this.state[name]= res;
        this.setState({ [name]: res});
        
      }

      

      handleChangeSelectCustomer(list) {

        console.log("SELECTED CUST LIST :", list)
      
        var self=this;
      
        this.state.customerName = "";
        this.state.selectedCustomerId="";
        this.state.emailId="";
        this.state.selectedVehicleRegNoList=[];
        this.state.selectedVehicleMakeList=[];
        this.state.selectedVehicleModelList=[];
        this.state.selectedFuelTypeList=[];
        this.state.selectedProductList = [];
      
        this.state.vehicleRegNo="";
        this.state.vehicleMake="";
        this.state.vehicleFuelType="";
      
      
        this.setState({
            customerName: this.state.customerName,
            selectedCustomerId:this.state.selectedCustomerId,
            emailId:this.state.emailId,
            selectedVehicleRegNoList:this.state.selectedVehicleRegNoList,
            selectedVehicleMakeList:this.state.selectedVehicleMakeList,
            selectedVehicleModelList:this.state.selectedVehicleModelList,
            selectedFuelTypeList:this.state.selectedFuelTypeList,
            vehicleRegNo:this.state.vehicleRegNo,
            vehicleMake:this.state.vehicleMake,
            vehicleFuelType:this.state.vehicleFuelType,
            selectedProductList:this.state.selectedProductList,
            customerCreateStatus:this.state.customerCreateStatus,
      
      
        })
      
      
      
        if (list.length == 1) {
      
            //   console.log("LENGTH :",1);
            this.state.selectedCustomerList = list;
      
            this.setState({
                selectedCustomerList: [...this.state.selectedCustomerList],
            })
      
            var customerName = _.where(customerArray, { contactNo: this.state.selectedCustomerList[0] })
            
            console.log("CUST NAME :", this.state.selectedCustomerList[0], " SELECTED CUST LIST :", customerName);
            
       
            
            this.state.selectedCustomerId=customerName[0].customerId;
            this.state.customerName = customerName[0].customerName;
            this.state.emailId=customerName[0].emailId;
            this.state.customerNamereadonly = true;
            this.state.emailIdreadonly=true;
      
            this.setState({
                customerName: this.state.customerName,
                customerNamereadonly: this.state.customerNamereadonly,
                emailIdreadonly:this.state.emailIdreadonly,
                emailId:this.state.emailId,
                selectedCustomerId:this.state.selectedCustomerId
            })
      
        
        } else if (list.length > 1) {
      
            //   console.log("LENGTH :",list.length);
            var listLength = list.length;
            this.state.selectedCustomerList = list.slice(-1 * 1);
      
            this.setState({
                selectedCustomerList: [...this.state.selectedCustomerList],
            })
      
            var customerName = _.where(customerArray, { contactNo: this.state.selectedCustomerList[0] })
      
      
            console.log("SELECTED LIST :", this.state.selectedCustomerList);
      
      
            console.log("CUST NAME :", this.state.selectedCustomerList[0], " SELECTED CUST LIST :", customerName);
      
          
      
          this.state.selectedCustomerId=customerName[0].customerId;
      
            this.state.customerName = customerName[0].customerName;
            this.state.customerNamereadonly = true;
            this.state.emailIdreadonly=true;
            this.state.emailId=customerName[0].emailId;
      
            this.setState({
                customerName: this.state.customerName,
                customerNamereadonly: this.state.customerNamereadonly,
                emailIdreadonly:this.state.emailIdreadonly,
                emailId:this.state.emailId,
                selectedCustomerId:this.state.selectedCustomerId
      
            })
      
        } else if (list.length == 0) {
            // console.log("LENGTH :",list.length);
            //   $("#customerName").hide();
            this.state.customerName = "";
            this.state.customerNamereadonly = true;
            this.state.emailIdreadonly=true;
            this.state.selectedCustomerList = [];
            this.state.emailId="";
            this.state.selectedCustomerId="";
      
            var subVehicleMakeArray=_.uniq(vehicleMakeModelArray, 'vehicleMake');
            var subVehicleModelArray=_.uniq(vehicleMakeModelArray, 'vehicleModel');
            var subVehicleFuelTypeArray=_.uniq(vehicleMakeModelArray, 'vehicleFuelType');
      
      
            self.state.vehcileMakeList=[]
            $.each(subVehicleMakeArray, function (i, item) {
              self.state.vehcileMakeList.push(item.vehicleMake);
            });
      
            self.state.vehicleModelList=[]
            $.each(subVehicleModelArray, function (i, item) {
              self.state.vehicleModelList.push(item.vehicleModel);
            });
      
      
            self.state.vehcileFuelTypeList=[];
            $.each(subVehicleFuelTypeArray, function (i, item) {
              self.state.vehcileFuelTypeList.push(item.vehicleFuelType);
            });
        
            self.setState({
              vehcileMakeList:[...self.state.vehcileMakeList],
              vehicleModelList:[...self.state.vehicleModelList],
              vehcileFuelTypeList:[... self.state.vehcileFuelTypeList],
            })
      
            this.setState({
                customerName: this.state.customerName,
                customerNamereadonly: this.state.customerNamereadonly,
                selectedCustomerList: this.state.selectedCustomerList,
                emailIdreadonly:this.state.emailIdreadonly,
                emailId:this.state.emailId,
                selectedCustomerId:this.state.selectedCustomerId
            })
      
      
        }
      
      
      
      }

    handleChangeSelectVehicleMake(list){

        var self=this;
        this.state.selectedVehicleModelList=[];
        this.state.selectedFuelTypeList=[];
      
        this.setState({
          selectedVehicleModelList:this.state.selectedVehicleModelList,
          selectedFuelTypeList:this.state.selectedFuelTypeList,
          })
      
        if (list.length == 1) {
      
          //   console.log("LENGTH :",1);
          this.state.selectedVehicleMakeList = list;
      
          this.setState({
            selectedVehicleMakeList: [...this.state.selectedVehicleMakeList],
          })
      
          var vehicleMakeModelDetails = _.where(vehicleMakeModelArray, { vehicleMake: this.state.selectedVehicleMakeList[0] })
      
      
          console.log("VEHICLE MODEL :", this.state.selectedVehicleMakeList[0], " SELECTED MAKE MODEL DETAILS :", vehicleMakeModelDetails);
      
          self.state.vehicleModelList=[];
          $.each(vehicleMakeModelDetails, function (i, item) {
            self.state.vehicleModelList.push(item.vehicleModel);
          });
      
      
          this.state.vehicleMake=this.state.selectedVehicleMakeList[0];
          this.state.vehicleModel = "";
          this.state.vehicleFuelType ="";
      
          this.state.selectedVehicleModelList=[];
          this.state.selectedFuelTypeList=[];
      
      
          
      
          this.setState({
          
              vehicleMake: this.state.vehicleMake,
              vehicleModel:this.state.vehicleModel,
              vehicleFuelType:this.state.vehicleFuelType,
      
              selectedVehicleMakeList:this.state.selectedVehicleMakeList,
              selectedVehicleModelList:this.state.selectedVehicleModelList,
              selectedFuelTypeList:this.state.selectedFuelTypeList,
      
              vehicleModelList:[...self.state.vehicleModelList]
            
          })
      
      
      } else if (list.length > 1) {
      
          //   console.log("LENGTH :",list.length);
          var listLength = list.length;
          this.state.selectedVehicleMakeList = list.slice(-1 * 1);
      
          this.setState({
            selectedVehicleMakeList: [...this.state.selectedVehicleMakeList],
          })
      
          var vehicleMakeModelDetails = _.where(vehicleMakeModelArray, { vehicleMake: this.state.selectedVehicleMakeList[0] })
      
      
          console.log("VEHICLE MODEL :", this.state.vehicleMakeModelDetails, " SELECTED MAKE MODEL DETAILS :", vehicleMakeModelDetails);
      
          self.state.vehicleModelList=[];
          $.each(vehicleMakeModelDetails, function (i, item) {
            self.state.vehicleModelList.push(item.vehicleModel);
          });
      
      
          this.state.vehicleMake=this.state.selectedVehicleMakeList[0];
          this.state.vehicleModel = "";
          this.state.vehicleFuelType ="";
      
          this.state.selectedVehicleModelList=[];
          this.state.selectedFuelTypeList=[];
      
      
          
      
          this.setState({
          
              vehicleMake: this.state.vehicleMake,
              vehicleModel:this.state.vehicleModel,
              vehicleFuelType:this.state.vehicleFuelType,
      
              selectedVehicleMakeList:this.state.selectedVehicleMakeList,
              selectedVehicleModelList:this.state.selectedVehicleModelList,
              selectedFuelTypeList:this.state.selectedFuelTypeList,
      
              vehicleModelList:[...self.state.vehicleModelList]
            
          })
      
      } else if (list.length == 0) {
          // console.log("LENGTH :",list.length);
          //   $("#customerName").hide();
          
          this.state.vehicleMake="";
          this.state.vehicleModel = "";
          this.state.vehicleFuelType = "";
        
      
          this.state.selectedVehicleMakeList=[];
          this.state.selectedVehicleModelList=[];
          this.state.selectedFuelTypeList= [];
            
          this.setState({
             
              vehicleMake: this.state.vehicleMake,
              vehicleModel:this.state.vehicleModel,
              vehicleFuelType:this.state.vehicleFuelType,
            
              selectedVehicleMakeList:this.state.selectedVehicleMakeList,
              selectedVehicleModelList:this.state.selectedVehicleModelList,
              selectedFuelTypeList:this.state.selectedFuelTypeList,
          })
      
          var subVehicleMakeArray=_.uniq(vehicleMakeModelArray, 'vehicleMake');
          var subVehicleModelArray=_.uniq(vehicleMakeModelArray, 'vehicleModel');
          var subVehicleFuelTypeArray=_.uniq(vehicleMakeModelArray, 'vehicleFuelType');
      
          self.state.vehicleModelList=[];
          $.each(subVehicleModelArray, function (i, item) {
            self.state.vehicleModelList.push(item.vehicleModel);
          });
      
          self.setState({
            vehicleModelList:[... self.state.vehicleModelList],
          })
      
      
      }
      
      }

      

      handleChangeSelectVehicleModel(list){

 
        this.state.selectedFuelTypeList=[];
       
        this.setState({
          selectedFuelTypeList:this.state.selectedFuelTypeList,
        })
      
      
        var self=this;
        
        this.state.selectedFuelTypeList=[];
      
        this.setState({
          selectedFuelTypeList:this.state.selectedFuelTypeList
        })
      
        if (list.length == 1) {
      
          //   console.log("LENGTH :",1);
          this.state.selectedVehicleModelList = list;
      
          this.setState({
            selectedVehicleModelList: [...this.state.selectedVehicleModelList],
          })
      
          var vehicleMakeModelDetails = _.where(vehicleMakeModelArray, { vehicleModel: this.state.selectedVehicleModelList[0] })
      
      
          console.log("VEHICLE MODEL :", this.state.vehicleMakeModelDetails, " SELECTED MAKE MODEL DETAILS :", vehicleMakeModelDetails);
      
          var subVehicleMakeArray=_.uniq(vehicleMakeModelArray, 'vehicleMake');
          var subVehicleModelArray=_.uniq(vehicleMakeModelArray, 'vehicleModel');
          var subVehicleFuelTypeArray=_.uniq(vehicleMakeModelArray, 'vehicleFuelType');
      
          self.state.vehcileFuelTypeList=[];
          $.each(subVehicleFuelTypeArray, function (i, item) {
            self.state.vehcileFuelTypeList.push(item.vehicleFuelType);
          });
      
      
          this.state.vehicleModel=this.state.selectedVehicleModelList[0];
          this.state.vehicleFuelType ="";
      
          this.state.selectedFuelTypeList=[];
      
      
          
      
          this.setState({
          
           
              vehicleModel:this.state.vehicleModel,
              vehicleFuelType:this.state.vehicleFuelType,
      
              selectedVehicleModelList:this.state.selectedVehicleModelList,
              selectedFuelTypeList:this.state.selectedFuelTypeList,
      
              vehcileFuelTypeList:[...self.state.vehcileFuelTypeList]
            
          })
      
      
      } else if (list.length > 1) {
      
          //   console.log("LENGTH :",list.length);
          var listLength = list.length;
          this.state.selectedVehicleModelList = list.slice(-1 * 1);
      
          this.setState({
            selectedVehicleModelList: [...this.state.selectedVehicleModelList],
          })
      
          var vehicleMakeModelDetails = _.where(vehicleMakeModelArray, { vehicleMake: this.state.selectedVehicleModelList[0] })
      
      
          console.log("VEHICLE MODEL :", this.state.vehicleMakeModelDetails, " SELECTED MAKE MODEL DETAILS :", vehicleMakeModelDetails);
      
          var subVehicleMakeArray=_.uniq(vehicleMakeModelArray, 'vehicleMake');
          var subVehicleModelArray=_.uniq(vehicleMakeModelArray, 'vehicleModel');
          var subVehicleFuelTypeArray=_.uniq(vehicleMakeModelArray, 'vehicleFuelType');
      
          self.state.vehcileFuelTypeList=[];
          $.each(subVehicleFuelTypeArray, function (i, item) {
            self.state.vehcileFuelTypeList.push(item.vehicleFuelType);
          });
      
      
          this.state.vehicleModel=this.state.selectedVehicleMakeList[0];
          this.state.vehicleFuelType ="";
      
          this.state.selectedFuelTypeList=[];
      
      
          
      
          this.setState({
          
           
              vehicleModel:this.state.vehicleModel,
              vehicleFuelType:this.state.vehicleFuelType,
      
              selectedVehicleModelList:this.state.selectedVehicleModelList,
              selectedFuelTypeList:this.state.selectedFuelTypeList,
      
              vehcileFuelTypeList:[...self.state.vehcileFuelTypeList]
            
          })
      
      
      } else if (list.length == 0) {
          // console.log("LENGTH :",list.length);
          //   $("#customerName").hide();
          
          
          this.state.vehicleModel = "";
          this.state.vehicleFuelType = "";
        
      
          this.state.selectedVehicleModelList=[];
          this.state.selectedFuelTypeList= [];
            
          this.setState({
      
              vehicleModel:this.state.vehicleModel,
              vehicleFuelType:this.state.vehicleFuelType,
      
              selectedVehicleModelList:this.state.selectedVehicleModelList,
              selectedFuelTypeList:this.state.selectedFuelTypeList,
          })
      
          var subVehicleMakeArray=_.uniq(vehicleMakeModelArray, 'vehicleMake');
          var subVehicleModelArray=_.uniq(vehicleMakeModelArray, 'vehicleModel');
          var subVehicleFuelTypeArray=_.uniq(vehicleMakeModelArray, 'vehicleFuelType');
      
          self.state.vehcileFuelTypeList=[];
          $.each(subVehicleFuelTypeArray, function (i, item) {
            self.state.vehcileFuelTypeList.push(item.vehicleFuelType);
          });
      
          self.setState({
            vehcileFuelTypeList:[... self.state.vehcileFuelTypeList],
          })
      
      
      
      }
      
      
      
      }


      handleChangeSelectFuelType(list){

        this.state.selectedFuelTypeList=[];
      
        this.setState({
          selectedFuelTypeList:this.state.selectedFuelTypeList,
        })
      
      
        var self=this;
        
        this.state.selectedFuelTypeList=[];
      
        this.setState({
          selectedFuelTypeList:this.state.selectedFuelTypeList
        })
      
        if (list.length == 1) {
      
          //   console.log("LENGTH :",1);
          this.state.selectedFuelTypeList = list;
      
          this.setState({
            selectedFuelTypeList: [...this.state.selectedFuelTypeList],
          })
      
       
      
      
          this.state.vehicleFuelType=this.state.selectedFuelTypeList[0];
        
      
          this.setState({
              vehicleFuelType:this.state.vehicleFuelType,
              selectedFuelTypeList:this.state.selectedFuelTypeList,
            
          })
      
      
      } else if (list.length > 1) {
      
          //   console.log("LENGTH :",list.length);
          var listLength = list.length;
          this.state.selectedFuelTypeList = list.slice(-1 * 1);
      
          this.setState({
            selectedFuelTypeList: [...this.state.selectedFuelTypeList],
          })
      
        
      
          this.state.vehicleFuelType=this.state.selectedFuelTypeList[0];
        
      
          this.setState({
              vehicleFuelType:this.state.vehicleFuelType,
              selectedFuelTypeList:this.state.selectedFuelTypeList,
            
          })
      
      
      } else if (list.length == 0) {
          
          this.state.vehicleFuelType = "";
      
          this.state.selectedFuelTypeList= [];
            
          this.setState({
      
                vehicleFuelType:this.state.vehicleFuelType,
               selectedFuelTypeList:this.state.selectedFuelTypeList,
          })
      
      
      
      }
      
      }



   render() {
     return (

        <div>
                         <form >

<div className="mandatory_feilds" style={{ backgroundColor: "Light-grey" }}>
<div class="row" style={{ backgroundColor: "" }}>
   <div class="col-xs-12 col-sm-4 col-lg-4 ">
                <label class="control-label selectpicker " for="customerName">Contact No</label>
                <span style={{color:'red',fontWeight:'700'}}>*</span>
                <Multiselect
                                    onChange={value => this.handleChangeSelectCustomer(value)}
                                    allowCreate={false}
                                    onCreate={value => this.handleChangeCreateCustomer(value)}
                                    data={this.state.customerList}
                                  // data={customerList}
                                    value={this.state.selectedCustomerList}
                                    maxlength={1}
                                />
          
               

              </div>

              <div class="col-xs-12 col-sm-4 col-lg-4 ">
                <label class="control-label col-sm-2" style={{ fontWeight: "bold" }} for="vehicleRegistrationNo">Customer Name<span style={{ color: "red" }}>*</span></label>
                <div class="col-sm-10">
            
                <input type="text" name="customerName"
                     onChange={this.handleUserInputCustomerName} readOnly={this.state.customerNamereadonly}
                    value={this.state.customerName} className="form-control" style={{ width: "100%" }} />
                      </div>
              </div>

              </div>

    <div class="row" style={{ backgroundColor: "" }}>
              <div class="col-xs-12 col-sm-4 col-lg-4 ">
                <label class="control-label selectpicker " for="customerName">Vehicle RegNo</label>
                <span style={{color:'red',fontWeight:'700'}}>*</span>
            
               <input type="text" class="form-control" style={{ color: "black" }}
                id="vehicleRegNo" name="vehicleRegNo" value={this.state.vehicleRegNo} 
                onChange={this.handleUserInput} placeholder="Vehicle Reg No" />
          
               

              </div>
              <div class="col-xs-12 col-sm-4 col-lg-4 ">
                <label class="control-label selectpicker" for="vehicleRegistrationNo">Vehicle Make</label>
                <span style={{color:'red',fontWeight:'700'}}>*</span>
                <Multiselect
                                    onChange={value => this.handleChangeSelectVehicleMake(value)}
                                    allowCreate={false}
                                    onCreate={value => this.handleChangeCreateVehicleMake(value)}
                                    data={this.state.vehcileMakeList}
                                    value={this.state.selectedVehicleMakeList}
                                    maxlength={1}
                                /> 
          
              </div>

              <div class="col-xs-12 col-sm-4 col-lg-4 ">

                <label class="control-label " for="bookingId">Vehicle Model</label>
                <span style={{color:'red',fontWeight:'700'}}>*</span>
                <Multiselect
                                    onChange={value => this.handleChangeSelectVehicleModel(value)}
                                    allowCreate={false}
                                    onCreate={value => this.handleChangeCreateVehicleModel(value)}
                                    data={this.state.vehicleModelList}
                                    value={this.state.selectedVehicleModelList}
                                    maxlength={1}
                                />  
          

              </div>

            <div class="col-xs-12 col-sm-4 col-lg-4 ">

            <label class="control-label " for="bookingId">Fuel Type</label>
            <span style={{color:'red',fontWeight:'700'}}>*</span>
            <Multiselect
                                    onChange={value => this.handleChangeSelectFuelType(value)}
                                    allowCreate={false}
                                    onCreate={value => this.handleChangeCreateFuelType(value)}
                                    data={this.state.vehcileFuelTypeList}
                                    value={this.state.selectedFuelTypeList}
                                    maxlength={1}
                                />


            </div>

            </div>

    
  </div>




</form>

<br/>
<SubmitButtonComponent  onClick={this.AddVehicleSubmitFunc} /> 
<CancelButtonComponent onClick={this.CancelVehicleFunc} />
<ClearButtonComponent onClick={this.ClearVehicleFunc} />

      </div>
        )
   }
}



export const vehicleDefaultData=function(stateData,currentState){

    console.log("VEHICLE DEFAULT DATA :",stateData)

    var self=currentState;

    self.state.customerName=stateData.customerName;

    self.setState({
        customerName:self.state.customerName,
    })
}