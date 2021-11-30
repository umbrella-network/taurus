import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  LoadingState,
  PaginatedTable,
  Card,
  Heading,
  Select,
  Dropdown,
  Layer,
  KeyValuePairs,
  Clipboardable,
} from "@Ui";

import { readableProof, formatLeaf, arrayToReadableJSON } from "@Formatters";

import { scanUrl } from "@Urls";
import { fetchLeaves } from "@Services";

import "./leaves.scss";

const propTypes = {
  block: PropTypes.object.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  leavesLengthCallback: PropTypes.func.isRequired,
};

function Leaves({ block, id, leavesLengthCallback }) {
  const [leaves, setLeaves] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);

  const [filteredItems, setFilteredItems] = useState(leaves ?? []);

  const [currentLeaf, setCurrentLeaf] = useState(undefined);
  const close = () => setCurrentLeaf(undefined);

  const handleLeaves = (leaves) => {
    setLeaves(leaves.map((leaf) => formatLeaf(leaf, block)));
  };

  useEffect(() => {
    if (leaves || error) {
      setIsLoading(false);
      leavesLengthCallback(leaves.length);
    }

    /* eslint-disable-next-line */
  }, [leaves, error]);

  useEffect(() => {
    if (leaves) {
      setFilteredItems(leaves);
    }
  }, [leaves]);

  /* eslint-disable-next-line */
  useEffect(() => fetchLeaves(id, handleLeaves, setError), []);

  return (
    <>
      {Boolean(currentLeaf) && (
        <Layer close={close} title="Leaf" className="leave-layer" fillMobile>
          <div className="leave-layer__body">
            <KeyValuePairs
              item={{ ...currentLeaf, ...block }}
              properties={[
                {
                  key: "chainAddress",
                  label: "Contract",
                  primary: true,
                  urlPrefix: scanUrl,
                  truncate: true,
                  clipboardable: true,
                },
                {
                  key: "key",
                  label: "Key",
                },
                {
                  label: "Value",
                  key: "value",
                },
                {
                  label: "Key (bytes)",
                  key: "keyHex",
                  truncate: true,
                  clipboardable: true,
                },
                {
                  key: "valueBytes",
                  label: "Value (bytes)",
                  clipboardable: true,
                  truncate: true,
                },
                {
                  key: "blockId",
                  label: "Block ID",
                  clipboardable: true,
                },
              ]}
            />
            <div className="proof-copy">
              <p>Proof</p>
              <Clipboardable
                text={readableProof(currentLeaf)}
                label="Click to copy"
              />
            </div>
            <p className="proof">{arrayToReadableJSON(currentLeaf.proof)}</p>
          </div>
        </Layer>
      )}
      <Dropdown title="Key" className="key-select">
        <div>
          <Select
            className="key-select"
            title="Key"
            callback={setFilteredItems}
            matchingKey="key"
            items={leaves ?? []}
            placeholder="Search for key..."
          />
        </div>
      </Dropdown>
      <Heading>
        Block {id} Layer 2 data{" "}
        {Boolean(leaves?.length) && <span>{leaves.length} total</span>}
      </Heading>
      <Card className="leaves">
        {isLoading && <LoadingState />}
        {!isLoading && !error && (
          <PaginatedTable
            data={filteredItems}
            properties={[
              {
                key: "key",
                label: "Key",
                description: "This is the name of the cryptocurrency pair",
                onClick: setCurrentLeaf,
              },
              {
                label: "Value",
                key: "value",
                description:
                  "This is the price (or any other type of data that we are supporting)",
              },
              {
                label: "Key (bytes)",
                key: "keyHex",
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
            ]}
            dataPerPage={6}
          />
        )}
        {error && (
          <p>Something went wrong fetching the L2 data. Try again later</p>
        )}
      </Card>
    </>
  );
}

Leaves.propTypes = propTypes;

export default Leaves;
