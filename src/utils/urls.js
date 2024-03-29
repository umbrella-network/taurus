import { isSolana } from "constants/chainData";
import {
  STAGE as environment,
  isDev,
  PROD as PRODUCTION,
} from "constants/stages";

export const apiUrl = process.env.REACT_APP_BLOCKS_API;
export const scanUrl = process.env.REACT_APP_SCAN_URL;
export const scanUrlSuffix = isSolana && isDev ? "?cluster=devnet" : "";
export const bscScanUrl = isDev
  ? "https://testnet.bscscan.com/address"
  : "https://bscscan.com/address";

export const scanForChain = (chain) => {
  const urlEnv = environment !== PRODUCTION && environment;

  const urlModifiers = ["explorer", chain, urlEnv].filter((element) => element);

  const url = urlModifiers.join("-");

  return `https://${url}.umb.network`;
};
