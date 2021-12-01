import { isEmpty } from "ramda";

const baseChain = "bsc";

export const PRODUCTION = "production";

export const chainId = process.env.REACT_APP_FOREIGN_CHAIN_ID;
export const tokenAuth = process.env.REACT_APP_TOKEN_AUTH;

export const devEnvironments = ["dev", "sbx"];

export const environment =
  devEnvironments.find((environment) =>
    process.env.REACT_APP_BLOCKS_API.includes(environment)
  ) ?? PRODUCTION;

export const isDev = devEnvironments.includes(environment);

export const availableChains = {
  bsc: {
    name: "BSC",
    symbol: "bsc",
    dev: "Testnet",
    sbx: "Testnet",
    [PRODUCTION]: "Mainnet",
  },
  polygon: {
    name: "Polygon",
    symbol: "polygon",
    dev: "Mumbai",
    sbx: "Mumbai",
    [PRODUCTION]: "Mainnet",
  },
  ethereum: {
    name: "Ethereum",
    symbol: "eth",
    dev: "Kovan",
    sbx: "Ropsten",
    [PRODUCTION]: "Mainnet",
  },
  avax: {
    name: "Avalanche",
    symbol: "avax",
    dev: "Testnet",
    sbx: "Testnet",
    [PRODUCTION]: "Mainnet",
  },
};

const currentChain =
  chainId && !isEmpty(chainId)
    ? availableChains[chainId]
    : availableChains[baseChain];

export const currentChainName = currentChain.name;
export const currentNetwork = currentChain[environment];
