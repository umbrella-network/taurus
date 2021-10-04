import { isDev } from "@Constants";

export const apiUrl = process.env.REACT_APP_BLOCKS_API;
export const scanUrl = process.env.REACT_APP_SCAN_URL;
export const bscScanUrl = isDev
  ? "https://testnet.bscscan.com/address"
  : "https://bscscan.com/address";
