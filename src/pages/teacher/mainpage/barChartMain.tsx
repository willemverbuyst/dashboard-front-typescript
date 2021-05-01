import React, { ReactElement } from 'react';
import BarChart from '../../../components/charts/BarChart';
import { Col } from 'antd';
import { IScore } from '../../../models/test.models';
import { ISubject } from '../../../models/subject.models';

interface IProps {
  scores: IScore[];
  subjects: ISubject[];
}

const BarChartMain: React.FC<IProps> = ({
  scores,
  subjects,
}: IProps): ReactElement => {
  const data = scores.map(({ result }) => result);
  const color = [];
  for (let i = 0; i < data.length; i++) color.push('#FF5C84');
  const labels = subjects.map(({ name }) => name);

  return (
    <Col style={{ width: 450, paddingBottom: 80 }}>
      <BarChart
        data={data}
        color={color}
        labels={labels}
        title={`AVERAGES PER SUBJECT`}
        max={100}
      />
    </Col>
  );
};

export default BarChartMain;
