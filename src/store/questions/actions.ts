import axios from 'axios';
import { apiUrl } from '../../constants/environment';
import { Action, Dispatch } from 'redux';
import {
  FETCH_QUESTIONS,
  ADD_QUESTION,
  QuestionsFetched,
  AddQuestionToList,
  PostNewQuestion,
} from './types';
import {
  appLoading,
  appDoneLoading,
  setMessage,
  showMessageWithTimeout,
} from '../appState/actions';
import { IQuestion } from '../../models/test.models';
import { ThunkAction } from 'redux-thunk';
import { StoreState } from '../types';

export const questionsFetched = (questions: IQuestion[]): QuestionsFetched => {
  return {
    type: FETCH_QUESTIONS,
    payload: questions,
  };
};

export const addQuestionToList = (question: IQuestion): AddQuestionToList => {
  return {
    type: ADD_QUESTION,
    payload: question,
  };
};

export const getQuestionsForSubject = (
  id: number
): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch
): Promise<void> => {
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

export const createQuestion = (
  newQuestion: PostNewQuestion
): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: any
): Promise<void> => {
  const { subject, question, answer1, answer2, answer3, answer4 } = newQuestion;
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
    showMessageWithTimeout(
      dispatch,
      'success',
      true,
      response.data.message,
      1500
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
