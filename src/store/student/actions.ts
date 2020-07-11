import { Dispatch } from 'redux';
import {
  LOGIN_SUCCESS_STUDENT,
  // TOKEN_STILL_VALID_STUDENT,
  LOG_OUT_STUDENT,
  GetState,
  StudentActionTypes,
} from './types';
import { Student } from '../../types/model';

import { apiUrl } from '../../config/constants';
import axios from 'axios';

const loginSuccessStudent = (student: Student): StudentActionTypes => {
  return {
    type: LOGIN_SUCCESS_STUDENT,
    student,
  };
};

export const logOutStudent = (): StudentActionTypes => ({
  type: LOG_OUT_STUDENT,
});

export const loginStudent = (
  email: string,
  password: string,
  isStudent: number
) => {
  return async (dispatch: Dispatch, getState: GetState) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
        isStudent,
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
