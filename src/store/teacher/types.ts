import { Teacher } from '../../types/model';

export const LOGIN_SUCCESS_TEACHER = 'LOGIN_SUCCESS_TEACHER';
export const TOKEN_STILL_VALID_TEACHER = 'TOKEN_STILL_VALID_TEACHER';
export const LOG_OUT_TEACHER = 'LOG_OUT_TEACHER';

export type StoreState = {
  teacher: Teacher;
};

export type GetState = () => StoreState;

export type logOutTeacher = {
  type: typeof LOG_OUT_TEACHER;
};

export type loginSuccessTeacher = {
  type: typeof LOGIN_SUCCESS_TEACHER;
  teacher: Teacher;
};

export type TeacherActionTypes = loginSuccessTeacher | logOutTeacher;
