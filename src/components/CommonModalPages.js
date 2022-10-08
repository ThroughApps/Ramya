import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Enquiry from './Enquiry';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';
import $ from 'jquery';
import { CheckNumberFormat_WithoutDecimal,CheckNumberFormat } from './Invoice/InvoiceValidations';




export class EnquiryProductTypeModal extends  React.Component {


    state={
        productType:"",
    }
    componentDidMount(){
        SetCurrentPage("CommonModalPage");
       }
  
    onProductTypeChange=(e) =>{

        const name = e.target.name;
        const value =  e.currentTarget.value;
        this.setState({ 
            [name]:value
        });

    
        this.props.onSelectProductType(value);   
   
      }


   render() {
     return (

        <div>
              <h5 style={{textAlign:"center",fontWeight:"800"}}>Select Product Type</h5>

        <div style={{marginTop: "32px"}} className="row">
          
            <div className="col-sm-3 col-lg-3 col-md-3">  </div>
            <div className="col-sm-4 col-lg-4 col-md-4">
             <input type="radio" id="product" name="productType" value="product"  onChange={this.onProductTypeChange}/>
             <label style={{marginLeft:"5px"}}> Product</label>
             </div>

             <div className="col-sm-4 col-lg-4 col-md-4">
             <input type="radio" id="service" name="productType" value="service"  onChange={this.onProductTypeChange} />
             <label style={{marginLeft:"5px"}}> Service</label>
             </div>
      </div>
      </div>
        )
   }
}


export class InvoiceProductQtyAddModal extends  React.Component {


    state={
        addQty:"",
    }

  
    onProductAddChange=(e) =>{

        const name = e.target.name;
        const value =  e.currentTarget.value;

        
var qtyValidationData=CheckNumberFormat_WithoutDecimal(this.state.productFieldKeys,value);

if(qtyValidationData==true){
        this.setState({ 
            [name]:value
        });
        this.props.ProductQtyAddFunc(value);   
   
    }else{
        this.Set_QuantityAlertMsg("IncorrectFormat");
        var fieldId="modalquantityalertmsg";
        HideFieldErroeMsgs(fieldId);
    }
      }

      
      handleUser_Product_Qty_KeyPress_Func=(e)=>{

          this.state.productFieldKeys=e.charCode;
        
          this.setState({
            productFieldKeys:this.state.productFieldKeys,
          })
          
        
        }

        Set_QuantityAlertMsg(messageInfo){
  
            $("#modalquantityalertmsg").empty();
             if(messageInfo=="IncorrectFormat"){
              $("#modalquantityalertmsg").append("! Incorrect Number Format");
            }
          }

   render() {
     return (

        <div>
              <h5 style={{textAlign:"center",fontWeight:"800"}}>Add Product Quantity</h5>

        <div style={{marginTop: "32px"}} className="row">
          
            <div className="col-sm-3 col-lg-3 col-md-3">  </div>
            <div className="col-sm-4 col-lg-4 col-md-4">
              <label style={{marginLeft:"5px"}}> Qty</label>
            <input type="text" class="form-control" value={this.state.addQty} 
            id="addQty" name="addQty"  onKeyPress={this.handleUser_Product_Qty_KeyPress_Func}
              onChange={this.onProductAddChange} />
              <span id="modalquantityalertmsg" style={{color:"red"}}></span>
             </div>

             
      </div>
      </div>
        )
   }
}

export class InvoiceProductQtyMinusModal extends  React.Component {


    state={
        minusQty:"",
    }

  
    onProductMinusChange=(e) =>{

        const name = e.target.name;
        const value =  e.currentTarget.value;

        var qtyValidationData=CheckNumberFormat_WithoutDecimal(this.state.productFieldKeys,value);

     
            if(qtyValidationData==true){

                if(value==0 || value < 0){
                    this.Set_QuantityAlertMsg("NoZeroQty");
                    var fieldId="modalquantityalertmsg";
                    HideFieldErroeMsgs(fieldId);

                }else{
                    this.setState({ 
                        [name]:value
                    });
                    this.props.ProductQtyMinusFunc(value);   
                }
            
                }else{
                    this.Set_QuantityAlertMsg("IncorrectFormat");
                    var fieldId="modalquantityalertmsg";
                    HideFieldErroeMsgs(fieldId);
                }

      }
 
 
      handleUser_Product_Qty_KeyPress_Func=(e)=>{

        this.state.productFieldKeys=e.charCode;
      
        this.setState({
          productFieldKeys:this.state.productFieldKeys,
        })
        
      
      }

