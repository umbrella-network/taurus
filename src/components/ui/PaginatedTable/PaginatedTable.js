import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { truncate } from "@Formatters";
import { Clipboardable, Info } from "@Ui";

import { slice, isEmpty } from "ramda";

import Pagination from "./Pagination";

import "./paginatedTable.scss";

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
  data: PropTypes.array,
  properties,
  dataPerPage: PropTypes.number,
};

const defaultProps = {
  data: [],
  dataPerPage: 10,
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

        const displayedValue = property.urlKey ? (
          <a
            href={item[property.urlKey]}
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

function PaginatedTable({ properties, data, dataPerPage }) {
  const [displayedData, setDisplayedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const items = data;

  const dataLength = items.length;
  const maxPages = Math.ceil(dataLength / dataPerPage) || 0;

  const tableRef = useRef();

  useEffect(() => {
    const dataRangeStart = (currentPage - 1) * dataPerPage;
    const dataRangeEnd = currentPage * dataPerPage;

    const pageData = slice(dataRangeStart, dataRangeEnd, items);
    setDisplayedData(pageData);
  }, [currentPage, items, dataPerPage]);

  const paginationCallback = () => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={tableRef} className="paginated-table">
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
      <Pagination
        callback={paginationCallback}
        maxPages={maxPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

PaginatedTable.propTypes = propTypes;
PaginatedTable.defaultProps = defaultProps;

TableRow.propTypes = tableRowPropTypes;

export default PaginatedTable;
