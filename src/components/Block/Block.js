import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { startCase } from "lodash";

import { fetchBlock } from "@Services";
import { bscScanUrl, scanUrl } from "@Urls";
import { valueToToken } from "@Formatters";
import { readableAgeFromTimestamp } from "@Utils";
import { Url } from "@Ui";

import { ArrowAlt, CloseAlt } from "@Images";

import {
  PaginatedTable,
  LoadingState,
  Card,
  Heading,
  KeyValuePairs,
} from "@Ui";

import Leaves from "./Leaves";

import "./block.scss";

function Block() {
  const { id } = useParams();
  const history = useHistory();
  const handleRedirect = () => history.push("/blocks");

  const [block, setBlock] = useState();
  const [leavesLength, setLeavesLength] = useState("Loading...");
  const [isLoading, setIsLoading] = useState(true);

  const [hasError, setHasError] = useState(false);
  const loadingState = isLoading && !block;
  const hasBlock = !isLoading && block;

  const handleError = () => setHasError(true);

  useEffect(() => {
    if (block || hasError) {
      setIsLoading(false);
    }
  }, [block, hasError]);

  const parsedVoters = block?.voters.map((voter) => ({
    address: voter,
    power: block.votes[voter],
  }));

  const handleBlock = ({ data }) => setBlock(data);

  /* eslint-disable-next-line */
  useEffect(() => fetchBlock(id, handleBlock, handleError), []);

  return (
    <div className="block">
      <div className="block__header">
        <button aria-label="Back to block list" onClick={handleRedirect}>
          <ArrowAlt />
        </button>
        <Heading>Block {id} Details</Heading>
      </div>
      {loadingState && <LoadingState />}
      {hasBlock && (
        <div className="block__body">
          <Card>
            <KeyValuePairs
              item={block}
              properties={[
                {
                  key: "chainAddress",
                  label: "Chain Address",
                  primary: true,
                  urlPrefix: scanUrl,
                  truncate: true,
                  clipboardable: true,
                },
                {
                  key: "blockId",
                  label: "Block ID",
                  highlight: true,
                },
                {
                  label: "Age",
                  valueCallback: (value) =>
                    readableAgeFromTimestamp(value.dataTimestamp),
                },
                {
                  label: "L2 data pairs",
                  valueCallback: () => leavesLength,
                },
                {
                  label: "Status",
                  valueCallback: (value) => startCase(value.status),
                },
                {
                  key: "anchor",
                  label: "Anchor",
                },
                {
                  key: "root",
                  label: "Root",
                  truncate: true,
                  highlight: true,
                  clipboardable: true,
                },
                {
                  label: "Minter",
                  key: "minter",
                  clipboardable: true,
                  truncate: true,
                  urlPrefix: scanUrl,
                },
                {
                  label: "Staked",
                  valueCallback: (value) =>
                    valueToToken({ value: value.staked, truncate: true }),
                  titleKey: "staked",
                },
                {
                  label: "Power",
                  valueCallback: (value) =>
                    valueToToken({ value: value.power, truncate: true }),
                  titleKey: "power",
                },
              ]}
            />
          </Card>
          <Leaves
            block={block}
            id={id}
            leavesLengthCallback={setLeavesLength}
          />
          <Heading>
            Block {id} Validators <span>{block.voters.length} total </span>
          </Heading>
          <Card className="validators">
            <PaginatedTable
              mobileTable
              data={parsedVoters}
              properties={[
                {
                  label: "Address",
                  urlPrefix: bscScanUrl,
                  key: "address",
                  truncate: true,
                  clipboardable: true,
                },
                {
                  label: "Power",
                  valueCallback: (value) =>
                    valueToToken({ value: value.power, truncate: true }),
                },
              ]}
            />
          </Card>
        </div>
      )}
      {hasError && !isLoading && (
        <div className="block__body">
          <div className="error-state">
            <Card>
              <div className="error-state__message">
                <CloseAlt />
                <p>
                  Sorry, we could not find a block with the ID <span>{id}</span>
                </p>
              </div>
              <Url
                onClick={handleRedirect}
                url="/blocks"
                label="go to block list"
              />
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default Block;
