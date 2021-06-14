import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

export default function Loading() {
  return (
    <div className="container">
      <div className="cover-page-container">
        <div className={"cover-container"}>
          <Skeleton className="cover-image" animation="wave" height={"24rem"} />
          <Skeleton className="cover-title" animation="pulse" height="2rem" />

          <Skeleton className="cover-image" animation="wave" height={"24rem"} />
          <Skeleton className="cover-title" animation="pulse" height="2rem" />

          <Skeleton className="cover-image" animation="wave" height={"24rem"} />
          <Skeleton className="cover-title" animation="pulse" height="2rem" />
        </div>
      </div>
    </div>
  );
}
