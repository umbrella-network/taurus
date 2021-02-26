import React from "react";

import { Grommet } from "grommet";

import { theme } from "@Utils";

import MainContent from "./MainContent";

function App() {
  return (
    <Grommet full theme={theme}>
      <MainContent />
    </Grommet>
  );
}

export default App;
