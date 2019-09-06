import React from "react";
import {
  DocumentFeed,
  QuickAddMenu,
  UpcomingPayments
} from "../../../components/account/home";
import { ProgramSearch } from "../../../components/account";
import "./Home.less";

const Home = () => {
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