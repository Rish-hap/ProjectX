import React from "react"
import LoginView from "../Views/HomeView"
import { login, login_loading } from "../actions/Auth"
import { set_user_data } from "../actions/user"
import { global_error, global_error_clr } from "../actions/global"
import { connect } from 'react-redux';
import Notif from '../Components/Notif'
// import { ReCaptcha } from 'react-recaptcha-v3'
import Header from "../Components/Header"
import FarmingView from "../Views/FarmingView"
import Footer from "../Components/Footer/Index.js"

class Farming extends React.PureComponent {
        constructor(props){
            super(props)
            this.state = {
                valid:false
            }
            this.recaptcha = ""
        }

        // verifyCallback = (recaptchaToken) => {
        //   // Here you will get the final recaptchaToken!!!  
        //   console.log(recaptchaToken, "<= your recaptcha token")
        //   this.setState({
        //     recaptchaToken:recaptchaToken
        //   })
        // }
      

        // execute_captcha = (data)=> {
        //    this.recaptcha.execute();
        //    console.log(this.state.data,"this.state.data")
        // }

        update_data = (data) =>{
          this.setState({
            data
          })
        }

    render(){
      console.log(this.props.global_error_ret,"this.props.globalErrorRet in Container")
        return (
             <React.Fragment>
                <div >
                <Header />
                  <FarmingView
                    

                    global_error = {this.props.global_error}
                  />
               <Footer />
                  <Notif 
                     global_error = {this.props.global_error}
                     global_error_ret = {this.props.global_error_ret}
                     global_error_clr = {this.props.global_error_clr}
                  />
                </div>
             </React.Fragment>
        )
    }
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
 })(Farming)
