import { ISubject } from '../../models/subject.models';
import { IStudent } from '../../models/users.models';
import { TeacherState } from './types';

export const selectTeacherToken = (state: TeacherState): string | null =>
  state.teacher.token;

export const selectTeacherId = (state: TeacherState): number | null =>
  state.teacher.id;

export const selectTeacherName = (state: TeacherState): string | null =>
  state.teacher.name;

export const selectTeacherSubjects = (state: TeacherState): ISubject[] | null =>
  state.teacher.subjects;

export const selectTeacherStudents = (state: TeacherState): IStudent[] | null =>
  state.teacher.students;
