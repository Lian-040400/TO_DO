import React from "react";
import {connect} from "react-redux";
 function ShowCount(props) {
return(
    
    <div>
   {props.count}
    </div>
);
     
 }
 const mapStateToProps=(state)=>{
     return({
         count:state.count,
     })

 }
 export default connect(mapStateToProps,null)(ShowCount);