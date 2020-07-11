import { Student } from '../../types/model';
import {
  StudentActionTypes,
  LOGIN_SUCCESS_STUDENT,
  // TOKEN_STILL_VALID_STUDENT,
  LOG_OUT_STUDENT,
} from './types';

const token = localStorage.getItem('token');

const initialState: Student = {
  id: null,
  name: null,
  email: null,
  token: token,
};

export default (state = initialState, action: StudentActionTypes) => {
  switch (action.type) {
    case LOGIN_SUCCESS_STUDENT:
      const userToken = action.student.token;
      if (userToken) localStorage.setItem('student_token', userToken);
      return { ...state, ...action.student };

    // case TOKEN_STILL_VALID_STUDENT:
    //   return { ...state, ...action.payload };

    case LOG_OUT_STUDENT:
      localStorage.removeItem('student_token');
      return { ...initialState, token: null };

    default:
      return state;
  }
};
