
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
import ReactTable from "react-table";
import "react-table/react-table.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import Case from "case";
import { Double_BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import * as SiIcons from 'react-icons/si';
import {
    GetEmployeeSite, GetCurrentSite, GetSiteDetails,
    GetCurrencies, SetCurrentPage
} from './ConstSiteFunction';
import convert_to_words from '@amirsanni/number-to-words';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { ReportIcons, Delete_DownloadIcons, Invoice_xlDownldBtn } from './ServiceRegistration/IconComponents';
import { SiteCurrencySymbol } from './Invoice/CurrencyFormater';
import { CheckNumberFormat, CheckNumberFormat_WithoutDecimal, Truncate_2DecimalPlaces } from './Invoice/InvoiceValidations';


var numberToWord = require('npm-number-to-word');

var days1;
var today;
var sizeDataValue;
class ProfitLossReport extends Component {



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
            SizeData: 0,
            currencySymbol: '',
            currencyCode: '',
            amountInWordsProfit: '',
            amountInWordsLoss: '',


        }

    }

    componentDidMount() {

        SetCurrentPage("ProfitLossReport");
        var siteCurrencyData = SiteCurrencySymbol(GetCurrentSite());
        this.state.currencySymbol = siteCurrencyData.currencySymbol;
        this.state.currencyCode = siteCurrencyData.currencyCode;


        window.scrollTo(0, 0);
        var self = this;

        var currentYear = today.getFullYear();


        $("#amountinwordsdiv").hide();

        $(".monthPicker").datepicker({
            dateFormat: "MM yy",
            changeMonth: true,
            changeYear: false,
            showButtonPanel: true,
            yearRange: new Date().getFullYear() - 10 + ":" + new Date().getFullYear(),
            onClose: function (dateText, inst) {
                if (self.state.period == "monthly") {
                    var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
                    if (month > today.getMonth() + 1) {


                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Kindly Select Current or Previous Month To Proceed',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    } else {
                        var year = currentYear;
                        $(this).val($.datepicker.formatDate("MM yy", new Date(year, month, 1)));
                        var selectedMonth = Number(month) + 1;
                        self.state.monthName = moment().month(selectedMonth - 1).format('MMMM');
                        self.state.dispyear = year;
                        self.GetMonthData(selectedMonth, year);
                    }
                } else {

                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Kindly Select Period To Proceed',
                        showConfirmButton: false,
                        timer: 2000
                    })

                }
            }
        });

        $(".monthPicker").focus(function () {
            $(".ui-datepicker-year").hide();
            $(".ui-datepicker-calendar").hide();
            $("#ui-datepicker-div").position({
                my: "center top",
                at: "center bottom",
                of: $(this)
            });

        });


        $('.yearPicker').datepicker({
            changeYear: true,
            showButtonPanel: true,
            dateFormat: 'yy',
            onClose: function (dateText, inst) {
                if (self.state.period == "yearly") {
                    var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                    if (year > today.getFullYear()) {

                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Kindly Select Current or Previous Years To Proceed',
                            showConfirmButton: false,
                            timer: 2000
                        })

                    } else {
                        $(this).datepicker('setDate', new Date(year, 1));
                        $(".ui-datepicker-month").hide();
                        $(".ui-datepicker-calendar").hide();
                        self.YearSubmit(year);
                    }
                } else {

                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Kindly Select Period To Proceed',
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            }
        });


        $(".yearPicker").focus(function () {
            $(".ui-datepicker-month").hide();
            $(".ui-datepicker-calendar").hide();
            $("#ui-datepicker-div").position({
                my: "center top",
                at: "center bottom",
                of: $(this)
            });
        });




    }


    handleUserInput = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });

        if (value == "daily") {
            // $( ".monthPicker" ).datepicker( "option", "disabled", true );
            // $( ".yearPicker" ).datepicker( "option", "disabled", true );

            $("#monthdiv").hide();
            $("#yeardiv").hide();
            $("#tableheading").empty();
            $("#amountinwordsdiv").hide();

            this.state.data = [];
            this.state.columns = [];


            this.DailySubmit();

        } else if (value == "weekly") {
            //   $( ".monthPicker" ).datepicker( "option", "disabled", true );
            //  $( ".yearPicker" ).datepicker( "option", "disabled", true );

            $("#monthdiv").hide();
            $("#yeardiv").hide();
            $("#tableheading").empty();
            $("#amountinwordsdiv").hide();

            this.state.data = [];
            this.state.columns = [];


            this.WeeklySubmit();
        } else if (value == "monthly") {
            //  $( ".monthPicker" ).datepicker( "option", "disabled", false );
            //  $( ".yearPicker" ).datepicker( "option", "disabled", true );

            $("#monthdiv").show();
            $("#yeardiv").hide();
            $("#tableheading").empty();
            $("#amountinwordsdiv").hide();

            this.state.data = [];
            this.state.columns = [];


        } else if (value == "yearly") {
            //  $( ".monthPicker" ).datepicker( "option", "disabled", true );
            //  $( ".yearPicker" ).datepicker( "option", "disabled", false );

            $("#monthdiv").hide();
            $("#yeardiv").show();
            $("#tableheading").empty();
            $("#amountinwordsdiv").hide();

            this.state.data = [];
            this.state.columns = [];

        }

    }


    GetMonthData(selectedMonth, year) {
        var self = this;
        var today = new Date();
        var currentMonth = today.getMonth() + 1;
        days1 = new Date(year, selectedMonth, 0).getDate();

        if (
            selectedMonth == "01" ||
            selectedMonth == "03" ||
            selectedMonth == "05" ||
            selectedMonth == "07" ||
            selectedMonth == "08" ||
            selectedMonth == "10" ||
            selectedMonth == "12"
        ) {
            if (selectedMonth == currentMonth) {
                this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
                this.state.toDate = year + "-" + selectedMonth + "-" + today.getDate();
            } else {
                this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
                this.state.toDate = year + "-" + selectedMonth + "-" + "31";
            }

            this.setState({
                fromDate: this.state.fromDate,
                toDate: this.state.toDate,
                month: this.state.month
            });
        } else if (
            selectedMonth == "04" ||
            selectedMonth == "06" ||
            selectedMonth == "09" ||
            selectedMonth == "11"
        ) {
            if (selectedMonth == currentMonth) {
                this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
                this.state.toDate = year + "-" + selectedMonth + "-" + today.getDate();
            } else {
                this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
                this.state.toDate = year + "-" + selectedMonth + "-" + "30";
            }
            this.setState({
                fromDate: this.state.fromDate,
                toDate: this.state.toDate,
                month: this.state.month
            });
        } else if (selectedMonth == "02") {
            if (year % 100 == 0 && year % 400 == 0 && year % 4 == 0) {
                if (selectedMonth == currentMonth) {
                    this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
                    this.state.toDate =
                        year + "-" + selectedMonth + "-" + today.getDate();
                } else {
                    this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
                    this.state.toDate = year + "-" + selectedMonth + "-" + "29";
                }
                this.setState({
                    fromDate: this.state.fromDate,
                    toDate: this.state.toDate,
                    month: this.state.month
                });
            } else {
                if (selectedMonth == currentMonth) {
                    this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
                    this.state.toDate =
                        year + "-" + selectedMonth + "-" + today.getDate();
                } else {
                    this.state.fromDate = year + "-" + selectedMonth + "-" + "01";
                    this.state.toDate = year + "-" + selectedMonth + "-" + "28";
                }
                this.setState({
                    fromDate: this.state.fromDate,
                    toDate: this.state.toDate,
                    month: this.state.month
                });
            }
        }

        this.MonthSubmit(selectedMonth);
    }



    DailySubmit() {

        // var date=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
        var self = this;
        // var date = ('0' + today.getDate()).slice(-2) + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + today.getFullYear();

        var date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,
                date: date,
                date1: date,

            }),

            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/ProfitLossReport/Daily",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {


                var salesAmount = 0;
                var estimateAmount = 0;
                var purchaseAmount = 0;
                var expenseAmount = 0;
                var totalgstAmount = 0;
                var paidAmount = 0;
                var openingBalanceDB = 0;
                var openingBalance = 0;
                var prevSalesAmount = 0;
                var prevPaidAmount = 0;
                var prevPurchaseAmount = 0;
                var prevTotalGSTAmount = 0;
                var prevExpenseAmount = 0;
                var closingBalance = 0;


                if (data.prevSalesAmount != null) {
                    prevSalesAmount = data.prevSalesAmount;
                }
                if (data.prevPaidAmount != null) {
                    prevPaidAmount = data.prevPaidAmount;
                }
                if (data.prevPurchaseAmount != null) {
                    prevPurchaseAmount = data.prevPurchaseAmount;
                }
                if (data.prevTotalGSTAmount != null) {
                    prevTotalGSTAmount = data.prevTotalGSTAmount;
                }
                if (data.prevExpenseAmount != null) {
                    prevExpenseAmount = data.prevExpenseAmount
                }


                if (data.totalSales != null) {
                    salesAmount = data.totalSales;
                }
                if (data.totalEstimate != null) {
                    estimateAmount = data.totalEstimate;
                }
                if (data.totalPurchase != null) {
                    purchaseAmount = data.totalPurchase;
                }
                if (data.totalExpense != null) {
                    expenseAmount = data.totalExpense;
                }
                if (data.totalGST != null) {
                    totalgstAmount = data.totalGST
                }
                if (data.paidAmount != null) {
                    paidAmount = data.paidAmount
                }
                if (data.openingBalance != null) {
                    openingBalanceDB = data.openingBalance
                }
                if (data.closingBalance != null) {
                    closingBalance = data.closingBalance
                }
                var loss = Number(purchaseAmount) + Number(expenseAmount) + Number(totalgstAmount);
                var profit = Number(Number(salesAmount) + Number(estimateAmount)) - Number(loss);
                var actualProfit = Number(profit);
                var actualLoss = Number(loss);
                // running balance=(current day expense - current day paid amount)-current day open balance
                //currentday opening balance /previous day closing balance =(previous day debit - previous day credit);

                var prevLoss = Number(prevPurchaseAmount) + Number(prevExpenseAmount) + Number(prevTotalGSTAmount);

                var openingBalance = Number(openingBalanceDB)
                // if(Number(openingBalance)==Number(openingBalanceDB)){
                //     openingBalance=Number(openingBalanceDB)
                // }else if(Number(openingBalance)==0){
                //     openingBalance=Number(openingBalanceDB)
                // }
                // 15000

                // 5000-100=closing 
                // Closing Balance = Opening Balance + Total of Income - Total of Expenditure.

                var runningBalance = Number(openingBalance) - (Number(loss) - Number(paidAmount));
                var closingBalance = Number(closingBalance);

                var profitNum = Math.sign(profit);
                if (profitNum == -1 || profitNum == -0) {
                    profit = 0;

                } else {
                    loss = 0;
                }


                if (data.configValue == 0) {

                    self.state.data = [];
                    self.state.data[0] = {
                        "Sales": (Math.round(salesAmount * 100) / 100).toFixed(2),
                        "PaidAmount": (Math.round(paidAmount * 100) / 100).toFixed(2),
                        "Tax": (Math.round(totalgstAmount * 100) / 100).toFixed(2),
                        "Purchase": (Math.round(purchaseAmount * 100) / 100).toFixed(2),
                        "Expense": (Math.round(expenseAmount * 100) / 100).toFixed(2),
                        "Profit": (Math.round(profit * 100) / 100).toFixed(2),
                        "Loss": (Math.round(loss * 100) / 100).toFixed(2),


                    };
                    self.state.columns = self.getColumnsWithoutEstimate();

                    self.state.SizeData = 1;
                    self.state.pagination = false;



                    /*    $("#openingBalance").text(Number(openingBalance));
                        $("#runningBalance").text(Number(runningBalance));
                        $("#closingBalance").text(closingBalance);
                        */
                    if (profit == 0) {
                        self.state.amountInWordsProfit=Case.capital(convert_to_words(Number(0),self.state.currencyCode));
                 
                    } else {
                        self.state.amountInWordsProfit=Case.capital(convert_to_words(Number(profit),self.state.currencyCode));
                    }
                    if (loss == 0) {
                        self.state.amountInWordsLoss=Case.capital(convert_to_words(Number(0),self.state.currencyCode));
               
                    } else {
                        self.state.amountInWordsLoss=Case.capital(convert_to_words(Number(loss),self.state.currencyCode));
                    }

                } else if (data.configValue == 1) {

                    self.state.data = [];
                    self.state.data[0] = {
                        "Sales": salesAmount,
                        "Estimate": estimateAmount,
                        "Tax": totalgstAmount,
                        "Purchase": purchaseAmount,
                        "Expense": expenseAmount,
                        "Profit": profit,
                        "Loss": loss

                    };

                    self.state.SizeData = 1;

                    self.state.pagination = false;
                    self.state.columns = self.getColumnsWithEstimate();

                    if (profit == 0) {
                        self.state.amountInWordsProfit=Case.capital(convert_to_words(Number(0),self.state.currencyCode));
                
                    } else {
                        self.state.amountInWordsProfit=Case.capital(convert_to_words(Number(profit),self.state.currencyCode));
                
                    }
                    if (loss == 0) {
                        self.state.amountInWordsProfit=Case.capital(convert_to_words(Number(0),self.state.currencyCode));
                
                    } else {
                        self.state.amountInWordsProfit=Case.capital(convert_to_words(Number(loss),self.state.currencyCode));
                
                    }

                }

                $("#amountinwordsdiv").show();

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

    WeeklySubmit() {

        var self = this;

        var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

        var startOfWeek = moment().startOf('week').toDate();
        var endOfWeek = moment().endOf('week').toDate();

        var fromDate = moment(startOfWeek).format('YYYY-MM-DD');


        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,
                fromDate: fromDate,
                toDate: date

            }),

            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/ProfitLossReport/Weekly",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {

                var configValue = data.slice(-1)[0].configValue;



                $("#tableheading").empty();
                var tabHeading = '<h3>Weekly  Report - ' + fromDate + " to " + date + '</h3>';
                $("#tableheading").append(tabHeading);

                if (configValue == 0) {
                    var totalProfit = 0;
                    var totalLoss = 0;
                    self.state.data = [];
                    var ivalue = 0;

                    for (var i = 0; i < data.length - 1; i++) {

                        var salesAmount = 0;
                        var estimateAmount = 0;
                        var purchaseAmount = 0;
                        var expenseAmount = 0;
                        var totalgstAmount = 0;
                        var paidAmount = 0;
                        var openingBalanceDB = 0;
                        var openingBalance = 0;
                        var prevSalesAmount = 0;
                        var prevPaidAmount = 0;
                        var prevPurchaseAmount = 0;
                        var prevTotalGSTAmount = 0;
                        var prevExpenseAmount = 0;
                        var closingBalance = 0;


                        if (data[i].prevSalesAmount != null) {
                            prevSalesAmount = data[i].prevSalesAmount;
                        }
                        if (data[i].prevPaidAmount != null) {
                            prevPaidAmount = data[i].prevPaidAmount;
                        }
                        if (data[i].prevPurchaseAmount != null) {
                            prevPurchaseAmount = data[i].prevPurchaseAmount;
                        }
                        if (data[i].prevTotalGSTAmount != null) {
                            prevTotalGSTAmount = data[i].prevTotalGSTAmount;
                        }
                        if (data[i].prevExpenseAmount != null) {
                            prevExpenseAmount = data[i].prevExpenseAmount
                        }


                        if (data[i].totalSales != null) {
                            salesAmount = data[i].totalSales;
                        }
                        if (data[i].totalEstimate != null) {
                            estimateAmount = data[i].totalEstimate;
                        }
                        if (data[i].totalPurchase != null) {
                            purchaseAmount = data[i].totalPurchase;
                        }
                        if (data[i].totalExpense != null) {
                            expenseAmount = data[i].totalExpense;
                        }
                        if (data[i].totalGST != null) {
                            totalgstAmount = data[i].totalGST
                        }
                        if (data[i].paidAmount != null) {
                            paidAmount = data[i].paidAmount
                        }
                        if (data[i].openingBalance != null) {
                            openingBalanceDB = data[i].openingBalance
                        }
                        if (data[i].closingBalance != null) {
                            closingBalance = data[i].closingBalance
                        }


                        var loss = Number(purchaseAmount) + Number(expenseAmount) + Number(totalgstAmount);
                        var profit = Number(Number(salesAmount) + Number(estimateAmount)) - Number(loss);
                        var actualProfit = Number(profit);
                        var actualLoss = Number(loss);
                        totalProfit = Number(totalProfit) + Number(profit);
                        totalLoss = Number(totalLoss) + Number(loss);
                        // running balance=(current day expense - current day paid amount)-current day open balance
                        //currentday opening balance /previous day closing balance =(previous day debit - previous day credit);

                        var prevLoss = Number(prevPurchaseAmount) + Number(prevExpenseAmount) + Number(prevTotalGSTAmount);

                        var openingBalance = Number(openingBalanceDB)
                        // if(Number(openingBalance)==Number(openingBalanceDB)){
                        // openingBalance=Number(openingBalanceDB)
                        // }else if(Number(openingBalance)==0){
                        // openingBalance=Number(openingBalanceDB)
                        // }

                        var runningBalance = Number(openingBalance) - (Number(loss) - Number(paidAmount));
                        var closingBalance = Number(closingBalance);
                        var profitNum = Math.sign(profit);
                        if (profitNum == -1 || profitNum == -0) {
                            profit = 0;
                        } else {
                            loss = 0;
                        }


                        var totalprofitNum = Math.sign(totalProfit);
                        if (totalprofitNum == -1 || totalprofitNum == -0) {
                            totalProfit = 0;
                        } else {
                            totalLoss = 0;
                        }

                        self.state.data[i] = {
                            "Date": data[i].date,
                            "Sales": (Math.round(salesAmount * 100) / 100).toFixed(2),
                            "PaidAmount": (Math.round(paidAmount * 100) / 100).toFixed(2),
                            "Tax": (Math.round(totalgstAmount * 100) / 100).toFixed(2),
                            "Purchase": (Math.round(purchaseAmount * 100) / 100).toFixed(2),
                            "Expense": (Math.round(expenseAmount * 100) / 100).toFixed(2),
                            "Profit": (Math.round(profit * 100) / 100).toFixed(2),
                            "Loss": (Math.round(loss * 100) / 100).toFixed(2),
                            //   "Opening Balance":(Math.round(openingBalance* 100) / 100).toFixed(2),
                            //   "Running Balance":(Math.round(runningBalance* 100) / 100).toFixed(2),
                            //    "Closing Balance":(Math.round(closingBalance* 100) / 100).toFixed(2),

                        };
                        ivalue = i;
                    }
                    self.state.SizeData = 9;
                    self.state.pagination = false;
                    self.state.columns = self.getColumnsWithoutEstimate();



                } else if (configValue == 1) {

                    var totalProfit = 0;
                    var totalLoss = 0;
                    self.state.data = [];
                    var ivalue = 0;
                    var totalgstAmount = 0;

                    for (var i = 0; i < data.length - 1; i++) {

                        var salesAmount = 0;
                        var estimateAmount = 0;
                        var purchaseAmount = 0;
                        var expenseAmount = 0;

                        if (data[i].totalSales != null) {
                            salesAmount = data[i].totalSales;
                        }
                        if (data[i].totalEstimate != null) {
                            estimateAmount = data[i].totalEstimate;
                        }
                        if (data[i].totalPurchase != null) {
                            purchaseAmount = data[i].totalPurchase;
                        }
                        if (data[i].totalExpense != null) {
                            expenseAmount = data[i].totalExpense;
                        }
                        if (data[i].totalGST != null) {
                            totalgstAmount = data[i].totalGST;
                        }

                        var loss = Number(purchaseAmount) + Number(expenseAmount) + Number(totalgstAmount);
                        totalLoss = Number(totalLoss) + Number(loss);
                        var profit = Number(Number(salesAmount) + Number(estimateAmount)) - Number(loss);
                        totalProfit = Number(totalProfit) + Number(profit);

                        var profitNum = Math.sign(profit);
                        if (profitNum == -1 || profitNum == -0) {
                            profit = 0;
                        } else {
                            loss = 0;
                        }


                        var totalprofitNum = Math.sign(totalProfit);
                        if (totalprofitNum == -1 || totalprofitNum == -0) {
                            totalProfit = 0;
                        } else {
                            totalLoss = 0;
                        }


                        self.state.data[i] = {
                            "Date": data[i].date,
                            "Sales": salesAmount,

                            "Estimate": estimateAmount,
                            "Tax": totalgstAmount,
                            "Purchase": purchaseAmount,
                            "Expense": expenseAmount,
                            "Profit": profit,
                            "Loss": loss

                        };
                        ivalue = i;
                    }
                    self.state.SizeData = 9;
                    self.state.pagination = false;
                    self.state.columns = self.getColumnsWithEstimate();



                }

                self.state.data[Number(ivalue) + 1] = {
                    "Date": "",
                    "Sales": "",
                    "PaidAmount": "",
                    "Estimate": "",
                    "Purchase": "",
                    "Expense": "",
                    "Profit": <div style={{ fontWeight: "600" }}>{"Total Profit"}</div>,
                    "Loss": <div style={{ fontWeight: "600" }}>{totalProfit}</div>,
                    //    "Running Balance": ""
                };

                self.state.data[Number(ivalue) + 2] = {
                    "Date": "",
                    "Sales": "",
                    "PaidAmount": "",
                    "Estimate": "",
                    "Purchase": "",
                    "Expense": "",
                    "Profit": <div style={{ fontWeight: "600" }}>{"Total Loss"}</div>,
                    "Loss": <div style={{ fontWeight: "600" }}>{totalLoss}</div>,
                    //   "Running Balance": ""
                };

                self.setState({
                    data: self.state.data,
                    columns: self.state.columns
                })
                /*   $("#openingBalance").text(Number(openingBalance));
                   $("#runningBalance").text(Number(runningBalance));
                   $("#closingBalance").text(Number(closingBalance));
                   */

                if (totalProfit == 0) {
                    self.state.amountInWordsProfit=Case.capital(convert_to_words(Number(0),self.state.currencyCode));
                } else {
                    self.state.amountInWordsProfit=Case.capital(convert_to_words(Number(totalProfit),self.state.currencyCode));
                
                }
                if (totalLoss == 0) {
                    self.state.amountInWordsLoss=Case.capital(convert_to_words(Number(0),self.state.currencyCode));
                
                } else {

                    self.state.amountInWordsLoss=Case.capital(convert_to_words(Number(totalLoss),self.state.currencyCode));
                
                }


                $("#amountinwordsdiv").show();

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

    MonthSubmit(selectedMonth) {

        var self = this;



        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,
                fromDate: this.state.fromDate,
                toDate: this.state.toDate

            }),

            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/ProfitLossReport/Weekly",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {


                var configValue = data.slice(-1)[0].configValue;

                var shortMonthName = moment().month(selectedMonth - 1).format('MMM');


                $("#tableheading").empty();
                var tabHeading = '<h3>Monthly Report - ' + shortMonthName + " - " + today.getFullYear() + '</h3>';
                $("#tableheading").append(tabHeading);

                if (configValue == 0) {

                    var totalProfit = 0;
                    var totalLoss = 0;
                    self.state.data = [];
                    var ivalue = 0;


                    for (var i = 0; i < data.length - 1; i++) {

                        var salesAmount = 0;
                        var estimateAmount = 0;
                        var purchaseAmount = 0;
                        var expenseAmount = 0;
                        var totalgstAmount = 0;
                        var paidAmount = 0;
                        var openingBalanceDB = 0;
                        var openingBalance = 0;
                        var prevSalesAmount = 0;
                        var prevPaidAmount = 0;
                        var prevPurchaseAmount = 0;
                        var prevTotalGSTAmount = 0;
                        var prevExpenseAmount = 0;
                        var closingBalance = 0;


                        if (data[i].prevSalesAmount != null) {
                            prevSalesAmount = data[i].prevSalesAmount;
                        }
                        if (data[i].prevPaidAmount != null) {
                            prevPaidAmount = data[i].prevPaidAmount;
                        }
                        if (data[i].prevPurchaseAmount != null) {
                            prevPurchaseAmount = data[i].prevPurchaseAmount;
                        }
                        if (data[i].prevTotalGSTAmount != null) {
                            prevTotalGSTAmount = data[i].prevTotalGSTAmount;
                        }
                        if (data[i].prevExpenseAmount != null) {
                            prevExpenseAmount = data[i].prevExpenseAmount
                        }


                        if (data[i].totalSales != null) {
                            salesAmount = data[i].totalSales;
                        }
                        if (data[i].totalEstimate != null) {
                            estimateAmount = data[i].totalEstimate;
                        }
                        if (data[i].totalPurchase != null) {
                            purchaseAmount = data[i].totalPurchase;
                        }
                        if (data[i].totalExpense != null) {
                            expenseAmount = data[i].totalExpense;
                        }
                        if (data[i].totalGST != null) {
                            totalgstAmount = data[i].totalGST
                        }
                        if (data[i].paidAmount != null) {
                            paidAmount = data[i].paidAmount
                        }
                        if (data[i].openingBalance != null) {
                            openingBalanceDB = data[i].openingBalance
                        }

                        if (data[i].closingBalance != null) {
                            closingBalance = data[i].closingBalance
                        }

                        var loss = Number(purchaseAmount) + Number(expenseAmount) + Number(totalgstAmount);
                        var profit = Number(Number(salesAmount) + Number(estimateAmount)) - Number(loss);
                        var actualProfit = Number(profit);
                        var actualLoss = Number(loss);
                        totalProfit = Number(totalProfit) + Number(profit);
                        totalLoss = Number(totalLoss) + Number(loss);
                        // running balance=(current day expense - current day paid amount)-current day open balance
                        //currentday opening balance /previous day closing balance =(previous day debit - previous day credit);

                        var prevLoss = Number(prevPurchaseAmount) + Number(prevExpenseAmount) + Number(prevTotalGSTAmount);

                        var openingBalance = Number(openingBalanceDB)
                        // if(Number(openingBalance)==Number(openingBalanceDB)){
                        // openingBalance=Number(openingBalanceDB)
                        // }else if(Number(openingBalance)==0){
                        // openingBalance=Number(openingBalanceDB)
                        // }

                        var runningBalance = Number(openingBalance) - (Number(loss) - Number(paidAmount));
                        var closingBalance = Number(closingBalance);


                        var profitNum = Math.sign(profit);
                        if (profitNum == -1 || profitNum == -0) {
                            profit = 0;
                        } else {
                            loss = 0;
                        }


                        var totalprofitNum = Math.sign(totalProfit);
                        if (totalprofitNum == -1 || totalprofitNum == -0) {
                            totalProfit = 0;
                        } else {
                            totalLoss = 0;
                        }

                        self.state.data[i] = {
                            "Date": data[i].date,
                            "Sales": (Math.round(salesAmount * 100) / 100).toFixed(2),
                            "PaidAmount": (Math.round(paidAmount * 100) / 100).toFixed(2),
                            "Purchase": (Math.round(purchaseAmount * 100) / 100).toFixed(2),
                            "Tax": (Math.round(totalgstAmount * 100) / 100).toFixed(2),
                            "Expense": (Math.round(expenseAmount * 100) / 100).toFixed(2),
                            "Profit": (Math.round(profit * 100) / 100).toFixed(2),
                            "Loss": (Math.round(loss * 100) / 100).toFixed(2),
                            //   "Opening Balance":(Math.round(openingBalance* 100) / 100).toFixed(2),
                            //   "Running Balance":(Math.round(runningBalance* 100) / 100).toFixed(2),
                            //   "Closing Balance":(Math.round(closingBalance* 100) / 100).toFixed(2),

                        };
                        ivalue = i;

                    }

                    self.state.data[Number(ivalue) + 1] = {
                        "Date": "",
                        "Sales": "",
                        "PaidAmount": "",
                        "Estimate": "",
                        "Purchase": "",
                        "Expense": "",
                        "Profit": <div style={{ fontWeight: "600" }}>{"Total Profit"}</div>,
                        "Loss": <div style={{ fontWeight: "600" }}>{totalProfit}</div>,
                        //  "Opening Balance":"",
                        //  "Running Balance":"",
                        //  "Closing Balance":"",

                    };

                    self.state.data[Number(ivalue) + 2] = {
                        "Date": "",
                        "Sales": "",
                        "PaidAmount": "",
                        "Estimate": "",
                        "Purchase": "",
                        "Expense": "",
                        "Profit": <div style={{ fontWeight: "600" }}>{"Total Loss"}</div>,
                        //  "Opening Balance":"",
                        //   "Running Balance":"",
                        //   "Closing Balance":"",
                    };


                }


                self.state.SizeData = self.state.data.length;
                // self.state.SizeData=5;
                self.state.pagination = true;
                self.state.columns = self.getColumnsWithoutEstimate();
                self.setState({
                    data: self.state.data,
                    columns: self.state.columns
                })
                /*   $("#openingBalance").text(Number(openingBalance));
                   $("#runningBalance").text(Number(runningBalance));
                   $("#closingBalance").text(Number(closingBalance));
                   */

                if (totalProfit == 0) {
                    self.state.amountInWordsProfit=Case.capital(convert_to_words(Number(0),self.state.currencyCode));
               
                } else {
                    self.state.amountInWordsProfit=Case.capital(convert_to_words(Number(totalProfit),self.state.currencyCode));
               
                }
                if (totalLoss == 0) {
                    self.state.amountInWordsLoss=Case.capital(convert_to_words(Number(0),self.state.currencyCode));
               
                } else {
                    self.state.amountInWordsLoss=Case.capital(convert_to_words(Number(totalLoss),self.state.currencyCode));
               
                }


                $("#amountinwordsdiv").show();

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

    YearSubmit(year) {

        var currentMonth;
        var monthArray = [];
        var self = this;



        if (year == today.getFullYear()) {
            currentMonth = today.getMonth() + 1;
            for (var i = 1; i <= currentMonth; i++) {
                monthArray.push(i);
            }
        } else if (year < today.getFullYear()) {
            currentMonth = 12;
            for (var i = 1; i <= currentMonth; i++) {
                monthArray.push(i);
            }

        }

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId: this.state.companyId,
                months: monthArray.toString(),
                year: year,
            }),

            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/ProfitLossReport/Yearly",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {



                var configValue = data.slice(-1)[0].configValue;

                var data1 = data.slice(0, -1);


                $("#tableheading").empty();
                var tabHeading = '<h3>Yearly Report - ' + year + '</h3>';
                $("#tableheading").append(tabHeading);







                if (configValue == 0) {

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
                        Header: "Category/Month",
                        accessor: "Category/Month",
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

                        var shortMonthName = moment().month(data1[z].month - 1).format('MMM');

                        self.state.columns[Number(z) + 1] = {
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

                        var actualProfit = Number(profit);
                        var actualLoss = Number(loss);


                        var runningBalance = Number(loss) + Number(profit);

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
                        "Category/Month": "Sales"
                    }

                    for (var i = 0; i < data1.length; i++) {

                        var salesAmount = 0;
                        if (data1[i].totalSales != null) {
                            salesAmount = data1[i].totalSales;
                        }

                        var shortMonthName = moment().month(data1[i].month - 1).format('MMM');
                        self.state.data[0][shortMonthName] = (Math.round(salesAmount * 100) / 100).toFixed(2);
                    }


                    self.state.data[1] = {
                        "Category/Month": "Tax"
                    }

                    for (var e = 0; e < data1.length; e++) {

                        var gstAmount = 0;
                        if (data1[e].totalGST != null) {
                            gstAmount = data1[e].totalGST;
                        }

                        var shortMonthName = moment().month(data1[e].month - 1).format('MMM');

                        self.state.data[1][shortMonthName] = (Math.round(gstAmount * 100) / 100).toFixed(2);
                    }


                    self.state.data[2] = {
                        "Category/Month": "Expense"
                    }

                    for (var j = 0; j < data1.length; j++) {

                        var expenseAmount = 0;
                        if (data1[j].totalExpense != null) {
                            expenseAmount = data1[j].totalExpense;
                        }

                        var shortMonthName = moment().month(data1[j].month - 1).format('MMM');

                        self.state.data[2][shortMonthName] = (Math.round(expenseAmount * 100) / 100).toFixed(2);
                    }




                    self.state.data[3] = {
                        "Category/Month": "Purchase"
                    }

                    for (var k = 0; k < data1.length; k++) {
                        var purchaseAmount = 0;
                        if (data1[k].totalPurchase != null) {
                            purchaseAmount = data1[k].totalPurchase;
                        }
                        var shortMonthName = moment().month(data1[k].month - 1).format('MMM');

                        self.state.data[3][shortMonthName] = (Math.round(purchaseAmount * 100) / 100).toFixed(2);
                    }

                    self.state.data[4] = {
                        "Category/Month": <div><span style={{ fontWeight: "600" }}>Profit</span></div>
                    }

                    for (var l = 0; l < profitArray.length; l++) {


                        var shortMonthName = moment().month(data1[l].month - 1).format('MMM');

                        self.state.data[4][shortMonthName] = <div><span style={{ fontWeight: "600" }}>{(Math.round(profitArray[l] * 100) / 100).toFixed(2)}</span></div>;
                    }

                    self.state.data[5] = {
                        "Category/Month": <div><span style={{ fontWeight: "600" }}>Loss</span></div>
                    }

                    for (var m = 0; m < lossArray.length; m++) {
                        var shortMonthName = moment().month(data1[m].month - 1).format('MMM');

                        self.state.data[5][shortMonthName] = <div><span style={{ fontWeight: "600" }}>{(Math.round(lossArray[m] * 100) / 100).toFixed(2)}</span></div>;
                    }

                    if (totalProfit == 0) {
                        self.state.amountInWordsProfit=Case.capital(convert_to_words(Number(0),self.state.currencyCode));
               
                    } else {
                        self.state.amountInWordsLoss=Case.capital(convert_to_words(Number(totalProfit),self.state.currencyCode));
               
                    }
                    if (totalLoss == 0) {
                        self.state.amountInWordsLoss=Case.capital(convert_to_words(Number(0),self.state.currencyCode));
               
                    } else {
                        self.state.amountInWordsLoss=Case.capital(convert_to_words(Number(totalLoss),self.state.currencyCode));
               
                    }

                }
                else if (configValue == 1) {


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
                    self.state.SizeData = 7;
                    self.state.pagination = false;


                    self.state.columns[0] = {
                        Header: "Category/Month",
                        accessor: "Category/Month",
                        show: true
                    }

                    var profitArray = [];
                    var lossArray = [];
                    var totalGstArray = [];

                    for (var z = 0; z < data1.length; z++) {
                        var salesAmount = 0;
                        var estimateAmount = 0;
                        var expenseAmount = 0;
                        var purchaseAmount = 0;
                        var totalgst = 0;

                        var shortMonthName = moment().month(data1[z].month - 1).format('MMM');

                        self.state.columns[Number(z) + 1] = {
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


                        var profit = Number(salesAmount) + Number(estimateAmount);
                        var loss = Number(expenseAmount) + Number(purchaseAmount) + Number(totalgst);
                        totalProfit = Number(profit) + Number(totalProfit);

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
                        "Category/Month": "Sales"
                    }

                    for (var i = 0; i < data1.length; i++) {

                        var salesAmount = 0;
                        if (data1[i].totalSales != null) {
                            salesAmount = data1[i].totalSales;
                        }

                        var shortMonthName = moment().month(data1[i].month - 1).format('MMM');
                        self.state.data[0][shortMonthName] = salesAmount;
                    }

                    self.state.data[1] = {
                        "Category/Month": "Estimate"
                    }

                    for (var n = 0; n < data1.length; n++) {

                        var estimateAmount = 0;
                        if (data1[n].totalEstimate != null) {
                            estimateAmount = data1[n].totalEstimate;
                        }

                        var shortMonthName = moment().month(data1[n].month - 1).format('MMM');

                        self.state.data[1][shortMonthName] = estimateAmount;
                    }

                    self.state.data[2] = {
                        "Category/Month": "Tax"
                    }

                    for (var e = 0; e < data1.length; e++) {

                        var gstAmount = 0;
                        if (data1[e].totalGST != null) {
                            gstAmount = data1[e].totalGST;
                        }

                        var shortMonthName = moment().month(data1[e].month - 1).format('MMM');

                        self.state.data[2][shortMonthName] = gstAmount;
                    }


                    self.state.data[3] = {
                        "Category/Month": "Expense"
                    }

                    for (var j = 0; j < data1.length; j++) {

                        var expenseAmount = 0;
                        if (data1[j].totalExpense != null) {
                            expenseAmount = data1[j].totalExpense;
                        }

                        var shortMonthName = moment().month(data1[j].month - 1).format('MMM');

                        self.state.data[3][shortMonthName] = expenseAmount;
                    }




                    self.state.data[4] = {
                        "Category/Month": "Purchase"
                    }

                    for (var k = 0; k < data1.length; k++) {
                        var purchaseAmount = 0;
                        if (data1[k].totalPurchase != null) {
                            purchaseAmount = data1[k].totalPurchase;
                        }
                        var shortMonthName = moment().month(data1[k].month - 1).format('MMM');

                        self.state.data[4][shortMonthName] = purchaseAmount;
                    }

                    self.state.data[5] = {
                        "Category/Month": <div><span style={{ fontWeight: "600" }}>Profit</span></div>
                    }

                    for (var l = 0; l < profitArray.length; l++) {


                        var shortMonthName = moment().month(data1[l].month - 1).format('MMM');

                        self.state.data[5][shortMonthName] = <div><span style={{ fontWeight: "600" }}>{profitArray[l]}</span></div>;
                    }

                    self.state.data[6] = {
                        "Category/Month": <div><span style={{ fontWeight: "600" }}>Loss</span></div>
                    }

                    for (var m = 0; m < lossArray.length; m++) {
                        var shortMonthName = moment().month(data1[m].month - 1).format('MMM');

                        self.state.data[6][shortMonthName] = <div><span style={{ fontWeight: "600" }}>{lossArray[m]}</span></div>;
                    }



                    if (totalProfit == 0) {
                        self.state.amountInWordsProfit=Case.capital(convert_to_words(Number(0),self.state.currencyCode));
               
                    } else {
                        self.state.amountInWordsProfit=Case.capital(convert_to_words(Number(totalProfit),self.state.currencyCode));
               
                    }
                    if (totalLoss == 0) {
                        self.state.amountInWordsLoss=Case.capital(convert_to_words(Number(0),self.state.currencyCode));
               
                    } else {
                        self.state.amountInWordsLoss=Case.capital(convert_to_words(Number(totalLoss),self.state.currencyCode));
               
                    }

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

        const downloadButtonData = <Invoice_xlDownldBtn />;
        return (
            <div className="container">
                <div className="">
                    <div className="">
                        <Double_BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
                    </div>
                    <div className="inv_HeaderCls">
                        <h3 >Profit & Loss Report</h3>
                    </div>
                    <div class="">
                    </div>


                </div>

                <form style={{ display: "inline-flex" }}>

                    <span>
                        <label htmlFor="fromDate" style={{ paddingRight: '50px', fontWeight: '600' }}> Period:</label>
                        <select name="period" id="period" onChange={this.handleUserInput} class="form-control">
                            <option value="" disabled selected hidden>--Select--</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select> </span>
                    <div class="btn-group month" id="monthdiv" style={{ marginBottom: "0%" }}>
                        <span style={{ paddingLeft: "22px" }}  > <label for="month" style={{ fontWeight: '600' }}>Month:  </label>
                            <input
                                type="text"
                                id="month"
                                name="month"
                                style={{ color: "black", marginBottom: "0px" }}
                                class="monthPicker form-control"
                                autocomplete="off"
                                placeholder="Select Month" /></span>
                    </div>

                    <div class="btn-group year" id="yeardiv" style={{ marginBottom: "0%" }}>
                        <span style={{ paddingLeft: "22px" }}> <label for="year" style={{ fontWeight: '600' }}>Year:  </label>
                            <input
                                type="text"
                                id="year"
                                name="year"
                                style={{ color: "black", marginBottom: "0px" }}
                                class="yearPicker form-control"
                                autocomplete="off"
                                placeholder="Select Year" /></span>
                    </div>
                </form>
                <div className="">
                    <h3 id="tableheading" style={{ textAlign: "center" }}></h3>
                </div>

                <div class="buttonright_report text-right report_reactIcon_Dcls" >
                    <ReactHTMLTableToExcel
                        id="test-table-xls-button1"
                        className="download-table-xls-button1"
                        table="tableHeadings"
                        filename="Profit&Loss_List"
                        sheet="tablexls"
                        buttonText={downloadButtonData}
                    />
                </div>

                <ReactTable id="reacttableid"
                    data={this.state.data}
                    columns={this.state.columns}
                    noDataText="No Data Available"
                    filterable={false}
                    pageSize={this.state.SizeData}
                    className="-striped -highlight "
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
                <div className="row reactTable_cls">

                    <div class="col-sm-6" id="amountinwordsdiv" className="pull-right" style={{ marginBottom: "20px" }}>
                        <div style={{ fontSize: "15px", fontStyle: "italic" }} ><b>Profit Amount In Words:</b>   <span>{this.state.amountInWordsProfit}</span></div>
                        <div style={{ fontSize: "15px", fontStyle: "italic" }} ><b>Loss Amount In Words: </b>  <span >{this.state.amountInWordsLoss}</span></div>
                    </div>

                </div>

            </div>
        );
    }
}
export default ProfitLossReport;
