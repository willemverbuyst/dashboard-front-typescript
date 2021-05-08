import { apiUrl } from '../../constants/environment';
import axios from 'axios';
import { Action, Dispatch } from 'redux';
import {
  LOGIN_SUCCESS_TEACHER,
  TOKEN_STILL_VALID_TEACHER,
  LOG_OUT_TEACHER,
  ADD_SUBJECT,
  LoginSuccessTeacher,
  LogOutTeacher,
  TokenTeacherStillValid,
  AddSubject,
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
import { ITeacher } from '../../models/users.models';
import { ISubject } from '../../models/subject.models';
import { ThunkAction } from 'redux-thunk';
import { StoreState } from '../types';

export const loginSuccessTeacher = (teacher: ITeacher): LoginSuccessTeacher => {
  return {
    type: LOGIN_SUCCESS_TEACHER,
    payload: teacher,
  };
};

export const logOutTeacher = (): LogOutTeacher => ({
  type: LOG_OUT_TEACHER,
});

export const tokenTeacherStillValid = (
  teacher: ITeacher
): TokenTeacherStillValid => ({
  type: TOKEN_STILL_VALID_TEACHER,
  payload: teacher,
});

export const addSubject = (subject: ISubject): AddSubject => ({
  type: ADD_SUBJECT,
  payload: subject,
});

export const loginTeacher = (
  credentials: LoginCredentials
): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch
): Promise<void> => {
  const { email, password, status } = credentials;
  dispatch(appLoading());
  try {
    const response = await axios.post(`${apiUrl}/login`, {
      email,
      password,
      isStudent: status,
    });

    dispatch(loginSuccessTeacher(response.data));
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

export const teacherLoggingOut = (dispatch: Dispatch): void => {
  dispatch(logOutTeacher());
};

export const getTeacherWithStoredToken = async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch(appLoading());
  try {
    const token = localStorage.getItem('teacher_token');
    // if token check if valid
    const response = await axios.get(`${apiUrl}/teacher`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(tokenTeacherStillValid(response.data));
    dispatch(appDoneLoading());
  } catch (error) {
    if (error.response) {
      console.log(error.response.message);
    } else {
      console.log(error);
    }
    dispatch(logOutTeacher());
    dispatch(appDoneLoading());
  }
};

export const createTeacher = (
  signUpCredentials: SignUpCredentials
): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch
): Promise<void> => {
  const { status, name, email, password } = signUpCredentials;
  dispatch(appLoading());
  try {
    const response = await axios.post(`${apiUrl}/signup`, {
      isStudent: status,
      name,
      email,
      password,
    });

    dispatch(loginSuccessTeacher(response.data.user));
    showMessageWithTimeout(
      dispatch,
      'success',
      true,
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

export const createSubject = (
  subject: string
): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch
): Promise<void> => {
  const token = localStorage.getItem('teacher_token');
  dispatch(appLoading());
  try {
    const response = await axios.post(
      `${apiUrl}/general/subjects`,
      {
        subject: subject.toLocaleLowerCase(),
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(addSubject(response.data.newSubject));
    showMessageWithTimeout(
      dispatch,
      'success',
      true,
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
