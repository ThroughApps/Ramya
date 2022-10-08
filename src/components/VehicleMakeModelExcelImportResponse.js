import React, { Component } from 'react';
import logo from './logo.svg';

import $ from 'jquery';
import CryptoJS from 'crypto-js';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import VendorExcelImport from './VendorExcelImport';
import ImportMenuPage from './ImportMenuPage';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
    GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
class VehicleMakeModelExcelImportResponse extends Component {

 constructor(data) {
 super()

 var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

 this.state = {
 companyId:companyId,
 };
 }

  componentDidMount() {
    SetCurrentPage("VehicleMakeModelExcelImportResponse");
 
 var excelResponse = '<thead><tr class="headcolor">'
 +'<th>Vehicle Make</th>'+'<th>Fuel Type</th><th>Vehicle Model</th></tr></thead>';
    $("#excelResponse").append(excelResponse);
   
    $.each(this.props.data.returnXl, function (i, item) {
     // if(i>0){
     var excelResponsetab = '<tr class="success" ><td>' + item.vehicleMake + '</td><td>' + item.fuelType + '</td>'
     +'<td>'+item.vehicleModel+'</td></tr>';
   
    $("#excelResponse").append(excelResponsetab);
  //}
  });

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

      <div className="container">

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
                        <h3 className="centerAlign" style={{ textAlign: "center" }}>Exported Data Response</h3>
                    </div>
            </div>
</div>

         
    <p style={{color:"red"}}>**Kindly Download The Error Report Displayed For Your Future Reference
       using <b><q>Download Error Report</q> </b>Button</p>

<p>These Data Already Exist in the System</p>
      <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="excelResponse "
                    filename="Error_Report"
                    sheet="tablexls"
                    buttonText="Download Error Report" />


       <div id="tableOverflow">
          <table class="table" id="excelResponse">

          </table>

<button type="button" id="okbutton" onClick={() => this.OkFunc()} className="btn btn-primary" style={{ marginLeft: "20px", marginLeft: "auto", marginRight: "auto", marginBottom: "45px", marginTop: "20px", display: "block" }}>Ok</button>

      </div>
               </div>
    );
  }

}

export default VehicleMakeModelExcelImportResponse;