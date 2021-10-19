import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { PaginatedTable, LoadingState } from "@Ui";

import { tableProperties as properties } from "@Types";

import "./lazyTable.scss";

const propTypes = {
  properties,
  dataPerPage: PropTypes.number,
  fetchCallback: PropTypes.func.isRequired,
  queryPage: PropTypes.bool,
};

const defaultProps = {
  dataPerPage: 10,
  queryPage: false,
};

function LazyTable({ properties, fetchCallback, dataPerPage, queryPage }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleData = (data) => {
    setIsLoading(false);
    setData(data);
  };

  const pageChangeCallback = (page) => {
    setIsLoading(true);
    fetchCallback(page, handleData);
  };

  return (
    <div
      className={classnames("lazy-table", { "lazy-table--loading": isLoading })}
    >
      <PaginatedTable
        queryPage={queryPage}
        data={data}
        properties={properties}
        pageChangeCallback={pageChangeCallback}
      />
      <LoadingState />
    </div>
  );
}

LazyTable.propTypes = propTypes;
LazyTable.defaultProps = defaultProps;

export default LazyTable;
