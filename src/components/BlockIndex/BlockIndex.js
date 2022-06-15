import React from "react";

import { useChain } from "store/Chain";

import { HeaderCards } from "components";
import { LazyTable, Heading, Card } from "components/ui";

import { readableAgeFromTimestamp } from "utils";
import { valueToToken } from "utils/formatters";
import { scanUrl, scanUrlSuffix } from "utils/urls";

import "./blockIndex.scss";

function BlockIndex() {
  const {
    state: {
      blocks: { list, isLoading },
    },
    getNthBlocksPage,
  } = useChain();

  return (
    <div className="block-index">
      <Heading primary>Blocks</Heading>
      <HeaderCards />
      <Card className="block-index__table">
        <LazyTable
          queryPage
          data={list}
          isLoading={isLoading}
          fetchCallback={getNthBlocksPage}
          properties={[
            {
              key: "blockId",
              label: "Block ID",
              primary: true,
              highlight: true,
              urlPrefix: "/blocks",
            },
            {
              key: "root",
              label: "Root",
              description:
                "This is a unique representation of the entire Merkle Tree",
              truncate: true,
              highlight: true,
            },
            {
              label: "Minter",
              key: "minter",
              description: "This is the original validator who started the key",
              clipboardable: true,
              truncate: true,
              urlPrefix: scanUrl,
              urlSuffix: scanUrlSuffix,
            },
            {
              key: "anchor",
              label: "Anchor",
              description:
                "This is the location where you can find the transaction in EThereum",
            },
            {
              label: "Staked",
              valueCallback: (value) =>
                valueToToken({ value: value.staked, truncate: true }),
              description:
                "This is the amount that has been staked during this block",
              titleKey: "staked",
            },
            {
              label: "Power",
              valueCallback: (value) =>
                valueToToken({ value: value.power, truncate: true }),
              description:
                "This is the amount that the validator staked in the most recent block",
              titleKey: "power",
            },
            {
              label: "Age",
              valueCallback: (value) =>
                readableAgeFromTimestamp(value.dataTimestamp),
              titleKey: "dataTimestamp",
            },
          ]}
        />
      </Card>
    </div>
  );
}

export default BlockIndex;
