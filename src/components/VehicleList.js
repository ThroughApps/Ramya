
import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import VendorEntryForm from './VendorEntryForm';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
  GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import DashboardOverall from './MaincontentDashboard/DashboardOverall';

import FooterText from './FooterText';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import "./DownloadButton.css";
import "./MainPageRedirectButton.css";
import CustomerListView from './CustomerListView';
import VehicleListView from './VehicleListView';

import AddVehicle from './AddVehicle';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import VehicleComponent from './ServiceRegistration/VehicleComponent';
//import { GetEmployeeSite, GetCurrentSite } from './ConstSiteFunction';
import SelectSearch from 'react-select';
import { SiteDropDown, FilterOptions } from './SiteDropDown';
import {VehicleIcons, Invoice_xlDownldBtn} from './ServiceRegistration/IconComponents';
import ReactTooltip from 'react-tooltip';
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';



var currentRow;
var i = 1;
var dataList = [];
class VehicleList1 extends Component {
  constructor(data) {
    super(data)
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    this.state = {
      staffId: staffId,
      employeeName: employeeName,
      role: role,
      contactNo: '',
      columns: [],
      dataList: [],
      isVehiclePaneOpen: false,
      site: GetCurrentSite()
    }
    this.SubmitVehicleInfoSlide = this.SubmitVehicleInfoSlide.bind(this);

    this.AddVehicle=this.AddVehicle.bind(this);
    this.ViewVehicle = this.ViewVehicle.bind(this);
    this.DeleteVehicle=this.DeleteVehicle.bind(this);
    this.EditVehicle = this.EditVehicle.bind(this);
    this.DownloadVehicle=this.DownloadVehicle.bind(this);


  }
  componentDidMount() {
    SetCurrentPage("VehicleList");

    $("#nodata").hide();
    $("#tableOverflow1").hide();
    this.GetData();
    window.scrollTo(0, 0);

  }
  GetData() {
    $("ReactHTMLTableToExcel").css("background-color", "#05a4b5");
    $(".btn-default").css("background-color", "#05a4b5");
    $("ReactHTMLTableToExcel").css("color", "white");
    $(".btn-default").css("color", "white");
    var self = this;
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
        empSites: GetEmployeeSite(),
      }),
      contentType: "application/json",
      dataType: 'json',
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/master/vehiclereport",
      async: false,
      crossDomain: true,
      success: function (data, textStatus, jqXHR) {
        dataList = data.vehicleRetrievelist;
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

  GetColumns() {

    return Object.keys(this.state.dataList[0]).map(key => {


      if (
        key != "EngineNumber" &&
        key != "ModelYear" &&
        key != "ChasisNumber" &&
        key != "ReferenceNumber" &&
        key != "RegisteredDate" &&
        key != "OdometerReading" &&
        key != "Color" &&
        key != "KeyNumber" &&
        key != "VehicleId"
      ) {
        return {
          Header: key,
          accessor: key,
          //  show: false
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
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={DashboardOverall} />


        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
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






          var vehicleRegistrationNo = rowInfo.original["Vehicle Registration No"];
          var brand = rowInfo.original["Brand"];
          var modelName = rowInfo.original["Model Name"];
          var fuelType = rowInfo.original["FuelType"];
          var engineNumber = rowInfo.original["EngineNumber"];
          var modelYear = rowInfo.original["ModelYear"];
          var chasisNumber = rowInfo.original["ChasisNumber"];
          var referenceNumber = rowInfo.original["ReferenceNumber"];
          var odometerReading = rowInfo.original["OdometerReading"];
          var color = rowInfo.original["Color"];
          var keyNumber = rowInfo.original["KeyNumber"];
          var vehicleId = rowInfo.original["VehicleId"];
          var registeredDate = rowInfo.original["RegisteredDate"];

          this.state.vehicleRegistrationNo = vehicleRegistrationNo;
          this.state.brand = brand;
          this.state.modelName = modelName;
          this.state.fuelType = fuelType;
          this.state.engineNumber = engineNumber;
          this.state.modelYear = modelYear;
          this.state.chasisNumber = chasisNumber;
          this.state.referenceNumber = referenceNumber;
          this.state.odometerReading = odometerReading;
          this.state.color = color;
          this.state.keyNumber = keyNumber;
          this.state.registeredDate = registeredDate;
          this.state.vehicleId = vehicleId;

          this.setState({
            vehicleRegistrationNo: this.state.vehicleRegistrationNo,
            brand: this.state.brand,
            modelName: this.state.modelName,
            fuelType: this.state.fuelType,
            engineNumber: this.state.engineNumber,
            modelYear: this.state.modelYear,
            chasisNumber: this.state.chasisNumber,
            referenceNumber: this.state.referenceNumber,
            odometerReading: this.state.odometerReading,
            color: this.state.color,
            keyNumber: this.state.keyNumber,
            vehicleId: this.state.vehicleId,
            registeredDate: this.state.registeredDate,


          });

          this.state.rowIndexValue = rowInfo.index;
        },
        style: {
          background: rowInfo.index === this.state.selected ? '#00afec' : '',
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



  Delete(rowIndexValue) {
    var self = this;

    $.ajax({
      type: 'POST',
      data: JSON.stringify({

        companyId: self.state.companyId,
        staffId: this.state.staffId,
        employeeName: this.state.employeeName,
        role: this.state.role,


        vehicleId: self.state.vehicleId,


      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/master/deleteVehicle",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {

        var array = [...self.state.dataList]; // make a new copy of array instead of mutating the same array directly.
        array.splice(rowIndexValue, 1);
        self.state.dataList = [];
        self.state.dataList = array;
        dataList = array;
        self.setState({ dataList: array });

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

  NoAction() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={VehicleList1} />
        </div>
      </Router>,
      document.getElementById('contentRender'));

  }

  AddVehicleSlidePane() {

    this.state.isVehiclePaneOpen = true;
    this.state.stateData = "";

    this.setState({
      isVehiclePaneOpen: this.state.isVehiclePaneOpen,
      stateData: this.state.stateData
    })
  }

  CloseVehicleSlide() {
    this.state.isVehiclePaneOpen = false;
    this.state.stateData = "";

    this.setState({
      isVehiclePaneOpen: this.state.isVehiclePaneOpen,
      stateData: this.state.stateData
    })
  }

  CloseCancelVehicleSlide = () => {

    var self = this;
    self.state.isVehiclePaneOpen = false;
    self.state.stateData = "";
    self.setState({
      isVehiclePaneOpen: self.state.isVehiclePaneOpen,
      stateData: self.state.stateData
    })
  }

  SubmitVehicleInfoSlide(stateData) {
    console.log("SubmitVehicleInfoSlide stateData :", stateData);
    dataList = stateData.vehicleList;
    this.handleSite(this.state.site);
    /*  var self = this;
     self.state.dataList = [];
     if (stateData.vehicleList.length != 0) {
       $("#tableHeadings").empty();
       var tab = '<thead><tr class="headcolor"><th>Vehicle RegistrationNo</th>'
         + '<th>ModelYear</th><th>Brand</th><th>ChasisNumber</th><th>ReferenceNumber</th>'
         + '<th>FuelType</th><th>EngineNumber</th><th>RegisteredDate</th>'
         + '<th>OdometerReading</th><th>Color</th><th>KeyNumber</th>'
         + '<th>ModelName</th><th>Notes</th>'
         + '</tr></thead>';
 
       var no;
       $.each(stateData.vehicleList, function (i, item) {
         no = parseInt(i) + 1;
         tab += '<tbody id= "myTable" ><tr  id="tabletextcol" >'
           + '<td>' + item.vehicleRegNo + '</td>'
           + '<td>' + item.modelYear + '</td>'
           + '<td>' + item.vehicleMake + '</td>'
           + '<td>' + item.chasisNumber + '</td>'
           + '<td>' + item.referenceNumber + '</td>'
           + '<td>' + item.vehicleFuelType + '</td>'
           + '<td>' + item.engineNumber + '</td>'
           + '<td>' + item.registeredDate + '</td>'
           + '<td>' + item.odometerReading + '</td>'
           + '<td>' + item.color + '</td>'
           + '<td>' + item.keyNumber + '</td>'
 
           + '<td>' + item.vehicleModel + '</td>'
 
           + '</tr></tbody>';
 
         self.state.dataList[i] = {
 
           "Vehicle Registration No": item.vehicleRegNo,
           "Brand": item.vehicleMake,
           "Model Name": item.vehicleModel,
           "FuelType": item.vehicleFuelType,
           "EngineNumber": item.engineNumber,
           "ModelYear": item.modelYear,
           "ChasisNumber": item.chasisNumber,
           "ReferenceNumber": item.referenceNumber,
           "RegisteredDate": item.registeredDate,
           "OdometerReading": item.odometerReading,
           "Color": item.color,
           "KeyNumber": item.keyNumber,
           "VehicleId": item.vehicleId,
 
 
 
 
         };
 
       });
       $("#tableHeadings").append(tab);
       // self.state.columns = self.GetColumns();
       if (self.state.dataList.length > 0) {
         self.state.columns = self.GetColumns();
       }
 
     } */


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
    $("#tableHeadings").empty();
    if (result.length != 0) {

      var tab = '<thead><tr class="headcolor"><th>Vehicle RegistrationNo</th>'
        + '<th>ModelYear</th><th>Brand</th><th>ChasisNumber</th><th>ReferenceNumber</th>'
        + '<th>FuelType</th><th>EngineNumber</th><th>RegisteredDate</th>'
        + '<th>OdometerReading</th><th>Color</th><th>KeyNumber</th>'
        + '<th>ModelName</th>'
        + '</tr></thead>';

      $.each(result, function (i, item) {
        no = parseInt(i) + 1;
        if (item.brand !== undefined) {
          tab += '<tbody id= "myTable" ><tr  id="tabletextcol" >'
            + '<td>' + item.vehicleRegistrationNo + '</td>'
            + '<td>' + item.modelYear + '</td>'
            + '<td>' + item.brand + '</td>'
            + '<td>' + item.chasisNumber + '</td>'
            + '<td>' + item.referenceNumber + '</td>'
            + '<td>' + item.fuelType + '</td>'
            + '<td>' + item.engineNumber + '</td>'
            + '<td>' + item.registeredDate + '</td>'
            + '<td>' + item.odometerReading + '</td>'
            + '<td>' + item.color + '</td>'
            + '<td>' + item.keyNumber + '</td>'
            + '<td>' + item.modelName + '</td>'
            + '</tr></tbody>';

          self.state.dataList[i] = {

            "Vehicle Registration No": item.vehicleRegistrationNo,
            "Brand": item.brand,
            "Model Name": item.modelName,
            "FuelType": item.fuelType,
            "EngineNumber": item.engineNumber,
            "ModelYear": item.modelYear,
            "ChasisNumber": item.chasisNumber,
            "ReferenceNumber": item.referenceNumber,
            "RegisteredDate": item.registeredDate,
            "OdometerReading": item.odometerReading,
            "Color": item.color,
            "KeyNumber": item.keyNumber,
            "VehicleId": item.vehicleId,
            "Site":item.site,  
          };
        } else {
          tab += '<tbody id= "myTable" ><tr  id="tabletextcol" >'
            + '<td>' + item.vehicleRegNo + '</td>'
            + '<td>' + item.modelYear + '</td>'
            + '<td>' + item.vehicleMake + '</td>'
            + '<td>' + item.chasisNumber + '</td>'
            + '<td>' + item.referenceNumber + '</td>'
            + '<td>' + item.vehicleFuelType + '</td>'
            + '<td>' + item.engineNumber + '</td>'
            + '<td>' + item.registeredDate + '</td>'
            + '<td>' + item.odometerReading + '</td>'
            + '<td>' + item.color + '</td>'
            + '<td>' + item.keyNumber + '</td>'

            + '<td>' + item.vehicleModel + '</td>'

            + '</tr></tbody>';

          self.state.dataList[i] = {

            "Vehicle Registration No": item.vehicleRegNo,
            "Brand": item.vehicleMake,
            "Model Name": item.vehicleModel,
            "FuelType": item.vehicleFuelType,
            "EngineNumber": item.engineNumber,
            "ModelYear": item.modelYear,
            "ChasisNumber": item.chasisNumber,
            "ReferenceNumber": item.referenceNumber,
            "RegisteredDate": item.registeredDate,
            "OdometerReading": item.odometerReading,
            "Color": item.color,
            "KeyNumber": item.keyNumber,
            "VehicleId": item.vehicleId,
            "Site":item.site,  
          };
        }
      });

      $("#tableHeadings").append(tab);
      // self.state.columns = self.GetColumns();
      if (self.state.dataList.length > 0) {
        self.state.columns = self.GetColumns();
      }
    } else {
      $("#nodata").show();

    }
    self.setState({
      dataList: self.state.dataList,
      columns: self.state.columns
    });
    console.log("after drop down ", self.state.dataList);
  }

  /* ************ NEW ICON FUNCTIONS ********* */
AddVehicle(){

  var self=this;
    self.AddVehicleSlidePane();
}

ViewVehicle(){
  var self = this;

    if (this.state.vehicleId === undefined) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select Vehicle ',

      })
    } else {

      ReactDOM.render(
        <Router>
          <div>

            <Route path="/" component={() => <VehicleListView vehicleRegistrationNo={this.state.vehicleRegistrationNo} brand={this.state.brand} modelName={this.state.modelName}
              fuelType={this.state.fuelType} engineNumber={this.state.engineNumber}
              modelYear={this.state.modelYear} chasisNumber={this.state.chasisNumber} referenceNumber={this.state.referenceNumber}
              odometerReading={this.state.odometerReading} color={this.state.color} keyNumber={this.state.keyNumber}

              vehicleId={this.state.vehicleId} registeredDate={this.state.registeredDate}
            />} />

          </div>
        </Router>,
        document.getElementById('contentRender'));
    }
}

EditVehicle(){
  var self = this;

  if (this.state.vehicleId === undefined) {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Kindly, Select Vehicle ',

    })
  } else {

    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={() => <AddVehicle vehicleRegistrationNo={this.state.vehicleRegistrationNo} brand={this.state.brand} modelName={this.state.modelName}
            fuelType={this.state.fuelType} engineNumber={this.state.engineNumber}
            modelYear={this.state.modelYear} chasisNumber={this.state.chasisNumber} referenceNumber={this.state.referenceNumber}
            odometerReading={this.state.odometerReading} color={this.state.color} keyNumber={this.state.keyNumber}

            vehicleId={this.state.vehicleId} registeredDate={this.state.registeredDate}
          />} />

        </div>
      </Router>,
      document.getElementById('contentRender'));
  }
}

DeleteVehicle(){
  var self = this;

  if (this.state.vehicleId === undefined) {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Kindly, Select Vehicle ',

    })
  } else {
    if (this.state.vehicleId != "") {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Do you Want to Delete ' + self.state.vehicleRegistrationNo,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
        //   timer: 1500
      }).then((result) => {
        if (result.value) {
          self.Delete(this.state.rowIndexValue)

          // For more information about handling dismissals please visit
          // https://sweetalert2.github.io/#handling-dismissals
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Cancelled Deletion Of ' + self.state.vehicleRegistrationNo,
            showConfirmButton: false,
            timer: 2000,
          })
        }
      })
    }
  }
}

