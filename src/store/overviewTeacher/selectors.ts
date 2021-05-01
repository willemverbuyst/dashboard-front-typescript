import { IScore, ITest } from '../../models/test.models';
import { StoreState } from '../types';
import { Student, Subject } from './types';

export const selectSubjectOverview = (state: StoreState): Subject[] | null =>
  state.overviewTeacherState.subjects;

export const selectStudentOverview = (state: StoreState): Student[] | null =>
  state.overviewTeacherState.students;

export const selectMainOverview = (state: StoreState): IScore[] | null =>
  state.overviewTeacherState.main.scores;

export const selectMainOverviewScatter = (
  state: StoreState
): ITest[] | null => {
  console.log('called tests', state.overviewTeacherState.main?.tests);
  return state.overviewTeacherState.main.tests;
};
