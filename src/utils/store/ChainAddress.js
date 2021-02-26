import React, { useEffect } from "react";
import { fetchChainAddress } from "@Services";
import { isEmpty } from "ramda";

const ChainAddressContext = React.createContext();

const CHAIN_ADDRESS_REQUESTED = "CHAIN_ADDRESS_REQUESTED";
const CHAIN_ADDRESS_FULFILLED = "CHAIN_ADDRESS_FULFILLED";
const CHAIN_ADDRESS_REJECTED = "CHAIN_ADDRESS_REJECTED";

const initialState = {
  address: "",
  isLoading: false,
  error: undefined,
};

function reducer(state = {}, action = {}) {
  switch (action.type) {
    case CHAIN_ADDRESS_REQUESTED:
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    case CHAIN_ADDRESS_FULFILLED:
      return {
        ...action.payload,
        isLoading: false,
        error: undefined,
      };
    case CHAIN_ADDRESS_REJECTED:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}

export function chainAddressRequested() {
  return { type: CHAIN_ADDRESS_REQUESTED };
}

export function chainAddressFulfilled(address) {
  return { type: CHAIN_ADDRESS_FULFILLED, payload: { address } };
}

export function chainAddressRejected(error) {
  return { type: CHAIN_ADDRESS_REJECTED, payload: { error } };
}

export function ChainAddressProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { address, isLoading, error } = state;
  const shouldRequest = isEmpty(address) && !isLoading && !error;

  useEffect(() => {
    if (shouldRequest) {
      fetchChainAddress(dispatch, chainAddressFulfilled, chainAddressRejected);
    }
  }, [shouldRequest]);

  return (
    <ChainAddressContext.Provider value={{ state, dispatch }}>
      {children}
    </ChainAddressContext.Provider>
  );
}

export function useChainAddress() {
  return React.useContext(ChainAddressContext);
}
