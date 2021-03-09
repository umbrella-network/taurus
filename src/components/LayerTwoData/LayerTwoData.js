import React, { useEffect, useState } from "react";

import { Grid, Heading } from "grommet";

import { LoadingState, SearchBar } from "@Ui";
import Pagination from "@Ui/PaginatedTable/Pagination";

import { isEmpty } from "ramda";

import { fetchProof, fetchLatestLeaves } from "@Services";

import {
  usePrices,
  proofRequested,
  proofRequestFulfilled,
  proofRequestRejected,
  leavesRequested,
  leavesRequestFulfilled,
  leavesRequestRejected,
} from "@Store";

import Proof from "./Proof";

import "./layerTwoData.scss";

function LayerTwoData() {
  const {
    state: { leaves, proof },
    dispatch,
  } = usePrices();

  const [filteredItems, setFilteredItems] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const { block } = proof;
  const isLoading = proof.isLoading || leaves.isLoading;

  const itemsPerPage = 20;
  const { list } = leaves;
  const rangeStart = itemsPerPage * (currentPage - 1);
  const rangeEnd = itemsPerPage * currentPage;

  useEffect(() => {
    if (block) {
      dispatch(leavesRequested());
      fetchLatestLeaves(
        dispatch,
        leavesRequestFulfilled,
        leavesRequestRejected
      );
    }
  }, [block, dispatch]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(proofRequested());
      fetchProof(dispatch, proofRequestFulfilled, proofRequestRejected, []);
    }

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  useEffect(() => {
    return () => {
      dispatch(proofRequestRejected());
    };
  }, [dispatch]);

  const displayedItems = isEmpty(filteredItems) && list ? list : filteredItems;

  const filterCallback = (items) => {
    setCurrentPage(1);
    setFilteredItems(items);
  };

  return (
    <Grid justify="center" fill rows={["34px", "auto"]} gap="large">
      <Heading>Layer 2 Data</Heading>
      {isLoading || isEmpty(list) ? (
        <LoadingState />
      ) : (
        <Grid
          fill
          style={{
            justifyItems: "center",
          }}
          rows={["auto", "auto"]}
          gap="large"
        >
          <SearchBar
            items={list}
            filterCallback={filterCallback}
            searchTerm={"key"}
          />
          <Grid
            className="layer-two-data-container"
            justifyContent="center"
            fill="horizontal"
            style={{
              alignSelf: "center",
              gridTemplateColumns: "repeat(auto-fit, 252px)",
              gridGap: "24px 12px",
            }}
          >
            {displayedItems
              .slice(rangeStart, rangeEnd)
              .map(({ proof, key, value }) => (
                <Proof
                  key={key}
                  proof={proof}
                  leaveKey={key}
                  value={value}
                  block={block}
                />
              ))}
          </Grid>
          <Grid style={{ maxWidth: "500px", width: "100%" }}>
            <Pagination
              maxPages={Math.ceil(displayedItems.length / itemsPerPage)}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageBreak={5}
            />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

export default LayerTwoData;
