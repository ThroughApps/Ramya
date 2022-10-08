
import React, { Component } from 'react';
import logo from './logo.svg';

import $ from 'jquery';
import CryptoJS from 'crypto-js';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import { confirmAlert } from 'react-confirm-alert'; // Import
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
class ImportLogo extends Component {

  constructor() {
    super()

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state = {
      companyId: companyId,
      file: "",
    };
  }
  handleFile(e) {
    let file = e.target.files[0];
    this.setState({
      file: file
    });
  }
  handleUpload() {
    var self = this;
    console.warn("state value", this.state);
    let file =this.state.companyId + this.state.file.name;
    // data = new FormData();
    // data.append('file', this.state.csvFile);
    this.setState({
      file:self.state.file,
    })
    console.warn("file", file);
 

    $.ajax({
      type: "POST",
      data: JSON.stringify({
        fileName: file,
        companyId:this.state.companyId,
   
      }),
      contentType: "application/json",
      dataType: "json",

      processData: false,
      method: "POST",

       url: " http://15.206.129.105:8080/ThroughBooksCOAPI/Login/fileUpload",
   

      success: function(data, textStatus, jqXHR) {
       

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: "Logo Uploaded Successfully!!",  
            showConfirmButton: false,
            timer: 2000
          })

          self.FileUpload();
         
          self.state.file = "";
         
       //   self.state.formValid = false;
          // self.state.categoryNameValid=false;

          self.setState({           
            file: "",           
          });
          $("#file").val("");


          ReactDOM.render(
            <Router>
              <div>
                <Route path="/" component={DashboardOverall} />
              </div>
            </Router>,
            document.getElementById('contentRender'));
          registerServiceWorker();
        
      },
      error: function(data) {
     //  self.FileUpload();
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

  FileUpload() {
   

//       var _URL = window.URL || window.webkitURL;
     
//       $('#file-upload').change(function () {
//        var file = $(this)[0].files[0];
     
//       var img = new Image();
//        var imgwidth = 300;
//        var imgheight = 300;
//        var maxwidth = 640;
//        var maxheight = 640;
     
//        img.src = _URL.createObjectURL(file);
//        img.onload = function() {
//         imgwidth = this.width;
//         imgheight = this.height;
      
//        alert("imgwidth"+imgwidth);
//        alert("imgheight"+imgheight);


//         if(imgwidth <= maxwidth && imgheight <= maxheight){
      
         
  
//     var form = document.getElementById('file-upload').files[0];

//     console.warn("ModifiedName",this.state.companyId+form.name);
//     var fileName=this.state.companyId+form.name;

//     var formData = new FormData();
//     formData.append('newName',fileName);
//     formData.append("formData", form,fileName);
   
//     console.warn("formdata", formData);
//     var xhr = new XMLHttpRequest();



//  xhr.open("POST", " http://15.206.129.105:8080/ThroughBooksCOAPI/Login/UploadFile");
//     // xhr.open(
//     //   "POST",
//     //   "http://13.127.217.180:8080/ResumeSite/ResumeSite/UploadFile"
//     // );
//     //xhr.setRequestHeader("Cache-Control", "no-cache");
//     //xhr.setRequestHeader("Postman-Token", "1599c58c-a146-3f42-3514-55bf0e52b273");
//     xhr.withCredentials = false;

//    localStorage.setItem('CompanyLogo', CryptoJS.AES.encrypt(fileName.toString(), "shinchanbaby"));
                    
//     xhr.send(formData);

//     xhr.addEventListener("readystatechange", function() {
//       if (this.readyState === 4) {

//       }
//     });
//        }else{
//         $("#response").text("Image size must be "+maxwidth+"X"+maxheight);
//        }
//       };
//       img.onerror = function() {
      
//        $("#response").text("not a valid file: " + file.type);
//       }
     
//       });
    
     


  
    var form = document.getElementById('file-upload').files[0];
 
    console.warn("ModifiedName",this.state.companyId+form.name);
    var fileName=this.state.companyId+form.name;

    var formData = new FormData();
    formData.append('newName',fileName);
    formData.append("formData", form,fileName);
   
    console.warn("formdata", formData);
    var xhr = new XMLHttpRequest();



 xhr.open("POST", " http://15.206.129.105:8080/ThroughBooksCOAPI/Login/UploadFile");
    // xhr.open(
    //   "POST",
    //   "http://13.127.217.180:8080/ResumeSite/ResumeSite/UploadFile"
    // );
    //xhr.setRequestHeader("Cache-Control", "no-cache");
    //xhr.setRequestHeader("Postman-Token", "1599c58c-a146-3f42-3514-55bf0e52b273");
    xhr.withCredentials = false;

   localStorage.setItem('CompanyLogo', CryptoJS.AES.encrypt(fileName.toString(), "shinchanbaby"));
                    
    xhr.send(formData);

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
      
      }
    });
  }
  componentDidMount() {
    SetCurrentPage("ImportLogo"); 
    window.scrollTo(0, 0);

    var self = this;
    $("button[type=submit]").click(function(event) {
      if (self.state.file !== "") {
        var bytes = self.state.file.size;
     
        var size = 0;
        event.preventDefault();
        if (bytes < 42000) {
   
          size = (bytes / 1024).toFixed(3);
        }
        if (size > 0 && size <= 40) {
          self.handleUpload();
          event.preventDefault();
        } else {
          event.preventDefault();
         

          Swal.fire({
            position: 'center',
            icon: 'warning',
            title:  "Logo Size should be less than 40KB ",
            showConfirmButton: false,
            timer: 2000
          })

          $("#file").val("");
        }
      } else {
        
        Swal.fire({
          position: 'center',
          icon: 'error',
          title:  "Kindly Upload Your Logo. ", 
          showConfirmButton: false,
          timer: 2000
        })
      }
      var uri = window.location.toString();
      if (uri.indexOf("?") > 0) {
        var clean_uri = uri.substring(0, uri.indexOf("?"));
        window.history.replaceState({}, document.title, clean_uri);
      }
      event.preventDefault();
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
  render() {
    return (
      <div className="container">
      <div className="App" >

<div className="">
              <BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
            </div>

       
        <header className="App-header">
          <h4 style={{fontSize:"30px"}} className="App-title">Upload your Company Logo:</h4>
        </header>


        <form method="POST" enctype="multipart/form-data" id="fileForm">

        <div className="form-group">
        <img id="photo"/>
                
              <input id="file-upload"onChange={(e)=>this.handleFile(e)} type="file"  />
       
              </div>
         
              <div class="col-sm-4" style={{marginBottom:"5%"}}>
                  <button  class="btn btn-primary" type="Submit" >
                    Submit
                  </button>
                </div>

        </form>
      </div>
      </div>
    );
  }
}

export default ImportLogo;