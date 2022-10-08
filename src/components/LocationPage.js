import datepicker from 'jquery-ui/ui/widgets/datepicker';
import './datepicker.css';
import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {
  FormErrors
} from './FormErrors';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import CryptoJS from 'crypto-js';
import FooterText from './FooterText';
import { confirmAlert } from 'react-confirm-alert';
import _ from 'underscore';
import SelectSearch from 'react-select';
//import { saveAs } from 'file-saver';
import ReactTable from "react-table";
import "react-table/react-table.css";
import FileSaver from 'file-saver';
import xl from 'excel4node';
//import timeZone from 'timezone-list';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import currencyFormatter from "currency-formatter";
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
  GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
const ct = require('countries-and-timezones');

var siteNameArray = [];
var ivalue = 0;
var countryArray = [];
var timeZoneArray = [];
var data = [];
var columns = [];
var initialLocation;
var currencies;
var currencyArray = [];

class LocationPage extends Component {


  constructor() {
    super();
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state = {
      date: '',
      checkInTime: '',
      checkOutTime: '',
      employeeId: '',
      country: '',
      region: null,
      options: [],
      timeZoneOptions: [],
      timeZone: null,
      siteName: null,
      location: "",
      arae: null,
      currencyCode: null,
      zipCode: "",
      data: [],
      columns: [],
      companyId: companyId,
      locationFieldData: 'mandatory',
      currencyOptions: [],
      currencyCode: "",

    }


  }

  componentDidMount() {
    SetCurrentPage("LocationPage");
  
    var self = this;
    self.state.data = [];
    self.state.columns = [];


    $("#timezonetable").empty();
    $("#nodata").empty();

    /*
    *FUNCTION FOR ZIPCODE VALIDATION
    */
    //   $("#zipCode").on('change', function () {
    // $(document).on('input', '#zipCode', function(){

    $(document).on('input', '#zipCode', function () {
      var zipCode = $("#zipCode").val(); // get current row 1st TD value
      console.log("ZIP CODE", zipCode);


      var isNumberDt = $.isNumeric(zipCode);
      //   alert("IS NUMBER VALUE :"+isNumberDt);
      if (isNumberDt !== false) {
        var sign_data = Math.sign(zipCode);
        //  alert("SIGN VALUE :"+sign_data);
        if (sign_data !== -1) {

          var decimal_data = (zipCode - Math.floor(zipCode)) != 0;
          //    alert("DECIMAL DATA :"+decimal_data);
          if (decimal_data == false) {
            //alert("ZIP-CODE SIZE :" + zipCode.length);
            var zipcodeLength = zipCode.length;
            if (Number(zipcodeLength) < 30) {
              self.state.zipCode = zipCode;
              self.setState({
                zipCode: self.state.zipCode,
              })
            } else {
              //LIMIT EXCEEDS
              $("input[name=zipCode]").val("");
            }

          } else {
            //DECIMAL NUMBER
            $("input[name=zipCode]").val("");
          }
        } else {
          //NEGATIVE-NUMBER
          $("input[name=zipCode]").val("");
        }
      } else {
        //NON-NUMERIC
        $("input[name=zipCode]").val("");
      }


    });

    this.GetCountry();
    this.GetZoneData();

    this.state.currencyOptions = [];

    currencies = currencyFormatter.currencies;
    console.log("currencies :", currencies);

    if (currencies.length != 0) {
      $.each(currencies, function (i, item) {
        currencyArray.push({ label: item.code + " - " + item.symbol, value: item.code });
      });
      this.state.currencyOptions = currencyArray;
    }

    this.setState({
      currencyOptions: this.state.currencyOptions,
    })


    var currentCurrencyFormatChosen = _.findWhere(currencies, { code: "ARS" });
    console.log("currentCurrencyFormatChosen DID MOUNT :", currentCurrencyFormatChosen);
    this.state.currencyCode = "ARS";
    this.state.currencyOption = { label: "ARS" + " - " + "$", value: "ARS" }
    this.SetCurrencyValue(currentCurrencyFormatChosen);



  }

