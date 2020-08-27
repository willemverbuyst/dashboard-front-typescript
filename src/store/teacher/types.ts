export const LOGIN_SUCCESS_TEACHER = 'LOGIN_SUCCESS_TEACHER';
export const TOKEN_STILL_VALID_TEACHER = 'TOKEN_STILL_VALID_TEACHER';
export const LOG_OUT_TEACHER = 'LOG_OUT_TEACHER';
export const ADD_SUBJECT = 'ADD_SUBJECT';

export type TeacherState = {
  teacher: Teacher;
};

export type GetTeacherState = () => TeacherState;

export type Teacher = {
  id: number | null;
  name: string | null;
  email: string | null;
  token: string | null;
  subjects: Subjects[] | null;
  students: Students[] | null;
};

export type Subjects = {
  name: string;
  id: number;
};

export type Students = {
  name: string;
  id: number;
};

export type newSubject = {
  name: string;
  id: number;
};

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
  subject: newSubject;
};

export type TeacherActionTypes =
  | LoginSuccessTeacher
  | LogOutTeacher
  | TokenTeacherStillValid
  | AddSubject;
