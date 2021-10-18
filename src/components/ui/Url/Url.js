import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { useHistory } from "react-router-dom";

import "./url.scss";

const propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
};

const defaultProps = {
  className: undefined,
  title: undefined,
};

function Url({ url, label, className, title }) {
  const isInternal = url.startsWith("/");
  const history = useHistory();
  const rest = isInternal
    ? {}
    : { href: url, rel: "noopener noreferrer", target: "_blank" };
  const handleClick = () => isInternal && history.push(url);

  return (
    <a
      className={classnames("url", { [className]: className })}
      {...rest}
      onClick={handleClick}
      title={title}
    >
      {label}
    </a>
  );
}

Url.propTypes = propTypes;
Url.defaultProps = defaultProps;

export default Url;
