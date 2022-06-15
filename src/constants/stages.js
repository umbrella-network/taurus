export const PROD = "prod";
export const DEV = "dev";
export const SBX = "sbx";

export const STAGE = process.env.REACT_APP_STAGE;

export const devEnvironments = [DEV, SBX];

export const isDev = devEnvironments.includes(STAGE);

export default STAGE;
