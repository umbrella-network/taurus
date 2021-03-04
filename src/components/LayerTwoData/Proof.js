import React from "react";
import PropTypes from "prop-types";

import { Text, Card, CardHeader, CardBody } from "grommet";

import { LeafPairs } from "@Ui";

const propTypes = {
  proof: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  leaveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  priceName: PropTypes.string,
  block: PropTypes.object.isRequired,
};

const defaultProps = {
  priceName: undefined,
};

function Proof({ proof, leaveKey, value, priceName, block }) {
  return (
    <Card style={{ minHeight: "252px" }}>
      <CardHeader
        pad="small"
        justify="center"
        background="light-2"
        border={{ size: "xsmall", side: "bottom", color: "light-3" }}
      >
        <Text textAlign="center" weight="bold">
          {priceName ?? leaveKey}
        </Text>
      </CardHeader>
      <CardBody direction="column" pad="small" background="white">
        <LeafPairs
          leafKey={leaveKey}
          blockHeight={block.height}
          proof={proof}
          value={value}
        />
      </CardBody>
    </Card>
  );
}

Proof.propTypes = propTypes;
Proof.defaultProps = defaultProps;

export default Proof;
