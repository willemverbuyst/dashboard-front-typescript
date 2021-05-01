import { ISubject } from './subject.models';

export interface ITeacher {
  id: number;
  name: string;
  email: string;
  token: string;
  subjects: ISubject[];
  students: IStudent[];
}

export interface IStudent {
  name: string;
  id: number;
}
