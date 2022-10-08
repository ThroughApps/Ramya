import logo from './logo.svg';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import './helpFuncCss.css';

import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';


class Help extends Component {
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
 
        return (
        
<div class="container">
<div className="">
              <BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
            </div>

<h2>Modules Of Merchandise</h2>
<div class="panel-group" id="accordion1">
          

{/*ERP MASTER MODULE */}
       
       

 <div class="panel panel-default" >
                <div class="panel-heading1" >
                    <h6 class="panel-title">
                        <a data-toggle="collapse"  id="erpmaster1" style={{background:"none",color:"black"}} data-parent="#accordion1" href="#erpmaster">Erp Master
                        </a>
                    </h6>
                </div>
                <div id="erpmaster" class="panel-collapse collapse collapseerpmaster">
                    <div class="panel-body">

                        <div class="panel-group" id="accordion2">
                            <div class="panel panel-default">
                                <div class="panel-heading1" >
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"  id="erpmaster1" style={{background:"none",color:"black"}}  data-parent="#accordion2" href="#customer">Customer
                                        </a>
                                    </h6>
                                </div>
                                <div id="customer" class="panel-collapse collapse collapsecustomer">
                                    <div class="panel-body"> 
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>Add Customer :</h6>
                                <div class="datadiv" id="datadivid">
                                    <div style={{ fontSize: "18px" }}>Add customer allows you to add new customers of your organization.</div>
            <br/>
         <h2></h2>
            <b style={{ fontSize: "18px" }}>To add new customer,kindly follow the below steps:</b>
            <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
            <div style={{ fontSize: "18px" }}>2.Click on ErpMaster</div>
            <div style={{ fontSize: "18px" }}>3.Click on Add Customer</div>
            <div style={{ fontSize: "18px" }}>4.Fill in the details required (Mandatory Fields Must Be 
            Filled For Successful addition of the customer)</div>
            <div style={{ fontSize: "18px" }}>5.Once Details are filled Click on SUBMIT</div>
            <div style={{ fontSize: "18px" }}>6.Customer Added Message Will Be Displayed.</div>
            <div style={{ fontSize: "18px" }}>7.Click on CLEAR to empty all the filled fields</div>
            </div>
            </div>
        
        <br/>

<div style={{     padding: "15px"  }}>
         <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>List Of Customer :</h6>
         <div style={{ fontSize: "18px" }}>List Of Customer feature allows you to view the entire customers 
                  associated with your organization.The Customer details could be 
                  edited,viewed and deleted by clicking upon the corresponding buttons.
                  You could also download the Entire Customer list in excel on clicking 
                  upon Download Customer List.</div>
            <br/>
            
              <b style={{ fontSize: "18px" }}>To view customers,kindly follow the steps below:</b>
              <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
              <div style={{ fontSize: "18px" }}>2.Click on ErpMaster</div>
              <div style={{ fontSize: "18px" }}>3.Click on List Of Customer</div>
              <div style={{ fontSize: "18px" }}>4.Click View for the customer whose entire details are required to viewed.</div>
              <div style={{ fontSize: "18px" }}>5.The realavent details of the opted customer will be displayed.</div>
              <br/>
              <b style={{ fontSize: "18px" }}>To Edit Customer,kindly follow the steps below: </b>
              <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
              <div style={{ fontSize: "18px" }}>2.Click on ErpMaster</div>
              <div style={{ fontSize: "18px" }}>3.Click on List Of Customer</div>
              <div style={{ fontSize: "18px" }}>4.Click Edit for the customer whose details are required to edited.</div>
              <div style={{ fontSize: "18px" }}>5.Update the required fields</div>
              <div style={{ fontSize: "18px" }}>6.Click UPDATE</div>
              <div style={{ fontSize: "18px" }}>7.Updated Customer Details message will be displayed.</div>
              <br/>
              <b style={{ fontSize: "18px" }}>To Delete Customer,kindly follow the steps below:</b>
              <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
              <div style={{ fontSize: "18px" }}>2.Click on ErpMaster</div>
              <div style={{ fontSize: "18px" }}>3.Click on List Of Customer</div>
              <div style={{ fontSize: "18px" }}>4.Click Delete for the customer whose details are required to deleted.</div>
              <div style={{ fontSize: "18px" }}>5.Click Confirm in the message to proceed with 
              deleting the selected customer.</div>
              <div style={{ fontSize: "18px" }}>6.Click Cancel in the message to prevent the customer
              from being deleted.</div>
</div>
            
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading1" >
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"   id="erpmaster1" style={{background:"none",color:"black"}}  data-parent="#accordion2" href="#vendor">Vendor
                                        </a>
                                    </h6>
                                </div>
                                <div id="vendor" class="panel-collapse collapse collapsevendor">
                                    <div class="collapseThreeTwo">   
                                    <div style={{     padding: "15px"  }}>
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>Add Vendor :</h6>
                                    <div style={{ fontSize: "18px" }}>Add vendors allows you to add new customers of your organization</div>
            <br/>
            
            <b style={{ fontSize: "18px" }}>To add new vendor,kindly follow the below steps:</b>
            <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
            <div style={{ fontSize: "18px" }}>2.Click on ErpMaster</div>
            <div style={{ fontSize: "18px" }}>3.Click on Add Vendor</div>
            <div style={{ fontSize: "18px" }}>4.Fill in the details required (Mandatory Fields Must Be 
            Filled For Successful addition of the vendor)</div>
            <div style={{ fontSize: "18px" }}>5.Once Details are filled Click on SUBMIT</div>
            <div style={{ fontSize: "18px" }}>6.Vendor Added Message Will Be Displayed.</div>
            <div style={{ fontSize: "18px" }}>7.Click on CLEAR to empty all the filled fields</div>

            <br/>
          
            <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>List Of Vendor :</h6>
          
            <div style={{ fontSize: "18px" }}>List Of Vendor feature allows you to view the entire vendors 
                  associated with your organization.The Vendor details could be 
                  edited,viewed and deleted by clicking upon the corresponding buttons.
                  You could also download the Entire Vendor list in excel on clicking 
                  upon Download Vendor List.</div>
            <br/>
            
              <b style={{ fontSize: "18px" }}>To view vendor,kindly follow the steps below:</b>
              <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
              <div style={{ fontSize: "18px" }}>2.Click on ErpMaster</div>
              <div style={{ fontSize: "18px" }}>3.Click on List Of Vendor</div>
              <div style={{ fontSize: "18px" }}>4.Click View for the vendor whose entire details are required to viewed.</div>
              <div style={{ fontSize: "18px" }}>5.The realavent details of the opted vendor will be displayed.</div>

              <br/>
              <b style={{ fontSize: "18px" }}>To Edit vendor,kindly follow the steps below: </b>
              <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
              <div style={{ fontSize: "18px" }}>2.Click on ErpMaster</div>
              <div style={{ fontSize: "18px" }}>3.Click on List Of Vendor</div>
              <div style={{ fontSize: "18px" }}>4.Click Edit for the vendor whose details are required to Edited.</div>
              <div style={{ fontSize: "18px" }}>5.Update the required fields</div>
              <div style={{ fontSize: "18px" }}>6.Click UPDATE</div>
              <div style={{ fontSize: "18px" }}>7.Updated Vendor Details message will be displayed.</div>
              <br/>
              <b style={{ fontSize: "18px" }}>To Delete vendor,kindly follow the steps below:</b>
              <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
              <div style={{ fontSize: "18px" }}>2.Click on ErpMaster</div>
              <div style={{ fontSize: "18px" }}>3.Click on List Of Vendor</div>
              <div style={{ fontSize: "18px" }}>4.Click Delete for the vendor whose details are required to Deleted.</div>
              <div style={{ fontSize: "18px" }}>5.Click Confirm in the message to proceed with 
              deleting the selected vendor.</div>
              <div style={{ fontSize: "18px" }}>6.Click Cancel in the message to prevent the vendor
              from being deleted.</div>
              </div>
          </div>
                                </div>
                            </div>
                       
                        <div class="panel panel-default">
                                <div class="panel-heading1" >
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"   id="erpmaster1" style={{background:"none",color:"black"}}  data-parent="#accordion2" href="#product">Product
                                        </a>
                                    </h6>
                                </div>
                                <div id="product" class="panel-collapse collapse collapseproduct">
                                    <div class="collapseThreeTwo">  
                                    <div style={{     padding: "15px"  }}>
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>Add Product :</h6>
                                    <div style={{ fontSize: "18px" }}>Add product allows you to add new products that are being offered by your organization</div>
            <br/>
            
            <b style={{ fontSize: "18px" }}>To add new product,kindly follow the below steps:</b>
            <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
            <div style={{ fontSize: "18px" }}>2.Click on ErpMaster</div>
            <div style={{ fontSize: "18px" }}>3.Click on Add Product</div>
            <div style={{ fontSize: "18px" }}>4.Fill in the details required (Mandatory Fields Must Be 
            Filled For Successful addition of the product)</div>
            <div style={{ fontSize: "18px" }}>5.Once Details are filled Click on SUBMIT</div>
            <div style={{ fontSize: "18px" }}>6.Product Added Message Will Be Displayed.</div>
            <div style={{ fontSize: "18px" }}>7.Click on CLEAR to empty all the filled fields</div>
          
          <br/>
          <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>List Of Product :</h6>

         <div style={{ fontSize: "18px" }}>List Of Product feature allows you to view the entire products 
                  that are offered and purchased by your organization.The offered and purchased Product details 
                  could be edited,viewed and deleted by clicking upon the corresponding buttons.
                  You could also download the Entire Product list in excel on clicking 
                  upon Download Sale Product.</div>
            <br/>
            
              <b style={{ fontSize: "18px" }}>To view product,kindly follow the steps below:</b>
              <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
              <div style={{ fontSize: "18px" }}>2.Click on ErpMaster</div>
              <div style={{ fontSize: "18px" }}>3.Click on List Of Product</div>
              <div style={{ fontSize: "18px" }}>4.Select the required report to be viewed sale report or purchase report</div>
              <div style={{ fontSize: "18px" }}>5.Click View for the product whose entire details are required to viewed.</div>
              <div style={{ fontSize: "18px" }}>6.The relevant details of the opted product will be displayed.</div>

              <br/>
              <b style={{ fontSize: "18px" }}>To Edit product,kindly follow the steps below: </b>
              <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
              <div style={{ fontSize: "18px" }}>2.Click on ErpMaster</div>
              <div style={{ fontSize: "18px" }}>3.Click on List Of Product</div>
              <div style={{ fontSize: "18px" }}>4.Select the required report to be viewed sale report or purchase report</div>
              <div style={{ fontSize: "18px" }}>5.Click Edit for the product whose details are required to Edited.</div>
              <div style={{ fontSize: "18px" }}>6.Update the required fields</div>
              <div style={{ fontSize: "18px" }}>7.Click UPDATE</div>
              <div style={{ fontSize: "18px" }}>8.Updated Product Details message will be displayed.</div>
              <br/>
              <b style={{ fontSize: "18px" }}>To Delete product,kindly follow the steps below:</b>
              <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
              <div style={{ fontSize: "18px" }}>2.Click on ErpMaster</div>
              <div style={{ fontSize: "18px" }}>3.Click on List Of Product</div>
              <div style={{ fontSize: "18px" }}>4.Select the required report to be deleted sale report or purchase report</div>
              <div style={{ fontSize: "18px" }}>5.Click Delete for the product whose details are required to Deleted.</div>
              <div style={{ fontSize: "18px" }}>6.Click Confirm in the message to proceed with 
              deleting the selected Product.</div>
              <div style={{ fontSize: "18px" }}>7.Click Cancel in the message to prevent the Product
              from being deleted.</div>
          </div>
          </div>
                                </div>
                            </div>
                        </div>
                        

                   </div>
                </div>

                </div>

       

{/*SALE MODULE */}
      
      

  <div class="panel panel-default">
                <div class="panel-heading1" >
                    <h6 class="panel-title">
                        <a data-toggle="collapse"  id="erpmaster1" style={{background:"none",color:"black"}} data-parent="#accordion1" href="#salemenu">Sale
                        </a>
                    </h6>
                </div>
                <div id="salemenu" class="panel-collapse collapse collapsesalemenu">
                    <div class="panel-body">

                        <div class="panel-group" id="accordion2">
                            <div class="panel panel-default">
                                <div class="panel-heading1" >
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"  id="erpmaster1"  style={{background:"none",color:"black"}}  data-parent="#accordion2" href="#sale">Sale
                                        </a>
                                    </h6>
                                </div>
                                <div id="sale" class="panel-collapse collapse collapsesale">
                                <div class="panel-body">
                                    <div style={{ fontSize: "18px" }}>Sale is nothing but exchange of goods for money.
          Generally those sales are need to be recorded for refernce and they where recorded via
           papers as document which again need to be searched a lot when it comes to the 
           work of any reference or for auditing.
           Here after the work of recording the sales in an organization and Viewing those 
           are made simple.</div>
           <br/>
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>Sale Order :</h6>
                                    <div class="datadiv" id="datadivid">
                                    <div style={{ fontSize: "18px" }}>You can record the sale details of your organization with just few clicks.</div>
           <br/>
           <b style={{ fontSize: "18px" }}>To record a sale,kindly follow the steps below:</b>
           <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
           <div style={{ fontSize: "18px" }}>2.Click on Sale</div>
           <div style={{ fontSize: "18px" }}>3.Click on Sale Order</div>
           <div style={{ fontSize: "18px" }}>4.Enter the all required fields</div>
           <div style={{ fontSize: "18px" }}>5.click Add To Cart</div>
           <div style={{ fontSize: "18px" }}>6.Once you are done with adding the products check for the summary details</div>
           <div style={{ fontSize: "18px" }}>7.Once the summary details are checked enable the SMS / Email option 
            for getting copy of the currently generated Invoice.</div>
           <div style={{ fontSize: "18px" }}>8.Once you are done with the sale invoice click Save Invoice</div>
           <div style={{ fontSize: "18px" }}>9.Invoice saved message will be displayed</div>
           <div style={{ fontSize: "18px" }}>10.Click Cancel from preventing the Invoice being saved</div>

                                    <br/>
                                    <div style={{     padding: "15px"  }}>
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>Sale Invoice :</h6>
                                    <div style={{ fontSize: "18px" }}>The sale invoice displays list of invoices based on month 
                and year selected selected by the user.The displayed invoice list
                could be downloaded by clicking Download Invoice List</div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view list of invoice,kindly follow the steps below:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Sale</div>
                <div style={{ fontSize: "18px" }}>3.Click on Sale invoice</div>
                <div style={{ fontSize: "18px" }}>4.Select the month and year</div>
                <div style={{ fontSize: "18px" }}>5.The invoice list will be displayed</div>
                <br/>

                <b style={{ fontSize: "18px" }}>To delete the invoice,kindly follow the seps below:</b>
                 <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Sale</div>
                <div style={{ fontSize: "18px" }}>3.Click on Sale Invoice</div>
                <div style={{ fontSize: "18px" }}>4.select the month and year</div>
                <div style={{ fontSize: "18px" }}>5.List of invoices will be displayed</div>
                <div style={{ fontSize: "18px" }}>6.Click Delete for the invoice whose details are required to Deleted.</div>
                <div style={{ fontSize: "18px" }}>7.Click Confirm in the message to proceed with 
                deleting the selected invoice.</div>
                <div style={{ fontSize: "18px" }}>8.Click Cancel in the message to prevent the invoice
                from being deleted.</div>


                <br/>
                <b style={{ fontSize: "18px" }}>To view an invoice in detail,kindly follow the steps below:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Sale</div>
                <div style={{ fontSize: "18px" }}>3.Click on Sale Invoice</div>
                <div style={{ fontSize: "18px" }}>4.select the month and year</div>
                <div style={{ fontSize: "18px" }}>5.List of invoices will be displayed</div>
                <div style={{ fontSize: "18px" }}>6.Click View for the invoice whose entire details are required to viewed.</div>
                <div style={{ fontSize: "18px" }}>7.The relevant details of the opted invoice will be displayed.</div>

                <br/>
                <b style={{ fontSize: "18px" }}>To pay an invoice,kindly follow the steps below:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Sale</div>
                <div style={{ fontSize: "18px" }}>3.Click on Sale Invoice</div>
                <div style={{ fontSize: "18px" }}>4.select the month and year</div>
                <div style={{ fontSize: "18px" }}>5.List of invoices will be displayed</div>
                <div style={{ fontSize: "18px" }}>6.Click Pay for the invoice whose details are required to Edited.</div>
                <div style={{ fontSize: "18px" }}>7.Enter the amount being payed at this installment and click Submit</div>
                <div style={{ fontSize: "18px" }}>8.Updated payment details will be displayed</div>
                <div style={{ fontSize: "18px" }}>9.Click Cancel to undo the installment payment</div>

                <br/>
                <b style={{ fontSize: "18px" }}>To edit invoice,kindly follow the steps below:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Sale</div>
                <div style={{ fontSize: "18px" }}>3.Click on Sale Invoice</div>
                <div style={{ fontSize: "18px" }}>4.select the month and year</div>
                <div style={{ fontSize: "18px" }}>5.List of invoices will be displayed</div>
                <div style={{ fontSize: "18px" }}>6.Click Edit for the invoice whose details are required to Edited.</div>
                <div style={{ fontSize: "18px" }}>7.Add the products to be added to the invoice </div>
                <div style={{ fontSize: "18px" }}>8.Once products are entered click add cart</div>
                <div style={{ fontSize: "18px" }}>9.Once the products are added to invoice</div>
                <div style={{ fontSize: "18px" }}>10.Check for the summary</div>
                <div style={{ fontSize: "18px" }}>11.Once summary data's are checked Click Save Invoice </div>
                <div style={{ fontSize: "18px" }}>12.Click cancel to prevent the invoice from being saved</div>

          </div>
           </div></div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading1" >
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"   id="erpmaster1" style={{background:"none",color:"black"}}  data-parent="#accordion2" href="#estimatemenu">Estimate
                                        </a>
                                    </h6>
                                </div>
                                <div id="estimatemenu" class="panel-collapse collapse collapseestimatemenu">
                                    <div class="collapseThreeTwo"> 
                                    <div style={{padding: "15px" }}>
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>Estimate:</h6>
                                    <div style={{ fontSize: "18px" }}>Creating sale invoices without GST is made easy using Estimate</div>
            <br/>
            <b style={{ fontSize: "18px" }}>To create estimate invoice,kindly follow the steps below:</b>
            <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
           <div style={{ fontSize: "18px" }}>2.Click on Sale</div>
           <div style={{ fontSize: "18px" }}>3.Click on Estimate</div>
           <div style={{ fontSize: "18px" }}>4.Enter the all required fields</div>
           <div style={{ fontSize: "18px" }}>5.click Add To Cart</div>
           <div style={{ fontSize: "18px" }}>6.Once you are done with adding the products check for the summary details</div>
           <div style={{ fontSize: "18px" }}>7.Once the summary details are checked enable the SMS / Email option 
            for getting copy of the currently generated Invoice.</div>
           <div style={{ fontSize: "18px" }}>8.Once you are done with the estimate invoice click Save Invoice</div>
           <div style={{ fontSize: "18px" }}>9.Invoice saved message will be displayed</div>
           <div style={{ fontSize: "18px" }}>10.Click Cancel from preventing the Invoice being saved</div>
                                    <br/>
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>Estimate Invoice :</h6>
                                    <div style={{ fontSize: "18px" }}>The estimate invoice displays list of invoices based on month 
                and year selected selected by the user.The displayed invoice list
                could be downloaded by clicking Download Invoice List</div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view list of invoice,kindly follow the steps below:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Sale</div>
                <div style={{ fontSize: "18px" }}>3.Click on Estimate invoice</div>
                <div style={{ fontSize: "18px" }}>4.Select the month and year</div>
                <div style={{ fontSize: "18px" }}>5.The invoice list will be displayed</div>
                <br/>

                <b style={{ fontSize: "18px" }}>To delete the invoice,kindly follow the seps below:</b>
                 <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Sale</div>
                <div style={{ fontSize: "18px" }}>3.Click on Estimate Invoice</div>
                <div style={{ fontSize: "18px" }}>4.select the month and year</div>
                <div style={{ fontSize: "18px" }}>5.List of invoices will be displayed</div>
                <div style={{ fontSize: "18px" }}>6.Click Delete for the invoice whose details are required to Deleted.</div>
                <div style={{ fontSize: "18px" }}>7.Click Confirm in the message to proceed with 
                deleting the selected invoice.</div>
                <div style={{ fontSize: "18px" }}>8.Click Cancel in the message to prevent the invoice
                from being deleted.</div>


                <br/>
                <b style={{ fontSize: "18px" }}>To view an invoice in detail,kindly follow the steps below:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Sale</div>
                <div style={{ fontSize: "18px" }}>3.Click on Estimate Invoice</div>
                <div style={{ fontSize: "18px" }}>4.select the month and year</div>
                <div style={{ fontSize: "18px" }}>5.List of invoices will be displayed</div>
                <div style={{ fontSize: "18px" }}>6.Click View for the invoice whose entire details are required to viewed.</div>
                <div style={{ fontSize: "18px" }}>7.The relevant details of the opted invoice will be displayed.</div>

                <br/>
                <b style={{ fontSize: "18px" }}>To pay an invoice,kindly follow the steps below:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Sale</div>
                <div style={{ fontSize: "18px" }}>3.Click on Estimate Invoice</div>
                <div style={{ fontSize: "18px" }}>4.select the month and year</div>
                <div style={{ fontSize: "18px" }}>5.List of invoices will be displayed</div>
                <div style={{ fontSize: "18px" }}>6.Click Pay for the invoice whose details are required to Edited.</div>
                <div style={{ fontSize: "18px" }}>7.Enter the amount being payed at this installment and click Submit</div>
                <div style={{ fontSize: "18px" }}>8.Updated payment details will be displayed</div>
                <div style={{ fontSize: "18px" }}>9.Click Cancel to undo the installment payment</div>

                <br/>
                <b style={{ fontSize: "18px" }}>To edit invoice,kindly follow the steps below:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Sale</div>
                <div style={{ fontSize: "18px" }}>3.Click on Estimate Invoice</div>
                <div style={{ fontSize: "18px" }}>4.select the month and year</div>
                <div style={{ fontSize: "18px" }}>5.List of invoices will be displayed</div>
                <div style={{ fontSize: "18px" }}>6.Click Edit for the invoice whose details are required to Edited.</div>
                <div style={{ fontSize: "18px" }}>7.Add the products to be added to the invoice </div>
                <div style={{ fontSize: "18px" }}>8.Once products are entered click add cart</div>
                <div style={{ fontSize: "18px" }}>9.Once the products are added to invoice</div>
                <div style={{ fontSize: "18px" }}>10.Check for the summary</div>
                <div style={{ fontSize: "18px" }}>11.Once summary data's are checked Click Save Invoice </div>
                <div style={{ fontSize: "18px" }}>12.Click cancel to prevent the invoice from being saved</div>
   </div>
         </div>  </div>
                            </div>
                        </div>
                      </div>
                         </div>
                </div>

                                       
{/*PURCHASE MODULE */}
        
      <div class="panel panel-default">
                <div class="panel-heading1">
                    <h6 class="panel-title">
                        <a data-toggle="collapse"   id="erpmaster1" style={{background:"none",color:"black"}} data-parent="#accordion1" href="#purchase">Purchase
                        </a>
                    </h6>
                </div>
                <div id="purchase" class="panel-collapse collapse collapsepurchase">
                    <div class="panel-body">

                        <div class="panel-group" id="accordion2">
                            <div class="panel panel-default">
                                <div class="panel-heading1">
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"   id="erpmaster1" style={{background:"none",color:"black"}}  data-parent="#accordion2" href="#purchaseorder">Purchase Order
                                        </a>
                                    </h6>
                                </div>
                                <div id="purchaseorder" class="panel-collapse collapse collapsepurchaseorder">
                                <div class="panel-body">
             <div style={{ fontSize: "18px" }}>A bill presented to a buyer by a seller or service 
               provider for payment within a stated time frame that indicates what has been purchased, 
               in what amount and for what price will no more be a paper pen and tedious work</div>
               <br/>
               <b style={{ fontSize: "18px" }}>To create purchase invoice,kindly follow the steps below: </b>
              <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
              <div style={{ fontSize: "18px" }}>2.Click on Purchase</div>
              <div style={{ fontSize: "18px" }}>3.Click on Purchase Order</div>
              <div style={{ fontSize: "18px" }}>4.Enter the all required fields</div>
              <div style={{ fontSize: "18px" }}>5.click Add To Cart</div>
              <div style={{ fontSize: "18px" }}>6.Once you are done with adding the products check for the summary details</div>
              <div style={{ fontSize: "18px" }}>7.Once the summary details are checked enable the SMS / Email option 
                for getting copy of the currently generated Invoice.</div>
              <div style={{ fontSize: "18px" }}>8.Once you are done with the purchase invoice click Save Invoice</div>
              <div style={{ fontSize: "18px" }}>9.Invoice saved message will be displayed</div>
              <div style={{ fontSize: "18px" }}>10.Click Cancel from preventing the Invoice being saved</div>
           </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading1">
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"   id="erpmaster1" style={{background:"none",color:"black"}}  data-parent="#accordion2" href="#purchaseinvoice">Purchase Invoice
                                        </a>
                                    </h6>
                                </div>
                                <div id="purchaseinvoice" class="panel-collapse collapse collapsepurchaseinvoice">
                                    <div class="collapseThreeTwo"> 
                                    <div class="panel-body">
        <div style={{ fontSize: "18px" }}>The purchase invoice displays list of invoices based on month 
          and year selected selected by the user.The displayed invoice list
           could be downloaded by clicking Download Invoice List</div>  
        <br/>
        <b style={{ fontSize: "18px" }}>To view invoice list,kindly follow the steps below:</b>
        <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
        <div style={{ fontSize: "18px" }}>2.Click on Purchase</div>
        <div style={{ fontSize: "18px" }}>3.Click on Purchase invoice</div>
        <div style={{ fontSize: "18px" }}>4.Select the month and year</div>
        <div style={{ fontSize: "18px" }}>5.The invoice list will be displayed</div>
        <br/>
        <b style={{ fontSize: "18px" }}>To delete invoice,kindly follow the steps below:</b>
        <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
        <div style={{ fontSize: "18px" }}>2.Click on Purchase</div>
        <div style={{ fontSize: "18px" }}>3.Click on Purchase Invoice</div>
        <div style={{ fontSize: "18px" }}>4.select the month and year</div>
        <div style={{ fontSize: "18px" }}>5.List of invoices will be displayed</div>
        <div style={{ fontSize: "18px" }}>6.Click Delete for the invoice whose details are required to Deleted.</div>
        <div style={{ fontSize: "18px" }}>7.Click Confirm in the message to proceed with 
        deleting the selected invoice.</div>
        <div style={{ fontSize: "18px" }}>8.Click Cancel in the message to prevent the invoice
        from being deleted.</div>

        <br/>
        <b style={{ fontSize: "18px" }}>To view detailed invoice,kindly follow the steps below:</b>
        <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
        <div style={{ fontSize: "18px" }}>2.Click on Purchase</div>
        <div style={{ fontSize: "18px" }}>3.Click on Purchase Invoice</div>
        <div style={{ fontSize: "18px" }}>4.select the month and year</div>
        <div style={{ fontSize: "18px" }}>5.List of invoices will be displayed</div>
        <div style={{ fontSize: "18px" }}>6.Click View for the invoice whose entire details are required to viewed.</div>
        <div style={{ fontSize: "18px" }}>7.The relevant details of the opted invoice will be displayed.</div>

        <br/>
        <b style={{ fontSize: "18px" }}>To edit invoice,kindly follow the steps below:</b>
        <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
        <div style={{ fontSize: "18px" }}>2.Click on Purchase</div>
        <div style={{ fontSize: "18px" }}>3.Click on Purchase Invoice</div>
        <div style={{ fontSize: "18px" }}>4.select the month and year</div>
        <div style={{ fontSize: "18px" }}>5.List of invoices will be displayed</div>
        <div style={{ fontSize: "18px" }}>6.Click Edit for the invoice whose details are required to Edited.</div>
        <div style={{ fontSize: "18px" }}>7.Add the products to be added to the invoice </div>
        <div style={{ fontSize: "18px" }}>8.Once products are entered click add cart</div>
        <div style={{ fontSize: "18px" }}>9.Once the products are added to invoice</div>
        <div style={{ fontSize: "18px" }}>10.Check for the summary</div>
        <div style={{ fontSize: "18px" }}>11.Once summary data's are checked Click Save Invoice </div>
        <div style={{ fontSize: "18px" }}>12.Click cancel to prevent the invoice from being saved</div>
        <br/>
        <b style={{ fontSize: "18px" }}>To pay an invoice,kindly follow the steps below:</b>
        <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
        <div style={{ fontSize: "18px" }}>2.Click on Purchase</div>
        <div style={{ fontSize: "18px" }}>3.Click on Purchase Invoice</div>
        <div style={{ fontSize: "18px" }}>4.select the month and year</div>
        <div style={{ fontSize: "18px" }}>5.List of invoices will be displayed</div>
        <div style={{ fontSize: "18px" }}>6.Click Pay for the invoice whose details are required to Edited.</div>
        <div style={{ fontSize: "18px" }}>7.Enter the amount being payed at this installment and click Submit</div>
        <div style={{ fontSize: "18px" }}>8.Updated payment details will be displayed</div>
        <div style={{ fontSize: "18px" }}>9.Click Cancel to undo the installment payment</div>
         </div>
         </div>
                                </div>
                            </div>
                        </div>
                       
                        </div>
                        

                   
                </div>

                </div>



{/*EXPENSE MODULE */}
         
  <div class="panel panel-default">
                <div class="panel-heading1">
                    <h6 class="panel-title">
                        <a data-toggle="collapse"  id="erpmaster1"  style={{background:"none",color:"black"}} data-parent="#accordion1" href="#expensemenu">Expense
                        </a>
                    </h6>
                </div>
                <div id="expensemenu" class="panel-collapse collapse collapseexpensemenu">
                    <div class="panel-body">
                    <div style={{ fontSize: "18px" }}>Expense module allows you to create Expense category which your organization
                        will be spending and you can add the authorized user for spending it.
                        The expense spent by each authorized user upon the expense category of the
                        organization would be recorded easily.</div>

                        <div class="panel-group" id="accordion2">
                            <div class="panel panel-default">
                                <div class="panel-heading1">
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"  id="erpmaster1" style={{background:"none",color:"black"}}  data-parent="#accordion2" href="#expense">Expense
                                        </a>
                                    </h6>
                                </div>
                                <div id="expense" class="panel-collapse collapse collapseexpense">
                                    <div class="panel-body"> 
          <div style={{ fontSize: "18px" }}>The expense spent by the authorized users could be recored  
                using the Expense page</div>
                <br/>
          <b style={{ fontSize: "18px" }}>To enter expenses spent,kindly follow the below steps:</b>
          <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
          <div style={{ fontSize: "18px" }}>2.Click on Expense</div>
          <div style={{ fontSize: "18px" }}>3.Enter all the details</div>
          <div style={{ fontSize: "18px" }}>4.click SUBMIT</div>
          <div style={{ fontSize: "18px" }}>5.Added Expense message will be displayed</div>
          <div style={{ fontSize: "18px" }}>6.Click Clear to delete all fields.</div>
        </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading1">
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"   id="erpmaster1" style={{background:"none",color:"black"}}  data-parent="#accordion2" href="#addcategory">Add Category
                                        </a>
                                    </h6>
                                </div>
                                <div id="addcategory" class="panel-collapse collapse collapseaddcategory">
                                    <div class="panel-body">   
          <b style={{ fontSize: "18px" }}>Add Category</b>
          <div style={{ fontSize: "18px" }}>Add Category would be used to create the new expense category for your
               organization.All the Expense Category of your organization will be listed below
               you could even download it in excel on clicking Download Category List. </div>
               <br/>
          <b style={{ fontSize: "18px" }}>To add new category,kindly follow the below steps: </b>
          <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
          <div style={{ fontSize: "18px" }}>2.Click on Expense</div>
          <div style={{ fontSize: "18px" }}>3.Click Add Category</div>
          <div style={{ fontSize: "18px" }}>3.Enter all the details</div>
          <div style={{ fontSize: "18px" }}>4.click SUBMIT</div>
          <div style={{ fontSize: "18px" }}>5.Added Category message will be displayed</div>
          <div style={{ fontSize: "18px" }}>6.Click Clear to delete all fields.</div>
          
          <br/>
          
          <b style={{ fontSize: "18px" }}>Delete Category</b>
          <div style={{ fontSize: "18px" }}>You can delete the expense category that is not going to exist in your organization. </div>
          <br/>
          <b style={{ fontSize: "18px" }}>To Delete category,kindly follow the below steps: </b>
          <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
          <div style={{ fontSize: "18px" }}>2.Click on Expense</div>
          <div style={{ fontSize: "18px" }}>3.Click Add Category</div>
          <div style={{ fontSize: "18px" }}>4.Click on delete for  the expense category to be removed.</div>
          <div style={{ fontSize: "18px" }}>5.Click confirm in the message to proceed with deleting the preferred expense category</div>
          <div style={{ fontSize: "18px" }}>6.Deleted Message will be displayed.</div>
          <div style={{ fontSize: "18px" }}>7.Click Cancel to prevent the preferred Expense category from being deleted.</div>
          </div>
                                </div>
                            </div>
                     
                        <div class="panel panel-default">
                                <div class="panel-heading1">
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"   id="erpmaster1" style={{background:"none",color:"black"}}  data-parent="#accordion2" href="#adduser">Add User
                                        </a>
                                    </h6>
                                </div>
                                <div id="adduser" class="panel-collapse collapse collapseadduser">
                                    <div class="panel-body">  
          <b style={{ fontSize: "18px" }}>Add User</b>
          <div style={{ fontSize: "18px" }}>Add User would be used to declare the authorized users for 
              spending the expense of your organization.</div>
          <br/>
          <b style={{ fontSize: "18px" }}>To Add user,kindly follow the below steps: </b>
          <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
          <div style={{ fontSize: "18px" }}>2.Click on Expense</div>
          <div style={{ fontSize: "18px" }}>3.Click Add User</div>
          <div style={{ fontSize: "18px" }}>4.Enter all the details</div>
          <div style={{ fontSize: "18px" }}>5.click SUBMIT</div>
          <div style={{ fontSize: "18px" }}>6.Added User message will be displayed</div>
          <div style={{ fontSize: "18px" }}>7.Click Clear to delete all fields.</div>
          
          <br/>
          
          <b style={{ fontSize: "18px" }}>Delete User</b>
          <div style={{ fontSize: "18px" }}>You can delete the User who will not have the authorization for spending 
               the expenses offered by your organization.</div>
          <br/>
          <b style={{ fontSize: "18px" }}>To Delete user,kindly follow the below steps: </b>
          <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
          <div style={{ fontSize: "18px" }}>2.Click on Expense</div>
          <div style={{ fontSize: "18px" }}>3.Click Add User</div>
          <div style={{ fontSize: "18px" }}>4.Click on delete for  the User to be removed.</div>
          <div style={{ fontSize: "18px" }}>5.Click confirm in the message to proceed with deleting the preferred User</div>
          <div style={{ fontSize: "18px" }}>6.Deleted Message will be displayed.</div>
          <div style={{ fontSize: "18px" }}>7.Click Cancel to prevent the preferred User from being deleted.</div>
          </div>
                                </div>
                            </div>
                        </div>
                        

                   
                </div>
                </div>
                </div>

{/*QUOTATION MODULE */}
              <div class="panel panel-default">
                <div class="panel-heading1">
                    <h6 class="panel-title">
                        <a data-toggle="collapse"  id="erpmaster1"  style={{background:"none",color:"black"}}  data-parent="#accordion1" href="#quotation">Quotation
                        </a>
                    </h6>
                </div>
                <div id="quotation" class="panel-collapse collapse collapsequotation">
                    <div class="panel-body">
                        <div style={{ fontSize: "18px" }}>A quotation may contain terms of sale and payment, and warranties.
      Such quotations are applicable with and without GST.Using the quotation module you can generate 
      the quotation based upon your request and you could even view the generated quotatoins with no delay</div>
                        <div class="panel-group" id="accordion2">
                            <div class="panel panel-default">
                                <div class="panel-heading1">
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"   id="erpmaster1" style={{background:"none",color:"black"}} data-parent="#accordion2" href="#gstquotation">GST Quotation
                                        </a>
                                    </h6>
                                </div>
                                <div id="gstquotation" class="panel-collapse collapse collapsegstquotation">
                                    <div class="panel-body">   
        
          <div style={{ fontSize: "18px" }}>Goods and Service Tax (GST) is an indirect tax levied on the supply of goods and services.</div> 
          <br/>
          <b style={{ fontSize: "18px" }}>To generate quotation with GST,kindly follow the below steps: </b>
          <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
          <div style={{ fontSize: "18px" }}>2.Click on Quotation</div>
          <div style={{ fontSize: "18px" }}>3.Click GST Quotation</div>
          <div style={{ fontSize: "18px" }}>4.Fill in all the fields</div>
          <div style={{ fontSize: "18px" }}>5.click Add To Cart</div>
          <div style={{ fontSize: "18px" }}>6.Once you are done with adding the products check for the summary details</div>
          <div style={{ fontSize: "18px" }}>7.Once you are done with the quotation click Save Quotation</div>
          <div style={{ fontSize: "18px" }}>8.Quotation saved message will be displayed</div>
          <div style={{ fontSize: "18px" }}>9.Click Cancel from preventing the quotation being saved</div>
          </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading1">
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"  id="erpmaster1" style={{background:"none",color:"black"}}  data-parent="#accordion2" href="#withoutgstquotation">Without GST Quotation
                                        </a>
                                    </h6>
                                </div>
                                <div id="withoutgstquotation" class="panel-collapse collapse collapsewithoutgstquotation">
                                    <div class="panel-body">
                                   
                                    <div style={{ fontSize: "18px" }}>There are expections for certain items from GST based upon which generatin quotation for 
            those items excludes the GST
          </div>
          <br/>
          <b style={{ fontSize: "18px" }}>To generate quotation without GST,kindly follow the below steps: </b>
          <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
          <div style={{ fontSize: "18px" }}>2.Click on Quotation</div>
          <div style={{ fontSize: "18px" }}>3.Click Without GST Quotation</div>
          <div style={{ fontSize: "18px" }}>4.Fill in all the fields</div>
          <div style={{ fontSize: "18px" }}>5.click Add To Cart</div>
          <div style={{ fontSize: "18px" }}>6.Once you are done with adding the products check for the summary details</div>
          <div style={{ fontSize: "18px" }}>7.Once you are done with the quotation click Save Quotation</div>
          <div style={{ fontSize: "18px" }}>8.Quotation saved message will be displayed</div>
          <div style={{ fontSize: "18px" }}>9.Click Cancel from preventing the quotation being saved</div>
            
                                   </div>
                                </div>
                            </div>
                  
                        <div class="panel panel-default">
                                <div class="panel-heading1">
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"  id="erpmaster1"  style={{background:"none",color:"black"}} data-parent="#accordion2" href="#listofquotation">List Of Quotation
                                        </a>
                                    </h6>
                                </div>
                                <div id="listofquotation" class="panel-collapse collapse collapselistofquotation">
                                    <div class="panel-body">
             <div style={{ fontSize: "18px" }}>The Quotations that are applied could be viewd as list by selecting whether it is with or
                whitout GST.Simillarly each sale quotation could be viewed and deleted with less effort.
                The displayed quotation list could be downloaded by clicking the Download button  </div>
             <br/>
             <b style={{ fontSize: "18px" }}>To view list of quotations,kindly follow the steps below:</b>
              <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
              <div style={{ fontSize: "18px" }}>2.Click on Quotation</div>
              <div style={{ fontSize: "18px" }}>3.Click List Of Quotation</div>
              <div style={{ fontSize: "18px" }}>4.Select the Quotation type (With GST or Without GST)</div>
              <div style={{ fontSize: "18px" }}>5.Select month and year</div>
              <div style={{ fontSize: "18px" }}>6.List of quotations will be displayed</div>
             <br/>
             <b style={{ fontSize: "18px" }}>To view detailed quotation,kindly follow the steps below:</b>
             <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
              <div style={{ fontSize: "18px" }}>2.Click on Quotation</div>
              <div style={{ fontSize: "18px" }}>3.List Of Quotation</div>
              <div style={{ fontSize: "18px" }}>4.Click GST Quotation List or Without Gst Quotation List </div>
              <div style={{ fontSize: "18px" }}>5.Select month and year</div>
              <div style={{ fontSize: "18px" }}>6.List of quotations will be displayed</div>
              <div style={{ fontSize: "18px" }}>5.Select the quotation data that you want to view
              and click view button</div>
              <div style={{ fontSize: "18px" }}>6.The entire salary detail of the quotation selected could be viewed</div>
              <br/>
              <b style={{ fontSize: "18px" }}>To delete the quotation,kindly follow the steps below:</b>
              <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
              <div style={{ fontSize: "18px" }}>2.Click on Quotation</div>
              <div style={{ fontSize: "18px" }}>3.Click List Of Quotation</div>
              <div style={{ fontSize: "18px" }}>4.Click GST Quotation List or Without Gst Quotation List</div>
              <div style={{ fontSize: "18px" }}>5.Select month and year</div>
              <div style={{ fontSize: "18px" }}>6.List of quotations will be displayed</div>
              <div style={{ fontSize: "18px" }}>4.Click Delete for the quotation details that are required to Deleted.</div>
              <div style={{ fontSize: "18px" }}>6.Click Confirm in the message to proceed with 
              deleting the selected quotation.</div>
              <div style={{ fontSize: "18px" }}>6.Click Cancel in the message to prevent the quotation
              from being deleted.</div>
             </div>
                                </div>
                            </div>
                        </div>
                        

                        </div>
                </div>

                </div>

{/*EMPLOYEE MODULE */}
         
         

         <div class="panel panel-default">
                <div class="panel-heading1">
                    <h6 class="panel-title">
                        <a data-toggle="collapse"  id="erpmaster1" style={{background:"none",color:"black"}} data-parent="#accordion1" href="#employeemenu">Employee
                        </a>
                    </h6>
                </div>
                <div id="employeemenu" class="panel-collapse collapse collapseemployeemenu">
                    <div class="panel-body">

                        <div class="panel-group" id="accordion2">
                            <div class="panel panel-default">
                                <div class="panel-heading1">
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"   id="erpmaster1" style={{background:"none",color:"black"}}  data-parent="#accordion2" href="#employee">Employee
                                        </a>
                                    </h6>
                                </div>
                                <div id="employee" class="panel-collapse collapse collapseemployee">
                                    <div class="panel-body"> 
                                    <div style={{ fontSize: "18px" }}>This module makes the works related to Employees like adding employees,
          viewing the existing employees,crediting salary for
          the employee and viewing it as report quiet easy without any mannual work.</div>
           <br/>
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>Add Employee :</h6>
                                    <div style={{ fontSize: "18px" }}>Employee for the organization could be added easily.</div>
           <br/>
           <b style={{ fontSize: "18px" }}>To Add Employee,kindly follow the below steps:</b>
           <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
           <div style={{ fontSize: "18px" }}>2.Click on Employee</div>
           <div style={{ fontSize: "18px" }}>3.Click on Add Employee</div>
           <div style={{ fontSize: "18px" }}>4.Fill in all the fields</div>
           <div style={{ fontSize: "18px" }}>5.Click Submit</div>
           <div style={{ fontSize: "18px" }}>6.Added Employee message will be displayed</div>
           <div style={{ fontSize: "18px" }}>7.Click on Clear to empty all fields</div>

                                    <br/>
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>List Of Employee :</h6>
                                    <div style={{ fontSize: "18px" }}>Retrieving or Knowing the Entire Details of Employees in an organization is
              not a tedious job from now on, This list gives the complete information about 
              the employees in the organization like EmployeeID, EmployeeName, phoneNo,
              Designation, Address, Salary.</div>
            <br/>
           
              <b style={{ fontSize: "18px" }}>To view Employee,kindly follow the steps below:</b>
              <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
              <div style={{ fontSize: "18px" }}>2.Click on Employee</div>
              <div style={{ fontSize: "18px" }}>3.Click on List Of Employee</div>
              <div style={{ fontSize: "18px" }}>4.Click View for the employee whose entire details are required to viewed.</div>
              <div style={{ fontSize: "18px" }}>5.The relevant details of the opted employee will be displayed.</div>

              <br/>
              <b style={{ fontSize: "18px" }}>To Edit Employee,kindly follow the steps below: </b>
              <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
              <div style={{ fontSize: "18px" }}>2.Click on Employee</div>
              <div style={{ fontSize: "18px" }}>3.Click on List Of Employee</div>
              <div style={{ fontSize: "18px" }}>4.Click Edit for the employee whose details are required to Edited.</div>
              <div style={{ fontSize: "18px" }}>5.Update the required fields</div>
              <div style={{ fontSize: "18px" }}>6.Click UPDATE</div>
              <div style={{ fontSize: "18px" }}>7.Updated Employee Details message will be displayed.</div>
              <br/>
              <b style={{ fontSize: "18px" }}>To Delete Employee,kindly follow the steps below:</b>
              <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
              <div style={{ fontSize: "18px" }}>2.Click on Employee</div>
              <div style={{ fontSize: "18px" }}>3.Click on List Of Employee</div>
              <div style={{ fontSize: "18px" }}>4.Click Delete for the employee whose details are required to Deleted.</div>
              <div style={{ fontSize: "18px" }}>5.Click Confirm in the message to proceed with 
              deleting the selected employee.</div>
              <div style={{ fontSize: "18px" }}>6.Click Cancel in the message to prevent the employee
              from being deleted.</div>

          
           </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading1">
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"  id="erpmaster1" style={{background:"none",color:"black"}}  data-parent="#accordion2" href="#salary">Salary
                                        </a>
                                    </h6>
                                </div>
                                <div id="salary" class="panel-collapse collapse collapsesalary">
                                    <div class="panel-body"> 
                                    <div style={{ fontSize: "18px" }}>The most tedious work when it comes to an organization is 
         crediting the salary for the employees, now even that tedious work has been 
         reduced with the help of salary module ans the credited salary could be viewed in no time.</div>

         <br/>
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>Credit Salary:</h6>
                                    <div style={{ fontSize: "18px" }}>Salary could be credited for the employee in an organization every month within
             a single click with no paper pen work</div>
          <br/>
          <b style={{ fontSize: "18px" }}>To credit salary,kindly follow the below steps:</b>
          <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
          <div style={{ fontSize: "18px" }}>2.Click on Salary</div>
          <div style={{ fontSize: "18px" }}>3.Cross check for the data's being displayed (You can change the data's if necessary)</div>
          <div style={{ fontSize: "18px" }}>4.click SUBMIT</div>
          <div style={{ fontSize: "18px" }}>5.Salary added message will be displayed</div>
                                    <br/>
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>Salary Report :</h6>
                                    <div style={{ fontSize: "18px" }}>Viewing the salary credited to an employees could be easily done without any delay on 
            selecting month and year.From the displayed report the data felt inapporiate would be 
            deleted simillarly the entire  details could be viewed.
            The displayed employee salary list could be downloaded on 
            clicking Download Salary Report</div>
          <br/>
          <b style={{ fontSize: "18px" }}>To view salary,kindly follow the below steps:</b>
          <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
          <div style={{ fontSize: "18px" }}>2.Click on Salary Report</div>
          <div style={{ fontSize: "18px" }}>3.Select Month and year for which you desire to view the report</div>
          <div style={{ fontSize: "18px" }}>4.The report will be displayed</div>
          <br/>
          <b style={{ fontSize: "18px" }}>To delete salary,kindly follow the below steps:</b>
          <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
          <div style={{ fontSize: "18px" }}>2.Click on Salary Report</div>
          <div style={{ fontSize: "18px" }}>3.Select Month and year for which you desire to view the report</div>
          <div style={{ fontSize: "18px" }}>4.The report will be displayed</div>
          <div style={{ fontSize: "18px" }}>5.Select the employee salary data that you want to delete
            and click delete button</div>
          <div style={{ fontSize: "18px" }}>6.Click the confirm button in the message to proceed with deleting</div>
          <div style={{ fontSize: "18px" }}>7.Details deleted message will be displayed</div>
          <div style={{ fontSize: "18px" }}>8.Click cancel to prevent the employee salary details from being deleted</div>
          <br/>
          <b style={{ fontSize: "18px" }}>To view detailed salary,kindly follow the below steps:</b>
          <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
          <div style={{ fontSize: "18px" }}>2.Click on Salary Report</div>
          <div style={{ fontSize: "18px" }}>3.Select Month and year for which you desire to view the report</div>
          <div style={{ fontSize: "18px" }}>4.The report will be displayed</div>
          <div style={{ fontSize: "18px" }}>5.Select the employee salary data that you want to view
            and click view button</div>
          <div style={{ fontSize: "18px" }}>6.The entire salary detail of the employee selected could be viewed</div>

      

    
         </div>
                                </div>
                            </div>
                        </div>
                       
