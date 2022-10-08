
import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


import BankReportEdit from './BankReportEdit';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import FooterText from './FooterText';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import './DownloadButton.css';
import "./MainPageRedirectButton.css";
import AddBank from './AddBank';
import { SiteDropDown, FilterOptions, EmpFilterOptions } from './SiteDropDown';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
import {BankIcons, Invoice_xlDownldBtn} from  './ServiceRegistration/IconComponents';
import ReactTooltip from 'react-tooltip';
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';



var currentRow;
class BankReport extends Component {
  constructor(data) {
    super(data)

    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
 var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
 var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state = {
      bankId:'',
      month:'',
      staffId:staffId,
      employeeName:employeeName,
     role:role,  
      data:[],
      columns:[],
      
    };

    this.EditBank=this.EditBank.bind(this);
    this.DeleteBank=this.DeleteBank.bind(this);
    this.DownLoadBank=this.DownLoadBank.bind(this);

  }
  componentDidMount() {
    SetCurrentPage("BankReport");
    var self=this;
    $("#nodata").hide();
    $("#tableHeadings").hide();
    window.scrollTo(0, 0);
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
        companyId: companyId,
    });
    $("ReactHTMLTableToExcel").css("background-color","#05a4b5");
    $(".btn-default").css("background-color","#05a4b5");
    $(".btn-default").css("color","white");
    $("ReactHTMLTableToExcel").css("color","white");
 
    var self=this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId:this.state.companyId,
   
        
      }),
     url: " http://15.206.129.105:8080/ThroughBooksCOAPI/staff/bankreport",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {
        var no;
        if(data.bankRetrieveList.length!=0){
    var tab = '<thead><tr class="headcolor"><th>S.No</th><th>BankName</th>'
    +'<th>Acc.Name</th><th>Acc.No</th><th>Branch</th><th>IFSC Code</th>'
    +'</tr></thead>';
    
    
    $.each(data.bankRetrieveList, function (i, item) {
        no = parseInt(i) + 1;
      tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' +no  + '</td><td>' + item.bankName + '</td>'
      +'<td>' + item.accountName + '</td><td>' + item.accountNo + '</td><td>' + item.branchName + '</td>'
      +'<td>' + item.ifscCode + '</td>'
    
        self.state.data[i] = {
          "SNo":no,
          "Bank Name":  item.bankName,
          "Accountant Name": item.accountName,
          "Account No": item.accountNo ,
          "Branch": item.branchName ,
          "IFSC Code":item.ifscCode,
          "BankId":item.bankId ,
       
      

          
      };
  
  
  
  
    });

    self.state.columns = self.getColumns();

    $("#tableHeadings").append(tab);
    $(".bankId").hide();
  }else{
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
       key != "BankId" 
    
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



  NoAction() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={BankReport} />
        </div>
      </Router>,
      document.getElementById('contentRender'));

  }
    DeleteFunc(rowIndexValue)
    {

    
  var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
  this.state.companyId = companyId;
  this.setState({
      companyId: companyId,
  });
  var self=this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                accountNo:self.state.accountNo,            
                companyId:this.state.companyId,
                staffId: self.state.staffId,
                   employeeName: self.state.employeeName,
                   role: self.state.role,
            }),
           url: " http://15.206.129.105:8080/ThroughBooksCOAPI/staff/deleteBank",
            contentType: "application/json",
            dataType: 'json',
            async: false,
      
            success: function (data, textStatus, jqXHR) {
    
              var array = [...self.state.data]; // make a new copy of array instead of mutating the same array directly.
              array.splice(rowIndexValue, 1);
            
              self.state.data=[];
              self.state.data=array;
              self.setState({data: array});
    
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
              
    
    
           
              self.state.bankName = rowInfo.original["Bank Name"];
              self.state.accountName = rowInfo.original["Accountant Name"]; // get current row 1st TD value
              self.state.accountNo = rowInfo.original["Account No"];
              self.state.branchName =rowInfo.original["Branch"];
              self.state.ifscCode = rowInfo.original["IFSC Code"];
              self.state.bankId = rowInfo.original["BankId"];// get current row 1st TD value
           
        
              self.setState({
                bankName: self.state.bankName,
                accountName: self.state.accountName,
                accountNo: self.state.accountNo,
                branchName: self.state.branchName,
                ifscCode: self.state.ifscCode,
                bankId: self.state.bankId,
            
        
        
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
    


    /* ****** NEW ICON FUNCTION ************ */

AddBank(){
  ReactDOM.render(
    <Router>
      <div>
      
        <Route path="/" component={AddBank} />
      

      </div>
    </Router>,
    document.getElementById('contentRender'));
  registerServiceWorker();
}

EditBank(){
  var self=this;
      if( this.state.bankId===undefined){
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Kindly, Select Bank ',
         
        })
      }else{
    
        
              ReactDOM.render(<BankReportEdit bankName={self.state.bankName}
                accountName={self.state.accountName} accountNo={self.state.accountNo} branchName={self.state.branchName} ifscCode={self.state.ifscCode} bankId={self.state.bankId} 
                  />, document.getElementById("contentRender"));
        

            }
}

DeleteBank(){
  var self=this;
    
  if( this.state.bankId===undefined){
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Kindly, Select Bank ',
     
    })
  }else{
    if(this.state.id!="" ){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Do you Want to Delete '+self.state.bankName,
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
            title:'Cancelled Deletion Of '+self.state.bankName,
            showConfirmButton: false,
            timer:2000,
          })
        }
      })
    }
  }
}

DownLoadBank(){

}


    

  render() {
  //  const downloadButtonData = <i style={{ color: "black" }} class="glyphicon glyphicon-download-alt" ></i>
  const downloadButtonData = <Invoice_xlDownldBtn/>;      
       
  
    return (
        
      <div class="container">
        
        <div className="">
            <div className="">
              <BackButtonComponent name={"Dashboard"}click={()=>this.BackbtnFunc()} />
                  </div>
            <div className="inv_HeaderCls">
              <h3>Bank List</h3>
            </div>
          </div>

  <div className="inv_list_cls">

<div className="inv_list_cls_sel_search">
{/* <SiteDropDown onSiteDropDown={this.handleSite} data={this.state.site} /> */}
</div>

</div>


<div className="reactIcon_Dcls">
<BankIcons  onAddBank={this.AddBank} onEditBank={this.EditBank} 
    onDeleteBank={this.DeleteBank} onDownloadBank={this.DownLoadBank} />
    <ReactHTMLTableToExcel
                          id="test-table-xls-button"
                          className="download-table-xls-button "
                          table="tableHeadings"
                          filename="Bank_List"
                          sheet="tablexls"
                          buttonText={downloadButtonData}
                        />
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
              getTrProps={this.onTrRowClick}
            />
              
              <div id="tableOverflow">
          <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">

          </table>
        </div>
 
        <h2 id="nodata" style={{textAlign:"center"}}>No Data</h2>
      
      </div>

     
    );
  }

}

export default BankReport;