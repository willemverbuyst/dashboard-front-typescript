import React, { ReactElement } from 'react';
import ScatterChart from '../../../components/charts/ScatterChart';
import { Col } from 'antd';
import moment from 'moment';
import { ITest } from '../../../models/test.models';
import { Coordinates } from '../../../models/charts.models';

interface IProps {
  tests: ITest[];
}

const ScatterChartMain: React.FC<IProps> = ({
  tests,
}: IProps): ReactElement => {
  const color: string[] = [];
  const data: Coordinates[] = [];
  tests.forEach(({ result, at }) => {
    color.push('#4BC0E7');
    data.push({ x: moment(at).format(), y: result });
  });

  return (
    <Col style={{ width: 450, paddingBottom: 80 }}>
      <ScatterChart
        data={data}
        color={color}
        title={
          'AT WHAT TIME OF THE DAY STUDENTS TAKE TESTS AND WHAT IS THEIR SCORE'
        }
      />
    </Col>
  );
};

export default ScatterChartMain;
