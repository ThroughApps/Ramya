import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import registerServiceWorker from '../registerServiceWorker';
import CryptoJS from 'crypto-js';


import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';

//css
import * as moment from "moment";
import _ from 'underscore';
import Select from 'react-select';
import ReactTable from "react-table";
import "react-table/react-table.css";
import SubmitButtonComponent from '../ServiceRegistration/ButtonComponent';
import{  ClearButtonComponent,CancelButtonComponent,AddButtonComponent,
    UpdateButtonComponent,SubmitProceedButtonComponent} from '../ServiceRegistration/ButtonComponent';
import Case from 'case';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { GetEmployeeSite,GetCurrentSite  } from '../ConstSiteFunction';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import { SetEnquiryDataFunc } from './SaleInvoice';
import { InvoiceEnquiryCartIcons } from '../ServiceRegistration/IconComponents';
import { FaHackerNewsSquare } from 'react-icons/fa';
import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import {
  DataGrid,
  getThemePaletteMode,
  GridColumns,
  GridRowsProp,
  GridColDef, GridValueGetterParams ,
  GridEditRowsModel
} from '@material-ui/data-grid';


import {CheckNumberFormat,CheckNumberFormat_WithoutDecimal} from './InvoiceValidations';
import { InvoiceProductQtyModal } from '../CommonModalPages';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as BiIcons from "react-icons/bi";

var enquiryData;


const customStyles = {
  content: {
  top: '50%',
  left: '50%',
  right: 'auto',
  bottom: 'auto',
  marginRight: '-50%',
  transform: 'translate(-50%, -50%)',
  width: "491px"
  }
  };
  
class InvoiceEnquiry extends  Component {

    constructor(props) {
        super()


    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
  
  
    this.state={
        companyId:companyId,
        employeeName: employeeName,
        role: role,
        staffId: staffId,
        enquiryData:[],
        enquiryColumns:[],
           /* {
                Header: "SNO",
                accessor: "SNO",
              },
              {
                Header: "ProductId",
                accessor: "ProductId",
              },
              {
                Header: "Product",
                accessor: "Product",
              },
              {
                Header: "Quantity",
                accessor: "Quantity",
              },
              {
                Header: "Actions",
                accessor: "Actions",
              },




        ], */
     /*   columns:[
            { field: 'id', 
            headerName: 'ID', 
            width: 90,
            editable: false },
    {
      field: 'SNO',
      headerName: 'SNO',
      width: 150,
      editable: false,
    },
    {
      field: 'ProductId',
      headerName: 'ProductId',
      width: 150,
      editable: false,
    },
    {
      field: 'Product',
      headerName: 'Product',
      width: 110,
      editable: false,
    },
    {
      field: 'Quantity',
      headerName: 'Quantity',
      description: 'This column has a quantity value of the product',
      sortable: true,
      editable: true ,
      width: 160,
    },
    {
        field: 'Actions',
        headerName: 'Actions',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        editable: false, 
        width: 180,
        renderCell: (params) => {
            return (
                <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                 <div>
                 <InvoiceEnquiryCartIcons onInvoiceEnquiryCartProductEdit={this.EditEnquiryProduct}
                 onInvoiceEnquiryCartProductAdd={this.AddEnquiryProduct} 
                  onInvoiceEnquiryCartProductMinus={this.MinusEnquiryProduct}  
                  onInvoiceEnquiryCartProductDelete={this.DeleteEnquiryProduct} />
             </div>
                 </div>
            );
         }
        }
        ],
        rows:[],
       */
    }

    this.renderEditable = this.renderEditable.bind(this);
   // this.data = makeData();

    this.EditEnquiryProduct=this.EditEnquiryProduct.bind(this);
    this.ProductQtyFunc=this.ProductQtyFunc.bind(this);
    this.AddEnquiryProduct=this.AddEnquiryProduct.bind(this);
    this.MinusEnquiryProduct=this.MinusEnquiryProduct.bind(this);
    this.DeleteEnquiryProduct=this.DeleteEnquiryProduct.bind(this);
    
    
}

