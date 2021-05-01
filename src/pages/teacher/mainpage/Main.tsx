import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BarChart from '../../../components/charts/BarChart';
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
import { Layout, Row, Col } from 'antd';
import LineChartMain from './LineChartMain';
import PieChartMain from './PieChartMain';
import ScatterChartMain from './ScatterChartMain';

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

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          {tests && subjects ? (
            <>
              <Row justify="space-around">
                {renderChartsMain()}
                <PieChartMain tests={tests} />
              </Row>
              <Row justify="space-around">
                <LineChartMain tests={tests} />
                <ScatterChartMain tests={tests} />
              </Row>
            </>
          ) : null}
        </Content>
      </Layout>
    </Layout>
  );
}
