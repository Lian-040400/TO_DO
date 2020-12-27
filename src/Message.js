import React from 'react';
 import {FirstUser } from "./FirstUser.js";
import  SecondUser from './SecondUser.js';
function Message(props){
    
    return(
        <div>
            <h1>{props.message} !</h1>
            <h1>Hello, I'm  <FirstUser name="Ara" surname="Mark"/> </h1>
            <h1>Hello, I'm  <SecondUser name="Bill" surname="Gates"/> </h1>
        </div>

        //EROR
        // estex xndir ka kapvac FirstUseri u SecondUseri het erb bacum em erora talis ytenc el chkaraca uxxem
        
        
    );
}
export default Message;