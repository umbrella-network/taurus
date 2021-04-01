import React from "react";
import PropTypes from "prop-types";

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
  function valueFromItem(item) {
    return searchTerm ? item[searchTerm] : item;
  }

  const options = items.map((item) => {
    return { label: valueFromItem(item), value: valueFromItem(item) };
  });

  const handleChange = (selected) => {
    const selectedItems = Array.isArray(selected)
      ? selected.map(({ label }) => label)
      : [selected.label];

    const filteredItems = items.filter((item) =>
      selectedItems.includes(valueFromItem(item))
    );

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
    />
  );
}

SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default SearchBar;
