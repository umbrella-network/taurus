import React from "react";
import PropTypes from "prop-types";

import KeyValuePairs from "./KeyValuePairs";

import { formatTimestamp } from "@Utils";
import { truncate, keyToHex, valueToString } from "@Formatters";

const propTypes = {
  leafKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  blockId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  proof: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  chainAddress: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  timestamp: PropTypes.string.isRequired,
};

function LeafPairs({
  leafKey,
  blockId,
  proof,
  value,
  chainAddress,
  timestamp,
}) {
  return (
    <>
      <KeyValuePairs
        pad={{ bottom: "xsmall" }}
        border={{
          size: "xsmall",
          style: "dashed",
          side: "bottom",
          color: "control",
        }}
        items={[
          {
            key: "key",
            value: leafKey,
          },
          {
            key: "value",
            value: valueToString(value),
          },
          {
            key: "",
            value: formatTimestamp(timestamp),
          },
        ]}
      />
      <KeyValuePairs
        margin={{ top: "xsmall" }}
        items={[
          {
            key: "block ID",
            value: blockId,
            clipboardable: true,
          },
          {
            key: "chain address",
            value: truncate(chainAddress),
            clipboardableValue: chainAddress,
            clipboardable: true,
          },
          {
            key: "proof",
            value: truncate(JSON.stringify(proof)),
            clipboardable: true,
            clipboardableValue: JSON.stringify(proof),
          },
          {
            key: "key [bytes]",
            value: truncate(keyToHex(leafKey)),
            clipboardable: true,
            clipboardableValue: keyToHex(leafKey),
          },
          {
            key: "value [bytes]",
            value: truncate(value),
            clipboardable: true,
            clipboardableValue: value,
          },
        ]}
      />
    </>
  );
}

LeafPairs.propTypes = propTypes;

export default LeafPairs;
