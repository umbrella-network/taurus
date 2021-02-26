import React from "react";
import PropTypes from "prop-types";

import { Box, Text } from "grommet";

import { Clipboardable } from "@Ui";

const KeyPropTypes = {
  text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

function KeyText({ text }) {
  return <Text weight={400}>{text}</Text>;
}

const propTypes = {
  items: PropTypes.array.isRequired,
};

function KeyValuePairs({ items, ...rest }) {
  return (
    <Box direction="column" {...rest}>
      {items.map(
        ({
          key,
          value = undefined,
          childValue = undefined,
          clipboardable = false,
          clipboardableValue = undefined,
        }) => (
          <Box direction="row" justify="between" key={key}>
            {clipboardable ? (
              <Clipboardable size="small" text={clipboardableValue ?? value}>
                <KeyText text={key} />
              </Clipboardable>
            ) : (
              <KeyText text={key} />
            )}
            {childValue ? (
              childValue
            ) : (
              <Text key={`value-for-${key}`} textAlign="end" weight={200}>
                {value}
              </Text>
            )}
          </Box>
        )
      )}
    </Box>
  );
}

KeyText.propTypes = KeyPropTypes;
KeyValuePairs.propTypes = propTypes;

export default KeyValuePairs;
