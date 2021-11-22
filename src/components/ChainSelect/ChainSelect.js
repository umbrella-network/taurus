import React from "react";

import { Dropdown, Url } from "@Ui";
import { scanForChain } from "@Urls";
import {
  currentChain,
  currentNetwork,
  environment,
  availableChains,
  mainnet,
  isDev,
} from "@Constants";

import "./chainSelect.scss";

function ChainSelect() {
  const chains = Object.values(availableChains).filter(
    ({ name, devOnly = false }) => name !== currentChain && (isDev || !devOnly)
  );

  return (
    <Dropdown
      className="chain-select"
      title={`${currentChain} ${currentNetwork}`}
    >
      <div className="chain-select__chains">
        {chains.map((chain) => (
          <Url
            secondary
            url={scanForChain(chain.symbol)}
            label={`${chain.name} ${chain[environment] ?? mainnet}`}
            key={`${JSON.stringify(chain)}-explorer-dropdown`}
          />
        ))}
      </div>
    </Dropdown>
  );
}

export default ChainSelect;
