import axios from "axios";
import { numericSortByAttribute } from "@Utils";
import { blockList, blocks, leaves, info } from "@Mocks";

import {
  apiUrl,
  chainId,
  shouldFallback,
  tokenAuth,
} from "@Constants";

async function mockRequest(
  dispatch,
  successCallback,
  rejectedCallback,
  fallBack
) {
  if (typeof successCallback === "function") {
    dispatch(successCallback(fallBack));
  } else {
    dispatch(fallBack);
  }
}

const authorization = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

async function request(
  url,
  dispatch,
  successCallback,
  rejectedCallback,
  params = {}
) {
  try {
    const response = await axios.get(url, {
      ...authorization(tokenAuth),
      params: {
        chainId,
        ...params,
      },
    });

    if (
      typeof successCallback === "function" &&
      typeof dispatch === "function"
    ) {
      dispatch(successCallback(response.data));
    } else if (typeof successCallback === "function") {
      successCallback(response.data);
    } else if (typeof dispatch === "function") {
      dispatch(response.data);
    } else {
      return response;
    }
  } catch (e) {
    const error = e?.response?.status ?? e?.message;

    if (
      typeof rejectedCallback === "function" &&
      typeof dispatch === "function"
    ) {
      dispatch(rejectedCallback({ error }));
    } else if (typeof rejectedCallback === "function") {
      rejectedCallback({ error });
    } else if (typeof dispatch === "function") {
      dispatch({ error });
    } else {
      return error;
    }
  }
}

async function get(
  url,
  dispatch,
  successCallback,
  rejectCallback,
  fallback,
  params
) {
  if (shouldFallback) {
    console.warn(url, "intercepted, mocking data with: ", fallback);
    mockRequest(dispatch, successCallback, rejectCallback, fallback);
  } else {
    return request(url, dispatch, successCallback, rejectCallback, params);
  }
}

export async function fetchBlocks(
  dispatch,
  successCallback,
  rejectedCallback,
  page = 0,
  limit = 15
) {
  const offset = page * limit;
  const fallBack = blockList;

  get(
    `${apiUrl}/blocks`,
    dispatch,
    successCallback,
    rejectedCallback,
    fallBack,
    {
      limit,
      offset,
    }
  );
}

export async function fetchLeaves(dispatch, blockId) {
  get(
    `${apiUrl}/blocks/${blockId}/leaves`,
    dispatch,
    undefined,
    undefined,
    numericSortByAttribute(leaves[blockId])
  );
}

export async function fetchLatestLeaves(
  dispatch,
  successCallback,
  rejectedCallback
) {
  if (shouldFallback) {
    const latestBlockId = blockList[0].blockId;

    get(
      `${apiUrl}/blocks/${latestBlockId}/leaves`,
      dispatch,
      successCallback,
      rejectedCallback,
      leaves[latestBlockId]
    );
  } else {
    const latestBlockResponse = await get(
      `${apiUrl}/blocks`,
      undefined,
      undefined,
      rejectedCallback,
      {
        limit: 1,
      }
    );

    const latestBlockId = latestBlockResponse.data[0].blockId ?? undefined;

    get(
      `${apiUrl}/blocks/${latestBlockId}/leaves`,
      dispatch,
      successCallback,
      rejectedCallback
    );
  }
}

export async function fetchFCD(dispatch, successCallback, rejectedCallback) {
  get(`${apiUrl}/fcds`, dispatch, successCallback, rejectedCallback);
}

export async function fetchProof(dispatch, successCallback, rejectedCallback) {
  const fallback = {
    data: {
      block: blockList[0],
      leaves: leaves[blockList[0].blockId],
    },
  };

  get(
    `${apiUrl}/proofs`,
    dispatch,
    successCallback,
    rejectedCallback,
    fallback
  );
}

export async function fetchBlock(
  id,
  dispatch,
  successCallback,
  rejectedCallback
) {
  const fallBack = blocks[id];

  get(
    `${apiUrl}/blocks/${id}`,
    dispatch,
    successCallback,
    rejectedCallback,
    fallBack
  );
}

export async function fetchInfo(dispatch, successCallback, rejectedCallback) {
  get(`${apiUrl}/info`, dispatch, successCallback, rejectedCallback, info);
}
