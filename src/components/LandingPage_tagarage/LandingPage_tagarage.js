import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import LoginPage from '../LoginPage';
//import './d.css';
import './LandingPage_tagaragecss.css';
import t_l1 from './image/garagemanagementlogo.png';
import s1_desktop from './image/desktop.jpg';
//import t_l2 from './image/dpalogo2.png';
import t_l2 from './image/garagemanagementlogo.png';
/* sec4_1 */
import sec1_1 from './image/nodemcucover.png';
import sec4_1 from './image/register35.png';
import sec4_2 from './image/toggles.png';
import sec4_3 from './image/trophy.png';
import talogocolornodemcu from './image/talogocolornodemcu.png';
import aboutIcon from './image/abouticon.png';
import aboutImg from './image/aboutimg.png';
import benefitIcon from './image/benefiticon.png';
import bgImg from './image/bgimage.jpg';
import featureIcon from './image/featureicon.png';
import homeIcon from './image/homeicon.png';
import main_logo from './image/main_logo.png';
import phoneIcon from './image/phoneicon.png';
import feature from './image/feature.png';
import SiteRegister from '../SiteRegister';




//faeures icons
/*
import f1 from './image/features/f1.png';
import f2 from './image/features/f5.png';
import f3 from './image/features/f4.png';
import f4 from './image/features/f3.png';
import f5 from './image/features/inventory.png';
import f6 from './image/features/research.png';
import f7 from './image/features/support.png';
import f8 from './image/features/emailsms.png';
import f9 from './image/features/adminc.png';
import f10 from './image/features/invoice.png';
import f11 from './image/features/empset.png';
import f12 from './image/features/reports.png';

import CustomerAppointments from '../CustomerAppointments';
import slide_1 from './image/sections/secinventorymix1.png';
//import slide_2 from './image/sections/textemail.png';
import slide_2 from './image/sections/textemail.png';
import slide_3 from './image/sections/reportschedule.png';
import THROUGHBOOKS from './image/THROUGHBOOKS.png';*/


class LandingPage_tagarage extends Component {
    constructor() {
        super();
        this.state = {
            emailId: "",
            name: "",
            comments: "",
            password: "",
            date: "",
            formErrors: { emailId: "", password: "" },
            emailIdValid: false,
            passwordValid: false
        };
    }

    handleUserInput = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    };

    /*  Fpassword() {
       ReactDOM.render(<ForgotPassword />, document.getElementById("root"));
     } */

    /*  LoginBtn() {
         ReactDOM.render(<LoginPage />, document.getElementById("root"));
     } */

    componentDidMount() {
        // The function toggles more (hidden) text when the user clicks on "Read more".
        //The IF ELSE statement ensures that the text 'read more' and 'read less' changes
        //interchangeably when clicked on.


        /*  SignUpFunc() {
           ReactDOM.render(<SiteRegister />, document.getElementById("root"));
         } */

    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
        );
    }
 login() {

        ReactDOM.render(
            <Router>
                <div >
                    <Route exact path="/" component={LoginPage} />

                </div>
            </Router>, document.getElementById('root'));
    }
    SignUpFunc() {
      ReactDOM.render(<SiteRegister />, document.getElementById("root"));
    }
  
    Submit() {
        var self = this;
        if (this.state.name.trim().length > 0 && this.state.emailId.trim().length > 0 && this.state.comments.trim().length > 0) {
            $.ajax({
                type: "POST",
                data: JSON.stringify({
                    emailId: this.state.emailId,
                    userName: this.state.name,
                    comments: this.state.comments
                }),
                //url:"http://localhost:8081/EmployeeAttendenceAPI/ContactPageMail/ContactPage",
                url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/ContactPageMail/ContactPage",
                contentType: "application/json",
                dataType: "json",
                async: false,
                success: function (data, textStatus, jqXHR) {
                    confirmAlert({
                        title: "Success", // Title dialog
                        message: "Message Sent Successfully. ", // Message dialog
                        confirmLabel: "Ok" // Text button confirm
                    });
                    self.state.emailId = "";
                    self.state.name = "";
                    self.state.comments = "";
                },

                error: function (data) {
                    confirmAlert({
                        title: "Error", // Title dialog
                        message: "Try Again Later", // Message dialog
                        confirmLabel: "Ok" // Text button confirm
                    });
                }
            });
        } else {
            confirmAlert({
                title: "Error", // Title dialog
                message: "Enter all the Fields", // Message dialog
                confirmLabel: "Ok" // Text button confirm /* col-xs-12 col-md-3 col-lg-3 ++++ col-xs-12 col-md-9 col-lg-9 */
            });
        }
    }
    
  
