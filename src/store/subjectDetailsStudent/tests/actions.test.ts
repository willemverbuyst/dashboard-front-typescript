import axios from 'axios';
import {
  FETCH_RESULTS_FOR_SUBJECT,
  RemoveDetailsStudent,
  REMOVE_RESULTS_FOR_SUBJECT,
  ResultsFetched,
  SubjectDetailStudent,
} from '../types';
import {
  getResultsForSubject,
  removeDetailsStudent,
  resultsFetched,
} from '../actions';
import { appLoading, appDoneLoading } from '../../appState/actions';

const mockAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.resetAllMocks();
});

describe('#subjectDetailsStudentState', () => {
  describe('#resultsFetched', () => {
    const subjectDetails: SubjectDetailStudent[] = [{ at: 'today', result: 1 }];
    const action: ResultsFetched = {
      type: FETCH_RESULTS_FOR_SUBJECT,
      payload: subjectDetails,
    };

    test('returns an action w/ type FETCH_RESULTS_FOR_SUBJECT and a payload', () => {
      expect(resultsFetched(subjectDetails)).toEqual(action);
      expect(resultsFetched(subjectDetails).type).toEqual(
        FETCH_RESULTS_FOR_SUBJECT
      );
      expect(resultsFetched(subjectDetails).payload).toEqual(subjectDetails);
    });
  });

  describe('#removeDetailsStudent', () => {
    const action: RemoveDetailsStudent = {
      type: REMOVE_RESULTS_FOR_SUBJECT,
    };

    test('returns an action w/ type FETCH_RESULTS_FOR_SUBJECT and no payload', () => {
      expect(removeDetailsStudent()).toEqual(action);
      expect(removeDetailsStudent().type).toEqual(REMOVE_RESULTS_FOR_SUBJECT);
      expect(removeDetailsStudent()).not.toHaveProperty('payload');
    });
  });
});

describe('#getResultsForSubject', () => {
  const subjectDetails: SubjectDetailStudent[] = [{ at: 'test_at', result: 1 }];
  const dispatch = jest.fn();
  const getState = jest.fn();
  const extra = null;
  const response = { data: subjectDetails };

  test('calls axios and returns subject details', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));
    await getResultsForSubject(1)(dispatch, getState, extra);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(resultsFetched(response.data));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});
