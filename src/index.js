import React from 'react';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import ReactDOM from 'react-dom';
import {  Counter} from "../src/components/redux/Counter";
import styles from "./components/redux/counter.module.css";
import './index.css';
import App from './App';
function reduser(state={count:0},action) {
  
  if(action.type==="INCREMENT"){
    return{
    count:state.count+1
  }
  }
  if(action.type==="DECREMENT"){
    return({
    count:state.count-1
  })
  }
  return state;
  
}
const store=createStore(reduser);
ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
<Provider
store={store}
>
  <div
  className={styles.divStyle}
  ><Counter/></div>


</Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);


