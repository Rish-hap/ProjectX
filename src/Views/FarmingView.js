import React from "react"

const FarmingView = () => {
    return (<React.Fragment>
               <div id="imgLine">
        <img src="./reap.png" alt="image" />
        <h2><span>Reap</span> FNIR Swapping Fess</h2>
        <p>
          Lorem lpsum is simply dummy text of the printing <br />
          and typesetting industry.
        </p>
      </div>
  
      <div id="cards">
        <div className="card">
          <input placeholder="Amount"/>
          <div className="note"><span>Note:</span>In Multiples of 0.5</div>
          <div className="image">
            <img src="./eth.png" alt="eth"/>
            <h2>ETH</h2>
          </div>
          <div className="zero">0.000</div>
          <div className="avail">Available=</div>
        </div>
  
        <h1>+</h1>
  
        <div className="card">
          <input placeholder="Amount"/>
          <div className="note" style={{opacity:'.8'}}>'</div>
          <div className="image">
            <img src="./fess.png" alt="Fess" />
            <h2>FESS</h2>
          </div>
          <div className="zero">0.000</div>
          <div className="avail">Available=</div>
        </div>
  
        <h1>=</h1>
  
        <div className="card">
          <h1>You Get</h1>
          <input/>
          <div className="image">
            <img src="./FNIR LOGO 256x256.png" alt="FNIR"/>
            <h2>FNIR</h2>
          </div>
          <div className="note" style={{fontFamily:'normal', marginBottom:'15px'}}>12% APTR as Reaping Reward</div>
        </div>
      </div>
  
      <div className="disci">
        Every time you stake and unstake FESS tokens, the contract will
        automatically harvest FNIR rewards for you!
      </div>
  
    </React.Fragment>)
}

export default FarmingView