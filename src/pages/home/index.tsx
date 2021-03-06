import React, { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectStudentId } from '../../store/student/selectors';
import { selectTeacherId } from '../../store/teacher/selectors';
import HomeBarChart from './BarChartHome';
import HomeLineChart from './LineChartHome';
import HomePolarChart from './PolarChartHome';
import { Layout, Row, Col } from 'antd';

const { Content } = Layout;

const Home = (): ReactElement => {
  const history = useHistory();
  const studentId = useSelector(selectStudentId);
  const teacherId = useSelector(selectTeacherId);

  useEffect(() => {
    if (studentId) {
      history.push(`/students/${studentId}`);
    }
    if (teacherId) {
      history.push(`/teachers/${teacherId}`);
    }
  });

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
          }}
        >
          <Row justify="space-around">
            <Col>
              <div style={{ width: '35vw', height: '35vh' }}>
                <HomeBarChart />
              </div>
            </Col>
          </Row>
          <Row justify="space-around">
            <Col>
              <div style={{ width: '35vw', height: '35vh' }}>
                <HomePolarChart />
              </div>
            </Col>
            <Col>
              <div style={{ width: '35vw', height: '35vh' }}>
                <HomeLineChart />
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
