import React from "react";

import { useChain } from "store/Chain";

import { HeaderCards } from "components";
import { LazyTable, Heading, Card } from "components/ui";

import { readableAgeFromTimestamp } from "utils";
import { valueToToken } from "utils/formatters";
import { scanUrl, scanUrlSuffix } from "utils/urls";

import "./blockIndex.scss";
import { useTranslation } from "react-i18next";

function BlockIndex() {
  const { t } = useTranslation(["components", "labels"]);

  const {
    state: {
      blocks: { list, isLoading },
    },
    getNthBlocksPage,
  } = useChain();

  return (
    <div className="block-index">
      <Heading primary>{t("blockIndex.heading")}</Heading>
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
              label: t("labels:blockId"),
              primary: true,
              highlight: true,
              urlPrefix: "/blocks",
            },
            {
              key: "root",
              label: t("labels:root"),
              description: t("blockIndex.rootDescription"),
              truncate: true,
              highlight: true,
            },
            {
              label: t("labels:minter"),
              key: "minter",
              description: t("blockIndex.minterDescription"),
              clipboardable: true,
              truncate: true,
              urlPrefix: scanUrl,
              urlSuffix: scanUrlSuffix,
            },
            {
              key: "anchor",
              label: t("labels:anchor"),
              description: t("blockIndex.anchorDescription"),
            },
            {
              label: t("labels:staked"),
              valueCallback: (value) =>
                valueToToken({ value: value.staked, truncate: true }),
              description: t("blockIndex.stakedDescription"),
              titleKey: "staked",
            },
            {
              label: t("labels:power"),
              valueCallback: (value) =>
                valueToToken({ value: value.power, truncate: true }),
              description: t("blockIndex.powerDescription"),
              titleKey: "power",
            },
            {
              label: t("labels:age"),
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
