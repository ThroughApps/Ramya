
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import CryptoJS from 'crypto-js';
import ReactDOM from 'react-dom';
import rupee from './image/rupee.png';
import $ from 'jquery';
//import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { Pie, Bar, HorizontalBar, Doughnut, Bubble, Line } from 'react-chartjs-2';
import { Chart } from "react-google-charts";

//components
import AddProduct from '../AddProduct';
import VendorEntryForm from '../VendorEntryForm';
import CustomerEntryForm from '../CustomerEntryForm';
import SaleOrder from '../SaleOrder';
//import FooterText from '../FooterText';
import InvoiceList from '../InvoiceList';
//css
import './DashboardOverallCss.css';
import './Card.scss';
import ReactApexChart from 'react-apexcharts';
import AvailableStockReport from '../AvailableStockReport.js';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import registerServiceWorker from '../registerServiceWorker';
import VehicleRegistration from '../VehicleRegistration';
import moment from 'moment';
import SelectSearch from 'react-select';
import _ from 'underscore';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from '../ConstSiteFunction';

import * as GiIcons from 'react-icons/gi';
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import ServiceRegistration from '../ServiceRegistration/ServiceRegistration';
import { fontFamily } from 'excel4node/distribution/lib/types';
import dollar from './image/dollar.png';
import SaleInvoice from '../Invoice/SaleInvoice';

var dashboardData;

