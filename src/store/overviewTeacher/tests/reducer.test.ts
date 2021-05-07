import reducer from '../reducer';
import { FETCH_OVERVIEW_FOR_MAIN, MainFetched } from '../types';

describe('#mainFetched', () => {
  describe('if given no state and FETCH_OVERVIEW_FOR_MAIN action', () => {
    const initialState = {
      subjects: null,
      students: null,
      main: { scores: null, tests: null },
    };
    const action: MainFetched = {
      type: FETCH_OVERVIEW_FOR_MAIN,
      payload: {
        scores: [{ length: 1, result: 1 }],
        tests: [
          {
            subjectId: 1,
            result: 1,
            at: 'now',
          },
        ],
      },
    };
    const newState = reducer(initialState, action);

    test('returns the new state with results', () => {
      expect(newState).not.toEqual(initialState);
    });
    test('returns the new state with results', () => {
      expect(newState.main).toEqual(action.payload);
    });
  });
});
