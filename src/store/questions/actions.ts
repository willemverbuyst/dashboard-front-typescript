import axios from 'axios';
import { apiUrl } from '../../config/constants';
import { Dispatch } from 'redux';
import { FETCH_QUESTIONS, GetState, QuestionActionTypes } from './types';
import { Questions } from '../../types/model';
import { GetTeacherState } from '../teacher/types';
import { selectTeacherToken } from '../teacher/selectors';

export const questionsFetched = (questions: Questions): QuestionActionTypes => {
  return {
    type: FETCH_QUESTIONS,
    questions,
  };
};

export function getQuestionsForSubject(id: number) {
  return async function thunk(dispatch: Dispatch, getState: GetTeacherState) {
    const token = selectTeacherToken(getState());

    try {
      const response = await axios.get(`${apiUrl}/questions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const questions = response.data;

      dispatch(questionsFetched(questions));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
}
