export interface ITeacher {
  id: number;
  name: string;
  email: string;
  token: string;
  subjects: Subjects;
  students: Students;
}
export type Subjects = {
  name: string;
  id: number;
};

export type Students = {
  name: string;
  id: number;
};
