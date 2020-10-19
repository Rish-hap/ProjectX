import React from "react"
import LoginView from "../Views/HomeView"
import { login, login_loading } from "../actions/Auth"
import { set_user_data } from "../actions/user"
import { global_error, global_error_clr } from "../actions/global"
import { connect } from 'react-redux';
import Notif from '../Components/Notif'
// import { ReCaptcha } from 'react-recaptcha-v3'
import Footer from "../Components/Footer/Index.js"
import StakingView from "../Views/StakingView"

import MetamaskContext from '../contexts/metamask';
function Staking (props) {

      const metamaskContextValue = React.useContext(MetamaskContext);

        return (
             <React.Fragment>
                <div >
                <StakingView


                    global_error = {props.global_error}
                  />
                <Footer />
                  <Notif
                     global_error = {props.global_error}
                     global_error_ret = {props.global_error_ret}
                     global_error_clr = {props.global_error_clr}
                  />
                </div>
             </React.Fragment>
        )
}

const mapStateToProps = state => ({
  auth_store: state.auth_store,
  login_ret:state.auth_store.login_ret,
  login_loading_flag:state.auth_store.login_loading,
  global_error_ret:state.global_store.global_error_ret
})

export default connect(mapStateToProps, {
  login,
  login_loading,
  global_error,
  global_error_clr,
  set_user_data
 })(Staking)
