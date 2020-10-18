import React, { useEffect } from 'react';

import './App.css';
import './sass/main.scss';
import 'antd/dist/antd.css';
import Home from "./Containers/Home"
import Farming from "./Containers/Farming"
import Reward from "./Containers/Reward"
import Staking from "./Containers/Staking"
import {  Route, Switch, Redirect,  BrowserRouter as Router } from 'react-router-dom'


function App(props) {
  const authObject =()=> {
    return {
     isAuthenticated: !!localStorage.getItem('token')
    }
 }
  return (
      <React.Fragment>
         <Router>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route  path ="/home" component={()=><div ><Home /></div>}/>
            <Route  path ="/farming" component={()=><div ><Farming /></div>}/>
            <Route  path ="/reward" component={()=><div ><Reward /></div>}/>
            <Route  path ="/staking" component={()=><div ><Staking /></div>}/>
          </Switch>
      </Router>
      </React.Fragment>
  )

}

const mapStateToProps = state => ({
  user: state
})

export default App
