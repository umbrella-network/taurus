import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { BlocksTable, FirstClassData, LayerTwoData } from "@Components";
import { BlocksProvider, ProofsProvider } from "@Store";
import { Sidebar } from "@Ui";

function MainContent() {
  return (
    <main>
      <Router>
        <BlocksProvider>
          <Sidebar />
        </BlocksProvider>

        <div className="main-content">
          <Switch>
            <Route path="/first-class-data">
              <ProofsProvider>
                <FirstClassData />
              </ProofsProvider>
            </Route>

            <Route path="/layer-2-data">
              <ProofsProvider>
                <LayerTwoData />
              </ProofsProvider>
            </Route>

            <Route path={["/blocks/:id", "/"]}>
              <BlocksProvider>
                <BlocksTable />
              </BlocksProvider>
            </Route>
          </Switch>
        </div>
      </Router>
    </main>
  );
}

export default MainContent;
