import React, { useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import CryptoContext, { CryptoContextType } from "../context/crypto-context";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PorfolioChart: React.FC = () => {
  const { assets } = useContext<CryptoContextType>(CryptoContext);

  const data = {
    labels: assets.map((asset) => asset.name),
    datasets: [
      {
        label: "$",
        data: assets.map((asset) => asset.totalAmount),
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };

  return (
    <div style={{ width: 400, height: 400, display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
      <Pie data={data} />
    </div>
  );
};