import axios from "axios";
import { bearerToken as tokenAuth } from "constants/auth";

const authorization = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

async function request({
  url,
  successCallback,
  rejectCallback,
  params = {},
  call,
}) {
  const hasSuccessCallback = typeof successCallback === "function";
  const hasErrorRejectCallback = typeof rejectCallback === "function";

  try {
    const response = await call(url, {
      ...authorization(tokenAuth),
      params,
    });

    hasSuccessCallback && successCallback(response.data);

    return response.data;
  } catch (e) {
    const error = e?.response?.status ?? e?.message;

    console.error(error);

    hasErrorRejectCallback && rejectCallback({ error });
  }
}

export async function get({
  url,
  successCallback,
  rejectCallback,
  params = {},
}) {
  return request({
    url,
    successCallback,
    rejectCallback,
    params,
    call: axios.get,
  });
}

export async function collect({ operations, successCallback, rejectCallback }) {
  const hasSuccessCallback = typeof successCallback === "function";
  const hasRejectCallback = typeof rejectCallback === "function";

  const promises = operations.map((operation) => {
    return new Promise((resolve, reject) =>
      get({
        successCallback: resolve,
        rejectCallback: reject,
        ...operation,
      })
    );
  });

  Promise.all(promises)
    .then((results) => {
      const collectResult = new Map(
        results.map((result, index) => {
          return [operations[index].key, result];
        })
      );

      const entries = Object.fromEntries(collectResult);
      hasSuccessCallback && successCallback(entries);

      return entries;
    })
    .catch((error) => {
      console.error(operations, error);

      hasRejectCallback && rejectCallback(error);
      return error;
    });
}

const API = {
  get,
  collect,
};

export default API;
