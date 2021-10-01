import React from "react";
import PropTypes from "prop-types";

import { Card } from "grommet";

import { KeyValuePairs, LoadingState } from "@Ui";
import { truncate, valueToToken } from "@Formatters";
import { formatTimestamp, readableAgeFromTimestamp } from "@Utils";

const propTypes = {
  block: PropTypes.object.isRequired,
  leaves: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
};

const defaultProps = {
  leaves: [],
};

function Details({ block, leaves, isLoading }) {
  const {
    blockId,
    anchor,
    dataTimestamp,
    root,
    minter,
    staked,
    power,
    status,
    chainAddress,
  } = block;

  return (
    <Card
      background="white"
      alignContent="center"
      justify="center"
      pad="medium"
      fill
    >
      {isLoading ? (
        <LoadingState />
      ) : (
        <KeyValuePairs
          fill
          justify="center"
          gap="xsmall"
          items={[
            {
              key: "chain address",
              value: truncate(chainAddress),
              clipboardable: true,
              clipboardableValue: chainAddress,
            },
            {
              key: "block ID",
              value: blockId,
              clipboardable: true,
            },
            {
              key: "age",
              value: readableAgeFromTimestamp(dataTimestamp),
            },
            {
              key: "L2 data pairs",
              value: leaves.length,
            },
            {
              key: "status",
              value: status,
            },
            {
              key: "anchor",
              value: anchor,
            },
            {
              key: "root",
              value: truncate(root),
              clipboardable: true,
              clipboardableValue: root,
            },
            {
              key: "minter",
              value: truncate(minter),
              clipboardable: true,
              clipboardableValue: minter,

            },
            {
              key: "staked",
              value: valueToToken({ value: staked, truncate: true }),
              clipboardable: true,
              clipboardableValue: staked,
            },
            {
              key: "power",
              value: valueToToken({ value: power, truncate: true }),
              clipboardable: true,
              clipboardableValue: power,
            },
            {
              key: "dataTimestamp",
              value: formatTimestamp(dataTimestamp),
            },
          ]}
        />
      )}
    </Card>
  );
}

Details.propTypes = propTypes;
Details.defaultProps = defaultProps;

export default Details;
