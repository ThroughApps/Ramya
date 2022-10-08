
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import './datepicker.css';
import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
    GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
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
import moment from 'moment';
import './ProfitLossReport.css';
import _ from 'underscore';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import Case from "case";
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import * as SiIcons from 'react-icons/si';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {ReportIcons, Delete_DownloadIcons, Invoice_xlDownldBtn} from './ServiceRegistration/IconComponents';

var numberToWord = require('npm-number-to-word');

var days1;
var today;
var sizeDataValue;
class TillDateProfitLossReport extends Component {



    constructor(props) {
        today = new Date();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var companyRegisteredDate = CryptoJS.AES.decrypt(localStorage.getItem('CompanyRegisteredDate'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        super(props)
        this.state = {
            fromDate: '',
            toDate: '',
            companyId: companyId,
            companyRegisteredDate: companyRegisteredDate,
            period: '',
            data: [],
            columns: [],
            SizeData: 0,


        }

    }

    componentDidMount() {
        SetCurrentPage("TillDateProfitLossReport");


        window.scrollTo(0, 0);
        var self = this;

        var currentYear = today.getFullYear();
        this.getdata();

        $("#amountinwordsdiv").hide();

    }

    getdata() {

        var currentYear;
        var yearArray = [];
        var self = this;

        self.state.data = [];
        self.state.columns = [];
        self.setState({
            data: self.state.data,
            columns: self.state.columns
        })

        var companyRegisteredDate = CryptoJS.AES.decrypt(localStorage.getItem('CompanyRegisteredDate'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        companyRegisteredDate = new Date(companyRegisteredDate);




        if (companyRegisteredDate.getFullYear() == today.getFullYear()) {
            currentYear = today.getFullYear();

            yearArray.push(currentYear);

        }

        else if (((Number(companyRegisteredDate.getFullYear())) < (Number(today.getFullYear())))) {

            currentYear = Number(companyRegisteredDate.getFullYear());


            for (var i = Number(currentYear); i <= (Number(today.getFullYear())); i++) {

                yearArray.push(i);
            }

        }


        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,
                years: yearArray.toString(),

            }),

            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/ProfitLossReport/TillDate",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
                var data1 = data.slice(0, -1);

                $("#tableheading").empty();
                var tabHeading = '<h3>Till Date Profit and Loss Report</h3>';
                $("#tableheading").append(tabHeading);
                var totalProfit = 0;
                var totalLoss = 0;
                self.state.data = [];
                self.state.columns = [];

                self.setState({
                    data: self.state.data,
                    columns: self.state.columns
                })
                var monthNameArray = [];
                var dataArray = [];
                self.state.SizeData = 6;
                self.state.pagination = false;


                self.state.columns[0] = {
                    Header: "Category/Year",
                    accessor: "Category/Year",
                    show: true
                }

                var profitArray = [];
                var lossArray = [];


                for (var z = 0; z < data1.length; z++) {
                    var salesAmount = 0;
                    var estimateAmount = 0;
                    var expenseAmount = 0;
                    var purchaseAmount = 0;
                    var totalgst = 0;

                    // var shortMonthName = moment().month(data1[z].month-1).format('MMM');
                    var shortMonthName = moment().year(data1[z].year).format('YYYY');

                    shortMonthName = String(shortMonthName);
                    shortMonthName = ' ' + shortMonthName;

                    self.state.columns[(Number(z) + 1)] = {

                        Header: shortMonthName,
                        accessor: shortMonthName,
                        show: true
                    }

                    if (data1[z].totalSales != null) {
                        salesAmount = data1[z].totalSales;
                    }

                    if (data1[z].totalEstimate != null) {
                        estimateAmount = data1[z].totalEstimate;
                    }


                    if (data1[z].totalExpense != null) {
                        expenseAmount = data1[z].totalExpense;
                    }

                    if (data1[z].totalPurchase != null) {
                        purchaseAmount = data1[z].totalPurchase;
                    }
                    if (data1[z].totalGST != null) {
                        totalgst = data1[z].totalGST;
                    }


                    //  var profit=Math.round(Number(salesAmount));
                    var loss = Math.round(Number(expenseAmount) + Number(purchaseAmount) + Number(totalgst));

                    var profit = Math.round(Number(salesAmount) - Number(loss));
                    totalProfit = Math.round(Number(profit) + Number(totalProfit));
                    totalLoss = Math.round(Number(loss) + Number(totalLoss));
                    var profitNum = Math.sign(profit);
                    if (profitNum == -1 || profitNum == -0) {
                        profit = 0;
                    } else {
                        loss = 0;
                    }

                    profitArray.push(profit);
                    lossArray.push(loss);

                    var profitNum = Math.sign(totalProfit);
                    if (profitNum == -1 || profitNum == -0) {
                        totalProfit = 0;
                    } else {
                        totalLoss = 0;
                    }



                }


                self.state.data[0] = {
                    "Category/Year": "Sales"
                }

                for (var i = 0; i < data1.length; i++) {

                    var salesAmount = 0;
                    if (data1[i].totalSales != null) {
                        salesAmount = data1[i].totalSales;
                    }

                    //  var shortMonthName = moment().month(data1[i].month-1).format('MMM');
                    var shortMonthName = moment().year(data1[i].year).format('YYYY');

                    shortMonthName = String(shortMonthName);
                    shortMonthName = ' ' + shortMonthName;
                    self.state.data[0][shortMonthName] = (Math.round(salesAmount * 100) / 100).toFixed(2);
                }


                self.state.data[1] = {
                    "Category/Year": "Tax"
                }

                for (var e = 0; e < data1.length; e++) {

                    var gstAmount = 0;
                    if (data1[e].totalGST != null) {
                        gstAmount = data1[e].totalGST;
                    }

                    //  var shortMonthName = moment().month(data1[e].month-1).format('MMM');
                    var shortMonthName = moment().year(data1[e].year).format('YYYY');

                    shortMonthName = String(shortMonthName);
                    shortMonthName = ' ' + shortMonthName;
                    self.state.data[1][shortMonthName] = (Math.round(gstAmount * 100) / 100).toFixed(2);
                }


                self.state.data[2] = {
                    "Category/Year": "Expense"
                }

                for (var j = 0; j < data1.length; j++) {

                    var expenseAmount = 0;
                    if (data1[j].totalExpense != null) {
                        expenseAmount = data1[j].totalExpense;
                    }

                    // var shortMonthName = moment().month(data1[j].month-1).format('MMM');
                    var shortMonthName = moment().year(data1[j].year).format('YYYY');

                    shortMonthName = String(shortMonthName);
                    shortMonthName = ' ' + shortMonthName;
                    self.state.data[2][shortMonthName] = (Math.round(expenseAmount * 100) / 100).toFixed(2);
                }




                self.state.data[3] = {
                    "Category/Year": "Purchase"
                }

                for (var k = 0; k < data1.length; k++) {
                    var purchaseAmount = 0;
                    if (data1[k].totalPurchase != null) {
                        purchaseAmount = data1[k].totalPurchase;
                    }
                    //  var shortMonthName = moment().month(data1[k].month-1).format('MMM');
                    var shortMonthName = moment().year(data1[k].year).format('YYYY');

                    shortMonthName = String(shortMonthName);
                    shortMonthName = ' ' + shortMonthName;
                    self.state.data[3][shortMonthName] = (Math.round(purchaseAmount * 100) / 100).toFixed(2);
                }

                self.state.data[4] = {
                    "Category/Year": <div><span style={{ fontWeight: "600" }}>Profit</span></div>
                }

                for (var l = 0; l < profitArray.length; l++) {


                    // var shortMonthName = moment().month(data1[l].month-1).format('MMM');
                    var shortMonthName = moment().year(data1[l].year).format('YYYY');

                    shortMonthName = String(shortMonthName);
                    shortMonthName = ' ' + shortMonthName;
                    self.state.data[4][shortMonthName] = <div><span style={{ fontWeight: "600" }}>{profitArray[l]}</span></div>;
                }

                self.state.data[5] = {
                    "Category/Year": <div><span style={{ fontWeight: "600" }}>Loss</span></div>
                }

                for (var m = 0; m < lossArray.length; m++) {
                    //   var shortMonthName = moment().month(data1[m].month-1).format('MMM');
                    var shortMonthName = moment().year(data1[m].year).format('YYYY');

                    shortMonthName = String(shortMonthName);
                    shortMonthName = ' ' + shortMonthName;
                    self.state.data[5][shortMonthName] = <div><span style={{ fontWeight: "600" }}>{lossArray[m]}</span></div>;
                }




                if (totalProfit == 0) {
                    $("#numWordsProfit").text("Zero");
                } else {
                    var numtowordProfit = numberToWord(Number(totalProfit));
                    $("#numWordsProfit").text(Case.capital(numtowordProfit));
                }
                if (totalLoss == 0) {
                    $("#numWordsLoss").text("Zero");
                } else {
                    var numtowordLoss = numberToWord(Number(totalLoss));
                    $("#numWordsLoss").text(Case.capital(numtowordLoss));
                }

                $("#amountinwordsdiv").show();


                self.state.columns = self.getColumnsWithEstimate();
                self.setState({
                    data: self.state.data,
                    columns: self.state.columns
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

    getColumnsWithoutEstimate() {

        return Object.keys(this.state.data[0]).map(key => {
            return {
                Header: key,
                accessor: key,

            };
        });

    }

    getColumnsWithEstimate() {

        return Object.keys(this.state.data[0]).map(key => {

            return {
                Header: key,
                accessor: key,

            };

        });
    }

    BackbtnFunc() {
        var planName = CryptoJS.AES.decrypt(localStorage.getItem("PlanName"), "shinchanbaby").toString(CryptoJS.enc.Utf8);


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
    render() {
        const downloadButtonData = <Invoice_xlDownldBtn/>;  

        return (

            <div className="container">

                <div className="repot_headercls">
                    <div class=" ">
                        <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
                    </div>
                    <div class="report_card_header">
              <h3 id="reportHeader">Till Date Profit & Loss Report </h3>
                </div>

     <div class="report_reactIcon_Dcls">
                     
                     <ReactHTMLTableToExcel
                                 id="test-table-xls-button1"
                                 className="download-table-xls-button1"
                                 table="tableHeadings"
                                 filename="TillDateProfitLoss_List"
                                 sheet="tablexls"
                                 buttonText={downloadButtonData}
                             />
                                      </div>
                 </div>
                

                <ReactTable id="reacttableid"
                    data={this.state.data}
                    columns={this.state.columns}
                    noDataText="No Data Available"
                    filterable={false}
                    pageSize={this.state.SizeData}
                    className="-striped -highlight reactTable_cls"
                    defaultFilterMethod={(filter, row, column) => {
                        const id = filter.pivotId || filter.id;
                        return row[id] !== undefined
                            ? String(row[id])
                                .toLowerCase()
                                .indexOf(filter.value.toLowerCase()) !== -1
                            : true;
                    }}
                    showPaginationTop={this.state.pagination}
                    showPaginationBottom={false}

                />

                <div class="col-sm-6" id="amountinwordsdiv" className="pull-right" style={{ marginBottom: "20px" }}>
                    <div style={{ fontSize: "15px", fontStyle: "italic" }} ><b>Profit Amount In Words:</b>   <span id="numWordsProfit"></span> Dollar Only</div>
                    <div style={{ fontSize: "15px", fontStyle: "italic" }} ><b>Loss Amount In Words: </b>  <span id="numWordsLoss"></span> Dollar Only</div>

                </div>


            </div>
        );
    }

}
export default TillDateProfitLossReport;

