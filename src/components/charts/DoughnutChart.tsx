import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { InputDoughnutChart } from '../../types/modelsCharts';

export default function DoughnutChart({
  data,
  color,
  title = '',
}: InputDoughnutChart) {
  const chartData = {
    datasets: [
      {
        data: data,
        backgroundColor: color,
        borderWidth: 0,
      },
    ],
  };

  return (
    <Doughnut
      data={chartData}
      options={{
        tooltips: { enabled: false },
        legend: {
          display: false,
        },
        responsive: true,
        title: { text: title, display: true, padding: 15, fontSize: 14 },
      }}
    />
  );
}
