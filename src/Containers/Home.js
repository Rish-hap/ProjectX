import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { login, login_loading } from "../actions/Auth"
import { set_user_data } from "../actions/user"
import { global_error, global_error_clr } from "../actions/global"
import Notif from '../Components/Notif'

import HomeView from "../Views/HomeView"
import Footer from "../Components/Footer/Index.js"
import { withRouter } from "react-router-dom"
import {compose} from "redux"


import MetamaskContext from '../contexts/metamask';

function Home({fnirBalance, fnirTotalSupply, fessBalance}) {
  const metamaskContextValue = React.useContext(MetamaskContext);


  const authObject =()=> {
    return {
     isAuthenticated: !!localStorage.getItem('token')
    }
 }


//  console.log(props,"props in props")

  return (
    <React.Fragment>
    <div >
      <HomeView
      fnirBalance={fnirBalance}
      fnirTotalSupply={fnirTotalSupply}
      fessBalance={fessBalance}
        // global_error = {props.global_error}
      />
      <Footer />
      {/* <Notif
         global_error = {props.global_error}
         global_error_ret = {props.global_error_ret}
         global_error_clr = {props.global_error_clr}
      /> */}
    </div>
 </React.Fragment>
  );
}


const mapStateToProps = state => ({
  auth_store: state.auth_store,
  login_ret:state.auth_store.login_ret,
  login_loading_flag:state.auth_store.login_loading,
  global_error_ret:state.global_store.global_error_ret
})

// const ShowTheLocationWithRouter = withRouter(Home);

export default connect(mapStateToProps, {
  login,
  login_loading,
  global_error,
  global_error_clr,
  set_user_data
 })(Home)