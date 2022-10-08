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
import{  ClearButtonComponent,CancelButtonComponent,AddButtonComponent,UpdateButtonComponent} from './ButtonComponent';
import Case from 'case';
import { GetEmployeeSite,GetCurrentSite  } from '../ConstSiteFunction';
import { capitalCase } from "capital-case";
import { titleCase } from "title-case";
import CapitalCaseFunc from './CommonTextFormatComponent';


export default class VehicleMakeModelComponent extends Component {

    constructor() {
        super()

        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
       var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
      
        this.state = {
            companyId:companyId,
            employeeId:staffId,
            staffId: staffId,
            employeeName: employeeName,
            role: role,
            vehicleMake:'',
            vehicleModel:'',
            vehicleFuelType:'',
            isPaneOpen: false,
            data:[],
            columns:[],
        }
        this.AddVehicleMakeModelSubmitFunc = this.AddVehicleMakeModelSubmitFunc.bind(this);
        this.CancelVehicleMakemodelFunc = this.CancelVehicleMakemodelFunc.bind(this);
        this.ClearVehicleMakemodelFunc = this.ClearVehicleMakemodelFunc.bind(this);
       
    }


    componentDidMount(){

        var self=this;
        GetVehicleMakeModelData(this.state,this);
      
    }

    AddVehicleMakeModelSubmitFunc(){
            AddVehicleMakeModelFunc(this);
    }

  CancelVehicleMakemodelFunc(){
            CancelVehicleMakemodelFunc(this);
  }

  ClearVehicleMakemodelFunc(){
        ClearVehicleMakemodelFunc(this);
  }


  
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    var capitalCaseData=CapitalCaseFunc(value);
   
    this.state[name]=capitalCaseData;
    this.setState({ [name]:capitalCaseData });

  }

    render() {
        
        return (

            <div>
                   
                    <form >

    <div className="mandatory_feilds" style={{ backgroundColor: "Light-grey" }}>

        <div class="row" style={{ backgroundColor: "" }}>
                  <div class="col-xs-12 col-sm-4 col-lg-4 ">
                    <label class="control-label selectpicker " for="customerName">Vehicle Make</label>
                    <span style={{color:'red',fontWeight:'700'}}>*</span>
                    <input type="text" style={{ display: "none" }} readOnly class="form-control" name="customerName" value={this.state.customerName} onChange={this.handleUserInput} id="customerName" placeholder="customerName" />

                   <input type="text" class="form-control" style={{ color: "black" }}
                    id="vehicleMake" name="vehicleMake" value={this.state.vehicleMake} 
                    onChange={this.handleUserInput} placeholder="Vehicle Make" />
              
                   

                  </div>
                  <div class="col-xs-12 col-sm-4 col-lg-4 ">
                    <label class="control-label selectpicker" for="vehicleRegistrationNo">Vehicle Model</label>
                    <span style={{color:'red',fontWeight:'700'}}>*</span>
                       <input type="text" class="form-control" style={{ color: "black" }}
                        id="vehicleModel" name="vehicleModel" value={this.state.vehicleModel} 
                        onChange={this.handleUserInput} placeholder="Vehicle Model" />
              
                  </div>

                  <div class="col-xs-12 col-sm-4 col-lg-4 ">

                    <label class="control-label " for="bookingId">Fuel Type</label>
                    <span style={{color:'red',fontWeight:'700'}}>*</span>
                 <input type="text" class="form-control" style={{ color: "black" }}
                  id="vehicleFuelType" name="vehicleFuelType" value={this.state.vehicleFuelType} 
                  onChange={this.handleUserInput} placeholder="Fuel Type" />
              

                  </div>



                </div>

        
      </div>
  

    

</form>

<br/>
<SubmitButtonComponent  onClick={this.AddVehicleMakeModelSubmitFunc} /> 
<CancelButtonComponent onClick={this.CancelVehicleMakemodelFunc} />
<ClearButtonComponent onClick={this.ClearVehicleMakemodelFunc} />

           <br/>
           <br/>
             <ReactTable
                            data={this.state.data}
                            columns={this.state.columns}
                            noDataText="No Data Available"
                            filterable
                            defaultPageSize={5}
                            className="-striped -highlight"
                            defaultFilterMethod={(filter, row, column) => {
                                const id = filter.pivotId || filter.id;
                                return row[id] != undefined
                                    ? String(row[id])
                                        .toLowerCase()
                                        .indexOf(filter.value.toLowerCase()) != -1
                                    : true;
                            }}
                            showPaginationTop={true}
                            showPaginationBottom={false}
                             getTdProps={(state, rowInfo, column, instance) => {
                            return {
                              onClick: (e, handleOriginal) => {
                                // IMPORTANT! React-Table uses onClick internally to trigger
                                // events like expanding SubComponents and pivots.
                                // By default a custom 'onClick' handler will override this functionality.
                                // If you want to fire the original onClick handler, call the
                                // 'handleOriginal' function.
                                if (handleOriginal) {
                                 // handleOriginal()
                                         onRowClick_Vehicle_MakeModel(state, rowInfo, column, instance,this);
                                }
                              }
                            }
                          }}
                        />


            </div>


        );
    }
}

