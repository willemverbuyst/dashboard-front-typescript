export const STORE_TEACHERS = 'STORE_TEACHERS';

export type SchoolInfoState = {
  all: TeacherOption[] | null;
};

export type TeacherOption = {
  name: string;
  id: number;
};

export type StoreTeachers = {
  type: typeof STORE_TEACHERS;
  payload: TeacherOption[];
};

export type SchoolInfoActionTypes = StoreTeachers;
