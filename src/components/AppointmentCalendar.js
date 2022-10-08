/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-unused-state */
import * as React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, DayView, IntegratedEditing, SelectOption  } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Toolbar,
  MonthView,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  EditRecurrenceMenu,
  AllDayPanel,
  DateNavigator ,
  TodayButton,
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider,KeyboardTimePicker,KeyboardDatePicker} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import LocationOn from '@material-ui/icons/LocationOn';
import Notes from '@material-ui/icons/Notes';
import Close from '@material-ui/icons/Close';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Create from '@material-ui/icons/Create';

//import { appointments } from '../../../demo-data/appointments';
import DashboardOverall from './MaincontentDashboard/DashboardOverall';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import $ from 'jquery';


import MoreIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Room from '@material-ui/icons/Room';
import classNames from 'clsx';
import { fade } from '@material-ui/core/styles/colorManipulator';
import _ from 'underscore';
import moment from 'moment';
import './AppointmentCalendar.css';
import { compareAsc, format,startOfWeek, endOfWeek } from 'date-fns'
//import './AddAppointment.css';
import Timekeeper from 'react-timekeeper';
import Select from 'react-select';
import {
  pink, purple, teal, amber, deepOrange,
} from '@material-ui/core/colors';

import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
import { BackButtonComponent } from './ServiceRegistration/ButtonComponent';


var updateArray=[];
var deleteArray=[];

var serviceArray=[];
var serviceListArray=[];
var appointmentArray=[];
var serviceTimeArray=[];

var  serviceArrayOptions=[];
var employeeArrayOptions=[];
var makeAppointmentData="";

var updateserviceListArray=[];
var updateserviceTimeArray=[];

const containerStyles = theme => ({
  container: {
    width: theme.spacing(68),
    padding: 0,
    paddingBottom: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  header: {
    overflow: 'hidden',
    paddingTop: theme.spacing(0.5),
  },
  closeButton: {
    float: 'right',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  picker: {
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0,
    },
    width: '50%',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 0),
  },
  icon: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2),
  },
  textField: {
    width: '100%',
  },
});


      var genderArray1=[];
      genderArray1.push({ label: 'Male', value: 'Male'});
      genderArray1.push({ label: 'Female', value: 'Female'});
      genderArray1.push({ label: 'Other', value: 'Other'});

      var appointmentModeArray1=[];
      appointmentModeArray1.push({ label: 'Call', value: 'Call'});
      appointmentModeArray1.push({ label: 'Message', value: 'Message'});
      appointmentModeArray1.push({ label: 'WalkIn', value: 'WalkIn'});
    


    
   
   

class AppointmentFormContainerBasic extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appointmentChanges: {},
     
    };

    this.getAppointmentData = () => {
  
      const { appointmentData } = this.props;
      return appointmentData;
    };
    this.getAppointmentChanges = () => {

      const { appointmentChanges } = this.state;
      return appointmentChanges;
    };

    this.changeAppointment = this.changeAppointment.bind(this);
    this.commitAppointment = this.commitAppointment.bind(this);
  }

  changeAppointment({ field, changes }) {
    const nextChanges = {
      ...this.getAppointmentChanges(),
      [field]: changes,
    };
    makeAppointmentData= nextChanges;
    this.setState({
      appointmentChanges: nextChanges,
    });


   



  }

  //FUNCTION CALLED WHEN CREATE BUTTON IS CLICKED FOR CREATING THE APPOINTMENT
  commitAppointment(type) {
    const { commitChanges } = this.props;
    const appointment = {
      ...this.getAppointmentData(),
      ...this.getAppointmentChanges(),
    };
    if (type === 'deleted') {
      commitChanges({ [type]: appointment.id });
    } else if (type === 'changed') {

      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {
      
      commitChanges({ [type]: appointment });
  
    }
    this.setState({
      appointmentChanges: {},
    });
  }

  render() {
    const {
      classes,
      visible,
      visibleChange,
      appointmentData,
      cancelAppointment,
      target,
      onHide,
    } = this.props;
    const { appointmentChanges } = this.state;

    const displayAppointmentData = {
      ...appointmentData,
      ...appointmentChanges,
    };

    const isNewAppointment = appointmentData.id === undefined;
    const applyChanges = isNewAppointment
      ? () => this.commitAppointment('added')
      : () => this.commitAppointment('changed');

      //FUNCTION  FOR ALL FIELDS IN FORMOVERLAY FOR CREATING THE APPOINTMENT
    const contactNoEditorProps = field => ({
      variant: 'outlined',
      onChange: ({ target: change }) => this.changeAppointment({
        field: [field], changes: change.value,
      }),
      value: displayAppointmentData[field] || '',
      label: field[0].toUpperCase() + field.slice(1),
      className: classes.textField,
    });

    const customerNameEditorProps = field => ({
      variant: 'outlined',
      onChange: ({ target: change }) => this.changeAppointment({
        field: [field], changes: change.value,
      }),
      value: displayAppointmentData[field] || '',
      label: field[0].toUpperCase() + field.slice(1),
      className: classes.textField,
    });

    const pickerEditorProps = field => ({

      className: classes.picker,
      ampm: false,
      value: displayAppointmentData[field],
      onChange: date => this.changeAppointment({
        field: [field], changes: date ? date.toDate() : new Date(displayAppointmentData[field]),
      }),
      
      inputVariant: 'outlined',
      format: 'YYYY-MM-DD',
      onError: () => null,
    });

    const pickerTimeEditorProps = field => ({
      className: classes.picker,
      ampm: false,
      value: displayAppointmentData[field],
      onChange: time => this.changeAppointment({
        field: [field],
        changes: time ? time :displayAppointmentData[field],
      }),
      inputVariant: 'outlined',
      format: 'HH:mm',
      onError: () => null,
    });
    
    const genderEditorProps = field => ({
      className: classes.picker,
      value: displayAppointmentData[field],
      onChange: gender => this.changeAppointment({
        field: [field],
        changes: gender ? gender :displayAppointmentData[field],
      }),
      onError: () => null,
    });

    const modeofAppointmentEditorProps = field => ({
      className: classes.picker,
      value: displayAppointmentData[field],
      onChange: modeofAppointment => this.changeAppointment({
        field: [field],
        changes: modeofAppointment ? modeofAppointment :displayAppointmentData[field],
      }),
      onError: () => null,
    });

    const serviceEditorProps = field => ({
      className: classes.picker,
      value: displayAppointmentData[field],
      onChange: service => this.changeAppointment({
        field: [field],
        changes: service ? service :displayAppointmentData[field],
      }),
      onError: () => null,
    });

    const employeeEditorProps = field => ({
      className: classes.picker,
      value: displayAppointmentData[field],
      onChange: employee => this.changeAppointment({
        field: [field],
        changes: employee ? employee :displayAppointmentData[field],
      }),
      onError: () => null,
    });


    

    const cancelChanges = () => {
      this.setState({
        appointmentChanges: {},
      });
      visibleChange();
      cancelAppointment();
    };

   

    return (
     
      <AppointmentForm.Overlay
        visible={visible}
        target={target}
        fullSize
        onHide={onHide}
      >
        <div>
          <div className={classes.header}>
            <IconButton
              className={classes.closeButton}
              onClick={cancelChanges}
            >
              <Close color="action" />
            </IconButton>
          </div>
          <div className={classes.content}>
            <div className={classes.wrapper}>
            {/*  <Create className={classes.icon} color="action" /> */}
              <label>Contact No</label>
              <TextField
                {...contactNoEditorProps('contactNo')}
              />
     
            </div>
            <div className={classes.wrapper}>
            {/*  <Create className={classes.icon} color="action" /> */}
              <label>Customer Name</label>
               <TextField
                {...customerNameEditorProps('customerName')}
              />
            </div>

            <div className={classes.wrapper}>
             {/* <CalendarToday className={classes.icon} color="action" /> */}
           
               <MuiPickersUtilsProvider utils={MomentUtils}>
               <label>Appointment Date</label>
       <KeyboardDateTimePicker  
           {...pickerEditorProps('startDate')}
           
        />
         <label>Appointment Time</label>
        <KeyboardDateTimePicker
            {...pickerTimeEditorProps('endDate')}
            
        />
        

        {/* <KeyboardDateTimePicker
                  label="End Date"
                  {...pickerEditorProps('endDate')}
                />
      */}
         </MuiPickersUtilsProvider>
    
            </div>
            <div></div>
            <label>Gender</label>
            <Select
              {...genderEditorProps('gender')}
             options={genderArray1}     
            />
            <label>Mode Of Appointment</label>
            <Select  
               {...modeofAppointmentEditorProps('modeofAppointment')}
             options={appointmentModeArray1}
            />
              <label>Service</label>
            <Select 
               {...serviceEditorProps('service')}
             options={serviceArrayOptions}
             isMulti={true}
            />
              <label>Employee</label>
            <Select  
               {...employeeEditorProps('employee')}
             options={employeeArrayOptions}
            />
    
      
          </div>
          <div className={classes.buttonGroup}>
            {!isNewAppointment && (
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={() => {
                  visibleChange();
                  this.commitAppointment('deleted');
                }}
              >
                Delete
              </Button>
            )}
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={() => {
                visibleChange();
                applyChanges();
              }}
            >
              {isNewAppointment ? 'Create' : 'Save'}
            </Button>
          </div>
        </div>
      </AppointmentForm.Overlay>
            
            
            



      
    );
  }
}

