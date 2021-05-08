import {
  LOGIN_SUCCESS_STUDENT,
  TOKEN_STILL_VALID_STUDENT,
  LOG_OUT_STUDENT,
  StudentActionTypes,
  StudentState,
} from './types';

const token = localStorage.getItem('student_token');

const initialState: StudentState = {
  id: null,
  name: null,
  email: null,
  token: token,
  subjects: null,
};

export default (
  state = initialState,
  action: StudentActionTypes
): StudentState => {
  switch (action.type) {
    case LOGIN_SUCCESS_STUDENT:
      const userToken = action.payload.token;
      userToken && localStorage.setItem('student_token', userToken);
      return { ...state, ...action.payload };

    case TOKEN_STILL_VALID_STUDENT:
      return { ...state, ...action.payload };

    case LOG_OUT_STUDENT:
      localStorage.removeItem('student_token');
      return { ...initialState, token: null };

    default:
      return state;
  }
};
