import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "./toggle.scss";

const propTypes = {
  handleChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  readOnly: PropTypes.bool,
  checkedLabel: PropTypes.string,
  checkedAcronym: PropTypes.string,
  uncheckedLabel: PropTypes.string,
  uncheckedAcronym: PropTypes.string,
};

const defaultProps = {
  checked: false,
  readOnly: false,
  checkedLabel: undefined,
  checkedAcronym: undefined,
  uncheckedLabel: undefined,
  uncheckedAcronym: undefined,
};

function Toggle({
  handleChange,
  readOnly,
  checked,
  checkedLabel,
  checkedAcronym,
  uncheckedLabel,
  uncheckedAcronym,
}) {
  const [label, acronym] = checked
    ? [checkedLabel, checkedAcronym]
    : [uncheckedLabel, uncheckedAcronym];

  return (
    <label
      className={classnames("toggle", {
        "toggle--checked": checked,
        "toggle--unchecked": !checked,
        "toggle--labeled": Boolean(checkedLabel && uncheckedLabel),
      })}
    >
      {Boolean(label) && (
        <p className="toggle__label toggle__label--full">{label}</p>
      )}
      {Boolean(acronym) && (
        <p className="toggle__label toggle__label--acronym">{acronym}</p>
      )}
      <div className="toggle__circle" />
      <input
        type="checkbox"
        className="toggle__input"
        checked={checked}
        readOnly={readOnly}
        onChange={handleChange}
      />
    </label>
  );
}

Toggle.propTypes = propTypes;
Toggle.defaultProps = defaultProps;

export default Toggle;
