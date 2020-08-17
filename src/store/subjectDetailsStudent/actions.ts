import axios from 'axios';
import { apiUrl } from '../../config/constants';
import { Dispatch } from 'redux';
import { SubjectDetailsStudent } from '../../types/model';
import {
  FETCH_RESULTS_FOR_SUBJECT,
  REMOVE_RESULTS_FOR_SUBJECT,
  ResultsFetched,
  RemoveDetailsStudent,
} from './types';
import { GetStudentState } from '../student/types';
import { appLoading, appDoneLoading, setMessage } from '../appState/actions';

const resultsFetched = (
  subjectDetails: SubjectDetailsStudent
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

export const getResultsForSubject = (id: number) => {
  return async (dispatch: Dispatch, getState: GetStudentState) => {
    const token = getState().student.token;
    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/data/${id}`, {
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
};
