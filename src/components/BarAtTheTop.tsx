import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Layout } from 'antd';

const { Header } = Layout;

const renderDate = () => {
  return moment().format('MMMM Do YYYY, dddd');
};

export default function BarAtTheTop() {
  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '8vh',
        color: '#fff',
      }}
    >
      <Link
        style={{
          color: '#fff',
          fontFamily: 'Sriracha',
          fontSize: '2rem',
          transform: 'rotate(-5deg)',
        }}
        to="/"
      >
        Dashboard
      </Link>
      {renderDate()}
    </Header>
  );
}