      Set_QuantityAlertMsg(messageInfo){
  
        $("#modalquantityalertmsg").empty();
         if(messageInfo=="IncorrectFormat"){
          $("#modalquantityalertmsg").append("! Incorrect Number Format");
        }else if(messageInfo=="NoZeroQty"){
            $("#modalquantityalertmsg").append("! Product Qty Cannot be Zero");
        }
      }

   render() {
     return (

        <div>
              <h5 style={{textAlign:"center",fontWeight:"800"}}>Minus Product Quantity</h5>

        <div style={{marginTop: "32px"}} className="row">
          
            <div className="col-sm-3 col-lg-3 col-md-3">  </div>
            <div className="col-sm-4 col-lg-4 col-md-4">
              <label style={{marginLeft:"5px"}}> Qty</label>
            <input type="text" class="form-control" value={this.state.minusQty} 
            id="minusQty" name="minusQty"  onKeyPress={this.handleUser_Product_Qty_KeyPress_Func}
              onChange={this.onProductMinusChange} />
               <span id="modalquantityalertmsg" style={{color:"red"}}></span>
             </div>

             
      </div>
      </div>
        )
   }
}

export class InvoiceProductQtyModal extends  React.Component {


    state={
        minusQty:"",
    }

    componentDidMount(){

        console.log("InvoiceProductQtyModal :",this.props);

        this.state.productName=this.props.stateData.cartEnquiryProductName;
        this.setState({
            productName:this.state.productName,
        })
    }
  
    onProductChange=(e) =>{

        const name = e.target.name;
        const value =  e.currentTarget.value;

        var qtyValidationData=CheckNumberFormat_WithoutDecimal(this.state.productFieldKeys,value);

        if(qtyValidationData==true){
                this.setState({ 
                    [name]:value
                });
                this.props.ProductQtyFunc(value);  
        
            }else{
                this.Set_QuantityAlertMsg("IncorrectFormat");
                var fieldId="modalquantityalertmsg";
                HideFieldErroeMsgs(fieldId);
            }

   
      }


    

      handleUser_Product_Qty_KeyPress_Func=(e)=>{

        this.state.productFieldKeys=e.charCode;
      
        this.setState({
          productFieldKeys:this.state.productFieldKeys,
        })
        
      
      }

      Set_QuantityAlertMsg(messageInfo){
  
        $("#modalquantityalertmsg").empty();
         if(messageInfo=="IncorrectFormat"){
          $("#modalquantityalertmsg").append("! Incorrect Number Format");
        }
      }

   render() {
     return (

        <div>
              <h5 style={{textAlign:"center",fontWeight:"800"}}>Product Quantity</h5>

        <div style={{marginTop: "32px"}} className="row">
          
            <div className="col-sm-3 col-lg-3 col-md-3">  
            <label style={{marginLeft:"5px"}}> Product</label>
            <label style={{marginLeft:"5px"}}> { this.state.productName}</label>           
            </div>
            <div className="col-sm-4 col-lg-4 col-md-4">
              <label style={{marginLeft:"5px"}}> Qty</label>
            <input type="text" class="form-control" value={this.state.productQty} 
            id="productQty" name="productQty"  onKeyPress={this.handleUser_Product_Qty_KeyPress_Func}
              onChange={this.onProductChange} />
               <span id="modalquantityalertmsg" style={{color:"red"}}></span>
             </div>

             
      </div>
      </div>
        )
   }
}


function HideFieldErroeMsgs(fieldId) {
    setTimeout(function () {
        $("#"+fieldId).empty();
    }, 4000);
}


