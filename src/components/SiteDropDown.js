import React, { Component } from 'react';
import SelectSearch from 'react-select';
import _ from 'underscore';
//import { GetEmployeeSite, GetCurrentSite } from './ConstSiteFunction';
import CryptoJS from 'crypto-js';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, 
    GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
const site_dropstyle = {
    marginBottom: "-40px",
    width: " 250px",
    //padding: "10px"
}


export class SiteDropDown extends React.Component {

    constructor(props) {
        super()

        this.state = {
            options: [],

        }

    }
    componentDidMount() {
    SetCurrentPage("SiteDropDown");

        var empSites = GetEmployeeSite();
        var currentSite = GetCurrentSite();
        var emparray = empSites.split(",");
        if (this.props.data !== "")
            this.state.selectedSite = [{ label: this.props.data, value: this.props.data }]
        console.log("this.props ", this.props);
        this.state.options = _.map(emparray, function (site) { return { label: site, value: site }; });
        var alloptions = _.pluck(this.state.options, "value");
        this.state.options.push({ label: "All", value: alloptions.toString() });
        this.setState({
            options: this.state.options
        })
    }
    handleCurrentSite = (e) => {
        var sites = "";
        if (e !== null) {
            const value = e.value;
            var status = e.filter(x => x.label === "All");
            sites = _.pluck(e, "value");
            if (status.length > 0) {
                e = { label: "All", value: sites }
            }
        } else {
            sites = CryptoJS.AES.decrypt(localStorage.getItem('EmpSites'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
            e = [];
        }
        this.setState({
            selectedSite: e,
        });
        this.props.onSiteDropDown(sites);

    }

    render() {
        return (
            <div className="" style={site_dropstyle}>
                {/* <label htmlFor="username">username</label>
                <input
                    type="text"
                    name="username"
                    defaultValue="cool-guy"
                    ref={(input) => this.input = input}
                /> */}
                <SelectSearch options={this.state.options} value={this.state.selectedSite}
                    isMulti={true}
                    onChange={(e) => this.handleCurrentSite(e)} name="WorkingSite" placeholder="Select Site " />

            </div>
        );
    }
}


export const FilterOptions = (dataList, site) => {
    var result;

    console.log("site ", site);
    if (site === "") {
        // All value is selected
        result = dataList;
    }
    else {
        var sites = site.split(",");

        var filterBy = { site: sites };
        result = dataList.filter(function (o) {
            return Object.keys(filterBy).every(function (k) {
                return filterBy[k].some(function (f) {
                    return o[k] == f;
                });
            });
        });
    }
    console.log("result ", result);
    return result;
}


export const EmpFilterOptions = (dataList, filtervalue, filtername) => {
    var result;
   if (filtervalue === "") {
        // All value is selected
        result = dataList;
    }
    else {
        console.log("datalist ",dataList, filtervalue, filtername)
        var values = filtervalue.split(",");

        var filterBy = { [filtername]: values };
        console.log("filterBy ",filterBy);
        result = dataList.filter(function (o) {
            console.log("o ",o);
            return Object.keys(filterBy).every(function (k) {
                console.log("o[k] ",o[k],k);

                var empsite = o[k].split(",");
                console.log("empsite ",empsite);
                return filterBy[k].some(function (f) {
                    return empsite.includes(f);
                });
            });
        });

    }
      return result;
}

export const EmpIdFilterOptions = (dataList, ids) => {
    var result;
    if (ids === "") {
        // All value is selected
        result = dataList;
    }
    else {
        var values = ids.split(",");
        var filterBy = { employeeId: values };
        console.log("dataList, ids",dataList, ids);
        result = dataList.filter(function (o) {
            return Object.keys(filterBy).every(function (k) {
                return filterBy[k].some(function (f) {
                    console.log("Number(o[k]) == Number(f)",Number(o[k]) == Number(f),Number(o[k]) , Number(f))
                    return Number(o[k]) == Number(f);
                });
            });
        });
    }
    return result;
}