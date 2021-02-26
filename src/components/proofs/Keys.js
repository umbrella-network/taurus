import React, { useEffect, useState } from "react";

import { DropButton, Box, CheckBoxGroup } from "grommet";

import { Down } from "grommet-icons";

import {
  isEmpty,
  filter,
  includes,
  equals,
  compose,
  not,
  map,
  prop,
} from "ramda";

import { fetchKeys } from "@Services";

import {
  usePrices,
  keysRequested,
  keysRequestFulfilled,
  keysRequestRejected,
  keysSelected,
} from "@Store";

import "./keys.scss";

function Keys() {
  const {
    state: {
      keys: { list, selected, isLoading, error },
    },
    dispatch,
  } = usePrices();

  const [formSelected, setFormSelected] = useState([]);
  const [isRetry, setIsRetry] = useState(false);

  const hasList = list && !isEmpty(list);
  const shouldRequestKeys = isEmpty(list) && !isLoading && !isRetry;

  useEffect(() => {
    if (shouldRequestKeys) {
      dispatch(keysRequested());
      fetchKeys(dispatch, keysRequestFulfilled, keysRequestRejected);
      setIsRetry(true);
    }
  }, [dispatch, shouldRequestKeys]);

  const removeFromSelectedKeys = (attribute, set) =>
    filter(compose(not, equals(attribute)), set);
  const addToSelectedKeys = (attribute, set) => [...set, attribute];

  const toggleAttributePresenceOnSet = (attribute, set) => {
    return includes(attribute, set)
      ? removeFromSelectedKeys(attribute, set)
      : addToSelectedKeys(attribute, set);
  };

  const handleSelected = ({ option }) => {
    setFormSelected(toggleAttributePresenceOnSet(option, formSelected));
    dispatch(keysSelected(toggleAttributePresenceOnSet(option.key, selected)));
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {hasList && (
        <DropButton
          style={{ width: "130px", justifySelf: "center" }}
          dropAlign={{ top: "bottom" }}
          label="Keys"
          icon={<Down />}
          padding="medium"
          reverse
          dropContent={
            <Box
              style={{
                maxHeight: "280px",
                width: "280px",
                marginBottom: "20px",
              }}
            >
              <CheckBoxGroup
                className="keys"
                style={{ margin: "20px", display: "grid" }}
                value={map(prop("key"), formSelected)}
                options={list}
                onChange={handleSelected}
                labelKey="key"
                valueKey="key"
              />
            </Box>
          }
        />
      )}
      {error && <p>There was a problem requesting the keys, try again later</p>}
    </>
  );
}

export default Keys;
