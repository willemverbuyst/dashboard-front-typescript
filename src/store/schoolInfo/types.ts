// ACTION
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

// REDUCER
export type TeacherOptions = {
  all: TeacherOption[] | null;
};

export type TeacherOption = {
  name: string;
  id: number;
};
