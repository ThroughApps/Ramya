import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';


import AddCategory from './AddCategory';
import AddUser from './AddUser';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import './datepicker.css';

import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import { FormErrors } from './FormErrors';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './DownloadButton.css';
import SelectSearch from 'react-select';
import "./MainPageRedirectButton.css";
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
  GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
  
//import Help from './Help';
var helpFuncValue="expense";
var helpClassValue;
var userarray = [];
var key = "shinchanbaby";

class OpeningBalance extends Component {
    constructor(){
        super()
        var today = new Date();

         var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
       
        this.state={
          
            date: date,
         
            openingBalance:'',
            companyId:companyId,
            staffId:staffId,
            employeeName:employeeName,
           role:role,
          
            dateValid:false,
            formErrors: {
                openingBalance:'',                     
            },
            openingBalanceValid: false,
            data:[],
            columns:[],
            
        }
        this.setState({
            date: date,
           }) 
    }

    componentDidMount() {     
     
          SetCurrentPage("OpeningBalance");  
    
      $("#nodata").hide();
      $("#tableHeadings").hide();
   
        window.scrollTo(0, 0);      
       var self=this;
       var userarray = [];
     self.Initialize();
     $(".btn-default").css("background-color","#05a4b5");
     $(".btn-default").css("color","white");

   
  
  
 
}

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) }
     );
      }
      handleopeningBalance= (e) => {

        const name = e.target.name;
        const value = e.target.value;
    
        var value1 = value;
        var cleanNum;
    
    
        if (value1 != "") {
    
          var isNumberDt = $.isNumeric(value1);
          if (isNumberDt !== false) {
            var sign_data = Math.sign(value1);
     
            if (sign_data != -1) {
    
              cleanNum = value1.match(/^\d+\.?\d{0,2}/);
            
            
                this.state[name] = cleanNum;
                this.setState({ [name]: cleanNum },
                  () => { this.validateField(name, cleanNum) }
           );
                
              
              
    
            } else {
    
       
              this.state[name] = '';
              this.setState({ [name]: '' });
           
            }
          } else {
    
           
            this.state[name] = '';
            this.setState({ [name]: '' });
          
          }
    
        } else {
    
          this.state[name] = '';
          this.setState({ [name]: '' });
       
        }
    
      }
   
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let openingBalanceValid = this.state.openingBalanceValid;
    

        switch (fieldName) {
            case 'openingBalance':
                openingBalanceValid = value.length >= 0;
                fieldValidationErrors.openingBalance = openingBalanceValid ? '' : ' is InCorrect';
                break;
          default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            openingBalanceValid: openingBalanceValid,      
                  }, this.validateForm);
    }
    validateForm() {

        this.setState({
            formValid:       
                this.state.openingBalanceValid                       

        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
      
    AddExpenseFunc()
    {
       var self=this;

       var inDate = new Date(this.state.date);      
   
       var date=inDate.getDate() + '-' +(inDate.getMonth() + 1) + '-' +inDate.getFullYear();
        
        self.setState({
          date:self.state.date,          
             });
  
       if ( (this.state.openingBalance.length >0) ){
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
         
                openingBalance:this.state.openingBalance, 
                companyId:this.state.companyId,
                date: this.state.date,
             staffId: this.state.staffId,
                   employeeName: this.state.employeeName,
                   role: this.state.role,
                          
            }),
          
             url: " http://15.206.129.105:8080/ThroughBooksCOAPI/expense/addopeningBalance",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
             

                              Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Successfully Added Opening Balance ',   
                                showConfirmButton: false,
                                timer: 2000
                              })
                              localStorage.setItem('OpeningBalance', CryptoJS.AES.encrypt(self.state.openingBalance, key));
                              $("#tableHeadings").empty();
                              
                              $("#categoryName").empty();
                              self.state.openingBalance="";
                     
                              self.setState({
                                openingBalance: '',
                               
                                               
                           })
      
                         //  $('#mytable tr:last').before("<tr><td>new row</td></tr>")  
               self.Initialize();
               $("#nodata").hide();
                
      
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
    else {
       
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Enter All Details',   
          showConfirmButton: false,
          timer: 2000
        })
    }
      }
     
      Initialize(){
        var userarray = [];
          var self=this;
 
       
     $.ajax({
         type: 'POST',
         data: JSON.stringify({
            companyId:this.state.companyId,
            
          }),
        url: " http://15.206.129.105:8080/ThroughBooksCOAPI/expense/openingBalance",
         contentType: "application/json",
         dataType: 'json',
         async: false,
   
         success: function (data, textStatus, jqXHR) {
             var no;
          
           if(data.openingBalanceRetrievelist.length!=0){
      var tab = '<thead><tr class="headcolor"><th>S.No</th><th>OpeningBalance</th></tr></thead>';
       $.each(data.openingBalanceRetrievelist, function (i, item) {
    
        no=parseInt(i)+1;
         tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + no + '</td>'
         +'<td>' + item.openingBalance + '</td></tr></tbody>';
     
         self.state.data[i] = {
          "SNo":no,  
          "OpeningBalance":item.openingBalance,
         
 }; 
});
        self.state.columns = self.GetColumns();
        
       $("#tableHeadings").append(tab);
  
    }
    else{
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

    
      
          return Object.keys(this.state.data[0]).map(key => {

            return {
                Header: key,
                accessor: key,
  
            };
  
        });
     
     }
 

    
NoAction() {
  ReactDOM.render(
    <Router>
      <div>
        <Route path="/" component={OpeningBalance} />
      </div>
    </Router>,
    document.getElementById('contentRender'));

}

Expense()
{
  helpFuncValue="helpaddexpense";

    ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={OpeningBalance} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
}


cancelFunc() {
       
    ReactDOM.render(<OpeningBalance />, document.getElementById("contentRender"));
}

BackbtnFunc() {
  if((this.state.openingBalance.length==0))
  {
   
    this.setState({
      openingBalanceValid:false,
    })
  }
  if((this.state.openingBalance.length==0)&&(this.state.categoryName.length==0))
{
  ReactDOM.render(
    <Router>
      <div>
      
        <Route path="/" component={DashboardOverall} />
      

      </div>
    </Router>,
    document.getElementById('contentRender'));
  registerServiceWorker();
}else{
  confirmAlert({
    title: "Confirmation", // Title dialog
    message: "Unsaved changes are there. Do you really want to go back?", // Message dialog
    buttons: [
      {
        label: 'Confirm',
        onClick: () => this.ConfirmBack()
      },
      {
        label: 'Cancel',
        onClick: () => this.CancelBack()
      }
    ]
  });
}
   
  }
  ConfirmBack() {
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
   
  //   console.log("ROW INFO :",rowInfo);
  
   if (typeof rowInfo !== "undefined") {
    return {
        onClick: (e, handleOriginal) => {
            this.setState({
            selected: rowInfo.index
            });
            if (handleOriginal) {
            handleOriginal()
            }
            
          
  
       
         
            var openingBalance = rowInfo.original["OpeningBalance"];
           
  
  
  

           
            this.state.openingBalance = openingBalance;
    
        
            this.state.oldopeningBalance = this.state.openingBalance;
       
  
            self.setState({        
              openingBalance: self.state.openingBalance,
              oldopeningBalance: self.state.oldopeningBalance,          
          })
  
                this.state.rowIndexValue=rowInfo.index;
        },
        style: {
          background: rowInfo.index === this.state.selected ? 'rgb(66, 139, 202)' : '',
          color: rowInfo.index === this.state.selected ? '#fff' : ''
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


  DeleteCommonFunc(){
    var self=this;
  
  if( this.state.id===undefined){
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Kindly, Select Balance ',
     
    })
  }else{
    if(this.state.id!="" ){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Do you Want to Delete '+self.state.openingBalance,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
     //   timer: 1500
      }).then((result) => {
        if (result.value) {
          self.DeleteFunc(this.state.rowIndexValue) 

        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            position:'center',
            icon:'warning',
            title:'Cancelled Deletion Of '+self.state.openingBalance,
            showConfirmButton: false,
            timer:2000,
          })
        }
      })
    }
  }
    
  
  }

  CancelBack() {}
    render() {
      const  downloadButtonData=<i  style={{color:"black"}} class="glyphicon glyphicon-download-alt" ></i>
         
        return(
            <div class="container">
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
                        marginTop:"13px",
                        display:"inline-block"
                    }}>
                    <a  href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></ul>

                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8">
                        <div class="card-header" style={{backgroundColor:""}}>
        <h3 >Opening Balance </h3>
      </div>
                  
                    </div>

                    
            </div>
               
          
           
                        <div class="card">
        
                 
                  <div class="card-body">
                  <div className="panel panel-default">
                                <FormErrors formErrors={this.state.formErrors} />
                            </div>
                   <form class="form-horizontal form-bordered" action="/action_page.php">
           
             
                <div class="form-group">
                <label class="control-label col-sm-2" for="openingBalance">Opening Balance<span style={{color:"red"}}>*</span></label>
                <div class="col-sm-10">
              
                  <input type="number" min="0" class="form-control" value={this.state.openingBalance} onChange={this.handleUserInput} name="openingBalance" id="openingBalance" placeholder="openingBalance"/>
                </div>
                </div>
            
              
                
              <div class="form-group"> 
              <div class="row" style={{marginLeft:"3px"}}>
                <div class="col-sm-offset-2 col-sm-10" >
                  <button type="button" disabled={!this.state.formValid}  style={{fontWeight:"bold"}} onClick={() => this.AddExpenseFunc()}  class="btn btn-default">Submit</button> <span></span>
                  <button type="button"  style={{fontWeight:"bold"}} onClick={() => this.cancelFunc()} class="btn btn-default">cancel</button>
                </div>
                </div>
              </div>
              </form></div>

                {/* <div    style={{ display: "grid" }}>
           


                <div className="row" id="Printspace">
                <div className="col-sm-4 col-lg-2 col-md-2 ">
                <h4 >Expense List</h4>
                </div>
                <div className="col-sm-4 col-lg-2 col-md-2 ">


                </div>
                <div className="col-sm-4 col-lg-2 col-md-2 ">


                </div>
                <div className="col-sm-4 col-lg-2 col-md-2 ">


                </div>

                <div className="col-sm-4 col-lg-4 col-md-4" >

                  <div class="btn-group pull-right" style={{ marginTop: "0px", float: "right" }} >
              
              




                    <button type="button" class="btn btn-default" >

                      <div class="buttonright" >
                        <ReactHTMLTableToExcel
                          id="test-table-xls-button"
                          className="download-table-xls-button "

                          table="tableHeadings"
                          filename="Expense_List"
                          sheet="tablexls"
                          buttonText={downloadButtonData}
                        />
                      </div>
                    </button>
                  </div>
                </div>



              </div>



       
        </div> */}

{/* 
        <ReactTable style={{overflow:"auto",marginBottom:"5%"}}
              data={this.state.data}
              columns={this.state.columns}
              noDataText="No Data Available"
              filterable={false}
              defaultPageSize={2}
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
              getTrProps={this.onTrRowClick}
          
            /> */}

        <div id="tableOverflow">
          <table style={{ margin: "auto",marginBottom:"5%" }} class="table table-bordered" id="tableHeadings">

          </table>
        </div>
              </div> </div>
                    );
    }

}
export default OpeningBalance