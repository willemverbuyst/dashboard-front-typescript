import { ISubject } from '../../../models/subject.models';
import { IStudent, ITeacher } from '../../../models/users.models';
import reducer from '../reducer';

import {
  LOGIN_SUCCESS_TEACHER,
  TOKEN_STILL_VALID_TEACHER,
  LOG_OUT_TEACHER,
  ADD_SUBJECT,
  LogOutTeacher,
  LoginSuccessTeacher,
  TokenTeacherStillValid,
  AddSubject,
  TeacherState,
} from '../types';

describe('#teacherReducer', () => {
  describe('w/ state and LOG_OUT_TEACHER action', () => {
    const initialState: TeacherState = {
      id: null,
      name: null,
      email: null,
      token: null,
      subjects: null,
      students: null,
    };
    const state: TeacherState = {
      id: null,
      name: null,
      email: null,
      token: 'x',
      subjects: null,
      students: null,
    };
    const action: LogOutTeacher = {
      type: LOG_OUT_TEACHER,
    };
    const newState = reducer(state, action);

    test('returns the initial state', () => {
      expect(newState.token).toEqual(initialState.token);
      expect(newState.token).toBeNull();
      expect(initialState.token).toBeNull();
    });
  });

  describe('w/ inistial state and LOG_OUT_TEACHER action', () => {
    const initialState: TeacherState = {
      id: null,
      name: null,
      email: null,
      token: null,
      subjects: null,
      students: null,
    };
    const action: LogOutTeacher = {
      type: LOG_OUT_TEACHER,
    };
    const newState = reducer(initialState, action);

    test('returns the initial state', () => {
      expect(newState).toEqual(initialState);
      expect(newState.token).toBeNull();
      expect(initialState.token).toBeNull();
    });
  });
});

describe('w/ initial state and LOGIN_SUCCESS_TEACHER action', () => {
  const subject: ISubject = {
    name: 'test_subject',
    id: 1,
  };
  const student: IStudent = {
    name: 'test_student',
    id: 1,
  };
  const teacher: ITeacher = {
    id: 1,
    name: 'test_name',
    email: 'test@test.com',
    token: 'test_token',
    subjects: [subject],
    students: [student],
  };
  const initialState: TeacherState = {
    id: null,
    name: null,
    email: null,
    token: null,
    subjects: null,
    students: null,
  };
  const action: LoginSuccessTeacher = {
    type: LOGIN_SUCCESS_TEACHER,
    payload: teacher,
  };
  const newState = reducer(initialState, action);

  test('returns the new state with teacher', () => {
    expect(newState.token).not.toBeNull();
    expect(newState.token).not.toBe(initialState.token);
    expect(newState.token).toBe(teacher.token);
    expect(newState).toEqual(teacher);
    expect(newState).not.toEqual(initialState);
  });
});

describe('w/ initial state and TOKEN_STILL_VALID_TEACHER action', () => {
  const subject: ISubject = {
    name: 'test_subject',
    id: 1,
  };
  const student: IStudent = {
    name: 'test_student',
    id: 1,
  };
  const teacher: ITeacher = {
    id: 1,
    name: 'test_name',
    email: 'test@test.com',
    token: 'test_token',
    subjects: [subject],
    students: [student],
  };
  const initialState: TeacherState = {
    id: null,
    name: null,
    email: null,
    token: null,
    subjects: null,
    students: null,
  };
  const action: TokenTeacherStillValid = {
    type: TOKEN_STILL_VALID_TEACHER,
    payload: teacher,
  };
  const newState: TeacherState = reducer(initialState, action);

  test('returns the new state with teacher', () => {
    expect(newState.token).not.toBeNull();
    expect(newState.token).not.toBe(initialState.token);
    expect(newState.token).toBe(teacher.token);
    expect(newState).toEqual(teacher);
    expect(newState).not.toEqual(initialState);
  });
});

describe('w/ initial state and ADD_SUBJECT action', () => {
  const subject: ISubject = {
    name: 'test_subject',
    id: 1,
  };
  const newSubject: ISubject = {
    name: 'test_new_subject',
    id: 1,
  };
  const student: IStudent = {
    name: 'test_student',
    id: 1,
  };
  const teacher: ITeacher = {
    id: 1,
    name: 'test_name',
    email: 'test@test.com',
    token: 'test_token',
    subjects: [subject],
    students: [student],
  };
  const initialState: TeacherState = {
    id: null,
    name: null,
    email: null,
    token: null,
    subjects: null,
    students: null,
  };
  const action: AddSubject = {
    type: ADD_SUBJECT,
    payload: newSubject,
  };
  const newState: TeacherState = reducer(teacher, action);

  test('returns the new state with new subject', () => {
    expect(newState.token).toBe(teacher.token);
    expect(newState.subjects).toEqual([subject, newSubject]);
    expect(newState).not.toEqual(initialState);
  });
});

describe('w/ state and ADD_SUBJECT action', () => {
  const subject: ISubject = {
    name: 'test_subject',
    id: 1,
  };
  const newSubject: ISubject = {
    name: 'test_new_subject',
    id: 1,
  };
  const student: IStudent = {
    name: 'test_student',
    id: 1,
  };
  const teacher: ITeacher = {
    id: 1,
    name: 'test_name',
    email: 'test@test.com',
    token: 'test_token',
    subjects: [subject],
    students: [student],
  };
  const initialState: TeacherState = {
    id: null,
    name: null,
    email: null,
    token: null,
    subjects: null,
    students: null,
  };
  const action: AddSubject = {
    type: ADD_SUBJECT,
    payload: newSubject,
  };
  const newState = reducer({ ...teacher, subjects: [] }, action);

  test('returns the new state with only one subject', () => {
    expect(newState.subjects).toEqual([newSubject]);
    expect(newState).not.toEqual(initialState);
  });
});
