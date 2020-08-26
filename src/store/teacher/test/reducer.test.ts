import reducer from '../reducer';

import {
  LOGIN_SUCCESS_TEACHER,
  TOKEN_STILL_VALID_TEACHER,
  LOG_OUT_TEACHER,
  ADD_SUBJECT,
  Teacher,
  LogOutTeacher,
} from '../types';

const initialState = {
  id: null,
  name: null,
  email: null,
  token: null,
  subjects: null,
  students: null,
};

describe('Teacher logs out', () => {
  const action: LogOutTeacher = {
    type: LOG_OUT_TEACHER,
  };
  describe('if given state and LOG_OUT_TEACHER action', () => {
    test('returns the initial', () => {
      const newState = reducer(initialState, action);
      expect(newState).toEqual(initialState);
      expect(newState.token).toBeNull();
      expect(initialState.token).toBeNull();
      newState.token = 'x';
      const newerState = reducer(newState, action);
      expect(newState.token).not.toEqual(initialState.token);
      expect(newerState.token).toBeNull();
      expect(initialState.token).toBeNull();
    });
  });
});
