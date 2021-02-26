import { ContractRegistry } from "@umb-network/toolbox";
import { ethers } from "ethers";

const shouldMock = process.env.REACT_APP_SHOULD_FALLBACK === "true";

const infuraProvider = shouldMock
  ? undefined
  : ethers.providers.getDefaultProvider(process.env.REACT_APP_PROVIDER_URL);

const provider = shouldMock
  ? undefined
  : new ContractRegistry(
      infuraProvider,
      process.env.REACT_APP_CONTRACT_REGISTRY_ADDRESS
    );

export async function fetchChainAddress(
  callback,
  successCallback,
  rejectedCallback
) {
  try {
    const address = shouldMock
      ? "0x1Da301854FD832db4f2618a4b0F3291134E6268e"
      : await provider.getAddress("Chain");

    if (typeof successCallback === "function") {
      callback(successCallback(address));
    } else if (typeof callback === "function") {
      callback(address);
    } else {
      return address;
    }
  } catch (error) {
    if (typeof rejectedCallback === "function") {
      callback(rejectedCallback({ error }));
    }
  }
}
