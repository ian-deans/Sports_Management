import React from "react";
import { Grid } from "semantic-ui-react";
import RegistrationsTable from "../../../components/hq/registrations/RegistrationsTable";


const Registrations = () => {
  return (
    <Grid.Row>
      <RegistrationsTable />
    </Grid.Row>
  );
};

export default Registrations;
