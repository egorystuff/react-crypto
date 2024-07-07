import React, { useContext } from "react";
import { Layout, Spin } from "antd";
import { AppHeader } from "./AppHeader";
import { AppSider } from "./AppSider";
import { AppContent } from "./AppContent";
import { AppFooter } from "./AppFooter";
import CryptoContext from "../../context/crypto-context";

const layoutStyle: React.CSSProperties = {
  display: "flex",
};

export const AppLayout: React.FC = () => {
  const { loading } = useContext(CryptoContext);

  if (loading) {
    return <Spin size='large' fullscreen />;
  }

  return (
    <Layout>
      <AppHeader />

      <Layout style={layoutStyle}>
        <AppSider />
        <AppContent />
      </Layout>

      <AppFooter />
    </Layout>
  );
};
