import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import LoginPage from './LoginPage';
import CryptoJS from 'crypto-js';
import SiteRegister from './SiteRegister';
import moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import { FormErrors } from './FormErrors';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
    GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
    
class OTPSignUp extends Component {
    constructor(props) {
        super(props)
        var today = new Date();
        var fromdate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


        var proprietor;
        this.state = {
            otp: '',
            fromdate: fromdate,
            fieldsData:[],
            companyName: '',
            emailId: '',
            contactNo: '',
            password: '',
            roleName: proprietor,
            formErrors: {
                otp:'',
              },
              otpValid:false,
        };
        this.setState({
            roleName: proprietor,

            fromdate: fromdate,
        });
    }


    handleChangeotp=(e) =>{
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
          () => { this.validateField(name, value) });

    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let otpValid = this.state.otpValid;
     
    
        switch (fieldName) {
          case 'otp':
                otpValid = value.match(/^[0-9]{6}$/);
            fieldValidationErrors.OTP = otpValid ? '' : ' should be 6 digit number';
            break;
    
        
            break;
        }
        this.setState({
          formErrors: fieldValidationErrors,
         otpValid: otpValid,
        
    
        }, this.validateForm);
      }
    
      validateForm() {
    
        this.setState({
          formValid:
           this.state.otpValid
        
        });
      }
    
      errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
      }

    componentDidMount() {
        SetCurrentPage("OTPSignUp"); 
        window.scrollTo(0, 0);
    }

    BackbtnFunc() {
        ReactDOM.render(<SiteRegister />, document.getElementById("root"));
    }

    OTPverify() {
        var self = this;
        var today = new Date();
        var fromdate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


        var OTP = CryptoJS.AES.decrypt(localStorage.getItem('OTP'), "shinchanbaby").toString(CryptoJS.enc.Utf8)


        if (this.state.otp == OTP) {

            var companyName = CryptoJS.AES.decrypt(localStorage.getItem('companyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
           	
            var currencyCode = CryptoJS.AES.decrypt(localStorage.getItem('CurrencyCode'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            //    var password = CryptoJS.AES.decrypt(localStorage.getItem('Password'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var emailId = CryptoJS.AES.decrypt(localStorage.getItem('EmailId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var contactNo = CryptoJS.AES.decrypt(localStorage.getItem('contactNo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            //   var address = CryptoJS.AES.decrypt(localStorage.getItem('Address'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var planName = CryptoJS.AES.decrypt(localStorage.getItem('planName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var permission = CryptoJS.AES.decrypt(localStorage.getItem('permission'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

                     var doorNo = CryptoJS.AES.decrypt(localStorage.getItem('DoorNo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var floor = CryptoJS.AES.decrypt(localStorage.getItem('Floor'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var street = CryptoJS.AES.decrypt(localStorage.getItem('Street'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var city = CryptoJS.AES.decrypt(localStorage.getItem('City'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var addressState = CryptoJS.AES.decrypt(localStorage.getItem('State'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

            var area = CryptoJS.AES.decrypt(localStorage.getItem('Area'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var zipCode = CryptoJS.AES.decrypt(localStorage.getItem('Zipcode'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var pincode = CryptoJS.AES.decrypt(localStorage.getItem('Pincode'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            // var landlineNo = CryptoJS.AES.decrypt(localStorage.getItem('LandlineNo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            // var feedbackNo = CryptoJS.AES.decrypt(localStorage.getItem('FeedbackNo'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

            var date=CryptoJS.AES.decrypt(localStorage.getItem('Date'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var timeZone=CryptoJS.AES.decrypt(localStorage.getItem('TimeZone'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var holidayTableNextYear=CryptoJS.AES.decrypt(localStorage.getItem('HolidayTableNextYear'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var permissionHeader=CryptoJS.AES.decrypt(localStorage.getItem('permissionHeader'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
            var state=CryptoJS.AES.decrypt(localStorage.getItem('State'), "shinchanbaby").toString(CryptoJS.enc.Utf8)	
             
            
            this.state.state=state;	
            this.state.companyName = companyName;	
            this.state.currencyCode=currencyCode;
            //     this.state.password = password;
            this.state.emailId = emailId;
            this.state.contactNo = contactNo;
            this.state.planName = planName;
            this.state.permission = permission;
            this.state.permissionHeader=permissionHeader;
           
            //     this.state.password = password;
            this.state.doorNo = doorNo;
            this.state.floor = floor;
            this.state.city = city;
            this.state.street = street;
            this.state.addressState = addressState;
            this.state.zipCode=zipCode;
            this.state.pincode = pincode;
            this.state.area=area;
            // this.state.landlineNo = landlineNo;
            // this.state.feedbackNo = feedbackNo;

            this.state.date=date;
            this.state.timeZone=timeZone;
            this.state.holidayTableNextYear=holidayTableNextYear;
         


            this.setState({
                state:this.state.state,	
                companyName: this.state.companyName,	
                currencyCode:this.state.currencyCode,
                //   password: this.state.password,
                emailId: this.state.emailId,
                contactNo: this.state.contactNo,
                address: this.state.address,
                planName: this.state.planName,
                permission: this.state.permission,
                doorNo:this.state.doorNo,
                floor:this.state.floor,
                city:this.state.city,
                street:this.state.street,
                addressState:this.state.addressState,
                pincode:this.state.pincode,

                date:this.state.date,
                timeZone:this.state.timeZone,
                zipCode:this.state.zipCode,
                area:this.state.area,
                holidayTableNextYear:this.state.holidayTableNextYear,
                permissionHeader:this.state.permissionHeader,

            })
            if (planName == "Basic") {
                var dateAdd = moment().add(7, 'd').toDate();
                var todate = dateAdd.getFullYear() + '-' + (dateAdd.getMonth() + 1) + '-' + dateAdd.getDate();

                self.state.todate = todate;

                self.setState({
                    todate: self.state.todate,
                })

            }
            else if (planName == "Premium") {
                var dateAdd = moment().add(7, 'd').add(1, 'y').toDate();
                var todate = dateAdd.getFullYear() + '-' + (dateAdd.getMonth() + 1) + '-' + dateAdd.getDate();
                self.state.todate = todate;

                self.setState({
                    todate: self.state.todate,
                })


            }
            else {

                var dateAdd = moment().add(7, 'd').add(1, 'y').toDate();
                var todate = dateAdd.getFullYear() + '-' + (dateAdd.getMonth() + 1) + '-' + dateAdd.getDate();
                self.state.todate = todate;

                self.setState({
                    todate: self.state.todate,
                })

            }
           
            this.state.fieldsData=[];

            //TAX INFO -- TAX1
            var submit_Data={
                    fieldLabelName:'tax1',
                    fieldTextName:'tax1',
                    fieldModule:'Tax',
            }
            this.state.fieldsData.push(submit_Data);

            //TAX INFO -- TAX2
                var submit_Data={
                    fieldLabelName:'tax2',
                    fieldTextName:'tax2',
                    fieldModule:'Tax',
            }
            this.state.fieldsData.push(submit_Data);

            //TAX INFO -- TAX3
            var submit_Data={
                fieldLabelName:'tax3',
                fieldTextName:'tax3',
                fieldModule:'Tax',
            }
            this.state.fieldsData.push(submit_Data);


            $.ajax({
                type: 'POST',
                data: JSON.stringify({
                    companyName: this.state.companyName,
                    //  password: this.state.password,
                    emailId: this.state.emailId,
                    contactNo: this.state.contactNo,
                    address: this.state.address,
                    planName: this.state.planName,
                    permission: this.state.permission,
                    roleName: this.state.roleName,
                    todate: this.state.todate,
                    fromdate: this.state.fromdate,
                    doorNo:this.state.doorNo,
                    floor:this.state.floor,
                    city:this.state.city,
                    street:this.state.street,
                    state:this.state.addressState,
                    pincode:this.state.pincode,
                    // landlineNo:this.state.landlineNo,
                    // feedbackNo:this.state.feedbackNo,
                    zipCode:this.state.zipCode,
                    area:this.state.area,
                    date:this.state.date,
                //    timeZone:this.state.timeZone,
                    holidayTableNextYear:this.state.holidayTableNextYear,
                    permissionHeader:this.state.permissionHeader,

                    fieldsData:JSON.stringify(this.state.fieldsData),
                    currencyCode:this.state.currencyCode,

                    
                }),
                url: " http://15.206.129.105:8080/ThroughBooksCOAPI/SiteRegistration/InsertSite",
                contentType: "application/json",
                dataType: 'json',
                async: false,
                success: function (data, textStatus, jqXHR) {

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Registered Your Organization Successfully',   
                        showConfirmButton: false,
                        timer: 2000
                      })
                    localStorage.clear();

                    ReactDOM.render(<LoginPage />, document.getElementById("root"));

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


        } else {

            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "OTP You Have Entered Is Wrong Kindly Re-Enter The Correct OTP", 
                showConfirmButton: false,
                timer: 2000
              })
        }

    }

    render() {

        return (

            <div className="container">
                <ul class="previous disabled" id="backbutton"
                    style={{
                        backgroundColor: "#05a4b5",color:"white",
                        float: "none",
                        display: "inline-block",
                        marginLeft: "5px",
                        borderRadius: "5px",
                        padding: "3px 7px 3px 7px",
                        marginTop:"13px"
                    }}>
                    <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></ul>
                <div className="jumbotron ">
                <div className="panel panel-default" >
                <FormErrors formErrors={this.state.formErrors} />
              </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.otp)}`}>
              
                        <label htmlFor="otp">OTP:</label>
                        <input type="text" id="OTP"   name="otp" value={this.state.otp} onChange={this.handleChangeotp} className="form-control" placeholder="Enter OTP" />
                    </div>
                    <br />
                    <button type="button" disabled={!this.state.formValid}  onClick={() => this.OTPverify()} class="btn btn-primary">Submit</button>

                </div>
            </div>
        );
    }

}
export default OTPSignUp;