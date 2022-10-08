import datepicker from 'jquery-ui/ui/widgets/datepicker';
import '../datepicker.css';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {BrowserRouter as Router,Route,NavLink} from 'react-router-dom';
import registerServiceWorker from '../registerServiceWorker';
import CryptoJS from 'crypto-js';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import ReactTooltip from 'react-tooltip';

import * as BiIcons from "react-icons/bi";

import * as IoIcons from "react-icons/io";

import * as FaIcons from "react-icons/fa";  
import * as GrIcons from 'react-icons/gr';
import * as GiIcons from 'react-icons/gi';
import * as HiIcons from 'react-icons/hi';
import * as ImIcons from 'react-icons/im';
import * as FcIcons from 'react-icons/fc';
import * as BsIcons from 'react-icons/bs';
import * as RiIcons from 'react-icons/ri';

import '../BackButtoncss.css';
import warning from './image/warning.png';
import success from './image/success.png';

import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const buttonStyles={
    borderRadius:'25px',
    backgroundColor:'#05a4b5',  
    color:'#FFFFFF',  
    textAlign :'center',
    fontFamily:'Roboto,sans-serif',
    padding: '5px 10px 10px 10px', 
    fontWeight:'bold',
    width:'140px',
    height:'30px', 
    marginRight: '10px',
}  

export const Invoice_xlDownldBtn = function () {
  return (
      <div>
          <ImIcons.ImFileExcel
              data-tip data-for="downloadInvoiceTip"  />

          <ReactTooltip id="downloadInvoiceTip" place="top" effect="solid">
              Download
    </ReactTooltip>

      </div>
  )

}


export  const  ServiceRegistrationIcons  = function (props) {
    
    return <div> 
            <ul className="reactIcon_Btn">
            <li>
            <GiIcons.GiReturnArrow data-tip data-for="instantInvoiceTip" onClick={props.onInstantInvoice} /> 
            </li>
            <li>
            <FaIcons.FaCarCrash data-tip data-for="addServiceTip" onClick={props.ondAddService} />
            </li>
            <li>
            <FaIcons.FaEye data-tip data-for="viewServiceTip" onClick={props.onViewService} /> 
            </li>
            <li>
            <BiIcons.BiEdit data-tip data-for="editServiceTip" onClick={props.onEditService} /> 
            </li>
            <li>
            <FaIcons.FaRegTrashAlt data-tip data-for="deleteServiceTip" onClick={props.DeleteService} /> 
            </li>
             {/* <li>
          <GrIcons.GrDocumentDownload data-tip data-for="downloadServiceTip" onClick={props.onDownloadService} /> 
            </li>*/}
            
            </ul>
      
    <ReactTooltip id="instantInvoiceTip" place="top" effect="solid">
        Make Invoice
      </ReactTooltip>


        <ReactTooltip id="addServiceTip" place="top" effect="solid">
        Add Job card
      </ReactTooltip>

        <ReactTooltip id="viewServiceTip" place="top" effect="solid">
        View Job Card
      </ReactTooltip>

    <ReactTooltip id="editServiceTip" place="top" effect="solid">
        Edit Job Card
      </ReactTooltip>

    
      <ReactTooltip id="deleteServiceTip" place="top" effect="solid">
        Delete Job Card
      </ReactTooltip>

      <ReactTooltip id="downloadServiceTip" place="top" effect="solid">
        Download Job Card List
      </ReactTooltip>

          </div>

}


