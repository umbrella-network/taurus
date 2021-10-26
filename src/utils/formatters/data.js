import { join, splitAt, takeLast, isEmpty, uniqBy, prop, sortBy } from "ramda";

import { LeafKeyCoder, LeafValueCoder } from "@umb-network/toolbox";

export const arrayToReadableJSON = (array) => {
  const formattedArray = array.map((element) => `"${element}"`);
  return `[\n  ${join(",\n  ", formattedArray)}\n]\n\n`;
};

export function truncate(text, characters = 4) {
  const isTextEmpty = isEmpty(text) || !text;
  const isTextShort = characters * 2 >= text?.length;

  if (isTextEmpty || isTextShort) {
    return text ?? "";
  }

  const firstPart = splitAt(characters, text)[0];
  const lastPart = takeLast(characters, text);

  const textToJoin = [firstPart, "...", lastPart];

  return textToJoin.join("");
}

export function keyToHex(key) {
  try {
    const bufferKey = LeafKeyCoder.encode(key);
    const hexKey = bufferKey.toString("hex");
    return `0x${hexKey}`;
  } catch {
    return "";
  }
}

export function leafToString(value, key) {
  try {
    const stringValue = LeafValueCoder.decode(value, key);
    return stringValue;
  } catch (error) {
    console.log(`error decoding ${key}: `, error);
    return "";
  }
}

export function arrayToString(array = []) {
  return `[${array.map((e) => `"${e}"`).join()}]`;
}

function formatFCD(data) {
  return {
    value: data.value.toString(),
    id: data._id,
    key: data.key,
    keyHex: keyToHex(data.key),
    dataTimestamp: data.dataTimestamp,
    isFCD: true,
    type: "First class",
  };
}

function formatLeaf(data, block) {
  return {
    value: leafToString(data.value, data.key),
    valueBytes: data.value,
    id: data._id,
    key: data.key,
    keyHex: keyToHex(data.key),
    proof: data.proof,
    dataTimestamp: block.dataTimestamp,
    blockId: block.blockId,
    chainAddress: block.chainAddress,
    chainAddressScanUrl: `${process.env.REACT_APP_SCAN_URL}/${block.chainAddress}`,
    isL2: true,
    type: "Layer 2",
  };
}

function mergeFirstClassWithLeafs(firstClassData, leaves) {
  return sortBy(
    prop("key"),
    uniqBy(prop("id"), [...firstClassData, ...leaves])
  );
}

export function formatDatapairs(firstClassData, leaves, block) {
  const formattedFCD = firstClassData.map(formatFCD);
  const formattedLeafs = leaves.map((leaf) => formatLeaf(leaf, block));

  return mergeFirstClassWithLeafs(formattedFCD, formattedLeafs);
}

export const readableProof = (data) =>
  data.proof ? arrayToString(data.proof) : undefined;
