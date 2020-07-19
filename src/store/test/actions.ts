import axios from 'axios';
import { apiUrl } from '../../config/constants';
import { Dispatch } from 'redux';
import { MC3questions } from '../../types/model';
import {
  FETCH_MC_QUESTIONS,
  REMOVE_MC_QUESTIONS,
  MC3questionsFetched,
} from './types';
import { GetStudentState } from '../student/types';

export function questionsFetched(
  mc3questions: MC3questions
): MC3questionsFetched {
  return {
    type: FETCH_MC_QUESTIONS,
    mc3questions,
  };
}

export function removeQuestions() {
  return {
    type: REMOVE_MC_QUESTIONS,
  };
}

export function getMcQuestionsForTest(id: number) {
  return async function thunk(dispatch: Dispatch, getState: GetStudentState) {
    const token = getState().student.token;

    dispatch(removeQuestions());
    try {
      const response = await axios.get(`${apiUrl}/questions/3qtest/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const mc3questions = response.data;

      dispatch(questionsFetched(mc3questions));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
}

// export function submitTest(studentId, subjectId, q1, q2, q3, a1, a2, a3) {
//   return async function thunk(dispatch, getState) {
//     const token = getState().student.token;
//     dispatch(appLoading());
//     try {
//       const response = await axios.post(
//         `${apiUrl}/questions/3qtest`,
//         {
//           studentId,
//           subjectId,
//           q1,
//           q2,
//           q3,
//           a1,
//           a2,
//           a3,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       dispatch(showMessageWithTimeout('success', true, response.data.message));
//       dispatch(appDoneLoading());
//     } catch (error) {
//       if (error.response) {
//         console.log(error.response.data.message);
//         dispatch(setMessage('danger', true, error.response.data.message));
//       } else {
//         console.log(error.message);
//         dispatch(setMessage('danger', true, error.message));
//       }
//       dispatch(appDoneLoading());
//     }
//   };
// }
