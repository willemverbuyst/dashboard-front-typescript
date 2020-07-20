import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import MultipleChoiceQuestion from '../../components/MultipleChoiceQuestion';
import {
  selectStudentId,
  selectStudentSubjects,
  selectStudentToken,
} from '../../store/student/selectors';
import { getMcQuestionsForTest } from '../../store/test/actions';
import { select3mcQuestionsForSubject } from '../../store/test/selectors';
import { AnswerTest } from '../../types/modelsTest';
import { Layout, Button } from 'antd';

const { Content } = Layout;

export default function StudentDoTest() {
  const dispatch = useDispatch();
  const history = useHistory();
  const studentId = useSelector(selectStudentId);
  const { subjectid } = useParams();
  const token = useSelector(selectStudentToken);
  const questions = useSelector(select3mcQuestionsForSubject);
  const subjects = useSelector(selectStudentSubjects);
  const [mcQuestions, setMcQuestions] = useState<AnswerTest>({
    question1: 0,
    question2: 0,
    question3: 0,
    answer1: 0,
    answer2: 0,
    answer3: 0,
  });
  const [testDone, setTestDone] = useState(false);

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  useEffect(() => {
    dispatch(getMcQuestionsForTest(subjectid));
  }, [dispatch, subjectid]);

  const onPick = (event: any, questionNumber: number, questionId: number) => {
    if (questionNumber === 1) {
      event === 1 || event % 4 === 1
        ? setMcQuestions({ ...mcQuestions, question1: questionId, answer1: 1 })
        : setMcQuestions({ ...mcQuestions, question1: questionId, answer1: 0 });
    } else if (questionNumber === 2) {
      event === 1 || event % 4 === 1
        ? setMcQuestions({ ...mcQuestions, question2: questionId, answer2: 1 })
        : setMcQuestions({ ...mcQuestions, question2: questionId, answer2: 0 });
    } else {
      event === 1 || event % 4 === 1
        ? setMcQuestions({ ...mcQuestions, question3: questionId, answer3: 1 })
        : setMcQuestions({ ...mcQuestions, question3: questionId, answer3: 0 });
    }
  };

  const onFinish = () => {
    setTestDone(true);
    console.log('FINISH:', mcQuestions);
  };

  const doAnotherTest = () => {
    setTestDone(false);
    dispatch(getMcQuestionsForTest(subjectid));
  };

  const goToMain = () => {
    history.push(`/students/${studentId}/subjects/${subjectid}`);
  };

  const renderMCQ = () => {
    if (questions && subjects) {
      return (
        <>
          {questions.map(({ text, answers, id }, i) => (
            <MultipleChoiceQuestion
              key={i}
              text={text}
              answers={answers}
              onChange={onPick}
              questionNumber={i + 1}
              questionId={id}
            />
          ))}
          {!testDone ? (
            <Button
              style={{
                width: 160,
                backgroundColor: '#B81D9D',
                border: 'none',
                color: '#fff',
              }}
              onClick={onFinish}
            >
              Finish
            </Button>
          ) : null}
          {testDone ? (
            <>
              <p>{'You want to take another test?'.toUpperCase()}</p>
              <Button
                style={{
                  width: 160,
                  backgroundColor: '#4BC0E7',
                  border: 'none',
                  color: '#fff',
                  marginRight: 20,
                }}
                onClick={doAnotherTest}
              >
                yes
              </Button>
              <Button
                style={{
                  width: 160,
                  backgroundColor: '#B81D9D',
                  border: 'none',
                  color: '#fff',
                }}
                onClick={goToMain}
              >
                no
              </Button>
            </>
          ) : null}
        </>
      );
    }
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">{renderMCQ()}</Content>
      </Layout>
    </Layout>
  );
}
