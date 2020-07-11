import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import BarAtTheTop from './components/BarAtTheTop';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

function App() {
  return (
    <Layout>
      <BarAtTheTop />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </Layout>
  );
}

export default App;
