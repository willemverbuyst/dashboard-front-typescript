import { IMultipleChoiceQuestion } from '../../models/test.models';

export const FETCH_MC_QUESTIONS = 'FETCH_MC_QUESTIONS';
export const REMOVE_MC_QUESTIONS = 'REMOVE_MC_QUESTIONS';

export type TestState = {
  all: IMultipleChoiceQuestion[] | null;
};

export type GetState = () => TestState;

export type MC3QuestionsFetched = {
  type: typeof FETCH_MC_QUESTIONS;
  mc3questions: IMultipleChoiceQuestion[];
};

export type RemoveQuestions = {
  type: typeof REMOVE_MC_QUESTIONS;
};

export type TestTypes = MC3QuestionsFetched | RemoveQuestions;
