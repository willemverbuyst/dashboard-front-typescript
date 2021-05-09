import reducer from '../reducer';
import {
  FETCH_RESULTS_FOR_STUDENT_MAIN,
  REMOVE_RESULTS_FOR_STUDENT_MAIN,
  ResultsFetched,
  RemoveResults,
  OverviewStudentState,
} from '../types';

describe('#overviewStudentReducer', () => {
  describe('w/ initial state and FETCH_RESULTS_FOR_STUDENT_MAIN action', () => {
    const initialState: OverviewStudentState = {
      results: null,
    };
    const results = [{ at: 'test', result: 1, subject: 1 }];
    const action: ResultsFetched = {
      type: FETCH_RESULTS_FOR_STUDENT_MAIN,
      results,
    };
    const newState = reducer(undefined, action);

    test('returns the new state with overview for main', () => {
      expect(newState).not.toEqual(initialState);
      expect(newState.results).toEqual(results);
    });
  });

  describe('w/ state and REMOVE_RESULTS_FOR_STUDENT_MAIN action', () => {
    const initialState: OverviewStudentState = {
      results: null,
    };
    const results = [{ at: 'test', result: 1, subject: 1 }];
    const state: OverviewStudentState = {
      results,
    };
    const action: RemoveResults = {
      type: REMOVE_RESULTS_FOR_STUDENT_MAIN,
    };
    const newState: OverviewStudentState = reducer(state, action);

    test('returns the new state, null for main', () => {
      expect(newState.results).toEqual(initialState.results);
      expect(newState).toHaveProperty('results');
    });
  });
});
