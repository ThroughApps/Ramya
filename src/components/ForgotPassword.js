
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import './LoginPage.css';
import OTPverifypage from './OTPverifypage';
import CryptoJS from 'crypto-js';
import LoginPage from './LoginPage';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';

class ForgotPassword extends Component {

    
    constructor() {

        super()
      this.state = {

            emailId: '',
         

        };

    }

    componentDidMount() {
       SetCurrentPage("ForgotPassword"); 
        window.scrollTo(0, 0);      
   
    }

    
    handleChangeemailid(value) {
		this.setState({
			emailId: value
		});
	}

    
    forgotpwd() {
		this.setState({
			emailId: this.state.emailId,

		});
		var self = this;
		$.ajax({
			type: 'POST',
            data: JSON.stringify({
                emailId: this.state.emailId,
                
              }),
	
        url: " http://15.206.129.105:8080/ThroughBooksCOAPI/Password/ForgetPassword",
        contentType: "application/json",
			dataType: 'json',
			async: false,

			success: function (data, textStatus, jqXHR) {
				if (data == 0) {
					ReactDOM.render(<OTPverifypage emailId={self.state.emailId} />, document.getElementById("root"));

				}
				else {
			
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title:'The Provided Email Id Is Invalid . Kindly Check Your EmailId',    
                        showConfirmButton: false,
                        timer: 2000
                      })
                      
                  
				}
			},

		});
	}
    BackbtnFunc() {
		ReactDOM.render(<LoginPage />, document.getElementById("root"));
	}

    render() {


        return (

            <div className="container">
            <div className="">
              <BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
            </div>


             <div className="jumbotron">
                 <div className="form-group">
                     <label htmlFor="emailId">Reset Password:</label>
                     <input type="email" id="emailId" value={this.state.emailId} onChange={(e) => this.handleChangeemailid(e.target.value)} className="form-control" placeholder="Enter your valid email" />
                 </div>
                 <button type="button" id="" onClick={() => this.forgotpwd()} class="btn btn-primary">Submit</button>
             </div>
         </div>



);
}

}
export default ForgotPassword;