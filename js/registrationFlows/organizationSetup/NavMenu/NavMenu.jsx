import React from "react";
import { Icon, Step } from "semantic-ui-react";

const StepIcon = () => ( <Icon name="dot circle outline" color="red" /> );

const NavMenu = ( { current, setStation, stationNames } ) => (
  <Step.Group
    size="tiny"
    fluid
    vertical
  >
    {
      stationNames.map( ( title, i ) => {
        return (
          <Step
            key={ i }
            link
            active={ current === i }
            onClick={ () => setStation( i ) }
          >
            <StepIcon />
            <Step.Content>
              <Step.Title>{ title }</Step.Title>
            </Step.Content>
          </Step>
        );
      } )
    }
  </Step.Group>
);

export default NavMenu;


// function _title( pathname ) {
//   return pathname
//     .split( "-" )
//     .map( word => word.charAt( 0 ).toUpperCase() + word.slice( 1 ) )
//     .join( " " );
// }