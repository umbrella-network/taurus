import React, { useState, useEffect } from "react";
import classnames from "classnames";

import { useChain } from "store/Chain";

import { HeaderCards } from "components";
import {
  Heading,
  Card,
  LoadingState,
  PaginatedTable,
  Select,
  Dropdown,
} from "components/ui";

import { scanUrlSuffix } from "utils/urls";

import { ArrowHamburger, Close } from "assets/images";

import "./datapairs.scss";
import { useTranslation } from "react-i18next";
import { readableAgeFromTimestamp } from "utils";
import { filterOutDuplicatedLabels } from "utils/formatters";

function Datapairs() {
  const { t } = useTranslation(["components", "labels"]);

  const L2 = t("datapairs.layer2");
  const FCD = t("datapairs.firstClass");

  const dataTypes = [L2, FCD];

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedDataTypes, setSelectedDataTypes] = useState(dataTypes);
  const [goToFirstPage, setGoToFirstPage] = useState(false);

  const {
    state: { datapairs, isLoading },
  } = useChain();

  const availablePairs = filterOutDuplicatedLabels(datapairs);

  const [filteredItems, setFilteredItems] = useState(availablePairs);

  useEffect(() => {
    setFilteredItems(availablePairs);
    /* eslint-disable-next-line */
  }, [datapairs]);

  const handleListFilter = (filteredList) => {
    setFilteredItems(filteredList);
    setGoToFirstPage(true);
  };

  const pairsFilteredByType = datapairs.filter(
    (pair) =>
      filteredItems.includes(pair.key) &&
      ((selectedDataTypes.includes(L2) && pair.isL2) ||
        (selectedDataTypes.includes(FCD) && pair.isFCD))
  );

  return (
    <div className="datapairs">
      <Heading primary>
        {t("datapairs.heading")}
        <span>
          {isLoading
            ? t("datapairs.loadingPlaceholder")
            : t("datapairs.datapairsTotal", { amount: datapairs.length })}
        </span>
      </Heading>
      <HeaderCards />
      <div
        className={classnames("datapairs__filters", {
          "datapairs__filters--open": isFilterOpen,
        })}
      >
        <div className="header">
          <h2>{t("datapairs.filters")}</h2>
          <button
            onClick={() => setIsFilterOpen(false)}
            aria-label="close all filters"
          >
            <Close />
          </button>
        </div>
        <Select
          title={t("datapairs.filterTitle")}
          className="datapairs-key-search"
          placeholder={t("datapairs.filterPlaceholder")}
          callback={handleListFilter}
          full
          items={availablePairs}
        />
        <Dropdown title={t("datapairs.type")} className="type-select">
          <div>
            <Select
              searchable={false}
              startSelected
              keepOne
              title={t("datapairs.type")}
              callback={setSelectedDataTypes}
              items={dataTypes}
            />
          </div>
        </Dropdown>
        <button onClick={() => setIsFilterOpen(false)} className="save-button">
          {t("datapairs.save")}
        </button>
        <button
          className="open-all"
          onClick={() => setIsFilterOpen(true)}
          aria-label="open all filters"
        >
          <ArrowHamburger />
          <p>{t("datapairs.openAllFilters")}</p>
        </button>
      </div>
      <Card className="datapairs__table">
        {isLoading ? (
          <LoadingState />
        ) : (
          <PaginatedTable
            data={pairsFilteredByType}
            queryPage
            shouldGoToFirstPage={goToFirstPage}
            callback={() => setGoToFirstPage(false)}
            properties={[
              {
                key: "key",
                label: t("labels:key"),
                description: t("datapairs.keyDescription"),
                primary: true,
              },
              {
                key: "value",
                label: t("labels:value"),
                description: t("datapairs.valueDescription"),
              },
              {
                valueCallback: (value) =>
                  readableAgeFromTimestamp(value.dataTimestamp),
                label: t("labels:age"),
                description: t("datapairs.ageDescription"),
                titleKey: "dataTimestamp",
              },
              {
                key: "type",
                label: t("labels:type"),
                description: (
                  <>
                    {t("datapairs.typeDescription.intro")}
                    <br />
                    <span>{t("datapairs.typeDescription.title1")}</span>{" "}
                    {t("datapairs.typeDescription.description1")}
                    <br />
                    <span>{t("datapairs.typeDescription.title2")}</span>{" "}
                    {t("datapairs.typeDescription.description1")}
                  </>
                ),
              },
              {
                key: "blockId",
                label: t("labels:blockId"),
                description: t("datapairs.blockIdDescription"),
                clipboardable: true,
                urlPrefix: `blocks`,
              },
              {
                key: "chainAddress",
                label: t("labels:chainAddress"),
                description: t("datapairs.chainAddressDescription"),
                clipboardable: true,
                truncate: true,
                urlKey: "chainAddressScanUrl",
                urlSuffix: scanUrlSuffix,
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
