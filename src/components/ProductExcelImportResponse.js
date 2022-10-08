import React, { Component } from 'react';
import logo from './logo.svg';
import $ from 'jquery';
import CryptoJS from 'crypto-js';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ImportMenuPage from './ImportMenuPage';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
  GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
class ProductExcelImportResponse extends Component {

 constructor(data) {
 super()

 var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

 this.state = {
 companyId:companyId,
 };
 }

  componentDidMount() {
    SetCurrentPage("ProductExcelImportResponse");
 var excelResponse = '<thead><tr class="headcolor"><th>Product Name</th><th>Status</th></tr></thead>';
    $("#excelResponse").append(excelResponse);
   
    $.each(this.props.data.returnXl, function (i, item) {
     // if(i>0){
     var excelResponsetab = '<tr class="success" ><td>' + item.productName + '</td><td>Already Exist</td></tr>';
   
    $("#excelResponse").append(excelResponsetab);
  //}
  });

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


            <h3 className="centerAlign" style={{ textAlign: "center" }}>Exported Data Response</h3>
    <p style={{color:"red"}}>**Kindly Download The Error Report Displayed For Your Future Reference
       using <b><q>Download Error Report</q> </b>Button</p>

  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="excelResponse"
                    filename="ProductTable"
                    sheet="tablexls"
                    buttonText="Download as XLS"/>

       <div id="tableOverflow">
          <table class="table" id="excelResponse">

          </table>
          <button type="button" id="okbutton" onClick={() => this.OkFunc()} className="btn btn-primary" style={{ marginLeft: "20px", marginLeft: "auto", marginRight: "auto", marginBottom: "45px", marginTop: "20px", display: "block" }}>Ok</button>


      </div>
               </div>
    );
  }

}

export default ProductExcelImportResponse;