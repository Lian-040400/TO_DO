import React from 'react';
import './App.css';
import ToDo from './components/pages/toDo/ToDo';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import {NavBar} from './components/NavBar/NavBar';
import {NotFound} from "./components/pages/404/404";
import { Contact } from "./components/pages/contact/Contact";
import { About } from "./components/pages/about/About";
import SinglTask from "./components/pages/singlTask/SinglTask"
function App() {
  return (
    <>
   
   <BrowserRouter>
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
   </BrowserRouter>
    </>

  );
}

export default App;
