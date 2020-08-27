import { OverViewTeacherState } from './types';

export const selectSubjectOverview = (state: OverViewTeacherState) => {
  return state.overviewTeacher.subjects;
};

export const selectStudentOverview = (state: OverViewTeacherState) => {
  return state.overviewTeacher.students;
};

export const selectMainOverview = (state: OverViewTeacherState) => {
  return state.overviewTeacher.main.scores;
};

export const selectMainOverviewScatter = (state: OverViewTeacherState) => {
  return state.overviewTeacher.main.tests;
};
