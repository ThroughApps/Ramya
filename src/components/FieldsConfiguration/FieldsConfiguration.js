import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../registerServiceWorker';

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';

import ReactTable from "react-table";
import "react-table/react-table.css";
import "../ReactTableCSS.css";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import SelectSearch from 'react-select';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import {
    ClearButtonComponent, CancelButtonComponent,
    AddButtonComponent, UpdateButtonComponent,
    SubmitProceedButtonComponent, EditButtonComponent, SaveButtonComponent
} from '../ServiceRegistration/ButtonComponent';
import CreatableSelect from 'react-select/creatable';
import { BackButtonComponent } from '../ServiceRegistration/ButtonComponent';
import NotificationComponent from '../Notifications/NotificationComponent';

import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
    GetCurrencies,SetCurrentPage } from '../ConstSiteFunction';

    import _ from 'underscore';
    import './FieldsConfigurationCSS.css';
import { fieldLength_Validation } from '../Validations/FieldValidations';

import CapitalCaseFunc from '../ServiceRegistration/CommonTextFormatComponent';



//import Help from './Help';
var helpFuncValue = "expense";
var helpClassValue;
var userarray = [];
var key = "shinchanbaby";
var dataLimitArray = [];

class FieldsConfiguration extends Component {
    constructor() {
        super()
        var today = new Date();

        var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        this.state = {
           
            companyId:companyId,
            //COLLAPSIBLE MENU INFO
            menuArray:["taxFieldsMenuOpen"],
            taxFieldsMenuOpen:false,

            //TAX FIELD INFO
            tax1:'',
            tax2:'',


            fieldsData:[],
            submitData:[],


        }

    

    }

    componentDidMount() {
        
        SetCurrentPage("FieldsConfigurationPage");
     
        this.GetDynamicFieldsData();
  

    }

    GetDynamicFieldsData(){

        var self=this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
              companyId: this.state.companyId,
            }),
          
              url: " http://15.206.129.105:8080/ThroughBooksCOAPI/FieldConfigurations/GetFieldConfigurations",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
             
                console.log("DID MOUNT DYNAMIC FIELDS DATA :",data);
                self.state.fieldsData=data.fieldList;
                self.SetFieldData();
            },
            error: function (data) {
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

    SetFieldData(){

        var self=this;
        $.each(self.state.fieldsData,function(i,item){

            console.log("SetFieldData :",item.fieldLabelName ,":", item.fieldTextName);

            self.state[item.fieldLabelName]=item.fieldTextName;
            self.setState({
                [item.fieldLabelName]:item.fieldTextName,
            })
        });

    }

    //TO OPEN THE CLICKED MENU & CLOSE OTHER MENU
  handleChangedMenuOpen(menuName){
    
    var self=this;
    var menuNameCalled=menuName;

    var response= new Promise((resolve, reject) => {
        var response="Proceed";
          //  alert("AT START  :"+ this.state[menuNameCalled]);
    //OPEN THE CURRENT CLICKED MENU
    this.state[menuNameCalled]=!this.state[menuNameCalled];

    this.setState({
        [menuNameCalled]:this.state[menuNameCalled],
    })

    resolve(response);

    return response
})
   // alert("AT END  :"+ this.state[menuNameCalled]);

    response.then(function (response) {
        if(response=="Proceed"){
        //CLOSE OTHER OPNED MENU EXCEPT THE CURRENT MENU
        self.CloseOpenMenu(menuNameCalled);
        }

  

})

  }

 //TO CLOSE OTHER OPNED MENU EXCEPT THE CURRENT MENU
  CloseOpenMenu(menuNameCalled){

    var self=this;

    var closeMenuArray=_.without(this.state.menuArray,menuNameCalled);
    console.log("closeMenuArray :",closeMenuArray);

    $.each(closeMenuArray,function(i,item){

        self.state[item]=false;

        self.setState({
            [item]:self.state[item],
        })
    })

  }

  /***********************************************************************************
   * TAX FIELDS CODE BEGINS
   ************************************************************************************
   */   
    handleUserInputTaxChange= (e) => {

        const name = e.target.name;
        const value = e.target.value;

        var validationData=fieldLength_Validation(value,16);
   
       
        if(validationData==true){
            this.state[name]=CapitalCaseFunc(value);
            this.setState({
                [name]: value,
              });
        }else{
            var fieldId=name+"ErrorMsg";
            $("#"+fieldId).empty();
            this.SetErrorMsg(fieldId,"! LengthExceeds (Length should be <= 16 characters");
        }
      

    }

    TaxFieldsSubmitFunc(){

        var self=this;
        var taxField1Info=_.findWhere(self.state.fieldsData,{fieldLabelName:'tax1'});
        var taxField2Info=_.findWhere(self.state.fieldsData,{fieldLabelName:'tax2'});
        var taxField3Info=_.findWhere(self.state.fieldsData,{fieldLabelName:'tax3'});


        if( (this.state.tax1!="" && this.state.tax1!=taxField1Info.fieldTextName) || 
            (this.state.tax2!="" && this.state.tax2!=taxField2Info.fieldTextName) ||
            (this.state.tax3!="" && this.state.tax3!=taxField3Info.fieldTextName)){

           
                var data_Submit={
                    fieldTextName:this.state.tax1,
                    fieldId:taxField1Info.fieldId,
                }
                this.state.submitData.push(data_Submit);

                var data_Submit={
                    fieldTextName:this.state.tax2,
                    fieldId:taxField2Info.fieldId,
                }
                this.state.submitData.push(data_Submit);

                var data_Submit={
                    fieldTextName:this.state.tax3,
                    fieldId:taxField3Info.fieldId,
                }
                this.state.submitData.push(data_Submit);

                this.setState({
                    submitData:this.state.submitData,
                })


                
                this.CommonAjaxCall();


            }else{
                
                if(this.state.tax1=="" || this.state.tax2=="" || this.state.tax3==""){
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Kindly FillIn Mandatory Fields',
                        showConfirmButton: false,
                        timer: 2000
                      })
                }else if(this.state.tax1==taxField1Info.fieldTextName && 
                        this.state.tax2==taxField2Info.fieldTextName && 
                        this.state.tax3==taxField3Info.fieldTextName ){
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'No Changes Made',
                        showConfirmButton: false,
                        timer: 2000
                      })
                }
            }
    }

