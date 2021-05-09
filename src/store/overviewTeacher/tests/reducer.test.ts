import reducer from '../reducer';
import {
  FETCH_OVERVIEW_FOR_MAIN,
  Main,
  MainFetched,
  OverviewTeacherState,
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

    test('returns the new state with results', () => {
      expect(newState).not.toEqual(initialState);
    });
    test('returns the new state with results', () => {
      expect(newState.main).toEqual(overview);
    });
  });
});
