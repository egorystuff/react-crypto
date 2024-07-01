import React from "react";
import { Content } from "antd/es/layout/layout";

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};

export const AppContent = () => {
  return <Content style={contentStyle}>Content</Content>;
};
