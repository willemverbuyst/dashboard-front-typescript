import { StoreState } from './types';

export const selectTeacherToken = (state: StoreState) => state.teacher.token;

export const selectTeacherId = (state: StoreState) => state.teacher.id;

export const selectTeacherName = (state: StoreState) => state.teacher.name;

export const selectTeacherSubjects = (state: StoreState) =>
  state.teacher.subjects;

export const selectTeacherStudents = (state: StoreState) =>
  state.teacher.students;
