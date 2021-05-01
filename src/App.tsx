import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';
import BarAtTheTop from './components/BarAtTheTop';
import AlertBox from './components/AlertBox';
import Spinner from './components/Spinner';
import Sidebar from './components/Sidebar';
import Home from './pages/home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudentMainPage from './pages/student/StudentMain';
import StudentSubjectDetails from './pages/student/StudentSubjectDetails';
import StudentDoTest from './pages/student/StudentDoTest';
import TeacherMainPage from './pages/teacher/mainpage/Main';
import TeacherStudentDetails from './pages/teacher/TeacherStudentDetails';
import TeacherSubjectDetails from './pages/teacher/TeacherSubjectDetails';
import ListOfQuestions from './pages/teacher/ListOfQuestions';
import AddQuestionForm from './pages/teacher/AddQuestionForm';
import AddSubject from './pages/teacher/AddSubject';
import { selectAppLoading } from './store/appState/selectors';
import { getStudentWithStoredToken } from './store/student/actions';
import { getTeacherWithStoredToken } from './store/teacher/actions';
import './App.css';
import * as ROUTES from './constants/routes';

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
        <Switch>
          <Route exact path={ROUTES.HOME} component={Home} />
          <Route exact path={ROUTES.LOG_IN} component={Login} />
          <Route exact path={ROUTES.SIGN_UP} component={Signup} />
          <Route exact path={ROUTES.STUDENT_MAIN} component={StudentMainPage} />
          <Route
            exact
            path={ROUTES.STUDENT_SUBJECTS}
            component={StudentSubjectDetails}
          />
          <Route exact path={ROUTES.STUDENT_TEST} component={StudentDoTest} />
          <Route exact path={ROUTES.TEACHER_MAIN} component={TeacherMainPage} />
          <Route
            exact
            path={ROUTES.TEACHER_STUDENT}
            component={TeacherStudentDetails}
          />
          <Route
            exact
            path={ROUTES.TEACHER_SUBJECT}
            component={TeacherSubjectDetails}
          />
          <Route
            exact
            path={ROUTES.TEACHER_QUESTIONS_LIST}
            component={ListOfQuestions}
          />
          <Route
            exact
            path={ROUTES.TEACHER_QUESTION_ADD}
            component={AddQuestionForm}
          />
          <Route
            exact
            path={ROUTES.TEACHER_SUBJECT_ADD}
            component={AddSubject}
          />
        </Switch>
      </Layout>
    </>
  );
}

export default App;
