import React from "react";

export const CoinInfoModal: React.FC<any> = ({ coin }) => {
  return <h2>{coin?.name}</h2>;
};
