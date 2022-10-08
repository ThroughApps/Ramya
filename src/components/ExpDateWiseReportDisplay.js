import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import $ from 'jquery';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ReportMenuPage from './ReportMenuPage';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import ExpenseReportEdit from './ExpenseReportEdit';
import ExpenseReportView from './ExpenseReportView';
import ExpDateWiseReport from './ExpDateWiseReport';
import CryptoJS from 'crypto-js';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './DownloadButton.css';
import { SiteDropDown, FilterOptions } from './SiteDropDown';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import * as SiIcons from 'react-icons/si';
import { ExpenseReportIcons,ReportIcons,Invoice_xlDownldBtn} from './ServiceRegistration/IconComponents';

var dataList = [];
var currentRow;

class ExpDateWiseReportdisplay extends Component {


  constructor(data) {
    super(data)

    var today = new Date();
    var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    var year = today.getFullYear();

    this.state = {
      year: year,
      fromDate: '',
      toDate: '',
      companyId: companyId,
      companyName: companyName,
      totalSubTotal: '0',
      data: [],
      columns: [],
      site: GetCurrentSite(),
    };

    this.ViewCommonFunc=this.ViewCommonFunc.bind(this);
    this.UpdateCommonFunc=this.UpdateCommonFunc.bind(this);
    this.DeleteCommonFunc=this.DeleteCommonFunc.bind(this);


  }



  componentDidMount() {
   SetCurrentPage("ExpDateWiseReportdisplay"); 
    $(".btn-default").css("background-color", "#05a4b5");
    $(".btn-default").css("color", "white");
    $("#nodata").hide();
    $("#nodata").hide();
    $("#totalSale").hide();
    $("#myInput").hide();
    $("#tableOverflow").hide();

    $("#companyname").hide();
    $("#reportheader").hide();
    var self = this;

    var no;

    self.state.data = [];
    self.setState({
      data: self.state.data,
    })

    dataList = this.props.data;

    self.handleSite(self.state.site);


    $("#myInput").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("#myTable tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  }

  GetColumns() {
    return Object.keys(this.state.data[0]).map(key => {

      if (
        key != "ExpenseId"
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




  DeleteFunc(rowIndexValue) {
    var self = this;

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        id: self.state.id,
        date: self.state.date,
        companyId: this.state.companyId,
        empSites: GetEmployeeSite()
      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/ExpenseReport/DailyExpenseReportDelete",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {

        self.state.totalSubTotal = Number(self.state.totalSubTotal) - Number(self.state.amount);

        self.setState({
          totalSubTotal: self.state.totalSubTotal,
        })

        var array = [...self.state.data]; // make a new copy of array instead of mutating the same array directly.
        array.splice(rowIndexValue, 1);
        self.state.data = [];
        self.state.data = array;
        self.setState({ data: array });

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


  BackbtnFunc() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={ExpDateWiseReport} />


        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }

/* 
  printdiv(printarea) {
    var originalContents = document.body.innerHTML;
    $("#Printspace").hide();
    $("#backbutton").hide();
    $("#print").hide();
    $("#myInput").hide();
    $("#sidebar").hide();
    $("#navbar_company_name").hide();
    $("#companyname").show();
    $("#reportheader").show();
    $("#companyHeader").hide();
    $("#reportHeader").hide();

    window.print(originalContents);
    $("#sidebar").show();
    $("#navbar_company_name").show();
    $("#backbutton").show();
    $("#print").show();
    $("#Printspace").show();
    $("#myInput").show();
    $("#companyname").hide();
    $("#reportheader").hide();
    $("#companyHeader").show();
    $("#reportHeader").show();

    // $(w.document.body).html(html);

  } */


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



          var id = rowInfo.original["ExpenseId"];
          var categoryName = rowInfo.original["Category Name"];
          var userName = rowInfo.original["User Name"];
          var amount = rowInfo.original["Amount"];
          var date = rowInfo.original["Date"];



          this.state.id = id;
          this.state.categoryName = categoryName;
          this.state.userName = userName;
          this.state.amount = amount;
          this.state.date = date;
          this.state.oldCategoryName = this.state.categoryName;
          this.state.oldUserName = this.state.userName;
          this.state.oldAmount = this.state.amount;
          self.state.oldDate = self.state.date;

          self.setState({

            categoryName: self.state.categoryName,
            userName: self.state.userName,
            amount: self.state.amount,
            date: self.state.date,
            oldCategoryName: self.state.oldCategoryName,
            oldUserName: self.state.oldUserName,
            oldAmount: self.state.oldAmount,
            oldDate: self.state.oldDate,
            id: self.state.id

          })

          this.state.rowIndexValue = rowInfo.index;
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

  ViewCommonFunc() {
    var self = this;

    if (this.state.id === undefined) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Category ',

      })
    } else {
      ReactDOM.render(<ExpenseReportView categoryName={self.state.categoryName}
        userName={self.state.userName} amount={self.state.amount} date={self.state.date}
        oldCategoryName={self.state.oldCategoryName} oldUserName={self.state.oldUserName} oldAmount={self.state.oldAmount} oldDate={self.state.oldDate} id={self.state.id} />, document.getElementById("contentRender"));


    }
  }

  UpdateCommonFunc() {
    var self = this;
    if (this.state.id === undefined) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Category ',

      })
    } else {


      ReactDOM.render(<ExpenseReportEdit categoryName={self.state.categoryName}
        userName={self.state.userName} amount={self.state.amount} date={self.state.date}
        oldCategoryName={self.state.oldCategoryName} oldUserName={self.state.oldUserName} oldAmount={self.state.oldAmount} oldDate={self.state.oldDate} id={self.state.id} />, document.getElementById("contentRender"));

    }
  }
  DeleteCommonFunc() {
    var self = this;

    if (this.state.id === undefined) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Category ',

      })
    } else {
      if (this.state.id != "") {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Do you Want to Delete ' + self.state.categoryName,
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
              position: 'center',
              icon: 'warning',
              title: 'Cancelled Deletion Of ' + self.state.categoryName,
              showConfirmButton: false,
              timer: 2000,
            })
          }
        })
      }
    }


  }
  handleSite = (e) => {
    this.handleSite = this.handleSite.bind(this);
    this.state.site = e.toString();
    console.log("e ", this.state.site);
    this.setState({
      site: e.toString()
    });
    console.log("e ", dataList, e.toString());
    var result = FilterOptions(dataList, this.state.site);
    this.RendData(result);
  }
  RendData(result) {
    var no;
    var self = this;
    var ivalue = 0;
    self.state.dataList = [];
    if (result.length != 0) {
      var tab = '<thead><tr class="headcolor"><th>S.No</th><th>CategoryName</th><th>UserName</th><th>Amount</th><th>Date</th></tr></thead>';
      $.each(result, function (i, item) {
        no = parseInt(i) + 1;
        tab += '<tbody id= "myTable" ><tr  id="tabletextcol" ><td>' + no + '</td><td>' + item.categoryName + '</td><td>' + item.userName + '</td><td>' + item.amount + '</td><td>' + item.date + '</td>'
          + '</tr></tbody>';

        self.state.totalSubTotal = Number(self.state.totalSubTotal) + Number(item.amount);

        self.setState({
          totalSubTotal: self.state.totalSubTotal,
        })

        self.state.data[i] = {
          "SNo": no,
          "Date": item.date,
          "Category Name": item.categoryName,
          "User Name": item.userName,
          "Amount": item.amount,
          "ExpenseId": item.id,
          "Site": item.site,

        };

        ivalue = i;

      });
      $("#tableHeadings").append(tab);
      $(".expenseId").hide();


      self.state.data[Number(ivalue) + 1] = {
        "SNo": "",
        "Date": "",
        "Category Name": "",
        "User Name": <div style={{ fontWeight: "600" }}>{"Total"}</div>,
        "Amount": <div style={{ fontWeight: "600" }}>{self.state.totalSubTotal}</div>
      };

      self.state.columns = self.GetColumns();


    } else {
      $("#nodata").show();
      $("#totalSale").hide();

      $("#myInput").hide();

    }
    self.setState({
      data: self.state.data,
      columns: self.state.columns
    })

  }

  printdiv() {
    var originalContents = document.body.innerHTML;
    
    $(".repot_headercls").hide();
    $(".buttonright_report,.est_inv_list_cls_Dwn_Btn_expense").hide();
    $("#test-table-xls-button").hide();
    $(".pro-sidebar").hide();

    //.pro-sidebar

    window.print(originalContents);
    $(".repot_headercls").show();
    $(".buttonright_report,.est_inv_list_cls_Dwn_Btn_expense").show();
    $("#test-table-xls-button").show();
    $(".pro-sidebar").show();
   
}



