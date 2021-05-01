import { apiUrl } from '../../constants/environment';
import axios from 'axios';
import { Dispatch } from 'redux';
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

const loginSuccessTeacher = (teacher: ITeacher): LoginSuccessTeacher => {
  return {
    type: LOGIN_SUCCESS_TEACHER,
    teacher,
  };
};

const logOutTeacher = (): LogOutTeacher => ({
  type: LOG_OUT_TEACHER,
});

const tokenTeacherStillValid = (teacher: ITeacher): TokenTeacherStillValid => ({
  type: TOKEN_STILL_VALID_TEACHER,
  teacher,
});

const addSubject = (subject: ISubject): AddSubject => ({
  type: ADD_SUBJECT,
  subject,
});

export const loginTeacher = (credentials: LoginCredentials) => {
  const { email, password, status } = credentials;
  return async (dispatch: any) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
        isStudent: status,
      });
      console.log(response.data);
      dispatch(loginSuccessTeacher(response.data));

      dispatch(showMessageWithTimeout('success', false, 'welcome back!', 1500));
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

export const teacherLoggingOut = () => {
  return (dispatch: Dispatch) => {
    dispatch(logOutTeacher());
  };
};

export const getTeacherWithStoredToken = () => {
  return async (dispatch: Dispatch) => {
    const token = localStorage.getItem('teacher_token');

    if (token === null) return;
    dispatch(appLoading());
    try {
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
};

export const createTeacher = (signUpCredentials: SignUpCredentials) => {
  const { status, name, email, password } = signUpCredentials;
  return async (dispatch: any) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        isStudent: status,
        name,
        email,
        password,
      });

      dispatch(loginSuccessTeacher(response.data));
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

export const createSubject = (subject: string) => {
  return async (dispatch: any) => {
    const token = localStorage.getItem('teacher_token');
    dispatch(appLoading());
    try {
      const response = await axios.post(
        `${apiUrl}/subject`,
        {
          subject,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(addSubject(response.data.newSubject));
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
