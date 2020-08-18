import reducer from '../reducer';
import {
  LOGIN_SUCCESS_STUDENT,
  TOKEN_STILL_VALID_STUDENT,
  LOG_OUT_STUDENT,
  LoginSuccessStudent,
  LogOutStudent,
  TokenStudentStillValid,
} from '../types';

let initialState = {
  id: null,
  name: null,
  email: null,
  token: null,
  subjects: null,
};

describe('studentReducer logout', () => {
  const action: LogOutStudent = {
    type: LOG_OUT_STUDENT,
  };
  describe('if given initialstate and LOG_OUT_STUDENT action', () => {
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

describe('studentReducer login', () => {
  const subject = {
    name: 'test_subject',
    id: 1,
  };
  const student = {
    id: 1,
    name: 'test_name',
    email: 'test@test.com',
    token: 'test_token',
    subjects: [subject],
  };
  const action: LoginSuccessStudent = {
    type: LOGIN_SUCCESS_STUDENT,
    student,
  };
  describe('on LOGIN_SUCCESS_STUDENT action', () => {
    test('returns the new state with student', () => {
      const newState = reducer(initialState, action);
      expect(newState.token).not.toBeNull();
      expect(newState.token).not.toBe(initialState.token);
      expect(newState.token).toBe(student.token);
      expect(newState).toEqual(student);
      expect(newState).not.toEqual(initialState);
    });
  });
});

describe('studentReducer studentWithToken', () => {
  const subject = {
    name: 'test_subject',
    id: 1,
  };
  const student = {
    id: 1,
    name: 'test_name',
    email: 'test@test.com',
    token: 'test_token',
    subjects: [subject],
  };
  const action: TokenStudentStillValid = {
    type: TOKEN_STILL_VALID_STUDENT,
    student,
  };
  describe('on TOKEN_STILL_VALID_STUDENT action', () => {
    test('returns the new state with student', () => {
      const newState = reducer(initialState, action);
      expect(newState.token).not.toBeNull();
      expect(newState.token).not.toBe(initialState.token);
      expect(newState.token).toBe(student.token);
      expect(newState).toEqual(student);
      expect(newState).not.toEqual(initialState);
    });
  });
});
