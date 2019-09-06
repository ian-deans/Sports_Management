import React from "react";
import { EmergencyContactsTable, GeneralInfo, MembersTable, Notes } from "../../../components/hq/households";

const Family = () => {

  return (
    <div className="page hq-family-info">
      <div className="area-info">
        <GeneralInfo />
      </div>
      <div className="area-notes">
        <Notes />
      </div>
      <div className="area-members">
        <MembersTable />
      </div>
      <div className="area-contacts">
        <EmergencyContactsTable />
      </div>
    </div>
  );
};

export default Family;