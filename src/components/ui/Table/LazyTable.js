import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { PaginatedTable, LoadingState } from "components/ui";

import { tableProperties as properties } from "utils/types";

import "./lazyTable.scss";

const propTypes = {
  properties,
  dataPerPage: PropTypes.number,
  fetchCallback: PropTypes.func.isRequired,
  queryPage: PropTypes.bool,
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
};

const defaultProps = {
  dataPerPage: 10,
  queryPage: false,
  isLoading: false,
};

function LazyTable({
  properties,
  fetchCallback,
  data,
  isLoading,
  dataPerPage,
  queryPage,
}) {
  return (
    <div
      className={classnames("lazy-table", { "lazy-table--loading": isLoading })}
    >
      <PaginatedTable
        queryPage={queryPage}
        dataPerPage={dataPerPage}
        data={data}
        properties={properties}
        pageChangeCallback={fetchCallback}
      />
      <LoadingState />
    </div>
  );
}

LazyTable.propTypes = propTypes;
LazyTable.defaultProps = defaultProps;

export default LazyTable;
