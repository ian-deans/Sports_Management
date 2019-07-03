import React from "react";
import { Dropdown as SDropdown } from "semantic-ui-react";
//TODO: Load custom image for dropdown rather than icon

const Dropdown = props => {

  const { className, ...restProps } = props;

  const cssClasses = "cinch-dropdown " + className;

  return (
    <SDropdown
      { ...restProps }
      options={ props.options }
      className={ cssClasses }
    />
  )
};

Dropdown.defaultProps = {
  options: [ { key: 0, text: 'No options provided', value: 'No options provided' } ],
  selection: false,
};

export default Dropdown;