const AppointmentFormContainer = withStyles(containerStyles, { name: 'AppointmentFormContainer' })(AppointmentFormContainerBasic);

const styles = theme => ({
  addButton: {
    position: 'absolute',
    bottom: theme.spacing(1) * 3,
    right: theme.spacing(1) * 4,
  },
});





/*const Header = withStyles(style, { name: 'Header' })(({
  children, appointmentData, classes, ...restProps
}) => (
  <AppointmentTooltip.Header
    {...restProps}
    className={classNames(getClassByLocation(classes, appointmentData.id), classes.header)}
    appointmentData={appointmentData}
  >
  
    //<IconButton
    
   //   onClick={() => alert(JSON.stringify(appointmentData))}
   //   className={classes.commandButton}
  //  >
   //   <MoreIcon />
 //   </IconButton>
    
  </AppointmentTooltip.Header>
));
*/

const style = ({ palette }) => ({
  icon: {
    color: palette.action.active,
  },
  textCenter: {
    textAlign: 'center',
  },
  header: {
    height: '260px',
    backgroundSize: 'cover',
  },
  commandButton: {
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
});


const Content = withStyles(style, { name: 'Content' })(({
  children, appointmentData, classes, ...restProps

}) => (

  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
   <Grid container alignItems="center">
   <Grid item xs={2}>
        <Grid />
      </Grid>
      <Grid item xs={10}>
        <span class="makeStyles-title-613 makeStyles-dateAndTitle-619">{'ContactNo : '+appointmentData.ContactNo}</span>
      </Grid>
    </Grid>
    <Grid container alignItems="center">
    <Grid item xs={2} className={classes.textCenter}>
    <Grid />
      </Grid>
    <Grid item xs={10}>
        <span class="makeStyles-text-613 makeStyles-dateAndTitle-619">{'Service : '+appointmentData.Service}</span>
      </Grid>
    </Grid>
    <Grid container alignItems="center">
    <Grid item xs={2} className={classes.textCenter}>
    <Grid />
      </Grid>
      <Grid item xs={10}>
        <span class="makeStyles-title-613 makeStyles-dateAndTitle-619">{'Employee : '+appointmentData.Employee}</span>
      </Grid>
    </Grid>
  </AppointmentTooltip.Content>
));



//CLASS FOR GETTING THE FUNCTIONALITES GETTING DONE
class AppointmentToolTip extends React.PureComponent {
  constructor(props) {
    super(props);

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var today = new Date();
    // var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var date = today.getFullYear() + '-' + ('0'+(today.getMonth() + 1)).slice(-2) + '-' +('0'+ today.getDate()).slice(-2);
    var currentTime = today.getHours() + ":" + today.getMinutes() ;
      

    this.state = {
     // data: appointments,
       data:[],
       resourceData:[],
       resourcesInstance:[],
      currentDate:date,
      currentDateForAddAppointment:date,
      currentTime:currentTime,
      confirmationVisible: false,
      editingFormVisible: false,
      deletedAppointmentId: undefined,
      editingAppointment: undefined,
      previousAppointment: undefined,
      addedAppointment: {},
      startDayHour: 6,
      endDayHour: 23,
      isNewAppointment: false,
      companyId:companyId,
      appointmentId:'',
      date:date,
      time:currentTime,
   


     /* contactNo:'',
      customerName:'',
      gender:'',
      employee:'',
      modeofAppointment:'',
      appointmentDate:date,
      bookingDate:date,
      appointmentTime:currentTime,
      */

    };

    //CODE WORKING FOR DATE'S SWITCHING OPERATION
    this.currentDateChange = (currentDate) => { 


      /*PAST DATE VALIDATION*/
      var dateOpted=moment(currentDate).format('YYYY-MM-DD');
      this.state.dateOptedfromNavigator=dateOpted;
     

      var todayCurrentDate = Date.parse(this.state.date);
      var optedCurrentDate = Date.parse(dateOpted);

      if(optedCurrentDate<todayCurrentDate){
       Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Past Date Appointments Cannot Be Viewed',
          showConfirmButton: false,
          timer: 3000
        }) 

      }else{

        var fromDate = startOfWeek(new Date(dateOpted), { weekStartsOn: 0 });
        var toDate = endOfWeek(new Date(dateOpted), { weekEndsOn: 6 });
  
         this.state.fromDate = moment(fromDate).format('YYYY-MM-DD');
         this.state.toDate = moment(toDate).format('YYYY-MM-DD');
  
      
  
        var fromParseDate = Date.parse(this.state.fromDate );
         var toParseDate = Date.parse(this.state.toDate );
         var lastApointmentParseDate = Date.parse(this.state.lastAppointmentDate);

         if(lastApointmentParseDate>fromParseDate  || lastApointmentParseDate==fromParseDate  ){
          this.setState({ currentDate }); 

          this.GetFutureAppointmentsData();

         }else{
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'No Appoinment In Future. Your Last Appointment Date Is '+this.state.lastAppointmentDate,
            showConfirmButton: false,
            timer: 3000
          })
         }

      }

  };


    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(this);

    this.commitChanges = this.commitChanges.bind(this);
    this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(this);
    this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
    this.appointmentForm = connectProps(AppointmentFormContainer, () => {
      const {
        editingFormVisible,
        editingAppointment,
        data,
        addedAppointment,
        isNewAppointment,
        previousAppointment,
      } = this.state;

      const currentAppointment = data
        .filter(appointment => editingAppointment && appointment.id === editingAppointment.id)[0]
        || addedAppointment;
      const cancelAppointment = () => {
        if (isNewAppointment) {
          this.setState({
            editingAppointment: previousAppointment,
            isNewAppointment: false,
          });
        }
      };

      return {
        visible: editingFormVisible,
        appointmentData: currentAppointment,
        commitChanges: this.commitChanges,
        visibleChange: this.toggleEditingFormVisibility,
        onEditingAppointmentChange: this.onEditingAppointmentChange,
        cancelAppointment,
      };

    
      
    });
  }

