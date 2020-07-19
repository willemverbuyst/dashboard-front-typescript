export type MC3questions = {
  all: MCquestion[] | null;
};

export type MCquestion = {
  answers: MCanswer[];
  id: number;
  text: string;
  subjectId: number;
};

export type MCanswer = {
  id: number;
  text: string;
  correct: boolean;
  questionId: number;
};

export type MCquestionDisplay = {
  text: string;
  answers: MCanswer[];
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
  questionId: number
) => void;
