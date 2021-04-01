import React from "react";

const ContractContext = React.createContext();

const INFO_REQUESTED = "INFO_REQUESTED";
const INFO_FULFILLED = "INFO_FULFILLED";
const INFO_REJECTED = "INFO_REJECTED";

const BLOCKS_REQUESTED = "BLOCKS_REQUESTED";
const BLOCKS_FULFILLED = "BLOCKS_FULFILLED";
const BLOCKS_REJECTED = "BLOCKS_REJECTED";

const CURRENT_BLOCK_REQUESTED = "CURRENT_BLOCK_REQUESTED";
const CURRENT_BLOCK_FULFILLED = "CURRENT_BLOCK_FULFILLED";
const CURRENT_BLOCK_REJECTED = "CURRENT_BLOCK_REJECTED";

const initialState = {
  isLoading: false,
  blocks: [],
  info: {
    isLoading: false,
    error: undefined,
  },
  error: undefined,
  currentBlock: {
    isLoading: false,
    block: undefined,
  },
};

function reducer(state = {}, action = {}) {
  switch (action.type) {
    case INFO_REQUESTED:
      return {
        ...state,
        info: {
          ...initialState.info,
        },
      };
    case INFO_FULFILLED:
      return {
        ...state,
        info: {
          ...initialState.info,
          ...action.payload,
        },
      };
    case INFO_REJECTED:
      return {
        ...state,
        info: {
          ...initialState.info,
          error: action.payload,
        },
      };
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

export function infoRequested() {
  return { type: INFO_REQUESTED,  }
}

export function infoFulfilled(info) {
  return { type: INFO_FULFILLED, payload: info }
}

export function infoRejected(error) {
  return { type: INFO_REJECTED, payload: error  }
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
