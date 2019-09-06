import React from "react";
import { Checkbox } from "semantic-ui-react";

//FIXME: Repeated style code, will eventually be phased out by theming and custon styling.

export const headerBarStyle = {
  display: "flex",
  justifyContent: "space-between",
};

export const columnNames = [
  <Checkbox />,
  "Document",
  "Player",
  "Organization",
  "Date",
  "View File"
];