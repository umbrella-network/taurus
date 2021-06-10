import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";

import { Grid, ResponsiveContext } from "grommet";

import { isSizeDesktop, isSizeMobile, numericSortByAttribute } from "@Utils";
import { fetchLeaves } from "@Services";

import { Details, Header, LeavesTable, Validators } from "./";

const propTypes = {
  block: PropTypes.object.isRequired,
};

function Block({ block }) {
  const { blockId, root, votes, chainAddress, dataTimestamp } = block;

  const [isLoading, setIsLoading] = useState(true);
  const [leaves, setLeaves] = useState();

  const size = useContext(ResponsiveContext);
  const isDesktop = isSizeDesktop(size);
  const isMobile = isSizeMobile(size);

  const handleLeavesLoades = (leaves) => {
    setIsLoading(false);
    setLeaves(leaves);
  };

  useEffect(() => {
    const handleLeaves = async () => {
      fetchLeaves(handleLeavesLoades, blockId);
    };

    handleLeaves();
  }, [blockId]);

  return (
    <Grid
      fill
      gap="medium"
      style={{ maxWidth: "1366px" }}
      rows={["auto", "max-content", "auto"]}
      className="block"
    >
      <Header
        height={blockId}
        root={root}
        isMobile={isMobile}
        isDesktop={isDesktop}
      />
      <Grid
        gap="medium"
        style={{
          gridTemplateColumns: isMobile
            ? "1fr"
            : "repeat(auto-fit, minmax(296px, 1fr))",
        }}
        fill="horizontal"
      >
        <Grid
          align="center"
          style={{ gridAutoFlow: "row", gridTemplateRows: "repeat(2, 1fr)" }}
          gap="medium"
          fill="horizontal"
        >
          <Details block={block} leaves={leaves} isLoading={isLoading} />
          <Validators votes={votes} />
        </Grid>

        <LeavesTable
          blockId={blockId}
          chainAddress={chainAddress}
          timestamp={dataTimestamp}
          leaves={numericSortByAttribute(leaves)}
          isLoading={isLoading}
        />
      </Grid>
    </Grid>
  );
}

Block.propTypes = propTypes;

export default Block;
