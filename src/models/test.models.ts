import { RadioEvent } from './events.model';

export interface ITest {
  subjectId: number;
  result: number;
  at: string;
}

export interface IScore {
  length: number;
  result: number;
}

export interface IAnswer {
  text: string;
  correct: boolean;
}

export interface IQuestion {
  text: string;
  answers: IAnswer[];
}

export interface IMultipleChoiceAnswer {
  id: number;
  text: string;
  correct: boolean;
  questionId: number;
}

export interface IMultipleChoiceQuestion {
  id: number;
  text: string;
  subjectId: number;
  answers: IMultipleChoiceAnswer[];
}

// export interface IMCAnswer {
//   id: number;
//   text: string;
//   correct: boolean;
//   questionId: number;
// }

// export interface IMCQuestion {
//   id: number;
//   text: string;
//   subjectId: number;
//   answers: IMCAnswer[];
// }

export type TestResult = {
  question1: number;
  question2: number;
  question3: number;
  answer1: number;
  answer2: number;
  answer3: number;
};

export type MCquestionDisplay = {
  text: string;
  answers: IMultipleChoiceAnswer[];
  questionNumber: number;
  questionId: number;
  onChange: RadioEvent;
};
