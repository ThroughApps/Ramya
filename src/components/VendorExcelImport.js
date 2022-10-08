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
//import Gstdashboard1 from './Gstdashboard1';
import VendorExcelValidationMessage from './VendorExcelValidationMessage';
import _ from 'underscore';
import VendorEntryForm from './VendorEntryForm';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';

var result;
var oldVendorFileNames;
var name;
var errorMessageArray=[];
var totalpercent=0;

class VendorExcelImport extends Component {

 constructor() {
 super()

//
this.state = {

            data:[],
  //   companyId:companyId,
         percent: 0,
         color:'white',
    }

 }

componentDidMount() {

  SetCurrentPage("VendorExcelImport");
  
//$("#files").prop("disabled", true);
$("#submit").prop("disabled", true);
$("#progressbar1").hide();
$("#progressbar2").hide();


errorMessageArray=[];

this.GetVendorFileName();

  $(document).ready(function(){
    $('#files').change(handleFile);
  });


function handleFile(e) {
   

        var files = e.target.files;
        errorMessageArray=[];
        var i, f;
        for (i = 0, f = files[i]; i != files.length; ++i) {
            var reader = new FileReader();
            name = f.name;

            reader.onload = function (e) {
                var data = e.target.result;

  var binary = "";
    var bytes = new Uint8Array(e.target.result);
    var length = bytes.byteLength;
    for (var i = 0; i < length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
                /* if binary string, read with type 'binary' */
                
                var workbook = XLSX.read(binary, { type: 'binary' });

                /* DO SOMETHING WITH workbook HERE */
             //   workbook.SheetNames.forEach(function (sheetName) {
              var sheetName = workbook.SheetNames[0];

           //   var workbook = XLSX.readFile('./assets/yourfile.xlsx');// ./assets is where your relative path directory where excel file is, if your excuting js file and excel file in same directory just igore that part
              var sheet_name_list = workbook.SheetNames; // SheetNames is an ordered list of the sheets in the workbook
                var data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]); //if you have multiple sheets
            
                // read from a XLS file

// get first sheet
let first_sheet_name = workbook.SheetNames[0];
let worksheet = workbook.Sheets[first_sheet_name];

                var errorStatus=0;

              if (data.length > 0) {
                result = data;
               
              for(var key in data){
                var keyValue=key;
                 keyValue=Number(keyValue)+2; //row no

                 //CUSTOMER NAME VALIDATON
                          var vendorName=data[key]['VendorName'] ;
                          if(vendorName !=undefined){
                            
                           if(! vendorName.match(/^([a-zA-Z]+)([a-zA-Z ])*$/)){
                             
                            errorStatus++;
                            errorMessageArray.push("Check for Vendor Name Format( Only Alphabets ) At Row "+keyValue);
                     
                           }

                          }else{
                             // alert("STUDENT FIRST NAME IS EMPTY AT "+keyValue);
                              errorStatus++;
                              errorMessageArray.push("Vendor Name Empty At Row "+keyValue);
                          }

                //COMPANY NAME VALIDATION
                          var companyName=data[key]['CompanyName '] ;
                          if(companyName !=undefined){

                         
                             
                          }else{
                                        }

                
                //CONTACT NO VALIDATION
                          var contactNo=data[key]['ContactNo'];
                     
                        
                          if(contactNo !=undefined){
                          
                            var regExpConNo=/^\d{10}$/;
                          
                          
                          
                            if(! regExpConNo.test(contactNo)){
                              errorStatus++;
                              errorMessageArray.push("Check for Contact No Format At Row "+keyValue);
                       
}


                            
                            // if(! contactNo.match("[0-9]+") || contactNo.length != 10){
                             
                            //   errorStatus++;
                            //   errorMessageArray.push("Check for Contact No Format( Only Numbers ) & Digits At Row "+keyValue);
                       
                            //  }

                          }else{
                               //   alert("CONTACT NO IS EMPTY AT "+keyValue);
                                  errorStatus++;
                                  errorMessageArray.push("ContactNo Empty At Row "+keyValue);
                              }
              
              //ALTERNATE CONTACT NO VALIDATION
                             var alternateNo=data[key]['AlternateNo'];
                              if(alternateNo !=undefined){



                                var regExpAltNo=/^\d{10}$/;
                             
                                if(! regExpAltNo.test(alternateNo )){
                                  errorStatus++;
                                  errorMessageArray.push("Check for Alternate No Format At Row "+keyValue);
                           
}

                                // if(! alternateNo.match("[0-9]+") || alternateNo.length != 10){
                             
                                //   errorStatus++;
                                //   errorMessageArray.push("Check for Alternate Contact No Format( Only Numbers ) & Digits At Row "+keyValue);
                           
                                //  }

                              }else{
                                 // alert("ALTERNATE CONTACT NO IS EMPTY AT "+keyValue);
                                //  errorStatus++;
                              }

             //EMAIL ID VALIDATION           
                              var emailId=data[key]['EmailId'];
                              if(emailId !=undefined){
                                
                                var regExp=/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
                             
                                if(! regExp.test(emailId) ){
                                  errorStatus++;
                                  errorMessageArray.push("Check for Email Id Format At Row "+keyValue);
                           
}



                                // if(! emailId.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
                             
                                //   errorStatus++;
                                //   errorMessageArray.push("Check for Email Id Format At Row "+keyValue);
                           
                                //  }


                          }else{
                            //  alert("EMAIL ID IS EMPTY AT "+keyValue);
                           //   errorStatus++;
                           //   errorMessageArray.push("Email Id Empty At Row "+keyValue);
                          }
         
 
          //ADDRESS VALIDATION
                              var address=data[key]['Address'];
                              if(address !=undefined){

                          }else{
                             // alert("ADDRESS IS EMPTY AT "+keyValue);
                             // errorStatus++;
                              }

                                 //State VALIDATION
                                 var state=data[key]['State'];
                                 if(state !=undefined){
   
                             }else{
                                // alert("ADDRESS IS EMPTY AT "+keyValue);
                                // errorStatus++;
                                 }

                                      //GSTNo VALIDATION
                                      var gstNo=data[key]['GSTNo'];
                                      if(gstNo !=undefined){
        
                                  }else{
                                     // alert("ADDRESS IS EMPTY AT "+keyValue);
                                     // errorStatus++;
                                      }
   
                                        //GSTNo VALIDATION
                                        var description=data[key]['Description'];
                                        if(description !=undefined){
          
                                    }else{
                                       // alert("ADDRESS IS EMPTY AT "+keyValue);
                                       // errorStatus++;
                                        }

                        
            

            }

//alert("ERROR STATUS VALUE :"+errorStatus);
if( errorStatus==0){
  //PROCEED WITH UPLOAD ENABLE THE SUBMIT BUTTON
  $("#submit").prop("disabled", false);

}else{
  //SHOW THE ERROR VALIDATION PAGE

        ReactDOM.render(
          <Router>
            <div>
  
              <Route path="/" component={() => <VendorExcelValidationMessage errorData={errorMessageArray} />} />
  
            </div>
          </Router>,
          document.getElementById('contentRender'));


}


            }else{

            
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'An Empty File cannot be Uploaded',
              showConfirmButton: false,
              timer: 2000
            })

            }


             
            };
            reader.readAsArrayBuffer(f);
        }

    
       }
    
}
  
