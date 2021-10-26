import React, { useState, useEffect } from "react";

import { readableProof } from "@Formatters";
import { HeaderCards } from "@Components";
import { ArrowHamburger, Close } from "@Images";

import {
  Heading,
  Card,
  LoadingState,
  PaginatedTable,
  SearchBar,
  Select,
  Dropdown,
} from "@Ui";

import { usePrices } from "@Store";

import classnames from "classnames";

import "./datapairs.scss";

const L2 = { type: "Layer 2" };
const FCD = { type: "First class" };

const dataTypes = [L2, FCD];

function Datapairs() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedDataTypes, setSelectedDataTypes] = useState(dataTypes);

  const {
    state: {
      datapairs: { list, isLoading },
    },
  } = usePrices();

  const [filteredItems, setFilteredItems] = useState(list);

  useEffect(() => setFilteredItems(list), [list]);

  const dataPairsListByType = filteredItems.filter(
    (dataPair) =>
      (selectedDataTypes.includes(L2) && dataPair.isL2) ||
      (selectedDataTypes.includes(FCD) && dataPair.isFCD)
  );

  return (
    <div className="datapairs">
      <Heading>
        Datapairs
        <span>{isLoading ? "Loading..." : `${list.length} pairs`}</span>
      </Heading>
      <HeaderCards />
      <div
        className={classnames("datapairs__filters", {
          "datapairs__filters--open": isFilterOpen,
        })}
      >
        <div className="header">
          <h2>Filters</h2>
          <button
            onClick={() => setIsFilterOpen(false)}
            aria-label="close all filters"
          >
            <Close />
          </button>
        </div>
        <SearchBar
          className="datapairs-key-search"
          placeholder="Start typing to filter results..."
          callback={setFilteredItems}
          matchingKey="key"
          items={list}
        />
        <Dropdown title="Key" className="key-select">
          <div>
            <Select
              className="key-select"
              title="Key"
              callback={setFilteredItems}
              matchingKey="key"
              items={list}
              placeholder="Search for key..."
            />
          </div>
        </Dropdown>
        <Dropdown title="Type" className="type-select">
          <div>
            <Select
              searchable={false}
              startSelected
              keepOne
              title="Type"
              callback={setSelectedDataTypes}
              matchingKey="type"
              items={dataTypes}
            />
          </div>
        </Dropdown>
        <button onClick={() => setIsFilterOpen(false)} className="save-button">
          Save
        </button>
        <button
          className="open-all"
          onClick={() => setIsFilterOpen(true)}
          aria-label="open all filters"
        >
          <ArrowHamburger />
          <p>Open all filters</p>
        </button>
      </div>
      <Card className="datapairs__table">
        {isLoading ? (
          <LoadingState />
        ) : (
          <PaginatedTable
            data={dataPairsListByType}
            queryPage
            properties={[
              {
                key: "key",
                label: "Key",
                description: "This is the name of the cryptocurrency pair",
                primary: true,
              },
              {
                key: "value",
                label: "Value",
                description:
                  "This is the price (or any other type of data that we are supporting)",
              },
              {
                key: "type",
                label: "Type",
                description: (
                  <>
                    There are 2 types:
                    <br />
                    <span>Layer 1:</span> On Chain Data and Most Used
                    <br />
                    <span>Layer 2:</span> Off Chain Data and More Scalable
                  </>
                ),
              },
              {
                key: "blockId",
                label: "Block ID",
                description: "This is the ID of the block containing the data",
                clipboardable: true,
              },
              {
                valueCallback: readableProof,
                label: "Proof",
                description:
                  "Only Layer 2 requires this information and it can be used to find the address of the blockchain that this key was checked on",
                truncate: true,
                clipboardable: true,
                highlight: true,
              },
              {
                key: "keyHex",
                label: "Key (Bytes)",
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
              {
                key: "chainAddress",
                label: "Chain Address",
                description:
                  "The address for the chain which contains this block",
                clipboardable: true,
                truncate: true,
                urlKey: "chainAddressScanUrl",
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
