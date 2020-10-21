import React from "react";

import { fnirContractAddress } from "../../utils/config";

const Footer = () => {
  return (
    <React.Fragment>
      <div id="footer">
        {/* <a href="#">About</a> */}
        <a
          href={`https://etherscan.io/address/${fnirContractAddress}`}
          target="_blank"
        >
          FNIR Contract
        </a>
        <a href="https://github.com/fesschain" target="_blank">
          Github
        </a>
      </div>
      {/* <div class="demo">DEMO WEBSITE</div> */}
    </React.Fragment>
  );
};
export default Footer;
