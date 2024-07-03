import React, { useContext } from "react";
import { Layout, Spin } from "antd";
import { AppHeader } from "./AppHeader";
import { AppSider } from "./AppSider";
import { AppContent } from "./AppContent";
import { AppFooter } from "./AppFooter";
import CryptoContext from "../../context/crypto-context";

export const AppLayout = () => {
  const { loading } = useContext(CryptoContext);

  if (loading) {
    return <Spin size='large' fullscreen />;
  }

  return (
    <Layout>
      <AppHeader />

      <Layout>
        <AppSider />
        <AppContent />
      </Layout>

      <AppFooter />
    </Layout>
  );
};
