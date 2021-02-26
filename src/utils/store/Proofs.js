import React from "react";

import { numericSortByAttribute } from "@Utils";

const ProofsContext = React.createContext();

const KEYS_REQUESTED = "KEYS_REQUESTED";
const KEYS_FULFILLED = "KEYS_FULFILLED";
const KEYS_REJECTED = "KEYS_REJECTED";
const KEYS_SELECTED = "KEYS_SELECTED";

const PROOF_REQUESTED = "PROOF_REQUESTED";
const PROOF_FULFILLED = "PROOF_FULFILLED";
const PROOF_REJECTED = "PROOF_REJECTED";

const initialState = {
  keys: {
    isLoading: false,
    list: [],
    selected: [],
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
    case KEYS_REQUESTED:
      return {
        ...state,
        keys: {
          ...state.keys,
          error: undefined,
          isLoading: true,
        },
      };
    case KEYS_FULFILLED:
      return {
        ...state,
        keys: {
          ...state.keys,
          error: undefined,
          isLoading: false,
          ...action.payload,
        },
      };
    case KEYS_REJECTED:
      return {
        ...state,
        keys: {
          ...state.keys,
          isLoading: false,
          ...action.payload,
        },
      };
    case KEYS_SELECTED:
      return {
        ...state,
        keys: {
          ...state.keys,
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

export function keysRequested() {
  return { type: KEYS_REQUESTED };
}

export function keysRequestFulfilled(data) {
  return {
    type: KEYS_FULFILLED,
    payload: {
      list: numericSortByAttribute(data, "_id"),
    },
  };
}

export function keysRequestRejected({ error }) {
  return { type: KEYS_REJECTED, payload: { error } };
}

export function keysSelected(selected) {
  return { type: KEYS_SELECTED, payload: { selected } };
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
