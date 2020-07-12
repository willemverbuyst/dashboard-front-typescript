import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import BarAtTheTop from './components/BarAtTheTop';
import Sidebar from './components/Sidebar';
import StudentMainPage from './pages/student/StudentMain';
import TeacherMainPage from './pages/teacher/TeacherMain';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

function App() {
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
        </Switch>
      </Layout>
    </>
  );
}

export default App;
