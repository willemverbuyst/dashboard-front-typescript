import {
  Subjects,
  Students,
  Main,
  OverviewTeacher,
} from '../../types/modelsOverviewTeacher';

export const FETCH_OVERVIEW_FOR_SUBJECT = 'FETCH_OVERVIEW_FOR_SUBJECT';
export const FETCH_OVERVIEW_FOR_STUDENT = 'FETCH_OVERVIEW_FOR_STUDENT';
export const FETCH_OVERVIEW_FOR_MAIN = 'FETCH_OVERVIEW_FOR_MAIN';
export const REMOVE_OVERVIEW = 'REMOVE_OVERVIEW';

export type StoreState = {
  overviewTeacher: OverviewTeacher;
};

export type GetState = () => StoreState;

export type SubjectsFetched = {
  type: typeof FETCH_OVERVIEW_FOR_SUBJECT;
  payload: Subjects;
};

export type StudentsFetched = {
  type: typeof FETCH_OVERVIEW_FOR_STUDENT;
  payload: Students;
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
