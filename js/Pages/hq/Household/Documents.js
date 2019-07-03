import React from 'react';
import { Grid } from 'semantic-ui-react';
import DocumentsTable from "../../../Components/hq/households/DocumentsTable";

const Documents = props => {

  return (
    <div className="page hq-family-documents">
      <DocumentsTable />
    </div>
  );
};

export default Documents;