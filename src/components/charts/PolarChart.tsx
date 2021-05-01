import React, { ReactElement } from 'react';
import { Polar } from 'react-chartjs-2';
import { InputPolarChart } from '../../models/charts.models';

const PolarChart: React.FC<InputPolarChart> = ({
  labels,
  color,
  data,
  title,
}: InputPolarChart): ReactElement => {
  const chartData = {
    labels: labels,
    datasets: [
      {
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
};

export default PolarChart;
