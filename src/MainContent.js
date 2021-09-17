import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Datapairs } from "@Components";
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
            <Route path="/blocks">
              <BlocksProvider>
              </BlocksProvider>
            </Route>

            <Route path={["/datapairs", "/"]}>
              <ProofsProvider>
                <Datapairs />
              </ProofsProvider>
            </Route>
          </Switch>
        </div>
      </Router>
    </main>
  );
}

export default MainContent;
