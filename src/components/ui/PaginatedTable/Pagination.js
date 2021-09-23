import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Arrow } from "@Images";

import { range, isEmpty, splitEvery } from "ramda";

import "./pagination.scss";

const propTypes = {
  maxPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  callback: PropTypes.func,
};

const defaultProps = {
  callback: () => {},
};

function Pagination({
  maxPages,
  currentPage,
  setCurrentPage,
  callback,
}) {
  const pageBreak = 3;
  const [paginationRange, setPaginationRange] = useState([1]);
  const pageGroups = splitEvery(pageBreak, range(1, maxPages + 1));

  const [pageInputValue, setPageInputValue] = useState(currentPage);

  const multipleRangeGroups = maxPages > pageBreak;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === maxPages || maxPages === 0;

  useEffect(() => {
    callback();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [currentPage]);

  useEffect(() => {
    if (multipleRangeGroups) {
      setPaginationRange(
        pageGroups.find((pageGroup) => pageGroup.includes(currentPage))
      );
    } else {
      setPaginationRange(pageGroups[0]);
    }

    setPageInputValue(currentPage);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [currentPage, maxPages]);

  function handleChange({ target: { value } }) {
    const maxPagesLength = String(maxPages).length;
    const valueLength = String(value).length;
    const isLengthValid = maxPagesLength >= valueLength;
    const isNumbersOnly = value.match(/^([+]?[1-9]\d*)$/);

    if (isLengthValid && isNumbersOnly) {
      const page = parseInt(value) > maxPages ? maxPages : value;

      setPageInputValue(page);
    } else if (isEmpty(value)) {
      setPageInputValue("");
    }
  }

  function handleNext() {
    const nextPage = currentPage + 1;

    setCurrentPage(nextPage);
  }

  function handlePrevious() {
    const previousPage = currentPage - 1;

    setCurrentPage(previousPage);
  }

  function goToPageFromInput() {
    if (!isEmpty(pageInputValue) && pageInputValue <= maxPages) {
      const parsedPage = parseInt(pageInputValue);
      setCurrentPage(parsedPage);
    }
  }

  return (
    <div className="pagination">
      <div className="pagination__buttons">
        <button
          className={classnames("pagination__button pagination__button--left", {
            "pagination__button--disabled": isFirstPage,
          })}
          disabled={isFirstPage}
          onClick={handlePrevious}
          aria-label="Previous page"
        >
          <Arrow />
        </button>
        {paginationRange?.map((page) => (
          <button
            className={classnames("pagination__button", {
              "pagination__button--current-page": page === currentPage,
            })}
            key={`${JSON.stringify(setCurrentPage)} ${page} pagination`}
            onClick={() => setCurrentPage(page)}
            aria-label={`Go to page ${page}`}
          >
            <p>{page}</p>
          </button>
        ))}
        <button
          className={classnames(
            "pagination__button pagination__button--right",
            {
              "pagination__button--disabled": isLastPage,
            }
          )}
          disabled={isLastPage}
          aria-label="Next page"
          onClick={handleNext}
        >
          <Arrow />
        </button>
      </div>
      <div className="pagination__divider" />
      <div className="pagination__navigation">
        <p>Go To:</p>
        <div className="navigation">
          <input
            className="navigation__input"
            value={pageInputValue}
            placeholder={currentPage}
            onChange={handleChange}
          />
          <button
            label="Go"
            className="navigation__button"
            onClick={goToPageFromInput}
          >
            <Arrow />
          </button>
        </div>
      </div>
    </div>
  );
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;
