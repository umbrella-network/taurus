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
import { useTranslation } from "react-i18next";

function Block() {
  const { t } = useTranslation(["components", "labels"]);

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
        <Heading>{t("block.heading", { id })}</Heading>
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
                  label: t("labels:chainAddress"),
                  urlPrefix: scanUrl,
                  urlSuffix: scanUrlSuffix,
                  truncate: true,
                  clipboardable: true,
                },
                {
                  key: "blockId",
                  label: t("labels:blockId"),
                },
                {
                  label: t("labels:age"),
                  valueCallback: (value) =>
                    readableAgeFromTimestamp(value.dataTimestamp),
                },
                {
                  label: t("labels:timestamp"),
                  key: "dataTimestamp",
                  clipboardable: true,
                },
                {
                  label: t("labels:l2Datapairs"),
                  valueCallback: () => leavesAmount ?? "Loading...",
                },
                {
                  label: t("labels:status"),
                  valueCallback: (value) => startCase(value.status),
                },
                {
                  key: "anchor",
                  label: t("labels:anchor"),
                },
                {
                  key: "root",
                  label: t("labels:root"),
                  truncate: true,
                  clipboardable: true,
                },
                {
                  label: t("labels:minter"),
                  key: "minter",
                  clipboardable: true,
                  truncate: true,
                  urlPrefix: scanUrl,
                  urlSuffix: scanUrlSuffix,
                },
                {
                  label: t("labels:staked"),
                  valueCallback: (value) =>
                    valueToToken({ value: value.staked, truncate: true }),
                  titleKey: "staked",
                },
                {
                  label: t("labels:power"),
                  valueCallback: (value) =>
                    valueToToken({ value: value.power, truncate: true }),
                  titleKey: "power",
                },
              ]}
            />
          </Card>
          <Leaves block={block} id={id} />
          <Heading>
            {t("block.validatorsHeading", { id })}{" "}
            <span>
              {t("block.validatorsTotal", { amount: block.voters.length })}
            </span>
          </Heading>
          <Card className="validators">
            <PaginatedTable
              mobileTable
              data={parsedVoters}
              properties={[
                {
                  label: t("labels:address"),
                  urlPrefix: bscScanUrl,
                  key: "address",
                  truncate: true,
                  clipboardable: true,
                },
                {
                  label: t("labels:power"),
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
                  {t("block.notFound.part1")}
                  <span>{id}</span>
                  {t("block.notFound.part2")}
                </p>
              </div>
              <Url
                onClick={handleRedirect}
                url="/blocks"
                label={t("block.notFound.returnButtonLabel")}
              />
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default Block;
