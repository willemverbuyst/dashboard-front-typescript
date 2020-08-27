export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
// export const REMOVE_QUESTIONS = 'REMOVE_QUESTIONS';

export type QuestionsState = {
  all: Question[] | null;
};

export type GetState = () => QuestionsState;

export type newQuestion = {
  text: string;
  answers: Answer[];
};

export type Answer = {
  text: string;
  correct: boolean;
};

export type PostNewQuestion = {
  subject: number;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
};

export type Question = {
  text: string;
  answers: Answer[];
};

export type QuestionsFetched = {
  type: typeof FETCH_QUESTIONS;
  questions: Question[];
};

export type AddQuestionToList = {
  type: typeof ADD_QUESTION;
  question: newQuestion;
};

export type QuestionActionTypes = QuestionsFetched | AddQuestionToList;
