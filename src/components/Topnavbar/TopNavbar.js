import React, { Component } from 'react'
import './GenericDashboardCSS.css'

export default class GenericDashboard extends Component {

    render() {
        return (
            <div>
                <div className="main_header">
                <div className="header_sm_device">
              
                <a href="index2.html" className="logo header_sm_device_logo">
                    {/* mini logo for sidebar mini 50x50 pixels 
                    <span className="logo-mini"><b>A</b>LT</span>*/}
                    {/* logo for regular state and mobile devices */}
                    <span className="logo-lg"><b>Admin</b>LTE</span>
                </a>
                </div>
                    
                <nav class="navbar navbar-inverse" style={{backgroundColor:"#00a6a4",borderColor:"#00a6a4"}}>
                    <div class="container-fluid">
                        <div class="navbar-header" style={{ position: " absolute" }}>
                            <a class="navbar-brand" href="#">WebSiteName</a>
                        </div>

                        <ul class="nav navbar-nav navbar-right pull-right" style={{ display: "flex" }}>
                            <li><a href="#"><span class="glyphicon glyphicon-user"></span> &nbsp;</a></li>
                            <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> &nbsp;</a></li>
                        </ul>
                    </div>
                </nav>
                </div>
              </div>
        )
    }
}