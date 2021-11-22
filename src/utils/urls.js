import { environment, isDev } from "@Constants";

export const apiUrl = process.env.REACT_APP_BLOCKS_API;
export const scanUrl = process.env.REACT_APP_SCAN_URL;
export const bscScanUrl = isDev
  ? "https://testnet.bscscan.com/address"
  : "https://bscscan.com/address";

export const scanForChain = (chain) => {
  const urlModifiers = ["explorer", chain, environment].filter(
    (element) => element
  );

  const url = urlModifiers.join("-");

  return `https://${url}.umb.network`;
};
