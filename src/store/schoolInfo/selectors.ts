import { StoreState } from '../types';

export const selectAllTeachers = (state: StoreState) =>
  state.schoolInfoState.all;
