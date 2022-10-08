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
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';



import moment from 'moment';
import { Message } from 'semantic-ui-react';



import './FeedBackFormCSS.css';
import { VscSmile, BiHappy, BiMeh, BiSad } from 'react-icons/bi';




class feedBackForm extends Component {

    constructor() {
        super()

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
   
        this.state = {
            rating:0,
            comments:"",
            placeholder_text: "",
            date:date
        }

     

    }

    componentDidMount() {
    SetCurrentPage("FeedBackform");
      var self=this;

      $("#fb_txtarea_ID").hide();
      $("#feedbackformdiv").show();
      $("#successmessagediv").hide();
      $("#duplicatesmessagediv").hide();

      $("#commentserror").hide();
      $("#ratingserror").hide();

        this.DecodeTheURL();


}

DecodeTheURL(){

    var url=window.location.href;

   
    var decodeComponent=decodeURIComponent(url);
    

    var url = new URL(decodeComponent);
  
    this.state.companyId = url.searchParams.get("companyId");
    this.state.companyName = url.searchParams.get("companyName");
    this.state.invoiceId = url.searchParams.get("invoiceId");
    this.state.feedBackMode = url.searchParams.get("feedBackMode");
   
    

    if(window.location.href.indexOf("?") > -1) {
        var newUrl = this.refineUrl();
        window.history.pushState("object or string", "Title", "/"+newUrl );
      }

}


refineUrl()
{
  //get full url
  var url = window.location.href;
  //get url after/  
  var value = url = url.slice( 0, url.indexOf('?') );
  //get the part after before ?
  value  = value.replace('@System.Web.Configuration.WebConfigurationManager.AppSettings["BaseURL"]','');  
  return value;     
}

    

MailFunc(){

    $.ajax({
        type: 'POST',
        data: JSON.stringify({
            companyId: this.state.companyId,
            fromDate:this.state.fromDate,
            toDate:this.state.toDate,
            year:this.state.year
        }),
      //  url: "http://15.206.129.105:8080/ThroughBooksCOAPI/feedback/mailfeedback",
        url: "http://15.206.129.105:8080/ThroughBooksCOAPI/saleorder/addsaleorder",


        
        // url: "http://localhost:8081/EmployeeAttendenceAPI/MandatoryFieldsConfig/GetAllFieldsData",
        contentType: "application/json",
        dataType: 'json',
        async: false,

        success: function (data, textStatus, jqXHR) {

         


        


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
 
 
SubmitFunc(){

    var self=this;

  

    var proceedData="yes";

    if(this.state.rating!=0 ){

       if(this.state.rating == 1 && this.state.comments==""){
        proceedData="no";

       }

       if(proceedData=="yes"){
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,
                companyName:this.state.companyName,
                date:this.state.date,
                invoiceNo:this.state.invoiceId,
                feedBackMode:this.state.feedBackMode,
                ratings:this.state.rating,
                comments:this.state.comments
    
            }),
            url: "http://15.206.129.105:8080/ThroughBooksCOAPI/feedback/AddFeedBack",
            // url: "http://localhost:8081/EmployeeAttendenceAPI/MandatoryFieldsConfig/GetAllFieldsData",
            contentType: "application/json",
            dataType: 'json',
            async: false,
    
            success: function (data, textStatus, jqXHR) {
    
            
    
    
                if(data.response=="Success"){
                  
                
                    $("#fb_txtarea_ID").hide();
                    $("#feedbackformdiv").hide();
                    $("#successmessagediv").show();
                    $("#duplicatesmessagediv").hide();
              
                    $("#commentserror").hide();
                    $("#ratingserror").hide();
    
                }else if(data.response=="Duplicate"){
    
                    $("#fb_txtarea_ID").hide();

                    $("#commentserror").hide();
                    $("#ratingserror").hide();

                    $("#feedbackformdiv").hide();
                    $("#successmessagediv").hide();
                    $("#duplicatesmessagediv").show();
    
                }
            
                self.state.rating=0;
                self.state.comments="";

                self.setState({
                    rating:self.state.rating,
                    comments:self.state.comments
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
       }else{
        $("#commentserror").show();
       }
       

    }else{
        $("#ratingserror").show();

    }
   
 


}

 

IconOnclick(value) {

    this.state.comments="";
    this.setState({
        comments:this.state.comments
    })

    $("#ratingserror").hide();
    $("#commentserror").hide();

    var x = document.getElementById("fb_txtarea_ID");
  
    if (x.style.display === "none") {
      x.style.display = "block";
      
    } else {
      /*  x.style.display = "none"; */
    }
    if (value === 1) {
      this.state.placeholder_text = "What you didn't like in us";
      this.state.rating=1;

       
    }
    else if (value === 2) {
      this.state.placeholder_text = "What would you like to improve in us";
      this.state.rating=3;
    }
    else if (value === 3) {
      this.state.placeholder_text = "What you liked the most in us";
      this.state.rating=5;
    }
    this.setState({
      placeholder_text:this.state.placeholder_text
    });

  }


  handleUserInputComments = (e) => {

  

    const name = e.target.name;
    const value = Case.capital(e.target.value);
  
    this.state.comments=value;

    this.setState({
        [name]: Case.capital(value)
    });

    if(value.length>0){
        $("#commentserror").hide();
    }else if(this.state.rating==0){
        $("#commentserror").show();
    }

  }



    render() {

  
        return (

       

            <div className="container" style={{ marginBottom: '0%', paddingTop: "0px" }}>
         
             <div  id="feedbackformdiv">
                <div class="" style={{ marginTop: "0px" }}>
              
                 </div>

                 <div className="fb_div container-fluid">
        <div>
          <h3 className="feedb_header">Tell us what you think about Service</h3>
          <div className="fb_icons">
            <a className="icon1" onClick={() => this.IconOnclick(1)}>< BiSad /></a>
            <a  className="icon2" onClick={() => this.IconOnclick(2)} ><BiMeh /></a>
            <a  className="icon3" onClick={() => this.IconOnclick(3)} ><BiHappy /></a>
          </div>
          <span id="ratingserror" style={{color:"red",fontWeight:"800",display: "block"}}>! Provide Ratings</span>

          <div className="fb_txtarea_div" id="fb_txtarea_ID" >
            <textarea id="" className="fb_txtarea"  onChange={this.handleUserInputComments}   placeholder={this.state.placeholder_text}
             name="comments" rows="4" value={this.state.comments} >
            </textarea>
          </div>
          <span id="commentserror" style={{color:"red",fontWeight:"800",display: "block"}}>! Provide Comments</span>

   
    

          <button type="button" className="btn btn-primary fb_submit" onClick={() => this.SubmitFunc()}>Submit</button>
        </div>
      </div>
               

                 

                      

           {/*  <button  onClick={() => this.MailFunc()}>MAIL    </button>  */}

         {/*    <button onClick={() => this.SubmitFunc()}>Submit</button> */}

             </div>



                <div id="successmessagediv">
                 <Message style={{backgroundColor: "lightgrey",height: "244px",borderStyle: "double" ,marginTop: "191px"}}>
                 <div className="row">
                <div  className="col-sm-2 col-lg-2 col-md-2 fb_col2" >
                <svg  className="smilesvg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" >
                <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
                </svg>
              
                  </div>
                <div className="col-sm-10 col-lg-10 col-md-10 fb_col10">
                  <Message.Header >ThankYou for your valuable feedback</Message.Header>
                  </div>
                  </div>
                </Message>
                </div>


                 <div id="duplicatesmessagediv">
                 <Message style={{backgroundColor: "lightgrey",height: "244px",borderStyle: "double",marginTop: "191px" }}>
                <div className="row">
                <div  className="col-sm-2 col-lg-2 col-md-2 fb_col2" >
                <svg className="smilesvg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" >
                <circle class="path circle" fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/>
                <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/>
                </svg>
             

                </div>
                <div className="col-sm-10 col-lg-10 col-md-10 fb_col10">
                  <Message.Header >ThankYou for your feedback, it's already recorded</Message.Header>
                  </div>
                  </div>
                </Message>
                </div>


            </div >


        );
    }
}

export default feedBackForm;