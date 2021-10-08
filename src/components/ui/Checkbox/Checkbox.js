import React from "react";
import PropTypes from "prop-types";
import { Check } from "@Images";
import classnames from "classnames";

import "./checkbox.scss";

const propTypes = {
  checked: PropTypes.bool,
  handleChange: PropTypes.func,
  readOnly: PropTypes.bool,
  label: PropTypes.string,
};

const defaultProps = {
  checked: false,
  handleChange: () => {},
  readOnly: false,
  label: undefined,
};

function Checkbox({ checked, label, handleChange, readOnly }) {
  return (
    <label className="checkbox">
      <div
        className={classnames("checkbox__visible", {
          "checkbox__visible--checked": checked,
        })}
      />
      {Boolean(label) && <p>{label}</p>}
      <input
        type="checkbox"
        className="checkbox__input"
        checked={checked}
        readOnly={readOnly}
        onChange={handleChange}
      />
      <Check />
    </label>
  );
}

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;