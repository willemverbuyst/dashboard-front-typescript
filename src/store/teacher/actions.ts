import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { Dispatch } from 'redux';
import {
  LOGIN_SUCCESS_TEACHER,
  TOKEN_STILL_VALID_TEACHER,
  LOG_OUT_TEACHER,
  GetTeacherState,
  TeacherActionTypes,
} from './types';
import { Teacher, LoginCredentials } from '../../types/model';
import { selectTeacherToken } from './selectors';

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
