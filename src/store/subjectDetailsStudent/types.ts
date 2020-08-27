export const FETCH_RESULTS_FOR_SUBJECT = 'FETCH_RESULTS_FOR_SUBJECT';
export const REMOVE_RESULTS_FOR_SUBJECT = 'REMOVE_RESULTS_FOR_SUBJECT';

export type SubjectDetailsStudentState = {
  all: SubjectDetailStudent[] | null;
};

export type GetState = () => SubjectDetailsStudentState;

export type SubjectDetailStudent = {
  at: string;
  result: number;
};

export type ResultsFetched = {
  type: typeof FETCH_RESULTS_FOR_SUBJECT;
  subjectDetails: SubjectDetailStudent[];
};

export type RemoveDetailsStudent = {
  type: typeof REMOVE_RESULTS_FOR_SUBJECT;
};

export type StudentDetailsTypes = ResultsFetched | RemoveDetailsStudent;
