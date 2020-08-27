import reducer from '../reducer';

import {
  FETCH_MC_QUESTIONS,
  REMOVE_MC_QUESTIONS,
  MC3QuestionsFetched,
  RemoveQuestions,
  MCTest,
} from '../types';

const initialState: MCTest = {
  all: null,
};
const MCAnswer = {
  id: 1,
  text: 'test_answer',
  correct: true,
  questionId: 1,
};
const MCQuestion = {
  id: 1,
  text: 'test_question',
  subjectId: 1,
  answers: [MCAnswer],
};

describe('Fetching questions', () => {
  const action: MC3QuestionsFetched = {
    type: FETCH_MC_QUESTIONS,
    mc3questions: [MCQuestion],
  };
  describe('with initial state and FETCH_MC_QUESTIONS action', () => {
    test('returns the state with the questions', () => {
      const newState = reducer(initialState, action);
      expect(newState).not.toEqual(initialState);
      expect(newState.all).toEqual([MCQuestion]);
      expect(newState.all).not.toBeNull();
    });
  });
});
