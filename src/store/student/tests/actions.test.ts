import axios from 'axios';
import {
  loginSuccessStudent,
  tokenStudentStillValid,
  logOutStudent,
  studentLoggingIn,
  getStudentWithStoredToken,
  studentLoggingOut,
  createStudent,
} from '../actions';
import { removeResults } from '../../overviewStudent/actions';
import { removeDetailsStudent } from '../../subjectDetailsStudent/actions';
import { removeQuestions } from '../../test/actions';
import {
  LOGIN_SUCCESS_STUDENT,
  TOKEN_STILL_VALID_STUDENT,
  LOG_OUT_STUDENT,
  LoginSuccessStudent,
  LogOutStudent,
  TokenStudentStillValid,
  Student,
} from '../types';
import { appLoading, appDoneLoading, setMessage } from '../../appState/actions';
import {
  ILoginCredentials,
  ISignUpCredentials,
} from '../../../models/credentials.model';

const mockAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.resetAllMocks();
});

describe('#studentState', () => {
  describe('#logOutStudent', () => {
    const action: LogOutStudent = {
      type: LOG_OUT_STUDENT,
    };

    test('return an action w/ type LOG_OUT_STUDENT and no payload', () => {
      expect(logOutStudent()).toEqual(action);
      expect(logOutStudent().type).toEqual(LOG_OUT_STUDENT);
      expect(logOutStudent()).not.toHaveProperty('payload');
    });
  });

  describe('#loginSuccessStudent', () => {
    const student: Student = {
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
    };
    const action: LoginSuccessStudent = {
      type: LOGIN_SUCCESS_STUDENT,
      payload: student,
    };

    test('returns an action w/ type LOGIN_SUCCESS_STUDENT and a payload', () => {
      expect(loginSuccessStudent(student)).toEqual(action);
      expect(loginSuccessStudent(student).type).toEqual(LOGIN_SUCCESS_STUDENT);
      expect(loginSuccessStudent(student).payload).toEqual(student);
    });
  });

  describe('#tokenStudentStillValid', () => {
    const student: Student = {
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
    };
    const action: TokenStudentStillValid = {
      type: TOKEN_STILL_VALID_STUDENT,
      payload: student,
    };

    test('returns an action w/ type TOKEN_STILL_VALID_STUDENT and a payload', () => {
      expect(tokenStudentStillValid(student)).toEqual(action);
      expect(tokenStudentStillValid(student).type).toEqual(
        TOKEN_STILL_VALID_STUDENT
      );
      expect(tokenStudentStillValid(student).payload).toEqual(student);
    });
  });
});

describe('student logging in', () => {
  const student: Student = {
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
  };
  const credentials: ILoginCredentials = {
    email: 'test@test',
    password: 'test_password',
    status: 1,
  };
  const dispatch = jest.fn();
  const getState = jest.fn();
  const extra = null;
  const response = { data: student };

  test('calls axios and returns student', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve(response));
    await studentLoggingIn(credentials)(dispatch, getState, extra);

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(loginSuccessStudent(student));
    expect(dispatch).toHaveBeenCalledWith(
      setMessage('success', false, 'Welcome back!')
    );
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(4);
  });
});

describe('student logging out', () => {
  const dispatch = jest.fn();

  test('dispatches four actions', () => {
    studentLoggingOut(dispatch);

    expect(dispatch).toHaveBeenCalledWith(logOutStudent());
    expect(dispatch).toHaveBeenCalledWith(removeResults());
    expect(dispatch).toHaveBeenCalledWith(removeDetailsStudent());
    expect(dispatch).toHaveBeenCalledWith(removeQuestions());
    expect(dispatch).toHaveBeenCalledTimes(4);
  });
});

describe('student signing in', () => {
  const student: Student = {
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
  };
  const credentials: ISignUpCredentials = {
    status: 1,
    name: 'test',
    email: 'test@test',
    password: 'test_password',
    teacherId: 1,
  };
  const dispatch = jest.fn();
  const getState = jest.fn();
  const extra = null;
  const response = { data: { user: student, message: 'Welcome!' } };

  test('calls axios and returns student', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve(response));
    await createStudent(credentials)(dispatch, getState, extra);

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(
      loginSuccessStudent(response.data.user)
    );
    expect(dispatch).toHaveBeenCalledWith(
      setMessage('success', false, response.data.message)
    );
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(4);
  });
});

describe('student with valid token', () => {
  const student = {
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
  };
  const dispatch = jest.fn();
  const response = { data: student };

  test('returns student', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));
    await getStudentWithStoredToken(dispatch);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(tokenStudentStillValid(student));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});
