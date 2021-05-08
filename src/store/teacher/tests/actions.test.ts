import axios from 'axios';
import { ISubject } from '../../../models/subject.models';
import { ITeacher } from '../../../models/users.models';

import {
  addSubject,
  loginSuccessTeacher,
  logOutTeacher,
  tokenTeacherStillValid,
} from '../actions';
import {
  AddSubject,
  ADD_SUBJECT,
  LoginSuccessTeacher,
  LOGIN_SUCCESS_TEACHER,
  LogOutTeacher,
  LOG_OUT_TEACHER,
  TokenTeacherStillValid,
  TOKEN_STILL_VALID_TEACHER,
} from '../types';

const mockAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.resetAllMocks();
});

describe('#teacherState', () => {
  describe('#loginSuccessTeacher', () => {
    const teacher: ITeacher = {
      id: 1,
      name: 'test_name',
      email: 'test@test.com',
      token: 'test_token',
      subjects: [
        {
          name: 'test_subject',
          id: 1,
        },
      ],
      students: [
        {
          name: 'test_student',
          id: 1,
        },
      ],
    };
    const action: LoginSuccessTeacher = {
      type: LOGIN_SUCCESS_TEACHER,
      payload: teacher,
    };

    test('returns an action w/ type LOGIN_SUCCESS_TEACHER and a payload', () => {
      expect(loginSuccessTeacher(teacher)).toEqual(action);
      expect(loginSuccessTeacher(teacher).type).toEqual(LOGIN_SUCCESS_TEACHER);
      expect(loginSuccessTeacher(teacher).payload).toEqual(teacher);
    });
  });

  describe('#logOutTeacher', () => {
    const action: LogOutTeacher = {
      type: LOG_OUT_TEACHER,
    };

    test('return an action w/ type LOG_OUT_TEACHER and no payload', () => {
      expect(logOutTeacher()).toEqual(action);
      expect(logOutTeacher().type).toEqual(LOG_OUT_TEACHER);
      expect(logOutTeacher()).not.toHaveProperty('payload');
    });
  });

  describe('#tokenTeacherStillValid ', () => {
    const teacher: ITeacher = {
      id: 1,
      name: 'test_name',
      email: 'test@test.com',
      token: 'test_token',
      subjects: [
        {
          name: 'test_subject',
          id: 1,
        },
      ],
      students: [
        {
          name: 'test_student',
          id: 1,
        },
      ],
    };
    const action: TokenTeacherStillValid = {
      type: TOKEN_STILL_VALID_TEACHER,
      payload: teacher,
    };

    test('return an action w/ type LOG_OUT_TEACHER and no payload', () => {
      expect(tokenTeacherStillValid(teacher)).toEqual(action);
      expect(tokenTeacherStillValid(teacher).type).toEqual(
        TOKEN_STILL_VALID_TEACHER
      );
      expect(tokenTeacherStillValid(teacher).payload).toEqual(teacher);
    });
  });

  describe('#addSubject', () => {
    const subject: ISubject = {
      name: 'test_subject',
      id: 1,
    };
    const action: AddSubject = {
      type: ADD_SUBJECT,
      payload: subject,
    };

    test('return an action w/ type LOG_OUT_TEACHER and no payload', () => {
      expect(addSubject(subject)).toEqual(action);
      expect(addSubject(subject).type).toEqual(ADD_SUBJECT);
      expect(addSubject(subject).payload).toEqual(subject);
    });
  });
});
