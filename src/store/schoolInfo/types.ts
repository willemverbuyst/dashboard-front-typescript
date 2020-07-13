import { Teachers } from '../../types/model';

export const FETCH_TEACHERS = 'FETCH_TEACHERS';

export type StoreState = {
  schoolInfo: Teachers;
};

export type GetState = () => StoreState;

export type teachersFetched = {
  type: typeof FETCH_TEACHERS;
  teachers: Teachers;
};

export type SchoolInfoActionTypes = teachersFetched;
