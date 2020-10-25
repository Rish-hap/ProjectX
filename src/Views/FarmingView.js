import React from "react"

const FarmingView = ({ethereumAddress, userApprove, setUserApprove, handleApprove, allowance, fessBalance, fnirBalance,userSwap, setUserSwap,  referredEthereum, setReferredEthereum,  handleSwap}) => {
  const [invalidReferralAddress, setInvalidReferralAddress] = React.useState(false);
  
  const submitHandleSwap = () => {
    console.log('submitHandleSwap: hit.')
    console.log('(/^0x[a-fA-F0-9]{40}$/g).test(referredEthereum): ', (/^0x[a-fA-F0-9]{40}$/g).test(referredEthereum))
    if ((/^0x[a-fA-F0-9]{40}$/g).test(referredEthereum)) {
      setInvalidReferralAddress(false);
      handleSwap();
    } else {
      setInvalidReferralAddress(true);
    }
  }

    return (<React.Fragment>
               <div id="imgLine">
        <img src="./reap.png" alt="image" />
        <h2><span>Reap</span> FNIR Swapping Fess</h2>
        {/* <p>
          Lorem lpsum is simply dummy text of the printing <br />
          and typesetting industry.
        </p> */}
      </div>

      <div id="cards">
      <div className="card">
          <input
          type="number"
            placeholder="Amount"
            value={Number(userApprove).toString()}
            min={0}
            step={0.0001}
            style={{ fontSize: '15px', fontWeight: 700 }}
            onChange={event =>
              setUserApprove(+event.target.value)
            }
          />
          <div className="note"><span>Note:</span>Enter amount to approve</div>
          <div className="image">
            {/* <img src="./eth.png" alt="eth"/> */}
            {/* <h2>ETH</h2> */}
            <button type="submit" style={{ cursor: 'pointer' }} onClick={() => handleApprove()}>APPROVE</button>
          </div>

          <div className="zero" style={{ fontSize: '1.9rem' }}>
          <div><span>Total Approved: </span></div>
            {allowance}
            </div>
        </div>

        {/* <h1>+</h1> */}

        {/* <div className="card">
          <input placeholder="Amount"/>
          <div className="note"><span>Note:</span>In Multiples of 0.5</div>
          <div className="image">
            <img src="./eth.png" alt="eth"/>
            <h2>ETH</h2>
          </div>
          <div className="zero">0.000</div>
          <div className="avail">Available=</div>
        </div> */}

        <h1>+</h1>

        <div className="card">
          <input
          type="number"
          value={Number(userSwap).toString()}
            min={0}
            max={Number(allowance)}
            step={0.0001}
            onChange={event =>
              setUserSwap(+event.target.value)
            }
          style={{ fontSize: '15px', fontWeight: 700 }}
          />

          {
            ethereumAddress &&
            <input
            type="string"
            value={referredEthereum}
            valid={referredEthereum && (/^0x[a-fA-F0-9]{40}$/g).test(referredEthereum) ? true: false }
            onChange={event =>
              setReferredEthereum(event.target.value)
            }
            style={{ fontSize: '15px', fontWeight: 700 }}
          />
          }

          {
            invalidReferralAddress && <div className="note"><span>Please enter a valid referral address</span></div>
          }
          

          <div className="note" style={{opacity:'.8'}}>'</div>
          <button type="submit" style={{ cursor: 'pointer' }} onClick={() => submitHandleSwap()}>SWAP</button>
          <div className="image">
            <img src="./fess.png" alt="Fess" />
            <h2>FESS</h2>
          </div>

          <div className="zero" style={{ fontSize: '1.9rem' }}  >
          <span>Available: </span>
            {fessBalance}
            </div>
          {/* <div className="avail">Available</div> */}
        </div>

        <h1>=</h1>

        <div className="card">
          {/* <h1>You Get</h1> */}
          {/* <input/> */}
          <div className="image">
            <img src="./FNIR LOGO 256x256.png" alt="FNIR"/>
            <h2>FNIR</h2>
          </div>
          <div className="zero" style={{ fontSize: '1.9rem' }}><span>Available: </span>{fnirBalance}</div>
          {/* <div className="avail">Available</div> */}
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