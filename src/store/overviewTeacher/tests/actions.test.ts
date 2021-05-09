import axios from 'axios';
import { appLoading, appDoneLoading } from '../../appState/actions';
import {
  getMainOverview,
  getStudentForOverview,
  getSubjectForOverview,
  mainFetched,
  removeOverviewTeacher,
  studentsFetched,
  subjectsFetched,
} from '../actions';
import {
  Subject,
  SubjectsFetched,
  FETCH_OVERVIEW_FOR_SUBJECT,
  Student,
  StudentsFetched,
  FETCH_OVERVIEW_FOR_STUDENT,
  FETCH_OVERVIEW_FOR_MAIN,
  Main,
  MainFetched,
  RemoveOverviewTeacher,
  REMOVE_OVERVIEW,
} from '../types';

const mockAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.resetAllMocks();
});

describe('#overviewTeacherState', () => {
  describe('#subjectsFetched  ', () => {
    const subjects: Subject[] = [
      { name: 'test', score: 1, subjectId: 1, tests: 1 },
    ];
    const expected: SubjectsFetched = {
      type: FETCH_OVERVIEW_FOR_SUBJECT,
      payload: subjects,
    };

    test('returns an action of type FETCH_OVERVIEW_FOR_SUBJECT and subjects', () => {
      expect(subjectsFetched(subjects)).toEqual(expected);
      expect(subjectsFetched(subjects).type).toEqual(
        FETCH_OVERVIEW_FOR_SUBJECT
      );
      expect(subjectsFetched(subjects).payload).toEqual(subjects);
    });
  });

  describe('#studentsFetched', () => {
    const students: Student[] = [
      { name: 'test', score: 1, subjectId: 1, tests: 1 },
    ];
    const expected: StudentsFetched = {
      type: FETCH_OVERVIEW_FOR_STUDENT,
      payload: students,
    };

    test('returns an action of type FETCH_OVERVIEW_FOR_STUDENT and students', () => {
      expect(studentsFetched(students)).toEqual(expected);
      expect(studentsFetched(students).type).toEqual(
        FETCH_OVERVIEW_FOR_STUDENT
      );
      expect(studentsFetched(students).payload).toEqual(students);
    });
  });

  describe('#mainFetched', () => {
    const overview: Main = {
      scores: [{ length: 1, result: 1 }],
      tests: [
        {
          subjectId: 1,
          result: 1,
          at: 'now',
        },
      ],
    };
    const expected: MainFetched = {
      type: FETCH_OVERVIEW_FOR_MAIN,
      payload: overview,
    };

    test('returns an action of type FETCH_OVERVIEW_FOR_MAIN and students', () => {
      expect(mainFetched(overview)).toEqual(expected);
      expect(mainFetched(overview).type).toEqual(FETCH_OVERVIEW_FOR_MAIN);
      expect(mainFetched(overview).payload).toEqual(overview);
    });
  });

  describe('#removeOverviewTeacher', () => {
    const expected: RemoveOverviewTeacher = {
      type: REMOVE_OVERVIEW,
    };

    test('returns an action of type REMOVE_OVERVIEW and no payload', () => {
      expect(removeOverviewTeacher()).toEqual(expected);
      expect(removeOverviewTeacher().type).toEqual(REMOVE_OVERVIEW);
      expect(removeOverviewTeacher()).not.toHaveProperty('payload');
    });
  });
});

describe('#getSubjectForOverview', () => {
  const subjects: Subject[] = [
    { name: 'test', score: 1, subjectId: 1, tests: 1 },
  ];
  const dispatch = jest.fn();
  const getState = jest.fn();
  const extra = null;
  const response = { data: subjects };

  test('calls axios and returns subjects', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));
    await getSubjectForOverview(1)(dispatch, getState, extra);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(subjectsFetched(subjects));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});

describe('#getStudentForOverview', () => {
  const students: Student[] = [
    { name: 'test', score: 1, subjectId: 1, tests: 1 },
  ];
  const dispatch = jest.fn();
  const getState = jest.fn();
  const extra = null;
  const response = { data: students };

  test('calls axios and returns students', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));
    await getStudentForOverview(1)(dispatch, getState, extra);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(studentsFetched(students));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});

describe('#getMainOverview ', () => {
  const overview: Main = {
    scores: [{ length: 1, result: 1 }],
    tests: [
      {
        subjectId: 1,
        result: 1,
        at: 'now',
      },
    ],
  };
  const dispatch = jest.fn();
  const response = { data: overview };

  test('calls axios and returns students', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));
    await getMainOverview(dispatch);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(mainFetched(overview));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});
