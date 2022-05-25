import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { startCase } from "lodash";

import {
  PaginatedTable,
  LoadingState,
  Card,
  Heading,
  KeyValuePairs,
  Url,
} from "components/ui";
import Leaves from "./Leaves";

import { useChain } from "store/Chain";
import { bscScanUrl, scanUrl, scanUrlSuffix } from "utils/urls";
import { valueToToken, parseBlockVoters } from "utils/formatters";
import { readableAgeFromTimestamp } from "utils";
import { ArrowAlt, CloseAlt } from "assets/images";

import "./block.scss";

function Block() {
  const {
    state: {
      selectedBlock: { leavesAmount, details: block, error, isLoading },
    },
    getBlockAndLeaves,
  } = useChain();
  const { id } = useParams();
  const history = useHistory();

  const handleRedirect = () => history.push("/blocks");

  const parsedVoters = parseBlockVoters(block);

  useEffect(() => {
    const shouldRequestBlock =
      (!block && !isLoading && !error) ||
      (block && block.blockId !== Number(id));

    if (shouldRequestBlock) {
      getBlockAndLeaves({ blockId: id });
    }
  }, [block, id, error, isLoading, getBlockAndLeaves]);

  return (
    <div className="block">
      <div className="block__header">
        <button aria-label="Back to block list" onClick={handleRedirect}>
          <ArrowAlt />
        </button>
        <Heading>Block {id} Details</Heading>
      </div>
      {isLoading && <LoadingState />}
      {block && (
        <div className="block__body">
          <Card>
            <KeyValuePairs
              item={block}
              properties={[
                {
                  key: "chainAddress",
                  label: "Chain Address",
                  urlPrefix: scanUrl,
                  urlSuffix: scanUrlSuffix,
                  truncate: true,
                  clipboardable: true,
                },
                {
                  key: "blockId",
                  label: "Block ID",
                },
                {
                  label: "Age",
                  valueCallback: (value) =>
                    readableAgeFromTimestamp(value.dataTimestamp),
                },
                {
                  label: "Timestamp",
                  key: "dataTimestamp",
                  clipboardable: true,
                },
                {
                  label: "L2 data pairs",
                  valueCallback: () => leavesAmount ?? "Loading...",
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
                  clipboardable: true,
                },
                {
                  label: "Minter",
                  key: "minter",
                  clipboardable: true,
                  truncate: true,
                  urlPrefix: scanUrl,
                  urlSuffix: scanUrlSuffix,
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
          <Leaves block={block} id={id} />
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
      {error && (
        <div className="block__body">
          <div className="error-state">
            <Card>
              <div className="error-state__message">
                <CloseAlt />
                <p>
                  Sorry, we encountered an error while processing block{" "}
                  <span>{id}</span>. Please make sure you are requesting a valid
                  block and try again.
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
