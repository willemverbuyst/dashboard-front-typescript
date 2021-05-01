import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Layout, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTeacherSubjects,
  selectTeacherToken,
} from '../../../store/teacher/selectors';
import { selectAllQuestionsForSubject } from '../../../store/questions/selectors';
import SubjectSelector from './SubjectSelector';
import ListOfQuestions from './ListOfQuestions';
import Spinner from '../../../components/Spinner';
import { getQuestionsForSubject } from '../../../store/questions/actions';

const { Content } = Layout;

const Questions = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const subjects = useSelector(selectTeacherSubjects);
  const questions = useSelector(selectAllQuestionsForSubject);
  const token = useSelector(selectTeacherToken);
  const [subject, setSubject] = useState(0);

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  const getListOfQuestions = (subjectId: number): void => {
    console.log(subjectId, 'aaa', questions);
    setSubject(subjectId);
    dispatch(getQuestionsForSubject(subjectId));
  };

  const renderQuestions = () => {
    if (questions) {
      return (
        <Row justify="center">
          <ListOfQuestions questions={questions} />
        </Row>
      );
    }
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          {subjects ? (
            <>
              <Row justify="center" style={{ padding: '24px' }}>
                {'Select a subject to get all the current questions in the database for that subject.'.toUpperCase()}
              </Row>
              <Row justify="center">
                <SubjectSelector
                  subject={subject}
                  subjects={subjects}
                  changeSubject={(e: any) => getListOfQuestions(e)}
                />
              </Row>
            </>
          ) : (
            <Spinner />
          )}
          {/* <Button
            style={{ width: 160, backgroundColor: '#B81D9D', border: 'none' }}
            type="primary"
            htmlType=""
            onClick={getListOfQuestions(subject)}
          >
            Show list
          </Button> */}
          {renderQuestions()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Questions;
