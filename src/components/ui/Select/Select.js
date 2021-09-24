import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { SearchBar, Checkbox } from "@Ui";
import { isEmpty } from "ramda";

import "./select.scss";

const propTypes = {
  callback: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  matchingKey: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  title: PropTypes.string.isRequired,
};

const defaultProps = {
  placeholder: "Search...",
};

function Select({ items, callback, matchingKey, placeholder, title }) {
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [filteredItems, setFilteredItems] = useState(items);

  const handleSelectAll = () => setSelectAll(!selectAll);

  const displayedList = isEmpty(filteredItems) ? items : filteredItems;

  useEffect(() => {
    const selectedItems = items.filter((item) => selected.includes(item));

    callback(isEmpty(selected) ? items : selectedItems);

    /* eslint-disable-next-line */
  }, [selected]);

  useEffect(() => {
    if (selectAll) {
      setSelected(Array.from(new Set([...selected, ...displayedList])));
    } else {
      setSelected([]);
    }

    /* eslint-disable-next-line */
  }, [selectAll]);

  const handleValueChange = (item) => {
    if (!selected.includes(item)) {
      setSelected(Array.from(new Set([...selected, item])));
    } else {
      setSelected(selected.filter((selectedItem) => selectedItem !== item));
    }
  };

  return (
    <div className="select">
      <p className="select__title">
        {title}
        <span>{` (${selected.length}/${items.length})`}</span>
      </p>
      <div className="select__search">
        <Checkbox checked={selectAll} handleChange={handleSelectAll} />
        <SearchBar
          items={items}
          matchingKey={matchingKey}
          callback={setFilteredItems}
          placeholder={placeholder}
          type="slim"
        />
      </div>
      <div className="select__keys">
        {displayedList.map((item) => (
          <Checkbox
            key={`${JSON.stringify(item)} select`}
            checked={selected.includes(item)}
            handleChange={() => handleValueChange(item)}
            label={matchingKey ? item[matchingKey] : item}
          />
        ))}
      </div>
    </div>
  );
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
