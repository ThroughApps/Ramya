import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';


//import './d.css';
import './landingpage_css.css';
import LoginPage from '../LoginPage';
import CustomerAppointments from '../CustomerAppointments';

import aboutIcon from './image/abouticon.png';
import aboutImg from './image/aboutimg.png';
import benefit from './image/benefit.png';
import benefit2 from './image/benefit2.png';
import benefitIcon from './image/benefiticon.png';
import bgImg from './image/bgimage.jpg';
import contact from './image/contact1.jpg';
import featureIcon from './image/featureicon.png';
import homeIcon from './image/homeicon.png';
import homeImg from './image/homeimage.png';
import homeImgs from './image/homeimages.png';
import logo from './image/logo.png';
import phoneIcon from './image/phoneicon.png';
import SiteRegister from '../SiteRegister';


/*
import t_l1 from './image/garagemanagementlogo.png';
import s1_desktop from './image/desktop.jpg';
//import t_l2 from './image/dpalogo2.png';

import t_l2 from './image/garagemanagementlogo.png';

/* sec4_1 *
import sec1_1 from './image/nodemcucover.png';

import sec4_1 from './image/register35.png';
import sec4_2 from './image/toggles.png';
import sec4_3 from './image/trophy.png';

import LoginPage from '../LoginPage';
import '../LoginPage.css';

//faeures icons
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
import THROUGHBOOKS from './image/THROUGHBOOKS.png';
*/

class LandingPage extends Component {

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

   

