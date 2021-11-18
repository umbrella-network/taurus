import React from "react";

import { ChainSelect } from "@Components";

import "./heading.scss";

export default function Heading({ children }) {
  return (
    <h1 className="heading">
      {children}
      <ChainSelect />
    </h1>
  );
}
