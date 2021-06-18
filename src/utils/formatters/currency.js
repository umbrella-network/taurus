import { isEmpty, splitAt } from "ramda";

export function valueToToken({
  value,
  token = "UMB",
  truncate = false,
  precision = 18,
}) {
  const valueText = `${value}`;
  const [integer, decimals] = splitAt(precision * -1, valueText);

  const paddingLength = precision - decimals.length;
  const isDecimalNumber = isEmpty(integer);
  const decimalsToTruncate = isDecimalNumber ? paddingLength : 0;

  const paddedDecimals = decimals.padStart(precision, "0");

  const formattedInteger = isDecimalNumber ? "0" : integer;
  const formattedDecimals = truncate
    ? `${splitAt(decimalsToTruncate + 2, paddedDecimals)[0]}...`
    : paddedDecimals;

  return `${formattedInteger}.${formattedDecimals} ${token}`;
}
