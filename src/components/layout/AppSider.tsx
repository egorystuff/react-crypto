import React from "react";
import Sider from "antd/es/layout/Sider";

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#1677ff",
};

export const AppSider = () => {
  return (
    <Sider width='25%' style={siderStyle}>
      Sider
    </Sider>
  );
};
