import React, { Fragment } from "react";

import PropTypes from "prop-types";
import classnames from "classnames";
import { isEmpty } from "ramda";

import { truncate } from "@Formatters";
import { tableProperties as properties } from "@Types";
import { Clipboardable, Url } from "@Ui";

const propTypes = {
  item: PropTypes.object.isRequired,
  properties,
  paired: PropTypes.bool,
};

const defaultProps = {
  paired: false,
};

function Content({ item, properties, paired }) {
  return properties.map(({ key, label, ...property }) => {
    const hasCallback = Boolean(property.valueCallback);
    const value = item[key] ?? (hasCallback && property.valueCallback(item));

    if (!value || isEmpty(value)) {
      return paired ? (
        <>
          <span>{label}</span>
          <p className="value">N/A</p>
        </>
      ) : (
        <td key={`${label} td ${JSON.stringify(item)}`} className="value">
          <span>{label}</span>
          N/A
        </td>
      );
    }

    const formattedValue = property.truncate ? truncate(value, 4) : value;
    const hasUrl = property.urlKey || property.urlPrefix;
    const url = item[property.urlKey]
      ? `${item[property.urlKey]}${property.urlSuffix ?? ""}`
      : `${property.urlPrefix}/${value}${property.urlSuffix ?? ""}`;
    const title = item[property.titleKey] ?? value;

    const valuesToRender = [
      {
        className: "value--truncated",
        value: formattedValue,
        title,
      },
      {
        className: "value--full",
        value: value,
        title,
      },
    ];

    const displayedValue = hasUrl
      ? valuesToRender.map(({ value, title, className }) => (
          <Url
            key={`url for ${value} ${className}`}
            className={`value value--url ${className}`}
            label={value}
            url={url}
            title={title}
          />
        ))
      : valuesToRender.map(({ value, title, className }) => (
          <p
            key={`p for ${value} ${className}`}
            className={classnames("value", {
              "value--primary": property.primary,
              "value--highlight": property.highlight,
              "value--clickable": property.onClick,
              [className]: className,
            })}
            title={title}
          >
            {value}
          </p>
        ));

    const content = (
      <>
        <span>{label}</span>
        {property.clipboardable && displayedValue ? (
          <Clipboardable text={value}>{displayedValue}</Clipboardable>
        ) : (
          displayedValue
        )}
      </>
    );

    const keyProp = `${label} td ${JSON.stringify(item)} ${paired}`;

    const props = {
      key: keyProp,
      className: classnames("value", {
        "value--primary": property.primary,
        "value--highlight": property.highlight,
        "value--clickable": property.onClick,
      }),
      onClick: property.onClick ? () => property.onClick(item) : undefined,
    };

    return paired ? (
      <Fragment key={keyProp}>{content}</Fragment>
    ) : (
      <td {...props}>{content}</td>
    );
  });
}

function TableRow({ item, properties, paired }) {
  return paired ? (
    <Content item={item} properties={properties} paired />
  ) : (
    <tr>
      <Content item={item} properties={properties} />
    </tr>
  );
}

TableRow.propTypes = propTypes;
TableRow.defaultProps = defaultProps;

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default TableRow;
