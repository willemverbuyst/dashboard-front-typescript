import { Teacher } from '../../types/model';
import {
  TeacherActionTypes,
  LOGIN_SUCCESS_TEACHER,
  TOKEN_STILL_VALID_TEACHER,
  LOG_OUT_TEACHER,
} from './types';

const token = localStorage.getItem('teacher_token');

const initialState: Teacher = {
  id: null,
  name: null,
  email: null,
  token: token,
  subjects: null,
  students: null,
};

export default (state = initialState, action: TeacherActionTypes) => {
  switch (action.type) {
    case LOGIN_SUCCESS_TEACHER:
      const userToken = action.teacher.token;
      userToken && localStorage.setItem('teacher_token', userToken);
      return { ...state, ...action.teacher };

    case TOKEN_STILL_VALID_TEACHER:
      return { ...state, ...action.teacher };

    case LOG_OUT_TEACHER:
      localStorage.removeItem('teacher_token');
      return { ...initialState, token: null };

    default:
      return state;
  }
};
