import React from "react";
import PropTypes from "prop-types";

import { ChainSelect } from "components";

import "./heading.scss";

const propTypes = {
  primary: PropTypes.bool,
};

const defaultProps = {
  primary: false,
};

function Heading({ primary, children }) {
  return (
    <h1 className="heading">
      {children}
      {primary && <ChainSelect />}
    </h1>
  );
}

Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;

export default Heading;
