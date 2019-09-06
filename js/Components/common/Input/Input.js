import React from "react";
import { Input as SInput } from "semantic-ui-react";

import { containsOnlyNumbers } from "../../../helpers/string";

class Input extends React.Component {

  render() {
    const cssClasses = "cinch-input " + ( this.props.className ? this.props.className : "" );
    return (
      <SInput
        { ...this.props }
        className={ cssClasses }
      />
    );
  }

  static ZipCode( props ) {
    const cssClasses = "cinch-input zipcode " + ( props.className ? props.className : "" );

    const handleChange = ( event, data ) => {
      if ( _isValidZipCode( data.value ) ) {
        props.onChange( event, data );
      }
    };

    return (
      <SInput
        { ...props }
        className={ cssClasses }
        onChange={ handleChange }
      />
    );
  }
}

const _lenghtOfSixOrLess = value => ( value.length < 6 );

const _isValidZipCode = value =>
  ( containsOnlyNumbers( value ) && _lenghtOfSixOrLess( value ) );


export default Input;