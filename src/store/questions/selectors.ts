import { StoreState } from './types';

export const selectAllQuestionsForSubject = (state: StoreState) => {
  return state.questions.all;
};
