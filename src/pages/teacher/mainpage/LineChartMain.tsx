import React from 'react';
import LineChart from '../../../components/charts/LineChart';
import { Col } from 'antd';
import moment from 'moment';

interface Subject {
  name: string;
  id: number;
}

interface Test {
  subjectId: number;
  result: number;
  at: string;
}

interface IProps {
  tests: Test[];
  subjects: Subject[];
}

export default function LineChartMain(props: IProps) {
  // https://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript
  const testDates = props.tests.map((test) => moment(test.at).format('ll'));
  const reducedTests = testDates.reduce(function (prev, cur) {
    prev[cur] = (prev[cur] || 0) + 1;
    return prev;
  }, {});
  const labels = Object.keys(reducedTests);
  const data: number[] = Object.values(reducedTests);

  return (
    <Col style={{ width: 450, paddingBottom: 80 }}>
      <LineChart
        data={data}
        color="#B81D9D"
        title={'TESTS OVER TIME'}
        labels={labels}
        max={Math.max(...data)}
      />
    </Col>
  );
}
