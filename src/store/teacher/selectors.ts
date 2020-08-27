import { TeacherState } from './types';

export const selectTeacherToken = (state: TeacherState) => state.teacher.token;

export const selectTeacherId = (state: TeacherState) => state.teacher.id;

export const selectTeacherName = (state: TeacherState) => state.teacher.name;

export const selectTeacherSubjects = (state: TeacherState) =>
  state.teacher.subjects;

export const selectTeacherStudents = (state: TeacherState) =>
  state.teacher.students;
