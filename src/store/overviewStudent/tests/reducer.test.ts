import reducer from '../reducer';
import {
  FETCH_RESULTS_FOR_STUDENT_MAIN,
  REMOVE_RESULTS_FOR_STUDENT_MAIN,
  ResultsFetched,
  RemoveResults,
} from '../types';

describe.only('#overviewStudentReducer', () => {
  describe('if given no state and FETCH_RESULTS_FOR_STUDENT_MAIN action', () => {
    const results = [{ at: 'test', result: 1, subject: 1 }];
    const action: ResultsFetched = {
      type: FETCH_RESULTS_FOR_STUDENT_MAIN,
      results,
    };
    const newState = reducer(undefined, action);

    test('returns the new state with results', () => {
      expect(newState).toEqual({ results });
    });
  });

  describe('if given initial state and FETCH_RESULTS_FOR_STUDENT_MAIN action', () => {
    const results = [{ at: 'test', result: 1, subject: 1 }];
    const initialState = {
      results: [{ at: 'test', result: 2, subject: 2 }],
    };
    const action: ResultsFetched = {
      type: FETCH_RESULTS_FOR_STUDENT_MAIN,
      results,
    };
    const newState = reducer(initialState, action);

    test('returns the new state with results', () => {
      expect(newState.results).toEqual(results);
    });
  });

  describe('if given initial state and REMOVE_RESULTS_FOR_STUDENT_MAIN action', () => {
    const action: RemoveResults = {
      type: REMOVE_RESULTS_FOR_STUDENT_MAIN,
    };
    const initialState = {
      results: [{ at: 'test', result: 2, subject: 2 }],
    };
    const newState = reducer(initialState, action);

    test('returns the new state with results', () => {
      expect(newState.results).toEqual(null);
    });
  });
});
