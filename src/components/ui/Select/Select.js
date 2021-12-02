import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import classnames from "classnames";

import { useClickOutsideListenerRef } from "@Hooks";

import { List, AutoSizer } from "react-virtualized";

import { SearchBar, Checkbox } from "@Ui";

import { isEmpty } from "ramda";

import { xor } from "lodash";

import "./select.scss";

const propTypes = {
  callback: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  matchingKey: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  searchable: PropTypes.bool,
  startSelected: PropTypes.bool,
  keepOne: PropTypes.bool,
  full: PropTypes.bool,
  unfilteredItemCount: PropTypes.number,
};

const defaultProps = {
  placeholder: "Search...",
  searchable: true,
  startSelected: false,
  keepOne: false,
  unfilteredItemCount: undefined,
};

function Select({
  items,
  callback,
  matchingKey,
  placeholder,
  title,
  className,
  searchable,
  startSelected,
  keepOne,
  full,
  unfilteredItemCount,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [selected, setSelected] = useState(startSelected ? items : []);
  const [filteredItems, setFilteredItems] = useState(items);
  const [keyWords, setKeyWords] = useState([]);
  const isSearchEmpty = !isEmpty(keyWords) && isEmpty(filteredItems);

  const ref = useClickOutsideListenerRef(() => setIsOpen(false));

  const displayedList = isEmpty(filteredItems) ? items : filteredItems;
  const allSelected = xor(selected, displayedList).length === 0;

  useEffect(() => {
    const selectedItems = items.filter((item) => selected.includes(item));

    callback(isEmpty(selected) ? items : selectedItems);

    /* eslint-disable-next-line */
  }, [selected]);

  const handleSelectAll = () => {
    const difference = displayedList.filter((item) => !selected.includes(item));
    const includesAllInSelection = difference.length === 0;

    if (!includesAllInSelection) {
      setSelected(Array.from(new Set([...selected, ...displayedList])));
    } else {
      setSelected(selected.filter((item) => !displayedList.includes(item)));
    }
  };

  const handleValueChange = (item) => {
    if (!selected.includes(item)) {
      setSelected(Array.from(new Set([...selected, item])));
    } else {
      if (!(keepOne && selected.length === 1)) {
        setSelected(selected.filter((selectedItem) => selectedItem !== item));
      }
    }
  };

  return (
    <div
      className={classnames("select", {
        [className]: className,
        "select--full": full,
        "select--open": isOpen,
        [`${className}--open`]: className && isOpen,
      })}
      ref={ref}
    >
      {searchable && (
        <div className="select__search">
          {isSearchEmpty && (!full || isOpen) && (
            <p className="error">
              *Key doesn't exist, please use the scroll bar, radio selection,
              and/or check the format
            </p>
          )}
          <SearchBar
            onFocus={() => setIsOpen(true)}
            items={items}
            matchingKey={matchingKey}
            callback={setFilteredItems}
            placeholder={placeholder}
            error={isSearchEmpty}
            keyWordsCallback={setKeyWords}
          />
        </div>
      )}
      <p className="select__title">
        {title}
        <span>{` (${selected.length}/${
          unfilteredItemCount ?? items.length
        })`}</span>
      </p>

      {searchable && (
        <div className="select__select-all">
          <Checkbox
            checked={allSelected}
            label="Select all"
            handleClick={handleSelectAll}
          />
        </div>
      )}
      <div className="select__keys">
        <AutoSizer>
          {({ width }) => (
            <List
              height={182}
              rowHeight={28}
              width={width}
              rowCount={displayedList.length}
              overscanRowCount={20}
              rowRenderer={({ index, style }) => {
                const item = displayedList[index];

                return (
                  <div
                    key={`${JSON.stringify(item)} select`}
                    className="checkbox-container"
                    style={style}
                  >
                    <Checkbox
                      checked={selected.includes(item)}
                      handleChange={() => handleValueChange(item)}
                      label={matchingKey ? item[matchingKey] : item}
                    />
                  </div>
                );
              }}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  );
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
