import React, { Component } from 'react';
import logo from './logo.svg';

import $ from 'jquery';
import * as XLSX from 'xlsx';
import { confirmAlert } from 'react-confirm-alert';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
    GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
import VendorExcelImportResponse from './VendorExcelImportResponse';
import registerServiceWorker from './registerServiceWorker';
import MobileDetect from 'mobile-detect/mobile-detect';
import CryptoJS from 'crypto-js';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import VendorExcelImport from './VendorExcelImport';
import ImportMenuPage from './ImportMenuPage';


var result;
var oldFileNames;
var name;

class VendorExcelValidationMessage extends Component {

 constructor(errorData) {
 super(errorData)

//
this.state = {

            data:[],
  //   companyId:companyId,
    }
 }

componentDidMount() {
    SetCurrentPage("VendorExcelValidationMessage");

 
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

             {/*   <Route path="/" component={VendorExcelImport} /> */}
             <Route path="/" component={ImportMenuPage} /> 

            </div>
        </Router>,
        document.getElementById('contentRender'));
    registerServiceWorker();
}
BackbtnFunc() {
    ReactDOM.render(
        <Router>
            <div>

                <Route path="/" component={ImportMenuPage} />


            </div>
        </Router>,
        document.getElementById('contentRender'));
    registerServiceWorker();
}

 render() {


 return (

<div >
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
                        <div class="card-header">
                        <h3>Validation Error Message</h3>
                  
                    </div>
            </div>
</div>

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

export default VendorExcelValidationMessage;