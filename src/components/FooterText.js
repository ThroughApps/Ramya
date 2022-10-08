import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, a } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';



 var divStyle={
	/* backgroundColor: '#232f3c',
	backgroundColor:"rgb(73, 166, 76)",
	 */
	backgroundColor:"rgb(38,66,92)",
    textAlign: 'center',
    padding: '0px 0px',
	color: 'white',
	marginBottom:'-6px',
 }

class FooterText extends Component {


	componentDidMount() {
		SetCurrentPage("FooterText");

		/* if (localStorage.getItem('isLoggedIn')) {
			var login = CryptoJS.AES.decrypt(localStorage.getItem('isLoggedIn'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
			if (login == "true") {
				this.interval = setInterval(() => this.Refresh(), 200000);
				this.interval = setInterval(() => this.offlineData(), 2000);
			}
		} */
	}
	
	/* ExportFunc() {
		ReactDOM.render(
			<Router>
				<div>
					

					<Route path="/" component={ExcelExport} />
				</div>
			</Router>,
			document.getElementById('contentRender'));

	} */

	render() {
		return (
			<div>
				<div style={divStyle} className="footer navbar-fixed-bottom">
					<h5 id="footerh5" style={{fontSize:"2.75vw",fontFamily:"Lucida Sans Unicode",}}>DigitalPrintApp <span id="footerspan" style={{fontSize:"2.25vw"}}>Powered by ThroughApps </span></h5>
					
						
				</div>
			</div>

		);
	}

}


export default FooterText;

