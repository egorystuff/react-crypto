import React, { useContext } from "react";
import Sider from "antd/es/layout/Sider";
import { Card, List, Space, Statistic, Tag, Typography } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { capitalize } from "../../utils";
import CryptoContext, { CryptoContextType } from "../../context/crypto-context";

// -------------------------------------------------------------------------------------------

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#001529",
};

// -------------------------------------------------------------------------------------------

export const AppSider: React.FC = () => {
  const { assets } = useContext<CryptoContextType>(CryptoContext);

  return (
    <Sider width='25%' style={siderStyle}>
      <Space direction='vertical' size={16}>
        {assets.map((asset) => (
          <Card key={asset.id} title='Default size card' extra={<a href='#'>More</a>} style={{ width: 350 }}>
            <Statistic
              title={capitalize(asset.id)}
              value={asset.totalAmount}
              precision={2}
              valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
              prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix='$'
            />

            <List
              size='small'
              dataSource={[
                { title: "Total Profit", value: asset.totalProfit, withTag: true },
                { title: "Asset Amount", value: asset.amount, isPlain: true },
                // { title: "Difference", value: asset.growPercent },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <span>{item.title}</span>
                  <span>
                    {item.withTag && <Tag color={asset.grow ? "green" : "red"}>{asset.growPercent}% </Tag>}
                    {item.isPlain ? item.value : null}
                    {!item.isPlain && (
                      <Typography.Text type={asset.grow ? "success" : "danger"}>
                        {item.value?.toFixed(2)} $
                      </Typography.Text>
                    )}
                  </span>
                </List.Item>
              )}
            />
          </Card>
        ))}
      </Space>
    </Sider>
  );
};