                        </div>
                        

                   
                </div>

                </div>


{/*FILE GST MODULE */}
              <div class="panel panel-default">
                <div class="panel-heading1">
                    <h6 class="panel-title">
                        <a data-toggle="collapse"  id="erpmaster1" style={{background:"none",color:"black"}} data-parent="#accordion1" href="#filegst">File GST
                        </a>
                    </h6>
                </div>
                <div id="filegst" class="panel-collapse collapse collapsefilegst">
                    <div class="panel-body">

                        <div class="panel-group" id="accordion2">
                            <div class="panel panel-default">
                                <div class="panel-heading1">
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"  id="erpmaster1" style={{background:"none",color:"black"}} data-parent="#accordion2" href="#gst3b">GST 3B
                                        </a>
                                    </h6>
                                </div>
                                <div id="gst3b" class="panel-collapse collapse collapsegst3b">
                                    <div class="panel-body">
         <div style={{ fontSize: "18px" }}>GSTR 3B is a simple return form introduced by the Government.
            A separate GSTR 3B form has to be filed for each GSTIN. 
            GSTR 3B form does not require invoice level information. 
            It only requires total values for each field, like a summary, for 
            the month for which filing is done.The hectic work of gathering all the invoice 
            of the month and calculating the GST amount with papaer,pen and calculator or an auditor
            is not needed anymore for your organization.The GST Amount for a month 
            could be calculated in single click.</div> 
            <br/>
            <b style={{ fontSize: "18px" }}>To calculate GST 3B amount,kindly folloe the steps below:</b>
            <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
            <div style={{ fontSize: "18px" }}>2.Click GST 3B</div>
            <div style={{ fontSize: "18px" }}>3.Select the month for which you want view the GST amount</div>
            <div style={{ fontSize: "18px" }}>4.GST amount for the selected month will be displayed for sale and purchase
              seperately.</div>
        </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading1">
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"  id="erpmaster1" style={{background:"none",color:"black"}} data-parent="#accordion2" href="#gstr1">GSTR 1
                                        </a>
                                    </h6>
                                </div>
                                <div id="gstr1" class="panel-collapse collapse collapsegstr1">
                                    <div class="panel-body"> 
               
