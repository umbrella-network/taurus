import React, { useState } from "react";
import PropTypes from "prop-types";

import classnames from "classnames";

import "./radio.scss";

const propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func,
};

const defaultProps = {
  value: "",
  handleChange: () => {},
};

function Radio({ label, options, value, handleChange }) {
  const [currentValue, setCurrentValue] = useState(value);

  const handleOptionChange = (value) => {
    setCurrentValue(value);
    handleChange(value);
  };

  return (
    <div className="radio">
      <p className="radio__label">{label}</p>
      <div className="radio__options">
        {options.map(({ label, value }) => {
          const id = `${value}-radio`;
          const checked = value === currentValue;

          return (
            <div
              className={classnames("radio-option", {
                "radio-option--checked": checked,
              })}
              key={id}
              onClick={() => handleOptionChange(value)}
            >
              <input
                readOnly
                id={id}
                type="radio"
                value={value}
                checked={checked}
              />
              <div className="circle" />
              <label htmlFor={id}>{label}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;

export default Radio;
