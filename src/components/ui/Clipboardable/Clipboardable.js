import React, { useState } from "react";
import PropTypes from "prop-types";

import { Button, Box } from "grommet";

import { Clipboard, Compliance } from "grommet-icons";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { debounce } from "lodash";

const propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

function Clipboardable({ text, children, ...rest }) {
  const [hasCopied, setHasCopied] = useState(false);
  const copiedCallback = debounce(setHasCopied, 750);
  const icon = hasCopied ? (
    <Compliance {...rest} color="#3E7AB8" />
  ) : (
    <Clipboard {...rest} color="#3E7AB8" />
  );

  const handleClick = () => {
    setHasCopied(true);
    copiedCallback();
  };

  return (
    <Box direction="row" gap="xsmall">
      {children}
      <CopyToClipboard text={text}>
        <Button
          icon={icon}
          size="small"
          plain
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        />
      </CopyToClipboard>
    </Box>
  );
}

Clipboardable.propTypes = propTypes;

export default Clipboardable;
