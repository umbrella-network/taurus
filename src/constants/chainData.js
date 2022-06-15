import { isEmpty } from "ramda";

import STAGE, { PROD } from "./stages";

const baseChain = "bsc";

export const chainId = process.env.REACT_APP_FOREIGN_CHAIN_ID;

export const isSolana = chainId === "solana";

export const availableChains = {
  bsc: {
    name: "BSC",
    symbol: "bsc",
    dev: "Testnet",
    sbx: "Testnet",
    [PROD]: "Mainnet",
  },
  polygon: {
    name: "Polygon",
    symbol: "polygon",
    dev: "Mumbai",
    sbx: "Mumbai",
    [PROD]: "Mainnet",
  },
  ethereum: {
    name: "Ethereum",
    symbol: "eth",
    dev: "Kovan",
    sbx: "Ropsten",
    [PROD]: "Mainnet",
  },
  avax: {
    name: "Avalanche",
    symbol: "avax",
    dev: "Testnet",
    sbx: "Testnet",
    [PROD]: "Mainnet",
  },
  arbitrum: {
    name: "Arbitrum",
    symbol: "arbitrum",
    dev: "Testnet",
    sbx: "Testnet",
    [PROD]: "Mainnet",
  },
  solana: {
    name: "Solana",
    symbol: "solana",
    dev: "Testnet",
    sbx: "Testnet",
    [PROD]: "Mainnet",
  },
};

const currentChain =
  chainId && !isEmpty(chainId)
    ? availableChains[chainId]
    : availableChains[baseChain];

export const currentChainName = currentChain.name;
export const currentNetwork = currentChain[STAGE];
