import React from "react";

const ProofsContext = React.createContext();

const LEAVES_REQUESTED = "LEAVES_REQUESTED";
const LEAVES_FULFILLED = "LEAVES_FULFILLED";
const LEAVES_REJECTED = "LEAVES_REJECTED";

const PROOF_REQUESTED = "PROOF_REQUESTED";
const PROOF_FULFILLED = "PROOF_FULFILLED";
const PROOF_REJECTED = "PROOF_REJECTED";

const initialState = {
  leaves: {
    isLoading: false,
    list: [],
    error: undefined,
  },
  proof: {
    block: undefined,
    leaves: [],
    isLoading: false,
    error: undefined,
  },
};

function reducer(state = {}, action = {}) {
  switch (action.type) {
    case LEAVES_REQUESTED:
      return {
        ...state,
        leaves: {
          ...state.leaves,
          error: undefined,
          isLoading: true,
        },
      };
    case LEAVES_FULFILLED:
      return {
        ...state,
        leaves: {
          ...state.leaves,
          error: undefined,
          isLoading: false,
          ...action.payload,
        },
      };
    case LEAVES_REJECTED:
      return {
        ...state,
        leaves: {
          ...state.leaves,
          isLoading: false,
          ...action.payload,
        },
      };
    case PROOF_REQUESTED:
      return {
        ...state,
        proof: {
          ...state.proof,
          error: undefined,
          isLoading: true,
        },
      };
    case PROOF_FULFILLED:
      return {
        ...state,
        proof: {
          ...state.proof,
          error: undefined,
          isLoading: false,
          ...action.payload,
        },
      };
    case PROOF_REJECTED:
      return {
        ...state,
        proof: {
          ...state.proof,
          isLoading: false,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}

export function leavesRequested() {
  return { type: LEAVES_REQUESTED };
}

export function leavesRequestFulfilled(list) {
  return {
    type: LEAVES_FULFILLED,
    payload: {
      list,
    },
  };
}

export function leavesRequestRejected({ error }) {
  return { type: LEAVES_REJECTED, payload: { error } };
}

export function proofRequested() {
  return { type: PROOF_REQUESTED };
}

export function proofRequestFulfilled({ data: { block, leaves } }) {
  return {
    type: PROOF_FULFILLED,
    payload: {
      block,
      leaves: leaves.sort((a, b) =>
        a.key.localeCompare(b.key, undefined, { numeric: true })
      ),
    },
  };
}

export function proofRequestRejected() {
  return { type: PROOF_REJECTED };
}

export function ProofsProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <ProofsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProofsContext.Provider>
  );
}

export function usePrices() {
  return React.useContext(ProofsContext);
}
