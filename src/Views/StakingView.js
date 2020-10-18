import React, { useState, useEffect, useRef } from "react"
import InputComponent from "../Components/InputComponent"
import Button from "../Components/Buttons"
import { Link, Redirect } from "react-router-dom"
import validator from "validator"
import { error_form_check, get_url_params, sleep, only_alphabets } from "../utils/common_utilities"
import { loadReCaptcha } from 'react-recaptcha-v3'
import AnimatedMount from "../HOC/AnimatedMount"



const HomeView = (props) => {
      return <React.Fragment>
               <div id="imgLine">
        <img src="./coin.png" alt="image" />
        <h2>Stake FESS to Get FNIR</h2>
        <p>
          Lorem lpsum is simply dummy text of the printing <br />
          and typesetting industry.
        </p>
      </div>
  
      <div id="cards">
        <div class="card">
          <img src="./fess.png" alt="fess" />
          <div class="zero">0.000</div>
          <h2>FESS</h2>
          <div class="per" style={{opacity:'0'}} >`</div>
          <button type="submit">Stake</button>
        </div>
        <div class="card">
          <img src="./FNIR LOGO 256x256.png" alt="FNIR" />
          <div class="zero">0.000</div>
          <h2>FNIR</h2>
          <div class="per">0.1% per FESS</div>
          <button type="submit">Claim Rewards</button>
        </div>
      </div>
  
      <div class="disci">
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
})((HomeView))