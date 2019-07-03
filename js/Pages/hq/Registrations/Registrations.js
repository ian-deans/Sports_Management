import React from 'react';
import { Grid } from 'semantic-ui-react';
import RegistrationsTable from "../../../Components/hq/registrations/RegistrationsTable";


const Registrations = props => {
  return (
    <Grid.Row>
      <RegistrationsTable />
    </Grid.Row>
  )
};

export default Registrations;
