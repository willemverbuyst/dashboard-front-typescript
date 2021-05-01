import { StoreState } from '../types';

export const selectStudentToken = (state: StoreState) =>
  state.studentState.token;

export const selectStudentId = (state: StoreState) => state.studentState.id;

export const selectStudentName = (state: StoreState) => state.studentState.name;

export const selectStudentSubjects = (state: StoreState) =>
  state.studentState.subjects;
