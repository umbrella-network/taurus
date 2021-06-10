import React, { useEffect, useState } from "react";

import { Grid, Text, Heading, Card, CardHeader, CardBody } from "grommet";

import { truncate, keyToHex } from "@Formatters";
import { KeyValuePairs, LoadingState, SearchBar } from "@Ui";

import { formatTimestamp } from "@Utils";

import { fetchFCD } from "@Services";
import { isEmpty } from "ramda";

import {
  usePrices,
  firstClassDataRequested,
  firstClassDataFulfilled,
  firstClassDataRejected,
} from "@Store";

function FirstClassData() {
  const {
    state: {
      firstClassData: { list, isLoading },
    },
    dispatch,
  } = usePrices();

  const [isSearching, setIsSearching] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  const displayedItems = isEmpty(filteredItems) && list ? list : filteredItems;

  useEffect(() => {
    if (!isLoading) {
      dispatch(firstClassDataRequested());
      fetchFCD(dispatch, firstClassDataFulfilled, firstClassDataRejected, []);
    }

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <Grid justify="center" fill rows={["34px", "auto"]} gap="large">
      <Heading>First Class Data</Heading>
      {isLoading || isEmpty(displayedItems) ? (
        <LoadingState />
      ) : (
        <Grid fill rows={["min-content", "auto"]} gap="large">
          <SearchBar
            isSearching={isSearching}
            open={() => setIsSearching(true)}
            close={() => setIsSearching(false)}
            items={list}
            filterCallback={setFilteredItems}
            searchTerm="_id"
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
            {displayedItems.map(({ _id: key, value, dataTimestamp }) => (
              <Card key={key} style={{ minHeight: "172px" }}>
                <CardHeader
                  pad="small"
                  justify="center"
                  background="light-2"
                  border={{
                    size: "xsmall",
                    side: "bottom",
                    color: "light-3",
                  }}
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
                        value: value,
                      },
                      {
                        key: "",
                        value: formatTimestamp(dataTimestamp),
                      },
                    ]}
                  />
                  <KeyValuePairs
                    flex="shrink"
                    pad={{ top: "xsmall" }}
                    items={[
                      {
                        clipboardable: true,
                        clipboardableValue: keyToHex(key),
                        key: "key [bytes]",
                        value: truncate(keyToHex(key)),
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
