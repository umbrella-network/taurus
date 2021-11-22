import React from "react";

import { Dropdown, Url } from "@Ui";
import { scanForChain } from "@Urls";
import {
  currentChain,
  currentNetwork,
  environment,
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
      title={`${currentChain} ${currentNetwork}`}
    >
      <div className="chain-select__chains">
        {chains.map((chain) => (
          <Url
            secondary
            url={scanForChain(chain.symbol)}
            label={`${chain.name} ${chain[environment]}`}
            key={`${JSON.stringify(chain)}-explorer-dropdown`}
          />
        ))}
      </div>
    </Dropdown>
  );
}

export default ChainSelect;