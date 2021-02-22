import React from "react";
import {connect} from "react-redux";


 function Increment(props) {
   
return(
    <>
    <button
     onClick={props.onchange}>
        + Increment
    </button>
</>
);
     
 }
 const mapDispachToProps=(dispach)=>{
     return({
        onchange:()=>{
            dispach({type:"INCREMENT"})
        }
     })
    

}
export default connect(null,mapDispachToProps)(Increment);