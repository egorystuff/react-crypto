import React, { useContext, useState } from "react";
import { Button, DatePicker, Divider, Flex, Form, FormProps, InputNumber, Select, Space, Typography } from "antd";
import { CryptoType } from "../data";
import CryptoContext, { CryptoContextType } from "../context/crypto-context";

// -------------------------------------------------------------------------------------------

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

// -------------------------------------------------------------------------------------------

export const AddAssetForm: React.FunctionComponent = () => {
  const { crypto } = useContext<CryptoContextType>(CryptoContext);
  const [coin, setCoin] = useState<CryptoType | null>(null);

  // -------------------------------------------------------------------------------------------

  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        placeholder='Select coin'
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
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
    );
  }

  // -------------------------------------------------------------------------------------------

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 10 }}
      style={{ maxWidth: 600 }}
      initialValues={{}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}>
      <Flex align='center'>
        <img style={{ width: 40, height: 40, marginRight: 10 }} src={coin?.icon} alt={coin?.name} />
        <Typography.Title style={{ margin: 0 }} level={2}>
          ({coin?.symbol}) {coin?.name}
        </Typography.Title>
      </Flex>

      <Divider />

      <Form.Item
        label='Amount'
        name='amount'
        rules={[{ required: true, type: "number", min: 0, message: "Please input your username!" }]}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label='Date & Time' name='date'>
        <DatePicker showTime />
      </Form.Item>

      <Form.Item label='Price' name='price'>
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label='Total' name='total'>
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType='submit'>
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
};
