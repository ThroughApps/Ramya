
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

import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert';
import moment from 'moment';
import './ProfitLossReport.css';
import _ from 'underscore';
import HSBar from "react-horizontal-stacked-bar-chart";
import './AvailableStockReport.css';
import * as bootstrap from "bootstrap";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import ReportMenuPage from './ReportMenuPage';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import {Double_BackButtonComponent} from'./ServiceRegistration/ButtonComponent';
import * as SiIcons from 'react-icons/si';


var days1;
var today;
var currentRow;
var greaterNo;
var rowInfoData="";
class AvailableStockReport extends Component {

 

    constructor(props) {
         today = new Date();
         var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
  
        super(props)
        this.state = {
            fromDate: '',
            toDate: '',
            companyId: companyId,
            period:'',
            errorData:'',
            data:[],
            columns:[],

        }

    }
  
    componentDidMount() {

       
        window.scrollTo(0, 0);
  
      
        this.GetStockDetails();
    
    }

   
    handleUserInput = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });

   
        if(value !=0){
        var isNumberDt = $.isNumeric(value);
    
        if (isNumberDt !== false) {
          var sign_data = Math.sign(value);
          
          if (sign_data != -1) {
    
            var decimal_data = (value - Math.floor(value)) !== 0;
            
            if (decimal_data == false) {
                this.state.errorData='';
            }else{
                //decimal data not accepted
                this.state.errorData="! DecimalValue Not Accepted";
            }

            }else{
                //negative sign not accepted
                this.state.errorData="! Negative Value Not Accepted";
            }

            }else{
                //not  a number 
                this.state.errorData="! Enter A Valid Number";
            }
        }else{
            //no zero accepted
            this.state.errorData="! Zero Value Not Accepted";
        }


        }



    


  
  
   
    GetStockDetails(){

        var date=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
      
//         var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
//   self.state.companyId=companyId;
//   this.setState({
//       companyId:self.state.companyId,
//   })
        var self=this;
        this.state.data=[];
  
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,
                          
            }),

            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/InventoryReport/AvailableStockReport",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {           

               var no=0;           
               $.each(data, function (i, item) {            
                var action=<div style={{textAlign:"center"}}>-</div>;
                if(item.productCategory=="Own" && item.productType!="service"){   
                    action=<div style={{textAlign:"center"}}><button id="add"  href="#myModalview"
                    data-toggle="modal" data-target="#myModalview">Add</button></div>;
                }

                if(item.productType=="product"){
                    
                    var color="green";
                var widthPercent=item.quantity;
                no=Number(no)+Number(1);
                var redStyling;

                widthPercent=Number(item.quantity)/5;

                if(Number(widthPercent)<=5){
                    widthPercent=5;
                }
                while(Number(widthPercent)>100){
                    widthPercent=Number(widthPercent)/5;
                }

              
              
              

                if(Number(item.quantity)!=0){
                if(Number(item.quantity)<Number(item.quantityLimit)){
                    color="#f70000";
                    
                }

            
                self.state.data[i]={
                    "ProductId":item.productId,
                    "SNO":no,
                    "Name":item.productName,
                    "Available Stock":<div><div class="w3-progress-container w3-round-xlarge ">
                    <div class="w3-progressbar w3-round-xlarge  " style={{width:+widthPercent+"%",backgroundColor:color}}></div>
                    </div><span className='number'>{item.quantity +" Remaining"}</span></div>,
                    "Action":action,
                    "QuantityLimit":item.quantityLimit
                   };

            }else if(Number(item.quantity)==0){
                    color="red";
                    widthPercent="100";

             
                self.state.data[i]={
                    "ProductId":item.productId,
                    "SNO":no,
                    "Name":item.productName,
                    "Available Stock":<div><div class="w3-progress-container w3-round-xlarge ">
                    <div class="w3-progressbar w3-round-xlarge diagnalstrips " style={{width:+widthPercent+"%"}}></div>
                     </div><span className='number'>{item.quantity +" Remaining"}</span></div>,
                    "Action":action,
                    "QuantityLimit":item.quantityLimit
                   };

                }
                }else{
                    //when product type is service
                    self.state.data[i]={
                        "ProductId":item.productId,
                        "SNO":no,
                        "Name":item.productName,
                        "Available Stock":<div><span >{"SERVICE"}</span></div>,
                        "Action":action,
                        "QuantityLimit":""
                       };
                }
                


            });

                self.state.columns = self.getColumns();
