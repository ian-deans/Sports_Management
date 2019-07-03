import React from "react";

export default class Dropdown extends React.Component {

  render() {
    return (
      <select className="ui dropdown">
        <option value="">Family</option>
        <option value="0">One</option>
        <option value="1">Two</option>
      </select>
    )
  }
}