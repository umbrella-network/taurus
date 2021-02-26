import React, { useEffect, useState } from "react";

import { Grid, Text } from "grommet";

import { isEmpty } from "ramda";

import { fetchProof } from "@Services";
import {
  usePrices,
  proofRequested,
  proofRequestFulfilled,
  proofRequestRejected,
} from "@Store";
import { priceNameFromKeyAndList } from "@Utils";

import Proof from "./Proof";

function ProofsContainer() {
  const {
    state: {
      keys: { list, selected },
      proof: { block, leaves, isLoading },
    },
    dispatch,
  } = usePrices();

  const [hasRequested, setHasRequested] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setHasRequested(true);
      dispatch(proofRequested());
      fetchProof(
        dispatch,
        proofRequestFulfilled,
        proofRequestRejected,
        selected
      );
    }

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [selected]);

  useEffect(() => {
    setHasRequested(false);
  }, [leaves]);

  useEffect(() => {
    return () => {
      dispatch(proofRequestRejected());
    };
  }, [dispatch]);

  const hasNoProofs =
    !isEmpty(selected) && !isLoading && isEmpty(leaves) && hasRequested;

  return (
    <>
      {hasNoProofs ? (
        <Text weight="bold" size="large" margin="large" textAlign="center">
          No proofs to show for the selected keys
        </Text>
      ) : (
        <Grid
          justifyContent="center"
          fill="horizontal"
          style={{ gridTemplateColumns: "repeat(auto-fit, 252px)" }}
          gap="medium"
        >
          {leaves.map(({ proof, key, value }) => (
            <Proof
              key={key}
              proof={proof}
              leaveKey={key}
              value={value}
              block={block}
              priceName={priceNameFromKeyAndList(key, list)}
            />
          ))}
        </Grid>
      )}
    </>
  );
}

export default ProofsContainer;
