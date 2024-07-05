import React from "react";
import { Divider, Flex, Tag, Typography } from "antd";

export const CoinInfoModal: React.FC<any> = ({ coin }) => {
  return (
    <>
      <Flex align='center'>
        <img style={{ width: 40, height: 40, marginRight: 10 }} src={coin?.icon} alt={coin?.name} />
        <Typography.Title style={{ margin: 0 }} level={2}>
          ({coin?.symbol}) {coin?.name}
        </Typography.Title>
      </Flex>

      <Divider />

      <Typography.Paragraph>
        <Typography.Text style={{ marginRight: 5 }} strong>
          1 hour:
        </Typography.Text>
        <Tag color={coin?.priceChange1h > 0 ? "green" : "red"}>{coin?.priceChange1h} %</Tag>

        <Typography.Text style={{ marginRight: 5 }} strong>
          1 day:
        </Typography.Text>
        <Tag color={coin?.priceChange1d > 0 ? "green" : "red"}>{coin?.priceChange1d} %</Tag>

        <Typography.Text style={{ marginRight: 5 }} strong>
          1 week:
        </Typography.Text>
        <Tag color={coin?.priceChange1w > 0 ? "green" : "red"}>{coin?.priceChange1w} %</Tag>
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text style={{ marginRight: 5 }} strong>
          Price:
        </Typography.Text>
        {coin?.price.toFixed(2)} $
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text style={{ marginRight: 5 }} strong>
          Price BTC:
        </Typography.Text>
        {coin?.priceBtc === 1 ? 1 : coin?.priceBtc.toFixed(10)} BTC
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text style={{ marginRight: 5 }} strong>
          Market Cap:
        </Typography.Text>
        {coin?.marketCap.toFixed(2)} $
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text style={{ marginRight: 5 }} strong>
          Contract Address:
        </Typography.Text>
        {coin?.contractAddress ?? "N/A"}
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text style={{ marginRight: 5 }} strong>
          Web Site:
        </Typography.Text>
        <Typography.Link href={coin?.websiteUrl} target='_blank'>
          {coin?.websiteUrl}
        </Typography.Link>
      </Typography.Paragraph>
    </>
  );
};
