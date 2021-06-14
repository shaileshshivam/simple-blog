import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

export default function Loading() {
  return (
    <div className="cover-page-container">
      <div className={"post-thumbnail-container"}>
        <Skeleton height={"24rem"} animation="wave" />
        <Skeleton animation={false} />
        <Skeleton animation="wave" />
      </div>
    </div>
  );
}
