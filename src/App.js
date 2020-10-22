import React, { useEffect } from 'react';
import Web3 from 'web3';

import './App.css';
import './sass/main.scss';
import 'antd/dist/antd.css';
import Home from "./Containers/Home"
import Farming from "./Containers/Farming"
import Reward from "./Containers/Reward"
import Staking from "./Containers/Staking"
import {  Route, Switch, Redirect,  BrowserRouter as Router } from 'react-router-dom'
import Header from "./Components/Header"
import fessABI from './utils/fessABI';
import fnirABI from './utils/fnirABI';
import liquidityABI from './utils/liquidityABI';
import {
  contractDeployedNetwork,
  fessContractAddress,
  fnirContractAddress,
  liquidityContractAddress
} from './utils/config';
import { TIMEOUT, NOT_INSTALLED, LOCKED } from './metamask/constants';

import styled from 'styled-components';

import { ImWarning } from 'react-icons/im';
import { GiCrossMark } from 'react-icons/gi';

import { MetamaskProvider } from './contexts/metamask';

function App(props) {
  const [metamaskContextValue, setMetamaskContextValue] = React.useState({
    ethereumAddress: null,
    fessContractInstance: null,
    fnirContractInstance: null,
    liquidityContractInstance: null,
    web3Instance: null,
    metamaskError: null,
  });

  const [fnirBalance, setFnirBalance] = React.useState(0);
  const [fnirTotalSupply, setFnirTotalSupply] = React.useState(0);
  const [fessBalance, setFessBalance] = React.useState(0);

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
      fessContractInstance: null,
      fnirContractInstance: null,
      liquidityContractInstance: null,
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
        const contractFESS = new web3.eth.Contract(
          fessABI,
          fessContractAddress,
        );

        const contractFNIR = new web3.eth.Contract(
          fnirABI,
          fnirContractAddress,
        );

        const contractLiquidity = new web3.eth.Contract(
          liquidityABI,
          liquidityContractAddress,
        );

        setMetamaskContextValue({
          ...metamaskContextValue,
          ethereumAddress: accounts[0],
          fessContractInstance: contractFESS,
          fnirContractInstance: contractFNIR,
          liquidityContractInstance: contractLiquidity,
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

 const getFnirBalance = async () => {
  try {
    const fnirBalanceValue = await metamaskContextValue.fnirContractInstance.methods
      .balanceOf(
        metamaskContextValue.ethereumAddress
      )
      .call();

      setFnirBalance((
        Number(fnirBalanceValue) / Math.pow(10, 18)
      ).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
      }))

      console.log('getFnirBalance: fnirBalanceValue: ', fnirBalanceValue)
  } catch (err) {
    console.log('App -> getFnirBalance: err: ', err);
  }
}

const getFnirTotalSupply = async () => {
  try {
    const totalSupply = await metamaskContextValue.fnirContractInstance.methods
      .totalSupply()
      .call();

      setFnirTotalSupply((
        Number(totalSupply) / Math.pow(10, 18)
      ).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
      }))

      console.log('getFnirTotalSupply: totalSupply: ', totalSupply)
  } catch (err) {
    console.log('App -> getFnirTotalSupply: err: ', err);
  }
}

const getFessBalance = async () => {
  try {
    const fessBalanceValue = await metamaskContextValue.fessContractInstance.methods
      .balanceOf(
        metamaskContextValue.ethereumAddress
      )
      .call();

      setFessBalance((
        Number(fessBalanceValue) / Math.pow(10, 18)
      ).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
      }))

      console.log('fessBalanceValue: ', fessBalanceValue)
  } catch (err) {
    console.log('App -> getFessBalance: err: ', err);
  }
}

 React.useEffect(() => {
  if (
    metamaskContextValue.fessContractInstance &&
    metamaskContextValue.fnirContractInstance && 
    metamaskContextValue.liquidityContractInstance
  ) {
  getFnirBalance();
  getFnirTotalSupply();
  getFessBalance();
  }
}, [metamaskContextValue.fessContractInstance,
  metamaskContextValue.fnirContractInstance,
  metamaskContextValue.liquidityContractInstance])

 console.log('metamaskContextValue: ', metamaskContextValue)
  return (
      <React.Fragment>
         <div className={networkError ? 'PhishAlertActive' : 'PhishAlert'}>
            <div style={{ display: 'flex' }}>
              <ImWarning style={{ marginRight: 6 }} size={15} />
              <span className="alertSpan">
                Make sure the Metamask Network is{' '}
                {contractDeployedNetwork.toUpperCase()}
              </span>
            </div>
            <StyledClose size={15} onClick={() => setNetworkError(false)} />
          </div>
        <MetamaskProvider value={metamaskContextValue}>
         <Router>
         <Header ethereumAddress={metamaskContextValue.ethereumAddress} handleConnectMetamask={handleConnectMetamask}/>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route  path ="/home" component={()=> <Home  fnirBalance={fnirBalance} fnirTotalSupply={fnirTotalSupply} fessBalance={fessBalance}/>}/>
            <Route  path ="/farming" component={()=><Farming fnirBalance={fnirBalance} getFnirBalance={getFnirBalance} getFessBalance={getFessBalance} fessBalance={fessBalance} />}/>
            <Route  path ="/reward" component={()=><Reward />}/>
            <Route  path ="/staking" component={()=><Staking />}/>
          </Switch>
      </Router>
      </MetamaskProvider>
      </React.Fragment>
  )

}

const mapStateToProps = state => ({
  user: state
})

export default App

export const StyledClose = styled(GiCrossMark)`
  :hover {
    cursor: pointer;
  }
`;
