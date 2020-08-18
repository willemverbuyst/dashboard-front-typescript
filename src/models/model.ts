export type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

export type PickEvent = {
  onChange: (event: React.MouseEvent<HTMLButtonElement>) => string;
};

export type Student = {
  id: number | null;
  name: string | null;
  email: string | null;
  token: string | null;
  subjects: Subjects[] | null;
};

export type Teacher = {
  id: number | null;
  name: string | null;
  email: string | null;
  token: string | null;
  subjects: Subjects[] | null;
  students: Students[] | null;
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

export type PostNewQuestion = {
  subject: number;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
};

export type AddNewQuestion = {
  text: string;
  answers: Answer[];
};

export type LoginCredentials = {
  email: string;
  password: string;
  status: number;
};

export type SignUpCredentials = {
  name: string;
  email: string;
  password: string;
  status: number;
  teacherId: number;
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
