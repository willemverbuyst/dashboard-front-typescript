import axios from 'axios';
import { apiUrl } from '../../constants/environment';
import { Action, Dispatch } from 'redux';
import {
  FETCH_RESULTS_FOR_SUBJECT,
  REMOVE_RESULTS_FOR_SUBJECT,
  ResultsFetched,
  RemoveDetailsStudent,
  SubjectDetailStudent,
} from './types';
import { appLoading, appDoneLoading, setMessage } from '../appState/actions';
import { ThunkAction } from 'redux-thunk';
import { StoreState } from '../types';

const resultsFetched = (
  subjectDetails: SubjectDetailStudent[]
): ResultsFetched => {
  return {
    type: FETCH_RESULTS_FOR_SUBJECT,
    subjectDetails,
  };
};
export const removeDetailsStudent = (): RemoveDetailsStudent => {
  return {
    type: REMOVE_RESULTS_FOR_SUBJECT,
  };
};

export const getResultsForSubject = (
  id: number
): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch
): Promise<void> => {
  const token = localStorage.getItem('student_token');
  dispatch(appLoading());
  try {
    const response = await axios.get(`${apiUrl}/data/student/subjects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const subjectDetails = response.data;

    dispatch(resultsFetched(subjectDetails));
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
