import { StoreState } from '../types';

export const selectTeacherToken = (state: StoreState) =>
  state.teacherState.token;

export const selectTeacherId = (state: StoreState) => state.teacherState.id;

export const selectTeacherName = (state: StoreState) => state.teacherState.name;

export const selectTeacherSubjects = (state: StoreState) =>
  state.teacherState.subjects;

export const selectTeacherStudents = (state: StoreState) =>
  state.teacherState.students;
