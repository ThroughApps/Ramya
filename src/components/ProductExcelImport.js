import React, { Component } from 'react';
import logo from './logo.svg';
import $ from 'jquery';
import * as XLSX from 'xlsx';
import { confirmAlert } from 'react-confirm-alert';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import ExcelImportResponse from './ProductExcelImportResponse';
import registerServiceWorker from './registerServiceWorker';
import MobileDetect from 'mobile-detect/mobile-detect';
import CryptoJS from 'crypto-js';
import ProductExcelValidationMessage from './ProductExcelValidationMessage';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import _ from 'underscore';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
  GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
var result;
var oldFileNames;
var name;
var errorMessageArray=[];
var totalpercent=0;

var productNameArray=[];
var quantityArray=[];
var quantityLimitArray=[];
var cgstArray=[];
var sgstArray=[];
var igstArray=[];
var SaleRateArray=[];
var PurchaseRateArray=[];


class ProductExcelImport extends Component {

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
  SetCurrentPage("ProductExcelImport");
  
//$("#files").prop("disabled", true);
$("#submit").prop("disabled", true);
$("#progressbar1").hide();
$("#progressbar2").hide();

//this.increase();

errorMessageArray=[];

this.GetFileName();

// var detector = new MobileDetect(window.navigator.userAgent)
          
// //alert("DEVICE DETAILS"+detector.mobile()+"----"+detector.phone()+"----"+detector.tablet()+"----"+detector.os()+"----"+detector.userAgent());

// var mobile=detector.mobile();
// var phone=detector.phone();
// var tablet=detector.tablet();
// var newos=navigator.platform;
// var OSName="null";

// if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";



// if( tablet==null && OSName=="Windows"){

// $("#files").prop("disabled", false);
// //alert("success");

// }else{

// var data;

//   if(mobile!==null){
//   data="Mobile";
// }
// if(tablet!==null){
// data="Tablet";
// }

// if(OSName=="null"){
//   data="Your OS ";
// }

//   confirmAlert({
//             title: 'File Cannot Be Uploaded',                        // Title dialog
//             message: "Uploading File From "+data+" Is Forbidden",               // Message dialog
//             confirmLabel: 'Ok',                           // Text button confirm


//           });

//      ReactDOM.render(
//           <Router>
//             <div>
              
//               <Route path="/" component={() => <DashboardOverall />} />


//             </div>
//           </Router>,
//           document.getElementById('contentRender'));
//         registerServiceWorker();
// }
  
 /* set up drag-and-drop event */
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

                productNameArray=[];
                quantityArray=[];
                quantityLimitArray=[];
                cgstArray=[];
                sgstArray=[];
                igstArray=[];
                SaleRateArray=[];
                PurchaseRateArray=[];

