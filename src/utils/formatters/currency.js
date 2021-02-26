import { splitAt } from "ramda";

export function valueToToken({
  value,
  token = "UMB",
  truncate = false,
  precision = 18,
}) {
  const valueText = `${value}`;
  const shouldTruncate = truncate && valueText.length > precision;
  const [integer, decimals] = splitAt(precision * -1, valueText);

  const formattedValue = shouldTruncate
    ? `${integer}.${splitAt(2, decimals)[0]}...`
    : valueText;

  return `${formattedValue} ${token}`;
}
