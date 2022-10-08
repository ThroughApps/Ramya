import datepicker from 'jquery-ui/ui/widgets/datepicker';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {BrowserRouter as Router,Route,NavLink} from 'react-router-dom';
import CryptoJS from 'crypto-js';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import * as IoIcons from 'react-icons/io5';
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";
import autoTable from 'jspdf-autotable'

let google = require('googleapis');
var privatekey = require("./BillingAppCredentials.json");
//D:\ReactJS\garageapp\src\components\BillingAppCredentials.json


export  const SaleInvoicePDF = async function (stateData) {

    return new Promise((resolve, reject) => {
        var response="Success";
    console.log("INVOICE PDF CALLED :",stateData);

    var doc = new jsPDF();

    doc.setFontSize(40);
    doc.text("Octonyan loves jsPDF", 35, 25);
    doc.addImage("examples/images/Octonyan.jpg", "JPEG", 15, 40, 180, 180);
  //  var pdf = btoa(doc.output()); 

//  const doc = new jsPDF()

// It can parse html:
// <table id="my-table"><!-- ... --></table>

//doc.autoTable({ html: '#my-table' })

// Or use javascript directly:
/*doc.autoTable({
  head: [['Name', 'Email', 'Country']],
  body: [
    ['David', 'david@example.com', 'Sweden'],
    ['Castille', 'castille@example.com', 'Spain'],
    // ...
  ],
})
*/

  var pdf = doc.output(); 


       var filename=stateData.companyId+"_"+stateData.customerId+"_"+stateData.orderNumber;
       let jwtClient = new google.auth.JWT(
           privatekey.client_email,
           null,
           privatekey.private_key,
           ['https://www.googleapis.com/auth/drive',
           ]);
       //authenticate request
       jwtClient.authorize(function (err, tokens) {
           if (err) {
               console.log("my err", err);
               return;
           } else {
               console.log("Successfully connected! :",tokens);
              

       var fileContent =pdf; // As a sample, upload a text file.
       var file = new Blob([fileContent], {type: 'application/pdf'});
       var metadata = {
           'name':filename, // Filename at Google Drive
           'mimeType': 'pdf', // mimeType at Google Drive
           'parents': ['1DUj9-agV9UHVcA45MNdD_jEsndU04R7h'], // Folder ID at Google Drive
       };
       
    //   var accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
   
    //   var accessToken= google.auth.getToken().access_token; 
       var accessToken=tokens.access_token;
      
    /*  var form = new FormData();
       form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
       form.append('file', file);
       
       var xhr = new XMLHttpRequest();
       xhr.open('post', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id');
       xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
       xhr.responseType = 'json';
       xhr.onload = () => {
           console.log("RESPONSE ID :",xhr.response.id); // Retrieve uploaded file ID.
       };
       xhr.send(form); 
       */

      // parents is an array containing folderId strings

      let drive = google.drive('v3');
     const media = {
       mimeType: 'application/pdf',
       body: fileContent
     };
     
     drive.files.create({
       auth: jwtClient,
       resource: metadata,
       media,
       fields: 'id'
     }, (err, file) => {
       if (err) {
         console.log(err);
         resolve("response");
         return;
       }
       // Log the id of the new file on Drive
       console.log('Uploaded File Id: ', file.id);
       response=file.id;
       resolve(response);
     });



           }

       })


            
   /*    var fileContent ="D:\ReactJS\garageapp\public\ExportCustomer.xlsx"; // As a sample, upload a text file.
       var file = new Blob([fileContent], {type: 'text/plain'});
       var metadata = {
           'name': 'sampleName', // Filename at Google Drive
           'mimeType': 'text/plain', // mimeType at Google Drive
           'parents': ['1DUj9-agV9UHVcA45MNdD_jEsndU04R7h'], // Folder ID at Google Drive
       };
       
       var accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
       var form = new FormData();
       form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
       form.append('file', file);
       
       var xhr = new XMLHttpRequest();
       xhr.open('post', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id');
       xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
       xhr.responseType = 'json';
       xhr.onload = () => {
           console.log(xhr.response.id); // Retrieve uploaded file ID.
       };
       xhr.send(form);
*/

//FOLDER ID :1DUj9-agV9UHVcA45MNdD_jEsndU04R7h


return response;
})

}



export  const DeleteSaleInvoicePDF =  function (fileName,fileId) {

    console.log("DELETE  PDF CALLED");
    return new Promise((resolve, reject) => {
 
        var response="success";

       var filename=fileName;
       let jwtClient = new google.auth.JWT(
           privatekey.client_email,
           null,
           privatekey.private_key,
           ['https://www.googleapis.com/auth/drive',
           ]);
       //authenticate request
       jwtClient.authorize(function (err, tokens) {
           if (err) {
               console.log("my err", err);
               return;
           } else {
               console.log("Successfully connected FOR DELETE! :",tokens);

        var metadata = {
           'name':filename, // Filename at Google Drive
           'mimeType': 'pdf', // mimeType at Google Drive
           'parents': ['1DUj9-agV9UHVcA45MNdD_jEsndU04R7h'], // Folder ID at Google Drive
       };

       var accessToken=tokens.access_token;
      
      let drive = google.drive('v3');
      
      console.log("DELETE FILE ID :",fileId);
      //DELETE https://www.googleapis.com/drive/v3/files/fileId
     drive.files.delete({
       auth: jwtClient,
       fileId: fileId,
     }, (err) => {
       if (err) {
         console.log(err);
         resolve("response");
         return;
       }
       // Log the id of the new file on Drive
       console.log('DELETED FILE: ');
       resolve("response");
     });



           }

       })


            
return response;
    });

//FOLDER ID :1DUj9-agV9UHVcA45MNdD_jEsndU04R7h



}