            <div style={{ fontSize: "18px" }}>GSTR-1 is a monthly or quarterly return that should be filed by
              every registered purchase. It contains details of all outward supplies 
              i.e sales.Businesses with sales of upto Rs. 1.5 crore will file 
              quarterly returns.Other taxpayers with sales above Rs. 1.5 crore have 
              to file monthly return.</div>
              <br/>
              <b style={{ fontSize: "18px" }}>To calculate GSTR-1,kindly follow the below steps:</b>
              <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
              <div style={{ fontSize: "18px" }}>2.Click GSTR-1</div>
              <div style={{ fontSize: "18px" }}>3.Select the module for which you want to view the GSTR-1 i.e
                 (Businesses to Businesses) or (Businesses to Customer)</div>
              <div style={{ fontSize: "18px" }}>4.Select the month for which you want view the GST amount</div>
              <div style={{ fontSize: "18px" }}>5.GSTR-1 amount for the selected month will be displayed</div>

          </div>
                                </div>
                            </div>
                        
                        <div class="panel panel-default">
                                <div class="panel-heading1">
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"   id="erpmaster1" style={{background:"none",color:"black"}} data-parent="#accordion2" href="#gstrofflinetool">GSTR Offline Tool
                                        </a>
                                    </h6>
                                </div>
                                <div id="gstrofflinetool" class="panel-collapse collapse collapsegstrofflinetool">
                                    <div class="panel-body">  
                                    
            
             <div style={{ fontSize: "18px" }}>If you require any clarifications regarding what is GST,how to file and 
            any more clarifications you would use GSTR Help</div>
            <br/>
            <b style={{ fontSize: "18px" }}>To Access GSTR Help,kindly follow the below steps:</b>
            <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
            <div style={{ fontSize: "18px" }}>2.Click GSTR Help</div>
            <div style={{ fontSize: "18px" }}>3.The government official site for GST will be displayed</div>
          