export  const  VehicleIcons  = function (props) {
    
    return   {/* <div>  

      <ul className="reactIcon_Btn">
      <li>
      <FaIcons.FaCar data-tip data-for="addVehicleTip" onClick={props.ondAddVehicle} />
      </li>
      <li>
      <FaIcons.FaEye data-tip data-for="viewVehicleTip" onClick={props.onViewVehicle} /> 
      </li>
      <li>
      <BiIcons.BiEdit data-tip data-for="editVehicleTip" onClick={props.onEditVehicle} /> 
      </li>
      <li>
      <FaIcons.FaRegTrashAlt data-tip data-for="deleteVehicleTip" onClick={props.DeleteVehicle} /> 
      </li>
     {/* <li>
      <GrIcons.GrDocumentDownload data-tip data-for="downloadVehicleTip" onClick={props.onDownloadVehicle} /> 
      </li>
     

      </ul>

        <ReactTooltip id="addVehicleTip" place="top" effect="solid">
        Add Vehicle
      </ReactTooltip>

        <ReactTooltip id="viewVehicleTip" place="top" effect="solid">
        View Vehicle
      </ReactTooltip>

    <ReactTooltip id="editVehicleTip" place="top" effect="solid">
        Edit Vehicle
      </ReactTooltip>

    
      <ReactTooltip id="deleteVehicleTip" place="top" effect="solid">
        Delete Vehicle
      </ReactTooltip>

      <ReactTooltip id="downloadVehicleTip" place="top" effect="solid">
        Download Vehicle List
      </ReactTooltip> }
          </div> */

      }

}

export  const ProductIcons  = function (props) {
    
    return <div>  
        <ul className="reactIcon_Btn">
        <li>
        <FaIcons.FaBoxes data-tip data-for="addProductTip" onClick={props.ondAddProduct} />
        </li>
        <li>
        <FaIcons.FaEye data-tip data-for="viewProductTip" onClick={props.onViewProduct} />
        </li>
        <li>
        <BiIcons.BiEdit data-tip data-for="editProductTip" onClick={props.onEditProduct} /> 
        </li>
        <li>
        <FaIcons.FaRegTrashAlt data-tip data-for="deleteProductTip" onClick={props.DeleteProduct} /> 
        </li>
       {/* <li>
        <GrIcons.GrDocumentDownload data-tip data-for="downloadProductTip" onClick={props.onDownloadProduct} /> 
        </li> */}
        </ul>
    
        <ReactTooltip id="addProductTip" place="top" effect="solid">
        Add Product
      </ReactTooltip>

        <ReactTooltip id="viewProductTip" place="top" effect="solid">
        View Product
      </ReactTooltip>

    <ReactTooltip id="editProductTip" place="top" effect="solid">
        Edit Product
      </ReactTooltip>

    
      <ReactTooltip id="deleteProductTip" place="top" effect="solid">
        Delete Product
      </ReactTooltip>

      <ReactTooltip id="downloadProductTip" place="top" effect="solid">
        Download Product List
      </ReactTooltip>

          </div>

}


export const InvoiceIcons = function (props) {

    return(
     <div >
        <ul className="reactIcon_Btn">
        <li>
            <BiIcons.BiBookAdd data-tip data-for="addInvoiceTip" onClick={props.onInvoiceAdd} />
            </li>
        <li>
            <FaIcons.FaEye data-tip data-for="viewInvoiceTip" onClick={props.onInvoiceView} />
        </li>
       {/* <li>
            <BiIcons.BiEdit data-tip data-for="editInvoiceTip" onClick={props.onInvoiceEdit} />
        </li> */}
       <li>
            <BiIcons.BiEdit data-tip data-for="editInvoiceTip" onClick={props.onInvoiceEdit} />
        </li> 
        <li>
            <GiIcons.GiWallet data-tip data-for="payInvoiceTip" onClick={props.onInvoicePay} />
        </li>
        <li>
            <FaIcons.FaRegTrashAlt data-tip data-for="deleteInvoiceTip" onClick={props.onInvoiceDelete} />
        </li>
       {/*  <li>
            <GrIcons.GrDocumentDownload data-tip data-for="downloadInvoiceTip" onClick={props.onInvoiceDownload} />
        </li> */}
        </ul>
        <ReactTooltip id="addInvoiceTip" place="top" effect="solid">
            Add Invoice
      </ReactTooltip>

        <ReactTooltip id="viewInvoiceTip" place="top" effect="solid">
            View Invoice
      </ReactTooltip>

        <ReactTooltip id="editInvoiceTip" place="top" effect="solid">
            Edit Invoice
      </ReactTooltip>

        <ReactTooltip id="payInvoiceTip" place="top" effect="solid">
            Pay Invoice
      </ReactTooltip>

        <ReactTooltip id="deleteInvoiceTip" place="top" effect="solid">
            Delete Invoice
      </ReactTooltip>

        <ReactTooltip id="downloadInvoiceTip" place="top" effect="solid">
            Download Invoice
      </ReactTooltip>

    </div>
    )

}


