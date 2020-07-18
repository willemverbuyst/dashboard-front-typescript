import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectStudentToken } from '../../store/student/selectors';
import { Layout } from 'antd';

const { Content } = Layout;

export default function StudentMain() {
  const history = useHistory();
  const token = useSelector(selectStudentToken);

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">Student main</Content>
      </Layout>
    </Layout>
  );
}
