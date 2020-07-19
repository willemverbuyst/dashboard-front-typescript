import React from 'react';
import { Polar } from 'react-chartjs-2';
import { InputPolarChart } from '../../types/modelsCharts';

export default function PolarChart({
  labels,
  color,
  data,
  title,
}: InputPolarChart) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: '',
        data: data,
        backgroundColor: color,
        borderWidth: 4,
      },
    ],
  };

  return (
    <Polar
      data={chartData}
      options={{
        tooltips: { enabled: false },
        legend: {
          display: true,
          position: 'bottom',
          labels: { fontSize: 12 },
        },
        responsive: true,
        title: { text: title, display: true, padding: 15, fontSize: 14 },
        scale: {
          display: false,
        },
      }}
    />
  );
}
