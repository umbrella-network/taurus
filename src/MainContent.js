import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Datapairs, BlockIndex, Block } from "@Components";
import { BlocksProvider, ProofsProvider } from "@Store";
import { Sidebar } from "@Ui";

function MainContent() {
  return (
    <main>
      <Router>
        <Sidebar />

        <BlocksProvider>
          <ProofsProvider>
            <div className="main-content">
              <Switch>
                <Route path="/blocks/:id">
                  <Block />
                </Route>

                <Route path="/blocks">
                  <BlockIndex />
                </Route>

                <Route path={["/datapairs", "/"]}>
                  <Datapairs />
                </Route>
              </Switch>
            </div>
          </ProofsProvider>
        </BlocksProvider>
      </Router>
    </main>
  );
}

export default MainContent;
