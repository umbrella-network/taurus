import axios from "axios";
import { apiUrl, chainId, tokenAuth } from "@Constants";

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

    if (typeof successCallback === "function") {
      successCallback(response.data);
    } else {
      return response;
    }
  } catch (e) {
    const error = e?.response?.status ?? e?.message;
    console.error(error);

    if (typeof rejectedCallback === "function") {
      rejectedCallback({ error });
    }
  }
}

const get = async (
  url,
  dispatch,
  successCallback,
  rejectCallback,
  params
) => request(url, dispatch, successCallback, rejectCallback, params);

export async function fetchBlocks(
  successCallback,
  rejectedCallback,
  page = 0,
  limit = 15
) {
  const offset = page * limit;

  get(`${apiUrl}/blocks`, dispatch, successCallback, rejectedCallback, {
    limit,
    offset,
  });
}

export async function fetchLeaves(dispatch, blockId) {
  get(`${apiUrl}/blocks/${blockId}/leaves`, dispatch, undefined, undefined);
}

export async function fetchLatestLeaves(
  dispatch,
  successCallback,
  rejectedCallback
) {
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

export async function fetchFCD(dispatch, successCallback, rejectedCallback) {
  get(`${apiUrl}/fcds`, dispatch, successCallback, rejectedCallback);
}

export async function fetchProof(dispatch, successCallback, rejectedCallback) {
  get(`${apiUrl}/proofs`, dispatch, successCallback, rejectedCallback);
}

export async function fetchBlock(
  id,
  dispatch,
  successCallback,
  rejectedCallback
) {
  get(`${apiUrl}/blocks/${id}`, dispatch, successCallback, rejectedCallback);
}

export async function fetchInfo(dispatch, successCallback, rejectedCallback) {
  get(`${apiUrl}/info`, dispatch, successCallback, rejectedCallback);
}
