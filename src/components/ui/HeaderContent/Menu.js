import React from "react";
import PropTypes from "prop-types";
import { useLocation, useHistory } from "react-router-dom";

import { Grid, Box, Button, Image } from "grommet";
import { Cubes, Inherit, Tree } from "grommet-icons";

import { UmbrellaFullLogo } from "@Images";

const propTypes = {
  isMobile: PropTypes.bool.isRequired,
  handlePathChange: PropTypes.func.isRequired,
};

function Menu({ isMobile, handlePathChange }) {
  const { pathname } = useLocation();
  const history = useHistory();

  const options = [
    {
      label: "blocks",
      icon: <Cubes pad="none" />,
      path: "/blocks",
      matches: ["/", "/blocks"],
    },
    {
      label: "first class data",
      icon: <Inherit />,
      path: "/first-class-data",
      matches: ["/first-class-data"],
    },
    {
      label: "layer 2 data",
      icon: <Tree />,
      path: "/layer-2-data",
      matches: ["/layer-2-data"],
    },
  ];

  const handleClick = (option) => {
    if (!option.matches.includes(pathname)) {
      history.push(option.path);
      handlePathChange();
    }
  };

  const selectedBorder = (option) =>
    option.matches.includes(pathname)
      ? { borderBottom: `3px solid #1988F7` }
      : {};

  return (
    <>
      <Grid
        align="center"
        gap="small"
        style={
          isMobile
            ? { gridAutoFlow: "row" }
            : {
                gridAutoFlow: "column",
                gridAutoColumns: "max-content",
              }
        }
      >
        <Button
          plain
          fill="vertical"
          focusIndicator={false}
          style={isMobile ? { justifySelf: "center" } : {}}
          onClick={() => handleClick({ path: "/", matches: ["/"] })}
        >
          <Image
            align="center"
            justify="center"
            width="200px"
            src={UmbrellaFullLogo}
          />
        </Button>
      </Grid>
      <Grid
        style={
          isMobile
            ? { gridAutoFlow: "row", gridGap: "24px" }
            : {
                gridAutoFlow: "column",
                gridAutoColumns: "max-content",
                justifySelf: "center",
              }
        }
      >
        {options.map((option) => (
          <Box key={option.label} pad="small" fill="horizontal">
            <Button
              plain
              focusIndicator={false}
              onClick={() => handleClick(option)}
              style={{
                paddingBottom: "12px",
                ...selectedBorder(option),
              }}
            >
              <Box direction="row" gap="small">
                {isMobile ? option.icon : null}
                {option.label}
              </Box>
            </Button>
          </Box>
        ))}
      </Grid>
    </>
  );
}

Menu.propTypes = propTypes;

export default Menu;
