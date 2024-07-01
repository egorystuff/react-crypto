import React, { useEffect, useState } from "react";
import Sider from "antd/es/layout/Sider";
import { Card, List, Space, Spin, Statistic, Typography } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { fakeFetchCryptoData, fetchAssets } from "../../api";
import { CryptoAssetsData, CryptoType } from "../../data";
import { percentDifference } from "../../utils";

// -------------------------------------------------------------------------------------------

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#001529",
};

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

// -------------------------------------------------------------------------------------------

export const AppSider = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [crypto, setCrypto] = useState<CryptoType[]>([]);
  const [assets, setAssets] = useState<CryptoAssetsData[]>([]);

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchCryptoData();
      const assets = await fetchAssets();

      setAssets(
        assets.map((asset) => {
          const coin = result.find((c) => c.id === asset.id);

          return {
            grow: asset.price < (coin?.price ?? 0),
            growPercent: percentDifference(coin?.price ?? 0, asset.price),
            totalAmount: asset.amount * (coin?.price ?? 0),
            totalProfit: asset.amount * (asset.price - (coin?.price ?? 0) - asset.amount * asset.price),
            ...asset,
          };
        }),
      );

      setCrypto(result);

      setLoading(false);
    }

    preload();
  }, []);

  // -------------------------------------------------------------------------------------------

  if (loading) {
    return <Spin size='large' fullscreen />;
  }

  return (
    <Sider width='25%' style={siderStyle}>
      <Space direction='vertical' size={16}>
        {assets.map((asset) => (
          <Card key={asset.id} title='Default size card' extra={<a href='#'>More</a>} style={{ width: 350 }}>
            <Statistic
              title='Active'
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix='%'
            />

            <List
              size='small'
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text mark>[ITEM]</Typography.Text> {item}
                </List.Item>
              )}
            />
          </Card>
        ))}

        {/* <Card title='Default size card' extra={<a href='#'>More</a>} style={{ width: 300 }}>
          <Statistic
            title='Idle'
            value={9.3}
            precision={2}
            valueStyle={{ color: "#cf1322" }}
            prefix={<ArrowDownOutlined />}
            suffix='%'
          />
        </Card> */}
      </Space>
    </Sider>
  );
};
