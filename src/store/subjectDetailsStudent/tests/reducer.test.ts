import reducer from '../reducer';

import {
  FETCH_RESULTS_FOR_SUBJECT,
  REMOVE_RESULTS_FOR_SUBJECT,
  ResultsFetched,
  RemoveDetailsStudent,
  SubjectDetailStudent,
} from '../types';

const initialState = {
  all: null,
};

const subjectDetails: SubjectDetailStudent[] = [{ at: 'test_at', result: 1 }];

const action_fetch: ResultsFetched = {
  type: FETCH_RESULTS_FOR_SUBJECT,
  subjectDetails,
};

const action_remove: RemoveDetailsStudent = {
  type: REMOVE_RESULTS_FOR_SUBJECT,
};

describe('When results are fetched', () => {
  test('dispatch FETCH_RESULTS_FOR_SUBJECT action', () => {
    const newState = reducer(initialState, action_fetch);
    expect(newState).not.toEqual(initialState);
    expect(newState).not.toBeNull;
    expect(newState.all).toEqual(subjectDetails);
  });
});

describe('When result array is not null', () => {
  test('and dispatch REMOVE_RESULTS_FOR_SUBJECT action', () => {
    const newState = reducer(
      { ...initialState, all: subjectDetails },
      action_remove
    );
    expect(newState).toEqual(initialState);
    expect(newState.all).toBeNull;
  });
});
