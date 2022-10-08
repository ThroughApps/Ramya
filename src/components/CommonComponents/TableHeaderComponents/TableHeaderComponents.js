import React, { Component } from "react";
import CryptoJS from "crypto-js";
import currencyFormatter from "currency-formatter";
import moment from 'moment-timezone';
import _ from 'underscore';
import $ from 'jquery';

export const SetUp_ColumnHeaders = (columnHeaderList,columnHeaderList_Status) => {

    var columnHeaderData=[];
    $.each(columnHeaderList,function(i,item){
        
       var headerData= {
            Header: item,
            accessor: item,
            show:columnHeaderList_Status[i]
        }
        columnHeaderData.push(headerData);
    })
   
    return columnHeaderData;
}

export const SetUp_ColumnHeaders_Dropdown = (columnHeaderList,columnHeaderList_Status) => {

    var columnHeaderDropdownData=[];
    $.each(columnHeaderList,function(i,item){
        if(columnHeaderList_Status[i]==true){
       var headerDropdownData= {
            label: item,
            value: item
        }
        columnHeaderDropdownData.push(headerDropdownData);
    }
    })
   
    return columnHeaderDropdownData;
}

export const SetUp_ColumnHeaders_Selected_Dropdown = (columnHeaderList,columnHeaderList_Status) => {

    var columnHeader_SelectedDropdownData=[];
   
    $.each(columnHeaderList,function(i,item){
        if(columnHeaderList_Status[i]==true){
       var Header_SelectedDropdownData= {
            label: item,
            value: item
        }
    columnHeader_SelectedDropdownData.push(Header_SelectedDropdownData);
    }
    })
   
    return columnHeader_SelectedDropdownData;
}