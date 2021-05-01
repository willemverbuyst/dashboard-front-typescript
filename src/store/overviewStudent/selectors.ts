import { StoreState } from '../types';

export const selectOverviewStudent = (state: StoreState) =>
  state.overviewStudentState.results;
