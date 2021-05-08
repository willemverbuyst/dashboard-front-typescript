import { ISubject } from '../../models/subject.models';

export const LOGIN_SUCCESS_STUDENT = 'LOGIN_SUCCESS_STUDENT';
export const TOKEN_STILL_VALID_STUDENT = 'TOKEN_STILL_VALID_STUDENT';
export const LOG_OUT_STUDENT = 'LOG_OUT_STUDENT';

export type StudentState = {
  id: number | null;
  name: string | null;
  email: string | null;
  token: string | null;
  subjects: ISubject[] | null;
};

export type Student = {
  id: number | null;
  name: string | null;
  email: string | null;
  token: string | null;
  subjects: ISubject[] | null;
};

export type LogOutStudent = {
  type: typeof LOG_OUT_STUDENT;
};

export type LoginSuccessStudent = {
  type: typeof LOGIN_SUCCESS_STUDENT;
  payload: Student;
};

export type TokenStudentStillValid = {
  type: typeof TOKEN_STILL_VALID_STUDENT;
  payload: Student;
};

export type StudentActionTypes =
  | LoginSuccessStudent
  | LogOutStudent
  | TokenStudentStillValid;