export  const  Delete_DownloadIcons  = function (props) {
    
    return <div> 
         <ul className="reactIcon_Btn">
        <li>
        <FaIcons.FaRegTrashAlt data-tip data-for="deleteInvoiceTip" onClick={props.onDelete} /> 
            </li>
       {/* <li>
         <GrIcons.GrDocumentDownload data-tip data-for="downloadInvoiceTip" onClick={props.onDownload} />  
        </li> */}
        </ul>


      <ReactTooltip id="deleteInvoiceTip" place="top" effect="solid">
        Delete 
      </ReactTooltip>

      <ReactTooltip id="downloadInvoice_Tip" place="top" effect="solid">
        Download 
      </ReactTooltip>

          </div>

}

export const  DeleteIcons  = function (props) {
    return <div> 
       <ul className="reactIcon_Btn">
       <li>
       <FaIcons.FaRegTrashAlt data-tip data-for="deleteInvoiceTip" onClick={props.onInvoiceDelete} /> 
       </li>
       </ul>
        
      <ReactTooltip id="deleteInvoiceTip" place="top" effect="solid">
        Delete 
      </ReactTooltip>
          </div>

}

export const  EnquiryIcons  = function (props) {
    return <div> 
      <ul className="reactIcon_Btn">
      <li>
      <HiIcons.HiOutlineViewGridAdd data-tip data-for="addEnquiryTip" onClick={props.onAddEnquiry} /> 
      </li>
      <li>
      <FaIcons.FaSms data-tip data-for="smsEnquiryTip" onClick={props.onSmsEnquiry} /> 
      </li>
      <li>
      <FaIcons.FaRegTrashAlt data-tip data-for="deleteInvoiceTip" onClick={props.onEnquiryDelete} /> 
      </li>
      </ul>
        
      <ReactTooltip id="addEnquiryTip" place="top" effect="solid">
        Add 
      </ReactTooltip>

       <ReactTooltip id="smsEnquiryTip" place="top" effect="solid">
        Sms
      </ReactTooltip>

        <ReactTooltip id="deleteInvoiceTip" place="top" effect="solid">
        Delete 
      </ReactTooltip>

          </div>

}


export const  Employee_Vendor_Customer_Icons  = function (props) {
    return <div> 

        <ul className="reactIcon_Btn">
        <li>
        <IoIcons.IoMdPersonAdd data-tip data-for="addemp_cust_vend_Tip" onClick={props.onAddEmpVendCust} /> 
        </li>
        <li>
        <FaIcons.FaEye  data-tip data-for="viewemp_cust_vend_Tip" onClick={props.onViewEmpVendCust} /> 
        </li>
        <li>
        <FaIcons.FaUserEdit data-tip data-for="editemp_cust_vend_" onClick={props.onEditEmpVendCust} /> 
        </li>
        <li>
        <FaIcons.FaRegTrashAlt data-tip data-for="deleteemp_cust_vend_Tip" onClick={props.onDeleteEmpVendCust} /> 
        </li>
       {/* <li>
        <GrIcons.GrDocumentDownload data-tip data-for="downloademp_cust_vend_Tip" onClick={props.onDownload} />
        </li> */}

        </ul>
        
       
      <ReactTooltip id="addemp_cust_vend_Tip" place="top" effect="solid">
        Add 
      </ReactTooltip>

       <ReactTooltip id="viewemp_cust_vend_Tip" place="top" effect="solid">
        View
      </ReactTooltip>

      <ReactTooltip id="editemp_cust_vend_" place="top" effect="solid">
        Edit
      </ReactTooltip>

        <ReactTooltip id="deleteemp_cust_vend_Tip" place="top" effect="solid">
        Delete 
      </ReactTooltip>


    <ReactTooltip id="downloademp_cust_vend_Tip" place="top" effect="solid">
        Download 
      </ReactTooltip>

          </div>

}