self.setState({
    data:self.state.data,
    columns:self.state.columns,
})
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

    }
  
    onRowClick = (state, rowInfo, column, instance) => {
        var self=this;
         return {
     
             onClick: (e, handleOriginal) => {
     
                 if (column.Header == "Action") {
     
                    if(rowInfo!=undefined){
                        rowInfoData="";
   
                        self.state.productId= rowInfo.original["ProductId"]; 
                        self.state.productName =rowInfo.original["Name"]; // get current row 1st TD value
                        var quantity=rowInfo.original["Available Stock"].props.children[1].props.children;
                        quantity=quantity.match(/\d/g);
                        quantity=quantity.join("");
                        self.state.oldquantity=quantity;
                        self.state.quantity=quantity;
                        self.state.quantityLimit=rowInfo.original["QuantityLimit"];
            
                                
                        self.setState({
                            productName: self.state.productName,
                            productId:self.state.productId,
                            quantity:self.state.quantity,
                            oldquantity:self.state.oldquantity,
            
                        });
            
                        rowInfoData=rowInfo;
                      
                        // $.noConflict(); 
                        // $('#myModalview').modal('show'); 

           
                           }
      
                   
                 }
             }
         };
     };

    AddQuantity(){

            var self=this;
            
            var productId=rowInfoData.original["ProductId"];
            var sno=rowInfoData.original["SNO"];
            var name=rowInfoData.original["Name"];
            var availableStock=rowInfoData.original["Available Stock"];
            var action=rowInfoData.original["Action"];
            var quantityLimit=rowInfoData.original["QuantityLimit"];
            var rowIndexValue=rowInfoData.index;

        if(this.state.errorData==""){
                    
                $.ajax({
                    type: 'POST',
                    data: JSON.stringify({
                        companyId: this.state.companyId,
                        productId:this.state.productId,
                        quantity:this.state.quantity,
                                  
                    }),
        
                    url: " http://15.206.129.105:8080/ThroughBooksCOAPI/InventoryReport/ProductUpdate",
                    contentType: "application/json",
                    dataType: 'json',
                    async: false,
                    success: function (data, textStatus, jqXHR) {
        
                       
        
                        if(data.productCategory=="Success"){
        
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title:'Add Qunatity For The Product '+self.state.productName,    
                                showConfirmButton: false,
                                timer: 2000
                            })
        
                       
                          var color="green";
                          var quantity=Number(self.state.oldquantity)+Number(self.state.quantity);
                          var widthPercent=quantity;
                         
                          widthPercent=Number(quantity)/5; 
                     
                          if(Number(widthPercent)<=5){
                              widthPercent=5;
                          }
                           
                          while(Number(widthPercent)>100){ 
                              widthPercent=Number(widthPercent)/5;
                          
                              
                          }
                        
                            if(Number(quantity)!=0){
                            if(Number(quantity)<Number(self.state.quantityLimit)){
                                color="yellow";
                            }
         
                            var array = [...self.state.data]; // make a new copy of array instead of mutating the same array directly.
                                array.splice(rowIndexValue, 1);
                                self.state.data=[];
                                self.state.data=array;
                                self.setState({data: array});
             
                                for (var i =  self.state.data.length; i > rowIndexValue; i--) { 
                                 self.state.data[i] = self.state.data[i - 1]; 
                             } 
                   
                          
             
                                self.state.data[rowIndexValue]={"ProductId":productId,
                                "SNO":sno,
                                "Name":name,
                                "Available Stock":<div><div class="w3-progress-container w3-round-xlarge">
                                <div class="w3-progressbar w3-round-xlarge " style={{width:widthPercent+"%",backgroundColor:color}}></div>
                                </div><span>{quantity+" Remaining"}</span></div>,
                                 "Action":action,
                                "QuantityLimit":quantityLimit};
    

                        }else if(Number(quantity)==0){
                                color="red";
                                widthPercent="50";

                                var array = [...self.state.data]; // make a new copy of array instead of mutating the same array directly.
                                array.splice(rowIndexValue, 1);
                                self.state.data=[];
                                self.state.data=array;
                                self.setState({data: array});
             
                                for (var i =  self.state.data.length; i > rowIndexValue; i--) { 
                                 self.state.data[i] = self.state.data[i - 1]; 
                             } 
                   
                          
             
                                self.state.data[rowIndexValue]={"ProductId":productId,
                                "SNO":sno,
                                "Name":name,
                                "Available Stock":<div><div class="w3-progress-container w3-round-xlarge">
                                <div class="w3-progressbar w3-round-xlarge diagnalstrips" style={{width:+widthPercent+"%"}}></div>
                                </div><span>{quantity+" Remaining"}</span></div>,
                                 "Action":action,
                                "QuantityLimit":quantityLimit};
                 


                            }
        
                            
                        }else  if(data.productCategory=="Fail"){
                          
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title:'Try Updating Afetr SomeTime', 
                                showConfirmButton: false,
                                timer: 2000
                              })

                        }
                                    
        
        
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
           
            }else{

                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title:  'Updation Failed Due To Improper Data',  
                    showConfirmButton: false,
                    timer: 2000
                  })
            }
            
            

        self.state.productId='';
        self.state.productName='';
        self.state.quantity='';
        self.state.oldquantity='';
        self.state.quantityLimit='';
        self.state.errorData='';

        self.setState({
            productId:self.state.productId,
            productName:self.state.productName,
            quantity:self.state.quantity,
            oldquantity:self.state.oldquantity,
            quantityLimit:self.state.quantityLimit,
            errorData:self.state.errorData,

        })
    }


    getColumns(){

        return Object.keys(this.state.data[0]).map(key => {
         if (
           key != "ProductId" &&
           key != "QuantityLimit"
          
         ) {
           return {
             Header: key,
             accessor: key
           };
         } else {
           return {
             Header: key,
             accessor: key,
             show: false
           };
         }
       });
     }
    


     BackbtnFunc() {
        var planName = CryptoJS.AES.decrypt(localStorage.getItem("PlanName"),"shinchanbaby").toString(CryptoJS.enc.Utf8);
      
    
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


          <div class="">
           {/*  <button type="button" id="print" class="btn btn-default btn_rpt_print "
              onClick={() => this.printdiv('printarea')} >
              <i class="fa fa-print" aria-hidden="true"
                style={{ fontSize: "17px", border: "none" }}> Print</i></button>
         */}  </div>
        

               
        <div className="inv_HeaderCls">
          <h3>Available Stock Report</h3>
        </div>

        </div>

                <div class="">
          {/*       <div class="row" style={{marginTop:"13px"}}>
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
                    <div class="card-header">
                          <h3 id="companyHeader" style={{marginLeft:"150px"}}> {this.state.companyName}</h3>
                  
                  <h4  id="reportHeader" style={{marginLeft:"130px"}}>Available Stock Report</h4>
             
                    
                      </div>
                    </div> 
 </div> */}
 <div>

 </div>
     
<div class="row">
    <div class="col-sm-4">
    <div class="text-center">
    <span class="w3-progressbar w3-round-xlarge" style={{width:"20px",height:"20px", backgroundColor:"#008000"}}>
                    </span><br />
                    <p class="cirletext">Stock Above Limit</p>
                    </div>
    </div>
    <div class="col-sm-4">
    <div class="text-center">
    <span class="w3-progressbar w3-round-xlarge" style={{width:"20px",height:"20px", backgroundColor:"#ffe05d"}}></span><br />
<p class="cirletext">Stock Below Limit</p>
                    </div>
        </div>
        <div class="col-sm-4">
    <div class="text-center">
    <span class="w3-progressbar w3-round-xlarge diagnalstrips" style={{width:"20px",height:"20px"}}></span><br />
    <p class="cirletext">Stock empty</p>
                    </div>
        </div>
</div>
                   

                  


<div class="row">
        
    <ReactTable  
              data={this.state.data}
              columns={this.state.columns}
              noDataText="No Data Available"
              filterable={false}
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

     

<div style={{textAlign:"center"}} id="tableheading"></div>
    <table class="table table-bordered" style={{ margin: "auto" }} id="availablestocktable" style={{marginTop: "32px",marginBottom:"5%"}}>
    </table>
    </div>


     <div class="modal fade" id="myModalview" data-backdrop="false" >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title" style={{ align: "center",display: "contents" }}>Add Quantity</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>

              <div class="modal-body" style={{ display: "grid" }}>


                <label for="productname">PrductName</label>

                <input type="text"
                className="textfield"
                  onChange={this.handleUserInput}
                  value={this.state.productName}
                  id="productname"
                  name="productName" readOnly />

                <label for="quantity">Quantity</label>

                <input type="text"
                className="textfield"
                  onChange={this.handleUserInput}
                  value={this.state.quantity}
                  id="quantity"
                  name="quantity"  />
                  <span id="quantityerror" style={{color:"red"}}>{this.state.errorData}</span>


              </div>


              <div class="modal-footer">
                <button type="button" class="btn btn-info" onClick={() => this.AddQuantity()}
                  data-dismiss="modal">Submit</button>

                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
                
      </div>




            </div>
        );
    }

}
export default AvailableStockReport;