import { QuestionsState } from './types';

export const selectAllQuestionsForSubject = (state: QuestionsState) => {
  return state.all;
};
