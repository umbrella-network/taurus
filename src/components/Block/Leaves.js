import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  LoadingState,
  PaginatedTable,
  Card,
  Heading,
  Layer,
  KeyValuePairs,
  Clipboardable,
} from "@Ui";
import { readableProof, leafToString, keyToHex, arrayToReadableJSON } from "@Formatters";

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

  const [currentLeaf, setCurrentLeaf] = useState(undefined);
  const close = () => setCurrentLeaf(undefined);

  useEffect(() => {
    if (leaves || error) {
      setIsLoading(false);
      leavesLengthCallback(leaves.length);
    }

  /* eslint-disable-next-line */
  }, [leaves, error]);

  /* eslint-disable-next-line */
  useEffect(() => fetchLeaves(id, setLeaves, setError), []);

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
                  valueCallback: (data) => leafToString(data.value, data.key),
                  label: "Value",
                },
                {
                  label: "Key (bytes)",
                  valueCallback: (value) =>
                    keyToHex(value.key),
                  truncate: true,
                  clipboardable: true,
                },
                {
                  key: "value",
                  label: "Value (bytes)",
                  clipboardable: true,
                  truncate: true
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
              <Clipboardable text={readableProof(currentLeaf)} label="Click to copy" />
            </div>
            <p className="proof">{arrayToReadableJSON(currentLeaf.proof)}</p>
          </div>
        </Layer>
      )}
      <Heading>
        Block {id} Layer 2 data{" "}
        {Boolean(leaves?.length) && <span>{leaves.length} total</span>}
      </Heading>
      <Card className="leaves">
        {isLoading && <LoadingState />}
        {!isLoading && !error && (
          <PaginatedTable
            data={leaves}
            properties={[
              {
                key: "key",
                label: "Key",
                description: "This is the name of the cryptocurrency pair",
                primary: true,
                onClick: setCurrentLeaf,
              },
              {
                valueCallback: (data) => leafToString(data.value, data.key),
                label: "Value",
                description:
                  "This is the price (or any other type of data that we are supporting)",
              },
                {
                  label: "Key (bytes)",
                  valueCallback: (value) =>
                    keyToHex(value.key),
                  description: "This is the byte representation of the Key",
                  truncate: true,
                  clipboardable: true,
                },
              {
                key: "value",
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
