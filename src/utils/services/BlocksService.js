import axios from "axios";

const authorization = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

async function request(url, successCallback, rejectedCallback) {
  try {
    const response = await axios.get(
      url,
      authorization(process.env.REACT_APP_TOKEN_AUTH)
    );

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

async function get(url, successCallback, rejectCallback) {
  return request(url, successCallback, rejectCallback);
}

export async function fetchBlocks(
  successCallback,
  rejectedCallback,
  page = 0,
  blocksLimit = 15
) {
  const blocksOffset = page * blocksLimit;

  get(
    `${process.env.REACT_APP_BLOCKS_API}/blocks?limit=${blocksLimit}&offset=${blocksOffset}`,
    successCallback,
    rejectedCallback
  );
}

export async function fetchLeaves(blockId, successCallback, rejectedCallback) {
  get(
    `${process.env.REACT_APP_BLOCKS_API}/blocks/${blockId}/leaves`,
    successCallback,
    rejectedCallback
  );
}

export async function fetchLatestLeaves(successCallback, rejectedCallback) {
  const latestBlockResponse = await get(
    `${process.env.REACT_APP_BLOCKS_API}/blocks?limit=1`,
    undefined,
    rejectedCallback,
  );

  const latestBlockId = latestBlockResponse.data[0].blockId ?? undefined;

  get(
    `${process.env.REACT_APP_BLOCKS_API}/blocks/${latestBlockId}/leaves`,
    successCallback,
    rejectedCallback
  );
}

export async function fetchFCD(successCallback, rejectedCallback) {
  get(
    `${process.env.REACT_APP_BLOCKS_API}/fcds`,
    successCallback,
    rejectedCallback
  );
}

export async function fetchProof(successCallback, rejectedCallback) {
  get(
    `${process.env.REACT_APP_BLOCKS_API}/proofs`,
    successCallback,
    rejectedCallback
  );
}

export async function fetchBlock(id, successCallback, rejectedCallback) {
  get(
    `${process.env.REACT_APP_BLOCKS_API}/blocks/${id}`,
    successCallback,
    rejectedCallback
  );
}

export async function fetchInfo(successCallback, rejectedCallback) {
  get(
    `${process.env.REACT_APP_BLOCKS_API}/info`,
    successCallback,
    rejectedCallback
  );
}
