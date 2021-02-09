import React from 'react';
import './App.css';
import ToDo from './components/pages/toDo/ToDo';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import {NavBar} from './components/NavBar/NavBar';
import {NotFound} from "./components/pages/404/404";
import { Contact } from "./components/pages/contact/Contact";
import { About } from "./components/pages/about/About";
function App() {
  return (
    <>
   
   <BrowserRouter>
   <NavBar/>
   <Switch>
   <Route
   path='/home'
   component={ToDo}
   exact
   />

<Route
   path='/about'
   component={About}
   exact
   />
   <Route
   path='/contact'
   component={Contact}
   exact
   />

   <Route
   path='/'
   component={ToDo}
   exact
   />
   <Route
   path='/notFound'
   component={NotFound}
   exact
   />
   <Redirect
   to="/NotFound"
  
   />
      </Switch>
   </BrowserRouter>
    </>

  );
}

export default App;
