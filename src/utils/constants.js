import { capitalize } from "lodash";

const scanUrl = process.env.REACT_APP_SCAN_URL;

export const chainId = process.env.REACT_APP_FOREIGN_CHAIN_ID;
export const tokenAuth = process.env.REACT_APP_TOKEN_AUTH;

export const devEnvironments = ["dev", "sbx"];

export const environment = devEnvironments.find((environment) =>
  process.env.REACT_APP_BLOCKS_API.includes(environment)
);

export const isDev = Boolean(environment);

export const availableChains = {
  undefined: {
    name: "BSC",
    symbol: "bsc",
  },
  polygon: {
    name: "Polygon",
    symbol: "polygon",
  },
  ethereum: {
    name: "ETH",
    symbol: "eth",
  },
  avax: {
    name: "Avalanche",
    symbol: "avax",
  },
};

const [, network] = scanUrl.split(/https:\/\/|\./);

export const testnet = "Testnet";
export const mainnet = "Mainnet";
export const currentChain = availableChains[chainId].name;
export const chainNetwork = isDev ? capitalize(network) : mainnet;
