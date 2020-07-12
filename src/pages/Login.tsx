import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStudent } from '../store/student/actions';
import { ButtonEvent, LoginCredentials } from '../types/model';
import { selectStudentId } from '../store/student/selectors';

import { Layout, Form, Input, Button, Radio, Row, Col } from 'antd';

const { Content } = Layout;

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
    status: 1,
  });

  const studentId = useSelector(selectStudentId);
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
    dispatch(loginStudent(loginCredentials));
    setLoginCredentials({
      email: '',
      password: '',
      status: 1,
    });
  };

  return (
    <Layout style={{ padding: '24px', height: '92vh' }}>
      <Content className="site-layout-background" style={{ padding: 90 }}>
        <Row justify="center">
          <Col style={{ width: 350 }}>
            <Form name="basic" initialValues={{ remember: true }}>
              <Form.Item>
                <Radio.Group
                  value={loginCredentials.status}
                  onChange={(e) =>
                    setLoginCredentials({
                      ...loginCredentials,
                      status: e.target.value,
                    })
                  }
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
                  value={loginCredentials.email}
                  onChange={(e) =>
                    setLoginCredentials({
                      ...loginCredentials,
                      email: e.target.value,
                    })
                  }
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
                  value={loginCredentials.password}
                  onChange={(e) =>
                    setLoginCredentials({
                      ...loginCredentials,
                      password: e.target.value,
                    })
                  }
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
