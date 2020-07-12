import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { Dispatch } from 'redux';
import {
  LOGIN_SUCCESS_TEACHER,
  // TOKEN_STILL_VALID_STUDENT,
  LOG_OUT_TEACHER,
  GetState,
  TeacherActionTypes,
} from './types';
import { Teacher, LoginCredentials } from '../../types/model';

const loginSuccessTeacher = (teacher: Teacher): TeacherActionTypes => {
  return {
    type: LOGIN_SUCCESS_TEACHER,
    teacher,
  };
};

export const logOutTeacher = (): TeacherActionTypes => ({
  type: LOG_OUT_TEACHER,
});

export const loginTeacher = (credentials: LoginCredentials) => {
  const { email, password, status } = credentials;
  return async (dispatch: Dispatch, getState: GetState) => {
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
  return function thunk(dispatch: Dispatch, getState: GetState) {
    dispatch(logOutTeacher());
  };
};
