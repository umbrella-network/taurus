import React from "react";
import PropTypes from "prop-types";

import { Box, Text, Anchor } from "grommet";

import { truncate } from "@Formatters";
import { useChainAddress } from "@Store";
import { Clipboardable } from "@Ui";

const propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

function ContractButton() {
  const {
    state: { address },
  } = useChainAddress();

  return (
    <Box direction="row" align="center" justify="end" gap="small">
      <Clipboardable size="17px" text={address}>
        <Text size="xsmall" textAlign="end" weight={300} color="text-weak">
          Contract - [
          <Anchor
            size="xsmall"
            target="_blank"
            rel="noopener noreferrer"
            href={`${process.env.REACT_APP_SCAN_URL}/${
              `${address}#readContract` ?? ""
            }`}
            label={address ? truncate(address) : "Loading..."}
          />
          ]
        </Text>
      </Clipboardable>
    </Box>
  );
}

ContractButton.propTypes = propTypes;

export default ContractButton;
