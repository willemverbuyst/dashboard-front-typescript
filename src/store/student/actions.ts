import { apiUrl } from '../../constants/environment';
import axios from 'axios';
import { Action, Dispatch } from 'redux';
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
  ILoginCredentials,
  ISignUpCredentials,
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
import { ThunkAction } from 'redux-thunk';
import { StoreState } from '../types';

export const loginSuccessStudent = (student: Student): LoginSuccessStudent => {
  return {
    type: LOGIN_SUCCESS_STUDENT,
    payload: student,
  };
};

export const tokenStudentStillValid = (
  student: Student
): TokenStudentStillValid => ({
  type: TOKEN_STILL_VALID_STUDENT,
  payload: student,
});

export const logOutStudent = (): LogOutStudent => ({
  type: LOG_OUT_STUDENT,
});

export const studentLoggingIn = (
  credentials: ILoginCredentials
): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch(appLoading());
  try {
    const { email, password, status } = credentials;
    const response = await axios.post(`${apiUrl}/login`, {
      email,
      password,
      isStudent: status,
    });

    dispatch(loginSuccessStudent(response.data));
    showMessageWithTimeout(dispatch, 'success', false, 'Welcome back!', 1500);

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

export const getStudentWithStoredToken = async (
  dispatch: Dispatch
): Promise<void> => {
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

export const studentLoggingOut = (dispatch: Dispatch): void => {
  dispatch(logOutStudent());
  dispatch(removeResults());
  dispatch(removeDetailsStudent());
  dispatch(removeQuestions());
};

export const createStudent = (
  signUpCredentials: ISignUpCredentials
): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch(appLoading());
  try {
    const { status, name, email, password, teacherId } = signUpCredentials;
    const response = await axios.post(`${apiUrl}/signup`, {
      isStudent: status,
      name,
      email,
      password,
      teacherId,
    });

    dispatch(loginSuccessStudent(response.data.user));
    showMessageWithTimeout(
      dispatch,
      'success',
      false,
      response.data.message,
      1500
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
