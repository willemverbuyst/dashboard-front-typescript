import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectStudentToken } from '../../store/student/selectors';
import { getResultsForStudentMain } from '../../store/overviewStudent/actions';
import { selectOverviewStudent } from '../../store/overviewStudent/selectors';
import { Layout } from 'antd';

const { Content } = Layout;

export default function StudentMain() {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(selectStudentToken);
  const results = useSelector(selectOverviewStudent);

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  useEffect(() => {
    dispatch(getResultsForStudentMain());
  }, [dispatch]);

  console.log(results);

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">Student main</Content>
      </Layout>
    </Layout>
  );
}
