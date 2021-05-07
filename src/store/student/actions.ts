import { apiUrl } from '../../constants/environment';
import axios from 'axios';
import { Dispatch } from 'redux';
import {
  LOGIN_SUCCESS_STUDENT,
  TOKEN_STILL_VALID_STUDENT,
  LOG_OUT_STUDENT,
  LoginSuccessStudent,
  LogOutStudent,
  TokenStudentStillValid,
  Student,
} from './types';
import {
  LoginCredentials,
  SignUpCredentials,
} from '../../models/credentials.model';
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from '../appState/actions';
import { removeResults } from '../overviewStudent/actions';
import { removeDetailsStudent } from '../subjectDetailsStudent/actions';
import { removeQuestions } from '../test/actions';

export const loginSuccessStudent = (student: Student): LoginSuccessStudent => {
  return {
    type: LOGIN_SUCCESS_STUDENT,
    student,
  };
};

export const tokenStudentStillValid = (
  student: Student
): TokenStudentStillValid => ({
  type: TOKEN_STILL_VALID_STUDENT,
  student,
});

export const logOutStudent = (): LogOutStudent => ({
  type: LOG_OUT_STUDENT,
});

export const studentLoggingIn = (credentials: LoginCredentials) => {
  return async (dispatch: Dispatch) => {
    dispatch(appLoading());
    try {
      const { email, password, status } = credentials;
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
        isStudent: status,
      });

      dispatch(loginSuccessStudent(response.data));
      dispatch<any>(
        showMessageWithTimeout('success', false, 'Welcome back!', 1500)
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

export const getStudentWithStoredToken = () => {
  return async (dispatch: Dispatch) => {
    dispatch(appLoading());
    try {
      // if token check if valid
      const token = localStorage.getItem('student_token');
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
  return function thunk(dispatch: Dispatch) {
    dispatch(logOutStudent());
    dispatch(removeResults());
    dispatch(removeDetailsStudent());
    dispatch(removeQuestions());
  };
};

export const createStudent = (signUpCredentials: SignUpCredentials) => {
  const { status, name, email, password, teacherId } = signUpCredentials;
  return async (dispatch: Dispatch) => {
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
      dispatch<any>(
        showMessageWithTimeout(
          'success',
          true,
          response.data.message,
          1500,
          dispatch
        )
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
