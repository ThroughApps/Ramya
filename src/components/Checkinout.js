import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import idb from 'idb';
import moment from 'moment-timezone';
import r5 from './image/CheckInOut100m.png';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
// import './Checkinout.css';




class Checkinout extends Component {
    constructor() {
        super();
        // var biometric = CryptoJS.AES.decrypt(localStorage.getItem('BiometricValue'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        //   var companyType = CryptoJS.AES.decrypt(localStorage.getItem('CompanyType'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        //   var sms = CryptoJS.AES.decrypt(localStorage.getItem('SMS'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
        //   var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

        //   var location = localStorage.getItem('Location');
        var location = "-";


        var companyType = "Enter EmployeeId";


        this.state = {
            //   employeeId: employeeId,
            checkInTime: '',
            date: '',
            checkOutTime: '',
            companyId: '',
            //  biometric: biometric,
            //  companyType: companyType,
            location: location,
            //   sms: sms,
            employeeName: '',
        };
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
        );
    }

    componentDidMount() {
       SetCurrentPage("checkinout"); 
        this.interval = setInterval(() => this.offlineData(), 2000);
    }
    calcTime(city, offset) {
        // create Date object for current location
        var d = new Date();


        // convert to msec
        // subtract local time zone offset
        // get UTC time in msec
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

        // create new Date object for different city
        // using supplied offset
        var nd = new Date(utc + (3600000 * offset));

        // return time as a string
        return nd;
    }


    GetTimeZoneDate(offset) {
        //  var offset = -8;
        var todayDate = new Date(new Date().getTime() + offset * 3600 * 1000).toUTCString().replace(/ GMT$/, "")


        var d1 = new Date(todayDate);
        var d2 = d1.getFullYear() + "-"
            + ('0' + (d1.getMonth() + 1)).slice(-2) + "-"
            + ('0' + d1.getDate()).slice(-2);


        return d2;

    }


    offlineData() {
        var self = this;
        if (navigator.onLine) {
            var dbPromise = idb.open('Attendance-db');
            dbPromise.then(function (db) {
                if (db.objectStoreNames.contains('checkInOut')) {
                    var tx = db.transaction('checkInOut', 'readonly');
                    var keyValStore = tx.objectStore('checkInOut');
                    var count = keyValStore.openCursor().then(function cursorIterate(cursor) {
                        if (!cursor) return;
                        if (cursor.value.status == "CheckInOut") {
                            $.ajax({
                                type: 'POST',
                                data: cursor.value.data,
                                url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/EmployeeCheckInOut",
                                // url: "http://localhost:8081/EmployeeAttendenceAPI/employee/EmployeeCheckInOut",
                                contentType: "application/json",
                                dataType: 'json',
                                async: false,

                                success: function (data, textStatus, jqXHR) {
                                    if (data.employeeName == "NOT_VAILD") {
                                        confirmAlert({
                                            title: 'CheckIn Failed',                        // Title dialog
                                            message: 'Invalid Employee Id, Kindly Check In with a Valid Employee Id',               // Message dialog
                                            confirmLabel: 'Ok',                           // Text button confirm
                                        })


                                    }
                                    else if (data.employeeName == "ALREADY_CHECKIN") {
                                        confirmAlert({
                                            title: 'CheckIn Failed',                        // Title dialog
                                            message: 'The Employee Id ' + data.employeeId + ' is already checked in today',               // Message dialog
                                            confirmLabel: 'Ok',                           // Text button confirm
                                        })



                                    }
                                    else {
                                        confirmAlert({
                                            title: 'Check In Success',                        // Title dialog
                                            message: 'The Employee Id ' + data.employeeId + 'Checked In Successfully',               // Message dialog
                                            confirmLabel: 'Ok',                           // Text button confirm
                                        })


                                    }

                                },
                                error: function (data) {
                                    confirmAlert({
                                        title: 'No Internet',                        // Title dialog
                                        message: 'Network Connection Problem',               // Message dialog
                                        confirmLabel: 'Ok',                           // Text button confirm
                                    });

                                },
                            });

                        } else {

                            $.ajax({
                                type: 'POST',
                                data: cursor.value.data,
                                url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employee/employeecheckout",
                                contentType: "application/json",
                                dataType: 'json',
                                async: false,

                                success: function (data, textStatus, jqXHR) {
                                    if (data.employeeName == "NOT_VAILD") {
                                        confirmAlert({
                                            title: 'Check Out Failed',                        // Title dialog
                                            message: 'Invalid Employee Id, Kindly Check Out with a Valid Employee Id',               // Message dialog
                                            confirmLabel: 'Ok',                           // Text button confirm
                                        })

                                    }
                                    else if (data.employeeName == "NOT_CHECKED_IN") {
                                        confirmAlert({
                                            title: 'Check Out Failed',                        // Title dialog
                                            message: 'The Employee Id ' + data.employeeId + ' Has Not Checked In Today Hence Check Out Cannot Be Done ',               // Message dialog
                                            confirmLabel: 'Ok',                           // Text button confirm


                                        })

                                    }
                                    else if (data.employeeName == "ALREADY_CHECKOUT") {
                                        confirmAlert({
                                            title: 'Check Out Failed',                        // Title dialog
                                            message: 'The Employee Id ' + data.employeeId + ' is already checked out today',               // Message dialog
                                            confirmLabel: 'Ok',                           // Text button confirm


                                        })

                                    } else if (data.employeeName == "BLOCKED") {

                                        confirmAlert({
                                            title: 'Check In Failed',                        // Title dialog
                                            message: 'The [' + data.employeeId + '] is BLOCKED',               // Message dialog
                                            confirmLabel: 'Ok',                           // Text button confirm

                                        });
                                    }
                                    else {

                                        confirmAlert({
                                            title: 'Check Out Success',                        // Title dialog
                                            message: 'The Employee Id ' + data.employeeId + 'Checked Out Successfully  ',               // Message dialog
                                            confirmLabel: 'Ok',                           // Text button confirm
                                        })

                                    }
                                },
                                error: function (data) {
                                    confirmAlert({
                                        title: 'No Internet',                        // Title dialog
                                        message: 'Network Connection Problem',               // Message dialog
                                        confirmLabel: 'Ok',                           // Text button confirm
                                    });

                                },

                            });

                        }
                        dbPromise.then(function (db) {
                            var tx = db.transaction('checkInOut', 'readwrite');
                            var keyValStore = tx.objectStore('checkInOut');
                            return keyValStore.delete(cursor.key);

                        });
                        return cursor.continue().then(cursorIterate);
                    });

                }

            });
        }

    }




    sendSMS() {

        $.ajax({
            type: 'GET',
            url: "http://alerts.digimiles.in/sendsms/bulksms?username=di80-arun&password=digimile&type=0&dlr=1&destination=8838598967&source=TICTOK&message=hello",
            contentType: "application/json",
            async: false,
            crossDomain: true,
            success: function (data) {

            },
            error: function (data) {

                /* alert("not send"); */
            }
        });

    }









    NoAction() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={Checkinout} />

                </div>
            </Router>, document.getElementById('contentRender'));
        this.state.employeeId = '';
        this.setState({
            employeeId: '',
        })

    }


    BackbtnFunc() {
        ReactDOM.render(
            <Router>
                <div>





                </div>
            </Router>,
            document.getElementById('contentRender'));
        registerServiceWorker();
    }
    //Get the latitude and the longitude;
    Submit() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
        }
        //  window.location = 'comgooglemaps://?center=40.765819,-73.975866&zoom=14&views=traffic';
        // window.location = 'geo:40.765819,-73.975866';

    }
    checkInOut() {



        //  var empZone = localStorage.getItem('EmpTimeZone');
        //   var companyName = CryptoJS.AES.decrypt(localStorage.getItem('CompanyName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

        var empZone = "Asia/Kolkata";

        if (empZone != "-") {
            var offset = moment.tz(moment.utc(), empZone).utcOffset();

            var offsetValue = Number(offset) / 60; //CONVERTING MIN INTO HRS

            var timings = this.calcTime(empZone, offsetValue);
            var todayDate = this.GetTimeZoneDate(offsetValue);
            var currenttime = timings.toLocaleTimeString([], { hour12: false });
 var offset = moment.tz(moment.utc(), empZone).utcOffset();

            var offsetValue = Number(offset) / 60; //CONVERTING MIN INTO HRS

            var timings = this.calcTime(empZone, offsetValue);
            var todayDate = this.GetTimeZoneDate(offsetValue);
            var currenttime = timings.toLocaleTimeString([], { hour12: false });

            this.state.checkInTime = currenttime;
            this.state.date = todayDate;
            this.setState({
                checkInTime: currenttime,
                employeeId: this.state.employeeId,
                date: todayDate,
            });


            var self = this;
            if (navigator.onLine) {

                var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

                //var companyId ="045";
                this.state.companyId = companyId;
                this.setState({
                    companyId: companyId,
                });
                // alert("thiss"+this.state.location);
                var category = "Staff";  //just mentioned but not used but do provide while sending data
                var sms = "0";
                var employeeCheckinoutData = "{'companyId':'" + this.state.companyId + "','date':'" + this.state.date + "','category':'" + category + "','employeeId':'" + this.state.employeeId + "','time':'" + this.state.checkInTime + "','location':'" + this.state.location + "','sms':'" + sms + "'}";

                $.ajax({
                    type: 'GET',


                    url: "https://wildfly.tictoks.in:443/EmployeeAttendenceAPI/AttendanceAPICall/EmployeeCheckInOut/" + employeeCheckinoutData,
                    contentType: "application/json",
                    dataType: 'json',
                    async: false,

                    success: function (data, textStatus, jqXHR) {
                        $("#textMsg").fadeIn();
                        if (data.status == "NOT_VAILD") {
                            $("#textMsg").text("Invalid EmployeeId " + self.state.employeeId);

                            $('#textMsg').css('color', 'red');

                        }
                        else if (data.status == "BLOCKED") {
                            $("#textMsg").text(self.state.employeeId + " ID has been Blocked");

                            $('#textMsg').css('color', 'red');

                        }
                        else if (data.status == "CHECKIN") {
                            $("#textMsg").text("Hi " + data.employeeName + ", Welcome  !");

                            $('#textMsg').css('color', 'green');
                        }
                        else if (data.status == "CHECKOUT") {
                            $("#textMsg").text("Hi " + data.employeeName + ", Hope You had a Great day !");
                            $('#textMsg').css('color', 'green');

                        } else if ((data.status == "SAME_TIME")) {
                            $("#textMsg").text(self.state.employeeId + " Your Attendance is Recoreded Already ");
                            $('#textMsg').css('color', 'red');

                        }
                        $("#textMsg").fadeOut(1500);
                        /*  self.state.employeeId = '';
                         self.setState({
                             employeeId: '',
                         }) */
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
            } else {
                // /* dd offile db */
                var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
                this.state.companyId = companyId;
                this.setState({
                    companyId: companyId,
                });
                var message = JSON.stringify({
                    time: this.state.checkInTime,
                    employeeId: this.state.employeeId,
                    date: this.state.date,
                    companyId: this.state.companyId,
                    location: this.state.location,
                    sms: this.state.sms,
                });
                var dbPromise = idb.open('Attendance-db', 2, function (upgradeDb) {
                    switch (upgradeDb.oldVersion) {
                        case 0:

                        case 1:
                            upgradeDb.createObjectStore('checkInOut', { autoIncrement: true });

                    }
                });

                dbPromise.then(function (db) {
                    var tx = db.transaction('checkInOut', 'readwrite');
                    var keyValStore = tx.objectStore('checkInOut');
                    keyValStore.put({ "data": message, "status": "CheckInOut" });
                    return tx.complete;

                }).then(function (val) {
                });
                self.state.employeeId = '';
                self.setState({
                    employeeId: '',
                })

            }
        } else {

            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Work Location Not Assigned For' + this.state.employeeId,
                showConfirmButton: false,
                timer: 2000
            })
        }

    }
    render() {
        return (

            <div className="container " style={{
                marginBottom: "20%",
                backgroundColor: "white",

            }}>

                <div style={{ textAlign: "center", marginTop: "80px" }}>
                    <span id="textMsg" style={{

                        color: "#ef6443",
                        fontSize: "16px"
                    }}>

                    </span>
                </div>
                <div class="form-group"
                    style={{
                        textAlign: "center",
                        display: "block",
                        width: "40%",
                        margin: "auto",

                    }}>

                    <input
                        type="number"
                        autoFocus
                        value={this.state.employeeId}
                        required
                        name="employeeId"
                        onChange={this.handleUserInput}
                        className="form-control"
                        id="employeeId"
                        placeholder="Enter Id"

                        style={{
                            height: "50px",

                        }}
                    />
                </div>

                <div className="row" id="checkInOut" style={{ textAlign: "center" }}>
                    {/*  <div className="col-sm-6 col-xs-6" id="colcheckIn">
                        <a to="/" onClick={() => this.checkIn()} id="checkIn" className="" ></a>
                    </div>
                    <div className="col-sm-6 col-xs-6" id="colcheckIn">
                        <a to="/" id="checkOut" onClick={() => this.checkOut()} ></a>
                    </div> */}
                    <div className="col-sm-12 col-xs-12" style={{ padding: " 50px 0 50px 0px" }} id="colcheckIn">
                        <a to="/" onClick={() => this.checkInOut()} className="" >
                            <img src={r5} alt="Logo" style={{
                                margin: "auto!important",
                                width: " 86px!important", height: "80px"
                            }} className=" checkinoutnew" />
                        </a>
                    </div>
                    {/*  <button onClick={() => this.Submit()} style={{marginLeft:"5px"}} id="submit">Submit</button>
                   */}
                </div>
            </div>

        );
    }

}

function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    var url = 'http://www.google.com/maps/place/?saddr=' + lat + ',' + lng + '&daddr=' + lat + ',' + lng + '+to:12.9010,80.2279&zoom=14&views=traffic';
    //var inAppBrowser = window.open(url, '_blank', 'location=yes');
    //var url = 'http://www.google.com/maps/place/12.8814681,80.2287197';
    var inAppBrowser = window.open(url, '_blank', 'location=yes');
    window.location = 'geo:37.421998333333,-122.08400'
    // window.location = 'comgooglemaps://?daddr='+lat+','+lng+'+to:12.9010,80.2279&zoom=14&views=traffic';
    //  initMap();
}
function initMap() {
    /*   alert("call"); */
    const google = window.google;
    var locations = [
        ['Bondi Beach', -33.890542, 151.274856, 4],
        ['Coogee Beach', -33.923036, 151.259052, 5],
        ['Cronulla Beach', -34.028249, 151.157507, 3],
        ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
        ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(-33.92, 151.25),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}
function errorFunction() {
    /*    alert("Geocoder failed");*/
}

export default Checkinout;
{/* <div>
<input type="submit" id="btnCapture" value="Capture" class="btn btn-primary btn-100" onClick={() => this.Capture()} />
</div> */}