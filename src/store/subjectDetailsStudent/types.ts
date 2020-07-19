import { SubjectDetailsStudent } from '../../types/model';

export const FETCH_RESULTS_FOR_SUBJECT = 'FETCH_RESULTS_FOR_SUBJECT';
export const REMOVE_RESULTS_FOR_SUBJECT = 'REMOVE_RESULTS_FOR_SUBJECT';

export type StoreState = {
  subjectDetailsStudent: SubjectDetailsStudent;
};

export type GetState = () => StoreState;

export type ResultsFetched = {
  type: typeof FETCH_RESULTS_FOR_SUBJECT;
  subjectDetails: SubjectDetailsStudent;
};

export type RemoveDetailsStudent = {
  type: typeof REMOVE_RESULTS_FOR_SUBJECT;
};

export type StudentDetailsTypes = ResultsFetched | RemoveDetailsStudent;