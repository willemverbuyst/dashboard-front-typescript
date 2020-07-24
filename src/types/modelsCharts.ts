export type InputBarChart = {
  labels: string[];
  data: number[];
  color: string[];
  title: string;
  max: number;
};

export type InputDoughnutChart = {
  data: number[];
  color: string[];
  title: string;
};

export type InputPolarChart = {
  labels: string[];
  data: number[];
  color: string[];
  title: string;
};

export type InputBarChartTest = {
  labels: string[];
  data: number[];
  color: string[];
  title: string;
  max: number;
};

export type InputLineChart = {
  labels: string[];
  data: number[];
  color: string[];
  title: string;
  max: number;
};

export type InputPieChart = {
  labels: string[];
  data: number[];
  color: string[];
  title: string;
};

export type InputScatterChart = {
  data: Coordinates[];
  color: string[];
  title: string;
};

export type Coordinates = {
  x: string;
  y: number;
};
