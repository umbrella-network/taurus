import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Box, Button, Text, MaskedInput, Grid } from "grommet";
import { LinkNext, LinkPrevious, Next, Previous } from "grommet-icons";

import { range, isEmpty, splitEvery } from "ramda";

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
    <Grid gap="small" margin={{ horizontal: "medium", top: "auto" }}>
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
            a11yTitle="First page"
            icon={<LinkPrevious />}
            onClick={() => goToFirstPage()}
          />
          <Button
            plain
            disabled={currentPage === 1}
            icon={<Previous />}
            a11yTitle="Previous page"
            onClick={handlePrevious}
          />
        </Grid>
        <Box direction="row" fill justify="around">
          {paginationRange.map((page) => (
            <Button
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
            icon={<Next />}
            onClick={handleNext}
          />
          <Button
            disabled={currentPage === maxPages || maxPages === 0}
            a11yTitle="Last page"
            icon={<LinkNext />}
            plain
            reverse
            onClick={() => goToLastPage()}
          />
        </Grid>
      </Grid>
      <Grid
        gap="medium"
        style={{ gridAutoFlow: "column", justifyItems: "center" }}
        align="center"
      >
        <Box alignSelf="center" gap="small" direction="row">
          <Text>Pages:</Text>
          <b>{maxPages}</b>
        </Box>
        <Text>|</Text>
        <Grid
          columns={["max-content", "max-content"]}
          width="230px"
          gap="small"
          justify="center"
        >
          <MaskedInput
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
            style={{ width: "40px" }}
          />
          <Button label="Go" size="small" onClick={goToPageFromInput} />
        </Grid>
      </Grid>
    </Grid>
  );
}

Pagination.propTypes = propTypes;

export default Pagination;
