import React, { useEffect } from 'react';
import _ from 'underscore';
import * as moment from "moment";
import $ from 'jquery';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';


const RazorPay = () => {
    const options = {
        key: 'rzp_test_4yxPzjlNHFW8EE',
        amount: '1', //  = INR 1
        name: 'Acme shop',
        description: 'some description',
        image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
        handler: function(response) {
       //     console.log("RESPONSE :",response);

       //     alert(response.razorpay_payment_id);
        },
        prefill: {
            name: 'Gaurav',
            contact: '9999999999',
            email: 'demo@demo.com'
        },
        notes: {
            address: 'some address'
        },
        theme: {
            color: 'blue',
            hide_topbar: false
        }
    };

    const openPayModal = () => {
      
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    };
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <>
            <button onClick={openPayModal}>Pay with Razorpay</button>
        </>
    );
};

export default RazorPay;


export const CustomRazorPayFunc = (CustomRazorPay) => {

    var paymentStatus;
    var response;

 /*   console.log("CustomRazorPay :",CustomRazorPay);
    console.log("CustomRazorPay DATA :",CustomRazorPay.data);
    console.log("CustomRazorPay AMOUNT :",CustomRazorPay.amount);
    console.log("CustomRazorPay paymentConfigArray :",CustomRazorPay.paymentConfigArray);
    console.log("CustomRazorPay COMPANYNAME :",CustomRazorPay.garageName);
    console.log("CustomRazorPay ORDER ID :",CustomRazorPay.orderId);
    console.log("CustomRazorPay TIMEZONE ARRAY :",CustomRazorPay.timeZoneArray);
    console.log("CustomRazorPay SITENAME :",CustomRazorPay.siteName);
    console.log("CustomRazorPay INVOICE LIST ARRAY :",CustomRazorPay.invoiceListArray);
*/
    

    var siteName=CustomRazorPay.siteName;
    var paymentConfigArray=CustomRazorPay.paymentConfigArray;

    var razorPayArray=_.where(paymentConfigArray,{paymentGateway: "razorpay"});

    var timeZoneArray=CustomRazorPay.timeZoneArray;

 //   console.log("razorPayArray :",razorPayArray);
  

   // var amount= CustomRazorPay.amount ;

   var amount= CustomRazorPay.amount;

   if(CustomRazorPay.amountatorderid!=""){
      amount=CustomRazorPay.amountatorderid;
   }
    var invoiceListArray=CustomRazorPay.invoiceListArray;

    var companyId=CustomRazorPay.companyId;
    var customerId=CustomRazorPay.customerId;
    var orderId=CustomRazorPay.orderId;
    var invoiceNo=CustomRazorPay.invoiceNo;
    var type=CustomRazorPay.type;
    var gateWay='razorPay';


    const options = {
        key: razorPayArray[0].merchantId, //SET MERCHANT ID
      //  amount: '100', //  = INR 1
        amount: amount,
        currency:'USD',
        name: CustomRazorPay.garageName,
      //  description: 'some description',
         order_id:CustomRazorPay.orderId,
        image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
        handler: function(response) {

         //   console.log("RESPONSE :",response);
           // alert(response.razorpay_payment_id);
           paymentStatus="Success";
           response=response;
           var paymentId=response.razorpay_payment_id;

           UpdatePaymentStatus(paymentStatus,response,paymentId,timeZoneArray,
               siteName,amount,companyId,customerId,orderId,invoiceNo,
               type,gateWay,CustomRazorPay,invoiceListArray);
        },
        prefill: {
            name: CustomRazorPay.customerName,
            contact:  CustomRazorPay.contactNo,
            email:  CustomRazorPay.emailId
        },
        notes: {
            address: 'some address'
        },  
        theme: {
            color: 'blue',
            hide_topbar: false
        }
    };

    const openPayModal = () => {

          //call ajax for checking if payment is made with local DB & with RAZORPAY 
        var check_Status
        var response =CheckPaymentStatus(amount,companyId,customerId,invoiceNo,
            CustomRazorPay,invoiceListArray,razorPayArray[0].merchantId,razorPayArray[0].merchantKey);

            console.log("check_Status :"+check_Status);
            response.then(function (response) {

               console.log("response promise :",response);
               check_Status=response;
               
               if(check_Status=="Attempeted_Failed"){
                var rzp1 = new window.Razorpay(options);
                rzp1.open();
        
                rzp1.on('payment.failed', function (response){
                  /*  alert(response.error.code);
                    alert(response.error.description);
                    alert(response.error.source);
                    alert(response.error.step);
                    alert(response.error.reason);
                    alert(response.error.metadata.order_id);
                    alert(response.error.metadata.payment_id); */
               //     console.log("ERROR RESPONSE :",response);
                    paymentStatus="Failed";
                    response=response;
                    var paymentId='';
        
                    UpdatePaymentStatus(paymentStatus,response,paymentId,timeZoneArray,
                        siteName,amount,companyId,customerId,orderId,invoiceNo,
                        type,gateWay,CustomRazorPay,invoiceListArray);
        
            });
    
    
            }else{
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Amount Paid Already',
                    showConfirmButton: false,
                    timer: 2000
                  })
            }

              });

       
       

    };


    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <>
            <button onClick={openPayModal}>Pay with Razorpay</button>
        </>
    );
};