DownloadVehicle(){

}








  render() {
    //const  downloadButtonData=<span style={{width:"80px"}} class="glyphicon glyphicon-download-alt" ><span style={{fontFamily:"Roboto, sans-serif"}}>&nbsp;Download</span></span>

   // const downloadButtonData = <i style={{ color: "black" }} class="glyphicon glyphicon-download-alt" ></i>
   const downloadButtonData = <Invoice_xlDownldBtn/>;      
    return (

      <div className="container" style={{ paddingTop: "0px" }}>
       
        <div className="">
            <div className="">
              <BackButtonComponent name={"Dashboard"}click={()=>this.BackbtnFunc()} />
                  </div>
            <div className="inv_HeaderCls">
              <h3>Vehicle List</h3>
            </div>
          </div>

  <div className="inv_list_cls">

<div className="inv_list_cls_sel_search">
<SiteDropDown onSiteDropDown={this.handleSite} data={this.state.site} />
</div>

<div className="inv_list_cls_Dwn_Btn" data-tip data-for="downloadInvoiceTip">

      <ReactHTMLTableToExcel
                          id="test-table-xls-button"
                          className="download-table-xls-button "

                          table="tableHeadings"
                          filename="Vehicle_List"
                          sheet="tablexls"
                          buttonText={downloadButtonData}
                        />
    </div>
</div>



          
  
     <div className="reactIcon_Dcls">

<VehicleIcons  ondAddVehicle={this.AddVehicle} onViewVehicle={this.ViewVehicle} 
    onEditVehicle={this.EditVehicle} DeleteVehicle={this.DeleteVehicle}
    onDownload={this.DownloadVehicle} />
    </div>

              <div id="tableOverflow1">
                <table style={{ margin: "auto" }} class="table table-bordered" id="tableHeadings">
                </table>
              </div>

              <div id="tableOverflow" class="hideContent" style={{ marginBottom: "2%" }}>

                <ReactTable style={{ overflow: "auto", marginBottom: "5%" }}
                  data={this.state.dataList}
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
                  showPaginationTop={true}
                  showPaginationBottom={false}
                  // getTdProps={this.onRowClick}
                  getTrProps={this.onTrRowClick}
                />
              </div>
        


     
        <SlidingPane
          className="some-custom-class"
          overlayClassName="some-custom-overlay-class"
          isOpen={this.state.isVehiclePaneOpen}
          title={"Vehicle Info"}
          subtitle="Can Add Vehicle Info with Customer Here"
          onRequestClose={() => {
            // triggered on "<" on left top click or on outside click
            // setState({ isPaneOpen: false });
            this.CloseVehicleSlide()
          }}
        >
          {/* {this.RenderUpdateComponenets(this.state.taskSelected)} */}
          <VehicleComponent stateData={this.state.stateData} SubmitClicked={this.SubmitVehicleInfoSlide} CancelClicked={this.CloseCancelVehicleSlide} />
        </SlidingPane>
      </div>
    );
  }

}

export default VehicleList1;