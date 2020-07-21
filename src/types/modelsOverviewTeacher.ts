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
  main: string[] | [];
};

export type OverviewTeacher = {
  students: Student[] | null;
  subjects: Subject[] | null;
  main: string[] | [];
};
