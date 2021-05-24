import { join, splitAt, takeLast, isEmpty } from "ramda";
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

export function valueToString(value) {
  try {
    const stringValue = LeafValueCoder.decode(value);
    return stringValue;
  } catch {
    return "";
  }
}
