import { chainId } from "constants/chainData";
import ChainAPIUrl from "constants/API";
import API from "utils/API";

function fetchBlocks({
  successCallback,
  rejectCallback,
  page = 1,
  limit = 10,
}) {
  const url = `${ChainAPIUrl}/blocks`;

  const offset = (page - 1) * limit;

  API.get({
    url,
    successCallback,
    rejectCallback,
    params: {
      offset,
      limit,
      chainId,
    },
  });
}

function fetchChainInfo({ successCallback, rejectCallback }) {
  const url = `${ChainAPIUrl}/info`;

  API.get({
    url,
    successCallback,
    rejectCallback,
    params: {
      chainId,
    },
  });
}

function fetchBlockAndLeaves({ successCallback, rejectCallback, blockId }) {
  API.collect({
    operations: [
      {
        key: "block",
        url: `${ChainAPIUrl}/blocks/${blockId}`,
        params: { chainId },
      },
      {
        key: "leaves",
        url: `${ChainAPIUrl}/blocks/${blockId}/leaves`,
        params: { chainId },
      },
    ],
    successCallback,
    rejectCallback,
  });
}

function fetchChainLatestData({ successCallback, rejectCallback, blockId }) {
  API.collect({
    operations: [
      {
        key: "block",
        url: `${ChainAPIUrl}/blocks/${blockId}`,
        params: { chainId },
      },
      {
        key: "leaves",
        url: `${ChainAPIUrl}/blocks/${blockId}/leaves`,
        params: { chainId },
      },
      {
        key: "firstClassData",
        url: `${ChainAPIUrl}/fcds`,
        params: { chainId },
      },
    ],
    successCallback,
    rejectCallback,
  });
}

const chainService = {
  fetchBlocks,
  fetchChainInfo,
  fetchBlockAndLeaves,
  fetchChainLatestData,
};

export default chainService;
