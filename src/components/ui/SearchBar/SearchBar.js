import React, { useState, useCallback, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { debounce } from "lodash";
import { isEmpty } from "ramda";

import { Search } from "assets/images";

import "./searchBar.scss";
import { useTranslation } from "react-i18next";

const propTypes = {
  placeholder: PropTypes.string,
  callback: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  matchingKey: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["dark", "slim", "regular"]),
  className: PropTypes.string,
  keyWordsCallback: PropTypes.func,
  error: PropTypes.bool,
  onFocus: PropTypes.func,
};

const defaultProps = {
  type: "regular",
  className: undefined,
  keyWordsCallback: () => {},
  error: false,
  onFocus: undefined,
};

function SearchBar({
  placeholder: placeholderProp,
  callback,
  items,
  matchingKey,
  type,
  className,
  keyWordsCallback,
  error,
  onFocus,
}) {
  const { t } = useTranslation("ui", { keyPrefix: "searchBar" });

  const placeholder = placeholderProp ?? t("placeholder");

  const [keyWords, setKeyWords] = useState([]);
  const [value, setValue] = React.useState("");

  const handleValueChange = useCallback((value) => {
    setKeyWords(value.split(/(?=[^-:])\W/).filter((value) => !isEmpty(value)));
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

    keyWordsCallback(keyWords);
    /* eslint-disable-next-line */
  }, [keyWords]);

  return (
    <div
      className={classnames("search-bar", {
        [`search-bar--${type}`]: type,
        [className]: className,
        "search-bar--error": error,
      })}
    >
      <Search />
      <input
        onFocus={onFocus}
        value={value}
        placeholder={placeholder}
        onInput={handleChange}
      />
    </div>
  );
}

SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default SearchBar;
