import { ISubject } from '../../models/subject.models';
import { StoreState } from '../types';

export const selectStudentToken = (state: StoreState): string | null =>
  state.studentState.token;

export const selectStudentId = (state: StoreState): number | null =>
  state.studentState.id;

export const selectStudentName = (state: StoreState): string | null =>
  state.studentState.name;

export const selectStudentSubjects = (state: StoreState): ISubject[] | null =>
  state.studentState.subjects;
