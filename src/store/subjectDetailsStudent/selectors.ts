import { SubjectDetailsStudentState, SubjectDetailStudent } from './types';

export const selectDetailsForSubject = (
  state: SubjectDetailsStudentState
): SubjectDetailStudent[] | null => {
  return state.all;
};
