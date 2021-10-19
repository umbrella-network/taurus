import React, { useState } from "react";

import PropTypes from "prop-types";

import classnames from "classnames";

import "./info.scss";

const propTypes = {
  title: PropTypes.string,
  enabled: PropTypes.bool,
  body: PropTypes.string,
  position: PropTypes.oneOf(["right", "left", "center"]),
  content: PropTypes.node,
};

const defaultProps = {
  body: undefined,
  content: undefined,
  enabled: true,
  title: "",
  position: "right",
};

function Info({ title, body, position, enabled, content, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="info-box">
        {React.cloneElement(children, {
          ...children.props,
          className: `children ${
            children.props.className ? children.props.className : ""
          }`,
          onMouseEnter: () => setIsOpen(true),
          onMouseLeave: () => setIsOpen(false),
          onTouchStart: () => setIsOpen(!isOpen),
        })}
        <div
          className={classnames(
            `info-box__content info-box__content--${position}`,
            {
              "info-box__content--open": isOpen && enabled,
            }
          )}
        >
          {title ? <p className="info-box-content-title">{title}</p> : null}
          {body ? <p className="info-box-content-body">{body}</p> : null}
          {content ? content : null}
        </div>
      </div>
    </>
  );
}

Info.propTypes = propTypes;
Info.defaultProps = defaultProps;

export default Info;
