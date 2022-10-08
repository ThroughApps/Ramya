import React, { Component } from 'react';
import LoginPage from './LoginPage';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import ForgotpasswordLog from './ForgotpasswordLog';
import CryptoJS from 'crypto-js';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
	GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
	


class OTPverifypage extends Component {
	constructor(props) {
		super(props)
			this.state = {
			emailId: '',
			otp: '',
			employeeId:'',
		

		};
	}


	handleChangeotp(value) {
		this.setState({
			otp: value
		});
	}

	componentDidMount() {
		SetCurrentPage("OTPverifypage"); 
		window.scrollTo(0, 0);
		var emailIdProps = this.props.emailId;
		this.setState({
			emailId: emailIdProps
		});
	}
	OTPverify() {

		this.setState({
			
			emailId: this.state.emailId,
			otp: this.state.otp
		});
		var self = this;
		$.ajax({
			type: 'POST',
			data: JSON.stringify({
                emailId: this.state.emailId,
				otp: this.state.otp,
			
            }),
		   url: " http://15.206.129.105:8080/ThroughBooksCOAPI/Password/verifyOTP",
     
           contentType: "application/json",
			dataType: 'json',
			success: function (data, textStatus, jqXHR) {
			
				if (data.otp == 0) {
					self.state.staffId=data.staffId;
					
					ReactDOM.render(<ForgotpasswordLog  staffId={self.state.staffId} emailId={self.state.emailId}/>, document.getElementById("root"));
				}
				else {
					
					Swal.fire({
						position: 'center',
						icon: 'error',
						title:'OTP is InCorrect',   
						showConfirmButton: false,
						timer: 2000
					  })
					  

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
				  
		  

			}

		});
	}



	BackbtnFunc() {
		ReactDOM.render(<LoginPage />, document.getElementById("root"));
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
					<div className="form-group">
						<label htmlFor="otp">OTP:</label>
						<input type="text" id="OTP" value={this.state.otp} onChange={(e) => this.handleChangeotp(e.target.value)} className="form-control" placeholder="Enter OTP" />
					</div>
					<button type="button" onClick={() => this.OTPverify()} class="btn btn-primary">Submit</button>

				</div>
			</div>
		);
	}

}
export default OTPverifypage;