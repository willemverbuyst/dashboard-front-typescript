import { StoreState } from '../types';
import { Result } from './types';

export const selectOverviewStudent = (state: StoreState): Result[] | null =>
  state.overviewStudentState.results;
