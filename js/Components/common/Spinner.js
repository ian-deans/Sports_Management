import React from 'react';
import { Dimmer, Image, Loader } from 'semantic-ui-react';

const Spinner = () => (
    <Dimmer active page>
      <Loader size="huge" content={"Loading..."} />
    </Dimmer>
)

export default Spinner;