import {
  LOGIN_SUCCESS_STUDENT,
  TOKEN_STILL_VALID_STUDENT,
  LOG_OUT_STUDENT,
  Student,
  StudentActionTypes,
} from './types';

const token = localStorage.getItem('student_token');

const initialState: Student = {
  id: null,
  name: null,
  email: null,
  token: token,
  subjects: null,
};

export default (state = initialState, action: StudentActionTypes) => {
  switch (action.type) {
    case LOGIN_SUCCESS_STUDENT:
      const userToken = action.student.token;
      userToken && localStorage.setItem('student_token', userToken);
      return { ...state, ...action.student };

    case TOKEN_STILL_VALID_STUDENT:
      return { ...state, ...action.student };

    case LOG_OUT_STUDENT:
      localStorage.removeItem('student_token');
      return { ...initialState, token: null };

    default:
      return state;
  }
};
