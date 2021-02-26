import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Box, DataTable, Text } from "grommet";

import { slice } from "ramda";
import { capitalize } from "lodash";

import Pagination from "./Pagination";

const propTypes = {
  title: PropTypes.string,
  properties: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  dataPerPage: PropTypes.number.isRequired,
  tableConfig: PropTypes.object,
  pageBreak: PropTypes.number,
};

const defaultProps = {
  title: undefined,
  tableConfig: {},
  pageBreak: 10,
};

function PaginatedTable({
  title,
  properties,
  data,
  dataPerPage,
  tableConfig,
  pageBreak,
  ...rest
}) {
  const [displayedData, setDisplayedData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const dataLength = data.length;
  const maxPages = Math.ceil(dataLength / dataPerPage) || 0;

  useEffect(() => {
    const dataRangeStart = (currentPage - 1) * dataPerPage;
    const dataRangeEnd = currentPage * dataPerPage;

    const pageData = slice(dataRangeStart, dataRangeEnd, data);
    setDisplayedData(pageData);
  }, [currentPage, data, dataPerPage]);

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
    <Box gap="medium" flex="grow" {...rest}>
      {title && (
        <Text weight="bold" size="xlarge">
          {title}
        </Text>
      )}
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
    </Box>
  );
}

PaginatedTable.propTypes = propTypes;
PaginatedTable.defaultProps = defaultProps;

export default PaginatedTable;
