import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
  const results = useSelector(selectDetailsForSubject);
  const subjects = useSelector(selectStudentSubjects);

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  useEffect(() => {
    dispatch(getResultsForSubject(subjectid));
  }, [dispatch, subjectid]);

  console.log(results);

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          <Row justify="space-around">
            AMMOUNT OF TESTS
            <br /> AVERAGE
            <br /> TESTBUTTON
            <br />
          </Row>
          BARCHART
        </Content>
      </Layout>
    </Layout>
  );
}
