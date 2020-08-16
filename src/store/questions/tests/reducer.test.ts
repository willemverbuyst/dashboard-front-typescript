import reducer from '../reducer';
import {
  FETCH_QUESTIONS,
  ADD_QUESTION,
  QuestionsFetched,
  AddQuestionToList,
} from '../types';
import { AddNewQuestion } from '../../../types/model';

describe('questionsReducer', () => {
  const initialState = {
    all: null,
  };
  const action: QuestionsFetched = {
    type: FETCH_QUESTIONS,
    questions: [
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
  const action: AddQuestionToList = {
    type: ADD_QUESTION,
    question: {
      text: 'test',
      answers: [
        {
          text: 'test_answer',
          correct: true,
        },
      ],
    },
  };
  describe('if given state and ADD_QUESTIONS action', () => {
    test('returns the new state with questions', () => {
      const newState = reducer(initialState, action);
      expect(newState).toEqual({
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
      });
    });
  });
});
