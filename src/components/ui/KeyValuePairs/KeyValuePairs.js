import React from "react";
import PropTypes from "prop-types";

import { TableRow } from "components/ui";

import { tableProperties as properties } from "utils/types";

import "./keyValuePairs.scss";

const propTypes = {
  item: PropTypes.object.isRequired,
  properties,
};

function KeyValuePairs({ item, properties }) {
  return (
    <div className="key-value-pairs">
      <TableRow item={item} properties={properties} paired />
    </div>
  );
}

KeyValuePairs.propTypes = propTypes;

export default KeyValuePairs;
