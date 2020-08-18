// ACTIONS
export const FETCH_MC_QUESTIONS = 'FETCH_MC_QUESTIONS';
export const REMOVE_MC_QUESTIONS = 'REMOVE_MC_QUESTIONS';

export type StoreState = {
  test: MCTest;
};

export type GetState = () => StoreState;

export type MC3QuestionsFetched = {
  type: typeof FETCH_MC_QUESTIONS;
  mc3questions: MCquestion[];
};

export type RemoveQuestions = {
  type: typeof REMOVE_MC_QUESTIONS;
};

export type TestTypes = MC3QuestionsFetched | RemoveQuestions;

// REDUCER
export type MCTest = {
  all: MCquestion[] | null;
};

export type MCquestion = {
  id: number;
  text: string;
  subjectId: number;
  answers: MCanswer[];
};

export type MCanswer = {
  id: number;
  text: string;
  correct: boolean;
  questionId: number;
};
