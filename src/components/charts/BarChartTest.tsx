import React, { ReactElement } from 'react';
import { Bar } from 'react-chartjs-2';
import { InputBarChartTest } from '../../models/charts.models';

const BarChartTest: React.FC<InputBarChartTest> = ({
  labels,
  data,
  color,
  title,
}: InputBarChartTest): ReactElement => {
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
          labels: { fontSize: 16 },
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
                display: false,
                suggestedMax: 20,
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
};

export default BarChartTest;