/*
    CustomerBookServiceFunc(){
        ReactDOM.render(
          <Router>
          <div>
          <Route path="/" component={CustomerAppointments} />
          </div>
          </Router>,
          document.getElementById('root'));
      }*/




    render() {



        return (

           <div className="landingpage_body ">
  <div className="header" id="home">
    <div className="container-fluid ">
  <nav class="navbar_main">
      <img src={main_logo} alt="logo" style={{width: 200}} />

          <ul class="nav-menu">
              <li class="nav-item">
                    <a href="#home" class="nav-link">Home</a>
                </li>
             
                <li class="nav-item">
                    <a href="#about" class="nav-link">About</a>
                </li>
                 <li class="nav-item">
                    <a href="#features" class="nav-link">Features</a>
                </li>
                <li class="nav-item">
                    <a href="#grid" class="nav-link">Benefits</a>
                </li>
                <li class="nav-item">
                    <a href="#contact" class="nav-link">Contact</a>
                </li>
            </ul>
             <div class="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
            
        </nav>

   


      <nav className="navbar  ">
  <div className="collapse navbar-collapse"  id="navbarNav" style={{marginTop: 50}}>
          <ul className="nav_css navbar-nav">
          </ul>
        </div>
      </nav>
      <nav role='navigation' className="nav2_sidebar_css">
  <div id="menuToggle">
  
    <input type="checkbox" />
    <span></span>
    <span></span>
    <span></span>
    <ul id="menu">
      <a href="#home"><li>Home</li></a>
      <a href="#about"><li>About</li></a>
      <a href="#grid"><li>Benefits</li></a>
      <a href="#features"><li>Feature</li></a>
      <a href="#contact"><li>Contact</li></a>
    </ul>
  </div>
</nav>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-6">

          <h1 className="heading_css">Grow Your Business With Throughbooks</h1>
          
          <div className="text-center">
        
        <button  onClick={() => this.login()} class="modal-trigger button2">
                                            Login
                                                 </button>
        <button  onClick={() => this.SignUpFunc()} class="modal-trigger button2">
                                            Sign up
                                                 </button>
            { /*   <p className='login_text'>Already you have a account?</p>*/}
      
          </div>
          <p className="copyright_css">Copyright © <img src={talogocolornodemcu} alt="talogocolornodemcu" style={{width: 90}} /></p>
        </div>
      </div>
    </div>
    
    {/* 
<div class="main-table" >
   <table class="table table table-bordered">
  <thead class="thead">
    <tr style="text-align: center">
<th scope="col"><a href="#"><i class="fa fa-home " aria-hidden="true"></i> Home</a></th>
<th scope="col"><a href="#"><i class="fa fa-thumbs-up" aria-hidden="true"></i> Benefits</a></th>
<th scope="col"><a href="#"><i class="fa fa-line-chart" aria-hidden="true"></i> Feature</a></th>
<th scope="col"><a href="#"><i class="fa fa-phone" aria-hidden="true"></i>Contact</a></th>
    </tr>
  </thead>
</table>
</div>*/}
  </div>
  <div id="content">
    <div className="sidenav transparent_bg" >
      <ul className>
      <div className="circle">   
      <li className="hover02">
          <figure>
                 <a href="#home" style={{marginLeft:6}}>  
                   <i class="fa fa-home fa-2x" aria-hidden="true"></i>
                  </a>
          </figure>
      </li>
            </div>
            <div className="circle">
        <li className="hover02">
          <figure>
            <a href="#about" style={{marginLeft:9}} ><i class="fa fa-user fa-2x" aria-hidden="true"></i></a></figure></li>
          </div>
          <div className="circle">
        <li className="hover02">
          <figure>
            <a href="#features"><i class="fa fa-cogs fa-2x" aria-hidden="true"></i></a></figure></li>
          </div>
          <div className="circle">
        <li className="hover02">
          <figure>
            <a href="#grid"><i class="fa fa-cubes fa-2x" aria-hidden="true"></i></a></figure></li>
            </div>
            <div className="circle">
        <li className="hover02">
          <figure>
            <a href="#contact" style={{marginLeft:9}}><i class="fa fa-phone fa-2x" aria-hidden="true"></i></a></figure></li>
            </div>
      </ul>
    </div>
  </div>
  <div className="bg_color" >
    <section id="about">
      <div className="container">
        <div className="row">
          <div className="col-md-6 main_content" style={{marginTop: 100}}>
            <h3 className="heading3" style={{color: 'white'}}>About</h3>
            <p className="content_para">Through Books is an ERP software package developed with business, employees and customers in mind. ThroughBooks provides business owners with a convenient remote access option for information and communication needs.  ThroughBooks is a great fit for any service-based businesses looking to improve their digital presence.
</p><br />
            <h4 className="heading3" style={{color: 'white'}}>Run your business with cloud based GST supported Accounting Software</h4>
            <p className="content_para">We take care about taxes and invoices, so you can focus on your business. We deliver true results, focusing on strategic decisions and practical actions tailored to our clients’ unique reality.</p>
          </div> 
          <div className="col-md-6 hover01 aboutimg">
            <figure>
              <img src={aboutImg} alt="about" style={{marginTop: 50}}/>
            </figure>
          </div>  
        </div>
      </div>
    </section>
    <section className="features" style={{marginTop:-10}}>
      <div className="container">
        <div className="row">
         <h3 className="heading3" style={{color: 'white' , marginTop:10 , marginLeft:20}} id="features">Features</h3>
          <div className="col-md-4 main_content"  style={{marginTop:30}}>
           
            <div className="card">
            <h4 className="sub_heading" style={{color: 'white' , textAlign:'center' , }}>Invoicing</h4>
            <p className="grid-content_para">Create professional, customizable invoices and estimates that you can send via SMS, Email &amp; Whatsapp.</p>
            </div>
            <div className="card">
            <h4 className="sub_heading" style={{color: 'white' , textAlign:'center' , }}>Payments</h4>
            <p className="grid-content_para">Throughbooks allows customer to pay online via Razorpay and records each transaction automatically</p>
            </div>
            <div className="card" >
            <h4 className="sub_heading" style={{color: 'white' , textAlign:'center' ,}}>Expenses</h4>
            <p className="grid-content_para">Keep record on your daily expenses and manage your payable using Throughbooks.</p>
            </div>
            </div>
            <div className="col-md-4" style={{marginTop:30}}>
            <div className="card">
            <h4 className="sub_heading" style={{color: 'white' , textAlign:'center' , }}>Quotation</h4>
            <p className="grid-content_para">Create customizable quotes and send to your customers via SMS, Email &amp; Whatsapp and convert them to invoice in just a click.</p>
         </div>
          
          
<div className="card">
 <h4 className="sub_heading" style={{color: 'white' , textAlign:'center' , }}>Attendance</h4>
            <p className="grid-content_para">Working beyond the company walls?  Get real time attendance data - anytime & anywhere.</p>
            </div>
            
            <div className="card" style={{padding:20}}>
            <h4 className="sub_heading" style={{color: 'white' , textAlign:'center' , }}>Bulk Customer Payments</h4>
            <p className="grid-content_para">Process multiple invoices of a customer in a single click.</p> 
            </div>
            </div>
            <div className="col-md-4" style={{marginTop:34}}>

            <div className="card">
            <h4 className="sub_heading" style={{color: 'white' , textAlign:'center' , }}>Payroll</h4>
            <p className="grid-content_para">Calculate hourly payments of the employees based on the attendance data and calculate overtime rates as well.</p>
            </div>
            <div className="card">
            <h4 className="sub_heading" style={{color: 'white' , textAlign:'center' ,}}>Notifications and Alerts</h4>
            <p className="grid-content_para">Send enquiry remainders using WhatsApp and promotional messages using text message and email</p>
            </div>

             <div className="card">
            <h4 className="sub_heading" style={{color: 'white' , textAlign:'center' , }}>Feedback</h4>
            <p className="grid-content_para">Customer's Reviews and feedback can be reported and monitored for the future enhancement of the business

</p>
         </div>




         {/*<div className="benefit_img ">
              <figure>
                <img src={feature} alt="benefit" />
              </figure>
            </div>*/}
          </div>
        </div>
      </div>
    </section>
    {/*grid open*/}
    <section id="grid">
      <div className="container transbox">
        <h3 className="heading3" style={{textAlign: 'center', color: 'black'}}>Benefits</h3>
        <div className="row">
          <div className="col-md-4 grid_space">
            <center><i className="fa fa-mobile fa-4x" aria-hidden="true" /></center>
            <h4 className="grid_head heading3">Mobile Invoicing</h4>
            <p className="grid_para">Throughbooks allows to bill your customers right from your mobile device so they can pay quickly &amp; securely.</p>
          </div>
          <div className="col-md-4 grid_space">
            <center> <i className="fa fa-whatsapp fa-4x" aria-hidden="true" /></center>
            <h4 className="grid_head heading3">Whatsapp Notifications</h4>
            <p className="grid_para">Creating &amp; sending invoices over whatsapp is a great way to reach your customers quickly, and it can help you to get paid faster..</p>
          </div>
          <div className="col-md-4 grid_space">
            <center><i className="fa fa-map-marker fa-4x" aria-hidden="true" /></center>
            <h4 className="grid_head heading3">Multi-Location access</h4>
            <p className="grid_para">Users can access your multiple businesses in a single device all times, making it easy to work together.</p>
          </div>
        </div><hr />
        <div className="row">
          <div className="col-md-4 grid_space">
            <center><i className="fa fa-phone fa-4x" aria-hidden="true" /></center>
            <h4 className="grid_head heading3">Free Customer support</h4>
            <p className="grid_para">Customer support is available 24/7 with answers to your questions and information for running your business successfully.</p>
          </div>
          <div className="col-md-4 grid_space">
            <center><i className="fa fa-lock fa-4x" aria-hidden="true" /></center>
            <h4 className="grid_head heading3">Safe &amp; secure</h4>
            <p className="grid_para">Throughbooks backs up your data every day, with high level security (128-bit SSL encryption) ensures your information is safe in AWS cloud..</p>
          </div>
          <div className="col-md-4 grid_space">
            <center><i className="fa fa-money fa-4x" aria-hidden="true" /></center>
            <h4 className="grid_head heading3">Get Payment  from your desk</h4>
            <p className="grid_para">Customers receives a payment request in their email and they can pay online from wherever they are via Razorpay</p>
          </div>
        </div>
      </div>
    </section>
  </div>
  {/*grid close*/}
  <section id="contact">
    <div className="jumbotron bg_color">
      <div className="row">
        <div className="col-md-6">
          <h2 className="heading3" style={{textAlign: 'center' , color: 'white'}}>Connect With Us</h2>
          <p className="content_para">Contact Us and we'll get back within 24 hours</p>
          <p className="content_para">Chennai, INDIA</p>
          <p className="content_para">+91 9003114243</p>
          <p className="content_para">throughapps@gmail.com</p>
          <p className="content_para">Throughapps | 264, Village high road | Shollinganllur | Chennai - 600119</p>
        </div>
        <div className="col-md-6">
          <div className="mapouter"><div className="gmap_canvas"><iframe width={600} height={271} id="gmap_canvas" src="https://maps.google.com/maps?q=Throughapps%20%7C%20264,%20Village%20high%20road%20%7C%20Shollinganllur%20%7C%20Chennai%20-%20600119&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} /><a href="https://www.whatismyip-address.com" /><br /><style dangerouslySetInnerHTML={{__html: ".mapouter{position:relative;text-align:right;height:271px;width:600px;}" }} /><a href="https://www.embedgooglemap.net" /><style dangerouslySetInnerHTML={{__html: ".gmap_canvas {overflow:hidden;background:none!important;height:271px;width:600px;}" }} /></div></div>
        </div>
      </div>
    
    </div>
  </section>
    <div className="footer"> 
      <p className="copyright_footercss">Copyright © Throughapps</p>
      </div>
</div>

        );
    }
}

 
export default LandingPage_tagarage;
