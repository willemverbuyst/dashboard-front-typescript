import reducer from '../reducer';
import {
  FETCH_OVERVIEW_FOR_MAIN,
  FETCH_OVERVIEW_FOR_STUDENT,
  FETCH_OVERVIEW_FOR_SUBJECT,
  Main,
  MainFetched,
  OverviewTeacherState,
  RemoveOverviewTeacher,
  REMOVE_OVERVIEW,
  Student,
  StudentsFetched,
  Subject,
  SubjectsFetched,
} from '../types';

describe('#overviewTeacheReducerr', () => {
  describe('w/ initial state and FETCH_OVERVIEW_FOR_MAIN action', () => {
    const initialState: OverviewTeacherState = {
      subjects: null,
      students: null,
      main: { scores: null, tests: null },
    };
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
    const action: MainFetched = {
      type: FETCH_OVERVIEW_FOR_MAIN,
      payload: overview,
    };
    const newState: OverviewTeacherState = reducer(initialState, action);

    test('returns the new state with overview for main', () => {
      expect(newState).not.toEqual(initialState);
      expect(newState.main).toEqual(overview);
      expect(newState).toHaveProperty('subjects');
      expect(newState).toHaveProperty('students');
    });
  });

  describe('w/ initial state and FETCH_OVERVIEW_FOR_STUDENT action', () => {
    const initialState: OverviewTeacherState = {
      subjects: null,
      students: null,
      main: { scores: null, tests: null },
    };
    const students: Student[] = [
      { name: 'test', score: 1, subjectId: 1, tests: 1 },
    ];
    const action: StudentsFetched = {
      type: FETCH_OVERVIEW_FOR_STUDENT,
      payload: students,
    };
    const newState: OverviewTeacherState = reducer(initialState, action);

    test('returns the new state with students', () => {
      expect(newState).not.toEqual(initialState);
      expect(newState.students).toEqual(students);
      expect(newState).toHaveProperty('subjects');
      expect(newState).toHaveProperty('main');
    });
  });

  describe('w/ initial state and FETCH_OVERVIEW_FOR_SUBJECT  action', () => {
    const initialState: OverviewTeacherState = {
      subjects: null,
      students: null,
      main: { scores: null, tests: null },
    };
    const subjects: Subject[] = [
      { name: 'test', score: 1, subjectId: 1, tests: 1 },
    ];
    const action: SubjectsFetched = {
      type: FETCH_OVERVIEW_FOR_SUBJECT,
      payload: subjects,
    };
    const newState: OverviewTeacherState = reducer(initialState, action);

    test('returns the new state with subjects', () => {
      expect(newState).not.toEqual(initialState);
      expect(newState.subjects).toEqual(subjects);
      expect(newState).toHaveProperty('students');
      expect(newState).toHaveProperty('main');
    });
  });

  describe('w/ initial state and REMOVE_OVERVIEW action', () => {
    const initialState: OverviewTeacherState = {
      subjects: null,
      students: null,
      main: { scores: null, tests: null },
    };
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
    const state: OverviewTeacherState = {
      subjects: null,
      students: null,
      main: overview,
    };
    const action: RemoveOverviewTeacher = {
      type: REMOVE_OVERVIEW,
    };
    const newState: OverviewTeacherState = reducer(state, action);

    test('returns the new state, null for main', () => {
      expect(newState.main).toEqual(initialState.main);
      expect(newState.main.scores).toBeNull();
      expect(newState.main.tests).toBeNull();
      expect(newState).toHaveProperty('students');
      expect(newState).toHaveProperty('subjects');
    });
  });
});
