import { SubjectDetailsStudentState } from './types';

export const selectDetailsForSubject = (state: SubjectDetailsStudentState) => {
  return state.all;
};
