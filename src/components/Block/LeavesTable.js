/* eslint-disable react/display-name */
import React from "react";
import PropTypes from "prop-types";

import { Card, CardHeader, Text } from "grommet";

import { PaginatedTable, LoadingState } from "@Ui";
import { valueToString } from "@Formatters";

import { Leaf } from "./";

import "./leavesTable.scss";

const propTypes = {
  leaves: PropTypes.array.isRequired,
  blockHeight: PropTypes.number.isRequired,
  chainAddress: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

function LeavesTable({ leaves, blockHeight, chainAddress, isLoading }) {
  const properties = [
    {
      property: "key",
      primary: true,
      render: (datum) => (
        <Leaf
          blockHeight={blockHeight}
          chainAddress={chainAddress}
          leaf={datum}
        />
      ),
    },
    { property: "value", render: ({ value }) => valueToString(value) },
  ];

  return (
    <Card style={{ width: "100%" }} justify="center" align="center">
      <CardHeader
        pad="small"
        justify="center"
        border={{ size: "xsmall", side: "bottom", color: "light-3" }}
      >
        <Text textAlign="center" weight="bold">
          Layer 2 Data
        </Text>
      </CardHeader>
      <div className="leaves-table__body">
        {isLoading ? (
          <LoadingState />
        ) : (
          <PaginatedTable
            dataPerPage={10}
            pageBreak={5}
            data={leaves}
            properties={properties}
            fill="horizontal"
            searchTerm="key"
            searchable
          />
        )}
      </div>
    </Card>
  );
}

LeavesTable.propTypes = propTypes;

export default LeavesTable;