render() {
  const downloadButtonData =  <Invoice_xlDownldBtn/>; 

  return (
    <div class="container">
<div className="repot_headercls">
                  <div class=" ">
                  <Double_BackButtonComponent name={"Dashboard"} click={()=>this.BackbtnFunc()} />
              </div>
              <div class="report_card_header">
                    <h3 id="reportHeader" >Expense Datewise Report</h3>
              </div>
              <div className="report_reactIcon_Dcls">
              <button type="button" style={{marginTop:"10px", border: "1px solid #ddd"}} id="print" class="btn btn-default "
                          onClick={() => this.printdiv('printarea')} >
                          <i class="fa fa-print" aria-hidden="true"
                              style={{ fontSize: "17px", border: "none" }}> Print</i></button>
                               <ReactHTMLTableToExcel
                              id="test-table-xls-button1"
                              className="download-table-xls-button1"
                              table="tableHeadings"
                              filename="PurchaseMonthly_List"
                              sheet="tablexls"
                              buttonText={downloadButtonData}
                          />
                  </div>
              </div>
              <div id="printarea " >
              
              <div className="repot_sub_dwldbtn_cls_expense_daily1">
                      <div class="">
                          <SiteDropDown onSiteDropDown={this.handleSite} data={this.state.site} />
                      </div>
                  
                      <ReportIcons onReportView={this.ViewCommonFunc}
              onReportEdit={this.UpdateCommonFunc} onReportDelete={this.DeleteCommonFunc}
            />      

</div>
</div>
      <div class="">
    
          <div style={{ display: "grid" }}>

            <div class="row" id="totalSale">
              <div class="col-lg-8 col-md-8 text-right">
              </div>
              <div class="col-lg-4 col-md-4 text-right">
                <div class="table-responsive">
                  <table class="table table-bordered">
                    <tbody><tr>
                      <th style={{ width: "30%" }}>Total:</th>
                      <td style={{ width: "30%", color: "red", textAlign: "left" }}>$ <span style={{ color: "red", textAlign: "left" }} id="ContentPlaceHolder1_lbl_subtotal">{this.state.totalSubTotal}</span></td>
                    </tr>
                    </tbody></table>
                </div>
              </div>
            </div>
          </div>
      
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
            getTrProps={this.onTrRowClick}
          />
          <div id="tableOverflow">
            <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">
            </table>
          </div>
          <br />
        </div>
      </div>
 
  );
}
}
export default ExpDateWiseReportdisplay;