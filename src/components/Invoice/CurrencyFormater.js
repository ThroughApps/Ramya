import React, { Component } from "react";
import CryptoJS from "crypto-js";
import currencyFormatter from "currency-formatter";
import moment from 'moment-timezone';
import _ from 'underscore';
import { GetCurrentSite, GetSiteDetails } from "../ConstSiteFunction";

var numberToWord = require('npm-number-to-word');


export const GetCurrencies = () => {
    var currencies = currencyFormatter.currencies;
     console.log("currencies :", currencies);
     return currencies;
 }

export const CurrencyFormat = () => {

    var currentSite=GetCurrentSite();
  var siteDetails=GetSiteDetails(); 
  var currencies=GetCurrencies();
  
  //console.log("siteDetails :",siteDetails);
  //console.log("currentSite :",currentSite);
  
  var siteDetailsArray=JSON.parse(`[ ${siteDetails}]`);
  
  
  console.log("currentSite_CurrencyData :",siteDetailsArray);
  console.log("currentSite_CurrencyData POSITION 0:",siteDetailsArray[0]);
  
  var currentSiteData=_.findWhere(siteDetailsArray[0],{siteName:currentSite});
  
  console.log("currentSiteData :",currentSiteData);
  
  var currentSite_CurrencyCode=_.findWhere(currencies,{code:currentSiteData.currencyCode});
  
  
  var currencySymbol=currentSite_CurrencyCode.symbol;
  var currencyCode=currentSite_CurrencyCode.code;
 
  console.log("currencySymbol :",currencySymbol);
  console.log("currencyCode :",currencyCode);

  var currencyData={
      currencySymbol:currencySymbol,
      currencyCode:currencyCode,
  }
    return currencyData;
}

export const SiteCurrencySymbol= (sitename) =>
 {

var siteData=GetSiteDetails();   //all site names

var currenciesdata=GetCurrencies(); //all currencies format

var siteDataArray=JSON.parse(`[ ${siteData}]`);

var currentSiteInfo=_.findWhere(siteDataArray[0],{siteName:sitename});

// console.log("currentSiteData :",currentSiteData); //having siteName & currency code :usd
var currentSite_CurrencyCode=_.findWhere(currenciesdata,{code:currentSiteInfo.currencyCode});

var currencySymbol=currentSite_CurrencyCode.symbol;
var currencyCode=currentSite_CurrencyCode.code;
 
console.log("currencySymbol :",currencySymbol);
console.log("currencyCode :",currencyCode);

var currencyData={
    currencySymbol:currencySymbol,
    currencyCode:currencyCode,
}

  return currencyData;

}