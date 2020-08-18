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

export type OverviewTeacher = {
  students: Student[] | null;
  subjects: Subject[] | null;
  main: Main;
};

export type Main = {
  scores: Score[] | null;
  tests: Test[] | null;
};

export type Score = {
  length: number;
  result: number;
};

export type Test = {
  subjectId: number;
  result: number;
  at: string;
};

export type SelectorProps = {
  title: string;
  radio1: string;
  radio2: string;
  onChangeRadio: any;
  value: string | undefined;
  onChangeSelection: any;
  results: Student[];
  selectStudentData: string;
  onClick: any;
  placeholder: string;
  textBtn: string;
};