GetVendorFileName(){

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

$.ajax({
            type: 'POST',
              data:JSON.stringify({
                companyId:companyId,
            //    companyId:"001",
                }),
    
           // data:resultData,
        //   url:" http://localhost:8081/ERPDetails/Excel/GetFilename",
            url:" http://15.206.129.105:8080/ThroughBooksCOAPI/Excel/GetVendorFileName",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
        
          oldVendorFileNames=data.vendorFileName;
        
        /*  var filename=data.fileName.split(",");

          for(var i=0;i<filename.length;i++){
            oldFileNames.push(filename[i]);
          }
*/
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


Upload(){

//  $("#progressbar2").show();

 //this.increase();
var vendorFileArray = oldVendorFileNames.split(",");



var vendorFileNameStatus=_.contains(vendorFileArray, name);
var length=vendorFileArray.length;

if(vendorFileNameStatus==true){
                      
				   Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'File Upload will be Done Shortly',
            showConfirmButton: false,
            timer: 2000
          })

             
var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

var resultData=JSON.stringify(result);
this.state.result1=resultData.toString();

var self=this;

 $.ajax({

  
            type: 'POST',
              data:JSON.stringify({
                companyId:companyId,
              // companyId:"001",
                testlist:result}),
    
       url:" http://15.206.129.105:8080/ThroughBooksCOAPI/Excel/UploadVendorData",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
      

          if(data.returnXl.length != 0){
           ReactDOM.render(
          <Router>
            <div>
              
              <Route path="/" component={() => <VendorExcelImportResponse data={data} />} />


            </div>
          </Router>,
          document.getElementById('contentRender'));
        registerServiceWorker();
           }else{

           
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your File Has Been Uploaded Successfully',     
              showConfirmButton: false,
              timer: 2000
            })

            ReactDOM.render(
              <Router>
              <div>
              <Route path="/" component={VendorEntryForm} />
              </div>
              </Router>,
              document.getElementById('contentRender'));

        


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





}else{

          
  Swal.fire({
    position: 'center',
    icon: 'error',
    title:  "You Have Uploaded An Invalid File Please Upload A Valid File ", 
    showConfirmButton: false,
    timer: 2000
  })
}




}







restart() {
  clearTimeout(this.tm);
  this.setState({ percent: 0 }, () => {
  //  this.increase();
  });
}





 render() {

  const { percent,color } = this.state;
 return (

<div>
<div>
  <h3>Instructions For Successful File Upload</h3>
<p>1.Ensure Vendor Name contains only Alphabets</p>
<p>2.Ensure ContactNo, AlternateNo are only Numbers</p>
<p>3.Ensure Email Id is of correct Format</p>

</div>

<br/>
<br/>

<div >
<input type="file" id="files" name="files"/>
<br/>
     <button type="button" id="submit" onClick={() => this.Upload()} className="btn btn-primary" style={{ marginLeft: "20px", marginLeft: "auto", marginRight: "auto", marginBottom: "45px", marginTop: "20px", display: "block" }}>Submit</button>


</div>

<div id="progressbar2">

</div>

</div>

  );
 }
}

export default VendorExcelImport;