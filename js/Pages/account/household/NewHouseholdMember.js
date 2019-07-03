import React from "react";
import { NewHouseholdMemberForm } from "../../../Components/account/household"

const NewHouseholdMember = props => {
  return (
    <div className="page account-new-household-member">
      <div className="area-new-household-member-form">
        <NewHouseholdMemberForm />
      </div>
    </div>
  );
}

export default NewHouseholdMember;