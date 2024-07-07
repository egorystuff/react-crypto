import React, { useContext } from "react";
import { Content } from "antd/es/layout/layout";
import { Typography } from "antd";
import CryptoContext, { CryptoContextType } from "../../context/crypto-context";
import { PorfolioChart } from "../PorfolioChart";
import { AssetsTable } from "../AssetsTable";

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};

export const AppContent: React.FC = () => {
  const { assets, crypto } = useContext<CryptoContextType>(CryptoContext);

  const cryptoPriceMap = crypto.reduce((acc, coin) => {
    acc[coin.id] = coin.price;
    return acc;
  }, {});

  return (
    <Content style={contentStyle}>
      <Typography.Title level={3} style={{ color: "#fff", textAlign: "left" }}>
        Portfolio:{" "}
        {assets
          .map((asset) => cryptoPriceMap[asset.id] * asset.amount)
          .reduce((a, b) => a + b, 0)
          .toFixed(2)}
        $
      </Typography.Title>

      <PorfolioChart />
      <AssetsTable />
    </Content>
  );
};
