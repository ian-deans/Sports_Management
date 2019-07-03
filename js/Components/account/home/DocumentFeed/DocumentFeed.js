import React from "react";
import { Panel, Placeholder } from "../../../common";
import DocumentListItem from "./DocumentListItem";

const NewDocuments = ({documents = []}) => {
  const items = documents.length > 0 
    ? documents.map((document, i) => (
      <DocumentListItem {...document} key={i} />
    ))
    : <Placeholder message="No new documents" /> 

  return (
    <Panel.Group className="new-documents-feed">
      <Panel.Header text="New Documents" />
      {items}
    </Panel.Group>
  );
}

export default NewDocuments;

//TODO: Add modal to Account component and give triggering function as props.
