import React, { useContext, useState } from "react";
import { Button, DatePicker, Divider, Form, FormProps, InputNumber, Result, Select, Space } from "antd";
import { CryptoType } from "../data";
import CryptoContext, { CryptoContextType } from "../context/crypto-context";
import { CoinInfo } from "./CoinInfo";

// -------------------------------------------------------------------------------------------

type FieldType = {
  id: string;
  amount: number;
  price: number;
  date: Date;
};

// -------------------------------------------------------------------------------------------

export const AddAssetForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { crypto, addAssets } = useContext<CryptoContextType>(CryptoContext);
  const [coin, setCoin] = useState<CryptoType | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [form] = Form.useForm();
  const assetRef = React.useRef<{ id: string; amount: number; price: number; date: Date } | null>(null);

  const validateMessages = {
    required: "${label} is required!",
    types: { number: "${label} is not a valid number!" },
    number: { range: "${label} must be between ${min} and ${max}" },
  };

  // -------------------------------------------------------------------------------------------

  if (submitted) {
    return (
      <Result
        status='success'
        title='New Asset Added'
        subTitle={`Added ${assetRef.current?.amount} of ${coin?.name} by price of ${assetRef.current?.price} $`}
        extra={[
          <Button type='primary' key='close' onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }

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
    setSubmitted(true);
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: new Date(),
    };
    assetRef.current = newAsset;
    addAssets(newAsset);
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 10 }}
      style={{ maxWidth: 600 }}
      initialValues={{ price: +coin.price.toFixed(2) }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      validateMessages={validateMessages}>
      <CoinInfo coin={coin} />

      <Divider />

      <Form.Item label='Amount' name='amount' rules={[{ required: true, type: "number", min: 0 }]}>
        <InputNumber
          style={{ width: "100%" }}
          placeholder='Enter coin amount'
          onChange={(value) => form.setFieldsValue({ total: +(Number(value) * coin.price).toFixed(2) })}
        />
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
