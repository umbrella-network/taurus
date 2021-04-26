import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { DataTable, Text } from "grommet";
import { SearchBar } from "@Ui";

import { slice } from "ramda";
import { capitalize } from "lodash";

import Pagination from "./Pagination";

import "./paginatedTable.scss";

const propTypes = {
  title: PropTypes.string,
  properties: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  dataPerPage: PropTypes.number.isRequired,
  tableConfig: PropTypes.object,
  pageBreak: PropTypes.number,
  searchable: PropTypes.bool,
  searchTerm: PropTypes.string,
};

const defaultProps = {
  title: undefined,
  tableConfig: {},
  pageBreak: 10,
  searchable: false,
  searchTerm: undefined,
};

function PaginatedTable({
  title,
  properties,
  data,
  dataPerPage,
  tableConfig,
  pageBreak,
  searchable,
  searchTerm,
  ...rest
}) {
  const [displayedData, setDisplayedData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  const filterCallback = (items) => {
    setCurrentPage(1);
    setFilteredItems(items);
  };

  const items = filteredItems.length ? filteredItems : data;

  const dataLength = items.length;
  const maxPages = Math.ceil(dataLength / dataPerPage) || 0;

  useEffect(() => {
    const dataRangeStart = (currentPage - 1) * dataPerPage;
    const dataRangeEnd = currentPage * dataPerPage;

    const pageData = slice(dataRangeStart, dataRangeEnd, items);
    setDisplayedData(pageData);
  }, [currentPage, items, dataPerPage]);

  const columns = properties.map((data) => {
    return {
      ...data,
      ...(data.property && {
        key: data.property,
        align: "center",
        header: (
          <Text size="large" weight="bold" textAlign="center">
            {capitalize(data.property)}
          </Text>
        ),
      }),
    };
  });

  return (
    <div className="paginated-table" {...rest}>
      {title && (
        <Text weight="bold" size="xlarge">
          {title}
        </Text>
      )}
      {searchable ? (
        <SearchBar
          isSearching={isSearching}
          open={() => setIsSearching(true)}
          close={() => setIsSearching(false)}
          items={data}
          filterCallback={filterCallback}
          searchTerm={searchTerm}
        />
      ) : null}
      <DataTable
        background={{
          body: ["white", "light-2"],
        }}
        border={{ body: "bottom" }}
        columns={columns}
        data={displayedData}
        {...tableConfig}
      />
      {maxPages ? (
        <Pagination
          maxPages={maxPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageBreak={pageBreak}
        />
      ) : (
        <Text size="large" weight="bold" textAlign="center">
          Nothing to show.
        </Text>
      )}
    </div>
  );
}

PaginatedTable.propTypes = propTypes;
PaginatedTable.defaultProps = defaultProps;

export default PaginatedTable;
