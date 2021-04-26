import React from "react";
import PropTypes from "prop-types";

import { Card, CardBody, CardHeader, Grid, Text } from "grommet";

import { isEmpty } from "ramda";

import { truncate, keyToByte32 } from "@Formatters";
import { KeyValuePairs } from "@Ui";

const propTypes = {
  keys: PropTypes.array,
  blockHeight: PropTypes.number.isRequired,
  values: PropTypes.array,
};

const defaultValues = {
  keys: [],
  values: [],
};

function FirstClassData({ keys, values }) {
  const fcdKeys = Object.values(keys);

  return (
    <Card height={{ min: "280px", max: "760px" }} fill>
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
                    value: values[index],
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
