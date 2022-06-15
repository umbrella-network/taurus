import { LeafKeyCoder, LeafValueCoder } from "@umb-network/toolbox";
import { join, splitAt, takeLast, isEmpty, uniqBy, prop, sortBy } from "ramda";

import { scanUrl } from "utils/urls";

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

export function arrayToString(array = []) {
  return `[${array.map((e) => `"${e}"`).join()}]`;
}

function formatFCD(data) {
  return {
    value: data.value.toString(),
    id: data._id,
    key: LeafValueCoder.printableKey(data.key),
    keyHex: keyToHex(data.key),
    dataTimestamp: data.dataTimestamp,
    isFCD: true,
    type: "First class",
  };
}

export function formatLeaf(data, block) {
  return {
    value: LeafValueCoder.printableValue(data.value, data.key),
    valueBytes: data.value,
    id: data._id,
    key: LeafValueCoder.printableKey(data.key),
    keyHex: keyToHex(data.key),
    proof: data.proof,
    dataTimestamp: block.dataTimestamp,
    blockId: block.blockId,
    chainAddress: block.chainAddress,
    chainAddressScanUrl: `${scanUrl}/${block.chainAddress}`,
    isL2: true,
    type: "Layer 2",
  };
}

export function parseBlockVoters(block) {
  return block?.voters.map((voter) => ({
    address: voter,
    power: block.votes[voter],
  }));
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
