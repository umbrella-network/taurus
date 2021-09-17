import React from "react";

import { arrayToString } from "@Formatters";

import { Heading, Card, LoadingState, PaginatedTable } from "@Ui";

import { usePrices } from "@Store";

import "./datapairs.scss";

const typeLabel = (data) =>
  [data.isFCD && "First-class", data.isLeaf && "Layer 2"]
    .filter((value) => value)
    .join("/");

const readableProof = (data) =>
  data.proof ? arrayToString(data.proof) : undefined;

function Datapairs() {
  const {
    state: {
      datapairs: { list, isLoading },
    },
  } = usePrices();

  return (
    <div className="datapairs">
      <Heading>
        Datapairs
        <span>{isLoading ? "Loading..." : `${list.length} pairs`}</span>
      </Heading>
      <Card className="datapairs__table">
        {isLoading ? (
          <LoadingState />
        ) : (
          <PaginatedTable
            data={list}
            properties={[
              {
                key: "key",
                label: "Key",
                description: "This is the name of the cryptocurrency pair",
                primary: true,
              },
              {
                key: "value",
                label: "Value",
                description:
                  "This is the price (or any other type of data that we are supporting)",
              },
              {
                valueCallback: typeLabel,
                label: "Type",
                description: (
                  <>
                    There are 2 types:
                    <br />
                    <span>Layer 1:</span> On Chain Data and Most Used
                    <br />
                    <span>Layer 2:</span> Off Chain Data and More Scalable
                  </>
                ),
              },
              {
                key: "blockId",
                label: "Block ID",
                description: "This is the ID of the block containing the data",
                clipboardable: true,
              },
              {
                valueCallback: readableProof,
                label: "Proof",
                description:
                  "Only Layer 2 requires this information and it can be used to find the address of the blockchain that this key was checked on",
                truncate: true,
                clipboardable: true,
                highlight: true,
              },
              {
                key: "keyHex",
                label: "Key (Bytes)",
                description: "This is the byte representation of the Key",
                truncate: true,
                clipboardable: true,
              },
              {
                key: "valueBytes",
                label: "Value (Bytes)",
                description: "This is the byte representation of the Value",
                highlight: true,
                truncate: true,
                clipboardable: true,
              },
              {
                key: "chainAddress",
                label: "Chain Address",
                description:
                  "The address for the chain which contains this block",
                clipboardable: true,
                truncate: true,
                urlKey: "chainAddressScanUrl",
              },
            ]}
            dataPerPage={6}
          />
        )}
      </Card>
    </div>
  );
}

export default Datapairs;
