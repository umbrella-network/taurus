import React from "react";

import "./heading.scss";

export default function Heading({ children }) {
  return <h1 className="heading">{children}</h1>;
}
