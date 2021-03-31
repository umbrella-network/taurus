import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import { Box, Text, Anchor } from "grommet";

import { useBlocks, infoRequested, infoFulfilled, infoRejected } from "@Store";

import { fetchInfo } from "@Services";

import { truncate } from "@Formatters";
import { Clipboardable } from "@Ui";

const propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

function ContractButton() {
  const {
    state: { info },
    dispatch,
  } = useBlocks();

  const { isLoading, error } = info;

  const fetchInfoCallback = useCallback(() => {
    dispatch(infoRequested());

    fetchInfo(dispatch, infoFulfilled, infoRejected);
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && !error) {
      fetchInfoCallback();
    }
  }, [isLoading, error, fetchInfoCallback]);

  const label = info.chainContractAddress
    ? truncate(info.chainContractAddress)
    : "Loading...";

  return (
    <Box direction="row" align="center" justify="end" gap="small">
      <Clipboardable
        size="17px"
        disabled={!info.chainContractAddress}
        text={info.chainContractAddress ?? ""}
      >
        <Text size="xsmall" textAlign="end" weight={300} color="text-weak">
          Contract - [
          <Anchor
            size="xsmall"
            disabled={!info.chainContractAddress}
            target="_blank"
            rel="noopener noreferrer"
            href={`${process.env.REACT_APP_SCAN_URL}/${info.chainContractAddress}#readContract`}
            label={label}
          />
          ]
        </Text>
      </Clipboardable>
    </Box>
  );
}

ContractButton.propTypes = propTypes;

export default ContractButton;
