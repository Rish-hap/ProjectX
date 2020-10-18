import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import Web3 from 'web3';
import { login, login_loading } from "../actions/Auth"
import { set_user_data } from "../actions/user"
import { global_error, global_error_clr } from "../actions/global"
import Notif from '../Components/Notif'
import Header from "../Components/Header"
import HomeView from "../Views/HomeView"
import Footer from "../Components/Footer/Index.js"
import { withRouter } from "react-router-dom"
import {compose} from "redux"
import {
  contractDeployedNetwork
} from '../utils/config';
import { TIMEOUT, NOT_INSTALLED, LOCKED } from '../metamask/constants';

function Home(props) {
  const [metamaskContextValue, setMetamaskContextValue] = React.useState({
    ethereumAddress: null,
    superContractInstance: null,
    megaContractInstance: null,
    ultraContractInstance: null,
    liquidityProviderTokenStakingContractInstance: null,
    web3Instance: null,
    metamaskError: null,
  });
  const [networkError, setNetworkError] = React.useState(false);
  const chainedWeb3 = window.ethereum;

  if (chainedWeb3) {
    chainedWeb3.on('networkChanged', networkId => {
      console.log('networkChanged -> networkId -> ', networkId);
      // handle the new network
      resetApp();
      window.location.reload();
    });

    chainedWeb3.on('accountsChanged', account => {
      console.log('accountsChanged -> account -> ', account);
      // handle the new account
      resetApp();
    });
  }

  const resetApp = async (metamaskError = null) => {
    if (
      metamaskContextValue.web3Instance &&
      metamaskContextValue.web3Instance.currentProvider &&
      metamaskContextValue.web3Instance.currentProvider.close
    ) {
      await metamaskContextValue.web3Instance.currentProvider.close();
    }
    setMetamaskContextValue({
      ethereumAddress: null,
      superContractInstance: null,
      megaContractInstance: null,
      ultraContractInstance: null,
      liquidityProviderTokenStakingContractInstance: null,
      web3Instance: null,
      metamaskError,
    });
  };

  const loadBlockChain = async () => {
    const error =
      typeof window !== 'undefined' && Boolean(window.ethereum || window.web3);

    error ? console.log('NO ERROR') : resetApp(NOT_INSTALLED);

    try {
      window.web3 = new window.Web3(window.ethereum);
      await window.ethereum.enable();
      const web3 = await new Web3(window.web3.currentProvider);
      const network = await web3.eth.net.getNetworkType();
      console.log('Network: ', network);

      if (network === contractDeployedNetwork.toLowerCase()) {
        console.log('web3: ', web3);
        const accounts = await web3.eth.getAccounts();
        // const contractSuper = new web3.eth.Contract(
        //   superABI,
        //   superContractAddress,
        // );
       

        setMetamaskContextValue({
          ...metamaskContextValue,
          ethereumAddress: accounts[0],
          // superContractInstance: contractSuper,
          // megaContractInstance: contractMega,
          // ultraContractInstance: contractUltra,
          // liquidityProviderTokenStakingContractInstance: contractLPTS,
          web3Instance: web3,
        });
        setNetworkError(false);
      } else {
        setNetworkError(true);
        resetApp(
          `Please switch your metamask network to ${contractDeployedNetwork.toUpperCase()}`,
        );
      }
    } catch (err) {
      console.log('error catch: ', err);
    }
  };

  const handleConnectMetamask = () => {
    loadBlockChain();
  };

  React.useEffect(() => {
    handleConnectMetamask()
  }, []);
  const authObject =()=> {
    return {
     isAuthenticated: !!localStorage.getItem('token')
    }
 }


 console.log(props,"props in props")

  return (
    <React.Fragment>
    <div >
    <Header />
      <HomeView
        

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