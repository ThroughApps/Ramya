import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { FormErrors } from '../FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from '../registerServiceWorker';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';

import * as moment from "moment";
import Select from 'react-select';
import SelectSearch from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import { Multiselect } from 'multiselect-react-dropdown';

import { Multiselect } from 'react-widgets';
import DashboardOverall from '../MaincontentDashboard/DashboardOverall';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from '../ConstSiteFunction';
import { BackButtonComponent } from '../ServiceRegistration/ButtonComponent';


var testarray = [];
var inputarray = [];
var emailArray = [];
var productListArray=[];
var totalCustomerArray=[];


class MessageCenterEmailPage extends Component {


    constructor() {

        super()
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        this.state = {
            options: [
                {
                   value: '', 
                   label: ''
                }
               
            ],
            department: '',
            TotalNoShift: '',
            shift: '',
            count: '',
            role: '',
            valid: false,
            companyId: companyId,
            superiorId: '',
            employeeId: [],
            message: '',
            answer: '',
            copy: '',
            selectedFromDate:'',
            selectedToDate:'',

            authPassword: '',
         
           
        };
      //  this.state.selectedValue=this.state.options

    }

    componentDidMount() {
        SetCurrentPage("MessagecenterEmail");
        emailArray  = [];

        var self = this;

        this.GetData();


        $('#btnAdd').click(function (e) {
            var selectedOpts = $('#customerListTable option:selected');
            if (selectedOpts.length == 0) {
                e.preventDefault();
                var len = $('#customerListTable').children('option').length;
                if (len == 0) {
  
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        text: 'No Recipients to Add',       
                        showConfirmButton: false,
                        timer: 2000
                    })
                  
                } else {

                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        text: 'Please Select Recipients to Add',     
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            }

            $('#PairedSelectBox').append($(selectedOpts).clone())

            var selectedData = "";
            $('#customerListTable option:selected').each(function () {
                $(this).attr('selected', 'selected');
                selectedData = $(this).val();
                emailArray .push(selectedData);

            });

            $(selectedOpts).remove();
            e.preventDefault();
        });