            </div>
                                </div>
                            </div>
                        </div>
                        
                        </div>
                   
                </div>

                </div>

{/*ATTENDANCE MODULE */}
              <div class="panel panel-default">
                <div class="panel-heading1">
                    <h6 class="panel-title">
                        <a data-toggle="collapse"   id="erpmaster1" style={{background:"none",color:"black"}} data-parent="#accordion1" href="#attendance">Attendance
                        </a>
                    </h6>
                </div>
                <div id="attendance" class="panel-collapse collapse collapseattendance">
                    <div class="panel-body">
                        <div style={{ fontSize: "18px" }}>You can record the daily attendance for your employees and view the attendance 
                            based upon month and over a period of 3 months.</div>
                        <div class="panel-group" id="accordion2">
                            <div class="panel panel-default">
                                <div class="panel-heading1">
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"   id="erpmaster1" style={{background:"none",color:"black"}} data-parent="#accordion2" href="#recordattendance">Record Attendance
                                        </a>
                                    </h6>
                                </div>
                                <div id="recordattendance" class="panel-collapse collapse collapserecordattendance">
                                    <div class="panel-body">  
         
          <div style={{ fontSize: "18px" }}>The attendance for the employees of the organization could be recorded on daily basis easily.</div>
          <br/>
          <b style={{ fontSize: "18px" }}>To Record Attendance,kindly follow the steps below:</b>
          <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
          <div style={{ fontSize: "18px" }}>2.Click on Attendance</div>
          <div style={{ fontSize: "18px" }}>3.Click on Attendance</div>
          <div style={{ fontSize: "18px" }}>4.Select the Employee and update their status  (You can select all the employee by selecting the
           check box near the column name id)</div>
           <div style={{ fontSize: "18px" }}>5.Click SUBMIT</div> 
           <div style={{ fontSize: "18px" }}>6.Attendance updated message will be displayed</div>
           <div style={{ fontSize: "18px" }}>7.Click on Clear to undo the changes done.</div>
        </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading1">
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"  id="erpmaster1"  style={{background:"none",color:"black"}} data-parent="#accordion2" href="#monthlyattendancereport">Monthly Attendance Report
                                        </a>
                                    </h6>
                                </div>
                                <div id="monthlyattendancereport" class="panel-collapse collapse collapsemonthlyattendancereport">
                                    <div class="panel-body"> 
           
