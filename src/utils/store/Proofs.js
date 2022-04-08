import React, { useEffect, useCallback } from "react";
import { fetchFCD, fetchProof, fetchLatestLeaves } from "@Services";
import { formatDatapairs } from "@Formatters";

const ProofsContext = React.createContext();

const LEAVES_REQUESTED = "LEAVES_REQUESTED";
const LEAVES_FULFILLED = "LEAVES_FULFILLED";
const LEAVES_REJECTED = "LEAVES_REJECTED";

const PROOF_REQUESTED = "PROOF_REQUESTED";
const PROOF_FULFILLED = "PROOF_FULFILLED";
const PROOF_REJECTED = "PROOF_REJECTED";

const FIRSTCLASSDATA_REQUESTED = "FIRSTCLASSDATA_REQUESTED";
const FIRSTCLASSDATA_FULFILLED = "FIRSTCLASSDATA_FULFILLED";
const FIRSTCLASSDATA_REJECTED = "FIRSTCLASSDATA_REJECTED";

const DATAPAIRS_FULFILLED = "DATAPAIRS_FULFILLED";

const initialState = {
  leaves: {
    isLoading: false,
    list: null,
    error: undefined,
  },
  proof: {
    block: undefined,
    leaves: [],
    isLoading: false,
    error: undefined,
  },
  firstClassData: {
    isLoading: false,
    list: null,
    error: undefined,
  },
  datapairs: {
    isLoading: true,
    list: [],
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
    case FIRSTCLASSDATA_REQUESTED:
      return {
        ...state,
        firstClassData: {
          ...state.firstClassData,
          error: undefined,
          isLoading: true,
        },
      };
    case FIRSTCLASSDATA_FULFILLED:
      return {
        ...state,
        firstClassData: {
          ...state.firstClassData,
          error: undefined,
          isLoading: false,
          ...action.payload,
        },
      };
    case FIRSTCLASSDATA_REJECTED:
      return {
        ...state,
        firstClassData: {
          ...state.firstClassData,
          isLoading: false,
          ...action.payload,
        },
      };
    case DATAPAIRS_FULFILLED:
      return {
        ...state,
        datapairs: {
          ...state.datapairs,
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

export function firstClassDataRequested() {
  return { type: FIRSTCLASSDATA_REQUESTED };
}

export function datapairsFulfilled(list) {
  return { type: DATAPAIRS_FULFILLED, payload: { list } };
}

export function firstClassDataFulfilled(payload) {
  return {
    type: FIRSTCLASSDATA_FULFILLED,
    payload: {
      list: payload.sort((a, b) =>
        a.key.localeCompare(b.key, undefined, { numeric: true })
      ),
    },
  };
}

export function firstClassDataRejected(error) {
  return { type: FIRSTCLASSDATA_REJECTED, payload: { error } };
}

export function ProofsProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { leaves, proof, firstClassData } = state;
  const { block } = proof;

  const isLoading =
    proof.isLoading || leaves.isLoading || firstClassData.isLoading;

  const requestLatestLeaves = useCallback(() => {
    if (block) {
      dispatch(leavesRequested());

      fetchLatestLeaves(
        (response) => dispatch(leavesRequestFulfilled(response)),
        (response) => dispatch(leavesRequestRejected(response))
      );
    }
  }, [block]);

  const requestFCD = useCallback(() => {
    dispatch(firstClassDataRequested());

    fetchFCD(
      (response) => dispatch(firstClassDataFulfilled(response)),
      (response) => dispatch(firstClassDataRejected(response))
    );
  }, []);

  const requestProofs = useCallback(() => {
    dispatch(proofRequested());
    fetchProof(
      (response) => dispatch(proofRequestFulfilled(response)),
      (response) => dispatch(proofRequestRejected(response))
    );
  }, []);

  useEffect(() => {
    requestLatestLeaves();
  }, [block, requestLatestLeaves]);

  useEffect(() => {
    if (!isLoading) {
      requestFCD();
    }

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  useEffect(() => {
    if (!isLoading) {
      requestProofs();
    }

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  useEffect(() => {
    const hasLoadedData = Boolean(firstClassData.list && leaves.list);

    if (hasLoadedData) {
      const list = formatDatapairs(firstClassData.list, leaves.list, block);
      dispatch(datapairsFulfilled(list));
    }

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [firstClassData, leaves]);

  return (
    <ProofsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProofsContext.Provider>
  );
}

export function usePrices() {
  return React.useContext(ProofsContext);
}
