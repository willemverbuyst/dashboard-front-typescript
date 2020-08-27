import reducer from '../reducer';
import { STORE_TEACHERS } from '../types';

describe('When student signs up', () => {
  const initialState = {
    all: null,
  };
  describe('with initial state and FETCH_TEACHERS action', () => {
    test('returns the new state with teachers', () => {
      const newState = reducer(undefined, {
        type: STORE_TEACHERS,
        teachers: [{ name: 'test', id: 1 }],
      });
      expect(newState).toEqual({ all: [{ name: 'test', id: 1 }] });
    });
  });
  describe('if given FETCH_TEACHERS action with empty array', () => {
    test('returns the new state with [] ', () => {
      const newState = reducer(initialState, {
        type: STORE_TEACHERS,
        teachers: [],
      });
      expect(newState).toEqual({ all: [] });
    });
  });
});
