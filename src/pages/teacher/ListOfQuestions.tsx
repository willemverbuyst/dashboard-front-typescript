import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Form, Button, Select, Collapse, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTeacherSubjects,
  selectTeacherToken,
} from '../../store/teacher/selectors';
import { getQuestionsForSubject } from '../../store/questions/actions';
import { selectAllQuestionsForSubject } from '../../store/questions/selectors';

const { Content } = Layout;
const { Option } = Select;
const { Panel } = Collapse;

export default function ListOfQuestions() {
  const dispatch = useDispatch();
  const subjects = useSelector(selectTeacherSubjects);
  const questions = useSelector(selectAllQuestionsForSubject);
  const [subject, setSubject] = useState(0);
  const history = useHistory();
  const token = useSelector(selectTeacherToken);

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  const getListOfQuestions = () => {
    dispatch(getQuestionsForSubject(subject));
  };

  const renderQuestions = () => {
    if (questions) {
      return (
        <Collapse style={{ width: 650 }}>
          {questions.map(({ text, answers }, i) => (
            <Panel header={text} key={i}>
              <ol>
                {answers.map(({ text, correct }, i) => (
                  <li
                    key={i}
                    style={
                      !correct
                        ? { color: 'red' }
                        : { color: 'green', fontWeight: 'bold' }
                    }
                  >
                    {text}
                  </li>
                ))}
              </ol>
            </Panel>
          ))}
        </Collapse>
      );
    }
  };

  const renderSubjectsSelector = () => {
    if (subjects) {
      return (
        <Form
          style={{ justifyContent: 'center' }}
          name="basic"
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="subject"
            rules={[{ required: true, message: 'Please select a subject' }]}
          >
            <Select
              placeholder="select a subject"
              value={subject}
              style={{ width: 160 }}
              onChange={(e) => setSubject(e)}
            >
              {subjects.map(({ name, id }, i) => (
                <Option key={i} value={id}>
                  {name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              style={{ width: 160, backgroundColor: '#B81D9D', border: 'none' }}
              type="primary"
              htmlType="submit"
              onClick={getListOfQuestions}
            >
              Show list
            </Button>
          </Form.Item>
        </Form>
      );
    }
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          <Row justify="center" style={{ padding: '24px' }}>
            {'Select a subject to get all the current questions in the database for that subject.'.toUpperCase()}
          </Row>
          <Row justify="center">{renderSubjectsSelector()}</Row>
          <Row justify="center">{renderQuestions()}</Row>
        </Content>
      </Layout>
    </Layout>
  );
}
