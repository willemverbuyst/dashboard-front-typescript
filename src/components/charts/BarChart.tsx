import React from 'react';
import { Bar } from 'react-chartjs-2';
import { InputBarChart } from '../../types/charts-models';

export default function BarChart({
  labels,
  data,
  color,
  title,
  max,
}: InputBarChart) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: color,
        borderWidth: 0,
      },
    ],
  };

  return (
    <Bar
      data={chartData}
      options={{
        tooltips: { enabled: false },
        legend: {
          display: false,
        },
        responsive: true,
        title: { text: title, display: true, padding: 15, fontSize: 14 },
        scales: {
          yAxes: [
            {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10,
                beginAtZero: true,
                stepSize: 1,
                suggestedMax: max,
              },
              gridLines: {
                display: false,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      }}
    />
  );
}
