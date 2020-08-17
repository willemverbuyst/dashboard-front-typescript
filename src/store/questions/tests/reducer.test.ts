import reducer from '../reducer';
import {
  FETCH_QUESTIONS,
  ADD_QUESTION,
  QuestionsFetched,
  AddQuestionToList,
} from '../types';

describe('questionsReducer', () => {
  const initialState = {
    all: null,
  };
  const questions = [
    {
      text: 'test',
      answers: [
        {
          text: 'test_answer',
          correct: true,
        },
      ],
    },
  ];
  const action: QuestionsFetched = {
    type: FETCH_QUESTIONS,
    questions,
  };
  describe('if given no state and FETCH_QUESTIONS action', () => {
    test('returns the new state with questions', () => {
      const newState = reducer(undefined, action);
      expect(newState).toEqual({ all: action.questions });
    });
  });
  describe('if given state and ADD_QUESTIONS action', () => {
    test('returns the new state with questions', () => {
      const newState = reducer(initialState, action);
      expect(newState).toEqual({ all: action.questions });
    });
  });
});

describe('questionsReducer', () => {
  const initialState = {
    all: [
      {
        text: 'test',
        answers: [
          {
            text: 'test_answer',
            correct: true,
          },
        ],
      },
    ],
  };
  const question = {
    text: 'test',
    answers: [
      {
        text: 'test_answer',
        correct: true,
      },
    ],
  };
  const action: AddQuestionToList = {
    type: ADD_QUESTION,
    question,
  };
  describe('if given state and ADD_QUESTIONS action', () => {
    test('returns the new state with questions', () => {
      const newState = reducer(initialState, action);
      expect(newState).toEqual({
        all: [...initialState.all, question],
      });
    });
  });
});
