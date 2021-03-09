import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Box, Button, Text, MaskedInput, Grid } from "grommet";
import { LinkNext, LinkPrevious, Next, Previous } from "grommet-icons";

import { range, isEmpty, splitEvery } from "ramda";

import "./pagination.scss";

const propTypes = {
  maxPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageBreak: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

function Pagination({ maxPages, currentPage, setCurrentPage, pageBreak }) {
  const [paginationRange, setPaginationRange] = useState([1]);
  const pageGroups = splitEvery(pageBreak, range(1, maxPages + 1));

  const [pageInputValue, setPageInputValue] = useState("");

  const multipleRangeGroups = maxPages > pageBreak;

  useEffect(() => {
    if (multipleRangeGroups) {
      setPaginationRange(
        pageGroups.find((pageGroup) => pageGroup.includes(currentPage))
      );
    }

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [currentPage]);

  function handleChange({ target: { value } }) {
    const page = parseInt(value) > maxPages ? maxPages : value;

    setPageInputValue(page);
  }

  function handleNext() {
    const nextPage = currentPage + 1;

    setCurrentPage(nextPage);
  }

  function handlePrevious() {
    const previousPage = currentPage - 1;

    setCurrentPage(previousPage);
  }

  function goToFirstPage() {
    setCurrentPage(1);
  }

  function goToLastPage() {
    setCurrentPage(maxPages);
  }

  function goToPageFromInput() {
    if (!isEmpty(pageInputValue) && pageInputValue <= maxPages) {
      const parsedPage = parseInt(pageInputValue);
      setCurrentPage(parsedPage);
    }
  }

  return (
    <Grid
      className="pagination"
      gap="small"
      fill="horizontal"
      pad={{ horizontal: "medium" }}
      margin={{ top: "auto" }}
    >
      <Grid
        columns={["60px", "auto", "60px"]}
        gap="small"
        align="center"
        justify="center"
      >
        <Grid
          columns={["24px", "24px"]}
          gap="small"
          margin={{ right: "small" }}
        >
          <Button
            disabled={currentPage === 1}
            plain
            style={{ width: "18px" }}
            a11yTitle="First page"
            icon={<LinkPrevious style={{ width: "18px" }} />}
            onClick={() => goToFirstPage()}
          />
          <Button
            plain
            style={{ width: "18px" }}
            disabled={currentPage === 1}
            icon={<Previous style={{ width: "18px" }} />}
            a11yTitle="Previous page"
            onClick={handlePrevious}
          />
        </Grid>
        <Box direction="row" fill justify="around">
          {paginationRange.map((page) => (
            <Button
              className="label"
              plain
              key={page}
              a11yTitle={`Page ${page}`}
              focusIndicator={false}
              label={currentPage === page ? <b>{page}</b> : page}
              onClick={() => setCurrentPage(page)}
            />
          ))}
        </Box>
        <Grid columns={["24px", "24px"]} gap="small" margin={{ left: "small" }}>
          <Button
            disabled={currentPage === maxPages}
            plain
            a11yTitle="Next page"
            icon={<Next style={{ width: "18px" }} />}
            style={{ width: "18px" }}
            onClick={handleNext}
          />
          <Button
            disabled={currentPage === maxPages || maxPages === 0}
            a11yTitle="Last page"
            icon={<LinkNext style={{ width: "18px" }} />}
            style={{ width: "18px" }}
            plain
            reverse
            onClick={() => goToLastPage()}
          />
        </Grid>
      </Grid>
      <Grid
        alignSelf="center"
        fill="horizontal"
        className="navigation-info"
        gap="small"
      >
        <Box alignSelf="center" gap="small" direction="row">
          <Text className="label">
            <b>{maxPages}</b> pages
          </Text>
        </Box>
        <Text>|</Text>
        <Grid
          className="navigation-menu"
          align="center"
          gap="small"
        >
          <Text className="label">Navigate</Text>
          <MaskedInput
            className="navigation-input"
            value={pageInputValue}
            mask={[
              {
                placeholder: currentPage,
                length: [String(maxPages).length],
                regexp: /^([+]?[1-9]\d*)$/,
              },
            ]}
            onChange={handleChange}
            pad="xsmall"
          />
          <Button
            label="Go"
            className="navigation-button"
            onClick={goToPageFromInput}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

Pagination.propTypes = propTypes;

export default Pagination;
