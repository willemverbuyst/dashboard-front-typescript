import { StoreState } from './types';

export const select3mcQuestionsForSubject = (state: StoreState) => {
  return state.test.all;
};
