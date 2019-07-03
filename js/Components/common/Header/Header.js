import React from 'react';
import { Header as SHeader } from 'semantic-ui-react';

const Header = props => {
  const { as, className, ...restProps } = props;
  // const classnames = className ? className : '';
  // const renderAs = as ? as : 'h3';

  return (
    <SHeader as={ as } className={ `cinch-header ${ className }` } {...restProps}>
      { props.children }
    </SHeader> )
}

Header.defaultProps = {
  as: 'h3',
  className: '',

};

export default Header;