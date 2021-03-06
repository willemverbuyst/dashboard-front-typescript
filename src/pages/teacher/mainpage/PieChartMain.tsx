import React, { ReactElement } from 'react';
import PieChart from '../../../components/charts/PieChart';
import { Col } from 'antd';
import { ITest } from '../../../models/test.models';

interface IProps {
  tests: ITest[];
}

const PieChartMain: React.FC<IProps> = ({ tests }: IProps): ReactElement => {
  const reducedTests = tests.map((test) => test.result);
  const counts = { '0/3': 0, '1/3': 0, '2/3': 0, '3/3': 0 };
  reducedTests.forEach((num) => {
    counts[`${num}/3`] += 1;
  });

  return (
    <Col style={{ width: 450, paddingBottom: 80 }}>
      {tests.length ? (
        <PieChart
          data={Object.values(counts)}
          color={['#EEE', '#B81D9D', '#D222E1', '#8F1CB8']}
          title={'TESTS'}
          labels={Object.keys(counts)}
        />
      ) : (
        <p>THERE IS NOT ENOUGH DATA YET TO DISPLAY PIE CHART</p>
      )}
    </Col>
  );
};

export default PieChartMain;