              <div style={{ fontSize: "18px" }}>Monthly Report will be useful to view the Employee Attendance details for the particular month 
                  selected by the user.</div>
              <br/>
              <b style={{ fontSize: "18px" }}>To View Monthly,kindly follow the steps below: </b>
              <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
              <div style={{ fontSize: "18px" }}>2.Click on Attendance</div>
              <div style={{ fontSize: "18px" }}>3.Click on Monthly Report</div>
              <div style={{ fontSize: "18px" }}>4.Select the Month and year </div>
              <div style={{ fontSize: "18px" }}>5.Attendance status of all Employees will be displayed for the selected month.</div>
            </div>
                                </div>
                            </div>
                       
                        <div class="panel panel-default">
                                <div class="panel-heading1">
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"  id="erpmaster1" style={{background:"none",color:"black"}} data-parent="#accordion2" href="#periodattendancereport">Period Attendance Report
                                        </a>
                                    </h6>
                                </div>
                                <div id="periodattendancereport" class="panel-collapse collapse collapseperiodattendancereport">
                                    <div class="panel-body"> 
              
              <div style={{ fontSize: "18px" }}>Knowing the Performance of an employee over a period of time is not going to be a paper pen work because that
              operation could be easily done by using the option called Period Report where user will 
              elect the period by mentioning from and to date.</div>
              <br/>
              <b style={{ fontSize: "18px" }}>To View Period Attendance,kindly follow the steps below: </b>
              <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
              <div style={{ fontSize: "18px" }}>2.Click on Attendance</div>
              <div style={{ fontSize: "18px" }}>3.Click on Period Report</div>
              <div style={{ fontSize: "18px" }}>4.Select the from and to date</div>
              <div style={{ fontSize: "18px" }}>5.Attendance status of all Employees will be displayed for the selected period.</div>
            </div>
                                </div>
                            </div>
                        </div>
                        