export const   GetVehicleMakeModelData = function(stateData,currentState){

    var self=currentState;

    $.ajax({
        type: "POST",
        data: JSON.stringify({
            companyId: stateData.companyId,
        }),
        url:"http://15.206.129.105:8080/ThroughBooksCOAPI/QuickLinkWebservices/GetVehiclemakemodelDetails",
        contentType: "application/json",
        dataType: "json",
        async: false,
        crossDomain: true,

        success: function (data, textStatus, jqXHR) {
            console.log("DATA GET CUST_PROJECT _TYPE LIST :",data);

            if (data.vehicleMakeModelList.length != 0) {
                   
                self.state.data = [];
                var count=0;
                $.each(data.vehicleMakeModelList, function (i, item) {

                    count=Number(count)+Number(1);
                    self.state.data[i] = {
                        "Sno":count,
                        "Vehicle_MakeModel_Id": item.vehicleMakeModelId,
                        "Vehicle Make": item.vehicleMake,
                        "Vehicle Model": item.vehicleModel,
                        "Fuel Type":item.vehicleFuelType,
                        "Action":<div style={{display: 'inline-flex'}}>
                            
                         < div class="updatedevice" id="updatedevice" style={{ textAlign: "center",marginRight: '10px' }}><span style={{ fontSize: '1em', color: 'white' }}>
                        <i class="glyphicon glyphicon-pencil" style={{
                            border: "none",
                            padding: "6px 7px 5px 7px",
                            fontSize: "1em",
                            color: "white",
                            borderRadius: "18px",
                            backgroundColor: "#5881d2"
                         
                        }} onClick={() => UpdateFunc(currentState)}>  </i>
                    </span></div> 
                            
                         < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
                        <i class="glyphicon glyphicon-trash" style={{
                            border: "none",
                            padding: "6px 7px 5px 7px",
                            fontSize: "1em",
                            color: "white",
                            borderRadius: "18px",
                            backgroundColor: "tomato"
                         
                        }} onClick={() => DeleteFunc(currentState)}>  </i>
                    </span></div> 
                  
                    
                    </div>

                    }
                });
              //  console.log("data",self.state.data);
                if (self.state.data.length > 0)
                    self.state.columns = GetVehicle_MakeModel_Columns(self.state);
            }else{
                self.state.data=[];
            }
            

            self.setState({
                data:self.state.data,
            })  
        },
         error: function (data) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: "No Internet",
              text:"Network Connection Problem",
              showConfirmButton: false,
              timer: 2000
            })
      }
    });


}

export const UpdateFunc = function(currentState){
    currentState.state.columnAction='Update';
}

export const DeleteFunc = function(currentState){
    currentState.state.columnAction='Delete';
}

