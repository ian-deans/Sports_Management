import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const EditMenu = ({editFn, delFn, index}) => {
  return (
    <Dropdown upward direction="left" floating pointing="left" className="link item" >
      <Dropdown.Menu>
        <Dropdown.Item index={index} onClick={ editFn }>Edit</Dropdown.Item>
        <Dropdown.Item onClick={ delFn }>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown >
  )
}

export default EditMenu;