const calcTime=(city, offset)=> {
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


const GetTimeZoneDate = (offset) => {
    //  var offset = -8;
    var todayDate = new Date(new Date().getTime() + offset * 3600 * 1000).toUTCString().replace(/ GMT$/, "")


    var d1 = new Date(todayDate);
    var d2 = d1.getFullYear() + "-"
        + ('0' + (d1.getMonth() + 1)).slice(-2) + "-"
        + ('0' + d1.getDate()).slice(-2);


    return d2;

}

const UpdatePaymentStatus = (paymentStatus,response,paymentId,timeZoneArray,siteName,
    amount,companyId,customerId,orderId,invoiceNo,type,gateWay,CustomRazorPay,invoiceListArray) => {
    
  //  console.log("PAYMENT STATUS :",paymentStatus);
 //   console.log("RESPONSE DATA :",response);


    var currentSiteDetails=_.where(timeZoneArray,{siteName:siteName});

    var offset = moment.tz(moment.utc(), currentSiteDetails[0].timeZone).utcOffset();
    var offsetValue = Number(offset) / 60; //CONVERTING MIN INTO HRS

    var timings = calcTime(currentSiteDetails[0].timeZone, offsetValue);
    var date = GetTimeZoneDate(offsetValue);
    var time = timings.toLocaleTimeString([], { hour12: false });


    var current_invoice_data=_.where(invoiceListArray,{invoiceNo:invoiceNo});

    console.log("current_invoice_data :",current_invoice_data);

    //CALCUALTION FOR SALE & ESTIMATE INVOICE TABLE

        var amount_to_be_Paid=current_invoice_data[0].amountPaid;
        var totalInvoiceAmount=current_invoice_data[0].subTotal;
        var discountAmount=current_invoice_data[0].discount;


    //    var Invoice_amountPaid=Number(amount_to_be_Paid) + Number(amount);
    var Invoice_amountPaid=Number(amount_to_be_Paid) + Number(amount)+Number(discountAmount);
    var Invoice_current_amountPaid=Number(amount_to_be_Paid) + Number(amount);
    var Invoice_balanceAmount=Number(totalInvoiceAmount)-Number(Invoice_amountPaid);
     


    $.ajax({
        type: 'POST',
        data: JSON.stringify({
          companyId:companyId,
          customerId:customerId,  
          amount:amount,
          orderId:orderId,
          invoiceNo:invoiceNo,
          date:date,
          time:time,
          status:paymentStatus,
          paymentId:paymentId,
          type:type,
          paymentGateWay:gateWay,
          invoiceAmountPaid:Invoice_current_amountPaid,
          invoiceBalanceAmount:Invoice_balanceAmount,
          subTotal:totalInvoiceAmount,


        }),
          url:  "http://15.206.129.105:8080/ThroughBooksCOAPI/CustomerPayment/RecordTransaction",
        contentType: "application/json",
        dataType: 'json',
        crossDomain:true,
        success: function (data, textStatus, jqXHR) {
  
         //   console.log("ORDERS :",data);

            CustomRazorPay.PaymentChanges(data);
            
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



const CheckPaymentStatus=  async function (amount,companyId,customerId,invoiceNo,
    CustomRazorPay,invoiceListArray,merchantId,merchantKey) {
        
return new Promise((resolve, reject) => {
    console.log("*********** CheckPaymentStatus ******************");
    var response="Success";

    console.log("CHECK STATUS DATA :",JSON.stringify({
        companyId:companyId,
        customerId:customerId,  
        amount:amount,
        invoiceNo:invoiceNo,
        razorPayMerchantId:merchantId,
        razorPayMerchantKey:merchantKey,
      /*  paymentGateWay:gateWay,
        invoiceAmountPaid:Invoice_amountPaid,
        invoiceBalanceAmount:Invoice_balanceAmount,
        subTotal:totalInvoiceAmount,
        */
      }));

    $.ajax({
        type: 'POST',
        data: JSON.stringify({
          companyId:companyId,
          customerId:customerId,  
          amount:amount,
          invoiceNo:invoiceNo,
          razorPayMerchantId:merchantId,
          razorPayMerchantKey:merchantKey,
        /*  paymentGateWay:gateWay,
          invoiceAmountPaid:Invoice_amountPaid,
          invoiceBalanceAmount:Invoice_balanceAmount,
          subTotal:totalInvoiceAmount,
          */
        }),
          url:  "http://15.206.129.105:8080/ThroughBooksCOAPI/CustomerPayment/PaymentCheck",
        contentType: "application/json",
        dataType: 'json',
        crossDomain:true,
        success: function (data, textStatus, jqXHR) {
  
            console.log("PYMENT STATUS :",data);
            response=data.response;
            CustomRazorPay.PaymentChanges(data);
            resolve(response);
        },
        error: function (data, textStatus, jqXHR) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Network Connection Problem',
            showConfirmButton: false,
            timer: 2000
          })
          resolve("rss");
  
        },
  
      });




 return response;
    })

}