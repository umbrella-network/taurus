import React from "react";

import { Anchor, Box, Text } from "grommet";

function UsefulLinks() {
  return (
    <Box>
      <Text
        alignSelf="start"
        weight="bold"
        margin={{ bottom: "15px" }}
        style={{
          borderBottom: "3px solid #1988F7",
        }}
      >
        useful links
      </Text>
      <Box direction="row" gap="medium">
        <Anchor
          target="_blank"
          rel="noopener noreferrer"
          href="https://medium.com/umbrella-network/umbrella-demo-guide-a38671447c7"
          label="Umbrella Demo Guide"
        />
      </Box>
    </Box>
  );
}

export default UsefulLinks;
