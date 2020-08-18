export type MCanswer = {
  id: number;
  text: string;
  correct: boolean;
  questionId: number;
};

export type MCquestionDisplay = {
  text: string;
  answers: MCanswer[];
  questionNumber: number;
  questionId: number;
  onChange: RadioEvent;
};

export type AnswerTest = {
  question1: number;
  question2: number;
  question3: number;
  answer1: number;
  answer2: number;
  answer3: number;
};

export type RadioEvent = (
  event: React.ChangeEvent<HTMLInputElement>,
  questionNumber: number,
  questionId: number
) => void;
