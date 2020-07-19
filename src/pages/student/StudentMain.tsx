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
import BarChart from '../../components/charts/BarChart';
import PolarChart from '../../components/charts/PolarChart';
import { Layout, Row, Col } from 'antd';

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
      const generalScore = Math.round(
        averages.reduce((a, b) => a + b * 1, 0) / averages.length
      );
      const subjectLabel = subjects && subjects.map((subject) => subject.name);

      const polarData = subjectSorted.map((subject) => subject.length);
      const polarLabels = subjects.map((subject) => subject.name);
      const polarColor = subjectSorted.map(
        (subject) =>
          '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
      );
      return results[0] ? (
        <>
          <Row justify="space-around">
            <Col style={{ width: 450, paddingBottom: 80 }}>
              {generalScore ? (
                <DoughnutChart
                  data={[generalScore, 100 - generalScore]}
                  color={['#8F1CB8', '#eee']}
                  title={`YOUR HAVE A GENERAL SCORE OF ${generalScore}%`}
                />
              ) : (
                <p>YOU DON'T HAVE ENOUGH DATA YET TO DISPLAY AVERAGE</p>
              )}
            </Col>
            <Col style={{ width: 450, paddingBottom: 80 }}>
              {
                <BarChart
                  data={averages}
                  labels={subjectLabel}
                  color={averages.map((average) => '#008080')}
                  title={'AVERAGE SCORE PER SUBJECT'}
                  max={100}
                />
              }
            </Col>
          </Row>
          <Row justify="center">
            <Col style={{ width: 650 }}>
              <PolarChart
                data={polarData}
                labels={polarLabels}
                color={polarColor}
                title={`You have done a total of ${
                  subjectSorted.flat().length
                } tests so far`.toUpperCase()}
              />
            </Col>
          </Row>
        </>
      ) : (
        <>No data yet</>
      );
    }
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
