import React from 'react';
import { Button as SButton } from 'semantic-ui-react';

const Button = (props) => {
  const { className } = props;
  const classname = className ? className : '';

  return (
    <SButton { ...props } className={ `cinch-button ${ classname }` } >
      { props.children }
    </SButton>
  )
}

export default Button;