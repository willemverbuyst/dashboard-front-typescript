import React, { ReactElement } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { InputDoughnutChart } from '../../models/charts.models';

const DoughnutChart: React.FC<InputDoughnutChart> = ({
  data,
  color,
  title = '',
}: InputDoughnutChart): ReactElement => {
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
};

export default DoughnutChart;
