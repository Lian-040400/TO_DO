import React, {Component} from 'react';
import {Name} from "./Name.js";
import {Price} from "./Price.js";
import {Description} from "./Description.js";

class Product extends Component{
    
    render(){
      const {name, price,valuta,description}=this.props;
        return(  
            <div>
                <span><Name value={name}   /></span>
                <span><Price value={price} valuta={valuta}/></span>
                <span><Description value={description} /></span>
            </div>
        );
    }
}
export {Product};