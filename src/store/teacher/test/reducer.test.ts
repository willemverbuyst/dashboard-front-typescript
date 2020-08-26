import reducer from '../reducer';

import {
  LOGIN_SUCCESS_TEACHER,
  TOKEN_STILL_VALID_TEACHER,
  LOG_OUT_TEACHER,
  ADD_SUBJECT,
  Teacher,
  LogOutTeacher,
  LoginSuccessTeacher,
} from '../types';

const initialState = {
  id: null,
  name: null,
  email: null,
  token: null,
  subjects: null,
  students: null,
};

describe('Teacher logging out', () => {
  const action: LogOutTeacher = {
    type: LOG_OUT_TEACHER,
  };
  describe('with given state and LOG_OUT_TEACHER action', () => {
    test('returns the initial state', () => {
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

describe('Teacher logging in', () => {
  const subject = {
    name: 'test_subject',
    id: 1,
  };
  const student = {
    name: 'test_student',
    id: 1,
  };
  const teacher: Teacher = {
    id: 1,
    name: 'test_name',
    email: 'test@test.com',
    token: 'test_token',
    subjects: [subject],
    students: [student],
  };
  const action: LoginSuccessTeacher = {
    type: LOGIN_SUCCESS_TEACHER,
    teacher,
  };
  describe('with initial state and LOGIN_SUCCESS_TEACHER action', () => {
    test('returns the new state with teacher', () => {
      const newState = reducer(initialState, action);
      expect(newState.token).not.toBeNull();
      expect(newState.token).not.toBe(initialState.token);
      expect(newState.token).toBe(teacher.token);
      expect(newState).toEqual(teacher);
      expect(newState).not.toEqual(initialState);
    });
  });
});
