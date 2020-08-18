// ACTIONS
export const FETCH_MC_QUESTIONS = 'FETCH_MC_QUESTIONS';
export const REMOVE_MC_QUESTIONS = 'REMOVE_MC_QUESTIONS';

export type StoreState = {
  test: MCTest;
};

export type GetState = () => StoreState;

export type MC3QuestionsFetched = {
  type: typeof FETCH_MC_QUESTIONS;
  mc3questions: MCQuestion[];
};

export type RemoveQuestions = {
  type: typeof REMOVE_MC_QUESTIONS;
};

export type TestTypes = MC3QuestionsFetched | RemoveQuestions;

// REDUCER
export type MCTest = {
  all: MCQuestion[] | null;
};

export type MCQuestion = {
  id: number;
  text: string;
  subjectId: number;
  answers: MCAnswer[];
};

export type MCAnswer = {
  id: number;
  text: string;
  correct: boolean;
  questionId: number;
};
