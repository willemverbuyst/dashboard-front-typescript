import { StoreState } from './types';
import { Store } from 'antd/lib/form/interface';

export const selectSubjectOverview = (state: StoreState) => {
  return state.overviewTeacher.subjects;
};

export const selectStudentOverview = (state: StoreState) => {
  return state.overviewTeacher.students;
};

// export const selectMainOverview = (state: StoreState) => {
//   return state.main.scores;
// };

// export const selectMainOverviewScatter = (state: StoreState) => {
//   return state.main.tests;
// };
