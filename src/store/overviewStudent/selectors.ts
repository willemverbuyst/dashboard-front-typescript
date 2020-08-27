import { OverviewStudentState } from './types';

export const selectOverviewStudent = (state: OverviewStudentState) =>
  state.results;
