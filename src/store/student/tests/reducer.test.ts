import { ISubject } from '../../../models/subject.models';
import reducer from '../reducer';
import {
  LOGIN_SUCCESS_STUDENT,
  TOKEN_STILL_VALID_STUDENT,
  LOG_OUT_STUDENT,
  LoginSuccessStudent,
  LogOutStudent,
  TokenStudentStillValid,
  StudentState,
  Student,
} from '../types';

describe('#studentState', () => {
  describe('#logoutStudent', () => {
    describe('w/ state and LOG_OUT_STUDENT action', () => {
      const initialState: StudentState = {
        id: null,
        name: null,
        email: null,
        token: null,
        subjects: null,
      };
      const state: StudentState = {
        id: null,
        name: null,
        email: null,
        token: null,
        subjects: null,
      };
      const action: LogOutStudent = {
        type: LOG_OUT_STUDENT,
      };
      const newState: StudentState = reducer(state, action);

      test('returns the initial state', () => {
        expect(newState).toEqual(initialState);
        expect(newState.token).toBeNull();
        expect(initialState.token).toBeNull();
      });
    });

    describe('w/ initial state and LOG_OUT_STUDENT action', () => {
      const initialState: StudentState = {
        id: null,
        name: null,
        email: null,
        token: null,
        subjects: null,
      };
      const action: LogOutStudent = {
        type: LOG_OUT_STUDENT,
      };
      const newState: StudentState = reducer(initialState, action);

      test('returns the initial state', () => {
        expect(newState.token).toEqual(initialState.token);
        expect(newState.token).toBeNull();
        expect(initialState.token).toBeNull();
      });
    });
  });

  describe('log in student', () => {
    describe('w/ initial state and LOGIN_SUCCESS_STUDENT action', () => {
      const initialState: StudentState = {
        id: null,
        name: null,
        email: null,
        token: null,
        subjects: null,
      };
      const subject: ISubject = {
        name: 'test_subject',
        id: 1,
      };
      const student: Student = {
        id: 1,
        name: 'test_name',
        email: 'test@test.com',
        token: 'test_token',
        subjects: [subject],
      };
      const action: LoginSuccessStudent = {
        type: LOGIN_SUCCESS_STUDENT,
        payload: student,
      };
      const newState: StudentState = reducer(initialState, action);

      test('returns the new state with student', () => {
        expect(newState.token).not.toBeNull();
        expect(newState.token).not.toBe(initialState.token);
        expect(newState.token).toBe(student.token);
        expect(newState).toEqual(student);
        expect(newState).not.toEqual(initialState);
      });
    });
  });

  describe('student with token', () => {
    describe('w/ initial state and TOKEN_STILL_VALID_STUDENT action', () => {
      const initialState: StudentState = {
        id: null,
        name: null,
        email: null,
        token: null,
        subjects: null,
      };
      const subject: ISubject = {
        name: 'test_subject',
        id: 1,
      };
      const student: Student = {
        id: 1,
        name: 'test_name',
        email: 'test@test.com',
        token: 'test_token',
        subjects: [subject],
      };
      const action: TokenStudentStillValid = {
        type: TOKEN_STILL_VALID_STUDENT,
        payload: student,
      };
      const newState: StudentState = reducer(initialState, action);

      test('returns the new state with student', () => {
        expect(newState.token).not.toBeNull();
        expect(newState.token).not.toBe(initialState.token);
        expect(newState.token).toBe(student.token);
        expect(newState).toEqual(student);
        expect(newState).not.toEqual(initialState);
      });
    });
  });
});
