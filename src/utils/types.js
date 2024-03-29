import PropTypes from "prop-types";

export const tableProperties = PropTypes.arrayOf(
  PropTypes.shape({
    key: PropTypes.string,
    valueCallback: PropTypes.func,
    label: PropTypes.string,
    truncate: PropTypes.bool,
    clipboardable: PropTypes.bool,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    primary: PropTypes.bool,
    urlKey: PropTypes.string,
    highlight: PropTypes.bool,
    urlPrefix: PropTypes.string,
    urlSuffix: PropTypes.string,
    onClick: PropTypes.func,
    titleKey: PropTypes.string,
  })
).isRequired;
