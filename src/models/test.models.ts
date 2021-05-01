import { RadioEvent } from './events.model';

export interface ITest {
  subjectId: number;
  result: number;
  at: string;
}

export type MCanswer = {
  id: number;
  text: string;
  correct: boolean;
  questionId: number;
};

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
  answers: MCanswer[];
  questionNumber: number;
  questionId: number;
  onChange: RadioEvent;
};
