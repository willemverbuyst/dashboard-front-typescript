import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStudent } from '../store/student/actions';
import { Layout, Form, Input, Button, Radio, Row, Col } from 'antd';

const { Content } = Layout;

export default function Login() {
  const dispatch = useDispatch();
  // type InputEvent = React.ChangeEvent<HTMLInputElement>;
  type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

  // update = (e: InputEvent): void => this.props.login[e.target.name] = e.target.value;

  const history = useHistory();
  const [status, setStatus] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const studentId: number | undefined = undefined;
  const teacherId: number | undefined = undefined;

  useEffect(() => {
    if (studentId) {
      history.push(`/students/${studentId}`);
    }
    if (teacherId) {
      history.push(`/teachers/${teacherId}`);
    }
  }, [studentId, teacherId, history]);

  const submitForm = (e: ButtonEvent): void => {
    e.preventDefault();
    console.log('submit form');
    dispatch(loginStudent(email, password, status));
  };

  return (
    <Layout style={{ padding: '24px', height: '92vh' }}>
      <Content className="site-layout-background" style={{ padding: 90 }}>
        <Row justify="center">
          <Col style={{ width: 350 }}>
            <Form name="basic" initialValues={{ remember: true }}>
              <Form.Item>
                <Radio.Group
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <Radio value={1}>Student</Radio>
                  <Radio value={2}>Teacher</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="Email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                ]}
              >
                <Input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              <Form.Item>
                <Link style={{ color: '#FF2694' }} to="/signup">
                  Click here to sign up
                </Link>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={submitForm}
                  style={{ backgroundColor: '#B81D9D', border: 'none' }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
