import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { useClickOutsideListenerRef } from "@Hooks";

import { Arrow } from "@Images";

import "./dropdown.scss";

const propTypes = {
  title: PropTypes.string.isRequired,
};

function Dropdown({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const ref = useClickOutsideListenerRef(close);

  return (
    <div
      ref={ref}
      className={classnames("dropdown", { "dropdown--open": isOpen })}
    >
      <button className="dropdown__button" onClick={toggle}>
        {title}
        <Arrow />
      </button>
      {React.cloneElement(children, {
        ...children.props,
        className: `dropdown__children ${
          children.props.className ? children.props.className : ""
        }`,
      })}
    </div>
  );
}

Dropdown.propTypes = propTypes;

export default Dropdown;
