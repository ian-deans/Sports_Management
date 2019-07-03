import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Panel } from '../index';

class ErrorBoundary extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError( error ) {
    console.log( 'Error Caught By ErrorBoundary component' );
    return { hasError: true, error }
  }

  componentDidCatch( error, info ) {
    console.log( "ComponentDidCatch() - error:\n", error );
    console.log( "ComponentDidCatch() - info:\n", info );
  }

  render() {
    if ( this.state.hasError ) {
      return (
        <Grid.Row>
          <Panel>
            <p> Error {`${ this.state.error }`} </p>
          </Panel>
        </Grid.Row>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;