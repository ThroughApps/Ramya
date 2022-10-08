
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
import moment from 'moment';
import './ProfitLossReport.css';
import _ from 'underscore';
import HSBar from "react-horizontal-stacked-bar-chart";
import * as bootstrap from "bootstrap";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import Case from "case";
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import * as SiIcons from 'react-icons/si';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
import convert_to_words from '@amirsanni/number-to-words';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Invoice_xlDownldBtn} from './ServiceRegistration/IconComponents';
import { SiteCurrencySymbol } from './Invoice/CurrencyFormater';


var numberToWord = require('npm-number-to-word');


var days1;
var today;
var currentRow;
var greaterNo;
var totalcost = 0;
class InventorySummaryReport extends Component {



    constructor(props) {
        today = new Date();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        super(props)
        this.state = {
            fromDate: '',
            toDate: '',
            companyId: companyId,
            period: '',
            data: [],
            columns: [],
            currencySymbol:'',
            currencyCode:'',
           amountInWords:'',
        }

    }

    componentDidMount() {
        SetCurrentPage("InventorySummaryReport");

        var siteCurrencyData = SiteCurrencySymbol(GetCurrentSite());
        this.state.currencySymbol=siteCurrencyData.currencySymbol;
        this.state.currencyCode=siteCurrencyData.currencyCode;

        window.scrollTo(0, 0);
        var self = this;


        var currentYear = today.getFullYear();


        this.GetInventorySummaryReport();

    }








    GetInventorySummaryReport() {

        var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
        var self = this;



        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,

            }),

            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/InventoryReport/InventorySummaryReport",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {



                var tab = ' <thead><tr class="headcolor"><th class="headcolor">SNo</th><th class="headcolor">Name</th>'
                    + '<th class="headcolor">Avaialble Stock</th><th>PurchaseRate/Unit</th>'
                    + '<th>SaleRate/Unit</th><th>Total InventoryAmount</th></tr></thead>';
                var no = 0;
                self.state.data = [];
                var ivalue = 0;
                totalcost = 0;

                $.each(data, function (i, item) {

                    no = Number(no) + Number(1);

                    if (item.productType == "product") {

                        var cost = Number(item.quantity) * Number(item.saleRate);

                        totalcost = Number(totalcost) + Number(cost);
                        tab += '<tbody id= "myTable" ><tr class="" style=" background-color: white;">'
                            + '<td class="hide">' + item.productId + '</td>'
                            + '<td>' + no + '</td><td>' + item.productName + '</td>'
                            + '<td>' + item.quantity + '</td><td>' + item.purchaseRate + '</td>'
                            + '<td>' + item.saleRate + '</td><td>' + cost + '</td></tr></tbody >';

                        self.state.data[i] = {
                            "ProductId": item.productId,
                            "SNo": no,
                            "Name": item.productName,
                            "Quantity": item.quantity,
                            "Purchase Rate": item.purchaseRate,
                            "Sale Rate": item.saleRate,
                            "Total Inventory Amount": cost

                        }

                    } else {

                        var cost = item.saleRate;

                        totalcost = Number(totalcost) + Number(cost);
                        tab += '<tbody id= "myTable" ><tr class="" style=" background-color: white;">'
                            + '<td class="hide">' + item.productId + '</td>'
                            + '<td>' + no + '</td><td>' + item.productName + '</td>'
                            + '<td>' + item.quantity + '</td><td>' + item.purchaseRate + '</td>'
                            + '<td>' + item.saleRate + '</td><td>' + cost + '</td></tr></tbody >';

                        self.state.data[i] = {
                            "ProductId": item.productId,
                            "SNo": no,
                            "Name": item.productName,
                            "Quantity": "-",
                            "Purchase Rate": "-",
                            "Sale Rate": item.saleRate,
                            "Total Inventory Amount": cost

                        }
                    }

                    ivalue = i;
                });

                self.state.data[Number(ivalue) + 1] = {
                    "ProductId": "",
                    "SNo": "",
                    "Name": "",
                    "Quantity": "",
                    "Purchase Rate": "",
                    "Sale Rate": <div style={{ fontWeight: "600" }}>{"Inventory Amount"}</div>,
                    "Total Inventory Amount": <div style={{ fontWeight: "600" }}>{Number(totalcost).toFixed(2)}</div>

                }
                self.state.columns = self.GetColumns();

                if (totalcost == 0) {
                    $("#numWords").text("Zero");
                } else {
                    var totalcostRound = Number(totalcost).toFixed(2);
                  
                    self.state.amountInWords=convert_to_words(Number(totalcostRound), self.state.currencyCode);
                    self.state.amountInWords=Case.capital(self.state.amountInWords)                    // $("#numWords").text(Case.capital(numtoword));
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

    }

    GetColumns() {

        return Object.keys(this.state.data[0]).map(key => {
            if (
                key != "ProductId"

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
    render() {
        const downloadButtonData = <Invoice_xlDownldBtn/>; 
        return (
            <div className="container">
                <div className="repot_headercls_yearly">
                    <div className="">
                        <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
                    </div>
                    <div class="report_card_header">
              <h3 id="reportHeader" >Stock Summary Report</h3>
                </div>
                    <div class="report_reactIcon_Dcls">
                    <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="download-table-xls-button1"
                                table="tableHeadings"
                                filename="StockSummaryReport_List"
                                sheet="tablexls"
                                buttonText={downloadButtonData}
                            />   
                                  </div>
                </div>

               
                <div class="">
                 
                    <ReactTable
                        data={this.state.data}
                        columns={this.state.columns}
                        noDataText="No Data Available"
                        filterable={false}
                        defaultPageSize={10}
                        PageSize={this.state.data.length}
                        className="-striped -highlight "
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

                    />


                    <div class="col-sm-6 reactTable_cls" id="amountinwordsdiv">
                        <p class="lead">Amount In Words:   <span id="numWords">{this.state.amountInWords}</span></p>
                    </div>
                </div>
            </div>
        );
    }
}
export default InventorySummaryReport;
