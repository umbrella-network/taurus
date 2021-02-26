import { ContractRegistry, ABI } from "@umb-network/toolbox";
import { map } from "ramda";
import { ethers } from "ethers";
import { keyToByte32 } from "@Formatters";
import { fcdValues } from "@Mocks";

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

const readContract = async () => {
  const address = await fetchChainAddress();

  return new ethers.Contract(address, ABI.chainAbi, infuraProvider);
};

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

export async function fetchFCDValues(
  successCallback,
  rejectedCallback,
  blockHeight,
  keys
) {
  if (shouldMock) {
    const mock = await fcdValues(blockHeight);
    console.warn(
      "getMultipleNumericData call intercepted, mocking data with: ",
      mock
    );

    successCallback(mock);
  } else {
    try {
      const contract = await readContract();

      const blockFirstClassData = await contract.getMultipleNumericData(
        blockHeight,
        map(keyToByte32, keys)
      );

      successCallback(blockFirstClassData);
    } catch (e) {
      rejectedCallback(e);
    }
  }
}
