import { Teacher, AddNewSubject } from '../../types/model';

export const LOGIN_SUCCESS_TEACHER = 'LOGIN_SUCCESS_TEACHER';
export const TOKEN_STILL_VALID_TEACHER = 'TOKEN_STILL_VALID_TEACHER';
export const LOG_OUT_TEACHER = 'LOG_OUT_TEACHER';
export const ADD_SUBJECT = 'ADD_SUBJECT';

export type StoreState = {
  teacher: Teacher;
};

export type GetTeacherState = () => StoreState;

export type LogOutTeacher = {
  type: typeof LOG_OUT_TEACHER;
};

export type LoginSuccessTeacher = {
  type: typeof LOGIN_SUCCESS_TEACHER;
  teacher: Teacher;
};

export type TokenTeacherStillValid = {
  type: typeof TOKEN_STILL_VALID_TEACHER;
  teacher: Teacher;
};

export type AddSubject = {
  type: typeof ADD_SUBJECT;
  subject: AddNewSubject;
};

export type TeacherActionTypes =
  | LoginSuccessTeacher
  | LogOutTeacher
  | TokenTeacherStillValid
  | AddSubject;
