import React from "react";

import { Box } from "grommet";

import { UsefulLinks, FindUs } from "./";

function MobileFooterContent() {
  return (
    <Box
      fill="vertical"
      align="center"
      as="footer"
      alignContent="center"
      justify="end"
      pad={{ horizontal: "medium", vertical: "small" }}
    >
      <Box gap="medium">
        <UsefulLinks />
        <FindUs />
      </Box>
    </Box>
  );
}

export default MobileFooterContent;
