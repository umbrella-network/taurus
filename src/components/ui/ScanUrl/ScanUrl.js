import React from "react";
import PropTypes from "prop-types";

import { Anchor } from "grommet";

const propTypes = {
  address: PropTypes.string,
  text: PropTypes.string,
  forceBsc: PropTypes.bool,
};

const defaultProps = {
  address: undefined,
  text: undefined,
  forceScan: undefined,
};

const parseScanUrl = (scanUrl, scanDomain) => {
  const isDev = process.env.REACT_APP_BLOCKS_API.includes("dev");

  return isDev ? "https://testnet.bscscan.com/address" : "https://bscscan.com/address";
};

function ScanUrl({ address, text, forceBsc, ...rest }) {
  const scanUrl = !forceBsc ? process.env.REACT_APP_SCAN_URL : parseScanUrl();

  return (
    <Anchor
      href={`${scanUrl}/${address}`}
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
