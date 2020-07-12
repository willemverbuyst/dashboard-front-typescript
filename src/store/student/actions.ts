import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { Dispatch } from 'redux';
import {
  LOGIN_SUCCESS_STUDENT,
  // TOKEN_STILL_VALID_STUDENT,
  LOG_OUT_STUDENT,
  GetState,
  StudentActionTypes,
} from './types';
import { Student, LoginCredentials } from '../../types/model';

export const loginSuccessStudent = (student: Student): StudentActionTypes => {
  return {
    type: LOGIN_SUCCESS_STUDENT,
    student,
  };
};

export const logOutStudent = (): StudentActionTypes => ({
  type: LOG_OUT_STUDENT,
});

export const loginStudent = (credentials: LoginCredentials) => {
  const { email, password, status } = credentials;
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
        isStudent: status,
      });

      dispatch(loginSuccessStudent(response.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
};

export const studentLoggingOut = () => {
  return function thunk(dispatch: Dispatch, getState: GetState) {
    dispatch(logOutStudent());
  };
};
