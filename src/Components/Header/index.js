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
        <Link to="/farming">Farming</Link>
        <Link to="/reward">Holding Reward</Link>
        <Link to="/staking">Staking</Link>
        </div>

        {
          props.ethereumAddress && <a
          href={`https://etherscan.io/address/${props.ethereumAddress}`}
          target="_blank"
        ><button type="submit">{`${props.ethereumAddress.substring(
          0,
          4,
        )}...${props.ethereumAddress.substring(props.ethereumAddress.length - 5)}`}</button></a>
        }

        {
          !props.ethereumAddress && <button type="submit" onClick={() => props.handleConnectMetamask()}>Link Wallet</button>
        }

      </div>
    )
}

export default Header