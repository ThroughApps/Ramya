import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


import $ from 'jquery';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import SalesReportDisplay from './SalesReportDisplay';
import ReportMenuPage from './ReportMenuPage';
import ReportMenuPagePremium from './ReportMenuPagePremium';
import ReportMenuPageBasic from './ReportMenuPageBasic';
import SalesReportEdit from './SalesReportEdit';
import CryptoJS from 'crypto-js';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './DownloadButton.css';
import { SiteDropDown, FilterOptions } from './SiteDropDown';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import * as SiIcons from 'react-icons/si';
import {Double_BackButtonComponent} from'./ServiceRegistration/ButtonComponent';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import _ from 'underscore';
import { SetUp_ColumnHeaders, SetUp_ColumnHeaders_Dropdown, SetUp_ColumnHeaders_Selected_Dropdown } from './CommonComponents/TableHeaderComponents/TableHeaderComponents';
import { Invoice_xlDownldBtn} from './ServiceRegistration/IconComponents';


var dataList = [];
var currentRow;
var selectedColumns=[];



class BillDueReport extends Component {

    constructor() {
        super()
        var today = new Date();
        var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var today2 = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();


        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        this.state = {

        
            date: today1,
            date1: today2,
            companyId: companyId,
            companyName: companyName,
            totalSubTotal: '0',
            totalBalance: '0',
            data: [],
            columns: [],
            site: GetCurrentSite(),

        }


    }

