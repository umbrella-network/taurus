import axios from "axios";
import { chainId, tokenAuth } from "@Constants";
import { apiUrl } from "@Urls";

const authorization = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

async function request(
  url,
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
  successCallback,
  rejectCallback,
  params
) => request(url, successCallback, rejectCallback, params);

export async function fetchBlocks(
  successCallback,
  rejectedCallback,
  page = 0,
  limit = 15
) {
  const offset = page * limit;

  get(`${apiUrl}/blocks`, successCallback, rejectedCallback, {
    limit,
    offset,
  });
}

export async function fetchLeaves(blockId, successCallback, rejectCallback) {
  get(`${apiUrl}/blocks/${blockId}/leaves`, successCallback, rejectCallback);
}

export async function fetchLatestLeaves(
  successCallback,
  rejectedCallback
) {
  const latestBlockResponse = await get(
    `${apiUrl}/blocks`,
    undefined,
    rejectedCallback,
    {
      limit: 1,
    }
  );

  const latestBlockId = latestBlockResponse.data[0].blockId ?? undefined;

  get(
    `${apiUrl}/blocks/${latestBlockId}/leaves`,
    successCallback,
    rejectedCallback
  );
}

export async function fetchFCD(successCallback, rejectedCallback) {
  get(`${apiUrl}/fcds`, successCallback, rejectedCallback);
}

export async function fetchProof(successCallback, rejectedCallback) {
  get(`${apiUrl}/proofs`, successCallback, rejectedCallback);
}

export async function fetchBlock(
  id,
  successCallback,
  rejectedCallback
) {
  get(`${apiUrl}/blocks/${id}`, successCallback, rejectedCallback);
}

export async function fetchInfo(successCallback, rejectedCallback) {
  get(`${apiUrl}/info`, successCallback, rejectedCallback);
}
