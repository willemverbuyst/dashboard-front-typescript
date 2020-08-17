import axios from 'axios';
import { apiUrl } from '../../config/constants';
import { Dispatch } from 'redux';
import { MC3questions, AnswerTest } from '../../types/test-models';
import {
  FETCH_MC_QUESTIONS,
  REMOVE_MC_QUESTIONS,
  MC3questionsFetched,
} from './types';
import { GetStudentState } from '../student/types';
import {
  appLoading,
  appDoneLoading,
  setMessage,
  showMessageWithTimeout,
} from '../appState/actions';

const questionsFetched = (mc3questions: MC3questions): MC3questionsFetched => {
  return {
    type: FETCH_MC_QUESTIONS,
    mc3questions,
  };
};

export const removeQuestions = () => {
  return {
    type: REMOVE_MC_QUESTIONS,
  };
};

export const getMcQuestionsForTest = (id: number) => {
  return async (dispatch: Dispatch, getState: GetStudentState) => {
    const token = getState().student.token;
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
};

export function submitTest(
  studentId: number,
  subjectId: number,
  mcQuestions: AnswerTest
) {
  return async function thunk(dispatch: any, getState: GetStudentState) {
    const token = getState().student.token;
    dispatch(appLoading());
    try {
      const response = await axios.post(
        `${apiUrl}/questions/3qtest`,
        {
          studentId,
          subjectId,
          q1: mcQuestions.question1,
          q2: mcQuestions.question2,
          q3: mcQuestions.question3,
          a1: mcQuestions.answer1,
          a2: mcQuestions.answer2,
          a3: mcQuestions.answer3,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(
        showMessageWithTimeout('success', true, response.data.message, 1500)
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
}
