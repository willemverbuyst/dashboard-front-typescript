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
} from '../types';
import {
  appLoading,
  appDoneLoading,
  // showMessageWithTimeout,
  // setMessage,
} from '../../appState/actions';

const mockAxios = axios as jest.Mocked<typeof axios>;

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

beforeEach(() => {
  jest.resetAllMocks();
});

describe('if given action LOG_OUT_STUDENT', () => {
  const action: LogOutStudent = {
    type: LOG_OUT_STUDENT,
  };
  test('should return an object containing type LOG_OUT_STUDENT and no payload', () => {
    expect(logOutStudent()).toEqual(action);
  });
});
describe('if given action LOGIN_SUCCESS_STUDENT', () => {
  const action: LoginSuccessStudent = {
    type: LOGIN_SUCCESS_STUDENT,
    student,
  };
  test('should return an object containing type LOGIN_SUCCESS_STUDENT and a payload', () => {
    expect(loginSuccessStudent(student)).toEqual(action);
    expect(loginSuccessStudent(student).student).not.toBeUndefined();
  });
});
describe('if given action TOKEN_STILL_VALID_STUDENT', () => {
  const action: TokenStudentStillValid = {
    type: TOKEN_STILL_VALID_STUDENT,
    student,
  };
  test('should return an object containing type TOKEN_STILL_VALID_STUDENTand a payload', () => {
    expect(tokenStudentStillValid(student)).toEqual(action);
    expect(tokenStudentStillValid(student).student).not.toBeUndefined();
  });
});

describe('student logging in', () => {
  it('calls axios and returns student', async () => {
    const credentials = {
      email: 'test@test',
      password: 'test_password',
      status: 1,
    };
    const dispatch = jest.fn();
    const getState = jest.fn();
    const response = { data: student };

    mockAxios.post.mockImplementationOnce(() => Promise.resolve(response));

    await studentLoggingIn(credentials)(dispatch, getState);

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(loginSuccessStudent(student));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(4);
    // expect(dispatch).toHaveBeenCalledWith(
    //   showMessageWithTimeout('success', false, 'Welcome back!', 1500)
    // );
  });
});

describe('student logging out', () => {
  it('dispatches four actions', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    studentLoggingOut()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(logOutStudent());
    expect(dispatch).toHaveBeenCalledWith(removeResults());
    expect(dispatch).toHaveBeenCalledWith(removeDetailsStudent());
    expect(dispatch).toHaveBeenCalledWith(removeQuestions());
    expect(dispatch).toHaveBeenCalledTimes(4);
  });
});

describe('student signing in', () => {
  it('calls axios and returns student', async () => {
    const credentials = {
      status: 1,
      name: 'test',
      email: 'test@test',
      password: 'test_password',
      teacherId: 1,
    };
    const dispatch = jest.fn();
    const getState = jest.fn();
    const response = { data: student };

    mockAxios.post.mockImplementationOnce(() => Promise.resolve(response));

    await createStudent(credentials)(dispatch, getState);

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(loginSuccessStudent(student));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(4);
    // expect(dispatch).toHaveBeenCalledWith(
    //   showMessageWithTimeout('success', false, 'Welcome back!', 1500)
    // );
  });
});

describe('student with valid token', () => {
  it('returns student', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const response = { data: student };

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));

    await getStudentWithStoredToken()(dispatch, getState);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(tokenStudentStillValid(student));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
    // expect(dispatch).toHaveBeenCalledWith(
    //   showMessageWithTimeout('success', false, 'Welcome back!', 1500)
    // );
  });
});
