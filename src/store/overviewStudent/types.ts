// ACTIONS
export const FETCH_RESULTS_FOR_STUDENT_MAIN = 'FETCH_RESULTS_FOR_STUDENT_MAIN';
export const REMOVE_RESULTS_FOR_STUDENT_MAIN =
  'REMOVE_RESULTS_FOR_STUDENT_MAIN';

export type StoreState = {
  overviewStudent: OverviewStudent;
};

export type GetState = () => StoreState;

export type ResultsFetched = {
  type: typeof FETCH_RESULTS_FOR_STUDENT_MAIN;
  results: Result[];
};

export type RemoveResults = {
  type: typeof REMOVE_RESULTS_FOR_STUDENT_MAIN;
};

export type OverviewStudentTypes = ResultsFetched | RemoveResults;

// REDUCER
export type OverviewStudent = {
  results: Result[] | null;
};

export type Result = {
  at: string;
  result: number;
  subject: number;
};
