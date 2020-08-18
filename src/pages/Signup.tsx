import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTeachers } from '../store/schoolInfo/actions';
import { selectAllTeachers } from '../store/schoolInfo/selectors';
import { createStudent } from '../store/student/actions';
import { createTeacher } from '../store/teacher/actions';
import { Layout, Form, Input, Button, Radio, Select, Row, Col } from 'antd';
import { SignUpCredentials } from '../models/model';

const { Content } = Layout;
const { Option } = Select;

export default function Signup() {
  const history = useHistory();
  const dispatch = useDispatch();
  const teachers = useSelector(selectAllTeachers);
  const [signUpCredentials, setSignUpCredentials] = useState<SignUpCredentials>(
    {
      name: '',
      email: '',
      password: '',
      status: 1,
      teacherId: 1,
    }
  );

  useEffect(() => {
    dispatch(fetchAllTeachers);
  }, [dispatch]);

  const createUser = () => {
    if (signUpCredentials.status === 1) {
      dispatch(createStudent(signUpCredentials));
      history.push(`/`);
    } else {
      dispatch(createTeacher(signUpCredentials));
      history.push(`/`);
    }
  };

  const renderExtraInput = () => {
    return signUpCredentials.status === 1 ? (
      <Form.Item
        name="Teacher"
        rules={[{ required: true, message: 'Please select your teacher!' }]}
      >
        <Select
          placeholder="Select your teacher"
          value={signUpCredentials.teacherId}
          style={{ width: 350 }}
          onChange={(e) =>
            setSignUpCredentials({
              ...signUpCredentials,
              teacherId: e,
            })
          }
        >
          {teachers &&
            teachers.map(({ name, id }, i) => (
              <Option key={i} value={id}>
                {name}
              </Option>
            ))}
        </Select>
      </Form.Item>
    ) : null;
  };

  return (
    <Layout style={{ padding: '24px', height: '92vh' }}>
      <Content
        className="site-layout-background"
        style={{
          padding: 90,
        }}
      >
        <Row justify="center">
          <Col style={{ width: 350 }}>
            <Form name="basic" initialValues={{ remember: true }}>
              <Form.Item>
                <Radio.Group
                  value={signUpCredentials.status}
                  onChange={(e) =>
                    setSignUpCredentials({
                      ...signUpCredentials,
                      status: e.target.value,
                    })
                  }
                >
                  <Radio value={1}>Student</Radio>
                  <Radio value={2}>Teacher</Radio>
                </Radio.Group>
              </Form.Item>

              {renderExtraInput()}

              <Form.Item
                name="Full name"
                rules={[
                  { required: true, message: 'Please input your full name!' },
                ]}
              >
                <Input
                  placeholder="Full name"
                  value={signUpCredentials.name}
                  onChange={(e) =>
                    setSignUpCredentials({
                      ...signUpCredentials,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item
                name="Email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                ]}
              >
                <Input
                  placeholder="Email"
                  value={signUpCredentials.email}
                  onChange={(e) =>
                    setSignUpCredentials({
                      ...signUpCredentials,
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
                  value={signUpCredentials.password}
                  onChange={(e) =>
                    setSignUpCredentials({
                      ...signUpCredentials,
                      password: e.target.value,
                    })
                  }
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => createUser()}
                  style={{ backgroundColor: '#B81D9D', border: 'none' }}
                >
                  Signup
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
