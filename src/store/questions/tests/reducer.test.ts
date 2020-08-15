import reducer from '../reducer';
// import { questionsFetched, addQuestionToList } from '../actions';
import { FETCH_QUESTIONS, ADD_QUESTION } from '../types';

describe('questionsReducer', () => {
  const initialState = {
    all: null,
  };
  describe('if given no state and FETCH_QUESTIONS action', () => {
    test('returns the new state with questions', () => {
      const newState = reducer(undefined, {
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
      });
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
        ],
      });
    });
  });
  describe('if given state and ADD_QUESTIONS action', () => {
    test('returns the new state with questions', () => {
      const newState = reducer(undefined, {
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
      });
      expect(newState).toEqual({
        all: {
          text: 'test',
          answers: [
            {
              text: 'test_answer',
              correct: true,
            },
          ],
        },
      });
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
  describe('if given state and ADD_QUESTIONS action', () => {
    test('returns the new state with questions', () => {
      const newState = reducer(initialState, {
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
      });
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
