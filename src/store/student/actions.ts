import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { Dispatch } from 'redux';
import {
  LOGIN_SUCCESS_STUDENT,
  TOKEN_STILL_VALID_STUDENT,
  LOG_OUT_STUDENT,
  GetStudentState,
  LoginSuccessStudent,
  LogOutStudent,
  TokenStudentStillValid,
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
import { removeDetailsStudent } from '../subjectDetailsStudent/actions';
import { removeQuestions } from '../test/actions';

const loginSuccessStudent = (student: Student): LoginSuccessStudent => {
  return {
    type: LOGIN_SUCCESS_STUDENT,
    student,
  };
};

const tokenStudentStillValid = (student: Student): TokenStudentStillValid => ({
  type: TOKEN_STILL_VALID_STUDENT,
  student,
});

const logOutStudent = (): LogOutStudent => ({
  type: LOG_OUT_STUDENT,
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

export const getStudentWithStoredToken = () => {
  return async (dispatch: Dispatch, getState: GetStudentState) => {
    const token = getState().student.token;

    if (token === null) return;
    dispatch(appLoading());
    try {
      // if token check if valid
      const response = await axios.get(`${apiUrl}/student`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(tokenStudentStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      dispatch(logOutStudent());
      dispatch(appDoneLoading());
    }
  };
};

export const studentLoggingOut = () => {
  return function thunk(dispatch: Dispatch, getState: GetStudentState) {
    dispatch(logOutStudent());
    dispatch(removeResults());
    dispatch(removeDetailsStudent());
    dispatch(removeQuestions());
  };
};

export const createStudent = (signUpCredentials: SignUpCredentials) => {
  const { status, name, email, password, teacherId } = signUpCredentials;
  return async (dispatch: any, getState: GetStudentState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        isStudent: status,
        name,
        email,
        password,
        teacherId,
      });

      dispatch(loginSuccessStudent(response.data));
      dispatch(
        showMessageWithTimeout('success', true, response.data.message, 1500)
      );
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
