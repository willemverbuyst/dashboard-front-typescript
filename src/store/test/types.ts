import { MC3questions } from '../../types/test-models';

export const FETCH_MC_QUESTIONS = 'FETCH_MC_QUESTIONS';
export const REMOVE_MC_QUESTIONS = 'REMOVE_MC_QUESTIONS';

export type StoreState = {
  test: MC3questions;
};

export type GetState = () => StoreState;

export type MC3questionsFetched = {
  type: typeof FETCH_MC_QUESTIONS;
  mc3questions: MC3questions;
};

export type RemoveQuestions = {
  type: typeof REMOVE_MC_QUESTIONS;
  mc3questions: MC3questions;
};

export type TestTypes = MC3questionsFetched | RemoveQuestions;
