import React, { useEffect, useState } from "react";

import { Grid, Text, Heading, Card, CardHeader, CardBody } from "grommet";

import { truncate, keyToByte32 } from "@Formatters";
import { KeyValuePairs, LoadingState, SearchBar } from "@Ui";

import { fetchProof } from "@Services";
import { isEmpty } from "ramda";

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

  const [isSearching, setIsSearching] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  const displayedItems =
    isEmpty(filteredItems) && block ? block.numericFcdKeys : filteredItems;

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
        <Grid fill rows={["min-content", "auto"]} gap="large">
          <SearchBar
            isSearching={isSearching}
            open={() => setIsSearching(true)}
            close={() => setIsSearching(false)}
            items={block.numericFcdKeys}
            filterCallback={setFilteredItems}
          />
          <Grid
            justifyContent="center"
            fill="horizontal"
            style={{
              alignSelf: "start",
              gridTemplateColumns: "repeat(auto-fit, 272px)",
              gridGap: "24px 12px",
            }}
          >
            {displayedItems.map((key) => (
              <Card key={key} style={{ minHeight: "272px" }}>
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
                        value:
                          block.numericFcdValues[
                            block.numericFcdKeys.indexOf(key)
                          ],
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
        </Grid>
      )}
    </Grid>
  );
}

export default FirstClassData;