    componentDidMount(){

        var self=this;
     console.log("DID MOUNT PROPS DATA :",this.props);
     console.log("DID MOUNT PROPS CART ENQUIRY DATA :",self.props.enquiryCartData);

   /* self.state["qty"+item.ProductId]=item.Quantity;
     self.setState({
         ["qty"+item.ProductId]:item.Quantity;
     })
     */
    
     self.state.customerName=self.props.stateData.customerName;
     self.state.customerId=self.props.stateData.customerId;
     self.state.date=self.props.stateData.date;

     var count=0;
     $.each(self.props.enquiryCartData, function (i, item) {
    
       count=Number(count)+1;
           self.state.enquiryData[i]={

               "SNO":count,
               "ProductId":item.ProductId,
               "Product":item.Product,
               "ProductType":item.ProductType,
               "Quantity":item.Quantity,
            // "Quantity":<input name={"qty"+item.ProductId} value={self.state["qty"+item.ProductId]} onChange={self.onChangeQuantity} />
                "Actions":<div>
                   <InvoiceEnquiryCartIcons  onInvoiceEnquiryCartProductEdit={self.EditEnquiryProduct} 
                   onInvoiceEnquiryCartProductAdd={self.AddEnquiryProduct} 
                    onInvoiceEnquiryCartProductMinus={self.MinusEnquiryProduct}  
                    onInvoiceEnquiryCartProductDelete={self.DeleteEnquiryProduct} />
               </div> 
           }

      
           
     });
    

var rowsCount=0;
var enquiryData=[...self.props.enquiryCartData];
self.state.rows=[];

     $.each(enquiryData, function (j, item) {
   
        rowsCount=Number(rowsCount)+1;
 
           self.state.rows[j]={
             id:rowsCount,
             SNO:count,
             ProductId:item.ProductId,
             Product:item.Product,
             Quantity:item.Quantity,
          // "Quantity":<input name={"qty"+item.ProductId} value={self.state["qty"+item.ProductId]} onChange={self.onChangeQuantity} />
          /* Actions:<div>
                 <InvoiceEnquiryCartIcons onInvoiceEnquiryCartProductAdd={self.AddEnquiryProduct} 
                  onInvoiceEnquiryCartProductMinus={self.MinusEnquiryProduct}  
                  onInvoiceEnquiryCartProductDelete={self.DeleteEnquiryProduct} />
             </div>
             */
           
         }
    
            
      });
   
      var gridRows=self.state.rows ;
   
      if(self.state.enquiryData.length>0){
          self.state.enquiryColumns=self.GetColumns();
      } 

   self.setState({
       rows:[...self.state.rows],
       enquiryData:self.state.enquiryData,
       customerName:self.state.customerName,
       customerId:self.state.customerId,
       date:self.state.date,
   })

   console.log("self.state.enquiryData :",self.state.enquiryData,self.state.enquiryColumns);

     
    }
  

    GetColumns() {

        return Object.keys(this.state.enquiryData[0]).map(key => {

            return {
                Header: key,
                accessor: key,

            };

        });
    }

