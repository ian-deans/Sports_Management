import React from "react";
import { Segment } from "semantic-ui-react";
// import { Panel } from "../../../common";

const ListItem = ({active, children}) => {
  const activeClass = active ? "active" : "";
  return (
    <div className={`component-account-list-item ${activeClass}`}>
      {children}
    </div>
  )
};

export default ListItem;