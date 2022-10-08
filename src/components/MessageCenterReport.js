
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import './datepicker.css';
import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import {
    BrowserRouter as Router,
    Route,
    NavLink
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReportMenuPage from './ReportMenuPage';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert';
import MessageCenterReportDisplay from './MessageCenterReportDisplay';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import moment from 'moment';
import {Double_BackButtonComponent} from'./ServiceRegistration/ButtonComponent';
import './purchaseReportCss.css';

class MessageCenterReport extends Component {


    constructor(props) {
       
        var today = new Date();
        var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var year = today.getFullYear();
        var dateAdd = moment().subtract(7, 'd').toDate();
        var fromdate = dateAdd.getFullYear() + '-' + (dateAdd.getMonth() + 1) + '-' + dateAdd.getDate();
      
        super(props)
        this.state = {
            year: year,
            fromDate: fromdate,
            toDate: today1,
            companyId: companyId,
            companyName: companyName,

        }

    }
    componentDidMount() {
        $(".btn-default").css("background-color","#05a4b5");
        $(".btn-default").css("color","white");
        window.scrollTo(0, 0);

    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });

    }
    Submit() {
        if (this.state.fromDate != "" && this.state.toDate != "") {
            var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

            this.state.companyId = companyId;



            this.setState({
                companyId: this.state.companyId,

                fromDate: this.state.fromDate,
                toDate: this.state.toDate,

            });
            var self = this;
         
            // alert("JSON"+JSON.stringify(this.state));
            $.ajax({
                type: 'POST',
                data: JSON.stringify({
                    companyId: this.state.companyId,

                    fromDate: this.state.fromDate,
                    toDate: this.state.toDate,
                }),

                url: " http://15.206.129.105:8080/ThroughBooksCOAPI/MessageCenter/MessageCenterReport",
                contentType: "application/json",
                dataType: 'json',
                async: false,
                success: function (data, textStatus, jqXHR) {
             
                    ReactDOM.render(
                        <Router>
                            <div>

                                <Route path="/" component={() => <MessageCenterReportDisplay data={data} fromDate={self.state.fromDate} toDate={self.state.toDate} />} />


                            </div>
                        </Router>,
                        document.getElementById('contentRender'));
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


                },
            });

        } else {

          
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Kindly Select Dates', 
                showConfirmButton: false,
                timer: 2000
              })

        }
    }

    componentDidMount() {
        var self = this;
        $('#toDate').datepicker({
            onSelect: function (date) {
                var dt = new Date(date);
                dt.setDate(dt.getDate() - 1);
                $("#fromDate").datepicker("option", "maxDate", dt);
                self.setState({
                    toDate: date,
                });

            },
            dateFormat: 'yy-mm-dd',
            minDate: '-3M',
            maxDate: 'M',
            numberOfMonths: 1
        });
        $('#fromDate').datepicker({
            onSelect: function (date) {
                var dt = new Date(date);
                dt.setDate(dt.getDate() + 1);
                $("#toDate").datepicker("option", "minDate", dt);
                self.setState({
                    fromDate: date,
                });
            },
            dateFormat: 'yy-mm-dd',
            minDate: '-3M',
            maxDate: 'M',
            numberOfMonths: 1
        });

    }

    BackbtnFunc() {
        var planName = CryptoJS.AES.decrypt(localStorage.getItem("PlanName"),"shinchanbaby").toString(CryptoJS.enc.Utf8);
      
      //	 alert("plantype"+planName);
       if(planName.toLowerCase() =="basic"){
       
           ReactDOM.render(
               <Router>
                   <div >
                       <Route exact path="/" component={ReportMenuPageBasic} />
                   
                       </div>
               </Router>, document.getElementById('contentRender'));
           registerServiceWorker();
       }
       else if(planName.toLowerCase() =="premium"){
        
           ReactDOM.render(
               <Router>
                   <div >			
                       <Route exact path="/" component={ReportMenuPagePremium} />
                    
                   </div>
               </Router>,
                  document.getElementById('contentRender'));
           registerServiceWorker();
       }
      else if(planName.toLowerCase() =="elite"){
    
      
       ReactDOM.render(
           <Router>
               <div >	
                   <Route exact path="/" component={ReportMenuPage} />
                 
                   </div>
           </Router>, 
           document.getElementById('contentRender'));
       registerServiceWorker();
      }
      
      }
    render() {


        return (

            <div className="container">
<div className="">
    <div className="">
    <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
                    </div>


                    {/*    <div class="">
                        <button type="button" id="print" class="btn btn-default "
                            onClick={() => this.printdiv('printarea')} >
                            <i class="fa fa-print" aria-hidden="true"
                                style={{ fontSize: "17px", border: "none" }}> Print</i></button>
                    </div> */}
                    <div className="inv_HeaderCls">
                    <h3>Message Center Report</h3>
                </div>
                </div>

                


                <div class="" id="" >

                    <div class="from_To_clsDiv">
                        <div class="row">
                        <div class="col-md-4">
                            <label class="" for="fromDate">From<span style={{ color: "red" }}>*</span></label>
                            <div class="">
                                <input
                                    className="dateToField form-control"
                                    
                                    type="text"
                                    value={this.state.fromDate}
                                    id="fromDate" name="fromDate"
                                    onChange={this.handleUserInput} />


                            </div>
                        </div>
                        <div class="col-md-4">
                            <label class="" for="toDate">To<span style={{ color: "red" }}>*</span></label>
                            <div class="">

                                <input
                                    className="dateToField form-control"
                                    
                                    type="text"
                                    value={this.state.toDate}
                                    id="toDate" name="toDate"
                                    onChange={this.handleUserInput} />
                            </div>
                        </div>
                        <div class="col-md-4">
                        <label class=""></label>
                        <div class="">
                            <button
                                type="button"
                                onClick={() => this.Submit()}
                                className="btn btn-default rpt_submitbtn"
                            >Submit</button></div>
                    </div>
                    </div>
                    </div>
                    
                  


                </div>


{/* <div class="row" style={{marginTop:"13px"}}>
                    <div class="col-sm-3 ">
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
                    <div class="col-sm-9">
                    <div class="card-header">
                          <h3 id="companyHeader" style={{marginLeft:"150px"}}> {this.state.companyName}</h3>
                  
                  <h4  id="reportHeader" style={{marginLeft:"130px"}}>Message Center Report</h4>
             
                    
                      </div>
                    </div> 
                  </div>   */} 

             {/*    <div class="jumbotron">
                  
        
                    <form class="form-horizontal form-bordered" name="submissions">
                <div class="form-group">
                  <label class="control-label col-sm-2 font-weight-bold" for="fromDate">From<span style={{ color: "red" }}>*</span></label>
                  <div class="col-sm-5">
                  <input
             className="dateToField"             
              style={{ width: '50%' }}
              type="text"
              value={this.state.fromDate}
              id="fromDate" name="fromDate"
              onChange={this.handleUserInput} />


                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-sm-2 font-weight-bold" for="toDate">To<span style={{ color: "red" }}>*</span></label>
                  <div class="col-sm-5">

                  <input
             className="dateToField"             
              style={{ width: '50%' }}
              type="text"
              value={this.state.toDate}
              id="toDate" name="toDate"
              onChange={this.handleUserInput} />
                  </div></div>


                  <div class="form-group">
                  <label class="control-label col-sm-2 font-weight-bold"></label>
                  <div class="col-sm-5">    
        <button style={{   backgroundColor: "#05a4b5",color:"white"}}
          type="button"
          onClick={() => this.Submit()}
          className="btn btn-default"
        >Submit</button></div>
                  </div>
              </form>
                </div> */}

            


            </div>
        );
    }

}
export default MessageCenterReport;