var i = 1;
const data1 = [
  ["Task", "Hours per Day"],
  ["Work" + ' (11)', 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
  ["Work1" + ' (11)', 11],
  ["Eat1", 2],
  ["Commute1", 2],
  ["Watch TV1", 2],
  ["Sleep1", 7],
  ["Work2" + ' (11)', 11],
  ["Eat2", 2],
  ["Commute3", 2],
  ["Watch TV4", 2],
  ["Sleep4", 7]// CSS-style declaration
];
const options = {
  title: "",
  pieHole: 10,
  is3D: true,
  sliceVisibilityThreshold: 0
};



class DashboardOverall extends Component {

  constructor() {
    super()
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var configValue = CryptoJS.AES.decrypt(localStorage.getItem('ConfigValue'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var today = new Date();

    /*  var companyId = "001";
     var configValue = "0"; */

    this.state = {

      date: '',
      current_Month: '',
      current_Year: today.getFullYear(),
      companyId: companyId,
      staffId: staffId,
      empSites: GetEmployeeSite(),
      configValue: configValue,
      SaleInvoice_Total_Amt: 0,
      EstimateInvoice_Total_Amt: 0,
      monthly_Purchase: 0,
      monthly_Expense: 0,
      monthly_Profit: 0,
      monthly_PurchaseInvoice: 0,
      monthly_ExpenseInvoice: 0,
      total_No_of_Vendors: 0,
      total_No_of_Customers: 0,
      total_No_of_ProductList: 0,
      total_No_of_SaleInvoice: 0,
      total_No_of_WithGST_Quotation: 0,
      total_No_of_SaleInvoice_Qty: 0,
      total_No_of_SaleInvoice_Qty_Estimate: 0,
      total_No_of_Salary_paid: 0,

      total_Sales_Amount_Annually: 0,
      total_Estimate_Amount_Annually: 0,
      total_Purchase_Amount_Annually: 0,
      yearlyExpense: 0,
      dailyExpense: 0,
      dailySales: 0,
      yearlySales: 0,

      sale: 0,
      saleQty: 0,
      purchase: 0,
      expense: 0,
      profits: 0,
      last_sale: 0,
      last_purchase: 0,
      last_expense: 0,
      last_profit: 0,
      options: [],

      seriesPaymentStats: [10, 20, 30, 40, 50],
      optionsPaymentStats: {
        chart: {
          id: 'paymentStatistics',
          height: 250,
          type: 'polarArea',
          background: "#fff",
        },
        yaxis: {
          show: false
        },
        tooltip: {
          enabled: true,
          onItemClick: {
            toggleDataSeries: true
          },
          onItemHover: {
            highlightDataSeries: true
          },
          style: {
            fontSize: '12px',
            color: "#333"
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: "70%",
              background: "#fff",
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: "#fff",
              strokeWidth: "67%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },

            dataLabels: {
              showOn: "always",
              name: {
                offsetY: -20,
                show: true,
                color: "#888",
                fontSize: "13px"
              },
              value: {
                formatter: function (val) {
                  return val;
                },
                color: "#111",
                fontSize: "30px",
                show: true
              }
            }
          }

        },
        labels: [],
        legend: {
          show: true,
          floating: true,
          fontSize: '14px',
          position: 'left',
          offsetX: 15,
          width: 200,
          offsetY: 30,
          labels: {
            useSeriesColors: true,
          },
          markers: {
            size: 0
          },
          formatter: function (seriesName, opts) {
            var val = opts.w.globals.series[opts.seriesIndex];
            return seriesName + ":  " + val
          },
          itemMargin: {
            vertical: 3
          }
        },
        noData: {
          text: "No Data",
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            fontSize: '14px',
          }
        },
        title: {
          align: 'center',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#263238'
          },
          formatter: function (seriesName, opts) {
            var val = opts.w.globals.series[opts.seriesIndex];
            return seriesName + ":  " + val
          },
          itemMargin: {
            vertical: 3
          }
        },

        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              id: 'paymentStatistics',
              height: 250,
              type: 'donut',
            },
            legend: {
              fontSize: "10px",
              position: 'right',
            },
            plotOptions: {
              donut: {
                dataLabels: {
                  name: {
                    show: true,
                  },
                  value: {
                    show: true,
                  }
                }
              }
            },
          }
        }]
      },
      seriesGenStats: [10, 20, 30, 40, 50],
      optionsGenStats: {
        chart: {
          id: 'generalStatistics',
          height: 250,
          type: 'donut',
          background: "#fff",
        },
        tooltip: {
          enabled: true,
          onItemClick: {
            toggleDataSeries: true
          },
          onItemHover: {
            highlightDataSeries: true
          },
          style: {
            fontSize: '12px',
            color: "#333"
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: "70%",
              background: "#fff",
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: "#fff",
              strokeWidth: "67%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },

            dataLabels: {
              showOn: "always",
              name: {
                offsetY: -20,
                show: true,
                color: "#888",
                fontSize: "13px"
              },
              value: {
                formatter: function (val) {
                  return val;
                },
                color: "#111",
                fontSize: "30px",
                show: true
              }
            }
          }

        },
        labels: [],
        legend: {
          show: true,
          floating: true,
          fontSize: '14px',
          position: 'left',
          offsetX: 15,
          width: 200,
          offsetY: 30,
          labels: {
            useSeriesColors: true,
          },
          markers: {
            size: 0
          },
          formatter: function (seriesName, opts) {
            var val = opts.w.globals.series[opts.seriesIndex];
            return seriesName + ":  " + val
          },
          itemMargin: {
            vertical: 3
          }
        },
        noData: {
          text: "No Data",
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            fontSize: '14px',
          }
        },
        title: {
          align: 'center',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#263238'
          },
          formatter: function (seriesName, opts) {
            var val = opts.w.globals.series[opts.seriesIndex];
            return seriesName + ":  " + val
          },
          itemMargin: {
            vertical: 3
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              id: 'generalStatistics',
              height: 250,
              type: 'donut',
            },
            legend: {
              fontSize: "10px",
              position: 'right',
            },
            plotOptions: {
              donut: {
                dataLabels: {
                  name: {
                    show: true,
                  },
                  value: {
                    show: true,
                  }
                }
              }
            },
          }
        }]
      },
      seriesyearly: [
        {
          name: "Sales",
          data: [28, 29, 33, 36, 32, 32, 33]
        },
        {
          name: "Purchase",
          data: [12, 11, 14, 18, 17, 13, 13]
        }
      ],
      optionsyearly: {
        chart: {
          height: 350,
          type: 'line',
            fontFamily:"Roboto",
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#fda45d', '#75c1ce'],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: '',
          align: 'left'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {
          size: 1
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          title: {
            text: 'Month'
          }
        },
        yaxis: {
          title: {
            text: 'Amount'
          },
          min: 5
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      },
      seriesTopSelling: [{
        name: "",
        data: [28, 29, 33, 36, 32, 32, 33]
      }],
      optionsTopSelling: {
        chart: {
          height: 350,
          width: "100%",
          type: 'bar',
          id: "topSellingChart",
          fontFamily:"Roboto",
          toolbar: {
            show: true
          },
          background: "#ffffff"
        },
        //colors: ['#77B6EA', '#545454'],
        dataLabels: {
          enabled: true,
          formatter: function (val, opt) {
            //  return opt.w.globals.categoryLabels[opt.dataPointIndex] + ":  " + val + " mins"
            return val;

          }
        },
        tooltip: {
          enabled: true,
          onItemClick: {
            toggleDataSeries: true
          },
          onItemHover: {
            highlightDataSeries: true
          },
          style: {
            fontSize: '12px',
            color: "#333"
          },
        },
        plotOptions: {
          bar: {
            barHeight: '65%',
            endingShape: 'rounded',
            columnWidth: '30%',
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: 'bottom'
            },
          }
        },
      /*    colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
            '#f48024', '#69d2e7'
        ],
       */   dataLabels: {
          enabled: true,
          textAnchor: 'start',
          position: 'top',
          style: {
            colors: ['#000000'],
            overflow: "hidden"
          },

          formatter: function (val, opt) {
            return val;

            // return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val + "mins"
          },
          offsetX: 0,
          dropShadow: {
            enabled: false
          }
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        title: {
          text: '',
          align: 'center',
          fontSize: "14px"
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {
          size: 1
        },
        xaxis: {
          categories: [],
          title: {
            text: 'Sale Quantity'
          }
        },
        yaxis: {
          title: {
            text: 'Product Name'
          },
          style: {
            overflow: "hidden"
          }
        },

        legend: {
          show: false,
          position: 'bottom',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -20,
          offsetX: -10
        },
        theme: {
          mode: 'light',
          palette: 'palette1',
          monochrome: {
            enabled: false,
            color: '#255aee',
            shadeTo: 'light',
            shadeIntensity: 0.65
          },
        },

      },
      doughnutData: {

        labels: ['Sale Qty', 'Paid Salary', 'Total Expense'],
        datasets: [{
          label: 'Statistics',
          backgroundColor: [
            '#f75f00',
            '#13abc4',
            '#2b580c'

          ],
          data: [65, 59, 80]

        },

        ]
      },
      formErrors: { passwordValid: '', },
    }
    this.setState({
      configValue: configValue,
    });
  }

  componentDidMount() {
    SetCurrentPage("DashboardOverall");
    window.scrollTo(0, 0);
    // var a=['"06-12-2020","07-12-2020","08-12-2020"'].replace(/"/g, '');

    // alert(a);

    var array = ["06-12-2020", "07-12-2020", "08-12-2020"],
      list = array.map(s => `'${s}'`).join(',');


    const set = new Set(`${list}`);
    var array2 = Array.from(set);



    $(".btn-default").css("background-color", "#05a4b5");
    $(".btn-default").css("color", "white");
    this.DashboardDisplayFunc();
    $(".btn-default").css("background-color", "#05a4b5");
    $(".btn-default").css("color", "white");
    var configValue = CryptoJS.AES.decrypt(localStorage.getItem('ConfigValue'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    /*  var configValue = "0"; */
    if (configValue == 0) {

      $("#ContentPlaceHolder1_Lbl_monthlysale").append(Number(this.state.SaleInvoice_Total_Amt));
      this.state.monthly_Profit = Math.round(((Number(this.state.SaleInvoice_Total_Amt) - Number(this.state.monthly_PurchaseInvoice)) - Number(this.state.monthly_ExpenseInvoice)));
      if (Number(this.state.monthly_Profit) < 0) {
        this.state.monthly_Profit = 0;

      }

    } else {
      $("#ContentPlaceHolder1_Lbl_monthlysale").append((Number(this.state.SaleInvoice_Total_Amt) + Number(this.state.EstimateInvoice_Total_Amt)));
      this.state.monthly_Profit = Math.round((((Number(this.state.SaleInvoice_Total_Amt) + Number(this.state.EstimateInvoice_Total_Amt)) - Number(this.state.monthly_PurchaseInvoice)) - Number(this.state.monthly_ExpenseInvoice)));
      if (Number(this.state.monthly_Profit) < 0) {
        this.state.monthly_Profit = 0;

      }
    }
    var empSites = CryptoJS.AES.decrypt(localStorage.getItem('EmpSites'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var currentSite = CryptoJS.AES.decrypt(localStorage.getItem('CurrentSite'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var emparray = empSites.split(",");
    this.state.options = _.map(emparray, function (site) { return { label: site, value: site }; });
    this.state.options.push({ label: "All", value: "All" });
    this.setState({
      options: this.state.options
    })


  }
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  componentWillUnmount() {
    clearInterval(this.state.interval_refresh);

  }


  DashboardDisplayFunc() {
    var today = new Date();
    this.state.date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.state.current_Month = today.getMonth() + 1;
    this.state.current_Year = today.getFullYear();




    var self = this;



    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        date: this.state.date,
        current_Month: this.state.current_Month,
        current_Year: this.state.current_Year,
        companyId: this.state.companyId,
        empSites: this.state.empSites
        // yesterday:yesterday,
        // lastMonth:lastMonth,
        // lastYear:lastYear,

      }),

      // url: " http://15.206.129.105:8080/ThroughBooksCOAPI/DashboardDisplay/DashboardDisplayFrontpage",
      url: "http://15.206.129.105:8080/ThroughBooksCOAPI/DashboardDisplay/DashboardDisplayFrontpage",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        console.log("data")
        dashboardData = data;

        self.state.current_type = "Daily";
        self.state.last_current_type = "Yesterday";
        self.state.seriesyearly = [];
        self.RepeatData();

        if (data.monthly_ExpenseInvoice != null)
          self.state.monthly_ExpenseInvoice = data.monthly_ExpenseInvoice;

        self.state.total_No_of_Vendors = data.total_No_of_Vendors;
        self.state.total_No_of_Customers = data.total_No_of_Customers;
        self.state.total_No_of_ProductList = data.total_No_of_ProductList;
        self.state.total_No_of_SaleInvoice = data.total_No_of_SaleInvoice;
        self.state.total_No_of_WithGST_Quotation = data.total_No_of_WithGST_Quotation;

        if (data.total_No_of_SaleInvoice_Qty != null)
          self.state.total_No_of_SaleInvoice_Qty = data.total_No_of_SaleInvoice_Qty;

        if (data.total_No_of_SaleInvoice_Qty_Estimate != null)
          self.state.total_No_of_SaleInvoice_Qty_Estimate = data.total_No_of_SaleInvoice_Qty_Estimate;

        if (data.total_No_of_Salary_paid != null)
          self.state.total_No_of_Salary_paid = data.total_No_of_Salary_paid;

        if (data.total_Sales_Amount_Annually != null)
          self.state.total_Sales_Amount_Annually = data.total_Sales_Amount_Annually;

        if (data.total_Estimate_Amount_Annually != null)
          self.state.total_Estimate_Amount_Annually = data.total_Estimate_Amount_Annually;


        if (data.total_Purchase_Amount_Annually != null)
          self.state.total_Purchase_Amount_Annually = data.total_Purchase_Amount_Annually;

        if (data.total_No_of_SaleInvoice_Qty == null)
          self.state.doughnutData.datasets[0].data[0] = 99;

        if (data.total_No_of_Salary_paid != null)
          self.state.doughnutData.datasets[0].data[1] = self.state.total_No_of_Salary_paid;

        if (data.monthly_ExpenseInvoice != null)
          self.state.doughnutData.datasets[0].data[2] = self.state.monthly_ExpenseInvoice;

        var configValue = CryptoJS.AES.decrypt(localStorage.getItem('ConfigValue'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        //alert("sale_amt_annual"+self.state.total_Sales_Amount_Annually);
        //alert("Estimate_amt_annual"+self.state.total_Estimate_Amount_Annually);

        if (configValue == 0) {

          $("#sale_amount_annual").append(Number(self.state.total_Sales_Amount_Annually));
          // this.state.monthly_Profit = Math.round(((Number(this.state.SaleInvoice_Total_Amt) - Number(this.state.monthly_PurchaseInvoice)) - Number(this.state.monthly_ExpenseInvoice)));

        } else {
          $("#sale_amount_annual").append((Number(self.state.total_Sales_Amount_Annually) + Number(self.state.total_Estimate_Amount_Annually)));
          //     this.state.monthly_Profit = Math.round((((Number(this.state.SaleInvoice_Total_Amt) + Number(this.state.EstimateInvoice_Total_Amt)) - Number(this.state.monthly_PurchaseInvoice)) - Number(this.state.monthly_ExpenseInvoice)));

        }

        var janvalue = 0;
        var febvalue = 0;
        var marvalue = 0;
        var aprvalue = 0;
        var mayvalue = 0;
        var junvalue = 0;
        var julvalue = 0;
        var augvalue = 0;
        var sepvalue = 0;
        var octvalue = 0;
        var novvalue = 0;
        var decvalue = 0;
        $.each(data.dashboard_LineChart_List_estimate, function (i, item) {
          if (item.current_Month == 1) {

            self.state.janEstimateValue = item.monthly_EstimateInvoice;
            self.setState({
              janEstimateValue: self.state.janEstimateValue,
            })

          }
          else if (item.current_Month == 2) {
            self.state.FebEstimateValue = item.monthly_EstimateInvoice;
            self.setState({
              FebEstimateValue: self.state.FebEstimateValue,
            })


          } else if (item.current_Month == 3) {

            self.state.MarEstimateValue = item.monthly_EstimateInvoice;
            self.setState({
              MarEstimateValue: self.state.MarEstimateValue,
            })

          } else if (item.current_Month == 4) {
            self.state.AprilEstimateValue = item.monthly_EstimateInvoice;
            self.setState({
              AprilEstimateValue: self.state.AprilEstimateValue,
            })


          } else if (item.current_Month == 5) {

            self.state.MayEstimateValue = item.monthly_EstimateInvoice;
            self.setState({
              MayEstimateValue: self.state.MayEstimateValue,
            })


          } else if (item.current_Month == 6) {

            self.state.JuneEstimateValue = item.monthly_EstimateInvoice;
            self.setState({
              JuneEstimateValue: self.state.JuneEstimateValue,
            })


          } else if (item.current_Month == 7) {

            self.state.JulyEstimateValue = item.monthly_EstimateInvoice;
            self.setState({
              JulyEstimateValue: self.state.JulyEstimateValue,
            })


          } else if (item.current_Month == 8) {

            self.state.AugEstimateValue = item.monthly_EstimateInvoice;
            self.setState({
              AugEstimateValue: self.state.AugEstimateValue,
            })


          } else if (item.current_Month == 9) {

            self.state.SepEstimateValue = item.monthly_EstimateInvoice;
            self.setState({
              SepEstimateValue: self.state.SepEstimateValue,
            })


          }
          else if (item.current_Month == 10) {

            self.state.OctEstimateValue = item.monthly_EstimateInvoice;
            self.setState({
              OctEstimateValue: self.state.OctEstimateValue,
            })

          } else if (item.current_Month == 11) {

            self.state.NovEstimateValue = item.monthly_EstimateInvoice;
            self.setState({
              NovEstimateValue: self.state.NovEstimateValue,
            })


          }
          else if (item.current_Month == 12) {

            self.state.DecEstimateValue = item.monthly_EstimateInvoice;
            self.setState({
              DecEstimateValue: self.state.DecEstimateValue,
            })


          }
        });

        if (configValue == 0) {
          $.each(data.dashboard_LineChart_List, function (i, item) {
            if (item.current_Month == 1) {

              janvalue = item.monthly_SalesInvoice;


            }
            else if (item.current_Month == 2) {

              febvalue = item.monthly_SalesInvoice;

            } else if (item.current_Month == 3) {

              marvalue = item.monthly_SalesInvoice;

            } else if (item.current_Month == 4) {

              aprvalue = item.monthly_SalesInvoice;

            } else if (item.current_Month == 5) {

              mayvalue = item.monthly_SalesInvoice;

            } else if (item.current_Month == 6) {

              junvalue = item.monthly_SalesInvoice;

            } else if (item.current_Month == 7) {

              julvalue = item.monthly_SalesInvoice;

            } else if (item.current_Month == 8) {

              augvalue = item.monthly_SalesInvoice;

            } else if (item.current_Month == 9) {

              sepvalue = item.monthly_SalesInvoice;

            }
            else if (item.current_Month == 10) {

              octvalue = item.monthly_SalesInvoice;

            } else if (item.current_Month == 11) {

              novvalue = item.monthly_SalesInvoice;

            }
            else if (item.current_Month == 12) {

              decvalue = item.monthly_SalesInvoice;

            }
          });

        } else {
          $.each(data.dashboard_LineChart_List, function (i, item) {
            if (item.current_Month == 1) {

              janvalue = Math.round(Number(item.monthly_SalesInvoice) + Number(self.state.janEstimateValue));


            }
            else if (item.current_Month == 2) {

              febvalue = Math.round(Number(item.monthly_SalesInvoice) + Number(self.state.FebEstimateValue));

            } else if (item.current_Month == 3) {

              marvalue = Math.round(Number(item.monthly_SalesInvoice) + Number(self.state.MarEstimateValue));

            } else if (item.current_Month == 4) {

              aprvalue = Math.round(Number(item.monthly_SalesInvoice) + Number(self.state.AprilEstimateValue));

            } else if (item.current_Month == 5) {

              mayvalue = Math.round(Number(item.monthly_SalesInvoice) + Number(self.state.MayEstimateValue));

            } else if (item.current_Month == 6) {

              junvalue = Math.round(Number(item.monthly_SalesInvoice) + Number(self.state.JuneEstimateValue));

            } else if (item.current_Month == 7) {

              julvalue = Math.round(Number(item.monthly_SalesInvoice) + Number(self.state.JulyEstimateValue));

            } else if (item.current_Month == 8) {

              augvalue = Math.round(Number(item.monthly_SalesInvoice) + Number(self.state.AugEstimateValue));

            } else if (item.current_Month == 9) {

              sepvalue = Math.round(Number(item.monthly_SalesInvoice) + Number(self.state.SepEstimateValue));

            }
            else if (item.current_Month == 10) {

              octvalue = Math.round(Number(item.monthly_SalesInvoice) + Number(self.state.OctEstimateValue));

            } else if (item.current_Month == 11) {

              novvalue = Math.round(Number(item.monthly_SalesInvoice) + Number(self.state.NovEstimateValue));

            }
            else if (item.current_Month == 12) {

              decvalue = Math.round(Number(item.monthly_SalesInvoice) + Number(self.state.DecEstimateValue));

            }
          });
        }


        self.state.seriesyearly.push({
          name: "Sales",
          data: [janvalue, febvalue, marvalue, aprvalue, mayvalue, junvalue, julvalue, augvalue, sepvalue, octvalue, novvalue, decvalue]
        });
        janvalue = 0;
        febvalue = 0;
        marvalue = 0;
        aprvalue = 0;
        mayvalue = 0;
        junvalue = 0;
        julvalue = 0;
        augvalue = 0;
        sepvalue = 0;
        octvalue = 0;
        novvalue = 0;
        decvalue = 0;

        $.each(data.dashboard_LineChart_List_purchase, function (i, item) {
          if (item.current_Month == 1) {
            janvalue = item.monthly_PurchaseInvoice;


          }
          else if (item.current_Month == 2) {
            febvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 3) {
            // alert("monthlyPurchaseinvoicevalue"+item.monthly_PurchaseInvoice);
            marvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 4) {
            aprvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 5) {
            mayvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 6) {
            junvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 7) {
            julvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 8) {
            augvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 9) {
            sepvalue = item.monthly_PurchaseInvoice;

          }
          else if (item.current_Month == 10) {
            octvalue = item.monthly_PurchaseInvoice;

          } else if (item.current_Month == 11) {
            novvalue = item.monthly_PurchaseInvoice;

          }
          else if (item.current_Month == 12) {
            decvalue = item.monthly_PurchaseInvoice;

          }
        });


        self.state.seriesyearly.push({
          name: "Purchase",
          data: [janvalue, febvalue, marvalue, aprvalue, mayvalue, junvalue, julvalue, augvalue, sepvalue, octvalue, novvalue, decvalue]
        });

        self.setState({
          SaleInvoice_Total_Amt: self.state.SaleInvoice_Total_Amt,
          EstimateInvoice_Total_Amt: self.state.EstimateInvoice_Total_Amt,
          monthly_PurchaseInvoice: self.state.monthly_PurchaseInvoice,
          monthly_ExpenseInvoice: self.state.monthly_ExpenseInvoice,
          total_No_of_Vendors: self.state.total_No_of_Vendors,
          total_No_of_Customers: self.state.total_No_of_Customers,
          total_No_of_ProductList: self.state.total_No_of_ProductList,
          total_No_of_SaleInvoice: self.state.total_No_of_SaleInvoice,
          total_No_of_WithGST_Quotation: self.state.total_No_of_WithGST_Quotation,
          total_No_of_SaleInvoice_Qty: self.state.total_No_of_SaleInvoice_Qty,
          total_No_of_SaleInvoice_Qty_Estimate: self.state.total_No_of_SaleInvoice_Qty_Estimate,
          total_No_of_Salary_paid: self.state.total_No_of_Salary_paid,
          total_Sales_Amount_Annually: self.state.total_Sales_Amount_Annually,
          total_Estimate_Amount_Annually: self.state.total_Estimate_Amount_Annually,
          total_Purchase_Amount_Annually: self.state.total_Purchase_Amount_Annually,
          seriesyearly: [...self.state.seriesyearly]

        });


        var no;
        var tab = '<thead style="overflow:auto;"><tr class="headcolor" style="background-color: #91c5f5;"><th>S.No</th><th>Invoice</th><th>Date</th><th>Name</th><th>Status</th><th>Total</th></tr></thead>';

        if (data.dailyInvoiceList != null) {
          $.each(data.dailyInvoiceList, function (i, item) {
            no = parseInt(i) + 1;
            tab += '<tbody id= "myTable" ><tr class="" style:"background-color:white;" id="tabletextcol" ><td>' + no + '</td><td>' + item.invoiceNo + '</td><td>' + item.date + '</td><td>' + item.userName + '</td>'
              + '<td>' + item.status + '</td><td>' + item.subTotal + '</td></tr></tbody>';


          });
          $("#tableHeadings").append(tab);
          /*dummy */
          /*  $("#tableHeadings1").append(tab);
           $("#tableHeadings2").append(tab); */

        } else {
          $("#tableHeadings").append('<h4>No Recent Sales</h3>');
          $("#loginSubmitButton").hide();

        }


        var no;
        var tab = '<thead><tr class="headcolor" style="background-color: #91c5f5;"><th>S.No</th><th>Name</th><th>Quantity</th></tr></thead>';

        if (data.topSalesPerMonth != null) {
          $.each(data.topSalesPerMonth, function (i, item) {
            no = parseInt(i) + 1;
            tab += '<tbody id= "myTable" ><tr class=""  id="tabletextcol" ><td>' + no + '</td>'
              + '<td>' + item.productName + '</td><td>' + item.quantity + '</td></tr></tbody>';


          });
          $("#salesofmonth").append(tab);

        } else {
          $("#salesofmonth").append('<h4>No Recent Sales</h3>');
          $("#loginSubmitButton").hide();

        }


        var no;
        var tab = '<thead><tr class="headcolor" style="background-color: #91c5f5;"><th>S.No</th><th>Name</th><th>Quantity</th></tr></thead>';

        if (data.topSalesPerYear != null) {
          $.each(data.topSalesPerYear, function (i, item) {
            no = parseInt(i) + 1;
            tab += '<tbody id= "myTable" ><tr class=""  id="tabletextcol" ><td>' + no + '</td>'
              + '<td>' + item.productName + '</td><td>' + item.quantity + '</td></tr></tbody>';


          });
          $("#salesofyear").append(tab);

        } else {
          $("#salesofyear").append('<h4>No Recent Sales</h3>');
          $("#loginSubmitButton").hide();

        }

        var no;
        var tab = '<thead><tr class="headcolor" style="background-color: #91c5f5;"><th>S.No</th><th>ProductName</th><th>Quantity</th></tr></thead>';
        /*  alert(data.criticalReportDataList); */
        if (data.criticalReportDataList != null) {
          $.each(data.criticalReportDataList, function (i, item) {
            no = parseInt(i) + 1;
            tab += '<tbody id= "myTable" ><tr class=""  id="tabletextcol" ><td>' + no + '</td>'
              + '<td>' + item.productName + '</td><td>' + item.quantity + '</td></tr></tbody>';


          });
          $("#tableHeadings1").append(tab);

        } else {
          $("#tableHeadings1").append('<h4>No Product</h3>');
          $("#viewAllButton").hide();

        }


        self.state.interval_refresh = setInterval(() => self.RepeatData(), 5000);

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
  RepeatData() {

    var self = this;
    self.state.seriesPaymentStats = [0, 0, 0, 0, 0];
    self.state.seriesGenStats = [0, 0, 0, 0, 0];
    self.state.optionsPaymentStats.labels = [
      " Cash ",
      " Card ",
      " Cheque ",
      " Online ",
      " UPI "
    ];
    self.state.optionsGenStats.labels = [" Sale Qty ",
      " Netsale ",
      " Purchase ",
      " Expense ",
      " Tax "
    ];
    self.state.seriesTopSelling = [];
    switch (i) {
      case 1:

        $.each(dashboardData.dailyList, function (i, item) {
          self.state.current_type = "Daily";
          self.state.last_current_type = "Yesterday";

          if (item.dailySales != null) {
            self.state.sale = item.dailySales;
          }
          else {
            self.state.sale = 0;
          }

          if (item.dailySalesQty != null) {
            self.state.saleQty = item.dailySalesQty;
          }
          else {
            self.state.saleQty = 0;
          }

          if (item.dailyExpense != null) {
            self.state.expense = item.dailyExpense;
          }
          else {
            self.state.expense = 0;
          }

          if (item.daily_PurchaseInvoice != null) {
            self.state.purchase = item.daily_PurchaseInvoice;
          }
          else {
            self.state.purchase = 0;
          }

          //jeeva google chart data


          self.state.seriesPaymentStats = [
            Number(dashboardData.dailyList[0].dailyCashPaymentStatics),
            Number(dashboardData.dailyList[0].dailyCardPaymentStatics),
            Number(dashboardData.dailyList[0].dailyChequePaymentStatics),
            Number(dashboardData.dailyList[0].dailyOnlinePaymentStatics),
            Number(dashboardData.dailyList[0].dailyUPIPaymentStatics)
          ];

          //jeeva google chart data for overall Statistics
          self.state.sale = Number(self.state.sale).toFixed(2);
          self.state.purchase = Number(self.state.purchase).toFixed(2);
          self.state.expense = Number(self.state.expense).toFixed(2)
          self.state.seriesGenStats = [
            Number(self.state.saleQty),
            Number(self.state.sale),
            Number(self.state.purchase),
            Number(self.state.expense),
            Number(dashboardData.dailyList[0].taxAmount),
          ];

          /********************************* */
          //jeeva google graph data for Employees Graph

          /********************************************* */
          //jeeva google graph data for google_Bargraph_TopSelling_Product Graph

          var topsellinglabel = [];
          var topsellingQuantity = [];
          //amul kindly replace the value of criticalreportdatalist and
          // it should be daily services & daily service Amount
          // ["Product Name", "Sale Qty",]
          // format value should be ['lorel shampoo', 30,],

          if (dashboardData.criticalReportDataList.length > 0) {
            $.each(dashboardData.criticalReportDataList, function (i, item) {
              var title = item.productName;
              if (title.length > 15) {
                var shortText = $.trim(title).substring(0, 200)
                  .split(" ").slice(0, -1).join(" ") + "...";
              }
              else {
                var shortText = title;
              }


              topsellinglabel.push(shortText);
              topsellingQuantity.push(Number(item.quantity));
            });
          } else {
          }


          self.state.seriesTopSelling.push({
            name: "Product Name",
            data: topsellingQuantity
          });
          self.state.optionsTopSelling.labels = topsellinglabel;
          /********************************** */
          //jeeva google graph data for google_Bargraph_Critical_Product Graph

          if (item.dailySales != null) {
            self.state.last_sale = 0;

          }

          if (item.dailyExpense != null) {
            self.state.last_expense = 0;
          }

          if (item.daily_PurchaseInvoice != null) {
            self.state.last_purchase = 0;
          }

        });
        self.state.profit = Number(self.state.sale) - (Number(self.state.expense) + Number(self.state.purchase));
        if (Number(self.state.profit) < 0) {
          self.state.profit = 0;

        }
        self.state.last_profit = Number(self.state.last_sale) - (Number(self.state.last_expense) + Number(self.state.last_purchase));

        i = i + 1;
        this.setState({
          sale: this.state.sale,
          purchase: this.state.purchase,
          expense: this.state.expense,

          last_sale: this.state.last_sale,
          last_purchase: this.state.last_purchase,
          last_expense: this.state.last_expense,
          last_profit: this.state.last_profit,
          current_type: this.state.current_type,
          last_current_type: this.state.last_current_type,

          seriesPaymentStats: self.state.seriesPaymentStats,
          optionsPaymentStats: {
            ...self.state.optionsPaymentStats.labels,
            labels: self.state.optionsPaymentStats.labels,
          },
          seriesGenStats: self.state.seriesGenStats,
          optionsGenStats: {
            ...self.state.optionsGenStats.labels,
            labels: self.state.optionsGenStats.labels,
          },
          seriesTopSelling: [...self.state.seriesTopSelling],
          optionsTopSelling: {
            ...self.state.optionsTopSelling.labels,
            labels: self.state.optionsTopSelling.labels,
          },

        });

        break;

      case 2:


        $.each(dashboardData.monthlyList, function (i, item) {
          self.state.current_type = "Monthly";
          self.state.last_current_type = "Last Month";

          if (item.monthlySales != null) {
            self.state.sale = item.monthlySales;
          } else {
            self.state.sale = 0;
          }
          if (item.monthlySalesQty != null) {
            self.state.saleQty = item.monthlySalesQty;
          }
          else {
            self.state.saleQty = 0;
          }

          if (item.monthly_ExpenseInvoice != null) {
            self.state.expense = item.monthly_ExpenseInvoice;
          } else {
            self.state.expense = 0;
          }

          if (item.monthly_PurchaseInvoice != null) {
            self.state.purchase = item.monthly_PurchaseInvoice;
          }
          else {
            self.state.purchase = 0;
          }


          self.state.seriesPaymentStats = [
            Number(dashboardData.monthlyList[0].monthlyCashPaymentStatics),
            Number(dashboardData.monthlyList[0].monthlyCardPaymentStatics),
            Number(dashboardData.monthlyList[0].monthlyChequePaymentStatics),
            Number(dashboardData.monthlyList[0].monthlyOnlinePaymentStatics),
            Number(dashboardData.monthlyList[0].monthlyUPIPaymentStatics)
          ]

          //jeeva google chart data for overall Statistics

          self.state.sale = Number(self.state.sale).toFixed(2);
          self.state.purchase = Number(self.state.purchase).toFixed(2);
          self.state.expense = Number(self.state.expense).toFixed(2)
          self.state.seriesGenStats = [
            Number(self.state.saleQty),
            Number(self.state.sale),
            Number(self.state.purchase),
            Number(self.state.expense),
            Number(dashboardData.dailyList[0].taxAmount)

          ];


          /********************************* */

          /********************************************* */
          //jeeva google graph data for google_Bargraph_TopSelling_Product Graph

          var topsellinglabel = [];
          var topsellingQuantity = [];
          //amul kindly replace the value of criticalreportdatalist and
          // it should be daily services & daily service Amount
          // ["Product Name", "Sale Qty",]
          // format value should be ['lorel shampoo', 30,],

          if (dashboardData.criticalReportDataList.length > 0) {
            $.each(dashboardData.criticalReportDataList, function (i, item) {
              var title = item.productName;
              if (title.length > 15) {
                var shortText = $.trim(title).substring(0, 200)
                  .split(" ").slice(0, -1).join(" ") + "...";
              }
              else {
                var shortText = title;
              }


              topsellinglabel.push(shortText);
              topsellingQuantity.push(Number(item.quantity));
            });
          } else {
          }

          self.state.seriesTopSelling.push({
            name: "Product Name",
            data: topsellingQuantity
          });
          self.state.optionsTopSelling.labels = topsellinglabel;


          /********************************** */
          //jeeva google graph data for google_Bargraph_Critical_Product Graph

          //last value
          /** yesterday value Replace  item.dailySales with yesterday sale value*/
          if (item.dailySales != null) {
            self.state.last_sale = 0;

          }

          if (item.dailyExpense != null) {
            self.state.last_expense = 0;
          }

          if (item.daily_PurchaseInvoice != null) {
            self.state.last_purchase = 0;
          }

        });
        self.state.profit = Number(self.state.sale) - (Number(self.state.expense) + Number(self.state.purchase));
        if (Number(self.state.profit) < 0) {
          self.state.profit = 0;

        }
        self.state.last_profit = Number(self.state.last_sale) - (Number(self.state.last_expense) + Number(self.state.last_purchase));

        i = i + 1;
        this.setState({
          sale: this.state.sale,
          purchase: this.state.purchase,
          expense: this.state.expense,

          last_sale: this.state.last_sale,
          last_purchase: this.state.last_purchase,
          last_expense: this.state.last_expense,
          last_profit: this.state.last_profit,
          current_type: this.state.current_type,
          last_current_type: this.state.last_current_type,
          seriesPaymentStats: self.state.seriesPaymentStats,
          optionsPaymentStats: {
            ...self.state.optionsPaymentStats.labels,
            labels: self.state.optionsPaymentStats.labels,

          },
          seriesGenStats: self.state.seriesGenStats,
          optionsGenStats: {
            ...self.state.optionsGenStats.labels,
            labels: self.state.optionsGenStats.labels,

          },
          seriesTopSelling: [...self.state.seriesTopSelling],
          optionsTopSelling: {
            ...self.state.optionsTopSelling.labels,
            labels: self.state.optionsTopSelling.labels,
          },


        });

        break;

      case 3:


        $.each(dashboardData.yearlyList, function (i, item) {
          self.state.current_type = "Yearly";
          self.state.last_current_type = "Last Year";

          if (item.yearlySales != null) {
            self.state.sale = item.yearlySales;
          }
          else {
            self.state.sale = 0;
          }
          if (item.yearlySalesQty != null) {
            self.state.saleQty = item.yearlySalesQty;
          }
          else {
            self.state.saleQty = 0;
          }


          if (item.yearlyExpense != null) {
            self.state.expense = item.yearlyExpense;
          }
          else {
            self.state.expense = 0;
          }
          if (item.yearly_PurchaseInvoice != null) {
            self.state.purchase = item.yearly_PurchaseInvoice;
          }
          else {
            self.state.purchase = 0;
          }

          //jeeva google chart data 


          self.state.seriesPaymentStats = [
            Number(dashboardData.yearlyList[0].yearlyCashPaymentStatics),
            Number(dashboardData.yearlyList[0].yearlyCardPaymentStatics),
            Number(dashboardData.yearlyList[0].yearlyChequePaymentStatics),
            Number(dashboardData.yearlyList[0].yearlyOnlinePaymentStatics),
            Number(dashboardData.yearlyList[0].yearlyUPIPaymentStatics)
          ]

          //jeeva google chart data for overall Statistics
          self.state.sale = Number(self.state.sale).toFixed(2);
          self.state.purchase = Number(self.state.purchase).toFixed(2);
          self.state.expense = Number(self.state.expense).toFixed(2)
          self.state.seriesGenStats = [
            Number(self.state.saleQty),
            Number(self.state.sale),
            Number(self.state.purchase),
            Number(self.state.expense),
            Number(dashboardData.dailyList[0].taxAmount),
          ];

          /********************************* */
          //jeeva google graph data for Employees Graph

          /********************************************* */
          //jeeva google graph data for google_Bargraph_TopSelling_Product Graph

          var topsellinglabel = [];
          var topsellingQuantity = [];
          //amul kindly replace the value of criticalreportdatalist and
          // it should be daily services & daily service Amount
          // ["Product Name", "Sale Qty",]
          // format value should be ['lorel shampoo', 30,],

          if (dashboardData.criticalReportDataList.length > 0) {
            $.each(dashboardData.criticalReportDataList, function (i, item) {
              var title = item.productName;
              if (title.length > 15) {
                var shortText = $.trim(title).substring(0, 200)
                  .split(" ").slice(0, -1).join(" ") + "...";
              }
              else {
                var shortText = title;
              }


              topsellinglabel.push(shortText);
              topsellingQuantity.push(Number(item.quantity));
            });
          } else {
          }


          self.state.seriesTopSelling.push({
            name: "Product Name",
            data: topsellingQuantity
          });
          self.state.optionsTopSelling.labels = topsellinglabel;


          /********************************** */
          //jeeva google graph data for google_Bargraph_Critical_Product Graph



          //last value
          /** yesterday value Replace  item.dailySales with yesterday sale value*/
          if (item.dailySales != null) {
            self.state.last_sale = 0;

          }

          if (item.dailyExpense != null) {
            self.state.last_expense = 0;
          }

          if (item.daily_PurchaseInvoice != null) {
            self.state.last_purchase = 0;
          }

        });
        self.state.profit = Number(self.state.sale) - (Number(self.state.expense) + Number(self.state.purchase));
        if (Number(self.state.profit) < 0) {
          self.state.profit = 0;

        }
        self.state.last_profit = Number(self.state.last_sale) - (Number(self.state.last_expense) + Number(self.state.last_purchase));

        i = 1;
        this.setState({
          sale: this.state.sale,
          purchase: this.state.purchase,
          expense: this.state.expense,

          last_sale: this.state.last_sale,
          last_purchase: this.state.last_purchase,
          last_expense: this.state.last_expense,
          last_profit: this.state.last_profit,
          current_type: this.state.current_type,
          last_current_type: this.state.last_current_type,
          seriesPaymentStats: self.state.seriesPaymentStats,
          optionsPaymentStats: {
            ...self.state.optionsPaymentStats.labels,
            labels: self.state.optionsPaymentStats.labels,
          },
          seriesGenStats: self.state.seriesGenStats,
          optionsGenStats: {
            ...self.state.optionsGenStats.labels,
            labels: self.state.optionsGenStats.labels,

          },
          seriesTopSelling: [...self.state.seriesTopSelling],
          optionsTopSelling: {
            ...self.state.optionsTopSelling.labels,
            labels: self.state.optionsTopSelling.labels,
          },



        });




    }





  }
  viewAll() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={InvoiceList} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }
  viewAllReport() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={AvailableStockReport} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }



  addProduct() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={AddProduct} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }
  addQuotation() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={CustomerEntryForm} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }
  addSalesInvoice() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={SaleInvoice} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }
  vehicleRegistrationFunc() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={ServiceRegistration} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }
  addVendors() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={VendorEntryForm} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }
  handleCurrentSite = (e) => {
    const value = e.value;
    this.state.currentSite = value;
    this.state.empSites = value;
    if (value === "All") {
      var empSites = CryptoJS.AES.decrypt(localStorage.getItem('EmpSites'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
      this.state.empSites = empSites;
    }
    this.setState({
      selectedSite: e,
      currentSite: value,
      empSites: this.state.empSites
    });
    this.DashboardDisplayFunc();
  }
  render() {
    return (
      <div className="container-fluid" style={{ backgroundColor: "#eee" }}>
        <div class="dash_site_sel">
          <SelectSearch options={this.state.options} value={this.state.selectedSite}
            onChange={(e) => this.handleCurrentSite(e)} name="WorkingSite" placeholder="Select Working Site " />
        </div>
        <div className="title_livedata">
        <Row >
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="2" xs="5">
                    <div className="icon-big text-center icon-warning">
                    <img src={dollar} alt="logo" style={{width: 50}} />
                    </div>
                  </Col>
                  <Col md="10" xs="7">
                    <div className="numbers">
                      <p className="card-category">{this.state.current_type} Netsale</p>
                      <CardTitle tag="p"><span class="info-currency">$ </span><span>{Math.round(this.state.sale)}</span></CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  {/*  <i className="fas fa-sync-alt" /> Update Now */}
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="2" xs="5">
                    <div className="icon-big text-center icon-warning">
                    <svg id="Layer_1" enable-background="new 0 0 511.998 511.998" height="50" viewBox="0 0 511.998 511.998" width="50" xmlns="http://www.w3.org/2000/svg"><g><path d="m352.615 116.722h-317.503l-15.765 269.872c-1.228 21.013 6.051 41.017 20.493 56.328 14.443 15.312 33.989 23.744 55.037 23.744h196.685l70.884-181.662z" fill="#ffde55"/><path d="m362.446 285.004-9.831-168.282h-158.751v349.944h97.698z" fill="#ffb655"/><g><path d="m281.635 184.31h-30v-96.539c0-31.855-25.916-57.771-57.771-57.771s-57.772 25.916-57.772 57.771v96.538h-30v-96.538c-.001-48.397 39.374-87.771 87.772-87.771s87.771 39.374 87.771 87.771z" fill="#495959"/></g><path d="m193.864 0v30c31.855 0 57.771 25.916 57.771 57.771v96.538h30v-96.538c0-48.397-39.374-87.771-87.771-87.771z" fill="#323c3c"/><ellipse cx="369.451" cy="388.665" fill="#00cc76" rx="123.333" ry="123.333" transform="matrix(.707 -.707 .707 .707 -166.618 375.078)"/><path d="m369.45 265.331v246.667c68.007 0 123.334-55.327 123.334-123.333 0-68.007-55.327-123.334-123.334-123.334z" fill="#009986"/><g><path d="m353.131 443.796-48.725-55.108 22.475-19.872 27.217 30.785 56.368-58.388 21.583 20.836z" fill="#fff5f5"/></g><path d="m410.466 341.213-41.016 42.485v43.193l62.599-64.842z" fill="#e1ebf0"/></g></svg>
                    </div>
                  </Col>
                  <Col md="10" xs="7">
                    <div className="numbers">
                      <p className="card-category">{this.state.current_type} Purchase</p>
                      <CardTitle tag="p"><span class="info-currency">$ </span><span>{Math.round(this.state.purchase)}</span></CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  {/*  <i className="far fa-calendar" /> Last day */}
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="2" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <svg height="50" viewBox="0 0 512 512" width="50" xmlns="http://www.w3.org/2000/svg"><path d="m196 169.601562c-5.097656 0-10.5 0-15.902344.597657h-.898437c-98.398438 9.300781-179.199219 102.703125-179.199219 206.800781 0 120.902344 112.300781 135 196 135 83.101562 0 180-12.597656 193.5-111.898438 14.097656-116.402343-78.300781-230.5-193.5-230.5zm0 0" fill="#ff637b"/><path d="m389.5 400.101562c-13.5 99.300782-110.398438 111.898438-193.5 111.898438v-342.398438c115.199219 0 207.597656 114.097657 193.5 230.5zm0 0" fill="#e63950"/><path d="m300.097656 49.800781-30 91h-148.195312l-30-91c-1.804688-4.5-.902344-9.601562 1.796875-13.5 3-3.898437 7.5-6.300781 12.300781-6.300781h47.699219c6-17.402344 22.800781-30 42.300781-30s36 12.597656 42.300781 30h47.699219c4.800781 0 9.300781 2.402344 12.300781 6.300781 2.699219 3.898438 3.601563 9 1.796875 13.5zm0 0" fill="#ff637b"/><path d="m300.097656 49.800781-30 91h-74.097656v-140.800781c19.5 0 36 12.597656 42.300781 30h47.699219c4.800781 0 9.300781 2.402344 12.300781 6.300781 2.699219 3.898438 3.601563 9 1.796875 13.5zm0 0" fill="#e63950"/><path d="m240.699219 381.5c0 19.5-12.296875 35.699219-29.699219 42v13.5c0 8.402344-6.597656 15-15 15s-15-6.597656-15-15v-13.199219c-17.402344-6.300781-30.300781-22.800781-30.300781-42.300781 0-8.398438 6.898437-15 15-15 8.402343 0 15 6.601562 15 15 0 8.101562 6.898437 15 15 15h.300781c8.402344-.300781 14.699219-6.898438 14.699219-15 0-8.398438-6.296875-14.699219-14.699219-15h-.300781c-24.597657 0-45-20.402344-45-45 0-19.800781 12.902343-36.300781 30.300781-42.300781v-22.199219c0-8.402344 6.597656-15 15-15s15 6.597656 15 15v22.199219c17.402344 6.300781 29.699219 22.800781 29.699219 42.300781 0 8.101562-6.597657 15-15 15-8.101563 0-15-6.898438-15-15 0-8.398438-6.296875-14.699219-14.699219-15h-.300781c-8.101563 0-15 6.601562-15 15 0 8.101562 6.898437 15 15 15h.300781c24.902344.300781 44.699219 20.101562 44.699219 45zm0 0" fill="#ffda2d"/><path d="m512 302c0 16.5-13.5 30-30 30l-76 30-75-30c-16.5 0-30-13.5-30-30s13.5-30 30-30h151c16.5 0 30 13.5 30 30zm0 0" fill="#ffda2d"/><path d="m512 302c0 16.5-13.5 30-30 30l-76 30v-90h76c16.5 0 30 13.5 30 30zm0 0" fill="#fdbf00"/><path d="m512 362c0 16.5-13.5 30-30 30l-76 30-75-30c-16.5 0-30-13.5-30-30s13.5-30 30-30h151c16.5 0 30 13.5 30 30zm0 0" fill="#fdbf00"/><path d="m512 362c0 16.5-13.5 30-30 30l-76 30v-90h76c16.5 0 30 13.5 30 30zm0 0" fill="#ff9100"/><path d="m512 422c0 16.5-13.5 30-30 30l-76 30-75-30c-16.5 0-30-13.5-30-30s13.5-30 30-30h151c16.5 0 30 13.5 30 30zm0 0" fill="#ffda2d"/><path d="m512 422c0 16.5-13.5 30-30 30l-76 30v-90h76c16.5 0 30 13.5 30 30zm0 0" fill="#fdbf00"/><path d="m512 482c0 16.5-13.5 30-30 30h-151c-16.5 0-30-13.5-30-30s13.5-30 30-30h151c16.5 0 30 13.5 30 30zm0 0" fill="#fdbf00"/><path d="m512 482c0 16.5-13.5 30-30 30h-76v-60h76c16.5 0 30 13.5 30 30zm0 0" fill="#ff9100"/><path d="m301 151c0 16.5-13.5 30-30 30h-150c-16.5 0-30-13.5-30-30s13.5-30 30-30h150c16.5 0 30 13.5 30 30zm0 0" fill="#ffda2d"/><g fill="#fdbf00"><path d="m240.699219 381.5c0 19.5-12.296875 35.699219-29.699219 42v13.5c0 8.402344-6.597656 15-15 15v-55.5c8.402344-.300781 14.699219-6.898438 14.699219-15 0-8.398438-6.296875-14.699219-14.699219-15v-30c24.902344.300781 44.699219 20.101562 44.699219 45zm0 0"/><path d="m240.699219 321.5c0 8.101562-6.597657 15-15 15-8.101563 0-15-6.898438-15-15 0-8.398438-6.296875-14.699219-14.699219-15v-64.5c8.402344 0 15 6.597656 15 15v22.199219c17.402344 6.300781 29.699219 22.800781 29.699219 42.300781zm0 0"/><path d="m301 151c0 16.5-13.5 30-30 30h-75v-60h75c16.5 0 30 13.5 30 30zm0 0"/></g></svg>
                    </div>
                  </Col>
                  <Col md="10" xs="7">
                    <div className="numbers">
                      <p className="card-category">{this.state.current_type} Expense</p>
                      <CardTitle tag="p"><span class="info-currency">$ </span><span>{Math.round(this.state.expense)}</span></CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  {/*   <i className="far fa-clock" /> In the last hour */}
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="2" xs="5">
                    <div className="icon-big text-center icon-warning">
                    <svg id="Flat" enable-background="new 0 0 512 512" height="50" viewBox="0 0 512 512" width="50" xmlns="http://www.w3.org/2000/svg"><path d="m496 56v48c0 4.4-3.6 8-8 8s-8-3.6-8-8v-28.7l-114.3 114.4c-1.5 1.5-3.5 2.3-5.7 2.3h-68.7l-117.6 117.7c-1.5 1.5-3.5 2.3-5.7 2.3h-60.7l-77.6 77.7c-3.1 3.1-8.2 3.1-11.3 0s-3.1-8.2 0-11.3l80-80c1.5-1.5 3.5-2.3 5.7-2.3h60.7l117.6-117.7c1.5-1.5 3.5-2.3 5.7-2.3h68.7l112-112h-28.8c-4.4 0-8-3.6-8-8s3.6-8 8-8h48c4.3-.2 8.1 3.6 8 7.9z" fill="#3dc285"/><g fill="#2d85cc"><path d="m440 152h48v304h-48z"/><path d="m360 216h48v240h-48z"/><path d="m280 272h48v184h-48z"/><path d="m200 336h48v120h-48z"/><path d="m120 368h48v88h-48z"/><path d="m40 408h48v48h-48z"/></g><circle cx="216" cy="168" fill="#ffd33a" r="80"/><path d="m216 80c-48.6 0-88 39.4-88 88s39.4 88 88 88 88-39.4 88-88c-.1-48.6-39.4-87.9-88-88zm0 160c-39.8 0-72-32.2-72-72s32.2-72 72-72 72 32.2 72 72c0 39.7-32.3 72-72 72z" fill="#ffb632"/><path d="m240 184c0 10.2-6.4 19.2-16 22.6v9.4c0 4.4-3.6 8-8 8s-8-3.6-8-8v-8h-8c-4.4 0-8-3.6-8-8s3.6-8 8-8h16c4.4 0 8-3.6 8-8s-3.6-8-8-8c-13.3 0-24-10.8-24-24 0-10.2 6.4-19.2 16-22.6v-9.4c0-4.4 3.6-8 8-8s8 3.6 8 8v8h8c4.4 0 8 3.6 8 8s-3.6 8-8 8h-16c-4.4 0-8 3.6-8 8s3.6 8 8 8c13.2 0 24 10.8 24 24z" fill="#ffb632"/></svg>
                    </div>
                  </Col>
                  <Col md="10" xs="7">
                    <div className="numbers">
                      <p className="card-category">{this.state.current_type} Profits</p>
                      <CardTitle tag="p"><span class="info-currency">$ </span><span>{Math.round(this.state.profit)}</span></CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <div className="stats">
               {/*    <i className="fas fa-sync-alt" /> Update now */}
                  </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        </div>
        <div id="sidebar_quick_menu" className="sidebar_quick_menu_c afterPay">
          <div class="social add_emp">
            <a onClick={() => this.addSalesInvoice()} target="_blank">
              <p><i class="fa fa-plus"></i><span className="s_icon_title" > Sales Invoices({this.state.total_No_of_SaleInvoice})</span></p>
            </a>
          </div>
          <div class="social loc_emp">
            <a onClick={() => this.addProduct()} target="_blank">
              <p><i class="fa fa-cubes"></i><span className="s_icon_title" >Products({this.state.total_No_of_ProductList})</span> </p>
            </a>
          </div>
          <div class="social msg_center">
            <a onClick={() => this.addVendors()} target="_blank">
              <p><i class="fa fa-address-book-o"></i><span className="s_icon_title" >Vendors({this.state.total_No_of_Vendors})</span> </p>
            </a>
          </div>
        {/*  <div class="social app_conf">
            <a onClick={() => this.vehicleRegistrationFunc()} target="_blank">
              <p><i class="fa fa-car"></i><span className="s_icon_title" >Intake({this.state.total_No_of_Customers})</span></p>
            </a>
          </div> */}
        </div>
        <section>
          <div class="row sec1_dash"  >
            <div class="col-lg-6 col-sm-12 col-xs-12 sec_o_row ">
              <h3 className="Dashboard_sub_head" >{this.state.current_type} Payment Statistics</h3>
              <ReactApexChart
                style={{ boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)" }}
                options={this.state.optionsPaymentStats}
                series={this.state.seriesPaymentStats}
                type="polarArea" height={250} />

            </div>
            <div class="col-lg-6 col-sm-12 col-xs-12 sec_o_row " >
              <h3 className="Dashboard_sub_head" >{this.state.current_type} Statistics</h3>
              <ReactApexChart
                style={{ boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)" }}
                options={this.state.optionsGenStats}
                series={this.state.seriesGenStats}
                type="donut" height={250} />

            </div>
          </div>
        </section>
        <div class="row" style={{ backgroundColor: "white", marginBottom: "50px", paddingBottom: "20px" }}>
          <div class="col-12">
            <div class="col-lg-6 info-box_chart" /*style={{ border: "5px solid rgb(238, 238, 238)" }} */>

              <div class="d-flex flex-wrap">
                <h3 className="Dashboard_sub_head" >Yearly earning {this.state.current_Year}</h3>

                <div>
                  <ReactApexChart
                    style={{ boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)"}}
                    options={this.state.optionsyearly}
                    series={this.state.seriesyearly} type="line" height={350} />
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <h3 className="Dashboard_sub_head" >Top Selling/Service</h3>

              <ReactApexChart
                style={{ boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)", overflow: "hidden"}}
                options={this.state.optionsTopSelling}
                series={this.state.seriesTopSelling}
                type="bar" height={350}
              />

            </div>




          </div>

        </div>
      </div>
    );
  }
}
export default DashboardOverall;