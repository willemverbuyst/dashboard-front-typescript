import axios from 'axios';
import {
  ILoginCredentials,
  ISignUpCredentials,
} from '../../../models/credentials.model';
import { ISubject } from '../../../models/subject.models';
import { ITeacher } from '../../../models/users.models';
import { appLoading, setMessage, appDoneLoading } from '../../appState/actions';

import {
  addSubject,
  createSubject,
  createTeacher,
  getTeacherWithStoredToken,
  loginSuccessTeacher,
  loginTeacher,
  logOutTeacher,
  teacherLoggingOut,
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

describe('#loginTeacher', () => {
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
  const credentials: ILoginCredentials = {
    email: 'test@test',
    password: 'test_password',
    status: 0,
  };
  const dispatch = jest.fn();
  const getState = jest.fn();
  const extra = null;
  const response = { data: teacher };

  test('calls axios and returns teacher', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve(response));
    await loginTeacher(credentials)(dispatch, getState, extra);

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(loginSuccessTeacher(teacher));
    expect(dispatch).toHaveBeenCalledWith(
      setMessage('success', false, 'Welcome back!')
    );
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(4);
  });
});

describe('#teacherLoggingOut', () => {
  const dispatch = jest.fn();

  test('dispatches an action', () => {
    teacherLoggingOut(dispatch);

    expect(dispatch).toHaveBeenCalledWith(logOutTeacher());
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});

describe('#getTeacherWithStoredToken', () => {
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
  const dispatch = jest.fn();
  const response = { data: teacher };

  test('calls axios and returns teacher', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));
    await getTeacherWithStoredToken(dispatch);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(tokenTeacherStillValid(teacher));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});

describe('#createTeacher', () => {
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
  const credentials: ISignUpCredentials = {
    email: 'test@test',
    password: 'test_password',
    status: 0,
    name: 'test_name',
    teacherId: 1,
  };
  const dispatch = jest.fn();
  const getState = jest.fn();
  const extra = null;
  const response = { data: { user: teacher, message: 'test' } };

  test('calls axios and returns teacher', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve(response));
    await createTeacher(credentials)(dispatch, getState, extra);

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(
      loginSuccessTeacher(response.data.user)
    );
    expect(dispatch).toHaveBeenCalledWith(
      setMessage('success', true, response.data.message)
    );
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(4);
  });
});

describe('#createSubject', () => {
  const subject: string = 'test';
  const newSubject: ISubject = {
    id: 1,
    name: subject,
  };
  const dispatch = jest.fn();
  const getState = jest.fn();
  const extra = null;
  const response = { data: { newSubject: newSubject, message: 'test' } };

  test('calls axios and returns subject', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve(response));
    await createSubject(subject)(dispatch, getState, extra);

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(addSubject(response.data.newSubject));
    expect(dispatch).toHaveBeenCalledWith(
      setMessage('success', true, response.data.message)
    );
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(4);
  });
});
