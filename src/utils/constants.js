export const chainId = process.env.REACT_APP_FOREIGN_CHAIN_ID;
export const tokenAuth = process.env.REACT_APP_TOKEN_AUTH;

export const devEnvironments = ["dev", "sbx"];

export const isDev = devEnvironments.some((environment) =>
  process.env.REACT_APP_BLOCKS_API.includes(environment)
);
