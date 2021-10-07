import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { slice, isEmpty } from "ramda";

import classnames from "classnames";

import { useHistory, useLocation } from "react-router-dom";

import { Info } from "@Ui";

import { tableProperties as properties } from "@Types";

import Pagination from "./Pagination";
import TableRow from "./TableRow";

import "./paginatedTable.scss";

const propTypes = {
  data: PropTypes.array,
  properties,
  dataPerPage: PropTypes.number,
  pageChangeCallback: PropTypes.func,
  mobileTable: PropTypes.bool,
  queryPage: PropTypes.bool,
};

const defaultProps = {
  data: [],
  dataPerPage: 10,
  pageChangeCallback: undefined,
  mobileTable: false,
  queryPage: false,
};

function PaginatedTable({
  properties,
  data,
  dataPerPage,
  pageChangeCallback,
  mobileTable,
  queryPage,
}) {
  const items = data;

  const dataLength = items.length;
  const maxPages = Math.ceil(dataLength / dataPerPage) || 0;

  const isInfinite = Boolean(pageChangeCallback);

  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();

  const pageFromQuery = parseInt(query.get("page"));

  const [segmentedData, setSegmentedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const tableRef = useRef();
  const isInitial = useRef(true);
  const hasSetPaginationFromQuery = useRef(false);

  useEffect(() => {
    const dataRangeStart = (currentPage - 1) * dataPerPage;
    const dataRangeEnd = currentPage * dataPerPage;

    const pageData = slice(dataRangeStart, dataRangeEnd, items);
    setSegmentedData(pageData);
  }, [currentPage, items, dataPerPage]);

  const paginationCallback = (currentPage) => {
    if (tableRef.current && !isInitial.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }

    isInitial.current = false;

    isInfinite && pageChangeCallback(currentPage);
  };

  useEffect(() => {
    if (queryPage && (hasSetPaginationFromQuery.current || currentPage > 1)) {
      const currentPath = history.location.pathname;
      history.replace(`${currentPath}?page=${currentPage}`);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [currentPage]);

  useEffect(() => {
    if (!isInfinite && (hasSetPaginationFromQuery.current || !queryPage)) {
      setCurrentPage(1);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [data, isInfinite]);

  useEffect(() => {
    const isPageValid =
      !isNaN(pageFromQuery) && (pageFromQuery <= maxPages || isInfinite);

    if (queryPage && isPageValid && !hasSetPaginationFromQuery.current) {
      hasSetPaginationFromQuery.current = true;
      setCurrentPage(pageFromQuery);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [maxPages]);

  const displayedData = isInfinite ? data : segmentedData;

  return (
    <div
      ref={tableRef}
      className={classnames("paginated-table", {
        "paginated-table--mobile-table": mobileTable,
      })}
    >
      {isEmpty(displayedData) ? (
        <p className="paginated-table__empty-state value">Nothing to show</p>
      ) : (
        <table>
          <thead>
            <tr>
              {properties.map((property, index) => (
                <th key={`$tr ${index} ${property.key}`}>
                  {property.description ? (
                    <Info
                      position={
                        properties.indexOf(property) === properties.length - 1
                          ? "center"
                          : "left"
                      }
                      title={property.label}
                      content={<p>{property.description}</p>}
                    >
                      <p>{property.label}</p>
                    </Info>
                  ) : (
                    property.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedData.map((item, index) => (
              <TableRow
                key={`${JSON.stringify(item)} tr ${index}`}
                item={item}
                properties={properties}
              />
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        callback={paginationCallback}
        maxPages={maxPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        infinite={isInfinite}
        queryPage={queryPage}
      />
    </div>
  );
}

PaginatedTable.propTypes = propTypes;
PaginatedTable.defaultProps = defaultProps;

export default PaginatedTable;
