import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Clipboard } from "@Images";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { debounce } from "lodash";

import "./clipboardable.scss";

const propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  disabled: PropTypes.bool,
};

const defaultProps = {
  disabled: false,
};

function Clipboardable({ text, disabled, children, ...rest }) {
  const [hasCopied, setHasCopied] = useState(false);
  const copiedCallback = debounce(setHasCopied, 250);

  const handleClick = () => {
    setHasCopied(true);
    copiedCallback();
  };

  return (
    <div className="clipboardable">
      {children}
      <CopyToClipboard text={text}>
        <button
          className={classnames("clipboardable__button", {
            "clipboardable__button--copied": hasCopied,
          })}
          disabled={disabled}
          onClick={handleClick}
        >
          <img src={Clipboard} alt="" />
        </button>
      </CopyToClipboard>
    </div>
  );
}

Clipboardable.propTypes = propTypes;
Clipboardable.defaultProps = defaultProps;

export default Clipboardable;
