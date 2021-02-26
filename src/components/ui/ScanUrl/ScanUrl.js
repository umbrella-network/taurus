import React from "react";
import PropTypes from "prop-types";

import { Anchor } from "grommet";

const propTypes = {
  address: PropTypes.string,
  text: PropTypes.string,
};

const defaultProps = {
  address: undefined,
  text: undefined,
};

function ScanUrl({ address, text, ...rest }) {
  return (
    <Anchor
      href={`${process.env.REACT_APP_SCAN_URL}/${address}`}
      rel="noopener noreferrer"
      target="_blank"
      {...rest}
    >
      {text ?? address}
    </Anchor>
  );
}

ScanUrl.propTypes = propTypes;
ScanUrl.defaultProps = defaultProps;

export default ScanUrl;
