import React, { useEffect } from "react";

import { Grid, Text, Heading, Card, CardHeader, CardBody } from "grommet";

import { truncate, keyToByte32 } from "@Formatters";
import { KeyValuePairs, LoadingState } from "@Ui";

import { fetchProof } from "@Services";

import {
  usePrices,
  proofRequested,
  proofRequestFulfilled,
  proofRequestRejected,
} from "@Store";

function FirstClassData() {
  const {
    state: {
      proof: { block, isLoading },
    },
    dispatch,
  } = usePrices();

  useEffect(() => {
    if (!isLoading) {
      dispatch(proofRequested());
      fetchProof(dispatch, proofRequestFulfilled, proofRequestRejected, []);
    }

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <Grid justify="center" fill rows={["34px", "auto"]} gap="large">
      <Heading>First Class Data</Heading>
      {isLoading || !block ? (
        <LoadingState />
      ) : (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <Grid
            justifyContent="center"
            fill="horizontal"
            style={{
              alignSelf: "center",
              gridTemplateColumns: "repeat(auto-fit, 252px)",
              gridGap: "24px 12px",
            }}
          >
            {block.numericFcdKeys.map((key, index) => (
              <Card key={key} style={{ minHeight: "252px" }}>
                <CardHeader
                  pad="small"
                  justify="center"
                  background="light-2"
                  border={{ size: "xsmall", side: "bottom", color: "light-3" }}
                >
                  <Text textAlign="center" weight="bold">
                    {key}
                  </Text>
                </CardHeader>
                <CardBody direction="column" pad="small" background="white">
                  <KeyValuePairs
                    flex="shrink"
                    pad={{ bottom: "xsmall" }}
                    border={{
                      size: "xsmall",
                      style: "dashed",
                      side: "bottom",
                      color: "control",
                    }}
                    items={[
                      {
                        key: "key",
                        value: key,
                      },
                      {
                        key: "value",
                        value: block.numericFcdValues[index],
                      },
                    ]}
                  />
                  <KeyValuePairs
                    flex="shrink"
                    pad={{ top: "xsmall" }}
                    items={[
                      {
                        clipboardable: true,
                        key: "block height",
                        value: block.height,
                      },
                      {
                        clipboardable: true,
                        clipboardableValue: keyToByte32(key),
                        key: "key [bytes]",
                        value: truncate(keyToByte32(key)),
                      },
                    ]}
                  />
                </CardBody>
              </Card>
            ))}
          </Grid>
        </div>
      )}
    </Grid>
  );
}

export default FirstClassData;