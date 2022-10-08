import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import './datepicker.css';

import datepicker from 'jquery-ui/ui/widgets/datepicker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import ProductListView from './ProductListView';
import ProductListEdit from './ProductListEdit';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './DownloadButton.css';
import "./MainPageRedirectButton.css";
import AddProduct1 from './AddProduct';
import Case from "case";
import {ProductIcons, Invoice_xlDownldBtn} from './ServiceRegistration/IconComponents';
import ReactTooltip from 'react-tooltip';
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import './ProductListCSS.css';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
  GetCurrencies,SetCurrentPage,GetDynamicFieldsName   } from './ConstSiteFunction';
  import _ from 'underscore';


  
var currentRow;
class ProductList1 extends Component {
  constructor(data) {
    super(data)
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    this.state = {
      date: today,
      productName: '',
      description: '',

      staffId: staffId,
      employeeName: employeeName,
      role: role,
      columns: [],
      dataList: [],


    };

    this.AddProduct=this.AddProduct.bind(this);
    this.ViewProduct = this.ViewProduct.bind(this);
    this.DeleteProduct=this.DeleteProduct.bind(this);
    this.EditProduct = this.EditProduct.bind(this);
    this.DownLoadProduct=this.DownLoadProduct.bind(this);

  }

  componentDidMount() {
    SetCurrentPage("ProductList");
 
    $("#nodata").hide();
    $("#tableOverflow1").hide();

    this.GetData();
    window.scrollTo(0, 0);

     //DYNAMIC FIELD NAMES
     var dynamicTaxData=GetDynamicFieldsName("Tax");
     console.log("dynamicTaxData :",dynamicTaxData);
             
     var tax1LabelName=_.findWhere(dynamicTaxData,{fieldLabelName:'tax1'});
     this.state.tax1LabelName=tax1LabelName.fieldTextName;
     console.log(tax1LabelName.fieldTextName);
     
     var tax2LabelName=_.findWhere(dynamicTaxData,{fieldLabelName:'tax2'});
     this.state.tax2LabelName=tax2LabelName.fieldTextName;
     
     console.log(tax2LabelName.fieldTextName);
     var tax3LabelName=_.findWhere(dynamicTaxData,{fieldLabelName:'tax3'});
     this.state.tax3LabelName=tax3LabelName.fieldTextName;
     
     
     this.setState({
       tax1LabelName:this.state.tax1LabelName,
       tax2LabelName:this.state.tax2LabelName,
       tax3LabelName:this.state.tax3LabelName,
     
     })

     this.state.columns=[
       {
         Header:"SNo",
         accessor:"SNo"
       },
       {
        Header:"Product Name",
        accessor:"Product Name"
      },
      {
        Header:"Sale Rate",
        accessor:"Sale Rate"
      },
      {
        Header:"Purchase Rate",
        accessor: "Purchase Rate"
      },
      {
        Header:this.state.tax1LabelName,
        accessor:"CGST"
      },
      {
        Header:this.state.tax2LabelName,
        accessor:"SGST"
      },
      {
        Header:this.state.tax3LabelName,
        accessor:"IGST",
        show:false,
      },
      {
        Header:"HSN Code",
        accessor:"HSN Code",
        show:false,
      },
      {
        Header: "Sale Rate",
        accessor: "Sale Rate"
      },
      {
        Header: "Sale Rate With Tax",
        accessor: "Sale Rate With Tax"
      },
      {
        Header: "Purchase Rate With Tax",
        accessor: "Purchase Rate With Tax"
      },
      {
        Header: "Product Type",
        accessor: "Product Type"
      },
      {
        Header: "Product Category",
        accessor: "Product Category"
      },
      {
        Header: "Quantity",
        accessor: "Quantity"
      },
      {
        Header: "Description",
        accessor: "Description",
        show:false,
      },
      {
        Header:  "ProductId",
        accessor:  "ProductId",
        show:false,
      },
      {
        Header: "QuantityLimit",
        accessor: "QuantityLimit",
        show:false,
      }

     ];


  }


