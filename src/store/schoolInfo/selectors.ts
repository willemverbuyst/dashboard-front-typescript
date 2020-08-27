import { SchoolInfoState } from './types';

export const selectAllTeachers = (state: SchoolInfoState) => {
  return state.all;
};
