import reducer from '../reducer';
import {
  FETCH_RESULTS_FOR_STUDENT_MAIN,
  REMOVE_RESULTS_FOR_STUDENT_MAIN,
} from '../types';

describe('overviewStudentReducer', () => {
  const results = [{ at: 'test', result: 1, subject: 1 }];
  const initialState = {
    results: [{ at: 'test', result: 2, subject: 2 }],
  };
  describe('if given no state and FETCH_RESULTS_FOR_STUDENT_MAIN action', () => {
    const newState = reducer(undefined, {
      type: FETCH_RESULTS_FOR_STUDENT_MAIN,
      results,
    });
    test('returns the new state with results', () => {
      expect(newState).toEqual({ results });
    });
  });
  describe('if given initial state and FETCH_RESULTS_FOR_STUDENT_MAIN action', () => {
    const newState = reducer(initialState, {
      type: FETCH_RESULTS_FOR_STUDENT_MAIN,
      results,
    });
    test('returns the new state with results', () => {
      expect(newState.results).toEqual(results);
    });
  });
  describe('if given initial state and REMOVE_RESULTS_FOR_STUDENT_MAIN action', () => {
    const initialState = {
      results: [{ at: 'test', result: 2, subject: 2 }],
    };
    const newState = reducer(initialState, {
      type: REMOVE_RESULTS_FOR_STUDENT_MAIN,
    });
    test('returns the new state with results', () => {
      expect(newState.results).toEqual(null);
    });
  });
});