export  const onRowClick_Vehicle_MakeModel =  async function (state, rowInfo, column, instance,currentState)  {
 
    var self=currentState;

        if (column.Header == "Action") {

          if (rowInfo != undefined) {
              if(currentState.state.columnAction=='Delete'){
                
                    var vehicle_MakeModel_Id = rowInfo.original["Vehicle_MakeModel_Id"];
                    var vehicleMake = rowInfo.original["Vehicle Make"];
                    var vehicleModel = rowInfo.original["Vehicle Model"];
                    var vehicleFuelType = rowInfo.original["Fuel Type"];

                    var rowIndexValue = rowInfo.index;

                    Swal.fire({
                        title: 'Are you sure?',
                        text: 'Do You Want Delete the '+vehicleMake+' - '+vehicleModel+' - '+vehicleFuelType,
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes, delete it!',
                        cancelButtonText: 'No, keep it'
                    }).then((result) => {
                        if (result.value) {
                                Delete_Vehicle_MakeModel(vehicle_MakeModel_Id,currentState); 
                    
                                if(self.state.successData=="Success"){
                                    Swal.fire({
                                    //  title: 'Are you sure?',
                                        text: 'Deleted '+vehicleMake+' - '+vehicleModel+' - '+vehicleFuelType,
                                        icon: 'success',
                                        showConfirmButton: false,
                                        timer: 2000
                                    })

                                }else if(self.state.successData=="Fail"){
                                    Swal.fire({
                                        //  title: 'Are you sure?',
                                        text:'Failed to Delete '+vehicleMake+' - '+vehicleModel+' - '+vehicleFuelType+' ,Try After Sometime',
                                        icon: 'warning',
                                        showConfirmButton: false,
                                        timer: 2000
                                    })
                                }
                        // For more information about handling dismissals please visit
                        // https://sweetalert2.github.io/#handling-dismissals
                        } else if (result.dismiss === Swal.DismissReason.cancel) {
                                Swal.fire({
                                    text:'Cancelled to Delete '+vehicleMake+' - '+vehicleModel+' - '+vehicleFuelType,
                                    icon: 'warning',
                                    showConfirmButton: false,
                                    timer: 2000,
                                })
                        }
                    })

          }else if(currentState.state.columnAction=='Update'){
                    var vehicle_MakeModel_Id = rowInfo.original["Vehicle_MakeModel_Id"];
                    var vehicleMake = rowInfo.original["Vehicle Make"];
                    var vehicleModel = rowInfo.original["Vehicle Model"];
                    var vehicleFuelType = rowInfo.original["Fuel Type"];

                    self.state.vehicleMakeModelId=vehicle_MakeModel_Id;
                    
                    self.state.vehicleMake=vehicleMake;
                    self.state.vehicleModel=vehicleModel;
                    self.state.vehicleFuelType=vehicleFuelType;

                    self.state.oldvehicleMake=vehicleMake;
                    self.state.oldvehicleModel=vehicleModel;
                    self.state.oldvehicleFuelType=vehicleFuelType;


                    self.setState({
                        vehicleMakeModelId:self.state.vehicleMakeModelId,
                        vehicleMake:self.state.vehicleMake,
                        vehicleModel:self.state.vehicleModel,
                        vehicleFuelType:self.state.vehicleFuelType,

                        oldvehicleMake:self.state.oldvehicleMake,
                        oldvehicleModel:self.state.oldvehicleModel,
                        oldvehicleFuelType:self.state.oldvehicleFuelType,
                    })


          }
        }

        }
 
  };


  export  const GetVehicle_MakeModel_Columns = function (stateData) {
    return Object.keys(stateData.data[0]).map(key => {
        if (key !== "Vehicle_MakeModel_Id") {
      return {
        Header: key,
        accessor: key,
       /* Cell: ({ cell }) => (
            <span class="glyphicon glyphicon-pencil"></span>
        )*/

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

  export  const  Delete_Vehicle_MakeModel =   function (vehicle_MakeModel_Id,currentState) {
   
    var self=currentState;
    // console.log("DELETE STATE DATA :",cust_project_Type_Id);
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
 
    console.log("DELETE DATA :", JSON.stringify({
        companyId: companyId,
        employeeId:staffId,
        vehicleMakeModelId:vehicle_MakeModel_Id
    }) );

     $.ajax({
         type: "POST",
         data: JSON.stringify({
             companyId: companyId,
             employeeId:staffId,
             vehicleMakeModelId:vehicle_MakeModel_Id,
             staffId: self.state.staffId,
             employeeName: self.state.employeeName,
             role: self.state.role,
         }),
         url:"http://15.206.129.105:8080/ThroughBooksCOAPI/QuickLinkWebservices/DeleteVehiclemakemodelDetails",
         contentType: "application/json",
         dataType: "json",
         async: false,
         crossDomain: true,
 
         success: function (data, textStatus, jqXHR) {
             console.log("DATA GET VEHICLE MAKE MODEL ON DELETE :",data);
                 
             self.state.successData=data.response;

             if (data.vehicleMakeModelList.length != 0) {
                   
                self.state.data = [];
                var count=0;

                self.props.SubmitClicked(data);
                $.each(data.vehicleMakeModelList, function (i, item) {

                    count=Number(count)+Number(1);
                    self.state.data[i] = {
                        "Sno":count,
                        "Vehicle_MakeModel_Id": item.vehicleMakeModelId,
                        "Vehicle Make": item.vehicleMake,
                        "Vehicle Model": item.vehicleModel,
                        "Fuel Type":item.vehicleFuelType,
                        "Action":<div style={{display: 'inline-flex'}}>
                            
                        < div class="updatedevice" id="updatedevice" style={{ textAlign: "center",marginRight: '10px' }}><span style={{ fontSize: '1em', color: 'white' }}>
                       <i class="glyphicon glyphicon-pencil" style={{
                           border: "none",
                           padding: "6px 7px 5px 7px",
                           fontSize: "1em",
                           color: "white",
                           borderRadius: "18px",
                           backgroundColor: "#5881d2"
                        
                       }} onClick={() => UpdateFunc(currentState)}>  </i>
                   </span></div> 
                           
                        < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
                       <i class="glyphicon glyphicon-trash" style={{
                           border: "none",
                           padding: "6px 7px 5px 7px",
                           fontSize: "1em",
                           color: "white",
                           borderRadius: "18px",
                           backgroundColor: "tomato"
                        
                       }} onClick={() => DeleteFunc(currentState)}>  </i>
                   </span></div> 
                 
                   
                   </div>
                    }
                });
              //  console.log("data",self.state.data);
                if (self.state.data.length > 0)
                    self.state.columns = GetVehicle_MakeModel_Columns(self.state);
            }else{
                self.state.data=[];
            }
            

            self.setState({
                data:self.state.data,
            })  




         },
         error: function (data) {
             //console.log("ERRO DATA ON DELETE :",data);
             Swal.fire({
               position: 'center',
               icon: 'error',
               title: "No Internet",
               text:"Network Connection Problem in delete",
               showConfirmButton: false,
               timer: 2000
             })
       }
     });
 
    // console.log("ON DELETE responseData :",responseData);
   //  return responseData;
 }

 export const AddVehicleMakeModelFunc=function(currentState){
        var self=currentState;
        console.log("ADD VEHICLE MAKE MODEL :",self.state);

        if(self.state.vehicleMake!="" && self.state.vehicleModel!="" && self.state.vehicleFuelType!=""){

            var url="http://15.206.129.105:8080/ThroughBooksCOAPI/QuickLinkWebservices/AddVehiclemakemodelDetails";
            var ProceedData="Yes";
            var operation="Add";

            if(currentState.state.columnAction=='Update'){
                url="http://15.206.129.105:8080/ThroughBooksCOAPI/QuickLinkWebservices/UpdateVehiclemakemodelDetails"; 
          
                if(self.state.vehicleMake!=self.state.oldvehicleMake ||
                        self.state.vehicleModel!=self.state.oldvehicleModel ||
                        self.state.vehicleFuelType!=self.state.oldvehicleFuelType){
                            ProceedData="Yes";
                            operation="Update";
                        }else{
                            ProceedData="No";

                            Swal.fire({
                                //  title: 'Are you sure?',
                                text:'No Changes Done',
                                icon: 'warning',
                                showConfirmButton: false,
                                timer: 2000
                            })
                        }
          
            }

            if(ProceedData=="Yes"){

               
                        $.ajax({
                            type: "POST",
                            data: JSON.stringify({
                                companyId:self.state.companyId,
                                employeeId:self.state.employeeId,
                                vehicleMakeModelId:self.state.vehicleMakeModelId,
                                vehicleMake:Case.capital(self.state.vehicleMake),
                                vehicleModel:Case.capital(self.state.vehicleModel),
                                vehicleFuelType:Case.capital(self.state.vehicleFuelType),
                                staffId: self.state.staffId,
                                employeeName: self.state.employeeName,
                                role: self.state.role,
                                site:GetCurrentSite() ,
                            }),
                            url:url,
                            contentType: "application/json",
                            dataType: "json",
                            async: false,
                            crossDomain: true,
                    
                            success: function (data, textStatus, jqXHR) {
                                console.log("DATA GET VEHICLE MAKE MODEL ON DELETE :",data);
                                    
                                self.state.successData=data.response;
                
                                if(data.response=="Success"){
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                    // title: "No Internet",
                                        text:operation+"ed "+self.state.vehicleMake+" - "+self.state.vehicleModel+" - "+self.state.vehicleFuelType,
                                        showConfirmButton: false,
                                        timer: 2000
                                    })

                                    self.props.SubmitClicked(data);
                                    ClearVehicleMakemodelFunc(currentState);

                                }else if(data.response=="Duplicate"){
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'warning',
                                    // title: "No Internet",
                                        text:"The "+self.state.vehicleMake+" - "+self.state.vehicleModel+" - "+self.state.vehicleFuelType+" Already Exist",
                                        showConfirmButton: false,
                                        timer: 2000
                                    })
                                }else if(data.response=="Fail"){
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'wrning',
                                    // title: "No Internet",
                                        text:"Failed to "+operation+" "+self.state.vehicleMake+" - "+self.state.vehicleModel+" - "+self.state.vehicleFuelType+" Try After Sometime",
                                        showConfirmButton: false,
                                        timer: 2000
                                    })
                                }

                                if (data.vehicleMakeModelList.length != 0) {
                                    
                                self.state.data = [];
                                var count=0;
                                $.each(data.vehicleMakeModelList, function (i, item) {
                
                                    count=Number(count)+Number(1);
                                    self.state.data[i] = {
                                        "Sno":count,
                                        "Vehicle_MakeModel_Id": item.vehicleMakeModelId,
                                        "Vehicle Make": item.vehicleMake,
                                        "Vehicle Model": item.vehicleModel,
                                        "Fuel Type":item.vehicleFuelType,
                                        "Action":<div style={{display: 'inline-flex'}}>
                                            
                                        < div class="updatedevice" id="updatedevice" style={{ textAlign: "center",marginRight: '10px' }}><span style={{ fontSize: '1em', color: 'white' }}>
                                        <i class="glyphicon glyphicon-pencil" style={{
                                            border: "none",
                                            padding: "6px 7px 5px 7px",
                                            fontSize: "1em",
                                            color: "white",
                                            borderRadius: "18px",
                                            backgroundColor: "#5881d2"
                                        
                                        }} onClick={() => UpdateFunc(currentState)}>  </i>
                                    </span></div> 
                                            
                                        < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
                                        <i class="glyphicon glyphicon-trash" style={{
                                            border: "none",
                                            padding: "6px 7px 5px 7px",
                                            fontSize: "1em",
                                            color: "white",
                                            borderRadius: "18px",
                                            backgroundColor: "tomato"
                                        
                                        }} onClick={() => DeleteFunc(currentState)}>  </i>
                                    </span></div> 
                                    
                                    
                                    </div>
                                    }
                                });
                                //  console.log("data",self.state.data);
                                if (self.state.data.length > 0)
                                    self.state.columns = GetVehicle_MakeModel_Columns(self.state);
                            }else{
                                self.state.data=[];
                            }
                            
                
                            self.setState({
                                data:self.state.data,
                            })  
                
                
                
                
                            },
                            error: function (data) {
                                //console.log("ERRO DATA ON DELETE :",data);
                                Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: "No Internet",
                                text:"Network Connection Problem in delete",
                                showConfirmButton: false,
                                timer: 2000
                                })
                        }
                        });

            }





        }else{
            Swal.fire({
                //  title: 'Are you sure?',
                text:'Kindly FillIn All Fields to Proceed',
                icon: 'warning',
                showConfirmButton: false,
                timer: 2000
            })
        }

 }

 export const ClearVehicleMakemodelFunc=function(currentState){
    var self=currentState;

    self.state.vehicleMakeModelId="";
    self.state.columnAction="";
    self.state.vehicleMake="";
    self.state.vehicleModel="";
    self.state.vehicleFuelType="";

    self.setState({
        vehicleMakeModelId:self.state.vehicleMakeModelId,
        columnAction:self.state.columnAction,
        vehicleMake:self.state.vehicleMake,
        vehicleModel:self.state.vehicleModel,
        vehicleFuelType:self.state.vehicleFuelType,
    })


 }

 export const CancelVehicleMakemodelFunc=function(currentState){
    var self=currentState;

    ClearVehicleMakemodelFunc(currentState);
    self.props.CancelClicked();

 }