import { StoreState } from './types';

export const selectStudentToken = (state: StoreState) => state.student.token;

export const selectStudentId = (state: StoreState) => state.student.id;

export const selectStudentName = (state: StoreState) => state.student.name;

export const selectStudentSubjects = (state: StoreState) =>
  state.student.subjects;
