export const FETCH_RESULTS_FOR_STUDENT_MAIN = 'FETCH_RESULTS_FOR_STUDENT_MAIN';
export const REMOVE_RESULTS_FOR_STUDENT_MAIN =
  'REMOVE_RESULTS_FOR_STUDENT_MAIN';

export type OverviewStudentState = {
  results: Result[] | null;
};

export type GetState = () => OverviewStudentState;

export type Result = {
  at: string;
  result: number;
  subject: number;
};

export type ResultsFetched = {
  type: typeof FETCH_RESULTS_FOR_STUDENT_MAIN;
  results: Result[];
};

export type RemoveResults = {
  type: typeof REMOVE_RESULTS_FOR_STUDENT_MAIN;
};

export type OverviewStudentTypes = ResultsFetched | RemoveResults;
