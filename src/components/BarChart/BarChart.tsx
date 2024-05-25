"use client";
import React from "react";
import styles from "./styles.module.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  Title,
  Tooltip,
  BarElement,
  Colors,
  LinearScale,
  ChartOptions,
  BarControllerChartOptions,
  ChartData,
  plugins,
} from "chart.js";

const BarChart: React.FC<{
  data: { label: string; value: number }[];
  title: string;
}> = ({ data: arrayData, title, ...props }) => {
  ChartJS.register(CategoryScale, BarElement, LinearScale, Colors, Title, Tooltip);

  const options = {
    scales: {
      x: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 20,
        },
      },
    },
  };

  const data: ChartData<"bar", (number | [number, number] | null)[], unknown> = {
    labels: arrayData.map((item) => item.label),
    datasets: [
      {
        data: arrayData.map((item) => item.value),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };
  return (
    <div>
      <Bar options={options} title={title} data={data} />
    </div>
  );
};
export default BarChart;
