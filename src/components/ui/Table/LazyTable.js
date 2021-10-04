import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { PaginatedTable, LoadingState } from "@Ui";

import "./lazyTable.scss";

const properties = PropTypes.arrayOf(
  PropTypes.shape({
    key: PropTypes.string,
    valueCallback: PropTypes.func,
    label: PropTypes.string,
    truncate: PropTypes.bool,
    clipboardable: PropTypes.bool,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    primary: PropTypes.bool,
    urlKey: PropTypes.string,
    highlight: PropTypes.bool,
  })
).isRequired;

const propTypes = {
  properties,
  dataPerPage: PropTypes.number,
  fetchCallback: PropTypes.func.isRequired,
};

const defaultProps = {
  dataPerPage: 10,
};

function LazyTable({ properties, fetchCallback, dataPerPage }) {
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
