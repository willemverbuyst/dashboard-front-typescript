import { Question, Questions, AddNewQuestion } from '../../types/model';

export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
// export const REMOVE_QUESTIONS = 'REMOVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';

export type StoreState = {
  questions: Questions;
};

export type GetState = () => StoreState;

export type questionsFetched = {
  type: typeof FETCH_QUESTIONS;
  questions: Question[];
};

export type addQuestionToList = {
  type: typeof ADD_QUESTION;
  question: AddNewQuestion;
};

export type QuestionActionTypes = questionsFetched | addQuestionToList;
