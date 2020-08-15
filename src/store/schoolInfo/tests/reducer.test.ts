import reducer from '../reducer';
import { FETCH_TEACHERS } from '../types';

describe('schoolInfoReducer', () => {
  const initialState = {
    all: null,
  };
  describe('if given no state and FETCH_TEACHERS action', () => {
    test('returns the new state with teachers', () => {
      const newState = reducer(undefined, {
        type: FETCH_TEACHERS,
        teachers: [{ name: 'test', id: 1 }],
      });
      expect(newState).toEqual({ all: [{ name: 'test', id: 1 }] });
    });
  });
  describe('if given FETCH_TEACHERS action with empty array', () => {
    test('returns the new state with [] ', () => {
      const newState = reducer(initialState, {
        type: FETCH_TEACHERS,
        teachers: [],
      });
      expect(newState).toEqual({ all: [] });
    });
  });
});
