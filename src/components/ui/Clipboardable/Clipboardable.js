import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { debounce } from "lodash";

import { CopyToClipboard } from "react-copy-to-clipboard";

import { Clipboard, CheckedCircle } from "assets/images";

import "./clipboardable.scss";

const propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string,
};

const defaultProps = {
  disabled: false,
  label: undefined,
};

function Clipboardable({ text, disabled, children, label }) {
  const [hasCopied, setHasCopied] = useState(false);
  const copiedCallback = debounce(setHasCopied, 750);
  const icon = hasCopied ? CheckedCircle : Clipboard;

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
          {label ?? <img src={icon} alt="" />}
        </button>
      </CopyToClipboard>
    </div>
  );
}

Clipboardable.propTypes = propTypes;
Clipboardable.defaultProps = defaultProps;

export default Clipboardable;
