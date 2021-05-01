import { StoreState } from '../types';

export const selectSubjectOverview = (state: StoreState) =>
  state.overviewTeacherState.subjects;

export const selectStudentOverview = (state: StoreState) =>
  state.overviewTeacherState.students;

export const selectMainOverview = (state: StoreState) =>
  state.overviewTeacherState.main.scores;

export const selectMainOverviewScatter = (state: StoreState) => {
  console.log('called tests', state.overviewTeacherState.main?.tests);
  return state.overviewTeacherState.main.tests;
};