  GetCountry() {

    var self = this;

    countryArray = [];
    timeZoneArray = [];


    const countries = ct.getAllCountries();
    console.log("COUNTIES :", countries);
    var groupedData = _.groupBy(countries, "id");

    var partionedData = _.partition(groupedData, ",")[1];

    var options = [];
    var tabdata = "";
    for (var z = 0; z < _.size(partionedData); z++) {
      var partionedData1 = partionedData[z];
      options.push({
        label: partionedData1[0].name,
        value: partionedData1[0].id
      });

      countryArray.push(partionedData1[0].name);
      timeZoneArray.push(partionedData1[0].timezones);

    }

    self.state.options = options;
    self.setState({
      options: options,
    })

  }


  onRowClick = (state, rowInfo, column, instance) => {
    var self = this;
    return {

      onClick: (e, handleOriginal) => {
        if (column.Header == "DeActivate") {

          if (rowInfo != undefined && rowInfo.original["DeActivate"] != "") {
            self.state.deletesiteName = rowInfo.original["SiteName"];


            self.setState({
              deletesiteName: self.state.deletesiteName,
            })

            var rowIndexValue = rowInfo.index;

            Swal.fire({
              title: 'Site Delete Confirmation',
              text: 'Are You Sure , Do you want to Delete the Site ' + self.state.deletesiteName + ' ? ',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Delete',
              cancelButtonText: `Cancel`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              console.log("deleting", result);
              if (result.value) {
                self.DeleteConfirm(rowIndexValue);
              } else if (result.dismiss === Swal.DismissReason.cancel) {

              }
            })

          }

        }
      }
    };
  };

