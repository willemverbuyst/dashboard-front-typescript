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

// REDUCER
export type SubjectDetailsStudent = {
  all: SubjectDetailStudent[] | null;
};

export type SubjectDetailStudent = {
  at: string;
  result: number;
};

export type Student = {
  id: number | null;
  name: string | null;
  email: string | null;
  token: string | null;
  subjects: Subjects[] | null;
};

export type Subjects = {
  name: string;
  id: number;
};