    componentDidMount() {

        SetCurrentPage("BillDueReport");
        window.scrollTo(0, 0);
        $("#companyname").hide();
        $("#reportheader").hide();
        $("#nodata").hide();
        $("#tableHeadings").hide();
        $("#totalSale").hide();
        $(".btn-default").css("background-color", "#05a4b5");
        $(".btn-default").css("color", "white");
     
        var self = this;

    /*
    **********************************************************************
        BASIC SETUP FOR DYNAMIC SELECTION OF COLUMN HEADER STARTS
    ***********************************************************************
    */
        //COLUMN HEADER FUNCTIONALITIES
        var columnHeaderList=["SNo","Invoice No","Invoice Date","Customer Name",
                              "Contact No","Total Amount","Paid Amount","Balance Amount","Status","Site"];

        var columnHeaderList_Status=[true,true,true,true,true,true,true,true,true,true];
        
        //SETTING UP COLUMN HEADERS
        var columnHeaderData=SetUp_ColumnHeaders(columnHeaderList,columnHeaderList_Status);

        this.state.columns=columnHeaderData;

        //SETTING UP COLUMN HEADERS IN DROPDOWN FOR SELECTION
        this.state.options=SetUp_ColumnHeaders_Dropdown(columnHeaderList,columnHeaderList_Status);

        //SETTING UP COLUMN HEADERS AS SELECTED OPTION IN THE DROPDOWN BY DEFAULT
        this.state.selectedOption=SetUp_ColumnHeaders_Selected_Dropdown(columnHeaderList,columnHeaderList_Status);

        this.setState({
            columns:this.state.columns,
            options:this.state.options,
            selectedOption:this.state.selectedOption,
        })
  
    /*
    **********************************************************************
        BASIC SETUP FOR DYNAMIC SELECTION OF COLUMN HEADER ENDS
    ***********************************************************************
    */

        self.state.data = [];
        self.setState({
            data: self.state.data,
        })

        $.ajax({
            type: 'POST',
            data: JSON.stringify({

                companyId: this.state.companyId,
                empSites: GetEmployeeSite()
            }),
            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/SalesReport/BillDueReport",
            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {
                dataList = data;
                self.handleSite(self.state.site);

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
    onTrRowClick = (state, rowInfo, column, instance) => {
        var self = this;



        if (typeof rowInfo !== "undefined") {
            return {
                onClick: (e, handleOriginal) => {
                    this.setState({
                        selected: rowInfo.index
                    });
                    if (handleOriginal) {
                        handleOriginal()
                    }
                    var customerName = rowInfo.original["Customer Name"];

                    var contactNo = rowInfo.original["Contact No"];
                    var balanceAmt = rowInfo.original["Balance Amount$"];
                    var invoiceNo = rowInfo.original["Invoice No"];


                    this.state.customerName = customerName;
                    this.state.contactNo = contactNo;
                    this.state.balanceAmt = balanceAmt;
                    this.state.invoiceNo = invoiceNo;

                    this.setState({
                        customerName: this.state.customerName,
                        contactNo: this.state.contactNo,
                        balanceAmt: this.state.balanceAmt,
                        invoiceNo: this.state.invoiceNo,

                    });

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

    SMSCommonFunc() {
        var self = this;

        if (this.state.customerName === undefined) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Kindly, Select Customer ',

            })
        } else {
            if (this.state.customerName != "") {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Do you Want to Send an SMS Alert to ' + self.state.customerName,
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Yes, Send it!',
                    cancelButtonText: 'No, Not Now'
                    //   timer: 1500
                }).then((result) => {
                    if (result.value) {
                        self.SendSms(this.state.rowIndexValue)

                        // For more information about handling dismissals please visit
                        // https://sweetalert2.github.io/#handling-dismissals
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'Cancellation of sending SMS to ' + self.state.customerName,
                            showConfirmButton: false,
                            timer: 2000,
                        })
                    }
                })
            }
        }


    }
    SendSms(rowIndexValue) {
        var self = this;

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                contactNo: self.state.contactNo,
                companyId: self.state.companyId,
                staffId: this.state.staffId,
                employeeName: this.state.employeeName,
                role: this.state.role,
                customerName: self.state.customerName,
                balanceAmt: self.state.balanceAmt,
                invoiceNo: self.state.invoiceNo

            }),
            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/SalesReport/sendsms",
            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'SMS Sent successfully',
                    showConfirmButton: false,
                    timer: 2000
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
            }
        });

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
        var self = this;
        self.state.data = [];
        if (result.length != 0) {
            var tab = '<thead><tr class="headcolor"><th>S.No</th><th>Invoice Date</th>'
                + '<th>InvoiceNo</th><th>CustomerName</th>'
                + '<th>ContactNo</th>'
                + '<th>Total Amount</th><th>Paid Amount</th>'
                + '<th>Balance</th>'
                + '<th>Payment Status</th></tr></thead>';
            var no;

            var ivalue = 0;
            $.each(result, function (i, item) {
                no = parseInt(i) + 1; tab += '<tbody id= "myTable" ><tr id="tabletextcol" >'
                    + '<td>' + no + '</td>'
                    + '<td>' + item.invoiceNo + '</td><td>' + item.date + '</td><td>' + item.customerName + '</td>'
                    + '<td>' + item.contactNo + '</td><td>' + item.subtotal1 + '</td>'
                    + '<td>' + item.advance + '</td><td>' + item.balanceAmt + '</td>'
                    + '<td>' + item.status + '</td></tr></tbody>';


                self.state.data[i] = {
                    "SNo": no,
                    "Invoice No": item.invoiceNo,
                    "Invoice Date": item.date,
                    "Customer Name": item.customerName,
                    "Contact No": item.contactNo,
                    "Total Amount": item.subtotal1,
                    "Paid Amount": item.advance,
                    "Balance Amount": item.balanceAmt,
                    "Status": item.status,
                    "Site": item.site
                };

            });
            $("#tableHeadings").append(tab);
           // self.state.columns = self.GetColumns();
           self.GetColumns();
        } else {
            $("#nodata").show();
            $("#totalSale").hide();
            $("#test-table-xls-button").hide();


        }
        self.setState({
            data: self.state.data,
            columns: self.state.columns
        });

    }



 

    handleUserInput = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        },
        );

    }


    BackbtnFunc() {
        var planName = CryptoJS.AES.decrypt(localStorage.getItem("PlanName"), "shinchanbaby").toString(CryptoJS.enc.Utf8);

        //	 alert("plantype"+planName);
        if (planName.toLowerCase() == "basic") {

            ReactDOM.render(
                <Router>
                    <div >
                        <Route exact path="/" component={ReportMenuPageBasic} />

                    </div>
                </Router>, document.getElementById('contentRender'));
            registerServiceWorker();
        }
        else if (planName.toLowerCase() == "premium") {

            ReactDOM.render(
                <Router>
                    <div >
                        <Route exact path="/" component={ReportMenuPagePremium} />

                    </div>
                </Router>,
                document.getElementById('contentRender'));
            registerServiceWorker();
        }
        else if (planName.toLowerCase() == "elite") {


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

    /* 
        printdiv(printarea) {
            var originalContents = document.body.innerHTML;
            $("#test-table-xls-button").hide();
            $("#backbutton").hide();
            $("#print").hide();
    
            $("#sidebar").hide();
            $("#navbar_company_name").hide();
    
            $("#companyname").show();
            $("#reportheader").show();
            $("#reportHeader").hide();
    
            $("#companyHeader").hide();
            $(".btn-group").hide();
            // $("#updatedevice").hide();
            $("#test-table-xls-button").hide();
    
            window.print(originalContents);
            $("#sidebar").show();
            $("#navbar_company_name").show();
            $("#backbutton").show();
            $("#print").show();
            $("#test-table-xls-button").show();
            $("#companyname").hide();
            $("#reportheader").hide();
            $("#companyHeader").show();
            $("#reportHeader").show();
            // $("#updatedevice").show();
            // $("#test-table-xls-button").show();
            // $(w.document.body).html(html);
            $(".btn-group").show();
            $("#reportHeader").show();
    
        }
     */
    printdiv() {
        var originalContents = document.body.innerHTML;

        $(".repot_headercls").hide();
        $(".buttonright_report").hide();
        $("#test-table-xls-button").hide();
        $(".pro-sidebar").hide();

        //.pro-sidebar

        window.print(originalContents);
        $(".repot_headercls").show();
        $(".buttonright_report").show();
        $("#test-table-xls-button").show();
        $(".pro-sidebar").show();

    }

/*
    **********************************************************************
       DYNAMIC SELECTION OF COLUMN HEADER STARTS
    ***********************************************************************
    */
    handleChangeColumnSelect = selectedOption => {
        var self=this;
        selectedColumns=[];

        self.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);

        $.each(selectedOption,function(i,item){
            selectedColumns.push(item.label);
        })


        self.state.columns=[];
        self.state.columns=self.GetColumns();
        self.setState({
            columns:self.state.columns,
        })
      };


      GetColumns() {

        return Object.keys(this.state.data[0]).map(key => {
       
            var containsData=_.contains(selectedColumns,key);

            if (containsData==true) {
                return {
                  Header: key,
                  accessor: key
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


      /*
    **********************************************************************
       DYNAMIC SELECTION OF COLUMN HEADER ENDS
    ***********************************************************************
    */
    render() {
        // const  downloadButtonData=<span style={{width:"80px"}} class="glyphicon glyphicon-download-alt" ><span style={{fontFamily:"Roboto, sans-serif"}}>&nbsp;Download</span></span>
        const downloadButtonData = <SiIcons.SiMicrosoftexcel />

        return (


            <div class="container" >

<ReactMultiSelectCheckboxes options={this.state.options}   value={this.state.selectedOption} 
  onChange={this.handleChangeColumnSelect}/>


                <div className="repot_headercls">
                   <div className="">
                        <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
                    </div>
                    <div class="report_card_header">
                <h3 id="reportHeader" >Bill Due Report-[{this.state.date1}]</h3>
                </div>

                   
                   <div class="report_reactIcon_Dcls">
                        <button type="button" id="print" class="btn btn-default " style={{marginTop:"10px"}}
                            onClick={() => this.printdiv('printarea')} >
                            <i class="fa fa-print" aria-hidden="true"
                                style={{ fontSize: "17px", border: "none" }}> Print</i></button>
                                      <ReactHTMLTableToExcel 
                                id="test-table-xls-button1"
                                className="download-table-xls-button1"
                                table="tableHeadings"
                                filename="PurchaseDatewise_List"
                                sheet="tablexls"
                                buttonText={downloadButtonData}
                            />       </div>
                </div>
               

                <div className="repot_sub_dwldbtn_cls_expense_daily1">
                    <div class="">
                        <SiteDropDown onSiteDropDown={this.handleSite} data={this.state.site} />
                    </div>

                       <div className="report_reactIcon_Dcls">
                        <button className="tbtn_rt_rpt" style={{marginTop:"10px"}} >
                            < div class="updatedevice btn_exceldld" id="updatedevice"
                                onClick={() => this.SMSCommonFunc()} style={{ textAlign: "center" }}>
                                <span style={{ fontSize: '1em', color: 'white' }}>
                                    <i class="glyphicon glyphicon-comment" style={{
                                        border: "none",
                                        padding: "6px 7px 5px 7px",
                                        fontSize: "1em",
                                        color: "white",
                                        borderRadius: "18px",
                                        // backgroundColor: "tomato"
                                    }}>
                                    </i>
                                </span>
                            </div>
                        </button>
                     
                    </div>
                </div>

                <div id="printarea " >
                    <div class="">
                       
                    </div>
                    <ReactTable
                        data={this.state.data}
                        columns={this.state.columns}
                        noDataText="No Data Available"
                        filterable={true}
                        defaultPageSize={10}
                        className="-striped -highlight reactTable_cls"
                        loadingText='Loading...'
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
                        <table class="table table-bordered" id="tableHeadings">

                        </table>
                    </div>
                    <br />

                </div>
            </div>

        );
    }
}

export default BillDueReport;