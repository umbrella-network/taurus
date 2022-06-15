import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useChain } from "store/Chain";

import {
  PaginatedTable,
  Card,
  Heading,
  Select,
  Layer,
  KeyValuePairs,
  Clipboardable,
} from "components/ui";

import { readableProof, arrayToReadableJSON } from "utils/formatters";
import { scanUrl, scanUrlSuffix } from "utils/urls";

import "./leaves.scss";

const propTypes = {
  block: PropTypes.object.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

function Leaves({ block, id }) {
  const {
    state: {
      selectedBlock: { leavesAmount, leavesList: leaves },
    },
  } = useChain();

  const [filteredItems, setFilteredItems] = useState(leaves ?? []);

  const [currentLeaf, setCurrentLeaf] = useState(undefined);
  const close = () => setCurrentLeaf(undefined);

  useEffect(() => {
    if (leaves) {
      setFilteredItems(leaves);
    }
  }, [leaves]);

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
                  urlSuffix: scanUrlSuffix,
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
      <div className="select-wrapper">
        <Select
          className="key-select"
          title="Key"
          callback={setFilteredItems}
          matchingKey="key"
          items={leaves ?? []}
          placeholder="Search for key..."
          full
        />
      </div>
      <Heading>
        Block {id} Layer 2 data{" "}
        {Boolean(leaves?.length) && <span>{leavesAmount} total</span>}
      </Heading>
      <Card className="leaves">
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
      </Card>
    </>
  );
}

Leaves.propTypes = propTypes;

export default Leaves;
