import React from "react";

const ContractContext = React.createContext();

const BLOCKS_REQUESTED = "BLOCKS_REQUESTED";
const BLOCKS_FULFILLED = "BLOCKS_FULFILLED";
const BLOCKS_REJECTED = "BLOCKS_REJECTED";

const CURRENT_BLOCK_REQUESTED = "CURRENT_BLOCK_REQUESTED";
const CURRENT_BLOCK_FULFILLED = "CURRENT_BLOCK_FULFILLED";
const CURRENT_BLOCK_REJECTED = "CURRENT_BLOCK_REJECTED";

const initialState = {
  isLoading: false,
  blocks: [],
  error: undefined,
  currentBlock: {
    isLoading: false,
    block: undefined,
  },
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
    case CURRENT_BLOCK_REQUESTED:
      return {
        ...state,
        currentBlock: {
          ...initialState.currentBlock,
          isLoading: true,
        },
      };
    case CURRENT_BLOCK_FULFILLED:
      return {
        ...state,
        currentBlock: {
          isLoading: false,
          ...action.payload,
        },
      };
    case CURRENT_BLOCK_REJECTED:
      return {
        ...state,
        currentBlock: {
          ...initialState.currentBlock,
        },
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

export function blockRequested() {
  return { type: CURRENT_BLOCK_REQUESTED };
}

export function blockRequestFulfilled(response) {
  return {
    type: CURRENT_BLOCK_FULFILLED,
    payload: { block: response?.data ?? response },
  };
}

export function blockRequestRejected() {
  return { type: CURRENT_BLOCK_REJECTED };
}

export function BlocksProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <ContractContext.Provider value={{ state, dispatch }}>
      {children}
    </ContractContext.Provider>
  );
}

export function useBlocks() {
  return React.useContext(ContractContext);
}
