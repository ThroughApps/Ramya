import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { FormErrors } from './FormErrors';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import SalaryReport from './SalaryReport';
//import { GetEmployeeSite, GetCurrentSite } from './ConstSiteFunction';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
        GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
var workingHrsForSalary;
var inputarray = [];
var TotalGenaralWorkingHrs;
var OTWorkingHrs;
class Salary extends Component {
        constructor() {
                super()
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

                this.state = {
                        date: date,

                        staffName: '',
                        salary: '',
                        pay: '',
                        deduction: '',
                        salaryMonth: '',
                        month: '',
                        remark: '',
                        totalWorkingHrs: 0,
                        workingHrs: 0,
                        companyWorkingHrs: 8,
                        companySalary: 0,
                        companyOtHrsSalary: 0,
                        otWorkingHrs: 0,
                        staffId: '',
                        days: '',
                        // companyOtHrsSalary:'',
                        // companyWorkingHrsSalary:'',
                        empTotalWorkingHrsSalary: '',


                        formErrors: {
                                pay: '',
                                deduction: '',
                                staffName: ''

                        },

                        payValid: false,
                        deductionValid: false,
                        staffNameValid: false,
                }
                this.setState({
                        date: date,


                })
        }
        validateField(fieldName, value) {
                let fieldValidationErrors = this.state.formErrors;
                let payValid = this.state.payValid;
                let deductionValid = this.state.deductionValid;
                let staffNameValid = this.state.staffNameValid;


                switch (fieldName) {
                        case 'pay':
                                payValid = value.length >= 2;
                                fieldValidationErrors.pay = payValid ? '' : ' is InCorrect';
                                break;
                        case 'staffName':
                                staffNameValid = value.length >= 2;
                                fieldValidationErrors.staffName = staffNameValid ? '' : ' is not selected';
                                break;

                        case 'deduction':
                                deductionValid = value.length >= 2;
                                fieldValidationErrors.deduction = deductionValid ? '' : ' is InCorrect';
                                break;

                        default:
                                break;
                }
                this.setState({
                        formErrors: fieldValidationErrors,
                        payValid: payValid,
                        deductionValid: deductionValid,
                        staffNameValid: staffNameValid,
                }, this.validateForm);
        }
        validateForm() {

                this.setState({
                        formValid:

                                this.state.payValid
                                && this.state.deductionValid
                                && this.state.staffNameValid


                });
        }

        errorClass(error) {
                return (error.length === 0 ? '' : 'has-error');
        }


        componentDidMount() {
                SetCurrentPage("Salary");


                $(".btn-default").css("background-color", "#05a4b5");
                $(".btn-default").css("color", "white");
                /* 
                
                 $("#empsalary").hide();
                 $("#submitButtons").hide(); */
                var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
                this.state.companyId = companyId;
                this.setState({
                        companyId: companyId,
                });
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

                var monthNo = today.getMonth();
                console.log("MONTH" + monthNo);
                //this.state.month = month;
                var displaydate = today.getDate();
                var dt = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();

                // var displaydate="08";
                //if(displaydate>"10"){
                const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                ];

                const d = new Date(dt);
                var month = monthNames[d.getMonth()];
                console.log("month", d, "m", d.getMonth(), "mn", month, " dt ", dt, "name ", monthNames[0])

                this.state.month = month;
                var mnth = today.getMonth();
                console.log('mmnth', mnth)

                var year = today.getFullYear();

                if (mnth == 0) {

                        mnth = 12;
                        year = today.getFullYear() - 1;
                        var month0 = monthNames[11];
                        this.state.month = month0;
                        console.log("this.month ", this.state.month, 'myh 0', month0);
                }
                var date = '10';
                var date1 = '09';

                var fromDate = year + '-' + mnth + '-' + date;
                var toDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + date1;
                var toDate1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + date;

