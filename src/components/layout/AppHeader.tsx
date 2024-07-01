import { Header } from "antd/es/layout/layout";
import React from "react";

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 60,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};

export const AppHeader = () => {
  return (
    <>
      <Header style={headerStyle}>Header</Header>
    </>
  );
};
