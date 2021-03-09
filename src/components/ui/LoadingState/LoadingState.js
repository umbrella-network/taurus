import React from "react";
import { Grid, Image } from "grommet";
import { Loading } from "@Images";

function LoadingState() {
  return (
    <Grid justifyContent="center" fill alignContent="center" gap="medium">
      <Image src={Loading} style={{ width: "280px" }} />
    </Grid>
  );
}

export default LoadingState;
