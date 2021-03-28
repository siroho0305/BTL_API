import React from 'react';
import { BrowserRouter as Switch, Route } from "react-router-dom";
import Location from './layouts/Location';
import LogIn from './layouts/LogIn'

const ManageRoute = () =>{
  return(
    <Switch>
        <Route exact path='/' to='/login' render={()=> <LogIn/>}/>
        <Route path='/location' render={() => <Location/>}/>
    </Switch>
  )
}

export default ManageRoute;