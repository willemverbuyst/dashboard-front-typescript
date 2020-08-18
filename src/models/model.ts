export type Student = {
  id: number | null;
  name: string | null;
  email: string | null;
  token: string | null;
  subjects: Subjects[] | null;
};

export type SubjectDetailsStudent = {
  all: SubjectDetailStudent[] | null;
};

export type SubjectDetailStudent = {
  at: string;
  result: number;
};

export type Subjects = {
  name: string;
  id: number;
};

export type Students = {
  name: string;
  id: number;
};

export type Questions = {
  all: Question[] | null;
};

export type Question = {
  text: string;
  answers: Answer[];
};

export type Answer = {
  text: string;
  correct: boolean;
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

export type AddNewQuestion = {
  text: string;
  answers: Answer[];
};
