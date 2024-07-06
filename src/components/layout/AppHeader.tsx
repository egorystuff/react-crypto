import React, { useContext, useEffect, useState } from "react";
import { Button, Drawer, Modal, Select, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import CryptoContext, { CryptoContextType } from "../../context/crypto-context";
import { CoinInfoModal } from "../CoinInfoModal";
import { AddAssetForm } from "../AddAssetForm";
import { CryptoType } from "../../data";

// -------------------------------------------------------------------------------------------

const headerStyle: React.CSSProperties = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

// -------------------------------------------------------------------------------------------

export const AppHeader: React.FC = () => {
  const { crypto } = useContext<CryptoContextType>(CryptoContext);

  const [select, setSelect] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [coin, setCoin] = useState<CryptoType | null>(null);
  const [drawer, setDrawer] = useState<boolean>(true);

  useEffect(() => {
    const keypress = (e: KeyboardEvent) => {
      if (e.key === "/") setSelect((prev) => !prev);
    }; //
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);

  const handleSelect = (value: string) => {
    setCoin(crypto.find((coin) => coin.id === value));
    setModal(true);
  };

  return (
    <Header style={headerStyle}>
      <Select
        open={select}
        style={{ width: "250px" }}
        value='press / to open'
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img style={{ width: 20, height: 20 }} src={option.data.icon} alt={option.data.label} />
            {option.data.label}
          </Space>
        )}
      />

      <Button type='primary' onClick={() => setDrawer(true)}>
        Primary Button
      </Button>

      <Modal open={modal} onOk={() => setModal(false)} onCancel={() => setModal(false)}>
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer title='Basic Drawer' onClose={() => setDrawer(false)} open={drawer} destroyOnClose>
        <AddAssetForm />
      </Drawer>
    </Header>
  );
};
