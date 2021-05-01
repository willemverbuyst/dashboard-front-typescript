import axios from 'axios';
import { apiUrl } from '../../constants/environment';
import { Dispatch } from 'redux';
import {
  FETCH_RESULTS_FOR_STUDENT_MAIN,
  REMOVE_RESULTS_FOR_STUDENT_MAIN,
  ResultsFetched,
  RemoveResults,
  Result,
} from './types';
import { appLoading, appDoneLoading, setMessage } from '../appState/actions';

const resultsFetched = (results: Result[]): ResultsFetched => {
  return {
    type: FETCH_RESULTS_FOR_STUDENT_MAIN,
    results,
  };
};

export const removeResults = (): RemoveResults => {
  return {
    type: REMOVE_RESULTS_FOR_STUDENT_MAIN,
  };
};

export const getResultsForStudentMain = () => {
  return async (dispatch: Dispatch) => {
    const token = localStorage.getItem('student_token');
    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/data/main`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const results = response.data;

      dispatch(resultsFetched(results));
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