/***********************************************************************************
   * TAX FIELDS CODE ENDS
   ************************************************************************************
   */   

  SetErrorMsg(fieldId,errorMessage){

    $("#"+fieldId).append(errorMessage);
    this.HideFieldErroeMsgs(fieldId);

  }

  HideFieldErroeMsgs(fieldId) {
    setTimeout(function () {
        $("#"+fieldId).empty();
    }, 4000);

}


  CommonAjaxCall(data_Submit){

    var self=this;

    console.log("COMMON AJAX CALL DATA :",JSON.stringify({
        companyId: this.state.companyId,
        submitData:JSON.stringify(this.state.submitData)

    }) );


    $.ajax({
        type: 'POST',
        data: JSON.stringify({
          companyId: this.state.companyId,
          submitData:JSON.stringify(this.state.submitData),
          
        }),
      
          url: " http://15.206.129.105:8080/ThroughBooksCOAPI/FieldConfigurations/UpdateFieldConfigurations",
        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
         
            console.log("COOMON AJAX CALL FIELDS DATA :",data);
            self.state.fieldsData=data.fieldList;
            self.setState({
                fieldsData:self.state.fieldsData,
            });

            self.SetFieldData();

            localStorage.setItem('DynamicFields', CryptoJS.AES.encrypt((JSON.stringify(data.fieldList)), key));
                  
            if(data.response=="Updated"){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Updated Fields Configuration',
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
      
  
        },
    });




  }

    render() {
        const downloadButtonData = <i style={{ color: "black" }} class="glyphicon glyphicon-download-alt" ></i>

        return (
            <div className="container" style={{ marginBottom: '0%', paddingTop: "0px" }}>
                <div className="">
                        <div className="">
            {/*  <BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} /> */}
            </div>
        
</div>
<div className="collapsed_group">
 <div className="col-sm-8">
 <div class="">
<h3 className="text-center">Fields Configuration</h3>
                          </div>
      <div className="panel-group">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4 className="panel-title">
            {/* <a href="#"
             onClick={function(){this.setState({jobCardMenuopen:!this.state.jobCardMenuopen})}.bind(this)}         
             >Job Card</a> */}
         
       
       <a href="#"
            onClick={() => this.handleChangedMenuOpen("taxFieldsMenuOpen")} >Tax Fields</a> 
          
          </h4>
        </div>
        <div className={this.state.taxFieldsMenuOpen? "panel-collapse": "panel-collapse panel-close"} >
          <ul className="list-group">
            <li className="list-group-item">
            <label>Tax-1</label><span style={{color:'red',fontWeigth:'600',marginRight:"20px"}}>*</span>
            <input name="tax1" value={this.state.tax1} onChange={this.handleUserInputTaxChange} ></input>
            <span id="tax1ErrorMsg" style={{color:'red',fontWeigth:'600'}}></span>
            </li>
            <li className="list-group-item" >
            <label>Tax-2</label><span style={{color:'red',fontWeigth:'600',marginRight:"20px"}}>*</span>
            <input name="tax2" value={this.state.tax2} onChange={this.handleUserInputTaxChange} ></input>
            <span id="tax2ErrorMsg" style={{color:'red',fontWeigth:'600'}}></span>
            </li>
            <li className="list-group-item" >
            <label>Tax-3</label><span style={{color:'red',fontWeigth:'600',marginRight:"20px"}}>*</span>
            <input name="tax3" value={this.state.tax3} onChange={this.handleUserInputTaxChange} ></input>
            <span id="tax3ErrorMsg" style={{color:'red',fontWeigth:'600'}}></span>
            </li>
            <li className="list-group-item">
            <button type="button" onClick={() => this.TaxFieldsSubmitFunc()} style={{ marginTop: " 2%",color:"#fff" }} class="btn btn-default ">Save Changes</button>
            </li>
          </ul>
          <div className="panel-footer"></div>
        </div>
      </div>
    </div>

    </div>


 {/*<div className="col-sm-4 col-sm-offset-4">
      <div className="panel-group">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4 className="panel-title">
            {/* <a href="#"
             onClick={function(){this.setState({jobCardMenuopen:!this.state.jobCardMenuopen})}.bind(this)}         
             >Job Card</a> *
         
       
       <a href="#"
            onClick={() => this.handleChangedMenuOpen("inventoryMenuopen")} >Inventory</a> 
          
          </h4>
        </div>
        <div className={this.state.inventoryMenuopen? "panel-collapse": "panel-collapse panel-close"} >
          <ul className="list-group">
            <li className="list-group-item">Add product</li>
            <li className="list-group-item">Purchase Invoice</li>
            <li className="list-group-item">Vendor</li>
          </ul>
          <div className="panel-footer"></div>
        </div>
      </div>
    </div>

    </div> */}


 </div>

            

              

</div>



        );
    }

}
export default FieldsConfiguration