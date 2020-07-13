import { Teacher, NewSubject } from '../../types/model';

export const LOGIN_SUCCESS_TEACHER = 'LOGIN_SUCCESS_TEACHER';
export const TOKEN_STILL_VALID_TEACHER = 'TOKEN_STILL_VALID_TEACHER';
export const LOG_OUT_TEACHER = 'LOG_OUT_TEACHER';
export const ADD_SUBJECT = 'ADD_SUBJECT';

export type StoreState = {
  teacher: Teacher;
};

export type GetTeacherState = () => StoreState;

export type logOutTeacher = {
  type: typeof LOG_OUT_TEACHER;
};

export type loginSuccessTeacher = {
  type: typeof LOGIN_SUCCESS_TEACHER;
  teacher: Teacher;
};

export type tokenTeacherStillValid = {
  type: typeof TOKEN_STILL_VALID_TEACHER;
  teacher: Teacher;
};

export type addSubject = {
  type: typeof ADD_SUBJECT;
  subject: NewSubject;
};

export type TeacherActionTypes =
  | loginSuccessTeacher
  | logOutTeacher
  | tokenTeacherStillValid
  | addSubject;
