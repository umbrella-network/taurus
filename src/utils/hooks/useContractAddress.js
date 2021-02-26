import { useState, useEffect } from "react";
import { ContractRegistry } from "@umb-network/toolbox";
import { ethers } from "ethers";

export function useContractAddress() {
  const [address, setAddress] = useState("");
  const [error, setError] = useState();

  const provider = new ContractRegistry(
    ethers.providers.getDefaultProvider(process.env.REACT_APP_PROVIDER_URL),
    process.env.REACT_APP_CONTRACT_REGISTRY_ADDRESS
  );

  useEffect(() => {
    async function fetchAddress() {
      try {
        const address = await provider.getAddress("Chain");

        setAddress(address);
      } catch (error) {
        setError(error);
      }
    }

    if (!address && !error) {
      fetchAddress();
    }
  }, [address, error, provider]);

  return address;
}
