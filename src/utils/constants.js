import { isEmpty } from "ramda";

export const chainId = process.env.REACT_APP_FOREIGN_CHAIN_ID;
export const apiUrl = process.env.REACT_APP_BLOCKS_API;
export const tokenAuth = process.env.REACT_APP_TOKEN_AUTH;
export const shouldFallback = process.env.REACT_APP_SHOULD_FALLBACK === "true";
