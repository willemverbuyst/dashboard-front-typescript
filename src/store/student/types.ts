import { Student } from '../../types/model';

export const LOGIN_SUCCESS_STUDENT = 'LOGIN_SUCCESS_STUDENT';
export const TOKEN_STILL_VALID_STUDENT = 'TOKEN_STILL_VALID_STUDENT';
export const LOG_OUT_STUDENT = 'LOG_OUT_STUDENT';

export type StoreState = {
  student: Student;
};

export type GetState = () => StoreState;

export type logOutStudent = {
  type: typeof LOG_OUT_STUDENT;
};

export type loginSuccessStudent = {
  type: typeof LOGIN_SUCCESS_STUDENT;
  student: Student;
};

export type tokenStudentStillValid = {
  type: typeof TOKEN_STILL_VALID_STUDENT;
  student: Student;
};

export type StudentActionTypes =
  | loginSuccessStudent
  | logOutStudent
  | tokenStudentStillValid;
