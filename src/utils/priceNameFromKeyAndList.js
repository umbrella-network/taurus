import { find, propEq } from "ramda";

export function priceNameFromKeyAndList(key, list) {
  const isPriceFromKey = propEq("key", key);
  return find(isPriceFromKey, list)?.key;
}