  GetData() {
    $("ReactHTMLTableToExcel").css("background-color","#05a4b5");
    $(".btn-default").css("background-color","#05a4b5");
    $("ReactHTMLTableToExcel").css("color","white");
    $(".btn-default").css("color","white");
    var self = this;
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,

      }),
      contentType: "application/json",
      dataType: 'json',
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/master/saleproductreport",
      async: false,
      crossDomain: true,
      success: function (data, textStatus, jqXHR) {
        var no;
        self.state.dataList = [];
        if (data.saleProductRetrievelist.length != 0) {
       
          var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Product Name</th><th>Product Type</th><th>Product Category</th><th>Quantity</th><th>QuantityLimit</th><th>{this.state.tax1LabelName}(%)</th><th>{this.state.tax2LabelName}(%)</th><th>IGST(%)</th><th>HSN Code</th><th style="width: 5px; ">Sale Rate$</th><th style="width: 5px; ">Purchase Rate$</th><th>Description</th></tr></thead>';

          $.each(data.saleProductRetrievelist, function (i, item) {
            no = parseInt(i) + 1;
            tab += '<tbody id= "myTable" ><tr  id="tabletextcol" ><td>' + no + '</td><td>' + item.productName + '</td><td>' + item.productType + '</td><td>' + item.productCategory + '</td><td>' + item.quantity + '</td><td>' + item.quantityLimit + '</td><td>' + item.Statetax + '</td><td>' + item.sgst + '</td><td>' + item.igst + '</td><td>' + item.hsnCode + '</td><td>' + item.saleRate + '</td><td>' + item.purchaseRate + '</td><td class="description">' + item.description + '</td></tr></tbody>';
            //  if(item.productType=="service"){

            //  }
self.state.salerateWithGST=Math.round(Number(item.saleRate) + ((0.01 * Number(item.cgst)) * Number(item.saleRate)) + (0.01 * Number(item.sgst) * Number(item.saleRate)) + (0.01 * Number(item.igst) * Number(item.saleRate)));
self.state.purchaserateWithGST=Math.round(Number(item.purchaseRate) + ((0.01 * Number(item.cgst)) * Number(item.purchaseRate)) + (0.01 * Number(item.sgst) * Number(item.purchaseRate)) + (0.01 * Number(item.igst) * Number(item.purchaseRate)));
            
var tax1LabelName=self.state.tax1LabelName+"(%)";
var tax2LabelName=self.state.tax2LabelName+"(%)";
var tax3LabelName=self.state.tax3LabelName+"(%)";


            self.state.dataList[i] = {
              "SNo": no,
              "Product Name": item.productName,
              "Sale Rate": item.saleRate,
              "Purchase Rate": item.purchaseRate,
              "CGST": item.cgst,
              "SGST": item.sgst,
              "HSN Code": item.hsnCode,
              "Sale Rate": item.saleRate,              
              "Sale Rate With Tax": self.state.salerateWithGST,
              "Purchase Rate With Tax": self.state.purchaserateWithGST,
              "Product Type": Case.capital(item.productType),
              "Product Category": item.productCategory,
              "Quantity": item.quantity,
              "IGST": item.igst,
              "Description": item.description,
              "ProductId": item.productId,
              "QuantityLimit": item.quantityLimit,
             

            
            };
          });
          $("#tableHeadings").append(tab);
        /*  if (self.state.dataList.length > 0) {
            self.state.columns = self.getColumns();
          } */
        }
        else {
          $("#nodata").show();

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

      }
    });
  }

  getColumns() {
    return Object.keys(this.state.dataList[0]).map(key => {

   

      if (
        key != "Description" &&
        key != "ProductId" &&
        key != "QuantityLimit" &&
        key != "IGST(%)" &&       
        key != "HSN Code"
      ) {
        return {
          Header: key,
          accessor: key
        };
      } else if( key==="Product Name"){
        return {
          Header: key,
          accessor: key,
          show: false,
         className:'colorchange'
          
        };
      }
      else {
        return {
          Header: key,
          accessor: key,
          show: false
        };
      }
    });
  }



  DeleteFunc(rowIndexValue) {
    var self = this;

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        productName: self.state.productName,
        productId: self.state.productId,
        companyId: self.state.companyId,
        staffId: self.state.staffId,
        employeeName: self.state.employeeName,
        role: self.state.role,

      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/master/deletesaleproduct",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {

        var array = [...self.state.dataList]; // make a new copy of array instead of mutating the same array directly.
        array.splice(rowIndexValue, 1);
        self.state.dataList = [];
        self.state.dataList = array;
        self.setState({ dataList: array });

      },
      error: function (data) {

        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Network Connection Problem',
          showConfirmButton: false,
          timer: 2000
        })

      }
    });

  }
  NoAction() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={ProductList1} />
        </div>
      </Router>,
      document.getElementById('contentRender'));

  }

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

  onTrRowClick = (state, rowInfo, column, instance) => {
    var self = this;
   
  //   console.log("ROW INFO :",rowInfo);
  
   if (typeof rowInfo !== "undefined") {
    return {
        onClick: (e, handleOriginal) => {
            this.setState({
            selected: rowInfo.index
            });
            if (handleOriginal) {
            handleOriginal()
            }
            
            var tax1LabelName=self.state.tax1LabelName+"(%)";
            var tax2LabelName=self.state.tax2LabelName+"(%)";
            var tax3LabelName=self.state.tax3LabelName+"(%)";
  
            var productName = rowInfo.original["Product Name"];
            var cgst = rowInfo.original["CGST"];
            var sgst = rowInfo.original["SGST"];
            var igst = rowInfo.original["IGST"];
            var hsnCode = rowInfo.original["HSN Code"];
            var saleRate = rowInfo.original["Sale Rate"];
            var purchaseRate = rowInfo.original["Purchase Rate"];
            var description = rowInfo.original["Description"];
            var productId = rowInfo.original["ProductId"];
            var quantityLimit = rowInfo.original["QuantityLimit"];
            var productType = rowInfo.original["Product Type"];
            var productCategory = rowInfo.original["Product Category"];
            var quantity = rowInfo.original["Quantity"];


            this.state.productName = productName;
            this.state.cgst = cgst;
            this.state.sgst = sgst;
            this.state.igst = igst;
            this.state.hsnCode = hsnCode;
            this.state.saleRate = saleRate;
            this.state.purchaseRate = purchaseRate;
            this.state.description = description;
            this.state.productId = productId;
            this.state.quantityLimit = quantityLimit;
            this.state.productType = productType.toLowerCase();
            this.state.productCategory = productCategory;
            this.state.quantity = quantity;

            if (self.state.cgst == "null" || self.state.cgst == "-") {
              self.state.cgst = " ";
            } if (self.state.sgst == "null" || self.state.sgst == "-") {
              self.state.sgst = " ";
            } if (self.state.igst == "null" || self.state.igst == "-") {
              self.state.igst = " ";
            } if (self.state.hsnCode == "null" || self.state.hsnCode == "-") {
              self.state.hsnCode = " ";
            } if (self.state.saleRate == "null" || self.state.saleRate == "-") {
              self.state.saleRate = " ";
            }
            if (self.state.purchaseRate == "null" || self.state.purchaseRate == "-") {
              self.state.purchaseRate = " ";
            }
           
            if (self.state.description == "null" || self.state.description == "-") {
              self.state.description = " ";
            }

            this.setState({
              productName: this.state.productName,
              cgst: this.state.cgst,
              sgst: this.state.sgst,
              igst: this.state.igst,
              hsnCode: this.state.hsnCode,
              saleRate: this.state.saleRate,
              purchaseRate: this.state.purchaseRate,
              description: this.state.description,
              productId: this.state.productId,
              quantityLimit: this.state.quantityLimit,
              productType: this.state.productType,
              productCategory: this.state.productCategory,
              quantity: this.state.quantity
            });

                this.state.rowIndexValue=rowInfo.index;
        },
        style: {
          background: rowInfo.index === this.state.selected ? 'rgb(66, 139, 202)' : '',
          color: rowInfo.index === this.state.selected ? '#fff' : ''
           // color: rowInfo.index === this.state.selected ? 'white' : 'black'
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



  
  /* ******* NEW ICON FUNCTIONS ********* */

  AddProduct(){
    ReactDOM.render(
      <Router>
        <div>
        <Route path="/" component={()=><AddProduct1 tax1LabelName={this.state.tax1LabelName} tax2LabelName={this.state.tax2LabelName}/>} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }

  ViewProduct(){
    var self=this;
  
    if( this.state.productId===undefined){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select product ',
       
      })
    }else{
   
      ReactDOM.render(
        <Router>
          <div>

            <Route path="/" component={() => <ProductListView
              productName={this.state.productName}
              cgst={this.state.cgst} sgst={this.state.sgst}
              igst={this.state.igst} hsnCode={this.state.hsnCode}
              saleRate={this.state.saleRate} purchaseRate={this.state.purchaseRate}
              description={this.state.description}
              productId={this.state.productId}
              quantityLimit={this.state.quantityLimit} productType={this.state.productType}
              productCategory={this.state.productCategory}
              quantity={this.state.quantity}
              tax1LabelName={this.state.tax1LabelName} 
              tax2LabelName={this.state.tax2LabelName}

            />} />

          </div>
        </Router>,
        document.getElementById('contentRender'));
    }
  }
  EditProduct(){
    var self=this;
  
    if( this.state.productId===undefined){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Product ',
       
      })
    }else{
    
      ReactDOM.render(
        <Router>
          <div>

            <Route path="/" component={() => <ProductListEdit
              productName={this.state.productName}
              cgst={this.state.cgst} sgst={this.state.sgst}
              igst={this.state.igst} hsnCode={this.state.hsnCode}
              saleRate={this.state.saleRate} purchaseRate={this.state.purchaseRate}
              description={this.state.description}
              productId={this.state.productId}
              quantityLimit={this.state.quantityLimit} productType={this.state.productType}
              productCategory={this.state.productCategory}
              quantity={this.state.quantity}
              quantity={this.state.quantity}
              tax1LabelName={this.state.tax1LabelName} 
              tax2LabelName={this.state.tax2LabelName}

            />} />

          </div>
        </Router>,
        document.getElementById('contentRender'));
    }
  }

  DeleteProduct(){
    var self=this;
  
    if( this.state.productId===undefined){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Product ',
       
      })
    }else{
      if(this.state.productId!="" ){
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Do you Want to Delete '+self.state.productName,
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
       //   timer: 1500
        }).then((result) => {
          if (result.value) {
            self.DeleteFunc(this.state.rowIndexValue) 
  
          // For more information about handling dismissals please visit
          // https://sweetalert2.github.io/#handling-dismissals
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              position:'center',
              icon:'warning',
              title:'Cancelled Deletion Of '+self.state.productName,
              showConfirmButton: false,
              timer:2000,
            })
          }
        })
      }
    }
      
  }

  DownLoadProduct(){

  }

  render() {
    //  const  downloadButtonData=<span style={{width:"80px"}} class="glyphicon glyphicon-download-alt" ><span style={{fontFamily:"Roboto, sans-serif"}}>&nbsp;Download</span></span>
        
   //   const  downloadButtonData=<i  style={{color:"black"}} class="glyphicon glyphicon-download-alt" ></i>
   const downloadButtonData = <Invoice_xlDownldBtn/>;      
      return (
        <div className="container" style={{ paddingTop: "0px" }}>
        
              <div className="">
              <div className="">
                <BackButtonComponent name={"Dashboard"}click={()=>this.BackbtnFunc()} />
                    </div>
              <div className="inv_HeaderCls">
                <h3>Product List </h3>
              </div>
            </div>
   <div className="inv_list_cls">
  {/* <div className="inv_list_cls_sel_search">
  <SiteDropDown onSiteDropDown={this.handleSite} data={this.state.site} />
  </div> */}
  </div>
    <div className="reactIcon_Dcls">
  <ProductIcons  ondAddProduct={this.AddProduct} onViewProduct={this.ViewProduct} 
      onEditProduct={this.EditProduct} DeleteProduct={this.DeleteProduct}
      onDownloadProduct={this.DownLoadProduct} />
      
     <ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      className="download-table-xls-button "
                     
                      table="tableHeadings"
                      filename="Product_List"
                      sheet="tablexls"
                     buttonText={downloadButtonData}   
                      />
      </div>
   
                <div id="tableOverflow1">
                  <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">
                  </table>
                </div>
                <div id="tableOverflow" class="hideContent" style={{marginBottom:"2%"}}>
                  <ReactTable style={{overflow:"auto",marginBottom:"5%"}}
                    data={this.state.dataList}
                    columns={this.state.columns}
                    noDataText="No Data Available"
                    filterable
                    defaultPageSize={10}
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
                    getTrProps={this.onTrRowClick}
                    getProps={ (state, rowInfo, column) => {
                      return {
                          style: {
                              background: column && column.Header=='Product Name' ? 'red' : null,
                          },
                      };
                  }
                }
                  />
                </div>
        </div>
      );
    }
  }
  export default ProductList1;