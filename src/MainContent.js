import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Box, Grid, ResponsiveContext } from "grommet";

import { BlocksTable, Proofs } from "@Components";
import { BlocksProvider, ProofsProvider, ChainAddressProvider } from "@Store";
import { HeaderContent, FooterContent } from "@Ui";
import { isSizeMobile } from "@Utils";
import { isIOS } from "react-device-detect";

function MainContent() {
  const size = useContext(ResponsiveContext);
  const isMobile = isSizeMobile(size);

  return (
    <Grid
      fill
      rows={["max-content", "minmax(max-content, auto)", "min-content"]}
    >
      <ChainAddressProvider>
        <Router>
          <HeaderContent />

          <Box
            align="center"
            background="light-1"
            gap="2rem"
            pad="large"
            style={isIOS ? { width: "100vw" } : { width: "100%" }}
          >
            <Box fill width={{ max: "1366px" }}>
              <Switch>
                <Route path="/proofs">
                  <ProofsProvider>
                    <Proofs />
                  </ProofsProvider>
                </Route>

                <Route path={["/blocks/:id", "/"]}>
                  <BlocksProvider>
                    <BlocksTable />
                  </BlocksProvider>
                </Route>
              </Switch>
            </Box>
          </Box>

          {!isMobile && <FooterContent />}
        </Router>
      </ChainAddressProvider>
    </Grid>
  );
}

export default MainContent;
