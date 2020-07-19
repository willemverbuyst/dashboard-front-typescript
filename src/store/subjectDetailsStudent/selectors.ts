import { StoreState } from './types';

export const selectDetailsForSubject = (state: StoreState) => {
  return state.subjectDetailsStudent.all;
};
