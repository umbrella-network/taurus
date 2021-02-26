import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { Box, Button, Text } from "grommet";

import { Previous } from "grommet-icons";

import { truncate } from "@Formatters";
import { Clipboardable } from "@Ui";

const propTypes = {
  root: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isMobile: PropTypes.bool.isRequired,
  isDesktop: PropTypes.bool.isRequired,
};

function Header({ root, height, isMobile, isDesktop }) {
  const history = useHistory();

  const handleBack = () => {
    history.push("/blocks");
  };

  return (
    <Box direction="row" align="center">
      <Button
        style={{ paddingLeft: "0px" }}
        a11yTitle="Back"
        onClick={handleBack}
        icon={<Previous />}
      />
      <Box direction="row" gap="small" justify="between" fill="horizontal">
        <Box direction={isMobile ? "column" : "row"} gap="small" align="start">
          <Text weight={400} size="large">
            Block
          </Text>
          <Text size="large" weight={200}>
            {height}
          </Text>
        </Box>
        <Box direction={isMobile ? "column" : "row"} gap="small" align="start">
          <Text weight={400} size="large">
            State Root
          </Text>
          <Clipboardable size="small" text={root}>
            <Text weight={200} size="large" wordBreak="break-word">
              {isDesktop ? root : truncate(root)}
            </Text>
          </Clipboardable>
        </Box>
      </Box>
    </Box>
  );
}

Header.propTypes = propTypes;

export default Header;
