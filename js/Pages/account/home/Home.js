import React from "react";
import {
  DocumentFeed,
  QuickAddMenu,
  UpcomingPayments
} from "../../../Components/account/home";
import { ProgramSearch } from "../../../Components/account";

const Home = ({location: {pathname}, history: {push} }) => {
  return (
    <div className="page account-home">
      <div className="area-quick-add">
        <QuickAddMenu />
      </div>

      <div className="area-program-search">
        <ProgramSearch />
      </div>

      <div className="area-document-feed">
        <DocumentFeed />
      </div>

      <div className="area-financial-feed">
        <UpcomingPayments />
      </div>
    </div>
  );
};


export default Home;
