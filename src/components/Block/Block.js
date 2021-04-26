import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";

import { Grid, ResponsiveContext } from "grommet";

import { isSizeDesktop, isSizeMobile, numericSortByAttribute } from "@Utils";
import { fetchLeaves } from "@Services";

import { Details, Header, FirstClassData, LeavesTable, Validators } from "./";

const propTypes = {
  block: PropTypes.object.isRequired,
};

function Block({ block }) {
  const { _id, height, root, votes, numericFcdKeys, numericFcdValues, chainAddress } = block;
  const [isLoading, setIsLoading] = useState(true);
  const [leaves, setLeaves] = useState();

  const size = useContext(ResponsiveContext);
  const isDesktop = isSizeDesktop(size);
  const isMobile = isSizeMobile(size);

  const handleLeavesLoades = (leaves) => {
    setIsLoading(false);
    setLeaves(leaves);
  }

  useEffect(() => {
    const handleLeaves = async () => {
      fetchLeaves(handleLeavesLoades, _id);
    };

    handleLeaves();
  }, [_id]);

  return (
    <Grid
      fill
      gap="medium"
      style={{ maxWidth: "1366px" }}
      rows={["36px", "max-content", "auto"]}
      className="block"
    >
      <Header
        height={height}
        root={root}
        isMobile={isMobile}
        isDesktop={isDesktop}
      />
      <Grid
        gap="medium"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(296px, 1fr))" }}
        fill="horizontal"
      >
        <Grid
          align="center"
          style={{ gridAutoFlow: "row", gridTemplateRows: "repeat(2, 1fr)" }}
          gap="medium"
          fill="horizontal"
        >
          <Details block={block} />
          <Validators votes={votes} />
        </Grid>
        <FirstClassData
          keys={numericFcdKeys}
          blockHeight={height}
          values={numericFcdValues}
        />
        <LeavesTable
          blockHeight={height}
          chainAddress={chainAddress}
          leaves={numericSortByAttribute(leaves)}
          isLoading={isLoading}
        />
      </Grid>
    </Grid>
  );
}

Block.propTypes = propTypes;

export default Block;
