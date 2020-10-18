import React, { useState, useEffect, useRef } from "react"
import InputComponent from "../Components/InputComponent"
import Button from "../Components/Buttons"
import { Link, Redirect } from "react-router-dom"
import validator from "validator"
import { error_form_check, get_url_params, sleep, only_alphabets } from "../utils/common_utilities"
import { loadReCaptcha } from 'react-recaptcha-v3'
import AnimatedMount from "../HOC/AnimatedMount"
import Reward from "../Containers/Reward"



const RewardView = (props) => {
      return <React.Fragment>      
               <div id="imgLine">
        <img src="./coin.png" alt="image" />
        <h2>Hold FESS to earn FNIR</h2>
        <p>
          Lorem lpsum is simply dummy text of the printing <br />
          and typesetting industry.
        </p>
      </div>
  
      <div id="cards">
        <div className="card">
          <div className="heading">Position</div>
          <img src="./fess.png" alt="fess" />
          <h2>FESS</h2>
          <hr/>
          <div className='zero'>0.000</div>
        </div>
        <div className="card">
          <div className="heading">Rewards</div>
          <img src="./FNIR LOGO 256x256.png" alt="fnir" />
          <h2>FNIR</h2>
          <hr/>
          <div className='zero'>0.000</div>
        </div>
      </div>
  
      <div className="disci">
        Every time you stake and unstake FESS tokens, the contract will
        automatically harvest FNIR rewards for you!
      </div>
      </React.Fragment>
}




export default AnimatedMount({
  unmountedStyle: {
    opacity: 0,
    transform: 'translate3d(0, -2rem, 0)',
    transition: 'opacity 100ms ease-out, transform 100ms ease-out',
  },
  mountedStyle: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transition: 'opacity .5s ease-out, transform .5s ease-out',
  },
})((RewardView))