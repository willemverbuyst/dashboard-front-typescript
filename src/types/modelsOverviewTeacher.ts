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
