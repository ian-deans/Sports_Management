import React from "react";
import { Icon } from "semantic-ui-react";
import { Button, Header, Panel } from "../../../common";

const DocumentListItem = ( { name, size } ) => {
  return (
    <Panel.Item className="new-documents-item">
      <div className="document-details-container">
        <Icon
          size="big"
          name="file alternate outline"
          className="document-image"
        />
        <span className="document-details">
          <Header as="h5">{ name }</Header>
          <p>{ size }</p>
        </span>
      </div>
      <Button basic className="feed-item-button">
        ADD
      </Button>
    </Panel.Item>
  );
};

export default DocumentListItem;
