import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import './datepicker.css';
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import AddRole from './AddRole';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import CryptoJS from 'crypto-js';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import FooterText from './FooterText';
import { FormErrors } from './FormErrors';
import { argumentPlaceholder } from '@babel/types';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';

class ChangePassword1 extends Component {
    constructor(){
        super()
        var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
   
	
        this.state={

            password: '',
            confirmpassword:'',
            staffId: staffId,
            companyId:companyId,
            passwordValid: false,
            formErrors: { passwordValid: '', },
        }
          }

          componentDidMount(){
          SetCurrentPage("changepassword");
            window.scrollTo(0, 0);      
   
          }
          handleUserInput = (e) => {
            const name = e.target.name;
            const value = e.target.value;
            this.setState({ [name]: value },
                () => { this.validateField(name, value) });
        }
        validateField(fieldName, value) {
            let fieldValidationErrors = this.state.formErrors;
            let passwordValid = this.state.passwordValid;
    
            switch (fieldName) {
                case 'password':
                passwordValid = value.length >= 5 && value.match(/^((?=.*[0-9])(?=.*[A-Z])(?=.{8,}))/);
                    // passwordValid = value.length >= 5 && value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/);
                    fieldValidationErrors.Password = passwordValid ? '' : 'should be at least 8 character long/include at least one capital letter and number ';
                    break;
    
                default:
                    break;
            }
            this.setState({
                formErrors: fieldValidationErrors,
                passwordValid: passwordValid,
            }, this.validateForm);
        }
    
        validateForm() {
            this.setState({ formValid: this.state.passwordValid });
        }
        errorClass(error) {
            return (error.length === 0 ? '' : 'has-error');
        }

Passwordverify() {

    var password = document.getElementById("password");
    var confirmpassword = document.getElementById("confirmpassword");
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    if (password.value == confirmpassword.value) {
        this.setState({
            staffId: staffId,
            password: this.state.password,
          
        });
   
        var self = this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify({       
                staffId: staffId,       
                password: this.state.password,
                companyId:this.state.companyId,

            }),
            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/admin/updatePassword",
             contentType: "application/json",
            dataType: 'json',


            success: function (data, textStatus, jqXHR) {
                localStorage.setItem('Password', CryptoJS.AES.encrypt(self.state.password, "shinchanbaby"));
				
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Changed the Password  Successfully ',     
                    showConfirmButton: false,
                    timer: 2000
                  })

                self.state.confirmpassword='';
                self.state.password='';
                self.state.formValid=false;
                self.state.passwordValid=false;
                self.setState({
                    password:'',
                    confirmpassword:'',
                    formValid:false,
                    passwordValid:false,
                })
                ReactDOM.render(
                    <Router>
                        <div>

                        <Route path="/" component={() => <ChangePassword1 />} />

                            </div>
                    </Router>, document.getElementById('contentRender'));
                registerServiceWorker();


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
    
        else {
            var self=this;
         

            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Resetting Password Failed Because Passwords Are Not  Same',     
                showConfirmButton: false,
                timer: 2000
              })

            self.state.confirmpassword='';
             self.state.password='';
            self.state.formValid=false;
            self.state.passwordValid=false;
             self.setState({
                password:'',
                confirmpassword:'',
                formValid:false,
                passwordValid:false,
             })

        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={ChangePassword1} />
                 
                </div>
            </Router>,
            document.getElementById('contentRender'));
    }
}

ChangePassword(){
    ReactDOM.render(
        <Router>
            <div>
  
                <Route path="/" component={ChangePassword1} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
  }
  AddRole(){
    ReactDOM.render(
        <Router>
            <div>
  
                <Route path="/" component={AddRole} />
              </div>
        </Router>,
        document.getElementById('contentRender'));
  }

  cancelFunc() {
       
    ReactDOM.render(<ChangePassword1 />, document.getElementById("contentRender"));
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
        return(
            <div class="container">
             
                        <div class="card">
                        <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4">
                        <div className="">
              <BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
            </div>


                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8">
                        <div class="card-header">
                        <h3 >Change Password</h3>   </div>
                  
                    </div>
            </div>

                     
                 
                  <div class="card-body">
                  <div className="panel panel-default">
						<FormErrors formErrors={this.state.formErrors} />
					</div>
                   <div class="form-horizontal form-bordered" >
                   <div className={`form-group ${(this.state.formErrors.password)}`} >
						<label className="control-label col-sm-2" htmlFor="password">NewPassword:<span style={{ color: "red" }}>*</span></label>
                        <div class="col-sm-10">
						<input type="password" value={this.state.password}
							onChange={this.handleUserInput}
							name="password"
							id="password"
							className="form-control"
							required=""
							placeholder="Enter password" />
                            </div>
					</div>



					<div className="form-group">
						<label class class="control-label col-sm-2" htmlFor="confirmpassword">Confirm Password:<span style={{ color: "red" }}>*</span></label>
                        <div class="col-sm-10">
                        <input type="password"
                            name="confirmpassword"
                            value={this.state.confirmpassword}
                            onChange={this.handleUserInput}
							id="confirmpassword"
							className="form-control"
							placeholder="Confirm Password " />
                            </div>

					</div>
                    <div class="form-group"> 
                    <div class="col-sm-offset-2 col-sm-10">
					<button style={{fontWeight:"bold"}} disabled={!this.state.formValid} type="button" onClick={() => this.Passwordverify()} class="btn btn-primary">Reset Password</button><span> </span>
                    <button style={{fontWeight:"bold"}} type="button"  onClick={() => this.cancelFunc()} class="btn btn-primary">Clear</button>
                       </div></div>
              </div></div>
            
              </div> </div>
                    );
    }

}
export default ChangePassword1;