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
import { useTranslation } from "react-i18next";

const propTypes = {
  block: PropTypes.object.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

function Leaves({ block, id }) {
  const { t } = useTranslation(["components", "labels"]);

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
        <Layer
          close={close}
          title={t("leaves.leafDetailsHeading")}
          className="leave-layer"
          fillMobile
        >
          <div className="leave-layer__body">
            <KeyValuePairs
              item={{ ...currentLeaf, ...block }}
              properties={[
                {
                  key: "chainAddress",
                  label: t("labels:chainAddress"),
                  primary: true,
                  urlPrefix: scanUrl,
                  urlSuffix: scanUrlSuffix,
                  truncate: true,
                  clipboardable: true,
                },
                {
                  key: "key",
                  label: t("labels:key"),
                },
                {
                  label: "Value",
                  key: t("labels:value"),
                },
                {
                  label: t("labels:keyBytes"),
                  key: "keyHex",
                  truncate: true,
                  clipboardable: true,
                },
                {
                  key: "valueBytes",
                  label: t("labels:valueBytes"),
                  clipboardable: true,
                  truncate: true,
                },
                {
                  key: "blockId",
                  label: t("labels:blockId"),
                  clipboardable: true,
                },
              ]}
            />
            <div className="proof-copy">
              <p>{t("labels:proof")}</p>
              <Clipboardable
                text={readableProof(currentLeaf)}
                label={t("leaves.clipboardableLabel")}
              />
            </div>
            <p className="proof">{arrayToReadableJSON(currentLeaf.proof)}</p>
          </div>
        </Layer>
      )}
      <div className="select-wrapper">
        <Select
          className="key-select"
          title={t("leaves.searchTitle")}
          callback={setFilteredItems}
          matchingKey="key"
          items={leaves ?? []}
          placeholder={t("leaves.searchPlaceholder")}
          full
        />
      </div>
      <Heading>
        {t("leaves.blockL2Heading", { id })}{" "}
        {Boolean(leaves?.length) && (
          <span>{t("leaves.blockL2Total", { amount: leavesAmount })}</span>
        )}
      </Heading>
      <Card className="leaves">
        <PaginatedTable
          data={filteredItems}
          properties={[
            {
              key: "key",
              label: t("labels:key"),
              description: t("leaves.keyDescription"),
              onClick: setCurrentLeaf,
            },
            {
              label: t("labels:value"),
              key: "value",
              description: t("leaves.valueDescription"),
            },
            {
              label: t("labels:keyBytes"),
              key: "keyHex",
              description: t("leaves.keyBytesDescription"),
              truncate: true,
              clipboardable: true,
            },
            {
              key: "valueBytes",
              label: t("labels:valueBytes"),
              description: t("leaves.valueBytesDescription"),
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
