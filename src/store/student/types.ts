// ACTIONS
export const LOGIN_SUCCESS_STUDENT = 'LOGIN_SUCCESS_STUDENT';
export const TOKEN_STILL_VALID_STUDENT = 'TOKEN_STILL_VALID_STUDENT';
export const LOG_OUT_STUDENT = 'LOG_OUT_STUDENT';

export type StoreState = {
  student: Student;
};

export type GetStudentState = () => StoreState;

export type LogOutStudent = {
  type: typeof LOG_OUT_STUDENT;
};

export type LoginSuccessStudent = {
  type: typeof LOGIN_SUCCESS_STUDENT;
  student: Student;
};

export type TokenStudentStillValid = {
  type: typeof TOKEN_STILL_VALID_STUDENT;
  student: Student;
};

export type StudentActionTypes =
  | LoginSuccessStudent
  | LogOutStudent
  | TokenStudentStillValid;

// REDUCER
export type Student = {
  id: number | null;
  name: string | null;
  email: string | null;
  token: string | null;
  subjects: Subject[] | null;
};
export type Subject = {
  name: string;
  id: number;
};
