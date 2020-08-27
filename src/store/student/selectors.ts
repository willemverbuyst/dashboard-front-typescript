import { StudentState } from './types';

export const selectStudentToken = (state: StudentState) => state.student.token;

export const selectStudentId = (state: StudentState) => state.student.id;

export const selectStudentName = (state: StudentState) => state.student.name;

export const selectStudentSubjects = (state: StudentState) =>
  state.student.subjects;
