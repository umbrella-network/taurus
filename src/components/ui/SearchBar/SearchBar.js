import React, { useState, useCallback, useRef, useEffect } from "react";

import PropTypes from "prop-types";
import classnames from "classnames";
import { debounce } from "lodash";
import { isEmpty } from "ramda";
import { Search } from "@Images";

import "./searchBar.scss";

const propTypes = {
  placeholder: PropTypes.string,
  callback: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  matchingKey: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["dark", "slim", "regular"]),
  className: PropTypes.string,
};

const defaultProps = {
  placeholder: "Search...",
  type: "regular",
  className: undefined,
};

function SearchBar({
  placeholder,
  callback,
  items,
  matchingKey,
  type,
  className,
}) {
  const [keyWords, setKeyWords] = useState([]);
  const [value, setValue] = React.useState("");

  const handleValueChange = useCallback((value) => {
    setKeyWords(value.split(" ").filter((value) => !isEmpty(value)));
  }, []);

  const valueChangeCallback = useRef(
    debounce((value) => handleValueChange(value), 500)
  ).current;

  const handleChange = ({ target: { value } }) => {
    setValue(value);
    valueChangeCallback(value);
  };

  useEffect(() => {
    if (!isEmpty(keyWords)) {
      callback(
        items.filter((item) =>
          new RegExp(keyWords.join("|"), "i").test(
            matchingKey ? item[matchingKey] : item
          )
        )
      );
    } else {
      callback(items);
    }

    /* eslint-disable-next-line */
  }, [keyWords]);

  return (
    <div
      className={classnames("search-bar", {
        [`search-bar--${type}`]: type,
        [className]: className,
      })}
    >
      <Search />
      <input value={value} placeholder={placeholder} onInput={handleChange} />
    </div>
  );
}

SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default SearchBar;
