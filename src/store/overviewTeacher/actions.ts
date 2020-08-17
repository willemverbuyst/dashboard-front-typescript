import axios from 'axios';
import { apiUrl } from '../../config/constants';
import { Dispatch } from 'redux';
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
} from './types';
import { Subject, Student, Main } from '../../types/overview-teacher-models';
import { GetTeacherState } from '../teacher/types';

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

export const getSubjectForOverview = (id: number) => {
  return async (dispatch: Dispatch, getState: GetTeacherState) => {
    const token = getState().teacher.token;
    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/data/subjects/${id}`, {
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
};

export const getStudentForOverview = (id: number) => {
  return async (dispatch: any, getState: GetTeacherState) => {
    const token = getState().teacher.token;
    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/data/students/${id}`, {
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
};

export const getMainOverview = (id: number | null) => {
  return async function thunk(dispatch: any, getState: GetTeacherState) {
    const token = getState().teacher.token;
    dispatch(appLoading());
    // const dataMain = getState().overViewTeacher.main;
    // if (dataMain.length < 1) {
    try {
      const response = await axios.get(`${apiUrl}/data/teacher/${id}`, {
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
};
