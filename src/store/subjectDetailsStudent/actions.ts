import axios from 'axios';
import { apiUrl } from '../../config/constants';
import { Dispatch } from 'redux';
import { SubjectDetailsStudent } from '../../types/model';
import {
  FETCH_RESULTS_FOR_SUBJECT,
  REMOVE_RESULTS_FOR_SUBJECT,
  StudentDetailsTypes,
} from './types';
import { GetStudentState } from '../student/types';

export function resultsFetched(
  subjectDetails: SubjectDetailsStudent
): StudentDetailsTypes {
  return {
    type: FETCH_RESULTS_FOR_SUBJECT,
    subjectDetails,
  };
}
export function removeDetailsStudent() {
  return {
    type: REMOVE_RESULTS_FOR_SUBJECT,
  };
}

export function getResultsForSubject(id: number) {
  return async function thunk(dispatch: Dispatch, getState: GetStudentState) {
    const token = getState().student.token;

    try {
      const response = await axios.get(`${apiUrl}/data/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const subjectDetails = response.data;

      dispatch(resultsFetched(subjectDetails));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
}
