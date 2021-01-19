import React, {Component} from 'react';
class Price extends Component{

    constructor(props){
        super(props);
        this.state={
        value:props.value
    };

    }
    changCurrencyFunction=()=>{
        let {value}=this.state;
        let valueWithoutCurrency=parseFloat(value);
        if(value.includes("$")){
            value=valueWithoutCurrency*500+"AMD";  
        }
        else{
            value=valueWithoutCurrency/500+"$";
        }
        this.setState({
            value:value
        });
    };
    
    render(){
        
        return(
                <span>{this.state.value}  ( 
                <button onClick={this.changCurrencyFunction}> Change the currenc</button> ) 
                </span>
                
         
        );
    }
}
export {Price};