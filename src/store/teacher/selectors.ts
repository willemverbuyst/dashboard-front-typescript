import { ISubject } from '../../models/subject.models';
import { IStudent } from '../../models/users.models';
import { StoreState } from '../types';

export const selectTeacherToken = (state: StoreState): string | null =>
  state.teacherState.token;

export const selectTeacherId = (state: StoreState): number | null =>
  state.teacherState.id;

export const selectTeacherName = (state: StoreState): string | null =>
  state.teacherState.name;

export const selectTeacherSubjects = (state: StoreState): ISubject[] | null =>
  state.teacherState.subjects;

export const selectTeacherStudents = (state: StoreState): IStudent[] | null =>
  state.teacherState.students;
