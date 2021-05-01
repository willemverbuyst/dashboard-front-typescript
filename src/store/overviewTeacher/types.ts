import { IScore, ITest } from '../../models/test.models';

export const FETCH_OVERVIEW_FOR_SUBJECT = 'FETCH_OVERVIEW_FOR_SUBJECT';
export const FETCH_OVERVIEW_FOR_STUDENT = 'FETCH_OVERVIEW_FOR_STUDENT';
export const FETCH_OVERVIEW_FOR_MAIN = 'FETCH_OVERVIEW_FOR_MAIN';
export const REMOVE_OVERVIEW = 'REMOVE_OVERVIEW';

export type OverviewTeacherState = {
  students: Student[] | null;
  subjects: Subject[] | null;
  main: Main;
};

export type Student = {
  name: string;
  score: number;
  subjectId: number;
  tests: number;
};

export type Subject = {
  name: string;
  score: number;
  subjectId: number;
  tests: number;
};

export type Main = {
  scores: IScore[] | null;
  tests: ITest[] | null;
};

export type SubjectsFetched = {
  type: typeof FETCH_OVERVIEW_FOR_SUBJECT;
  payload: Subject[];
};

export type StudentsFetched = {
  type: typeof FETCH_OVERVIEW_FOR_STUDENT;
  payload: Student[];
};

export type MainFetched = {
  type: typeof FETCH_OVERVIEW_FOR_MAIN;
  payload: Main;
};

export type RemoveOverviewTeacher = {
  type: typeof REMOVE_OVERVIEW;
};

export type overviewTeacherTypes =
  | SubjectsFetched
  | StudentsFetched
  | MainFetched
  | RemoveOverviewTeacher;