export const  BankIcons  = function (props) {
    return <div> 

       <ul className="reactIcon_Btn">
       <li>
       <BiIcons.BiMessageSquareAdd data-tip data-for="addeBankTip" onClick={props.onAddBank} /> 
       </li>
       <li>
       <FaIcons.FaUserEdit data-tip data-for="editBankTip" onClick={props.onEditBank} /> 
       </li>
       <li>
       <FaIcons.FaRegTrashAlt data-tip data-for="deleteBankTip" onClick={props.onDeleteBank} /> 
       </li>
      {/* <li>
    <GrIcons.GrDocumentDownload data-tip data-for="downloadBankTip" onClick={props.onDownloadBank} /> 
       </li> */}
       </ul>
        
         
      <ReactTooltip id="addeBankTip" place="top" effect="solid">
        Add 
      </ReactTooltip>

       <ReactTooltip id="editBankTip" place="top" effect="solid">
        Edit
      </ReactTooltip>

        <ReactTooltip id="deleteBankTip" place="top" effect="solid">
        Delete 
      </ReactTooltip>


    <ReactTooltip id="downloadBankTip" place="top" effect="solid">
        Download 
      </ReactTooltip>

          </div>

}  


export const CustomerInvoiceIcons = function (props) {

  return(
   <div >
      <ul className="reactIcon_Btn">
      <li>
          <FaIcons.FaEye data-tip data-for="viewInvoiceTip" onClick={props.onInvoiceView} />
      </li>
      <li>
          <GiIcons.GiWallet data-tip data-for="payInvoiceTip" onClick={props.onInvoicePay} />
      </li>
      </ul>
     

      <ReactTooltip id="viewInvoiceTip" place="top" effect="solid">
          View Invoice
    </ReactTooltip>


      <ReactTooltip id="payInvoiceTip" place="top" effect="solid">
          Pay Invoice
    </ReactTooltip>



  </div>
  )

}


export const InvoiceCartIcons = function (props) {
  return(
    <div>
    <ul className="reactIcon_Btn_txt">
    <li style={{marginRight:""}}>
        <BiIcons.BiEditAlt className="FaRegTrashAlts" data-tip data-for="EditInvoiceCartProduct" 
        onClick={props.onInvoiceCartProductEdit} /><span></span> 
    </li>
    <li style={{marginRight:""}}>
        <BiIcons.BiPlus className="FaRegTrashAlts"  data-tip data-for="AddInvoiceCartProduct" 
        onClick={props.onInvoiceCartProductAdd}/> <span></span> 
    </li>
    <li>
        <HiIcons.HiMinusSm className="FaRegTrashAlts" data-tip data-for="ReduceInvoiceCartFully" 
        onClick={props.onInvoiceCartProductMinus} /><span></span>
    </li>
    <li style={{marginRight:""}}>
        <FaIcons.FaRegTrashAlt className="FaRegTrashAlts" data-tip data-for="deleteInvoiceCartProduct" 
        onClick={props.onInvoiceCartProductDelete} /><span></span> 
    </li>
    <li> 
        <RiIcons.RiDeleteBin2Fill className="FaRegTrashAlts" data-tip data-for="deleteInvoiceCartFully" 
        onClick={props.onInvoiceCartFullyDelete} /><span></span>
    </li>
</ul>
    

      <ReactTooltip id="EditInvoiceCartProduct" place="top" effect="solid">
          Edit Product
    </ReactTooltip>
     <ReactTooltip id="AddInvoiceCartProduct" place="top" effect="solid">
          Add Product
    </ReactTooltip>

      <ReactTooltip id="ReduceInvoiceCartFully" place="top" effect="solid">
          Reduce Product
    </ReactTooltip>
     

      <ReactTooltip id="deleteInvoiceCartProduct" place="top" effect="solid">
          Delete Product
    </ReactTooltip>

      <ReactTooltip id="deleteInvoiceCartFully" place="top" effect="solid">
          Delete Cart Totally
    </ReactTooltip>

  </div>
  )

}


