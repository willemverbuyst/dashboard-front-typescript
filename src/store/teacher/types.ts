import { IStudent, ITeacher } from '../../models/users.models';
import { ISubject } from '../../models/subject.models';

export const LOGIN_SUCCESS_TEACHER = 'LOGIN_SUCCESS_TEACHER';
export const TOKEN_STILL_VALID_TEACHER = 'TOKEN_STILL_VALID_TEACHER';
export const LOG_OUT_TEACHER = 'LOG_OUT_TEACHER';
export const ADD_SUBJECT = 'ADD_SUBJECT';

export type TeacherState = {
  id: number | null;
  name: string | null;
  email: string | null;
  token: string | null;
  subjects: ISubject[] | null;
  students: IStudent[] | null;
};

export type LogOutTeacher = {
  type: typeof LOG_OUT_TEACHER;
};

export type LoginSuccessTeacher = {
  type: typeof LOGIN_SUCCESS_TEACHER;
  teacher: ITeacher;
};

export type TokenTeacherStillValid = {
  type: typeof TOKEN_STILL_VALID_TEACHER;
  teacher: ITeacher;
};

export type AddSubject = {
  type: typeof ADD_SUBJECT;
  subject: ISubject;
};

export type TeacherActionTypes =
  | LoginSuccessTeacher
  | LogOutTeacher
  | TokenTeacherStillValid
  | AddSubject;
