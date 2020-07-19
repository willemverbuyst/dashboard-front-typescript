import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import BarChart from '../../components/charts/BarChart';
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
  const { subjectid } = useParams();
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
    dispatch(getResultsForSubject(subjectid));
  }, [dispatch, subjectid]);

  const goTo = (goto: string) => {
    history.push(goto);
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
    } else {
      return null;
    }
  };

  const renderBarChart = () => {
    if (subjects && results) {
      const subject = subjects.filter(
        (subject) => subject.id === subjectid * 1
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
      const barColor = results.map((result) => 'rgb(255, 99, 132)');
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
    } else {
      return null;
    }
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          <Row justify="space-around">
            AMMOUNT OF TESTS
            <br /> AVERAGE
            {renderTestButton()}
          </Row>
          {renderBarChart()}
        </Content>
      </Layout>
    </Layout>
  );
}
