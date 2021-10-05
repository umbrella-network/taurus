import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Close } from "@Images";
import { Card, Heading } from "@Ui";

import "./layer.scss";

const propTypes = {
  close: PropTypes.func.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  fillMobile: PropTypes.bool,
};

const defaultProps = {
  title: undefined,
  className: "",
  fillMobile: false,
};

function Layer({ children, title, close, className, fillMobile }) {
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];

    if (body) {
      body.style.overflow = "hidden";
      body.scrollIntoView();
    }

    return () => {
      if (body) {
        body.style.overflow = "initial";
      }
    }
  }, [])

  return (
    <div className="layer">
      <div className="layer__overlay" onClick={close} />
      <Card
        className={classnames(`layer__card ${className}`, {
          "layer__card--fill": fillMobile,
        })}
      >
        <div className="layer-card-header">
          {title ? (
            <Heading>
              {title}
            </Heading>
          ) : null}
          <button onClick={close}>
            <Close />
          </button>
        </div>
        {children}
      </Card>
    </div>
  );
}

Layer.propTypes = propTypes;
Layer.defaultProps = defaultProps;

export default Layer;
