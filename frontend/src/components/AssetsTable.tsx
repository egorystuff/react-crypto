import React, { useContext } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import CryptoContext, { CryptoContextType } from "../context/crypto-context";

interface DataType {
  key: React.Key;
  name: string;
  price: number;
  amount: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    showSorterTooltip: { target: "full-header" },
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Price, $",
    dataIndex: "price",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.amount - b.amount,
  },
];

export const AssetsTable: React.FC = () => {
  const { assets } = useContext<CryptoContextType>(CryptoContext);

  const data = assets.map((asset) => ({
    key: asset.id,
    name: asset.name,
    price: asset.price,
    amount: asset.amount,
  }));

  const onChange: TableProps<DataType>["onChange"] = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Table columns={columns} dataSource={data} onChange={onChange} showSorterTooltip={{ target: "sorter-icon" }} />
  );
};