    componentDidMount() {
     
   // alert("landing page");

    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
        );
    }

    SignUp() {

    //  alert("LOGIN");
      
        ReactDOM.render(
            <Router>
                <div >
                    <Route exact path="/" component={SiteRegister} />

                </div>
            </Router>, document.getElementById('root'));
    }

    login() {
      
        ReactDOM.render(
            <Router>
                <div >
                    <Route exact path="/" component={LoginPage} />

                </div>
            </Router>, document.getElementById('root'));
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

    CustomerBookServiceFunc(){
        ReactDOM.render(
          <Router>
          <div>
          <Route path="/" component={CustomerAppointments} />
          </div>
          </Router>,
          document.getElementById('root'));
      }
    render() {
        return (

          <div className="landingpage_body ">
          <div className="header" id="home">
            <div className="container-fluid ">
              <nav className="navbar navbar-expand-lg ">
                <a className="navbar-brand" href="#"><img src={logo} alt="logo" width={100} /></a>
              {/*  <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" 
                data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" 
                aria-label="Toggle navigation">
                  <span className="toggle_css"><i className="fa fa-bars" aria-hidden="true" /></span>
                </button> */}
                <div className="collapse navbar-collapse " id="navbarNav">
                  <ul className="nav_css navbar-nav">
                    <li className="nav_list">
                      <a className="nav-link" href="#home">Home<span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav_list">
                      <a className="nav-link" href="#grid">Benefits</a>
                    </li>
                    <li className="nav_list">
                      <a className="nav-link" href="#features">Features</a>
                    </li>
                    <li className="nav_list">
                      <a className="nav-link" href="#about">About</a>
                    </li>
                    <li className="nav_list">
                      <a className="nav-link dummyclassname"  onClick={() => this.login()} href="#">Login</a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="heading_css" style={{textAlign: 'center', color: 'black'}}>Power your Business<br /><span>With</span><br />Through Books</h1>
                  <div className="text-center">
                    <a href="#">
                    </a>
                    <a href="#" onClick={() => this.SignUp()} className="button">Sign Up</a>
                  </div>
                </div>
              </div>
            </div>
           {/* <div className="main-table">
              <table className="table table table-bordered">
                <thead className="thead">
                  <tr style={{textAlign: 'center'}}>
                    <th scope="col"><a href="#"><i className="fa fa-home " aria-hidden="true" /> Home</a></th>
                    <th scope="col"><a href="#"><i className="fa fa-thumbs-up" aria-hidden="true" /> Benefits</a></th>
                    <th scope="col"><a href="#"><i className="fa fa-line-chart" aria-hidden="true" /> Feature</a></th>
                    <th scope="col"><a href="#"><i className="fa fa-phone" aria-hidden="true" />Contact</a></th>
                  </tr>
                </thead>
              </table>
            </div>
            */}
          </div>
          <div id="content bg-dark">
            <div className="sidenav">
              <ul>
                <li><a href="#home"><img src={homeIcon} data-toggle="tooltip" data-placement="top" title="home" /></a></li>
                <li><a href="#about"><img src={aboutIcon} data-toggle="tooltip" data-placement="top" title="About" /></a></li>
                <li><a href="#features"><img src={featureIcon} data-toggle="tooltip" data-placement="top" title="Features" /></a></li>
                <li><a href="#grid"><img src={benefitIcon} data-toggle="tooltip" data-placement="top" title="Benefits" /></a></li>
                <li><a href="#contact"><img src={phoneIcon} data-toggle="tooltip" data-placement="top" title="Contact" /></a></li>
              </ul>
            </div>
          </div>
          <section id="about">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h3 style={{color: '#255753'}}><b>About</b></h3>
                  <p className="content_para" style={{color: '#255753'}}>Through Books is a single platform that provides you a solution for various day to day business life problems. The suitable App that satisfies all your needs could be opted among the offered Apps, The App could be used very easily from just one single sign up process.</p><br />
                  <h4 style={{color: '#255753'}}><b>Run your business with cloud based GST supported Accounting Software</b></h4>
                  <p className="content_para" style={{color: '#255753'}}>We take care about taxes and invoices, so you can focus on your business. We deliver true results, focusing on strategic decisions and practical actions tailored to our clients’ unique reality.</p>
                </div> 
                <div className="col-md-6">
                  <img src={benefit2} alt="benefits" />
                </div>  
              </div>
            </div>
          </section>
          <section className="features">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h3 style={{color: '#255753'}} id="features"><b>Features</b></h3><br />
                  <h4 style={{color: '#255753'}}>Invoicing</h4>
                  <p className="content_para" style={{color: '#255753'}}>Create professional, customizable invoices and estimates that you can send via SMS, Email &amp; Whatsapp.</p>
                  <h4 style={{color: '#255753'}}>Payments</h4>
                  <p className="content_para" style={{color: '#255753'}}>Throughbooks allows customer to pay online via Razorpay and records each transaction automatically</p>
                  <h4 style={{color: '#255753'}}>Expenses</h4>
                  <p className="content_para" style={{color: '#255753'}}>Keep record on your daily expenses and manage your payable using Throughbooks.</p>
                  <h4 style={{color: '#255753'}}>Quotation</h4>
                  <p className="content_para" style={{color: '#255753'}}>Create customizable quotes and send to your customers via SMS, Email &amp; Whatsapp and convert them to invoice in just a click.</p>
                  <a href="https://importsai.com/throughbooks-features/">
                    <button type="button" className="btn btn-dark"> Learn More</button>
                  </a>
                </div>
                <div className="col-md-6">
                  <div className="benefit_img">
                    <img src={benefit} alt="benefit" />
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*grid open*/}
          <section id="grid">
            <div className="container transbox">
              <h3 className="display-4" style={{textAlign: 'center', color: 'black'}}>Benefits</h3>
              <div className="row">
                <div className="col-md-4">
                  <center><i className="fa fa-mobile fa-4x" aria-hidden="true" /></center>
                  <h4 className="grid_head">Mobile Invoicing</h4>
                  <p className="content_para">Throughbooks allows to bill your customers right from your mobile device so they can pay quickly &amp; securely.</p>
                </div>
                <div className="col-md-4">
                  <center> <i className="fa fa-whatsapp fa-4x" aria-hidden="true" /></center>
                  <h4 className="grid_head">Whatsapp Notifications</h4>
                  <p className="content_para">Creating &amp; sending invoices over whatsapp is a great way to reach your customers quickly, and it can help you to get paid faster..</p>
                </div>
                <div className="col-md-4">
                  <center> <i className="fa fa-map-marker fa-4x" aria-hidden="true" /></center>
                  <h4 className="grid_head">Multi-Location access</h4>
                  <p className="content_para">Users can access your multiple businesses in a single device all times, making it easy to work together.</p>
                </div>
              </div><hr />
              <div className="row">
                <div className="col-md-4">
                  <center><i className="fa fa-phone fa-4x" aria-hidden="true" /></center>
                  <h4 className="grid_head">Free Customer support</h4>
                  <p className="content_para">Customer support is available 24/7 with answers to your questions and information for running your business successfully.</p>
                </div>
                <div className="col-md-4">
                  <center><i className="fa fa-lock fa-4x" aria-hidden="true" /></center>
                  <h4 className="grid_head">Safe &amp; secure</h4>
                  <p className="content_para">Throughbooks backs up your data every day, with high level security (128-bit SSL encryption) ensures your information is safe in AWS cloud..</p>
                </div>
                <div className="col-md-4">
                  <center><i className="fa fa-money fa-4x" aria-hidden="true" /></center>
                  <h4 className="grid_head">Get Payment  from your desk</h4>
                  <p className="content_para">Customers receives a payment request in their email and they can pay online from wherever they are via Razorpay</p>
                </div>
              </div>
            </div>
          </section>
          {/*grid close*/}
          <section id="contact">
  <div className="jumbotron">
    <div className="row">
      <div className="col-md-6">
        <h2 style={{textAlign: 'center'}}>Connect With Us</h2>
        <p className="content_para">Contact Us and we'll get back within 24 hours</p>
        <p className="content_para">North America</p>
        <p className="content_para">(513)429-5604</p>
        <p className="content_para">aiimports@importsai.com</p>
        <p className="content_para">Blue Ash | Ohio | USA</p>
      </div>
      <div className="col-md-6">
        <div className="mapouter"><div className="gmap_canvas"><iframe width={600} height={271} id="gmap_canvas" src="https://maps.google.com/maps?q=Throughapps%20%7C%20264,%20Village%20high%20road%20%7C%20Shollinganllur%20%7C%20Chennai%20-%20600119&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} /><a href="https://www.whatismyip-address.com" /><br /><style dangerouslySetInnerHTML={{__html: ".mapouter{position:relative;text-align:right;height:271px;width:600px;}" }} /><a href="https://www.embedgooglemap.net" /><style dangerouslySetInnerHTML={{__html: ".gmap_canvas {overflow:hidden;background:none!important;height:271px;width:600px;}" }} /></div></div>
      </div>
    </div>
  </div>
</section>
        </div>
        

        );
    }
}


export default LandingPage;