    onTrRowClick = (state, rowInfo, column, instance) => {
        var self = this;
      
         //  console.log("ROW INFO :",rowInfo);
      
        if (typeof rowInfo !== "undefined") {
          return {
            onClick: (e, handleOriginal) => {
              this.setState({
                selected: rowInfo.index
              });
              if (handleOriginal) {
                handleOriginal()
              }
      
              console.log("rowInfo :",rowInfo);
      
              self.state.rowInfo=rowInfo;

              self.state.cartEnquiryProductSno= rowInfo.original["SNO"];
              self.state.cartEnquiryProductId = rowInfo.original["ProductId"];
              self.state.cartEnquiryProductName=rowInfo.original["Product"];
              self.state.cartEnquiryProductType=rowInfo.original["ProductType"];
              self.state.cart_EnquiryProductQty=rowInfo.original["Quantity"];
                  
              self.state.rowIndexValue = rowInfo.index;
      
            
              self.setState({
                cartEnquiryProductSno:self.state.cartEnquiryProductSno,
                cartEnquiryProductId:self.state.cartEnquiryProductId,
                cartEnquiryProductName:self.state.cartEnquiryProductName,
                cartEnquiryProductType:self.state.cartEnquiryProductType,
                cart_EnquiryProductQty:self.state.cart_EnquiryProductQty,
            
                rowIndexValue:self.state.rowIndexValue,
                rowInfo:self.state.rowInfo,
              })
      
             /* self.state.enquiryData.splice(self.state.rowIndexValue,1);
              self.setState({
                enquiryData:self.state.enquiryData,
              })
              */
              
             if(this.state.action=="Add"){
                var newQty=Number(self.state.cart_EnquiryProductQty)+Number(1);
                this.setState(oldState => {

                    let data = oldState.enquiryData.slice();
                    let copy = Object.assign({}, data[rowInfo.index]);
                    copy.SNO=self.state.cartEnquiryProductSno;
                    copy.ProductId=self.state.cartEnquiryProductId;
                    copy.Product=self.state.cartEnquiryProductName;
                    copy.ProductType=self.state.cartEnquiryProductType;
                    copy.Quantity = newQty;
                    copy.Actions=<div>
                                <InvoiceEnquiryCartIcons  onInvoiceEnquiryCartProductEdit={self.EditEnquiryProduct} 
                                onInvoiceEnquiryCartProductAdd={self.AddEnquiryProduct} 
                                onInvoiceEnquiryCartProductMinus={self.MinusEnquiryProduct}  
                                onInvoiceEnquiryCartProductDelete={self.DeleteEnquiryProduct} />
                                </div> ;
                    data[rowInfo.index] = copy;
                  
                    self.state.enquiryData=data;
                    this.state.action="";

                    this.setState({
                        enquiryData: data,
                        action:this.state.action,
                    });

                    self.props.SetEnquiryTableData(self.state.enquiryData);
                  });

                 
             
             }else if(this.state.action=="Minus"){

              var newQty=Number(self.state.cart_EnquiryProductQty)-Number(1);

              if(newQty <= 0){
                newQty=1;
                toast.error(<div><BiIcons.BiEdit />! Enquiry product quantity cannot be 0 </div>, {
                 position: "top-right",
                 autoClose: 5000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: undefined,
                 marginTop: "60px",
               });
              }

              this.setState(oldState => {

                  let data = oldState.enquiryData.slice();
                  let copy = Object.assign({}, data[rowInfo.index]);
                  copy.SNO=self.state.cartEnquiryProductSno;
                  copy.ProductId=self.state.cartEnquiryProductId;
                  copy.Product=self.state.cartEnquiryProductName;                  
                  copy.ProductType=self.state.cartEnquiryProductType;
                  copy.Quantity = newQty;
                  copy.Actions=<div>
                  <InvoiceEnquiryCartIcons  onInvoiceEnquiryCartProductEdit={self.EditEnquiryProduct} 
                  onInvoiceEnquiryCartProductAdd={self.AddEnquiryProduct} 
                  onInvoiceEnquiryCartProductMinus={self.MinusEnquiryProduct}  
                  onInvoiceEnquiryCartProductDelete={self.DeleteEnquiryProduct} />
                  </div> ;
                  data[rowInfo.index] = copy;
            
                  self.state.enquiryData=data;
                  this.state.action="";
                  this.setState({
                      enquiryData: data,
                      action:this.state.action,
                  });
                  self.props.SetEnquiryTableData(self.state.enquiryData);
                });

        




             }else if(this.state.action=="Delete"){
              
              this.setState(oldState => {

               //   let data = oldState.enquiryData.splice(rowInfo.index,1);
                //  let copy = Object.assign({}, data[rowInfo.index]);
                //  copy.Quantity = newQty;
               //   data[rowInfo.index] = copy;
             //  alert("rowInfo.index :"+rowInfo.index);
               var enquiryData=[...self.state.enquiryData];

            var enquiryData1=enquiryData.splice(rowInfo.index,1);
               console.log("enquiryData  :",enquiryData1);

               self.state.enquiryData=enquiryData;
               this.state.action="";
                  this.setState({
                      enquiryData: enquiryData,
                      action:this.state.action,
                  });
                  self.props.SetEnquiryTableData(self.state.enquiryData);
                });
             }
            },
            style: {
              //  background: rowInfo.index === this.state.selected ? 'rgb(66 139 202)' : '',
             // color: rowInfo.index === this.state.selected ? 'white' : ''
              },
          }
        }
        else {
          return {
            onClick: (e, handleOriginal) => {
              if (handleOriginal) {
                handleOriginal()
              }
            },
            style: {
              // background: 'white',
              // color: 'black'
            },
          }
        }
      
      };

      handleInputChange = (cellInfo, event) => {
        let data = [...this.state.data];
        data[cellInfo.index][cellInfo.column.id] = event.target.value;
    
        this.setState({ data });
      };

