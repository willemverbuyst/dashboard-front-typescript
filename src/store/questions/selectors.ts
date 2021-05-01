import { QuestionsState } from './types';

export const selectAllQuestionsForSubject = (state: QuestionsState) => {
  console.log(state.all);
  return state.all;
};
