import React, { Component } from "react";
import CryptoJS from "crypto-js";
import currencyFormatter from "currency-formatter";



export const CheckNumberFormat = function(charCode,number) {

    var validationData=true;

    /*
    var numberFormatValidation=/^\d+(\.\d{0,2})?$/;
    var specialCharValidation="!@#$%^&*()+=-[]\\\';,./{}|\":<>?";

    if(number!=""){
        if(number.match(numberFormatValidation) && !number.match(specialCharValidation)  ){
            validationData=true;
        }
    }else{
        validationData=true;
    }
    */

        if(number!=""){
           // alert("NOT EMPTY");
        
                    if (charCode > 31 && (charCode < 48 || charCode > 57) && !(charCode == 46 || charCode == 8)){
                      //  alert("INSIDE CHARCODE IF");
                        validationData= false;
                    }else {
                        var len = number.length;
                        var index = number.indexOf('.');
                        
                        /*if (index > 0 && charCode == 46) {
                          //  alert("INDEX CHARCODE IF");
                            validationData= false;
                        }
                        */
                        if (index > 0) {
                        var CharAfterdot = (len) - index;
                        if (CharAfterdot > 3) {
                            validationData= "ExtraDecimal";
                        }
                        }

                    }

        }else{
            
            if( charCode == 8  || charCode == 45){
             //   alert("NUMBER EMPTY :"+false);
                validationData=false;
            }else{
               // alert("NUMBER EMPTY :"+true);
                validationData=true;
            }
            
        }
    return validationData;
}


export const CheckNumberFormat_WithoutDecimal = function(charCode,number) {

    var validationData=false;
    
    /*
    var numberFormatValidation=/^[0-9]+$/;
    var specialCharValidation="!@#$%^&*()+=-[]\\\';,./{}|\":<>?";

    console.log("number.match(specialCharValidation) :",number.match(specialCharValidation));
    console.log("!number.match(specialCharValidation) :",!number.match(specialCharValidation));

    if(number!=""){
        if(number.match(numberFormatValidation)  && !number.match(specialCharValidation) ){
            validationData=true;
        }
    }else{
        validationData=true;
    }
    */

        if(number!=""){
           // alert("NOT EMPTY");
        
           if(!( ((charCode >= 65) && (charCode<= 90)) || 
           ((charCode >= 97) && (charCode <= 122)) || ((charCode >= 48) && (charCode <= 57)) )){
          //  alert("inside if");
            validationData=false;
           }else{
            validationData=true;
           }
                   

        }else{
            
           
            if(charCode == 46 || charCode == 8  || charCode == 45){
              //   alert("NUMBER EMPTY :"+false);
                 validationData=false;
             }else{
               //  alert("NUMBER EMPTY :"+true);
                 validationData=true;
             }
             
            
            
        }
        
    return validationData;
}

export const Truncate_2DecimalPlaces = function(number) {

var truncatedNumber=(parseInt( number * 100 ) / 100 ).toFixed(2) ;
return truncatedNumber;
}