import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import VendorEntryForm from './VendorEntryForm';
import CustomerList from './CustomerList';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { FormErrors } from './FormErrors';
import Expense from './Expense';
import AddCategory from './AddCategory';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import FooterText from './FooterText';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ReactTableCSS.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import './DownloadButton.css';
import Case from 'case';
import "./MainPageRedirectButton.css";
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
import { SiteDropDown, FilterOptions } from './SiteDropDown';
import { Delete_DownloadIcons, Invoice_xlDownldBtn } from './ServiceRegistration/IconComponents';
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';


var dataList = [];
class AddUser1 extends Component {
  constructor() {
    super()
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var staffId = CryptoJS.AES.decrypt(localStorage.getItem('staffId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeName = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var role = CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)


    this.state = {
      userName: '',
      contactNo: '',
      description: '',
      companyId: companyId,
      staffId: staffId,
      employeeName: employeeName,
      role: role,
      formErrors: {
        userName: '',
        contactNo: '',

      },
      userNameValid: false,
      contactNoValid: false,
      data: [],
      columns: [],
      site: GetCurrentSite(),
    }

    this.DeleteUser = this.DeleteUser.bind(this);

  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let userNameValid = this.state.userNameValid;
    let contactNoValid = this.state.contactNoValid;



    switch (fieldName) {
      case 'userName':
        userNameValid = value.length >= 2;
        fieldValidationErrors.UserName = userNameValid ? '' : ' is InCorrect';
        break;
      case 'contactNo':
        contactNoValid = value.match(/^[0-9]{10}$/);
        fieldValidationErrors.ContactNo = contactNoValid ? '' : ' is InCorrect';
        break;


      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      userNameValid: userNameValid,
      contactNoValid: contactNoValid,

    }, this.validateForm);
  }
  validateForm() {

    this.setState({
      formValid:
        this.state.userNameValid
        && this.state.contactNoValid


    });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }
  AddUserFunc() {
    var self = this;

    if (this.state.userName.trim().length > 0 && this.state.contactNo.trim().length > 0) {
      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          userName: Case.capital(this.state.userName),
          contactNo: this.state.contactNo,
          description: this.state.description,
          companyId: this.state.companyId,
          staffId: this.state.staffId,
          employeeName: this.state.employeeName,
          role: this.state.role,
          site: GetCurrentSite(),

        }),
        url: " http://15.206.129.105:8080/ThroughBooksCOAPI/expense/adduser",
        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
          if (data.contactNo == "Mobile") {

            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'The Mobile No  Already Exists',
              showConfirmButton: false,
              timer: 2000
            })


          } else {
            var Userlist = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('UserList'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
            Userlist.push({ userName: self.state.userName });
            localStorage.setItem('UserList', CryptoJS.AES.encrypt(JSON.stringify(Userlist), "shinchanbaby"));


            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Successfully Added user ',
              showConfirmButton: false,
              timer: 2000
            })

            ReactDOM.render(
              <Router >
                <div>
                  <Route path="/" component={AddUser1} />
                </div>
              </Router>, document.getElementById('contentRender'));
            self.state.userName = "";
            self.state.contactNo = "";
            self.state.description = "";
            self.state.formValid = false;
            self.setState({
              userName: '',
              contactNo: '',
              description: '',
              formValid: false,
            })

          }
          $("#tableHeadings").empty();
          self.Initialize();
          $("#nodata").hide();



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
    else {

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Enter User Name and Contact No',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }
  Initialize() {
    var self = this;
    $("#nodata").hide();

    self.state.data = [];
    self.setState({
      data: self.state.data,
    })

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        companyId: this.state.companyId,
        empSites: GetEmployeeSite(),
      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/expense/userreport",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {
        dataList = data.userRetrievelist;
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

    return Object.keys(this.state.data[0]).map(key => {
      if (
        key != "ExpenseId"

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


  DeleteFunc(rowIndexValue) {
    var self = this;

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        userName: self.state.userName,
        companyId: this.state.companyId,

        staffId: self.state.staffId,
        employeeName: self.state.employeeName,
        role: self.state.role,


      }),
      url: " http://15.206.129.105:8080/ThroughBooksCOAPI/expense/deleteuser",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {

        var array = [...self.state.data]; // make a new copy of array instead of mutating the same array directly.
        array.splice(rowIndexValue, 1);

        self.state.data = [];
        self.state.data = array;
        self.setState({ data: array });

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
  componentDidMount() {
    SetCurrentPage("AddUser");
    var self = this;
    window.scrollTo(0, 0);
    $("#nodata").hide();
    $("#tableHeadings").hide();
    this.Initialize();
    $(".btn-default").css("background-color", "#05a4b5");
    $(".btn-default").css("color", "white");

    $('#CategoryDate').datepicker({
      onSelect: function (date) {
        var dt = new Date(date);
        self.setState({
          date: date,
          dateValid: true,
        });

      },

      dateFormat: 'yy/mm/dd',
      minDate: '-3M',
      maxDate: '-1D',
      numberOfMonths: 1
    });
  }
  NoAction() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={AddUser1} />
        </div>
      </Router>,
      document.getElementById('contentRender'));

  }
  Expense() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={Expense} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
  }
  AddCategory() {

    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={AddCategory} />
        </div>
      </Router>,
      document.getElementById('contentRender'));
  }
  AddUser() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={AddUser1} />
        </div>
      </Router>,
      document.getElementById('contentRender'));

  }

  cancelFunc() {

    ReactDOM.render(<AddUser1 />, document.getElementById("contentRender"));
  }
  BackbtnFunc() {

    if ((this.state.userName.length == 0)) {

      this.setState({
        userNameValid: false,
      })
    }
    if ((this.state.contactNo.length == 0)) {

      this.setState({
        contactNoValid: false,
      })
    }
    if ((this.state.userName.length == 0) && (this.state.contactNo.length == 0) && (this.state.description.length == 0)) {
      ReactDOM.render(
        <Router>
          <div>

            <Route path="/" component={DashboardOverall} />


          </div>
        </Router>,
        document.getElementById('contentRender'));
      registerServiceWorker();
    } else {
      confirmAlert({
        title: "Confirmation", // Title dialog
        message: "Unsaved changes are there. Do you really want to go back?", // Message dialog
        buttons: [
          {
            label: 'Confirm',
            onClick: () => this.ConfirmBack()
          },
          {
            label: 'Cancel',
            onClick: () => this.CancelBack()
          }
        ]
      });
    }

  }
  ConfirmBack() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={DashboardOverall} />


        </div>
      </Router>,
      document.getElementById('contentRender'));
    registerServiceWorker();
  }
  CancelBack() { }


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



          self.state.userName = rowInfo.original["User Name"];


          self.setState({
            userName: self.state.userName,

          })
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
    self.state.data = [];
    var no;

    if (result.length != 0) {
      var tab = '<thead><tr class="headcolor"><th>S.No</th><th>UserName</th><th>Contact</th><th>Description</th></tr></thead>';
      $.each(result, function (i, item) {
        no = parseInt(i) + 1;
        tab += '<tbody id= "myTable" ><tr id="tabletextcol" ><td>' + no + '</td><td>' + item.userName + '</td>'
          + '<td>' + item.contactNo + '</td><td>' + item.description + '</td></tr></tbody>';

        self.state.data[i] = {
          "SNo": no,
          "User Name": item.userName,
          "Contact": item.contactNo,
          "Description": item.description,
          "Site": item.site,
        };

      });
      $("#tableHeadings").append(tab);
      self.state.columns = self.GetColumns();

    }
    else {
      $("#nodata").show();
      $("#test-table-xls-button").hide();
      $("#myInput").hide();
    }
    self.setState({
      data: self.state.data,
      columns: self.state.columns
    });
  }

  /* ********** NEW ICON FUNCTION *************8 */
  DeleteUser() {
    var self = this;

    if (this.state.userName === undefined) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Kindly, Select User ',

      })
    } else {
      if (this.state.userName != "") {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Do you Want to Delete ' + self.state.userName,
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
          //   timer: 1500
        }).then((result) => {
          if (result.value) {
            self.DeleteFunc(this.state.rowIndexValue)

            // For more information about handling dismissals please visit
            // https://sweetalert2.github.io/#handling-dismissals
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Cancelled Deletion Of ' + self.state.userName,
              showConfirmButton: false,
              timer: 2000,
            })
          }
        })
      }
    }
  }
  render() {
    //  const downloadButtonData = <i style={{ color: "black" }} class="glyphicon glyphicon-download-alt" ></i>
    const downloadButtonData = <Invoice_xlDownldBtn />;
    return (
      <div class="container" style={{ marginBottom: "50px" }}>
        <div className="">
          <div className="">
            <BackButtonComponent name={"Dashboard"} click={() => this.BackbtnFunc()} />
          </div>
          <div className="inv_HeaderCls">
            {/* <h3>Vendor List</h3> */}
          </div>
        </div>
        <ul class="nav nav-tabs">
          <li><a style={{ color: "black", fontWeight: "bold" }} className="active" onClick={() => this.Expense()}><span style={{ display: "inline-grid" }}>Expense</span></a></li>
          <li><a style={{ color: "black", fontWeight: "bold" }} onClick={() => this.AddCategory()}><span style={{ display: "inline-grid" }}>Add Category</span></a></li>
          <li class="active"><a style={{ color: "black", fontWeight: "bold" }} onClick={() => this.AddUser()}><span style={{ display: "inline-grid" }}>Add User</span></a></li>
        </ul>
        <div class="card">
          <div class="card-header" style={{ backgroundColor: "" }}>
            <h3>Add User</h3>
          </div>
          <div class="card-body">
            <div className="panel panel-default">
              <FormErrors formErrors={this.state.formErrors} />
            </div>
            <form class="form-horizontal form-bordered" action="/action_page.php">
              <div className={`form-group ${this.errorClass(this.state.formErrors.userName)}`}>
                <label class="control-label col-sm-2" for="userName">User Name<span style={{ color: "red" }}>*</span></label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" value={this.state.userName} onChange={this.handleUserInput} name="userName" id="userName" placeholder="User Name" />
                </div>
              </div>
              <div className={`form-group ${this.errorClass(this.state.formErrors.contactNo)}`}>
                <label class="control-label col-sm-2" for="contactNo"> Contact no.<span style={{ color: "red" }}>*</span></label>
                <div class="col-sm-10">
                  <input type="number" class="form-control" maxlength="10" name="contactNo" value={this.state.contactNo} onChange={this.handleUserInput} id="contactNo" placeholder="Contact no" />
                </div>
              </div>
              <div className="form-group">
                <label class="control-label col-sm-2" for="description">description</label>
                <div class="col-sm-10">
                  <textarea rows="2" cols="20" class="form-control" value={this.state.description} onChange={this.handleUserInput} name="description" id="description" > </textarea>
                </div>
              </div>
              <div class="form-group">
                <div class="row" style={{ marginLeft: "3px" }}>
                  <div class="col-sm-offset-2 col-sm-10">
                    <button type="button" disabled={!this.state.formValid} style={{ fontWeight: "bold" }} onClick={() => this.AddUserFunc()} class="btn btn-default">Submit</button> <span></span>
                    <button type="button" style={{ fontWeight: "bold" }} onClick={() => this.cancelFunc()} class="btn btn-default">Clear</button>
                  </div>
                </div>
              </div>
            </form></div>
          <div className="inv_HeaderCls">
            <h3>User List</h3>
          </div>
          <div className="inv_list_cls">
            <div className="inv_list_cls_sel_search">
              <SiteDropDown onSiteDropDown={this.handleSite} data={this.state.site} />
            </div>
          </div>
          <div className="reactIcon_Dcls">
            <Delete_DownloadIcons onDelete={this.DeleteUser}
              onDownload={this.DownLoadExpenseList} />
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button "
              table="tableHeadings"
              filename="User_List"
              sheet="tablexls"
              buttonText={downloadButtonData}
            />
          </div>

          <ReactTable style={{ overflow: "auto", marginBottom: "3%" }}
            data={this.state.data}
            columns={this.state.columns}
            noDataText="No Data Available"
            filterable={false}
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
            getTrProps={this.onTrRowClick}
          />
          <div id="tableOverflow">
            <table style={{ margin: "auto", marginBottom: "5%" }} class="table table-bordered" id="tableHeadings">
            </table>
          </div>
        </div> </div>
    );
  }
}
export default AddUser1;