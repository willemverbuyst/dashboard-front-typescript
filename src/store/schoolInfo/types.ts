import { TeacherOption, TeacherOptions } from '../../types/school-info-model';

export const STORE_TEACHERS = 'STORE_TEACHERS';

export type StoreState = {
  schoolInfo: TeacherOptions;
};

export type GetState = () => StoreState;

export type StoreTeachers = {
  type: typeof STORE_TEACHERS;
  teachers: TeacherOption[];
};

export type SchoolInfoActionTypes = StoreTeachers;
