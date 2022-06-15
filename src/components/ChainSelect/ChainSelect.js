import React from "react";

import { Dropdown, Url } from "components/ui";

import { scanForChain } from "utils/urls";

import {
  currentChainName,
  currentNetwork,
  availableChains,
} from "constants/chainData";
import { STAGE as environment, isDev } from "constants/stages";

import "./chainSelect.scss";

function ChainSelect() {
  const chains = Object.values(availableChains).filter(
    ({ name, devOnly = false }) =>
      name !== currentChainName && (isDev || !devOnly)
  );

  return (
    <Dropdown
      className="chain-select"
      title={`${currentChainName} ${currentNetwork}`}
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
