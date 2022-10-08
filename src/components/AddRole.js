import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import VendorEntryForm from './VendorEntryForm';
import CustomerList from './CustomerList';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import './datepicker.css';

import AddRole from './AddRole';
import ChangePassword from './ChangePassword';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import FooterText from './FooterText';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import './DownloadButton.css';
import Case from 'case';

import "./MainPageRedirectButton.css";
import ReactTooltip from 'react-tooltip';
import {Delete_DownloadIcons, Invoice_xlDownldBtn} from './ServiceRegistration/IconComponents';
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import './EstimateCss.css';

class AddRole1 extends Component {
    constructor(){
        super()
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
       
        this.state={
            roleName:'',
            userName:'',            
            email:'',
            companyId:companyId,
            password:'',
            staffId:staffId,
            employeeName:employeeName,
           role:role, 
           modalRoleName:'',
            data:[],
            columns:[],
            formErrors: {
                roleName:'',    
                modalRoleName:'',               
            },
            
           roleNameValid: false,
           modalRoleNameValid:false,

               }
               this.DeleteRole=this.DeleteRole.bind(this);
               this.DownloadRoleList=this.DownloadRoleList.bind(this);


    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let roleNameValid = this.state.roleNameValid;
    

        switch (fieldName) {
            case 'roleName':
                roleNameValid = value.length >= 2;
                fieldValidationErrors.RoleName = roleNameValid ? '' : ' is InCorrect';
                break;
          default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            roleNameValid: roleNameValid,      
                  }, this.validateForm);
    }
    validateForm() {

        this.setState({
            formValid:       
                this.state.roleNameValid                       

        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    validateField1(fieldName, value) {
      let fieldValidationErrors = this.state.formErrors;
      let modalRoleNameValid = this.state.modalRoleNameValid;
  

      switch (fieldName) {
          case 'modalRoleName':
            modalRoleNameValid = value.length >= 2;
              fieldValidationErrors.modalRoleName = modalRoleNameValid ? '' : ' is InCorrect';
              break;
        default:
              break;
      }
      this.setState({
          formErrors: fieldValidationErrors,
          modalRoleNameValid: modalRoleNameValid,      
                }, this.validateForm1);
  }
  validateForm1() {

      this.setState({
          formValid1:       
              this.state.modalRoleNameValid                       

      });
  }

  errorClass1(error) {
      return (error.length === 0 ? '' : 'has-error');
  }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) }
     );
      }
      handleUserRoleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
          () => { this.validateField1(name, value) }
        );
      }
    
      AddRoleFunc()
      {
      var self=this;
      var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
      this.state.companyId = companyId;
      this.setState({
          companyId: companyId,
      });
      if (this.state.roleName.trim().length > 0) {
          $.ajax({
              type: 'POST',
              data: JSON.stringify({
                  roleName:  Case.capital(this.state.roleName),
                  companyId:this.state.companyId,
            //      date: this.state.date
            
            staffId: self.state.staffId,
            employeeName: self.state.employeeName,
            role: self.state.role,
              }),
          
             url: " http://15.206.129.105:8080/ThroughBooksCOAPI/admin/addrole",
              contentType: "application/json",
              dataType: 'json',
              async: false,
              success: function (data, textStatus, jqXHR) {
                  if (data.roleName == "RoleName") {
                                           
				     Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'The roleName Already Exists',  
                        showConfirmButton: false,
                        timer: 2000
                      })
                      
  
  
                  } else {
                    var roles = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Roles'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
     roles.push({roleName:self.state.roleName});
     localStorage.setItem('Roles', CryptoJS.AES.encrypt(JSON.stringify(roles), "shinchanbaby"));

                                Swal.fire({
                                    position: 'center',
                                    icon: 'sucess',
                                    title:'Successfully Added role ',  
                                    showConfirmButton: false,
                                    timer: 2000
                                  })

                                $("#tableHeadings").empty();
                                self.state.roleName = "";
                                self.state.formValid=false;
                                self.state.roleNameValid=false;
                                self.setState({
                                  roleName: '',
                                  formValid:false,
                                  roleNameValid:false,
                                 })  
                                  
                              self.Initialize();
                              $("#nodata").hide();  
                                            
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
      else {
                 
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Enter Role Name',  
            showConfirmButton: false,
            timer: 2000
          })
      }
        }
       UpdateRoleFunc()
      {
      var self=this;
      var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
      this.state.companyId = companyId;
      this.setState({
          companyId: companyId,
      });
 
          $.ajax({
              type: 'POST',
              data: JSON.stringify({
                  roleName:  Case.capital(this.state.modalRoleName),
                  companyId:this.state.companyId,
            //      date: this.state.date
            
            staffId: self.state.staffId,
            employeeName: self.state.employeeName,
            role: self.state.role,
            roleId:self.state.roleId,
            oldRole:self.state.roleName1,
              }),
          
            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/admin/Updaterole",
              contentType: "application/json",
              dataType: 'json',
              async: false,
              success: function (data, textStatus, jqXHR) {
                  if (data.roleName == "RoleName") {
                                           
				     Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'The roleName Already Exists',  
                        showConfirmButton: false,
                        timer: 2000
                      })
                      
  
  
                  } else {
                    var roles = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Roles'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
     roles.push({roleName:self.state.roleName});
     localStorage.setItem('Roles', CryptoJS.AES.encrypt(JSON.stringify(roles), "shinchanbaby"));

                                Swal.fire({
                                    position: 'center',
                                    icon: 'sucess',
                                    title:'Successfully Updated role ',  
                                    showConfirmButton: false,
                                    timer: 2000
                                  })

                                $("#tableHeadings").empty();
                                self.state.modalRoleName = "";
                                self.state.formValid1=false;
                                self.state.modalRoleNameValid=false;
                                self.setState({
                                  roleName: '',
                                  formValid1:false,
                                  modalRoleNameValid:false,
                                 })  
                                  
                              self.Initialize();
                              $("#nodata").hide();  
                                            
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
Initialize(){
  var self=this;
  $.ajax({
    type: 'POST',
    data: JSON.stringify({
        companyId:this.state.companyId,
        
      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/admin/rolereport",
       
    contentType: "application/json",
    dataType: 'json',
    async: false,

    success: function (data, textStatus, jqXHR) {
        var no;
     
      if(data.roleRetrievelist.length!=0){
        var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Role</th><th>Date</th></tr></thead>';
          $.each(data.roleRetrievelist, function (i, item) {
            no=parseInt(i)+1;
            tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + no + '</td><td>' + item.roleName + '</td>'
            +'<td>' + item.roleDate + '</td></tr></tbody>';
        
        
            self.state.data[i] = {
              "SNo":no,
              "Role":  item.roleName,
              "Date": item.roleDate,
              "RoleId":item.roleId
  
          };
        
        
        
          });
          $("#tableHeadings").append(tab);
          self.state.columns = self.getColumns();
          self.setState({
            data:self.state.data,
            columns:self.state.columns
          })
        }
      else{
        $("#nodata").show();
        $("#test-table-xls-button").hide();
      
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

getColumns(){

  return Object.keys(this.state.data[0]).map(key => {
               
    if (
      key != "RoleId" 
    ) {
      return {
        Header: key,
        accessor: key
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
      
componentDidMount() {
    var self=this;
    var customerName;
    var roleName;
    self.Initialize();
    window.scrollTo(0, 0);
    $("#nodata").hide(); 
   
    $("#tableHeadings").hide();
   
    $("ReactHTMLTableToExcel").css("background-color","#05a4b5");
    $(".btn-default").css("background-color","#05a4b5");
    $("ReactHTMLTableToExcel").css("color","white");
    $(".btn-default").css("color","white");

    }
      ChangePassword(){
        ReactDOM.render(
            <Router>
                <div>
      
                    <Route path="/" component={ChangePassword} />
                  </div>
            </Router>,
            document.getElementById('contentRender'));
      }
      AddRole(){
        ReactDOM.render(
            <Router>
                <div>
      
                    <Route path="/" component={AddRole1} />
                  </div>
            </Router>,
            document.getElementById('contentRender'));
      }
  
      
      
      cancelFunc() {
        ReactDOM.render(<AddRole1 />, document.getElementById("contentRender"));
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
                
             
      
      
            
                var roleId = rowInfo.original["RoleId"];
                var roleName_Delete = rowInfo.original["Role"];
              
               
           
                this.state.roleId = roleId;
                this.state.roleName_Delete = roleName_Delete;
                this.setState({
                  roleName_Delete: this.state.roleName_Delete,
                  roleId: this.state.roleId,
                });
      
            
      
             
                    this.state.rowIndexValue=rowInfo.index;
            },
           style: {
          background: rowInfo.index === this.state.selected ? 'rgb(66 139 202)' : '',
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
      UpdateCommonFunc(){
        var self=this;
      
        if( this.state.roleId===undefined){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Kindly, Select Role ',
           
          })
        }else{
       
         // $("#updaterole").modal('show');
          $('#updaterole').modal('show');
        }
      }
  
    
      
      Delete(rowIndexValue)
      {
          var self=this;
   
          $.ajax({
              type: 'POST',
              data: JSON.stringify({
               
                companyId:self.state.companyId,
                staffId: self.state.staffId,
                employeeName: self.state.employeeName,
                role: self.state.role,
                roleId: this.state.roleId,
                roleName:this.state.roleName_Delete,
              
                
              }),
           url: " http://15.206.129.105:8080/ThroughBooksCOAPI/admin/deleterole",
              contentType: "application/json",
              dataType: 'json',
              async: false,
        
              success: function (data, textStatus, jqXHR) {

                console.log("DELETE ROLE DATA :",data);
                
                if(data.roleName=="Success"){

                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Deleted Role '+self.state.roleName_Delete,
                    showConfirmButton: false,
                    timer: 2000
                  })
                      var array = [...self.state.data]; // make a new copy of array instead of mutating the same array directly.
                      array.splice(rowIndexValue, 1);
                      self.state.data=[];
                      self.state.data=array;
                      self.setState({data: array});
                      // self.Initialize();
                      // ReactDOM.render(
                      //   <Router>
                      //       <div>
                      //           <Route path="/" component={AddRole1} />
                      //       </div>
                      //   </Router>,
                      //   document.getElementById('contentRender'));
                      self.state.roleId = "";
                      self.state.roleName_Delete = "";
                              
                      var roles=[];
                    $.each(self.state.data,function(i,item){
                      roles.push({roleName:item.Role});
                    })
                    
                      localStorage.setItem('Roles', CryptoJS.AES.encrypt(JSON.stringify(roles), "shinchanbaby"));
                      
                }else if(data.roleName=="RoleHasEmployee"){
                    Swal.fire({
                      position: 'center',
                      icon: 'warning',
                      title: 'Role '+self.state.roleName_Delete+' canot be deleted since, role is assigned to a staff',
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
      NoAction() {
        ReactDOM.render(
          <Router>
              <div>
                  <Route path="/" component={AddRole1} />
              </div>
          </Router>,
          document.getElementById('contentRender'));
      
      }

      cancelFunc1() {
        this.state.modalRoleName = "";
    
        this.setState({
          modalRoleName: "",
          modalRoleNameValid: false,
        })
      }
      closeFunc() {

        var self = this;
        self.state.modalRoleNameValid = false;
        self.state.modalRoleName = "";   
    
        self.setState({
          modalRoleNameValid: self.state.modalRoleNameValid,    
          modalRoleName: self.state.modalRoleName
        })
    
    
      }    

      /* ********* NEW ICON FUNCTIONS ************ */

      DeleteRole(){

        var self=this;
      
        if( this.state.roleId===undefined){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Kindly, Select Role ',
           
          })
        }else{
         
          if((this.state.roleName1=="Proprietor") || (this.state.roleName1=="Admin")){
  
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'You cant delete '+ self.state.roleName1,
              showConfirmButton: false,
              timer: 2000
            })
  
          }
         else if(( this.state.roleId!="") ){
           
        
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Do you Want to Delete '+ self.state.roleName1,
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
                  title:'Cancelled Deletion Of '+ self.state.roleName1,
                  showConfirmButton: false,
                  timer:2000,
                })
              }
            })
          }
        }

      }

      DownloadRoleList(){

      }

    render() {
   //   const  downloadButtonData=<span style={{width:"80px"}} class="glyphicon glyphicon-download-alt" ><span style={{fontFamily:"Roboto, sans-serif"}}>&nbsp;Download</span></span>
            
  // const  downloadButtonData=<i  style={{color:"black"}} class="glyphicon glyphicon-download-alt" ></i>
  const downloadButtonData = <Invoice_xlDownldBtn/>;    

        return(
            <div class="container">

             <div className="">
            <div className="">
              <BackButtonComponent name={"Dashboard"}click={()=>this.BackbtnFunc()} />
                  </div>
            <div className="inv_HeaderCls">
             <h3>Add Role</h3> 
            </div>
          </div>

                 
                  <div class="card-body">
                  <form class="form-horizontal form-bordered" >
                   <div className={`form-group ${this.errorClass(this.state.formErrors.roleName)}`}>
                <label class="control-label col-sm-2" for="roleName">Role Name<span style={{color:"red"}}>*</span></label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" value={this.state.roleName} onChange={this.handleUserInput} name="roleName" id="roleName" placeholder="Role Name"/>
                </div>
             
                </div>
              
              <div class="form-group"> 
              <div class="row"  style={{marginLeft:"3px"}}>
                <div class="col-sm-offset-2 col-sm-10">
                  <button style={{fontWeight:"bold"}} type="button"  disabled={!this.state.formValid}  onClick={() => this.AddRoleFunc()} class="btn btn-default">Submit</button> <span></span>
                  <button style={{fontWeight:"bold"}} type="button" onClick={() => this.cancelFunc()} class="btn btn-default">Clear</button>
                </div>
                </div>
              </div>
              </form></div>


  <div className="inv_HeaderCls">
              <h3 style={{marginTop:"0px",marginBottom:"0px"}}>Role List</h3>
            </div>

       <div className="reactIcon_Dcls">
<Delete_DownloadIcons onDelete={this.DeleteRole}
    onDownload={this.DownloadRoleList} />
     <ReactHTMLTableToExcel
       id="test-table-xls-button"
       className="download-table-xls-button "
       table="tableHeadings"
       filename="Role_List"
       sheet="tablexls"
      buttonText={downloadButtonData}   
       />
    </div>
   

        <div id="tableOverflow">
          <table style={{ margin: "auto",marginBottom:"5%" }} class="table table-bordered" id="tableHeadings">

          </table>
        </div>
       
        <ReactTable style={{overflow:"auto",marginBottom:"5%"}}
              data={this.state.data}
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
              // getTdProps={this.onRowClick}

              getTrProps={this.onTrRowClick}
            />

        <h2 id="nodata" style={{textAlign:"center"}}>No Data</h2>  
    
        </div>
                    );
    }

}
export default AddRole1;