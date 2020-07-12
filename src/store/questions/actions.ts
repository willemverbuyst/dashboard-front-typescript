import axios from 'axios';
import { apiUrl } from '../../config/constants';
import { Dispatch } from 'redux';
import {
  FETCH_QUESTIONS,
  ADD_QUESTION,
  GetState,
  QuestionActionTypes,
} from './types';
import { Questions, PostNewQuestion, AddNewQuestion } from '../../types/model';
import { GetTeacherState } from '../teacher/types';
import { selectTeacherToken } from '../teacher/selectors';

export const questionsFetched = (questions: Questions): QuestionActionTypes => {
  return {
    type: FETCH_QUESTIONS,
    questions,
  };
};

export function addQuestionToList(question: AddNewQuestion) {
  return { type: ADD_QUESTION, question };
}

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

export function createQuestion(newQuestion: PostNewQuestion) {
  const { subject, question, answer1, answer2, answer3, answer4 } = newQuestion;
  return async function thunk(dispatch: Dispatch, getState: GetTeacherState) {
    const token = getState().teacher.token;

    try {
      await axios.post(
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
        addQuestionToList({
          text: question,
          answers: [
            { text: answer1, correct: true },
            { text: answer2, correct: false },
            { text: answer1, correct: false },
            { text: answer1, correct: false },
          ],
        })
      );
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
}
