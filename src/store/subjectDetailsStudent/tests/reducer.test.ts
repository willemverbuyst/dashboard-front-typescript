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

const action: ResultsFetched = {
  type: FETCH_RESULTS_FOR_SUBJECT,
  subjectDetails,
};

describe('When results are fetched', () => {
  test('dispatch FETCH_RESULTS_FOR_SUBJECT action  ', () => {
    const newState = reducer(initialState, action);
    expect(newState).not.toEqual(initialState);
    expect(newState).not.toBeNull;
    expect(newState.all).toEqual(subjectDetails);
  });
});
