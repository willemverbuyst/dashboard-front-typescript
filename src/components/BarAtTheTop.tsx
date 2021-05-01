import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { selectStudentName } from '../store/student/selectors';
import { selectTeacherName } from '../store/teacher/selectors';
import { Layout } from 'antd';
import { renderDate } from '../helpers/date.functions';

const { Header } = Layout;

const BarAtTheTop = (): ReactElement => {
  const student = useSelector(selectStudentName);
  const teacher = useSelector(selectTeacherName);

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '8vh',
    color: '#fff',
  };

  const linkStyle = {
    color: '#fff',
    fontFamily: 'Sriracha',
    fontSize: '2rem',
    transform: 'rotate(-5deg)',
  };

  const renderLoginLogout = (): ReactElement =>
    student || teacher ? <LogoutButton /> : <LoginButton />;

  const renderWelcome = (): ReactElement | null =>
    student ? (
      <div>Welcome {student}!</div>
    ) : teacher ? (
      <div>Welcome {teacher}!</div>
    ) : null;

  return (
    <Header style={headerStyle}>
      <Link style={linkStyle} to="/">
        Dashboard
      </Link>
      {renderDate()}
      {renderWelcome()}
      {renderLoginLogout()}
    </Header>
  );
};

export default BarAtTheTop;
