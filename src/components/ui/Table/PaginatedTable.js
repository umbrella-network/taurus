import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { truncate } from "@Formatters";
import { Clipboardable, Info } from "@Ui";

import { slice, isEmpty } from "ramda";

import { properties } from "./propertiesPropType";

import Pagination from "./Pagination";

import "./paginatedTable.scss";

const propTypes = {
  data: PropTypes.array,
  properties,
  dataPerPage: PropTypes.number,
  pageChangeCallback: PropTypes.func,
};

const defaultProps = {
  data: [],
  dataPerPage: 10,
  pageChangeCallback: undefined,
};

const tableRowPropTypes = {
  item: PropTypes.object.isRequired,
  properties,
};

function TableRow({ item, properties }) {
  return (
    <tr>
      {properties.map(({ key, label, ...property }) => {
        const hasCallback = Boolean(property.valueCallback);
        const value =
          item[key] ?? (hasCallback && property.valueCallback(item));

        if (!value || isEmpty(value)) {
          return (
            <td key={`${label} td ${JSON.stringify(item)}`} className="value">
              <span>{label}</span>
              N/A
            </td>
          );
        }

        const formattedValue = property.truncate ? truncate(value, 4) : value;
        const hasUrl = property.urlKey || property.urlPrefix;
        const url = item[property.urlKey] ?? `${property.urlPrefix}/${value}`;

        const displayedValue = hasUrl ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {formattedValue}
          </a>
        ) : (
          <p title={value}>{formattedValue}</p>
        );

        return (
          <td
            key={`${label} td ${JSON.stringify(item)}`}
            className={classnames("value", {
              "value--primary": property.primary,
              "value--highlight": property.highlight,
            })}
          >
            <span>{label}</span>
            {property.clipboardable && displayedValue ? (
              <Clipboardable text={value}>{displayedValue}</Clipboardable>
            ) : (
              displayedValue
            )}
          </td>
        );
      })}
    </tr>
  );
}

function PaginatedTable({ properties, data, dataPerPage, pageChangeCallback }) {
  const [segmentedData, setSegmentedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const isInfinite = Boolean(pageChangeCallback);

  const items = data;

  const dataLength = items.length;
  const maxPages = Math.ceil(dataLength / dataPerPage) || 0;

  const tableRef = useRef();

  useEffect(() => {
    const dataRangeStart = (currentPage - 1) * dataPerPage;
    const dataRangeEnd = currentPage * dataPerPage;

    const pageData = slice(dataRangeStart, dataRangeEnd, items);
    setSegmentedData(pageData);
  }, [currentPage, items, dataPerPage]);

  const paginationCallback = (currentPage) => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }

    isInfinite && pageChangeCallback(currentPage);
  };

  useEffect(() => {
    if (!isInfinite) {
      setCurrentPage(1);
    }
  }, [data, isInfinite]);

  const displayedData = isInfinite ? data : segmentedData;

  return (
    <div ref={tableRef} className="paginated-table">
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
      />
    </div>
  );
}

PaginatedTable.propTypes = propTypes;
PaginatedTable.defaultProps = defaultProps;

TableRow.propTypes = tableRowPropTypes;

export default PaginatedTable;
