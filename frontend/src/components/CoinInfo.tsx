import React from "react";
import { Flex, Typography } from "antd";
import { CryptoType } from "../data";

interface Props {
  coin: CryptoType | null;
}

export const CoinInfo: React.FC<Props> = ({ coin }) => {
  return (
    <Flex align='center'>
      <img style={{ width: 40, height: 40, marginRight: 10 }} src={coin?.icon} alt={coin?.name} />
      <Typography.Title style={{ margin: 0 }} level={2}>
        ({coin?.symbol}) {coin?.name}
      </Typography.Title>
    </Flex>
  );
};
