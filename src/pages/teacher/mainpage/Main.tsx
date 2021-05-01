import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import BarChart from '../../../components/charts/BarChart';
import PieChart from '../../../components/charts/PieChart';
import ScatterChart from '../../../components/charts/ScatterChart';
import LineChartMain from './LineChartMain';
import {
  selectTeacherToken,
  selectTeacherId,
  selectTeacherSubjects,
} from '../../../store/teacher/selectors';
import {
  selectMainOverview,
  selectMainOverviewScatter,
} from '../../../store/overviewTeacher/selectors';
import { getMainOverview } from '../../../store/overviewTeacher/actions';
import { Coordinates } from '../../../models/charts.models';
import { Layout, Row, Col } from 'antd';

const { Content } = Layout;

export default function TeacherMain() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectTeacherToken);
  const id = useSelector(selectTeacherId);
  const mainPageData = useSelector(selectMainOverview);
  const subjects = useSelector(selectTeacherSubjects);
  const tests = useSelector(selectMainOverviewScatter);

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  useEffect(() => {
    dispatch(getMainOverview(id));
  }, [dispatch, id]);

  const renderChartsMain = () => {
    if (mainPageData && subjects) {
      const data = mainPageData.map(({ result }) => result);
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
    } else {
      return <p>YOU DON'T HAVE ENOUGH DATA YET TO DISPLAY AVERAGE</p>;
    }
  };

  const renderPieChart = () => {
    if (tests && subjects) {
      const reducedTests = tests.map((test) => test.result);
      const counts = { '0/3': 0, '1/3': 0, '2/3': 0, '3/3': 0 };
      reducedTests.forEach((num) => {
        counts[`${num}/3`] += 1;
      });

      return (
        <Col style={{ width: 450, paddingBottom: 80 }}>
          <PieChart
            data={Object.values(counts)}
            color={['#EEE', '#B81D9D', '#D222E1', '#8F1CB8']}
            title={'TESTS'}
            labels={Object.keys(counts)}
          />
        </Col>
      );
    } else {
      return <p>YOU DON'T HAVE ENOUGH DATA YET TO DISPLAY TEST RATIO</p>;
    }
  };

  const renderScatterChart = () => {
    if (tests && subjects) {
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
    }
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          <Row justify="space-around">
            {renderChartsMain()}
            {renderPieChart()}
          </Row>
          <Row justify="space-around">
            {renderScatterChart()}
            {tests && subjects ? <LineChartMain tests={tests} /> : <></>}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
