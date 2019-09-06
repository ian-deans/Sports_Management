import React from "react";

const ListItem = ( { active, children } ) => {
  const activeClass = active ? "active" : "";
  return (
    <div className={ `component-account-list-item ${ activeClass }` }>
      { children }
    </div>
  );
};

export default ListItem;