import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
//import GenericDashboard from '.components/Topnavbar/GenericDashboard';
//import GenericDashboard from './components/Topnavbar/GenericDashboard'
//import LandingPageDigitalPrinter from './components/LandingPageDigitalPrinter';
//import registerServiceWorker from './registerServiceWorker';
import FooterText from './components/FooterText';
import CryptoJS from 'crypto-js';
import GenericDashboardBasic from './components/Topnavbar/GenericDashboardBasic';
import GenericDashboardPremium from './components/Topnavbar/GenericDashboardPremium';
import GenericDashboardElite from './components/Topnavbar/GenericDashboardElite';
import registerServiceWorker from './components/registerServiceWorker';
import feedBackForm from './components/feedBackForm';
import LandingPage_tagarage from './components/LandingPage_tagarage/LandingPage_tagarage';
import NewMenuBar from './components/Topnavbar/NewMenuBar';
import SiteRegister from './components/SiteRegister';
import CustomerInvoiceList from './components/CustomerPayment/CustomerInvoiceList';

//import './components/LandingPage_tagarage/LandingPage_tagaragecss.css';

/* ReactDOM.render(<LandingPageDigitalPrinter/>, document.getElementById('root'));
 */


if (localStorage.getItem('isLoggedIn')) {
	var login = CryptoJS.AES.decrypt(localStorage.getItem('isLoggedIn'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
	if (login == "true") {
		console.log("path ", window.location.pathname.toLowerCase());
		window.scrollTo(0, 0);
		var planName = CryptoJS.AES.decrypt(localStorage.getItem("PlanName"), "shinchanbaby").toString(CryptoJS.enc.Utf8);
		if (window.location.pathname.toLowerCase() === "/signup") {
			console.log("path ", window.location.pathname);
			var url_string = window.location.href;
			var newurl = '/';
			window.history.replaceState({}, document.title, newurl);

		}
		//	 alert("plantype"+planName);
		if (planName.toLowerCase() == "basic") {
			
			ReactDOM.render(
				<Router>
					<div >
						<Route exact path="/" component={GenericDashboardBasic} />
						<Route exact path="/feedBackForm*" component={feedBackForm} />
						<Route exact path="/CustomerInvoiceList*" component={CustomerInvoiceList} />
						<Route  path="/signup*" component={NewMenuBar} />
					</div>
				</Router>, document.getElementById('root'));
			registerServiceWorker();
		}
		else if (planName.toLowerCase() == "premium") {

			ReactDOM.render(
				<Router>
					<div >
						<Route exact path="/" component={GenericDashboardPremium} />
						<Route exact path="/feedBackForm*" component={feedBackForm} />
						<Route exact path="/CustomerInvoiceList*" component={CustomerInvoiceList} />
						<Route  path="/signup*" component={NewMenuBar} />
					</div>
				</Router>, document.getElementById('root'));
			registerServiceWorker();
		}
		else if (planName.toLowerCase() == "elite") {


			ReactDOM.render(
				<Router>
					<div >
						<Route exact path="/" component={NewMenuBar} />
						<Route exact path="/feedBackForm*" component={feedBackForm} />
						<Route exact path="/CustomerInvoiceList*" component={CustomerInvoiceList} />
						<Route  path="/signup*" component={NewMenuBar} />
					</div>
				</Router>, document.getElementById('root'));
			registerServiceWorker();
		}


	}
	else {
		window.scrollTo(0, 0);
		console.log("path ", window.location.pathname.toLowerCase());
		if (window.location.pathname.toLowerCase() === "/signup") {
			var url_string = window.location.href;
			var newurl = '/signup';
			window.history.replaceState({}, document.title, newurl);
			ReactDOM.render(
				<Router>
					<div >
						<Route path="/" component={SiteRegister} />
					</div>
				</Router>
				, document.getElementById("root"));
			registerServiceWorker();
		} else {
			ReactDOM.render(
				<Router>
					<div >

						<Route exact path="/" component={LandingPage_tagarage} />
						<Route exact path="/feedBackForm*" component={feedBackForm} />
						<Route exact path="/CustomerInvoiceList*" component={CustomerInvoiceList} />
						<Route  path="/signup*" component={LandingPage_tagarage} />
						{/*  <Route  path="/" component={LoginPage}/> 
	 */}
					</div>
				</Router>
				, document.getElementById("root"));

		}
	}

}
else {
	window.scrollTo(0, 0);
	console.log("path ", window.location.pathname.toLowerCase());
	if (window.location.pathname.toLowerCase() === "/signup") {
		var url_string = window.location.href;
		var newurl = '/signup';
		window.history.replaceState({}, document.title, newurl);
		ReactDOM.render(
			<Router>
				<div >
					<Route path="/" component={SiteRegister} />
				</div>
			</Router>
			, document.getElementById("root"));
		registerServiceWorker();
	} else {
		ReactDOM.render(
			<Router>
				<div >
					<Route exact path="/" component={LandingPage_tagarage} />
					<Route exact path="/feedBackForm*" component={feedBackForm} />
					<Route exact path="/CustomerInvoiceList*" component={CustomerInvoiceList} />
					<Route path="/signup*" component={LandingPage_tagarage} />
					{/* 	 <Route  path="/" component={LoginPage}/> 
	 */}	</div>
			</Router>
			, document.getElementById("root"));
	}

}

