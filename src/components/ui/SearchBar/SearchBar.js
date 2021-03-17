import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Card, Text, TextInput, Image, Select } from "grommet";

import { Search } from "@Images";
import { debounce } from "lodash";
import { isEmpty } from "ramda";

import "./searchBar.scss";

const propTypes = {
  items: PropTypes.array,
  filterCallback: PropTypes.func,
  searchTerm: PropTypes.string,
};

const defaultProps = {
  items: [],
  filterCallback: () => {},
  searchTerm: undefined,
};

function SearchBar({ items, filterCallback, searchTerm }) {
  const [filteredItems, setFilteredItems] = useState([]);
  const [keyWords, setKeyWords] = useState([]);
  const [value, setValue] = React.useState("");
  const [selected, setSelected] = useState([]);
  const [noItems, setNoItems] = useState(false);

  const clearSelected = () => setSelected([]);

  const handleValueChange = (value) => {
    setKeyWords(
      value
        .split(/\s+/)
        .filter((value) => !isEmpty(value))
        .map((keyWord) => keyWord.replace(new RegExp("\\W", "g"), "\\$&"))
    );
  };

  const valueChangeCallback = useRef(
    debounce((value) => handleValueChange(value), 500)
  ).current;

  const handleChange = ({ target: { value } }) => {
    setValue(value);
    valueChangeCallback(value);
  };

  useEffect(() => {
    if (!isEmpty(keyWords)) {
      clearSelected();

      setFilteredItems(
        items.filter((item) =>
          new RegExp(keyWords.join("|"), "i").test(
            searchTerm ? item[searchTerm] : item
          )
        )
      );
    } else {
      clearSelected();
      setFilteredItems([]);
    }

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [keyWords]);

  useEffect(() => {
    if (isEmpty(selected)) {
      filterCallback(filteredItems);
    }

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [filteredItems, selected]);

  useEffect(() => {
    if (!isEmpty(selected)) {
      filterCallback(selected);
    }

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [selected]);

  useEffect(() => {
    setNoItems(isEmpty(filteredItems) && !isEmpty(keyWords));

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [filteredItems]);

  return (
    <Card className="search">
      <div className="search-bar">
        <Image className="icon" src={Search} />
        <TextInput
          value={value}
          className="input"
          placeholder="Search Pair Keys"
          onInput={handleChange}
        />
      </div>
      <Text size="10px" margin={{ left: "54px" }}>
        {noItems ? "No results found" : ""}
      </Text>
      <div className="select-wrapper">
        <Select
          className="select"
          clear={true}
          multiple={true}
          closeOnChange={false}
          disabled={isEmpty(filteredItems)}
          options={filteredItems}
          labelKey={searchTerm}
          valueKey={searchTerm}
          value={selected}
          onChange={({ value }) => setSelected(value)}
        />
      </div>
    </Card>
  );
}

SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default SearchBar;
