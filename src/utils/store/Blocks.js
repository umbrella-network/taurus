import React, { useEffect, useCallback } from "react";
import { fetchBlocks } from "@Services";

const ContractContext = React.createContext();

const BLOCKS_REQUESTED = "BLOCKS_REQUESTED";
const BLOCKS_FULFILLED = "BLOCKS_FULFILLED";
const BLOCKS_REJECTED = "BLOCKS_REJECTED";

const initialState = {
  isLoading: false,
  blocks: [],
  error: undefined,
};

function reducer(state = {}, action = {}) {
  switch (action.type) {
    case BLOCKS_REQUESTED:
      return {
        ...state,
        error: undefined,
        isLoading: true,
      };
    case BLOCKS_FULFILLED:
      return {
        ...state,
        error: undefined,
        isLoading: false,
        ...action.payload,
      };
    case BLOCKS_REJECTED:
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      };
    default:
      return state;
  }
}

export function blocksRequested() {
  return { type: BLOCKS_REQUESTED };
}

export function blocksRequestFulfilled(blocks) {
  return { type: BLOCKS_FULFILLED, payload: { blocks } };
}

export function blocksRequestRejected() {
  return { type: BLOCKS_REJECTED };
}

export function BlocksProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const fetchCallback = useCallback(() => {
    dispatch(blocksRequested());
    fetchBlocks(
      (data) => dispatch(blocksRequestFulfilled(data)),
      (error) => dispatch(blocksRequestRejected(error)),
      0,
      1
    );
  }, []);

  useEffect(() => {
    fetchCallback();
  }, [fetchCallback]);

  return (
    <ContractContext.Provider value={{ state, dispatch }}>
      {children}
    </ContractContext.Provider>
  );
}

export function useBlocks() {
  return React.useContext(ContractContext);
}
