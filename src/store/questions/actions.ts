import axios from 'axios';
import { apiUrl } from '../../constants/environment';
import { Dispatch } from 'redux';
import {
  FETCH_QUESTIONS,
  ADD_QUESTION,
  QuestionsFetched,
  AddQuestionToList,
  PostNewQuestion,
  newQuestion,
} from './types';
import {
  appLoading,
  appDoneLoading,
  setMessage,
  showMessageWithTimeout,
} from '../appState/actions';
import { IQuestion } from '../../models/test.models';

export const questionsFetched = (questions: IQuestion[]): QuestionsFetched => {
  return {
    type: FETCH_QUESTIONS,
    questions,
  };
};

export const addQuestionToList = (question: newQuestion): AddQuestionToList => {
  return {
    type: ADD_QUESTION,
    question,
  };
};

export const getQuestionsForSubject = (id: number) => async (
  dispatch: Dispatch
) => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('teacher_token');

    const response = await axios.get(`${apiUrl}/questions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const questions = response.data;

    dispatch(questionsFetched(questions));
    dispatch(appDoneLoading());
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
      dispatch(setMessage('error', true, error.response.data.message));
    } else {
      console.log(error.message);
      dispatch(setMessage('error', true, error.message));
    }
    dispatch(appDoneLoading());
  }
};

export const createQuestion = (newQuestion: PostNewQuestion) => {
  const { subject, question, answer1, answer2, answer3, answer4 } = newQuestion;
  return async (dispatch: any) => {
    const token = localStorage.getItem('teacher_token');
    dispatch(appLoading());
    try {
      const response = await axios.post(
        `${apiUrl}/questions`,
        {
          subjectId: subject,
          question,
          answer1,
          answer2,
          answer3,
          answer4,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(
        showMessageWithTimeout('success', true, response.data.message, 1500)
      );
      dispatch(
        addQuestionToList({
          text: question,
          answers: [
            { text: answer1, correct: true },
            { text: answer2, correct: false },
            { text: answer3, correct: false },
            { text: answer4, correct: false },
          ],
        })
      );
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage('error', true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage('error', true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};
