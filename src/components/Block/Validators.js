import React from "react";
import PropTypes from "prop-types";

import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from "grommet";

import { truncate, valueToToken } from "@Formatters";
import { ScanUrl, Clipboardable } from "@Ui";

const propTypes = {
  votes: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

function Validators({ votes }) {
  return (
    <Card
      align="center"
      width="medium"
      justify="center"
      fill
      style={{
        minHeight: "280px",
      }}
    >
      <CardHeader
        pad="small"
        justify="center"
        border={{ size: "xsmall", side: "bottom", color: "light-3" }}
      >
        <Text textAlign="center" weight="bold">
          Validators
        </Text>
      </CardHeader>
      <CardBody
        background="white"
        fill="horizontal"
        pad="medium"
        overflow={{ vertical: "scroll" }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell scope="col" border="bottom">
                Address
              </TableCell>
              <TableCell scope="col" border="bottom">
                Power
              </TableCell>
            </TableRow>
          </TableHeader>
          {votes ? (
            <TableBody>
              {Object.keys(votes)?.map((address) => (
                <TableRow key={address} border="bottom">
                  <TableCell scope="row">
                    <ScanUrl
                      forceBsc={true}
                      address={address}
                      text={truncate(address)}
                    />
                  </TableCell>
                  <TableCell border="left">
                    <Clipboardable size="small" text={votes[address]}>
                      {valueToToken({ value: votes[address], truncate: true })}
                    </Clipboardable>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : null}
        </Table>
      </CardBody>
    </Card>
  );
}

Validators.propTypes = propTypes;

export default Validators;