                        </div>
                   
                </div>

                </div>

{/*ADMIN MODULE */}
              <div class="panel panel-default">
                <div class="panel-heading1">
                    <h6 class="panel-title">
                        <a data-toggle="collapse"   id="erpmaster1" style={{background:"none",color:"black"}} data-parent="#accordion1" href="#admin">Admin
                        </a>
                    </h6>
                </div>
                <div id="admin" class="panel-collapse collapse collapseadmin">
                    <div class="panel-body">
                        <div style={{ fontSize: "18px" }}>The administration works regarding the organization like adding the Admins,Roles and 
            Changing the passwords for the Admins Could be done easily</div>
                        <div class="panel-group" id="accordion2">
                            <div class="panel panel-default">
                                <div class="panel-heading1">
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"  id="erpmaster1" style={{background:"none",color:"black"}} data-parent="#accordion2" href="#addadmin">Add Admin
                                        </a>
                                    </h6>
                                </div>
                                <div id="addadmin" class="panel-collapse collapse collapseaddadmin">
                                    <div class="panel-body"> 
       
          <div style={{ fontSize: "18px" }}> Admins for your organization could be added easily.The Admins of the organization will be
              listed below for easy view and the entire list can be downloaded in excel format 
              on clicking Download User List</div>
              <br/>
          <b style={{ fontSize: "18px" }}>To Add Admin,kindly follow the steps below: </b>
          <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
          <div style={{ fontSize: "18px" }}>2.Click on Admin</div>
          <div style={{ fontSize: "18px" }}>3.Enter all the details and click SUBMIT</div>
          <div style={{ fontSize: "18px" }}>4.User added message will be displayed</div>
          <div style={{ fontSize: "18px" }}>5.Click Clear to empty all fields</div>
       
        </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading1">
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"  id="erpmaster1" style={{background:"none",color:"black"}} data-parent="#accordion2" href="#changepassword">Change Password
                                        </a>
                                    </h6>
                                </div>
                                <div id="changepassword" class="panel-collapse collapse collapsechangepassword">
                                    <div class="panel-body"> 
            <div style={{ fontSize: "18px" }}>The Passwords For the Admins Could Be Changed without any tedious process.</div>
            <br/>
          <b style={{ fontSize: "18px" }}>To Change Password,kindly follow the steps below:</b>
          <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
          <div style={{ fontSize: "18px" }}>2.Click on Admin</div>
          <div style={{ fontSize: "18px" }}>3.Click on Change Password</div>
          <div style={{ fontSize: "18px" }}>4.Enter New Password and Confirm Pasword</div>
          <div style={{ fontSize: "18px" }}>5.Click Reset Password</div>
          <div style={{ fontSize: "18px" }}>6.Changed the password message will be displayed.</div>
          <div style={{ fontSize: "18px" }}>7.Click Clear to undo the process of changing the password.</div>
       
        </div>
                                </div>
                            </div>
                        
                        <div class="panel panel-default">
                                <div class="panel-heading1">
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"  id="erpmaster1" style={{background:"none",color:"black"}} data-parent="#accordion2" href="#addrole">Add Role
                                        </a>
                                    </h6>
                                </div>
                                <div id="addrole" class="panel-collapse collapse collapseaddrole">
                                    <div class="panel-body"> 
        
          <div style={{ fontSize: "18px" }}>User should have clearly defined the roles of an organization
            because each roles playa a vital role of responsibilities for the 
            development of the organization</div>
          <br/>
          <b style={{ fontSize: "18px" }}>To Add Role,kindly follow the steps below: </b>
          <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
          <div style={{ fontSize: "18px" }}>2.Click on Admin</div>
          <div style={{ fontSize: "18px" }}>3.Click on Add Role</div>
          <div style={{ fontSize: "18px" }}>4.Enter New Role</div>
          <div style={{ fontSize: "18px" }}>5.Click SUBMIT</div>
          <div style={{ fontSize: "18px" }}>6.Role added message will be displayed</div>
          <div style={{ fontSize: "18px" }}>7.Click Clear to empty the fields</div>
        
          </div>
                                </div>
                            </div>
                        </div>
                        
                        </div>
                   
                </div>

                </div>


{/*REPORT MODULE */}

   <div class="panel panel-default">
                <div class="panel-heading1">
                    <h6 class="panel-title">
                        <a data-toggle="collapse"  id="erpmaster1" style={{background:"none",color:"black"}} data-parent="#accordion1" href="#report">Report
                        </a>
                    </h6>
                </div>
                <div id="report" class="panel-collapse collapse collapsereport">
                    <div class="panel-body">

                        <div class="panel-group" id="accordion2">
                            <div class="panel panel-default">
                                <div class="panel-heading1">
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"  id="erpmaster1" style={{background:"none",color:"black"}}  data-parent="#accordion2" href="#salesreport">Sales Report
                                        </a>
                                    </h6>
                                </div>
                                <div id="salesreport" class="panel-collapse collapse collapsesalesreport">
                                    <div class="panel-body"> 
                                  
         
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>Daily :</h6>
                                    <div style={{ fontSize: "18px" }}>Every single day sales data would be viewed as report with 
                total Summary and the viewed data would be downloaded as excel 
                on clicking Download DailySales List.The report could be even 
                printed on clicking Print1 </div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view daily sales report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Daily in Sales Report</div>
                <div style={{ fontSize: "18px" }}>4.Sales Report for the current day will be displayed</div>

                                    <br/>
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>Monthly :</h6>

<div style={{ fontSize: "18px" }}>Current Month sales data would be viewed as report with 
                total Summary and the viewed data would be downloaded as excel 
                on clicking Download MonthlySales List.The report could be even 
                printed on clicking Print1 </div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view Monthly sales report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Monthly in Sales Report</div>
                <div style={{ fontSize: "18px" }}>4.Sales Report for the current month will be displayed</div>

                                      <br/>
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>Yearly :</h6>

<div style={{ fontSize: "18px" }}>Current year sales data would be viewed as report with 
                total Summary and the viewed data would be downloaded as excel 
                on clicking Download YearlySales List.The report could be even 
                printed on clicking Print1 </div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view yearly sales report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Yearly in Sales Report</div>
                <div style={{ fontSize: "18px" }}>4.Sales Report for the current year will be displayed</div>

                                       <br/>
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>DateWise :</h6>
                                    <div style={{ fontSize: "18px" }}>Datewise sales data for about period of 3 months would be viewed as report with 
                total Summary and the viewed data would be downloaded as excel 
                on clicking Download DatewiseSales List.The report could be even 
                printed on clicking Print1 </div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view datewise sales report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Datewise in Sales Report</div>
                <div style={{ fontSize: "18px" }}>4.Select from and to date</div>
                <div style={{ fontSize: "18px" }}>5.Click Submit</div>
                <div style={{ fontSize: "18px" }}>6.Sales Report for the opted period will be displayed</div>

                                       <br/>
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>Customer Statement :</h6>
                                  
                                    <div style={{ fontSize: "18px" }}>Each customer sales data would be viewed for about period of 3 months would be 
                viewed as report with total Summary and the viewed data could be  
                printed on clicking Print1 </div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view customer sales report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Customer Statement in Sales Report</div>
                <div style={{ fontSize: "18px" }}>4.Select from ,to date and customer</div>
                <div style={{ fontSize: "18px" }}>5.Sales Report of the opted customer for the opted period will be displayed</div>
            </div>
                                  </div>
                                </div>
                           


                            <div class="panel panel-default">
                                <div class="panel-heading1">
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"  id="erpmaster1" style={{background:"none",color:"black"}}  data-parent="#accordion2" href="#expensereport">Expense Report
                                        </a>
                                    </h6>
                                </div>


