import { StoreState } from '../types';
import { SubjectDetailStudent } from './types';

export const selectDetailsForSubject = (
  state: StoreState
): SubjectDetailStudent[] | null => state.subjectDetailsStudentState.all;
