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
import { Layout } from 'antd';

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

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  useEffect(() => {
    dispatch(getMcQuestionsForTest(subjectid));
  }, [dispatch, subjectid]);

  console.log(mcQuestions);

  const onPick = (event: any, questionId: number) => {
    console.log(event, questionId);
    if (event.questionNumber * 1 === 1) {
      setMcQuestions({ ...mcQuestions, question1: event.questionId });
      event.value === 1 || event.value % 4 === 1
        ? setMcQuestions({ ...mcQuestions, answer1: 1 })
        : setMcQuestions({ ...mcQuestions, answer1: 0 });
    } else if (event.questionNumber === 2) {
      setMcQuestions({ ...mcQuestions, question2: event.questionId });
      event.value === 1 || event.value % 4 === 1
        ? setMcQuestions({ ...mcQuestions, answer2: 1 })
        : setMcQuestions({ ...mcQuestions, answer2: 0 });
    } else {
      setMcQuestions({ ...mcQuestions, question3: event.questionId });
      event.value === 1 || event.value % 4 === 1
        ? setMcQuestions({ ...mcQuestions, answer3: 1 })
        : setMcQuestions({ ...mcQuestions, answer3: 0 });
    }
  };

  const renderMCQ = () => {
    if (questions && subjects) {
      return questions.map(({ text, answers, id }, i) => (
        <MultipleChoiceQuestion
          key={i}
          text={text}
          answers={answers}
          onChange={onPick}
          questionId={id}
        />
      ));
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
