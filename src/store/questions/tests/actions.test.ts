import axios from 'axios';
import {
  questionsFetched,
  addQuestionToList,
  getQuestionsForSubject,
  createQuestion,
} from '../actions';
import { appLoading, appDoneLoading } from '../../appState/actions';
import { FETCH_QUESTIONS, ADD_QUESTION } from '../types';

describe('questionsFetched', () => {
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
  describe('if given an array of questions', () => {
    test('should return an action of type FETCH_QUESTIONS and an array containing question objects', () => {
      const expected = {
        type: FETCH_QUESTIONS,
        questions,
      };
      expect(questionsFetched(questions)).toEqual(expected);
    });
    test('the payload of what is returned should have the same length as the questions array', () => {
      const action = questionsFetched(questions);
      expect(action.questions).toHaveLength(questions.length);
    });
    test('the payload of what is returned should contain objects with the same value as the questions array', () => {
      const action = questionsFetched(questions);
      expect(action.questions).toEqual(questions);
    });
  });
});

describe('addQuestionToList ', () => {
  const question = {
    text: 'test',
    answers: [
      {
        text: 'test_answer',
        correct: true,
      },
    ],
  };
  describe('On adding questions', () => {
    test('should return an action of type ADD_QUESTION and a question object', () => {
      const expected = {
        type: ADD_QUESTION,
        question,
      };
      expect(addQuestionToList(question)).toEqual(expected);
    });
  });
});

// describe('getQuestionsForSubject', () => {
//   test('calls axios and returns questions', async () => {
//     const subjectId = 1;
//     const dispatch = jest.fn();
//     const getState = jest.fn();
//     const questions = [
//       {
//         text: 'test',
//         answers: [
//           {
//             text: 'test_answer',
//             correct: true,
//           },
//         ],
//       },
//     ];
//     const response = { data: questions };
//     const mockAxios = axios as jest.Mocked<typeof axios>;
//     mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));

//     await getQuestionsForSubject(subjectId)(dispatch, getState);

//     expect(mockAxios.get).toHaveBeenCalledTimes(1);
//     expect(dispatch).toHaveBeenCalledWith(appLoading());
//     expect(dispatch).toHaveBeenCalledWith(questionsFetched(questions));
//     expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
//     expect(dispatch).toHaveBeenCalledTimes(3);
//   });
// });

it('calls axios and returns questions', async () => {
  const id = 1;
  const dispatch = jest.fn();
  const getState = jest.fn();
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
  console.log('anything');
  const response = { data: questions };
  const mockAxios = axios as jest.Mocked<typeof axios>;
  mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));
  await getQuestionsForSubject(id)(dispatch, getState);

  // expect(mockAxios.get('1')).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenCalledWith(appLoading());
  expect(dispatch).toHaveBeenCalledWith(questionsFetched(questions));
  expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
  expect(dispatch).toHaveBeenCalledTimes(3);
});
