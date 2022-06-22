import React, { useEffect } from "react";
import chainService from "services/ChainService";
import { formatLeaf, formatDatapairs } from "utils/formatters";

const ChainContext = React.createContext();

const actionTypes = {
  getLatestBlock: "explorer/get_latest_block",
  getLatestBlockConfirmed: "explorer/get_latest_block_confirmed",
  getLatestBlockRejected: "explorer/get_latest_block_rejected",
  getChainLatestData: "explorer/get_chain_latest_data",
  getChainLatestDataConfirmed: "explorer/get_chain_latest_data_confirmed",
  getChainLatestDataRejected: "explorer/get_chain_latest_data_rejected",
  getNthBlocksPage: "explorer/get_nth_blocks_page",
  getNthBlocksPageConfirmed: "explorer/get_nth_blocks_page_confirmed",
  getNthBlocksPageRejected: "explorer/get_nth_blocks_page_rejected",
  getSelectedBlockData: "explorer/get_selected_block_data",
  getSelectedBlockDataConfirmed: "explorer/get_selected_block_data_confirmed",
  getSelectedBlockDataRejected: "explorer/get_selected_block_data_rejected",
};

const initialState = {
  lastBlock: undefined,
  error: undefined,
  isLoading: true,
  datapairs: [],
  blocks: {
    list: [],
    isLoading: true,
  },
  selectedBlock: {
    isLoading: false,
    id: undefined,
    error: undefined,
    details: undefined,
    leavesList: undefined,
    leavesAmount: undefined,
  },
};

function reducer(state = {}, action = {}) {
  switch (action.type) {
    case actionTypes.getChainLatestData:
      return {
        ...state,
        isLoading: true,
        datapairs: [],
        error: undefined,
      };
    case actionTypes.getChainLatestDataConfirmed:
      return {
        ...state,
        isLoading: false,
        datapairs: action.payload.datapairs,
      };
    case actionTypes.getChainLatestDataRejected:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case actionTypes.getLatestBlock:
      return {
        ...state,
        lastBlock: undefined,
      };
    case actionTypes.getLatestBlockConfirmed:
      return {
        ...state,
        lastBlock: action.payload.lastBlock,
      };
    case actionTypes.getLatestBlockRejected:
      return {
        ...state,
        error: action.payload.error,
      };
    case actionTypes.getSelectedBlockData:
      return {
        ...state,
        selectedBlock: {
          ...state.selectedBlock,
          isLoading: true,
          id: undefined,
          error: undefined,
          details: undefined,
          leavesList: undefined,
          leavesAmount: undefined,
        },
      };
    case actionTypes.getSelectedBlockDataConfirmed:
      return {
        ...state,
        selectedBlock: {
          ...state.selectedBlock,
          id: action.payload.id,
          details: action.payload.block,
          leavesList: action.payload.leaves,
          leavesAmount: action.payload.leaves.length,
          isLoading: false,
        },
      };
    case actionTypes.getSelectedBlockDataRejected:
      return {
        ...state,
        selectedBlock: {
          ...state.selectedBlock,
          id: action.payload.id,
          error: action.payload.error,
          isLoading: false,
        },
      };
    case actionTypes.getNthBlocksPage:
      return {
        ...state,
        blocks: {
          ...state.blocks,
          isLoading: true,
          list: [],
        },
      };
    case actionTypes.getNthBlocksPageConfirmed:
      return {
        ...state,
        blocks: {
          ...state.blocks,
          isLoading: false,
          list: action.payload.list,
        },
      };
    case actionTypes.getNthBlocksPageRejected:
      return {
        ...state,
        blocks: {
          ...state.blocks,
          isLoading: false,
          error: action.payload.error,
        },
      };
    default:
      return state;
  }
}

function getLatestBlock(dispatch) {
  dispatch({ type: actionTypes.getLatestBlock });

  chainService.fetchLatestBlock({
    successCallback: ([lastBlock]) =>
      dispatch({
        type: actionTypes.getLatestBlockConfirmed,
        payload: { lastBlock },
      }),
    rejectCallback: (error) =>
      dispatch({
        type: actionTypes.getLatestBlockRejected,
        payload: { error },
      }),
  });
}

function getChainLatestData(dispatch, { lastBlock }) {
  dispatch({ type: actionTypes.getChainLatestData });

  chainService.fetchChainLatestData({
    successCallback: ({ leaves, firstClassData }) =>
      dispatch({
        type: actionTypes.getChainLatestDataConfirmed,
        payload: {
          datapairs: formatDatapairs(firstClassData, leaves, lastBlock),
        },
      }),
    rejectCallback: (error) =>
      dispatch({
        type: actionTypes.getChainLatestDataRejected,
        payload: { error },
      }),
    blockId: lastBlock.blockId,
  });
}

function getNthBlocksPage(dispatch, { page, limit }) {
  dispatch({ type: actionTypes.getNthBlocksPage });

  chainService.fetchBlocks({
    successCallback: (list) =>
      dispatch({
        type: actionTypes.getNthBlocksPageConfirmed,
        payload: { list },
      }),
    rejectCallback: () => {},
    page,
    limit,
  });
}

function getBlockAndLeaves(dispatch, { blockId }) {
  dispatch({ type: actionTypes.getSelectedBlockData });

  chainService.fetchBlockAndLeaves({
    successCallback: ({ block, leaves }) =>
      dispatch({
        type: actionTypes.getSelectedBlockDataConfirmed,
        payload: {
          id: blockId,
          block: block.data,
          leaves: leaves.map((leaf) => formatLeaf(leaf, blockId)),
        },
      }),
    rejectCallback: ({ error }) =>
      dispatch({
        type: actionTypes.getSelectedBlockDataRejected,
        payload: { id: blockId, error },
      }),
    blockId,
  });
}

export function ChainProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { lastBlock } = state;

  useEffect(() => {
    getLatestBlock(dispatch);
  }, []);

  useEffect(() => {
    if (lastBlock) {
      getChainLatestData(dispatch, { lastBlock });
    }
  }, [lastBlock]);

  return (
    <ChainContext.Provider
      value={{
        state,
        dispatch,
        getNthBlocksPage: (page, limit) =>
          getNthBlocksPage(dispatch, { page, limit }),
        getBlockAndLeaves: ({ blockId }) =>
          getBlockAndLeaves(dispatch, { blockId }),
      }}
    >
      {children}
    </ChainContext.Provider>
  );
}

export function useChain() {
  return React.useContext(ChainContext);
}
