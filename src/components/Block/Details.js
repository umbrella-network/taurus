import React from "react";
import PropTypes from "prop-types";

import { Card } from "grommet";

import { KeyValuePairs, ScanUrl } from "@Ui";
import { truncate, valueToToken } from "@Formatters";
import { formatTimestamp, readableAgeFromTimestamp } from "@Utils";

const propTypes = {
  block: PropTypes.object.isRequired,
};

function Details({ block }) {
  const {
    height,
    anchor,
    timestamp,
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
            key: "block height",
            value: height,
            clipboardable: true,
          },
          {
            key: "age",
            value: readableAgeFromTimestamp(timestamp),
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
          },
          {
            key: "minter",
            childValue: (
              <ScanUrl
                style={{ textAlign: "end" }}
                address={minter}
                text={truncate(minter)}
              />
            ),
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
            key: "timestamp",
            value: formatTimestamp(timestamp),
          },
        ]}
      />
    </Card>
  );
}

Details.propTypes = propTypes;

export default Details;
