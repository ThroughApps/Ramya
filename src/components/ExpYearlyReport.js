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
import CryptoJS from 'crypto-js';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import { SiteDropDown, FilterOptions } from './SiteDropDown';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';

var dataList = [];
var currentRow;
class ExpYearlyReport extends Component {

    constructor() {
        super()
        var today = new Date();
        var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var year = today.getFullYear();
        var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        this.state = {
            year: year,
            companyId: companyId,
            companyName: companyName,
            totalSubTotal: '0',
            site: GetCurrentSite(),
        };

    }

    BackbtnFunc() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={ReportMenuPage} />


                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }







    componentDidMount() {
        SetCurrentPage("ExpYearlyReport");
        $("#nodata").hide();
        $("#myInput").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#myTable tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
        var self = this;

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                year: this.state.year,
                companyId: this.state.companyId,
                empSites:GetEmployeeSite()
            }),
            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/ExpenseReport/YearlyExpenseReport",
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



        $("#tableHeadings").on('click', '#delete', function () {
            // get the current row

            currentRow = $(this).closest("tr");

            self.state.id = currentRow.find("td:eq(5)").text(); // get current row 1st TD value
            self.state.date = currentRow.find("td:eq(4)").text();


            self.setState({

                id: self.state.id,
                date: self.state.date,

            })

            self.DeleteFunc(currentRow);

        });

        $("#tableHeadings").on('click', '#view', function () {
            // get the current row

            currentRow = $(this).closest("tr");
            self.state.categoryName = currentRow.find("td:eq(1)").text();
            self.state.userName = currentRow.find("td:eq(2)").text(); // get current row 1st TD value
            self.state.amount = currentRow.find("td:eq(3)").text();
            self.state.date = currentRow.find("td:eq(4)").text();


            self.setState({
                categoryName: self.state.categoryName,
                userName: self.state.userName,
                amount: self.state.amount,
                date: self.state.date,

            })
            ReactDOM.render(<ExpenseReportView categoryName={self.state.categoryName}
                userName={self.state.userName} amount={self.state.amount} date={self.state.date}
                oldCategoryName={self.state.oldCategoryName} oldUserName={self.state.oldUserName} oldAmount={self.state.oldAmount} oldDate={self.state.oldDate} id={self.state.id} />, document.getElementById("contentRender"));



        });

        $("#tableHeadings").on('click', '#edit', function () {
            // get the current row

            currentRow = $(this).closest("tr");

            self.state.id = currentRow.find("td:eq(5)").text();
            self.state.categoryName = currentRow.find("td:eq(1)").text();
            self.state.userName = currentRow.find("td:eq(2)").text(); // get current row 1st TD value
            self.state.amount = currentRow.find("td:eq(3)").text();
            self.state.date = currentRow.find("td:eq(4)").text();

            self.state.oldCategoryName = self.state.categoryName;
            self.state.oldUserName = self.state.userName;
            self.state.oldAmount = self.state.amount;
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
            ReactDOM.render(<ExpenseReportEdit categoryName={self.state.categoryName}
                userName={self.state.userName} amount={self.state.amount} date={self.state.date}
                oldCategoryName={self.state.oldCategoryName} oldUserName={self.state.oldUserName} oldAmount={self.state.oldAmount} oldDate={self.state.oldDate} id={self.state.id} />, document.getElementById("contentRender"));



        });

    }

    DeleteFunc(currentRow) {
        var self = this;

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                id: self.state.id,
                date: self.state.date,
                companyId: this.state.companyId,
            }),
            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/ExpenseReport/DailyExpenseReportDelete",
            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {

                currentRow.remove();

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


    UpdateSubmit() {

        var self = this;

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                categoryName: self.state.categoryName,
                userName: self.state.userName,
                amount: self.state.amount,
                date: self.state.date,
                oldCategoryName: self.state.oldCategoryName,
                oldUserName: self.state.oldUserName,
                oldAmount: self.state.oldAmount,
                oldDate: self.state.oldDate,
                id: self.state.id,

            }),
            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/ExpenseReport/DailyExpenseReportUpdate",
            contentType: "application/json",
            dataType: 'json',
            async: false,

            success: function (data, textStatus, jqXHR) {

                var tab;
                tab += '<tbody id= "myTable" ><tr class="success"  id="tabletextcol" ><td>' + self.state.id + '</td><td>' + self.state.categoryName + '</td><td>' + self.state.userName + '</td><td>' + self.state.amount + '</td><td>' + self.state.date + '</td>'
                    + '<td><button id="delete">Delete</button></td>'
                    + '<td><button id="view" class="Update" data-toggle="modal" data-target="#myModalview" >View</button></td>'
                    + '<td><button id="edit" class="Update" data-toggle="modal" data-target="#myModaledit">Edit</button></td></tr></tbody>';




                $("#tableHeadings").append(tab);
                currentRow.remove();


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



    handleUserInput = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        },
        );

    }
    printdiv(printarea) {
        var originalContents = document.body.innerHTML;
        $("#test-table-xls-button").hide();
        $("#backbutton").hide();
        $("#print").hide();
        $("#myInput").hide();
        $("#sidebar").hide();
        $("#navbar_company_name").hide();


        window.print(originalContents);
        $("#sidebar").show();
        $("#navbar_company_name").show();
        $("#backbutton").show();
        $("#print").show();
        $("#test-table-xls-button").show();
        $("#myInput").show();
        // $(w.document.body).html(html);

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
        self.state.dataList = [];

        var no;
        if (result.length != 0) {
            var tab = '<thead><tr class="headcolor"><th>S.No</th><th>CategoryName</th><th>UserName</th><th>Amount</th><th>Date</th><th colspan="3" style="text-align: center; ">Actions</th></tr></thead>';
            $.each(result, function (i, item) {
                no = parseInt(i) + 1;
                tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + no + '</td><td>' + item.categoryName + '</td><td>' + item.userName + '</td><td>' + item.amount + '</td><td>' + item.date + '</td><td class="expenseId">' + item.id + '</td>'
                    + '<td><button id="delete">Delete</button></td>'
                    + '<td><button id="view" class="Update" data-toggle="modal" data-target="#myModalview" >View</button></td>'
                    + '<td><button id="edit" class="Update" data-toggle="modal" data-target="#myModaledit">Edit</button></td></tr></tbody>';
                self.state.totalSubTotal = Number(self.state.totalSubTotal) + Number(item.amount);

                self.setState({
                    totalSubTotal: self.state.totalSubTotal,
                })
            });
            $("#tableHeadings").append(tab);
            $(".expenseId").hide();
        } else {
            $("#nodata").show();
            $("#totalSale").hide();
            $("#test-table-xls-button").hide();
            $("#myInput").hide();
        }
        self.setState({
            data: self.state.data,
            columns: self.state.columns
        });
        console.log("after drop down ", self.state.dataList);
    }


    render() {
        return (


            <div class="container" style={{ height: "20px" }}>
                <div class="row" style={{ marginTop: "13px" }}>
                    <div class="col-sm-6 ">
                        <ul class="previous disabled" id="backbutton"
                            style={{
                                backgroundColor: "#05a4b5", color: "white",
                                float: "none",
                                display: "inline-block",
                                marginLeft: "5px",
                                borderRadius: "5px",
                                padding: "3px 7px 3px 7px"
                            }}>
                            <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i>Back</a></ul>

                    </div> <div class="col-sm-6 ">
                        <div class="row">
                            <div class="col-sm-3 pull-right">   <button type="button" id="print" class="btn btn-default " onClick={() => this.printdiv('printarea')} ><i class="fa fa-print" aria-hidden="true" style={{ fontSize: "17px", border: "none" }}> Print1</i></button>
                            </div>
                            <div class="col-sm-3 pull-right">
                            </div>   </div>
                    </div>    </div>
                <div id="printarea">

                    <div style={{ display: "grid" }}>
                        <h2 style={{ fontWeight: "300", fontSize: "30px", textAlign: "center" }}> {this.state.companyName}</h2>
                        <h4 style={{ fontWeight: "300", fontSize: "30px", textAlign: "center" }}>EXPENSE YEARLY REPORT</h4>
                        <hr></hr>
                    </div>


                     <div class="form-group" >
                        <div class="card-body">
                            <div class="form-horizontal form-bordered">
                                <div class="text-right">
                                    <SiteDropDown onSiteDropDown={this.handleSite} data={this.state.site} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "grid" }}>

                        <div>
                            <ReactHTMLTableToExcel

                                id="test-table-xls-button"
                                className="download-table-xls-button"
                                table="tableHeadings"
                                filename="Expense_List"
                                sheet="tablexls"
                                buttonText="Download Expense List" />
                        </div>
                        <input style={{
                            color: "black", width: "100%",
                            padding: "12px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }} type="text" id="myInput" placeholder="Search.." title="Type in a name" />
                        <div id="tableOverflow">
                            <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">

                            </table>
                        </div>
                        <br />  <div class="row" id="totalSale">
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

                    <h2 id="nodata" style={{ textAlign: "center" }}>No Data</h2>
                </div>
            </div>

        );
    }
}

export default ExpYearlyReport;








