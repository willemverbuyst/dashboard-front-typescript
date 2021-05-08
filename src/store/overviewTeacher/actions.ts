import axios from 'axios';
import { apiUrl } from '../../constants/environment';
import { Action, Dispatch } from 'redux';
import { appLoading, appDoneLoading, setMessage } from '../appState/actions';
import {
  FETCH_OVERVIEW_FOR_SUBJECT,
  FETCH_OVERVIEW_FOR_STUDENT,
  FETCH_OVERVIEW_FOR_MAIN,
  REMOVE_OVERVIEW,
  SubjectsFetched,
  StudentsFetched,
  MainFetched,
  RemoveOverviewTeacher,
  Subject,
  Student,
  Main,
} from './types';
import { ThunkAction } from 'redux-thunk';
import { StoreState } from '../types';

export const subjectsFetched = (subjects: Subject[]): SubjectsFetched => {
  return {
    type: FETCH_OVERVIEW_FOR_SUBJECT,
    payload: subjects,
  };
};

export const studentsFetched = (results: Student[]): StudentsFetched => {
  return {
    type: FETCH_OVERVIEW_FOR_STUDENT,
    payload: results,
  };
};

export const mainFetched = (results: Main): MainFetched => {
  return {
    type: FETCH_OVERVIEW_FOR_MAIN,
    payload: results,
  };
};

export const removeOverviewTeacher = (): RemoveOverviewTeacher => {
  return {
    type: REMOVE_OVERVIEW,
  };
};

export const getSubjectForOverview = (
  id: number
): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch
): Promise<void> => {
  const token = localStorage.getItem('teacher_token');
  dispatch(appLoading());
  try {
    const response = await axios.get(`${apiUrl}/data/teacher/subjects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const results = response.data;

    dispatch(subjectsFetched(results));
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

export const getStudentForOverview = (
  id: number
): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: any
): Promise<void> => {
  const token = localStorage.getItem('teacher_token');
  dispatch(appLoading());
  try {
    const response = await axios.get(`${apiUrl}/data/teacher/students/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const results = response.data;

    dispatch(studentsFetched(results));
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

export const getMainOverview = async (dispatch: any): Promise<void> => {
  const token = localStorage.getItem('teacher_token');
  dispatch(appLoading());
  try {
    const response = await axios.get(`${apiUrl}/data/teacher/main`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const results = response.data;

    dispatch(mainFetched(results));
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
    // }
  }
  dispatch(appDoneLoading());
  return;
};
