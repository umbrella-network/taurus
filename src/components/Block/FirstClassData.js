import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ethers } from "ethers";

import { Card, CardBody, CardHeader, Grid, Text } from "grommet";

import { Alert } from "grommet-icons";

import { isEmpty } from "ramda";

import { truncate, keyToByte32 } from "@Formatters";
import { fetchFCDValues } from "@Services";
import { KeyValuePairs } from "@Ui";

const propTypes = {
  keys: PropTypes.array,
  blockHeight: PropTypes.number.isRequired,
};

const defaultValues = {
  keys: [],
};

function FirstClassData({ keys, blockHeight }) {
  const fcdKeys = Object.values(keys);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [values, setValues] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchFCDValues(setValues, setError, blockHeight, keys);
  }, [blockHeight, keys]);

  useEffect(() => {
    if (!isEmpty(values) || error) {
      setIsLoading(false);
    }
  }, [values, error]);

  const status = () => {
    if (error) {
      return (
        <Text weight={200}>
          Error <Alert color="control" size="small" />
        </Text>
      );
    } else if (isLoading) {
      return <Text weight={200}>Loading...</Text>;
    }
  };

  return (
    <Card height={{ min: "280px", max: "748px" }} fill>
      <CardHeader
        pad="small"
        justify="center"
        border={{ size: "xsmall", side: "bottom", color: "light-3" }}
      >
        <Text textAlign="center" weight="bold">
          First Class Data
        </Text>
      </CardHeader>
      <CardBody
        overflow={!isEmpty(fcdKeys) ? { vertical: "scroll" } : {}}
        pad="medium"
        background="white"
      >
        {isEmpty(fcdKeys) ? (
          <Text textAlign="center">No data to show.</Text>
        ) : (
          <Grid
            style={{
              gridAutoFlow: "row",
              gridTemplateRows: "repeat(auto-fit, 1fr)",
            }}
          >
            {fcdKeys.map((key, index) => (
              <KeyValuePairs
                flex="shrink"
                pad={{ bottom: "xsmall" }}
                key={key}
                border={
                  index < fcdKeys.length - 1
                    ? {
                        size: "xsmall",
                        style: "dashed",
                        side: "bottom",
                        color: "control",
                      }
                    : false
                }
                items={[
                  {
                    key: "key",
                    value: key,
                  },
                  {
                    key: "value",
                    value:
                      values[index] &&
                      ethers.utils.formatEther(values[index].toString()),
                    childValue: status(),
                  },
                  {
                    clipboardable: true,
                    clipboardableValue: keyToByte32(key),
                    key: "key [bytes]",
                    value: truncate(keyToByte32(key)),
                  },
                ]}
              />
            ))}
          </Grid>
        )}
      </CardBody>
    </Card>
  );
}

FirstClassData.propTypes = propTypes;
FirstClassData.defaultValues = defaultValues;

export default FirstClassData;
