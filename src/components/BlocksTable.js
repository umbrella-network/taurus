/* eslint-disable react/display-name */
import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import { Button, DataTable, Text, Box, ResponsiveContext } from "grommet";
import { LinkPrevious, Next, Previous } from "grommet-icons";

import { capitalize } from "lodash";

import { Block } from "@Components";
import { truncate, valueToToken, formatTimestampAge } from "@Formatters";
import { fetchBlock, fetchBlocks } from "@Services";
import {
  useBlocks,
  blockRequested,
  blockRequestFulfilled,
  blockRequestRejected,
  blocksRequested,
  blocksRequestFulfilled,
  blocksRequestRejected,
} from "@Store";
import { ScanUrl } from "@Ui";
import { isSizeMobile } from "@Utils";

function BlocksTable() {
  const { id } = useParams();
  const {
    state: { blocks, isLoading, currentBlock },
    dispatch,
  } = useBlocks();

  const size = useContext(ResponsiveContext);
  const isMobile = isSizeMobile(size);

  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(0);
  const isFirstPage = currentPage === 0;

  const isDisplayingBlock = Boolean(currentBlock?.block) || id;
  const displayLoading = isLoading || (id && !currentBlock?.block);

  useEffect(() => {
    dispatch(blocksRequested());
    fetchBlocks(
      dispatch,
      blocksRequestFulfilled,
      blocksRequestRejected,
      currentPage
    );
  }, [currentPage, dispatch]);

  useEffect(() => {
    if (id && !currentBlock?.block && !currentBlock.isLoading) {
      dispatch(blockRequested());
      fetchBlock(id, dispatch, blockRequestFulfilled, blockRequestRejected);
    } else if (!id && isDisplayingBlock) {
      dispatch(blockRequestRejected());
    }
  }, [id, currentBlock, dispatch, isDisplayingBlock]);

  const handleView = (block) => {
    dispatch(blockRequestFulfilled(block));
    history.push(`/blocks/${block._id}`);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const blocksProperties = [
    {
      property: "height",
      size: "small",
      primary: true,
    },
    { property: "anchor" },
    {
      property: "timestamp",
      header: <Text weight="bold">Age</Text>,
      render: (datum) => formatTimestampAge(datum.timestamp),
    },
    { property: "root", render: (datum) => truncate(datum.root) },
    {
      property: "minter",
      render: (datum) => (
        <ScanUrl address={datum.minter} text={truncate(datum.minter)} />
      ),
    },
    {
      property: "staked",
      render: (datum) => valueToToken({ value: datum.staked, truncate: true }),
    },
    {
      property: "power",
      render: (datum) => valueToToken({ value: datum.power, truncate: true }),
    },
    {
      property: "",
      render: (datum) => (
        <Button secondary label="View" onClick={() => handleView(datum)} />
      ),
    },
  ];

  const columns = blocksProperties.map((data) => {
    return {
      ...(data.property && {
        key: data.property,
        align: "center",
        header: <Text weight="bold">{capitalize(data.property)}</Text>,
      }),
      ...data,
    };
  });

  if (displayLoading) {
    return (
      <Box pad="large" gap="large">
        <Text weight="bold" size="xlarge">
          Loading...
        </Text>
      </Box>
    );
  }

  return (
    <Box flex="grow" fill justify="center">
      {isDisplayingBlock ? (
        <Block block={currentBlock.block} />
      ) : (
        <Box gap="medium">
          <Box
            style={{
              overflowX: "auto",
            }}
            background="white"
            elevation="medium"
            fill="horizontal"
          >
            <DataTable
              fill="horizontal"
              background={{
                body: ["white", "light-2"],
              }}
              style={{ padding: "24px" }}
              border={{ body: "bottom" }}
              columns={columns}
              data={blocks ?? []}
            />
          </Box>

          <Box
            align="center"
            style={
              isMobile
                ? {
                    width: "100vw",
                    bottom: 0,
                    padding: "12px",
                    margin: 0,
                  }
                : {}
            }
          >
            <Box
              direction="row"
              fill="horizontal"
              margin={{ horizontal: "medium" }}
              justify="between"
            >
              <Box>
                <Button
                  disabled={
                    Boolean(process.env.REACT_APP_SHOULD_FALLBACK === "true") ||
                    isFirstPage
                  }
                  plain
                  label={
                    <Text size={isMobile ? "xsmall" : "medium"}>
                      First page
                    </Text>
                  }
                  icon={<LinkPrevious />}
                  onClick={() => setCurrentPage(0)}
                />
              </Box>

              <Box direction="row" justify="center" gap="medium">
                <Button
                  disabled={
                    Boolean(process.env.REACT_APP_SHOULD_FALLBACK === "true") ||
                    isFirstPage
                  }
                  plain
                  icon={<Previous />}
                  onClick={previousPage}
                />
                <Text size={isMobile ? "small" : "large"} weight="bold">
                  {`Page ${currentPage + 1}`}
                </Text>
                <Button
                  disabled={Boolean(
                    process.env.REACT_APP_SHOULD_FALLBACK === "true"
                  )}
                  plain
                  icon={<Next />}
                  onClick={nextPage}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default BlocksTable;
