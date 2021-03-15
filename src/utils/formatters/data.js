import { join, splitAt, takeLast, isEmpty } from "ramda";
import { utils } from "ethers";
import {
  LeafKeyCoder,
  LeafValueCoder,
  LeafType,
  converters,
} from "@umb-network/toolbox";
import int64 from "int64-buffer";
import { formatDistanceToNowStrict } from "date-fns";

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

export function toBigNumber(value) {
  if (utils.isHexString(value)) {
    return value;
  }

  try {
    return utils.parseEther(value)._hex;
  } catch {
    return "0x00";
  }
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

export function keyToString(key) {
  try {
    const stringKey = LeafKeyCoder.decode(key);
    return stringKey;
  } catch {
    return "";
  }
}

export function valueToHex(value) {
  try {
    const bufferValue = LeafValueCoder.encode(value, LeafType.TYPE_FLOAT);
    const hexValue = bufferValue.toString("hex");
    return `0x${hexValue}`;
  } catch {
    return "";
  }
}

export function keyToByte32(key) {
  try {
    return converters.strToBytes32(key);
  } catch {
    return "";
  }
}

export function valueToString(value) {
  try {
    const stringValue = LeafValueCoder.decode(value);
    return stringValue;
  } catch {
    return "";
  }
}

export function toBuffer(value) {
  const hex = new int64.Int64BE(value).toBuffer().toString("hex");
  const hexInt = hex.replace(/^0+/g, "");
  return `0x${hexInt.length % 2 === 0 ? "" : "0"}${hexInt}`;
}

export function textToHex(text) {
  try {
    if (utils.toUtf8String(text)) {
      return text;
    }
  } catch {
    return utils.hexlify(utils.toUtf8Bytes(text));
  }
}

export function formatTimestamp(timestamp) {
  return new Date(timestamp)
    .toISOString()
    .replace("T", " ")
    .replace(".000", " ");
}

export function formatTimestampAge(timestamp) {
  if (timestamp === "1970-01-01T00:00:00.000Z") {
    return "-";
  }

  return `${formatDistanceToNowStrict(new Date(timestamp))} ago`;
}
