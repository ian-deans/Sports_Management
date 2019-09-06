import React from "react";
import { Panel } from "../../../../components/common";
import { LegalRepresentativeContainer } from "./LegalRepresentativeForm/LegalRepresentativeContainer";
import "./LegalRepresentativeStation.less";

const LegalRepresentativeStation = () => {
  return (
    <div className="station-legal-representative">
      <Panel.Group>
        <Panel.Header text={ "Legal Representative" } />
        <Panel.Item className="station-container">
          <div className="form-container-legal-representative">
            <LegalRepresentativeContainer />
          </div>
        </Panel.Item>

      </Panel.Group>

    </div>
  );
};

export default LegalRepresentativeStation;