import React from 'react'
import './Footercss.css'

var divStyle={
	/* backgroundColor: '#232f3c',
	backgroundColor:"rgb(73, 166, 76) rgb(32, 127, 108) ",
	 */
	backgroundColor:"rgb(33 41 45)",
    textAlign: 'center',
    padding: '0px 0px',
	color: 'white',
	marginBottom:'-6px',
 }
export const Footer = () => {
    return (
        <div>
            <div  className="footer fo_btm navbar-fixed-bottom">
					<h5 id="footerh5" className="footerh5" >
                        <span  className="footerspan" id="footerspan" >Powered by ThroughApps © All Rights Reserved. 
                         </span></h5>
            </div>
        </div>
    )
}