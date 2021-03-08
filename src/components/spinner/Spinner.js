import React from "react";
import {Spinner} from "react-bootstrap";
import styles from "./spinner.module.css";
 function SpinnerForPending() {
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