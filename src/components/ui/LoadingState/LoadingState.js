import React from "react";

import { Loading } from "assets/images";

import "./loadingState.scss";

function LoadingState() {
  return (
    <div className="loading-state">
      <img src={Loading} alt="" />
    </div>
  );
}

export default LoadingState;
