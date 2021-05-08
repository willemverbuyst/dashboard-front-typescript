import { IQuestion } from '../../models/test.models';

export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
// export const REMOVE_QUESTIONS = 'REMOVE_QUESTIONS';

export type QuestionsState = {
  all: IQuestion[] | null;
};

export type PostNewQuestion = {
  subject: number;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
};

export type QuestionsFetched = {
  type: typeof FETCH_QUESTIONS;
  payload: IQuestion[];
};

export type AddQuestionToList = {
  type: typeof ADD_QUESTION;
  payload: IQuestion;
};

export type QuestionActionTypes = QuestionsFetched | AddQuestionToList;
