export type Students = {
  students: Student[] | [];
};

export type Student = {
  name: string;
  score: number;
  subjectId: number;
  tests: number;
};

export type Subjects = {
  subjects: string[] | [];
};

export type Main = {
  main: string[] | [];
};

export type OverviewTeacher = {
  students: Student[] | null;
  subjects: string[] | null;
  main: string[] | [];
};