                                <div id="expensereport" class="panel-collapse collapse collapseexpensereport">
                                    <div class="panel-body"> 
                                   
                                   
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>Daily :</h6>
                                    <div style={{ fontSize: "18px" }}>Every single day expense data would be viewed as report with 
                total Summary and the viewed data would be downloaded as excel 
                on clicking Download Expense List.The report could be even 
                printed on clicking Print1 </div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view daily expense report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Daily in Expense Report</div>
                <div style={{ fontSize: "18px" }}>4.Expense Report for the current day will be displayed</div>
                <br/>
                <b style={{ fontSize: "18px" }}>To delete daily expense report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Daily in Expense Report</div>
                <div style={{ fontSize: "18px" }}>4.Expense Report for the current day will be displayed</div>
                <div style={{ fontSize: "18px" }}>5.Click delete for the expense data to be deleted</div>
                <div style={{ fontSize: "18px" }}>6.Click confirm in the message to proceed with deleting</div>
                <div style={{ fontSize: "18px" }}>7.Click cancel to prevent the selected data from being deleted</div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view detailed daily expense report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Daily in Expense Report</div>
                <div style={{ fontSize: "18px" }}>4.Expense Report for the current day will be displayed</div>
                <div style={{ fontSize: "18px" }}>5.Click View for the expense data to be viewed in detail</div>
                <div style={{ fontSize: "18px" }}>6.Detailed Expense Report for the selected expense data will be displayed</div>
                <br/>
                <b style={{ fontSize: "18px" }}>To edit daily expense report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Daily in Expense Report</div>
                <div style={{ fontSize: "18px" }}>4.Expense Report for the current day will be displayed</div>
                <div style={{ fontSize: "18px" }}>5.Click Edit for the expense data to be viewed in detail</div>
                <div style={{ fontSize: "18px" }}>6.Edit the data to be changed</div>
                <div style={{ fontSize: "18px" }}>7.Click Update</div>
                <div style={{ fontSize: "18px" }}>8.Data Updated message will be displayed</div>
                               
                                    <br/>
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>Monthly :</h6>
                                    <div style={{ fontSize: "18px" }}>Every month expense data would be viewed as report with 
                total Summary and the viewed data would be downloaded as excel 
                on clicking Download Expense List.The report could be even 
                printed on clicking Print1 </div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view monthly expense report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Monthly in Expense Report</div>
                <div style={{ fontSize: "18px" }}>4.Expense Report for the current month will be displayed</div>
                <br/>
                <b style={{ fontSize: "18px" }}>To delete monthly expense report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Monthly in Expense Report</div>
                <div style={{ fontSize: "18px" }}>4.Expense Report for the current Month will be displayed</div>
                <div style={{ fontSize: "18px" }}>5.Click delete for the expense data to be deleted</div>
                <div style={{ fontSize: "18px" }}>6.Click confirm in the message to proceed with deleting</div>
                <div style={{ fontSize: "18px" }}>7.Click cancel to prevent the selected data from being deleted</div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view detailed monthly expense report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Monthly in Expense Report</div>
                <div style={{ fontSize: "18px" }}>4.Expense Report for the current Month will be displayed</div>
                <div style={{ fontSize: "18px" }}>5.Click View for the expense data to be viewed in detail</div>
                <div style={{ fontSize: "18px" }}>6.Detailed Expense Report for the selected expense data will be displayed</div>
                <br/>
                <b style={{ fontSize: "18px" }}>To edit monthly expense report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Monthly in Expense Report</div>
                <div style={{ fontSize: "18px" }}>4.Expense Report for the current month will be displayed</div>
                <div style={{ fontSize: "18px" }}>5.Click Edit for the expense data to be viewed in detail</div>
                <div style={{ fontSize: "18px" }}>6.Edit the data to be changed</div>
                <div style={{ fontSize: "18px" }}>7.Click Update</div>
                <div style={{ fontSize: "18px" }}>8.Data Updated message will be displayed</div>
                                   
                                    <br/>
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>Yearly :</h6>

  <div style={{ fontSize: "18px" }}>Every year expense data would be viewed as report with 
                total Summary and the viewed data would be downloaded as excel 
                on clicking Download Expense List.The report could be even 
                printed on clicking Print1 </div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view yearly expense report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on yearly in Expense Report</div>
                <div>4.Expense Report for the current year will be displayed</div>
                <br/>
                <b style={{ fontSize: "18px" }}>To delete yearly expense report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Yearly in Expense Report</div>
                <div style={{ fontSize: "18px" }}>4.Expense Report for the current Year will be displayed</div>
                <div style={{ fontSize: "18px" }}>5.Click delete for the expense data to be deleted</div>
                <div style={{ fontSize: "18px" }}>6.Click confirm in the message to proceed with deleting</div>
                <div style={{ fontSize: "18px" }}>7.Click cancel to prevent the selected data from being deleted</div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view detailed yearly expense report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Yearly in Expense Report</div>
                <div style={{ fontSize: "18px" }}>4.Expense Report for the current Year will be displayed</div>
                <div style={{ fontSize: "18px" }}>5.Click View for the expense data to be viewed in detail</div>
                <div style={{ fontSize: "18px" }}>6.Detailed Expense Report for the selected expense data will be displayed</div>
                <br/>
                <b style={{ fontSize: "18px" }}>To edit yearly expense report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Yearly in Expense Report</div>
                <div style={{ fontSize: "18px" }}>4.Expense Report for the current year will be displayed</div>
                <div style={{ fontSize: "18px" }}>5.Click Edit for the expense data to be viewed in detail</div>
                <div style={{ fontSize: "18px" }}>6.Edit the data to be changed</div>
                <div style={{ fontSize: "18px" }}>7.Click Update</div>
                <div style={{ fontSize: "18px" }}>8.Data Updated message will be displayed</div>


                                     <br/>
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>DateWise :</h6>
      
                                    <div style={{ fontSize: "18px" }}>Datewise sales data for about period of 3 months could viewed as report with 
                total Summary and the viewed data would be downloaded as excel 
                on clicking Download Expense List.The report could be even 
                printed on clicking Print1 </div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view datewise expense report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on DateWise in Expense Report</div>
                <div style={{ fontSize: "18px" }}>4.Select From and To date</div>
                <div style={{ fontSize: "18px" }}>5.Click SUBMIT</div>
                <div style={{ fontSize: "18px" }}>6.Expense Report for the opted period  will be displayed</div>
                <br/>
                <b style={{ fontSize: "18px" }}>To delete datewise expense report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Datewise in Expense Report</div>
                <div style={{ fontSize: "18px" }}>4.Select From and To date</div>
                <div style={{ fontSize: "18px" }}>5.Click SUBMIT</div>
                <div style={{ fontSize: "18px" }}>6.Expense Report for the opted period  will be displayed</div>
                <div style={{ fontSize: "18px" }}>7.Click delete for the expense data to be deleted</div>
                <div style={{ fontSize: "18px" }}>8.Click confirm in the message to proceed with deleting</div>
                <div style={{ fontSize: "18px" }}>9.Click cancel to prevent the selected data from being deleted</div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view detailed datewise expense report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Datewise in Expense Report</div>
                <div style={{ fontSize: "18px" }}>4.Select From and To date</div>
                <div style={{ fontSize: "18px" }}>5.Click SUBMIT</div>
                <div style={{ fontSize: "18px" }}>6.Expense Report for the opted period  will be displayed</div>
                <div style={{ fontSize: "18px" }}>7.Click View for the expense data to be viewed in detail</div>
                <div style={{ fontSize: "18px" }}>8.Detailed Expense Report for the selected expense data will be displayed</div>
                <br/>
                <b style={{ fontSize: "18px" }}>To edit datewise expense report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Datewise in Expense Report</div>
                <div style={{ fontSize: "18px" }}>4.Select From and To date</div>
                <div style={{ fontSize: "18px" }}>5.Click SUBMIT</div>
                <div style={{ fontSize: "18px" }}>6.Expense Report for the opted period  will be displayed</div>
                <div style={{ fontSize: "18px" }}>7.Click Edit for the expense data to be viewed in detail</div>
                <div style={{ fontSize: "18px" }}>8.Edit the data to be changed</div>
                <div style={{ fontSize: "18px" }}>9.Click Update</div>
                <div style={{ fontSize: "18px" }}>10.Data Updated message will be displayed</div>
    
                                </div>
                                </div>

                            </div>



   <div class="panel panel-default">
                                <div class="panel-heading1">
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"   id="erpmaster1" style={{background:"none",color:"black"}}  data-parent="#accordion2" href="#purchasereport">Purchase Report
                                        </a>
                                    </h6>
                                </div>


                                <div id="purchasereport" class="panel-collapse collapse collapsepurchasereport">
                                    <div class="panel-body"> 
                                   
                                   
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>Daily :</h6>
                                    <div style={{ fontSize: "18px" }}>Every single day puchase data would be viewed as report with 
                total Summary and the viewed data would be downloaded as excel 
                on clicking Download DailyPurchase List.The report could be even 
                printed on clicking Print1 </div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view daily purchase report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Daily in Purchase Report</div>
                <div style={{ fontSize: "18px" }}>4.Purchase Report for the current day will be displayed</div>
                               
                                        <br/>
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>Monthly :</h6>

 <div style={{ fontSize: "18px" }}>Current Month purchase data would be viewed as report with 
                total Summary and the viewed data would be downloaded as excel 
                on clicking Download PurchaseMonthly List.The report could be even 
                printed on clicking Print1 </div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view Monthly purchase report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Monthly in Purchase Report</div>
                <div style={{ fontSize: "18px" }}>4.Purchase Report for the current month will be displayed</div>

                                     <br/>
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>Yearly :</h6>

<div style={{ fontSize: "18px" }}>Current year purchase data would be viewed as report with 
                total Summary and the viewed data would be downloaded as excel 
                on clicking Download PurchaseYearly List.The report could be even 
                printed on clicking Print1 </div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view yearly purchase report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Yearly in Purchase Report</div>
                <div style={{ fontSize: "18px" }}>4.Purchase Report for the current year will be displayed</div>



                                     <br/>
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>DateWise :</h6>

<div style={{ fontSize: "18px" }}>Datewise purchase data for about period of 3 months would be viewed as report with 
                total Summary and the viewed data would be downloaded as excel 
                on clicking Download PurchaseDateWise List.The report could be even 
                printed on clicking Print1 </div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view datewise purchase report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Datewise in Purchase Report</div>
                <div style={{ fontSize: "18px" }}>4.Select from and to date</div>
                <div style={{ fontSize: "18px" }}>5.Click Submit</div>
                <div style={{ fontSize: "18px" }}>6.Purchase Report for the opted period will be displayed</div>



                                     <br/>
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>Vendor Statement :</h6>


                                     <div style={{ fontSize: "18px" }}>Each vendor puchase data would be viewed for about period of 3 months would be 
                viewed as report with total Summary and the viewed data could be  
                printed on clicking Print1 </div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view vendor purchase report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Customer Statement in Purchase Report</div>
                <div style={{ fontSize: "18px" }}>4.Select from ,to date and vendor</div>
                <div style={{ fontSize: "18px" }}>5.Purchase Report of the opted vendor for the opted period will be displayed</div>
                                   
                                   
      

    
                                </div>
                                </div>




                            </div>





   <div class="panel panel-default">
                                <div class="panel-heading1">
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"  id="erpmaster1" style={{background:"none",color:"black"}}  data-parent="#accordion2" href="#estimatereport">Estimate Report
                                        </a>
                                    </h6>
                                </div>


                                <div id="estimatereport" class="panel-collapse collapse collapseestimatereport">
                                    <div class="panel-body"> 
                                   
                                   
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>Daily :</h6>
                                    <div style={{ fontSize: "18px" }}>Every single day estimate data would be viewed as report with 
                total Summary and the viewed data would be downloaded as excel 
                on clicking Download DailyEstimate List.The report could be even 
                printed on clicking Print1 </div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view daily estimate report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Daily in Estimate Report</div>
                <div style={{ fontSize: "18px" }}>4.Estimate Report for the current day will be displayed</div>
                               