//CALLED WHEN ANY CHANGE OPERATION IN THE PAGE IS DONE
   componentDidUpdate() {


   // this.state.editingFormVisible=false;
    //this.setState({editingFormVisible:false, isNewAppointment: false })

    this.appointmentForm.update();
  } 
 
  componentDidMount(){
SetCurrentPage("AppointmentCalendar");
    var self=this;
    $(".btn-default").css("background-color","#05a4b5");
    $(".btn-default").css("color","white");
    //CODE FOR GETTING CURRENT WEEK FROM & TODATE
  //  var fromDate = startOfWeek(new Date(this.state.currentDate), { weekStartsOn: 0 });
    this.state.dateOptedfromNavigator=this.state.currentDate;

    var toDate = endOfWeek(new Date(this.state.currentDate), { weekEndsOn: 6 });

     this.state.fromDate =this.state.currentDate;
     this.state.toDate = moment(toDate).format('YYYY-MM-DD');

    this.GetFutureAppointmentsData();

    this.GetSaloonDetails();

   
      var appointmentModeArray=[];
      appointmentModeArray.push({ label: 'Call', value: 'Call'});
      appointmentModeArray.push({ label: 'Message', value: 'Message'});

      this.state.appointmodeOptions=appointmentModeArray;
      this.setState({
        appointmodeOptions:this.state.appointmodeOptions
      })


      $('#modalappointmentdate').datepicker({

        onSelect: function (date) {
  
          var dt = new Date(date);
          self.state.modalappointmentDate=date;

          self.setState({
            modalappointmentDate: self.state.modalappointmentDate,
          });
     },
  
        dateFormat: 'yy-mm-dd',
        minDate: '0',
        maxDate: '1M',
        numberOfMonths: 1
      });


  }


//FUNCTION CALL WHEN UPDATE OPTION IS USED FROM THE TOOL TIP
  onEditingAppointmentChange(editingAppointment) {

    var self=this;
    if(editingAppointment!=undefined){
      this.setState({ editingAppointment });
   
      this.state.appointmentId=editingAppointment.id;

      this.state.editingFormVisible=false;
      this.setState({editingFormVisible:false, isNewAppointment: false })


      this.state.modalappointmentId=editingAppointment.id;
      this.state.modalmobileNo=editingAppointment.ContactNo;
      this.state.modalcustomerName=editingAppointment.title;
      this.state.modalappointmentDate=editingAppointment.startDate.split(" ")[0];
      this.state.modalappointmentTime=editingAppointment.startDate.split(" ")[1];

      var localServiceOptionOpted=editingAppointment.Service.split(",");
      var serviceOptionArray=[];
      var oldserviceOptionArray=[];
      
      $.each(localServiceOptionOpted, function (i, item) {
        serviceOptionArray.push({ label:item , value: item });
        oldserviceOptionArray.push(item);
        });

      this.state.modalserviceOption=serviceOptionArray;

      var employeeOption=[];
      employeeOption.push({ label: editingAppointment.Employee.split(",")[1], value: editingAppointment.Employee});
      this.state.modalemployeeOption=employeeOption[0];
 
      //SETTING OLD VALUES
      this.state.oldmodalmobileNo=editingAppointment.ContactNo;
      this.state.oldmodalcustomerName=editingAppointment.title;
      this.state.oldmodalappointmentDate=editingAppointment.startDate.split(" ")[0];
      this.state.oldmodalappointmentTime=editingAppointment.startDate.split(" ")[1];
      this.state.oldmodalserviceOption=oldserviceOptionArray;
      this.state.oldmodalemployeeOption=employeeOption[0];


      $("#updatemodal").modal("show");


    }
   
    this.state.editingFormVisible=false;
    this.setState({editingFormVisible:false, isNewAppointment: false })
    
   

  }

  //FUNCTION CALLED WHEN DOUBLE CLICKING IS DONE TO CREATE AN APPOINTMENT
  onAddedAppointmentChange(addedAppointment) {
    this.setState({ addedAppointment });
    const { editingAppointment } = this.state;
    if (editingAppointment !== undefined) {
      this.setState({
        previousAppointment: editingAppointment,
      });
    }
  

    var appointmentDate = new Date(addedAppointment.startDate.getTime() - (addedAppointment.startDate.getTimezoneOffset() * 60000 ))
    .toISOString()
    .split("T")[0];

    this.state.appointmentDate=appointmentDate;

    var d = new Date(addedAppointment.endDate);
    var appointmentTime = moment(d).format('HH:mm');

    this.state.appointmentTime=appointmentTime;

    
    var appointmentFixedDate = Date.parse(this.state.appointmentDate);
   
    var currentDate1=new Date(this.state.currentDateForAddAppointment);
    var currentDate = Date.parse(currentDate1);

 
     if(appointmentFixedDate<currentDate){
    
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Appointment Cannot Be Fixed For Past Date,Kindly Select Date In Future',
        showConfirmButton: false,
        timer: 3000
      })

      this.state.editingFormVisible=false;
      this.setState({editingFormVisible:false, isNewAppointment: false })

     }else{
     
      this.state.editingFormVisible=true;
      this.setState({editingFormVisible:true, isNewAppointment: false })

      this.setState({ editingAppointment: undefined, isNewAppointment: true });
      //window.scroll(0,-500);
     }






    



  }

  setDeletedAppointmentId(id) {
    this.setState({ deletedAppointmentId: id });
    this.state.appointmentDeleteId=id;
  }

  toggleEditingFormVisibility() {

    const { editingFormVisible } = this.state;
    this.setState({
      editingFormVisible: !editingFormVisible,
    });
  }

  toggleConfirmationVisible() {
    const { confirmationVisible } = this.state;
    this.setState({ confirmationVisible: !confirmationVisible });
  }

  commitDeletedAppointment() {
    this.setState((state) => {
      const { data, deletedAppointmentId } = state;
      const nextData = data.filter(appointment => appointment.id !== deletedAppointmentId);

      return { data: nextData, deletedAppointmentId: null };
    });
    this.toggleConfirmationVisible();


    deleteArray.push(this.state.appointmentDeleteId);
    

    if(_.contains(updateArray,this.state.appointmentDeleteId)){
      // alert(data[indexValue].id +"ALREADY EXIST");
       var updateIndexValue=_.indexOf(updateArray,this.state.appointmentDeleteId);
       for(var i=0;i<4;i++){
         updateArray.splice(updateIndexValue, 1);
       }

     }

  }

 

