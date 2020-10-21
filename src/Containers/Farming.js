import React from "react"
import LoginView from "../Views/HomeView"
import { login, login_loading } from "../actions/Auth"
import { set_user_data } from "../actions/user"
import { global_error, global_error_clr } from "../actions/global"
import { connect } from 'react-redux';
import Notif from '../Components/Notif'
// import { ReCaptcha } from 'react-recaptcha-v3'
import FarmingView from "../Views/FarmingView"
import Footer from "../Components/Footer/Index.js"

import MetamaskContext from '../contexts/metamask';

import {
  fessContractAddress,
  fnirContractAddress
} from '../utils/config';

function Farming ({fnirBalance, getFnirBalance, getFessBalance, fessBalance  }){
      const metamaskContextValue = React.useContext(MetamaskContext);

      const [userApprove, setUserApprove] = React.useState(0);

      const [allowance, setAllowance] = React.useState(0);

      const [userSwap, setUserSwap] = React.useState(0);

      const getAllowance = async () => {
        try {
          const allowanceValue = await metamaskContextValue.fessContractInstance.methods
            .allowance(
              metamaskContextValue.ethereumAddress,
              fnirContractAddress,
            )
            .call();

            setAllowance((
              Number(allowanceValue) / Math.pow(10, 18)
            ).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 4,
            }))

            setUserSwap((
              Number(allowanceValue) / Math.pow(10, 18)
            ).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 4,
            }))
        } catch (err) {
          console.log('Farming -> getAllowance: err: ', err);
        }
      }

      const handleApprove = async() => {
        if (Number(userApprove) > 0) {
          try {
          const approveRequest = await metamaskContextValue.fessContractInstance.methods
          .approve(
            fnirContractAddress,
            metamaskContextValue.web3Instance.utils.toWei(
              String(userApprove),
              'ether',
            ),
          )
          .send({
            from: metamaskContextValue.ethereumAddress,
            to: fessContractAddress,
          });

          console.log('approveRequest: ', approveRequest)

          getAllowance();
          getFessBalance();
        getFnirBalance();
        } catch (err) {
          console.log('Farming -> handleApprove: err: ', err);
        }
        }
      }

      const handleSwap = async() => {
        console.log('handleSwap: allowance: ', Number(allowance));
        console.log('handleSwap: userSwap: ', Number(userSwap));
        console.log('Number(allowance) >= Number(userSwap): ', Number(allowance) >= Number(userSwap))
        if (Number(allowance) > 0 && Number(userSwap) > 0  && Number(allowance) >= Number(userSwap)) {
          try {
            console.log('handleSwap is called successfully');
          const swapRequest = await metamaskContextValue.fnirContractInstance.methods
          .swapTokens(
            metamaskContextValue.web3Instance.utils.toWei(
              String(userSwap),
              'ether',
            ),
          )
          .send({
            value:  metamaskContextValue.web3Instance.utils.toWei(
              String(0.1),
              'ether',
            ),
            from: metamaskContextValue.ethereumAddress,
            to: fnirContractAddress,
          });

          console.log('swapRequest: ', swapRequest)

          getAllowance();
          getFessBalance();
          getFnirBalance();
        } catch (err) {
          console.log('Farming -> handleSwap: err: ', err);
        }
        }

      }

      React.useEffect(() => {
        if (
          metamaskContextValue.fessContractInstance &&
          metamaskContextValue.fnirContractInstance
        ) {
        getAllowance();
        getFessBalance();
        getFnirBalance();
        }
      }, [metamaskContextValue.fessContractInstance,
        metamaskContextValue.fnirContractInstance])


      console.log('allowance: ', allowance)
      console.log('fessBalance: ', fessBalance)
      console.log('fnirBalance: ', fnirBalance)

        return (
             <React.Fragment>
                <div >
                <FarmingView
                    userApprove={userApprove}
                    setUserApprove={setUserApprove}
                    handleApprove={handleApprove}
                    allowance={allowance}
                    fessBalance={fessBalance}
                    fnirBalance={fnirBalance}
                    userSwap={userSwap}
                    setUserSwap={setUserSwap}
                    handleSwap={handleSwap}
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
 })(Farming)