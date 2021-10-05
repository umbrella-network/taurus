import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { startCase } from "lodash";

import { fetchBlock } from "@Services";
import { bscScanUrl, scanUrl } from "@Urls";
import { valueToToken } from "@Formatters";
import { readableAgeFromTimestamp } from "@Utils";

import { ArrowAlt } from "@Images";

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

  useEffect(() => {
    if (block) {
      setIsLoading(false);
    }
  }, [block]);

  const parsedVoters = block?.voters.map((voter) => ({
    address: voter,
    power: block.votes[voter],
  }));

  const handleBlock = ({ data }) => setBlock(data);

  /* eslint-disable-next-line */
  useEffect(() => fetchBlock(id, handleBlock, handleRedirect), []);

  return (
    <div className="block">
      <div className="block__header">
        <button aria-label="Back to block list" onClick={handleRedirect}>
          <ArrowAlt />
        </button>
        <Heading>Block {id} Details</Heading>
      </div>
      {isLoading ? (
        <LoadingState />
      ) : (
        <>
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
                  },
                  {
                    label: "Power",
                    valueCallback: (value) =>
                      valueToToken({ value: value.power, truncate: true }),
                  },
                ]}
              />
            </Card>
            <Leaves block={block} id={id} leavesLengthCallback={setLeavesLength} />
            <Heading>
              Block {id} Validators <span>{block.voters.length} total </span>
            </Heading>
            <Card className="validators">
              <PaginatedTable
                mobileTable
                data={parsedVoters}
                properties={[
                  {
                    label: "Adress",
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
        </>
      )}
    </div>
  );
}

export default Block;
