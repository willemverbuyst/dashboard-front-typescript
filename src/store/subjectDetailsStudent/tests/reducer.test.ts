import reducer from '../reducer';
import {
  FETCH_RESULTS_FOR_SUBJECT,
  REMOVE_RESULTS_FOR_SUBJECT,
  ResultsFetched,
  RemoveDetailsStudent,
  SubjectDetailStudent,
  SubjectDetailsStudentState,
} from '../types';

describe('#subjectDetailsStudentReducer', () => {
  describe('w/ initial state and FETCH_RESULTS_FOR_SUBJECT action', () => {
    const initialState: SubjectDetailsStudentState = {
      all: null,
    };
    const subjectDetails: SubjectDetailStudent[] = [
      { at: 'test_at', result: 1 },
    ];
    const action: ResultsFetched = {
      type: FETCH_RESULTS_FOR_SUBJECT,
      payload: subjectDetails,
    };
    const newState = reducer(initialState, action);

    test('returns state with subject details', () => {
      expect(newState.all).not.toEqual(initialState.all);
      expect(newState.all).toEqual(subjectDetails);
    });
  });

  describe('w/ state and REMOVE_RESULTS_FOR_SUBJECT action', () => {
    const initialState: SubjectDetailsStudentState = {
      all: null,
    };
    const subjectDetails: SubjectDetailStudent[] = [
      { at: 'test_at', result: 1 },
    ];
    const action_remove: RemoveDetailsStudent = {
      type: REMOVE_RESULTS_FOR_SUBJECT,
    };
    const newState = reducer(
      { ...initialState, all: subjectDetails },
      action_remove
    );

    test('', () => {
      expect(newState).toEqual(initialState);
      expect(newState.all).toBeNull();
    });
  });
});
