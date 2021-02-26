import React from "react";

import { Box, Button, Image, Text } from "grommet";
import { LinkedinOption, Medium, Send, Twitter } from "grommet-icons";

import { UmbrellaIcon } from "@Images";

function FindUs() {
  const buttonProps = {
    target: "_blank",
    rel: "noopener noreferrer",
    alignSelf: "start",
    plain: true,
  };

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
        find us
      </Text>

      <Box direction="row" wrap>
        <Box width="160px" margin={{ right: "20px" }}>
          <Button
            label="umb.network"
            href="https://umb.network"
            icon={<Image src={UmbrellaIcon} alignSelf="center" width="24px" />}
            {...buttonProps}
          />
          <Button
            label="Medium"
            href="https://medium.com/umbrella-network"
            icon={<Medium />}
            {...buttonProps}
          />
        </Box>
        <Box width="160px" margin={{ right: "20px" }}>
          <Button
            label="Twitter"
            href="https://twitter.com/umbnetwork"
            icon={<Twitter />}
            {...buttonProps}
          />
          <Button
            label="Telegram"
            href="https://t.me/umbrellanet"
            icon={<Send />}
            {...buttonProps}
          />
        </Box>
        <Box>
          <Button
            label="Linkedin"
            href="https://www.linkedin.com/company/umbrella-network/"
            icon={<LinkedinOption />}
            {...buttonProps}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default FindUs;
