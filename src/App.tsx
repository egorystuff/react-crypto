import React from "react";
import { Layout } from "antd";
import { AppHeader } from "./components/layout/AppHeader";
import { AppSider } from "./components/layout/AppSider";
import { AppContent } from "./components/layout/AppContent";
import { AppFooter } from "./components/layout/AppFooter";

export default function App() {
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
}