              if (data.length > 0) {
                result = data;
               
              for(var key in data){
                var keyValue=key;
                 keyValue=Number(keyValue)+2; //row no

                 //PRODUCT NAME VALIDATON
                          var productName=data[key]['ProductName'] ;
                    
                          if(productName ==undefined){
                                                        
                              errorStatus++;
                              errorMessageArray.push("product Name Empty At Row "+keyValue);
                          }else{

                            if(productNameArray.length==0){
                            productNameArray.push(productName);
                            }else{
                              var containsValue=_.contains(productNameArray,productName);
                        
                              if(containsValue==true){
                                errorStatus++;
                                 errorMessageArray.push("Duplicate Product Name  At Row "+keyValue);
                              }else{
                                productNameArray.push(productName);
                              }
                            }

                          }

                //PRODUCT TYPE VALIDATION
                          var productType=data[key]['ProductType'] ;
                          if(productType ==undefined){
                           
                              errorStatus++;
                              errorMessageArray.push("Product Type Empty At Row "+keyValue);
                          }

                //PRODUCT CATEGORY VALIDATION
                           var productCategory=data[key]['ProductCategory'] ;
                           if(productCategory ==undefined){
                            
                               errorStatus++;
                               errorMessageArray.push("Product Category Empty At Row "+keyValue);
                           }

                             //QUANTITY VALIDATION 
                            var Product="Product";
                             var quantity=data[key]['Quantity'] ;
                         

                             if(quantity !=undefined ){
                                //validation for numbers
                                var regExp=/^[0-9]*$/;

                                if(regExp.test(quantity)){
                                  //true for 23,0023,2300
                                  //false for 23.26,+23,-23, NUMBER + ALPHANUMERIC
                                  var regExpLeadingZero = /^0[0-9].*$/;
                                  if(regExpLeadingZero.test(quantity)){
                                    errorStatus++;
                                    errorMessageArray.push("Quantity Has Leading Zero At "+keyValue);
                                  }
                                }else{
                                  errorStatus++;
                                  errorMessageArray.push("Quantity Is Not A Number At "+keyValue);
                                }
                            
                               
                              
                            }else{
                              
                                 errorStatus++;
                                 errorMessageArray.push("Quantity Empty At Row "+keyValue);
                             }




                              //QUANTITY LIMIT VALIDATION
                              var quantityLimit=data[key]['QuantityLimit'] ;
                            
                              if(quantityLimit !=undefined ){
                                //validation for numbers

                                var regExp=/^[0-9]*$/;
                          
                                if(regExp.test(quantityLimit)){
                                  //true for 23,0023,2300
                                  //false for 23.00,+23,-23, NUMBER + ALPHANUMERIC
                                  var regExpLeadingZero = /^0[0-9].*$/;

                                  if(regExpLeadingZero.test(quantityLimit)){
                                    errorStatus++;
                                    errorMessageArray.push("Quantity Limit Has Leading Zero At "+keyValue);
                                  }else{

                                    if(productType=="Service" )
                                    {  
                                    //  $("#quantity1").hide();
                                    //  $("#quantityLimit1").hide();
                                      quantityArray.push(0);
                                      quantityLimitArray.push(0);
                                    }
                                   else if(productType=="Product" && productCategory=="Purchase")
                                   {
                                  //  $("#quantityLimit1").show();
                                        quantityArray.push(0);
                                       quantityLimitArray.push(quantityLimit);
                                   }
                                   else if(productType=="Product" && productCategory=="Own")
                                    {
                                     
                                    //  $("#quantity1").show();
                                    //  $("#quantityLimit1").show();
                                      quantityArray.push(quantity);
                                      quantityLimitArray.push(quantityLimit);
                                    }

                                  }
                                }else{
                                  errorStatus++;
                                  errorMessageArray.push("Quantity Limit Is Not A Number At "+keyValue);
                                }

                               
                              }else{
                               
                                  errorStatus++;
                                  errorMessageArray.push("Quantity Limit Empty At Row "+keyValue);
                              }
                              

                              
                              //cgst VALIDATION
                              var cgst=data[key]['cgst'] ;
                              if(cgst !=undefined){
                                  //validation for numbers

                                  var regExp=/^[0-9]*$/;
                              
                                if(regExp.test(cgst) ){
                                  //true for 23,0023,2300
                                  //false for 23.00,+23,-23, NUMBER + ALPHANUMERIC
                                  var regExpLeadingZero = /^0[0-9].*$/;
                                  if(regExpLeadingZero.test(cgst)){
                                    errorStatus++;
                                    errorMessageArray.push("cgst Has Leading Zero At "+keyValue);
                                  }else{
                                    cgstArray.push(cgst);
                                  }
                                }else{
                                  errorStatus++;
                                  errorMessageArray.push("cgst Is Not A Number At "+keyValue);
                                }

                                  /*
                                  var numberData=Number.isInteger(cgst)
                                  if(numberData==false){
                                    errorStatus++;
                                    errorMessageArray.push("cgst Is Not Number At "+keyValue);
                                
                                  }else{
  
                                    var sign_data = Math.sign(cgst);
                                    if (sign_data == -1) {
                                      errorMessageArray.push("cgst Is Negative  Number At "+keyValue);
                                    }else{
                                      var regExp = /^0[0-9].*$/; //for checking leading zero's
                                      var reg = /d\+1/; //for checking leading + sign
                                      if(regExp.test(cgst)){
                                        errorMessageArray.push("cgst Has Leading Zero At "+keyValue);
                                      } 
                                      if(reg.test(cgst)){
                                        errorMessageArray.push("cgst Has Leading + Sign At "+keyValue);
                                      } 
                                     
                                    }
                                   
  
                                  }
                                  */
                              }else{
                               
                                 /* errorStatus++;
                                  errorMessageArray.push("cgst Empty At Row "+keyValue);
                                  */
                                 cgstArray.push(0);
                              }
                              

                            //SGST VALIDATION
                            var sgst=data[key]['SGST'] ;
                              if(sgst !=undefined){
                                 //validation for numbers
                                 var regExp=/^[0-9]*$/;
                                

                                 if(regExp.test(sgst)){
                                   //true for 23,0023,2300
                                   //false for 23.00,+23,-23, NUMBER + ALPHANUMERIC
                                   var regExpLeadingZero = /^0[0-9].*$/;
                                   if(regExpLeadingZero.test(sgst)){
                                     errorStatus++;
                                     errorMessageArray.push("SGST Has Leading Zero At "+keyValue);
                                   }else{
                                     sgstArray.push(sgst);
                                   }
                                 }else{
                                   errorStatus++;
                                   errorMessageArray.push("SGST Is Not A Number At "+keyValue);
                                 }

                                /*
                                 var numberData=Number.isInteger(sgst)
                                 if(numberData==false){
                                   errorStatus++;
                                   errorMessageArray.push("SGST Is Not Number At "+keyValue);
                               
                                 }else{
 
                                   var sign_data = Math.sign(sgst);
                                   if (sign_data == -1) {
                                     errorMessageArray.push("SGST Is Negative  Number At "+keyValue);
                                   }else{
                                     var regExp = /^0[0-9].*$/; //for checking leading zero's
                                     var reg = /d\+1/; //for checking leading + sign
                                     if(regExp.test(sgst)){
                                       errorMessageArray.push("SGST Has Leading Zero At "+keyValue);
                                     } 
                                     if(reg.test(sgst)){
                                       errorMessageArray.push("SGST Has Leading + Sign At "+keyValue);
                                     } 
                                    
                                   }
                                  
 
                                 }
                                 */
                             }else{
                                   
                                /* errorStatus++;
                                errorMessageArray.push("SGST Empty At Row "+keyValue);
                                */
                               sgstArray.push(0);
                              }
                            
                          //IGST VALIDATION
                          var igst=data[key]['IGST'] ;
                          if(igst !=undefined){
                             //validation for numbers
                             var regExp=/^[0-9]*$/;
                            
                             if(regExp.test(igst)){
                               //true for 23,0023,2300
                               //false for 23.00,+23,-23, NUMBER + ALPHANUMERIC
                               var regExpLeadingZero = /^0[0-9].*$/;
                               if(regExpLeadingZero.test(igst)){
                                 errorStatus++;
                                 errorMessageArray.push("IGST Has Leading Zero At "+keyValue);
                               }else{
                                igstArray.push(igst);
                               }
                             }else{
                               errorStatus++;
                               errorMessageArray.push("IGST Is Not A Number At "+keyValue);
                             }

                            /*
                             var numberData=Number.isInteger(igst)
                             if(numberData==false){
                               errorStatus++;
                               errorMessageArray.push("IGST Is Not Number At "+keyValue);
                           
                             }else{

                               var sign_data = Math.sign(igst);
                               if (sign_data == -1) {
                                 errorMessageArray.push("IGST Is Negative  Number At "+keyValue);
                               }else{
                                 var regExp = /^0[0-9].*$/; //for checking leading zero's
                                 var reg = /d\+1/; //for checking leading + sign
                                 if(regExp.test(igst)){
                                   errorMessageArray.push("IGST Has Leading Zero At "+keyValue);
                                 } 
                                 if(reg.test(igst)){
                                   errorMessageArray.push("IGST Has Leading + Sign At "+keyValue);
                                 } 
                                
                               }
                              

                             }
                             */
                          }else{
                                
                             /* errorStatus++;
                              errorMessageArray.push("IGST Empty At Row "+keyValue);
                              */
                             igstArray.push(0);
                            }


                            //SALES RATE VALIDATION
                            var saleRate=data[key]['SaleRate(/Unit)'] ;
                            if(saleRate !=undefined){
                                  //validation for numbers
                                /*  var saleRate1=saleRate.replace(/^0+/, '');

                                  if( saleRate1.match(/^\d+(\.\d{1,2})$/)){
                                  alert("WITH DECIMAL :"+saleRate1);
                                  SaleRateArray.push(saleRate1);
                                  }else if(saleRate1.match(/^\d+$/)){
                                  //add decimal value by yourself
                                  var decimalSaleRate=Number(saleRate1).toFixed(2);
                                  alert("WITHOUT DECIMAL :"+decimalSaleRate);
                                  SaleRateArray.push(decimalSaleRate);
                                  }else{
                                  errorStatus++;
                                  errorMessageArray.push("Check for Salary At Row "+keyValue);
                                  }
*/

                                  var regExpDecimal=/^\d+(\.\d{1,2})$/;

                        var decimal_data = (saleRate - Math.floor(saleRate)) !== 0;
                          var numberData=Number.isInteger(saleRate)
                          var regExp=/^[0-9]*$/;
                          
                          if(decimal_data==true){
                            
                            if(saleRate < 0 || isNaN(saleRate)){
                              errorStatus++;
                              errorMessageArray.push("Sale Rate Is Not A Number"+keyValue);
                         
                            }else{
                              saleRate=Number(saleRate).toFixed(2);
                              SaleRateArray.push(saleRate);
                            }
                          }else if(regExp.test(saleRate)){
                            //true for 23,0023,2300
                            //false for 23.00,-23, NUMBER + ALPHANUMERIC
                            var regExpLeadingZero = /^0[0-9].*$/;
                            if(regExpLeadingZero.test(saleRate)){
                              errorStatus++;
                              errorMessageArray.push("Sale Rate Has Leading Zero At "+keyValue);
                            }else{
                              SaleRateArray.push(saleRate);
                            }



                            /*
                            var sign_data = Math.sign(saleRate);
                            if (sign_data == -1) {
                              errorMessageArray.push("Sale Rate Is Negative  Number At "+keyValue);
                            }else{
                              var regExp = /^0[0-9].*$/; //for checking leading zero's
                              var reg = /d\+1/; //for checking leading + sign
                              if(regExp.test(saleRate)){
                                errorMessageArray.push("Sale Rate Has Leading Zero At "+keyValue);
                              } 
                              if(reg.test(saleRate)){
                                errorMessageArray.push("Sale Rate Has Leading + Sign At "+keyValue);
                              } 
                            
                            }
                            */
                          }else{
                              
                            errorStatus++;
                            errorMessageArray.push("Sale Rate Is Not Number At "+keyValue);
                          }





                          

                          /*
                          var isNumberDt = $.isNumeric(quantity);
                          if (isNumberDt !== false) {
                          var sign_data = Math.sign(quantity);
                          if (sign_data != -1) {


                          var decimal_data = (value1 - Math.floor(value1)) !== 0;
                          //   alert("DECIMAL DATA :"+decimal_data);
                          if (decimal_data == true) {
                            errorStatus++;
                            errorMessageArray.push("Quantity Is Decimal Value At "+keyValue);
                          }else{
                            quantity=quantity.replace(/^0+/, '');
                            quantity=quantity.toString();  //remove leading zero
                          // quantity=Number(quantity).toFixed(2);
                          // quantity=quantity.replace(/[^0-9.]/g, "");

                          }

                            

                          } else {
                            //NOT A -ve Number

                          }
                          } else {
                          //NOT A NUMBER

                          }
                          */
                            }else{
                                  
                                errorStatus++;
                                errorMessageArray.push("Sale Rate Empty At Row "+keyValue);
                              }


                            //PURCHASE RATE VALIDATION
                            var purchaseRate=data[key]['PurchaseRate(/Unit)'] ;
                            if(purchaseRate !=undefined){
                               //validation for numbers
                   

                               var decimal_data = (purchaseRate - Math.floor(purchaseRate)) !== 0;
                               var numberData=Number.isInteger(purchaseRate)
                               var regExp=/^[0-9]*$/;
                               
                               if(decimal_data ==true){

                                if(purchaseRate < 0 || isNaN(purchaseRate)){
                                  errorStatus++;
                                  errorMessageArray.push("Purchase Rate Is Not A Number"+keyValue);
                             
                                }else{
                                  purchaseRate=Number(purchaseRate).toFixed(2);
                                  PurchaseRateArray.push(purchaseRate);
                                }
                             
                                
                               }else if(regExp.test(purchaseRate)){
                                 //true for 23,0023,2300
                                 //false for 23.00,-23, NUMBER + ALPHANUMERIC
                                 var regExpLeadingZero = /^0[0-9].*$/;
                                 if(regExpLeadingZero.test(purchaseRate)){
                                   errorStatus++;
                                   errorMessageArray.push("Purchase Rate Has Leading Zero At "+keyValue);
                                 }else{
                                  PurchaseRateArray.push(purchaseRate);
                                 }
     
                               }else{
                                   
                                 errorStatus++;
                                 errorMessageArray.push("Purchase Rate Is Not Number At "+keyValue);
                               }
                            }else{
                                  
                                errorStatus++;
                                errorMessageArray.push("Purchase Rate Empty At Row "+keyValue);
                              }

                                 //HSNCODE VALIDATION
                            var HSNCode=data[key]['HSNCode'] ;
                            if(HSNCode !=undefined){
  
                                    
                            }else{
                                  
                             //   errorStatus++;
                              //  errorMessageArray.push("Quantity Limit Empty At Row "+keyValue);
                              }


                               //Description VALIDATION
                            var description=data[key]['Description'] ;
                            if(description !=undefined){
  
                                    
                            }else{
                                  
                             //   errorStatus++;
                              //  errorMessageArray.push("Quantity Limit Empty At Row "+keyValue);
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
  
              <Route path="/" component={() => <ProductExcelValidationMessage errorData={errorMessageArray} />} />
  
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
  
GetFileName(){

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

$.ajax({
            type: 'POST',
              data:JSON.stringify({
                companyId:companyId,
            //    companyId:"001",
                }),
    
           // data:resultData,
     
            url:" http://15.206.129.105:8080/ThroughBooksCOAPI/Excel/GetProductFilename",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
   
          oldFileNames=data.productFileName;
          

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
var fileArray = oldFileNames.split(",");



var fileNameStatus=_.contains(fileArray, name);
var length=fileArray.length;

if(fileNameStatus==true){
  
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
                testlist:result,
                quantity:quantityArray.toString(),
                quantityLimit:quantityLimitArray.toString(),
                cgst:cgstArray.toString(),
                sgst:sgstArray.toString(),
                igst:igstArray.toString(),
                saleRate:SaleRateArray.toString(),
                purchaseRate:PurchaseRateArray.toString(),
              }),
    
            url:" http://15.206.129.105:8080/ThroughBooksCOAPI/Excel/UploadProductData",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
      
         // self.increaseBar("100");


          if(data.returnXl.length != 0){
        
            ReactDOM.render(
          <Router>
            <div>
              
              <Route path="/" component={() => <ExcelImportResponse data={data} />} />


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
              <Route path="/" component={DashboardOverall} />
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
            title: "You Have Uploaded An Invalid File Please Upload A Valid File ",  
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
<p>1.Ensure ProductName,ProductType,Productategory,Quantity,QuantityLimit,cgst,SGST,IGST Are Filled For Sure</p>
<p>2.Ensure Quantity,QuantityLimit,cgst,SGST,IGST are only Numbers</p>
<p>3.Ensure SaleRate,PurchaseRate are Numbers or With 2 Decimals Places</p>
</div>

<br/>
<br/>

<div >
<input type="file" id="files" name="files"/>
<br/>
     <button type="button" id="submit" onClick={() => this.Upload()} className="btn btn-primary" style={{ marginLeft: "20px", marginLeft: "auto", marginRight: "auto", marginBottom: "45px", marginTop: "20px", display: "block" }}>Submit</button>


</div>



</div>

  );
 }
}

export default ProductExcelImport;