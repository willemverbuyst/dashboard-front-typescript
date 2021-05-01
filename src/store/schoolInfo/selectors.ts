import { StoreState } from '../types';
import { TeacherOption } from './types';

export const selectAllTeachers = (state: StoreState): TeacherOption[] | null =>
  state.schoolInfoState.all;
