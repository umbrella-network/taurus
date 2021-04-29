import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { isEmpty } from "ramda";
import { useHistory, useLocation } from "react-router-dom";

import Select from "react-select";

import "./searchBar.scss";

const propTypes = {
  items: PropTypes.array,
  filterCallback: PropTypes.func,
  isSearching: PropTypes.bool,
  open: PropTypes.func,
  close: PropTypes.func,
  searchTerm: PropTypes.string,
};

const defaultProps = {
  items: [],
  isSearching: false,
  open: () => {},
  close: () => {},
  filterCallback: () => {},
  searchTerm: undefined,
};

function SearchBar({
  items,
  filterCallback,
  searchTerm,
  isSearching,
  open,
  close,
}) {
  const query = new URLSearchParams(useLocation().search);
  const [selectValue, setSelectValue] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const queryItems = query.get("keys");

    if (queryItems && !isEmpty(queryItems)) {
      const parsedQueryItems = queryItems
        .split(",")
        .map((item) => ({ label: item }));
      handleChange(parsedQueryItems);
    }

    /*eslint-disable-next-line */
  }, []);

  function valueFromItem(item) {
    return searchTerm ? item[searchTerm] : item;
  }

  const options = items.map((item) => ({
    label: valueFromItem(item),
    value: valueFromItem(item),
  }));

  const handleUrl = (selectedItems) => {
    const currentPath = history.location.pathname;
    const nextPathname = isEmpty(selectedItems)
      ? currentPath
      : `${currentPath}?keys=${selectedItems.sort().toString()}`;

    history.replace(nextPathname);
  };

  const handleChange = (selected) => {
    setSelectValue(selected);
    const selectedItems = Array.isArray(selected)
      ? selected.map(({ label }) => label)
      : [selected.label];

    const filteredItems = items.filter((item) =>
      selectedItems.includes(valueFromItem(item))
    );

    handleUrl(selectedItems);
    filterCallback(filteredItems);
  };

  return (
    <Select
      isMulti
      isSearchable
      placeholder="Select pairs..."
      options={options}
      className="search-bar"
      onChange={handleChange}
      theme={(theme) => ({
        ...theme,
        borderRadius: "6px",
        colors: {
          ...theme.colors,
          primary: "#1988F7",
        },
      })}
      blurInputOnSelect={false}
      menuIsOpen={isSearching}
      onFocus={open}
      onBlur={close}
      value={selectValue}
    />
  );
}

SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default SearchBar;