                var date1 = new Date(fromDate);
                var date2 = new Date(toDate1);
                var timeDiff = Math.abs(date1.getTime() - date2.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                this.state.days = diffDays;
                this.state.fromDate = fromDate;
                this.state.toDate = toDate;

                this.setState({
                        days: this.state.days,
                        month: this.state.month,
                        fromDate: this.state.fromDate,
                        toDate: this.state.toDate
                })
                console.log("MONTH CALCULATION DAYS" + this.state.days);


                var self = this;
                var staffName;
                var feed;
                window.scrollTo(0, 0);

                var EmpList = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('EmpList'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

                staffName += '<option  value="" disabled selected hidden>Select EmployeeName</option>';
                $.each(EmpList, function (i, item) {

                        staffName += '<option value="' + item.staffId + '">' + item.staffName + '</option>'

                });
                $("#staffName").append(staffName);

        }

        cancelFunc() {

                ReactDOM.render(<Salary />, document.getElementById("contentRender"));
        }

        handleUserInput = (e) => {
                const name = e.target.name;
                const value = e.target.value;
                this.setState({ [name]: value },
                        () => { this.validateField(name, value) });
        }


        handleStaffDetails = (e) => {

                const name = e.target.name;
                const value = e.target.value;
                this.state.staffName = value;
                this.setState({
                        [name]: value,
                        staffNameValid: true
                });
                var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
                this.state.companyId = companyId;
                this.setState({
                        companyId: companyId,
                });
                var self = this;

                var today = new Date();
                var month = today.getMonth();
                //if(month==0)
                // this.state.month=month;

                $.ajax({
                        type: 'POST',

                        data: JSON.stringify({
                                staffId: value,
                                fromDate: this.state.fromDate,
                                toDate: this.state.toDate,
                                month: month,
                                companyId: this.state.companyId,
                                empSites: GetEmployeeSite()
                        }),

                        url: "http://15.206.129.105:8080/ThroughBooksCOAPI/Payroll/StaffDetails",
                        contentType: "application/json",
                        dataType: 'json',
                        async: false,
                        success: function (data, textStatus, jqXHR) {


                                if (data[0].presentDays != "Salary_Granted") {

                                        console.log("Emp Details DATA " + data[0].presentDays);
                                        console.log("Emp Details DATA " + data[1].absentDays);
                                        console.log("Emp Details DATA " + data[2].leaveDays);
                                        console.log("Emp Details DATA " + data[3].holidayDays);
                                        console.log("Salary " + data[4].salary);


                                        self.state.presentDays = data[0].presentDays;
                                        self.state.absentDays = data[1].absentDays;
                                        self.state.leaveDays = data[2].leaveDays;
                                        self.state.holidayDays = data[3].holidayDays;
                                        self.state.companySalary = data[4].salary;
                                        self.setState({
                                                presentDays: self.state.presentDays,
                                                absentDays: self.state.absentDays,
                                                leaveDays: self.state.leaveDays,
                                                holidayDays: self.state.holidayDays,
                                                companyWorkingHrsSalary: self.state.companyWorkingHrsSalary,
                                        })
                                        //initial calculation
                                        var noOfDaysAttended = Number(self.state.presentDays) + Number(self.state.holidayDays);

                                        var per_hr_salary = (Number(self.state.companySalary)) / (Number(self.state.days) * Number(self.state.companyWorkingHrs));
                                        console.log("com sal", self.state.companySalary, " days ", self.state.days, " comwhr ", self.state.companyWorkingHrs);
                                        console.log("oer hr salary", per_hr_salary);

                                        var noOfDaysAttended = Number(self.state.presentDays) + Number(self.state.holidayDays);

                                        var noOfDaysAttendedInHrs = Number(noOfDaysAttended) * Number(self.state.companyWorkingHrs);

                                        var otWorkingHrs = Number(self.state.totalWorkingHrs) - Number(noOfDaysAttendedInHrs);

                                        if (otWorkingHrs < 0) {
                                                otWorkingHrs = 0;
                                        }


                                        var otWorkingHrsSalary = Number(self.state.companyOtHrsSalary) * Number(otWorkingHrs);

                                        var generalWorkingHrsSalary = Number(noOfDaysAttendedInHrs) * Number(per_hr_salary);
                                        var empTotalWorkingHrsSalary = Number(generalWorkingHrsSalary) + Number(otWorkingHrsSalary);
                                        empTotalWorkingHrsSalary = Math.round(empTotalWorkingHrsSalary * 100) / 100
                                        self.setState({
                                                otWorkingHrs: otWorkingHrs,
                                                workingHrs: noOfDaysAttendedInHrs,
                                                totalWorkingHrs: noOfDaysAttendedInHrs,
                                                companySalaryInHrs: Math.round(per_hr_salary * 100) / 100,
                                                //  companyOtHrsSalary:otWorkingHrsSalary,
                                                //  companyWorkingHrsSalary:generalWorkingHrsSalary,
                                                empTotalWorkingHrsSalary: empTotalWorkingHrsSalary,


                                        })
                                } else {

                                        $('[name=staffId]').val("");
                                        self.state.staffId = '';
                                        self.state.presentDays = 0;
                                        self.state.absentDays = 0;
                                        self.state.leaveDays = 0;
                                        self.state.holidayDays = 0;
                                        self.state.companySalary = 0;
                                        self.state.companySalaryInHrs = 0;
                                        self.state.empTotalWorkingHrsSalary = 0;
                                        self.state.otWorkingHrs = 0;
                                        self.state.otWorkingHrsSalary = 0;
                                        self.state.workingHrs = 0;
                                        self.state.companyWorkingHrs = 8;
                                        self.state.totalWorkingHrs = 0;

                                        self.setState({
                                                staffId: '',
                                                presentDays: 0,
                                                absentDays: 0,
                                                leaveDays: 0,
                                                holidayDays: 0,
                                                companySalary: 0,
                                                companySalaryInHrs: 0,
                                                empTotalWorkingHrsSalary: 0,
                                                otWorkingHrs: 0,
                                                otWorkingHrsSalary: 0,
                                                workingHrs: 0,
                                                companyWorkingHrs: 8,
                                                totalWorkingHrs: 0
                                        })
                                        confirmAlert({
                                                title: 'Salary Credition Failed', // Title dialog
                                                message: 'Salary Is Already Been Credited For The Employee', // Message dialog
                                                confirmLabel: 'Ok', // Text button confirm
                                        });



                                }

                        },
                        error: function (data) {
                                confirmAlert({
                                        title: 'No Internet', // Title dialog
                                        message: 'Network Connection Problem', // Message dialog
                                        confirmLabel: 'Ok', // Text button confirm
                                });

                        }
                });


        }

        handleUserInputTotalWorkHrCal = (e) => {

                const name = e.target.name;
                const value = e.target.value;
                // this.state.staffName = value;
                this.setState({
                        [name]: value,
                        staffNameValid: true
                });
                this.state.workingHrs = '';
                this.state.otWorkingHrs = '';


                var GeneralWorkingHrs = this.state.presentDays * this.state.companyWorkingHrs;
                var HolidayWorkingHrs = this.state.holidayDays * this.state.companyWorkingHrs;
                var absentWorkingHrs = this.state.absentDays * this.state.companyWorkingHrs;

                TotalGenaralWorkingHrs = GeneralWorkingHrs + HolidayWorkingHrs;
                this.state.workingHrs = TotalGenaralWorkingHrs;
                workingHrsForSalary = GeneralWorkingHrs + HolidayWorkingHrs + absentWorkingHrs;
                console.log("TotalWorkingHrs : " + value);
                // OTWorkingHrs=this.state.totalWorkingHrs - TotalGenaralWorkingHrs;
                OTWorkingHrs = value - TotalGenaralWorkingHrs;
                this.state.otWorkingHrs = OTWorkingHrs;

                console.log("GeneralWorkingHrs : " + GeneralWorkingHrs);
                console.log("HolidayWorkingHrs : " + HolidayWorkingHrs);
                console.log("TotalGenaralWorkingHrs : " + TotalGenaralWorkingHrs);
                console.log("OTWorkingHrs : " + OTWorkingHrs);


                this.setState({
                        workingHrs: this.state.workingHrs,
                        otWorkingHrs: this.state.otWorkingHrs,
                })

        }
        //Handle salary Calculation By sandy
        HandleCalculation = (e) => {

                const name = e.target.name;
                const value = e.target.value;
                this.state[name] = value;

                this.setState({
                        name: value,
                });

                var noOfDaysAttended = Number(this.state.presentDays) + Number(this.state.holidayDays);

                var per_hr_salary = (Number(this.state.companySalary)) / (Number(this.state.days) * Number(this.state.companyWorkingHrs));
                console.log("com sal", this.state.companySalary, " days ", this.state.days, " comwhr ", this.state.companyWorkingHrs);
                console.log("oer hr salary", per_hr_salary);

                var noOfDaysAttended = Number(this.state.presentDays) + Number(this.state.holidayDays);

                var noOfDaysAttendedInHrs = Number(noOfDaysAttended) * Number(this.state.companyWorkingHrs);

                //less than requires time
                if (this.state.totalWorkingHrs < noOfDaysAttendedInHrs) {
                        noOfDaysAttendedInHrs = this.state.totalWorkingHrs;
                }
                var otWorkingHrs = Number(this.state.totalWorkingHrs) - Number(noOfDaysAttendedInHrs);

                if (otWorkingHrs < 0) {
                        otWorkingHrs = 0;
                }


                var otWorkingHrsSalary = Number(this.state.companyOtHrsSalary) * Number(otWorkingHrs);

                var generalWorkingHrsSalary = Number(noOfDaysAttendedInHrs) * Number(per_hr_salary);
                var empTotalWorkingHrsSalary = Number(generalWorkingHrsSalary) + Number(otWorkingHrsSalary);
                empTotalWorkingHrsSalary = Math.round(empTotalWorkingHrsSalary * 100) / 100
                this.setState({
                        otWorkingHrs: otWorkingHrs,
                        workingHrs: noOfDaysAttendedInHrs,
                        companySalaryInHrs: Math.round(per_hr_salary * 100) / 100,
                        //  companyOtHrsSalary:otWorkingHrsSalary,
                        //  companyWorkingHrsSalary:generalWorkingHrsSalary,
                        empTotalWorkingHrsSalary: empTotalWorkingHrsSalary,


                })


        }


        CalSalaryFunc() {



                if ((this.state.staffId != '') && (this.state.totalWorkingHrs != '') && (this.state.companyWorkingHrsSalary != '') && (this.state.companyOtHrsSalary != '')) {


                        if (this.state.totalWorkingHrs >= this.state.workingHrs) {
                                //This Salary (this.state.companyWorkingHrsSalary ) Implements 
                                //The Salary Per Month
                                var basicSalary = this.state.companyWorkingHrsSalary / workingHrsForSalary;
                                var empTotalWorkingHrsSalary = (this.state.workingHrs * basicSalary) + (this.state.otWorkingHrs * this.state.companyOtHrsSalary);
                                this.state.empTotalWorkingHrsSalary = empTotalWorkingHrsSalary;

                                console.log("General WorkingHrs Salary : " + this.state.workingHrs * this.state.companyWorkingHrs);

                                console.log("OT WorkingHrs Salary : " + this.state.otWorkingHrs * this.state.companyOtHrsSalary);

                                console.log("empTotalWorkingHrs : " + empTotalWorkingHrsSalary);

                                this.setState({
                                        empTotalWorkingHrsSalary: this.state.empTotalWorkingHrsSalary
                                })

                                $("#empsalary").show();
                                $("#submitButtons").show();
                        } else {

                                confirmAlert({
                                        title: 'Salary Calculation Failed', // Title dialog
                                        message: 'Salary Calculation Failed Due To Incorrect Total Working Hrs Of The Employee. Kindly Fill In All The Fields and Try Again', // Message dialog
                                        confirmLabel: 'Ok', // Text button confirm
                                });
                        }
                } else {

                        confirmAlert({
                                title: 'Salary Calculation Failed', // Title dialog
                                message: 'Salary Calculation Failed Due To Some Missing Fields. Kindly Fill In All The Fields and Try Again', // Message dialog
                                confirmLabel: 'Ok', // Text button confirm
                        });



                }

        }

        handleUserInputDaysChange = (e) => {

                const name = e.target.name;
                const value = e.target.value;
                // this.state.staffName = value;
                this.setState({
                        [name]: value,
                        staffNameValid: true
                });
                if (this.state.totalWorkingHrs != '') {
                        var GeneralWorkingHrs = this.state.presentDays * this.state.companyWorkingHrs;
                        var HolidayWorkingHrs = this.state.holidayDays * this.state.companyWorkingHrs;

                        TotalGenaralWorkingHrs = GeneralWorkingHrs + HolidayWorkingHrs;
                        this.state.workingHrs = TotalGenaralWorkingHrs;

                        console.log("TotalWorkingHrs : " + value);
                        // OTWorkingHrs=this.state.totalWorkingHrs - TotalGenaralWorkingHrs;
                        OTWorkingHrs = this.state.totalWorkingHrs - TotalGenaralWorkingHrs;
                        this.state.otWorkingHrs = OTWorkingHrs;

                        console.log("GeneralWorkingHrs : " + GeneralWorkingHrs);
                        console.log("HolidayWorkingHrs : " + HolidayWorkingHrs);
                        console.log("TotalGenaralWorkingHrs : " + TotalGenaralWorkingHrs);
                        console.log("OTWorkingHrs : " + OTWorkingHrs);


                        this.setState({
                                workingHrs: this.state.workingHrs,
                                otWorkingHrs: this.state.otWorkingHrs,
                        })
                }

        }


        AddSalaryFunc() {
                var self = this;
                var today = new Date("2018-12-02");
                var month = today.getMonth() + 1;

                this.state.month = month;

                var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
                this.state.companyId = companyId;
                this.setState({
                        companyId: companyId,
                });



                $.ajax({
                        type: 'POST',
                        data: JSON.stringify({
                                staffId: this.state.staffId,
                                month: this.state.month,
                                companyWorkingHrs: this.state.companyWorkingHrs,
                                days: this.state.days,
                                presentDays: this.state.presentDays,
                                absentDays: this.state.absentDays,
                                leaveDays: this.state.leaveDays,
                                holidayDays: this.state.holidayDays,
                                totalWorkingHrs: this.state.totalWorkingHrs,
                                workingHrs: this.state.workingHrs,
                                otWorkingHrs: this.state.otWorkingHrs,
                                companyWorkingHrsSalary: this.state.companySalary,
                                companyOtHrsSalary: this.state.companyOtHrsSalary,
                                empTotalWorkingHrsSalary: this.state.empTotalWorkingHrsSalary,
                                companyId: this.state.companyId,
                                site: GetCurrentSite()
                        }),
                        url: "http://15.206.129.105:8080/ThroughBooksCOAPI/Payroll/addsalary",
                        contentType: "application/json",
                        dataType: 'json',
                        async: false,
                        success: function (data, textStatus, jqXHR) {
                                confirmAlert({
                                        title: 'Success', // Title dialog
                                        message: 'Successfully Added salary Details', // Message dialog
                                        confirmLabel: 'Ok', // Text button confirm
                                });


                                $("#staffName").append('<option value ="" disabled selected hidden >Select EmployeeName</option>');
                                $('[name=staffId]').val("");
                                self.state.staffId = '';
                                self.state.presentDays = 0;
                                self.state.absentDays = 0;
                                self.state.leaveDays = 0;
                                self.state.holidayDays = 0;
                                self.state.companySalary = 0;
                                self.state.companySalaryInHrs = 0;
                                self.state.empTotalWorkingHrsSalary = 0;
                                self.state.otWorkingHrs = 0;
                                self.state.otWorkingHrsSalary = 0;
                                self.state.workingHrs = 0;
                                self.state.companyWorkingHrs = 8;
                                self.state.totalWorkingHrs = 0;

                                self.setState({
                                        staffId: '',
                                        presentDays: 0,
                                        absentDays: 0,
                                        leaveDays: 0,
                                        holidayDays: 0,
                                        companySalary: 0,
                                        companySalaryInHrs: 0,
                                        empTotalWorkingHrsSalary: 0,
                                        otWorkingHrs: 0,
                                        otWorkingHrsSalary: 0,
                                        workingHrs: 0,
                                        companyWorkingHrs: 8,
                                        totalWorkingHrs: 0
                                })

                                ReactDOM.render(
                                        <Router >
                                                <div>
                                                        <Route path="/" component={Salary} />
                                                </div>
                                        </Router>, document.getElementById('contentRender'));


                        },
                        error: function (data) {
                                confirmAlert({
                                        title: 'No Internet', // Title dialog
                                        message: 'Network Connection Problem', // Message dialog
                                        confirmLabel: 'Ok', // Text button confirm
                                });


                        },
                })

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


        render() {
                return (

                        <div class="container">

                                <div className="">
                                        <div className="">
                                                <BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
                                        </div>
                                        <div class="inv_HeaderCls">
                                                <h3 className="text-center">Salary</h3>
                                        </div>
                                </div>


                                <div>
                                        <div class="card" style={{ width: "100%" }}>



                                                <div class="card-body">
                                                        <div className="panel panel-default">
                                                                <FormErrors formErrors={this.state.formErrors} />
                                                        </div>

                                                        <form class="form-horizontal form-bordered">
                                                                <div className={`form-group ${this.errorClass(this.state.formErrors.staffName)}`} style={{ marginBottom: "1%" }}>
                                                                        <label class="control-label col-sm-2" for="staffName">Employee Name<span style={{ color: "red" }}>*</span></label>
                                                                        <div class="col-sm-10">
                                                                                <select id="staffName" className="form-control" onChange={this.handleStaffDetails} name="staffId" value={this.state.staffId}>

                                                                                </select>
                                                                        </div>
                                                                </div>
                                                                <div class="form-group" style={{ marginBottom: "1%" }}>
                                                                        <label class="control-label col-sm-2" for="salaryMonth">Salary Month</label>
                                                                        <div class="col-sm-10">
                                                                                <input type="text" className="form-control" name="month" value={this.state.month} readOnly />

                                                                        </div>
                                                                </div>


                                                                <div class="form-group" style={{ marginBottom: "1%" }}>
                                                                        <label class="control-label col-sm-2" for="days">No.Of.Days/Month</label>
                                                                        <div class="col-sm-10">
                                                                                <input readOnly type="text" name="days" className="form-control" onChange={this.handleUserInput} value={this.state.days} />
                                                                        </div>
                                                                </div>


                                                                <div class="form-group" style={{ marginBottom: "1%" }}>
                                                                        <label class="control-label col-sm-2" for="presentDays">No.Of.Days Present</label>
                                                                        <div class="col-sm-10">
                                                                                <input readOnly type="text" name="presentDays" className="form-control" onChange={this.handleUserInputDaysChange} value={this.state.presentDays} />
                                                                        </div>
                                                                </div>


                                                                <div class="form-group" style={{ marginBottom: "1%" }}>
                                                                        <label class="control-label col-sm-2" for="leaveDays">No.Of.Days Leave</label>
                                                                        <div class="col-sm-10">
                                                                                <input readOnly type="text" name="leaveDays" className="form-control" onChange={this.handleUserInput} value={this.state.leaveDays} />
                                                                        </div>
                                                                </div>

                                                                <div class="form-group" style={{ marginBottom: "1%" }}>
                                                                        <label class="control-label col-sm-2" for="absentDays">No.Of.Days Absent<span style={{ color: "red" }}>*</span></label>
                                                                        <div class="col-sm-10">
                                                                                <input type="text" name="absentDays" className="form-control" onChange={this.handleUserInput} value={this.state.absentDays} />
                                                                        </div>
                                                                </div>


                                                                <div class="form-group" style={{ marginBottom: "1%" }}>
                                                                        <label class="control-label col-sm-2" for="holidayDays">No.Of.Days Holiday<span style={{ color: "red" }}>*</span></label>
                                                                        <div class="col-sm-10">
                                                                                <input type="text" name="holidayDays" className="form-control" onChange={this.handleUserInputDaysChange} value={this.state.holidayDays} />
                                                                        </div>
                                                                </div>
                                                                <div class="form-group" style={{ marginBottom: "1%" }}>
                                                                        <label class="control-label col-sm-2" for="companyWorkingHrs">Company General Working Hours/Day<span style={{ color: "red" }}>*</span></label>
                                                                        <div class="col-sm-10">

                                                                                <input type="number" min="1" className="form-control" onChange={this.HandleCalculation} name="companyWorkingHrs" value={this.state.companyWorkingHrs} />

                                                                        </div>
                                                                </div>

                                                                <div class="form-group" style={{ marginBottom: "1%" }}>
                                                                        <label class="control-label col-sm-2" for="totalWorkingHrs">Total No Of Working Hours<span style={{ color: "red" }}>*</span></label>
                                                                        <div class="col-sm-10">
                                                                                <input type="text" name="totalWorkingHrs" className="form-control" onChange={this.HandleCalculation} value={this.state.totalWorkingHrs} />
                                                                        </div>
                                                                </div>

                                                                <div class="form-group" style={{ marginBottom: "1%" }}>
                                                                        <label class="control-label col-sm-2" for="companySalary">Company Salary <span style={{ color: "red" }}>*</span></label>
                                                                        <div class="col-sm-10">
                                                                                <input type="text" onChange={this.HandleCalculation} className="form-control" name="companySalary" value={this.state.companySalary} />
                                                                        </div>
                                                                </div>

                                                                <div class="form-group" style={{ marginBottom: "1%" }}>
                                                                        <label class="control-label col-sm-2" for="companySalaryInHrs">Company Per Salary<span style={{ color: "red" }}>*</span></label>
                                                                        <div class="col-sm-10">
                                                                                <input readOnly type="text" onChange={this.HandleCalculation} className="form-control" name="companySalaryInHrs" value={this.state.companySalaryInHrs} />
                                                                        </div>
                                                                </div>

                                                                <div class="form-group" style={{ marginBottom: "1%" }}>
                                                                        <label class="control-label col-sm-2" for="workingHrs">General Working Hours<span style={{ color: "red" }}>*</span></label>
                                                                        <div class="col-sm-10">
                                                                                <input readOnly type="text" name="workingHrs" className="form-control" value={this.state.workingHrs} />
                                                                        </div>
                                                                </div>




                                                                <div class="form-group" style={{ marginBottom: "1%" }}>
                                                                        <label class="control-label col-sm-2" for="otWorkingHrs">OT Working Hours<span style={{ color: "red" }}>*</span></label>
                                                                        <div class="col-sm-10">
                                                                                <input readOnly type="text" name="otWorkingHrs" className="form-control" value={this.state.otWorkingHrs} />
                                                                        </div>
                                                                </div>

                                                                <div class="form-group" style={{ marginBottom: "1%" }}>
                                                                        <label class="control-label col-sm-2" for="companyOtHrsSalary">Company Salary For OT Working Hrs<span style={{ color: "red" }}>*</span></label>
                                                                        <div class="col-sm-10">
                                                                                <input type="text" onChange={this.HandleCalculation} className="form-control" name="companyOtHrsSalary" value={this.state.companyOtHrsSalary} />
                                                                        </div>
                                                                </div>


                                                                <div class="form-group" id="empsalary" style={{ marginBottom: "1%" }}>
                                                                        <label class="control-label col-sm-2" for="empTotalWorkingHrsSalary">Employee Salary<span style={{ color: "red" }}>*</span></label>
                                                                        <div class="col-sm-10">
                                                                                <input readOnly type="text" className="form-control" name="empTotalWorkingHrsSalary" value={this.state.empTotalWorkingHrsSalary} readOnly />
                                                                        </div>
                                                                </div>

                                                                <div class="form-group">
                                                                        <div class="row" style={{ marginLeft: "2px", marginBottom: "10%" }}>
                                                                                <div class="col-sm-offset-2 col-sm-10" id="submitButtons">
                                                                                        <button type="button" style={{ fontWeight: "bold" }} onClick={() => this.AddSalaryFunc()} class="btn btn-default">Submit</button> <span></span>
                                                                                        <button type="button" style={{ fontWeight: "bold" }} onClick={() => this.cancelFunc()} class="btn btn-default">Clear</button>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </form>
                                                </div>
                                        </div>
                                </div>
                        </div>

                );
        }
}

export default Salary;