import { StoreState } from '../types';
import { Subject } from './types';

export const selectStudentToken = (state: StoreState): string | null =>
  state.studentState.token;

export const selectStudentId = (state: StoreState): number | null =>
  state.studentState.id;

export const selectStudentName = (state: StoreState): string | null =>
  state.studentState.name;

export const selectStudentSubjects = (state: StoreState): Subject[] | null =>
  state.studentState.subjects;
