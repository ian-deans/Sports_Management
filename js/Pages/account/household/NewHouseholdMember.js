import React from "react";
import { NewHouseholdMemberForm } from "../../../components/account/household";

const NewHouseholdMember = () => {
  return (
    <div className="page account-new-household-member">
      <div className="area-new-household-member-form">
        <NewHouseholdMemberForm />
      </div>
    </div>
  );
};

export default NewHouseholdMember;