import axios from 'axios';
import { apiUrl } from '../../constants/environment';
import { Action, Dispatch } from 'redux';
import { IMultipleChoiceQuestion, TestResult } from '../../models/test.models';
import {
  FETCH_MC_QUESTIONS,
  REMOVE_MC_QUESTIONS,
  MC3QuestionsFetched,
  RemoveQuestions,
} from './types';
import {
  appLoading,
  appDoneLoading,
  setMessage,
  showMessageWithTimeout,
} from '../appState/actions';
import { ThunkAction } from 'redux-thunk';
import { StoreState } from '../types';

export const questionsFetched = (
  mc3questions: IMultipleChoiceQuestion[]
): MC3QuestionsFetched => {
  return {
    type: FETCH_MC_QUESTIONS,
    mc3questions,
  };
};

export const removeQuestions = (): RemoveQuestions => {
  return {
    type: REMOVE_MC_QUESTIONS,
  };
};

export const getMcQuestionsForTest = (
  id: number
): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch
): Promise<void> => {
  const token = localStorage.getItem('student_token');
  dispatch(appLoading());
  dispatch(removeQuestions());
  try {
    const response = await axios.get(`${apiUrl}/questions/3qtest/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const mc3questions = response.data;

    dispatch(questionsFetched(mc3questions));
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

export const submitTest = (
  studentId: number,
  subjectId: number,
  mcQuestions: TestResult
): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch
): Promise<void> => {
  const token = localStorage.getItem('student_token');

  dispatch(appLoading());

  try {
    const response = await axios.post(
      `${apiUrl}/questions/3qtest`,
      {
        studentId,
        subjectId,
        // convert to string a zero will considered an empty value by the backend
        q1: String(mcQuestions.question1),
        q2: String(mcQuestions.question2),
        q3: String(mcQuestions.question3),
        a1: String(mcQuestions.answer1),
        a2: String(mcQuestions.answer2),
        a3: String(mcQuestions.answer3),
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