      renderEditable = cellInfo => {
        const cellValue = this.state.data[cellInfo.index][cellInfo.column.id];
    
        return (
          <input
            placeholder="type here"
            name="input"
            type="text"
            onChange={this.handleInputChange.bind(null, cellInfo)}
            value={cellValue}
          />
        );
      };

      onChangeQuantity = (e) => {
        const name = e.target.name;
        const value =e.target.value;
             
        console.log("onChangeQuantity name: ",name," value :",value);

        this.state[name]=value;
        this.setState({
        [name]: value
        });
        }
  
  EditEnquiryProduct(){
          console.log("EditEnquiryProduct called");
          var self=this;
          self.state.action="Edit";

          this.ProductQtyModal();

        }

  ProductQtyModal(){
          var self=this;
          self.state.productQtyModal=true;

          self.setState({
            productQtyModal:self.state.productQtyModal,
          })
        }

        ProductQtycloseModal(buttonData){

          var self=this;

          if(buttonData=="Save"){

            
            this.setState(oldState => {

              let data = oldState.enquiryData.slice();
              let copy = Object.assign({}, data[self.state.rowInfo.index]);
              copy.SNO=self.state.cartEnquiryProductSno;
              copy.ProductId=self.state.cartEnquiryProductId;
              copy.Product=self.state.cartEnquiryProductName;              
              copy.ProductType=self.state.cartEnquiryProductType;
              copy.Quantity = self.state.newQty;
              copy.Actions=<div>
                          <InvoiceEnquiryCartIcons  onInvoiceEnquiryCartProductEdit={self.EditEnquiryProduct} 
                          onInvoiceEnquiryCartProductAdd={self.AddEnquiryProduct} 
                          onInvoiceEnquiryCartProductMinus={self.MinusEnquiryProduct}  
                          onInvoiceEnquiryCartProductDelete={self.DeleteEnquiryProduct} />
                          </div> ;

              data[self.state.rowInfo.index] = copy;
        
              self.state.newQty="";
              self.state.enquiryData=data;
              this.setState({
                  enquiryData: data,
              });

              self.props.SetEnquiryTableData(self.state.enquiryData);
            });

           

          }


          self.state.productQtyModal=false;
          self.state.productQtycloseModal=true;

          self.setState({
            productQtyModal:self.state.productQtyModal,
            productQtycloseModal:self.state.productQtycloseModal,
          })
        }

        ProductQtyFunc= (value) => {

          var self=this;
        //  console.log("ProductQtyMinusFunc :",value);
          this.state.newQty= value;
        
          }

    AddEnquiryProduct(){

        console.log("AddEnquiryProduct called");
        var self=this;
        self.state.action="Add";

      
        
    } 
    
    
    MinusEnquiryProduct(){

        console.log("MinusEnquiryProduct called");
        var self=this;
        var newQty;
   self.state.action="Minus";
     

   
     
    } 
    
    DeleteEnquiryProduct(){

        console.log("DeleteEnquiryProduct called");
        var self=this;
        var newQty;
        self.state.action="Delete";

     
    }

 
    handleEditCellChangeCommitted = (row) => {
        console.log("handleEditCellChangeCommitted ::",row)
      }

      handleEditCellChange = (row) => {
        console.log("handleEditCellChange ::",row)
    
                const data = row.props; // Fix eslint value is missing in prop-types for JS files
                const newState = {};

            if (row.field === 'Quantity') {
                var qty=row.props.value;
                var qtyValidationData=CheckNumberFormat_WithoutDecimal(qty);
        
                if(qtyValidationData==true){
                const data = row.props; // Fix eslint value is missing in prop-types for JS files
              //  const isValid = CheckNumberFormat_WithoutDecimal(data.value);
             //   const newState = {};
                newState[row.id] = {
                  //...editRowsModel[id],
                  Quantity: { ...row.props,error: '!Incorrect NumberFormat'},
                  
                };
              //  setEditRowsModel((state) => ({ ...state, ...newState }));
              }else{
                //  alert("incorrect");
                  newState[row.id] = {
                    //...editRowsModel[id],
                    Quantity: { },
                  };
              }
              }
            
          //  [editRowsModel]
        
    
           


      }

      onRowSelect=(e) => {

            console.log("onRowSelect :",e);

      }
     