                                        <br/>
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>Monthly :</h6>

 <div style={{ fontSize: "18px" }}>Current Month estimate data would be viewed as report with 
                total Summary and the viewed data would be downloaded as excel 
                on clicking Download EstimateMonthly List.The report could be even 
                printed on clicking Print1 </div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view Monthly estimate report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Monthly in Estimate Report</div>
                <div style={{ fontSize: "18px" }}>4.Estimate Report for the current month will be displayed</div>

                                     <br/>
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>Yearly :</h6>

 <div style={{ fontSize: "18px" }}>Current year estimate data would be viewed as report with 
                total Summary and the viewed data would be downloaded as excel 
                on clicking DownloadEstimateYearly List.The report could be even 
                printed on clicking Print1 </div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view yearly estimate report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Yearly in Estimate Report</div>
                <div style={{ fontSize: "18px" }}>4.Estimate Report for the current year will be displayed</div>



                                     <br/>
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>DateWise :</h6>

 <div style={{ fontSize: "18px" }}>Datewise estimate data for about period of 3 months would be viewed as report with 
                total Summary and the viewed data would be downloaded as excel 
                on clicking Download EstimateDateWise List.The report could be even 
                printed on clicking Print1 </div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view datewise estimate report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Datewise in Estimate Report</div>
                <div style={{ fontSize: "18px" }}>4.Select from and to date</div>
                <div style={{ fontSize: "18px" }}>5.Click Submit</div>
                <div style={{ fontSize: "18px" }}>6.Estimate Report for the opted period will be displayed</div>



                                     <br/>
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>Customer Statement :</h6>

  <div style={{ fontSize: "18px" }}>Each customer estimate data would be viewed for about period of 3 months would be 
                viewed as report with total Summary and the viewed data could be  
                printed on clicking Print1 </div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view customer estimate report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Customer Statement in Purchase Report</div>
                <div style={{ fontSize: "18px" }}>4.Select from ,to date and customer</div>
                <div style={{ fontSize: "18px" }}>5.Estimate Report of the opted customer for the opted period will be displayed</div>
     </div>   </div>  </div>
   <div class="panel panel-default">
                                <div class="panel-heading1">
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"  id="erpmaster1" style={{background:"none",color:"black"}}  data-parent="#accordion2" href="#quotation">Quotation Report
                                        </a>
                                    </h6>
                                </div>

<div id="quotation" class="panel-collapse collapse collapsequotation">
                                    <div class="panel-body"> 
             <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>GST Quotation :</h6>
                                    <div style={{ fontSize: "18px" }}>The quotation being applied with GST for a month would be viewed
                the viewed easily with tottal summary and the viewed data would be 
                downloaded on clicking Download GSTQuotation List.The data can also be 
                printed on clicking Print1 </div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view GST quotation report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on GST Qutation in Quotation Report</div>
                <div style={{ fontSize: "18px" }}>4.Select Month and Year</div>
                <div style={{ fontSize: "18px" }}>5.GST quotation Report for the opted month and year will be displayed</div>
 <br/>
                                    <h6 style={{background:"none",color:"black",textStyle:"underline",textDecoration: "underline"}}>Without GST Quotation :</h6>

<div style={{ fontSize: "18px" }}>The quotation being applied without GST for a month would be viewed
                the viewed easily with tottal summary and the viewed data would be 
                downloaded on clicking Download WithoutGSTQuotation List.The data can also be 
                printed on clicking Print1 </div>
                <br/>
                <b style={{ fontSize: "18px" }}>To view Without GST quotation report,kindly follow the below steps:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
                <div style={{ fontSize: "18px" }}>3.Click on Without GST Qutation in Quotation Report</div>
                <div style={{ fontSize: "18px" }}>4.Select Month and Year</div>
                <div style={{ fontSize: "18px" }}>5.Without GST quotation Report for the opted month and year will be displayed</div>

 </div>   </div>  </div>
  <div class="panel panel-default">
                                <div class="panel-heading1">
                                    <h6 class="panel-title">
                                        <a data-toggle="collapse"  id="erpmaster1"  style={{background:"none",color:"black"}}  data-parent="#accordion2" href="#messagecenterreport">Message Center Report
                                        </a>
                                    </h6>
                                </div>


                                <div id="messagecenterreport" class="panel-collapse collapse collapsemessagecenterreport">
                                    <div class="panel-body"> 
                                   
                                    <div style={{ fontSize: "18px" }}>The mode of communication through which the organizzation communicated with 
        each employee would be views in detail in Message Center Report 
        for a period of 3 months.</div>
        <br/>
        <b style={{ fontSize: "18px" }}>To view Message Center Report,kindly follow the steps below:</b>
        <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
        <div style={{ fontSize: "18px" }}>2.Click on Reports</div>
        <div style={{ fontSize: "18px" }}>3.Click on Message Center Report</div>
        <div style={{ fontSize: "18px" }}>4.Select From and ToDate</div>
        <div style={{ fontSize: "18px" }}>5.Click SUBMIT</div>
        <div style={{ fontSize: "18px" }}>6.Report will be displayed</div>
    </div></div> </div> </div></div>
                        </div>
                </div>

            


{/*CONFIGURATION MODULE */}
<div class="panel panel-default">
                <div class="panel-heading1">
                    <h6 class="panel-title">
                        <a data-toggle="collapse"  id="erpmaster1" style={{background:"none",color:"black"}} data-parent="#accordion1" href="#configuration">Configuration
                        </a>
                    </h6>
                </div>
                <div id="configuration" class="panel-collapse collapse collapseconfiguration">
                    <div class="panel-body">
                    <div style={{ fontSize: "18px" }}>If you want only the invoice amount to be displayed in the dashboard then kindly enable the 
            Add Estimate to invoice if not disable the option.</div>
            <br/>
           
            <b style={{ fontSize: "18px" }}>To add Estimate Amount with Invoice Amount,kindly follow the steps below:</b>
            <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
            <div style={{ fontSize: "18px" }}>2.Click on Configuration</div>
            <div style={{ fontSize: "18px" }}>3.Enable the Add Estimate to Invoice option</div> 
           
            <br/>
          
            <b style={{ fontSize: "18px" }}>To remove Estimate Amount from Invoice Amount,kindly follow the steps below:</b>
            <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
            <div style={{ fontSize: "18px" }}>2.Click on Configuration</div>
            <div style={{ fontSize: "18px" }}>3.Disable the Add Estimate to Invoice option</div> 
            
            </div>
                </div>
            </div>

{/*MESSAGE CENTER MODULE */}
<div class="panel panel-default">
                <div class="panel-heading1">
                    <h6 class="panel-title">
                        <a data-toggle="collapse"  id="erpmaster1" style={{background:"none",color:"black"}} data-parent="#accordion1" href="#messagecenter">Message Center
                        </a>
                    </h6>
                </div>
                <div id="messagecenter" class="panel-collapse collapse collapsemessagecenter">
                    <div class="panel-body">
                   
                    <div style={{ fontSize: "18px" }}>Sending an Emergency information to bulk of people in an organization is no 
              more a tedious or one by one manual process. The information can be passed to 
              the bulk of people in an organization either by message or by email with the help of a 
              fruitful feature called Message Center.
              The information to be conveyed to the people in an organization can be filtered 
              by selecting them.</div>
              <br/>
             
                <b style={{ fontSize: "18px" }}>To send SMS,kindly follow the steps below:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Communication</div>
                <div style={{ fontSize: "18px" }}>3.Click on SMS</div>
                <div style={{ fontSize: "18px" }}>4.Select the user (You can select all the users by selecting the
                check box near the column name customer name)</div>
                <div style={{ fontSize: "18px" }}>5.Type in the message</div>
                <div style={{ fontSize: "18px" }}>6.Click Submit</div>
                <div style={{ fontSize: "18px" }}>7.Message Sent Message will be displayed</div>
             
              <br/>
            
                <b style={{ fontSize: "18px" }}>To send Email,kindly follow the steps below:</b>
                <div style={{ fontSize: "18px" }}>1.Login to ThroughappsErp</div>
                <div style={{ fontSize: "18px" }}>2.Click on Communication</div>
                <div style={{ fontSize: "18px" }}>3.Click on Email</div>
                <div style={{ fontSize: "18px" }}>4.Select the user (You can select all the users by selecting the
                check box near the column name customer name)</div>
                <div style={{ fontSize: "18px" }}>5.Type in the message</div>
                <div style={{ fontSize: "18px" }}>6.Click Submit</div>
                <div style={{ fontSize: "18px" }}>7.Message Sent Message will be displayed</div>
              
              </div>
                </div>
            </div>




{/*TASK MAPPING MODULE */}
<div class="panel panel-default" style={{marginBottom:"5%"}}>
                <div class="panel-heading1" id="taskmappingmaindiv">
                    <h6 class="panel-title">
                        <a data-toggle="collapse"  id="erpmaster1" style={{background:"none",color:"black"}}  class="taskmapping" 
                        data-parent="#accordion1" href="#taskmapping" aria-expanded="false" aria-controls="taskmapping">Task Mapping
                        </a>
                    </h6>
                </div>
             
                <div id="taskmapping"  class="panel-collapse collapse collapsetaskmapping " 
                aria-labelledby="taskmappingmaindiv"  data-parent="#accordion1">
                    <div class="panel-body">
                    
                    <div style={{ fontSize: "18px" }}>Restricting the Employee to access specific page based on his role in the organization is no more a tedious job, This could be easily be done by using permission facility in Task Mapping feature.</div>
            <br/>
            
            <b style={{ fontSize: "18px" }}>To Aasign permission based on Role,kindly follow the steps below:</b>
            <div style={{ fontSize: "18px" }}>1. Login to ThroughappsErp</div>
            <div style={{ fontSize: "18px" }}>2. Click on TaskMapping</div>
            <div style={{ fontSize: "18px" }}>3. Select the Role</div>
            <div style={{ fontSize: "18px" }}>4. Select the Modules to assign permission for the selected Role</div>
            <div style={{ fontSize: "18px" }}>5.Click Give Permission</div>
            <div style={{ fontSize: "18px" }}>6.Updated Permission message will be displayed.</div>
          
            <br/>
        
            <b style={{ fontSize: "18px" }}>To Remove permission based on Role,kindly follow the steps below:</b>
            <div style={{ fontSize: "18px" }}>1. Login to ThroughappsErp</div>
            <div style={{ fontSize: "18px" }}>2. Click on TaskMapping</div>
            <div style={{ fontSize: "18px" }}>3. Select the Role</div>
            <div style={{ fontSize: "18px" }}>4. Select the Modules to be discharged for the selected Role</div>
            <div style={{ fontSize: "18px" }}>5.Click Give Permission</div>
            <div style={{ fontSize: "18px" }}>6.Updated Permission message will be displayed.</div>
            
                </div>
                </div>
            </div>


                     </div>     
</div>

        );}}

export default Help;