import axios from 'axios';
import { appDoneLoading, appLoading } from '../../appState/actions';
import {
  resultsFetched,
  removeResults,
  getResultsForStudentMain,
} from '../actions';
import {
  FETCH_RESULTS_FOR_STUDENT_MAIN,
  RemoveResults,
  REMOVE_RESULTS_FOR_STUDENT_MAIN,
  Result,
  ResultsFetched,
} from '../types';

const mockAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.resetAllMocks();
});

describe('#overviewStudent', () => {
  describe('#resultsFetched', () => {
    const results: Result[] = [
      {
        at: 'today',
        result: 1,
        subject: 1,
      },
    ];
    const expected: ResultsFetched = {
      type: FETCH_RESULTS_FOR_STUDENT_MAIN,
      payload: results,
    };

    test('returns an anction w/ type FETCH_RESULTS_FOR_STUDENT_MAIN and payload of results', () => {
      expect(resultsFetched(results)).toEqual(expected);
      expect(resultsFetched(results).type).toEqual(
        FETCH_RESULTS_FOR_STUDENT_MAIN
      );
      expect(resultsFetched(results).payload).toEqual(results);
    });
  });

  describe('#removeResults', () => {
    const expected: RemoveResults = {
      type: REMOVE_RESULTS_FOR_STUDENT_MAIN,
    };

    test('returns an anction w/ type REMOVE_RESULTS_FOR_STUDENT_MAIN and no payload', () => {
      expect(removeResults()).toEqual(expected);
      expect(removeResults().type).toEqual(REMOVE_RESULTS_FOR_STUDENT_MAIN);
      expect(removeResults()).not.toHaveProperty('payload');
    });
  });
});

describe('#getResultsForStudentMain', () => {
  const results: Result[] = [
    {
      at: 'today',
      result: 1,
      subject: 1,
    },
  ];
  const dispatch = jest.fn();
  const response = { data: results };

  test('calls axios and returns results of student', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));

    await getResultsForStudentMain(dispatch);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(resultsFetched(response.data));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});
