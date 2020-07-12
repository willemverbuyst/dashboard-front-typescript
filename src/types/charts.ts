export type BarChartData = {
  labels: string[];
  datasets: BarChartDataSet;
};

export type BarChartDataSet = [
  {
    label: { display: boolean };
    data: number[];
    backgroundColor: string[];
    borderWidth: number;
  }
];