      SaveInvoiceEnquiryFunc(){

        var self=this;

        console.log("ENQUIRY DATA :",JSON.stringify({
          companyId: this.state.companyId,
          
        //STAFF INFO
          staffId:this.state.staffId,
          staffName:this.state.staffName,
                            
          //CUSTOMER INFO
          customerId:this.state.customerId,
          customerName:this.state.customerName,
       
          
         
          //INVOICE ENQUIRY DETAILS
          date:this.state.date,
          enquiryCartProduct:JSON.stringify(this.state.enquiryData),
          site:GetCurrentSite()

        }),
);

if(this.state.customerId!=undefined && this.state.customerId!="" && this.state.enquiryData.length>0){
        $.ajax({
          type: 'POST',
          data: JSON.stringify({
            companyId: this.state.companyId,
            
          //STAFF INFO
            staffId:this.state.staffId,
            staffName:this.state.staffName,
                              
            //CUSTOMER INFO
            customerId:this.state.customerId,
            customerName:this.state.customerName,
          //  cust_address:this.state.customerAddress,
           // cust_gstNo:this.state.customerGSTINNO,
           // cust_ContactNo:this.state.contactNo,
           // cust_EmailId:this.state.emailId,
           // companyName:this.customerCompanyName,
            
           
            //INVOICE ENQUIRY DETAILS
            date:this.state.date,
            enquiryCartProduct:JSON.stringify(this.state.enquiryData),
            site:GetCurrentSite()

          }),
          url: " http://15.206.129.105:8080/ThroughBooksCOAPI/saleInvoice/AddInvoiceEnquiryDetails",
          
          contentType: "application/json",
          dataType: 'json',
          async: false,
          success: function (data, textStatus, jqXHR) {
            
              if(data.invoiceEnquiryResponse=="Success"){
                
                   
                  console.log("SALE INVOICE SUCCESS AJAX DATA :",data);

                  self.state.enquiryData=[];
                  self.setState({
                    enquiryData:self.state.enquiryData,
                  })

                  self.props.SetEnquiryTableData(self.state.enquiryData);

                  toast.success("! Added invoice Enquiry details successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    marginTop: "60px",
                  });

               

              }else if(data.invoiceResponse=="Failed"){
                  toast.error("! Adding invoice Enquiry details failed", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  marginTop: "60px",
                });

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

          var message="! No product available for enquiry";
          if(this.state.customerId==undefined || this.state.customerId==""){
            message="! Kindly select customer details";
          }
          
          toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            marginTop: "60px",
          });
        }
      }

   render() {

  //  const [editRowsModel, setEditRowsModel] = React.useState<GridEditRowsModel>({});


     return (

        <div>

          {/*    <div style={{ height: 400, width: '100%', fontSize: "1.5rem" }}>
      <DataGrid
        rows={this.state.rows}
        columns={this.state.columns}
        pageSize={5}
        onRowSelected={(e) => this.onRowSelect(e)} 
        onEditCellChange={this.handleEditCellChange}
        onEditCellChangeCommitted={this.handleEditCellChangeCommitted}
       // checkboxSelection
       // disableSelectionOnClick
      />
    </div> */}
               <div className="row">



                   
                 <ReactTable style={{ overflow: "auto" }}
                        data={this.state.enquiryData}
                        columns={this.state.enquiryColumns}
                        //noDataText=""
                        filterable
                        defaultPageSize={5}
                        className="-striped -highlight"
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
                        getTdProps={this.onTrRowClick}
                    />
                    
                </div>
                
                <div class="text-center">
                 <button type="button" onClick={() => this.SaveInvoiceEnquiryFunc()} style={{ marginRight: "500px",marginTop:'35px' }} class="btn btn-default pull-right">Save Enquiry</button> <span></span>
                 </div>

                <Modal
isOpen={this.state.productQtyModal}
//  onAfterOpen={this.customerafterOpenModal}
onRequestClose={this.state.productQtycloseModal}
style={customStyles}
contentLabel="Example Modal"
>
<InvoiceProductQtyModal stateData={this.state} ProductQtyFunc={this.ProductQtyFunc} />
<button onClick={() => this.ProductQtycloseModal("Save")} >Save</button>
<button onClick={() => this.ProductQtycloseModal("Close")} >Close</button>
</Modal>
               

                <ToastContainer style={{marginTop:"60px"}}/>

      </div>
        )
   }
}
export default  InvoiceEnquiry ;




