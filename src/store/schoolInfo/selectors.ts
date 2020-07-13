import { StoreState } from './types';

export const selectAllTeachers = (state: StoreState) => {
  return state.schoolInfo.all;
};
