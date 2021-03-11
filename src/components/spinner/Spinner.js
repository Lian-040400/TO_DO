import React,{useEffect} from "react";
import {Spinner} from "react-bootstrap";
import styles from "./spinner.module.css";
 function SpinnerForPending() {
    useEffect(()=>{
        document.body.style.overflow="hidden";
        return()=>{
            document.body.style.overflow="auto";
        }
    });
return(
    <div className={
        styles.spinnerContainerStyles
    }>
    <Spinner 
    className={styles.spinnerStyles}
    animation="grow"
     />
   </div>
);
     
 }
 export default SpinnerForPending;