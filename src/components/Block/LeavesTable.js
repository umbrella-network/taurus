/* eslint-disable react/display-name */
import React from "react";
import PropTypes from "prop-types";

import { Card, CardHeader, CardBody, Text } from "grommet";

import { PaginatedTable } from "@Ui";

import { valueToString } from "@Formatters";

import { Leaf } from "./";

const propTypes = {
  leaves: PropTypes.array.isRequired,
  blockHeight: PropTypes.number.isRequired,
};

function LeavesTable({ leaves, blockHeight }) {
  const properties = [
    {
      property: "key",
      primary: true,
      render: (datum) => <Leaf blockHeight={blockHeight} leaf={datum} />,
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
      <CardBody
        pad={{ vertical: "small" }}
        background="white"
        fill="horizontal"
        style={{ minHeight: "675px" }}
      >
        <PaginatedTable
          dataPerPage={10}
          pageBreak={5}
          data={leaves}
          properties={properties}
          fill="horizontal"
        />
      </CardBody>
    </Card>
  );
}

LeavesTable.propTypes = propTypes;

export default LeavesTable;
