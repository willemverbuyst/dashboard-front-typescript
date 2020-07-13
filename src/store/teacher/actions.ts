import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { Dispatch } from 'redux';
import {
  LOGIN_SUCCESS_TEACHER,
  TOKEN_STILL_VALID_TEACHER,
  LOG_OUT_TEACHER,
  ADD_SUBJECT,
  GetTeacherState,
  TeacherActionTypes,
} from './types';
import {
  Teacher,
  LoginCredentials,
  AddNewSubject,
  SignUpCredentials,
} from '../../types/model';

const loginSuccessTeacher = (teacher: Teacher): TeacherActionTypes => {
  return {
    type: LOGIN_SUCCESS_TEACHER,
    teacher,
  };
};

export const logOutTeacher = (): TeacherActionTypes => ({
  type: LOG_OUT_TEACHER,
});

const tokenTeacherStillValid = (teacher: Teacher): TeacherActionTypes => ({
  type: TOKEN_STILL_VALID_TEACHER,
  teacher,
});

const addSubject = (subject: AddNewSubject) => ({
  type: ADD_SUBJECT,
  subject,
});

export const loginTeacher = (credentials: LoginCredentials) => {
  const { email, password, status } = credentials;
  return async (dispatch: Dispatch, getState: GetTeacherState) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
        isStudent: status,
      });

      dispatch(loginSuccessTeacher(response.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
};

export const teacherLoggingOut = () => {
  return function thunk(dispatch: Dispatch, getState: GetTeacherState) {
    dispatch(logOutTeacher());
  };
};

export const getTeacherWithStoredToken = () => {
  return async (dispatch: Dispatch, getState: GetTeacherState) => {
    const token = getState().teacher.token;

    if (token === null) return;

    try {
      // if token check if valid
      const response = await axios.get(`${apiUrl}/teacher`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(tokenTeacherStillValid(response.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      dispatch(logOutTeacher());
    }
  };
};

export const createTeacher = (signUpCredentials: SignUpCredentials) => {
  const { status, name, email, password } = signUpCredentials;
  return async (dispatch: Dispatch, getState: GetTeacherState) => {
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        isStudent: status,
        name,
        email,
        password,
      });

      dispatch(loginSuccessTeacher(response.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
};

export function createSubject(subject: string) {
  return async function thunk(dispatch: Dispatch, getState: GetTeacherState) {
    const token = getState().teacher.token;

    try {
      const response = await axios.post(
        `${apiUrl}/subject`,
        {
          subject,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(addSubject(response.data.newSubject));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
}
