import { Results } from '../../types/model';

export const FETCH_RESULTS_FOR_STUDENT_MAIN = 'FETCH_RESULTS_FOR_STUDENT_MAIN';
export const REMOVE_RESULTS_FOR_STUDENT_MAIN =
  'REMOVE_RESULTS_FOR_STUDENT_MAIN';

export type StoreState = {
  overviewStudent: Results;
};

export type GetState = () => StoreState;

export type ResultsFetched = {
  type: typeof FETCH_RESULTS_FOR_STUDENT_MAIN;
  results: Results;
};

export type RemoveResults = {
  type: typeof REMOVE_RESULTS_FOR_STUDENT_MAIN;
};

export type overviewStudentTypes = ResultsFetched | RemoveResults;
