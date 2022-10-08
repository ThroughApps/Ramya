import React, { Component } from 'react';

import $ from 'jquery';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import ReportMenuPage from './ReportMenuPage';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'
import registerServiceWorker from './registerServiceWorker';
import MessageCenterReport from './MessageCenterReport';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import * as SiIcons from 'react-icons/si';
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
    GetCurrencies,SetCurrentPage } from './ConstSiteFunction';


class MessageReportDisplay extends Component {

    constructor(data) {
        super(data)

        var today = new Date();
        today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            date: today,
            fromDate:data.fromDate,
            toDate:data.toDate,
            smsCount:'',
            data:[],
            columns:[],

        };
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
        );
    }

    componentDidMount() {
        SetCurrentPage("MessageCenterReportDisplay");  
       
        window.scrollTo(0, 0);
        var self=this;
  $(".btn-default").css("background-color","#05a4b5");
$(".btn-default").css("color","white");
      self.state.data=[];
      self.state.columns=[];

                if (this.props.data.messageCenterReportList.length != 0) {

                    var ivalue=0;
                    $.each(this.props.data.messageCenterReportList, function (i, item) {
                     
                        self.state.data[i] = {
                            "Login Id":item.superiorId,
                            "Sent Type":  item.type,
                            "Message":item.messageSent,
                            "To":item.sendTo,
                            "Date": item.date,
                            "Time":item.time,
                            };  
                            ivalue=i;


                    });
                   
                  self.state.columns=self.GetColumns();
                  self.setState({
                      data:self.state.data,
                      columns:self.state.columns
                  })
                }
              

            
            ivalue=Number(ivalue)+Number(1)

            self.state.data[ivalue] = {
                "Login Id":"",
                "Sent Type":"",
                "Message":"",
                "To":"",
                "Date":"",
                "Time":"",
                };  

                ivalue=Number(ivalue)+Number(3);
              self.state.data[ivalue] = {
                "Login Id":"",
                "Sent Type":"",
                "Message":<div><span style={{fontWeight:"600"}}>TotalMsgCount</span></div>,
                "To":<div><span style={{fontWeight:"600"}}>{this.props.data.msgCount}</span></div>,
                "Date":"",
                "Time":"",
                };  

      
       
 

    }

    GetColumns(){

        return Object.keys(this.state.data[0]).map(key => {
               
            return {
              Header: key,
              accessor: key,
       
          };
          
        });
      }

    BackbtnFunc() {
        ReactDOM.render(
            <Router>
                <div>
       
                    <Route path="/" component={MessageCenterReport} />
     


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }


    render() {

        return (

            <div className="container">

                 <div className="repot_headercls">
                    <div class=" ">
                        <BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
                    </div>

                    <div class="">
                       {/*  <button type="button" id="print" class="btn btn-default btn_rpt_print"
                            onClick={() => this.printdiv('printarea')} >
                            <i class="fa fa-print" aria-hidden="true"
                                style={{ fontSize: "17px", border: "none" }}> Print</i></button> */}
                    </div>
                </div>

           
                    <div class="report_card_header">
                        {/* <h3 id="companyHeader"> {this.state.companyName}</h3> */}
                        <h3 id="reportHeader" >Message Center Report</h3>
               <h4 className="centerAlign" style={{ textAlign: "center" }}>From: {this.state.fromDate} </h4>
        <h4 className="centerAlign" style={{ textAlign: "center" }}>To: {this.state.toDate} </h4>
      
                    </div>

          
     {/*             <div class="row" style={{marginTop:"13px"}}>
          <div class="col-sm-2 ">
            <ul class="previous disabled" id="backbutton"
              style={{
                backgroundColor: "#05a4b5",color:"white",
                float: "none",
                display: "inline-block",
                marginLeft: "5px",
                borderRadius: "5px",
                padding: "3px 7px 3px 7px"
              }}>
              <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></ul>

          </div> 
          <div class="col-sm-10 ">
                   
                <h3 className="centerAlign" style={{ textAlign: "center" }}>Message Center Report</h3>
               <h4 className="centerAlign" style={{ textAlign: "center" }}>From: {this.state.fromDate} </h4>
        <h4 className="centerAlign" style={{ textAlign: "center" }}>To: {this.state.toDate} </h4>
      
                    </div> 


          </div> */}
             

             

                            
            <ReactTable
              data={this.state.data}
              columns={this.state.columns}
              noDataText="No Data Available"
              filterable={true}
              defaultPageSize={10}
              className="-striped -highlight reactTable_cls"
              defaultFilterMethod={(filter, row, column) => {
                const id = filter.pivotId || filter.id;
                return row[id] !== undefined
                  ? String(row[id])
                      .toLowerCase()
                      .indexOf(filter.value.toLowerCase()) !== -1
                  : true;
              }}
              showPaginationTop={true}
              showPaginationBottom={false}
              getTdProps={this.onRowClick}
          
            />
       
      </div>
            
        );
    }

}

export default MessageReportDisplay;


