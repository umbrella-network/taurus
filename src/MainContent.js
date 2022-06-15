import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ChainProvider } from "store/Chain";

import { Datapairs, BlockIndex, Block, ChainSelect } from "components";
import { Sidebar } from "components/ui";

function MainContent() {
  return (
    <main>
      <Router>
        <Sidebar />
        <ChainSelect />

        <ChainProvider>
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
        </ChainProvider>
      </Router>
    </main>
  );
}

export default MainContent;
