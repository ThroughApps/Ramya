import React, { Component } from 'react';
import $ from 'jquery';
import * as XLSX from 'xlsx';
import { confirmAlert } from 'react-confirm-alert';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import EmployeeExcelImportResponse from './EmployeeExcelImportResponse';
import registerServiceWorker from './registerServiceWorker';
import MobileDetect from 'mobile-detect/mobile-detect';
import CryptoJS from 'crypto-js';
import ImportMenuPage from './ImportMenuPage';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';

var result;
var oldFileNames;
var name;

class EmployeeExcelValidationMessage extends Component {

 constructor(errorData) {
 super(errorData)

//
this.state = {

            data:[],
  //   companyId:companyId,
    }
 }

componentDidMount() {
SetCurrentPage("EmployeeExcelValidation");

    var errorData=this.props.errorData;
    $("#validationmessagetable").empty();
    var tab= ' <thead><tr class="headcolor"><th class="headcolor">S.No</th><th>Errors</th></tr></thead>';
    var sno=0;
    for(var i=0;i<errorData.length;i++){
        sno++;
        
        tab += '<tbody id= "myTable" ><tr class="" style=" background-color: white;">'
        +'<td>' + sno +'</td>'
        +'<td>' + errorData[i] +'</td></tr></tbody>';
    
    }

    $("#validationmessagetable").append(tab);
 

    

}
  


OkFunc(){

    ReactDOM.render(
        <Router>
            <div>

             {/*   <Route path="/" component={EmployeeExcelImport} />  */}
             <Route path="/" component={ImportMenuPage} /> 


            </div>
        </Router>,
        document.getElementById('contentRender'));
    registerServiceWorker();
}


 render() {


 return (

<div >

<h3>Validation Error Message</h3>
    <br/>
    <p>kindly Rectify The Below Mentioned Errors For Successful File Upload</p>
  
    <div id="tableOverflow">
            <table style={{ margin: "auto" }} class="table table-bordered" id="validationmessagetable">

            </table>

            <button type="button" id="okbutton" onClick={() => this.OkFunc()} className="btn btn-primary" style={{ marginLeft: "20px", marginLeft: "auto", marginRight: "auto", marginBottom: "45px", marginTop: "20px", display: "block" }}>Ok</button>

          </div>

</div>



  );
 }
}

export default EmployeeExcelValidationMessage;
