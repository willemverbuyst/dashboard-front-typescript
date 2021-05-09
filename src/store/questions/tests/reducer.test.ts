import { IQuestion } from '../../../models/test.models';
import reducer from '../reducer';
import {
  FETCH_QUESTIONS,
  ADD_QUESTION,
  QuestionsFetched,
  AddQuestionToList,
  QuestionsState,
} from '../types';

describe('#questionsReducer', () => {
  describe('w/ no state and a FETCH_QUESTIONS action', () => {
    const questions: IQuestion[] = [
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
      payload: questions,
    };
    const newState: QuestionsState = reducer(undefined, action);

    test('returns a state with questions', () => {
      expect(newState.all).toEqual(questions);
    });
  });

  describe('w/ state and ADD_QUESTIONS action', () => {
    const initialState: QuestionsState = {
      all: null,
    };
    const questions: IQuestion[] = [
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
      payload: questions,
    };
    const newState: QuestionsState = reducer(initialState, action);
    test('returns a state with questions', () => {
      expect(newState.all).toEqual(questions);
    });
  });

  describe('w/ state and a ADD_QUESTIONS action', () => {
    const initialState: QuestionsState = {
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
    const question: IQuestion = {
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
      payload: question,
    };
    const newState = reducer(initialState, action);

    test('returns a state with questions', () => {
      expect(newState.all).toEqual([...initialState.all!, question]);
    });
  });
});
