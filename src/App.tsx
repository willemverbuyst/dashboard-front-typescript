import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Layout } from 'antd';
import BarAtTheTop from './components/BarAtTheTop';
import Sidebar from './components/Sidebar';
import Home from './pages/home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudentMainPage from './pages/student/StudentMain';
import TeacherMainPage from './pages/teacher/TeacherMain';
import ListOfQuestions from './pages/teacher/ListOfQuestions';
import { getStudentWithStoredToken } from './store/student/actions';
import { getTeacherWithStoredToken } from './store/teacher/actions';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeacherWithStoredToken());
    dispatch(getStudentWithStoredToken());
  }, [dispatch]);
  return (
    <>
      <BarAtTheTop />
      <Layout>
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route
            exact
            path="/students/:studentid"
            component={StudentMainPage}
          />
          <Route
            exact
            path="/teachers/:teacherid"
            component={TeacherMainPage}
          />
          <Route
            exact
            path="/teachers/:teacherid/questions/list"
            component={ListOfQuestions}
          />
        </Switch>
      </Layout>
    </>
  );
}

export default App;
