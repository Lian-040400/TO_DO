import React from "react";
import {connect} from "react-redux";

 function Decrement(props) {
return(
   <>
       <button
       onClick={props.onchange}
       >
        - Decrement
       </button>
   </>
);
     
 }
 const mapDispachToProps=(dispach)=>{
     return({
          onchange:()=>{
         dispach({type:"DECREMENT"})
     }
     })
    

 }
 export default connect(null,mapDispachToProps)(Decrement);