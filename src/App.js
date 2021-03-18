import React,{useEffect} from 'react';
import './App.css';
import ToDo from './components/pages/toDo/ToDo';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Router,Route,Switch,Redirect} from 'react-router-dom';
import {NavBar} from './components/NavBar/NavBar';
import {NotFound} from "./components/pages/404/404";
import { Contact } from "./components/pages/contact/Contact";
import { About } from "./components/pages/about/About";
import SinglTask from "./components/pages/singlTask/SinglTask";
import SpinnerForPending  from "./components/spinner/Spinner";
import { connect } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  history} from "./additional_function/history";

function App(props) {
  const {loader,successMessage,errorMessage}=props;
  useEffect(()=>{
    if(successMessage){
     toast.success(successMessage,{
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
   
    } 
    if(errorMessage){
      toast.error(errorMessage, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    
     } 
    
},[successMessage,errorMessage]);
  return (
    <>
   
   <Router history={history}>
   <NavBar/>
   <Switch>
   <Route
   path='/home'
   component={ToDo}
   exact={true}
   />

<Route
   path='/about'
   component={About}
   exact={true}
   />
   <Route
   path='/contact'
   component={Contact}
   exact={true}
   />

   <Route
   path='/'
   component={ToDo}
   exact={true}
   />
   <Route
   path='/task/:taskId'
   component={SinglTask}
   exact={true}
   />
   <Route
   path='/notFound'
   component={NotFound}
   exact={true}
   />
   <Redirect
   to="/NotFound"
   exact={true}
   />
      </Switch>
   </Router> 

   {loader &&<SpinnerForPending/>}
   <ToastContainer/>
    </>
   

  );
}

const mapStateToProps=(state)=>{
  return{
     loader:state.loader,
     successMessage:state.successMessage,
     errorMessage:state.errorMessage,
  }

}

export default connect(mapStateToProps)(App);
