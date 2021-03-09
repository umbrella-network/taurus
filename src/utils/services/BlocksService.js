import axios from "axios";
import { numericSortByAttribute } from "@Utils";
import { join } from "ramda";
import { blockList, blocks, leaves } from "@Mocks";

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

async function request(url, dispatch, successCallback, rejectedCallback) {
  try {
    const response = await axios.get(
      url,
      authorization(process.env.REACT_APP_TOKEN_AUTH)
    );

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

async function get(url, dispatch, successCallback, rejectCallback, fallback) {
  if (process.env.REACT_APP_SHOULD_FALLBACK === "true") {
    console.warn(url, "intercepted, mocking data with: ", fallback);
    mockRequest(dispatch, successCallback, rejectCallback, fallback);
  } else {
    return request(url, dispatch, successCallback, rejectCallback);
  }
}

export async function fetchBlocks(
  dispatch,
  successCallback,
  rejectedCallback,
  page = 0,
  blocksLimit = 15
) {
  const blocksOffset = page * blocksLimit;
  const fallBack = blockList;

  get(
    `${process.env.REACT_APP_BLOCKS_API}/blocks?limit=${blocksLimit}&offset=${blocksOffset}`,
    dispatch,
    successCallback,
    rejectedCallback,
    fallBack
  );
}

export async function fetchLeaves(dispatch, blockId) {
  get(
    `${process.env.REACT_APP_BLOCKS_API}/blocks/${blockId}/leaves`,
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
  if (process.env.REACT_APP_SHOULD_FALLBACK === "true") {
    const latestBlockId = blockList[0]._id;

    get(
      `${process.env.REACT_APP_BLOCKS_API}/blocks/${latestBlockId}/leaves`,
      dispatch,
      successCallback,
      rejectedCallback,
      leaves[latestBlockId]
    );
  } else {
    const latestBlockResponse = await get(
      `${process.env.REACT_APP_BLOCKS_API}/blocks?limit=1`,
      undefined,
      undefined,
      rejectedCallback
    );

    const latestBlockId = latestBlockResponse.data[0]._id ?? undefined;

    get(
      `${process.env.REACT_APP_BLOCKS_API}/blocks/${latestBlockId}/leaves`,
      dispatch,
      successCallback,
      rejectedCallback
    );
  }
}

export async function fetchProof(
  dispatch,
  successCallback,
  rejectedCallback,
  selected
) {
  const params = join(
    "&",
    selected.map((key) => `keys[]=${key}`)
  );

  const fallback = {
    data: {
      block: blockList[0],
      leaves: leaves[blockList[0]._id].filter(({ key }) =>
        selected.includes(key)
      ),
    },
  };

  get(
    `${process.env.REACT_APP_BLOCKS_API}/proofs/?${params}`,
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
    `${process.env.REACT_APP_BLOCKS_API}/blocks/${id}`,
    dispatch,
    successCallback,
    rejectedCallback,
    fallBack
  );
}
