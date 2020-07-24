import { StoreState } from './types';

export const selectSubjectOverview = (state: StoreState) => {
  return state.overviewTeacher.subjects;
};

export const selectStudentOverview = (state: StoreState) => {
  return state.overviewTeacher.students;
};

export const selectMainOverview = (state: StoreState) => {
  return state.overviewTeacher.main.scores;
};

export const selectMainOverviewScatter = (state: StoreState) => {
  return state.overviewTeacher.main.tests;
};
