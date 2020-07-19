import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectStudentToken,
  selectStudentSubjects,
} from '../../store/student/selectors';
import { getResultsForStudentMain } from '../../store/overviewStudent/actions';
import { selectOverviewStudent } from '../../store/overviewStudent/selectors';
import DoughnutChart from '../../components/charts/DoughnutChart';
import { Layout } from 'antd';

const { Content } = Layout;

export default function StudentMain() {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(selectStudentToken);
  const results = useSelector(selectOverviewStudent);
  const subjects = useSelector(selectStudentSubjects);

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  useEffect(() => {
    dispatch(getResultsForStudentMain());
  }, [dispatch]);

  const renderData = () => {
    if (results && subjects) {
      const subjectIds = subjects.map((subject) => subject.id);
      const subjectSorted = subjectIds.map((id) =>
        results.filter((result) => result.subject === id)
      );
      const averages = subjectSorted.map((subject) =>
        Math.round(
          (subject.reduce((a, b) => a + b.result * 1, 0) /
            (subject.length * 3)) *
            100
        )
      );
      console.log(results);
      return <p>{renderAverage(averages)}</p>;
    }
  };

  const renderAverage = (averages: number[]) => {
    const generalScore = Math.round(
      averages.reduce((a, b) => a + b * 1, 0) / averages.length
    );
    return generalScore ? (
      <DoughnutChart
        data={[generalScore, 100 - generalScore]}
        color={['#8F1CB8', '#eee']}
        title={`YOUR HAVE A GENERAL SCORE OF ${generalScore}%`}
      />
    ) : (
      <p>YOU DON'T HAVE ENOUGH DATA YET TO DISPLAY AVERAGE</p>
    );
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          {results && subjects ? renderData() : null}
        </Content>
      </Layout>
    </Layout>
  );
}