commitChanges =({ added, changed, deleted })=> {


  this.setState((state) => {
    let { data } = state;
    if (added) {
    

      if(makeAppointmentData.contactNo!=undefined && makeAppointmentData.customerName!=undefined
       && makeAppointmentData.modeofAppointment!=undefined && makeAppointmentData.service!=undefined )
       {
 
        this.state.modeofAppointment=makeAppointmentData.modeofAppointment.value;
      
        if(makeAppointmentData.appointmentDate!=undefined){

          var appointmentDate = new Date(makeAppointmentData.appointmentDate.getTime() - (makeAppointmentData.appointmentDate.getTimezoneOffset() * 60000 ))
          .toISOString()
          .split("T")[0];
       
    
          this.state.appointmentDate=appointmentDate;

        }

        if(makeAppointmentData.appointmentTime!=undefined){
      
          var d = new Date(makeAppointmentData.appointmentTime);
         var appointmentTime = moment(d).format('HH:mm');
       
          
        this.state.appointmentTime=appointmentTime;
        }

        serviceListArray=[];
        serviceTimeArray=[];
  

        $.each(makeAppointmentData.service, function (i, item) {
       
          serviceListArray.push(item.value);
       
          });

          /*
             customerName: makeAppointmentData.customerName,
        mobileNo: makeAppointmentData.contactNo,
        gender:this.state.gender,
        appointmentDate: this.state.appointmentDate,
        bookingDate: this.state.currentDate,
        appointmentTime: this.state.appointmentTime,
        companyId: this.state.companyId,
        service: serviceListArray.toString(),
        employeeDetails:this.state.employee,
        modeofAppointment:this.state.modeofAppointment,

        */

          var localServiceListArray=serviceListArray.toString();
          var appointmentDateOpted=this.state.appointmentDate;
          var startDate=appointmentDateOpted+" "+this.state.appointmentTime;
       
          var contactNo=makeAppointmentData.contactNo;
      //    var employee=makeAppointmentData.employee.value;
          var customerName=makeAppointmentData.customerName;


        var makeAppointmentStatus=this.MakeAppointmentFunc();

//alert("MAKE APPOINTMENT STATUS :"+makeAppointmentStatus);
        if(makeAppointmentStatus.response=="Success"){
          var endDate=appointmentDateOpted+" "+this.state.appointmentEndTime;

        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      //  data = [...data, { id: startingAddedId, ...added }];
 /*     data = [...data, { id: startingAddedId,title:customerName,
      //  CustomerName:customerName, 
        StartDate:startDate  ,EndDate:endDate   ,
        ContactNo:contactNo  ,Service:localServiceListArray     ,
        Employee :employee,
        startDate:startDate,endDate:endDate, ...added }];
*/


       /*   var todayCurrentDate = Date.parse(this.state.date);
          var optedCurrentDate = Date.parse(dateOpted);

          if(optedCurrentDate<todayCurrentDate){


          }
          */

        var dateOpted=moment(this.state.dateOptedfromNavigator).format('YYYY-MM-DD');
        var fromDate = startOfWeek(new Date(dateOpted), { weekStartsOn: 0 });
        var toDate = endOfWeek(new Date(dateOpted), { weekEndsOn: 6 });

        this.state.fromDate = moment(fromDate).format('YYYY-MM-DD');
        this.state.toDate = moment(toDate).format('YYYY-MM-DD');

    
        this.GetFutureAppointmentsData();

      
        }else{
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Making Appointment Failed. Kindly Check For Time & Date',
            showConfirmButton: false,
            timer: 3000
          })
          
        }

       }else{

     
        

        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Kindly Fill In All Fields To Proceed',
          showConfirmButton: false,
          timer: 3000
        })

       }
       
   
    }
    if (changed) {
      data = data.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));

 
        

     //CALCULATING APPOINTMENT NEW START TIME & DATE
       var indexValue=_.findLastIndex(data, {id:this.state.appointmentId});
      
       
       var appointmentDate_Time=data[indexValue].startDate;
   
       
       var appointmentDate = new Date(appointmentDate_Time.getTime() - (appointmentDate_Time.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
      
                    

        var d = new Date(appointmentDate_Time);
     //   var appointmentTime = moment(d).format('HH:MM');
       var appointmentTime = appointmentDate_Time.toTimeString().split(' ')[0]
       
       

        //CALCULATING APPOINTMENT NEW END TIME
        var appointmentDate_EndTime=data[indexValue].endDate;
        var d = new Date(appointmentDate_EndTime);
       var appointmentEndTime = appointmentDate_EndTime.toTimeString().split(' ')[0]
    
       


        if(_.contains(updateArray, data[indexValue].id)){
         // alert(data[indexValue].id +"ALREADY EXIST");
          var updateIndexValue=_.indexOf(updateArray, data[indexValue].id);
          for(var i=0;i<4;i++){
            updateArray.splice(updateIndexValue, 1);
          }
          updateArray.push(data[indexValue].id);
          updateArray.push(appointmentDate);
          updateArray.push(appointmentTime);
          updateArray.push(appointmentEndTime);
        
        }else{

          updateArray.push(data[indexValue].id);
          updateArray.push(appointmentDate);
          updateArray.push(appointmentTime);
          updateArray.push(appointmentEndTime);


        }
      
   
        


    }
    if (deleted !== undefined) {
      this.setDeletedAppointmentId(deleted);
      this.toggleConfirmationVisible();
     // data = data.filter(appointment => appointment.id !== deleted);
    }
    return { data };
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

  GetFutureAppointmentsData()
    {
       var self=this;

  /*   console.log("GET APPOINTMENT DETAILS :", JSON.stringify({
      companyId:this.state.companyId,
      fromDate:this.state.fromDate,
      toDate:this.state.toDate,
  })); */


        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                companyId:this.state.companyId,
                fromDate:this.state.fromDate,
                toDate:this.state.toDate,
                empSites:GetEmployeeSite(),
            }),
          
             url: " http://15.206.129.105:8080/ThroughBooksCOAPI/Appointments/GetAppointmentDetails",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
             
          //   console.log("DATA :",data);

              var localAppointmentData=[];
              var localAppointmentResourceData=[];

              $.each(data.appointmentDetails, function (i, item) {
 
                var date_time=item.appointmentDate+""+item.appointmentTime;
              //  var date_Endtime=item.appointmentDate+" "+item.appointmentEndTime;

             var appData={
              title: item.customerName,
              startDate: date_time,
            //  endDate:  date_Endtime,
              id: item.appointmentId,
             // rRule: 'FREQ=DAILY;COUNT=1',
             // exDate: '20180628T063500Z,20180626T063500Z'
             ContactNo:item.mobileNo,
             Service:item.service,
            // Employee:item.employeedetails,
            }

             localAppointmentData.push(appData);
                });

                self.state.data=localAppointmentData;
                self.state.lastAppointmentDate=data.appointmentDate;


                $.each(data.appointmentDetails, function (i, item) {

                var color=pink;
                if(Number(item.appointmentId)%2==0){
                  color= purple;
                }
   
                var resourceData = {
                  id: item.appointmentId,
                  backgroundColor:color,
              }
   
              localAppointmentResourceData.push(resourceData);
            });



                self.state.resourceData=localAppointmentResourceData;
                
                self.setState({
                  data:self.state.data,
                  resourceData:self.state.resourceData,
                })
              
            
           

             //   self.state.resourcesInstance=resource1;
             self.state.resourcesInstance=[  {  fieldName: 'id', instances: localAppointmentResourceData} ];

                  self.setState({
                    resourcesInstance:self.state.resourcesInstance,
                  })


         
                  
            },
            error: function (data) {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Network Connection Problem',
                showConfirmButton: false,
                timer: 3000
              })
          
      
            },
        });

        this.state.editingFormVisible=false;
        this.setState({editingFormVisible:false, isNewAppointment: false })
        
    }
  
    Update_DeleteAppointmentFunc(){

      var self=this;
      if(updateArray.length>0 || deleteArray.length>0){
      $.ajax({
          type: 'POST',
          data: JSON.stringify({
              companyId:this.state.companyId,
              updateArray:updateArray.toString(),
              deleteArray:deleteArray.toString(),
              
          }),
        
           url: " http://15.206.129.105:8080/ThroughBooksCOAPI/Appointments/UpdateDeleteAppointment",
          contentType: "application/json",
          dataType: 'json',
          async: false,
          success: function (data, textStatus, jqXHR) {
           
         
            

           if(data.response=="Success"){
            
            Swal.fire({
              position: 'center',
              icon: 'success',
              title:'Update The Changes',
              showConfirmButton: false,
              timer: 3000
            })
           }

           
    
           
          },
          error: function (data) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Network Connection Problem',
              showConfirmButton: false,
              timer: 3000
            })
        
    
          },
           
      });
    }else{
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'No Changes Done',
        showConfirmButton: false,
        timer: 3000
      })
    }
          updateArray=[];
          deleteArray=[];
          this.state.appointmentDeleteId="";
    }


    GetSaloonDetails()
    {
       var self=this;

  $.ajax({
            type: 'POST',
            data: JSON.stringify({
              companyId: this.state.companyId,
              date:this.state.currentDate
            }),
          
              url: " http://15.206.129.105:8080/ThroughBooksCOAPI/Appointments/GetGarageDetails",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
             
             
              

                        
                            serviceArrayOptions=[];
                            employeeArrayOptions=[];
                            appointmentArray=[];
                            serviceArray=[];
                      

                            serviceArray=data.serviceDetails;
                            appointmentArray=data.appointmentDetails;

                              $.each(data.serviceDetails, function (i, item) {
                                serviceArrayOptions.push({ label:item.serviceName , value: item.serviceName });
                                });

                              $.each(data.employeeDetails, function (i, item) {
                                employeeArrayOptions.push({ label: item.employeeName, value: item.employeeId+','+item.employeeName });   
                                });

                                self.state.serviceOptions=serviceArrayOptions;
                                self.state.employeeOptions=employeeArrayOptions;
                            
                                self.setState({
                                  serviceOptions:self.state.serviceOptions,
                                  employeeOptions:self.state.employeeOptions
                                })
    
      
            },
            error: function (data) {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Network Connection Problem',
                showConfirmButton: false,
                timer: 3000
              })
          
      
            },
        });
    }

    MakeAppointmentFunc(){

      var self=this;
      var responseData="Fail";
  
     
      
  
      var proceedData="Yes";
  
     
     var appointmentFixedDate = Date.parse(this.state.appointmentDate);
     var currentDate = Date.parse(this.state.currentDateForAddAppointment);
  
  
      if(appointmentFixedDate==currentDate){
   
        
  
        var currentTime=new Date();
        var appointmentFixedTime =new Date();
   
         currentTime.setHours((this.state.currentTime).split(":")[0], (this.state.currentTime).split(":")[1],'0');
         appointmentFixedTime.setHours((this.state.appointmentTime).split(":")[0], (this.state.appointmentTime).split(":")[1],'0');
   
         if(appointmentFixedTime<=currentTime){
        
          
           proceedData="No";
           Swal.fire({
             position: 'center',
             icon: 'warning',
             title: 'Select Appointment Time In Future',
             showConfirmButton: false,
             timer: 3000
           })
         }
  
      }else if(appointmentFixedDate<currentDate){
       
        proceedData="No";
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Appoinment Cannot Be Made For Past Date.Kindly Opt a Date In Future',
          showConfirmButton: false,
          timer: 3000
        })
      }
  
    
  
      
      if(proceedData=="Yes"){
        var totalServiceTime=0;
  

        
            $.each(serviceTimeArray, function (i, item) {
              var startMin=item;
  
              var hr=startMin.split(":")[0];
              var min=startMin.split(":")[1];
        
              var totalMin=Number(hr)*60+Number(min);
              totalServiceTime=Number(totalMin)+Number(totalServiceTime);
        
        
            });
     
              var hr=this.state.appointmentTime.split(":")[0];
              var min=this.state.appointmentTime.split(":")[1];
  
              var totalMin=Number(hr)*60+Number(min);
              totalServiceTime=Number(totalMin)+Number(totalServiceTime);
  
              var hours = Math.floor(totalServiceTime / 60);  
              hours=('0'+(hours)).slice(-2) ;
  
              var minutes = totalServiceTime % 60;
              minutes=('0'+(minutes)).slice(-2) ;
  
              var endTimings= hours + ":" + minutes;    
            
              
  
              this.state.appointmentEndTime=endTimings;
  
            var empTimeArray=_.where(appointmentArray, {employeedetails: this.state.employee,appointmentDate:this.state.appointmentDate});
       
            
  
        
            var format = 'HH:mm';
            var timeCheckData;
              for(var i=0;i<empTimeArray.length;i++){
  
                      // var time = moment() gives you current time. no format required.
                      var time = moment(this.state.appointmentTime,format),
                      endTime=moment(endTimings,format),
                      beforeTime = moment(empTimeArray[i].appointmentTime, format),
                      afterTime = moment(empTimeArray[i].appointmentEndTime, format);
                    
                    if (time.isBetween(beforeTime, afterTime) || endTime.isBetween(beforeTime, afterTime) ) {
                      timeCheckData="is_between";
                    
                      proceedData="No";
  
                      Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Kindly Select Some Other Time As Per Your Convinence As Employee Is Already Engaged',
                        showConfirmButton: false,
                        timer: 3000
                      })
  
                      break;
                    } else {
                      timeCheckData="is_not_between";
                   
                      proceedData="Yes";
                    }
  
              }
  
          if( timeCheckData=="is_between"){
            
            var empAppointmentTimeData="";
  
            var tab = '<thead><tr><th>S.NO</th><th>Start Time</th><th>End Time</th></tr></thead>';
     
            for(var i=0;i<empTimeArray.length;i++){
              var sno=Number(i)+1;
            //  empAppointmentTimeData+=sno+". "+empTimeArray[i].appointmentTime+" - "+empTimeArray[i].appointmentEndTime+"<br>";
             tab += '<tr>'
            +'<td>' + sno+ '</td><td>' + empTimeArray[i].appointmentTime + '</td><td>' + empTimeArray[i].appointmentEndTime+ '</td>'
            +'</tr>';
            }
            
  
       
           $("#employeeengagedtable").empty();
           $("#employeeengagedtable").append(tab);
        
             $("#myModal1").modal('show');
          }
  
  
       
  
  
      
  
      }
  
      if(proceedData=="Yes"){
      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          customerName: makeAppointmentData.customerName,
          mobileNo: makeAppointmentData.contactNo,
          gender:this.state.gender,
          appointmentDate: this.state.appointmentDate,
          bookingDate: this.state.currentDate,
          appointmentTime: this.state.appointmentTime,
          appointmentEndTime:endTimings,
          companyId: this.state.companyId,
          service: serviceListArray.toString(),
          employeedetails:this.state.employee,
          appointmentBy:'Saloon',
          modeofAppointment:this.state.modeofAppointment,
          getDataType:'NotAllSaloon',
          date:this.state.currentDate,
          status:"0",
          description:"-",
          site:GetCurrentSite(),   
        }),
  
        url: " http://15.206.129.105:8080/ThroughBooksCOAPI/Appointments/MakeAppointments",
        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
  
        
          responseData=data;

            if(data.response=="Success"){
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Made Appointment Successfully',
                showConfirmButton: false,
                timer: 3000
              })
              self.cancelFunc();
            }else if(data.response=="EmployeeEngaged"){
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Employee Is Already Engaged Kindly Select Some Other Time',
                showConfirmButton: false,
                timer: 3000
              })
            }
  
      
  
           var  serviceArrayOptions=[];
           var employeeArrayOptions=[];
           appointmentArray=[];
           serviceArray=[];
     
  
           serviceArray=data.serviceDetails;
           appointmentArray=data.appointmentDetails;
  
            self.state.serviceArrayOptions="";
            self.state.employeeArrayOptions="";
  
             $.each(data.serviceDetails, function (i, item) {
               serviceArrayOptions.push({ label:item.serviceName , value: item.serviceName });
               });
  
             $.each(data.employeeDetails, function (i, item) {
               employeeArrayOptions.push({ label: item.employeeName, value: item.employeeId+','+item.employeeName });   
               });
  
       
               makeAppointmentData="";

  
  
        },
        error: function (data) {
  
       
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Network Connection Problem',
        showConfirmButton: false,
        timer: 3000
      })
        },
      });
    }
  return responseData;
    }
  
  
    cancelFunc(){

 

      this.state.customerName="";
      this.state.mobileNo="";
      this.state.gender="";
      this.state.appointmentDate="";
      this.state.bookingDate="";
      this.state.appointmentTime=this.state.currentTime;
      serviceListArray=[];
      this.state.employeeDetails="";
      this.state.modeofAppointment="";
      
    
    
      this.setState({
        customerName: this.state.customerName,
        mobileNo: this.state.mobileNo,
        gender:this.state.gender,
        appointmentDate: this.state.appointmentDate,
        bookingDate: this.state.currentDate,
        appointmentTime: this.state.appointmentTime,
        employeeDetails:this.state.employeeDetails,
        modeofAppointment:this.state.modeofAppointment,
      })
    
    }

    //FUNCTIONS FOR APPOINTMENT UPDATE OPTION
    handleUserInput = (e) => {
      const name = e.target.name;
      const value = (e.target.value).replace(/[^A-Za-z]/g, "");
    
      this.setState({
        [name]: value,
      });
  
    }    
  
    handleUserInputMobileNo =(e) =>{
      const name = e.target.name;
      const value = (e.target.value).replace(/[^0-9.,]+/, '');
      this.setState({
        [name]: value,
      });
    }

        
  

      keeperchangetime(newTime){
        this.state.appointmentTime=newTime;
        this.setState({
          appointmentTime:this.state.appointmentTime
        })
      }
      
      OpenTimeKeeper(){
      
        if(this.state.timekeeperData==true){
          $("#timekeeperdiv").hide();
        }else{
          $("#timekeeperdiv").show();
        }
       
      }
      
      CloseTimeKeeper(){
        this.state.timekeeperData=false;
        $("#timekeeperdiv").hide();
      }

  
      UpdateAppointmentFunc(){
  

        this.state.editingFormVisible=true;

        var proceedData="Yes";

      var  serviceListArray=[];
      var  serviceTimeArray=[];

        if(this.state.modalserviceOption!="" && this.state.modalcustomerName!="" && 
        this.state.modalmobileNo!="" && this.state.modalemployeeOption!="" ){
     
          this.state.modalemployeeOption=this.state.modalemployeeOption.value;


          if(this.state.oldmodalcustomerName!=this.state.modalcustomerName || 
            this.state.oldmodalmobileNo!= this.state.modalmobileNo ||
            this.state.oldmodalappointmentDate!=this.state.modalappointmentDate ||
            this.state.oldmodalappointmentTime!= this.state.modalappointmentTime ||
            this.state.oldmodalserviceOption!=this.state.modalserviceOption ||
            this.state.oldmodalemployeeOption!=this.state.modalemployeeOption) {


              
          //GENERATE SERVICE LIST & TIME ARRAY LIST FROM OPTED SERVICE VALUE
          $.each(this.state.modalserviceOption, function (i, item) {
            serviceListArray.push(item.value);
            var timeArray=_.where(serviceArray, {serviceName: item.value});
            serviceTimeArray.push(timeArray[0].serviceTime);
        
            });

            var appointmentFixedDate = Date.parse(this.state.modalappointmentDate);
            var currentDate = Date.parse(this.state.currentDateForAddAppointment);


          if(appointmentFixedDate==currentDate){
          
      
            var currentTime=new Date();
            var appointmentFixedTime =new Date();
       
             currentTime.setHours((this.state.time).split(":")[0], (this.state.time).split(":")[1],'0');
             appointmentFixedTime.setHours((this.state.modalappointmentTime).split(":")[0], (this.state.modalappointmentTime).split(":")[1],'0');
       
             if(appointmentFixedTime<=currentTime){
      
               proceedData="No";
               //SELECT APPOINTMENT TIME IN FUTURE
               Swal.fire({
                 position: 'center',
                 icon: 'warning',
                 title: 'Select Appointment Time In Future',
                 showConfirmButton: false,
                 timer: 3000
               })
             }
      
          }else if(appointmentFixedDate<currentDate){
            
            //SELECT APPOINTMENT DATE IN FUTURE
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Select Appointment Date In Future',
              showConfirmButton: false,
              timer: 3000
            })
          }

            }else{
              proceedData="No";
          //SELECT ALL THE FIELDS
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'No Change',
            showConfirmButton: false,
            timer: 3000
          })
            }


        }else{
          proceedData="No";
          //SELECT ALL THE FIELDS
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Kindly Select All Fields To Proceed',
            showConfirmButton: false,
            timer: 3000
          })


        }
     
        //CALCULATING APPOINTMENT ENDTIME && CHECKING IF EMPLOYEE IS AVAILABLE AT THE OPTED TIME
       
      if(proceedData=="Yes"){

        var totalServiceTime=0;
      
        //CALCULATING TOTAL SERVICE TIME
                $.each(serviceTimeArray, function (i, item) {
                  var startMin=item;
      
                //GETTING HRS & MINS FROM SERVICE TIME
                  var hr=startMin.split(":")[0];
                  var min=startMin.split(":")[1];
            
                     //CONVERTING SERVICE TIME INTO MIN FOR EACH SERVICE
                  var totalMin=Number(hr)*60+Number(min);

                     //ADDING SERVICE TIME IN MIN OF EACH SERVICE
                  totalServiceTime=Number(totalMin)+Number(totalServiceTime);
            
            
                });
         
                //GETTING HRS & MINS FROM APPOINTMENT FIXED TIME
                  var hr=this.state.modalappointmentTime.split(":")[0];
                  var min=this.state.modalappointmentTime.split(":")[1];
      
                  //CONVERTING ENTIRE APPOINTMENT TIME INTO MIN
                  var totalMin=Number(hr)*60+Number(min);
                  
                  //ADDING APPOINTMENT TIME IN MIN + SERVICE TIME IN MIN
                  totalServiceTime=Number(totalMin)+Number(totalServiceTime);
      
                  //CONVERTING SERVICE TIME IN MIN INTO HRS
                  var hours = Math.floor(totalServiceTime / 60);  
                  hours=('0'+(hours)).slice(-2) ;
      
                   //CONVERTING SERVICE TIME IN MIN INTO MIN
                  var minutes = totalServiceTime % 60;
                  minutes=('0'+(minutes)).slice(-2) ;
      
                   //GETTING APPOINTMENT END TIME ON ADDING TOTAL SERVICE TIME TO APPOINTMENT START TIME
                  var endTimings= hours + ":" + minutes;    
                 
      
                  //GETTING EMPLOYEE TIME ARRAY FOR THE EMPLOYEE OPTED FOR THE SERVICE
                  var empTimeArray=_.where(appointmentArray, {employeedetails: this.state.employeeDetails,appointmentDate:this.state.appointmentDate});
              
        

              //CHECKING IF EMPLOYEE IS AVAILABLE AT THE APPOINTMENT TIME OPTED
                  var format = 'HH:mm';
                  var timeCheckData;
                    for(var i=0;i<empTimeArray.length;i++){
        
                            // var time = moment() gives you current time. no format required.
                            var time = moment(this.state.appointmentTime,format),
                            endTime=moment(endTimings,format),
                            beforeTime = moment(empTimeArray[i].appointmentTime, format),
                            afterTime = moment(empTimeArray[i].appointmentEndTime, format);
                          
                          if (time.isBetween(beforeTime, afterTime) || endTime.isBetween(beforeTime, afterTime) ) {
                            timeCheckData="is_between";
                           
                            proceedData="No";
        
                            Swal.fire({
                              position: 'center',
                              icon: 'warning',
                              title: 'Kindly Select Some Other Time As Per Your Convinence As Employee Is Already Engaged',
                              showConfirmButton: false,
                              timer: 3000
                            })
        
                            break;
                          } else {
                            timeCheckData="is_not_between";
                         
                            proceedData="Yes";
                          }
        
                    }


                    if( timeCheckData=="is_between"){
                     
                    var empAppointmentTimeData="";
          
                    var tab = '<thead><tr><th>S.NO</th><th>Start Time</th><th>End Time</th></tr></thead>';
             
                    for(var i=0;i<empTimeArray.length;i++){
                      var sno=Number(i)+1;
                    //  empAppointmentTimeData+=sno+". "+empTimeArray[i].appointmentTime+" - "+empTimeArray[i].appointmentEndTime+"<br>";
                     tab += '<tr>'
                    +'<td>' + sno+ '</td><td>' + empTimeArray[i].appointmentTime + '</td><td>' + empTimeArray[i].appointmentEndTime+ '</td>'
                    +'</tr>';
                    }
                    
          
               
                   $("#employeeengagedtable").empty();
                   $("#employeeengagedtable").append(tab);
                
                //     $("#myModal1").modal('show');
                  }



      }


          var self=this;
          if(proceedData=="Yes"){

         

          $.ajax({
            type: 'POST',
            data: JSON.stringify({
              appointmentId:this.state.modalappointmentId,
              customerName: this.state.modalcustomerName,
              mobileNo: this.state.modalmobileNo,
              appointmentDate: this.state.modalappointmentDate,
              appointmentTime: this.state.modalappointmentTime,
              appointmentEndTime:endTimings,
              companyId: this.state.companyId,
              service: serviceListArray.toString(),
              employeedetails:this.state.modalemployeeOption,
              getDataType:'NotAllSaloon',
              date:this.state.currentDate,
            }),
      
            url: " http://15.206.129.105:8080/ThroughBooksCOAPI/Appointments/UpdateAppointments",
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
      
              
            
                if(data.response=="Success"){
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Made Appointment Successfully',
                    showConfirmButton: false,
                    timer: 3000
                  })
                  self.cancelFunc();
                  
                  self.GetFutureAppointmentsData();

                }else if(data.response=="EmployeeEngaged"){
                  Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Employee Is Already Engaged Kindly Select Some Other Time',
                    showConfirmButton: false,
                    timer: 3000
                  })
                }
      
                $("#updatemodal").modal('hide');
      
               var  serviceArrayOptions=[];
               var employeeArrayOptions=[];
               appointmentArray=[];
               serviceArray=[];
         
      
               serviceArray=data.serviceDetails;
               appointmentArray=data.appointmentDetails;
      
                self.state.serviceArrayOptions="";
                self.state.employeeArrayOptions="";
      
                 $.each(data.serviceDetails, function (i, item) {
                   serviceArrayOptions.push({ label:item.serviceName , value: item.serviceName });
                   });
      
                 $.each(data.employeeDetails, function (i, item) {
                   employeeArrayOptions.push({ label: item.employeeName, value: item.employeeId+','+item.employeeName });   
                   });
      
                 
      
                 self.state.serviceOptions=serviceArrayOptions;
                 self.state.employeeOptions=employeeArrayOptions;
             
                 self.setState({
                   serviceOptions:self.state.serviceOptions,
                   employeeOptions:self.state.employeeOptions
                 })
      
      
      
            },
            error: function (data) {
      
           
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Network Connection Problem',
            showConfirmButton: false,
            timer: 3000
          })
            },
          });
        }

      

 
      }


  render() {
    const {
      currentDate,
      data,
      confirmationVisible,
      editingFormVisible,
      startDayHour,
      endDayHour,
      resourceData,
      resources,
    } = this.state;
    const { classes } = this.props;

    const label_style={
      paddingTop: "20px"
    }

    return (
      <div class="container" style={{marginBottom: "50px" }}>
       <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4">
         <div className="">
              <BackButtonComponent name={"Dashboard"}click={()=>this.BackbtnFunc()} />
                  </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
              <div class="card-header">
                <h3 class="text-center">Service - Calendar</h3>   </div>

            </div>
         
          </div>

                <div>
                  <button  style={{fontWeight:"bold"}} onClick={() => this.Update_DeleteAppointmentFunc()} class="btn btn-default">Enable Changes</button>
                </div>
               
         <Paper>
        <Scheduler
          data={this.state.data}
          height={660}
        >
    

          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={this.currentDateChange}
           
          />
          <EditingState
            onCommitChanges={this.commitChanges}
            onEditingAppointmentChange={this.onEditingAppointmentChange}
            onAddedAppointmentChange={this.onAddedAppointmentChange}
          />
         
          <WeekView class="Cell-dayView-289"
            startDayHour={startDayHour}
            endDayHour={endDayHour}
            cellDuration={"15"}
          />
          
         {/* <MonthView />  */}
          
         
         {/* <AllDayPanel /> */}
         <Toolbar />  {/* MUST FOR IMPLEMENTING DATE NAVIGATOR */}
         <DateNavigator />
       
         <TodayButton />

          <EditRecurrenceMenu />
          <Appointments />
        

          <AppointmentTooltip
         //   headerComponent={Header}
            contentComponent={Content}
            showOpenButton
            showCloseButton
            showDeleteButton
         
          />
          <ViewSwitcher />
          <AppointmentForm
           overlayComponent={this.appointmentForm}
            visible={editingFormVisible}
         //   onVisibilityChange={this.toggleEditingFormVisibility}
          
         //  basicLayoutComponent={BasicLayout}
          //  textEditorComponent={TextEditor}
         //  selectComponent={Select}
           // messages={messages}
          />
  {/*ALWAYS PLACE RESOURCES AFTER APPOINTMENTS */}
         
             <Resources
            data={this.state.resourcesInstance}
            mainResourceName="id"
            
          />

          <DragDropProvider />
        </Scheduler>

        <Dialog
          open={confirmationVisible}
          onClose={this.cancelDelete}
        >
          <DialogTitle>
            Delete Appointment
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this appointment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleConfirmationVisible} color="primary" variant="outlined">
              Cancel
            </Button>
            <Button onClick={this.commitDeletedAppointment} color="secondary" variant="outlined">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
       
       {/* <Fab
          color="secondary"
          className={classes.addButton}
          onClick={() => {
            this.setState({ editingFormVisible: true });
            this.onEditingAppointmentChange(undefined);
            this.onAddedAppointmentChange({
              startDate: new Date(currentDate).setHours(startDayHour),
              endDate: new Date(currentDate).setHours(startDayHour + 1),
            });
          }}
        >
          <AddIcon />
        </Fab>
        */}

        
      </Paper>

      
      <div style={{ opacity: "1" }} class="modal left fade" id="updatemodal"  >
                  <div style={{ marginTop: "158px" }} class="modal-dialog">

                    <div class="modal-content" >
                      <div class="modal-header">
                        <h4 class="modal-title" style={{ align: "center", display: "contents" }}>Update Details</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>

                      </div>
                      <div class="modal-body" >
                        <div class="form-body">

                          <div class="col-xs-12 col-sm-4 col-lg-4 " style={label_style}>
                          <label class="control-label selectpicker" for="customerName">Contact No:</label>
                          <input
                              type="text"
                              id="mobileno"
                              name="modalmobileNo"
                              style={{ color: "black", marginBottom: "0px" }}
                              onChange={this.handleUserInputMobileNo}
                              value={this.state.modalmobileNo}
                              class="form-control"
                              autocomplete="off"
                              placeholder="Contact No" />
                        </div>
                        <div class="col-xs-12 col-sm-4 col-lg-4 " style={label_style}>
              <label class="control-label selectpicker " for="customerName">Customer Name:</label>
              <input
                  type="text"
                  id="customername"
                  name="modalcustomerName"
                  onChange={this.handleUserInput}
                  value={this.state.modalcustomerName}
                  style={{ color: "black", marginBottom: "0px" }}
                  class="form-control"
                  autocomplete="off"
                  placeholder="customer Name" />
  
            </div>
        
          </div>
  
          <div class="row" style={{ backgroundColor: "" }}>
            <div class="col-xs-12 col-sm-4 col-lg-4 " style={label_style}>
              <label class="control-label selectpicker" for="customerName">Date Of Appointment:</label>
              <input class="form-control"
                  id="modalappointmentdate" name="modalappointmentDate" 
                  placeholder="Date Of Appointment" 
                  value={this.state.modalappointmentDate} 
                  required />
            </div>
            <div class="col-xs-12 col-sm-4 col-lg-4 " style={label_style}>
              <label class="control-label selectpicker " for="customerName"> Time Of Appointment:</label>
              <input onClick={() => this.OpenTimeKeeper()} class="form-control"
                  id="appointmenttime" name="modalappointmentTime" 
                  placeholder="Appointment Time" value={this.state.modalappointmentTime} readOnly />
  
            </div>
            <div class="col-xs-12 col-sm-4 col-lg-4 " style={label_style}>
              <div id="timekeeperdiv"
                style={{
                  position: "absolute",
                  display: "none",
                  zIndex: "10",
                   marginTop: "20px",
      }}>
             <Timekeeper
                onChange={(newTime) => this.keeperchangetime(newTime.formatted24)}
                hour24Mode
                //   coarseMinutes={15}
                //  forceCoarseMinutes
                switchToMinuteOnHourSelect
                doneButton={(newTime) => (
                  <div
                    style={{ textAlign: 'center', padding: '10px 0' }}
                    onClick={() => this.CloseTimeKeeper()}
                  >
                    Done
                  </div>
                )}
  
              />
            </div>
          </div>
        </div>
  
  
        <div class="row" style={{ backgroundColor: "" }}>
          
        <div class="col-xs-12 col-sm-4 col-lg-4 " style={label_style}>
            <label class="control-label selectpicker" for="customerName"> Service:</label>
            <Select
                id="selectedOption"
                name="modalselectedOption"
                isMulti={true}
                options={this.state.serviceOptions}
             //  onChange={this.handleChangeSelectedServiceOption}
               onChange={value =>this.setState({modalserviceOption:value})}
            
                value={this.state.modalserviceOption}
              />
  
          </div>
          <div class="col-xs-12 col-sm-4 col-lg-4 " style={label_style}>
            <label class="control-label selectpicker " for="customerName"> Employee:</label>
            <Select
                id="employeeOptionid"
                name="modalemployeeOptionname"
              options={this.state.employeeOptions}
             // onChange={this.handleChangeSelectedServiceOption}
              onChange={value =>this.setState({modalemployeeOption:value})}
              
                value={this.state.modalemployeeOption}
              />
          </div>
     
        </div>
        <div>
          <button type="button" onClick={() => this.UpdateAppointmentFunc()} style={{ marginTop: " 2%" }} class="btn btn-primary ">Update Appointment</button>
  
        </div>


                          
                        </div>


                      </div>
                    </div>

                  </div>

                </div>


      
    );
  }
}

export default AppointmentToolTip;
