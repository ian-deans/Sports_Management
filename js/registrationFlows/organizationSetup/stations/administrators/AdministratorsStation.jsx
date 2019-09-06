import React from "react";
import { Panel } from "../../../../components/common";
import { Button, Modal } from "semantic-ui-react";
import { AdministratorsTableContainer } from "./AdministratorsTable/AdministratorsTableContainer";
import { NewStaffFormContainer } from "./NewStaffForm/NewStaffFormContainer";
import "./AdministratorsStation.less";

const AdministratorsStation = () => {
  return (
    <div className="administrators-station">
      <Panel.Group>
        <Panel.Header className="flexbox justified-space-between" text={ "Administrators" }>
          <NewStaffModal>
            <NewStaffFormContainer />
          </NewStaffModal>
        </Panel.Header>
        <Panel.Item className="station-container">
          <AdministratorsTableContainer />
        </Panel.Item>
      </Panel.Group>
    </div>
  );
};

export default AdministratorsStation;

function NewStaffModal( props ) {
  return (
    <Modal trigger={ <Button color="black">Add New</Button> }>
      <Modal.Header>New Staff Member</Modal.Header>
      <Modal.Content>
        { props.children }
      </Modal.Content>
    </Modal>
  );
}