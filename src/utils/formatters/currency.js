import { isEmpty, splitAt } from "ramda";

export function valueToToken({
  value,
  token = "UMB",
  truncate = false,
  precision = 18,
  floatDecimals = 18,
  toFloat = false,
}) {
  const valueText = `${value}`;
  const [integer, decimals] = splitAt(precision * -1, valueText);

  const paddingLength = precision - decimals.length;
  const isDecimalNumber = isEmpty(integer);
  const decimalsToTruncate = isDecimalNumber ? paddingLength : 0;

  const paddedDecimals = decimals.padStart(precision, "0");

  const formattedInteger = isDecimalNumber ? "0" : integer;
  const trucatedDecimals = truncate
    ? `${splitAt(decimalsToTruncate + 2, paddedDecimals)[0]}...`
    : paddedDecimals;

  const [formattedDecimals] = splitAt(floatDecimals, trucatedDecimals);
  const parsedValue = `${formattedInteger}.${formattedDecimals}`;

  return toFloat ? parseFloat(parsedValue) : `${parsedValue} ${token}`;
}
