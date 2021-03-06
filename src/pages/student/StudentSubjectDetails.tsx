import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import BarChart from '../../components/charts/BarChart';
import DoughnutChart from '../../components/charts/DoughnutChart';
import {
  selectStudentId,
  selectStudentSubjects,
  selectStudentToken,
} from '../../store/student/selectors';
import { getResultsForSubject } from '../../store/subjectDetailsStudent/actions';
import { selectDetailsForSubject } from '../../store/subjectDetailsStudent/selectors';
import { Layout, Button, Row, Col, Radio } from 'antd';

const { Content } = Layout;

export default function StudentSubjectDetails() {
  const dispatch = useDispatch();
  const { subjectid } = useParams<{ subjectid: string }>();
  const history = useHistory();
  const token = useSelector(selectStudentToken);
  const studentId = useSelector(selectStudentId);
  const results = useSelector(selectDetailsForSubject);
  const subjects = useSelector(selectStudentSubjects);
  const [radio, setRadio] = useState('date');

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  useEffect(() => {
    dispatch(getResultsForSubject(Number(subjectid)));
  }, [dispatch, subjectid]);

  const goTo = (goto: string) => {
    history.push(goto);
  };

  const renderAmount = () => {
    if (subjects && results) {
      return (
        <Col
          style={{
            width: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 60,
          }}
        >
          <div style={{ fontSize: '1.4rem' }}>You have done</div>
          <div style={{ fontSize: '4rem', fontWeight: 'bold' }}>
            {results.length}
          </div>
          <div style={{ fontSize: '1.4rem' }}>tests so far</div>
        </Col>
      );
    }
  };

  const renderAverage = () => {
    if (subjects && results) {
      const data = results.map(({ result }) => result);
      const average = Math.round(
        (data.reduce((a, b) => a + b, 0) / (data.length * 3)) * 100
      );
      const color = ['#A026FF', '#eee'];
      return average ? (
        <Col style={{ width: 450, paddingBottom: 60 }}>
          <DoughnutChart
            color={color}
            data={[average, 100 - average]}
            title={`YOUR AVERAGE IS ${average}%`}
          />
        </Col>
      ) : null;
    }
  };

  const renderTestButton = () => {
    if (subjects && results) {
      return (
        <Col
          style={{
            width: 300,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 60,
          }}
        >
          <Button
            shape="circle"
            onClick={() =>
              goTo(`/students/${studentId}/subjects/${subjectid}/test`)
            }
            style={{
              height: 120,
              width: 120,
              border: '2px solid #B81D9D',
              color: '#B81D9D',
              fontSize: '1.4rem',
            }}
          >
            Take a test
          </Button>
        </Col>
      );
    }
  };

  const renderBarChart = () => {
    if (subjects && results) {
      const subject = subjects.filter(
        (subject) => subject.id === Number(subjectid)
      )[0].name;

      const sortedData =
        radio === 'date'
          ? results.sort(
              (a, b) => new Date(a.at).valueOf() - new Date(b.at).valueOf()
            )
          : radio === 'lowestFirst'
          ? results.sort((a, b) => a.result - b.result)
          : radio === 'highestFirst'
          ? results.sort((a, b) => b.result - a.result)
          : results;

      const barData = sortedData.map(({ result }) => result);
      const barColor = results.map(() => 'rgb(255, 99, 132)');
      const barLabels = results.map(({ at }) => moment(at).format('MMM Do YY'));

      return (
        <>
          <Row justify="center">
            <Col style={{ width: 650 }}>
              <BarChart
                data={barData}
                color={barColor}
                labels={barLabels}
                title={`RESULTS FOR YOUR ${subject.toUpperCase()} TESTS`}
                max={3}
              />
            </Col>
          </Row>
          <Row style={{ paddingTop: 15 }} justify="center">
            <Radio.Group
              size="small"
              onChange={(e) => setRadio(e.target.value)}
            >
              <Radio.Button style={{ marginRight: 5 }} value="date">
                Scores by date
              </Radio.Button>
              <Radio.Button style={{ marginRight: 5 }} value="lowestFirst">
                Scores Low to High
              </Radio.Button>
              <Radio.Button style={{ marginRight: 5 }} value="highestFirst">
                Scores High to Low
              </Radio.Button>
            </Radio.Group>
          </Row>
        </>
      );
    }
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          <Row justify="space-around">
            {renderAmount()}
            {renderAverage()}
            {renderTestButton()}
          </Row>
          {renderBarChart()}
        </Content>
      </Layout>
    </Layout>
  );
}
