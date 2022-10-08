import React, { Component } from "react";
import CryptoJS from "crypto-js";
import currencyFormatter from "currency-formatter";
import moment from 'moment-timezone';
import _ from 'underscore';


export const GetCurrentSite = () => {
    var currentSite = CryptoJS.AES.decrypt(localStorage.getItem('CurrentSite'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    return currentSite;
}
export const GetEmployeeSite = () => {
    var empSites = CryptoJS.AES.decrypt(localStorage.getItem('EmpSites'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
  
    return empSites;
}

export const GetSiteDetails = () => {
    var siteDetails = CryptoJS.AES.decrypt(localStorage.getItem('SiteDetails'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
  
    return siteDetails;
}

export const GetCurrencies = () => {
    var currencies = currencyFormatter.currencies;
     console.log("currencies :", currencies);
     return currencies;
 }


export const SetCurrentPage = (currentPageName) => {
    console.log("SetCurrentPage :", currentPageName);
    localStorage.setItem('PreviousVistedPage', CryptoJS.AES.encrypt(currentPageName, "shinchanbaby"));
 }

 export const GetPreviousPage = () => {
    var PreviousVistedPage = CryptoJS.AES.decrypt(localStorage.getItem('PreviousVistedPage'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
  
    return PreviousVistedPage;
}


export const OffsetValueCalcFunc=(city, offset) =>{


    var currentSite=GetCurrentSite();
    var siteDetails=GetSiteDetails(); 
    var currencies=GetCurrencies();

    var siteDetailsArray=JSON.parse(`[ ${siteDetails}]`);

    console.log("siteDetailsArray :",siteDetailsArray);
    console.log("siteDetailsArray POSITION 0:",siteDetailsArray[0]);
    
    var currentSiteData=_.findWhere(siteDetailsArray[0],{siteName:currentSite});
    console.log("currentSiteData :",currentSiteData);

    var empZone = currentSiteData.timeZone;
console.log("empZone :",empZone);


var offset = moment.tz(moment.utc(), empZone).utcOffset();
var offsetValue = Number(offset) / 60; //CONVERTING MIN INTO HRS
var timings = CalcTime(empZone, offsetValue);
var todayDate = GetTimeZoneDate(offsetValue);
var currenttime = timings.toLocaleTimeString([], { hour12: false });

var date_Time={
    date:todayDate,
    time:currenttime,
}

return date_Time;
}

export const CalcTime=(city, offset) => {
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


export const GetTimeZoneDate=(offset) => {
    //  var offset = -8;
    var todayDate = new Date(new Date().getTime() + offset * 3600 * 1000).toUTCString().replace(/ GMT$/, "")


    var d1 = new Date(todayDate);
    var d2 = d1.getFullYear() + "-"
        + ('0' + (d1.getMonth() + 1)).slice(-2) + "-"
        + ('0' + d1.getDate()).slice(-2);


    return d2;

}

export const GetDynamicFieldsName=(moduleName) => {

    var dynamicFieldDetails = CryptoJS.AES.decrypt(localStorage.getItem('DynamicFields'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    var dynamicFieldDetailsArray=JSON.parse(`[ ${dynamicFieldDetails}]`);

    var dynamicFieldData=_.where(dynamicFieldDetailsArray[0],{fieldModule:moduleName});

    return dynamicFieldData;


}
