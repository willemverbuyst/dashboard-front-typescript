import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';
import BarAtTheTop from './components/barAtTheTop/BarAtTheTop';
import AlertBox from './components/AlertBox';
import Spinner from './components/Spinner';
import Sidebar from './components/Sidebar';
import { selectAppLoading } from './store/appState/selectors';
import { getStudentWithStoredToken } from './store/student/actions';
import { getTeacherWithStoredToken } from './store/teacher/actions';
import './App.css';
import './AppRouter';
import AppRouter from './AppRouter';

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getTeacherWithStoredToken());
    dispatch(getStudentWithStoredToken());
  }, [dispatch]);

  return (
    <>
      <BarAtTheTop />
      <AlertBox />
      <Layout>
        <Sidebar />
        {isLoading ? <Spinner /> : null}
        <AppRouter />
      </Layout>
    </>
  );
}

export default App;
