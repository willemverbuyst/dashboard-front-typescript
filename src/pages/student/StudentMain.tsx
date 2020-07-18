import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectStudentToken,
  selectStudentSubjects,
} from '../../store/student/selectors';
import { getResultsForStudentMain } from '../../store/overviewStudent/actions';
import { selectOverviewStudent } from '../../store/overviewStudent/selectors';
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
    console.log(results);
    return <p>success</p>;
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
