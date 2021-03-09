import React, { useContext, useState, useEffect, useRef } from "react";

import ScrollLock, { TouchScrollable } from "react-scrolllock";

import { Box, Grid, ResponsiveContext } from "grommet";
import { Menu as MenuIcon } from "grommet-icons";

import FooterContent from "../FooterContent/FooterContent";
import { isSizeMobile, fillMobileScreen } from "@Utils";

import { ContractButton, Overlay, Menu } from "./";

function HeaderContent() {
  const menuRef = useRef();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleOpen = () => setIsSidebarOpen(!isSidebarOpen);

  const size = useContext(ResponsiveContext);
  const isMobile = isSizeMobile(size);

  const shouldDisplaySideBar = isMobile && isSidebarOpen;

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [isMobile]);

  useEffect(() => {
    if (menuRef.current) {
      fillMobileScreen(menuRef.current, 49);
    }
  }, [isSidebarOpen]);

  return (
    <>
      <ScrollLock isActive={isSidebarOpen} />
      <TouchScrollable>
        <Box
          align="center"
          pad={{ horizontal: "large", vertical: "medium" }}
          style={{ borderBottom: "1px solid #0054A6" }}
        >
          <Grid
            style={{
              background: "white",
              zIndex: 1,
              gridAutoFlow: "column",
              gridAutoColumns: isMobile ? "max-content" : "1fr",
              maxWidth: "1366px",
              maxHeight: "80px",
            }}
            justifyContent="between"
            fill="horizontal"
            align="center"
          >
            {!isMobile ? (
              <Menu isMobile={isMobile} handlePathChange={toggleOpen} />
            ) : (
              <>
                <MenuIcon color="control" onClick={toggleOpen} />
                {shouldDisplaySideBar ? (
                  <>
                    <Overlay onClick={toggleOpen} />
                    <Grid
                      gap="medium"
                      ref={menuRef}
                      pad={{ top: "large", horizontal: "small" }}
                      style={{
                        zIndex: 2,
                        position: "absolute",
                        background: "white",
                        top: 0,
                        left: 0,
                        width: "100%",
                        maxWidth: "320px",
                        height: "100%",
                        display: isMobile ? "none" : "",
                      }}
                      rows={["min-content", "min-content", "1fr"]}
                    >
                      <Menu isMobile={isMobile} handlePathChange={toggleOpen} />
                      <FooterContent mobile />
                    </Grid>
                  </>
                ) : null}
              </>
            )}
            <ContractButton isMobile={isMobile} />
          </Grid>
        </Box>
      </TouchScrollable>
    </>
  );
}

export default HeaderContent;
