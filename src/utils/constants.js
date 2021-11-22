import { isEmpty } from "ramda";

const baseChain = "bsc";
export const mainnet = "Mainnet"

const chain = process.env.REACT_APP_FOREIGN_CHAIN_ID;

export const chainId = chain && !isEmpty(chain) ? chain : baseChain;
export const tokenAuth = process.env.REACT_APP_TOKEN_AUTH;

export const devEnvironments = ["dev", "sbx"];

export const environment = devEnvironments.find((environment) =>
  process.env.REACT_APP_BLOCKS_API.includes(environment)
);

export const isDev = devEnvironments.includes(environment);

export const availableChains = {
  bsc: {
    name: "BSC",
    symbol: "bsc",
    dev: "Testnet",
    sbx: "Testnet",
    prod: "Mainnet",
  },
  polygon: {
    name: "Polygon",
    symbol: "polygon",
    dev: "Mumbai",
    sbx: "Mumbai",
    prod: "Mainnet",
  },
  ethereum: {
    name: "Ethereum",
    symbol: "eth",
    dev: "Kovan",
    sbx: "Ropsten",
    prod: "Mainnet",
  },
  avax: {
    name: "Avalanche",
    symbol: "avax",
    dev: "Testnet",
    sbx: "Testnet",
    prod: "Mainnet",
  },
};

export const currentChain = availableChains[chainId].name;
export const currentNetwork = availableChains[chainId][environment] ?? mainnet;
