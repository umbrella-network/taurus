import React from "react";

import { Dropdown, Url } from "@Ui";
import { scanForChain } from "@Urls";
import {
  testnet,
  mainnet,
  currentChain,
  chainNetwork,
  isDev,
  availableChains,
} from "@Constants";

import "./chainSelect.scss";

function ChainSelect() {
  const chains = Object.values(availableChains).filter(
    ({ name }) => name !== currentChain
  );

  return (
    <Dropdown
      className="chain-select"
      title={`${currentChain} ${chainNetwork}`}
    >
      <div className="chain-select__chains">
        {chains.map((chain) => (
          <Url
            secondary
            url={scanForChain(chain.symbol)}
            label={`${chain.name} ${isDev ? testnet : mainnet}`}
            key={`${JSON.stringify(chain)}-explorer-dropdown`}
          />
        ))}
      </div>
    </Dropdown>
  );
}

export default ChainSelect;