        $('#btnRemove').click(function (e) {
            var selectedOpts = $('#PairedSelectBox option:selected');
            if (selectedOpts.length == 0) {
                e.preventDefault();
                var len = $('#PairedSelectBox').children('option').length;
                if (len == 0) {

                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        text: 'No Recipients to Remove',   
                        showConfirmButton: false,
                        timer: 2000
                    })
                    
                } else {

                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        text: 'Please Select Recipients to Remove',   
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            }

            $('#customerListTable').append($(selectedOpts).clone());

            var selectedData = "";
            $('#PairedSelectBox option:selected').each(function () {
                $(this).attr('selected', 'selected');
                selectedData = $(this).val();


                for (var i = emailArray .length - 1; i >= 0; i--) {
                    if (emailArray [i] === selectedData) {
                        emailArray .splice(i, 1);
                       
                    }
                }

            });

            $(selectedOpts).remove();
            e.preventDefault();
        });


        $('#btnAddAll').click(function (e) {

            var selectedOpts = $('#customerListTable option');


            if (selectedOpts.length == 0) {
                e.preventDefault();

                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    text: 'No Recipients to Add',    
                    showConfirmButton: false,
                    timer: 2000
                })

            }

            $('#PairedSelectBox').append($(selectedOpts).clone());

            var selectedData = "";
            $('#customerListTable option').each(function () {
                $(this).attr('selected', 'selected');
                selectedData = $(this).val();
                emailArray .push(selectedData);

            });
            $("#seperateddata").append(selectedData);

            $(selectedOpts).remove();
            e.preventDefault();


        });


        $('#btnRemoveAll').click(function (e) {
            var selectedOpts = $('#PairedSelectBox option');
            if (selectedOpts.length == 0) {
                e.preventDefault();

                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    text: 'No Recipients to Remove',     
                    showConfirmButton: false,
                    timer: 2000
                })

           }

            $('#customerListTable').append($(selectedOpts).clone());
            var selectedData = "";
            emailArray .splice(0, emailArray .length);
           
            $(selectedOpts).remove();
            e.preventDefault();
        });


    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
        );
    }

  
    Submit() {

        var self = this;

        if(emailArray.lenth >0 && this.state.message != undefined && this.state.message != ""){
        this.state.contactNo = emailArray .toString();
        this.setState({
            contactNo: this.state.contactNo,
            message: this.state.message
        });



         $.ajax({
                    type: 'POST',
                    data: JSON.stringify({
                        sendTo:this.state.contactNo,
                        message:this.state.message,
                        msgCount:this.state.msgCount,
                        staffId:this.state.staffId,
                        companyId:this.state.companyId,
                    }),
                    url: " http://15.206.129.105:8080/ThroughBooksCOAPI/MessageCenter/SendMessage",
                  contentType: "application/json",
                    dataType: 'json',
                    async: false,

                    success: function (data, textStatus, jqXHR) {
                        $("#PairedSelectBox").empty();
                         emailArray  = [];
                        self.state.message = "";
                      //  self.GetData();
                   
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title:'Message Sent Successfully. ',   
                            showConfirmButton: false,
                            timer: 2000
                          })

                          self.CancelData();

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
                if (this.state.message == undefined || this.state.message == "") {
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        // title: 'No Internet',
                        text: 'Enter the message to send Email',
                        showConfirmButton: false,
                        timer: 2000
                    })
                } else if (emailArray.length <= 0) {
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        // title: 'No Internet',
                        text: 'Select customers to send Email',
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            }

    }

    
    GetData() {

        var self=this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,

            }),
            url: "http://15.206.129.105:8080/ThroughBooksCOAPI/MessageCenter/GetMessageCustomerDetails",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
               // alert("SUCCESS"); 
    
               console.log("DID MOUNT DATA :",data);

                if (data.length != 0) {
                    //alert("data 1");
                    //   $("#MasterSelectBox").empty();
                    $("#customerListTable").empty();

                    var tab;
                    totalCustomerArray=[];
                    totalCustomerArray=data.customerList;
                    $.each(data.customerList, function (i, item) {
                        tab += '<option value= "' + item.emailId + '">' + item.customerName + "  " + item.emailId + '</option>';
                    });
                }
                //alert("data 2 ");
               // $("#MasterSelectBox").append(tab);
                $("#customerListTable").append(tab);

                var productarray=[];

                $.each(data.productList, function (i, item) {
                    productarray.push({ label: item.productName,value: item.productName});
                });
              self.state.options=productarray;
          
           self.setState({
             options:self.state.options          
           })

          // console.log("product option",self.state.options)
 
            }.bind(this),
            
            error: function (data, textStatus, jqXHR) {

                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'No Internet', 
                    text: 'Network Connection Problem',   
                    showConfirmButton: false,
                    timer: 2000
                })
               
            }


        })
       
 
    }

    GetFilterData() {
    
        var flag="true" ;
        

       /* console.log("STATE DATA :","this.state.selectedFromDate :",this.state.selectedFromDate,
        "this.state.selectedToDate :",this.state.selectedToDate,
        "productListArray :",productListArray,
        "productListArray.length :",productListArray.length);
        */

          if( (this.state.selectedFromDate == "") && (this.state.selectedToDate== "") 
              && (productListArray.length==0) ){  
                // When Nothing got selected
        
               // alert("NOTHING SELECTED");

              Swal.fire({
                position: 'center',
                icon: 'warning',
             //   title: "No Data Selected",
                text:"No Data Selected",
                showConfirmButton: false,
                timer: 2000
                })

            } else if(( (this.state.selectedFromDate == "") && (this.state.selectedToDate == "")) 
                          && (productListArray.length>0) ){
                 console.log("Only Product ") 
               //  alert("ONLY PRODUCT  SELECTED");
                  //selected only products
              var fromDate = null;
              var toDate= null ;

             } else if( (this.state.selectedFromDate == "" && this.state.selectedToDate != "" ) ||
                        (this.state.selectedFromDate != "" && this.state.selectedToDate == "" ) ){
                 // Select any one date
                 flag="false"
  
                // alert("BOTH DATES NOT SELECTED");

                 Swal.fire({
                     position: 'center',
                     icon: 'error',
                     title: "Select Date",
                     text:"Kindly Select From and To Date",
                     showConfirmButton: false,
                     timer: 2000
                     })
                 
                 }else if((  (this.state.selectedFromDate != "")
                             && (this.state.selectedToDate != "")) ){

                          console.log("Only Date")
                       //   alert("ONLY BOTH DATES  SELECTED");

                          if (productListArray.length==0) {
                              //NO PRODUCTS SELECTED
                          productListArray= ''
                          }

                          console.log(productListArray)
                          var from=this.state.selectedFromDate
                          var to = this.state.selectedToDate
                          console.log("from,to",this.state.selectedFromDate,from)
                         
                          var fromDate = null;
                          var toDate= null ;

                          if(from!=null)
                       fromDate = moment(from).format("YYYY-MM-DD")
                     //fromDate = from.getFullYear()+ '-' + ('0' + (from.getMonth() + 1)).slice(-2) + '-' +  ('0' + from.getDate()).slice(-2)
                     
                       if(to!=null)
                      toDate = moment(to).format("YYYY-MM-DD")
                      //toDate = to.getFullYear()+ '-' + ('0' + (to.getMonth() + 1)).slice(-2) + '-' +  ('0' + to.getDate()).slice(-2)
                       
                      console.log(fromDate,toDate)
                      
                      if(fromDate!='' && toDate!='') 
                          {
                          if(fromDate > toDate){
          
                             flag="false"
 
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: "InValid Date Limit",
                                text:"From Date Less Than To Date",
                                showConfirmButton: false,
                                timer: 2000
                                })}
                      }
                  
      
                     
                  
               
              console.log("flag Data",flag)    
          }             
          
          
  if(flag=="true"){
      
  
    var self=this;

   /* console.log("GET FILTERED DATA JSON DATA :",JSON.stringify({
        companyId: this.state.companyId,
        fromDate:fromDate,
        toDate:toDate,
        products:productListArray.toString()})

    );
    */

  
          $.ajax({
              type: 'POST',
              data: JSON.stringify({
                  companyId: this.state.companyId,
                  fromDate:fromDate,
                  toDate:toDate,
                  products:productListArray.toString()
  //selected values
  //from date
  //todate
  
              }),
              url: "http://15.206.129.105:8080/ThroughBooksCOAPI/MessageCenter/MessageReportFilters",
              contentType: "application/json",
              dataType: 'json',
              async: false,
              success: function (data, textStatus, jqXHR) {
              console.log("Filtereddata",data)
                  if (data.length == 0) {
                      $("#customerListTable").empty();
                    }
                  
                    if (data.length != 0) {
                
                        //   $("#MasterSelectBox").empty();
                        $("#customerListTable").empty();
                        var tab;
                
                        $.each(data, function (i, item) {
                            tab += '<option value= "' + item.emailId + '">' + item.customerName + "  " + item.emailId + '</option>';
                    
                    });
                    }

                  
                    //$("#MasterSelectBox").append(tab);
                    $("#customerListTable").append(tab);
                    
  },
          
              error: function (data, textStatus, jqXHR) {
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No Internet',        
                    showConfirmButton: false,
                    timer: 2000
                })
             }
          
  
          })
     
      }
  
         // console.log("product this option",this.state.options)    
  }
      
      
      
      
      
    
    
    
    
    

    handleChangeFromDate = date => {

        if(date!=null){
          this.state.selectedFromDate=date;
          }else if(date==null){
            this.state.selectedFromDate="";
          }

          this.setState({
            selectedFromDate:this.state.selectedFromDate
         })

        }


        handleChangeToDate = date => {
     
            
            if(date!=null){
              this.state.selectedToDate=date;
              }else if(date==null){
                this.state.selectedToDate="";
              }

              this.setState({
                selectedToDate:this.state.selectedToDate
             })

            }

        ClearFunc(){
                         
            this.state.selectedFromDate="";
            this.state.selectedToDate="";
            this.state.productOption="";
            productListArray=[];
      
            this.setState({
              selectedFromDate:this.state.selectedFromDate,
              selectedToDate:this.state.selectedToDate,
              productOption:this.state.productOption,
            })
        }

        handleChangeSelectedProduct = (e) => {
      
            // Display selected value for user
            var currentValue=e;
            this.state.productOption=e;
           // console.log("productOptions-e", e)
            this.setState({
                productOption:this.state.productOption
            })
            productListArray=[];
           
             $.each(e, function (i, item) {
            productListArray.push(item.value);
             //console.log("ProductOptions",this.state.selectedproducts)
          
              });
           //   console.log("product Options",this.state.productOption,e,productListArray)
             
                       
     }

     CancelData(){
        this.state.selectedFromDate="";
        this.state.selectedToDate="";
        this.state.productOption="";
        this.state.message="";
        productListArray=[];

        this.setState({
          selectedFromDate:this.state.selectedFromDate,
          selectedToDate:this.state.selectedToDate,
         productOption:this.state.productOption,
         message:this.state.message,
        })
      
      $("#customerListTable").empty();

      var tab;
      $.each(totalCustomerArray, function (i, item) {
          tab += '<option value= "' + item.contactNo + '">' + item.customerName + "  " + item.contactNo + '</option>';
      });

    $("#customerListTable").append(tab);

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


      render() {
        var temp=new Date()
        var min = temp.getFullYear()+ '-' + ('0' + (temp.getMonth() + 1)).slice(-2) + '-' +  ('0' + temp.getDate()).slice(-2)
        return (
        <div class="container" style={{ marginBottom: "20px" }}>
        <div class="container">
        <div className="">
        <div class="">
                    <BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
                  </div>
        <div className="inv_HeaderCls">
        <h3>Email Message</h3>
        </div> </div>
        <div class="row">
        <div class="col-md-4" style={{ marginTop: "3%" }}>
        <label class="control-label">
        <b> Select Category </b>    
        </label> 
        <Select
        id="#productMenu"
        name="productOption"
        isMulti={true}
        value={this.state.productOption}
        options={this.state.options}
        onChange={this.handleChangeSelectedProduct}
        />
        </div>
        <div class="col-md-2" style={{ marginTop: "3%" }}>
        <label class="control-label">
        <b> From:  </b>    
        </label>    
        <br />
        <DatePicker
        className="dateToField form-control" style ={{ width : "100%" }}
        selected={this.state.selectedFromDate}
        onChange={this.handleChangeFromDate}
        dateFormat="yyyy-MM-dd"
        maxDate={new Date(min)}
        // maxDate={new Date()}
        />
        </div>
        <div class="col-md-2" style={{ marginTop: "3%" }}>
        <label class="control-label">
        <b> To:  </b>  </label> 
        <br />                                 
        <DatePicker style ={{ width : "100%" }} className="dateToField form-control"
        selected={this.state.selectedToDate}
        onChange={this.handleChangeToDate}
        dateFormat="yyyy-MM-dd" maxDate={new Date(min)}
        //  maxDate={new Date()}
         />
        </div>                                
        </div>
        <div class="form-group">
        <div className="row" style={{ marginRight: "3px" }}>
        <div class="col-sm-12" >
        <button type="button" class="btn btn-default" style={{ marginRight: "10px", marginTop: "2%",
        backgroundColor: "rgb(5, 164, 181)", color: "white" }}
        onClick={() => this.GetFilterData()}
        >Search</button>
        <button type="button" class="btn btn-default" style={{ marginTop: "2%",
        backgroundColor: "rgb(5, 164, 181)", color: "white" }} 
        onClick={() => this.CancelData()}
        >Cancel</button>
        </div>
        </div>
        </div>
        </div>
        <div class="row" >
        <div class="col-sm-5">
        <select style={{ height: "100px", width: "100%" }} id="customerListTable" multiple>
        </select>
        </div>
        <div class="col-sm-2" style={{ marginTop: "5px", textAlign: "center" }}>
        <button id="btnAdd" style={{ width: "95px", marginBottom: "10px",backgroundColor:"#428bca",border:"1px solid #ccc", color:"#fff",padding:"5px 0px" }} value=">">Add</button><br />
        <button id="btnAddAll" style={{ width: "95px", marginBottom: "10px",backgroundColor:"#428bca",border:"1px solid #ccc", color:"#fff",padding:"5px 0px" }} value="<">Add All</button><br />
        <button id="btnRemoveAll" style={{ width: "95px", marginBottom: "10px",backgroundColor:"#428bca",border:"1px solid #ccc", color:"#fff",padding:"5px 0px" }} value="<">RemoveAll</button><br />
        <button id="btnRemove" style={{ width: "95px", marginBottom: "10px",backgroundColor:"#428bca",border:"1px solid #ccc", color:"#fff",padding:"5px 0px" }} value="<">Remove</button>
        </div>
        <div class="col-sm-5" style={{}}>
        <select style={{ height: "100px", width: "100%" }} id="PairedSelectBox" multiple>
        </select>
        </div>
        </div>
        <label for="comment">Message Content:</label>
        <textarea
        onChange={this.handleUserInput}
        name="message"
        placeholder="Your message.."
        value={this.state.message}
        required style={{ height: '200px' }}
        class="form-control"
        rows="5" id="message"
        ></textarea>
        <button type="button" class="btn btn-default" style={{ marginTop: "10px", marginBottom: "50px", marginRight: "10px", backgroundColor: "rgb(5, 164, 181)", color: "white" }} onClick={() => this.Submit()}>
        Submit
        </button>
        </div>
        );
        }
        }
        export default MessageCenterEmailPage;

