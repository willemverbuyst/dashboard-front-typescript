import {
  LOGIN_SUCCESS_TEACHER,
  TOKEN_STILL_VALID_TEACHER,
  LOG_OUT_TEACHER,
  ADD_SUBJECT,
  TeacherActionTypes,
  TeacherState,
} from './types';

const token = localStorage.getItem('teacher_token');

const initialState: TeacherState = {
  id: null,
  name: null,
  email: null,
  token: token,
  subjects: null,
  students: null,
};

export default (
  state = initialState,
  action: TeacherActionTypes
): TeacherState => {
  switch (action.type) {
    case LOGIN_SUCCESS_TEACHER:
      const userToken = action.payload.token;
      userToken && localStorage.setItem('teacher_token', userToken);
      return { ...state, ...action.payload };

    case TOKEN_STILL_VALID_TEACHER:
      return { ...state, ...action.payload };

    case LOG_OUT_TEACHER:
      localStorage.removeItem('teacher_token');
      return { ...initialState, token: null };

    case ADD_SUBJECT:
      if (state.subjects) {
        return { ...state, subjects: [...state.subjects, action.payload] };
      } else {
        return { ...state, subjects: [action.payload] };
      }

    default:
      return state;
  }
};
