import {
  IMultipleChoiceAnswer,
  IMultipleChoiceQuestion,
} from '../../../models/test.models';
import reducer from '../reducer';

import {
  FETCH_MC_QUESTIONS,
  REMOVE_MC_QUESTIONS,
  MC3QuestionsFetched,
  RemoveQuestions,
  TestState,
} from '../types';

describe('#testReducer', () => {
  describe('w/ initial state and FETCH_MC_QUESTIONS action', () => {
    const initialState: TestState = {
      all: null,
    };
    const MCAnswer: IMultipleChoiceAnswer = {
      id: 1,
      text: 'test_answer',
      correct: true,
      questionId: 1,
    };

    const MCQuestion: IMultipleChoiceQuestion = {
      id: 1,
      text: 'test_question',
      subjectId: 1,
      answers: [MCAnswer],
    };
    const action: MC3QuestionsFetched = {
      type: FETCH_MC_QUESTIONS,
      payload: [MCQuestion],
    };
    const newState: TestState = reducer(initialState, action);

    test('returns the state with the questions', () => {
      expect(newState).not.toEqual(initialState);
      expect(newState.all).toEqual([MCQuestion]);
      expect(newState.all).not.toBeNull();
    });
  });

  describe('w/ state and REMOVE_MC_QUESTIONS action', () => {
    const initialState: TestState = {
      all: null,
    };
    const MCAnswer: IMultipleChoiceAnswer = {
      id: 1,
      text: 'test_answer',
      correct: true,
      questionId: 1,
    };
    const MCQuestion: IMultipleChoiceQuestion = {
      id: 1,
      text: 'test_question',
      subjectId: 1,
      answers: [MCAnswer],
    };
    const action: RemoveQuestions = {
      type: REMOVE_MC_QUESTIONS,
    };
    const newState_1: TestState = reducer(
      { ...initialState, all: [MCQuestion] },
      action
    );
    const newState_2: TestState = reducer(initialState, action);

    test('returns the initial state', () => {
      expect(newState_1).toEqual(initialState);
      expect(newState_1.all).toBeNull();
      expect(newState_2).toEqual(initialState);
      expect(newState_2.all).toBeNull();
    });
  });
});
