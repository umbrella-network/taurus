import React from "react";

import { Grid } from "grommet";

import Keys from "./Keys";
import ProofsContainer from "./ProofsContainer";

function Proofs() {
  return (
    <Grid gap="medium">
      <Keys />
      <ProofsContainer />
    </Grid>
  );
}

export default Proofs;
