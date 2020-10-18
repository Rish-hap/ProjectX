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
        <img src="FNIR LOGO 256x256.png" alt="logo" />
        <h2>Farm your FNIR and Claim your Rewards!</h2>
      </div>

      <div id="cards">
        <div></div>
        <div className="card">
          <div id="card1">
            <img src="FNIR LOGO 256x256.png" alt="logo" />
            <div className="text">
              <p className="title">Your FNIR Balance</p>
              <h2 className="star">*******</h2>
            </div>
          </div>
          <hr />
          <div className="fnir">
            <p>0.000 FNIR</p>
          </div>
        </div>
        <div className="card">
          <div className="text">
            <p className="title">Total FNIR Supply</p>
            <h2 className="star">*******</h2>
          </div>
          <hr />
          <div className="fnir">
            <p>100 FNIR</p>
          </div>
        </div>
      </div>

      <div id="lines">
        <button type="submit">Link Wallet</button>
        <h2>
          <b>FNIR X FESS: </b>Swap FESS to get 12% extra FNIR at every
          transaction
        </h2>
        <h2>
          <b>Referral Link</b>
          <span
            ><a href="#"
              >AJH863RQVKI
              <img
                style={{width:'25px', paddingLeft:'20px'}}
                src="./copy.png" /></a
          ></span>
        </h2>
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