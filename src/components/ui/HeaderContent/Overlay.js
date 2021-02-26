import React, { useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import { Box, ResponsiveContext } from "grommet";

import { fillMobileScreen, isSizeMobile } from "@Utils";

const propTypes = {
  onClick: PropTypes.func.isRequired,
};

function Overlay({ onClick }) {
  const ref = useRef();

  const size = useContext(ResponsiveContext);
  const isMobile = isSizeMobile(size);

  useEffect(() => {
    if (ref.current) {
      fillMobileScreen(ref.current, 49);
    }
  }, []);

  return (
    <Box
      ref={ref}
      style={{
        zIndex: 1,
        width: "100vw",
        height: "0px",
        background: "black",
        opacity: "0.2",
        position: "absolute",
        display: isMobile ? "none" : "",
        top: 0,
        left: 0,
      }}
      fill
      onClick={onClick}
    />
  );
}

Overlay.propTypes = propTypes;

export default Overlay;
