import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Header = (props) => {
  const [state, setState] = useState({
    width:''
})

// const resize = () => {
//     setState({
//         width:window.screen.width,
//         pathname:window.location.pathname
//     })
// }
// useEffect(()=>{
//     window.addEventListener('resize', resize)
//     setState({
//         width:window.screen.width,
//         pathname:window.location.pathname
//     })
// },[])
console.log(state)
    return (
      <div id="header">
        <div>
          <img src="FNIR LOGO 256x256.png" alt="logo" />
          <Link to="/"><h2>FNIR</h2></Link>
        </div>
        <div id="heading">
        <Link to="/home/farming">Farming</Link>
        <Link to="/home/reward">Holding Reward</Link>
        <Link to="/home/staking">Staking</Link>
        </div>
        <button type="submit">Link Wallet</button>
      </div>
    )
}

export default Header