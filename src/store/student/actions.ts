import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { Dispatch } from 'redux';
import {
  LOGIN_SUCCESS_STUDENT,
  TOKEN_STILL_VALID_STUDENT,
  LOG_OUT_STUDENT,
  GetStudentState,
  StudentActionTypes,
} from './types';
import {
  Student,
  LoginCredentials,
  SignUpCredentials,
} from '../../types/model';
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from '../appState/actions';
import { removeResults } from '../overviewStudent/actions';

export const loginSuccessStudent = (student: Student): StudentActionTypes => {
  return {
    type: LOGIN_SUCCESS_STUDENT,
    student,
  };
};

export const logOutStudent = (): StudentActionTypes => ({
  type: LOG_OUT_STUDENT,
});

const tokenStudentStillValid = (student: Student): StudentActionTypes => ({
  type: TOKEN_STILL_VALID_STUDENT,
  student,
});

export const loginStudent = (credentials: LoginCredentials) => {
  const { email, password, status } = credentials;
  return async (dispatch: any, getState: GetStudentState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
        isStudent: status,
      });

      dispatch(loginSuccessStudent(response.data));
      dispatch(showMessageWithTimeout('success', false, 'Welcome back!', 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage('error', true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage('error', true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const studentLoggingOut = () => {
  return function thunk(dispatch: Dispatch, getState: GetStudentState) {
    dispatch(logOutStudent());
    dispatch(removeResults());
  };
};

export const getStudentWithStoredToken = () => {
  return async (dispatch: Dispatch, getState: GetStudentState) => {
    const token = getState().student.token;

    if (token === null) return;

    try {
      // if token check if valid
      const response = await axios.get(`${apiUrl}/student`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(tokenStudentStillValid(response.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      dispatch(logOutStudent());
    }
  };
};

export const createStudent = (signUpCredentials: SignUpCredentials) => {
  const { status, name, email, password, teacherId } = signUpCredentials;
  return async (dispatch: Dispatch, getState: GetStudentState) => {
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        isStudent: status,
        name,
        email,
        password,
        teacherId,
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