export const InvoiceEnquiryCartIcons = function (props) {
  return(
    <div>
    <ul className="reactIcon_Btn_txt">
      <li>
      <BiIcons.BiEditAlt className="FaRegTrashAlts" data-tip data-for="EditInvoiceEnquiryCartProduct" 
      onClick={props.onInvoiceEnquiryCartProductEdit} /> 
    </li>
    <li style={{marginRight:""}}>
    <GrIcons.GrFormAdd className="FaRegTrashAlts" style={{color:"white"}} data-tip data-for="AddInvoiceEnquiryCartProduct" 
        onClick={props.onInvoiceEnquiryCartProductAdd} />
    </li>
    <li style={{marginRight:""}}>
        <HiIcons.HiMinusSm className="FaRegTrashAlts" data-tip data-for="ReduceInvoiceEnquiryCartFully" 
        onClick={props.onInvoiceEnquiryCartProductMinus} />
    </li>
    <li style={{marginRight:""}}>
        <FaIcons.FaRegTrashAlt className="FaRegTrashAlts" data-tip data-for="DeleteInvoiceEnquiryCartFully" 
        onClick={props.onInvoiceEnquiryCartProductDelete} />
    </li>
</ul>
    

     
     
     

       <ReactTooltip id="EditInvoiceEnquiryCartProduct" place="top" effect="solid">
          Edit Quantity
    </ReactTooltip>

      <ReactTooltip id="AddInvoiceEnquiryCartProduct" place="top" effect="solid">
          Add Quantity
    </ReactTooltip>

      <ReactTooltip id="ReduceInvoiceEnquiryCartFully" place="top" effect="solid">
          Reduce Quantity
          </ReactTooltip>

 <ReactTooltip id="DeleteInvoiceEnquiryCartFully" place="top" effect="solid">
          Delete Product
          </ReactTooltip>

  </div>
  )

}


export const ToastWarningIcons = function (props){
  console.log("PROPS :",props);

  return(
     
          toast.error(<div><span style={{display: "flex" }}> <img src={warning} alt="logo" style={{width: '20px',paddingRight:'5px',marginTop:'-3px'}} />{props.message}</span></div>, {
            position: props.position,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            marginTop: "60px",
          }),
      

  {/*  <div>
   
      <span>
      <img src={warning} alt="logo" style={{width: '20px',paddingRight:'5px',marginTop:'-3px'}} />
    </span>

  </div>  */}
  )
}

export const ToastSuccessIcons = function (props){
  
  return(
    
    toast.error(<div><span style={{display: "flex" }}> <img src={success} alt="logo" style={{width: '20px',paddingRight:'5px',marginTop:'-3px'}} />{props.message}</span></div>, {
      position: props.position,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      marginTop: "60px",
    }),

    {/*<div>
   
      <span>
      <img src={success} alt="logo" style={{width: '20px',paddingRight:'5px',marginTop:'-3px'}} />
    </span>

  </div> */}
  )
}


export const InformationIcon = function (props) {
  return(
    <div>
    <ul className="reactIcon_Btn_txt">
      <li>
      <BsIcons.BsInfoCircle className="FaRegTrashAlts" data-tip data-for="EditInvoiceEnquiryCartProduct" 
      onClick={props.onInformationIconClicked} /> 
    </li>

</ul>
    

       <ReactTooltip id="EditInvoiceEnquiryCartProduct" place="top" effect="solid">
         Page has some information to be delivered. Click me to view more
    </ReactTooltip>

  </div>
  )

}

export const ReportIcons = function (props)  {

  return(
   <div >
      <ul className="reactIcon_Btn" style={{marginRight:'37px'}}>
      <li>
            <FaIcons.FaEye data-tip data-for="viewServiceTip" onClick={props.onReportView} /> 
            </li>
            <li>
            <BiIcons.BiEdit data-tip data-for="editServiceTip" onClick={props.onReportEdit} /> 
            </li>
            <li>
            <FaIcons.FaRegTrashAlt data-tip data-for="deleteServiceTip" onClick={props.onReportDelete} /> 
            </li>
      </ul>

      <ReactTooltip id="viewServiceTip" place="top" effect="solid">
          View Report
    </ReactTooltip>
      <ReactTooltip id="editServiceTip" place="top" effect="solid">
          Edit Report
    </ReactTooltip>
      <ReactTooltip id="deleteServiceTip" place="top" effect="solid">
          Delete Report
    </ReactTooltip>

  </div>
  )
  }