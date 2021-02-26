import React from "react";
import PropTypes from "prop-types";

import { Box, Footer } from "grommet";

import { UsefulLinks, FindUs, MobileFooterContent } from "./";

const propTypes = {
  mobile: PropTypes.bool,
};

const defaultProps = {
  mobile: false,
};

function FooterContent({ mobile }) {
  return (
    <>
      {mobile ? (
        <MobileFooterContent />
      ) : (
        <Footer
          border={{
            color: "brand",
            size: "1px",
            style: "solid",
            side: "top",
          }}
          direction="column"
          alignContent="center"
          pad={{ horizontal: "large", vertical: "small" }}
        >
          <Box
            direction="row"
            alignSelf="center"
            fill="horizontal"
            width={{ max: "1366px" }}
            justify="end"
            gap="xlarge"
          >
            <Box gap="xlarge" direction="row">
              <UsefulLinks />
              <FindUs />
            </Box>
          </Box>
        </Footer>
      )}
    </>
  );
}

FooterContent.propTypes = propTypes;
FooterContent.defaultProps = defaultProps;

export default FooterContent;
