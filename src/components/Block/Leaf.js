import React, { useState, useContext } from "react";
import PropTypes from "prop-types";

import {
  Anchor,
  Layer,
  Button,
  Box,
  Text,
  Heading,
  Grid,
  ResponsiveContext,
} from "grommet";

import { FormClose } from "grommet-icons";

import { arrayToReadableJSON, truncate } from "@Formatters";
import { useChainAddress } from "@Store";
import { Clipboardable, LeafPairs } from "@Ui";
import { isSizeMobile } from "@Utils";

const propTypes = {
  leaf: PropTypes.object.isRequired,
  blockHeight: PropTypes.number.isRequired,
  label: PropTypes.string,
};

const defaultProps = {
  label: undefined,
};

function Leaf({ leaf, blockHeight, label }) {
  const {
    state: { address },
  } = useChainAddress();

  const { key, proof, value } = leaf;
  const [show, setShow] = useState(false);

  const size = useContext(ResponsiveContext);
  const isMobile = isSizeMobile(size);

  const toggleShow = () => setShow(!show);

  return (
    <>
      <Button label={label ?? key} onClick={toggleShow} />
      {show && (
        <Layer fill="horizontal" onEsc={toggleShow} onClickOutside={toggleShow}>
          <Box pad="medium">
            <Grid style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              <Heading
                style={{ gridColumnStart: "2" }}
                textAlign="center"
                level="2"
                margin={{ vertical: "small" }}
              >
                Leaf
              </Heading>
              <Button
                style={{ justifySelf: "end" }}
                plain
                icon={<FormClose />}
                onClick={toggleShow}
              />
            </Grid>
            <Box
              direction="row"
              justify="between"
              pad={{ top: "xsmall", bottom: "medium" }}
              align="center"
              border={{ size: "xsmall", style: "dashed", side: "bottom" }}
            >
              <Box direction="column" align="center">
                <Clipboardable text={address} size="small">
                  <Anchor
                    size="small"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`${process.env.REACT_APP_SCAN_URL}/${address}#readContract`}
                    label={`Contract - [${truncate(address)}]`}
                  />
                </Clipboardable>
              </Box>
            </Box>
            <Box
              justify="between"
              alignSelf="center"
              style={{ maxWidth: isMobile ? "" : "420px" }}
              fill="horizontal"
              width="small"
              pad={{ vertical: "medium" }}
            >
              <LeafPairs
                leafKey={key}
                blockHeight={blockHeight}
                proof={proof}
                value={value}
              />
            </Box>
            <Box>
              <Box direction="row" gap="small" width="small" margin="small">
                <Heading level="4">Proof</Heading>
                <Clipboardable size="small" text={JSON.stringify(proof)} />
              </Box>
              <Box
                margin="medium"
                height={{ max: "small" }}
                overflow={{ vertical: "scroll" }}
                pad="small"
                background="light-3"
              >
                <Text
                  style={{ whiteSpace: "pre-wrap" }}
                  size="small"
                  alignSelf="center"
                  wordBreak="break-word"
                >
                  {arrayToReadableJSON(proof)}
                </Text>
              </Box>
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
}

Leaf.propTypes = propTypes;
Leaf.defaultProps = defaultProps;

export default Leaf;