  DeleteConfirm(rowIndexValue) {
    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: self.state.companyId,
        //    location:location,
        siteName: this.state.deletesiteName,
      }),
      url: "http://15.206.129.105:8080/ThroughBooksCOAPI/TimeZone/DeleteTimeZone",
      contentType: "application/json",
      dataType: 'json',
      success: function (data, textStatus, jqXHR) {

        console.log("DATA :", data);
        if (data.responseData == "Delete_Data") {

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Successfully Removed The Site ' + self.state.deletesiteName,
            showConfirmButton: false,
            timer: 2000
          })
         
         /* var array = [...self.state.data]; // make a new copy of array instead of mutating the same array directly.
          array.splice(rowIndexValue, 1);

          self.state.data = [];
          self.state.data = array;
          self.setState({ data: array });
          self.state.deletesiteName = "";
*/
          localStorage.setItem('SiteDetails', CryptoJS.AES.encrypt(JSON.stringify(data.timeZoneAreaList), "shinchanbaby"));

          // localStorage.setItem('SiteDetails', (JSON.stringify(data.timeZoneAreaList)));
          siteNameArray = [];

          if (data.timeZoneAreaList.length != 0) {
            $.each(data.timeZoneAreaList, function (i, item) {
              siteNameArray.push(item.siteName);
            });
          }



        } else {

          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Location Cannot Be Deleted Since It Has Employee',
            showConfirmButton: false,
            timer: 2000
          })
        }

        if (data.timeZoneAreaList.length != 0) {

          self.state.data=[];
          $.each(data.timeZoneAreaList, function (i, item) {

            siteNameArray.push(item.siteName);
            ivalue = Number(i) + 1;

            if (i == 0) {

              self.state.data[i] = {
                "SNO": ivalue,
                "SiteName": item.siteName,
                "TimeZone": item.timeZone,
                "Area": item.area,
                "Location": item.location,
                "Full Address": item.mapLocation,
                "ZipCode": item.zipCode,
                "CurrencyCode":item.currencyCode,
                "DeActivate": "",
              }

            } else {
              self.state.data[i] = {
                "SNO": ivalue,
                "SiteName": item.siteName,
                "TimeZone": item.timeZone,
                "Area": item.area,
                "Location": item.location,
                "Full Address": item.mapLocation,
                "ZipCode": item.zipCode,
                "CurrencyCode":item.currencyCode,
                "DeActivate": < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
                  <i class="glyphicon glyphicon-remove-sign" style={{
                    border: "none",
                    padding: "6px 7px 5px 7px",
                    fontSize: "1em",
                    color: "white",
                    borderRadius: "18px",
                    backgroundColor: "tomato"

                  }}>  </i>
                </span></div>


              }
            }
          });

        }


        if (self.state.data.length > 0) {
          self.state.columns = self.getColumns();
          console.log("SELF.STATE.DATA :", self.state.data);
          console.log("SELF.STATE.COLUMNS :", self.state.columns);
        }
        self.setState({
          data: self.state.data,
          columns: self.state.columns,
        });


      },
      error: function (data, textStatus, jqXHR) {
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


  GetZoneData() {


    var self = this;
    // alert("ZONE DATA FUNC");
    siteNameArray = [];
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
      }),
      url: "http://15.206.129.105:8080/ThroughBooksCOAPI/TimeZone/SelectTimeZone",

      contentType: "application/json",
      dataType: 'json',
      success: function (data, textStatus, jqXHR) {

        console.log("DATA :", data);

        if (data.timeZoneAreaList.length != 0) {

          $.each(data.timeZoneAreaList, function (i, item) {

            siteNameArray.push(item.siteName);
            ivalue = Number(i) + 1;

            if (i == 0) {

              self.state.data[i] = {
                "SNO": ivalue,
                "SiteName": item.siteName,
                "TimeZone": item.timeZone,
                "Area": item.area,
                "Location": item.location,
                "ZipCode": item.zipCode,
                "CurrencyCode":item.currencyCode,
                "DeActivate": "",
              }

            } else {
              self.state.data[i] = {
                "SNO": ivalue,
                "SiteName": item.siteName,
                "TimeZone": item.timeZone,
                "Area": item.area,
                "Location": item.location,
                "ZipCode": item.zipCode,
                "CurrencyCode":item.currencyCode,
                "DeActivate": < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
                  <i class="glyphicon glyphicon-remove-sign" style={{
                    border: "none",
                    padding: "6px 7px 5px 7px",
                    fontSize: "1em",
                    color: "white",
                    borderRadius: "18px",
                    backgroundColor: "tomato"

                  }}>  </i>
                </span></div>


              }
            }
          });

        }


        if (self.state.data.length > 0) {
          self.state.columns = self.getColumns();
          console.log("SELF.STATE.DATA :", self.state.data);
          console.log("SELF.STATE.COLUMNS :", self.state.columns);
        }
        self.setState({
          data: self.state.data,
          columns: self.state.columns,
        });
      },
      error: function (data, textStatus, jqXHR) {

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

  getColumns() {

    return Object.keys(this.state.data[0]).map(key => {

      return {
        Header: key,
        accessor: key
      };

    });
  }



  handleUserInputRegion = (e) => {

    var self = this;

    const value = e.value;
    this.setState({
      region: value,
      selectedRegion: e,
      valid: true,
      timeZone: '',
    },
    );

    const Timezones = ct.getTimezonesForCountry(value);
    var timeZoneOptions = [];
    for (var i = 0; i < Timezones.length; i++) {
      timeZoneOptions.push({
        label: Timezones[i].name,
        value: Timezones[i].name
      });
    }

    self.state.timeZoneOptions = timeZoneOptions;
    self.setState({
      timeZoneOptions: timeZoneOptions,
    })

  }


  handleUserInputTimeZone(e) {
    var self = this;

    const value = e.value;
    this.setState({
      timeZone: value,
      selectedTimeZone: e,
      valid: true,
    },
    );
  }


  handleUserInput = (e) => {
    const name = e.target.name;
    const value = (e.target.value).replace(/[,-]+/, '');
    this.setState({ [name]: value });
  }


  AddLocation() {

    var self = this;
    this.setState({
      region: this.state.region,
      timeZone: this.state.timeZone,
      siteName: this.state.siteName,
      location: this.state.location,
      area: this.state.area,
      zipCode: this.state.zipCode,
    })


    console.log("JSON-DATA :",
      JSON.stringify({
        companyId: this.state.companyId,
        timeZone: this.state.timeZone,
        siteName: this.state.siteName,
        location: this.state.location,
        area: this.state.area,
        zipCode: this.state.zipCode,
        currencyCode: this.state.currencyCode,

      })
    );

    var proceedData = "Yes";
    if (this.state.region == null || this.state.timeZone == null || this.state.siteName == null
      || this.state.area == null || this.state.currencyCode == null) {
      proceedData = "No";
    }


    /*  if (this.state.region != null && this.state.timeZone != null && this.state.siteName != null
        && this.state.location != null && this.state.area != null && this.state.zipCode != null) {
          */
    if (proceedData == "Yes") {

      if (this.state.location == "" || this.state.location == null) {
        this.state.location = initialLocation;
      }
      var siteNameValidation = _.contains(siteNameArray, this.state.siteName);

      if (siteNameValidation == false) {

        $.ajax({
          type: 'POST',
          data: JSON.stringify({
            companyId: this.state.companyId,
            timeZone: this.state.timeZone,
            siteName: this.state.siteName,
            location: this.state.location,
            area: this.state.area,
            zipCode: this.state.zipCode,
           // currencyCode: this.state.currencyCode,
            currencyCode: 'USD',

          }),
          url: "http://15.206.129.105:8080/ThroughBooksCOAPI/TimeZone/AddTimeZone",

          contentType: "application/json",
          dataType: 'json',
          success: function (data, textStatus, jqXHR) {

            console.log("ADD-LOCATION-DATA :", data);
            if (data.responseData == "Success") {

              if (siteNameArray.length == 0) {
                siteNameArray.push(self.state.siteName);

              } else {

                siteNameArray.push(self.state.siteName);

              }

          


            	
              var locationData=[...data.timeZoneAreaList].reverse();	
              var count=0;	
              var lastIndex=locationData.length-1;	
              localStorage.setItem('SiteDetails', CryptoJS.AES.encrypt(JSON.stringify(data.timeZoneAreaList), "shinchanbaby"));	
                   
             $.each(locationData,function(i,item){	
              count=Number(count)+1;	
              if(i!=lastIndex){	
              self.state.data[i] = {	
                "SNO": count,	
                "SiteName": item.siteName,	
                "TimeZone": item.timeZone,	
                "Area": item.area,	
                "Full Address": item.mapLocation,	
                "ZipCode": item.zipCode,	
                "CurrencyCode":item.currencyCode,
                "DeActivate": < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>	
                  <i class="glyphicon glyphicon-remove-sign" style={{	
                    border: "none",	
                    padding: "6px 7px 5px 7px",	
                    fontSize: "1em",	
                    color: "white",	
                    borderRadius: "18px",	
                    backgroundColor: "tomato"	
                  }}>  </i>	
                </span></div>	
              }	
            }else{	
              self.state.data[i] = {	
                "SNO": count,	
                "SiteName": item.siteName,	
                "TimeZone": item.timeZone,	
                "Area": item.area,	
                "Full Address": item.mapLocation,	
                "ZipCode": item.zipCode,	
                "CurrencyCode":item.currencyCode,
                "DeActivate": ""	
              }	
            }	
             })	
              
              localStorage.setItem('SiteDetails', CryptoJS.AES.encrypt(JSON.stringify(data.timeZoneAreaList), "shinchanbaby"));	
              var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)	
              
              if (role == "Proprietor") {	
                localStorage.setItem('EmpSites', CryptoJS.AES.encrypt(_.pluck(data.timeZoneAreaList, 'siteName').toString(), "shinchanbaby"));	
              }


              self.state.region = '';
              self.state.timeZone = '';
              self.state.siteName = '';
              self.state.location = '';
              self.state.area = '';
              self.state.zipCode = '';
              self.state.columns = self.getColumns();
              self.state.selectedRegion = "";
              self.state.selectedTimeZone = "";
              self.state.currencyCode = "";
              self.state.currencyOption = "";

              self.setState({
                region: self.state.region,
                timeZone: self.state.timeZone,
                siteName: self.state.siteName,
                location: self.state.location,
                area: self.state.area,
                zipCode: self.state.zipCode,
                columns: self.state.columns,
                data: self.state.data,
                selectedRegion: "",
                selectedTimeZone: "",
                currencyCode: self.state.currencyCode,
                currencyOption: self.state.currencyOption,
              })
              self.state.region = null;
              self.state.timeZone = null;
              self.state.siteName = null;
              self.state.location = null;
              self.state.area = null;
              self.state.zipCode = null;
              self.state.currencyCode = null;


              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Added New Site Location SuccessFully',
                showConfirmButton: false,
                timer: 2000
              })

            }

          },
          error: function (data, textStatus, jqXHR) {
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
        //SITE NAME DUPLICATION
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Site Name Already Exist',
          showConfirmButton: false,
          timer: 2000
        })
      }
    } else {

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Kindly fill all mandatory fields to proceed',
        showConfirmButton: false,
        timer: 2000
      })
    }




  }


  LocationExcelExportFunc() {

    $("#LocationExportModalview").modal("hide");
    var companyId = CryptoJS.AES.decrypt(
      localStorage.getItem("CompanyId"),
      "shinchanbaby"
    ).toString(CryptoJS.enc.Utf8);
    this.state.companyId = companyId;
    var today = new Date();
    var today1 =
      today.getFullYear() +
      "_" +
      (today.getMonth() + 1) +
      "_" +
      today.getDate();

    var totalName =
      companyId +
      "_" +
      today.getHours() +
      "_" +
      today.getMinutes() +
      "_" +
      today.getSeconds() +
      "_" +
      today1 +
      ".xlsx";

    this.state.exportFileName = totalName;


    this.setState({
      exportFileName: this.state.exportFileName,
      companyId: this.state.companyId
    });

    var self = this;
    $.ajax({
      type: "POST",
      data: JSON.stringify({
        fileName: this.state.exportFileName,
        companyId: this.state.companyId,
        pageData: "AddLocation",

      }),
      url: "http://15.206.129.105:8080/ThroughBooksCOAPI/ExcelImportExport/ExportFile",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      crossDomain: true,
      success: function (data, textStatus, jqXHR) {

        console.log("DATA :", data);

        self.DownloadExcelFile(self.state.exportFileName, data);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'The File Requested For Export Is Downloaded Successfully',
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


  DownloadExcelFile(fileName, data) {

    var self = this;


    /*
    * USING EXCEL 4 NODE
    * 
    */

    // Create a new instance of a Workbook class
    var wb = new xl.Workbook();




    // Add Worksheets to the workbook
    var ws = wb.addWorksheet('Sheet1',
      {
        sheetProtection: {
          selectLockedCells: true,
        },
        hidden: true // Flag indicating whether to not hide the worksheet within the workbook.
      });



    //FOR REGION
    console.log("COUNTRY ARRAY :", countryArray);
    console.log("COUNTRY ARRAY LENGTH:", countryArray.length);


    var countrySubArray = countryArray;
    /* var stringCountryArray=countrySubArray.join(",");
     console.log("COUNTRY STRING ARRAY :",stringCountryArray);
     countrySubArray=[];
     countrySubArray.push('"'+stringCountryArray+'"');
     console.log("COUNTRY SUB ARRAY :",countrySubArray);
*/

    var countryCount = 0;
    for (var a = 0; a < countryArray.length; a++) {
      ws.cell(a + 2, 1)
        .string(countryArray[a]);
      //.style(style);
      countryCount = Number(countryCount) + 1;
    }


    //FOR TIMEZONE
    //   var timeZoneArray=timeZone.getTimezones();

    var timezoneCount = 0;
    for (var b = 0; b < timeZoneArray.length; b++) {
      ws.cell(b + 2, 2)
        .string(timeZoneArray[b]);
      //.style(style);
      timezoneCount = Number(timezoneCount) + 1;
    }

    //lockCell(ws2,'A1');


    // ws2.cell(1, 1).lockCell();


    var options = {

      sheetProtection: { // same as "Protect Sheet" in Review tab of Excel
        autoFilter: true, // True means that that user will be unable to modify this setting
        deleteColumns: false,
        deleteRows: false,
        formatCells: false,
        formatColumns: false,
        formatRows: false,
        insertColumns: false,
        insertHyperlinks: false,
        insertRows: false,
        objects: false,
        password: false,
        pivotTables: false,
        scenarios: false,
        selectLockedCells: true,
        selectUnlockedCells: false,
        sheet: false,
        sort: false
      },
      sheetFormat: {
        //  baseColWidth: Integer, // Defaults to 10. Specifies the number of characters of the maximum digit width of the normal style's font. This value does not include margin padding or extra padding for gridlines. It is only the number of characters.,
        defaultColWidth: 32,
        //  defaultRowHeight: 15,
        //  thickBottom: false, // 'True' if rows have a thick bottom border by default.
        //  thickTop: false // 'True' if rows have a thick top border by default.
      }
    };



    var ws2 = wb.addWorksheet('Sheet2', options);




    // Create a reusable style
    var style = wb.createStyle({
      width: 32,
      font: {
        color: '00FFFFFF',
        size: 12,
        bold: true,
        //  underline: true,
        //  italics: true,
      },
      fill: {
        type: 'pattern',
        patternType: 'solid',
        //  bgColor: "00b050" ,// HTML style hex value. defaults to black
        fgColor: "00b050" // HTML style hex value. defaults to black.
        // fgColor:{ argb:'4472c4 ' },
      },


    });

    var style1 = wb.createStyle({
      width: 32,
      font: {
        color: '00FFFFFF',
        size: 12,
        bold: true,
        //  underline: true,
        //  italics: true,
      },
      fill: {
        type: 'pattern',
        patternType: 'solid',
        //   bgColor: string ,// HTML style hex value. defaults to black
        fgColor: "4472c4" // HTML style hex value. defaults to black.
      },

    });


    ws2.cell(1, 1).string('Region').style(style);
    ws2.cell(1, 2).string('TimeZone').style(style);
    ws2.cell(1, 3).string('SiteName').style(style);

    ws2.cell(1, 4).string('Location').style(style);


    ws2.cell(1, 5).string('Area').style(style);
    ws2.cell(1, 6).string('ZipCode').style(style1);


    var range = "A1";

    const lockCell = (ws2, range) => {
      ws2.addDataValidation({
        type: "textLength",
        error: "This cell is locked",
        operator: "equal",
        sqref: range,
        formulas: [""]
      });
    };







    ws2.row(1).freeze();
    // ws2.lockCell('B1');
    /*  var Role = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Roles'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
    console.log("ROLE :",Role);
    
    var roleArray=[];
    $.each(Role, function (i, item) {
      roleArray.push(item.role);
    });
    */



    /* for(var i=2;i<=1000;i++){
     
       sheet.getCell(`B${i}`).dataValidation = {
         type: 'list',
         allowBlank: true,
       //  formulae: ['"One,Two,Three,Four"']
       formulae:countrySubArray,
       };
     }
     */


    ws2.addDataValidation({
      type: 'list',
      allowBlank: 1,
      prompt: 'Choose from dropdown',
      error: 'Invalid choice was chosen',
      showDropDown: true,
      sqref: 'A2:A1048576',
      formulas: ["=Sheet1!$A$2:$A$" + countryCount] // range that contains the valid list. The `LOOKUPS` is the name of the sheet
    });

    ws2.addDataValidation({
      type: 'list',
      allowBlank: 1,
      prompt: 'Choose from dropdown',
      error: 'Invalid choice was chosen',
      showDropDown: true,
      sqref: 'B2:B1048576',
      formulas: ["=Sheet1!$B$2:$B$" + timezoneCount] // range that contains the valid list. The `LOOKUPS` is the name of the sheet
    });


    /*  wb.xlsx.writeBuffer()
      .then(buffer => FileSaver.saveAs(new Blob([buffer]),fileName))
      .catch(err => console.log('Error writing excel export', err))
  */
    wb.writeToBuffer().then(function (buffer) {
      // Do something with buffer
      FileSaver.saveAs(new Blob([buffer]), fileName);
    });






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


  DeleteSelected(rowIndexValue) {

    var self = this;

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: self.state.companyId,
        //    location:location,
        siteName: this.state.deletesiteName,
      }),
      url: "http://15.206.129.105:8080/ThroughBooksCOAPI/TimeZone/DeleteTimeZone",
      contentType: "application/json",
      dataType: 'json',
      success: function (data, textStatus, jqXHR) {

        console.log("DATA :", data);
        if (data.responseData == "Delete_Data") {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Successfully Removed The Site ' + self.state.siteName,
            showConfirmButton: false,
            timer: 2000
          })
        
        /*  var array = [...self.state.data]; // make a new copy of array instead of mutating the same array directly.
          array.splice(rowIndexValue, 1);

          self.state.data = [];
          self.state.data = array;
          self.setState({ data: array });
          */

          //localStorage.setItem('SiteDetails', (JSON.stringify(data.timeZoneAreaList)));
          localStorage.setItem('SiteDetails', CryptoJS.AES.encrypt(JSON.stringify(data.timeZoneAreaList), "shinchanbaby"));

          siteNameArray = [];

          if (data.timeZoneAreaList.length != 0) {
            $.each(data.timeZoneAreaList, function (i, item) {
              siteNameArray.push(item.siteName);
            });
          }



        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Location Cannot Be Deleted Since It Has Employee',
            showConfirmButton: false,
            timer: 2000
          })
        }

        
        if (data.timeZoneAreaList.length != 0) {

          self.state.data=[];
          $.each(data.timeZoneAreaList, function (i, item) {

            siteNameArray.push(item.siteName);
            ivalue = Number(i) + 1;

            if (i == 0) {

              self.state.data[i] = {
                "SNO": ivalue,
                "SiteName": item.siteName,
                "TimeZone": item.timeZone,
                "Area": item.area,
                "Location": item.location,
                "Full Address": item.mapLocation,
                "ZipCode": item.zipCode,
                "CurrencyCode":item.currencyCode,
                "DeActivate": "",
              }

            } else {
              self.state.data[i] = {
                "SNO": ivalue,
                "SiteName": item.siteName,
                "TimeZone": item.timeZone,
                "Area": item.area,
                "Location": item.location,
                "Full Address": item.mapLocation,
                "ZipCode": item.zipCode,
                "CurrencyCode":item.currencyCode,
                "DeActivate": < div class="updatedevice" id="updatedevice" style={{ textAlign: "center" }}><span style={{ fontSize: '1em', color: 'white' }}>
                  <i class="glyphicon glyphicon-trash" style={{
                    border: "none",
                    padding: "6px 7px 5px 7px",
                    fontSize: "1em",
                    color: "white",
                    borderRadius: "18px",
                    backgroundColor: "tomato"

                  }}>  </i>
                </span></div>


              }
            }
          });
        }

        if (self.state.data.length > 0) {
          self.state.columns = self.getColumns();
          console.log("SELF.STATE.DATA :", self.state.data);
          console.log("SELF.STATE.COLUMNS :", self.state.columns);
        }
        self.setState({
          data: self.state.data,
          columns: self.state.columns,
        });


      },
      error: function (data, textStatus, jqXHR) {

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



  handleUserInputCurrency = (e) => {

    var self = this;

    console.log("E VALUE :", e);

    this.state.currencyOption = e;
    this.setState({
      currencyOption: this.state.currencyOption,
    })
    var currentCurrencyFormatChosen = _.findWhere(currencies, { code: e.value });
    console.log("currentCurrencyFormatChosen :", currentCurrencyFormatChosen);

    this.state.currencyCode = e.value;
    this.SetCurrencyValue(currentCurrencyFormatChosen);


  }


  SetCurrencyValue(currentCurrencyFormatChosen) {


    this.state.infoCurrencyInputVal = 10000;
    var infoC_ForamatterVal = currencyFormatter.format(this.state.infoCurrencyInputVal, { code: currentCurrencyFormatChosen.code });

    console.log("currencyFormatter", currencyFormatter, currentCurrencyFormatChosen.code, infoC_ForamatterVal)

    this.state.infoCurrencyInputVal = this.state.infoCurrencyInputVal
    this.state.infoCurrencyCode = currentCurrencyFormatChosen.code
    this.state.infoCurrencySymbol = currentCurrencyFormatChosen.symbol
    this.state.infoC_ForamatterVal = infoC_ForamatterVal

    this.setState({
      infoCurrencyInputVal: this.state.infoCurrencyInputVal,
      infoCurrencyCode: this.state.infoCurrencyCode,
      infoCurrencySymbol: this.state.infoCurrencySymbol,
      infoC_ForamatterVal: this.state.infoC_ForamatterVal,

    })
  }

  render() {
    const { country, region } = this.state;
    return (

      <div className="container " id="containerbody" style={{
        marginBottom: "20%",

      }}>
        <div className="">
          <BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
        </div>
        <div className="inv_HeaderCls" id="containerbodyjumbo">
          <h3 style={{ textAlign: "center" }}>SITE LOCATION MANAGEMENT</h3>
        </div>
        <div className="">
          <div>

            <div className="row" style={{ padding: '10px 0px', marginTop: "2%" }}>
              <div id="sitenamediv" class="sitenameclass col-xs-12 col-md-4">
                <label for="class">Project Code /Site Name<span style={{ color: 'red' }}>*</span></label>
                <div >
                  <input
                    style={{ width: "100%" }}
                    className="form-control"
                    type="text" id="sitename" name="siteName"
                    value={this.state.siteName}
                    onChange={this.handleUserInput} />
                </div>
              </div>

              <div id="regiondiv" class="regionclass col-xs-12 col-md-4">
                <label for="class">Select Region<span style={{ color: 'red' }}>*</span></label>
                <div style={{ width: "100%" }} >
                  <SelectSearch options={this.state.options}
                    value={this.state.selectedRegion}
                    onChange={(e) => this.handleUserInputRegion(e)}
                    name="region" placeholder="Select Region " />
                </div>
              </div>

              <div id="timezonediv" class="timezoneclass col-xs-12 col-md-4">
                <label for="class">Select TimeZone<span style={{ color: 'red' }}>*</span></label>
                <div style={{ width: "100%" }}  >
                  <SelectSearch options={this.state.timeZoneOptions}
                    value={this.state.selectedTimeZone}
                    onChange={(e) => this.handleUserInputTimeZone(e)}
                    name="timeZone" placeholder="Select TimeZone " />
                </div>
              </div>


            </div>

            {/* row2 */}

            <div className="row" style={{ padding: '10px 0px' }}>
              <div id="locationdiv" class="locationclass col-xs-12 col-md-4">
                <label for="class">Location</label>
                <div >
                  <input
                    style={{ width: "100%" }}
                    className="form-control"
                    type="text" id="location" name="location"
                    value={this.state.location}
                    onChange={this.handleUserInput} />
                </div>
              </div>

              <div id="areadiv" class="areaclass col-xs-12 col-md-4">
                <label for="class">Area<span style={{ color: 'red' }}>*</span></label>
                <div >
                  <input
                    style={{ width: "100%" }}
                    className="form-control"
                    type="text" id="area" name="area"
                    value={this.state.area}
                    onChange={this.handleUserInput} />
                </div>
              </div>

              <div id="zipcodediv" class="zipcodeclass col-xs-12 col-md-4">
                <label for="class">ZipCode</label>
                <div >
                  <input
                    style={{ width: "100%" }}
                    className="form-control zipCode"
                    type="text" id="zipCode" name="zipCode"
                    value={this.state.zipCode}
                    onChange={this.handleUserInput}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

       {/* 
        <div className="row" style={{ padding: '10px 0px' }}>

          <div id="regiondiv" class="regionclass col-xs-12 col-md-4">
            <label for="class">Currency<span style={{ color: 'red' }}>*</span></label>
            <div style={{ width: "100%" }} >
              <SelectSearch options={this.state.currencyOptions}
                value={this.state.currencyOption}
                onChange={(e) => this.handleUserInputCurrency(e)}
                name="currency" placeholder="Select Currency " />
            </div>
          </div>

          <div class=" col-xs-12 col-md-4">

            <div className="currencyValCls info">
              <div className="currencyInfoDiv"><div className="currencyLbl"><label >Input Currency :</label>  </div>
              <div className="currencyInput"><input  value={this.state.infoCurrencyInputVal}></input></div>
              </div>
              <div className="currencyInfoDiv"><div className="currencyLbl"><label >Currency Code:</label>    </div>
              <div className="currencyInput"><input  value={this.state.infoCurrencyCode}></input></div>
              </div>
              <div className="currencyInfoDiv"><div className="currencyLbl"><label >Currency Symbol: </label> </div>
              <div className="currencyInput"><input  value={this.state.infoCurrencySymbol}></input></div>
              </div>
              <div className="currencyInfoDiv"><div className="currencyLbl"><label >Currency Format: </label> </div>
              <div className="currencyInput"><input  value={this.state.infoC_ForamatterVal}></input></div>
              </div>
            </div>
          </div>

        </div>

*/}


        <br />
        <button type="button" id="addrow"
          onClick={() => this.AddLocation()} class="btn btn-primary">Add</button>

        <br />
        <br />



        {/*   <button type="button" id="addrow"
          onClick={() => this.DeleteSelected()} class="btn btn-primary">Delete selected</button>
          */}



        <div style={{ marginBottom: "3%", display: "grid" }}>

          <ReactTable
            id="reportTable"
            data={this.state.data}
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
            showPaginationTop={false}
            showPaginationBottom={true}
            getTdProps={this.onRowClick}
          />


        </div>

      </div>

    );


  }

}
export default LocationPage;