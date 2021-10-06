import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Datapairs, BlockIndex, Block } from "@Components";
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
            <Route path="/blocks/:id">
              <Block />
            </Route>

            <Route path="/blocks">
              <BlocksProvider>
                <BlockIndex />
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
