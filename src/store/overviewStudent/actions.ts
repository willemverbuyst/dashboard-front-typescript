import axios from 'axios';
import { apiUrl } from '../../config/constants';
import { Dispatch } from 'redux';
import {
  FETCH_RESULTS_FOR_STUDENT_MAIN,
  REMOVE_RESULTS_FOR_STUDENT_MAIN,
  overviewStudentTypes,
} from './types';
import { selectStudentToken } from '../student/selectors';
import { Results } from '../../types/model';
import { GetStudentState } from '../student/types';

export function resultsFetched(results: Results): overviewStudentTypes {
  return {
    type: FETCH_RESULTS_FOR_STUDENT_MAIN,
    results,
  };
}

// export function removeResults() {
//   return {
//     type: REMOVE_RESULTS_FOR_STUDENT_MAIN,
//   };
// }

export function getResultsForStudentMain(id: number) {
  return async function thunk(dispatch: Dispatch, getState: GetStudentState) {
    const token = selectStudentToken(getState());

    try {
      const response = await axios.get(`${apiUrl}/data/main`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const results = response.data;

      dispatch(resultsFetched(results));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
}
